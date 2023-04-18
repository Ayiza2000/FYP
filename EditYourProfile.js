import React from "react";
import {
   Image,
    Text,
    TouchableOpacity,
    View,ActivityIndicator
  } from "react-native";
  import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
  import storage, { firebase } from '@react-native-firebase/storage';
import { TextInput } from "react-native-paper";
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import url from "./Backend";

  export default class EditYourProfile extends React.Component{

    constructor(props) {
      super(props);
     console.log(props)
      this.state = {
link:props.route.params.imageuri,
username: props.route.params.username,
email:props.route.params.email,
firstName:props.route.params.fname,
lastName:props.route.params.lname,
bio:props.route.params.bio,
loader:false,
image:'',
secondaryStorageBucket:firebase.app().storage('gs://contently-359109.appspot.com'),
      };
   
     }
render(){
return(
<View style={{flex:1}}>

{  this.state.loader ? <View style={{flex : 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator  color={'#0000ff'}  size="large" />
    <Text> Saving Data. Please wait</Text>
  </View>:
<View style={{flex:1,backgroundColor:'white'}}>
    <View style={{flex:0.1,flexDirection:'row',backgroundColor:'#E8E8E8',marginBottom:15}}>
    <View style={{flex:0.5,alignItems:"flex-start",paddingLeft:'2%',justifyContent:'center' }}>
    <MaterialCommunityIcons name='close' color={'#312921'} size={25} onPress={()=>{this.props.navigation.navigate('UserProfile',{image:this.state.link})}}/>

    </View>
<View style={{flex:0.5,alignItems:"flex-end", marginTop:0, paddingRight:'2%',justifyContent:'center'}}>
  <TouchableOpacity onPress={
   
    async()=>{
     this.setState({loader:true})
      if(this.props.route.params.imageuri != this.state.link){

        await this.state.secondaryStorageBucket.ref(this.state.email).delete()
        console.log('link',this.state.link)
        console.log('username',this.state.username)
  //putfile not working
  await this.state.secondaryStorageBucket.ref(this.state.email).putFile(this.state.link)
      }
try{
  console.log('image1',this.state.image)
this.setState({image: await this.state.secondaryStorageBucket.ref(this.state.email).getDownloadURL()})
console.log('image2',this.state.image)

await fetch(`${url}/UserProfile/EditProfile`,{
  method: 'POST',
  headers: {
    Accept: 'application/json',

      'Content-Type': 'application/json'
  },
  body: JSON.stringify({email:this.state.email,username:this.state.username,image:this.state.image, bio:this.state.bio,fname:this.state.firstName,lname:this.state.lastName })
}).then( async res=>{
try{
console.log(res)

const response=await res.json()

if(res.status==200){

  this.props.navigation.navigate('UserProfile',{image:this.state.image, username:this.state.username,bio:this.state.bio,firstName:this.state.firstName,lastName:this.state.lastName})

}
else if(res.status==401){
this.setState({message:res.message})

}
}
catch(e){

console.log('There has been a problem with your fetch operation: ' + e.message);

}
}
).catch((e)=>{console.log(e)})
}
catch(e){
  console.log('error',e)
}


console.log('picture uploaded')
  }}>
<Text style={{fontSize:18,color:'#4266f5'}}>Save</Text>
</TouchableOpacity>
</View>

</View>
<View style={{flex:0.1,marginBottom:10,alignItems:'center'}}>
<Text style={{fontSize:20, fontWeight:'bold',color:'black'}}>Edit your Profile</Text>
</View>

<View style={{flex:0.3,paddingLeft:'8%',flexDirection:'row',marginBottom:45}}>
<View style={{flex:0.3,marginBottom:15}}>
<Image 
  source={{
    uri: this.state.link
  }} 
  style={{width: 80, height: 80, borderRadius: 80/ 2}} 
/>
</View>
<View style={{flex:0.7, alignItems:'flex-start',justifyContent:'center'}}>
<TouchableOpacity  onPress={()=>{
   launchImageLibrary({
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
}).then((image)=>{
  this.setState({link:  image.assets[0].uri })


}).catch((e)=>{
  console.log(e)
})
}}>
<Text style={{paddingTop:'5%', fontSize:18 ,color:'#4266f5'}}>Choose an image</Text></TouchableOpacity>
</View>

</View>
<View style={{paddingLeft:'10%', marginTop:'5%'}}>

<Text style={{fontWeight:'bold', fontSize:16, color:'black', marginBottom:10}}> UserName</Text>

<TextInput style={{ height: 20,margin: 12,width:"80%",backgroundColor:'white'}} value={this.state.username} onChangeText={(text)=>{this.setState({username:text})}}/>
<Text style={{fontWeight:'bold', fontSize:16, color:'black', marginBottom:10,marginTop:'10%'}}> First Name</Text>
<TextInput style={{ height: 20,margin: 12,width:"80%",backgroundColor:'white'}} value={this.state.firstName} onChangeText={(fname)=>{this.setState({firstName:fname})}} />
<Text style={{fontWeight:'bold', fontSize:16, color:'black', marginBottom:10,marginTop:'10%'}}> Last Name</Text>
<TextInput style={{ height: 20,margin: 12,width:"80%",backgroundColor:'white'}}  value={this.state.lastName} onChangeText={(lname)=>{this.setState({lastName:lname})}}/>
<Text style={{fontWeight:'bold', fontSize:16, color:'black', marginBottom:10,marginTop:'10%'}}> Bio</Text>
<TextInput style={{ height: 20,margin: 12,width:"80%",backgroundColor:'white'}}  value={this.state.bio} onChangeText={(bio)=>{this.setState({bio:bio})}}/>

</View>


</View>
}
</View>
)





}





componentDidMount(){
       
console.log('edit your profile',this.state.link)
  fetch(`${url}/UserProfile/EditProfile`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
  
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:this.state.email,username:this.state.username,image:this.state.link, bio:this.state.bio })
  }).then( async res=>{
  try{
    console.log(res)
  
  const response=await res.json()
  
  if(res.status==200){
  

  }
  else if(res.status==401){
    this.setState({message:res.message})

  }
  }
  catch(e){
  
    console.log('There has been a problem with your fetch operation: ' + e.message);
  
  }
  }
  ).catch((e)=>{console.log(e)})

}
  }