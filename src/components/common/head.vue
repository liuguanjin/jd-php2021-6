<template>
  	<!-- 复用头部模块 -->
	<div class="header">
  		<slot></slot>
  	</div>
</template>

<script>
export default {
 
}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	.header{
		position:relative;
		max-width:800px;
		margin:0 auto;
		h1{
			height:@navHeight;
			margin:0;
			background-color:@mallColor;
			.titleStyle(#fff,@titleSize,center);
			line-height:@navHeight;
		}
		.back{
			position:absolute;
			left:@commonMargin;
			top:(@navHeight - @iconSize)/2;
			font-size:@iconSize;
			cursor: pointer;
		}
	}
</style>