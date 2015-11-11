/*************************************************
 *  Function  pindao quye
 *  Model www
 *  Copyright frontEnd http://www.feiniu.com/
 *  Designed and built by frontEnd  @japin.pan
 *  Address chenjian163com@163.com
 *  Date 2015/01/19
 *  Update 2015/01/19
 ************************************************/

;
(function($){



})(jQuery);

(function(window, document, body, $, undefined) {

    var options = {

        topObj: '.wrapper',

        boxObj: '#lb_wrap',

        parentObj: '.imgBox',

        pointObj: '#fn_adsnum',

        domOlObj: ' ul',

        domLiObj: ' li',

        domAObj: '>a',

        domLeftPrev: 'a.left_control',

        domRightPrev: 'a.right_control',

        timer: null,

        setTimer: null,

        flag: false

    };

    var specialSlider = {

        init: function() {

            this.func();

        },

        func: function() {

            var topObj = options.topObj,
                boxObj = options.boxObj,
                parentObj = options.parentObj,
                pointObj = options.pointObj,
                domOlObj = options.domOlObj,
                domLiObj = options.domLiObj,
                domAObj = options.domAObj,
                domLeftPrev = options.domLeftPrev,
                domRightPrev = options.domRightPrev,
                timer = options.timer,
                setTimer = options.setTimer,
                flag = options.flag;

            var sliderBox = $(topObj).find(boxObj),
                sliderBoxA = $(topObj).find(boxObj + domAObj),
                sliderParent = $(topObj).find(parentObj),
                sliderPoint = $(topObj).find(pointObj),
                sliderParentOl = $(topObj).find(parentObj + domOlObj),
                sliderParentLi = $(topObj).find(parentObj + domLiObj),
                sliderParentLiFirst = sliderParentLi.first(),
                sliderParentLiLast = sliderParentLi.last(),
                sliderPointLi = $(topObj).find(pointObj + domLiObj),
                sliderParentW = sliderParent.width(),
                sliderParentLiLen = sliderParentLi.length,
                sliderBoxAW = sliderBoxA.width();


            var bgcolor = sliderParentLiFirst.data("bgcolor");//jie.tang
            $(".container").css("background",bgcolor);


            //克隆轮播第一项填充其之后轮播区域让人感觉焦点和内容对应
            sliderParentLiFirst.after(sliderParentLiFirst.clone());

            //轮播区域总宽
            sliderParentOl.css({

                'width': sliderParentW * (sliderParentLiLen + 1) + 'px',

                'left': -sliderParentW + 'px'

            });

            //轮播焦点区域居中
            sliderPoint.css({

                'width': (sliderPointLi.outerWidth(true)) * sliderParentLiLen,

                'paddingLeft': (sliderParentW - sliderPointLi.outerWidth(true) * sliderParentLiLen) / 2

            }).show();

            //轮播左右按钮控制初始值
            sliderBoxA.eq(1).css({

                'left': -sliderBoxAW + 'px',

                'opacity': 0

            }).prev().css({

                'right': -sliderBoxAW + 'px',

                'opacity': 0

            });

            //鼠标滑到轮播区域
            $(topObj).on({

                mouseenter: function() {

                    var that = $(this),
                        thatChild = that.children("a.fnbtn");

                    if (sliderParentLiLen > 1) {

                        thatChild.show();

                    } else {

                        thatChild.hide();
                        fnBtnStop();

                    }

                    thatChild.eq(1).stop(true, true).animate({

                        'left': 10 + 'px',

                        'opacity': 0.25

                    }).prev().stop(true, true).animate({

                        'right': 10 + 'px',

                        'opacity': 0.25

                    });

                    clearInterval(timer);

                    fnStop();

                    flag = true;

                },

                mouseleave: function() {

                    var that = $(this),
                        thatChild = that.children("a.fnbtn");

                    thatChild.eq(1).stop(true, true).animate({

                        left: -sliderBoxAW + 'px',

                        opacity: 0

                    }).prev().stop(true, true).animate({

                        right: -sliderBoxAW + 'px',

                        opacity: 0

                    });

                    clearInterval(timer);

                    timer = setInterval(function() {

                        fnImgCont(fnIndex(), true);

                    }, 3000);

                    fnStopGo();

                    flag = false;

                }

            }, boxObj);

            //鼠标划过单击左右按钮效果
            $(topObj).on({

                mouseenter: function() {

                    $(this).css('opacity', '0.5');

                },

                mouseleave: function() {

                    $(this).css('opacity', '0.25');

                },

                click: function() {

                    var fn_index = fnIndex();

                    if (sliderParentOl.is(":animated")) {

                        return;

                    }

                    if ($(this).hasClass("left_control")) {


                        sliderParentOl.animate({

                            left: "+=" + sliderParentW + "px"

                        }, 360, function() {

                            //var bgcolor; //jie.tang

                            if (fn_index > 0) {

                                sliderPointLi.eq(fn_index - 1).addClass("cur").siblings().removeClass("cur");

                                bgcolor = sliderParentLi.eq(fn_index-1).data("bgcolor");//jie.tang

                            } else {

                                if (fn_index == 0) {

                                    sliderParentOl.css("left", "-" + sliderParentW * (sliderParentLiLen) + "px");

                                    sliderPointLi.eq(-1).addClass("cur").siblings().removeClass("cur");

                                    bgcolor = sliderParentLi.eq(-1).data("bgcolor");//jie.tang

                                }

                            }

                            fnBtnStop();

                            $(".container").css("background",bgcolor);//jie.tang

                        });

                       

                    } else {

                        fnImgCont(fn_index);

                    }

                    return false;

                }

            }, domLeftPrev + ',' + domRightPrev);

            //自动轮播
            timer = setInterval(function() {

                fnImgCont(fnIndex(), true);

            }, 3000);

            if (sliderParentLiLen > 1) {

                fnAutoGo();

            } else {

                fnStop();
                fnBtnStop();

            }

            //鼠标滑过导航控制焦点
            $(topObj).on({

                mouseenter: function() {

                    var ts = this;

                    var fn_index = sliderPointLi.index(ts);

                    bgcolor = sliderParentLi.eq(fn_index).data("bgcolor");//jie.tang

                    setTimer = setTimeout(function() {

                        $(ts).addClass("cur").siblings().removeClass("cur");

                        sliderParentOl.stop(true).animate({

                            left: "-" + (fn_index + 1) * sliderParentW + "px"

                        }, 360,function(){//jie.tang

                            $(".container").css("background",bgcolor);//jie.tang

                        });

                        fnBtnStop();

                    }, 100);

                },

                mouseleave: function() {

                    if (setTimer) {

                        clearTimeout(setTimer);

                    }

                }

            }, pointObj + domLiObj);

            //轮播内容的切换判断
            function fnImgCont(curIndex, curFlag) {

                if (curIndex == sliderParentLiLen - 1) {

                    sliderParentLiFirst.addClass("cur").css("left", sliderParentW * sliderParentLiLen);


                }

                if (sliderParentLiLen > 1) {

                    bgcolor = sliderParentLi.eq(curIndex+1).data("bgcolor");//jie.tang

                    if (curIndex == sliderParentLiLen - 1) {

                        sliderParentOl.css("left", 0);

                        sliderPointLi.eq(0).addClass("cur").siblings().removeClass("cur");

                        bgcolor = sliderParentLi.eq(0).data("bgcolor");//jie.tang

                    }


                    sliderParentOl.stop(true, true).animate({

                        left: "-=" + sliderParentW + "px"

                    }, 360, function() {

                        if (curIndex < sliderParentLiLen - 1) {

                            sliderPointLi.eq(curIndex + 1).addClass("cur").siblings().removeClass("cur");

                        } else {

                            // if (curIndex == sliderParentLiLen - 1) {

                                sliderParentLiFirst.removeClass("cur").css("left", -sliderParentW);


                                // sliderParentOl.css("left", 0 + "px");

                                // sliderPointLi.eq(0).addClass("cur").siblings().removeClass("cur");

                            // }

                        }

                        if (curFlag && !flag) {

                            fnAutoGo();

                        } else {

                            fnBtnStop();

                        }

                        $(".container").css("background",bgcolor);//jie.tang

                    });


                }

            };

            //索引函数
            function fnIndex() {

                return sliderPoint.find("li.cur").index();

            };

            //鼠标滑到轮播区域停止
            function fnStop() {

                var fn_liCur = sliderPoint.find("li.cur");

                fn_liCur.siblings().find("span").stop().css("width", 0);

                fn_liCur.find("span").stop();

            };

            //鼠标滑到区域停止滑出继续
            function fnStopGo() {

                var fn_liCur = sliderPoint.find("li.cur");

                var fn_liSpanW = fn_liCur.find("span").width();

                fn_liCur.siblings().find("span").css("width", 0);

                if (fn_liSpanW != fn_liCur.width()) {

                    fn_liCur.find("span").animate({

                        width: "100%"

                    }, 2640, function() {

                        $(this).width(0);

                    });

                }

            };

            //单击左右按钮时和滑到焦点时调用
            function fnBtnStop() {

                var fn_liCur = sliderPoint.find("li.cur");

                fn_liCur.siblings().find("span").stop().css("width", 0);

                fn_liCur.find("span").stop().width("100%");

            }

            //自动轮播时调用
            function fnAutoGo() {

                var fn_liCur = sliderPoint.find("li.cur");

                fn_liCur.siblings().find("span").css("width", 0);

                fn_liCur.find("span").width(0).animate({

                    width: "100%"

                }, 2640, function() {

                    $(this).width(0);

                })

            };

        }

    };

    window.specialSlider = specialSlider;

    window.specialSlider.init();

})(window, window.document, window.document.body, jQuery);
