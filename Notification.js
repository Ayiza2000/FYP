import React, {Component} from "react";
// var PushNotification = require("react-native-push-notification");
import { FlatList, Alert, StyleSheet ,View,Image,Text, TouchableOpacity} from 'react-native';
import url from './Backend';

export default class Notifications extends Component{
  
  constructor(props){
    super(props)
    console.log('props',props)
    console.log('props',props.route.params.email)
    this.state={
  data:'',
  email:props.route.params.email,

    }
    }
    
    componentDidMount(){

      fetch(`${url}/getNotifications`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
    
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:this.state.email})
    }).then( async res=>{
    try{
      console.log(res)
    
    const response=await res.json()
    
    if(res.status==200){
      console.log('response',response)
this.setState({data:response})
    }
    else if(res.status==401){

    }
    }
    catch(e){
    
      console.log('There has been a problem with your fetch operation: ' + e.message);
    
    }
    }
    ).catch((e)=>{console.log(e)})

    }
    render(){
     return (

      <View style={{flex:1}}>


<FlatList data={this.state.data}
//  keyExtractor={({item}) => item._id}

style={{height:120}}
renderItem={({item})=>(
  // console.log(item),
  // <View style={{paddingTop:3,paddingLeft:8}}>
    
 
  //   <View style={{flex:0.2,alignItems:'flex-end',paddingRight:15,marginBottom:2}}>
<TouchableOpacity   onPress={()=>{this.props.navigation.navigate("HTML",{text:item.text,articleid:item.articleid,
hideLike:true,
email:this.state.email,
title:item.articleTitle,


})}}>
    <View style={{flex:1,flexDirection:'column',backgroundColor:'white'}}> 
<View style={{flexDirection:'row',flex:0.8,justifyContent:'center',marginLeft:10,marginTop:5}}>
<View style={{flex:0.2}}>
     {/* <Text style={{color:"black",fontWeight:'450',fontSize:18}}>{item.description}</Text> */}
     <Image 
  source={{
    uri: item.imgUrl,
  }} 
  style={{width: 50, height: 50 ,borderRadius: 50/ 2}} 
/>
</View>
       <View style={{flex:0.8}}>
     <Text style={{fontSize:13}}>{item.body}  </Text>

     </View>
     




 


</View>
<View
        style={{
     
          borderBottomWidth: StyleSheet.hairlineWidth,
         marginTop:4,
         color:'grey'
      }}
      />
</View>
</TouchableOpacity>
)

}

/>




</View>

     )
    }
}