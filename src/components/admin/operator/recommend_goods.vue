<template>
	<div class="recommend-goods">
		<!-- 后台商品推荐界面 -->
		<!-- 商品推荐界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/operator' }">运营</el-breadcrumb-item>
			<el-breadcrumb-item>推荐管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品推荐</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索商品"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getGoodsList(keyword)">搜索</el-button>
		</div>
		<!-- 销售订单统计表格 -->
		<el-table
	    :data="goodsRecommendData"
	    border
	    style="width: 100%"
	    row-key="id"
	    >
		    <el-table-column
		    prop="id"
		    label="ID"
		    align="center"
		    >
		    </el-table-column>
		    <el-table-column
	    	prop="goods_name"
	    	label="商品名称"
	    	align="center"
	    	class-name="goods_name"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="goods_logo"
	    	label="商品图片"
	    	align="center"
	    	>
		    	<template slot-scope="scope">
		    		<img :src="'http://www.liuguanjin.top:8101'+scope.row.goods_logo" alt="正在加载">
		      	</template>
	    	</el-table-column>
	    	<el-table-column
	    	prop="is_recommend"
	    	label="是否推荐"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
		    		<select @change="selectChange(scope.$index)">
		    			<option 
		    			:selected="scope.row[scope.column.property]?'selected':''" 
		    			:value="1"
		    			>
		    				是
		    			</option>
		    			<option
		    			:selected="!scope.row[scope.column.property]?'selected':''" 
		    			:value="0"
		    			>
		    				否
		    			</option>
		    		</select>
		      	</template>
    		</el-table-column>
	  	</el-table>
	  	<!-- 分页 -->
	  	<el-pagination
	    layout="prev, pager, next"
	    :total="total"
	    :page-size.sync="perPage"
	    @current-change="currentChange"
	    >
	  	</el-pagination>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				keyword:'',
				goodsRecommendData:[],
				currentPage:1,
				total:1,
				perPage:10,
			}
		},
		methods:{
			getGoodsList(keyword=""){
				this.$http({
					url:'goods?keyword='+keyword+'&page='+this.currentPage
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.goodsRecommendData = data.data;
						this.total = data.total;
						this.perPage = data.per_page;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//改变分页页数 使当前页为点击页 重新渲染界面
			currentChange(c){
				this.currentPage = c;
				this.getGoodsList();
			},
			selectChange(index){
				var id = this.goodsRecommendData[index].id;
				this.$http({
					url:'goods-recommend/'+id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'更改成功',type:'success'});
					}else{
						this.$message({message:'更改失败',type:'warning'});
					}
				})
			},
		},
		created(){
			this.getGoodsList();
		},
	}
</script>

<style lang="less" scoped>
	.recommend-goods{
		img{
			width:50px;
			height:50px;
		}
		.search{
			display:flex;
			flex-direction:row;
			justify-content:center;
			align-items:center;
			margin:10px 0;
			.el-input{
				flex:2;
				margin-right:10px;
			}
			.el-button{
				flex:1;
			}
		}
		.el-table{
			/deep/ td.goods_name{
				.cell{
					display:block;
					display:-webkit-box;
					over-flow:hidden;
					height:69px;
					line-height:23px;
					-webkit-line-clamp:3;
					-webkit-box-orient:vertical;
					text-overflow:ellipsis;
				}
			}
			/deep/ td.goods_name:hover{
				.cell{
					display:block;
					over-flow:visible;
					height:100%;
					cursor: pointer;
				}
			}
		}
	}
</style>