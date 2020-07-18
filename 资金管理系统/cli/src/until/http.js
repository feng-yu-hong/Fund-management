import axios from 'axios';
import router from '../router/index'
//设置基本链接
let baseUrl = ""
//如果是0为开发环境，1是生产环境
switch (0) {
  case 0:
    baseUrl = "http://gitme.free-http.svipss.top"; //开发环境
    break;
  case 1:
    baseUrl = "http://gitme.free-http.svipss.top"; //生产环境
    break;
}
axios.defaults.baseURL = baseUrl


//请求拦截 设置统一的header
axios.interceptors.request.use(function(config){
  // if (localStorage.eleToken != "") {
  //   config.headers.Authorization = 'Bearer ' + localStorage.eleToken
  // }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

//响应拦截
axios.interceptors.response.use(
  res => {
    return res
  }, error => {
    // 捕获401
    // console.log('没有登录');
    // console.log(error.response.status);
    if(error.response.status==401){

      router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default axios;