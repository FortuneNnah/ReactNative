// components/Button.jsx
import { Pressable, Text, StyleSheet } from 'react-native'

const Button = ({ title, onPress, style, textStyle }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.button, style, pressed && { opacity: 0.85 }]}
  >
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </Pressable>
)

export default Button

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#22A55B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
})