function talis_prism_metadef(){
	juice.findMeta("isbns",".item #details .table .ISBN",juice.stringToAlphnumAray);
	juice.findMeta("isbn",".item #details .table .ISBN");
	juice.findMeta("author",".item .summary .author .author");
	juice.findMeta("title",".item .summary .title");
	
	juice.findMeta("shelfmark","#availability .options table td:nth-child(2)");		
	juice.setMeta("location", shelf_location_mapper);
	juice.findMeta("workids",".item .summary > .title > a","href",talis_prism_items_workids);
	juice.setMeta("workid",talis_prism_item_workid);
}


//maps shelves and locations to match
function shelf_location_mapper(id){
	var ret=[];
	jQuery(juice.getMeta('shelfmark')).each(function(i, el){
		ret[ret.length]=jQuery(el).parents('li').find('h3 span');
	});
	return ret;
}

function talis_prism_item_workid(){
	var locationBits = document.location.pathname.split('/');
	if(locationBits[locationBits.length - 2] == "items"){
		return locationBits[locationBits.length - 1];
	}
	return null;
}

function talis_prism_items_workids(val,id){
	if(val){
		var path = val.split('/');
		if(path && path[0] == "items"){
			var id = path[1].split("?");
			return id[0];
		}
		
	}
}

//call for de-deduping an array of items

function talis_prism_dedup(a) {
	var i, r=[], o={};
	if(jQuery.isArray(a)){
		for (i=0;i<a.length;i++) {
			if (!o[a[i]]){
			o[a[i]]={};
			r.push(a[i]);
			}
		}
	}
	return r;
}
