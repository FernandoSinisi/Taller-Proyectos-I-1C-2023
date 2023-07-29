import { createStackNavigator } from '@react-navigation/stack';
import ContactScreen from './ContactScreen';
import CreateAlert from './CreateAlert';
import AlertTopNavigationBar from './AlertTopNavigationBar';

const AlertsStack = createStackNavigator();

export default function AlertsScreen() {
  return (
    <AlertsStack.Navigator>
      <AlertsStack.Screen
        name="AlertList"
        component={AlertTopNavigationBar}
        options={{ title: 'Alertas', headerShown: false }}
      />
      <AlertsStack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: 'Contactar' }}
      />
      <AlertsStack.Screen
        name="CreateAlert"
        component={CreateAlert}
        options={{ title: 'Crear alerta de mascota' }}
      />
    </AlertsStack.Navigator>
  );
}
