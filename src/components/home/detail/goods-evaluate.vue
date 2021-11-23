<template>
	<div class="goods-evaluate">
		<!-- 商品的评论界面 -->
		<div class="evaluate">
	  		<div class="evaluate-top">
	  			<div class="evaluate-top-left">
	  				<span>评价</span>
	  				<span>{{evaluateData.length}}</span>
	  			</div>
	  			<div class="evaluate-top-right">
	  				<span>
	  					好评度{{haopingPercent}}
	  					<i 
	  					class="el-icon-arrow-right"
	  					>
	  					</i>
  					</span>
	  			</div>
	  		</div>
	  		<!-- 商品页只展示至多两个评论 -->
	  		<div class="evaluate-content">
	  			<div class="none-evaluate" v-if="evaluateData.length == 0">
	  				暂无评价
	  			</div>
	  			<div v-else>
	  				<div 
	  				class="evaluate-item" 
	  				v-for="(item,index) in evaluateData"
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
		}
	},
	methods:{
		getEvaluate(){
	 		this.$homehttp({
	 			url:'goods-evaluate/'+this.id
	 		}).then(result=>{
	 			const {code,msg,data} = result.data;
	 			if(code == 200){
	 				this.evaluateData = data.data;
	 				this.total = data.total;
	 				this.perPage = data.per_page;
	 			}
	 		})
	 	},
	 	//改变分页页数 使当前页为点击页 重新渲染界面
		currentChange(c){
			this.currentPage = c;
			this.getEvaluate();
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
		.evaluate{
			margin-top:20px;
			padding-top:20px;
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
					margin:0 20px 10px 20px;
					text-align:center;
				}
				.evaluate-item{
					margin:30px 0;
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