<template>
	<div class="index">
		<el-container>
			<el-aside width="25%">
				<el-menu
		     		default-active="1"
		     		router
		  		>
			      	<el-submenu index="1">
				        <template slot="title">
				          	<i class="el-icon-location"></i>
				          	<span>首页</span>
				        </template>
				          	<el-menu-item index="/indexcontent">首页内容</el-menu-item>
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
	.index{
		/deep/ .el-submenu__title{
			padding-left:10px !important;
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
	}
</style>