import { useState, useMemo } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native'
import { PawPrint, Bell, Search, CatIcon, BirdIcon, DogIcon, DotIcon } from "lucide-react-native";

const pets = [
  {
    id: 1,
    name: 'Buddy',
    image: 'https://via.placeholder.com/150',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
  },
  {
    id: 2,
    name: 'Buddy',
    image: 'https://via.placeholder.com/150',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
  },
  {
    id: 3,
    name: 'Buddy',
    image: 'https://via.placeholder.com/150',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
  },
  {
    id: 4,
    name: 'Buddy',
    image: 'https://via.placeholder.com/150',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
  },
]

const Home = () => {
  const [query, setQuery] = useState('');
  const [species, setSpecies] = useState(null);


  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return pets.filter((pet) => {
      const matchesSpecies = !species || pet.species === species;

      const matchesQuery =
        !q ||
        pet.name.toLowerCase().includes(q) ||
        pet.breed.toLowerCase().includes(q) ||
        pet.shelter.toLowerCase().includes(q);

      return matchesSpecies && matchesQuery;
    });
  }, [query, species]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <PawPrint size={22} color="#22A55B" />
          <Text style={styles.logoText}>PawMatch</Text>
        </View>
        <View style={styles.notification}>
          <Bell size={22} color="#555" />
        </View>
      </View>
      <View style={styles.textInput}>
        <Search size={16} color='#6B7280' />
        <TextInput style={styles.input} placeholder='Search for dogs, breeds, shelters...' />
      </View>
      <View styles={styles.species}>
        <View style={styles.species}>
          <Pressable style={styles.petIcon}>
            <DogIcon />
            {/* <Text>Dogs</Text> */}
          </Pressable>

          <Pressable style={styles.petIcon}>
            <CatIcon />
            {/* <Text>Cats</Text> */}
          </Pressable>

          <Pressable style={styles.petIcon}>
            <BirdIcon />
            {/* <Text>Birds</Text> */}
          </Pressable>

          <Pressable style={styles.petIcon}>
            <Text>...</Text>
          </Pressable>
        </View>
      </View>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 10,
  },

  logoText: {
    fontFamily: 'inter',
    fontSize: 20,
    fontWeight: 700,
    color: '#000'
  },

  input: {
    // backgroundColor: '#F4F6F8'
    color: '#333',
    width: 350,
    height: 41,
  },

  textInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F4F6F8',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingBottom: 4,

  },

  species: {
    width: 390,
    height: 61,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  petIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#F4F6F8',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  }
})