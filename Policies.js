import { onPress } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes.js";
import React, { Component, useState,useEffect } from "react";
import { StyleSheet, Text, View, Button, Image,TextInput,TouchableOpacity,FlatList} from 'react-native';
import {styles} from './styles/styles.js'
import AuthContext from "./Auth.js";
import { TabRouter } from "@react-navigation/native";
import url from "./Backend";
import { useNavigation } from '@react-navigation/native';

export default function Policies({route}) {
    const navigation = useNavigation();

const [Data,setData]=useState('')

useEffect(
  
    ()=>{
  
    fetch(`${url}/getPolicies`,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
  
          'Content-Type': 'application/json'
      },
      body: JSON.stringify( )
  }).then( async res=>{
  try{
    console.log(res)
  console.log('here78')
  const response=await res.json()
  
  if(res.status==200){
      console.log('responses',response)
       setData(response.policies)
  // this.setState({Data:response})
  
  }
  else{
    console.log(response)
  }
  }
  catch(e){
  
    console.log('There has been a problem with your fetch operation: ' + e.message);
  
  }
  }
  ).catch((e)=>{console.log(e)})
  
  
  },[]
  
  )

return(
    <View style={{flex:1,backgroundColor:'white'}}>
       
   <FlatList data={Data}
style={{height:250}}
renderItem={({item})=>(
    <Text style={{fontWeight:'bold', fontSize:16,color:'black',paddingBottom:10}}>{item.policy}</Text>
)}/>




    </View>
)





}