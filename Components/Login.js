import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';

import { useDispatch } from 'react-redux';
import { useToast } from 'native-base';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Setuser } from './Logics/Logic';



import { webClientId } from '../Privatefile';

import {
  View,
  StyleSheet,

} from 'react-native'

import {

  Image,
  Button
} from 'native-base'
import { set_authenticated } from './reduxstuff/Authslice';


 GoogleSignin.configure({
      webClientId: webClientId,
    });

const Login = () => {
   async function onGoogleButtonPress() {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
  }
  const dispatch = useDispatch()

  const toast = useToast();
  useEffect(()=>{
   
   const subscibe = auth().onAuthStateChanged((user)=>{
    if(user){
     
       dispatch(set_authenticated(user))
    }
     
    })
    return subscibe;
    
  },[])

  return (
   <View style={styles.logincontainer}>
 
      <View style={styles.innerpanel}>
          <Image source={require('./assets/iconapp.png')}
              width={200}
              height={200}
              alt="Login"
            />
            
      </View>
      <View style={styles.buttonpanel}>
                <Button
                  style={styles.button}
               
                onPress={() => onGoogleButtonPress().then((user) => {

                  if(user){
                      
                      dispatch(set_authenticated(user.user))
                      if(user.additionalUserInfo.isNewUser){
                        
                        Setuser(user.user.uid,user.user.displayName,user.user.email)

                    
                       
                      
                      
                      }

                      toast.show({
                        description:"Sign in success"
                      })
                  }
                  else{
                    toast.show({
                      description:"Some error occured"
                    })
                  }
                  
                
                })}
              >Google Sign-In</Button>
              
      </View>
           
   </View>
   
    
  )
}

const styles = StyleSheet.create({
  logincontainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    
  },
  innerpanel:{
    marginTop:-150
  },
  buttonpanel:{
    paddingTop:50,
    width:150,
  },
  button:{
    backgroundColor:"#24a0ed"
  }
  
})



export default Login;