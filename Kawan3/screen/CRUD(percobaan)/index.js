import firebase from '../../config'

export function getBlogs(){
    return(dispatch) => {
        firebase.database().ref('/blogs').on('value', snapshot =>{
            dispatch({
                type:"BLOGS_FETCH",
                payload:snapshot.val()
            })
        })
    }
}

export function postBlogs(eventName, eventDescription){
    return(dispatch) => {
        firebase.database().ref('/blogs').push({eventName,eventDescription})
    }
}