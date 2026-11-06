import { Stack } from 'expo-router'

const RootLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="About" options={{ headerShown: false }} />
            <Stack.Screen name="( dashboard )" options={{ headerShown: false }} />
        </Stack>
    )
}

export default RootLayout