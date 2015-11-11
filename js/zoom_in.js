/**
 * @name: jie.tang;
 * @description: 图片局部放大效果;
 * @date: 2015.04.01;
 * @update: ;
 */
;
(function($) {
    var zoom_container = $(".J_zoom_container"),
        zoomS_window = $(".J_zoomS_window"),
        zoomB_window  = $(".J_zoomB_window "),
        zoomS_width = $(".J_zoomS_window").width(),//局部放大选择框的宽度
        zoomS_height = $(".J_zoomS_window").height(),//局部放大选择框的高度
        zoomC_width = $(".J_zoom_container").width(),//图片默认显示容器的宽度
        zoomC_height = $(".J_zoom_container").height(),//图片默认显示容器的高度
        objLeft = $(".J_zoom_container").offset().left,
        objTop = $(".J_zoom_container").offset().top;

    function mouseOffset(event) {
        return {
            X: event.pageX,
            Y: event.pageY
        };
    }

    zoom_container.on({
        mousemove: function(event) {
            event = event || window.event;
            var mousePos = mouseOffset(event);
            var top = mousePos.Y - objTop - zoomS_height / 2,
                left = mousePos.X - objLeft - zoomS_width / 2;
            if (top < 0) {
                top = 0;
            } else if (top > zoomC_width-zoomS_width) {
                top = zoomC_width-zoomS_width;
            };
            if (left < 0) {
                left = 0;
            } else if (left > zoomC_height-zoomS_height) {
                left = zoomC_height-zoomS_height;
            };
            zoomS_window.stop(true, true).show()
                .css({
                    top: top + "px",
                    left: left + "px"
                });
            zoomB_window.stop(true, true).show()
                .children().css({
                	'background-position-x': -2*left+"px",
                	'background-position-y': -2*top+"px"
                });
        },
        mouseout: function() {
            zoomS_window.stop(true, true).hide();
            zoomB_window.stop(true, true).hide();
        }
    });


})(jQuery);
