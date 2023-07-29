import { createStackNavigator } from '@react-navigation/stack';
import AdoptionList from './AdoptionList';
import AdoptionMoreInfoScreen from './AdoptionMoreInfoScreen';

const AdoptionStack = createStackNavigator();

export default function AdoptionScreen() {
  return (
    <AdoptionStack.Navigator>
      <AdoptionStack.Screen
        name="AdoptionList"
        component={AdoptionList}
        options={{ title: 'Adopciones', headerShown: false }}
      />
      <AdoptionStack.Screen
        name="AdoptionMoreInfoScreen"
        component={AdoptionMoreInfoScreen}
        options={{ title: 'Contactar al refugio' }}
      />
    </AdoptionStack.Navigator>
  );
}
