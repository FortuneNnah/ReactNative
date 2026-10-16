import { StyleSheet, Text, View } from 'react-native'


const Browse = () => {
  return (
    <View style={styles.container}>
      <Text>Browse</Text>
    </View>
  )
}

export default Browse

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})