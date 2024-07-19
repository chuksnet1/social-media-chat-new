import * as AuthApi from '../api/AuthRequest'

//formData is the parameter that has been received from Auth.jsx component
//the dispatch is from the redux
export const logIn =(formData)=> async(dispatch)=>{

    dispatch({type: "AUTH_START"})  //here we are telling our reducer that authentication has started 
    try {
        const {data} = await AuthApi.logIn(formData)
        dispatch({type: "AUTH_SUCCESS", data: data})
    } catch (error) {
        console.log(error)
        dispatch({type: "AUTH_FAIL"})
    }
}



//action for signUp and its exported to form
export const signUp =(formData)=> async(dispatch)=>{

    dispatch({type: "AUTH_START"})  //here we are telling our reducer that authentication has started 
    try {
        const {data} = await AuthApi.signUp(formData)
        dispatch({type: "AUTH_SUCCESS", data: data})
    } catch (error) {
        console.log(error)
        dispatch({type: "AUTH_FAIL"})
    }
}


export const logOut =()=>async(dispatch)=>{
    dispatch({type: "LOG_OUT"})
}