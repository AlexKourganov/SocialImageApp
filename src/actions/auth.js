import { AUTH,ADDERROR,CLEARERROR } from '../constants/actionTypes';
import * as api from '../api';


export const signin =(formData,history)=>async(dispatch)=>{
    try {
        // login user
        const {data} = await api.signIn(formData);
        dispatch({
            type:AUTH,
            data
        })

        history.push('/')
    } catch (error) {
        // console.log(error.message)
        // const errorData = 20
        // console.log(errorData)
        dispatch({
            type:ADDERROR,
            payload:{message:'Check Credentials!',errorCode:0}
        })

        // Clear ERROR
        setTimeout(() => {
            dispatch({
                type:CLEARERROR
                
            })
          }, 5000)
          

    }
}
export const signup =(formData,history)=>async(dispatch)=>{
    try {
        // signup user
        const {data} = await api.signUp(formData);
        dispatch({
            type:AUTH,
            data
        })
        
        history.push('/')
    } catch (error) {
        let errorData = error.response.data;
        // console.log(errorData.response.data)
        dispatch({
            type:ADDERROR,
            payload:errorData
        })

        setTimeout(() => {
            dispatch({
                type:CLEARERROR
                
            })
          }, 5000)
    }
}