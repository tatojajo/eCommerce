import { HomeState } from "../../../@types/general";
import { SAVE_PRODUCTS_DATA } from "./actions";
import { HOME_ACTIONS } from "./types";

const initialState: HomeState = {
    products: [],
    loading: false,
    error: null,
    sliderImages: [],
    totalProducts: 0
};


const homeReducer = (state = initialState, action:HOME_ACTIONS)=>{
    switch(action.type){
        case SAVE_PRODUCTS_DATA:
        return {
            ...state, products: action.payload
        }
        default:
            return state
    }
}

export default homeReducer;