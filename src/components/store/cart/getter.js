export default{
	//统计购物车购买总数
	allNum(state){
		var cartArr =state.cartArr;
		var allNum = 0;
		for (var i=0;i<cartArr.length;i++) {
			allNum += cartArr[i].number;
		}
		return allNum;
	}
}