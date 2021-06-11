<template>
  <div class="collect">
  	<div class="header">
  		<i class="el-icon-back back" @click="back"></i>
  		<p>收藏夹</p>
  	</div>
  	<div class="collect-content">
  		<div class="collect-good" v-for="(item,index) in collectDetail" @click="toDetail(item.id)">
  			<img :src="'http://www.liuguanjin.top:8101'+item.goods_logo" alt="">
  			<div>
  				<p class="title">{{item.goods_name}}</p>
  				<p class="price">¥{{item.goods_price}}</p>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
	data(){
		return {
			collectDetail:[]
		}
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		toDetail(id){
			this.$router.push({name:"detail",query:{id:id}});
		}
	},
	computed:{
		...mapState({
	 		collectArr:state => state.collect.collectArr
		})
	},
 	created(){
 		this.$homehttp({
 			url:'collect',
 			method:'post',
 			data:this.collectArr
 		}).then(result=>{
 			const {code,msg,data} = result.data;
 			if (code == 200) {
 				this.collectDetail = data;
 			}else{
 				this.$message({message:msg,type:'warning'});
 			}
 		})
 	}
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	.collect{
		.header{
			.flexRowCenter();
			background-color:#eee;
			justify-content:flex-start;
			height:30px;
			line-height:30px;
			p{
				margin:0 auto;
				font-size:15px;
			}
			.back{
				margin-left:10px;
			}
		}
		.collect-content{
			div.collect-good:hover{
				cursor:pointer;
				color:pink;
			}
			.collect-good{
				background-color:white;
				margin:10px auto;
				padding:10px;
				border-radius:10px;
				.flexRowCenter();
				img{
					width:100px;
					height:100px;
					align-self:flex-start;
				}
				div{
					margin-left:10px;
					align-self:flex-start;
					.flexColumnCenter();
					p{
						margin:0;
						padding:0;
					}
					.title{
						height:40px;
						line-height:20px;
						overflow:hidden;
						text-overflow:ellipsis;
						width:100%;
					}
					.price{
						margin-top:30px;
						align-self:flex-start;
						color:@mallColor;
					}
				}
			}
		}
	}
</style>
