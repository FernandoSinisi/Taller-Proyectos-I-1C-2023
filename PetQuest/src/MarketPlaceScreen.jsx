import { createStackNavigator } from '@react-navigation/stack';
import MarketPlaceList from './MarketPlaceList';
import MarketPlaceMoreInfoScreen from './MarketPlaceMoreInfoScreen';

const MarketPlaceStack = createStackNavigator();

export default function MarketPlaceScreen() {
  return (
    <MarketPlaceStack.Navigator>
      <MarketPlaceStack.Screen
        name="MarketPlaceList"
        component={MarketPlaceList}
        options={{ title: 'MarketPlace', headerShown: false }}
      />
      <MarketPlaceStack.Screen
        name="MarketPlaceMoreInfoScreen"
        component={MarketPlaceMoreInfoScreen}
        options={{ title: 'Comprar' }}
      />
    </MarketPlaceStack.Navigator>
  );
}
