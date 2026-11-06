import { StyleSheet, Text, View, Image } from 'react-native'
import { router, Stack } from 'expo-router'
import Button from './components/Button'
import { LinearGradient } from 'expo-linear-gradient'

const navigateToNextScreen = () => {
  router.push('/About')
}

const index = () => {
  const backgroundImage = require('../assets/image/Dog6.jpg')
  const LogoImage = require('../assets/image/Vector.png')

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Image
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Dark fade behind the text, separate from the content */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
        pointerEvents="none"
      />

      {/* Content pinned to the bottom */}
      <View style={styles.content}>
        <View style={styles.logo}>
          <Image source={LogoImage} style={styles.LogoImage} />
          <Text style={styles.logoText}>PawMatch</Text>
        </View>
        <Text style={styles.textcontent}>Your new best Friend is waiting.</Text>
        <Text style={styles.description}>
          Discover loving cats looking for a forever home and find the companion that fits your life perfectly.
        </Text>

        <View style={styles.buttonContainer}>
          <Button title="Get Started" onPress={navigateToNextScreen} />
          <Button
            title="Log In"
            onPress={navigateToNextScreen}
            style={styles.secondaryButton}
          />
        </View>
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },

  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  logo: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  LogoImage: {
    width: 20,
    height: 20,
    borderRadius: 8,
  },

  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },

  textcontent: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    letterSpacing: -0.8,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#e5e7eb',
    marginBottom: 24,
  },

  buttonContainer: {
    gap: 10,
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
  },
})