import { ScrollView ,Text,View,Pressable} from 'native-base';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
 import { useNavigation } from '@react-navigation/native';

const Trips = () => {
   
    const navigation = useNavigation();
    const trips = useSelector(state => state.tripdata)
  
    const movetotrip = (trips) =>{
        
        navigation.navigate("Tripdetails",{
            
            trips:trips

        });
    }

   var tripdivs =  Object.keys(trips.trips).map((tripid)=>{
  
        return(<Pressable key={tripid} style={styles.individualtrip} onPress={()=>{movetotrip(trips.trips[tripid])}}>
            <Text style={{fontWeight:"400"}}>{trips.trips[tripid].name}</Text>
            <Text style={styles.gray}>{trips.trips[tripid].createdat.slice(4,21)}</Text>
            </Pressable>)
    })

  return (
        <ScrollView style={styles.wholebar}>
            {tripdivs}
        </ScrollView>
  )
}

const styles = StyleSheet.create({
    wholebar:{
        marginTop:10,
    },
    individualtrip:{
        margin: 4,
        borderBottomWidth: .5,
        borderBottomColor: "#4f6d7a",
        padding: 10,
        borderRadius: 7,
    },
    gray:{
        color:"gray",
    }
})



export default Trips;