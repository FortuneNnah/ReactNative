import { useRef } from 'react'
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { router, Stack } from 'expo-router'
import Button from './components/Button'
import { LinearGradient } from 'expo-linear-gradient'
import { PawPrint } from 'lucide-react-native'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurTargetView, BlurView } from 'expo-blur'

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

const Index = () => {
  const insets = useSafeAreaInsets()
  const blurTarget = useRef(null)

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" translucent />

      <BlurTargetView ref={blurTarget} style={StyleSheet.absoluteFill}>
        <ImageBackground
          source={require('../assets/image/Dog6.jpg')}
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
        </ImageBackground>
      </BlurTargetView>

      <BlurView
        blurTarget={blurTarget}
        blurMethod="dimezisBlurView"
        intensity={20}
        tint="light"
        style={[styles.logoBlur, { top: insets.top + 30 }]}
      >
        <View style={styles.logo}>
          <PawPrint width={28} color="#22A55B" />
          <Text style={styles.logoText}>PawMatch</Text>
        </View>
      </BlurView>

      <View style={[styles.content, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.copy}>
          <Text style={styles.headline} accessibilityRole="header">
            Your new best friend is waiting.
          </Text>
          <Text style={styles.subtitle}>
            Discover loving dogs looking for a forever home and find the
            companion that fits your life perfectly.
          </Text>
        </View>

        <View style={styles.buttons}>
          <Button
            title="Get Started"
            onPress={() => router.push('/SignUp')}
            variant="primary"
            style={styles.primaryButton}
            textStyle={styles.buttonText1}
          />
          <Button
            title="Log In"
            onPress={() => router.push('/SignIn')}
            variant="outline"
            style={styles.outlineButton}
            textStyle={styles.buttonText2}
          />
        </View>

        <View style={styles.signUpRow}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/SignUp')}
            style={styles.signUpButton}
          >
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
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

  // Positioned blur panel for the logo row.
  logoBlur: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  logo: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    height: 52,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    gap: 8,
  },

  logoText: {
    color: '#ffffff',
    fontFamily: 'inter',
    fontSize: 18,
    fontWeight: 700
  },
  // Bottom-anchored landing copy, pagination, and calls to action.
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 28,
    backgroundColor: '#fffcfc',
    height: 387,
  },
  // Headline and supporting copy spacing.
  copy: {
    marginTop: 16,
  },
  headline: {
    maxWidth: 300,
    color: '#000000',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 12,
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 14,
    lineHeight: 21,
  },
  // Primary and outline calls to action.
  buttons: {
    gap: 12,
    marginTop: 24,
  },
  primaryButton: {
    height: 52,
    borderRadius: 12,
    color: '#ffffff',
    paddingVertical: 12,
  },
  outlineButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#22A55B',
    color: 'rgba(0, 0, 0, 0.85)',
    paddingVertical: 12,

  },
  buttonText: {
    fontWeight: '600',
  },
  buttonText2: {
    fontWeight: '600',
    color: '#22A55B'
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
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 13,
  },
  signUpButton: {
    minHeight: 44,
    justifyContent: 'center',
  },
  signUpLink: {
    color: '#22A55B',
    fontSize: 13,
    fontWeight: '700',
  },
})