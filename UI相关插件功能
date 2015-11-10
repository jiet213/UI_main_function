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
            $pic_first.after($pic_cindex.clone());

            $pic_li.eq(cindex).replaceWith($pic_first.clone());
            $(option.slide_wrapper).animate({
                left: "-" + lbAreaW + "px"
            }, 360, function() {
                $pic_first.remove();
                $(option.slide_wrapper).css('left', 0);
            });
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
    },

    //Tab标签
    tab: function(obj) {
        var defaults = {
            main: ".tab", //tab的最外层框架类名

            menu: ".tab_nav", //ul标签的类别

            content: ".tab_content", //主体内容的框架类名

            eventtype: "click", //触发事件

            select: "active", //当前选项样式

            auto: false, //自动轮播参数

            count: 3, //tab选项个数

            duration: 3000
        };
        var option = $.extend({}, defaults, obj);
        var t = null,
            n = 0; //计时器参数

        $(option.main).on(option.eventtype, option.menu + "> li", function(event) {
            var $this = $(this),
                index = $this.index();
            $this.addClass(option.select).siblings().removeClass(option.select);

            $this.parent().siblings(option.content).children("div").eq(index).show().siblings().hide();
        })

        function autoplay() {
            n = Index();
            n = n >= (option.count - 1) ? 0 : ++n;
            $(option.menu + "> li").eq(n).trigger(option.eventtype);
        }

        if (option.auto) {
            t = setInterval(autoplay, option.duration);
        } else {
            clearInterval(t);
        }

        //索引函数
        function Index() {
            var $select = $(option.menu + "> li");
            return $select.filter("." + option.select).index();
        };
    },

    //手风琴
    accordian: function(obj) {
        var defaults = {
            main: ".accordion",

            header: ".menu_head",

            content: ".menu_body",

            eventtype: "mouseover" //触发事件
        }
        var option = $.extend({}, defaults, obj);

        $(option.main).on(option.eventtype, option.header, function() {
            var $this = $(this);
            $this.next().slideDown(500).siblings("div" + option.content).slideUp("slow");
        })
    },

    //弹出层
    popover: function(obj) {
        //设置默认宽和高
        var defaults = {
            targetEle: ".popover_target", //需要弹出框的点击源类名

            main: ".popUp", //弹出框的外层框架

            content: ".pop_body", //弹出框的主体

            title: ".pop_title", //弹出框主体的标题部分

            width: 400,

            height: 200
        };
        var option = $.extend({}, defaults, obj);

        var title_height = option.height * 0.2,
            padding_len = parseInt($(option.content).css("padding"));

        //动态控制样式
        $(option.content).css({
            "width": option.width + "px",
            "height": option.height + "px",
            "margin-left": "-" + (option.width + padding_len*2) / 2 + "px",
            "margin-top": "-" + (option.height + padding_len*2) / 2 + "px"
        });
        $(option.title).css({
            "height": title_height + "px",
            "line-height": title_height + "px"
        });
        //绑定弹出函数
        $(option.targetEle).on("click", function() {
            $(option.main).stop(true, true).fadeToggle("slow");
        });
        //绑定隐藏函数
        $(option.main).on("click", function(event) {
            var event = EventUtil.getEvent(event),
                target = EventUtil.getTarget(event);
            if (!$.contains(this, target) || $(target).data('x')) {
                $(this).stop(true, true).fadeToggle("slow");
            };
        });
    },

    //警告框
    Alert: function(obj) {
        var defaults = {
            alert: ".fn-alert",

            close: ".fn-close",

            eventtype: "click"
        };

        var option = $.extend({}, defaults, obj);

        $(option.alert).on(option.eventtype, option.close, function() {
            $(this).parent().stop(true, true).fadeToggle("slow");
        })
    },

    //按钮交互
    button: function(obj) {
        var defaults = {
            button: ".fn-button",

            eventtype: "click",

            loading: "加载中...", //加载时的内容

            loaded: "加载完毕", //加载完成后的内容

            duration: 3000
        };

        var option = $.extend({}, defaults, obj);

        $(option.button).on(option.eventtype, function() {
            var $btn = $(this);
            $btn.val(option.loading);
            $btn.addClass("fn-btn-load");
            setTimeout(function() {
                $btn.val(option.loaded);
                $btn.removeClass("fn-btn-load");
            }, option.duration);
        })
    },

    //侧边栏
    offCanvas: function(obj) {

        var defaults = {

            targetEle: ".offcanvas_targetE", //需要弹出框的点击源类名

            offcanvas: ".fn-offcanvas", //弹出框的外层框架

            offcanvas_bar: ".fn-offcanvas-bar", //弹出框的主体

            width: 270, //侧边栏的宽

            duration: 360

        };
        var option = $.extend({}, defaults, obj);

        $(option.offcanvas_bar).css({
            "width": option.width + "px",
            "left": "-" + option.width + "px"
        });
        //绑定显示函数
        $(option.targetEle).on("click", function() {
            $(option.offcanvas).stop(true, true).fadeToggle("slow");
            $(option.offcanvas_bar).stop(true, true).animate({
                left: "0"
            }, option.duration)
        });
        //绑定隐藏函数
        $(option.offcanvas).on("click", function(event) {

            var event = EventUtil.getEvent(event),
                target = EventUtil.getTarget(event);
            if (!$.contains(this, target)) {

                $(option.offcanvas_bar).animate({
                    left: "-" + option.width + "px"
                }, option.duration);
                $(this).stop(true, true).fadeToggle("slow");
            };
        });
    },

    //固定元素
    sticky: function(obj) {

        var defaults = {

            stickyE: ".fn-sticky", //需要固定的元素

            totop: 0 //固定的top值
        };
        var option = $.extend({}, defaults, obj);

        var offsetTop = $(option.stickyE).offset().top,

            isIE6 = (browserInfo.msie && parseInt(browserInfo.version, 10) == 6);

        $(window).on("scroll", function() {

            //var isIE6 = /msie 6/i.test(navigator.userAgent),
            var scrollTop = $(document).scrollTop();

            if (scrollTop >= offsetTop) {

                $(option.stickyE).css({

                    "position": (isIE6) ? "absolute" : "fixed",

                    "top": (isIE6) ? (scrollTop+option.totop) + "px" : option.totop + "px",

                    "z-index": 1000
                });
            } else {

                $(option.stickyE).css("position", "static");

            }
        });
    },

    //返回顶部底部
    Back2position: function(obj) {
        var defaults = {

            Back2Ele: "#fn_Back2top", //绑定的元素

            duration: 300, //动画时间，默认为：300ms

            eventtype: "click", //触发事件

            top: 0, //返回到距离顶部的距离

            bottom: 0, //返回到距离底部的距离

            position: 0, //要滚动到位置，默认为0，即滚动到顶部,1为滚动到底部

            visibility: false //控制元素开始是否可见
        };
        var option = $.extend({}, defaults, obj);

        if (!option.position) { //滚动到顶部
            $(option.Back2Ele).on(option.eventtype, function() {
                $("html, body").animate({
                    scrollTop: option.top
                }, option.duration);
            });
        } else { //滚动到底部
            $(option.Back2Ele).on(option.eventtype, function() {
                $("html, body").animate({
                    scrollTop: $(document).height() - $(window).height() - option.bottom
                }, option.duration);
            });
        }
        /**
         * 返回顶部元素样式的处理逻辑，可见不可见
         */
        if (!option.visibility) {
            $(window).on("scroll", function() {
                var scrollTop = $(document).scrollTop(),
                    winHeight = $(window).height(),
                    /*IE6需要*/
                    bottom = parseInt($(option.Back2Ele).css("bottom")),
                    height = parseInt($(option.Back2Ele).css("height")),
                    isIE6 = (browserInfo.msie && parseInt(browserInfo.version, 10) == 6);
                //动态控制元素样式
                (scrollTop > option.top) ? $(option.Back2Ele).show(): $(option.Back2Ele).hide();
                //IE6下单独处理
                if (isIE6) {
                    $(option.Back2Ele).css({
                        "position": "absolute",
                        "top": (scrollTop + winHeight - bottom - height) + "px"
                    });
                };
            });
        };
    },

    //tooltip提示
    ToolTip: function(obj) {

        var defaults = {

            main: "#tooltip_demo",

            obj: "#tooltip1",

            tipid: "t1",

            tipClassName: "tooltip_box",

            innerHtml: "tooltip提示",

            width: "auto",

            height: "auto"

        };

        var option = $.extend({}, defaults, obj);

        $(option.main).css("position", "relative");

        var $tooltipBox,

            objHeight = $(option.obj).outerHeight(true),

            objPTop = $(option.obj).position().top,

            objleft = $(option.obj).offset().left,

            mainLeft = $(option.main).offset().left,

            objDTop = $(option.obj).offset().top;

        $tooltipBox = $('<div></div>');

        $tooltipBox.addClass(option.tipClassName);

        $tooltipBox.attr('id', option.tipid);

        $tooltipBox.html(option.innerHtml);

        $(option.obj).append($tooltipBox);

        $tooltipBox.css({
            width: option.width,
            height: option.height,
            background: '#fff',
            border: '1px solid #66CCFF',
            color: '#333',
            padding: '20px',
            'font-size': '12px',
            'border-radius': '5px',
            'line-height': 1.6,
            overflow: 'auto',
            position: "absolute",
            display: "none",
            left: (objleft - mainLeft) + 'px'
        });

        var tipHeight = $tooltipBox.outerHeight(true);

        $(window).on("scroll", function() {

            var scrollTop = $(document).scrollTop(),

                bodyH = $(window).height();

            if ((objDTop - scrollTop + objHeight + tipHeight) > bodyH) {

                $tooltipBox.css("top", (objPTop - tipHeight - 2) + 'px');

            } else {

                $tooltipBox.css("top", (objPTop + objHeight + 5) + 'px');
            };

        });

        $(option.obj).on({

            mouseenter: function() {

                $tooltipBox.stop(true, true).show();

            },

            mouseleave: function() {

                setTimeout(function() {

                    $tooltipBox.stop(true, true).hide();

                }, 100)
            }
        });
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

    act.popover({
        //自定义参数，不写则认为默认
        targetEle: ".popover_targetE",
        //main:,
        //content:,
        //title:,
        width: 500,
        height: 300
    });

    act.tab({
        auto: true,
        count: 4,
        duration: 5000
    });

    act.accordian({
        //main : ".accordion",

        //header : ".menu_head",

        //content : ".menu_body",

        //eventtype: "click"
    });

    act.Alert({});

    act.button({

        duration: 2000
    });

    act.button({
        button: ".fn-btn-other",

        loading: "loading...", //加载时的内容

        loaded: "Complete",

        duration: 2000
    });

    act.offCanvas({
        width: 300,

        duration: 300
    });

    act.sticky({

        totop: 10
    });

    act.Back2position({
        //duration: 5000
        //top: 20
    });

    act.Back2position({
        Back2Ele: ".smoothScroll",
        visibility: true
    });

    act.Back2position({
        Back2Ele: ".Back2bottom",
        position: 1,
        visibility: true
            //bottom: 100
    });
    /*act.ToolTip({
         obj: "#tooltip1",

         tipid: "t1",

         tipClassName: "tooltip_box",

         innerHtml: "中华人民共和国",

         width: 200
     });
     act.ToolTip({
         obj: "#tooltip2",

         tipid: "t2",

         tipClassName: "tooltip_box",

         innerHtml: "美国篮球职业联赛",

         width: 200
     });
     act.ToolTip({
         obj: "#tooltip3",

         tipid: "t3",

         tipClassName: "tooltip_box",

         innerHtml: "<h2>春晓</h2><p>春眠不觉晓，</p><p>处处闻啼鸟。</p><p>夜来风雨声，</p><p>花落知多少。</p>",

         width: 100
     });
     act.ToolTip({
         obj: "#tooltip4",

         tipid: "t4",

         tipClassName: "tooltip_box",

         innerHtml: "<img src='images/xihu.jpg' width='500' />",

         width: 520,

         height: 400
     });
     act.ToolTip({

         main: ".popover_main",

         obj: ".popover_targetE",

         tipid: "t7",

         tipClassName: "tooltip_box",

         innerHtml: "点击出现弹出框",

         width: 200
     });*/
});
