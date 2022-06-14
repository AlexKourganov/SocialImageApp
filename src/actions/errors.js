import { ADDERROR,CLEARERROR } from '../constants/actionTypes';

export const addError =(error)=>async(dispatch)=>{
    
    dispatch({ type: ADDERROR, payload: error });
}
export const clearError =()=>async(dispatch)=>{
    dispatch({ type: CLEARERROR });
}