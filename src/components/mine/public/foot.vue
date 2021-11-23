<template>
  <div class="footprint">
  	<div class="header">
  		<i class="el-icon-back back" @click="back"></i>
		<p>足迹</p>
	</div>
	<el-date-picker
	v-model="value3"
	type="date"
	placeholder="选择日期"
	value-format="timestamp"
	@change="changeDate"
	>
	</el-date-picker>
    <div class="footprint-content">
    	<div class="content-detail" v-for="(item,index) in footDetailShow">
    		<p class="date">{{timestampToDate(item.date)}}</p>
    		<div class="detail">
	    		<div class="goods" v-for="(item1,index1) in item.detail" @click="enterGoods(item1.id)">
	    			<img 
	    			:src="defaultImage" 
		 				v-real-img="'http://www.liuguanjin.top:8101'+item1.goods_logo"
	    			>
	    			<p class="price">¥{{item1.goods_price}}</p>
	    		</div>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
	data () {
	    return {
	      value3: undefined,
	      value1: new Date(),
	      footDetail:[],
	      footDetailShow:[],
	      defaultImage:this.defaultImage,
	    }
	},
	computed:{
		...mapState({
			footArr:state => state.footprint.foorprintArr
		})
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		getDate(){
			let date = new Date();
			//y-m-d格式
			//let y = date.getFullYear();
			//let m = date.getMonth()+1;
			//m = m < 10 ? "0" + m : m;
			//let d = date.getDate();
			//d = d < 10 ? "0" + d : d;
			//this.value3 = y + "-" + m + "-" + d; 
			//时间戳格式 这样得到的是0时0分0秒
			this.value3 = date;
		},
		//到商品详情界面
		enterGoods(id){
			this.$router.push({name:"detail",query:{id:id}});
		},
		//时间戳转日期格式
		timestampToDate(timestamp){
			let length = 0;
			if (typeof(timestamp) === 'number') {
				length = timestamp.toString().length
			}else{
				length = timestamp.length;
			}
			if (length === 10) {
				timestamp = timestamp * 1000;
			}
			let date = new Date(timestamp);
			let y = date.getFullYear();
			let m = date.getMonth()+1;
			m = m < 10 ? '0' + m : m;
			let d = date.getDate();
			d = d < 10 ? '0' + d : d;
			return y + '-' + m + '-' + d; 
		},
		//更改el-date-picker执行的函数
		changeDate(){
			var footDetail = this.footDetail;
			footDetail = footDetail.filter((item)=>{
				//得到毫秒数
				var t = item.date * 1000;
				//this.value3是选择日期的0时0分0秒 +8639999加一天
				if (t <= (this.value3 + 86399999)) {
					return true;
				}
			})
			this.footDetailShow = footDetail;
		},
	},
	created(){
		var userinfo = JSON.parse(localStorage.getItem('userinfo'));
		if (userinfo == '' || userinfo==null || userinfo == undefined) {
			this.$message({message:'尚未登录,请先登录',type:'warning'});
			this.$router.push('/mine');
		}else{
			this.getDate();
			this.$homehttp({
				url:'footprint',
				method:'post',
				data:this.footArr
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.footDetail = data;
					this.footDetailShow = data;
				}else{
					this.$message({message:msg,type:'warning'});
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	.footprint{
		.header{
			.flexRowCenter();
			justify-content:flex-start;
			height:44px;
			background-color:#eee;
			line-height:44px;
			p{
				margin:0 auto;
				font-size:15px;
			}
			.back{
				margin-left:10px;
				cursor: pointer;
			}
		}
		.footprint-content{
			.flexRowCenter();
			flex-wrap:wrap;
			.content-detail{
				width:100%;
				.date{
					margin-left:5px;
				}
				.detail{
					.flexRowCenter();
					flex-wrap:wrap;
					div.goods:hover{
						color:pink;
						cursor:pointer;
					}
					.goods{
						width:30%;
						margin:0 5px;
						img{
							width:100%;
						}
						.price{
							margin:0;
							margin-top:5px;
							padding:0;
							color:@mallColor;
						}
					}
				}
			}
		}
	}
</style>