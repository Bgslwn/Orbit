import { View, Text, TouchableOpacity, StyleSheet, Pressable, FlatList, SafeAreaView } from 'react-native'
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
              const { name, age, bio, location } = doc.data()
              users.push({
                id: doc.id,
                name,
                age,
                bio,
                location,
              })
            })
            setUsers(users)
          }
        )
      })();

    }, [])
  
  // const Card = ({ card }) => (
  //   <View style={styles.innerContainer}>
  //     <Text style={styles.itemName}>{card.name}</Text>
  //     <Text style={styles.itemName}>{card.age}</Text>
  //     <Text style={styles.itemName}>{card.bio}</Text>
  //     <Text style={styles.itemName}>{card.location}</Text>
  //     <TouchableOpacity
  //       style={styles.button}
  //       onPress={onPress}
  //     >
  //       <Text>{count}</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
  
  // const [index, setIndex] = React.useState(0);

  // const onPress = () => setConnect(connect == "Connect" ? "Connected" : "Connect");
  const [connect, setConnect] = useState("Display");
  
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
              <Text style={styles.itemName}>{item.location}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress = {() => setConnect(connect == "Display" ? 'Connected Now!' : 'Connect')}
              >
                <Text>{connect}</Text>
              </TouchableOpacity>
            </View>
        )}
      />

      {/* <Swiper
        cards={users}
        cardIndex={index}
        renderCard={card => <Card card={card} />}
      /> */}
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
    height: 130,
    backgroundColor: '#E5D9B6',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center'
  },
  button: {
    marginTop: 5,
    backgroundColor: "#A4BE7B",
    // paddingTop: 10,
    // paddingBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5

  },
});