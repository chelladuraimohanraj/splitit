


import {FirebaseApi} from  "../../Privatefile"

import React, { useEffect,useState} from 'react'
import { StyleSheet, NativeModules, Platform } from 'react-native';
import { View,Text ,HStack,VStack,Pressable,Center} from "native-base";

const { StatusBarManager } = NativeModules;
import { useToast } from 'native-base';
import Participants from "./Participants";
import Transactions from "./Transactions";
import Sharing from "./Sharing";

import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
const reference = firebase.app().database(FirebaseApi) 




const Tripdetails = ({route}) => {
    const [status,setstatus] = useState(0);
    const {trips } = route.params;

    const [tripname,settripname] = useState("")
    const [participantactive,setparticipantactive] = useState(true);
    const [transactionactive,settransactionactive] = useState(false);
    const [sharingactive , setsharingactive] = useState(false);
    const [tripdata,settripdata]=useState(null);

  


  useEffect(()=>{

  if (Platform.OS == 'ios') {
    StatusBarManager.getHeight(
      (statusBarFrameData) => {
        setstatus(statusBarFrameData.height)

      }
    );
  }

    const subscriber = reference.ref("/trips/"+trips.tripid).on('value', snapshot => {
        settripname(snapshot.val().name);
        settripdata(snapshot.val());
       
      });
      return () => reference.ref("/trips/"+trips.tripid).off('value', subscriber);
},[])
   

  return (
    <View style={[styles.contain, { marginTop: status, position: 'absolute', left: 0, right: 0, top: 0 }]} >
        <VStack style={styles.header}>
          <Text style={styles.headertitletext} bold>{tripname}</Text>
          <HStack>
              <Pressable style={[styles.topnav,{backgroundColor:participantactive?"#f5fcff":"#4f6d7a"}]}
              onPress={()=>{setparticipantactive(true);settransactionactive(false);setsharingactive(false)}}
              >
              <View style={styles.center}><Text bold style={[styles.naver,{color:participantactive?"black":"white"}]}>Participants</Text></View>
                  
              </Pressable>




              <Pressable style={[styles.topnav,{backgroundColor:transactionactive?"#f5fcff":"#4f6d7a"}]}
              onPress={()=>{setparticipantactive(false);settransactionactive(true);setsharingactive(false)}}
              
              >
                <View style={styles.center}><Text bold style={[styles.naver,{color:transactionactive?"black":"white"}]}>Transactions</Text></View>
                  
              </Pressable>




              <Pressable style={[styles.topnav,{backgroundColor:sharingactive?"#f5fcff":"#4f6d7a"}]}
              onPress={()=>{setparticipantactive(false);settransactionactive(false);setsharingactive(true)}}
             
              
              >
                <View style={styles.center}><Text bold style={[styles.naver,{color:sharingactive?"black":"white"}]}>Sharing</Text></View>
                  
              </Pressable>
          </HStack>
        </VStack>
        {participantactive?(
          <Participants trips={trips} tripdata={tripdata}/>
        ):(
          sharingactive?(
              <Sharing tripdata={tripdata}/>
          ):(
              <Transactions  trips={trips} tripdata={tripdata}/>
          )
          
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  contain:{
    flex:1,
  },
  header: {
    margin: 4,
    borderBottomWidth: .5,
    borderBottomColor: "#f5fcff",
    paddingTop: 10,
    backgroundColor: "#4f6d7a",
    borderRadius: 7,
    height:90,
    paddingLeft:20,
  },

  headertitletext: {
    color: "#f5fcff",
    fontSize:15,
    height:20

  },
  topnav:{
    width:125,
  
    marginTop:20,
   paddingTop:5,
    borderTopEndRadius:10,
    borderTopStartRadius:10,
    height:40
  },
  center:{
  
    alignItems:"center",
    justifyContent:"center",
    paddingTop:5,
  }

})

export default Tripdetails;