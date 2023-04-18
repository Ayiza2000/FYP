import React, { useState, useEffect } from 'react';
import { View,Text ,StyleSheet,Image,FlatList,TouchableOpacity,Alert} from "react-native";
import { useIsFocused } from '@react-navigation/native'
import url from "./Backend";





export default function Followers({navigation,route}){
  const [Data,setData]=useState('')
  const isFocused = useIsFocused();

    useEffect(() => {
        fetch(`${url}/getFollower`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
          
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:route.params.email} )
          })
          .then((response) => response.json())
          .then((responseJson) => {
        setData(responseJson)
        console.log('Data',Data)
          })
          .catch((error) => {
            console.error(error);
          });
      }, [isFocused]);

      return (
        // Flat List Item
        <View style={{backgroundColor:'white',flex:1}}>
        <FlatList data={Data}
style={{height:250}}
renderItem={({item, index})=>(
  <View >
    <TouchableOpacity onPress={()=>{navigation.navigate('Authors',{fname:item.firstName,lname:item.lastName,img:item.image,searchAuthorMail:item.otheruseremail,username:item.username})}}>
        <View style={{flexDirection:'row'}}>
           <View style={{flex:0.2,justifyContent:'center'}}>
        <Image 
    source={{
      uri: item.image
    }} 
    style={{width: 60, height: 60, borderRadius: 60/ 2}} 
  />
        </View>
          <View style={{flex:0.7,marginTop:10}}>
        <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>{item.firstName} {item.lastName}
        </Text>
        
        </View>

       
        </View>
        <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop:10
  }}
/>
</TouchableOpacity>
        </View>
        
        )}/>
        
        <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    
  }}
/>
        </View>
      );




}