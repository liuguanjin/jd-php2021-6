<template>
	<div class="total-money">
		<!-- 后台销售额排行界面 -->
		<!-- 销售额排行界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/operator' }">运营</el-breadcrumb-item>
			<el-breadcrumb-item>统计报表</el-breadcrumb-item>
			<el-breadcrumb-item>销售额排行</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 销售额排行表格 -->
		<el-table
	    :data="salesRankingData"
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
		    		<img :src="'http://www.liuguanjin.top:8101'+scope.row.goods_logo" alt="正在加载">
		      	</template>
		    </el-table-column>
		    <el-table-column
	    	prop="sales"
	    	label="销售额"
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
				salesRankingData:[]
			}
		},
		methods:{
			getSalesRankingData(){
				this.$http({
					url:'sales-ranking'
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.salesRankingData = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
		},
		created(){
			this.getSalesRankingData();
		},
	}
</script>

<style lang="less" scoped>
	.total-money{
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