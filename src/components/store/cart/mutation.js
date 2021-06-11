export default{
	//将商品信息添加到state.cartArr中
	add(state,obj){
		state.cartArr.push(obj);
	},
	//商品的数量
	shopNumTotal(state){
		var cartArr = state.cartArr;
		var num = 0;
		num = cartArr.length;
		state.totalNum = num;
	},
	//修改商店的选中状态
	changeShopSelect(state,obj){
		state.cartDetail[obj].shop_is_selected = ! state.cartDetail[obj].shop_is_selected;
		state.cartArr[obj].shop_is_selected = state.cartDetail[obj].shop_is_selected;
		state.cartArr[obj].goods_is_selected = state.cartDetail[obj].shop_is_selected;
		state.cartDetail[obj].goods_is_selected = state.cartDetail[obj].shop_is_selected;
		state.cartDetail[obj].goods.goods_is_selected = state.cartDetail[obj].shop_is_selected;
	},
	//选中商家对总价的计算
	shopChangeCount(state,obj){
		var allChoose = true;
		var cartDetail = state.cartDetail;
		var total = state.total;
		if ( ! cartDetail[obj].shop_is_selected) {
			allChoose = false;
			total -= cartDetail[obj].number * cartDetail[obj].spec_goods.price;
		}else{
			total += cartDetail[obj].number * cartDetail[obj].spec_goods.price;
		}
		for(var i = 0;i < cartDetail.length;i ++){
			if (!cartDetail[i].shop_is_selected) {
				allChoose = false;
			}
		}
		state.total = total;
		return allChoose;
	},
	//修改商品的选中状态
	goodsSelect(state,obj){
		state.cartDetail[obj].goods.goods_is_selected = ! state.cartDetail[obj].goods.goods_is_selected;
		state.cartArr[obj].goods_is_selected = state.cartDetail[obj].goods.goods_is_selected;
		state.cartArr[obj].shop_is_selected = state.cartDetail[obj].goods.goods_is_selected;
		state.cartDetail[obj].shop_is_selected =  state.cartDetail[obj].goods.goods_is_selected;
	},
	//选中商品对总价的计算
	goodsChangeCount(state,obj){
		var total = state.total;
		var allChoose = true;
		var cartDetail = state.cartDetail;
		if ( ! cartDetail[obj].goods.goods_is_selected) {
			state.cartDetail[obj].shop_is_selected = false;
			allChoose = false;
			total -= cartDetail[obj].number * cartDetail[obj].spec_goods.price;
		}else{
			total += cartDetail[obj].number * cartDetail[obj].spec_goods.price;
		}
		state.total = total;
		return allChoose;
	},
	//总价的计算
	calculate(state){
		var total = 0;
		var cartDetail = state.cartDetail;
		for(var i = 0;i < cartDetail.length;i ++ ){
			if (cartDetail[i].shop_is_selected) {
				total += cartDetail[i].number * cartDetail[i].spec_goods.price;
			}
		}
		state.total = total;
	},
	allSelect(state,obj){
		var cartDetail = state.cartDetail;
		for(var i = 0;i < cartDetail.length;i ++){
			state.cartDetail[i].shop_is_selected = obj;
			state.cartDetail[i].goods.goods_is_selected = obj;
		}
	},
	//商品-1的计算
	delNum(state,obj){
		var num = state.cartDetail[obj].number;
		if(num > 1){
			num -= 1;
			state.total -= state.cartDetail[obj].spec_goods.price;
		}else{
			num = 1;
		}
		state.cartDetail[obj].number = num;
		state.cartArr[obj].number = num;
	},
	//商品+1的计算
	addNum(state,obj){
		state.total += state.cartDetail[obj].spec_goods.price;
		state.cartDetail[obj].number += 1;
		state.cartArr[obj].number += 1;
	},
	//删除商品的操作
	moveShop(state){
		var cartArr = state.cartArr;
		for(var i = 0;i < cartArr.length;i ++ ){
			if (cartArr[i].selOrCom) {
				cartArr.splice(i,1);
			}else{
				var arr = cartArr[i].detail;
				for(var j = 0;j < arr.length;j ++ ){
					if (arr[j].smlSelOrCom) {
						cartArr[i].detail.splice(j,1);
					}
				}
			}
		}
		state.cartArr = cartArr;
		state.total = 0;
	},
	//如果localStorage中存在购物车信息，则替换state中的cartArr
	changeCartArr(state,obj){
		state.cartArr = obj;
	},
	replaceCartDetail(state,obj){
		state.cartDetail = obj;
	}
}