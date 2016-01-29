tmodjs的github:https://github.com/aui/tmodjs/tree/master/test

模板文件先用html编写好

然后执行tmod ./tpl(模板文件目录) --output ./build(输出目录)

执行完成会出现模板.js

引入项目中即可使用

var html = template('case_template', data);
