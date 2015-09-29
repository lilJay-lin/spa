/**
 * Created by linxiaojie on 2015/9/29.
 */
/*
    提供功能模块统一处理方法

 */

spa.util = (function(){
    var makeError, setConfigMap ;

    makeError = function ( name_text, msg_text, data){
        var error = new Error();
        error.name = name_text;
        error.message = msg_text;
        if(data){
            error.data = data;
        }

        return error;
    };

    setConfigMap = function(arg_map){
        var input_map = arg_map.input_map,
            settable_map = arg_map.settable_map,
            config_map = arg_map.config_map;
        for(key_name in input_map){
            if(input_map.hasOwnProperty(key_name)){
                if(settable_map.hasOwnProperty(key_name)){
                    config_map[key_name] = input_map[key_name];
                }else{
                    error = makeError('Bad Input','Setting config key |'+key_name+'| is not supported');

                    throw error;
                }
            }
        }
    };

    return {
        makeError : makeError,
        setConfigMap : setConfigMap
    }
})();