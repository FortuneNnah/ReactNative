// components/Button.jsx
import { Pressable, Text, StyleSheet } from 'react-native'

const Button = ({ title, onPress, style, textStyle, variant = 'default' }) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    style={({ pressed }) => [
      styles.button,
      variant === 'primary' && styles.primary,
      variant === 'outline' && styles.outline,
      style,
      pressed &&
        (variant === 'outline'
          ? styles.outlinePressed
          : variant === 'primary'
            ? styles.primaryPressed
            : styles.defaultPressed),
    ]}
  >
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </Pressable>
)

export default Button

const styles = StyleSheet.create({
  // Shared button base and opt-in visual variants.
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#22A55B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#22A55B',
  },
  primaryPressed: {
    backgroundColor: '#1C8E4E',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  outlinePressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  defaultPressed: {
    opacity: 0.85,
  },
  // Shared button label typography.
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
})