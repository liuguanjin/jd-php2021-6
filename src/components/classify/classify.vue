<template>
  <div class="classify">
  	<classify-head :show="isShowContent" :isShow="isShow" :noShow="noShowContent"></classify-head>
  	<classify-content :isShow="isShow"></classify-content>
  </div>
</template>

<script>
import classifyHead from "./classift-head.vue";
import classifyContent from "./classify-main.vue";
export default {
	data(){
		return{
			isShow:false
		}
	},
	methods:{
		isShowContent(){
			this.isShow = true;
		},
		noShowContent(){
			this.isShow = false;
		}
	},
 	components:{
 		"classify-head":classifyHead,
 		"classify-content":classifyContent
 	}
}
</script>

<style>

</style>
