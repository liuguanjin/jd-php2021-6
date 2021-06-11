<template>
  	<div class="login-success">
  		<div class="logsuc-header">
  			<div class="head-top">
          <div class="head-img">
  	  			<img :src="userDetail.avatar?'http://www.liuguanjin.top:8101'+userDetail.avatar:''" alt="">
    				<p>{{userDetail.nickname}}</p>
          </div>
	  			<div class="iconbox">
            <i class="el-icon-user"></i>
            <i class="el-icon-s-tools" @click="toSetting(id)"></i>
	  			</div>
  			</div>
  			<div  class="head-bottom">
  				<div @click="toCollect">
  					<p>{{collectNum}}</p>
  					<p>收藏夹</p>
  				</div>
  				<div @click="toFollowShop">
  					<p>{{followNum}}</p>
  					<p>关注店铺</p>
  				</div>
  				<div @click="toMyfoot">
  					<p>{{footprintNum}}</p>
  					<p>足迹</p>
  				</div>
  				<div>
  					<p>{{couponNum}}</p>
  					<p>红包卡卷</p>
  				</div>
  			</div>
  		</div>
  		<div class="order">
  			<div class="myorder">
  				<p class="weight">我的订单</p>
  				<p class="gray" @click="toAllorder">查看全部订单 > </p>
  			</div>
  			<div class="order-detail">
  				<div class="nopay" @click="toNopay">
            <span>{{nopayNumber}}</span>
            <i class="el-icon-jddaifukuan icon"></i>
  					<p>待付款</p>
  				</div>
  				<div class="nosend" @click="toNosend">
            <span>{{nosendNumber}}</span>
            <i class="el-icon-jddaifahuo icon"></i>
  					<p>待发货</p>
  				</div>
  				<div class="noaccept" @click="toNoaccept">
            <span>{{noacceptNumber}}</span>
            <i class="el-icon-jddaishouhuo icon"></i>
  					<p>待收货</p>
  				</div>
  				<div class="noevaluate" @click="toNoevaluate">
            <span>{{noevaluateNumber}}</span>
            <i class="el-icon-jdweibiaoti527 icon"></i>
  					<p>评价</p>
  				</div>
  				<div class="refund" @click="toRefund">
            <span>{{refundNumber}}</span>
            <i class="el-icon-jdshouhou icon"></i>
  					<p>退款/售后</p>
  				</div>
  			</div>
  		</div>
  		<div class="tool">
  			<div class="tool-text">
  				<p class="weight">必备工具</p>
  				<p class="gray">查看全部工具 > </p>
  			</div>
  			<div class="tool-detail">
  				<div class="cash">
            <i class="el-icon-jdfanli icon"></i>
				    <p>每日返现</p>
				  </div>
				  <div class="ticket">
            <i class="el-icon-jdqian1 icon"></i>
				    <p>领劵中心</p>
				  </div>
				  <div class="change">
            <i class="el-icon-jd-exchange icon"></i>
				    <p>闲置换钱</p>
				  </div>
				  <div class="service">
            <i class="el-icon-jdkefu icon"></i>
				    <p>客服小蜜</p>
				  </div>
				  <div class="huabei">
            <i class="el-icon-jdhuabei icon"></i>
				    <p>花呗</p>
				  </div>
				  <div class="cainiao">
            <i class="el-icon-jdlogo icon"></i>
				    <p>菜鸟驿站</p>
				  </div> 
          <div class="shop" @click="toShop">
            <i class="el-icon-s-shop icon"></i>
            <p>我是商家</p>
          </div>
				  <div class="more">
            <i class="el-icon-jdgengduo icon"></i>
				    <p>更多</p>
				  </div>
  			</div>
  		</div>
  	</div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import axios from "axios";
