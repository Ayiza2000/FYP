import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import SearchByTitle from './SearchByTitle';
import SearchAuthor from './SearchByAuthor';
import SearchByCategory from './SearchByCategory';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default  function Search({navigation,route}) {
  const TopTab = createMaterialTopTabNavigator();
return(
<View style={{flex:1}}>
<TopTab.Navigator >
  <TopTab.Screen name="Title" component={SearchByTitle}/>
  <TopTab.Screen name="Author" component={SearchAuthor} initialParams={{email:route.params.email}}/>
  <TopTab.Screen name="Category" component={SearchByCategory} initialParams={{email:route.params.email}}/>


</TopTab.Navigator>
</View>

)




}