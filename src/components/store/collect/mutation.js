export default{
	addCollectGoods(state,id){
		state.collectArr.push(id);
		state.collectNum += 1;
	},
	changeCollectArr(state,obj){
		state.collectArr = obj;
	},
	changeCollectNum(state,obj){
		state.collectNum = obj;
	}
}