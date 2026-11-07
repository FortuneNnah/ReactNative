import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { router, Stack, useFocusEffect } from 'expo-router'
import Button from './components/Button'
import { LinearGradient } from 'expo-linear-gradient'
import Logo from '../components/Logo'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// Overlay stops: [position from the top of the screen (0 to 1), black opacity (0 to 1)].
// Measured from the reference design. Change OVERLAY_STRENGTH to make the whole overlay lighter (below 1) or darker (above 1).
const OVERLAY_STOPS = [
  [0.00, 0.50],
  [0.06, 0.42],
  [0.12, 0.33],
  [0.18, 0.24],
  [0.24, 0.14],
  [0.30, 0.05],
  [0.33, 0.05],
  [0.37, 0.18],
  [0.41, 0.30],
  [0.45, 0.42],
  [0.49, 0.53],
  [0.54, 0.62],
  [0.60, 0.66],
  [0.70, 0.70],
  [0.80, 0.76],
  [0.90, 0.84],
  [1.00, 0.90],
]
const OVERLAY_STRENGTH = 1
const OVERLAY_COLORS = OVERLAY_STOPS.map(
  ([, opacity]) => `rgba(0,0,0,${Math.min(opacity * OVERLAY_STRENGTH, 1).toFixed(3)})`
)
const OVERLAY_LOCATIONS = OVERLAY_STOPS.map(([position]) => position)

const slides = [
  {
    id: 'welcome',
    image: require('../assets/image/Dog6.jpg'),
    headline: 'Your new best friend is waiting.',
    subtitle:
      'Discover loving dogs looking for a forever home and find the companion that fits your life perfectly.',
  },
  // Add three more slides here to create the four-slide onboarding carousel.
]

const AnimatedImage = Animated.createAnimatedComponent(Image)

const Index = () => {
  const insets = useSafeAreaInsets()
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [previousSlideIndex, setPreviousSlideIndex] = useState(null)
  const dotWidths = useRef(
    slides.map((_, index) => new Animated.Value(index === 0 ? 18 : 6)),
  ).current
  const imageFade = useRef(new Animated.Value(0)).current
  const textFade = useRef(new Animated.Value(1)).current
  const slideAnimation = useRef(null)

  const showSlide = useCallback((nextIndex) => {
    if (nextIndex === currentSlideIndex) return

    slideAnimation.current?.stop()
    setPreviousSlideIndex(currentSlideIndex)
    setCurrentSlideIndex(nextIndex)
    imageFade.setValue(0)
    textFade.setValue(0)

    slideAnimation.current = Animated.parallel([
      Animated.timing(imageFade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(textFade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ])

    slideAnimation.current.start(({ finished }) => {
      if (finished) setPreviousSlideIndex(null)
    })
  }, [currentSlideIndex, imageFade, slideAnimation, textFade])

  useFocusEffect(
    useCallback(() => {
      if (slides.length === 1) return undefined

      const timer = setTimeout(() => {
        showSlide((currentSlideIndex + 1) % slides.length)
      }, 5000)

      return () => clearTimeout(timer)
    }, [currentSlideIndex, showSlide]),
  )

  useEffect(() => {
    dotWidths.forEach((width, index) => {
      Animated.timing(width, {
        toValue: index === currentSlideIndex ? 18 : 6,
        duration: 200,
        useNativeDriver: false,
      }).start()
    })
  }, [currentSlideIndex, dotWidths])

  useEffect(() => () => slideAnimation.current?.stop(), [slideAnimation])

  const currentSlide = slides[currentSlideIndex]
  const previousSlide =
    previousSlideIndex === null ? null : slides[previousSlideIndex]
  const previousTextFade = textFade.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" translucent />

      <ImageBackground
        source={previousSlide?.image ?? currentSlide.image}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Single black overlay: darker at the top, clear on the face, darker toward the bottom */}
        <LinearGradient
          pointerEvents="none"
          colors={OVERLAY_COLORS}
          locations={OVERLAY_LOCATIONS}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {previousSlide && (
          <AnimatedImage
            source={currentSlide.image}
            style={[
              StyleSheet.absoluteFill,
              { opacity: imageFade, zIndex: -1 },
            ]}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        )}

        <View style={[styles.content, { paddingBottom: insets.bottom + 16 }]}>
          <Logo layout="inline" iconSize={28} textSize={20} />

          <View style={styles.copy}>
            {previousSlide && (
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.previousCopy,
                  { opacity: previousTextFade },
                ]}
              >
                <Text style={styles.headline} accessibilityRole="header">
                  {previousSlide.headline}
                </Text>
                <Text style={styles.subtitle}>{previousSlide.subtitle}</Text>
              </Animated.View>
            )}
            <Animated.View style={{ opacity: textFade }}>
              <Text style={styles.headline} accessibilityRole="header">
                {currentSlide.headline}
              </Text>
              <Text style={styles.subtitle}>{currentSlide.subtitle}</Text>
            </Animated.View>
          </View>

          {slides.length > 1 && (
            <View style={styles.dots}>
              {slides.map((slide, index) => (
                <Pressable
                  key={slide.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Slide ${index + 1} of ${slides.length}`}
                  accessibilityState={
                    index === currentSlideIndex
                      ? { selected: true }
                      : undefined
                  }
                  onPress={() => showSlide(index)}
                  hitSlop={8}
                  style={styles.dotTouchTarget}
                >
                  <Animated.View
                    style={[
                      styles.dot,
                      {
                        width: dotWidths[index],
                        backgroundColor:
                          index === currentSlideIndex
                            ? '#22A55B'
                            : 'rgba(255, 255, 255, 0.4)',
                      },
                    ]}
                  />
                </Pressable>
              ))}
            </View>
          )}

          <View style={styles.buttons}>
            <Button
              title="Get Started"
              onPress={() => router.push('/About')}
              variant="primary"
              style={styles.primaryButton}
              textStyle={styles.buttonText}
            />
            <Button
              title="Log In"
              onPress={() => router.push('/About')}
              variant="outline"
              style={styles.outlineButton}
              textStyle={styles.buttonText}
            />
          </View>

          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/signup')}
              style={styles.signUpButton}
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  // Full-screen photo background.
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },

  // Bottom-anchored landing copy, pagination, and calls to action.
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
  },
  // Slide copy stays layered for the cross-fade.
  copy: {
    position: 'relative',
    marginTop: 16,
  },
  previousCopy: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  headline: {
    maxWidth: 300,
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14,
    lineHeight: 21,
  },
  // Slide pagination dots.
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  dotTouchTarget: {
    minHeight: 24,
    justifyContent: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  // Primary and outline calls to action.
  buttons: {
    gap: 12,
    marginTop: 24,
  },
  primaryButton: {
    height: 52,
    borderRadius: 12,
  },
  outlineButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  buttonText: {
    fontWeight: '600',
  },
  // Account sign-up prompt and touch target.
  signUpRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  signUpText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
  },
  signUpButton: {
    minHeight: 44,
    justifyContent: 'center',
  },
  signUpLink: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
})