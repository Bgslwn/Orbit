import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config'

const UserProfile = () => {
    const [name, setName] = useState('')

    useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
            }
            else {
                console.log('User does not exist')
            }
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>
                Hello, {name.name}
            </Text>
            <TouchableOpacity
                onPress={() => {firebase.auth().signOut()}}
                style={styles.button}
            >
                <Text style={{fontSize:22, fontWeight:'bold'}}>
                    Sign out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:100,
    },
    button:{
        marginTop:50,
        height:70,
        width:250,
        backgroundColor:'#026efd',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    }
})