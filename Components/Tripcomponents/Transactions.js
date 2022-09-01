import React,{useState} from 'react'
import { Text,Flex,Center,View,Button,KeyboardAvoidingView,Input,HStack, ScrollView } from 'native-base';
import { StyleSheet ,Modal ,Dimensions} from 'react-native';
import { Createtransaction } from '../Logics/Logic';
import { useToast } from 'native-base';
import Individualtrans from './Individualtrans';
const windowHeight = Dimensions.get('window').height-170;


const Transactions = ({trips,tripdata}) => {
  // console.log(tripdata);
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputdata,setinputdata] = useState("")


  var tripid = trips.tripid
  var transaction = {}

  var participants = []
  var transactionnames = []

  
  if(typeof tripdata != 'undefined'){
      Object.keys(tripdata.participants).forEach((key)=>{
      participants.push(tripdata.participants[key].name);
      
    })
    
    transaction = tripdata["transactions"]
    if(typeof transaction != 'undefined' ){
       Object.keys(transaction).forEach((key)=>{
      transactionnames.push(transaction[key].name);
    })
    }
   
   
  }
  var transview = ''

  if(typeof transaction != "undefined"){
   transview = Object.keys(transaction).map((key)=>{
      return(
        <View View key={key+"tran"}>
          <Individualtrans tripid={tripid} transac={transaction[key]} partici={tripdata.participants}/>
        </View>
      )
   })
  }

  const addtransaction = async () =>{
    var found = false;
    setinputdata(inputdata.replace(/ /g,"_"))
    if(transaction != undefined){
       transactionnames.forEach(trans => {
          if(trans == inputdata.trim()){
            found = true;
            
          }
       });
    }
    if(found){
      toast.show({
              description:"This is already present"
            })
    }
    else{
          await Createtransaction(tripid,inputdata.trim());
          setModalVisible(!modalVisible);
          toast.show({
            description:"created successfully"
          })
    }
  
   
  }
 
   
  
  return (
    <View style={styles.partcontain}>
        <Flex direction='row-reverse' style={styles.buttoncontain}>

          <Center style={styles.buttonnative}>
            <Button size={"sm"} onPress={() => { setModalVisible(!modalVisible); }}>New Transaction</Button>

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
            
           
            <Center style={styles.inputcontain}>
              <Input mx="3" placeholder="Reason (ex:'food')" w="260" maxWidth="300px"
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
                onPress={addtransaction}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Button>
            </HStack>

          </KeyboardAvoidingView>
        </View>
      </Modal>
      <ScrollView style={styles.part}>
          {transview}
      </ScrollView>

      
      
    </View>
  )
}

const styles = StyleSheet.create({
  partcontain:{
flex:1
  },
  part:{
    flex:1,
    height:windowHeight
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
    height: 190
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
})



export default Transactions;