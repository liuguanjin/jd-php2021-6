<template>
	<!-- 分类页面的内容 -->
	<div class="classify-main" v-if="isShow">
		<!-- 左侧内容 -->
		<div class="left-content">
			<ul class="content">
				<li 
				v-for="(item,index) in category"
				:key="index"
				@click="categoryOneClick(index)"
				:class="index === active?'active':''"
				>
					{{item.cate_name}}
				</li>
			</ul>
		</div>
		<!-- 右侧详情 -->
		<div class="detail-content">
			<div
			v-for="(item1,index1) in category"
			:key="index1"
			class="right-content"
			v-if="index1===active"
			>	
				<div class="right-content-left">
					
				</div>
				<div class="right-content-right">
					<div  
				 	v-for="(item2,index2) in item1.son"  
				 	:key="index2" 
				 	class="right-content-li"
				 	>
					 	<h4>{{item2.cate_name}}</h4>
					 	<ul class="content-detail">
					 		<li 
					 		v-for="(item3,index3) in item2.son" 
					 		:key="index3" 
					 		class="content-li"  
					 		@click="toClassifyDetail(item3.id)"
					 		>
					 			<img 
					 			:src="'http://www.liuguanjin.top:8101'+item3.image_url" 
					 			alt="正在加载"
					 			>
					 			<p>{{item3.cate_name}}</p>
					 		</li>
					 	</ul>
				 	</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			category:[],
			active:0,
		}
	},
	created(){
		this.getCategory();
	},
	methods:{
		getCategory(){
			this.$homehttp({
				url:'category'
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.category = data;
				}else{
					this.$message({message:msg,type:'warning'});
				}
			})
		},
		categoryOneClick(index){
			//将active值修改为左侧点击的具体index
			this.active = index;
		},
		toClassifyDetail(id){
			this.$router.push({name:'classify-detail',query:{id:id}});
		}
	},
	props:["isShow"]
}	
</script>

<style lang="less" scoped>
@import url("../less/common.less");
@import url("../less/reset.less");
.classify-main{
	width:100%;
	margin-top:@navHeight;
	margin-bottom:60px;
	height:100%;
	position:relative;
	.left-content{
		width:10%;
		min-width:70px;
		background-color:#eee;
		position:absolute;
		z-index:1;
		.content{
			height:100%;
			li{
				height:60px;
				.titleStyle(#000,@textSize,center);
				line-height:60px;
				cursor: pointer;
				-webkit-tap-highlight-color: transparent;
			}
			.active{
				background-color:white;
				color:#e93b3d;
			}
		}
	}
	.detail-content{
		background-color:white;
		.right-content{
			display:flex;
			flex-direction:row;
			.right-content-left{
				width:10%;
				min-width:70px;
				z-index:0;
			}
			.right-content-right{
				width:90%;
				h4{
					height:40px;
					line-height:40px;
					font-size:14px;
					font-weight:700;
				}
				.content-detail{
					margin-left:5%;
					.flexRowCenter();
					justify-content:center;
					flex-wrap:wrap;
					li{
						margin-right:5%;
						width:25%;
						background-color:white;
						border:1px solid #eee;
						border-radius:8px;
						margin-bottom:5px;
						img{
							margin-top:5px;
							width:100%;
							height:70%;
							border-bottom:2px solid #f7f7f7;
						}
						p{
							width:100%;
							height:25px;
							line-height:25px;
							font-size:12px;
							text-align:center;
						}
					}
				}
			}
		}
	}
}
</style>