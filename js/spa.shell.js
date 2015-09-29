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
	/*	静态配置*/
		configMap = {
			main_html:String()+ '<div class="spa-shell-head"><div class="spa-shell-head-logo"></div><div class="spa-shell-head-acct"></div><div class="spa-shell-head-search"></div></div><div class="spa-shell-main"><div class="spa-shell-main-nav"></div><div class="spa-shell-main-cnt"></div></div><div class="spa-shell-foot"></div><div class="spa-shell-modal"></div>',
			/*	chat_extend_time:1000,
			 chat_retract_time:300,
			 chat_extend_height:450,
			 chat_retract_height:15,
			 chat_extend_title:'click to retract',
			 chat_retract_title:'click to extend'*/ //移到chat模块
			anchor_schema_map:{
				chat:{open:true,closed:true}
			}
		},
	/*	动态配置*/
		stateMap = {
			$container:null,
			anchor_map:{}
		},
	/*	jquery Dom 对象*/
		jqueryMap = {},
		setJqueryMap ,/*toggleChat,*/onClickChat,onHashChange, initModule,copyAnchorMap;

	copyAnchorMap = function(){
		return $.extend(true, {}, stateMap.anchor_map);
	};
	/*toggleChat = function(do_extend,cb){
		var $chat = jqueryMap.$chat,
			px_chat_height = $chat.height(),
			is_open = configMap.chat_extend_height === px_chat_height,
			is_closed = configMap.chat_retract_height === px_chat_height,
			is_sliding = !is_open&&!is_closed;
			
		if(is_sliding) return false;
		
		if(do_extend){
			$chat.animate(
				{height:configMap.chat_extend_height},
				configMap.chat_extend_time,
				function(){
					jqueryMap.$chat.attr("title",configMap.chat_extend_title);
					stateMap.is_chat_retract = false;
					if(cb){cb(jqueryMap.$chat)}
				}
			);
			return true;
		}
		$chat.animate(
			{height:configMap.chat_retract_height},
			configMap.chat_retract_time,
			function(){
				jqueryMap.$chat.attr("title",configMap.chat_retract_title);
				stateMap.is_chat_retract = true;
				if(cb){cb(jqueryMap.$chat)}
			}
		);
		
		return true;
		
	};*/
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
/*	onClickChat = function(e){
		changeAnchorPart({
			chat:stateMap.is_chat_retract?'open':'closed'
		});
		
		return false;
	};*/
	onHashChange = function(e){
		var anchor_map_previous = copyAnchorMap(),
			anchor_map_proposed,
			_s_chat_previous,_s_chat_proposed,
			s_chat_proposed;
			
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
				case 'open':
				    toggleChat(true);
				    break;
				case 'closed':
					toggleChat(false);
					break;
				default:
					toggleChat(false);
					delete anchor_map_proposed.chat;
					$.uriAnchor.setAnchor(anchor_map_proposed,null,null);
					break;
			}
		}
		
		return false;
	};
	initModule = function($container){
		stateMap.$container = $container;

		$container.html(configMap.main_html);

		setJqueryMap();

		spa.chat.initModule($container);
		
		$.uriAnchor.configModule({
			schema_map:configMap.anchor_schema_map
		});
		
		$(window).on("hashchange",onHashChange).trigger("hashchange");

		/*		添加点击事件*/
		/*		stateMap.is_chat_retract = true;
		 jqueryMap.$chat.attr("title",configMap.chat_retract_title)
		 .on("click",onClickChat);*/ //移到chat模块

		/*		setTimeout(function(){
		 toggleChat(true);
		 },2000);

		 setTimeout(function(){
		 toggleChat(false)
		 },4000)*/
	};

	return {initModule:initModule};
})();
