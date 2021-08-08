import Toast from './Toast.vue'
const obj = {}

obj.install = function(Vue){
  // console.log("-------------")
  // 1、创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2、new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()

  // 3、将组件对象挂载到一个自己创建出来的div元素上
  toast.$mount(document.createElement('div'))

  // 4、将元素加入到当前调用该对象的页面的body里面
  document.body.appendChild(toast.$el)

  // 5、将组件添加到原型里面 ,添加到原型之后，
  // 但是实际其它页面需要的是显示该组件里面的模板，所以我们需要额外把组件里面的模板添加到页面里面的body里
  Vue.prototype.$toast = toast;
}

export default obj