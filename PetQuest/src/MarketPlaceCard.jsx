import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const MarketPlaceCard = (props) => {
  const image = () => <Image style={{ width: 310, height: 200 }} source={props.pictures[0]} />;
  const navigation = useNavigation();
  return (
    <Card style={styles.card}>
      <Card.Title
        title={<Text>{props.title}</Text>}
        titleStyle={{ marginTop: 230, width: 300, marginLeft: -85 }}
        titleVariant={'titleLarge'}
        left={image}
        leftStyle={{ width: 70, height: 70 }}
      />
      <Card.Content>
        <View style={styles.chipsContainer}>
          <Text>{props.description}</Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Text style={styles.amountText}>{'$' + props.amount}</Text>
            <Text style={styles.discountAmountText}>{props.discount}</Text>
          </View>

          <Button
            mode="contained"
            buttonColor="#f4511e"
            onPress={() => navigation.navigate('MarketPlaceMoreInfoScreen', { data: props })}
          >
            Ver más
          </Button>
        </View>
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
    paddingTop: 10,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    margin: 3,
  },
  amountText: {
    color: '#53c029',
    fontSize: 30,
  },
  discountAmountText: {
    color: '#53c029',
    fontSize: 12,
  },
});

export default MarketPlaceCard;
