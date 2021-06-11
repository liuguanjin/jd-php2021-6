<template>
	<div class="admin_manager">
		<!-- 管理员管理界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/platform' }">平台</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>管理员管理</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索管理员"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getAdminList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加管理员会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addAdmin">
					<el-button type="primary" @click="showAddAdmin">添加管理员</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 全部管理员列表表格 -->
		<el-table
	    :data="adminList"
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
	    	prop="username"
	    	label="管理员名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="email"
	    	label="邮箱"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="nickname"
	    	label="昵称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="role_name"
	    	label="角色名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="showEditAdmin(scope.row.id)"></i>
	    			<i class="el-icon-delete" size="mini" @click="deleteAdmin(scope.row.id)"></i>
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
	  	<!-- 添加管理员会话 -->
	  	<el-dialog 
	  	title="添加管理员" 
	  	:visible.sync="isShowAddAdmin"
	  	destroy-on-close
	  	>
		  	<el-form :model="addAdminData">
			    <el-form-item 
			    label="管理员名称" 
			    >
			      	<el-input 
			      	v-model="addAdminData.username" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="密码" 
			    >
			      	<el-input 
			      	v-model="addAdminData.password" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="邮箱" 
			    >
			      	<el-input 
			      	v-model="addAdminData.email" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
		    	<el-form-item 
			    label="昵称" 
			    >
			      	<el-input 
			      	v-model="addAdminData.nickname" 
			      	autocomplete="off"
			      	placeholder="昵称,可以为空"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="所属角色" 
			    >
			      	<el-select
			      	v-model="value"
			      	clearable
			      	placeholder="请选择角色"
			      	@change="addRoleChange"
			      	>
				      	<el-option
				      	v-for="item in roleList"
				      	:key="item.id"
				      	:label="item.role_name"
				      	:value="item.id"
				      	>
				      	</el-option>
		      		</el-select>
			    </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowAddAdmin = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addAdmin"
			    >
			    确 定
				</el-button>
			</div>
		</el-dialog>
		<!-- 修改管理员会话 -->
	  	<el-dialog 
	  	title="修改管理员" 
	  	:visible.sync="isShowEditAdmin"
	  	destroy-on-close
	  	>
		  	<el-form :model="createAdminData">
			    <el-form-item 
			    label="管理员名称" 
			    >
			      	<el-input 
			      	v-model="createAdminData.username" 
			      	autocomplete="off"
			      	disabled
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="密码" 
			    >
			      	<el-input 
			      	v-model="createAdminData.password" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="邮箱" 
			    >
			      	<el-input 
			      	v-model="createAdminData.email" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
		    	<el-form-item 
			    label="昵称" 
			    >
			      	<el-input 
			      	v-model="createAdminData.nickname" 
			      	autocomplete="off"
			      	placeholder="昵称,可以为空"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="所属角色" 
			    >
			      	<el-select
			      	v-model="value"
			      	clearable
			      	placeholder="请选择角色"
			      	@change="editRoleChange"
			      	>
				      	<el-option
				      	v-for="item in roleList"
				      	:key="item.id"
				      	:label="item.role_name"
				      	:value="item.id"
				      	>
				      	</el-option>
		      		</el-select>
			    </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowEditAdmin = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="createAdmin"
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
			//管理员列表数据
			adminList:[],
			//是否展示添加管理员会话
			isShowAddAdmin:false,
			//添加管理员数据
			addAdminData:{
				username:"",
				password:"",
				email:"",
				nickname:"",
				role_id:"",
			},
			//分页数据
			total:0,
			perpage:2,
			current:0,
			//是否展示修改管理员会话
			isShowEditAdmin:false,
			//修改管理员数据
			createAdminData:{
				username:"",
				password:"",
				email:"",
				nickname:"",
				role_id:"",
			},
			//角色列表
			value:'',
			roleList:[]
		}
	},
	methods:{
		//获取管理员列表
		getAdminList(keyword=""){
			this.$http({
				url:'admins?keyword='+keyword+'&page='+this.current
			}).then(result=>{
				this.adminList = result.data.data.data;
				this.total = result.data.data.total;
				this.perpage = result.data.data.per_page;
			})
		},
		//获取角色列表
		getRoleList(){
			this.$http({
				url:'allrole'
			}).then(result=>{
				if (result.data.code == 200) {
					this.roleList = result.data.data;
				}else{
					this.$message({message:result.data.msg,type:'warning'});
				}
			})
		},
		//分页点击后获取管理员列表（改page=current） 发送请求
		currentChange(c){
			this.current = c;
			this.getAdminList();
		},
		//点击后展示添加管理员会话
		showAddAdmin(){
			this.isShowAddAdmin = true;
		},
		//添加管理员 发送请求
		addAdmin(){
			this.$http({
				url:'admins',
				method:'post',
				data:this.addAdminData
			}).then(result=>{
				if(result.data.code == 200){
					this.$message({message:'添加管理员成功',type:'success'});
				}else{
					this.$message({message:result.data.msg,type:'warning'});
				}
			})
		},
		//修改管理员 发送请求
		createAdmin(){
			this.$http({
				url:'admins/'+this.createAdminData.id,
				method:'put',
				data:this.createAdminData
			}).then(result=>{
				if(result.data.code == 200){
					this.$message({message:'修改管理员成功',type:'success'});
				}else{
					this.$message({message:result.data.msg,type:'warning'});
				}
			})
		},
		//点击后展示修改管理员会话并发送请求获取管理员详情
		showEditAdmin(id){
			this.isShowEditAdmin = true;
			this.$http({
				url:'admins/'+id
			}).then(result=>{
				if (result.data.code == 200) {
					this.createAdminData = result.data.data
				}else{
					this.$message({message:result.data.msg,type:'warning'});
				}
			})
		},
		addRoleChange(row){
			this.addAdminData.role_id = row;
		},
		editRoleChange(row){
			this.createAdminData.role_id = row;
		},
		deleteAdmin(id){
			this.$http({
				url:'admins/'+id,
				method:'delete'
			}).then(result=>{
				if (result.data.code == 200) {
					this.$message({message:'删除成功',type:'success'});
				}else{
					this.$message({message:result.data.msg,type:'warning'});
				}
			})
		}
	},
	mounted(){
		this.getAdminList();
		this.getRoleList();
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