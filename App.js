import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/Home';
import PokemonsScreen from './src/screens/Pokemons';
import DetalhesScreen from './src/screens/Detalhes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PokemonsScreen"
          component={PokemonsScreen}
          options={{ title: 'Pokémons' }}
        />
        <Stack.Screen
          name="DetalhesScreen"
          component={DetalhesScreen}
          options={{ title: 'Detalhes do Pokémon' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}