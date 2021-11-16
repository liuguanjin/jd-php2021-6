<template>
	<div class="release-goods">
		<!-- 后台发布宝贝界面 -->
		<!-- 商品列表界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>我的店铺</el-breadcrumb-item>
			<el-breadcrumb-item>发布宝贝</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索商品"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getMyGoodsList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加商品会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addMyGoods">
					<el-button type="primary" @click="showAddGood">发布宝贝</el-button>
				</div>
			</el-col>
		</el-row>
	  	<span>我的所有宝贝:</span>
		<!-- 全部商品列表表格 -->
		<el-table
	    :data="myGoodsList"
	    border
	    style="width: 100%"
	    row-key="id"
	    >
		    <el-table-column
	    	prop="goods_name"
	    	label="商品名称"
	    	align="center"
	    	class-name="goods_name"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="goods_logo"
	    	label="商品logo"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
		    		<img :src="'http://www.liuguanjin.top:8101'+scope.row.goods_logo" alt="正在加载">
		      	</template>
		    </el-table-column>
		    <el-table-column
	    	prop="goods_price"
	    	label="商品价格"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="market_price"
	    	label="商品市场价"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="cost_price"
	    	label="商品成本价"
	    	align="center"
	    	>
		    </el-table-column> 
		    <el-table-column
	    	prop="goods_number"
	    	label="商品库存"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="sales_num"
	    	label="商品销量"
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
	    	prop="brand_name"
	    	label="所属品牌"
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
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="editGoods(scope.row.id)"></i>
	    			<i class="el-icon-delete" size="mini" @click="deleteGoods(scope.row.id)"></i>
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
	  	<!-- 发布宝贝会话 -->
	  	<el-dialog 
	  	title="发布宝贝" 
	  	:visible.sync="isShowAddGoods"
	  	destroy-on-close
	  	>
	  		<el-form :model="addGoodsData">
			    <el-form-item 
			    label="商品名称" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.goods_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="商品价格" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.goods_price" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="商品市场价" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.market_price" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="商品成本价" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.cost_price" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="商品库存" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.goods_number" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    
			    <el-form-item 
			    label="所属分类" 
			    >
		      		<el-cascader
		      		v-model="add_cate_name"
				    :options="cateList"
				    :props="cateProp"
		    		clearable
		    		@change="addCateChange"
		    		>
		    		</el-cascader>
			    </el-form-item>
			    <el-form-item 
			    label="所属品牌" 
			    >
		      		<el-select
		      		v-model="add_brand_name" 
		      		placeholder="请选择品牌"
		    		clearable
		    		@change="addBrandChange"
		      		>
			      		<el-option
			      		v-for="item in brandList"
			      		:key="item.id"
			      		:value="item.id"
			      		:label="item.name"
			    		>
			    		</el-option>
		      		</el-select>
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
			    <el-form-item 
			    label="商品logo" 
			    >
			    	<el-upload
                    class="upload-demo"
                    action="http://www.liuguanjin.top:8101/logo"
                    list-type="picture"
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
                        <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif/webp文件，且不超过10MB</div>
                    </el-upload>
                </el-form-item>
                <el-form-item 
			    label="商品相册" 
			    >
			    	<el-upload
			    	ref="upload"
                    class="upload-demo"
                    action="http://www.liuguanjin.top:8101/images"
                    :data="myData"
                    :auto-upload="false"
                	multiple
                    name="images"
                    list-type="picture"
                    :http-request="handleUpload"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :file-list="imagesList"
                    :on-success = 'addImagesSuccess'
                    :on-error="uploadError"
                    :headers="myHeader"
                    >
                        <el-button slot="trigger" size="small" type="primary">上传商品相册</el-button>
                        <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif文件，且不超过10MB</div>
                    </el-upload>
                </el-form-item>
		  	</el-form>
		  	<p class="tips">(请添加模型后再进行添加属性及规格商品)</p>
		  	<!-- 对属性的添加 -->
		  	<el-button @click="addAttrInAdd" type="primary">添加属性</el-button>
		  	<el-table
		  	:data="attr"
		  	>
			  	<el-table-column
			  	v-for="(item,index) in attrList"
			  	:key="index"
			    :label="item.attr_name"
			    align="center"
			    >
			    	<template slot-scope="scope">
			    		<el-select
			    		v-model="attrvalue[index]"
			    		clearable
			    		@change="attrvalueChange($event,index,item.id,item.attr_name)"
			    		>
			    			<el-option
			    			v-for="(item2,index2) in item.attr_values.split(',')"
			    			:key="index2"
			    			:value="item2"
			    			>
			    			</el-option>
			    		</el-select>
			    	</template>
				</el-table-column>
		  	</el-table>
		  	<!-- 对规格的添加 -->
		  	<el-button @click="addSpecInAdd" type="primary">添加规格商品</el-button>
		  	<el-table
		  	:data="addGoodsData.item"
		  	>
		  		<el-table-column
			    label="价格"
			    align="center"
			    min-width="20%"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.price" placeholder="请输入价格"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="成本价"
			    align="center"
			    min-width="25%"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.cost_price" placeholder="请输入成本价"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="库存"
			    align="center"
			    min-width="20%"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.store_count" placeholder="请输入库存"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="规格值"
			    align="center"
			    min-width="25%"
			    >
			    	<template slot-scope="scope">
			    		<el-select
				    	v-for="(item1,index1) in specList"
		      			:key="index1"
			      		v-model="spec_value[(scope.$index+1000)*(index1+1)]"
			      		:placeholder="'请选择'+item1.spec_name"
			    		clearable
			    		@visible-change="isGetSpecvalue($event,item1.id)"
			    		@change="specvalueChange($event,scope.$index,index1,item1.spec_name)"
			      		>
				      		<el-option
				      		v-for="item in specvalueList"
				      		:key="item.id"
				      		:value="item.id"
				      		:label="item.spec_value"
				    		>
				    		</el-option> 
			      		</el-select>
			    	</template>
			    </el-table-column>
			    <el-table-column
		    	label="操作"
		    	align="center"
		    	min-width="10%"
		    	>
		    		<template slot-scope="scope">
		    			<i class="el-icon-delete" size="mini" @click="deleteSpecInAdd(scope.$index)"></i>
		    		</template>
			    </el-table-column>
		  	</el-table>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowAddGoods = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addGoods"
			    >
			    确 定
				</el-button>
			</div>
	  	</el-dialog>
	  	<!-- 修改商品会话 -->
	  	<el-dialog 
	  	title="修改商品" 
	  	:visible.sync="isShowEditGoods"
	  	destroy-on-close
	  	>
	  		<el-form :model="updateGoodsData">
			    <el-form-item 
			    label="商品名称" 
			    >
			      	<el-input 
			      	v-model="updateGoodsData.goods_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="商品价格" 
			    >
			      	<el-input 
			      	v-model="updateGoodsData.goods_price" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="商品市场价" 
			    >
			      	<el-input 
			      	v-model="updateGoodsData.market_price" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="商品成本价" 
			    >
			      	<el-input 
			      	v-model="updateGoodsData.cost_price" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="商品库存" 
			    >
			      	<el-input 
			      	v-model="updateGoodsData.goods_number" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    
			    <el-form-item 
			    label="所属分类" 
			    >
		      		<el-cascader
		      		v-model="update_cate_name"
				    :options="cateList"
				    :props="cateProp"
		    		clearable
		    		@change="updateCateChange"
		    		>
		    		</el-cascader>
			    </el-form-item>
			    <el-form-item 
			    label="所属品牌" 
			    >
		      		<el-select
		      		v-model="update_brand_name" 
		      		placeholder="请选择品牌"
		    		clearable
		    		@change="updateBrandChange"
		      		>
			      		<el-option
			      		v-for="item in brandList"
			      		:key="item.id"
			      		:value="item.id"
			      		:label="item.name"
			    		>
			    		</el-option>
		      		</el-select>
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
			    <el-form-item 
			    label="商品logo" 
			    >
			    	<img :src="'http://www.liuguanjin.top:8101/'+updateGoodsData.goods_logo" alt="">
			    	<el-upload
                    class="upload-demo"
                    action="http://www.liuguanjin.top:8101/logo"
                    list-type="picture"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :file-list="updateFileList"
                    :on-success = 'updateUploadSuccess'
                    :limit="1"
                    :on-error="uploadError"
                    :headers="myHeader"
                    name="logo"
                    :data="myData"
                    >
                    	
                        <el-button slot="trigger" size="small" type="primary">重新上传logo</el-button>
                        <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif/webp文件，且不超过10MB</div>
                    </el-upload>
                </el-form-item>
                <el-form-item 
			    label="商品相册" 
			    >	

			    	<el-upload
			    	ref="updateUpload"
                    class="upload-demo"
                    action="http://www.liuguanjin.top:8101/images"
                    :data="myData"
                    :auto-upload="false"
                	multiple
                    name="images"
                    list-type="picture"
                    :http-request="handleUpdateUpload"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :file-list="updateGoodsData.goods_image"
                    :on-success = 'addImagesSuccess'
                    :on-error="uploadError"
                    :headers="myHeader"
                    >
                        <el-button slot="trigger" size="small" type="primary">重新上传商品相册</el-button>
                        <el-button size="small" type="success" @click="submitUpdateUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif文件，且不超过10MB</div>
                    </el-upload>
                </el-form-item>
		  	</el-form>
		  	<p class="tips">(请添加模型后再进行添加属性及规格商品)</p>
		  	<!-- 对属性的添加 -->
		  	<el-button @click="addAttrInAdd" type="primary">添加属性</el-button>
		  	<el-table
		  	:data="attr"
		  	>
			  	<el-table-column
			  	v-for="(item,index) in attrList"
			  	:key="index"
			    :label="item.attr_name"
			    align="center"
			    >
			    	<template slot-scope="scope">
			    		<el-select
			    		v-model="attrvalue[index]"
			    		clearable
			    		@change="updateAttrvalueChange($event,index,item.id,item.attr_name)"
			    		>
			    			<el-option
			    			v-for="(item2,index2) in item.attr_values.split(',')"
			    			:key="index2"
			    			:value="item2"
			    			>
			    			</el-option>
			    		</el-select>
			    	</template>
				</el-table-column>
		  	</el-table>
		  	<!-- 对规格的添加 -->
		  	<el-button @click="addSpecInUpdate" type="primary">添加规格商品</el-button>
		  	<el-table
		  	:data="updateGoodsData.item"
		  	>
		  		<el-table-column
			    label="价格"
			    align="center"
			    min-width="20%"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.price" placeholder="请输入价格"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="成本价"
			    align="center"
			    min-width="25%"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.cost_price" placeholder="请输入成本价"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="库存"
			    align="center"
			    min-width="20%"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.store_count" placeholder="请输入库存"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="规格值"
			    align="center"
			    min-width="25%"
			    >
			    	<template slot-scope="scope">
			    		<el-select
				    	v-for="(item1,index1) in specList"
		      			:key="index1"
			      		v-model="spec_value[(scope.$index+1000)*(index1+1)]"
			      		:placeholder="'请选择'+item1.spec_name"
			    		clearable
			    		@visible-change="isGetSpecvalue($event,item1.id)"
			    		@change="updateSpecvalueChange($event,scope.$index,index1,item1.spec_name)"
			      		>
				      		<el-option
				      		v-for="item in specvalueList"
				      		:key="item.id"
				      		:value="item.id"
				      		:label="item.spec_value"
				    		>
				    		</el-option> 
			      		</el-select>
			    	</template>
			    </el-table-column>
			    <el-table-column
		    	label="操作"
		    	align="center"
		    	min-width="10%"
		    	>
		    		<template slot-scope="scope">
		    			<i class="el-icon-delete" size="mini" @click="deleteSpecInUpdate(scope.$index)"></i>
		    		</template>
			    </el-table-column>
		  	</el-table>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowEditGoods = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="updateGoods"
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
				myGoodsList:[],
				total:0,
				perPage:10,
				currentPage:1,
				keyword:"",
				isShowAddGoods:false,
				isShowEditGoods:false,
				addGoodsData:{
					goods_name:"",
					goods_price:"",
					goods_logo:"",
					market_price:"",
					cost_price:"",
					goods_number:"",
					cate_id:"",
					brand_id:"",
					type_id:"",
					shop_id:"",
					item:[
						{price:"",cost_price:"",store_count:"",value_ids:"",value_names:""}
					],
					goods_images:[],
					attr:[
						
					]
				},
				updateGoodsData:{
					goods_name:"",
					goods_price:"",
					goods_logo:"",
					market_price:"",
					cost_price:"",
					goods_number:"",
					cate_id:"",
					brand_id:"",
					type_id:"",
					shop_id:"",
					item:[
						{price:"",cost_price:"",store_count:"",value_ids:"",value_names:""}
					],
					goods_images:[],
					attr:[
						
					]
				},
				cateList:[],
				brandList:[],
				typeList:[],
				add_cate_name:'',
				update_cate_name:'',
				add_brand_name:'',
				update_brand_name:'',
				add_type_name:'',
				update_type_name:'',
				myHeader:{
					Authorization:token
				},
				myData:{
					type:'goods'
				},
				attr:[],
				fileList:[],
				updateFileList:[],
				imagesList:[],
				updateImagesList:[],
				attrList:[],
				specList:[],
				specvalueList:[],
				spec_value:[],
				attrvalue:[],
				cateProp:{ 
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
			}
		},
		created(){
			this.getMyGoodsList();
		},
		methods:{
			getMyGoodsList(keyword=""){
				var admininfo = JSON.parse(localStorage.getItem('admininfo'));
				if (admininfo != '' && admininfo != null && admininfo != undefined) {
					var admin_id = admininfo.admin_id
				}
				this.$http({
					url:'mygoods?admin_id='+admin_id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.myGoodsList = data.data;
						this.total = data.total; 
						this.perPage = data.perPage; 
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			currentChange(c){
				this.currentPage = c;
				this.getMyGoodsList();
			},
			//获取分类列表 用于选择商品所属分类
			getCateList(){
				this.$http({
					url:'categorys?type=list&pid=0'
				}).then(result=>{
					const {code,data,msg} = result.data;
					if (code == 200) {
						this.cateList = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//获取品牌列表 用于选择商品所属品牌
			getBrandList(){
				this.$http({
					url:'allbrands'
				}).then(result=>{
					const {code,data,msg} = result.data;
					if (code == 200) {
						this.brandList = data;
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
			showAddGood(){
				this.isShowAddGoods = true;
				this.getTypeList();
				this.getCateList();
				this.getBrandList();
			},
			//添加商品时改变选中分类的逻辑 将选中的分类id添加至数据中
			addCateChange(e){
	      		this.addGoodsData.cate_id = e[2];
	      	},
	      	//添加商品时改变选中分类的逻辑 将选中的分类id添加至数据中
			updateCateChange(e){
	      		this.updateGoodsData.cate_id = e[2];
	      	},
	      	//添加商品时改变选中品牌的逻辑 将选中的品牌id添加至数据中
	      	addBrandChange(e){
	      		this.addGoodsData.brand_id = e;
	      	},
	      	//添加商品时改变选中品牌的逻辑 将选中的品牌id添加至数据中
	      	updateBrandChange(e){
	      		this.updateGoodsData.brand_id = e;
	      	},
	      	//添加商品时改变选中模型的逻辑 将选中的模型id添加至数据中 并重新请求该模型下的规格
	      	addTypeChange(e){
	      		this.addGoodsData.type_id = e;
	      		this.addGoodsData.item = [];
	      		this.addGoodsData.attr = [];
	      		this.getSpecList(e);
	      		this.getAttrList(e);
	      	},
	      	//添加商品时改变选中模型的逻辑 将选中的模型id添加至数据中 并重新请求该模型下的规格
	      	updateTypeChange(e){
	      		this.updateGoodsData.type_id = e;
	      		this.updateGoodsData.item = [];
	      		this.updateGoodsData.attr = [];
	      		this.getSpecList(e);
	      		this.getAttrList(e);
	      	},
	      	//获取规格列表 用于选择商品所属规格 type_id 所属模型id
			getSpecList(id){
				this.$http({
					url:'specs?type_id='+id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.specList = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//获取属性列表 用于选择商品所属属性 type_id 所属模型id
			getAttrList(id){
				this.$http({
					url:'attrs?type_id='+id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.attrList = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//在上传logo时判断 格式大小是否为指定格式大小
			beforeAvatarUpload(file) {
		        var isRightImage = false;
		        var isLt10M = file.size / 1024 / 1024 < 10;
		        if(file.type === 'image/jpeg'
		        	|| file.type === 'image/jpg'
		        	|| file.type === 'image/png'
		        	|| file.type === 'image/gif'
		        	|| file.type === 'image/webp'){

		        	isRightImage = true;
		       	}
		        if (!isRightImage) {
		          this.$message.error('上传头像图片只能是 jpg/jpeg/png/gif/webp 格式!');
		        }
		        if (!isLt10M) {
		          this.$message.error('上传头像图片大小不能超过 10MB!');
		        }
		        return isRightImage && isLt10M;
	      	},
			//移除已上传的logo 显示移除提示
	      	handleRemove(file, fileList) {
        		this.$message({message:`移除 ${ file.name } 成功`,type:'success'});
      		},
      		//在移除前的判断 提示是否移除
      		beforeRemove(file, fileList) {
        		return this.$confirm(`确定移除 ${ file.name }？`);
      		},
      		//添加商品上传logo成功 提示信息 将上传成功的地址添加到数据中
      		addUploadSuccess(response,file,fileList){
	      		this.$message({message:`${file.name}上传成功`,type:'success'});
	      		this.addGoodsData.goods_logo = response.data;
			},
			//添加商品上传logo成功 提示信息 将上传成功的地址添加到数据中
      		updateUploadSuccess(response,file,fileList){
	      		this.$message({message:`${file.name}上传成功`,type:'success'});
	      		this.updateGoodsData.goods_logo = response.data;
			},
			//上传logo失败的逻辑 提示上传失败
			uploadError(){
	      		this.$message({message:'上传失败，请检查上传地址',type:'warning'});
	      	},
	      	handleUpload(row){
				this.imagesList.push(row);
			},
			handleUpdateUpload(row){
				this.updateImagesList.push(row);
			},
	      	//上传iamges成功 提示信息 将上传成功的地址添加到数据中
      		addImagesSuccess(response,file,fileList){
	      		this.$message({message:`${file.name}上传成功`,type:'success'});
			},
			submitUpload(){
				this.$refs.upload.submit();
				var fd = new window.FormData();
				fd.append('operator','刘观金');
				fd.append('type','goods');
				this.imagesList.forEach(function(file){
					fd.append('images[]',file.file);
				});
				this.$http({
					url:'images',
					method:'post',
					data:fd
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.addGoodsData.goods_images = data.success;
						this.$message({message:'上传成功',type:'success'});
					}else{
						this.$message({message:msg || data.error.name+'上传失败,失败原因:'+data.error.msg,type:'warning'});
					}
				})
			},
			submitUpdateUpload(){
				this.$refs.updateUpload.submit();
				var fd = new window.FormData();
				fd.append('operator','刘观金');
				fd.append('type','goods');
				this.updateImagesList.forEach(function(file){
					fd.append('images[]',file.file);
				});
				this.$http({
					url:'images',
					method:'post',
					data:fd
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.updateGoodsData.goods_images = data.success;
						this.$message({message:'上传成功',type:'success'});
					}else{
						this.$message({message:msg || data.error.name+'上传失败,失败原因:'+data.error.msg,type:'warning'});
					}
				})
			},
			//点击添加规格商品按钮后的逻辑 push方法使数据中的item添加一项空的值
	      	addSpecInAdd(){
	      		this.addGoodsData.item.push({price:"",cost_price:"",store_count:"",value_ids:"",value_names:""});
	      	},
	      	addSpecInUpdate(){
	      		this.updateGoodsData.item.push({price:"",cost_price:"",store_count:"",value_ids:"",value_names:""});
	      	},
	      	//点击添加规格商品按钮后的逻辑 push方法使数据中的item添加一项空的值
	      	addAttrInAdd(){
	      		if (this.attr.length == 0) {
	      			this.attr.push({id:"",attr_name:"",attr_value:""});
	      		}
	      	},
	      	//属性值下拉列表发生改变时的逻辑
	      	attrvalueChange(e,index,id,name){
	      		this.addGoodsData.attr.push({"id":"","attr_name":"","attr_value":""});
	      		this.addGoodsData.attr[index].id=id;
	      		this.addGoodsData.attr[index].attr_name=name;
	      		this.addGoodsData.attr[index].attr_value=e;
	      	},
	      	updateAttrvalueChange(e,index,id,name){
	      		this.updateGoodsData.attr.push({"id":"","attr_name":"","attr_value":""});
	      		this.updateGoodsData.attr[index].id=id;
	      		this.updateGoodsData.attr[index].attr_name=name;
	      		this.updateGoodsData.attr[index].attr_value=e;
	      	},
	      	//当规格值下拉列表收起时清空specvalue
	      	isGetSpecvalue(flag,id){
	      		if (flag) {
	      			if (this.specvalueList.length == 0) {
		      			this.$http({
		      				url:'specvalues?spec_id='+id
		      			}).then(result=>{
		      				const {code,msg,data} = result.data;
		      				if (code == 200) {
		      					this.specvalueList = data;
		      				}else{
		      					this.$message({message:msg,type:'warning'})
		      				}
		      			})
	      			}
	      		}else{
	      			this.specvalueList = [];
	      		}
	      	},
	      	//规格值下拉列表发生改变时的逻辑
	      	specvalueChange(e,index,index1,name){
	      		if (e !== "") {
		      		this.spec_goods = this.specvalueList.find(item=>item.id ==e);
		      		var value = this.spec_goods.spec_value;
	  				var value_ids = this.addGoodsData.item[index].value_ids;
	  				var value_names = this.addGoodsData.item[index].value_names;
		      		if (index1 == 0) {
		      			if (index1 == (this.specList.length-1)) {
	  						this.addGoodsData.item[index].value_ids = e;
	  						this.addGoodsData.item[index].value_names = name + ':' + value;
	  					}else{
			      			if (value_ids.length == 0) {
			      				this.addGoodsData.item[index].value_ids = e + '_';
			      			}else{
				      			value_ids = value_ids.slice(value_ids.indexOf('_'),value_ids.length);
				      			e += value_ids;
				      			this.addGoodsData.item[index].value_ids = e;
			      			}
			      			if (value_names.length == 0) {
			      				this.addGoodsData.item[index].value_names = name + ':' + value + ';';
			      			}else{
			      				value_names = value_names.slice(value_names.indexOf(';'),value_names.length);
			      				value = name + ':' + value + value_names;
			      				this.addGoodsData.item[index].value_names = value;
			      			}
	  					}
		      		}else{
		      			if (index1 == (this.specList.length-1)) {
	  						this.addGoodsData.item[index].value_ids += e;
	  						this.addGoodsData.item[index].value_names = value_names + name + ':' + value;
	  					}else{
			      			if (value_ids.length == 0) {
			      				this.addGoodsData.item[index].value_ids = '_' + e;
			      			}else{
			      				//修改value_ids
				      			if(value_ids.length > (value_ids.indexOf('_')+1)){
				      				var idIndex = value_ids.indexOf('_');
				      				for(var i = 0;i < index1;i ++ ){
				      					idIndex = value_ids.indexOf('_',idIndex + 1);
				      				}
				      				this.addGoodsData.item[index].value_ids = value_ids.slice(0,idIndex+1);
				      				this.addGoodsData.item[index].value_ids += e;
				      			}else{
				      				//往value_ids中新增
				      				this.addGoodsData.item[index].value_ids = value_ids + e +'_';
								}
			      			}
			      			if (value_names.length == 0) {
			      				this.addGoodsData.item[index].value_names = ';' + name + ':' + value;
			      			}else{
			      				//修改value_name
			      				if (value_names.length > (value_names.indexOf(';')+1)) {
			      					var nameIndex = value_names.indexOf(';');
			      					for(var i = 0;i < index1;i ++ ){
			      						nameIndex = value_names.indexOf(';',nameIndex + 1);
			      					}
			      					value_names = value_names.slice(0,nameIndex+1);
			      					value_names = value_names + name + ':' + value;
			      					this.addGoodsData.item[index].value_names = value_names;
			      				}else{
			      					//往value_name中新增
				      				this.addGoodsData.item[index].value_names = value_names + name + ':' + value + ';';
								}
			      			}
	  					}
		      		}
	      		}
	      	},
	      	//规格值下拉列表发生改变时的逻辑
	      	updateSpecvalueChange(e,index,index1,name){
	      		if (e !== "") {
		      		this.spec_goods = this.specvalueList.find(item=>item.id ==e);
		      		var value = this.spec_goods.spec_value;
	  				var value_ids = this.updateGoodsData.item[index].value_ids;
	  				var value_names = this.updateGoodsData.item[index].value_names;
		      		if (index1 == 0) {
		      			if (index1 == (this.specList.length-1)) {
	  						this.updateGoodsData.item[index].value_ids = e;
	  						this.updateGoodsData.item[index].value_names = name + ':' + value;
	  					}else{
			      			if (value_ids.length == 0) {
			      				this.updateGoodsData.item[index].value_ids = e + '_';
			      			}else{
				      			value_ids = value_ids.slice(value_ids.indexOf('_'),value_ids.length);
				      			e += value_ids;
				      			this.updateGoodsData.item[index].value_ids = e;
			      			}
			      			if (value_names.length == 0) {
			      				this.updateGoodsData.item[index].value_names = name + ':' + value + ';';
			      			}else{
			      				value_names = value_names.slice(value_names.indexOf(';'),value_names.length);
			      				value = name + ':' + value + value_names;
			      				this.updateGoodsData.item[index].value_names = value;
			      			}
	  					}
		      		}else{
		      			if (index1 == (this.specList.length-1)) {
	  						this.updateGoodsData.item[index].value_ids += e;
	  						this.updateGoodsData.item[index].value_names = value_names + name + ':' + value;
	  					}else{
			      			if (value_ids.length == 0) {
			      				this.updateGoodsData.item[index].value_ids = '_' + e;
			      			}else{
			      				//修改value_ids
				      			if(value_ids.length > (value_ids.indexOf('_')+1)){
				      				var idIndex = value_ids.indexOf('_');
				      				for(var i = 0;i < index1;i ++ ){
				      					idIndex = value_ids.indexOf('_',idIndex + 1);
				      				}
				      				this.updateGoodsData.item[index].value_ids = value_ids.slice(0,idIndex+1);
				      				this.updateGoodsData.item[index].value_ids += e;
				      			}else{
				      				//往value_ids中新增
				      				this.updateGoodsData.item[index].value_ids = value_ids + e +'_';
								}
			      			}
			      			if (value_names.length == 0) {
			      				this.updateGoodsData.item[index].value_names = ';' + name + ':' + value;
			      			}else{
			      				//修改value_name
			      				if (value_names.length > (value_names.indexOf(';')+1)) {
			      					var nameIndex = value_names.indexOf(';');
			      					for(var i = 0;i < index1;i ++ ){
			      						nameIndex = value_names.indexOf(';',nameIndex + 1);
			      					}
			      					value_names = value_names.slice(0,nameIndex+1);
			      					value_names = value_names + name + ':' + value;
			      					this.updateGoodsData.item[index].value_names = value_names;
			      				}else{
			      					//往value_name中新增
				      				this.updateGoodsData.item[index].value_names = value_names + name + ':' + value + ';';
								}
			      			}
	  					}
		      		}
	      		}
	      	},
	      	//点击规格商品中的删除图标后的逻辑 splice删除item中的该项
	      	deleteSpecInAdd(index){
	      		this.addGoodsData.item.splice(index,1);
	      	},
	      	deleteSpecInUpdate(index){
	      		this.updateGoodsData.item.splice(index,1);
	      	},
	      	//添加商品逻辑 发送请求
			addGoods(){
				this.addGoodsData.shop_id = this.myGoodsList[0].shop_id;
				this.$http({
					url:'goods',
					method:'post',
					data:this.addGoodsData
				}).then(result=>{
					const {code,data,msg} = result.data;
					if (code == 200) {
						this.$message({message:'添加商品成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			updateGoods(){
				this.$http({
					url:'goods/'+this.updateGoodsData.id,
					method:'put',
					data:this.updateGoodsData
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'修改商品成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//删除商品逻辑 发送请求 id 商品id
			deleteGoods(id){
				this.$http({
					url:'goods/' + id,
					method:'delete'
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'删除商品成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//是否展示修改商品会话 id 商品id
			editGoods(id){
				this.isShowEditGoods = true;
				this.$http({
					url:'goods/' + id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.updateGoodsData = data;
						this.updateGoodsData.item = data.spec_goods;
						this.updateGoodsData.attr = JSON.parse(data.goods_attr);
						this.update_type_name = data.type.type_name;
						this.update_shop_name = data.shop_name;
						this.update_brand_name = data.brand.name;
						var id_arr = data.category.pid_path.split('_');
						id_arr.push(data.category.id.toString());
						id_arr = id_arr.splice(1,id_arr.length-1);
						this.update_cate_name = id_arr;
			      		this.getSpecList(data.type_id);
			      		this.getAttrList(data.type_id);
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
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
	.el-table{
		margin-top:10px;
		/deep/ td.goods_name{
			.cell{
				display:block;
				display:-webkit-box;
				over-flow:hidden;
				height:69px;
				line-height:23px;
				-webkit-line-clamp:3;
				-webkit-box-orient:vertical;
				text-overflow:ellipsis;
			}
		}
		/deep/ td.goods_name:hover{
			.cell{
				display:block;
				over-flow:visible;
				height:100%;
				cursor: pointer;
			}
		}
	}
	.el-dialog{
		.el-button{
			margin-top:10px;
		}
	}
	.tips{
		color:red;
	}
	img{
		width:100px;
		height:100px;
	}
</style>