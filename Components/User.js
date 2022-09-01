import React, { useEffect, useState } from 'react'
import { View, StyleSheet, NativeModules, Platform, Modal, KeyboardAvoidingView } from 'react-native';
import { CreateTrip } from './Logics/Logic';
const { StatusBarManager } = NativeModules;
import { useToast } from 'native-base';
import Trips from './Trips';
import {FirebaseApi} from  "../Privatefile"
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
const reference = firebase.app().database(FirebaseApi) 
import { useIsFocused } from '@react-navigation/native';



import {
  Center,
  Text,
  Image,
  HStack,
  Fab,
  Icon,
  ScrollView,
  AddIcon,

  Button,
  Input,
  
} from 'native-base'
import Signout from './Signout';
import { useSelector ,useDispatch} from 'react-redux';
import { set_trips_active,remove_trips_active } from './reduxstuff/Tripslice';

const User = () => {

  const toast = useToast();
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const [status, setstatus] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [tripname, setTripname] = useState("")
  const user = useSelector(state => state.authdata.user)
 
  const trips = useSelector(state => state.tripdata.tripsfound)
  const d = useSelector(state => state.tripdata.trips)
  let alltrips = []
  if(d != null){
     Object.keys(d).forEach((key)=>{
      alltrips.push(d[key].name)
  })
  }
 

  
  const newtrip = async() => {
   

    if (/[^a-zA-Z0-9\s]/.test(tripname)){
      toast.show({
        description:"No special chars"
      })

    }
    else{
      if(alltrips.includes(tripname)){
        toast.show({
          description:"THis trip already present give another"
        }) 
      }
      else{
        var result = await CreateTrip(tripname.replace(/ /g,"_"),user.uid,user.displayName,user.email)
      setModalVisible(!modalVisible)
      toast.show({
        description:"Trip created successfully"
      }) 
      setTripname("")
      }
     
    }
           
  }
  useEffect(() => {
    if (Platform.OS == 'ios') {
      StatusBarManager.getHeight(
        (statusBarFrameData) => {
          setstatus(statusBarFrameData.height)

        }
      );
    }

    const subscriber = reference.ref("/users/"+user.uid+"/trips").on('value', snapshot => {
      if(snapshot.val() != null){
          if(Object.keys(snapshot.val()).length > 0){
          dispatch(set_trips_active(snapshot.val()))
        }
        else{
          dispatch(remove_trips_active())
        } 
      }
     
    });
    return () => reference.ref("/users/"+user.uid+"/trips").off('value', subscriber);
    
    
  }, [])
  return (
    <View style={[styles.contain, { marginTop: status,  left: 0, right: 0, top: 0 }]}  >
      <HStack style={styles.header}>
        <Image source={require('./assets/coincropped.png')}
          width={10}
          height={10}
          marginLeft={1}
          alt="Login"
        />
        <Center style={styles.headertitle}>
          <Text style={styles.headertitletext} bold fontSize="lg">Make Your Trip Wise</Text>
          <Text style={{ color: "#d9d9d9" }}>Splitting is wise</Text>
        </Center>
        <Center>
          <Signout/>
        </Center>


      </HStack>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <KeyboardAvoidingView style={styles.modalView}

            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Center style={styles.inputcontain}>
              <Input mx="3" placeholder="Trip Name" w="250" maxWidth="300px" value={tripname}
                onChangeText={setTripname}
              />
            </Center>

            <HStack>
              <Button
                style={styles.button}
                onPress={() => { setModalVisible(!modalVisible); setTripname("") }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Button>
              <Button
                style={styles.button2}
                onPress={newtrip}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Button>
            </HStack>

          </KeyboardAvoidingView>
        </View>
      </Modal>
    
      
        
      {trips == false?(
              <Center style={{ marginTop: 240 }}>
                <Text>No plans</Text>
              </Center>
      ):(
        <View  style={{flex:1}}>
          <Trips/>
        </View>
        
      )}
     
        {isFocused?
        <Fab
        placement="bottom-right"
        style={{ backgroundColor: "#456d7a", marginRight: 20, marginBottom: 30 }}

        onPress={() => { setModalVisible(!modalVisible) }}
        icon={<AddIcon color="white" />}
      > </Fab>
        
        
        :null}
        
      
      
    </View>


  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,

  },
  header: {
    margin: 4,
    borderBottomWidth: .5,
    borderBottomColor: "#f5fcff",
    padding: 10,
    backgroundColor: "#4f6d7a",
    borderRadius: 7


  },
  headertitle: {
    width: 300,
  },
  headertitletext: {
    color: "#f5fcff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
    height: 180
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button2: {
    marginLeft: 30,
    width: 100
  },
  button: {
    marginRight: 30,
    width: 100
  },
  inputcontain: {
    marginBottom: 30,
    marginTop: 10

  }
});

export default User;