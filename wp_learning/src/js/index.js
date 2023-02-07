import {
    Calculator
} from '../modules/Calculator'

;
((doc) => {
    const oCalculator = document.getElementsByClassName('J_calculator')[0];

    const init = () => {
        // 将oCalculator作为参数传递给Calculator构造函数的构造器
        new Calculator(oCalculator).init()
    }

    init();
})(document)