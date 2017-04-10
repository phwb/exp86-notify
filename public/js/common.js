$(document).ready(function(){

	$(".js-select").select2({
		minimumResultsForSearch: Infinity
	});

	$(".top_filter_block .js-select").select2({
		minimumResultsForSearch: Infinity,
		dropdownCssClass : "left-12"
	});
});