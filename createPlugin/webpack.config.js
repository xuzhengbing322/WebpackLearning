const {
      resolve
} = require('path');
const MdToHtmlPlugin = require('./plugins/md-to-html-plugin');

module.exports = {
      mode: 'development',
      entry: resolve(__dirname, 'src/app.js'),
      output: {
            path: resolve(__dirname, 'dist'),
            filename: 'app.js'
      },
      devtool: 'source-map',
      plugins: [
            // 插件一般都是类
            new MdToHtmlPlugin({
                  // 配置。template：找到写好的md文件。filename：解析后的文件名。然后打包到输出文件dist中
                  template: resolve(__dirname, 'test.md'),
                  filename: 'test.html'
            }) 
      ],
      devServer: {
            port: 3333
      }
}