import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { images } from './imgs/images';
import { UserContext } from './UserContext';
import { useContext } from 'react';

const AdoptionCard = (props) => {
  const user = useContext(UserContext);
  const image = () => (
    <Image style={{ width: 70, height: 70 }} source={images[props.pictures][0]} />
  );
  const amountChip = () => {
    if (props.applicants.includes(user.id)) {
      return (
        <Chip style={{ backgroundColor: '#a6e745' }} icon={'timer-sand'}>
          Postulado
        </Chip>
      );
    }
  };
  const factChip = (property, index) => (
    <Chip key={index} mode="outlined" compact={true} textStyle={{ fontSize: 13, lineHeight: 14 }}>
      {property}
    </Chip>
  );
  const navigation = useNavigation();
  return (
    <Card style={styles.card}>
      <Card.Title
        title={props.title}
        titleVariant={'titleLarge'}
        left={image}
        leftStyle={{ width: 70, height: 70 }}
        right={amountChip}
        rightStyle={{ marginRight: 10 }}
      />
      <Card.Content>
        <View style={styles.chipsContainer}>
          {[props.species, props.size, props.color, props.age].map(factChip)}
        </View>
        <Text style={styles.textStyle}>Refugio: {props.contact.shelter}</Text>
        <Text>Zona: {props.contact.zone}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          buttonColor={'#f4511e'}
          onPress={() => navigation.navigate('AdoptionMoreInfoScreen', { data: props })}
        >
          Ver más
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    padding: 5,
  },
  textStyle: {
    paddingTop: 5,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    margin: 3,
    padding: 3,
  },
});

export default AdoptionCard;
