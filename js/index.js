var host = "172.16.134.44";
var port = "8080";

$(document).ready(function() {
	var apps = project_list().projects;
	$("#app_ul").text("");
	for(var i=0;i<apps.length;i++) {
		//alert(apps[i]);
		if(i == 0) {
			$("#app_ul").append("<li class='active'><a href='#'>"+apps[i].folderName+"<span class='sr-only'></span></a></li>");
		}else {
			$("#app_ul").append("<li><a href='#'>"+apps[i].folderName+"</a></li>");
		}
	}
});

function add_app(type) {
	$("#appName").val("");
	$("#app_type").val("");
	$("#myModalLabel").text("Add "+type+" Project");
	$("#add_modal").modal('show');
	$("#app_type").val(type);
}

function save() {
	var appName = $("#appName").val();
	var appType = $("#app_type").val();
	$.ajax({
		type: 'POST',
		url: "http://"+host+":"+port+"/api/createProject",
		contentType: "application/json",
		data: JSON.stringify({
			folderName: appName,
			type: appType
		}),
		success: function(result) {
			alert("添加成功");
		},
		error: function(result) {
			alert("添加失败");
		},
		dataType: "json"
	});
}

function project_list(type) {
	var _url = "http://"+host+":"+port+"/api/listProjectAll";
	if(type) {
		_url = "http://"+host+":"+port+"/api/listProject/"+type;
	}
	//alert(_url);
	var result = "";
	$.ajax({
		type: 'GET',
		async:false,
		url: _url,
		success: function(msg) {
			console.log(msg);
			result = msg;
		},
		error: function(msg) {
			console.log(msg);
		},
		dataType: "json"
	});
	return result;
}
