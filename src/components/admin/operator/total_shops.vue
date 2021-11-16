<template>
	<div class="total-shops">
		<!-- 后台商品销售排行界面 -->
		<!-- 商品销售排行界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/operator' }">运营</el-breadcrumb-item>
			<el-breadcrumb-item>统计报表</el-breadcrumb-item>
			<el-breadcrumb-item>店铺销售排行</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 店铺销售排行表格 -->
		<el-table
	    :data="shopsSaleRankingData"
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
	    	prop="shop_name"
	    	label="店铺名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="shop_logo"
	    	label="店铺logo"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
		    		<img :src="'http://www.liuguanjin.top:8101'+scope.row.shop_logo" alt="正在加载">
		      	</template>
		    </el-table-column>
		    <el-table-column
	    	prop="sales_num"
	    	label="销售量"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="collect"
	    	label="收藏数"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	prop="score"
	    	label="店铺星级"
	    	align="center"
	    	:formatter="formatScore"
	    	>
	    	</el-table-column>
	  	</el-table>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				shopsSaleRankingData:[],
			}
		},
		methods:{
			getShopsSaleRankingData(){
				this.$http({
					url:'shops-sale-ranking'
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.shopsSaleRankingData = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			formatScore(row,column){
				return parseFloat((row.score/row.score_people).toFixed(1));
			},
		},
		created(){
			this.getShopsSaleRankingData();
		},
	}
</script>

<style lang="less" scoped>
	.total-shops{
		img{
			width:50px;
			height:50px;
		}
	}
</style>