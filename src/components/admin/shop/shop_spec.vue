<template>
	<div class="shop_spec">
		<!-- 规格列表界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品规格</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索规格"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getSpecList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加规格会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addAttrs">
					<el-button type="primary" @click="showAddSpecs">添加规格</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 全部规格列表表格 -->
		<el-table
	    :data="specList"
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
	    	prop="spec_name"
	    	label="规格名称"
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
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="editSpec(scope.row.id)"></i>
	    			<i class="el-icon-delete" size="mini" @click="deleteSpec(scope.row.id)"></i>
	    		</template>
		    </el-table-column>
    	</el-table>
    	<!-- 添加规格会话 -->
	  	<el-dialog 
	  	title="添加属性" 
	  	:visible.sync="isShowAddSpec"
	  	destroy-on-close
	  	>
	  		<el-form :model="addSpecData">
			    <el-form-item 
			    label="规格名称" 
			    >
			      	<el-input 
			      	v-model="addSpecData.spec_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="规格排序" 
			    >
			      	<el-input 
			      	v-model="addSpecData.sort" 
			      	autocomplete="off"
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
			    <el-button @click="isShowAddSpec = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addSpec"
			    >
			    确 定
				</el-button>
			</div>
	    </el-dialog>
	    <!-- 修改规格会话 -->
	  	<el-dialog 
	  	title="修改规格" 
	  	:visible.sync="isShowUpdateSpec"
	  	destroy-on-close
	  	>
	  		<el-form :model="updateSpecData">
			    <el-form-item 
			    label="规格名称" 
			    >
			      	<el-input 
			      	v-model="updateSpecData.spec_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="规格排序" 
			    >
			      	<el-input 
			      	v-model="updateSpecData.sort" 
			      	autocomplete="off"
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
			    <el-button @click="isShowUpdateSpec = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="updateSpec"
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
				specList:[],
				isShowAddSpec:false,
				isShowUpdateSpec:false,
				addSpecData:{
					spec_name:"",
					sort:"",
					type_id:"",
				},
				updateSpecData:{
					spec_name:"",
					sort:"",
					type_id:"",
				},
				add_type_name:"",
				update_type_name:"",
				typeList:[]
			}
		},
		methods:{
			getSpecList(keyword=""){
				this.$http({
					url:'spec?keyword='+this.keyword
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.specList = data;
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
			showAddSpecs(){
				this.isShowAddSpec = true;
			},
			editSpec(id){
				this.isShowUpdateSpec = true;
				this.$http({
					url:'spec/'+id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.updateSpecData = data;
					}else{
						this.$message({message:'获取规格失败',type:'warning'});
					}
				})
			},
			deleteSpec(id){
				this.$http({
					url:'spec/'+id,
					method:'delete'
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'删除规格成功',type:'success'});
					}else{
						this.$message({message:'删除规格失败',type:'warning'});
					}
				})
			},
			addTypeChange(e){
				this.addSpecData.type_id = e;
			},
			updateTypeChange(e){
				this.updateSpecData.type_id = e;
			},
			addSpec(){
				this.$http({
					url:'spec',
					method:'post',
					data:this.addSpecData
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'添加规格成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			updateSpec(){
				this.$http({
					url:'spec/'+this.updateSpecData.id,
					method:'put',
					data:this.updateSpecData
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'修改规格成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			}
		},
		mounted(){
			this.getSpecList();
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