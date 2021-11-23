<template>
	<div class="evaluate-manager-admin">
		<!-- 后台管理员的评价管理界面 -->
		<!-- 头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
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
	    	prop="shop_name"
	    	label="所属店铺"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	prop="is_show"
	    	label="是否展示评论"
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
	  	</el-table>
	  	<!-- 分页 -->
	  	<el-pagination
	    layout="prev, pager, next"
	    :total="total"
	    :page-size.sync="perPage"
	    @current-change="currentChange"
	    >
	  	</el-pagination>
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
			}
		},
		methods:{
			getEvaluateList(keyword=""){
				var admininfo = localStorage.getItem('admininfo');
      			if (admininfo != '' && admininfo != undefined && admininfo != null) {
	       			admininfo = JSON.parse(admininfo)
	        		var admin_id = admininfo.admin_id;
					this.$http({
						url:'evaluate-admin?admin_id=' + admin_id +'&keyword=' + keyword
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
							this.$message({message:msg,type:'warning'})
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
			selectChange(index){
				var id = this.evaluateData[index].id;
				this.$http({
					url:'evaluate-show/'+id
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
	.evaluate-manager-admin{
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
	}
</style>