! function(t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = { exports: {}, id: r, loaded: !1 };
        return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports }
    var n = {};
    return e.m = t, e.c = n, e.p = "/public/bundle/", e(0) }([function(t, e, n) { "use strict";
    var r = n(1),
        i = n(7);
    yn.navigation.name = ynconfig.navigation.b;
    var o = n(9),
        a = n(8);
    $(function() {
        var t = '<li class="banner banner1" style="background:url(/private/live/images/live_2.jpg) no-repeat center;"></li>';
        $("#homeslide .content ul").append(t), $("#homeslide .content").unslider({ speed: 500, delay: 4e3, autoplay: !0 }), r.init(), r.add(".show-person-intro");
        var e = $(".t-num").val();
        log("num", e), "" == e && (log("kong"), log("元素", $(".column2 .number")), $(".t-num").parent().hide()), $("#liveindexLeft .sort").on("click", "a", function() { $(this).parent().find(".thisclass").removeClass("thisclass"), $(this).addClass("thisclass");
            var t = $(this).index();
            showBoradcastList(t) }), o.render({ container: $(".mar-container") });
        var n = function() {
            var t, e, n, r = $("#livelist"),
                i = r.find(".items"),
                o = 12,
                s = 6,
                c = function(t) {
                    return _.map(t, function(t) {
                        return t.shortContent = yn.filterHTML(t.shortContent, { substr: 50, trim: !0 }), t.link = live_path + "/live/liveDetailLive.htm?teacherid=" + t.teacherid, t }) },
                d = (new yn.loading({ container: i, type: 3, margin: 100 }), function() { n = setInterval(function() {
                        var n = t.pop(),
                            r = e.shift();
                        e.push(n), t.unshift(r), i.find(".item:last").remove(), i.prepend(template("living-template", [r]));
                        var o = $("#living" + r.id);
                        o.velocity("transition.perspectiveDownIn") }, 4e3) });
            return { render: function() {
                    var r = "live_dynamic",
                        l = a.get(r, { timeout: 3600 });
                    l && l.valid && i.html(template("living-template", l.data)), clearInterval(n), n = null, $.getJSON(__path + "/html/lastBroadcasting.htm", { pageSize: o }, function(n) {
                        var o = n.length;
                        return o <= s ? (n = c(n), i.html(template("living-template", n)), void a.set(r, n)) : (n = _.chunk(c(n), s), t = n[0], e = n[1], i.html(template("living-template", t)), a.set(r, t), void d()) }) } } }();
        n.render(), setInterval(function() { n.render() }, 3e4);
        var s = function() {
            var t = $("#broadcast"),
                e = t.find(".items"),
                n = 1;
            t.on("mouseover", ".action", function() { $(this).parent().find(".select").removeClass("select"), $(this).addClass("select"), n = $(this).data("type"), s.render() });
            var r = function(t) {
                    var e = t || "0";
                    return '<strong style="margin:0 5px">' + e + "</strong>" },
                o = function(t) {
                    return _.chain(t).map(function(t) {
                        return t.link = live_path + "/live/liveDetailLive.htm?teacherid=" + t.teacherid, t._popularity = "人气" + r(t.popularity), t._answerCount = "回答问题" + r(t.answerCount), t._gdCount = function() {
                            return 3 === +s.type ? r(t.hdcount) + "条互动" : "发布直播" + r(t.gdcount) }(), t }).take(8).value() },
                a = new yn.loading({ container: e, type: 3, margin: 300 });
            return a.render(), { render: function() { i.broadcast({ type: n }, function(t) { t = o(t), e.html(template("broadcast-template", t)) }) } } }();
        s.render(), i.recommend({}, function(t) {
            function e(t) {
                return _.map(t, function(t) {
                    return t._userid = t.teacher.user_id, t }) }
            t = e(t), $("#recommend .items").html(template("recommend-template", t)) }), i.hot({ unit: "month", type: "emerging", row: 10 }, function(t) { $("#newLive .items").html(template("newLive-template", _.take(t, 5))) }) }) }, function(t, e, n) { "use strict";

    function r() {
        return '<div id="personIntro" class="hide">\n        <span id="personIntro-indicate-right" class="indicate right fa fa-caret-right hide"></span>\n        <span id="personIntro-indicate-left" class="indicate left fa fa-caret-left hide"></span>\n        <div class="items"></div>\n    </div>\n    <script type="text/html" id="personIntro-template">\n        <div class="line infoView">\n            <div class="column column1">\n                <div class="teacher-profile-avatar" >\n                    <img src="{{photo}}" style="width:80px;"/>\n                </div>\n            </div>\n            <div class="column column2">\n                <div class="title">\n                    <span class="name">{{username}}</span>\n                    <i class="fa fa-vimeo-square"></i>\n                    <span class="postion">投资顾问</span>\n                    <span class="number">证书编号{{certificate_num}}</span>\n                </div>\n                <div class="buttons"><button class="care {{_isCare}}">{{_careText}}</button></div>\n                <div class="style">{{_style}}</div>\n            </div>\n        </div>\n        <div class="line countView">\n            <table>\n                <tr>\n                    <td>粉丝</td>\n                    <td>回答问题</td>\n                    <td>发布观点</td>\n                    <td>直播条数</td>\n                </tr>\n                <tr class="value">\n                    <td>{{popularity_number}}</td>\n                    <td>{{answerCount}}</td>\n                    <td>{{gdcount}}</td>\n                    <td>{{zbcount}}</td>\n                </tr>\n            </table>\n            <a class="ynbtn live-link" href="/live/{{teacherid}}/" target="_blank">看TA直播</a>\n        </div>\n    </script>' }
    n(2);
    var i = n(6),
        o = function() {
            var t, e, n, o, a, s = !0,
                c = null,
                d = function() {
                    var e = this;
                    t.on("mouseenter", function() {
                        return s = !1 }), t.on("mouseleave", function() { t.hide(), s = !0 }), t.on("click", ".care.false", function() {
                        return ynIsLogin ? void i.add(ynUserId, c.teacherid).done(function(t) { $(e).attr("class", "care true").text("取消关注") }) : void yn.login.render() }), t.on("click", ".care.true", function() {
                        return ynIsLogin ? void i.cancel(ynUserId, c.teacherid).done(function() { console.log("ddd"), $(e).attr("class", "care false").text("关注") }) : void yn.login.render() }) },
                l = function(t) {
                    return t._style = _.pluck(t.specialtys, "name").join("，"), t._link = "live/" + t.teacherid + "/", t._careText = t.isAttention ? "取消关注" : "关注", t._isCare = String(t.isAttention), t },
                u = function(r, i) { n.render();
                    (function() {
                        var e = r.offset(),
                            n = e.top - 15,
                            i = function() {
                                var t = e.left;
                                return t > 800 ? (a.show(), o.hide(), t - 450 - 5) : (o.show(), a.hide(), t + r.width() + 5) }();
                        t.css({ left: i, top: n }) })();
                    t.show(), $.getJSON("/userinfo/queryUserAllInfo.htm?user_id=" + i, function(t) { c = l(t), setTimeout(function() { e.html(template("personIntro-template", c)) }, 300) }) };
            return { init: function() { $("body").append(r()), t = $("#personIntro"), e = t.find(".items"), c = null, o = t.find(".indicate.left"), a = t.find(".indicate.right"), n = new yn.loading, n.container = e, n.margin = 80, d() }, add: function(e) { $("body").on("mouseenter", e, function() {
                        var t = this;
                        s = !1, setTimeout(function() {
                            if (!s) {
                                var e = $(t).data("userid");
                                u($(t), e) } }, 350) }).on("mouseleave", e, function() { s = !0, setTimeout(function() { s && t.hide() }, 400) }) } } }();
    t.exports = { init: o.init, add: o.add } }, function(t, e, n) {
    var r = n(3); "string" == typeof r && (r = [
        [t.id, r, ""]
    ]);
    n(5)(r, {});
    r.locals && (t.exports = r.locals) }, function(t, e, n) { e = t.exports = n(4)(), e.push([t.id, "#personIntro{width:450px;position:absolute;border:1px solid #dcdcdc;background:#fff;padding:20px;box-shadow:2px 2px 15px rgba(0,0,0,.3);border-radius:2px;z-index:1000}#personIntro .indicate{font-size:36px;position:absolute;color:#fff;top:25px}#personIntro .indicate.left{left:-10px}#personIntro .indicate.right{right:-10px}#personIntro .infoView{overflow:hidden;margin-bottom:10px}#personIntro .teacher-profile-avatar{width:80px;height:80px;overflow:hidden}#personIntro .teacher-profile-avatar img{width:80px}#personIntro .infoView .column2{margin-left:10px}#personIntro .infoView .title{font-size:18px;margin-bottom:10px}#personIntro .infoView .title .postion{font-size:12px}#personIntro .infoView .title .fa,#personIntro .infoView .title .number{font-size:12px;color:#d72621}#personIntro .infoView .buttons .care{background:#000;border-color:#000}#personIntro .infoView .buttons .sign{background:#c8c8c8;border-color:#c8c8c8}#personIntro .infoView .style{margin-top:10px;width:300px}#personIntro .infoView .style .item{display:inline-block;font-size:12px;padding:2px}#personIntro .infoView>*{float:left}#personIntro .countView{border-top:1px solid #c8c8c8;padding-top:15px;position:relative}#personIntro .countView table{width:280px}#personIntro .countView td{text-align:center;padding:3px 0;border-left:1px solid #dcdcdc}#personIntro .countView .value td{font-size:21px;font-weight:700;color:#f97b02}#personIntro .countView td:first-child{border:none}#personIntro .countView .live-link{position:absolute;top:25px;right:5px}", ""]) }, function(t, e) { t.exports = function() {
        var t = [];
        return t.toString = function() {
            for (var t = [], e = 0; e < this.length; e++) {
                var n = this[e];
                n[2] ? t.push("@media " + n[2] + "{" + n[1] + "}") : t.push(n[1]) }
            return t.join("") }, t.i = function(e, n) { "string" == typeof e && (e = [
                [null, e, ""]
            ]);
            for (var r = {}, i = 0; i < this.length; i++) {
                var o = this[i][0]; "number" == typeof o && (r[o] = !0) }
            for (i = 0; i < e.length; i++) {
                var a = e[i]; "number" == typeof a[0] && r[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), t.push(a)) } }, t } }, function(t, e, n) {
    function r(t, e) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n],
                i = f[r.id];
            if (i) { i.refs++;
                for (var o = 0; o < i.parts.length; o++) i.parts[o](r.parts[o]);
                for (; o < r.parts.length; o++) i.parts.push(d(r.parts[o], e)) } else {
                for (var a = [], o = 0; o < r.parts.length; o++) a.push(d(r.parts[o], e));
                f[r.id] = { id: r.id, refs: 1, parts: a } } } }

    function i(t) {
        for (var e = [], n = {}, r = 0; r < t.length; r++) {
            var i = t[r],
                o = i[0],
                a = i[1],
                s = i[2],
                c = i[3],
                d = { css: a, media: s, sourceMap: c };
            n[o] ? n[o].parts.push(d) : e.push(n[o] = { id: o, parts: [d] }) }
        return e }

    function o(t, e) {
        var n = h(),
            r = b[b.length - 1];
        if ("top" === t.insertAt) r ? r.nextSibling ? n.insertBefore(e, r.nextSibling) : n.appendChild(e) : n.insertBefore(e, n.firstChild), b.push(e);
        else {
            if ("bottom" !== t.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            n.appendChild(e) } }

    function a(t) { t.parentNode.removeChild(t);
        var e = b.indexOf(t);
        e >= 0 && b.splice(e, 1) }

    function s(t) {
        var e = document.createElement("style");
        return e.type = "text/css", o(t, e), e }

    function c(t) {
        var e = document.createElement("link");
        return e.rel = "stylesheet", o(t, e), e }

    function d(t, e) {
        var n, r, i;
        if (e.singleton) {
            var o = y++;
            n = g || (g = s(e)), r = l.bind(null, n, o, !1), i = l.bind(null, n, o, !0) } else t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = c(e), r = p.bind(null, n), i = function() { a(n), n.href && URL.revokeObjectURL(n.href) }) : (n = s(e), r = u.bind(null, n), i = function() { a(n) });
        return r(t),
            function(e) {
                if (e) {
                    if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                    r(t = e) } else i() } }

    function l(t, e, n, r) {
        var i = n ? "" : r.css;
        if (t.styleSheet) t.styleSheet.cssText = x(e, i);
        else {
            var o = document.createTextNode(i),
                a = t.childNodes;
            a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(o, a[e]) : t.appendChild(o) } }

    function u(t, e) {
        var n = e.css,
            r = e.media;
        if (r && t.setAttribute("media", r), t.styleSheet) t.styleSheet.cssText = n;
        else {
            for (; t.firstChild;) t.removeChild(t.firstChild);
            t.appendChild(document.createTextNode(n)) } }

    function p(t, e) {
        var n = e.css,
            r = e.sourceMap;
        r && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
        var i = new Blob([n], { type: "text/css" }),
            o = t.href;
        t.href = URL.createObjectURL(i), o && URL.revokeObjectURL(o) }
    var f = {},
        v = function(t) {
            var e;
            return function() {
                return "undefined" == typeof e && (e = t.apply(this, arguments)), e } },
        m = v(function() {
            return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase()) }),
        h = v(function() {
            return document.head || document.getElementsByTagName("head")[0] }),
        g = null,
        y = 0,
        b = [];
    t.exports = function(t, e) { e = e || {}, "undefined" == typeof e.singleton && (e.singleton = m()), "undefined" == typeof e.insertAt && (e.insertAt = "bottom");
        var n = i(t);
        return r(n, e),
            function(t) {
                for (var o = [], a = 0; a < n.length; a++) {
                    var s = n[a],
                        c = f[s.id];
                    c.refs--, o.push(c) }
                if (t) {
                    var d = i(t);
                    r(d, e) }
                for (var a = 0; a < o.length; a++) {
                    var c = o[a];
                    if (0 === c.refs) {
                        for (var l = 0; l < c.parts.length; l++) c.parts[l]();
                        delete f[c.id] } } } };
    var x = function() {
        var t = [];
        return function(e, n) {
            return t[e] = n, t.filter(Boolean).join("\n") } }() }, function(t, e) { "use strict";
    var n = function(t) { t = _.extend({ userid: ynUserId, page: 1, row: 20 }, t);
            var e = { user_id: t.userid, currentPage: t.page, pageSize: t.row },
                n = $.Deferred();
            return $.getJSON("/center/attentionList.htm", e, function(e) { e.pageNumber = _.max([1, +e.total / t.row]), n.resolve(e) }), n.promise() },
        r = function(t, e) {
            var n = $.Deferred();
            return $.post("/center/attention.htm", { user_id: t, teacherid: e }, function(t) { "success" == t && (layer.msg("关注成功"), n.resolve()), "18" == t && layer.msg("老师不能关注老师") }), n.promise() },
        i = function(t, e) {
            var n = $.Deferred();
            return $.post("/center/attention.htm", { user_id: t, teacherid: e }, function(t) { "success" == t && (layer.msg("取消成功"), n.resolve()) }), n.promise() };
    t.exports = { add: r, cancel: i, list: n } }, function(t, e, n) { "use strict";
    var r = n(8),
        i = function(t, e) { t = _.extend({ type: 0, row: 7 }, t);
            var n = "live_list_recommend" + r.joinKey(t),
                i = r.get(n, { timeout: 3600 });
            return i && i.valid ? e(i.data) : void $.getJSON("/html/roomOrderList.htm", { orderStype: t.type, rows: t.row }, function(t) { t = _.compact(t), e(t), r.set(n, t) }) },
        o = function(t, e) { t = _.extend({ order: "attentionnumber", sort: "desc", type: 2 }, t);
            var n = "live_list_broadcast" + r.joinKey(t),
                i = r.get(n, { tiemout: 3600 });
            return i && i.valid ? e(i.data) : void $.getJSON(__path + "/html/broadcastingList.htm", { order: t.order, sort: t.sort, type: t.type }, function(t) { e(t), r.set(n, t) }) },
        a = function(t, e) { t = _.extend({ page: 1, row: 7, type: "total", unit: null }, t);
            var n = { orderStype: t.type, rows: t.row },
                i = { total: 0, ask: 1, emerging: 2 };
            n.orderStype = i[t.type], "month" == t.unit && (n.monNum = 5);
            var o = "live_list_hot" + r.joinKey(n),
                a = r.get(o, { timeout: 3600 });
            return a && a.valid ? e(a.data) : void $.ajax({ url: "/html/teacherOrderList.htm?", data: n, dataType: "json", success: function(t) { t = _.map(t, function(t, e) {
                        return t.index = e + 1, t }), e(t), r.set(o, t) } }) };
    t.exports = { hot: a, broadcast: o, recommend: i } }, function(t, e) { "use strict";
    var n = window.JSON || !1,
        r = localStorage,
        i = function(t, e) { n && t && (e = [_.now(), n.stringify(e)].join("@@@@"), r.setItem(t, e)) },
        o = function(t, e) {
            if (n && t) { e = _.extend({ disable: !1, timeout: 3e3 }, e);
                var i = r.getItem(t);
                if (i && /@@@@/.test(i)) {
                    var o = i.split("@@@@"),
                        a = n.parse(o[1]),
                        s = o[0],
                        c = !e.disable && _.now() - s <= 1e3 * e.timeout;
                    return { data: a, valid: c } } } };
    t.exports = { set: i, get: o, joinKey: function(t) {
            var e = [];
            for (var n in t) e.push(String(t[n]));
            return e.join("") } } }, function(t, e, n) { "use strict";
    var r = (n(8), function() {
        var t = new Date(_.now()),
            e = t.getHours(),
            n = t.getMinutes();
        return e > 15 || e < 9 || 15 == e && n > 30 || 9 == e && n < 30 }());
    t.exports = function() {
        var t, e, n, i = [],
            o = function(t) {
                var e = function(t) { t.curdot = yn.setDecimal(t.curdot);
                    var e = parseFloat(t.rate);
                    return t.color = e > 0 ? "red" : "green", 0 === e && (t.color = "gray"), t };
                $.getJSON("/html/querySinaMarketData1.htm", function(n) { t(_.map(["上证指数", "深证成指", "中小板指", "创业板指"], function(t) {
                        return e(n.market[t]) })) }) },
            a = function(t, e) {
                return '<div id="mi-' + e + '-color" class="marketIndex-item ' + t.color + '">\n                        <div class="line1">\n                            <span id="mi-' + e + '-name" class="name">' + t.name + '</span>\n                            <span id="mi-' + e + '-curdot"  class="curdot">' + t.curdot + '</span>\n                            <span class="icon"></span>\n                        </div>  \n                        <div class="line2">\n                            <span id="mi-' + e + '-curprice"  class="price">' + t.curprice + '</span>\n                            <span id="mi-' + e + '-rate"  class="rate">' + t.rate + "</span>\n                        </div>\n                    </div>" },
            s = function(t, e) {
                if (!t || !e) return !1;
                var n = !0;
                return _.forEach(t, function(t, r) { t !== e[r] && (n = !1) }), n },
            c = function() { r && (clearInterval(n), n = null), o(function(e) { _.forEach(e, function(e, n) {
                        if (!s(e, i[n])) {
                            var r = a(e, n);
                            t.find("td").eq(n).html(r), i[n] = e } }) }) };
        return { render: function(r) { t = r.container, e = r.layout || "line";
                var i = { line: '<table class="line" id="MarketIndex"><tr><td></td><td></td><td></td><td></td></tr></table>', column: '<table class="column" id="MarketIndex"><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>' };
                t.html(i[e]), c(), n = setInterval(function() { c() }, 5e3) } } }() }]);