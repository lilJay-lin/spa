####
#单页web应用：javascript 从前端到后端 随书练习
[git项目](https://github.com/lilJay-lin/spa.git)
***
#目录结构和开发规范

	spa
		+--css
		|	+--spa.css
		|	+--spa.shell.css
		+--js
		|	+--jq
		|	|	+--jq.min.js
		|	|	+--jq.uriAnchor.js
		|	+--spa.js
		|	+--spa.shell.js
		+--spa.html


#开发shell
>**shell** 负责应用级的任务，像URI路由管理和应用布局
##shell负责以下功能
1.渲染和管理功能容器
2.管理应用状态
3.协调功能模块
3.1 功能模块化 *chat*

##使用闭包模式暴露接口
`var spa.shell = (function(){
	var initModule  = function(){
		...
	}
	return {
		initModule:initModule
	}
})()`
