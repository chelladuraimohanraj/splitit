import React, { useState } from 'react'
import { Pressable,Dimensions, StyleSheet, Modal } from 'react-native';
import { Button, Center, HStack, Flex, ScrollView, Text, View, KeyboardAvoidingView, Input, Radio } from 'native-base';
import { UpdateExistinguser, UpdateNonExistingUser } from '../Logics/Logic';
import { useToast } from 'native-base';
import { FirebaseApi } from "../../Privatefile"
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
const reference = firebase.app().database(FirebaseApi)
const windowHeight = Dimensions.get('window').height-170;

const Participants = ({ trips, tripdata }) => {
  
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("user");
  const [inputdata, setinputdata] = useState("")
 


  function checkuserexists (details, mailid) {

    var k = Object.keys(details["participants"]);
   
    var result = false;

    k.forEach(key => {
        if(details["participants"][key].mail == mailid){
          result = true;

        }

    });

  return result;
  
  }

 var memberdata ;

  
  if(tripdata !=null){
    
   
      memberdata = Object.keys(tripdata["participants"]).map((memberid)=>{
   
        return(
          <View key={memberid} style={styles.part}>
              <Text style={styles.partone}>{tripdata["participants"][memberid].name}</Text>
              <Text style={styles.parttwo}>{tripdata["participants"][memberid].mail}</Text>
          </View>
        )
      })
  }
  
  const checkforadding = async () => {
   setinputdata(inputdata.trim().replace(/ /g,"_"))
    if (checkuserexists(tripdata, inputdata.trim()) == true) {
      toast.show({
        description: "user already in participants"
      })
    }
    else {
       var user = inputdata;
        var user = user.trim();
      if (value == "user") {

       
        var ref = reference.ref("users");
        var query = ref.orderByChild("email").equalTo(user);

        query.once("value", async function (snapshot) {
          if (snapshot.val() == null) {
            toast.show({
              description: "GmailId is not an existing user"
            })
          }
          else {
            var userid = Object.keys(snapshot.val())[0]
            var username = snapshot.val()[userid]


            await UpdateExistinguser(userid, trips.tripid, trips.name, trips.createdat, username.name, username.email)
            toast.show({
              description: "added successfully"
            })
            
          }
        });



      }
      else {
        await UpdateNonExistingUser(user,trips.tripid);
        toast.show({
          description: "added successfully"
        })
      }



    }


    setModalVisible(!modalVisible);
    setinputdata("")
  }


  return (
    <View style={[styles.contain, {  left: 0, right: 0, top: 0 }]} >
      <Flex direction='row-reverse' style={styles.buttoncontain}>

        <Center style={styles.buttonnative}>
          <Button size={"sm"} onPress={() => { setModalVisible(!modalVisible); }}>Add participant</Button>

        </Center>
      </Flex>
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
            <Center>
              <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
                setValue(nextValue);
              }}>
                <HStack>
                  <View style={{ marginRight: 30 }}>
                    <Radio size={"sm"} value="user" my={1} >
                      User
                    </Radio>
                  </View>
                  <View style={{ marginLeft: 30 }}>
                    <Radio size={"sm"} value="nonuser" my={1}>
                      Non-user
                    </Radio>
                  </View>

                </HStack>

              </Radio.Group>
            </Center>
            {value == "user" ? (
              <Text style={styles.hint}>An existing user can view the data in his account,Give the exact GMAIL ID.</Text>
            ) : (
              <Text style={styles.hint}>You can give any random name for a Non-user</Text>
            )}
            <Center style={styles.inputcontain}>
              <Input mx="3" placeholder="mail_id or name" w="260" maxWidth="300px" value={inputdata}
                onChangeText={setinputdata}
              />
            </Center>

            <HStack>
              <Button
                style={styles.button}
                onPress={() => { setModalVisible(!modalVisible); }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Button>
              <Button
                style={styles.button2}
                onPress={checkforadding}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Button>
            </HStack>

          </KeyboardAvoidingView>
        </View>
      </Modal>
      <View style={styles.partcontain}>
        <ScrollView style={{flex:1}}>
           {memberdata}
        </ScrollView>
       
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  contain:{
flex:1
  },
  buttoncontain: {
    marginTop: 10,
    marginBottom: 5
  },
  buttonnative: {
    marginRight: 15
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
    height: 300
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

  },
  hint: {
    fontSize: 10,
    padding: 30,
    paddingTop: 10,
    paddingBottom: 10,

  },
  partcontain:{
  marginTop:15  ,
  flex:1,
  height:windowHeight
 
  },
  part:{
    margin:10,
    paddingLeft:10,
    borderLeftWidth:2,
    borderLeftColor:"#0991b1"
  },
  partone:{
    fontWeight:"bold"
  },
  parttwo:{
    fontSize:10,
    color:"gray"
  }



})
export default Participants;