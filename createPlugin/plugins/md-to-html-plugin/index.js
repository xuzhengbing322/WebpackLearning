const { readFileSync } = require('fs')
const { resolve } = require('path')
const { compileHTML } = require('./compiler')

const INNER_MARK = '<!-- inner -->'

class MdToHtmlPlugin {
      // 解构出MdToHtmlPlugin的参数，并让它们成为实例属性
      constructor ({ template, filename}) {

            if (!template) {
                  throw new Error('The config for "template" must be configured');
            }

            this.template = template;
            this.filename = filename ? filename : 'md.html';
      }

      apply (compiler) {
            // 找到编译器中的hooks中的emit。
            compiler.hooks.emit.tap('md-to-html-plugin', (compilation) => {
                  const _assets = compilation.assets;  //_assets就是资源app.js
                  const _mdContent = readFileSync(this.template, 'utf8'); //阅读目录,test.md文件中的内容
                  const _templateHTML = readFileSync(resolve(__dirname, 'template.html'), 'utf8') //读取template文档
                  const _mdContentArr = _mdContent.split('\n');//转成数组
                  const _htmlStr = compileHTML(_mdContentArr); //将数组转换成字符串
                  console.log('_htmlStr',_htmlStr)
                  const _finalHTML = _templateHTML.replace(INNER_MARK, _htmlStr);
                  

                  // 增加一个资源
                  _assets[this.filename] = {
                        source () {
                              return _finalHTML;
                        },
                        size () {
                              return _finalHTML.length;
                        }
                  }
            })    
      }
}

module.exports = MdToHtmlPlugin;