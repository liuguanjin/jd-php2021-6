<template>
	<div class="evaluate-manager">
		
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		methods:{
			getMyEvaluate(){
				this.$http({
					url:'evaluate'
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {

					}
				})
			},
		},
		created(){
			this.getMyEvaluate();
		},
	}
</script>

<style lang="less" scoped>
	
</style>