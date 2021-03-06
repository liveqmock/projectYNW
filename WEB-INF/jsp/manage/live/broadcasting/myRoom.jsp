<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
	<link href="${path}/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<link href="${path}/plugins/multiselect/css/bootstrap-multiselect.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="${path }/plugins/datetimepicker/js/moment-with-locales.js"></script>
	<script src="${path }/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<link href="${path}/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
  <script>
  	var roomid = "${roomid}";
  	$(function(){
  		$('#contentTable').bootstrapTable({
            method: 'post',
            height:tableHeight,
            cache: false,
            url: path + '/broadcasting_periodical/list.htmlx',
            striped: true,
            pagination: true,
            pageSize: 50,
            pageList: [50,100,150,200,500],
            contentType: "application/x-www-form-urlencoded",
            //showRefresh: true,
            minimumCountColumns: 2,
            clickToSelect: true,
            queryParams:function(params){
            	params.rows = params.limit;
            	params.page = params.offset / params.limit +1;
            	var _queryBeginTime = $("#queryBeginTime").val();
            	var _queryEndTime = $("#queryEndTime").val();
            	var _todaysubject = $("#queryTodaysubject").val();
            	params.todaysubject = _todaysubject;
            	params.queryBeginTime = _queryBeginTime;
            	params.queryEndTime = _queryEndTime;
            	params.roomid = roomid;
            	return params;
            },
            sidePagination: "server", //服务端请求
            columns: [{
                checkbox: true
            },{
                field: 'periodicalid',
                title: 'periodicalid',
                visible : false
            }, {
                field: 'broadcastingTime',
                title: '直播时间'
            }, {
                field: 'todaysubject',
                title: '今日主题'
            }, {
                field: 'teacherName',
                title: '创建人'
            },{
                field: 'membercount',
                title: '参与人数'
            }, {
                field: '',
                title: '回答问题'
            }, {
                field: 'status',
                title: '状态',
                formatter:statusFormatter
            }, {
                field: 'periodicalid',
                title: '操作',
                formatter:opterationFormatter
            }]
        });
  		
  		$("#beginTime").datetimepicker({  
         	  locale:"zh-cn",
         	  format:"HH:mm"
         });
  		$("#endTime").datetimepicker({  
       	  locale:"zh-cn",
       	  format:"HH:mm"
       });
  		$("#queryBeginTime").datetimepicker({  
         	  locale:"zh-cn",
         	 format:"YYYY-MM-DD HH:mm"
         });
  		$("#queryEndTime").datetimepicker({  
       	  locale:"zh-cn",
       	  format:"YYYY-MM-DD HH:mm"
       });
  	});
  	
  	function statusFormatter(value,row){
  		if(value==0){
  			return "<font style='color:green;cursor:pointer;' title='正在直播'>正在直播</font>";
  		}else if(value==1){
  			return "<font style='color:red;cursor:pointer;' title='已关闭'>已关闭</font>";
  		}
  		return value;
  	}
  	function opterationFormatter(value,row){
  		var status = row.status;
  		var roomid = row.roomid;
  		if(status==0){
  			return "<a class='btn btn-danger btn-xs' href='"+path+"/html/live.htmlx?live&roomid="+value+"' target='_blank'><i class='fa fa-line-chart'></i> 进入直播</a>";
  			//return "<a class='btn btn-danger btn-xs' href='javascript:;' onclick='openBroadCasting("+value+",\"0\");'><i class='fa fa-line-chart'></i> 进入直播</a>";
  		}else if(status==1){
  			return "<a class='btn btn-info btn-xs' href='"+path+"/html/periodicalDetail.htmlx?periodicalid="+value+"' target='_blank'><i class='fa fa-history'></i> 查看历史</a>";
  			//return "<a class='btn btn-info btn-xs' href='javascript:;' onclick='openBroadCasting("+value+",\"1\");'><i class='fa fa-history'></i> 查看历史</a>";
  		} 
  		return value;
  	}
	 function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh', null);
     }

	 function openBroadcastingRoom(){
		 $("#openRoomForm")[0].reset();
		 $("#openRoomModal").find('.showErrInfoP').hide();
		 $("#openRoomModal").modal('show');
	 }
	 function saveBroadcastingRoom(){
		 var todaysubject = $("#todaysubject").val();
		 var announcement = $("#announcement").val();
		 var beginTime = $("#beginTime").val();
		 var endTime = $("#endTime").val();
		 if(!todaysubject){
			 $("#todaysubject").tooltip("show");
			 return ;
		 }
		 if(!announcement){
			 $("#announcement").tooltip("show");
			 return ;
		 }
		 if(!beginTime){
			 $("#beginTime").tooltip("show");
			 return ;
		 }
		 if(!endTime){
			 $("#endTime").tooltip("show");
			 return ;
		 }
		 
		 var _params = $('#openRoomForm').serialize();
		 $("#openRoomModal").modal('hide');
	   	  parent.showProcessWin();
	   	  
	   	  var _backSuccessMsg = '创建成功！';
	   	  var _backFaildMsg = '创建失败！';
	   	  var _postUrl = '/broadcasting/doPublisherPeriodical.htmlx';
	   	  $.post(path + _postUrl,_params,function(_backData){
	   	  		if("success" == _backData){
	   	  			parent.closeProcessWin();
	   	  			reflushDataTable();
	   	  			showMsg(_backSuccessMsg);
	   	  			openBroadCasting(null,"0");
	   	  		} else {
		   	  		   parent.closeProcessWin(function(){
		   	  			$('#openRoomModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
		   	  		    $('#openRoomModal').find('.showErrInfoP').show();
			   	  		$('#openRoomModal').modal('show');
	   	  			});
	   	  		}
	   	  });
	 }
	 
	 function openBroadCasting(_periodicalid,_type){
		 if("0"==_type){//正在直播
			 window.location.href="${path}/broadcasting/livedetail.htmlx";
		 }else if("1"==_type){//历史直播
			 window.location.href="${path}/broadcasting/historyDetail.htmlx?periodicalid="+_periodicalid;
		 }
	 }
	 //结束直播
	 function closeBroadcastingRoom(){
		 var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
		   if(rowDatas.length == 0 ){
			   showMsg('请选择要结束的期刊');
			   return;
		   }
		   if(rowDatas.length >= 2 ){
			   showMsg('请选择一条要结束的直播');
			   return;
		   }
		   var _periodicalid = rowDatas[0].periodicalid;
		   showConfirm('确认要结束此直播吗？',
			function(){
			   $.post(path + '/broadcasting/closePeriodicalById.htmlx',{roomid:roomid,periodicalid:_periodicalid},function(_backData){
				   if("success" == _backData){
		   	  			showMsg('关闭成功！');
					   reflushDataTable();
		   	  	   }else
		   	  			showErr('关闭失败！' + _backData);
			   });
		    });
	 }
	 
	 function clearquery(){
		 $("#queryForm")[0].reset();
		 reflushDataTable();
	 }
  </script> 	
  </head>
  
  <body>
	<div class="container-fluid maincontent">
       <div class="row">
       <div style="margin-top: 10px;">
	       	<form class="form-inline" id="queryForm">
	       		<div class="form-group form-group-padding" style="padding-left: 5px;">
			      	<label for="todaysubject">主题：</label>
				   	 <input type="text" class="form-control" id="queryTodaysubject" placeholder="输入主题进行搜索">
				 </div>
				<div class="form-group form-group-padding"
					style="padding-left: 5px;position: relative;">
					<label for="search_name">开始时间</label> <input type=text
						class="form-control" id="queryBeginTime" >
				</div>
				<div class="form-group form-group-padding"
					style="padding-left: 5px;position: relative;">
					<label for="search_name">结束时间</label> <input type="text"
						class="form-control" id="queryEndTime" >
				</div>
				<div class="form-group form-group-padding">
					<button type="button"  class="btn btn-info" onclick="reflushDataTable();">
			              <i class="fa fa-search fa-lg"></i> 查询
			         </button>
				</div>
				<div class="form-group form-group-padding">
					<button type="button"  class="btn btn-primary" onclick="clearquery();">
			              <i class="fa fa-search fa-lg"></i> 清空
			         </button>
				</div>
				
	     	</form>
     	</div>
       	<div id="custom-toolbar">
	         <a class="btn btn-warning" href="javascript:;" onclick="openBroadcastingRoom();">
	              <i class="fa fa-play-circle fa-lg"></i> 开启直播
	         </a>
	         <a class="btn btn-danger" href="javascript:;" onclick="closeBroadcastingRoom();">
	              <i class="fa fa-times fa-lg"></i> 结束直播
	         </a>
        </div> 
       </div>
   	   <div class="row">
		  <table id="contentTable" data-toolbar="#custom-toolbar"></table>
       </div>
       
   </div>  
    
      <!-- 以下这个DIV存放所有的弹出窗口。 -->
       <div>
			<div class="modal fade" id="openRoomModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			      	<div class="container-fluid maincontent">
				       <div class="row">
				       <div style="margin-top: 10px;">
					       	<form class="form-group" id="openRoomForm">
					       		<input type="hidden" name="roomid" value="${roomid }" />
					       		<h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					       		<div class="form-group form-group-padding" style="padding-left: 5px;">
									<label for="todaysubject">今日主题:</label> <input type="text"
										class="form-control" id="todaysubject" name="todaysubject" placeholder="今日主题"  
										data-toggle="tooltip" data-placement="top" title="请输入今日主题" >
								</div>
								<div class="form-group">
								    <label for="announcement">今日公告：</label>
								    <textarea style="resize: none; height: 200px;" class="form-control" name="announcement" id="announcement" placeholder="今日公告"  data-toggle="tooltip" data-placement="top" title="请输入今日公告" ></textarea>
						  		</div>
						  		<div class="form-inline" style="position: relative;">
								    <label for="title">直播时间：</label>
								    <input type="text" class="form-control" id="beginTime" name="starttimeString" data-toggle="tooltip" data-placement="top" title="请选择开始时间">~
								    <input type="text" class="form-control" id="endTime" name="endtimeString" data-toggle="tooltip" data-placement="top" title="请选择结束时间">
						  		</div>
								<div style="text-align: center; margin-top: 10px;">
						            <a href="javascript:;" class="btn btn-success" onclick="saveBroadcastingRoom();">保存</a>
						            <a href="javascript:;" class="btn btn-danger" onclick="$('#openRoomModal').modal('hide');">关闭</a>
						 	    </div>
					     	</form>
				     	</div>
				       </div>
				   	   <div class="row">
						  <table id="user_contentTable" data-toolbar="#user-toolbar"></table>
				       </div>
				       
				   </div> 
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
		
   </div>			
       
  </body>
</html>
