<template>
	<!-- 后台首页 -->
	<div id="admin">
		<el-container>
			<!-- 后台头部 -->
			<el-header>
				<el-row>
					<el-col :span="20">
						<el-menu 
						background-color="#545C64" 
						active-text-color="#F4AF60" 
						router 
						:default-active='activeIndex'
						class="el-menu-demo" 
						mode="horizontal"
						>
							<el-menu-item index="adminindex">首页</el-menu-item>
							<el-menu-item index="platform">平台</el-menu-item>
							<el-menu-item index="shop">商城</el-menu-item>
							<el-menu-item index="operator">运营</el-menu-item>
						</el-menu> 
					</el-col>
					<el-col :span="4">
						<el-dropdown>
							<span>
								<el-row>
									<el-col :span="18">
										{{adminInfo.nickname||'暂未设置昵称'}}
									</el-col>
									<el-col :span="6">
										<i class="el-icon-arrow-down el-icon--right"></i>
									</el-col>
								</el-row>
							</span>
							<el-dropdown-menu>
								<el-dropdown-item>
									个人信息
								</el-dropdown-item>
								<el-dropdown-item>
									<span @click="logout">退出</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
				</el-row>
			</el-header>
			<el-main>
				<router-view/>
			</el-main>
			<el-footer>
				<span>后台管理系统</span>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	export default {
		mounted(){
			if (!localStorage.getItem('token')) {
				this.$router.push({path:"adminLogin"});
			}
			this.$router.push({path:"adminindex"});
		},
		created(){
			this.adminInfo = JSON.parse(localStorage.getItem('admininfo'));
		},
		data(){
			return {
				activeIndex:'adminindex',
				adminInfo:{}
			}
		},
		methods:{
			logout(){
				this.$http({
					url:"adminLogout"
				}).then(result=>{
					if (result.data.code == 200) {
						localStorage.clear();
						this.$router.push({path:'adminLogin'});
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-header{
		padding:0;
	}
	.el-main{
		background-color:white;
		height:800px;
		padding:0;
		div{
			height:100%;
		}
	}
	.el-footer{
		padding:0;
		width:100px !important;
		height:100px !important;
		position:fixed;
		right:0;
		bottom:0;
		span{
			display:block;
			width:100%;
			height:100px;
			line-height:100px;
			opacity:0.5;
			background-color:rgb(84, 92, 100);
			border-radius:50%;
			color:red;
			text-align:center;
		}
	}
	.el-col-4 {
	  margin-top: 10px;
	  text-align: center;
	  font-size: 25px;
	}
</style>