
/*
 * 模块模式，定义全局命名空间spa
 */

var spa = (function(){
	var initModule = function($container){
		spa.shell.initModule($container)		
	};
	
	return {initModule:initModule}
})();
