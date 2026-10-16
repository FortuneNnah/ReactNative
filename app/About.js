import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import Button from './components/Button'
import { Checkbox} from 'expo-checkbox'

const cards = [
  { image: 'https://images.unsplash.com/vector-1741061132292-a6b38b6778dc?w=600&auto=format&fit=crop&q=60', title: 'Long hikes & adventures', description: 'High energy, active outdoor companion' },
  { image: 'https://plus.unsplash.com/premium_vector-1723228575247-23af0b7b7400?q=80&w=1170&auto=format&fit=crop', title: 'Cozy couch cuddles', description: 'Low energy, gentle, loves relaxation' },
  { image: 'https://images.unsplash.com/vector-1789106998095-4aa1d84f9a71?w=600&auto=format&fit=crop&q=60', title: 'Park playdates', description: 'Very social, loves dogs and children' },
  { image: 'https://plus.unsplash.com/premium_vector-1721649515865-ca0220d8eab1?w=600&auto=format&fit=crop&q=60', title: 'Backyard hangouts', description: 'Independent, content staying close to home' },
]

const navigateToNextScreen = () => {
  router.push('/Browse')
}

const About = () => {
  const [selected, setSelected] = useState([])

  const toggleCard = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head}>What does a perfect day with a cat look like?</Text>

      <View style={styles.content}>
        <View style={styles.cardsContainer}>
          {cards.map((card, index) => {
            const isSelected = selected.includes(index)

            return (
              <Pressable
                key={index}
                onPress={() => toggleCard(index)}
                style={[styles.card, isSelected && styles.selectedCard]}
              >
                <Image source={{ uri: card.image }} style={styles.image} />

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardDescription}>{card.description}</Text>
                </View>

                <Checkbox
                  value={isSelected}
                  onValueChange={() => toggleCard(index)}
                  color={isSelected ? '#22A55B' : undefined}
                  style={styles.checkbox}
                />
              </Pressable>
            )
          })}
        </View>

        <Button title="Next" onPress={navigateToNextScreen} />
      </View>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffbfb',
    flex: 1,
    paddingHorizontal: 24,
  },
  head: {
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 32,
    color: '#000',
    marginBottom: 7,
    paddingTop: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 70,
  },
  cardsContainer: {
    gap: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 12,
    padding: 12,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 1.5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardContent: {
    flex: 1, // lets long descriptions wrap instead of overflowing
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 3,
  },
  cardDescription: {
    color: '#8b8989',
  },
  selectedCard: {
    borderColor: '#22A55B',
    backgroundColor: '#E6F6EC',
  },
  checkbox: {
  width: 18,
  height: 19,
  borderRadius: 50,
},
})