import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AlertsScreen from './AlertsScreen';
import AdoptionScreen from './AdoptionScreen';
import ChatsScreen from './ChatsScreen';
import MarketPlaceScreen from './MarketPlaceScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Alertas"
        component={AlertsScreen}
        tabBarStyle={{
          backgroundColor: 'green',
        }}
        options={{
          tabBarLabel: 'Alertas',
          tabBarIcon: ({ color, size }) => {
            return <FeatherIcon name="alert-circle" size={size} color={'#ee5b04'} />;
          },
        }}
        headerTintColor={'#ee5b04'}
      />
      <Tab.Screen
        name="Adopciones"
        component={AdoptionScreen}
        options={{
          tabBarLabel: 'Adopciones',
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcon name="pets" size={size} color={'#ee5b04'} />;
          },
        }}
      />
      <Tab.Screen
        name="Marketplace"
        component={MarketPlaceScreen}
        options={{
          tabBarLabel: 'Marketplace',
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcon name="storefront" size={size} color={'#ee5b04'} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
