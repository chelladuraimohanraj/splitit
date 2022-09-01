import {FirebaseApi} from  "../../Privatefile"
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
const reference = firebase.app().database(FirebaseApi) 






export const Splitter = (events) =>{
 
    // const events ={
   
    // members :{
    //     "one":{
    //         totalspent:0,
    //         togive:0,
    //         toreceive:0,
    //         trans:[]

            
    //     },
    //     "two":{
    //         totalspent:0,
    //         togive:0,
    //         toreceive:0,
    //         trans:[]
            
    //     },
    //     "three":{
    //         totalspent:0,
    //         togive:0,
    //         toreceive:0,
    //         trans:[]
           
    //     },
    //     "four":{
    //         totalspent:0,
    //         togive:0,
    //         toreceive:0,
    //         trans:[]
            
    //     },
    //     "five":{
    //         totalspent:0,
    //         togive:0,
    //         toreceive:0,
    //         trans:[]
            
    //     }
    
    // },
    // transactions:[
//         {
//             reason:"food",
//             spenders:{
//                 one:100,
//                 two:10000,
//                 five:1000
//             }
//         },{
//             reason:"travel",
//             spenders:{
//                 one:50,
//                 two:100,
//                 four:500
//             }
//         },{
//             reason:"stay",
//             spenders:{
//                 three:300,
//                 four:250,
//                 five:150
//             }
//         }
//     ]
// }

let total = 0;


events.transactions.forEach(transaction => {
  
    Object.keys(transaction.spenders).forEach((key)=>{
        events.members[key].totalspent += transaction.spenders[key]
        total+=transaction.spenders[key]
    })  
   

});

var total_people = Object.keys(events.members).length
var evenvalue = Math.floor(total/total_people)
var togivepeople = []
var toreceivepeople = []

// console.log("total:",total,"total_people:",total_people,"even",evenvalue);

// console.log(JSON.stringify(events, null, 4));


Object.keys(events.members).forEach((member)=>{
        console.log(events.members[member].totalspent,evenvalue);
        if(events.members[member].totalspent > evenvalue){
            // console.log("receive");
        events.members[member].toreceive = events.members[member].totalspent - evenvalue
        toreceivepeople.push(member)
       }
       else if(events.members[member].totalspent < evenvalue){
        events.members[member].togive = evenvalue - events.members[member].totalspent
        togivepeople.push(member)
        // console.log("togive");
       }
})

togivepeople = togivepeople.sort()
toreceivepeople = toreceivepeople.sort()

console.log("tiotoot",togivepeople,toreceivepeople);

if(togivepeople.length ==0 && toreceivepeople.length == 0){

}
else{
var receiver = toreceivepeople.pop()
var giver = togivepeople.pop()

var count =0;
var p;
while(true){
        
        console.log("count=",count);
        console.log(JSON.stringify(events, null, 4));
        console.log("r",receiver);
        console.log('g',giver);
        console.log("pp",p);
     
    
        if(events.members[receiver].toreceive > events.members[giver].togive){
            events.members[receiver].toreceive -= events.members[giver].togive;
        
                events.members[receiver]["trans"].push([giver,events.members[giver].togive])
            p=events.members[receiver].toreceive
           
            events.members[giver].togive = 0
        
            giver = togivepeople.pop()
        }
        else if(events.members[receiver].toreceive < events.members[giver].togive){
                var value = events.members[receiver].toreceive
                events.members[giver].togive -= events.members[receiver].toreceive
            
            
                
                    events.members[receiver]["trans"].push([giver,value])
                
                events.members[receiver].toreceive = 0
                p=events.members[receiver].toreceive;
                receiver = toreceivepeople.pop()
        }
        else{
            
                events.members[receiver]["trans"].push([giver,events.members[receiver].toreceive])
            
            events.members[receiver].toreceive = 0
            p=events.members[receiver].toreceive;
            events.members[giver].togive =0

        
            giver = togivepeople.pop()
            receiver = toreceivepeople.pop()
        }
        console.log(receiver);
        console.log("toreceivepeople.length =",toreceivepeople.length,"events.members[receiver].toreceive =",events.members[receiver]);
    console.log("llll",toreceivepeople.length,"p",p);
    if(togivepeople.length  == 0 && typeof giver == 'undefined'){
            break;
    }

        

    }
}
    return events;
};
export const Setuser = (id,name,email) =>{
         
  
        reference
        .ref('/users/'+id)
        .set({
            name:name,
            trips:{},
            friends:{},
            email:email
        })
        .then(()=>{
            console.log("Success");
                }
        )
        .catch((err)=>{
            console.log(err);
        })
};
export const CreateTrip = (tripname,userid,username,email) =>{
    var tid= tripname+userid
    var pariticipantobject = {};
    pariticipantobject[userid] =
      {
            name:username,
            mail:email,
            totalspent:0,
        }
    
    var date = new Date().toString();
    
    reference
    .ref('/trips/'+tid)
    .set({
        name:tripname,
        participants:pariticipantobject,
        
        transactions:{},
        userid:userid,
        createdat:date
        
    })
    .then(()=>{
        reference
        .ref('/users/'+userid+"/trips")
        .push()
        .set({
            tripid:tid,
            name:tripname,
            createdat:date,
        })
        .then(()=>{
            console.log("success");
        })
        .catch(()=>{
            console.log("failiure");
        })
    })
    .catch((err)=>{
        console.log(err);
        return {"status":"failiure"}
    })
};

export const UpdateExistinguser = (user,tripid,name,createdat,participantname,participantmail) =>{
   
    reference
    .ref("/trips/"+tripid+'/participants/'+user)
    .set({
        totalspent:0,
        name:participantname,
        mail:participantmail

    })
    .then({

    })
    .catch((err)=>{
        console.log(err);
    });

   
    reference
    .ref("/users/"+user+'/trips')
    .push()
    .set({
        name:name,
        tripid:tripid,
        createdat:createdat
    })
    .then(()=>{
        console.log("everything is ok");
    })
    .catch((err)=>{
        console.log(err);
    })

}
export const UpdateNonExistingUser =(user,tripid) =>{
    
    reference
    .ref("/trips/"+tripid+'/participants')
    .push()
    .set({
        totalspent:0,
        name:user,
        mail:user

    })
    .then({

    })
    .catch((err)=>{
        console.log(err);
    });


}
export const Createtransaction = (tripid,transactionname) =>{
    reference
    .ref("/trips/"+tripid+'/transactions/'+transactionname)
    .set({
        name:transactionname,
       

    })
    .then({

    })
    .catch((err)=>{
        console.log(err);
    });
}
export const Setindividualtrans = (tripid,transactionname,payerid,payername,payeramount)=>{

    reference
    .ref("/trips/"+tripid+'/transactions/'+transactionname+"/spenders/"+payerid)
    .set({
        name:payername,
        amount:payeramount
    })
    .then({

    })
    .catch((err)=>{
        console.log(err);
    });
}