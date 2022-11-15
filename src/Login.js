import { View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error){
            alert(error.message)
        }
    }

    return (
        <View style={{flex:1, backgroundColor:'#73648D'}}>

            <View style={{flex:1,  
            alignItems:'center', justifyContent:'flex-end', marginBottom:45}}>
                <View style={styles.card}>
                    <Text style={styles.title}>
                        LOGIN
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    
                    <TextInput
                        style={styles.input} 
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                    
                    <TouchableOpacity
                        onPress={() => loginUser(email, password)}
                        style={styles.button}>

                        <Text style={{fontWeight: 'bold', fontSize:18, color:'white'}}>LOGIN</Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>
                            Haven't registered yet?
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                        <Text style={{
                            marginTop:7,marginBottom:70, fontSize:18, height:25,
                            textAlign:'center', color:'#4C3575',fontWeight:'bold'}}>
                            REGISTER
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({

    container:{
        flex:1, borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },

    card:{
        flex:0.65, flexWrap:'auto',
        alignItems:'center', justifyContent:'center', 
        backgroundColor:"white",
        width:300, height:100,
        borderRadius:20,
    },

    title: {
        fontWeight: 'bold', fontSize:35, textAlign:'center', marginTop:5, marginBottom:30,
    },

    input: {
        marginTop:10, marginBottom:10, width:220,
        paddingBottom:10, fontSize:13, height:25,
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