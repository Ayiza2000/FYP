import { onPress } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes.js";
import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Button, Image,TextInput,TouchableOpacity,Alert} from 'react-native';
import {styles} from './styles/styles.js'
import url from "./Backend";

import { MMKVLoader } from "react-native-mmkv-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from "./Auth.js";
import { useNavigation } from '@react-navigation/native';

export default function ForgetPassword() {
  const navigation = useNavigation();
  const [email,setEmail]=useState("")
  const [code,setCode]=useState()
  const [showError,setError]=useState(false)
  const [showError2,setError2]=useState(false)
  const [message,setMessage]=useState('')
  const [NewPassword,setNewPassword]=useState('')
  const [allowResetPassword,setResetPassword]=useState(false)
//     constructor(props) {
//     super(props);
//     this.state = {
//       email:'',
//       password:'',
//       API_URL: 'https://backendd.loca.lt'
//     };
// }

    return(
<View style={styles.container}>
<View style={{flex:0.20}}>
  <View style={{flex:0.10}}>
  
  </View>
  {/* <TouchableOpacity onPress={()=>{navigation.navigate('HomeScreen')}} >
  <Text style={{paddingLeft:"80%", color:"#4266f5", fontWeight:'bold', fontSize:16 }}> Skip</Text>
  </TouchableOpacity> */}
</View>
<View style={{flex:0.25,alignItems:'center'}}>
{/* <Image style={styles.Image} source={require('./public/default.png')}></Image>
<View>
  { showError?
  <View style={{marginTop:15,marginBottom:15,backgroundColor:'#C5C6D0', width:300,height:30,alignItems:'center',justifyContent:'center'}}>
                     <Text style={{color:'red'}}>Email OR Password is incorrect!!!</Text>

       </View>:
        <View style={{marginTop:15,marginBottom:15,backgroundColor:'#ffcbd1', width:300,alignItems:'center'}}>

        </View>
}
       </View> */}
  <View style={{marginBottom:20}}>
<View  style={styles.container2}>
      <View style={styles.labelContainer}>
      <Text> Email </Text>
      </View>
        <TextInput
          style={styles.input}
          onChangeText={(useremail)=>{setEmail(useremail)}}
        />
        </View>
        </View>
        <View style={{marginBottom:20}}>
        <View  style={styles.container3}>
      <View style={styles.labelContainer}>
      <Text> Code </Text>
      </View>

        <TextInput
          style={styles.input}
          onChangeText={(credential)=>{
            if(showError==true || showError2==true){
                setError(false)
                setError2(false)
            }
            setCode(credential)}}
          keyboardType={"numeric"}
          maxLength={4}
          
        />
         
       
        </View>
       
        </View>

        <View style={{paddingLeft:'40%',flexDirection:'row'}}>
        
     
        </View>

        <TouchableOpacity
          style={styles.button} onPress={()=>{ if(code.toString().length<4){
            
          setError(true)
          }
          else{
            fetch(`${url}/verifyCode`,{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
              
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email,code})
              }).then( async res=>{
              try{
              console.log(res)
              
              const response=await res.json()
              
              if(res.status==200){
              console.log('response',response)
                setResetPassword(true)
              }
              else if(res.status==400){
                setError2(true)
                setMessage(response.message)
              
              }
              }
              catch(e){
              
              console.log('There has been a problem with your fetch operation: ' + e.message);
              
              }
              }
              ).catch((e)=>{console.log(e)})
          }
          }}>
        <Text style={styles.buttonText}> Verify Code</Text>   
        
       
            </TouchableOpacity>
{ showError===true &&
            <Text style={{marginTop:10,color:'red'}}>Code must be of 4 digits </Text>
}
{ showError2===true &&
            <Text style={{marginTop:10,color:'red'}}>{message} </Text>
}

{/* { showError2  ?
            <Text style={{marginTop:10,color:'red'}}>{showError2} </Text>:
            <View  style={styles.container3}>
      <View style={styles.labelContainer}>
      <Text> New Password </Text>
      </View>

        <TextInput
          style={styles.input}
          onChangeText={(credential)=>{
            if(showError==true){
                setError(false)
            }
            setCode(credential)}}
         
        
          
        />
         
       
        </View>
       

}       */}

{allowResetPassword===true && 
<View style={{marginTop:20,marginBottom:20}}>
<View  style={styles.container3}>
      <View style={styles.labelContainer}>
      <Text> New Password </Text>
      </View>

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(credential)=>{
            if(showError==true){
                setError(false)
            }
            setNewPassword(credential)}}
         
        
          
        />
         </View>
         <View style={{marginTop:20}}>
         <TouchableOpacity
          style={styles.button} onPress={()=>{ 
            
            if(code.toString().length<4){
            
          setError(true)
          }
          else{
            fetch(`${url}/resetPassword`,{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
              
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email,password:NewPassword})
              }).then( async res=>{
              try{
              console.log(res)
              
              const response=await res.json()
              
              if(res.status==200){
              console.log('response',response)
              Alert.alert(
                'Reset Password',
                'Your Password has been resetted successfully!!!',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('SignIn'),
                    style: 'cancel',
                  },
                ],
                )
              }
          
              }
              catch(e){
              
              console.log('There has been a problem with your fetch operation: ' + e.message);
              
              }
              }
              ).catch((e)=>{console.log(e)})
          }
          }}>
        <Text style={styles.buttonText}> Reset Password</Text>   
        
       
            </TouchableOpacity>

            </View>
        
        </View>
        }





</View>

</View>



    )



}