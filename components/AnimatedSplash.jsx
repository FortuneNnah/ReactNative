import { useEffect, useRef } from 'react'
import {
    AccessibilityInfo,
    Animated,
    BackHandler,
    Easing,
    StyleSheet,
} from 'react-native'
import { PawPrint } from 'lucide-react-native'

const SPLASH_BACKGROUND = '#22A55B'
const SPLASH_TEXT_COLOR = '#FFFFFF'
const SPLASH_HOLD_MS = 4000
const SPLASH_EXIT_MS = 350
const SPLASH_ICON_SIZE = 120

const AnimatedSplash = ({ onFinish, onReady }) => {
    const splashOpacity = useRef(new Animated.Value(1)).current
    const iconScale = useRef(new Animated.Value(1)).current
    const textOpacity = useRef(new Animated.Value(0)).current
    const textTranslateY = useRef(new Animated.Value(14)).current
    const hasCalledReady = useRef(false)
    const onFinishRef = useRef(onFinish)

    onFinishRef.current = onFinish

    const handleLayout = () => {
        if (!hasCalledReady.current) {
            hasCalledReady.current = true
            onReady()
        }
    }

    useEffect(() => {
        let mounted = true
        const animations = []

        const startAnimations = (reduceMotion) => {
            if (!mounted) return

            if (reduceMotion) {
                textTranslateY.setValue(0)
            } else {
                const iconPop = Animated.sequence([
                    Animated.delay(200),
                    Animated.spring(iconScale, {
                        toValue: 1.1,
                        friction: 5,
                        useNativeDriver: true,
                    }),
                    Animated.spring(iconScale, {
                        toValue: 1,
                        friction: 5,
                        useNativeDriver: true,
                    }),
                ])
                animations.push(iconPop)
                iconPop.start()
            }

            const textAnimations = [
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]

            if (!reduceMotion) {
                textAnimations.push(
                    Animated.timing(textTranslateY, {
                        toValue: 0,
                        duration: 700,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                )
            }

            const textEntrance = Animated.sequence([
                Animated.delay(400),
                Animated.parallel(textAnimations),
            ])
            animations.push(textEntrance)
            textEntrance.start()
        }

        const exitTimer = setTimeout(() => {
            const exitAnimation = Animated.timing(splashOpacity, {
                toValue: 0,
                duration: SPLASH_EXIT_MS,
                useNativeDriver: true,
            })
            animations.push(exitAnimation)
            exitAnimation.start(({ finished }) => {
                if (finished) onFinishRef.current()
            })
        }, SPLASH_HOLD_MS)

        AccessibilityInfo.isReduceMotionEnabled()
            .then(startAnimations)
            .catch((error) => {
                console.warn('Could not read the reduced-motion setting.', error)
                startAnimations(false)
            })

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true,
        )

        return () => {
            mounted = false
            clearTimeout(exitTimer)
            backHandler.remove()
            animations.forEach((animation) => animation.stop())
        }
    }, [iconScale, splashOpacity, textOpacity, textTranslateY])

    return (
        <Animated.View
            accessible
            accessibilityLabel="PawMatch is loading"
            onLayout={handleLayout}
            style={[
                StyleSheet.absoluteFill,
                styles.root,
                { opacity: splashOpacity },
            ]}
        >
            <Animated.View style={{ transform: [{ scale: iconScale }] }}>
                <PawPrint
                    size={SPLASH_ICON_SIZE}
                    color={SPLASH_TEXT_COLOR}
                    strokeWidth={1.8}
                />
            </Animated.View>
            <Animated.Text
                style={[
                    styles.logoText,
                    {
                        opacity: textOpacity,
                        transform: [{ translateY: textTranslateY }],
                    },
                ]}
            >
                PawMatch
            </Animated.Text>
        </Animated.View>
    )
}

export default AnimatedSplash

const styles = StyleSheet.create({
    // Full-screen splash surface and centered logo text.
    root: {
        backgroundColor: SPLASH_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        elevation: 100,
    },
    logoText: {
        position: 'absolute',
        top: '50%',
        marginTop: SPLASH_ICON_SIZE / 2 + 20,
        color: SPLASH_TEXT_COLOR,
        fontSize: 34,
        fontWeight: '700',
        letterSpacing: -0.5,
        textAlign: 'center',
    },
})
