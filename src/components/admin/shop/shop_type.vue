<template>
	<div class="shop_type">
		<!-- 商品模型界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品模型</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索模型"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getTypeList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加类型会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addType">
					<el-button type="primary" @click="showAddType">添加模型</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 全部模型列表表格 -->
		<el-table
	    :data="typeList"
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
	    	prop="type_name"
	    	label="模型名称"
	    	align="center"
	    	>
		    </el-table-column>
	    	<el-table-column
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="editType(scope.row.id)"></i>
	    			<i class="el-icon-delete" size="mini" @click="deleteType(scope.row.id)"></i>
	    		</template>
		    </el-table-column>
	  	</el-table>
	  	<!-- 添加模型会话 -->
	  	<el-dialog 
	  	title="添加模型" 
	  	:visible.sync="isShowAddType"
	  	destroy-on-close
	  	>
		  	<el-form :model="addTypeData">
			    <el-form-item 
			    label="模型名称" 
			    >
			      	<el-input 
			      	v-model="addTypeData.type_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
		  	</el-form>
		  	<!-- 对规格的添加 -->
		  	<el-button @click="addSpecInAdd" type="primary">添加规格</el-button>
		  	<el-table
		  	:data="addTypeData.specs"
		  	>
		  		<el-table-column
			    label="规格名称"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.spec_name" placeholder="请输入内容"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="排序"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.sort" placeholder="请输入内容"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="规格值"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<!-- 对规格值的添加 -->
			    		<el-button @click="addSpecvalueInAdd(scope.$index)" type="primary">添加规格值</el-button>
			    		<div v-for="(item,index) in scope.row.spec_values" class="value">
				    		<el-input v-model="item.spec_value" :key="index"></el-input>
				    		<i class="el-icon-delete" size="mini" @click="deleteSpecvalueInAdd(scope.$index,index)"></i>
			    		</div>
			    	</template>
			    </el-table-column>
			    <el-table-column
		    	label="操作"
		    	align="center"
		    	>
		    		<template slot-scope="scope">
		    			<i class="el-icon-delete" size="mini" @click="deleteSpecInAdd(scope.$index)"></i>
		    		</template>
			    </el-table-column>
		  	</el-table>
		  	<!-- 对属性的添加 -->
		  	<el-button @click="addAttrInAdd" type="primary">添加属性</el-button>
		  	<el-table
		  	:data="addTypeData.attrs"
		  	>
		  		<el-table-column
			    label="属性名称"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.attr_name" placeholder="请输入内容"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="排序"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.sort" placeholder="请输入内容"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="属性值"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<!-- 对属性值的添加 -->
			    		<el-button @click="addAttrvalueInAdd(scope.$index)" type="primary">添加属性值</el-button>
			    		<div v-for="(item,index) in scope.row.attr_values" class="value">
				    		<el-input v-model="scope.row.attr_values[index]" :key="index"></el-input>
				    		<i class="el-icon-delete" size="mini" @click="deleteAttrvalueInAdd(scope.$index,index)"></i>
			    		</div>
			    	</template>
			    </el-table-column>
			    <el-table-column
		    	label="操作"
		    	align="center"
		    	>
		    		<template slot-scope="scope">
		    			<i class="el-icon-delete" size="mini" @click="deleteAttrInAdd(scope.$index)"></i>
		    		</template>
			    </el-table-column>
		  	</el-table>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowAddType = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addType"
			    >
			    确 定
				</el-button>
			</div>
		</el-dialog>
		<!-- 修改模型会话 -->
	  	<el-dialog 
	  	title="修改模型" 
	  	:visible.sync="isShowEditType"
	  	destroy-on-close
	  	>
		  	<el-form :model="updateTypeData">
			    <el-form-item 
			    label="模型名称" 
			    >
			      	<el-input 
			      	v-model="updateTypeData.type_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
		  	</el-form>
		  	<!-- 对规格的添加及展示 -->
		  	<el-button @click="addSpec" type="primary">添加规格</el-button>
		  	<el-table
		  	:data="updateTypeData.specs"
		  	>
		  		<el-table-column
			    label="规格名称"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.spec_name" placeholder="请输入内容"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="排序"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.sort" placeholder="请输入内容"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="规格值"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<el-button @click="addSpecvalue(scope.$index)" type="primary">添加规格值</el-button>
			    		<div v-for="(item,index) in scope.row.spec_values" class="value">
				    		<el-input v-model="item.spec_value" :key="index"></el-input>
				    		<i class="el-icon-delete" size="mini" @click="deleteSpecvalue(scope.$index,index)"></i>
			    		</div>
			    	</template>
			    </el-table-column>
			    <el-table-column
		    	label="操作"
		    	align="center"
		    	>
		    		<template slot-scope="scope">
		    			<i class="el-icon-delete" size="mini" @click="deleteSpec(scope.$index)"></i>
		    		</template>
			    </el-table-column>
		  	</el-table>
		  	<!-- 对属性的添加及展示 -->
		  	<el-button @click="addAttr" type="primary">添加属性</el-button>
		  	<el-table
		  	:data="updateTypeData.attrs"
		  	>
		  		<el-table-column
			    label="属性名称"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.attr_name" placeholder="请输入内容"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="排序"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.sort" placeholder="请输入内容"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="属性值"
			    align="left"
			    >
			    	<template slot-scope="scope">
			    		<el-button @click="addAttrvalue(scope.$index)" type="primary">添加属性值</el-button>
			    		<div v-for="(item,index) in scope.row.attr_values" class="value">
				    		<el-input v-model="scope.row.attr_values[index]" :key="index"></el-input>
				    		<i class="el-icon-delete" size="mini" @click="deleteAttrvalue(scope.$index,index)"></i>
			    		</div>
			    	</template>
			    </el-table-column>
			    <el-table-column
		    	label="操作"
		    	align="center"
		    	>
		    		<template slot-scope="scope">
		    			<i class="el-icon-delete" size="mini" @click="deleteAttr(scope.$index)"></i>
		    		</template>
			    </el-table-column>
		  	</el-table>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowEditType = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="updateType"
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
				keyword:'',
				//是否展示添加会话
				isShowAddType:false,
				//是否展示修改会话
				isShowEditType:false,
				//模型列表数组
				typeList:[],
				//添加模型时的数据
				addTypeData:{
					type_name:"",
					attrs:[
						{attr_name:"",sort:0,attr_values:[""]}
					],
					specs:[
						{spec_name:"",sort:0,spec_values:[{spec_value:""}]}
					]
				},
				//修改模型时的数据
				updateTypeData:{
					type_name:"",
					attrs:[
						{attr_name:"",sort:0,attr_values:[""]}
					],
					specs:[
						{spec_name:"",sort:0,spec_values:[{spec_value:""}]}
					]
				}
			}
		},
		methods:{
			//获取模型列表 其中keyword是搜索关键字
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
			//是否展示添加模型
			showAddType(){
				this.isShowAddType = true;
			},
			//点击编辑模型后进入修改模型界面 发送请求获取该模型信息
			editType(id){
				this.isShowEditType = true;
				this.$http({
					url:'types/'+id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						//对属性值进行处理 使用split对字符串进行分割 分割为数组
						for(var i=0;i<data.attrs.length;i++){
							data.attrs[i].attr_values = data.attrs[i].attr_values.split(',');
						}
						this.updateTypeData = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//删除模型 发送请求
			deleteType(id){
				this.$http({
					url:'types/'+id,
					method:'delete'
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'删除模型成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//添加模型 发送请求
			addType(){
				this.$http({
					url:'types',
					method:'post',
					data:this.addTypeData
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'添加模型成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//修改模型 发送请求
			updateType(){
				this.$http({
					url:'types/'+this.updateTypeData.id,
					method:'put',
					data:this.updateTypeData
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'修改模型成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//在修改模型中点击添加规格按钮 往规格数组中追加值
			addSpec(){
				this.updateTypeData.specs.push({spec_name:"",sort:"",spec_values:[{spec_value:""}]});
			},
			//在添加模型中点击添加规格按钮 往规格数组中追加值
			addSpecInAdd(){
				this.addTypeData.specs.push({spec_name:"",sort:"",spec_values:[{spec_value:""}]});
			},
			//在修改模型中删除规格的操作 规格数组中删除该值
			deleteSpec(index){
				this.updateTypeData.specs.splice(index,1);
			},
			//在添加模型中删除规格的操作 规格数组中删除该值
			deleteSpecInAdd(index){
				this.addTypeData.specs.splice(index,1);
			},
			//在修改模型中点击添加规格值按钮 往规格值数组中追加值
			addSpecvalue(index){
				this.updateTypeData.specs[index].spec_values.push({spec_value:""});
			},
			//在添加模型中点击添加规格值按钮 往规格值数组中追加值
			addSpecvalueInAdd(index){
				this.addTypeData.specs[index].spec_values.push({spec_value:""});
			},
			//在修改模型中点击添加属性按钮 往属性数组中追加值
			addAttr(){
				this.updateTypeData.attrs.push({attr_name:"",sort:"",attr_values:['']});
			},
			//在添加模型中点击添加属性按钮 往属性数组中追加值
			addAttrInAdd(){
				this.addTypeData.attrs.push({attr_name:"",sort:"",attr_values:['']});
			},
			//在修改模型中点击删除属性 属性数组中删除该值
			deleteAttr(index){
				this.updateTypeData.attrs.splice(index,1);
			},
			//在添加模型中点击删除属性 属性数组中删除该值
			deleteAttrInAdd(index){
				this.addTypeData.attrs.splice(index,1);
			},
			//在修改模型中点击添加属性值按钮 往属性值数组中追加值
			addAttrvalue(index){
				this.updateTypeData.attrs[index].attr_values.push('');
			},
			//在添加模型中点击添加属性值按钮 往属性值数组中追加值
			addAttrvalueInAdd(index){
				this.addTypeData.attrs[index].attr_values.push('');
			},
			//在修改模型中点击删除规格值 规格值数组中删除该值
			deleteSpecvalue(index1,index2){
				this.updateTypeData.specs[index1].spec_values.splice(index2,1);
			},
			//在添加模型中点击删除规格值 规格值数组中删除该值
			deleteSpecvalueInAdd(index1,index2){
				this.addTypeData.specs[index1].spec_values.splice(index2,1);
			},
			//在修改模型中点击删除属性值 属性值数组中删除该值
			deleteAttrvalue(index1,index2){
				this.updateTypeData.attrs[index1].attr_values.splice(index2,1);
			},
			//在添加模型中点击删除属性值 属性值数组中删除该值
			deleteAttrvalueInAdd(index1,index2){
				this.addTypeData.attrs[index1].attr_values.splice(index2,1);
			},
		},
		mounted(){
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
	.value{
		display:flex;
		flex-direction:row;
		justify-content:center;
		align-items:center;
	}
</style>