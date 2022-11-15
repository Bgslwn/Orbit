import { Text, View , TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const Registration = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')

    registerUser = async (email, password, name, age, bio, location) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url:'https://orbit-d853f.firebaseapp.com',
            })
            .then(() => {
                alert('Verification email sent')
            }).catch((error) => {
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    age,
                    bio,
                    location,
                    email,
                })
            })
            .catch((error) => {
                alert(error.message)
            })
        })
        .catch((error => {
            alert(error.message)
        }))
    }



    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                REGISTER
            </Text>

            <View style={{marginTop:10}}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={(name) => setName(name)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    onChangeText={(age) => setAge(age)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Bio"
                    onChangeText={(bio) => setBio(bio)}
                    autoCorrect={false}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    onChangeText={(location) => setLocation(location)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity
                onPress={() => registerUser(email, password, name, age, bio, location)}
                style={styles.button}>

                <Text style={{fontWeight: 'bold', fontSize:18, color:'white'}}>REGISTER</Text>
            </TouchableOpacity>

            <Text style={styles.text}>
                    Have an account already?
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{
                    marginTop:7,fontSize:18, height:25,
                    textAlign:'center', color:'#4C3575',fontWeight:'bold'}}>
                    LOGIN
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Registration

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    title: {
        fontWeight: 'bold', fontSize:40, textAlign:'center', marginTop:50, marginBottom:20,
    },

    input: {
        marginTop:10, marginBottom:10, width:220,
        paddingBottom:5, fontSize:13, height:20,
        borderBottomWidth:1, borderBottomColor:'#000',
        justifyContent:'center', textAlign:'left',
    },

    text: {
        marginTop:7,fontSize:14.5, height:25,
        textAlign:'center',
    },

    button:{
        marginTop:20, marginBottom:15, 
        height:50,
        width:180,
        backgroundColor:'#4C3575',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    }
})