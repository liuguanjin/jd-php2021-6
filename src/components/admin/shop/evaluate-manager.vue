<template>
	<div class="evaluate-manager">
		<!-- 后台店铺的评论管理界面 -->
		<!-- 头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>我的店铺</el-breadcrumb-item>
			<el-breadcrumb-item>评论管理</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索评论"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getEvaluateList(keyword)">搜索</el-button>
		</div>
		<!-- 评论表格 -->
		<el-table
	    :data="evaluateData"
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
	    	prop="goods_name"
	    	label="商品名称"
	    	align="center"
	    	class-name="goods_name"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="nickname"
	    	label="用户昵称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="content"
	    	label="评论内容"
	    	align="center"
	    	>
		    </el-table-column>
	    	<el-table-column
	    	prop="shop_evaluate_content"
	    	label="商家回复"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	prop="is_choice"
	    	label="是否精选(2个显示商品页)"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
		    		<select @change="selectChange(scope.$index)">
		    			<option 
		    			:selected="scope.row[scope.column.property]?'selected':''" 
		    			:value="1"
		    			>
		    				是
		    			</option>
		    			<option
		    			:selected="!scope.row[scope.column.property]?'selected':''" 
		    			:value="0"
		    			>
		    				否
		    			</option>
		    		</select>
		      	</template>
    		</el-table-column>
	    	<el-table-column
	    	label="修改商家回复"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="editShopEvaluate(scope.row.id)"></i>
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
	  	<!-- 修改商家回复会话 -->
	  	<el-dialog 
	  	title="修改商家回复" 
	  	:visible.sync="isShowEditShop"
	  	destroy-on-close
	  	>
	  		<el-form>
			    <el-form-item 
			    label="商家回复内容" 
			    >
			      	<el-input 
			      	v-model="shop_evaluate_content" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
		    </el-form>
		    <div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowEditShop = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="updateShopEvaluate"
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
				keyword:'',
				evaluateData:[],
				currentPage:1,
				total:1,
				perPage:10,
				isShowEditShop:false,
				shop_evaluate_content:'',
				editShopEvaluateId:0,
			}
		},
		methods:{
			getEvaluateList(keyword=""){
				var admininfo = localStorage.getItem('admininfo');
      			if (admininfo != '' && admininfo != undefined && admininfo != null) {
	       			admininfo = JSON.parse(admininfo)
	        		var admin_id = admininfo.admin_id;
					this.$http({
						url:'evaluate?admin_id=' + admin_id +'&keyword=' + keyword
					}).then(result=>{
						const {code,msg,data} = result.data;
						if (code == 200) {
							this.total = data.total;
							this.perPage = data.per_page;
							let evaluate = data.data;
							for(let i = 0;i < evaluate.length;i ++ ){
								evaluate[i].content = evaluate[i].content.replace(new RegExp('<br />','gm'),'\n');
								evaluate[i].content = evaluate[i].content.replace(new RegExp('&nbsp','gm'),' ');
							}
							this.evaluateData = evaluate;
						}else{
							this.$message({message:msg,type:'warning'});
						}
					})
	        	}else{
	        		this.$message({message:'用户信息错误',type:'warning'})
	        	}
			},
			//改变分页页数 使当前页为点击页 重新渲染界面
			currentChange(c){
				this.currentPage = c;
				this.getEvaluateList();
			},
			editShopEvaluate(id){
				this.isShowEditShop = true;
				this.editShopEvaluateId = id;
				this.$http({
					url:'get-shop-evaluate/'+id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if(code == 200){
						this.shop_evaluate_content = data;
					}else{
						this.$message({message:msg,type:'wraning'});
					}
				})
			},
			updateShopEvaluate(){
				this.$http({
					url:'update-shop-evaluate/'+this.editShopEvaluateId,
					method:'put',
					data:{shop_evaluate_content:this.shop_evaluate_content}
				}).then(result=>{
					const {code,msg,data} = result.data
					if(code == 200){
						this.$message({message:'修改成功',type:'success'});
						setTimeout(()=>{
							this.isShowEditShop = false;
							this.getEvaluateList();
						},1000)
					}else{
						this.$message({message:msg,type:'warning'})
					}
				})
			},
			selectChange(index){
				var id = this.evaluateData[index].id;
				this.$http({
					url:'evaluate-choice/'+id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'更改成功',type:'success'});
					}else{
						this.$message({message:'更改失败',type:'warning'});
					}
				})
			},
		},
		created(){
			this.getEvaluateList();
		},
	}
</script>

<style lang="less" scoped>
	.evaluate-manager{
		img{
			width:50px;
			height:50px;
		}
		.search{
			display:flex;
			flex-direction:row;
			justify-content:center;
			align-items:center;
			margin:10px 0;
			.el-input{
				flex:2;
				margin-right:10px;
			}
			.el-button{
				flex:1;
			}
		}
		.el-table{
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
		.el-icon-edit{
			cursor: pointer;
		}
	}
</style>