"use strict";

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND", f);
            }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
})({ 1: [function (require, module, exports) {
        var ERROR_CSS = "background-color: #f44336; color: #B2DFDB;";
        var WARN_CSS = "background-color: #FDD835; color: #B2DFDB;";
        var INFO_CSS = "background-color: #BDBDBD; color: #B2DFDB;";
        var DEBUG_CSS = "background-color: #9575CD; color: #ECEFF1;";
        var CALLER_CSS = "background-color: #9575CD; color: #ECEFF1;";

        var D = function D(consoleMock) {
            this.console = consoleMock || console;
        };

        D.prototype.printStyledArgs = function (passedArgs, css, fn) {

            for (var i = 0; i < passedArgs.length; i++) {
                var arg = passedArgs[i];

                typeof arg == "string" ? this.console[fn || 'log']("%c" + arg, css) : this.console[fn || 'log'](arg);
            }
        };

        D.prototype.d = function () {
            this.printStyledArgs(arguments, DEBUG_CSS, 'debug');
        };

        D.prototype.w = function () {
            this.printStyledArgs(arguments, WARN_CSS, 'warn');
        };

        D.prototype.e = function () {
            this.printStyledArgs(arguments, ERROR_CSS, 'error');
        };

        D.prototype.i = function () {
            this.printStyledArgs(arguments, INFO_CSS, 'info');
        };

        D.prototype.functionsIn = function (object) {
            this.i("Functions in:", object);
            for (var k in object) {
                if (k instanceof Function) this.i(k);
            }
        };

        D.prototype.membersIn = function (object) {
            this.console.info("Members in:", object);
            for (var k in object) {
                if (!k instanceof Function) this.i(k);
            }
        };

        D.prototype.useAsConsole = function (consoleMock) {
            this.console = consoleMock;
        };

        module.exports = new D();
    }, {}], 2: [function (require, module, exports) {
        var D = require('./D.js');
    }, { "./D.js": 1 }] }, {}, [2]);
//# sourceMappingURL=main.js.map
