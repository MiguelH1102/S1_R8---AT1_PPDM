import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../../assets/home.png')}
    style={styles.container}
    resizeMode="cover">
    <View style={styles.container}>

      <StatusBar style="auto" />

      <Text style={styles.title}>
        Pokédex
      </Text>

      <Text style={styles.description}>
        Explore diversos Pokémons e veja seus detalhes
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('PokemonsScreen')
        }
      >

        <Text style={styles.text}>
          Pokémons
        </Text>

      </TouchableOpacity>

    </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',

    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: '#ffffff',

    textAlign: 'center',

    lineHeight: 23,

    marginBottom: 25,

    maxWidth: 350,
  },

  button: {
    backgroundColor: '#f12116',

    paddingVertical: 12,
    paddingHorizontal: 20,

    borderRadius: 8,

    alignItems: 'center',
    justifyContent: 'center',

    width: '95%',

    marginBottom: 10,
  },

  text: {
    color: '#fff',

    fontSize: 16,

    fontWeight: '600',
  },

});


