!function(t){function n(i){if(e[i])return e[i].exports;var r=e[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var e={};return n.m=t,n.c=e,n.p="/public/bundle/",n(0)}([function(t,n){"use strict";var e=window.location.href,i=e.match(/\?pid=(\d+)/),r=i?i[1]:"",a=function(){var t,n,e={currentPage:1,pageSize:10,periodicalid:r},i=function(t){return'<div class="live-item-2" data-id=\'\'>\n                    <div class="avatar"><img src="'+t.photoImg+'" alt="" /></div>\n                    <div class="title">\n                        <span class="name">'+t.nickName+'</span>\n                        <span class="time">'+t.ctime+'</span>\n                    </div>\n                    <div class="content">'+t._content+"</div>\n                </div>"},a=function(t){return _.map(t,function(t){if(t._content=t.content,t.replyList){var n=_.map(t.replyList,function(t){return'<strong style="color:#8484ff;margin-right:5px;">@'+t.nickName+"&nbsp;"+t.content+"</strong>"}).join("");t._content+='<div style="display:block"><div class="living-quote">'+n+"</div></div>"}return t})};return{init:function(){var i=this;t=$(".reply"),n=yn.bootpag(".page"),n.on("page",function(t,n){e.currentPage=n,i.render()})},render:function(){$.getJSON("/live/vipInteractionAll.htm",e,function(r){if("20001"==r.status)return layer.msg("请登录");if("1"==r.status){var o=JSON.parse(r.data);if(console.log("data",o),0==o.rows.length)return $(".page").hide(),t.html('<div style="width:1200px;height:100px;text-align:center;line-height:100px;font-size:20px;background:#fff;">暂无数据</div>');$(".page").show();var c=_.map(a(o.rows),function(t){return i(t)}).join("");t.html(c);var s=_.max([1,Math.ceil(o.total/e.pageSize)]);n.bootpag({page:e.currentPage,total:s})}})}}}();$(function(){a.init(),a.render()})}]);