var Sport = function () {
        return {
            "get": function (url) {
                return Sport[url];
            },
            "set": function (url, data) {
                return Sport[url] = data;
            }
        } 
}();

var sportAjax = function (navid, param) {
    var param = arguments[1] ? arguments[1] : {};
    //如果vm中的数据源存在，则不再发起请求
    if (Sport.get(navid) !== undefined)
        return $.Deferred(function (dfd) {
            dfd.resolve();
        }).promise();

    return $.ajax({
        url: "template/" + navid + ".html",
        dataType: "text",
        data: param,
        //禁止ajax缓存
        //cache: false,
        success: function (response) {
            //console.log(navid);
            Sport.set(navid,response);
        },
        error: function () {
            console.log("network error");
        }
    });
};

var nav = function (navid) {
    //console.log(navid);
    sportAjax(navid).then(function(){
          $('#content').empty().html(Sport.get(navid));
        },function(){
          console.log("load page failed");
        })

}

var home = function () {
    showIn("tplHome");
};

var routes = {
    ':navid': nav
}

var options = {
    notfound: function () {
        console.log("route not found");
    },
    before: function () {
        var navName = window.location.hash.slice(1);
        Sport.set("curNav",navName);
        console.log("route before " + navName);
        $(".nav li").removeClass('active');
        $("#" + navName).addClass('active');
        //showIn("tplLoading");
    },
    on: function () {
        console.log("route on "+Sport.get("curNav"));
    }
};

var router = Router(routes).configure(options);

router.init("team");




