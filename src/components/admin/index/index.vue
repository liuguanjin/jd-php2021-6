<template>
	<div class="indexcontent">
		<canvas id="visit_table" width="250" height="250">
			你的浏览器不支持canvas,请升级你的浏览器
		</canvas>
	</div>
</template>

<script>
export default {
	mounted(){
		this.canvasInit();
	},
	data(){
		return {
			arr:[{x:'1',y:10},{x:'2',y:100},{x:'3',y:200},{x:'4',y:300},{x:'5',y:500}],
			text_y:'访问人数',
			text_x:'日期'
		}
	},
	methods:{
		canvasInit(){
			var canavas = document.getElementById("visit_table");
			if(canavas.getContext){
				var ctx = canavas.getContext('2d');
				var w = canavas.width;
				var h = canavas.height;
				var lineWidth = 3;
				var margin = 20;
				//绘制X轴
				var color = "black";
				this.drowLine(ctx,0+margin,h-margin,w,h-margin,color,lineWidth);
				//绘制y轴
				this.drowLine(ctx,0+margin,h-margin,0+margin,0,color,lineWidth);
				//绘制箭头
				this.drowLine(ctx,w,h-margin,w-margin/2,h-margin*3/2,color,3);
				this.drowLine(ctx,w,h-margin,w-margin/2,h-margin/2,color,3);
				this.drowLine(ctx,0+margin,0,0+margin/2,0+margin/2,color,3);
				this.drowLine(ctx,0+margin,0,0+margin*3/2,0+margin/2,color,3);
				//绘制x轴末端显示文本
				var fontSize = '12';
				ctx.fillText(this.text_x,w-margin,h-2);
				//绘制y轴末端显示文本(竖直排列)
				for(var i = 0;i < this.text_y.length;i ++ ){
					ctx.font=fontSize+'px';
					ctx.fillText(this.text_y[i],0,0+margin+fontSize*i);
				}
				var total = 0;
				//计算总访问人数
				for(var i = 0;i < this.arr.length;i ++ ){
					total += this.arr[i].y;
				}
				for(var i = 0;i < this.arr.length;i ++ ){
					//绘制x轴上的文本
					ctx.fillStyle="black";
					ctx.fillText(this.arr[i].x,0+margin+(i*2+1)*margin,h);
					//绘制y轴上的文本
					ctx.fillStyle="black";
					ctx.fillText(this.arr[i].y,0,h-margin-h * this.arr[i].y/total);
					//绘制柱状图
					ctx.fillStyle="#6495ED";
					ctx.fillRect(0+margin+(i*2+1)*margin-5,h-margin-lineWidth/2-h * this.arr[i].y/total,20,h * this.arr[i].y/total);
				}
			}else{
				return;
			}
		},
		drowLine(ctx,startX,startY,endX,endY,color,lineWidth){
			ctx.beginPath();
			ctx.moveTo(startX,startY);
			ctx.lineTo(endX,endY);
			ctx.strokeStyle = color;
			ctx.lineWidth = lineWidth;
			ctx.stroke();
		}
	}
}
</script>

<style lang="less" scoped>
	.indexcontent{
		display:flex;
		flex-direction:row;
		justify-content:center;
	}
</style>