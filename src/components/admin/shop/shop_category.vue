<template>
	<div class="shop_category">
		<!-- 后台商品分类界面 -->
		<!-- 商品分类界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品分类</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索分类"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getCategoryList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加分类会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addCategory">
					<el-button type="primary" @click="showAddCategory">添加分类</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 全部分类列表表格 -->
		<el-table
	    :data="categoryList"
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
	    	prop="cate_name"
	    	label="分类名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="image_url"
	    	label="分类图片"
	    	align="center"
	    	>
		    	<template slot-scope="scope">
		    		<img :src="'http://www.liuguanjin.top:8101'+scope.row.image_url" alt="正在加载">
		      	</template>
	    	</el-table-column> 
	    	<el-table-column
	    	prop="is_show"
	    	label="是否显示"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	prop="is_hot"
	    	label="是否热门"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="editCategory(scope.row.id)"></i>
	    			<i class="el-icon-delete" size="mini" @click="deleteCategory(scope.row.id)"></i>
	    		</template>
		    </el-table-column>
	  	</el-table>
	  	<el-dialog 
	  	title="添加分类" 
	  	:visible.sync="isShowAddCategory"
	  	destroy-on-close
	  	>
		  	<el-form :model="addCategoryData">
			    <el-form-item 
			    label="分类名称" 
			    >
			      	<el-input 
			      	v-model="addCategoryData.cate_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="排序" 
			    >
			      	<el-input 
			      	v-model="addCategoryData.sort" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="父级分类" 
			    >
		      		<el-cascader
				    :options="categoryList"
				    :props="{ children:'son',label:'cate_name',value:'id',checkStrictly:true}"
		    		clearable
		    		@change="getCategoryPid"
		    		:disabled="isFirstCategory == 0?false:true"
		    		>
		    		</el-cascader>

			    </el-form-item>
			    <el-form-item 
			    label="是否作为顶级分类"
			    >
				    <el-radio 
			      	v-model="isFirstCategory"
			      	label="1" 
			      	>
			      	作为顶级分类
			      	</el-radio>
			      	<el-radio 
			      	v-model="isFirstCategory"
			      	label="0" 
			      	>
			      	不作为顶级分类
			      	</el-radio>
		      	</el-form-item>
			    <el-form-item 
			    label="是否显示" 
			    >
			      	<el-radio 
			      	v-model="addCategoryData.is_show"
			      	label="1" 
			      	>
			      	是
			      	</el-radio>
			      	<el-radio 
			      	v-model="addCategoryData.is_show"
			      	label="0" 
			      	>
			      	否
			      	</el-radio>
			    </el-form-item> 
			    <el-form-item 
			    label="是否热门" 
			    >
			      	<el-radio 
			      	v-model="addCategoryData.is_hot" 
			      	label="1"
			      	>
			      	是
			      	</el-radio>
			      	<el-radio 
			      	v-model="addCategoryData.is_hot" 
			      	autocomplete="off"
			      	label="0"
			      	>
			      	否
			      	</el-radio>
			    </el-form-item>
			    <el-form-item 
			    label="分类图片" 
			    >
			    	<el-upload
                    class="upload-demo"
                    action="http://www.liuguanjin.top:8101/logo"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :file-list="fileList"
                    :on-success = 'uploadSuccess'
                    :limit="1"
                    :on-error="uploadError"
                    :headers="myHeader"
                    name="logo"
                    :data="myData"
                    >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif文件，且不超过10MB</div>
                    </el-upload>
			    </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowAddCategory = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addCategory"
			    >
			    确 定
				</el-button>
			</div>
		</el-dialog>
		<!-- 修改分类会话 -->
	  	<el-dialog 
	  	title="修改分类" 
	  	:visible.sync="isShowEditCategory"
	  	destroy-on-close
	  	>
		  	<el-form :model="updateCategoryData">
			    <el-form-item 
			    label="分类名称" 
			    >
			      	<el-input 
			      	v-model="updateCategoryData.cate_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="排序" 
			    >
			      	<el-input 
			      	v-model="updateCategoryData.sort" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="父级分类" 
			    >
		      		<el-cascader
				    :options="categoryList"
				    :props="{ children:'son',label:'cate_name',value:'id',checkStrictly:true}"
		    		clearable
		    		@change="updateGetCategoryPid"
		    		:disabled="updateIsFirstCategory == 0?false:true"
		    		>
		    		</el-cascader>

			    </el-form-item>
			    <el-form-item 
			    label="是否作为顶级分类"
			    >
				    <el-radio 
			      	v-model="updateIsFirstCategory"
			      	label="1" 
			      	>
			      	作为顶级分类
			      	</el-radio>
			      	<el-radio 
			      	v-model="updateIsFirstCategory"
			      	label="0" 
			      	>
			      	不作为顶级分类
			      	</el-radio>
		      	</el-form-item>
			    <el-form-item 
			    label="是否显示" 
			    >
			      	<el-radio 
			      	v-model="updateCategoryData.is_show"
			      	label="1" 
			      	>
			      	是
			      	</el-radio>
			      	<el-radio 
			      	v-model="updateCategoryData.is_show"
			      	label="0" 
			      	>
			      	否
			      	</el-radio>
			    </el-form-item> 
			    <el-form-item 
			    label="是否热门" 
			    >
			      	<el-radio 
			      	v-model="updateCategoryData.is_hot" 
			      	label="1"
			      	>
			      	是
			      	</el-radio>
			      	<el-radio 
			      	v-model="updateCategoryData.is_hot" 
			      	autocomplete="off"
			      	label="0"
			      	>
			      	否
			      	</el-radio>
			    </el-form-item>
			    <el-form-item 
			    label="分类图片" 
			    >
			    	<img :src="'http://www.liuguanjin.top:8101'+updateCategoryData.image_url" alt="正在加载">
			    	<el-upload
                    class="upload-demo"
                    action="http://www.liuguanjin.top:8101/logo"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :file-list="fileList"
                    :on-success = 'updateUploadSuccess'
                    :limit="1"
                    :on-error="uploadError"
                    :headers="myHeader"
                    name="logo"
                    :data="myData"
                    >
                        <el-button slot="trigger" size="small" type="primary">重新上传logo</el-button>
                        <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif文件，且不超过10MB</div>
                    </el-upload>
                </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowEditCategory = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="updateCategory"
			    >
			    确 定
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	var token = localStorage.getItem('token');
	export default {
		data(){
			return {
				keyword:"",
				categoryList:[],
				isShowAddCategory:false,
				addCategoryData:{
					cate_name:"",
					image_url:"",
					is_show:1,
					is_hot:0,
					pid:0,
					sort:50
				},
				isShowEditCategory:false,
				updateCategoryData:{
					cate_name:"",
					image_url:"",
					is_show:1,
					is_hot:0,
					pid:0,
					sort:50
				},
				fileList:[],
				myHeader:{
					Authorization:token
				},
				myData:{
					type:'category'
				},
				isFirstCategory:0,
				updateIsFirstCategory:0
			}
		},
		methods:{
			getCategoryList(keyword=""){
				this.$http({
					url:'categorys'
				}).then(result=>{
					if (result.data.code == 200) {
						this.categoryList = result.data.data;
					}else{
						this.$message({message:result.data.msg,type:'warning'});
					}
				})
			},
			showAddCategory(){
				this.isShowAddCategory = true;
			},
			currentChange(c){
				this.current = c;
			},
			addCategory(){
				if (this.isFirstCategory == 1) {
					this.addCategoryData.pid = 0;
				}
				this.$http({
					url:'categorys',
					method:'post',
					data:this.addCategoryData
				}).then(result=>{
					if (result.data.code == 200) {
						this.$message({message:'添加分类成功',type:'success'});
					}else{
						this.$message({message:result.data.msg,type:'warning'});
					}
				})
			},
			editCategory(id){
				this.isShowEditCategory = true;
				this.$http({
					url:'categorys/'+id
				}).then(result=>{
					if (result.data.code == 200) {
						this.updateCategoryData = result.data.data;
					}else{
						this.$message({message:result.data.msg,type:'warning'});
					}
				})
			},
			deleteCategory(id){
				this.$http({
					url:'categorys/'+id,
					method:'delete'
				}).then(result=>{
					if (result.data.code == 200) {
						this.$message({message:'删除分类成功',type:'success'});
					}else{
						this.$message({message:result.data.msg,type:'warning'});
					}
				})
			},
			updateCategory(){
				if (this.updateIsFirstCategory == 1) {
					this.updateCategoryData.pid = 0;
				}
				this.$http({
					url:'categorys/'+this.updateCategoryData.id,
					method:'put',
					data:this.updateCategoryData
				}).then(result=>{
					if (result.data.code == 200) {
						this.$message({message:'修改分类成功',type:'success'});
					}else{
						this.$message({message:result.data.msg,type:'warning'});
					}
				})
			},
			uploadSuccess(response,file,fileList){
	      		this.$message({message:`${file.name}上传成功`,type:'success'});
	      		this.addCategoryData.image_url = response.data;
			},
			updateUploadSuccess(response,file,fileList){
	      		this.$message({message:`${file.name}上传成功`,type:'success'});
	      		this.updateCategoryData.image_url = response.data;
			},
			beforeRemove(file, fileList) {
        		return this.$confirm(`确定移除 ${ file.name }？`);
      		},
      		handleRemove(file, fileList) {
        		this.$message({message:`移除 ${ file.name } 成功`,type:'success'});
      		},
      		beforeAvatarUpload(file) {
		        var isRightImage = false;
		        var isLt10M = file.size / 1024 / 1024 < 10;
		        if(file.type === 'image/jpeg'
		        	|| file.type === 'image/jpg'
		        	|| file.type === 'image/png'
		        	|| file.type === 'image/gif'){

		        	isRightImage = true;
		       	}
		        if (!isRightImage) {
		          this.$message.error('上传头像图片只能是 jpg/jpeg/png/gif 格式!');
		        }
		        if (!isLt10M) {
		          this.$message.error('上传头像图片大小不能超过 10MB!');
		        }
		        return isRightImage && isLt10M;
	      	},
	      	uploadError(){
	      		this.$message({message:'上传失败，请检查上传地址',type:'warning'})
	      	},
			getCategoryPid(row){
				this.addCategoryData.pid = row[row.length-1];
			},
			updateGetCategoryPid(row){
				this.updateCategoryData.pid = row[row.length-1];
			}
		},
		mounted(){
			this.getCategoryList();
		},
	}
</script>

<style lang="less" scoped>
	.el-row{
		margin-top:10px;
		margin-bottom:10px;
	}
	.search{
		display:flex;
		flex-direction:row;
		margin-top:10px;
	}
	.cell{
		img{
			width:50px;
			height:50px;
		}
	}
	.el-form-item{
		img{
			width:50px;
			height:50px;
		}
	}
</style>