import React,{useEffect,useState} from 'react'
import { Text, View,ScrollView } from 'native-base';
import { Splitter } from '../Logics/Logic';
import { useToast } from 'native-base';
import { Dimensions } from 'react-native';
import Individualshare from './Individualshare';
const windowHeight = Dimensions.get('window').height-130;

const Sharing = ({ tripdata }) => {
   
    const toast = useToast();


    const[data,setdata] =useState("")

    
    const update = (result) =>{
        
       var updater = Object.keys(result.members).map((name)=>{
            return(
                <Individualshare  key={name+"helo"} name={name} data={result.members[name]}/>
            )
        })

    setdata(updater)


    }


    useEffect(()=>{
        let events = {
            "members":{},
            "transactions":[]
        };
        let participants = Object.keys(tripdata.participants)
        if(participants.length == 1){
            toast.show({
                description:"Only one participant"
            })
        }
        else{
            participants.forEach(element => {
                events.members[tripdata.participants[element].name]={
                    totalspent:0,
                    togive:0,
                    toreceive:0,
                    trans:[]
                }
            });
            
            if(tripdata["transactions"] == null || typeof tripdata["transactions"] == 'undefined'){

                toast.show({
                    description:"No transactions found"
                })
            }
            else{
                Object.keys(tripdata.transactions).forEach((key)=>{
                    if(typeof tripdata.transactions[key].spenders == 'undefined' || tripdata.transactions[key].spenders == null){
                        
                    }
                    else{
                        var temp = {
                            "reason":key,
                            "spenders":{}
                        }
                        Object.keys(tripdata.transactions[key].spenders).forEach((key2)=>{
                           temp.spenders[tripdata.transactions[key].spenders[key2].name] = parseInt(tripdata.transactions[key].spenders[key2].amount);
                        });
                        events.transactions.push(temp);
                    }
                })



                var result = Splitter(events)
                update(result);
            }

        }
        
    },[])

    return (
        <ScrollView style={{height:windowHeight}}>
            {data}
        </ScrollView>
    )
}

export default Sharing;