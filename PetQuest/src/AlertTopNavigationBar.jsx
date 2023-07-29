import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AlertList from './AlertsList';

const Tab = createMaterialTopTabNavigator();

export default function AlertTopNavigationBar() {
  return (
    <Tab.Navigator initialRouteName="Perdidos" screenOptions={{}}>
      <Tab.Screen name="Perdidos" component={AlertList} />
      <Tab.Screen name="Encontrados" component={AlertList} />
    </Tab.Navigator>
  );
}
