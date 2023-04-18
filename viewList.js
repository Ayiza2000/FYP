import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList , Image, TouchableOpacity} from 'react-native';
import { Button, Text, TextInput, View,StyleSheet } from 'react-native';
import url from './Backend';

export default function ViewList({navigation,route}){
const [Data,setData]=useState()
useEffect(
  ()=>{
navigation.setOptions({
  headerTitle: ()=>(
    <View >
  <Text style={{fontWeight:'bold',maxWidth:250,color:'black',fontSize:16,maxHeight:70,paddingTop:10}}>{route.params.listName}</Text>
  </View>)

})}
)


useEffect(()=>{

    fetch(`${url}/getReadingListData`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
    
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:route.params.email,articleids:route.params.articleids} )
    }).then( async res=>{
    try{
      console.log(res)
    console.log('here78')
    const response=await res.json()
    
    if(res.status==200){
        console.log('responses',response)
       setData(response)
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

},[])



return(
    <View style={{flex:1,backgroundColor:'white'}}>
      <FlatList data={Data}
style={{height:250}}
renderItem={({item})=>(
<TouchableOpacity onPress={()=>{navigation.navigate('HTML',{text:item.text,articleid:item.articleid,title:item.title})}}>
<View >
<View style={{flexDirection:'row', marginTop:10}}>
  <View style={{flex:0.2,marginLeft:25}}> 
<Image 
  source={{
    uri:item.image,
  }} 
  style={{width: 80, height: 80}} 
/>
</View>
<View style={{flex:0.8,marginLeft:25}}> 
  <Text style={{fontWeight:'bold',color:'black'}}>{item.title}</Text>
  </View>
  
  </View>
  <View
        style={{
     
          borderBottomWidth: StyleSheet.hairlineWidth,
         marginTop:4,
      }}
      
      />
  </View>

  </TouchableOpacity>
)}/>
    </View>
    
)



}