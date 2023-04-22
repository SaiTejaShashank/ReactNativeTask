import React,{ useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';

import {createStore} from 'redux';
import movies from './app/reducers';

const store=createStore(movies);

export default function App() {

  const {user}=store.getState();
  const [refresh,setRefresh]=useState(false);


  store.subscribe(()=>{
    setRefresh(!refresh);
  })
  
  return (
    <AuthContext.Provider value={{user,store}}>
   <NavigationContainer>
    {user?<AppNavigator/>:<AuthNavigator/>}
   </NavigationContainer>
   </AuthContext.Provider>
  
  );
}

