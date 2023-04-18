import React, { useEffect,Component } from 'react';
import { useWindowDimensions,View ,TextInput,StyleSheet,Text,FlatList,Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderHtml from 'react-native-render-html';
import url from "./Backend";
import { MenuProvider } from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

//   import {styles} from './styles/styles.js'


  export default class Comment extends Component{

    constructor(props){
      super(props)
      console.log('props',props)
      console.log('props',props.route.params.articleid)
      this.state={
     articleid:props.route.params.articleid,
     data:'',
     email:props.route.params.email,
     reviewText:'',
       isRefresh:false,
      }
      }
      

  render(){
    return(
      // <MenuProvider>
<View style={{flex:1}}>
<View style={{flex:0.9}}>


<FlatList data={this.state.data}
//  keyExtractor={({item}) => item._id}

style={{height:120}}
renderItem={({item})=>(
  // console.log(item),
  // <View style={{paddingTop:3,paddingLeft:8}}>
    
 
  //   <View style={{flex:0.2,alignItems:'flex-end',paddingRight:15,marginBottom:2}}>
// {
//   item.email==this.state.email? :
// }

console.log('item',item.email,'email',this.state.email,'isequal',item.email.toLowerCase()==this.state.email.toLowerCase()),
    <View style={{flex:0.9,flexDirection:'column',backgroundColor:'white'}}> 

<View style={{flexDirection:'row',flex:0.8,justifyContent:'center',marginLeft:10,marginTop:5}}>
<View style={{flex:0.2}}>
     {/* <Text style={{color:"black",fontWeight:'450',fontSize:18}}>{item.description}</Text> */}
     <Image 
  source={{
    uri: item.image,
  }} 
  style={{width: 50, height: 50 ,borderRadius: 50/ 2}} 
/>
</View>
       <View style={{flex:0.8}}>
       <View> 

</View>
        <View> 
          <View style={{flexDirection:'row'}}> 
          <View style={{flex:0.8}}> 
     <Text style={{fontSize:13}}>{item.firstName} {item.lastName} </Text>
     </View>
     { item.email.toLowerCase()===this.state.email.toLowerCase() &&
 <View style={{alignItems:'flex-end',flex:0.2}}>
      
 <Menu>
<MenuTrigger>
<MaterialCommunityIcons name='dots-vertical' size={20} />
</MenuTrigger>
<MenuOptions style={{ backgroundColor:'white'}} optionsContainerStyle={{ width:100,paddingRight:10}}>



<MenuOption  text='Delete' onSelect={

()=>{


  fetch(`${url}/deleteComment`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({reviewid:item._id})
}).then( async res=>{
try{
  console.log(res)

const response=await res.json()

if(res.status==200){
  console.log('response',response)
this.setState({isRefresh:true})
}

}
catch(e){

  console.log('There has been a problem with your fetch operation: ' + e.message);

}
}
).catch((e)=>{console.log(e)})



}

}
// console.log('selected')



 />
</MenuOptions>
</Menu>
</View>




}</View>
     <Text style={{color:"black",fontSize:13,paddingTop:4}}>{item.review}</Text>
     </View>
    
     
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
 
)}

/>




</View>
{/* 
<View style={{flex:0.2}}>
<TextInput
          style={styles.input}
          placeholder="Share your thoughts"
        />
</View> */}
<View style={styles.searchSection}>
    <TextInput
        style={styles.input}
        ref={input => { this.textInput = input }} 
        placeholder="Share your thoughts..."
        onChangeText={(text) => {this.setState({reviewText:text})}}
        underlineColorAndroid="transparent"
    />

<MaterialCommunityIcons style={styles.searchIcon} name="share-circle" size={25} color="#000" onPress={()=>{



fetch(`${url}/review`,{
  method: 'POST',
  headers: {
    Accept: 'application/json',

      'Content-Type': 'application/json'
  },
  body: JSON.stringify({articleid:this.state.articleid,email:this.state.email,comment:this.state.reviewText})
}).then( async res=>{
try{
console.log(res)

const response=await res.json()

if(res.status==200){
console.log('response',response)
this.setState({isRefresh:true})
}
else if(res.status==401){

}
}
catch(e){

console.log('There has been a problem with your fetch operation: ' + e.message);

}
}
).catch((e)=>{console.log(e)})

}}/>

</View>

</View>

// </MenuProvider>
)
  }


componentDidUpdate(){

if (this.state.isRefresh==true){


  fetch(`${url}/getReview`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',

        'Content-Type': 'application/json'
    },
    body: JSON.stringify({articleid:this.state.articleid})
}).then( async res=>{
try{
  console.log(res)

const response=await res.json()

if(res.status==200){
  console.log('response',response)
this.setState({data:response,isRefresh:false,reviewText:''})
this.textInput.clear()
// this.setState({isRefresh:false})
// this.setState({reviewText:''})
console.log('is review',this.state.reviewText)
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


}

  componentDidMount(){

    
    fetch(`${url}/getReview`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
    
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({articleid:this.state.articleid})
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



}


const styles = StyleSheet.create({

    searchSection: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    
})