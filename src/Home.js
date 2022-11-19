import { View, Text, StyleSheet, Pressable, FlatList, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import {firebase} from '../config'
import Swiper from 'react-native-deck-swiper'

 
const Home = () => {
    const [users, setUsers] = useState ([]);
    const todoRef = firebase.firestore().collection('users');

    useEffect(() => {
      (async () => {
        todoRef
        .onSnapshot(
          querySnapshot => {
            const users = []
            querySnapshot.forEach((doc) => {
              const { name, age, bio } = doc.data()
              users.push({
                id: doc.id,
                name,
                age,
                bio,
              })
            })
            setUsers(users)
          }
        )
      })();

    }, [])

  return (

    <View style = {styles.container}>
      <FlatList
        style = {{height:'100%', color:'blue'}}
        data = {users}
        numColumns={1}
        renderItem={({item}) => (
            <View style={styles.innerContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemName}>{item.age}</Text>
              <Text style={styles.itemName}>{item.bio}</Text>

            </View>
        )}
      />

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  innerContainer: {
    width: 350,
    height: 60,
    backgroundColor: '#E5D9B6',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  itemName: {

  },
  swiperContainer: {
    flex: 0.55
  },
  bottomContainer: {
    flex: 0.45,
    justifyContent: 'space-evenly'
  },
  bottomContainerMeta: { alignContent: 'flex-end', alignItems: 'center' },
  bottomContainerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cardImage: {
    width: 160,
    flex: 1,
    resizeMode: 'contain'
  },
  card: {
    flex: 0.45,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: 'black',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
});