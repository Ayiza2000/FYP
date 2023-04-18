import React, { Component, useState,useEffect  } from 'react';
import { FlatList, Alert, StyleSheet ,View, TouchableOpacity,Text,Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog from "react-native-dialog";
import url from "./Backend";
import { useIsFocused } from '@react-navigation/native'

import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';


export default function ReadingList ({navigation,route}){
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [listName,setListName]=useState('')
  const  [image,setImage]=useState('https://www.bahmansport.com/media/com_store/images/empty.png')
  const  [image2,setImage2]=useState('https://www.bahmansport.com/media/com_store/images/empty.png')
  const  [image3,setImage3]=useState('https://www.bahmansport.com/media/com_store/images/empty.png')
  const [Data,setData]=useState()
  const [newList,setNewList]=useState(false)
useEffect(
  
  ()=>{

  fetch(`${url}/getReadingList`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:route.params.email} )
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


},[newList,isFocused]

)


  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setVisible(false);
  };

  const handleSave = () => {

    fetch(`${url}/ReadingLists`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
  
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:route.params.email,listName} )
  }).then( async res=>{
  try{
    console.log(res)
  console.log('here78')
  const response=await res.json()
  
  if(res.status==200){
      console.log('responses',response)
      setVisible(false);
      setNewList(true)
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

  }
    return (

<View style={{flex:1,backgroundColor:'white'}}>
<View style={{flex:0.1,flexDirection:'row',marginTop:20}}>
<View style={{flex:0.7}}>
<Text style={{fontWeight:'bold',fontSize:22,color:'black'}}> Your Library</Text>
</View>
<View style={{flex:0.3}}>
<TouchableOpacity
          style={{alignItems: 'center',  backgroundColor: '#4266f5', textAlign:'center',
          borderRadius:30,
          justifyContent:'center',
          height:40,
           width:100,
         
           marginTop:5}} onPress={

           showDialog

           }>
              <Text style={{color:'white',fontSize:16,alignItems:'center'}}> Create List</Text>   
        </TouchableOpacity>

        <Dialog.Container visible={visible}>
            <Dialog.Title>Create List</Dialog.Title>
            <Dialog.Description>
              List Name
            </Dialog.Description>
            <Dialog.Input onChangeText={(text)=>{setListName(text)}}/>
            <Dialog.Button label="Save" onPress={handleSave} />          
              <Dialog.Button label="Cancel" onPress={handleDelete} />


          </Dialog.Container>


</View>
</View>

<View style={{flexDirection:'column',flex:0.8}}>

<FlatList data={Data}
style={{height:250}}
renderItem={({item})=>(
<TouchableOpacity  onPress={()=>{navigation.navigate('ViewList',{articleids:item.articleids,listName:item.listName})}}>
  <View style={{marginBottom:10}}> 
<View
  style={{
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
/>

<Text  style={{marginLeft:4,fontWeight:'bold',fontSize:16,marginLeft:20}}>{item.listName} </Text>
<View  style={{flexDirection:'row'}}>
  { item.image==undefined?
<Image 
  source={{
    uri:image,
  }} 
  style={{width: 80, height: 90,marginLeft:25}} 
/>:
<Image 
  source={{
    uri:item.image,
  }} 
  style={{width: 80, height: 90,marginLeft:25}} 
/>
}
{ item.image2==undefined?
<Image 
  source={{
    uri:image2,
  }} 
  style={{width: 80, height: 90,marginLeft:25}} 
/>:
<Image 
  source={{
    uri:item.image2,
  }} 
  style={{width: 80, height: 90,marginLeft:25}} 
/>
}
{ item.image3==undefined?
<Image 
  source={{
    uri:image3,
  }} 
  style={{width: 80, height: 90,marginLeft:25}} 
/>:
<Image 
  source={{
    uri:item.image3,
  }} 
  style={{width: 80, height: 90,marginLeft:25}} 
/>
}
</View>
</View>
</TouchableOpacity>
)}

/>

</View>

</View>

    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});