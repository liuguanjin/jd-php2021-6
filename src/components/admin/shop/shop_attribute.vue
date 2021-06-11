<template>
	<div class="shop_attribute">
		<!-- 属性列表界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品属性</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索属性"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getAttrList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加商品会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addAttrs">
					<el-button type="primary" @click="showAddAttrs">添加属性</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 全部属性列表表格 -->
		<el-table
	    :data="attrList"
	    border
	    style="width: 100%"
	    row-key="id"
	    >
		    <el-table-column
		    prop="id"
		    label="ID"
		    align="center"
		    >
		    </el-table-column>
		    <el-table-column
	    	prop="attr_name"
	    	label="属性名称"
	    	align="center"
	    	>
	    	</el-table-column>
		    <el-table-column
	    	prop="type_name"
	    	label="所属模型"
	    	align="center"
	    	>
	    	</el-table-column> 
	    	<el-table-column
	    	prop="sort"
	    	label="排序"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	prop="attr_values"
	    	label="属性值"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="editAttr(scope.row.id)"></i>
	    			<i class="el-icon-delete" size="mini" @click="deleteAttr(scope.row.id)"></i>
	    		</template>
		    </el-table-column>
    	</el-table>
    	<!-- 添加商品会话 -->
	  	<el-dialog 
	  	title="添加属性" 
	  	:visible.sync="isShowAddAttrs"
	  	destroy-on-close
	  	>
	  		<el-form :model="addAttrData">
			    <el-form-item 
			    label="属性名称" 
			    >
			      	<el-input 
			      	v-model="addAttrData.attr_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="属性排序" 
			    >
			      	<el-input 
			      	v-model="addAttrData.sort" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="属性值" 
			    >
			      	<el-input 
			      	v-model="addAttrData.attr_values" 
			      	autocomplete="off"
			      	placeholder="多个属性值请用英文逗号 ',' 隔开"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="所属模型" 
			    >
			    	<el-select
		      		v-model="add_type_name" 
		      		placeholder="请选择模型"
		    		clearable
		    		@change="addTypeChange"
		      		>
			      		<el-option
			      		v-for="item in typeList"
			      		:key="item.id"
			      		:value="item.id"
			      		:label="item.type_name"
			    		>
			    		</el-option>
		      		</el-select>
			    </el-form-item>
		    </el-form>
		    <div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowAddAttrs = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addAttr"
			    >
			    确 定
				</el-button>
			</div>
	    </el-dialog>
	    <!-- 修改商品会话 -->
	  	<el-dialog 
	  	title="修改属性" 
	  	:visible.sync="isShowUpdateAttrs"
	  	destroy-on-close
	  	>
	  		<el-form :model="updateAttrData">
			    <el-form-item 
			    label="属性名称" 
			    >
			      	<el-input 
			      	v-model="updateAttrData.attr_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="属性排序" 
			    >
			      	<el-input 
			      	v-model="updateAttrData.sort" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="属性值" 
			    >
			      	<el-input 
			      	v-model="updateAttrData.attr_values" 
			      	autocomplete="off"
			      	placeholder="多个属性值请用英文逗号 ',' 隔开"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="所属模型" 
			    >
			    	<el-select
		      		v-model="update_type_name" 
		      		placeholder="请选择模型"
		    		clearable
		    		@change="updateTypeChange"
		      		>
			      		<el-option
			      		v-for="item in typeList"
			      		:key="item.id"
			      		:value="item.id"
			      		:label="item.type_name"
			    		>
			    		</el-option>
		      		</el-select>
			    </el-form-item>
		    </el-form>
		    <div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowUpdateAttrs = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="updateAttr"
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
				keyword:"",
				attrList:[],
				isShowAddAttrs:false,
				isShowUpdateAttrs:false,
				addAttrData:{
					attr_name:"",
					attr_values:"",
					sort:"",
					type_id:"",
				},
				updateAttrData:{
					attr_name:"",
					attr_values:"",
					sort:"",
					type_id:"",
				},
				add_type_name:"",
				update_type_name:"",
				typeList:[]
			}
		},
		methods:{
			getAttrList(keyword=""){
				this.$http({
					url:'attr?keyword='+this.keyword
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.attrList = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//获取模型列表 用于选择商品所属模型 keyword 搜索关键字
			getTypeList(keyword=""){
				this.$http({
					url:'types?keyword='+keyword
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.typeList = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			showAddAttrs(){
				this.isShowAddAttrs = true;
			},
			editAttr(id){
				this.isShowUpdateAttrs = true;
				this.$http({
					url:'attr/'+id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.updateAttrData = data;
					}else{
						this.$message({message:'获取属性失败',type:'warning'});
					}
				})
			},
			deleteAttr(id){
				this.$http({
					url:'attr/'+id,
					method:'delete'
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'删除属性成功',type:'success'});
					}else{
						this.$message({message:'删除属性失败',type:'warning'});
					}
				})
			},
			addTypeChange(e){
				this.addAttrData.type_id = e;
			},
			updateTypeChange(e){
				this.updateAttrData.type_id = e;
			},
			addAttr(){
				this.$http({
					url:'attr',
					method:'post',
					data:this.addAttrData
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'添加属性成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			updateAttr(){
				this.$http({
					url:'attr/'+this.updateAttrData.id,
					method:'put',
					data:this.updateAttrData
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'修改属性成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			}
		},
		mounted(){
			this.getAttrList();
			this.getTypeList();
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
	.el-dialog{
		.el-button{
			margin-top:10px;
		}
	}
</style>