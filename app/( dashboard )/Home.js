import { StyleSheet, Text, View, Image } from 'react-native'
import { PawPrint } from "lucide-react-native";
import { Bell } from "lucide-react-native";
import { P } from "lucide-react-native"

const Home = () => {
    // const LogoImage = require('../../assets/image/Vector.png')

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <PawPrint size={22} color="#22A55B" />
          <Text style={styles.logoText}>PawMatch</Text>
        </View>
        <View style={styles.notification}>
          <Bell size={22} color="#555" />
        </View>
      </View>
    </View>
  )
} 

export default Home
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
  },

  logoContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 10,
  },

  logoText:{
    fontFamily: 'inter',
    fontSize: 20,
    fontWeight: 700,
    color: '#000'
  }
})