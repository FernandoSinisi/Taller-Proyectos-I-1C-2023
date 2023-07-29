import * as React from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { List, Chip, Modal, Portal, Button, TextInput } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Circle } from 'react-native-maps';
import Carousel from 'react-native-reanimated-carousel/src/Carousel';
import { images } from './imgs/images';
import { UserContext } from './UserContext';
import { useContext } from 'react';

const IMG_SIZE = 250;

export default function AdoptionMoreInfoScreen({ navigation, route }) {
  // Get the params from the route
  const { data } = route.params;
  const user = useContext(UserContext);
  const [visible, setVisible] = React.useState(false);
  const [adoptPostulationText, setAdoptPostulationText] = React.useState('');
  const [emailText, setEmailText] = React.useState('');
  const [disableAdopt, setDisableAdopt] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setAdoptPostulationText('');
    setEmailText('');
    setVisible(false);
  };
  const handleAdopt = () => {
    hideModal();
    setDisableAdopt(true);
    data.applyToAdopt(data.id);
    navigation.navigate({ name: 'AdoptionList' });
  };
  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <View style={styles.petDetails}>
          <Carousel
            loop={true}
            width={IMG_SIZE}
            height={IMG_SIZE}
            autoPlay={false}
            data={images[data.pictures]}
            scrollAnimationDuration={1000}
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: 'center',
                }}
              >
                <Image style={styles.petImage} source={images[data.pictures][index]} />
              </View>
            )}
          />
          <Text style={styles.petName}>{data.title}</Text>
          <View style={styles.petFacts}>
            {[data.species, data.size, data.color, data.age, ...data.others].map((fact, index) => (
              <Chip key={index} mode="outlined" style={styles.petChip}>
                {fact}
              </Chip>
            ))}
          </View>
          <List.Item
            title="Descripción"
            description={data.description}
            descriptionNumberOfLines={null}
            left={() => <MaterialIcon name="description" size={24} color="red" />}
          />
          <List.Item
            title={data.contact.shelter}
            descriptionNumberOfLines={null}
            left={() => <MaterialIcon name="house" size={24} color="blue" />}
          />
          <List.Item
            title={'$' + data.amount}
            descriptionNumberOfLines={null}
            left={() => <MaterialIcon name="monetization-on" size={24} color="green" />}
          />
        </View>
      </List.Section>
      <MapView
        style={styles.map}
        region={{
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Circle
          center={{
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          }}
          radius={200}
          fillColor="rgba(255, 0, 0, 0.2)"
        />
      </MapView>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={true} style={{ marginTop: 10 }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 28,
                marginBottom: 10,
              }}
            >
              Adoptar a {data.title}
            </Text>
            <TextInput
              style={styles.longTextInput}
              multiline
              maxLength={120}
              label="Escriba un breve comentario"
              value={adoptPostulationText}
              onChangeText={setAdoptPostulationText}
            />
            <TextInput
              style={styles.textInput}
              label="Email de contacto"
              value={emailText}
              onChangeText={setEmailText}
              keyboardType="email-address"
            />
          </ScrollView>
          <Button
            style={styles.button}
            disabled={disableAdopt}
            onPress={handleAdopt}
            icon="paw"
            mode="contained"
          >
            Postulate para la adopción
          </Button>
          <Button style={styles.button} onPress={hideModal}>
            Cerrar
          </Button>
        </Modal>
      </Portal>
      <List.Item
        title={`Adoptar a ${data.title}`}
        left={() => <MaterialIcon name="pets" size={24} color="orange" />}
        onPress={showModal}
        disabled={data.applicants.includes(user.id)}
      />
      <List.Item
        title={`${data.contact.email}`}
        left={() => <MaterialIcon name="email" size={24} color="blue" />}
        onPress={() => console.log('Send email')}
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
  },
  longTextInput: {
    margin: 5,
    type: 'outlined',
    width: '100%',
    minHeight: 100,
  },
  textInput: {
    margin: 5,
    type: 'outlined',
    width: '100%',
  },
  modal: {
    backgroundColor: '#f5fcff',
    padding: 20,
    margin: 15,
    flexShrink: 1,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
  },
});
