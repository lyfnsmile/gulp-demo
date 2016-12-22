;
(function(window, undefined) {
    var my = {},
        array = [],
        doc = window.document,
        proto = Object.prototype,
        isArray = Array.isArray,
        slice = array.slice,
        concat = array.concat,
        indexOf = array.indexOf,
        filter = array.filter,
        push = array.push,
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        fnToString = hasOwn.toString,
        ObjectFunctionString = fnToString.call(Object),
        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        rootNodeRE = /^(?:body|html)$/i,
        capitalRE = /([A-Z])/g,
        simpleSelectorRE = /^[\w-]*$/; // any words or -   0+

    var version = "1.0.0";

    /*
     *protected function
     */
    function isFunction(object) {
        return typeof(object) === 'function'
    }

    function isType(type) {
        return function(obj) {
            toString.call(obj) === '[object ' + type + ']'
        }
    }

    function extend(target, source, deep) {
        for (key in source) {
            if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                    target[key] = {}
                if (isArray(source[key]) && !isArray(target[key]))
                    target[key] = []
                extend(target[key], source[key], deep)
            } else {
                target[key] = source[key];
            }
        }
        return target
    }

    /*
     *utils function
     */

    $.each = function(array, func) {

    }

    /*
     * css selector
     * document.querySelectorAll
     */
    my.qsa = function(element, selector) {
        var result,
            maybeID = selector[0] == '#', // id selector
            maybeClass = !maybeID && selector[0] == '.', // class selector

            // $('#myId p') ensure this case
            nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
            isSimple = simpleSelectorRE.test(nameOnly) // is single selector
        return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
            ((result = element.getElementById(nameOnly)) ? [result] : []) : //rongcuochuli
            //nodeType==1  element元素
            //nodeType==2  attr
            //nodeType==3 文本 Text
            //nodeType==9  document
            //nodeType==11 DocumentFragment 
            (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
            slice.call(
                isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
                maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
                element.getElementsByTagName(selector) : // Or a tag
                element.querySelectorAll(selector) // Or it's not simple, and we need to query all
            )
    };

    /*
     * check is instance my.Z
     */

    my.isZ = function(object) {
        return object instanceof my.Z
    }

    function Z(dom, selector) {
        var i, len = dom ? dom.length : 0
        for (i = 0; i < len; i++) this[i] = dom[i]
        this.length = len
        this.selector = selector || doc
    }

    my.Z = function(dom, selector) {
        return new Z(dom, selector)
    }

    my.init = function(selector, context) {
        var dom;
        if (!selector) return my.Z();
        else if (my.isZ(selector)) return selector
        else if (typeof selector == 'string') {
            selector = selector.trim()
                //html fragment
            if (selector[0] == '<' && fragmentRE.test(selector))
                dom = $(document.createElement(RegExp.$1)), selector = null
                // If context is exist
            else if (context !== undefined) return $(context).find(selector)
                // If it's a CSS selector, use it to select nodes.
                // context==undefined
            else dom = my.qsa(doc, selector)
        }
        // If a function is given, call it when the DOM is ready
        // ignore `$(document).ready(func)`
        else if (isFunction(selector)) return $(document).ready(selector)
            // If a Zepto collection is given, just return it

        return my.Z(dom, selector)
    }


    $ = function(selector, context) {
        return my.init(selector, context);
    };

    $.fn = {
        constructor: this,

    };

    Z.prototype = $.fn = $.prorotype;

    window.$ = $;

})(window)
