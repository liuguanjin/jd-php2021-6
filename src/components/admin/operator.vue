<template>
	<div class="operator">
		<el-container>
			<el-aside width="25%">
				<el-menu
		     		default-active="2"
		     		class="el-menu-vertical-demo"
		     		router
		  		>
			      	<el-submenu index="1">
				        <template slot="title">
				          	<i class="el-icon-s-ticket"></i>
				          	<span>促销管理</span>
				        </template>
			      	</el-submenu>
		      		<el-submenu index="2">
			      		<template slot="title">
				          	<i class="el-icon-s-opportunity"></i>
				          	<span slot="title">推荐管理</span>
				        </template>
				          	<el-menu-item index="2-1">店铺推荐</el-menu-item>
				          	<el-menu-item index="2-2">商品推荐</el-menu-item>
				          	<el-menu-item index="2-3">品牌推荐</el-menu-item>
			      	</el-submenu>
			      	<el-submenu index="3">
			      		<template slot="title">
				          	<i class="el-icon-s-platform"></i>
				          	<span slot="title">统计报表</span>
				        </template>
				          	<el-menu-item index="3-1">商品销售排行</el-menu-item>
				          	<el-menu-item index="3-2">店铺销售排行</el-menu-item>
				          	<el-menu-item index="3-3">销售额统计</el-menu-item>
				          	<el-menu-item index="3-4">销售订单统计</el-menu-item>
				          	<el-menu-item index="3-5">新增会员统计</el-menu-item>
			      	</el-submenu>
			      	<el-submenu index="4">
			      		<template slot="title">
				          	<i class="el-icon-money"></i>
				          	<span slot="title">财务管理</span>
				        </template>
				          	<el-menu-item index="4-1">资金管理</el-menu-item>
				          	<el-menu-item index="4-2">提现申请</el-menu-item>
				          	<el-menu-item index="4-3">结算申请</el-menu-item>
				          	<el-menu-item index="4-4">商家结算</el-menu-item>
			      	</el-submenu>
			    </el-menu>
			</el-aside>
			<el-main>
				<router-view/>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default{
		date(){

		}
	}
</script>

<style lang="less" scoped>
	.operator{
		/deep/ .el-submenu__title{
			padding-left:0 !important;
			padding:0;
			.el-submenu__icon-arrow{
				right:0;
			}
		}
		/deep/ .el-menu-item{
			padding-left:0 !important;
			padding:0;
			min-width:0;
			text-align:center;
		}
		.el-submenu [class^=el-icon-]{
			margin-right:-3px !important;
		}
	}
</style>