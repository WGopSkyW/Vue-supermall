import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types";

export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.count = 1;
    payload.checked = false
    state.cartList.push(payload)
  }
}