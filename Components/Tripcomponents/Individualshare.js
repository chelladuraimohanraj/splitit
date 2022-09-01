import React from 'react'
import { StyleSheet } from 'react-native';
import { Text, View ,HStack, Center} from 'native-base'

const Individualshare = (props) => {

 
    var items = props.data.trans.map(element => {
       
        return(
           <HStack key={element+"str"} style={styles.givestack}>
                <Text>{element[0]}</Text>
                <Text>  =&gt;  </Text>
                <Text>{element[1]}</Text>
           </HStack>
        )
    });
    

  return (
    <View style={styles.sharecontain}>
        <View style={styles.shareholder}>
            <Text style={styles.shareholdertext}>{props.name}</Text>
        </View>
        <View style={styles.innershare}>
            <View>
                <Text style={styles.total}>Total spent :<Text style={{fontWeight:"400"}}> {props.data.totalspent}</Text></Text>
            </View>
            <View>
            <Text style={styles.total}>To receive :</Text>
            </View>
            <View style={styles.togive}>
           
                     {items}
               
               
            </View>
        </View>
       
    </View>
  )
}

const styles = StyleSheet.create({
    sharecontain:{
        margin:8,
    },
    shareholdertext:{
        color:"#f5fcff",
        fontWeight:"700",
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:5,
    },
    shareholder:{
        
        fontWeight:"600",
        backgroundColor:"#4f6d7a",
         borderRadius:3,
    },
    innershare:{
        paddingLeft:10,
        paddingTop:3,

    },
    total:{
        fontWeight:"600"
    },
    togive:{
        paddingLeft:10,
    },
    givestack:{
        paddingTop:2,
        paddingLeft:20,
    }
    
})

export default Individualshare