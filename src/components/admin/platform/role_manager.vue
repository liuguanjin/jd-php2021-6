<template>
	<div class="role_manager">
		<!-- 角色管理界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/platform' }">平台</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>角色管理</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索角色"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getRoleList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加角色会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addRole">
					<el-button type="primary" @click="showAddRole">添加角色</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 全部角色列表表格 -->
		<el-table
	    :data="roleList"
	    border
	    style="width: 100%"
	    row-key="id"
	    >
		    <el-table-column
		    prop="id"
		    label="ID"
		    align="left"
		    >
		    </el-table-column>
		    <el-table-column
	    	prop="role_name"
	    	label="角色名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="desc"
	    	label="角色描述"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="editRole(scope.row.id)"></i>
	    			<i class="el-icon-delete" size="mini" @click="deleteRole(scope.row)"></i>
	    		</template>
		    </el-table-column>
	  	</el-table>
	  	<el-pagination
	    layout="prev, pager, next"
	    :total="total"
	    :page-size.sync="perpage"
	    @current-change="currentChange"
	    >
	  	</el-pagination>
	  	<!-- 添加角色会话 -->
	  	<el-dialog 
	  	title="添加角色" 
	  	:visible.sync="isShowAddRole"
	  	destroy-on-close
	  	>
		  	<el-form :model="addRoleData">
			    <el-form-item 
			    label="角色名称" 
			    >
			      	<el-input 
			      	v-model="addRoleData.role_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="角色描述" 
			    >
			      	<el-input 
			      	v-model="addRoleData.desc" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
		    	<el-form-item 
			    label="拥有权限" 
			    >
		      		<el-cascader
				    :options="authList"
				    :props="{ multiple: true ,children:'son',label:'auth_name',value:'id',checkStrictly:true}"
		    		clearable
		    		@change="getAuth"
		    		>
		    		</el-cascader>
			    </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowAddRole = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addRole"
			    >
			    确 定
				</el-button>
			</div>
		</el-dialog>
		<!-- 修改角色会话 -->
	  	<el-dialog 
	  	title="修改角色" 
	  	:visible.sync="isShowEditRole"
	  	destroy-on-close
	  	>
		  	<el-form :model="updateRoleData">
			    <el-form-item 
			    label="角色名称" 
			    >
			      	<el-input 
			      	v-model="updateRoleData.role_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="角色描述" 
			    >
			      	<el-input 
			      	v-model="updateRoleData.desc" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
		    	<el-form-item 
			    label="拥有权限" 
			    >
		      		<el-cascader
				    :options="authList"
				    :props="{ multiple: true ,children:'son',label:'auth_name',value:'id',checkStrictly:true}"
		    		clearable
		    		@change="editGetAuth"
		    		>
		    		</el-cascader>
			    </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowEditRole = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="updateRole"
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
			//搜索关键字
			keyword:"",
			//分页数据
			total:0,
			perpage:4,
			currentPage:1,
			//是否展示添加角色会话
			isShowAddRole:false,
			//角色列表数据
			roleList:[],
			//添加角色列表数据
			addRoleData:{
				role_name:"",
				desc:"",
				role_auth_ids:""
			},
			//权限列表
			authList:[],
			//添加角色时拥有的权限
			haveAuths:[],
			//是否展示修改角色会话
			isShowEditRole:false,
			//修改角色列表数据
			updateRoleData:{
				role_name:"",
				desc:"",
				role_auth_ids:""
			},
			//修改角色时拥有的权限
			editHaveAuths:[],
		}
	},
	methods:{
		//获取角色列表 发送请求
		getRoleList(keyword=""){
			this.$http({
				url:'roles?keyword='+keyword+'&page='+this.currentPage
			}).then(result=>{
				this.roleList = result.data.data.data;
				this.total = result.data.data.total;
			})
		},
		//点击展示添加角色会话
		showAddRole(){
			this.isShowAddRole = true;
		},
		//添加角色逻辑 发送请求
		addRole(){
			//数组拼接
			if (this.haveAuths instanceof Array) {
				this.haveAuths = this.haveAuths.join(',');
				this.addRoleData.role_auth_ids = this.haveAuths;
			}
			this.$http({
				url:'roles',
				method:'post',
				data:this.addRoleData
			}).then(result=>{
				if (result.data.code == 200) {
					this.$message({message:'添加角色成功',type:'success'});
				}else{
					this.$message({message:result.data.msg,type:'warning'});
				}
			})
		},
		//分页改变时发送第几页参数，请求数据
		currentChange(c){
			this.currentPage = c;
			this.getRoleList();
		},
		//删除角色逻辑
		deleteRole(row){
			this.$http({
				url:'roles/'+row.id,
				method:"delete"
			}).then(result=>{
				if (result.data.code == 200) {
					this.$message({message:'删除角色成功',type:'success'});
				}else{
					this.$message({message:result.data.msg,type:'warning'});
				}
			})
		},
		//获取全部权限列表
		getAuthList(){
			this.$http({
				url:'auths?type=tree',
			}).then(result=>{
				if (result.data.code == 200) {
					this.authList = result.data.data;
				}else{
					this.$message({message:result.data.msg,type:'warning'});
				}
			})
		},
		//添加角色会话中选中权限发生变化时
		getAuth(list){
			//console.log(list);
			//数组加入另一个数组中的元素
			this.haveAuths = this.haveAuths.concat(list[list.length-1]);
			//数组去重
			this.haveAuths = Array.from(new Set(this.haveAuths));
			//console.log(this.haveAuths);
		},
		//修改角色会话中选中权限发生变化时
		editGetAuth(list){
			//console.log(list);
			//数组加入另一个数组中的元素
			this.editHaveAuths = this.editHaveAuths.concat(list[list.length-1]);
			//数组去重
			this.editHaveAuths = Array.from(new Set(this.editHaveAuths));
			//console.log(this.editHaveAuths);
		},
		//角色详情 发送请求
		editRole(id){
			this.isShowEditRole = true;
			this.$http({
				url:'roles/'+id
			}).then(result=>{
				if (result.data.code == 200) {
					this.updateRoleData = result.data.data;
				}else{
					this.$message({message:result.data.msg,type:'warning'});
				}
			})
		},
		//角色修改 发送请求
		updateRole(){
			//数组拼接
			if (this.editHaveAuths instanceof Array) {
				this.editHaveAuths = this.editHaveAuths.join(',');
				this.updateRoleData.role_auth_ids = this.editHaveAuths;
			}
			this.$http({
				url:'roles/'+this.updateRoleData.id,
				method:'put',
				data:this.updateRoleData
			}).then(result=>{
				if (result.data.code == 200) {
					this.$message({message:'修改角色成功',type:'success'});
				}else{
					this.$message({message:result.data.msg,type:'warning'});
				}
			})
		}
	},
	mounted(){
		this.getRoleList();
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
	.el-pagination{
		display:flex;
		flex-direction:row;
		justify-content:center;
	}
</style>