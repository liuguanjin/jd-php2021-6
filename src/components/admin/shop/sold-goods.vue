<template>
	<div class="sold-goods">
		<!-- 后台已卖出的宝贝界面 -->
		<!-- 已售出商品界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>我的店铺</el-breadcrumb-item>
			<el-breadcrumb-item>已卖出的宝贝</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索宝贝"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getSoldGoods(keyword)">搜索</el-button>
		</div>
		<!-- 全部已售商品列表表格 -->
		<el-table
	    :data="soldGoodsList"
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
	    	label="商品图片"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
		    		<img :src="'http://www.liuguanjin.top:8101'+scope.row.goods_logo" alt="正在加载">
		      	</template>
		    </el-table-column>
		    <el-table-column
	    	prop="spec_price"
	    	label="规格价格"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="spec_value_names"
	    	label="规格名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="number"
	    	label="售出数量"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="is_remind"
	    	label="用户是否提醒发货"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
		    		<span class="common" v-if="scope.row.is_remind === 0">暂未催单</span>
		    		<span class="remind" v-else-if="scope.row.is_remind === 1">用户已催单!</span>
	    		</template>
		    </el-table-column>
		    <el-table-column
		    prop="status"
		    label="状态"
		    align="center"
		    >
		    	<template slot-scope="scope">
		    		<span v-if="scope.row.status === 1">未发货</span>
		    		<span v-else-if="scope.row.status === 2">已发货</span>
		    		<span v-else-if="scope.row.status === 3">待评价</span>
		    		<span v-else-if="scope.row.status === 5">已取消</span>
		    		<span v-else-if="scope.row.status === 6">已退货</span>
		    		<span v-else-if="scope.row.status === 7">已退款</span>
		    		<span v-else-if="scope.row.status === 8">已换货</span>
		    		<span v-else>已完成</span>
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
				keyword:"",
				soldGoodsList:[],
				total:0,
				perPage:10,
				currentPage:1,
			}
		},
		methods:{
			getSoldGoods(keyword=""){
				var admininfo = localStorage.getItem('admininfo');
				var admin_id = JSON.parse(admininfo).admin_id;
				this.$http({
					url:'soldgoods?admin_id='+admin_id+'&keyword='+keyword+'&page='+this.currentPage
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.soldGoodsList = data.data;
						this.tatal = data.tatal;
						this.perPage = data.per_page;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//改变分页页数 使当前页为点击页 重新渲染界面
			currentChange(c){
				this.currentPage = c;
				this.getSoldGoods();
			},
		},
		created(){
			this.getSoldGoods();
		},
	}
</script>

<style lang="less" scoped>
	.search{
		display:flex;
		flex-direction:row;
		margin-top:10px;
	}
	.el-dialog{
		.el-button{
			margin-top:10px;
		}
	}
	.el-table{
		margin-top:10px;
		img{
			width:60px;
			height:60px;
		}
		.remind{
			color:red;
		}
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
</style>