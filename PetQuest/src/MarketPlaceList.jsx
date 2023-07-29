import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import MarketPlaceCard from './MarketPlaceCard';
import MarketPlaceCardData from './MarketPlaceCardData';

const petMarketPlacesHardcoded = MarketPlaceCardData;

export default function MarketPlaceList({ route, navigation }) {
  const [petMarketPlaces, setPetMarketPlaces] = useState(petMarketPlacesHardcoded);
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {petMarketPlaces.map((pet, index) => (
          <MarketPlaceCard key={index} {...pet} />
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
});
