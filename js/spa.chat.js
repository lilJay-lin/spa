/**
 * Created by linxiaojie on 2015/9/29.
 */
/*
    chat模块
    1.向外暴露接口：
      1）configModule:数据配置
      2）setSliderPosition 设置chat模块位置
      3）initModule:初始化组件

    2.

 */

spa.chat = (function(){

    var
        configMap = {
            main_html : '<div class="spa-chat"><div class="spa-chat-head"><div class="spa-chat-head-toggle">=</div><div class="spa-chat-head-title"></div></div><div class="spa-chat-closer">X</div><div class="spa-chat-sizer"><div class="spa-chat-msgs"></div><div class="spa-chat-box"><input type="text"><div>send</div></div></div></div>',
            slider_opened_height : 16,
            slider_closed_height : 2,
            slider_opened_min_height : 10,
            window_height_min_rem : 20,
            slider_opened_title : 'click to close',
            slider_closed_title : 'click to open',
            slider_opened_time : 500,
            slider_closed_time : 500,
            settable : {
                slider_opened_height : true,
                slider_closed_height : true,
                slider_opened_title : true,
                slider_closed_title : true,
                slider_opened_time : true,
                slider_closed_time : true,
                set_chat_anchor : true
            },
            set_chat_anchor : null
        },
        stateMap = {
            $container : null,
            position_type : 'closed',
            slider_closed_px : 0,
            slider_opened_px : 0
        },
        jqueryMap = {}, setJqueryMap,getPerRem,setSizerSize,setSliderPosition,
        onClickToggle,configModule,initModule,removeSlider,handleResize ;
    setJqueryMap = function(){
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $slider : $container.find(".spa-chat"),
            $sizer : $container.find(".spa-chat-sizer"),
            $toggle : $container.find(".spa-chat-head-toggle")
        }
    };
    getPerRem = function(){
        return Number(
          getComputedStyle(document.documentElement,null).fontSize.match(/\d*\.?\d*/)[0]
        )
    };
    setSizerSize = function(){
        var per_rem_px,opened_height,sm = stateMap,cm = configMap,
            win_height_rem;
        per_rem_px = getPerRem();
        win_height_rem =  Math.floor(($(window).height() / per_rem_px) + 0.5);
        opened_height = win_height_rem < cm.window_height_min_rem ?
            cm.slider_opened_min_height : cm.slider_opened_height;
        sm.slider_closed_px = cm.slider_closed_height * per_rem_px;
        sm.slider_opened_px = opened_height * per_rem_px;
        jqueryMap.$sizer.height((opened_height - 2)*per_rem_px);

    };
    removeSlider = function(){
        if(jqueryMap.$slider){
          jqueryMap.$slider.remove();
          jqueryMap = {};
        }
        stateMap.$container = null;
        stateMap.position_type = 'closed';
        configMap.set_chat_anchor = null;
    };
    handleResize = function(){
        if(!jqueryMap.$slider) {
          return false;
        }
        setSizerSize();
        if(stateMap.position_type == 'opened'){
            jqueryMap.$slider.height(stateMap.slider_opened_px);
        }

    };
    onClickToggle = function(e){
        var position_type = stateMap.position_type;
        if(position_type == 'closed'){
            configMap.set_chat_anchor('opened');
        }else if(position_type == 'opened'){
            configMap.set_chat_anchor('closed');
        }
        return false;
    };
    setSliderPosition = function(position_type,callback){
        var position_type_previous = stateMap.position_type,
            animate_time,slider_height,slider_title,toggle_text,cm = configMap,sm = stateMap;
        if(position_type_previous === '' || position_type_previous === position_type){
            return;
        }
        switch (position_type){
            case 'closed':
                animate_time = cm.slider_closed_time;
                slider_height = sm.slider_closed_px;
                slider_title = cm.slider_closed_title;
                toggle_text = '+';
                break;
            case 'opened':
                animate_time = cm.slider_opened_time;
                slider_height = sm.slider_opened_px;
                slider_title = cm.slider_opened_title;
                toggle_text = '=';
                break;
            case 'hidden':
                animate_time = cm.slider_closed_time;
                slider_height = 0;
                slider_title = '';
                toggle_text = '';
                break;
            default : return false;break;
        }

        stateMap.position_type = '';

        jqueryMap.$slider.animate({
            height:slider_height
        },animate_time,function(){
            jqueryMap.$toggle.attr("title",slider_title)
                .text(toggle_text);
            stateMap.position_type = position_type;
            if(callback){
                callback(jqueryMap.$slider);
            }
        });

        return true;
    };
    configModule = function(input_map){
        spa.util.setConfigMap({
            input_map : input_map,
            settable_map : configMap.settable,
            config_map : configMap
        })
    };
    initModule = function($container){
        $container.append (configMap.main_html);
        stateMap.$container = $container;
        setJqueryMap();
        setSizerSize();

        jqueryMap.$toggle.click(onClickToggle);
    };

    return {
        initModule : initModule,
        configModule : configModule,
        setSliderPosition : setSliderPosition,
        handleResize : handleResize,
        removeSlider : removeSlider
    }
})();