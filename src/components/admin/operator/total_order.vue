<template>
	<div class="total-order">
		<!-- 后台销售订单统计界面 -->
		<!-- 销售订单统计界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/operator' }">运营</el-breadcrumb-item>
			<el-breadcrumb-item>统计报表</el-breadcrumb-item>
			<el-breadcrumb-item>销售订单统计</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keywords" 
	      	autocomplete="off"
	      	placeholder="搜索订单号"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getSalesOrderData(keywords)">搜索</el-button>
		</div>
		<!-- 销售订单统计表格 -->
		<el-table
	    :data="salesOrderData"
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
	    	prop="order_sn"
	    	label="订单编号"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="order_status"
	    	label="订单状态"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<span>{{scope.row.order_status==0?'未付款':'已付款'}}</span>
		      	</template>
		    </el-table-column>
		    <el-table-column
	    	prop="goods_price"
	    	label="商品总价"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="address"
	    	label="收货地址"
	    	align="center"
	    	class-name="address"
	    	>
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
				salesOrderData:[],
				keywords:'',
				currentPage:1,
				total:1,
				perPage:10,
			}
		},
		methods:{
			getSalesOrderData(keywords=""){
				this.$http({
					url:'sales-order?keywords=' + this.keywords + '&page='+this.currentPage
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.salesOrderData = data.data;
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
				this.getSalesOrderData();
			},
		},
		created(){
			this.getSalesOrderData();
		},
	}
</script>

<style lang="less" scoped>
	.total-order{
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
			/deep/ td.address{
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
			/deep/ td.address:hover{
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