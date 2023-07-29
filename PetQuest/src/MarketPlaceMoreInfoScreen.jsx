import * as React from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { List, Chip, Modal, Portal, Button } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Circle } from 'react-native-maps';
import Carousel from 'react-native-reanimated-carousel/src/Carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const IMG_SIZE = 250;

export default function MarketPlaceMoreInfoScreen({ navigation, route }) {
  const [visibleBuy, setVisibleBuy] = React.useState(false);
  const [visibleBought, setVisibleBought] = React.useState(false);
  const showModal = () => setVisibleBuy(true);
  const hideModalBuy = () => {
    setVisibleBuy(false);
  };
  const hideModalBought = () => {
    setVisibleBought(false);
    setVisibleBuy(false);
    navigation.goBack();
  };
  const handleBuy = () => {
    setVisibleBought(true);
  };

  const { data } = route.params;

  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <View style={styles.petDetails}>
          <Carousel
            loop={true}
            width={IMG_SIZE}
            height={IMG_SIZE}
            autoPlay={false}
            data={data.pictures}
            scrollAnimationDuration={1000}
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: 'center',
                }}
              >
                <Image style={styles.petImage} source={data.pictures[index]} />
              </View>
            )}
          />
          <Text style={styles.petName}>{data.title}</Text>
          <View style={styles.petFacts}>
            {[data.species, data.brand, data.model, data.producer].map((fact, index) => (
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
            title={data.contact.zone}
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
      {visibleBought && visibleBuy ? (
        <Portal>
          <Modal
            visible={visibleBuy}
            onDismiss={hideModalBought}
            onPress={hideModalBought}
            contentContainerStyle={styles.modal}
          >
            <ScrollView showsVerticalScrollIndicator={true} style={{ marginTop: 10 }}>
              <Text
                onPress={hideModalBought}
                style={{
                  alignSelf: 'center',
                  fontSize: 15,
                  marginBottom: 10,
                }}
              >
                <Icon
                  style={{ alignSelf: 'center', fontSize: 25 }}
                  name="check"
                  size={25}
                  color="green"
                />
                {'   '}
                Gracias por tu compra de {data.title}!{'\n'}
                Te llegará más información a tu casilla de mail en la brevedad.
              </Text>
            </ScrollView>
          </Modal>
        </Portal>
      ) : (
        <Portal>
          <Modal visible={visibleBuy} onDismiss={hideModalBuy} contentContainerStyle={styles.modal}>
            <ScrollView showsVerticalScrollIndicator={true} style={{ marginTop: 10 }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 28,
                  marginBottom: 10,
                }}
              >
                ¿Estás seguro que deseas comprar {data.title}?
              </Text>
            </ScrollView>
            <Button style={styles.button} onPress={handleBuy} icon="paw" mode="contained">
              Sí!
            </Button>
            <Button style={styles.button} onPress={hideModalBuy}>
              No
            </Button>
          </Modal>
        </Portal>
      )}
      <List.Item
        title={`Comprar`}
        titleStyle={{ color: 'white' }}
        style={{
          color: 'white',
          alignContent: 'center',
          backgroundColor: 'green',
          borderRadius: 10,
          marginTop: 5,
          marginBottom: 20,
        }}
        left={() => (
          <AntDesign name="shoppingcart" size={24} color="white" style={{ marginLeft: 150 }} />
        )}
        onPress={showModal}
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
  modal: {
    backgroundColor: '#f5fcff',
    padding: 20,
    margin: 15,
    flexShrink: 1,
    borderRadius: 10,
  },
});
