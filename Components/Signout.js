import { Button ,  ArrowForwardIcon} from 'native-base';
import auth from '@react-native-firebase/auth';
import React from 'react'
import { useDispatch } from 'react-redux'
import { remove_authenticated } from './reduxstuff/Authslice';


const Signout = () => {
  const dispatch = useDispatch()
  const remove = () => {
        
        auth().signOut()
        .then(()=>{
               dispatch(remove_authenticated())
        })
        .catch((error)=>{
            console.log(error)
        })
        
        
  }
  return (
    <ArrowForwardIcon 
        onPress={remove}
    style={{color:"white"}}

    />
  )
}

export default Signout;