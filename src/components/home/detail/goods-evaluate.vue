<template>
	<div class="goods-evaluate">
		<!-- 商品的评论界面 -->
		<!-- 评论的头部 -->
		<div class="header">
			<div class="back" @click="back">
				<span></span>
			</div>
			<div class="title">
				商品评价
			</div>
			<div class="more">
  				<el-dropdown trigger="click" @command="handleCommand">
					<i class="el-icon-more"></i>
			      	<el-dropdown-menu slot="dropdown">
			        	<el-dropdown-item icon="el-icon-s-home" command="home">首页</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-search" command="classify">分类搜索</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-shopping-cart-2" command="cart">购物车</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-user" command="mine">个人中心</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-s-data" command="foot">足迹</el-dropdown-item>
			      	</el-dropdown-menu>
			    </el-dropdown>
  			</div>
		</div>
		<!-- 评论的标签 -->
		<div class="sign">
			<span @click="choice($event,'all')">全部({{evaluateData.length}})</span>
			<span @click="choice($event,'time')">最新</span>
			<span @click="choice($event,'haoping')">好评({{evaluateData.filter((item)=>item.evaluate_grade == 0).length}})</span>
			<span @click="choice($event,'zhongping')">中评({{evaluateData.filter((item)=>item.evaluate_grade == 1).length}})</span>
			<span @click="choice($event,'chaping')">差评({{evaluateData.filter((item)=>item.evaluate_grade == 2).length}})</span>
			<span @click="choice($event,'images')">有图({{evaluateData.filter((item)=>item.evaluate_images.length > 0).length}})</span>
		</div>
		<div class="evaluate">
	  		<div class="evaluate-top">
	  			<div class="evaluate-top-left">
	  				<span>评价</span>
	  				<span>{{evaluateData.length}}</span>
	  			</div>
	  			<div class="evaluate-top-right">
	  				<span>
	  					好评度{{haopingPercent}}
  					</span>
	  			</div>
	  		</div>
	  		<!-- 评论内容 -->
	  		<div class="evaluate-content">
	  			<div class="none-evaluate" v-if="evaluateShowData.length == 0">
	  				暂无相关评价
	  			</div>
	  			<div v-else>
	  				<div 
	  				class="evaluate-item" 
	  				v-for="(item,index) in evaluateShowData"
	  				>
	  					<div 
	  					class="evaluate-item-top"
	  					>
	  						<div class="evaluate-item-top-left">
	  							<img 
	  							class="avatar"
	  							:src="defaultImage" 
	 							v-real-img="'http://www.liuguanjin.top:8101'+item.avatar"
	 							>
	  							<span 
	  							class="nickname"
	  							>
	  								{{item.nickname}}
	  							</span>
		  						<el-rate
			  					v-model="item.evaluate_describe_score"
			  					disabled
			  					>
								</el-rate>
	  						</div>
	  						<div class="evaluate-item-top-right">
	  							{{item.create_time}}
	  						</div>
	  					</div>
						<div 
						class="evaluate-item-img"
						v-if='item.evaluate_images.length!=0'
						>
							<img
							v-for="(item1,index1) in item.evaluate_images" 
							:src="defaultImage" 
	 						v-real-img="'http://www.liuguanjin.top:8101'+item1.pics_sma"
							>
						</div>
						<div class="evaluate-item-content">
							{{item.content}}
						</div>
	  				</div>
	  				<!-- 分页 -->
				  	<el-pagination
				    layout="prev, pager, next"
				    :total="total"
				    :page-size.sync="perPage"
				    @current-change="currentChange"
				    >
				  	</el-pagination>
	  			</div>
		  	</div>
		</div>
		
	</div>
</template>

