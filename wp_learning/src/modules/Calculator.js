import compute  from "../lib/js/compute";
import { trimSpace, digitalize } from "../utils/tools"

/*
实例对象获取节点。
javascript只能继承一个父类，因此把计算工具作为父类就有些牵强。因此，使用装饰器。
*/ 
// @compute
class Calculator extends compute{
    // constructor构造器的参数就是实例化构造函数时传的参数
    constructor(el) {
        // 继承构造函数，就要继承它的构造器
        super()
        this.name = 'Calculator';
        this.oResult = el.getElementsByClassName('result')[0];
        this.oInputs = el.getElementsByClassName('num-input');
        this.oBtnGroup = el.getElementsByClassName('button-group')[0];
    }

    // 初始化类的函数
    init() {
        // 执行事件处理函数，让事件绑定函数生效
        this.bindEvent()
    }
    // 事件处理
    bindEvent() {
        /*将点击事件添加到this实例对象中，然而事件处理函数addEventLister()总是绑定被事件处理的元素，
        即oBtnGroup。因此需要使用bind()改变this的指向。
        */
        this.oBtnGroup.addEventListener('click', this.onBtnClick.bind(this), false)
    }

    onBtnClick(ev) {
        const e = ev || window.event,
            tar = e.target || e.srcElement,
            tagName = tar.tagName.toLowerCase();


        if (tagName === 'button') {
            const method = tar.getAttribute('data-method'),
                fVal = digitalize(trimSpace(this.oInputs[0].value)),
                sVal = digitalize(trimSpace(this.oInputs[1].value));
            
            //Calculator继承了Compute，所以this可以访问Compute中的方法 
            this.setResult(method, fVal, sVal)
        };
    }
    setResult(method, fVal, sVal) {
        this.oResult.innerText = this[method](fVal, sVal)
    }
};

export {
    Calculator
}