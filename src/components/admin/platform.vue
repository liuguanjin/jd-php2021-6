<template>
	<div class="platform">
		<el-container>
			<el-aside width="25%">
				<el-menu
		     		default-active="2"
		     		class="el-menu-vertical-demo"
		     		router
		  		>
			      	<el-submenu index="1">
				        <template slot="title">
				          	<i class="el-icon-s-tools"></i>
				          	<span>系统配置</span>
				        </template>
				          	<el-menu-item index="/settingmanager">配置管理</el-menu-item>
				          	<el-menu-item index="/websitemanager">网站设置</el-menu-item>
				          	<el-menu-item index="/fujianmanager">附件设置</el-menu-item>
				          	<el-menu-item index="/menumanager">菜单管理</el-menu-item>
			      	</el-submenu>
		      		<el-submenu index="2">
			      		<template slot="title">
				          	<i class="el-icon-menu"></i>
				          	<span slot="title">权限管理</span>
				        </template>
				          	<el-menu-item index="/adminmanager">管理员管理</el-menu-item>
				          	<el-menu-item index="/rolemanager">角色管理</el-menu-item>
				          	<el-menu-item index="/managerlog">管理日志</el-menu-item>
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
	.platform{
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