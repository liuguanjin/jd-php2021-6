//引入axios
import Axios from 'axios';
//引入router
import router from '../../components/routers/index.js';
//自定义插件对象
var homeaxios = {};

homeaxios.install = function(vue){
	//设置axios请求的公共URL
	var axios_obj = Axios.create({
		baseURL:'http://www.liuguanjin.top:8100/',
	});

	//使用axios拦截器，在请求前进行判断
	axios_obj.interceptors.request.use(function(conf){
		var userinfo = localStorage.getItem('userinfo');
		if (userinfo != '' && userinfo != undefined && userinfo != null){
			conf.headers.Authorization = userinfo.token;
		}
		if (conf.url == 'login') {
			delete conf.headers.Authorization
		}else if(conf.url == 'captcha'){
			delete conf.headers.Authorization
		}
		//将拦截器的操作返回给axios对象
		return conf;
	})

	//使用axios拦截器，在相应后进行判断
	axios_obj.interceptors.response.use(function(res){
		if (res.data.code == 403) {
			router.push({'path':'/mine'});
			localStorage.setItem('token','');
		}
		return res;
	})
	//将设置好的axios对象复制给Vue示例的原型，之后使用this.$myHttp使用axios发送请求
	vue.prototype.$homehttp = axios_obj;
}

//将插件以模块方式导出
export default homeaxios;