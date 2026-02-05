import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SecondScreen from './src/screens/SecondScreen';
import ThirdScreen from './src/screens/ThirdScreen';

type RootStackParamList = {
  Home: undefined;
  Second: undefined;
  Third: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Third">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Second" component={SecondScreen} options={{ title: 'Segunda' }} />
        <Stack.Screen name="Third" component={ThirdScreen} options={{ title: 'Terceira' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}