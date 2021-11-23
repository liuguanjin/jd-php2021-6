<template>
	<div class="total-goods">
		<!-- 后台商品销售排行界面 -->
		<!-- 商品销售排行界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/operator' }">运营</el-breadcrumb-item>
			<el-breadcrumb-item>统计报表</el-breadcrumb-item>
			<el-breadcrumb-item>商品销售排行</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 商品销售排行表格 -->
		<el-table
	    :data="goodsSaleRankingData"
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
	    	label="商品logo"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
		    		<img 
		    		:src="defaultImage" 
		 			v-real-img="'http://www.liuguanjin.top:8101'+scope.row.goods_logo"
		    		>
		      	</template>
		    </el-table-column>
		    <el-table-column
	    	prop="sales_num"
	    	label="销售量"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="shop_name"
	    	label="所属店铺"
	    	align="center"
	    	>
	    	</el-table-column>
	  	</el-table>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				goodsSaleRankingData:[],
				defaultImage:this.defaultImage,
			}
		},
		methods:{
			getGoodsSaleRankingData(){
				this.$http({
					url:'goods-sale-ranking'
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.goodsSaleRankingData = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
		},
		created(){
			this.getGoodsSaleRankingData();
		},
	}
</script>

<style lang="less" scoped>
	.total-goods{
		img{
			width:50px;
			height:50px;
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