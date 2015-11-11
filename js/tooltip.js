;
var ToolTip = (function($) {

    var defaults = {

        main: "#tooltip_demo",

        obj: "#tooltip1",

        tipid: "t1",

        tipClassName: "tooltip_box",

        innerHtml: "tooltip提示",

        width: "auto",

        height: "auto"

    };

    var option = {};

    var setup = function() {

        var isIE6 = /msie 6/i.test(navigator.userAgent);

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
                $tooltipBox.show();
            },
            mouseleave: function() {
                setTimeout(function() {
                    $tooltipBox.hide();
                }, 100)
            }
        });
    };

    var init = function(opt) {

        option = $.extend({}, defaults, opt);

        setup();
    };

    return {
        init: init,
        version: '1.0'
    };

})(jQuery);

ToolTip.init({});

ToolTip.init({

    obj: "#tooltip1",

    tipid: "t1",

    tipClassName: "tooltip_box",

    innerHtml: "中华人民共和国",

    width: 200

});
ToolTip.init({

    obj: "#tooltip2",

    tipid: "t2",

    tipClassName: "tooltip_box",

    innerHtml: "美国篮球职业联赛",

    width: 200

});
ToolTip.init({

    obj: "#tooltip3",

    tipid: "t3",

    tipClassName: "tooltip_box",

    innerHtml: "<h2>春晓</h2><p>春眠不觉晓，</p><p>处处闻啼鸟。</p><p>夜来风雨声，</p><p>花落知多少。</p>",

    width: 100

});
ToolTip.init({

    obj: "#tooltip4",

    tipid: "t4",

    tipClassName: "tooltip_box",

    innerHtml: "<img src='images/xihu.jpg' width='500' />",

    width: 520,

    height: 400

});
