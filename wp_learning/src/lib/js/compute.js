// 类的写法
export default class Compute {
    plus(a, b) {
        return a + b;
    } 

    minus(a, b) {
        return a - b
    };
    mul(a, b){
        return a * b
    };
    div(a, b){
        return a / b
    } 
}

// 装饰器。target：谁用这个装饰器，target就是谁
// export default (target) => {
//     // 在原型上添加方法，因此this实例对象可以访问这些方法。
//     target.prototype.plus = function(a, b) {
//         return a + b;
//     }
//     target.prototype.minus = function(a, b) {
//         return a - b
//     };
//     target.prototype.mul = function(a, b) {
//         return a * b
//     };
//     target.prototype.div = function(a, b) {
//         return a / b
//     }
// }