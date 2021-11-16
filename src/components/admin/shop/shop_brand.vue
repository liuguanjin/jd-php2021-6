<template>
	<div class="shop_brand">
		<!-- 后台商品品牌界面 -->
		<!-- 商品品牌界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品品牌</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索品牌"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getBrandList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加品牌会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addBrand">
					<el-button type="primary" @click="showAddBrand">添加品牌</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 全部品牌列表表格 -->
		<el-table
	    :data="brandList"
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
	    	prop="name"
	    	label="品牌名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="logo"
	    	label="品牌图片"
	    	align="center"
	    	>
		    	<template slot-scope="scope">
		    		<img :src="'http://www.liuguanjin.top:8101'+scope.row.logo" alt="正在加载">
		      	</template>
	    	</el-table-column> 
	    	<el-table-column
	    	prop="sort"
	    	label="排序"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	prop="cate_name"
	    	label="所属分类"
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
	    	prop="desc"
	    	label="品牌描述"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="editBrand(scope.row.id)"></i>
	    			<i class="el-icon-delete" size="mini" @click="deleteBrand(scope.row.id)"></i>
	    		</template>
		    </el-table-column>
	  	</el-table>
	  	<!-- 分页 -->
	  	<el-pagination
	    layout="prev, pager, next"
	    :total="total"
	    :page-size.sync="perPage"
	    @current-change="currentChange"
	    >
	  	</el-pagination>
	  	<!-- 添加品牌会话 -->
	  	<el-dialog 
	  	title="添加品牌" 
	  	:visible.sync="isShowAddBrand"
	  	destroy-on-close
	  	>
		  	<el-form :model="addBrandData">
			    <el-form-item 
			    label="品牌名称" 
			    >
			      	<el-input 
			      	v-model="addBrandData.name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="品牌描述" 
			    >
			      	<el-input 
			      	v-model="addBrandData.desc" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="排序" 
			    >
			      	<el-input 
			      	v-model="addBrandData.sort" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
		    	<el-form-item 
			    label="是否热门" 
			    >
			      	<el-radio 
			      	v-model="addBrandData.is_hot"
			      	label="1" 
			      	>
			      	是
			      	</el-radio>
			      	<el-radio 
			      	v-model="addBrandData.is_hot"
			      	label="0" 
			      	>
			      	否
			      	</el-radio>
			    </el-form-item>
			    <el-form-item 
			    label="所属分类" 
			    >
			      	<el-cascader
		      		v-model="pid_path_name"
				    :options="cateList"
				    :props="prop"
		    		clearable
		    		@change="addBrandChange"
		    		>
		    		</el-cascader>
			    </el-form-item>
			    <el-form-item 
			    label="品牌图片" 
			    >
			    	<el-upload
                    class="upload-demo"
                    action="http://www.liuguanjin.top:8101/logo"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :file-list="fileList"
                    :on-success = 'addUploadSuccess'
                    :limit="1"
                    :on-error="uploadError"
                    :headers="myHeader"
                    name="logo"
                    :data="myData"
                    >
                        <el-button slot="trigger" size="small" type="primary">上传logo</el-button>
                        <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif文件，且不超过10MB</div>
                    </el-upload>
                </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowAddBrand = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addBrand"
			    >
			    确 定
				</el-button>
			</div>
		</el-dialog>
		<!-- 修改品牌会话 -->
	  	<el-dialog 
	  	title="修改品牌" 
	  	:visible.sync="isShowEditBrand"
	  	destroy-on-close
	  	>
		  	<el-form :model="updateBrandData">
			    <el-form-item 
			    label="品牌名称" 
			    >
			      	<el-input 
			      	v-model="updateBrandData.name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="品牌描述" 
			    >
			      	<el-input 
			      	v-model="updateBrandData.desc" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="排序" 
			    >
			      	<el-input 
			      	v-model="updateBrandData.sort" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
		    	<el-form-item 
			    label="是否热门" 
			    >
			      	<el-radio 
			      	v-model="updateBrandData.is_hot"
			      	label="1" 
			      	>
			      	是
			      	</el-radio>
			      	<el-radio 
			      	v-model="updateBrandData.is_hot"
			      	label="0" 
			      	>
			      	否
			      	</el-radio>
			    </el-form-item>
			    <el-form-item 
			    label="所属分类" 
			    >
		      		<el-cascader
		      		v-model="update_pid_path_name"
				    :options="cateList"
				    :props="updateProp"
		    		clearable
		    		@change="updateBrandChange"
		    		>
		    		</el-cascader>
			    </el-form-item>
			    <el-form-item 
			    label="品牌图片" 
			    >
			    	<img :src="'http://www.liuguanjin.top:8101'+updateBrandData.logo" alt="正在加载">
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
			    <el-button @click="isShowEditBrand = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="updateBrand"
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
				brandList:[],
				total:0,
				perPage:4,
				currentPage:1,
				isShowAddBrand:false,
				addBrandData:{
					name:"",
					cate_id:"",
					desc:"",
					is_hot:1,
					sort:50,
					logo:"",
					url:""
				},
				updateBrandData:{
					name:"",
					cate_id:"",
					desc:"",
					is_hot:1,
					sort:50,
					logo:"",
					url:""
				},
				value:'',
				cateList:[],
				pid_path_name:'',
				update_pid_path_name:'',
				isShowEditBrand:false,
				prop:{ 
					lazy:true,
					value:'id',
					label:'cate_name',
					lazyLoad:(node,resolve)=>{
						const { level} = node;
						if (level == 1 || level == 2) {
							const { data } = node;
							this.$http({
								url:'categorys?type=list&pid='+data.id
							}).then(result=>{
								const res = result.data.data.map(item=>({
									cate_name:item.cate_name,
									label:item.level,
									id:item.id,
									leaf:level >= 2,
								}))
								resolve(res);
							})
						}
					}
				},
				updateProp:{ 
					lazy:true,
					value:'id',
					label:'cate_name',
					lazyLoad:(node,resolve)=>{
						const { level} = node;
						if (level == 1 || level == 2) {
							const { data } = node;
							this.$http({
								url:'categorys?type=list&pid='+data.id
							}).then(result=>{
								const res = result.data.data.map(item=>({
									cate_name:item.cate_name,
									label:item.level,
									id:item.id,
									leaf:level >= 2,
								}))
								resolve(res);
							})
						}
					}
				},
				myHeader:{
					Authorization:token
				},
				myData:{
					type:'brand'
				},
				fileList:[],
			}
		},
		methods:{
			getBrandList(keyword=""){
				this.$http({
					url:'brands?page='+this.currentPage+'&keyword='+this.keyword
				}).then(result=>{
					if (result.data.code == 200) {
						this.brandList = result.data.data.data;
						this.total = result.data.data.total;
						this.perPage = result.data.data.per_page;
					}else{
						this.$message({message:result.data.msg,type:'warning'});
					}
				})
			},
			showAddBrand(){
				this.isShowAddBrand = true;
			},
			editBrand(id){
				this.isShowEditBrand = true;
				this.$http({
					url:'brands/' + id
				}).then(result=>{
					const {code,data} = result.data;
					if (code == 200) {
						this.updateBrandData = data;
						this.$http({
							url:'categorys/'+this.updateBrandData.cate_id
						}).then(result2=>{
							if (result2.data.code == 200) {
								if (result2.data.data.pid == 0) {
									this.update_pid_path_name = result2.data.data.cate_name;
								}else{
									this.update_pid_path_name = result2.data.data.pid_path_name;
								}
							}else{
								this.$message({message:result2.data.msg,type:'warning'});
							}
						})
					}else{
						this.$message({message:result.data.msg,type:'warning'});
					}
				})
			},
			deleteBrand(id){
				this.$http({
					url:'brands/'+id,
					method:'delete'
				}).then(result=>{
					const {code,data,msg} = result.data;
					if (code == 200) {
						this.$message({message:'删除成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			currentChange(c){
				this.currentPage = c;
				this.getBrandList();
			},
			getCateList(){
				this.$http({
					url:'categorys?type=list&pid=0'
				}).then(result=>{
					if (result.data.code == 200) {
						this.cateList = result.data.data;
					}else{
						this.$message({message:result.data.msg,type:'warning'});
					}
				})
			},
			addBrand(){
				this.$http({
					url:'brands',
					method:'post',
					data:this.addBrandData
				}).then(result=>{
					const {code,data,msg} = result.data;
					if (code == 200) {
						this.$message({message:'新增品牌成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			updateBrand(){
				this.$http({
					url:'brands/'+this.updateBrandData.id,
					method:'put',
					data:this.updateBrandData
				}).then(result=>{
					const {code,data,msg} = result.data;
					if (code == 200) {
						this.$message({message:'修改品牌成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
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
	      	handleRemove(file, fileList) {
        		this.$message({message:`移除 ${ file.name } 成功`,type:'success'});
      		},
      		beforeRemove(file, fileList) {
        		return this.$confirm(`确定移除 ${ file.name }？`);
      		},
      		updateUploadSuccess(response,file,fileList){
	      		this.$message({message:`${file.name}上传成功`,type:'success'});
	      		this.updateBrandData.logo = response.data;
			},
			addUploadSuccess(response,file,fileList){
	      		this.$message({message:`${file.name}上传成功`,type:'success'});
	      		this.addBrandData.logo = response.data;
			},
			uploadError(){
	      		this.$message({message:'上传失败，请检查上传地址',type:'warning'})
	      	},
	      	updateBrandChange(e){
	      		this.updateBrandData.cate_id = e[2];
	      	},
	      	addBrandChange(e){
	      		this.addBrandData.cate_id = e[2];
	      	}
		},
		mounted(){
			this.getBrandList();
			this.getCateList();
		}
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
	.el-pagination{
		display:flex;
		flex-direction:row;
		justify-content:center;
	}
	.el-form-item{
		img{
			width:50px;
			height:50px;
		}
	}
	.cell{
		img{
			width:50px;
			height:50px;
		}
	}
</style>