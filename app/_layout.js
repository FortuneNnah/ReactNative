import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'

const RootLayout = () => {
    return (
        <Stack style={styles.container} screenOptions={{
            headerStyle: {
                backgroundColor: "#ffffff",
                elevation: 0,
                shadowOpacity: 0,
            },
            bodyStyle: {
                backgroundColor: '#ffffff',
            },
            headerTintColor: "#000",
        }}>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='About' options={{ headerTitle: "" }} />
            <Stack.Screen name='( dashboard )' options={{ headerShown: false }} />
            {/* <Stack.Screen name='Contact' options={{ headerTitle: false }} /> */}
        </Stack>
    )
}

export default RootLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
})