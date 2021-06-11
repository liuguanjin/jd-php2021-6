import Vue from 'vue';
import App from './App.vue';
//引入elementUI部分组件
import {Menu,DatePicker,Switch,Rate,Tabs,TabPane,Select,Option,Carousel,CarouselItem,Submenu,Upload,MenuItem,Dialog,Message,MessageBox,Pagination,Form,FormItem,Input,Cascader,Radio,Table,TableColumn,Container,Button,BreadcrumbItem,Breadcrumb,Header,Aside,Main,Footer,Row,Col,Icon,Dropdown,DropdownMenu,DropdownItem,} from 'element-ui';
//引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入router路由
import router from "./components/routers/index.js";
// 引入vuex store对象
import store from "./components/store/index.js";
//引入myaxios插件
import myaxios from "@/assets/js/myaxios.js";
//引入前台homeaxios插件
import homeaxios from "@/assets/js/homeaxios.js";
import '../style/iconfont.css';
//注册myaxios插件
Vue.use(myaxios);
//注册homeaxios插件
Vue.use(homeaxios);
// 使用use方法引入muse-ui nav组件
// 使用use方法引入element组件
Vue.use(Menu);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(Rate);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Upload);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Cascader);
Vue.use(Radio);
Vue.use(BreadcrumbItem);
Vue.use(Breadcrumb);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Aside);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Container);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App)
})

