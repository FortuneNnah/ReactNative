import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import AnimatedSplash from '../components/AnimatedSplash'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
    const [showSplash, setShowSplash] = useState(true)

    const handleSplashReady = () => {
        SplashScreen.hideAsync().catch((error) => {
            console.warn('Could not hide the native splash screen.', error)
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="About" options={{ headerShown: false }} />
                <Stack.Screen name="( dashboard )" options={{ headerShown: false }} />
            </Stack>
            {showSplash && (
                <AnimatedSplash
                    onReady={handleSplashReady}
                    onFinish={() => setShowSplash(false)}
                />
            )}
        </View>
    )
}

export default RootLayout

const styles = StyleSheet.create({
    // Root surface behind the app stack and animated splash.
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
})