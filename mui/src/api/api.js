import $http from './../../config/http'
const api = {
  async user(){
    let login;
    await $http.get('/users/checkLogin').then((res)=>{
      if(res.data.status=='0'){
        login=true
      }else {
        login=false
      }
    });
    return login
  }
};
Object.defineProperty(api,'install',{
  configurableL: false,
  enumerable: false,
  writable: false,
  value: function (Vue,options) {
    Vue.$api=api;
    Vue.prototype.$api=api;
  }
});

export default api
