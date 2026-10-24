import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { PawPrint } from "lucide-react-native";
import { Bell } from "lucide-react-native";
import { Search } from "lucide-react-native"

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
      <View style={styles.textInput}>
        <Search size={16} color='#6B7280' />
        <TextInput style={styles.input} placeholder='Search for dogs, breeds, shelters...'/>
      </View>
      
    </View>
  )
} 

export default Home
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
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
  }, 

  input:{
    // backgroundColor: '#F4F6F8'
    color: '#333',
    width: 350,
    height: 41,
  },
  
  textInput:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F4F6F8',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingBottom: 4,

  },
})