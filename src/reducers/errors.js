import { ADDERROR,CLEARERROR } from '../constants/actionTypes';
const errorReducer = (state=[],action) =>{
    switch (action.type) {
        case ADDERROR:
            console.log('ERROR WAS ADDED')
          
          return [...state,action.payload];
        case CLEARERROR:
            console.log('ERROR WAS CLEARED')
          return [];  
        
        default:
            return state;
      }
}
export default errorReducer;