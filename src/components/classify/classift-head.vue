<template>
	<!-- 分类页面的头部模块 -->
	<div class="classify-head">
		<div class="head-box">
			<!-- 返回图标 -->
			<div 
			class="back-box" 
			@click="back"
			>
				<i 
				class="el-icon-back back" 
				@click="back" 
				color="#9e9e9e">
				</i>
			</div>
			<!-- 搜索框 -->
			<div class="search-box">
				<div class="box">
					<i 
					class="el-icon-search search-icon" 
					color="#9e9e9e">
					</i>
					<input 
					type="text" 
					class="search" 
					@focus="focus" 
					v-model="search_input" 
					@input="changeSearch" 
					placeholder="华为手机"
					>
				</div>
				<!-- 搜索按钮 -->
				<div class="search-text" v-show="isShow">
					<el-button 
					type="danger" 
					round 
					@click="search(search_input)"
					>
						搜索
					</el-button>
				</div>
			</div>
			<!-- 搜索历史，搜索频词 -->
			<div class="search-related" v-if="isShow&&isSearch">
				<div class="search-history">
					<p>
						搜索历史
						<i class="el-icon-delete" @click="deleteHistory"></i>
					</p>
					<span v-if="searchHistory.length == 0">			您未登录或暂无搜索历史
					</span>
					<div class="search-history-li flex" v-else>
						<span 
						v-for="(item,index) in searchHistory"
						@click="search(item.search_words)"
						class="scale-span" 
						>
							{{item.search_words}}
						</span>
					</div>
				</div>
				<div class="search-often">
					<p>搜索频词</p>
					<span v-if="searchOften.length == 0">
						暂无搜索频词,可能是服务器开小差了
					</span>
					<div class="search-often-li flex" v-else>
						<span 
						v-for="(item,index) in searchOften"
						@click="search(item.search_words)"
						class="scale-span" 
						>
							{{item.search_words}}
						</span>
					</div>
				</div>
			</div>
			<!-- 搜索提示 -->
			<div class="search-recommend" v-if="!isSearch">
				<span v-if="searchRecommend.length == 0">
					暂无搜索推荐
				</span>
				<div class="search-recommend-li" v-else>
					<p 
					v-for="(item,index) in searchRecommend"
					@click="search(item.search_words)"
					>
						<i class="el-icon-search search-icon" color="#9e9e9e"></i>
						{{item.search_words}}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			search_input:'',
			searchHistory:[],
			searchOften:[],
			searchRecommend:[],
			isSearch:true,
		}
	},
	created(){
		this.getSearchHistory();
		this.getSearchOften();
	},
	methods:{
		back(){
			this.noShow();
			this.isSearch = true;
			this.search_input = '';
		},
		focus(){
			// 获取焦点隐藏分类内容实现
			this.show();
			if (this.search_input.length == 0) {
				this.isSearch = true;
			}
			this.getSearchHistory();
			this.getSearchOften();
		},
		changeSearch(){
			this.isSearch = false;
			if (this.search_input.length == 0) {
				this.isSearch = true;
			}else {
				this.$homehttp({
					url:'search-recommend?search_input='+this.search_input
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.searchRecommend = data;
					}else{
						this.searchRecommend = [];
					}
				})
			}
		},
		search(search_input){
			//点击搜索 跳转搜索结果页面
			this.addSearchHistory(search_input);
			this.$router.push({name:'classify-result',query:{search_input:search_input}});
		},
		getSearchHistory(){
			//获取搜索历史
			var userinfo = localStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo)
			var user_id = 0;
			if (userinfo != null && userinfo != '' && userinfo != undefined) {
				user_id = userinfo.user_id;
			}
			this.$homehttp({
				url:'search-history/'+user_id
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.searchHistory = data;
				}else{
					this.searchHistory = [];
				}
			})
		},
		getSearchOften(){
			//获取搜索频词
			this.$homehttp({
				url:'search-often'
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.searchOften = data;
				}else{
					this.searchOften = [];
				}
			})
		},
		deleteHistory(){
			//删除用户的搜索历史
			this.$confirm('将永久删除搜索历史, 是否继续?', '提示', {
          		confirmButtonText: '确定',
          		cancelButtonText: '取消',
          		type: 'warning'
        	}).then(() => {
        		var userinfo = localStorage.getItem('userinfo');
				userinfo = JSON.parse(userinfo);
				var user_id = 0;
				if (userinfo != null && userinfo != '' && userinfo != undefined) {
					user_id = userinfo.user_id;
				}
        		this.$homehttp({
					url:'delete-search-history/'+user_id,
					method:'delete'
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'删除搜索历史成功',type:'success'});
						this.getSearchHistory();
					}else{
						this.$message({message:'服务器连接失败或您未登录',type:'warning'});
					}
				})
        	}).catch(() => {
          		this.$message({
            		type: 'info',
            		message: '已取消删除'
          		});          
        	});
			
		},
		addSearchHistory(search_words){
			//添加用户的搜索历史
			var userinfo = localStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo);
			var user_id = 0;
			if (userinfo != null && userinfo != '' && userinfo != undefined) {
				user_id = userinfo.user_id;
			}
			if (search_words != null && search_words != '' && search_words != undefined) {
				var search = {user_id:user_id,search_words:search_words};
				this.$homehttp({
					url:'search-save/',
					method:'post',
					data:search
				}).then(result=>{
					
				})
			}
		},
	},
	props:["show","isShow","noShow"]
}	
</script>

