<template>
	<div class="indexcontent">
		<!-- 后台首页 -->
		<div class="visitor-number" ref="echart" style="width: 100%;height: 376px;"></div>
	</div>
</template>

<script>
export default {
	mounted(){
		this.getEchartData();
	},
	data(){
		return {
			
		}
	},
	methods:{
		getEchartData(){
			const echart = this.$refs.echart;
			if (echart) {
				const myChart = this.$echarts.init(echart);
				const option = {
					title:{text:'网站访问人数'},
					tooltip:{
						
					},
					legend:{
						data:['人数']
					},
					xAxis:{
						data:['前五天','前四天','前三天','前两天','前一天','今天']
					},
					yAxis:{},
					series:[{
						name:'人数',
						type:'bar',
						data:[5,20,10,15,20,15]
					}]
				}
				myChart.setOption(option);
				window.addEventListener("resize",function(){
					myChart.resize();
				})
			}
			this.$on('hook:destroyed',()=>{
				window.removeEventListener("resize",function(){
					myChart.resize();
				})
			})
		}
	}
}
</script>

<style lang="less" scoped>
	.indexcontent{
		
	}
</style>