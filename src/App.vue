<template>
  <div id="app">
    <!-- 返回之后界面停留在返回之前的位置 keepalive -->
  	<keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
  	</keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 提示对话框 -->
    <el-dialog title="提示信息" :visible.sync="dialogVisible" width="350px">
      <p class="red margin">此网站只用做简历展示,不作为商业用途,如有引用,请标明出处</p>
      <p class="red margin">此网站数据只做展示,绝无恶意,如有存在抄袭,请联系作者删除</p>
      <p class="red margin">联系方式:QQ 554426438</p>
      <p class="margin big">下表提供用于登录的用户名密码,您也可以自己注册</p>
      <el-table :data="userTable">
        <el-table-column property="user" label="用户名" width="150"></el-table-column>
        <el-table-column property="password" label="密码" width="200"></el-table-column>
      </el-table>
      <p class="margin big">下表提供后台管理的管理员及密码,您也可以自己注册成为商家(<span class="red">请勿删除或修改其中数据,谢谢配合</span>)</p>
      <el-table :data="adminTable">
        <el-table-column property="admin" label="管理员" width="150"></el-table-column>
        <el-table-column property="password" label="密码" width="200"></el-table-column>
        <el-table-column property="role" label="角色" width="200"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 底部标签栏 -->
    <tabbar></tabbar>
  </div>
</template>

<script>
// 引入tabbar
import tabbar from "./components/tabbar.vue";
import axios from "axios";
import qs from "qs";
//使用vuex保存登录状态
import {mapActions,mapState} from "vuex";
export default {
  components:{
    "tabbar":tabbar
  },
  data(){
    return {
      dialogVisible:true,
      userTable:[{
        user:'lgj19812345678',password:'lgj123456'
      },{
        user:'测试1',password:'lgj123456'
      },{
        user:'lgj19712345678',password:'lgj123456'
      },{
        user:'lgj13312345678',password:'lgj123456'
      }],
      adminTable:[{
        admin:'admin',password:'lgj123456',role:'超级管理员'
      },{
        admin:'千叶林',password:'lgj123456',role:'商家'
      },{
        admin:'回力',password:'lgj123456',role:'商家'
      },{
        admin:'龙辰语',password:'lgj123456',role:'商家'
      }]
    }
  },
  created(){
    this.getData();
    window.addEventListener('beforeunload',e=>this.beforeLoad(e));
  },
  methods:{
    ...mapActions({
      replaceCartArr:"replaceCartArr",
      replaceCollectArr:"replaceCollectArr",
      replaceCollectNum:"replaceCollectNum",
      replaceFootprintArr:"replaceFootprintArr",
      replaceFootprinttNum:"replaceFootprinttNum",
      calculate:"calculateAllMoney"
    }),
    beforeLoad(e){
      var userinfo = localStorage.getItem('userinfo');
      if (userinfo != '' && userinfo != undefined && userinfo != null) {
        userinfo = JSON.parse(userinfo)
        var user_id = userinfo.user_id;
        this.$homehttp({
          url:'cart/'+user_id,
          method:'put',
          data:this.cartArr
        }).then(result=>{

        })
        this.$homehttp({
          url:'collect/'+user_id,
          method:'put',
          data:this.collectArr
        }).then(result=>{

        }) 
        this.$homehttp({
          url:'footprint/'+user_id,
          method:'put',
          data:this.footprintArr
        }).then(result=>{

        })
      }else{
        localStorage.setItem("cartArr",JSON.stringify(that.cartArr));
      }
    },
    getData(){
      var userinfo = localStorage.getItem('userinfo');
      if (userinfo != '' && userinfo != undefined && userinfo != null) {
        userinfo = JSON.parse(userinfo)
        var user_id = userinfo.user_id;
        this.$homehttp({
          url:'cart/'+user_id
        }).then(result=>{
          const {code,msg,data} = result.data;
          if (code == 200) {
            this.replaceCartArr(data);
            this.calculate();
          }else{
          }
        })
        this.$homehttp({
          url:'collect/'+user_id
        }).then(result=>{
          const {code,msg,data} = result.data;
          if (code == 200) {
            this.replaceCollectArr(data);
            this.replaceCollectNum(data.length);
          }else{
          }
        })
        this.$homehttp({
          url:'footprint/'+user_id
        }).then(result=>{
          const {code,msg,data} = result.data;
          if (code == 200) {
            this.replaceFootprintArr(data);
            var num = 0;
            for(var i = 0;i < data.length;i ++ ){
              for(var j = 0;j < data[i].detail.length; j ++){
              }
              num += j;
            }
            this.replaceFootprinttNum(num);
          }else{
          }
        })
      }else{
        if (localStorage.getItem('cartArr') != '' && localStorage.getItem('cartArr') != undefined) {
          this.replaceCartArr(localStorage.getItem('cartArr'));
        }
      }
    },
  },
  computed:{
    ...mapState({
      cartArr:state => state.cart.cartArr,
      collectArr:state => state.collect.collectArr,
      footprintArr:state => state.footprint.foorprintArr
    })
  }
}
</script>

<style lang="less" scoped>
	@import url("./components/less/reset.less");
  #app{
    max-width:800px;
    margin:0 auto;
    .el-dialog{
      .red{
        color:red;
      }
      .margin{
        margin:10px 0;
      }
      .big{
        font-size:18px;
      }
      .red{
        color:red;
      }
    }
  }
</style>
