import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { images } from './imgs/images';

const AlertCard = (props) => {
  const image = () => {
    if (props.isDefault) {
      return <Image style={{ width: 70, height: 70 }} source={images[props.pictures][0]} />;
    }
    return (
      <Image
        style={{ width: 70, height: 70 }}
        source={{ uri: `data:image/jpeg;base64,${props.pictures[0]}` }}
      />
    );
  };
  const reward = () => (
    <Chip style={{ backgroundColor: '#A5DF00' }} icon={'cash'}>
      ${props.reward}
    </Chip>
  );
  const factChip = (property, index) => (
    <Chip
      key={index}
      mode="outlined"
      compact={true}
      textStyle={{ fontSize: 13, lineHeight: 14 }}
      height={26}
    >
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
        right={props.type === 'found' || (props.reward ?? 0) === 0 ? undefined : reward}
        rightStyle={{ marginRight: 10 }}
      />
      <Card.Content>
        <View style={styles.chipsContainer}>
          {[props.species, props.race, props.color, ...props.others].map(factChip)}
        </View>
        <Text>
          Lugar de {props.type === 'found' ? 'hallazgo' : 'extravío'}: a {props.lostPlaceDistance}m
        </Text>
        <Text>
          Fecha de {props.type === 'found' ? 'hallazgo' : 'extravío'}: {props.lostDate}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          buttonColor="#f4511e"
          onPress={() => navigation.navigate('Contact', { contact: props })}
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
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    margin: 3,
    padding: 3,
  },
});

export default AlertCard;
