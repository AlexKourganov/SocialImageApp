import { ADDERROR,CLEARERROR } from '../constants/actionTypes';
const errorReducer = (state=[],action) =>{
    switch (action.type) {
        case ADDERROR:
            
          
          return [...state,action.payload];
        case CLEARERROR:
            
          return [];  
        
        default:
            return state;
      }
}
export default errorReducer;