import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AdoptionCard from './AdoptionCard';
import { useDataFetch, useDataStore } from './useStorage';
import { UserContext } from './UserContext';
import { useContext } from 'react';

export default function AdoptionList({ route, navigation }) {
  const user = useContext(UserContext);
  const { data: petAdoptions, isLoading } = useDataFetch({ key: 'adoptioncarddata' });
  const { mutateAsync } = useDataStore({
    keysToInvalidate: ['adoptioncarddata'],
    onSuccess: () => console.log('success!'),
    onError: () => console.log('error!'),
    method: 'PATCH',
  });

  const applyToAdopt = (petAdoptionId) => {
    mutateAsync({
      key: 'adoptioncarddata',
      id: petAdoptionId,
      value: {
        applicants: [...petAdoptions.filter((p) => p.id === petAdoptionId)[0].applicants, user.id],
      },
    }).then(() => {
      console.log('Saved new apply to adopt');
    });
  };

  if (isLoading)
    return (
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        ></ScrollView>
      </SafeAreaView>
    );
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {petAdoptions &&
          petAdoptions.map((pet, index) => (
            <AdoptionCard key={index} {...pet} applyToAdopt={applyToAdopt} />
          ))}
      </ScrollView>
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
  },
  fabStyle: {
    bottom: 16,
    right: 14,
    position: 'absolute',
    backgroundColor: '#ee5b04',
  },
});