<style lang="less">
	.el-message-box{
    	width:80%;
	    max-width:420px;
  	}
</style>
<style lang="less" scoped>
	@import url("../less/common.less");
	.classify-head{
		position:fixed;
		top:0;
		z-index:100;
		width:100%;
		max-width:800px;
		height:50px;
		border-bottom:1px solid #e5e5e5;
		background-color:#fff;
		.head-box{
			position:relative;
			width:100%;
			.back-box{
				position:absolute;
				top:(@navHeight - @iconSize)/2+6px;
				left:@commonMargin;
				width:10%;
				.back{
					font-size:@iconSize;
					cursor: pointer;
				}
			}
			.search-box{
				position:absolute;
				top:(@navHeight - @iconSize)/2;
				left:@commonMargin+@iconSize*2;
				width:60%;
				.box{
					position:relative;
				}
				.search-icon{
					position:absolute;
					top:(@navHeight - @iconSize)/2-3px;
					left:@commonMargin;
				}
				.search{
					position:absolute;
					top:0;
					left:0;
					z-index:-1;
            		width: 100%;
           			height: @searchHeight;
            		padding: 0 10px;
            		padding-left:30px;
            		border: none;
            		background-color: #f2f2f2;
            		line-height: 24px;
            		outline: none;
            		box-shadow: inset 0 0 0px #999;
            		border-radius:15px;
				}
				.search-text{
					position:absolute;
					right:-35px;
					.el-button{
						height: @searchHeight;
						padding-top:7px;
					}
				}
			}
			.search-related{
				position:absolute;
				top:70px;
				width:100%;
				p{
					display:flex;
					flex-direction:row;
					justify-content:space-between;
					align-items:center;
					width:100%;
					margin:0 0 20px 0;
					font-weight:bold;
					color:black;
				}
				.scale-span{
					margin:0 10px 0 10px;
					padding:10px;
					background-color:#eee;
					font-size:14px;
					border-radius:15px;
					cursor: pointer;
				}
				.flex{
					display:flex;
					flex-direction:row;
					flex-wrap:wrap;
					justify-content:flex-start;
					span{
						margin-bottom:5px;
					}
				}
				.search-history{
					i{
						cursor: pointer;
					}
				}
				.search-often{
					margin-top:50px;
				}
			}
			.search-recommend{
				position:absolute;
				top:60px;
				width:100%;
				p{
					margin:0;
					padding:10px 0 10px 0;
					border-bottom:1px solid #f0f2f5;
					cursor: pointer;
					i{
						margin:0 10px 0 30px;
					}
				}
			}
		}
	}
</style>