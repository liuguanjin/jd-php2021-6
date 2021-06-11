<template>
	<div class="tabbar" v-if="isShowTabbar">
		<el-menu 
		background-color="white" 
		active-text-color="#F4AF60" 
		router 
		:default-active='activeIndex'
		class="el-menu-demo" 
		mode="horizontal"
		>
			<el-menu-item index="home">
				<i class="el-icon-s-home"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-menu-item index="classify">
				<i class="el-icon-menu"></i>
				<span slot="title">分类</span>
			</el-menu-item>
			<el-menu-item index="cart">
				<i class="el-icon-shopping-cart-2"></i>
				<span slot="title">购物车</span>
			</el-menu-item>
			<el-menu-item index="logsuc">
				<i class="el-icon-user"></i>
				<span slot="title">个人中心</span>
			</el-menu-item>
		</el-menu> 
	</div>
</template>
<script>
export default{
	data(){
		return{
			isShowTabbar:true,
			activeIndex:'home',
		}
	},
	watch:{
		$route(to,from){
			// var path = window.performance.navigation.type == 1?from.path:to.path;
			var path = to.path;
			if (path == "/home" ||
				path == "/classify" ||
				path == "/cart" ||
				path == "/mine"	||
				path == "/logsuc"
				){
				this.isShowTabbar = true;
			}else{
				this.isShowTabbar = false;
			}
		}
	}
}
</script>
<style lang="less" scoped>
	.tabbar{
		width:100%;
		max-width:800px;
		opacity: 0.9;
		z-index: 2;
		position:fixed;
		bottom:0;
		.el-menu-item{
			width:25%;
			display:flex;
			flex-direction:row;
			justify-content:center;
			align-items:center;
		}
	}
</style>