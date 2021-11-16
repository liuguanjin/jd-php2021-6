<template>
	<div class="operator">
		<!-- 后台菜单运营选项 -->
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
				          	<el-menu-item index="/recommendshops">店铺推荐</el-menu-item>
				          	<el-menu-item index="/recommendgoods">商品推荐</el-menu-item>
				          	<el-menu-item index="/recommendbrand">品牌推荐</el-menu-item>
			      	</el-submenu>
			      	<el-submenu index="3">
			      		<template slot="title">
				          	<i class="el-icon-s-platform"></i>
				          	<span slot="title">统计报表</span>
				        </template>
				          	<el-menu-item index="/totalgoods">商品销售排行</el-menu-item>
				          	<el-menu-item index="/totalshops">店铺销售排行</el-menu-item>
				          	<el-menu-item index="/totalmoney">销售额统计</el-menu-item>
				          	<el-menu-item index="/totalorder">销售订单统计</el-menu-item>
				          	<el-menu-item index="/totalnewvip">新增会员统计</el-menu-item>
			      	</el-submenu>
			      	<el-submenu index="4">
			      		<template slot="title">
				          	<i class="el-icon-money"></i>
				          	<span slot="title">财务管理</span>
				        </template>
				          	<el-menu-item index="/moneymanager">资金管理</el-menu-item>
				          	<el-menu-item index="/moneytixian">提现申请</el-menu-item>
				          	<el-menu-item index="/moneyjiesuan">结算申请</el-menu-item>
				          	<el-menu-item index="/moneyjiesuanshop">商家结算</el-menu-item>
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
			padding:0;
			padding-left:0 !important;
			.el-submenu__icon-arrow{
				right:0;
			}
		}
		/deep/ .el-menu-item{
			min-width:0;
			padding:0;
			padding-left:0 !important;
			text-align:center;
		}
		.el-submenu [class^=el-icon-]{
			margin-right:-3px !important;
		}
	}
</style>