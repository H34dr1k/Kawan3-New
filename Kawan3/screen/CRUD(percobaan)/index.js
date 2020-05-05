import firebase from '../../config'
import dt from '../../api'
import { Alert } from 'react-native'

export function getBlogs(){
    // return(dispatch) => {
    //     firebase.database().ref('/blogs').on('value', snapshot =>{
    //         dispatch({
    //             type:"BLOGS_FETCH",
    //             payload:snapshot.val()
    //         })
    //     })
    // }
}

export async function postBlogs(eventName, eventDescription, kodeuser){
    var dat = new dt;
    // console.log("Test");
    

    // console.log("After Get");
    return data;
}