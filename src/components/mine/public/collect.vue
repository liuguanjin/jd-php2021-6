<template>
  <div class="collect">
  	<div class="header">
  		<i class="el-icon-back back" @click="back"></i>
  		<p>收藏夹</p>
  	</div>
  	<div class="collect-content">
  		<div class="collect-good" v-for="(item,index) in collectDetail" @click="toDetail(item.id)">
  			<img 
  			:src="defaultImage" 
	 			v-real-img="'http://www.liuguanjin.top:8101'+item.goods_logo"
  			>
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
			collectDetail:[],
			defaultImage:this.defaultImage,
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
			justify-content:flex-start;
			height:30px;
			background-color:#eee;
			line-height:30px;
			p{
				margin:0 auto;
				font-size:15px;
			}
			.back{
				margin-left:10px;
				cursor: pointer;
			}
		}
		.collect-content{
			div.collect-good:hover{
				color:pink;
			}
			.collect-good{
				.flexRowCenter();
				margin:10px auto;
				padding:10px;
				background-color:white;
				border-radius:10px;
				cursor:pointer;
				img{
					align-self:flex-start;
					width:100px;
					height:100px;
				}
				div{
					.flexColumnCenter();
					align-self:flex-start;
					margin-left:10px;
					p{
						margin:0;
						padding:0;
					}
					.title{
						overflow:hidden;
						width:100%;
						height:40px;
						line-height:20px;
						text-overflow:ellipsis;
					}
					.price{
						align-self:flex-start;
						margin-top:30px;
						color:@mallColor;
					}
				}
			}
		}
	}
</style>
