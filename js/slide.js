;
var act = {
    //图片轮播
    slide: function(obj) {
        //设置参数
        var defaults = {
            wrapper: "#lb_wrap",

            slide_wrapper: "#slide_wrap",

            slidenav: ".slide_nav",

            pageprev: ".left_control",

            pagenext: ".right_control",

            auto: true,

            eventtype: "click",

            select: "active",

            duration: 1000

        };

        var option = $.extend({}, defaults, obj);

        var $pic_li = $(option.slide_wrapper).children("li"),
            $list = $(option.slidenav).children("a"),
            lbAreaW = $(option.slide_wrapper).children("li").eq(0).width(),
            timer = null; //

        //循环轮播函数
        var changePic = function(cindex) {
            var $pic_cindex = $pic_li.eq(cindex);
            var $pic_first = $(option.slide_wrapper).find('li:first');

            var bgcolor = $pic_li.eq(cindex).data("bgcolor");

            $pic_first.after($pic_cindex.clone());

            $pic_li.eq(cindex).replaceWith($pic_first.clone());
            $(option.slide_wrapper).animate({
                left: "-" + lbAreaW + "px"
            }, 360, function() {
                $pic_first.remove();
                $(option.slide_wrapper).css('left', 0);
            });

            /*$(option.slide_wrapper).animate({
                
            },360);*/

            $(".container").css("background",bgcolor);

            $list.eq(cindex).addClass(option.select).siblings().removeClass(option.select);
        };
        //控制自动播放
        var go = function() {
            var index = Index();
            index++;
            if (index > $pic_li.length - 1) {
                index = 0;
            }
            changePic(index);
        };
        //自动播放
        if (option.auto) {
            timer = setInterval(go, option.duration);
        } else {
            clearInterval(timer);
        }

        //绑定函数，鼠标放上去停止，离开继续
        $(option.wrapper).on({
            mouseover: function() {
                clearInterval(timer);
                timer = null;
            },
            mouseout: function() {
                timer = setInterval(go, option.duration);
            }
        });

        //导航控制轮播图片函数
        $list.each(function(index) {
            $(this).on("mouseenter", function() {
                $(option.slide_wrapper).stop(true, true);
                changePic(index);
            })
        });
        //左右按钮控制
        $(option.pageprev).on(option.eventtype, function() {
            $(option.slide_wrapper).stop(true, true);
            var index = Index();
            changePic(index - 1);
        });
        $(option.pagenext).on(option.eventtype, function() {
            $(option.slide_wrapper).stop(true, true);
            var index = Index();
            if (index < $pic_li.length - 1) {
                changePic(index + 1);
            } else {
                changePic(0);
            }
        });
        //索引函数
        var Index = function() {

            return $list.filter("." + option.select).index();

        };
    }
};

var EventUtil = {
    //跨浏览器绑定事件
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    //跨浏览器移除事件
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    //取得event对象
    getEvent: function(event) {
        return event ? event : window.event;
    },
    //获取事件源
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    //跨浏览器取消冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

/**
 * 浏览器信息
 * @type {*}
 */
var browserInfo = (function() {
    var userAgent = navigator.userAgent.toLowerCase();
    return {
        version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        msie: /msie/.test(userAgent) && !/opera/.test(userAgent)
    };
})();


//初始化
$(function() {
    act.slide({
        //wrapper : "#lb_wrap",

        //slide_wrapper: "#slide_wrap",

        //slidenav: ".slide_nav",

        //pageprev: ".left_control",

        //pagenext: ".right_control",

        //auto: false,

        //eventtype: "mouseover",

        //select: "active",

        duration: 3000
    });
});