<script>
export default {
	data(){
		return {
			id:0,
			evaluateData:[],
			haopingPercent:'100%',
			total:10,
			perPage:10,
			currentPage:1,
			evaluateShowData:[],
		}
	},
	methods:{
		back(){
			// 进入商品详情界面
 			//this.$router.push({name:"detail",query:{id:this.id}});
 			this.$router.go(-1);
		},
		getEvaluate(){
	 		this.$homehttp({
	 			url:'goods-evaluate/'+this.id
	 		}).then(result=>{
	 			const {code,msg,data} = result.data;
	 			if(code == 200){
	 				this.evaluateData = data.data;
	 				this.total = data.total;
	 				this.perPage = data.per_page;
	 				this.evaluateShowData = this.evaluateData;
	 			}
	 		})
	 	},
	 	//改变分页页数 使当前页为点击页 重新渲染界面
		currentChange(c){
			this.currentPage = c;
			this.getEvaluate();
		},
		choice(e,keyword=""){
			var children = e.target.parentNode.children;
			for(var i = 0;i < children.length;i ++){
				children[i].className = '';
			}
			e.target.className = 'active';
			switch(keyword){
				case 'all':
					this.evaluateShowData = this.evaluateData;
					break;
				case 'time':
					var showData = [];
					for(var i = 0;i < this.evaluateData.length;i ++){
						showData.push(this.evaluateData[i].create_time);
					}
					showData = showData.sort().reverse();
					console.log(showData);
					break;
				case 'haoping':
					this.evaluateShowData = this.evaluateData.filter((item)=>item.evaluate_grade == 0);
					break;
				case 'zhongping':
					this.evaluateShowData = this.evaluateData.filter((item)=>item.evaluate_grade == 1);
					break;
				case 'chaping':
					this.evaluateShowData = this.evaluateData.filter((item)=>item.evaluate_grade == 2);
					break;
				case 'images':
					this.evaluateShowData = this.evaluateData.filter((item)=>item.evaluate_images.length > 0);
					break;
			}
		},
		//点击···更多时的跳转
		handleCommand(command){
			switch(command){
				case 'foot':
					this.$router.push('/foot')
					break;
				case 'classify':
					this.$router.push('/classify')
					break;
				case 'cart':
					this.$router.push('/cart')
					break;
				case 'mine':
					this.$router.push('/mine')
					break;
				default:
					this.$router.push('/home')
			}
		},
	},
	created(){
		this.id = this.$route.query.id;
		this.getEvaluate();
	},
}	
</script>

<style lang="less" scoped>
	.goods-evaluate{
		.header{
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			align-items:center;
			padding:0 20px;
			border-bottom:1px solid #eee;
			.back{
				display:flex;
				justify-content:center;
				align-items:center;
				width:40px;
				height:44px;
				cursor: pointer;
				span{
					display:inline-block;
					width:10px;
					height:10px;
					border-left:1px solid black;
					border-bottom:1px solid black;
					transform:rotate(45deg);
				}
			}
			.more{
				cursor: pointer;
				.el-dropdown{
					font-size:20px;
				}
			}
		}
		.sign{
			display:flex;
			flex-direction:row;
			flex-wrap:wrap;
			padding:20px 0 0 20px;
			span{
				height:30px;
				margin:0 12px 12px 0;
				padding:0 10px;
				background-color:#fcedeb;
				line-height:30px;
				color:#262626;
				border-radius:15px;
				cursor: pointer;
			}
			.active{
				border:1px solid #f2270c;
				color:#f2270c;
			}
		}
		.evaluate{
			margin-top:20px;
			background-color:#fff;
			border-radius:30px;
			.evaluate-top{
				display:flex;
				flex-direction:row;
				justify-content:space-between;
				align-items:center;
				width:100%;
				.evaluate-top-left{
					margin-left: 20px;
					padding-left: 10px;
					border-left: 2px solid red;
					font-size:16px;
				}
				.evaluate-top-right{
					margin-right:20px;
					font-size:12px;
					color:gray;
					cursor: pointer;
					i{
						color:black;
					}
				}
			}
			.evaluate-content{
				.none-evaluate{
					margin:20px;
					text-align:center;
				}
				.el-pagination{
					display:flex;
					justify-content:center;
				}
				.evaluate-item{
					margin:20px 0;
					padding:10px 0;
					border-bottom:1px solid #eee;
					.evaluate-item-top{
						display:flex;
						flex-direction:row;
						justify-content:space-between;
						align-items:center;
						margin:0 20px 10px 20px;
						.avatar{
							width:30px;
							height:30px;
							border:1px solid black;
							border-radius:50%;
						}
						.nickname{
							margin:0 10px;
						}
						.evaluate-item-top-right{
							margin-right:20px;
							color:gray;
						}
					}
					.evaluate-item-img{
						margin-left:20px;
						img{
							width:100px;
							height:100px;
						}
					}
					.evaluate-item-content{
						margin-left:20px;
					}
				}
			}
		}
	}
</style>