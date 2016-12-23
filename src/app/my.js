'use strict';
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
        readyRE = /complete|loaded|interactive/,
        simpleSelectorRE = /^[\w-]*$/; // any words or -   0+


    var version = '1.0.0';

    /*
     *protected function
     *include all privite method
     */
    function isFunction(object) {
        return typeof(object) === 'function'
    }

    function isNumber(val) {
        return !isNaN(parseFloat(val)) && isFinite(val);
    }

    function isType(type) {
        return function(obj) {
            toString.call(obj) === '[object ' + type + ']'
        }
    }

    function extend(target, source, deep) {
        /*eslint-disable*/
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


    //is arrayLike or array
    function isArrayLike(obj) {
        return isArray(obj) || (obj.length && isNumber(obj.length))
    }

    function each(obj, func) {
        var i, key;
        if (isArrayLike(obj)) {
            for (i = 0; obj.length; i++) {
                func(i, obj[i], obj)
            }
        } else {
            for (key in obj) {
                func(key, obj[key], obj)
            }
        }
    }

    //getComputedStyle
    function getStyle(element, attr) {
        if (element.currentStyle) {
            return element.currentStyle[attr];
        } else {
            return window.getComputedStyle(element, null)[attr];
        }
    }

    /*
     *utils function
     */

    var $ = function(selector, context) {
        return my.init(selector, context);
    };


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
            if (selector[0] == '<' && fragmentRE.test(selector)) {
                dom = [selector];
                selector = null
            }
            //console.log(dom,333)
            // If context is exist
            else if (context !== undefined) return $(context).find(selector)
                // If it's a CSS selector, use it to select nodes.
                // context==undefined
            else dom = my.qsa(doc, selector)
        }
        // If a function is given, call it when the DOM is ready
        // ignore `$(document).ready(func)`
        else if (isFunction(selector)) return $(document).ready(selector)

        return my.Z(dom, selector)
    }


    $.fn = {
        constructor: my.Z,
        forEach: array.forEach,
        reduce: array.reduce,
        push: array.push,
        sort: array.sort,
        splice: array.splice,
        indexOf: array.indexOf,

        ready: function(callback) {
            // need to check if document.body exists for IE as that browser reports
            // document ready when it hasn't yet created the body element
            if (readyRE.test(document.readyState) && document.body) callback($)
            else document.addEventListener('DOMContentLoaded', function() { callback($) }, false)
            return this
        },

        css: function(property, value) {
            if (!property) return this;
            var ele = this;
            if (arguments.length === 2) {
                if (typeof(property) === 'string' && typeof(value) === 'string') {
                    for (var i = 0; i < ele.length; i++) {
                        ele[i].style[property] = value;
                    }
                }
            } else {
                if (arguments.length === 1 && typeof(property) === 'object') {
                    for (var i = 0; i < ele.length; i++) {
                        for (var key in property) {
                            ele[i].style[key] = property[key];
                        }
                    }
                } else if (arguments.length === 1 && typeof(property) === 'string') {
                    //can't plain excute 
                    return getStyle(ele[0], property)
                }
            }
            return this;
        },
        get: function(index) {
            var ele = this;
            if (!index || index > ele.length - 1 || index < 1 - ele.length) return ele[0];
            return ele[index]
        },

    };
    //rewrite Z.prototype
    my.Z.prototype = Z.prototype = $.fn;

    window.$ = $;

})(window)
