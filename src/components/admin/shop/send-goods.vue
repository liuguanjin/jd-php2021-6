<template>
	<div class="send-goods">
		<!-- 全部商品列表表格 -->
		<el-table
	    :data="nosendGoodsList"
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
	    	prop="spec_price"
	    	label="规格商品价格"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="spec_value_names"
	    	label="规格值"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="is_remind"
	    	label="用户是否提醒"
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
		    		<span v-else-if="scope.row.status === 8">已换货</span>
		    		<span v-else>已退货</span>
		      	</template>
		    </el-table-column>
	    	<el-table-column
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<el-button type="danger" round @click="sendGoods(scope.row.id)">发货</el-button>
	    		</template>
		    </el-table-column>
	  	</el-table>
	  	<el-dialog 
	  	title="发货" 
	  	:visible.sync="isShowSendGoods"
	  	destroy-on-close
	  	>
		  	<el-form :model="addGoodsData">
			    <el-form-item 
			    label="物流编号" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.shipping_code" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="物流名称" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.shipping_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="物流单号" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.shipping_sn" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
		    </el-form> 
		    <div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowSendGoods = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="updateMyGoods"
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
				nosendGoodsList:[],
				isShowSendGoods:false,
				addGoodsData:{
					shipping_code:"",
					shipping_name:"",
					shipping_sn:"",
				},
				id:0,
			}
		},
		methods:{
			sendGoods(id){
				this.id = 0;
				this.addGoodsData.shipping_code = "";
				this.addGoodsData.shipping_name = "";
				this.addGoodsData.shipping_sn = "";
				this.isShowSendGoods = true;
				this.id = id;
			},
			updateMyGoods(){
				this.$http({
					url:'sendgoods/'+this.id,
					method:'post',
					data:this.addGoodsData
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'发货成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
				
			},
			getNosendGoodsList(){
				var admininfo = JSON.parse(localStorage.getItem('admininfo'));
				if (admininfo != null && admininfo != '' && admininfo != undefined) {
					var admin_id = admininfo.admin_id;
					this.$http({
						url:'nosendgoods?admin_id='+admin_id
					}).then(result=>{
						const {code,msg,data} = result.data;
						if (code == 200) {
							this.nosendGoodsList = data;
						}else{
							this.$message({message:msg,type:'warning'});
						}
					})
				}else{
					this.$message({message:'您未登录',type:'warning'});
				}
			},
		},
		created(){
			this.getNosendGoodsList();
		},
	}
</script>

<style lang="less" scoped>
	img{
		width:80px;
		height:80px;
	}
	.cell{
		span{
			cursor:pointer;
		}
	}
	.remind{
		color:red;
	}
</style>