export default{
	footprint(state,obj){
		var date = obj.date;
		var inFoorArr = false;
		var arr = state.foorprintArr;
		for(var i = 0;i < arr.length;i ++ ){
			if ((date - arr[i].date) <= 86400) {
				var inDetailArr = false;
				var detailArr = arr[i].detail;
				for(var j = 0;j < detailArr.length;j ++ ){
					if (detailArr[j].id == obj.detail[0].id) {
						inDetailArr = true;
					}
				}
				if (! inDetailArr) {
					arr[i].detail.unshift(obj.detail[0]);
					state.footprintNum += 1;
				}
				inFoorArr = true;
			}
		}
		if (! inFoorArr) {
			arr.unshift(obj);
			state.footprintNum += 1;
		}
		state.foorprintArr = arr;
	},
	replacefootprintarr(state,obj){
		state.foorprintArr = obj;
	},
	replaceFootprinttNum(state,obj){
		state.footprintNum = obj;
	},
}