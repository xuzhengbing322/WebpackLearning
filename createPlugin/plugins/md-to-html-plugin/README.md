# 需要的东西
1、markdown文件。
2、template模版 HTML
3、markdown -> HTML标签
4、HTML标签替换掉template内部的<!-- innner>，这样就形成了完整的HTML文件
5、webpack打包

# 功能
      将md文件解析成html标签，然后将html标签放到html文件，即模版中。常用的方法就是用md文件解析后的标签
替换模版中的注释，借助正则。