/*
 *  使用全局命名空间spa
 * 1.渲染功能容器：main_html
 * 2.管理功能容器：
 * 滑块：
 *  1）开发人员可配置速度和高度
 *  2）创建单个方法来展开或收起滑块
 *  3）避免出现竞争条件，即滑动可能同时展开和收起
 *  4）开发人员可传入回调函数，在滑块动画结束时调用
 *  5）创建测试代码，以便确保滑块功能正常
 * 
 * 3.管理应用状态
 *  1）支持浏览器历史控件
 *  2）应用表现良好
 *  uri变化触发界面变化
 */
spa.shell = (function(){
	var
		configMap = {
			main_html:String()+ '<div class="spa-shell-head"><div class="spa-shell-head-logo"></div><div class="spa-shell-head-acct"></div><div class="spa-shell-head-search"></div></div><div class="spa-shell-main"><div class="spa-shell-main-nav"></div><div class="spa-shell-main-cnt"></div></div><div class="spa-shell-foot"></div><div class="spa-shell-modal"></div>',
			anchor_schema_map:{
				chat:{opened:true,closed:true}
			}
		},
		stateMap = {
			$container:null,
			anchor_map:{}
		},
		jqueryMap = {}, setJqueryMap , setChatAnchor, onHashChange,
		initModule,copyAnchorMap, onResize;
	setJqueryMap = function (){
		jqueryMap.$container = stateMap.$container;
	};
	setChatAnchor = function (position_type){
		return $.uriAnchor.setAnchor({chat : position_type })
	};
	copyAnchorMap = function(){
		return $.extend(true, {}, stateMap.anchor_map);
	};
	changeAnchorPart = function(arg_map){
	var 
			anchor_map_previous = copyAnchorMap(),
			bool_return = true;
/*				anchor_map_revise = $.extend(true, {}, arg_map);
			bool_return = true,
			key_name , key_name_dep;
		KEYVAL:	
		for(key_name in arg_map){
			if(arg_map.hasOwnProperty(key_name)){
				
				if(key_name.indexOf("_") == 0) {
					continue KEYVAL;
				}
				
				if(anchor_map_previous.hasOwnProperty(key_name)){
					key_name_dep = "_"+key_name;
					if(arg_map[key_name_dep]){
						
					}
				}
				
			}
		}*/
		
		try{
			$.uriAnchor.setAnchor(arg_map);
		}catch(e){
			$.uriAnchor.setAnchor(anchor_map_previous);
			bool_return = false;
		}
		return bool_return;
	};
	onHashChange = function(e){
		var anchor_map_previous = copyAnchorMap(),
			anchor_map_proposed,_s_chat_previous,_s_chat_proposed, s_chat_proposed,
			is_ok = true;
			
		try{
			anchor_map_proposed = $.uriAnchor.makeAnchorMap();
		}catch(e){
			$.uriAnchor.setAnchor(anchor_map_previous,null,null);
			return false;
		}
		
		stateMap.anchor_map = anchor_map_proposed;
		
		_s_chat_previous = anchor_map_previous._s_chat;
		_s_chat_proposed = anchor_map_proposed._s_chat;
		
		if(!anchor_map_previous || _s_chat_previous !== _s_chat_proposed){
			s_chat_proposed = anchor_map_proposed.chat;
			switch(s_chat_proposed){
				case 'opened':
					is_ok = spa.chat.setSliderPosition('opened');
				    break;
				case 'closed':
					is_ok = spa.chat.setSliderPosition('closed');
					break;
				default:
					spa.chat.setSliderPosition('closed');
					delete anchor_map_proposed.chat;
					$.uriAnchor.setAnchor(anchor_map_proposed,null,true);
					break;
			}
		}

		if(!is_ok){
			if(anchor_map_previous){
				$.uriAnchor.setAnchor(anchor_map_previous, null ,true);
				stateMap.anchor_map = anchor_map_previous;
			}else{
				delete anchor_map_proposed.chat;
				$.uriAnchor.setAnchor(anchor_map_proposed,null,true);
				stateMap.anchor_map = anchor_map_proposed;
			}
		}
		return false;
	};
	onResize = function(){
		spa.chat.handleResize();
	};
	initModule = function($container){
		stateMap.$container = $container;

		$container.html(configMap.main_html);

		setJqueryMap();

		$.uriAnchor.configModule({
			schema_map:configMap.anchor_schema_map
		});

		spa.chat.configModule({
			set_chat_anchor : setChatAnchor
		});

		spa.chat.initModule($container);

		
		$(window).on("resize",onResize)
			.on("hashchange",onHashChange)
			.trigger("hashchange");

		/*		添加点击事件*/
/*		 stateMap.is_chat_retract = true;
		 jqueryMap.$chat.attr("title",configMap.chat_retract_title)
		 .on("click",onClickChat);*/

		/*		setTimeout(function(){
		 toggleChat(true);
		 },2000);

		 setTimeout(function(){
		 toggleChat(false)
		 },4000)*/
	};

	return {initModule:initModule};
})();
