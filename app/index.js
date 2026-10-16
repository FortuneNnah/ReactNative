import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import { router } from 'expo-router'
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
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.95)']}
          locations={[0, 1]}
          style={styles.overlay}
        >
          <View style={styles.overlay}>
            <View style={styles.logo}>
              <Image source={LogoImage} style={styles.LogoImage} />
              <Text style={styles.logoText}>PawMatch</Text>
            </View>
            <Text style={styles.textcontent}>Your new best Friend is waiting.</Text>
            <Text style={styles.description}>
              Discover loving cats looking for a forever home and find the companion that fits your life perfectly.
            </Text>

            <View style={styles.buttonContainer}>
              <Button
                title="Get Started"
                onPress={navigateToNextScreen}
              />
              <Button
                title="Log In"
                onPress={navigateToNextScreen}
                style={styles.secondaryButton}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingHorizontal: 10,
    paddingBottom: 40,
  },

  logo: {
    marginBottom: 10,
    display: 'flex',
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
    fontFamily: 'inter',
    fontSize: 22,
    fontWeight: 700,
    color: '#fff'
  },

  textcontent: {
    width: '100%',
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    letterSpacing: -0.8,
  },

  description: {
    width: '100%',
    fontSize: 16,
    lineHeight: 24,
    color: '#e5e7eb',
    marginBottom: 24,
  },

  buttonContainer: {
    gap: 10,
  },

  secondaryButton: {
    backgroundColor: "transparent",
    borderColor: "#fff",
    borderWidth: 2,
  }
})