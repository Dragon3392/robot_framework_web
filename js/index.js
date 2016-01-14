var host = "127.0.0.1";
var port = "8081";
var base_url = "http://127.0.0.1:8081/";

$(document).ready(function() {
	load_app();
	//load_cases();
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
	var appGitAddress = $("#gitAddress").val();
	$.ajax({
		type: 'POST',
		url: base_url+"api/createProject",
		contentType: "application/json",
		data: JSON.stringify({
			projectName: appName,
			type: appType,
			gitAddress:appGitAddress
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

function delete_app() {
	
}

function delete_app_by_id(project_id) {
	var _url = base_url+"api/deleteProject";
	$.ajax({
		type: 'POST',
		async:false,
		contentType: "application/json",
		url: _url,
		data: JSON.stringify({
			projectId:project_id
		}),
		success: function(msg) {
			if(msg.status) {
				alert("删除成功!");
				window.location.reload();
			}else {
				alert(msg.msg);
			}
		},
		error: function(msg) {
			alert(msg.reason);
		},
		dataType: "json"
	});
}

function project_list(_page) {
	var _url = base_url+"api/listProjects";
	$.ajax({
		type: 'POST',
		async:true,
		contentType: "application/json",
		url: _url,
		data: JSON.stringify({
			page:_page
		}),
		success: function(msg) {
			view_apps(msg.projects);
		},
		error: function(msg) {
			alert("应用加载出错...");
		},
		dataType: "json"
	});
}

function view_apps(apps) {
	$("#app_ul").text("");
	if(apps) {
		for(var i=0;i<apps.length;i++) {
			$("#app_ul").append("<li id='"+apps[i].id+"_app_li'><a href='javascript:load_cases("+apps[i].id+",\""+apps[i].projectName+"\")'>"+apps[i].projectName+"</a></li>");
		}
	}
}

function load_app() {
	project_list(1);
}

function load_cases(project_id,project_name) {
	$("#app_id").val(project_id);
	remove_apps_style();
	$("#"+project_id+"_app_li").attr("class","active");
	$("#project_name_view").text(project_name);
	$("#iframe_div").text("");
	$("#iframe_div").load("cases.html");
	remove_tabs_style();
	$("#cases_li").attr("class","active");
	$("#iframe_div").css("display","block");
	$("#right_frame_div").css("display","block");
}

function load_reports(project_id,project_name) {
	$("#project_name_view").text(project_name);
	$("#iframe_div").text("");
	$("#iframe_div").load("reports.html");
	remove_tabs_style();
	$("#reports_li").attr("class","active");
	$("#iframe_div").css("display","block");
}

function remove_tabs_style() {
	$(".nav-tabs").find("li").each(function() {
		$(this).removeClass();
	});
}

function remove_apps_style() {
	$("#app_ul").find("li").each(function() {
		$(this).removeClass();
	});
}

function handle_resp(msg) {
	
}

