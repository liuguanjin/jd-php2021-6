<template>
  <div class="footprint">
  	<div class="head">
  		<i class="el-icon-back back" @click="back"></i>
		<p>足迹</p>
	</div>
	<el-date-picker
  	v-model="value3"
  	type="date"
  	placeholder="选择日期">
	</el-date-picker>
    <div class="footprint-content">
    	<div class="content-detail" v-for="(item,index) in footDetail">
    		<p class="date">{{item.date}}</p>
    		<div class="detail">
	    		<div class="goods" v-for="(item1,index1) in item.detail" @click="enterGoods(item1.id)">
	    			<img :src="'http://www.liuguanjin.top:8101'+item1.goods_logo" alt="">
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
	      footDetail:[]
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
			let y = date.getFullYear();
			let m = date.getMonth()+1;
			m = m < 10 ? "0" + m : m;
			let d = date.getDate();
			d = d < 10 ? "0" + d : d;
			this.value3 = y + "-" + m + "-" + d; 
		},
		enterGoods(id){
			this.$router.push({name:"detail",query:{id:id}});
		}
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
		.head{
			.flexRowCenter();
			justify-content:flex-start;
			height:44px;
			background-color:#eee;
			line-height:44px;
			p{
				margin:0 auto;
				font-size:15px;
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