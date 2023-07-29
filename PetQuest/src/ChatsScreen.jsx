import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Chats!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
