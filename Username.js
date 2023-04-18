import React, { Component, useState }  from "react";
import { StyleSheet, Text, View, Button, Image,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import {styles} from './styles/styles.js'
import url from "./Backend.js";

// function uniqueUsername(text){
    

//     fetch(`${API_URL}/username`,{
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
    
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify( text )
//     }).then( async res=>{
//     try{
//       console.log(res)
    
//     const response=await res.json()
    
//     if(res.status==200){
//         setMessage('')

//     }
//     else if(res.status==401){
//         setMessage(res.message)


//     }
//     }
//     catch(e){
    
//       console.log('There has been a problem with your fetch operation: ' + e.message);
    
//     }
//     }
//     ).catch((e)=>{console.log(e)})
// }


export default function Username ({navigation,route}){
 
  const [username,setUserName]=useState('')
  const [message,setMessage]=useState('')
  const [errormsg,showErrorMessage]=useState(false)
  const [email,setEmail]=useState(route.params.email)
  const [number,setNumber]=useState(Math.floor(1000 + Math.random() * 9000));
   
return(
<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
  <View style={{flex:0.2}}></View>
  <View style={{flex:0.8}}>
  <Text style={{paddingBottom:20,paddingLeft:10,paddingRight:10}}>Please note this 4 digit code somewhere <Text style={{color:'red'}}>{number}</Text> </Text>
    <Text style={{paddingBottom:20,paddingLeft:10,paddingRight:10}}>Pick a username for your account. You can change it later.</Text>
    <View  style={styles.container3}>

      <View style={styles.labelContainer}>
      <Text> UserName </Text>
      </View>
        <TextInput
          style={styles.input3}
          onChangeText={(name)=>{
            if(message!=''){
              setMessage('')
            }
            setUserName(name)}}
        />
             
    
        </View>
        {/* { errormsg ? */}
       <View style={{marginTop:15,marginBottom:5, width:300,height:30,alignItems:'center',justifyContent:'center'}}>
                             <Text style={{color:'red'}}>{message}</Text>
          </View>
       {/* </View>: <View style={{backgroundColor:'white'}}> </View>} */}
        <View style={{marginTop:20}}>
        <TouchableOpacity
          style={styles.button}
          onPress={async()=>{

   await fetch(`${url}/username`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
    
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {username:username,email:email,code:number })
    }).then( async res=>{
    try{
      console.log(res)
    
    const response=await res.json()
    
    if(res.status==200){
        setMessage('')
        
        navigation.navigate('Profile Picture',{Email:email})

    }
    else if(res.status==401){
        setMessage(response.message)
       console.log(response.message)
    }
    else if(res.status==402){
      setMessage(response.message)
      console.log(response.message)


  }
    }
    catch(e){
    
      console.log('There has been a problem with your fetch operation: ' + e.message);
    
    }
    }
    ).catch((e)=>{console.log(e)})





          }}>
        <Text style={styles.buttonText}> NEXT</Text>   
        
          
            </TouchableOpacity> 
            </View>
    </View>
   
</View>


)





}