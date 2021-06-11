export default{
	addToFootprint({commit},params){
		commit("footprint",params);
	},
	replaceFootprintArr({commit},params){
		commit("replacefootprintarr",params);
	},
	replaceFootprinttNum({commit},params){
		commit("replaceFootprinttNum",params);
	},
}