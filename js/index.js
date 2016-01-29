var host = "127.0.0.1";
var port = "8081";
var base_url = "http://127.0.0.1:8080/";

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
			handle_resp_alert(result,"添加成功!")
		},
		error: function(result) {
			alert("系统繁忙,请稍后再试!");
		},
		dataType: "json"
	});
}

function delete_app() {
	var app_id = $("#app_id").val();
	//alert(app_id);
	if(confirm("are you sure ?")) {
		delete_app_by_id(app_id);
	}
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
			handle_resp_alert(result,"删除成功!");
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
			view_apps(msg.data.projects);
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
	remove_tabs_style();
	$("#cases_li").attr("class","active");
	$("#iframe_div").html(template("loading_template"));
	$("#iframe_div").css("display","block");
	$("#right_frame_div").css("display","block");
	load_cases_data(project_id);
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

function handle_resp_alert(msg,success_msg) {
	if(msg.status) {
		alert(success_msg);
		window.location.reload();
	}else {
		alert(msg.msg);
		window.location.reload();
	}
}

function load_cases_data(project_id) {
	var _url = base_url+"api/getCases";
	$.ajax({
		type: 'POST',
		async:true,
		contentType: "application/json",
		url: _url,
		timeout:10000,
		data: JSON.stringify({
			projectId:project_id
		}),
		success: function(msg) {
			render_case(msg);
		},
		error: function(msg) {
			render_case(null);
		},
		dataType: "json"
	});
}

function render_case(msg) {
	if(msg) {
		if(msg.status) {
			var html = template('case_template', msg);
			$("#iframe_div").html(html);
		}else {
			var s = "<div class='panel-body'><span style='font-size: 30px;color: lightgray;'>"+msg.msg+"</span></div>";
			$("#iframe_div").html(s);
		}
	}else {
		var s = "<div class='panel-body'><span style='font-size: 30px;color: lightgray;'>case load failed,please try again later...</span></div>";
		$("#iframe_div").html(s);
	}
}

//cases 全选
function check_all(chk,i) {
	var id_cases = i+"_case";
	var id_checkcount = i+"_checkcount_span";
	$("input[id^='"+id_cases+"']").prop('checked',chk.checked);//选中suite cases
	if(chk.checked) {
		//计数改变
		$("#"+id_checkcount).text($("input[id^='"+id_cases+"']").length);
	}else {
		$("#"+id_checkcount).text(0);
	}
}

function check_case(chk,i) {
	var id_checkcount = i+"_checkcount_span";
	var span_checkcount = $("#"+id_checkcount);
	if(chk.checked) {
		$("#"+i+"_suit_as_chk").prop('checked',true);
		span_checkcount.text(Number(span_checkcount.text())+1);
	}else {
		span_checkcount.text(Number(span_checkcount.text())-1);
	}
}

