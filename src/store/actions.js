import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types";

export default {

  addCart(context, payload) {
    return new Promise((reslove, reject) => {
      let oldProduct = null;//这个是为了记录那个商品有没有被加入过，如果加入过，就把他记录下来，然后让他里面的count+1
      for (let item of context.state.cartList) {
        if (item.iid == payload.iid) {
          oldProduct = item;
        }
      }
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        reslove("商品数量+1")
      } else {
        context.commit(ADD_TO_CART, payload)
        reslove("商品+1")
      }
    })
  }

}