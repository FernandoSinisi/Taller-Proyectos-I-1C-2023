import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigationBar from './src/BottomNavigationBar';
import { registerRootComponent } from 'expo';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContext } from './src/UserContext';
import { LogBox } from 'react-native';

const queryClient = new QueryClient();

function App() {
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ id: process.env.USER_ID }}>
          <PaperProvider>
            <BottomNavigationBar />
          </PaperProvider>
        </UserContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

registerRootComponent(App);
export default App;
