import tpl from './info.tpl';

const oApp = document.querySelector("#app");

// const info = tpl({
//       name: '徐',
//       age: 25,
//       career: 'web工程师',
//       hobby: '动漫'
// });

//tpl文件经过tpl-loader/babel-loader处理后，返回的是tpl()函数，函数执行结果是HTML字符串
oApp.innerHTML = tpl({
      name: '徐',
      age: 25,
      career: 'web工程师',
      hobby: '动漫'
})