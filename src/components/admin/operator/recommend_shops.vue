<template>
	<div class="recommend-shops">
		<!-- 后台店铺推荐界面 -->
		<!-- 店铺推荐界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/operator' }">运营</el-breadcrumb-item>
			<el-breadcrumb-item>推荐管理</el-breadcrumb-item>
			<el-breadcrumb-item>店铺推荐</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索店铺"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getShopList(keyword)">搜索</el-button>
		</div>
		<!-- 销售订单统计表格 -->
		<el-table
	    :data="shopRecommendData"
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
	    	prop="shop_name"
	    	label="店铺名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="shop_logo"
	    	label="店铺图片"
	    	align="center"
	    	>
		    	<template slot-scope="scope">
		    		<img 
		    		:src="defaultImage" 
		 			v-real-img="'http://www.liuguanjin.top:8101'+scope.row.shop_logo"
		    		>
		      	</template>
	    	</el-table-column>
	    	<el-table-column
	    	prop="is_recommend"
	    	label="是否推荐"
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
				shopRecommendData:[],
				currentPage:1,
				total:1,
				perPage:10,
				defaultImage:this.defaultImage,
			}
		},
		methods:{
			getShopList(keyword=""){
				this.$http({
					url:'store?keyword='+keyword+'&page='+this.currentPage
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.shopRecommendData = data.data;
						this.total = data.total;
						this.perPage = data.per_page;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//改变分页页数 使当前页为点击页 重新渲染界面
			currentChange(c){
				this.currentPage = c;
				this.getShopList();
			},
			selectChange(index){
				var id = this.shopRecommendData[index].id;
				this.$http({
					url:'shop-recommend/'+id
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
			this.getShopList();
		},
	}
</script>

<style lang="less" scoped>
	.recommend-shops{
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
	}
</style>