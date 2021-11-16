<template>
	<!-- 分类页面的内容 -->
	<div class="classify-main" v-if="!isShow">
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
	position:relative;
	width:100%;
	height:100%;
	margin-top:@navHeight;
	margin-bottom:60px;
	.left-content{
		position:absolute;
		z-index:1;
		width:10%;
		min-width:70px;
		background-color:#eee;
		.content{
			height:100%;
			li{
				height:60px;
				.titleStyle(#000,@textSize,center);
				line-height:60px;
				-webkit-tap-highlight-color: transparent;
				cursor: pointer;
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
				z-index:0;
				width:10%;
				min-width:70px;
			}
			.right-content-right{
				width:90%;
				h4{
					height:40px;
					font-size:14px;
					font-weight:700;
					line-height:40px;
				}
				.content-detail{
					.flexRowCenter();
					justify-content:center;
					flex-wrap:wrap;
					margin-left:5%;
					li{
						width:25%;
						margin-right:5%;
						margin-bottom:5px;
						border:1px solid #eee;
						background-color:white;
						border-radius:8px;
						cursor:pointer;
						img{
							width:100%;
							height:70%;
							margin-top:5px;
							border-bottom:2px solid #f7f7f7;
						}
						p{
							width:100%;
							height:25px;
							text-align:center;
							font-size:12px;
							line-height:25px;
						}
					}
				}
			}
		}
	}
}
</style>