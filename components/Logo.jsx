import { Image, StyleSheet, Text, View } from 'react-native'

const LOGO_IMAGE = require('../assets/image/Vector.png')

export const LogoIcon = ({ size = 28 }) => (
    <Image
        source={LOGO_IMAGE}
        style={[styles.icon, { width: size, height: size }]}
        resizeMode="contain"
        accessibilityLabel="PawMatch logo"
    />
)

const Logo = ({
    layout = 'inline',
    iconSize = 28,
    textSize = 20,
    textColor = '#FFFFFF',
}) => (
    <View style={layout === 'stacked' ? styles.stacked : styles.inline}>
        <LogoIcon size={iconSize} />
        <Text style={[styles.text, { fontSize: textSize, color: textColor }]}>
            PawMatch
        </Text>
    </View>
)

export default Logo

const styles = StyleSheet.create({
    // Shared logo layout and text styles.
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    stacked: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
    },
    icon: {},
    text: {
        fontWeight: '700',
        letterSpacing: -0.3,
    },
})
