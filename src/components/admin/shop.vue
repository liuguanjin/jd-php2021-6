<template>
	<div class="shop">
		<el-container>
			<el-aside width="25%">
				<el-menu
		     		default-active="2"
		     		class="el-menu-vertical-demo"
		     		router
		  		>
			      	<el-submenu index="1">
				        <template slot="title">
				          	<i class="el-icon-s-order"></i>
				          	<span>订单管理</span>
				        </template>
				          	<el-menu-item index="/ordermanager">订单管理</el-menu-item>
				          	<el-menu-item index="/ordercomplaint">投诉订单</el-menu-item>
				          	<el-menu-item index="/orderrefund">退款订单</el-menu-item>
			      	</el-submenu>
		      		<el-submenu index="2">
			      		<template slot="title">
				          	<i class="el-icon-s-goods"></i>
				          	<span slot="title">商品管理</span>
				        </template>
				          	<el-menu-item index="/shopcategory">商品分类</el-menu-item>
				          	<el-menu-item index="/shopbrand">商品品牌</el-menu-item>
				          	<el-menu-item index="/shoptype">商品模型</el-menu-item>
				          	<el-menu-item index="/shoplist">商品列表</el-menu-item>
				          	<el-menu-item index="/shoprecycle">回收站</el-menu-item>
				          	<el-menu-item index="/shopattribute">商品属性</el-menu-item>
				          	<el-menu-item index="/shopspec">商品规格</el-menu-item>
				          	<el-menu-item index="/shopevaluate">评价管理</el-menu-item>
				          	<el-menu-item index="/shopserver">商品咨询</el-menu-item>
			      	</el-submenu>
			      	<el-submenu index="3">
			      		<template slot="title">
				          	<i class="el-icon-s-custom"></i>
				          	<span slot="title">会员管理</span>
				        </template>
				          	<el-menu-item index="/vipgrade">会员等级</el-menu-item>
				          	<el-menu-item index="/vipmanager">会员管理</el-menu-item>
			      	</el-submenu>
			      	<el-submenu index="4">
			      		<template slot="title">
				          	<i class="el-icon-setting"></i>
				          	<span slot="title">基础设置</span>
				        </template>
				          	<el-menu-item index="/advertisementmanager">广告管理</el-menu-item>
				          	<el-menu-item index="/bankmanager">银行管理</el-menu-item>
				          	<el-menu-item index="/crowdfundingmanager">支付管理</el-menu-item>
			      	</el-submenu>
			      	<el-submenu index="5">
			      		<template slot="title">
				          	<i class="el-icon-user-solid"></i>
				          	<span slot="title">众筹管理</span>
				        </template>
				          	<el-menu-item index="/paymanager">众筹管理</el-menu-item>
			      	</el-submenu>
			      	<el-submenu index="6">
			      		<template slot="title">
				          	<i class="el-icon-s-shop"></i>
				          	<span slot="title">店铺管理</span>
				        </template>
				          	<el-menu-item index="/storelist">店铺列表</el-menu-item>
			      	</el-submenu>
			      	<el-submenu index="7">
			      		<template slot="title">
				          	<i class="el-icon-s-shop"></i>
				          	<span slot="title">我的店铺</span>
				        </template>
				          	<el-menu-item index="/soldgoods">已卖出的宝贝</el-menu-item>
				          	<el-menu-item index="/evaluatemanager">评价管理</el-menu-item>
				          	<el-menu-item index="/sendgoods">发货</el-menu-item>
				          	<el-menu-item index="/releasegoods">发布宝贝</el-menu-item>
				          	<el-menu-item index="/sellgoods">出售中的宝贝</el-menu-item>
				          	<el-menu-item index="/warehousegoods">仓库中的宝贝</el-menu-item>
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
	.shop{
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