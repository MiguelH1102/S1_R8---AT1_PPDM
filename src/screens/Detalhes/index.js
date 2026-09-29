import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert, TouchableOpacity,} from 'react-native';

import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';

import api from '../../api/api.js';

export default function DetalhesScreen() {

  const route = useRoute();
  const navigation = useNavigation();

  const { pokemonId } = route.params;

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPokemon();
  }, []);

  async function carregarPokemon() {
    try {

      const response = await api.get(
        `/pokemon/${pokemonId}`
      );

      setPokemon(response.data);

    } catch (error) {

      Alert.alert(
        'Erro',
        'Não foi possível carregar os detalhes do Pokémon.'
      );

    } finally {

      setLoading(false);

    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>

        <Text style={styles.loadingText}>
          Carregando Pokémon...
        </Text>

      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.loadingContainer}>

        <Text style={styles.loadingText}>
          Pokémon não encontrado.
        </Text>

      </View>
    );
  }

  const imagem =
    pokemon.sprites?.other?.['official-artwork']
      ?.front_default ||
    pokemon.sprites?.front_default;

  const nome =
    pokemon.name.charAt(0).toUpperCase() +
    pokemon.name.slice(1);

  return (
    <View style={styles.container}>

      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>

          <Text style={styles.headerTitle}>
            Detalhes
          </Text>

        </View>

        <View style={styles.imageContainer}>

          {imagem ? (
            <Image
              source={{ uri: imagem }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Text>
              Sem imagem
            </Text>
          )}

        </View>
        <View style={styles.nameContainer}>

          <Text style={styles.number}>
            #{String(pokemon.id).padStart(3, '0')}
          </Text>

          <Text style={styles.name}>
            {nome}
          </Text>

        </View>

        

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Tipos
          </Text>

          <View style={styles.typesContainer}>

            {pokemon.types?.map((item) => (

              <View
                key={item.type.name}
                style={styles.type}
              >

                <Text style={styles.typeText}>
                  {item.type.name.toUpperCase()}
                </Text>

              </View>

            ))}

          </View>

        </View>
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Informações
          </Text>

          <View style={styles.infoContainer}>

            <View style={styles.infoBox}>

              <Text style={styles.infoLabel}>
                ALTURA
              </Text>

              <Text style={styles.infoValue}>
                {pokemon.height / 10} m
              </Text>

            </View>

            <View style={styles.infoBox}>

              <Text style={styles.infoLabel}>
                PESO
              </Text>

              <Text style={styles.infoValue}>
                {pokemon.weight / 10} kg
              </Text>

            </View>

            <View style={styles.infoBox}>

              <Text style={styles.infoLabel}>
                XP BASE
              </Text>

              <Text style={styles.infoValue}>
                {pokemon.base_experience}
              </Text>

            </View>

          </View>

        </View>

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Habilidades
          </Text>

          {pokemon.abilities?.map((item) => (

            <View
              key={item.ability.name}
              style={styles.ability}
            >

              <Text style={styles.abilityText}>

                {item.ability.name
                  .charAt(0)
                  .toUpperCase() +
                  item.ability.name.slice(1)}

              </Text>

            </View>

          ))}

        </View>
        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Estatísticas
          </Text>

          {pokemon.stats?.map((item) => (

            <View
              key={item.stat.name}
              style={styles.statContainer}
            >

              <View style={styles.statHeader}>

                <Text style={styles.statName}>
                  {item.stat.name.toUpperCase()}
                </Text>

                <Text style={styles.statValue}>
                  {item.base_stat}
                </Text>

              </View>

              <View style={styles.progressBackground}>

                <View
                  style={[
                    styles.progress,
                    {
                      width: `${Math.min(
                        item.base_stat,
                        100
                      )}%`,
                    },
                  ]}
                />

              </View>

            </View>

          ))}

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f53016',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f3f2',
  },

  loadingText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#475569',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  backButton: {
    paddingVertical: 8,
    paddingRight: 15,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },

  imageContainer: {
    height: 300,
    marginHorizontal: 15,
    borderRadius: 20,

    backgroundColor: '#BFE3F5',

    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 280,
    height: 280,
  },

  nameContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  number: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f0f0f',
  },

  name: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0e0d0d',
    marginTop: 3,
  },

  section: {
    backgroundColor: '#BFE3F5',

    marginHorizontal: 15,
    marginBottom: 15,

    padding: 18,

    borderRadius: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',

    marginBottom: 14,
  },

  typesContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  type: {
    backgroundColor: '#BFE3F5',

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 20,
  },

  typeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
  },

  infoContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  infoBox: {
    flex: 1,

    backgroundColor: '#fcf8f8',

    padding: 12,

    borderRadius: 12,
  },

  infoLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',

    letterSpacing: 1,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',

    marginTop: 4,
  },

  ability: {
    backgroundColor: '#BFE3F5',

    padding: 12,

    borderRadius: 10,

    marginBottom: 8,
  },

  abilityText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },

  statContainer: {
    marginBottom: 14,
  },

  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 6,
  },

  statName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },

  statValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#334155',
  },

  progressBackground: {
    height: 8,

    backgroundColor: '#f0e2e2',

    borderRadius: 10,

    overflow: 'hidden',
  },

  progress: {
    height: 8,

    backgroundColor: '#3B82F6',

    borderRadius: 10,
  },

});