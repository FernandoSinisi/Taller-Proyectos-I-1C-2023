import * as React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { List, Chip, Portal, Modal, Text, Button } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Circle } from 'react-native-maps';
import { images } from './imgs/images';
import Carousel from 'react-native-reanimated-carousel/src/Carousel';
import { useDataStore } from './useStorage';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const IMG_SIZE = 250;

const getImages = (contact) => {
  console.log(JSON.stringify(contact));
  return contact.isDefault
    ? images[contact.pictures]
    : contact.pictures.map((p) => `data:image/jpeg;base64,${p}`);
};

const getModal = (contact) => {
  if (contact.type === 'found') {
    return {
      title: 'Que bien!',
      content:
        'Te enviaremos un email con los datos de quien encontró a tu mascota para que te contactes y la busques.',
    };
  }
  return {
    title: 'Gracias!',
    content:
      'Por favor adjunte una foto con la mascota encontrada. El dueño será notificado y le pasaremos tus datos para que se contacte contigo y busque a su mascota.',
  };
};

const getActionTitle = (contact) => {
  if (contact.type === 'found') {
    return 'Es tu mascota? Contactate!';
  }
  return 'Contactar al dueño';
};

export default function ContactScreen({ route, navigation }) {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // Get the params from the route
  const { contact } = route.params;
  const [petImage, setPetImage] = useState(null);

  const { mutateAsync: updateAsync } = useDataStore({
    keysToInvalidate: ['alertcarddata'],
    onSuccess: () => console.log('success!'),
    onError: () => console.log('error!'),
    method: 'PATCH',
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the petImage library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setPetImage(result.assets[0]);
    }
  };

  const modal = getModal(contact);

  return (
    <ScrollView style={styles.container}>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Text variant="titleLarge">{modal.title}</Text>
          <Text variant="bodyMedium">{modal.content}</Text>
          {contact.type !== 'found' && !petImage && (
            <Button mode="text" onPress={pickImage} icon="camera">
              Subir foto
            </Button>
          )}
          {contact.type !== 'found' && petImage && (
            <Image source={{ uri: petImage.uri }} style={styles.image} />
          )}
          <Button
            mode="contained"
            disabled={contact.type !== 'found' && !petImage}
            onPress={() => {
              const value = { found: true };
              if (contact.type !== 'found') {
                value.foundPicture = petImage.base64;
              }
              updateAsync({
                key: 'alertcarddata',
                id: contact.id,
                value: value,
              }).then(() => {
                hideModal();
                navigation.navigate('AlertList');
              });
            }}
          >
            {contact.type === 'found' ? 'Entendido' : 'Listo'}
          </Button>
        </Modal>
      </Portal>
      <List.Section>
        <View style={styles.petDetails}>
          <Carousel
            loop={true}
            width={IMG_SIZE}
            height={IMG_SIZE}
            autoPlay={false}
            data={getImages(contact)}
            scrollAnimationDuration={1000}
            renderItem={({ index }) => {
              if (contact.isDefault)
                return (
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <Image style={styles.petImage} source={getImages(contact)[index]} />
                  </View>
                );
              if (!contact.isDefault)
                return (
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <Image style={styles.petImage} source={{ uri: getImages(contact)[index] }} />
                  </View>
                );
            }}
          />
          <Text style={styles.petName}>{contact.title}</Text>
          <View style={styles.petFacts}>
            {[contact.species, contact.race, contact.color, ...contact.others].map(
              (fact, index) => (
                <Chip key={index} mode="outlined" style={styles.petChip}>
                  {fact}
                </Chip>
              )
            )}
          </View>
          <List.Item
            title="Descripción"
            description={contact.description}
            descriptionNumberOfLines={null}
            left={() => <MaterialIcon name="description" size={24} color="red" />}
          />
          {contact.type !== 'found' && (contact.reward ?? 0) !== 0 && (
            <List.Item
              title={'$' + contact.reward}
              descriptionNumberOfLines={null}
              left={() => <MaterialIcon name="monetization-on" size={24} color="green" />}
            />
          )}
        </View>
      </List.Section>
      <Text>
        Fecha de {contact.type === 'found' ? 'hallazgo' : 'extravío'}: {contact.lostDate}
      </Text>
      <MapView
        style={styles.map}
        region={{
          latitude: contact.location.latitude,
          longitude: contact.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Circle
          center={{
            latitude: contact.location.latitude,
            longitude: contact.location.longitude,
          }}
          radius={500}
          fillColor="rgba(255, 0, 0, 0.2)"
        />
      </MapView>
      <List.Item
        title={getActionTitle(contact)}
        left={() => <MaterialCommunityIcon name="account-alert" size={24} color="blue" />}
        onPress={() => {
          console.log('Contact owner');
          showModal();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  petDetails: {
    alignItems: 'center',
  },
  petImage: {
    width: IMG_SIZE,
    height: IMG_SIZE,
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  petFacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5,
  },
  petChip: {
    height: 40,
    fontSize: 13,
    lineHeight: 14,
  },
  map: {
    height: 200,
    marginHorizontal: 16,
    marginVertical: 8,
    marginTop: 0, // add some margin to create space
  },
  modal: {
    backgroundColor: '#f5fcff',
    padding: 20,
    margin: 15,
    flexShrink: 1,
    borderRadius: 10,
  },
  image: { width: 70, height: 70, alignSelf: 'center', margin: 10 },
});
