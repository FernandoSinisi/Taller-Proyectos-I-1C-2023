import { AnimatedFAB, Modal, Portal, Text, Button } from 'react-native-paper';
import { Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AlertCard from './AlertCard';
import { useDataFetch, useDataStore } from './useStorage';
import { useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import * as React from 'react';

const sortAlerts = (alerts) => {
  if (alerts) {
    alerts.sort((a, b) => a.lostPlaceDistance - b.lostPlaceDistance);
  }
  return alerts;
};

export default function AlertList({ navigation }) {
  const route = useRoute();
  const { data: petAlerts, isLoading } = useDataFetch({
    key: 'alertcarddata',
    refetchInterval: 5000,
  });

  const { mutateAsync: updateAsync } = useDataStore({
    keysToInvalidate: ['alertcarddata'],
    onSuccess: () => console.log('success!'),
    onError: () => console.log('error!'),
    method: 'PATCH',
  });

  const user = useContext(UserContext);
  console.log('me:', user.id);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const [foundPet, setFoundPet] = useState();
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    if (isLoading) return;
    const userFoundPets = petAlerts
      ?.filter((p) => p.userId === user.id)
      ?.filter((p) => p.found === true)
      ?.filter((p) => !p.notified);
    if (userFoundPets.length > 0) {
      setFoundPet(userFoundPets[0]);
      if (userFoundPets[0].type !== 'found') {
        setModalTitle('Tu mascota fue encontrada!');
        setModalContent('Te llegará un email con la información de contacto para ir a buscarla.');
      } else {
        setModalTitle('Apareció el dueño de la mascota que encontraste!');
        setModalContent('Le pasamos tus datos para que te contacte y vaya a buscarla.');
      }
      showModal();
    }
  }, [petAlerts]);

  if (isLoading)
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      ></ScrollView>
    );
  return (
    <SafeAreaView>
      <Portal>
        <Modal visible={isModalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Text variant="titleLarge">{modalTitle}</Text>
          <Text variant="bodyMedium">{modalContent}</Text>
          {foundPet && foundPet.type !== 'found' && (
            <Image
              source={{ uri: `data:image/jpeg;base64,${foundPet.foundPicture}` }}
              style={styles.image}
            />
          )}
          <Button
            onPress={() => {
              console.log('foundPet:', foundPet.id);
              updateAsync({
                key: 'alertcarddata',
                id: foundPet.id,
                value: { notified: true },
              }).then(() => hideModal());
            }}
          >
            Entendido
          </Button>
        </Modal>
      </Portal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {petAlerts &&
          sortAlerts(petAlerts)
            .filter((p) => {
              if (route.name === 'Reportados') return p.type === 'found';
              return p.type !== 'found';
            })
            .map((pet, index) => <AlertCard key={index} {...pet} />)}
      </ScrollView>
      <AnimatedFAB
        icon={'plus'}
        label={'Reportar'}
        extended={true}
        onPress={() => navigation.navigate('CreateAlert')}
        animateFrom={'left'}
        style={styles.fabStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#f6d7c1',
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 5,
    paddingBottom: 80,
  },
  fabStyle: {
    bottom: 16,
    right: 14,
    position: 'absolute',
    backgroundColor: '#ee5b04',
  },
  modal: {
    backgroundColor: '#f5fcff',
    padding: 20,
    margin: 15,
    flexShrink: 1,
    borderRadius: 10,
  },
  image: { width: 150, height: 150, alignSelf: 'center' },
});
