import {
    StyleSheet,

  } from "react-native";
   
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
  
    },
    container4: {
      flex: 1,
      backgroundColor: "white",
     
      
    },
 Image:{
    width: 120, height: 120 ,borderWidth:2,borderColor:'white'
 },
 container2: {
    height: 45, 
    position: 'relative',
  
  },
  container5: {
    height: 45, 
    position: 'relative',
    marginTop:25,
    marginBottom:10
  },
  container3: {
    height: 45, 
    position: 'relative',
    marginTop:5,
    
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: '#FFF',
    top: -12,
    left: 25,
    padding: 5,
    zIndex: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4266f5',
    textAlign:'center',
    borderRadius:30,
    justifyContent:'center',
    // borderWidth:2,
    height:40,
     width:200,
     marginLeft:70,
     marginRight:50,
     marginTop:5,
    //  borderColor:'blue',
     

  },
  buttonText:{
   color:'white',fontSize:16,alignItems:'center'
  },
  input:{
      
    flex: 1, 
    borderWidth: 3, 
    marginLeft:10,
    marginRight:10,
    borderColor: "#6DD5FA",
    justifyContent: 'flex-end',
    height: 80,
    width:300,
    borderRadius: 65,
   paddingLeft:20,

   

  },
  input2:{
      
    flex: 1, 
    borderWidth: 3, 
    marginLeft:10,
    marginRight:10,
    borderColor: "#6DD5FA",
    justifyContent: 'flex-end',
    height: 80,
    width:150,
    borderRadius: 65,
   paddingLeft:20,

   

  },
  input3:{
      
    flex: 1, 
    borderWidth: 3, 
    marginLeft:10,
    marginRight:10,
    borderColor: "#6DD5FA",
    justifyContent: 'flex-end',
    height: 80,
    width:320,
    borderRadius: 65,
   paddingLeft:20,

   

  },
    inputView: {
      backgroundColor: "#FFC0CB",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
   
      alignItems: "center",
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
   
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#FF1493",
    },
  });
  export {styles};