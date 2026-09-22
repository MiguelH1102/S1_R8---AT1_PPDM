import { StatusBar } from 'expo-status-bar';
import { useState, useCallback } from 'react';

import {StyleSheet, Text, View, FlatList, Alert, Image, TouchableOpacity, ImageBackground,
} from 'react-native';
import {useFocusEffect, useNavigation, } from '@react-navigation/native';

import api from '../../api/api.js';

export default function PokemonsScreen() {

  const navigation = useNavigation();

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarPokemons();
    }, [])
  );

  async function carregarPokemons() {

    try {

      setLoading(true);

      const response = await api.get('/pokemon?limit=50');

      const lista = response.data.results || [];

      const detalhes = await Promise.all(
        lista.map(async (pokemon) => {

          const responsePokemon = await api.get(
            `/pokemon/${pokemon.name}`
          );

          return responsePokemon.data;

        })
      );

      const dadosFormatados = detalhes.map((pokemon) => ({

        id: pokemon.id,

        name: pokemon.name,

        image:
          pokemon.sprites?.other?.['official-artwork']
            ?.front_default ||
          pokemon.sprites?.front_default ||
          null,

        type:
          pokemon.types?.[0]?.type?.name ||
          'Desconhecido',

      }));

      setPokemons(dadosFormatados);

    } catch (error) {

      Alert.alert(
        'Erro',
        'Não foi possível carregar os Pokémon.'
      );

    } finally {

      setLoading(false);

    }

  }

  function abrirDetalhes(item) {

    navigation.navigate('DetalhesScreen', {
      pokemonId: item.id,
    });

  }

  return (

    <ImageBackground
    source={require('../../../assets/pokedex.png')}
    style={styles.container}
    resizeMode="cover"
  >

      <StatusBar style="light" />

      <View style={styles.header}>

        <Text style={styles.titleScreen}>
          Pokémon
        </Text>

        <Text style={styles.subtitle}>
          POKÉDEX
        </Text>

      </View>

      <FlatList

        data={pokemons}

        keyExtractor={(item) =>
          String(item.id)
        }

        contentContainerStyle={styles.list}

        showsVerticalScrollIndicator={false}

        ListEmptyComponent={() => (

          <View style={styles.empty}>

            <Text style={styles.emptyText}>

              {loading
                ? 'Carregando Pokémon...'
                : 'Nenhum Pokémon encontrado.'
              }

            </Text>

          </View>

        )}

        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              abrirDetalhes(item)
            }
          >

            <View style={styles.imageContainer}>

              {item.image ? (

                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.image}
                  resizeMode="contain"
                />

              ) : (

                <Text style={styles.noImage}>
                  Sem imagem
                </Text>

              )}

            </View>

            <View style={styles.info}>

              <Text style={styles.number}>
                #{String(item.id).padStart(3, '0')}
              </Text>

              <Text style={styles.name}>

                {item.name
                  .charAt(0)
                  .toUpperCase() +
                  item.name.slice(1)
                }

              </Text>

              <Text style={styles.label}>
                TIPO
              </Text>

              <Text style={styles.type}>
                {item.type}
              </Text>

            </View>

          </TouchableOpacity>

        )}

      />

    </ImageBackground>

  );

}
const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,

    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },

  titleScreen: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E0F2FE',
    letterSpacing: 2,
    marginTop: 3,
  },

  list: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 25,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',

   
    backgroundColor: '#BFE3F5',

    borderRadius: 18,

    marginBottom: 14,

    padding: 12,

    minHeight: 150,

    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 5,
  },

  imageContainer: {
    width: 120,
    height: 125,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#E8F7FD',

    borderRadius: 14,
  },

  image: {
    width: 115,
    height: 120,
  },

  info: {
    flex: 1,
    marginLeft: 16,
  },

  number: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B6478',
  },

  name: {
    fontSize: 19,
    fontWeight: '800',
    color: '#123447',
  },

  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#477589',
    letterSpacing: 1,
    marginTop: 8,
  },

  type: {
    fontSize: 15,
    fontWeight: '600',
    color: '#234F63',
    textTransform: 'capitalize',
  },
  empty: {
    padding: 20,
    alignItems: 'center',
  },

  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  noImage: {
    color: '#475569',
  },

});