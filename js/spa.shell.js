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
		},
	/*	动态配置*/
		stateMap = {
			$container:null,
			//is_chat_retract:true
		},
	/*	jquery Dom 对象*/
		jqueryMap = {},
		setJqueryMap ,toggleChat,onClickChat, initModule;

	setJqueryMap = function(){
		var $container = stateMap.$container;
		jqueryMap = {
			$container:$container,
			$chat:$container.find(".spa-shell-chat")
		}
	};
	/*	toggleChat = function(do_extend,cb){
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

	 };
	 onClickChat = function(e){
	 console.log(stateMap.is_chat_retract)
	 toggleChat(stateMap.is_chat_retract);
	 return false;
	 };*/
	initModule = function($container){
		stateMap.$container = $container;

		$container.html(configMap.main_html);

		setJqueryMap();

		spa.chat.initModule($container);

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