import qs from "qs";
export default {
  mounted(){

  },
  data(){
    return{
        followNum:0,
        couponNum:0,
        id:0,
        shopCollectArr:[],
        orderList:[],
        nopayNumber:0,
        nosendNumber:0,
        noacceptNumber:0,
        noevaluateNumber:0,
        refundNumber:0,
        userDetail:{

        },
    }
  },
  computed:{
    ...mapState({
      collectNum:state => state.collect.collectNum,
      footprintNum:state => state.footprint.footprintNum
    })
  },
  created(){
    this.id = this.$route.query.id;
    var userinfo = localStorage.getItem('userinfo');
    if (userinfo == '' || userinfo === undefined || userinfo === null) {
      this.$router.push('/mine');
    }else{
      this.id = JSON.parse(userinfo).user_id;
    }
    this.getUserDetail();
    this.getShopCollectArr();
    this.carculate(true);
    this.shopNumTotal();
    this.getOrderList();
  },
  methods:{
    ...mapActions({
      carculate:"calculateAllMoney",
      shopNumTotal:"totalShopNum"
    }),
    getUserDetail(){
      this.$homehttp({
        url:'user/'+this.id
      }).then(result=>{
        const {code,msg,data} = result.data;
        if (code == 200) {
          this.userDetail = data;
        }else{

        }
      })
    },
    toAllorder(){
      this.$router.push({name:'order',query:{name:'quanbu'}});
    },
    toSetting(){
      this.$router.push({name:'setting',query:{id:this.id}});
    },
    toCollect(){
      this.$router.push("/collect");
    },
    toMyfoot(){
      this.$router.push("/foot");
    },
    toFollowShop(){
       this.$router.push({name:'followShop',query:{shopCollectArr:this.shopCollectArr}});
    },
    toNopay(){
      this.$router.push({name:'order',query:{name:'daifukuan'}});
    },
    toNosend(){
      this.$router.push({name:'order',query:{name:'daifahuo'}});
    },
    toNoaccept(){
      this.$router.push({name:'order',query:{name:'daishouhuo'}});
    },
    toNoevaluate(){
      this.$router.push({name:'order',query:{name:'daipingjia'}});
    },
    toRefund(){
      this.$router.push({name:'order',query:{name:'tuikuan'}});
    },
    getShopCollectArr(){
      this.$homehttp({
        url:'collect-shop?user_id='+this.id
      }).then(result=>{
        const {code,msg,data} = result.data;
        if (code == 200) {
          if(data.shop_ids[0] === ""){
            this.shopCollectArr = [];
            this.followNum = 0;
          }else{
            this.shopCollectArr = data.shop_ids;
            this.followNum = data.shop_ids.length;
          }
        }
      })
    },
    getOrderList(){
      this.$homehttp({
        url:'order?user_id='+this.id
      }).then(result=>{
        const {code,msg,data} = result.data;
        if (code == 200) {
          this.orderList = data;
          for(var i = 0;i < data.length;i ++ ){
            for(var j = 0;j < data[i].order_goods.length;j ++ ){
              switch(data[i].order_goods[j].status){
                case 0:
                  this.nopayNumber += 1;
                  break;
                case 1:
                  this.nosendNumber += 1;
                  break;
                case 2:
                  this.noacceptNumber += 1;
                  break;
                case 3:
                  this.noevaluateNumber += 1;
                  break;
                case 6:
                  this.refundNumber += 1;
                  break;
                case 7:
                  this.refundNumber += 1;
                  break;
              }
            }
          }
        }else{

        }
      })
    },
    toShop(){
      this.$confirm('将跳转至商家登录界面,并清除登录信息,是否继续?','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$message({
          type:'success',
          message:'即将跳转!'
        });
        setTimeout(()=>{
          localStorage.removeItem('userinfo');
          this.$router.push('adminLogin');
        },1500)
      }).catch(()=>{
        this.$message({
          type:'warning',
          message:'已取消跳转'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import url("../../less/common.less");
  .login-success{
      .weight{
          margin-left:10px;
          font-weight:bold;
      }
      .gray{
          cursor:pointer;
          color:gray;
      }
      height:1024px;
      background-color:#eee;
      .logsuc-header{
          height:180px;
          background-color:#FF5C00;
          margin-bottom:10px;
          .flexColumnCenter();
          .head-top{
              margin-top:10px;
              width:100%;
              .flexRowCenter();
              justify-content:space-between;
              .head-img{
                  .flexRowCenter();
                  align-self:flex-start;
                  img{
                      width:50px;
                      height:50px;
                      border-radius:50%;
                      margin:0 10px;
                  }
              }
              .iconbox{
                   margin-top:-20px;
                   margin-right:20px;
                   font-size:20px;
              }
          }
          .head-bottom{
              margin-top:20px;
              width:100%;
              .flexRowCenter();
              div{
                  cursor:pointer;
                  width:25%;
                  .flexColumnCenter();
                  p{
                      margin:5px 0;
                      padding:0;
                  }
              }
          }
      }
      .order{
          width:95%;
          border-radius:15px;
          margin:0 auto;
          background-color:#fff;
          margin-top:-30px;
          margin-bottom:10px;
          .flexColumnCenter();
          .myorder{
              width:100%;
              .flexRowCenter();
              justify-content:space-between;
              border-bottom:1px solid #eee;
          }
          .order-detail{
              width:100%;
              .flexRowCenter();
              margin-top:15px;
              div{
                  cursor:pointer;
                  width:25%;
                  .flexColumnCenter();
                  position:relative;
                  span{
                    position:absolute;
                    top:-10px;
                    right:10px;
                    color:red;
                    width:20px;
                    height:20px;
                    line-height:20px;
                    text-align:center;
                    border:1px solid red;
                    border-radius:50%;
                  }
                  .icon{
                      font-size:30px;
                      color:#FF5C00;
                      font-weight:800;
                  }
              }
          }
      }
      .tool{
          width:95%;
          border-radius:15px;
          margin:0 auto;
          background-color:#fff;
          .flexColumnCenter();
          .tool-text{
              border-bottom:1px solid #eee;
              width:100%;
              .flexRowCenter();
              justify-content:space-between;
          }
          .tool-detail{
              width:100%;
              .flexRowCenter();
              flex-wrap:wrap;
              div{
                  margin:20px 0;
                  width:25%;
                  .flexColumnCenter();
                  .icon{
                    font-size:30px;
                    font-weight:800;
                  }
                  p{
                    margin:0;
                  }
              }
              .cash{
                .icon{
                  color:#FC2B26;
                }
              }
              .ticket{
                .icon{
                    color:#FFA009;
                }
              }
              .change{
                .icon{
                    color:#F61C24;
                }
              }
              .service{
                .icon{
                    color:#FEB623;
                }
              }
              .huabei{
                .icon{
                    color:#38ABFA;
                }
              }
              .cainiao{
                .icon{
                    color:#039EFC;
                }
              }
              .more{
                .icon{
                  color:gray;
                }
              }
              .shop{
                .icon{
                  color:skyblue;
                }
              }
          }
      }
  }
</style>
