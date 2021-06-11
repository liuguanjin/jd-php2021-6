<template>
	<div class="order-success">
		<div class="header">
			<i class="el-icon-back back" @click="back"></i>
			<ul>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
		<div class="recommend-goods">
			<div class="goods">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		methods:{
			back(){
				this.$router.push('/cart');
			},
		}
	}
</script>

<style lang="less" scoped>
	
</style>