import { SAVE_PRODUCTS_LIST } from "./action"
import { ADMIN_ACTIONS } from "./types"


const adminInitialState:AdminState = {
    allProducts:[]
}

const adminReducer = (state = adminInitialState, action:ADMIN_ACTIONS)=>{
   
    switch(action.type){
        case SAVE_PRODUCTS_LIST:
            return {...state, allProducts: action.products}
        default:
            return state
    }
}

export default adminReducer