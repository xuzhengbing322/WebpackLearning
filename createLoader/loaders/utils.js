function tplReplace(template, replaceObject) {
      // 取出所有{{}}中的内容，子表达式方便取出内容，并将它以key返回出去。
      return template.replace(/\{\{(.*?)\}\}/g, (node, key) => {
            return replaceObject[key]
      })
}

module.exports = {
      tplReplace
}