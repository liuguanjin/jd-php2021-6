<template>
	<div class="order_manager">
		<!-- 菜单管理界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/platform' }">平台</el-breadcrumb-item>
			<el-breadcrumb-item>系统配置</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索权限"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getAuthList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加权限会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addauth">
					<el-button type="primary" @click="showAddAuth">添加权限</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 全部权限列表表格 -->
		<el-table
	    :data="authList"
	    border
	    style="width: 100%"
	    row-key="id"
	    :tree-props="{children: 'son'}"
	    >
		    <el-table-column
		    prop="id"
		    label="ID"
		    align="left"
		    >
		    </el-table-column>
		    <el-table-column
	    	prop="auth_name"
	    	label="权限名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="auth_c"
	    	label="控制器名"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="auth_a"
	    	label="方法名"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="is_nav"
	    	label="是否菜单"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="toAuthDetail(scope.row)"></i>
	    			<i class="el-icon-delete" size="mini" @click="delAuth(scope.row)"></i>
	    		</template>
		    </el-table-column>
	  	</el-table>
		<!-- 添加权限会话 -->
	  	<el-dialog 
	  	title="添加权限" 
	  	:visible.sync="isAddAuthShow"
	  	destroy-on-close
	  	>
		  	<el-form :model="addAuthData">
			    <el-form-item 
			    label="权限名称" 
			    >
			      	<el-input 
			      	v-model="addAuthData.auth_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item
			    label="上级权限" 
			    >
			    	<el-cascader
			    	v-model="pidAuth"
			    	:options="authList"
			    	clearable
			    	:props="{expandTrigger:'click',children:'son',label:'auth_name',value:'id',checkStrictly:true}"
			    	@change="change"
			    	>
			    	</el-cascader>
			    	<el-radio 
			      	v-model="isFirstAuth"
			      	label="1" 
			      	>
			      	作为顶级权限
			      	</el-radio>
		    	</el-form-item>
		    	<el-form-item 
			    label="控制器名" 
			    >
			      	<el-input 
			      	v-model="addAuthData.auth_c" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="方法名" 
			    >
			      	<el-input 
			      	v-model="addAuthData.auth_a" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="是否是菜单项" 
			    >
			      	<el-radio 
			      	v-model="addAuthData.is_nav"
			      	label="1" 
			      	>
			      	是
			      	</el-radio>
			      	<el-radio 
			      	v-model="addAuthData.is_nav"
			      	label="0" 
			      	>
			      	否
			      	</el-radio>
			    </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isAddAuthShow = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addAuth"
			    >
			    确 定
				</el-button>
			</div>
		</el-dialog>
		<!-- 修改权限会话 -->
	  	<el-dialog 
	  	title="修改权限" 
	  	:visible.sync="isShowAuthDetail"
	  	destroy-on-close
	  	>
		  	<el-form :model="authDetailData">
			    <el-form-item 
			    label="权限名称" 
			    >
			      	<el-input 
			      	v-model="authDetailData.auth_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item
			    label="上级权限" 
			    >
			    	<el-cascader
			    	v-model="pidAuth2"
			    	:options="authList"
			    	clearable
			    	:props="{expandTrigger:'click',children:'son',label:'auth_name',value:'id',checkStrictly:true}"
			    	@change="createAuthChange"
			    	>
			    	</el-cascader>
			    	<el-radio 
			      	v-model="detailIsFirstAuth"
			      	label="1" 
			      	>
			      	作为顶级权限
			      	</el-radio>
		    	</el-form-item>
		    	<el-form-item 
			    label="控制器名" 
			    >
			      	<el-input 
			      	v-model="authDetailData.auth_c" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="方法名" 
			    >
			      	<el-input 
			      	v-model="authDetailData.auth_a" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="是否是菜单项" 
			    >
			      	<el-radio 
			      	v-model="authDetailData.is_nav"
			      	label="1" 
			      	>
			      	是
			      	</el-radio>
			      	<el-radio 
			      	v-model="authDetailData.is_nav"
			      	label="0" 
			      	>
			      	否
			      	</el-radio>
			    </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowAuthDetail = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="createAuth"
			    >
			    确 定
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data(){
		return {
			//权限列表
			authList:[],
			//是否展示添加权限会话
			isAddAuthShow:false,
			//添加权限数据
			addAuthData:{
				auth_name:'',
				auth_c:'',
				auth_a:'',
				is_nav:'0',
				pid:''
			},
			//是否展示权限详情会话
			isShowAuthDetail:false,
			authDetailData:{
				auth_name:'',
				auth_c:'',
				auth_a:'',
				is_nav:'0',
				pid:''
			},
			//添加权限会话pid_path数组
			pidAuth:[],
			//权限详情会话pid_path数组
			pidAuth2:[],
			//添加权限会话是否作为顶级权限
			isFirstAuth:0,
			//权限详情会话是否作为顶级权限
			detailIsFirstAuth:0,
			//搜索关键字
			keyword:''
		}
	},
	methods:{
		//获取全部权限列表
		getAuthList(keyword=''){
			this.$http({
				url:'auths?type=tree&keyword='+keyword,
			}).then(result=>{
				this.authList = result.data.data;
			})
		},
		//显示添加权限会话
		showAddAuth(){
			this.isAddAuthShow = true;
		},
		//添加权限逻辑 发送请求
		addAuth(){
			if (this.isFirstAuth == 1) {
				this.addAuthData.pid = 0;
			}
			this.$http({
				url:'auths',
				method:"post",
				data:this.addAuthData
			}).then(result=>{
				if (result.data.code == 200) {
					this.$message({message:"添加权限成功",type:"success"});
					this.isAddAuthShow = false;
				}else{
					this.$message({message:result.data.msg,type:"warning"});
				}
			})
		},
		//添加权限会话中选中改变pid值
		change(h){
			//console.log(h);
			this.addAuthData.pid = h[h.length-1];
		},
		createAuthChange(h){
			//console.log(h);
			this.authDetailData.pid = h[h.length-1];
		},
		//删除权限逻辑 发送请求
		delAuth(row){
			this.$http({
				url:'auths/'+row.id,
				method:"delete",
			}).then(result=>{
				if (result.data.code == 200) {
					this.$message({message:"删除权限成功",type:"success"});
					this.isAddAuthShow = false;
				}else{
					this.$message({message:result.data.msg,type:"warning"});
				}
			})
		},
		//权限详情界面 发送请求
		toAuthDetail(row){
			this.isShowAuthDetail = true;
			this.$http({
				url:'auths/'+row.id
			}).then(result=>{
				if (result.data.code == 200) {
					this.authDetailData = result.data.data;
				}else{
					this.$message({message:result.data.msg,type:"warning"});
				}
			})
		},
		//修改权限 发送请求
		createAuth(){
			if (this.detailIsFirstAuth == 1) {
				this.authDetailData.pid = 0;
			}
			this.$http({
				url:'auths/'+this.authDetailData.id,
				method:"put",
				data:this.authDetailData
			}).then(result=>{
				if (result.data.code == 200) {
					this.$message({message:"修改权限成功",type:"success"});
					this.isShowAuthDetail = false;
				}else{
					this.$message({message:result.data.msg,type:"warning"});
				}
			})
		}
	},
	mounted(){
		this.getAuthList();
	}
}	
</script>

<style lang="less" scoped>
	.el-row{
		margin-top:10px;
		margin-bottom:10px;
	}
	.search{
		margin-top:10px;
		display:flex;
		flex-direction:row;
	}
</style>