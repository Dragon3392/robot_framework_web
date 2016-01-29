$(function() {
	$('#collapseOne').on('show.bs.collapse', function () {
		alert("展开");
         $("#collapseOneIcon").removeClass("glyphicon-minus").addClass("glyphicon-plus");
	});
	$('#collapseOne').on('hide.bs.collapse', function () {
         alert("关闭");
	});
});
