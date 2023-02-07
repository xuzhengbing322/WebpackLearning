const { tplReplace } = require('../utils')
// getOptions专门处理loader的options
const { getOptions } = require('loader-utils')

// source是tpl文件
function tplLoader (source) {
      source = source.replace(/\s+/g, '')
      // this中包含很多属性，其中log是布尔值。
      const { log } = getOptions(this);  
      // 如果log为真，则输出source的来源
      const _log = log ? `console.log('compiled the file which is from ${ this.resourcePath}')` : '';

      /*tpl-loader返回的是字符串程序，babel-loader将字符串程序转化成javascript程序。然后将
      javascript程序放到入口文件，即app.js文件
      */ 
      //options是tpl()函数的参数。需要将_log转变为字符串，以便babel-loader将字符串转换成js程序
      return `
            export default (options) => {
                  ${ tplReplace.toString() }
                  ${ _log.toString() }
                  return tplReplace('${ source }', options);
            }
      `
}



module.exports = tplLoader;


/**
 * options:{
      name: '徐',
      age: 25,
      career: 'web工程师',
      hobby: '动漫'
}
 * 
 * template:<div><h1>{{name}}</h1><p>{{age}}</p><p>{{career}}</p><p>{{hobby}}</p></div>
 * */ 

// function tpl (options) {
//       // template就是template，即tpl文件中的内容。replaceObject就是options，即tpl函数的参数
//       function tplReplace(template, replaceObject) {
//             // 取出所有{{}}中的内容，子表达式方便取出内容，并将它以key返回出去。
//             return template.replace(/\{\{(.*?)\}\}/g, (node, key) => {
//                   return replaceObject[key]
//             })
//       }

//       return tplReplace(`${source}`, options);
// }