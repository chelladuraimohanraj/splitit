import React, { Component, useEffect } from 'react';

import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import User  from './Components/User';

import Login from './Components/Login';
import firebase from '@react-native-firebase/app';

import { NativeBaseProvider } from 'native-base';
import { useSelector} from 'react-redux';
import Tripdetails from './Components/Tripcomponents/Tripdetails';




const Stack = createNativeStackNavigator();
const App = () =>  {

  const authenticated = useSelector(state => state.authdata.is_authenticated)


  
  useEffect(()=>{SplashScreen.hide()},[])


    return (
      <NativeBaseProvider >
     
        <NavigationContainer>
            <Stack.Navigator>
              {authenticated == false ?(
                <>
                                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                </>

              ):(
                <>
                <Stack.Screen name="User" component={User} options={{headerShown: false}}/>
                <Stack.Screen name="Tripdetails" component={Tripdetails} options={{headerShown: false}}/>
                </>
                
                
              )}
            </Stack.Navigator>
      </NavigationContainer>
     
    </NativeBaseProvider>
    );
}

export default App;

