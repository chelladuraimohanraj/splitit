import React, { useState } from 'react'
import { StyleSheet,TextInput } from 'react-native'
import { Button, Text, View, Flex, Center, Select, Box ,CheckIcon,Spacer} from 'native-base'
import { Setindividualtrans } from '../Logics/Logic'
import { useToast } from 'native-base';
import { objectTraps } from 'immer/dist/internal';
const Individualtrans = (options) => {
    const toast = useToast();
    let [payer, setPayer] = useState("");
    let [amount,setAmount] = useState("");

    let showoff = ''

    let spenders = options.transac.spenders;

    if(spenders != null){
       showoff = Object.keys(spenders).map((key)=>{
            return(
             
                <Flex style={styles.innerflex} direction='row' key={key+"hii"}>
                    <Text style={styles.flextext1}>{spenders[key].name}</Text>
                    <Text>:</Text>
                    <Text style={styles.flextext2}>{spenders[key].amount}</Text>
                </Flex>
            )
        })
    }

    const set_a_trans = async ()=>{
        if(payer == ""){
            toast.show({
                description:" Set Payer"
            })
        }
        else if(amount == '0'){
            toast.show({
                description:"amount is zero"
            })
           
        }
        else if(isNaN(amount)){
            toast.show({
                description:"Enter valid number"
            })
        }
        else{
            await Setindividualtrans(options.tripid,options.transac.name,payer,options.partici[payer].name,amount)
            toast.show({
                description:"success",
            })
            setPayer("")
            setAmount("")
        }
        
    }


    return (
        <View style={styles.comp}>
            <View style={styles.compup}>
                <View style={styles.comphead}>
                    <Text style={styles.compheadtext}>{options.transac.name}</Text>
                </View>
                <View style={styles.iflexcontain}>
                    
                    {showoff}
                </View>
            </View>

            <Flex direction='row' style={styles.buttoncontain}>
                <View >
                    <Box w="3/4" maxW="200">
                        <Select selectedValue={payer} minWidth="150" accessibilityLabel="Choose Payer" placeholder="Choose Payer" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={itemValue => setPayer(itemValue)}>

                          { Object.keys(options.partici).map((key) => {
                                return (
                                    <Select.Item key={key} label={options.partici[key].name} value={key} />
                                )
                            })
                            
                            }

                        </Select>
                    </Box>

                </View>
              
                <View >
                    <TextInput
                    style={styles.numeric}
                    placeholder='Enter amount'
                    placeholderTextColor="gray"
                    value={amount}
                    keyboardType='numeric'
                    onChangeText={value=>{setAmount(value)}}
                    
                    />

                </View>
                <Spacer/>
                <Center style={{marginRight:15}}>
                    <Button size={"sm"} onPress={() => { set_a_trans();}}>Add</Button>

                </Center>
                
            </Flex>

        </View>


    )
}

const styles = StyleSheet.create({
    comp: {

        margin: 10,

    },
    compup: {
        borderColor: "#4f6d7a",
        borderWidth: .5,
        borderRadius: 4,

    },
    comphead: {
        backgroundColor: "#4f6d7a",
        padding: 5,
        paddingLeft: 10,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,

    },
    compheadtext: {
        color: "white",
        fontWeight: "600"
    },
    partcontain: {
        marginTop: 15
    },
    buttonnative: {
        marginRight: 15
    },
    numeric:{
        color:"black",
        width:100,
        borderBottomColor:"gray",
        borderBottomWidth:.5,
        marginLeft:20,
    },
    buttoncontain:{
        marginTop:10,
       
    },
    innerflex:{
       
    },
    iflexcontain:{
        padding:10
    },
    flextext1:{
        fontWeight:"500",
        width:200,
        color:"#3d3d3d"

    },
    flextext2:{
        paddingLeft:15,
    }



})

export default Individualtrans;