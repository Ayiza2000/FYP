// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';
import url from "./Backend";
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Image,
} from 'react-native';

const SearchAuthor = ({navigation,route}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);



  useEffect(() => {
    fetch(`${url}/SearchByAuthor`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
      
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:route.params.email} )
      })
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.fname
          ? item.fname.toUpperCase()
          : ''.toUpperCase();
        const textData = text.trim().toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={{flexDirection:'row'}}>
         <View style={{flex:0.2,justifyContent:'center'}}>
      <Image 
  source={{
    uri: item.img
  }} 
  style={{width: 50, height: 50, borderRadius: 50/ 2}} 
/>
      </View>
        <View style={{flex:0.7}}>
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        
        {item.fname.toUpperCase()} {item.lname.toUpperCase()}
      </Text>
      
      </View>

     
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    console.log('ingetitem',item.authorEmail)
    navigation.navigate('Authors',{fname:item.fname,lname:item.lname,img:item.img,searchAuthorMail:item.authorEmail,username:item.username,noFollowers:item.followers,noFollowing:item.followings})
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Author"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
    color:'black'
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#4266f5',
    backgroundColor: '#FFFFFF',
  },
});

export default SearchAuthor;
