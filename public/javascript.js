var strings = {
    top_headline: "Build apps, not huge pieces of architecture.",
    top_signup_message: "Want to jump right in?"
};

(function(e, t) {
    var n, r, i = typeof t, o = e.location, a = e.document, s = a.documentElement, l = e.jQuery, u = e.$, c = {}, p = [], f = "1.10.2", d = p.concat, h = p.push, g = p.slice, m = p.indexOf, y = c.toString, v = c.hasOwnProperty, b = f.trim, x = function(e, t) {
        return new x.fn.init(e, t, r);
    }, w = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, T = /\S+/g, C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, k = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, E = /^[\],:{}\s]*$/, S = /(?:^|:|,)(?:\s*\[)+/g, A = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, j = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, D = /^-ms-/, L = /-([\da-z])/gi, H = function(e, t) {
        return t.toUpperCase();
    }, q = function(e) {
        (a.addEventListener || "load" === e.type || "complete" === a.readyState) && (_(), 
        x.ready());
    }, _ = function() {
        a.addEventListener ? (a.removeEventListener("DOMContentLoaded", q, !1), e.removeEventListener("load", q, !1)) : (a.detachEvent("onreadystatechange", q), 
        e.detachEvent("onload", q));
    };
    x.fn = x.prototype = {
        jquery: f,
        constructor: x,
        init: function(e, n, r) {
            var i, o;
            if (!e) return this;
            if ("string" == typeof e) {
                if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [ null, e, null ] : N.exec(e), 
                !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                if (i[1]) {
                    if (n = n instanceof x ? n[0] : n, x.merge(this, x.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : a, !0)), 
                    k.test(i[1]) && x.isPlainObject(n)) for (i in n) x.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                    return this;
                }
                if (o = a.getElementById(i[2]), o && o.parentNode) {
                    if (o.id !== i[2]) return r.find(e);
                    this.length = 1, this[0] = o;
                }
                return this.context = a, this.selector = e, this;
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, 
            this.context = e.context), x.makeArray(e, this));
        },
        selector: "",
        length: 0,
        toArray: function() {
            return g.call(this);
        },
        get: function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e];
        },
        pushStack: function(e) {
            var t = x.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t;
        },
        each: function(e, t) {
            return x.each(this, e, t);
        },
        ready: function(e) {
            return x.ready.promise().done(e), this;
        },
        slice: function() {
            return this.pushStack(g.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [ this[n] ] : []);
        },
        map: function(e) {
            return this.pushStack(x.map(this, function(t, n) {
                return e.call(t, n, t);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: h,
        sort: [].sort,
        splice: [].splice
    }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function() {
        var e, n, r, i, o, a, s = arguments[0] || {}, l = 1, u = arguments.length, c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || x.isFunction(s) || (s = {}), 
        u === l && (s = this, --l); u > l; l++) if (null != (o = arguments[l])) for (i in o) e = s[i], 
        r = o[i], s !== r && (c && r && (x.isPlainObject(r) || (n = x.isArray(r))) ? (n ? (n = !1, 
        a = e && x.isArray(e) ? e : []) : a = e && x.isPlainObject(e) ? e : {}, s[i] = x.extend(c, a, r)) : r !== t && (s[i] = r));
        return s;
    }, x.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
        noConflict: function(t) {
            return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = l), x;
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? x.readyWait++ : x.ready(!0);
        },
        ready: function(e) {
            if (e === !0 ? !--x.readyWait : !x.isReady) {
                if (!a.body) return setTimeout(x.ready);
                x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(a, [ x ]), x.fn.trigger && x(a).trigger("ready").off("ready"));
            }
        },
        isFunction: function(e) {
            return "function" === x.type(e);
        },
        isArray: Array.isArray || function(e) {
            return "array" === x.type(e);
        },
        isWindow: function(e) {
            return null != e && e == e.window;
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e);
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? c[y.call(e)] || "object" : typeof e;
        },
        isPlainObject: function(e) {
            var n;
            if (!e || "object" !== x.type(e) || e.nodeType || x.isWindow(e)) return !1;
            try {
                if (e.constructor && !v.call(e, "constructor") && !v.call(e.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (r) {
                return !1;
            }
            if (x.support.ownLast) for (n in e) return v.call(e, n);
            for (n in e) ;
            return n === t || v.call(e, n);
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0;
        },
        error: function(e) {
            throw Error(e);
        },
        parseHTML: function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || a;
            var r = k.exec(e), i = !n && [];
            return r ? [ t.createElement(r[1]) ] : (r = x.buildFragment([ e ], t, i), i && x(i).remove(), 
            x.merge([], r.childNodes));
        },
        parseJSON: function(n) {
            return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = x.trim(n), 
            n && E.test(n.replace(A, "@").replace(j, "]").replace(S, ""))) ? Function("return " + n)() : (x.error("Invalid JSON: " + n), 
            t);
        },
        parseXML: function(n) {
            var r, i;
            if (!n || "string" != typeof n) return null;
            try {
                e.DOMParser ? (i = new DOMParser(), r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), 
                r.async = "false", r.loadXML(n));
            } catch (o) {
                r = t;
            }
            return r && r.documentElement && !r.getElementsByTagName("parsererror").length || x.error("Invalid XML: " + n), 
            r;
        },
        noop: function() {},
        globalEval: function(t) {
            t && x.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t);
            })(t);
        },
        camelCase: function(e) {
            return e.replace(D, "ms-").replace(L, H);
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function(e, t, n) {
            var r, i = 0, o = e.length, a = M(e);
            if (n) {
                if (a) {
                    for (;o > i; i++) if (r = t.apply(e[i], n), r === !1) break;
                } else for (i in e) if (r = t.apply(e[i], n), r === !1) break;
            } else if (a) {
                for (;o > i; i++) if (r = t.call(e[i], i, e[i]), r === !1) break;
            } else for (i in e) if (r = t.call(e[i], i, e[i]), r === !1) break;
            return e;
        },
        trim: b && !b.call("﻿ ") ? function(e) {
            return null == e ? "" : b.call(e);
        } : function(e) {
            return null == e ? "" : (e + "").replace(C, "");
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (M(Object(e)) ? x.merge(n, "string" == typeof e ? [ e ] : e) : h.call(n, e)), 
            n;
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (m) return m.call(t, e, n);
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n;
            }
            return -1;
        },
        merge: function(e, n) {
            var r = n.length, i = e.length, o = 0;
            if ("number" == typeof r) for (;r > o; o++) e[i++] = n[o]; else while (n[o] !== t) e[i++] = n[o++];
            return e.length = i, e;
        },
        grep: function(e, t, n) {
            var r, i = [], o = 0, a = e.length;
            for (n = !!n; a > o; o++) r = !!t(e[o], o), n !== r && i.push(e[o]);
            return i;
        },
        map: function(e, t, n) {
            var r, i = 0, o = e.length, a = M(e), s = [];
            if (a) for (;o > i; i++) r = t(e[i], i, n), null != r && (s[s.length] = r); else for (i in e) r = t(e[i], i, n), 
            null != r && (s[s.length] = r);
            return d.apply([], s);
        },
        guid: 1,
        proxy: function(e, n) {
            var r, i, o;
            return "string" == typeof n && (o = e[n], n = e, e = o), x.isFunction(e) ? (r = g.call(arguments, 2), 
            i = function() {
                return e.apply(n || this, r.concat(g.call(arguments)));
            }, i.guid = e.guid = e.guid || x.guid++, i) : t;
        },
        access: function(e, n, r, i, o, a, s) {
            var l = 0, u = e.length, c = null == r;
            if ("object" === x.type(r)) {
                o = !0;
                for (l in r) x.access(e, n, l, r[l], !0, a, s);
            } else if (i !== t && (o = !0, x.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), 
            n = null) : (c = n, n = function(e, t, n) {
                return c.call(x(e), n);
            })), n)) for (;u > l; l++) n(e[l], r, s ? i : i.call(e[l], l, n(e[l], r)));
            return o ? e : c ? n.call(e) : u ? n(e[0], r) : a;
        },
        now: function() {
            return new Date().getTime();
        },
        swap: function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = a[o];
            return i;
        }
    }), x.ready.promise = function(t) {
        if (!n) if (n = x.Deferred(), "complete" === a.readyState) setTimeout(x.ready); else if (a.addEventListener) a.addEventListener("DOMContentLoaded", q, !1), 
        e.addEventListener("load", q, !1); else {
            a.attachEvent("onreadystatechange", q), e.attachEvent("onload", q);
            var r = !1;
            try {
                r = null == e.frameElement && a.documentElement;
            } catch (i) {}
            r && r.doScroll && function o() {
                if (!x.isReady) {
                    try {
                        r.doScroll("left");
                    } catch (e) {
                        return setTimeout(o, 50);
                    }
                    _(), x.ready();
                }
            }();
        }
        return n.promise(t);
    }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        c["[object " + t + "]"] = t.toLowerCase();
    });
    function M(e) {
        var t = e.length, n = x.type(e);
        return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e);
    }
    r = x(a), function(e, t) {
        var n, r, i, o, a, s, l, u, c, p, f, d, h, g, m, y, v, b = "sizzle" + -new Date(), w = e.document, T = 0, C = 0, N = st(), k = st(), E = st(), S = !1, A = function(e, t) {
            return e === t ? (S = !0, 0) : 0;
        }, j = typeof t, D = 1 << 31, L = {}.hasOwnProperty, H = [], q = H.pop, _ = H.push, M = H.push, O = H.slice, F = H.indexOf || function(e) {
            var t = 0, n = this.length;
            for (;n > t; t++) if (this[t] === e) return t;
            return -1;
        }, B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", P = "[\\x20\\t\\r\\n\\f]", R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", W = R.replace("w", "w#"), $ = "\\[" + P + "*(" + R + ")" + P + "*(?:([*^$|!~]?=)" + P + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + W + ")|)|)" + P + "*\\]", I = ":(" + R + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + $.replace(3, 8) + ")*)|.*)\\)|)", z = RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$", "g"), X = RegExp("^" + P + "*," + P + "*"), U = RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"), V = RegExp(P + "*[+~]"), Y = RegExp("=" + P + "*([^\\]'\"]*)" + P + "*\\]", "g"), J = RegExp(I), G = RegExp("^" + W + "$"), Q = {
            ID: RegExp("^#(" + R + ")"),
            CLASS: RegExp("^\\.(" + R + ")"),
            TAG: RegExp("^(" + R.replace("w", "w*") + ")"),
            ATTR: RegExp("^" + $),
            PSEUDO: RegExp("^" + I),
            CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)", "i"),
            bool: RegExp("^(?:" + B + ")$", "i"),
            needsContext: RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)", "i")
        }, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, et = /^(?:input|select|textarea|button)$/i, tt = /^h\d$/i, nt = /'|\\/g, rt = RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)", "ig"), it = function(e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r);
        };
        try {
            M.apply(H = O.call(w.childNodes), w.childNodes), H[w.childNodes.length].nodeType;
        } catch (ot) {
            M = {
                apply: H.length ? function(e, t) {
                    _.apply(e, O.call(t));
                } : function(e, t) {
                    var n = e.length, r = 0;
                    while (e[n++] = t[r++]) ;
                    e.length = n - 1;
                }
            };
        }
        function at(e, t, n, i) {
            var o, a, s, l, u, c, d, m, y, x;
            if ((t ? t.ownerDocument || t : w) !== f && p(t), t = t || f, n = n || [], !e || "string" != typeof e) return n;
            if (1 !== (l = t.nodeType) && 9 !== l) return [];
            if (h && !i) {
                if (o = Z.exec(e)) if (s = o[1]) {
                    if (9 === l) {
                        if (a = t.getElementById(s), !a || !a.parentNode) return n;
                        if (a.id === s) return n.push(a), n;
                    } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(s)) && v(t, a) && a.id === s) return n.push(a), 
                    n;
                } else {
                    if (o[2]) return M.apply(n, t.getElementsByTagName(e)), n;
                    if ((s = o[3]) && r.getElementsByClassName && t.getElementsByClassName) return M.apply(n, t.getElementsByClassName(s)), 
                    n;
                }
                if (r.qsa && (!g || !g.test(e))) {
                    if (m = d = b, y = t, x = 9 === l && e, 1 === l && "object" !== t.nodeName.toLowerCase()) {
                        c = mt(e), (d = t.getAttribute("id")) ? m = d.replace(nt, "\\$&") : t.setAttribute("id", m), 
                        m = "[id='" + m + "'] ", u = c.length;
                        while (u--) c[u] = m + yt(c[u]);
                        y = V.test(e) && t.parentNode || t, x = c.join(",");
                    }
                    if (x) try {
                        return M.apply(n, y.querySelectorAll(x)), n;
                    } catch (T) {} finally {
                        d || t.removeAttribute("id");
                    }
                }
            }
            return kt(e.replace(z, "$1"), t, n, i);
        }
        function st() {
            var e = [];
            function t(n, r) {
                return e.push(n += " ") > o.cacheLength && delete t[e.shift()], t[n] = r;
            }
            return t;
        }
        function lt(e) {
            return e[b] = !0, e;
        }
        function ut(e) {
            var t = f.createElement("div");
            try {
                return !!e(t);
            } catch (n) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null;
            }
        }
        function ct(e, t) {
            var n = e.split("|"), r = e.length;
            while (r--) o.attrHandle[n[r]] = t;
        }
        function pt(e, t) {
            var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D);
            if (r) return r;
            if (n) while (n = n.nextSibling) if (n === t) return -1;
            return e ? 1 : -1;
        }
        function ft(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e;
            };
        }
        function dt(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e;
            };
        }
        function ht(e) {
            return lt(function(t) {
                return t = +t, lt(function(n, r) {
                    var i, o = e([], n.length, t), a = o.length;
                    while (a--) n[i = o[a]] && (n[i] = !(r[i] = n[i]));
                });
            });
        }
        s = at.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1;
        }, r = at.support = {}, p = at.setDocument = function(e) {
            var n = e ? e.ownerDocument || e : w, i = n.defaultView;
            return n !== f && 9 === n.nodeType && n.documentElement ? (f = n, d = n.documentElement, 
            h = !s(n), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function() {
                p();
            }), r.attributes = ut(function(e) {
                return e.className = "i", !e.getAttribute("className");
            }), r.getElementsByTagName = ut(function(e) {
                return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length;
            }), r.getElementsByClassName = ut(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 
                2 === e.getElementsByClassName("i").length;
            }), r.getById = ut(function(e) {
                return d.appendChild(e).id = b, !n.getElementsByName || !n.getElementsByName(b).length;
            }), r.getById ? (o.find.ID = function(e, t) {
                if (typeof t.getElementById !== j && h) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [ n ] : [];
                }
            }, o.filter.ID = function(e) {
                var t = e.replace(rt, it);
                return function(e) {
                    return e.getAttribute("id") === t;
                };
            }) : (delete o.find.ID, o.filter.ID = function(e) {
                var t = e.replace(rt, it);
                return function(e) {
                    var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id");
                    return n && n.value === t;
                };
            }), o.find.TAG = r.getElementsByTagName ? function(e, n) {
                return typeof n.getElementsByTagName !== j ? n.getElementsByTagName(e) : t;
            } : function(e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    while (n = o[i++]) 1 === n.nodeType && r.push(n);
                    return r;
                }
                return o;
            }, o.find.CLASS = r.getElementsByClassName && function(e, n) {
                return typeof n.getElementsByClassName !== j && h ? n.getElementsByClassName(e) : t;
            }, m = [], g = [], (r.qsa = K.test(n.querySelectorAll)) && (ut(function(e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || g.push("\\[" + P + "*(?:value|" + B + ")"), 
                e.querySelectorAll(":checked").length || g.push(":checked");
            }), ut(function(e) {
                var t = n.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && g.push("[*^$]=" + P + "*(?:''|\"\")"), 
                e.querySelectorAll(":enabled").length || g.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), 
                g.push(",.*:");
            })), (r.matchesSelector = K.test(y = d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ut(function(e) {
                r.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), m.push("!=", I);
            }), g = g.length && RegExp(g.join("|")), m = m.length && RegExp(m.join("|")), v = K.test(d.contains) || d.compareDocumentPosition ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
            } : function(e, t) {
                if (t) while (t = t.parentNode) if (t === e) return !0;
                return !1;
            }, A = d.compareDocumentPosition ? function(e, t) {
                if (e === t) return S = !0, 0;
                var i = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t);
                return i ? 1 & i || !r.sortDetached && t.compareDocumentPosition(e) === i ? e === n || v(w, e) ? -1 : t === n || v(w, t) ? 1 : c ? F.call(c, e) - F.call(c, t) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1;
            } : function(e, t) {
                var r, i = 0, o = e.parentNode, a = t.parentNode, s = [ e ], l = [ t ];
                if (e === t) return S = !0, 0;
                if (!o || !a) return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : c ? F.call(c, e) - F.call(c, t) : 0;
                if (o === a) return pt(e, t);
                r = e;
                while (r = r.parentNode) s.unshift(r);
                r = t;
                while (r = r.parentNode) l.unshift(r);
                while (s[i] === l[i]) i++;
                return i ? pt(s[i], l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0;
            }, n) : f;
        }, at.matches = function(e, t) {
            return at(e, null, null, t);
        }, at.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== f && p(e), t = t.replace(Y, "='$1']"), !(!r.matchesSelector || !h || m && m.test(t) || g && g.test(t))) try {
                var n = y.call(e, t);
                if (n || r.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
            } catch (i) {}
            return at(t, f, null, [ e ]).length > 0;
        }, at.contains = function(e, t) {
            return (e.ownerDocument || e) !== f && p(e), v(e, t);
        }, at.attr = function(e, n) {
            (e.ownerDocument || e) !== f && p(e);
            var i = o.attrHandle[n.toLowerCase()], a = i && L.call(o.attrHandle, n.toLowerCase()) ? i(e, n, !h) : t;
            return a === t ? r.attributes || !h ? e.getAttribute(n) : (a = e.getAttributeNode(n)) && a.specified ? a.value : null : a;
        }, at.error = function(e) {
            throw Error("Syntax error, unrecognized expression: " + e);
        }, at.uniqueSort = function(e) {
            var t, n = [], i = 0, o = 0;
            if (S = !r.detectDuplicates, c = !r.sortStable && e.slice(0), e.sort(A), S) {
                while (t = e[o++]) t === e[o] && (i = n.push(o));
                while (i--) e.splice(n[i], 1);
            }
            return e;
        }, a = at.getText = function(e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += a(e);
                } else if (3 === i || 4 === i) return e.nodeValue;
            } else for (;t = e[r]; r++) n += a(t);
            return n;
        }, o = at.selectors = {
            cacheLength: 50,
            createPseudo: lt,
            match: Q,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(rt, it), e[3] = (e[4] || e[5] || "").replace(rt, it), 
                    "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || at.error(e[0]), 
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && at.error(e[0]), 
                    e;
                },
                PSEUDO: function(e) {
                    var n, r = !e[5] && e[2];
                    return Q.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && J.test(r) && (n = mt(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), 
                    e[2] = r.slice(0, n)), e.slice(0, 3));
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(rt, it).toLowerCase();
                    return "*" === e ? function() {
                        return !0;
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
                },
                CLASS: function(e) {
                    var t = N[e + " "];
                    return t || (t = RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && N(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "");
                    });
                },
                ATTR: function(e, t, n) {
                    return function(r) {
                        var i = at.attr(r, e);
                        return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0;
                    };
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode;
                    } : function(t, n, l) {
                        var u, c, p, f, d, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !l && !s;
                        if (m) {
                            if (o) {
                                while (g) {
                                    p = t;
                                    while (p = p[g]) if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                    h = g = "only" === e && !h && "nextSibling";
                                }
                                return !0;
                            }
                            if (h = [ a ? m.firstChild : m.lastChild ], a && v) {
                                c = m[b] || (m[b] = {}), u = c[e] || [], d = u[0] === T && u[1], f = u[0] === T && u[2], 
                                p = d && m.childNodes[d];
                                while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if (1 === p.nodeType && ++f && p === t) {
                                    c[e] = [ T, d, f ];
                                    break;
                                }
                            } else if (v && (u = (t[b] || (t[b] = {}))[e]) && u[0] === T) f = u[1]; else while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if ((s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[b] || (p[b] = {}))[e] = [ T, f ]), 
                            p === t)) break;
                            return f -= i, f === r || 0 === f % r && f / r >= 0;
                        }
                    };
                },
                PSEUDO: function(e, t) {
                    var n, r = o.pseudos[e] || o.setFilters[e.toLowerCase()] || at.error("unsupported pseudo: " + e);
                    return r[b] ? r(t) : r.length > 1 ? (n = [ e, e, "", t ], o.setFilters.hasOwnProperty(e.toLowerCase()) ? lt(function(e, n) {
                        var i, o = r(e, t), a = o.length;
                        while (a--) i = F.call(e, o[a]), e[i] = !(n[i] = o[a]);
                    }) : function(e) {
                        return r(e, 0, n);
                    }) : r;
                }
            },
            pseudos: {
                not: lt(function(e) {
                    var t = [], n = [], r = l(e.replace(z, "$1"));
                    return r[b] ? lt(function(e, t, n, i) {
                        var o, a = r(e, null, i, []), s = e.length;
                        while (s--) (o = a[s]) && (e[s] = !(t[s] = o));
                    }) : function(e, i, o) {
                        return t[0] = e, r(t, null, o, n), !n.pop();
                    };
                }),
                has: lt(function(e) {
                    return function(t) {
                        return at(e, t).length > 0;
                    };
                }),
                contains: lt(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || a(t)).indexOf(e) > -1;
                    };
                }),
                lang: lt(function(e) {
                    return G.test(e || "") || at.error("unsupported lang: " + e), e = e.replace(rt, it).toLowerCase(), 
                    function(t) {
                        var n;
                        do if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), 
                        n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1;
                    };
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id;
                },
                root: function(e) {
                    return e === d;
                },
                focus: function(e) {
                    return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: function(e) {
                    return e.disabled === !1;
                },
                disabled: function(e) {
                    return e.disabled === !0;
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected;
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                    return !0;
                },
                parent: function(e) {
                    return !o.pseudos.empty(e);
                },
                header: function(e) {
                    return tt.test(e.nodeName);
                },
                input: function(e) {
                    return et.test(e.nodeName);
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t;
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type);
                },
                first: ht(function() {
                    return [ 0 ];
                }),
                last: ht(function(e, t) {
                    return [ t - 1 ];
                }),
                eq: ht(function(e, t, n) {
                    return [ 0 > n ? n + t : n ];
                }),
                even: ht(function(e, t) {
                    var n = 0;
                    for (;t > n; n += 2) e.push(n);
                    return e;
                }),
                odd: ht(function(e, t) {
                    var n = 1;
                    for (;t > n; n += 2) e.push(n);
                    return e;
                }),
                lt: ht(function(e, t, n) {
                    var r = 0 > n ? n + t : n;
                    for (;--r >= 0; ) e.push(r);
                    return e;
                }),
                gt: ht(function(e, t, n) {
                    var r = 0 > n ? n + t : n;
                    for (;t > ++r; ) e.push(r);
                    return e;
                })
            }
        }, o.pseudos.nth = o.pseudos.eq;
        for (n in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) o.pseudos[n] = ft(n);
        for (n in {
            submit: !0,
            reset: !0
        }) o.pseudos[n] = dt(n);
        function gt() {}
        gt.prototype = o.filters = o.pseudos, o.setFilters = new gt();
        function mt(e, t) {
            var n, r, i, a, s, l, u, c = k[e + " "];
            if (c) return t ? 0 : c.slice(0);
            s = e, l = [], u = o.preFilter;
            while (s) {
                (!n || (r = X.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(i = [])), 
                n = !1, (r = U.exec(s)) && (n = r.shift(), i.push({
                    value: n,
                    type: r[0].replace(z, " ")
                }), s = s.slice(n.length));
                for (a in o.filter) !(r = Q[a].exec(s)) || u[a] && !(r = u[a](r)) || (n = r.shift(), 
                i.push({
                    value: n,
                    type: a,
                    matches: r
                }), s = s.slice(n.length));
                if (!n) break;
            }
            return t ? s.length : s ? at.error(e) : k(e, l).slice(0);
        }
        function yt(e) {
            var t = 0, n = e.length, r = "";
            for (;n > t; t++) r += e[t].value;
            return r;
        }
        function vt(e, t, n) {
            var r = t.dir, o = n && "parentNode" === r, a = C++;
            return t.first ? function(t, n, i) {
                while (t = t[r]) if (1 === t.nodeType || o) return e(t, n, i);
            } : function(t, n, s) {
                var l, u, c, p = T + " " + a;
                if (s) {
                    while (t = t[r]) if ((1 === t.nodeType || o) && e(t, n, s)) return !0;
                } else while (t = t[r]) if (1 === t.nodeType || o) if (c = t[b] || (t[b] = {}), 
                (u = c[r]) && u[0] === p) {
                    if ((l = u[1]) === !0 || l === i) return l === !0;
                } else if (u = c[r] = [ p ], u[1] = e(t, n, s) || i, u[1] === !0) return !0;
            };
        }
        function bt(e) {
            return e.length > 1 ? function(t, n, r) {
                var i = e.length;
                while (i--) if (!e[i](t, n, r)) return !1;
                return !0;
            } : e[0];
        }
        function xt(e, t, n, r, i) {
            var o, a = [], s = 0, l = e.length, u = null != t;
            for (;l > s; s++) (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s));
            return a;
        }
        function wt(e, t, n, r, i, o) {
            return r && !r[b] && (r = wt(r)), i && !i[b] && (i = wt(i, o)), lt(function(o, a, s, l) {
                var u, c, p, f = [], d = [], h = a.length, g = o || Nt(t || "*", s.nodeType ? [ s ] : s, []), m = !e || !o && t ? g : xt(g, f, e, s, l), y = n ? i || (o ? e : h || r) ? [] : a : m;
                if (n && n(m, y, s, l), r) {
                    u = xt(y, d), r(u, [], s, l), c = u.length;
                    while (c--) (p = u[c]) && (y[d[c]] = !(m[d[c]] = p));
                }
                if (o) {
                    if (i || e) {
                        if (i) {
                            u = [], c = y.length;
                            while (c--) (p = y[c]) && u.push(m[c] = p);
                            i(null, y = [], u, l);
                        }
                        c = y.length;
                        while (c--) (p = y[c]) && (u = i ? F.call(o, p) : f[c]) > -1 && (o[u] = !(a[u] = p));
                    }
                } else y = xt(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, l) : M.apply(a, y);
            });
        }
        function Tt(e) {
            var t, n, r, i = e.length, a = o.relative[e[0].type], s = a || o.relative[" "], l = a ? 1 : 0, c = vt(function(e) {
                return e === t;
            }, s, !0), p = vt(function(e) {
                return F.call(t, e) > -1;
            }, s, !0), f = [ function(e, n, r) {
                return !a && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r));
            } ];
            for (;i > l; l++) if (n = o.relative[e[l].type]) f = [ vt(bt(f), n) ]; else {
                if (n = o.filter[e[l].type].apply(null, e[l].matches), n[b]) {
                    for (r = ++l; i > r; r++) if (o.relative[e[r].type]) break;
                    return wt(l > 1 && bt(f), l > 1 && yt(e.slice(0, l - 1).concat({
                        value: " " === e[l - 2].type ? "*" : ""
                    })).replace(z, "$1"), n, r > l && Tt(e.slice(l, r)), i > r && Tt(e = e.slice(r)), i > r && yt(e));
                }
                f.push(n);
            }
            return bt(f);
        }
        function Ct(e, t) {
            var n = 0, r = t.length > 0, a = e.length > 0, s = function(s, l, c, p, d) {
                var h, g, m, y = [], v = 0, b = "0", x = s && [], w = null != d, C = u, N = s || a && o.find.TAG("*", d && l.parentNode || l), k = T += null == C ? 1 : Math.random() || .1;
                for (w && (u = l !== f && l, i = n); null != (h = N[b]); b++) {
                    if (a && h) {
                        g = 0;
                        while (m = e[g++]) if (m(h, l, c)) {
                            p.push(h);
                            break;
                        }
                        w && (T = k, i = ++n);
                    }
                    r && ((h = !m && h) && v--, s && x.push(h));
                }
                if (v += b, r && b !== v) {
                    g = 0;
                    while (m = t[g++]) m(x, y, l, c);
                    if (s) {
                        if (v > 0) while (b--) x[b] || y[b] || (y[b] = q.call(p));
                        y = xt(y);
                    }
                    M.apply(p, y), w && !s && y.length > 0 && v + t.length > 1 && at.uniqueSort(p);
                }
                return w && (T = k, u = C), x;
            };
            return r ? lt(s) : s;
        }
        l = at.compile = function(e, t) {
            var n, r = [], i = [], o = E[e + " "];
            if (!o) {
                t || (t = mt(e)), n = t.length;
                while (n--) o = Tt(t[n]), o[b] ? r.push(o) : i.push(o);
                o = E(e, Ct(i, r));
            }
            return o;
        };
        function Nt(e, t, n) {
            var r = 0, i = t.length;
            for (;i > r; r++) at(e, t[r], n);
            return n;
        }
        function kt(e, t, n, i) {
            var a, s, u, c, p, f = mt(e);
            if (!i && 1 === f.length) {
                if (s = f[0] = f[0].slice(0), s.length > 2 && "ID" === (u = s[0]).type && r.getById && 9 === t.nodeType && h && o.relative[s[1].type]) {
                    if (t = (o.find.ID(u.matches[0].replace(rt, it), t) || [])[0], !t) return n;
                    e = e.slice(s.shift().value.length);
                }
                a = Q.needsContext.test(e) ? 0 : s.length;
                while (a--) {
                    if (u = s[a], o.relative[c = u.type]) break;
                    if ((p = o.find[c]) && (i = p(u.matches[0].replace(rt, it), V.test(s[0].type) && t.parentNode || t))) {
                        if (s.splice(a, 1), e = i.length && yt(s), !e) return M.apply(n, i), n;
                        break;
                    }
                }
            }
            return l(e, f)(i, t, !h, n, V.test(e)), n;
        }
        r.sortStable = b.split("").sort(A).join("") === b, r.detectDuplicates = S, p(), 
        r.sortDetached = ut(function(e) {
            return 1 & e.compareDocumentPosition(f.createElement("div"));
        }), ut(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
        }) || ct("type|href|height|width", function(e, n, r) {
            return r ? t : e.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2);
        }), r.attributes && ut(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
        }) || ct("value", function(e, n, r) {
            return r || "input" !== e.nodeName.toLowerCase() ? t : e.defaultValue;
        }), ut(function(e) {
            return null == e.getAttribute("disabled");
        }) || ct(B, function(e, n, r) {
            var i;
            return r ? t : (i = e.getAttributeNode(n)) && i.specified ? i.value : e[n] === !0 ? n.toLowerCase() : null;
        }), x.find = at, x.expr = at.selectors, x.expr[":"] = x.expr.pseudos, x.unique = at.uniqueSort, 
        x.text = at.getText, x.isXMLDoc = at.isXML, x.contains = at.contains;
    }(e);
    var O = {};
    function F(e) {
        var t = O[e] = {};
        return x.each(e.match(T) || [], function(e, n) {
            t[n] = !0;
        }), t;
    }
    x.Callbacks = function(e) {
        e = "string" == typeof e ? O[e] || F(e) : x.extend({}, e);
        var n, r, i, o, a, s, l = [], u = !e.once && [], c = function(t) {
            for (r = e.memory && t, i = !0, a = s || 0, s = 0, o = l.length, n = !0; l && o > a; a++) if (l[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                r = !1;
                break;
            }
            n = !1, l && (u ? u.length && c(u.shift()) : r ? l = [] : p.disable());
        }, p = {
            add: function() {
                if (l) {
                    var t = l.length;
                    (function i(t) {
                        x.each(t, function(t, n) {
                            var r = x.type(n);
                            "function" === r ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== r && i(n);
                        });
                    })(arguments), n ? o = l.length : r && (s = t, c(r));
                }
                return this;
            },
            remove: function() {
                return l && x.each(arguments, function(e, t) {
                    var r;
                    while ((r = x.inArray(t, l, r)) > -1) l.splice(r, 1), n && (o >= r && o--, a >= r && a--);
                }), this;
            },
            has: function(e) {
                return e ? x.inArray(e, l) > -1 : !(!l || !l.length);
            },
            empty: function() {
                return l = [], o = 0, this;
            },
            disable: function() {
                return l = u = r = t, this;
            },
            disabled: function() {
                return !l;
            },
            lock: function() {
                return u = t, r || p.disable(), this;
            },
            locked: function() {
                return !u;
            },
            fireWith: function(e, t) {
                return !l || i && !u || (t = t || [], t = [ e, t.slice ? t.slice() : t ], n ? u.push(t) : c(t)), 
                this;
            },
            fire: function() {
                return p.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!i;
            }
        };
        return p;
    }, x.extend({
        Deferred: function(e) {
            var t = [ [ "resolve", "done", x.Callbacks("once memory"), "resolved" ], [ "reject", "fail", x.Callbacks("once memory"), "rejected" ], [ "notify", "progress", x.Callbacks("memory") ] ], n = "pending", r = {
                state: function() {
                    return n;
                },
                always: function() {
                    return i.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var e = arguments;
                    return x.Deferred(function(n) {
                        x.each(t, function(t, o) {
                            var a = o[0], s = x.isFunction(e[t]) && e[t];
                            i[o[1]](function() {
                                var e = s && s.apply(this, arguments);
                                e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [ e ] : arguments);
                            });
                        }), e = null;
                    }).promise();
                },
                promise: function(e) {
                    return null != e ? x.extend(e, r) : r;
                }
            }, i = {};
            return r.pipe = r.then, x.each(t, function(e, o) {
                var a = o[2], s = o[3];
                r[o[1]] = a.add, s && a.add(function() {
                    n = s;
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this;
                }, i[o[0] + "With"] = a.fireWith;
            }), r.promise(i), e && e.call(i, i), i;
        },
        when: function(e) {
            var t = 0, n = g.call(arguments), r = n.length, i = 1 !== r || e && x.isFunction(e.promise) ? r : 0, o = 1 === i ? e : x.Deferred(), a = function(e, t, n) {
                return function(r) {
                    t[e] = this, n[e] = arguments.length > 1 ? g.call(arguments) : r, n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n);
                };
            }, s, l, u;
            if (r > 1) for (s = Array(r), l = Array(r), u = Array(r); r > t; t++) n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(a(t, u, n)).fail(o.reject).progress(a(t, l, s)) : --i;
            return i || o.resolveWith(u, n), o.promise();
        }
    }), x.support = function(t) {
        var n, r, o, s, l, u, c, p, f, d = a.createElement("div");
        if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        n = d.getElementsByTagName("*") || [], r = d.getElementsByTagName("a")[0], !r || !r.style || !n.length) return t;
        s = a.createElement("select"), u = s.appendChild(a.createElement("option")), o = d.getElementsByTagName("input")[0], 
        r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, 
        t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, 
        t.htmlSerialize = !!d.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), 
        t.hrefNormalized = "/a" === r.getAttribute("href"), t.opacity = /^0.5/.test(r.style.opacity), 
        t.cssFloat = !!r.style.cssFloat, t.checkOn = !!o.value, t.optSelected = u.selected, 
        t.enctype = !!a.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== a.createElement("nav").cloneNode(!0).outerHTML, 
        t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, 
        t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, o.checked = !0, 
        t.noCloneChecked = o.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !u.disabled;
        try {
            delete d.test;
        } catch (h) {
            t.deleteExpando = !1;
        }
        o = a.createElement("input"), o.setAttribute("value", ""), t.input = "" === o.getAttribute("value"), 
        o.value = "t", o.setAttribute("type", "radio"), t.radioValue = "t" === o.value, 
        o.setAttribute("checked", "t"), o.setAttribute("name", "t"), l = a.createDocumentFragment(), 
        l.appendChild(o), t.appendChecked = o.checked, t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        d.attachEvent && (d.attachEvent("onclick", function() {
            t.noCloneEvent = !1;
        }), d.cloneNode(!0).click());
        for (f in {
            submit: !0,
            change: !0,
            focusin: !0
        }) d.setAttribute(c = "on" + f, "t"), t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1;
        d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", 
        t.clearCloneStyle = "content-box" === d.style.backgroundClip;
        for (f in x(t)) break;
        return t.ownLast = "0" !== f, x(function() {
            var n, r, o, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", l = a.getElementsByTagName("body")[0];
            l && (n = a.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
            l.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            o = d.getElementsByTagName("td"), o[0].style.cssText = "padding:0;margin:0;border:0;display:none", 
            p = 0 === o[0].offsetHeight, o[0].style.display = "", o[1].style.display = "none", 
            t.reliableHiddenOffsets = p && 0 === o[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", 
            x.swap(l, null != l.style.zoom ? {
                zoom: 1
            } : {}, function() {
                t.boxSizing = 4 === d.offsetWidth;
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, 
            t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
                width: "4px"
            }).width, r = d.appendChild(a.createElement("div")), r.style.cssText = d.style.cssText = s, 
            r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), 
            typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", 
            t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", 
            d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (l.style.zoom = 1)), 
            l.removeChild(n), n = d = o = r = null);
        }), n = s = l = u = r = o = null, t;
    }({});
    var B = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, P = /([A-Z])/g;
    function R(e, n, r, i) {
        if (x.acceptData(e)) {
            var o, a, s = x.expando, l = e.nodeType, u = l ? x.cache : e, c = l ? e[s] : e[s] && s;
            if (c && u[c] && (i || u[c].data) || r !== t || "string" != typeof n) return c || (c = l ? e[s] = p.pop() || x.guid++ : s), 
            u[c] || (u[c] = l ? {} : {
                toJSON: x.noop
            }), ("object" == typeof n || "function" == typeof n) && (i ? u[c] = x.extend(u[c], n) : u[c].data = x.extend(u[c].data, n)), 
            a = u[c], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[x.camelCase(n)] = r), 
            "string" == typeof n ? (o = a[n], null == o && (o = a[x.camelCase(n)])) : o = a, 
            o;
        }
    }
    function W(e, t, n) {
        if (x.acceptData(e)) {
            var r, i, o = e.nodeType, a = o ? x.cache : e, s = o ? e[x.expando] : x.expando;
            if (a[s]) {
                if (t && (r = n ? a[s] : a[s].data)) {
                    x.isArray(t) ? t = t.concat(x.map(t, x.camelCase)) : t in r ? t = [ t ] : (t = x.camelCase(t), 
                    t = t in r ? [ t ] : t.split(" ")), i = t.length;
                    while (i--) delete r[t[i]];
                    if (n ? !I(r) : !x.isEmptyObject(r)) return;
                }
                (n || (delete a[s].data, I(a[s]))) && (o ? x.cleanData([ e ], !0) : x.support.deleteExpando || a != a.window ? delete a[s] : a[s] = null);
            }
        }
    }
    x.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? x.cache[e[x.expando]] : e[x.expando], !!e && !I(e);
        },
        data: function(e, t, n) {
            return R(e, t, n);
        },
        removeData: function(e, t) {
            return W(e, t);
        },
        _data: function(e, t, n) {
            return R(e, t, n, !0);
        },
        _removeData: function(e, t) {
            return W(e, t, !0);
        },
        acceptData: function(e) {
            if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
            var t = e.nodeName && x.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t;
        }
    }), x.fn.extend({
        data: function(e, n) {
            var r, i, o = null, a = 0, s = this[0];
            if (e === t) {
                if (this.length && (o = x.data(s), 1 === s.nodeType && !x._data(s, "parsedAttrs"))) {
                    for (r = s.attributes; r.length > a; a++) i = r[a].name, 0 === i.indexOf("data-") && (i = x.camelCase(i.slice(5)), 
                    $(s, i, o[i]));
                    x._data(s, "parsedAttrs", !0);
                }
                return o;
            }
            return "object" == typeof e ? this.each(function() {
                x.data(this, e);
            }) : arguments.length > 1 ? this.each(function() {
                x.data(this, e, n);
            }) : s ? $(s, e, x.data(s, e)) : null;
        },
        removeData: function(e) {
            return this.each(function() {
                x.removeData(this, e);
            });
        }
    });
    function $(e, n, r) {
        if (r === t && 1 === e.nodeType) {
            var i = "data-" + n.replace(P, "-$1").toLowerCase();
            if (r = e.getAttribute(i), "string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : B.test(r) ? x.parseJSON(r) : r;
                } catch (o) {}
                x.data(e, n, r);
            } else r = t;
        }
        return r;
    }
    function I(e) {
        var t;
        for (t in e) if (("data" !== t || !x.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0;
    }
    x.extend({
        queue: function(e, n, r) {
            var i;
            return e ? (n = (n || "fx") + "queue", i = x._data(e, n), r && (!i || x.isArray(r) ? i = x._data(e, n, x.makeArray(r)) : i.push(r)), 
            i || []) : t;
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = x.queue(e, t), r = n.length, i = n.shift(), o = x._queueHooks(e, t), a = function() {
                x.dequeue(e, t);
            };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), 
            delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire();
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return x._data(e, n) || x._data(e, n, {
                empty: x.Callbacks("once memory").add(function() {
                    x._removeData(e, t + "queue"), x._removeData(e, n);
                })
            });
        }
    }), x.fn.extend({
        queue: function(e, n) {
            var r = 2;
            return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? x.queue(this[0], e) : n === t ? this : this.each(function() {
                var t = x.queue(this, e, n);
                x._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && x.dequeue(this, e);
            });
        },
        dequeue: function(e) {
            return this.each(function() {
                x.dequeue(this, e);
            });
        },
        delay: function(e, t) {
            return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r);
                };
            });
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", []);
        },
        promise: function(e, n) {
            var r, i = 1, o = x.Deferred(), a = this, s = this.length, l = function() {
                --i || o.resolveWith(a, [ a ]);
            };
            "string" != typeof e && (n = e, e = t), e = e || "fx";
            while (s--) r = x._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(l));
            return l(), o.promise(n);
        }
    });
    var z, X, U = /[\t\r\n\f]/g, V = /\r/g, Y = /^(?:input|select|textarea|button|object)$/i, J = /^(?:a|area)$/i, G = /^(?:checked|selected)$/i, Q = x.support.getSetAttribute, K = x.support.input;
    x.fn.extend({
        attr: function(e, t) {
            return x.access(this, x.attr, e, t, arguments.length > 1);
        },
        removeAttr: function(e) {
            return this.each(function() {
                x.removeAttr(this, e);
            });
        },
        prop: function(e, t) {
            return x.access(this, x.prop, e, t, arguments.length > 1);
        },
        removeProp: function(e) {
            return e = x.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e];
                } catch (n) {}
            });
        },
        addClass: function(e) {
            var t, n, r, i, o, a = 0, s = this.length, l = "string" == typeof e && e;
            if (x.isFunction(e)) return this.each(function(t) {
                x(this).addClass(e.call(this, t, this.className));
            });
            if (l) for (t = (e || "").match(T) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : " ")) {
                o = 0;
                while (i = t[o++]) 0 > r.indexOf(" " + i + " ") && (r += i + " ");
                n.className = x.trim(r);
            }
            return this;
        },
        removeClass: function(e) {
            var t, n, r, i, o, a = 0, s = this.length, l = 0 === arguments.length || "string" == typeof e && e;
            if (x.isFunction(e)) return this.each(function(t) {
                x(this).removeClass(e.call(this, t, this.className));
            });
            if (l) for (t = (e || "").match(T) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : "")) {
                o = 0;
                while (i = t[o++]) while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                n.className = e ? x.trim(r) : "";
            }
            return this;
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : x.isFunction(e) ? this.each(function(n) {
                x(this).toggleClass(e.call(this, n, this.className, t), t);
            }) : this.each(function() {
                if ("string" === n) {
                    var t, r = 0, o = x(this), a = e.match(T) || [];
                    while (t = a[r++]) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                } else (n === i || "boolean" === n) && (this.className && x._data(this, "__className__", this.className), 
                this.className = this.className || e === !1 ? "" : x._data(this, "__className__") || "");
            });
        },
        hasClass: function(e) {
            var t = " " + e + " ", n = 0, r = this.length;
            for (;r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(U, " ").indexOf(t) >= 0) return !0;
            return !1;
        },
        val: function(e) {
            var n, r, i, o = this[0];
            {
                if (arguments.length) return i = x.isFunction(e), this.each(function(n) {
                    var o;
                    1 === this.nodeType && (o = i ? e.call(this, n, x(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : x.isArray(o) && (o = x.map(o, function(e) {
                        return null == e ? "" : e + "";
                    })), r = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o));
                });
                if (o) return r = x.valHooks[o.type] || x.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, 
                "string" == typeof n ? n.replace(V, "") : null == n ? "" : n);
            }
        }
    }), x.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = x.find.attr(e, "value");
                    return null != t ? t : e.text;
                }
            },
            select: {
                get: function(e) {
                    var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, l = 0 > i ? s : o ? i : 0;
                    for (;s > l; l++) if (n = r[l], !(!n.selected && l !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) {
                        if (t = x(n).val(), o) return t;
                        a.push(t);
                    }
                    return a;
                },
                set: function(e, t) {
                    var n, r, i = e.options, o = x.makeArray(t), a = i.length;
                    while (a--) r = i[a], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1), o;
                }
            }
        },
        attr: function(e, n, r) {
            var o, a, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === i ? x.prop(e, n, r) : (1 === s && x.isXMLDoc(e) || (n = n.toLowerCase(), 
            o = x.attrHooks[n] || (x.expr.match.bool.test(n) ? X : z)), r === t ? o && "get" in o && null !== (a = o.get(e, n)) ? a : (a = x.find.attr(e, n), 
            null == a ? t : a) : null !== r ? o && "set" in o && (a = o.set(e, r, n)) !== t ? a : (e.setAttribute(n, r + ""), 
            r) : (x.removeAttr(e, n), t));
        },
        removeAttr: function(e, t) {
            var n, r, i = 0, o = t && t.match(T);
            if (o && 1 === e.nodeType) while (n = o[i++]) r = x.propFix[n] || n, x.expr.match.bool.test(n) ? K && Q || !G.test(n) ? e[r] = !1 : e[x.camelCase("default-" + n)] = e[r] = !1 : x.attr(e, n, ""), 
            e.removeAttribute(Q ? n : r);
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, n, r) {
            var i, o, a, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !x.isXMLDoc(e), a && (n = x.propFix[n] || n, 
            o = x.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n];
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = x.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Y.test(e.nodeName) || J.test(e.nodeName) && e.href ? 0 : -1;
                }
            }
        }
    }), X = {
        set: function(e, t, n) {
            return t === !1 ? x.removeAttr(e, n) : K && Q || !G.test(n) ? e.setAttribute(!Q && x.propFix[n] || n, n) : e[x.camelCase("default-" + n)] = e[n] = !0, 
            n;
        }
    }, x.each(x.expr.match.bool.source.match(/\w+/g), function(e, n) {
        var r = x.expr.attrHandle[n] || x.find.attr;
        x.expr.attrHandle[n] = K && Q || !G.test(n) ? function(e, n, i) {
            var o = x.expr.attrHandle[n], a = i ? t : (x.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null;
            return x.expr.attrHandle[n] = o, a;
        } : function(e, n, r) {
            return r ? t : e[x.camelCase("default-" + n)] ? n.toLowerCase() : null;
        };
    }), K && Q || (x.attrHooks.value = {
        set: function(e, n, r) {
            return x.nodeName(e, "input") ? (e.defaultValue = n, t) : z && z.set(e, n, r);
        }
    }), Q || (z = {
        set: function(e, n, r) {
            var i = e.getAttributeNode(r);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", 
            "value" === r || n === e.getAttribute(r) ? n : t;
        }
    }, x.expr.attrHandle.id = x.expr.attrHandle.name = x.expr.attrHandle.coords = function(e, n, r) {
        var i;
        return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null;
    }, x.valHooks.button = {
        get: function(e, n) {
            var r = e.getAttributeNode(n);
            return r && r.specified ? r.value : t;
        },
        set: z.set
    }, x.attrHooks.contenteditable = {
        set: function(e, t, n) {
            z.set(e, "" === t ? !1 : t, n);
        }
    }, x.each([ "width", "height" ], function(e, n) {
        x.attrHooks[n] = {
            set: function(e, r) {
                return "" === r ? (e.setAttribute(n, "auto"), r) : t;
            }
        };
    })), x.support.hrefNormalized || x.each([ "href", "src" ], function(e, t) {
        x.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4);
            }
        };
    }), x.support.style || (x.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || t;
        },
        set: function(e, t) {
            return e.style.cssText = t + "";
        }
    }), x.support.optSelected || (x.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
        }
    }), x.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        x.propFix[this.toLowerCase()] = this;
    }), x.support.enctype || (x.propFix.enctype = "encoding"), x.each([ "radio", "checkbox" ], function() {
        x.valHooks[this] = {
            set: function(e, n) {
                return x.isArray(n) ? e.checked = x.inArray(x(e).val(), n) >= 0 : t;
            }
        }, x.support.checkOn || (x.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value;
        });
    });
    var Z = /^(?:input|select|textarea)$/i, et = /^key/, tt = /^(?:mouse|contextmenu)|click/, nt = /^(?:focusinfocus|focusoutblur)$/, rt = /^([^.]*)(?:\.(.+)|)$/;
    function it() {
        return !0;
    }
    function ot() {
        return !1;
    }
    function at() {
        try {
            return a.activeElement;
        } catch (e) {}
    }
    x.event = {
        global: {},
        add: function(e, n, r, o, a) {
            var s, l, u, c, p, f, d, h, g, m, y, v = x._data(e);
            if (v) {
                r.handler && (c = r, r = c.handler, a = c.selector), r.guid || (r.guid = x.guid++), 
                (l = v.events) || (l = v.events = {}), (f = v.handle) || (f = v.handle = function(e) {
                    return typeof x === i || e && x.event.triggered === e.type ? t : x.event.dispatch.apply(f.elem, arguments);
                }, f.elem = e), n = (n || "").match(T) || [ "" ], u = n.length;
                while (u--) s = rt.exec(n[u]) || [], g = y = s[1], m = (s[2] || "").split(".").sort(), 
                g && (p = x.event.special[g] || {}, g = (a ? p.delegateType : p.bindType) || g, 
                p = x.event.special[g] || {}, d = x.extend({
                    type: g,
                    origType: y,
                    data: o,
                    handler: r,
                    guid: r.guid,
                    selector: a,
                    needsContext: a && x.expr.match.needsContext.test(a),
                    namespace: m.join(".")
                }, c), (h = l[g]) || (h = l[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, m, f) !== !1 || (e.addEventListener ? e.addEventListener(g, f, !1) : e.attachEvent && e.attachEvent("on" + g, f))), 
                p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), a ? h.splice(h.delegateCount++, 0, d) : h.push(d), 
                x.event.global[g] = !0);
                e = null;
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, l, u, c, p, f, d, h, g, m = x.hasData(e) && x._data(e);
            if (m && (c = m.events)) {
                t = (t || "").match(T) || [ "" ], u = t.length;
                while (u--) if (s = rt.exec(t[u]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), 
                d) {
                    p = x.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = c[d] || [], 
                    s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = f.length;
                    while (o--) a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), 
                    a.selector && f.delegateCount--, p.remove && p.remove.call(e, a));
                    l && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || x.removeEvent(e, d, m.handle), 
                    delete c[d]);
                } else for (d in c) x.event.remove(e, d + t[u], n, r, !0);
                x.isEmptyObject(c) && (delete m.handle, x._removeData(e, "events"));
            }
        },
        trigger: function(n, r, i, o) {
            var s, l, u, c, p, f, d, h = [ i || a ], g = v.call(n, "type") ? n.type : n, m = v.call(n, "namespace") ? n.namespace.split(".") : [];
            if (u = f = i = i || a, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + x.event.triggered) && (g.indexOf(".") >= 0 && (m = g.split("."), 
            g = m.shift(), m.sort()), l = 0 > g.indexOf(":") && "on" + g, n = n[x.expando] ? n : new x.Event(g, "object" == typeof n && n), 
            n.isTrigger = o ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            n.result = t, n.target || (n.target = i), r = null == r ? [ n ] : x.makeArray(r, [ n ]), 
            p = x.event.special[g] || {}, o || !p.trigger || p.trigger.apply(i, r) !== !1)) {
                if (!o && !p.noBubble && !x.isWindow(i)) {
                    for (c = p.delegateType || g, nt.test(c + g) || (u = u.parentNode); u; u = u.parentNode) h.push(u), 
                    f = u;
                    f === (i.ownerDocument || a) && h.push(f.defaultView || f.parentWindow || e);
                }
                d = 0;
                while ((u = h[d++]) && !n.isPropagationStopped()) n.type = d > 1 ? c : p.bindType || g, 
                s = (x._data(u, "events") || {})[n.type] && x._data(u, "handle"), s && s.apply(u, r), 
                s = l && u[l], s && x.acceptData(u) && s.apply && s.apply(u, r) === !1 && n.preventDefault();
                if (n.type = g, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(h.pop(), r) === !1) && x.acceptData(i) && l && i[g] && !x.isWindow(i)) {
                    f = i[l], f && (i[l] = null), x.event.triggered = g;
                    try {
                        i[g]();
                    } catch (y) {}
                    x.event.triggered = t, f && (i[l] = f);
                }
                return n.result;
            }
        },
        dispatch: function(e) {
            e = x.event.fix(e);
            var n, r, i, o, a, s = [], l = g.call(arguments), u = (x._data(this, "events") || {})[e.type] || [], c = x.event.special[e.type] || {};
            if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                s = x.event.handlers.call(this, e, u), n = 0;
                while ((o = s[n++]) && !e.isPropagationStopped()) {
                    e.currentTarget = o.elem, a = 0;
                    while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped()) (!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, 
                    e.data = i.data, r = ((x.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, l), 
                    r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                }
                return c.postDispatch && c.postDispatch.call(this, e), e.result;
            }
        },
        handlers: function(e, n) {
            var r, i, o, a, s = [], l = n.delegateCount, u = e.target;
            if (l && u.nodeType && (!e.button || "click" !== e.type)) for (;u != this; u = u.parentNode || this) if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
                for (o = [], a = 0; l > a; a++) i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? x(r, this).index(u) >= 0 : x.find(r, this, null, [ u ]).length), 
                o[r] && o.push(i);
                o.length && s.push({
                    elem: u,
                    handlers: o
                });
            }
            return n.length > l && s.push({
                elem: this,
                handlers: n.slice(l)
            }), s;
        },
        fix: function(e) {
            if (e[x.expando]) return e;
            var t, n, r, i = e.type, o = e, s = this.fixHooks[i];
            s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), 
            r = s.props ? this.props.concat(s.props) : this.props, e = new x.Event(o), t = r.length;
            while (t--) n = r[t], e[n] = o[n];
            return e.target || (e.target = o.srcElement || a), 3 === e.target.nodeType && (e.target = e.target.parentNode), 
            e.metaKey = !!e.metaKey, s.filter ? s.filter(e, o) : e;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), 
                e;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var r, i, o, s = n.button, l = n.fromElement;
                return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || a, 
                o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), 
                e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), 
                !e.relatedTarget && l && (e.relatedTarget = l === e.target ? n.toElement : l), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), 
                e;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== at() && this.focus) try {
                        return this.focus(), !1;
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === at() && this.blur ? (this.blur(), !1) : t;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return x.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : t;
                },
                _default: function(e) {
                    return x.nodeName(e.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== t && (e.originalEvent.returnValue = e.result);
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = x.extend(new x.Event(), n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
        }
    }, x.removeEvent = a.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1);
    } : function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n));
    }, x.Event = function(e, n) {
        return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, 
        this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, 
        n && x.extend(this, n), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, 
        t) : new x.Event(e, n);
    }, x.Event.prototype = {
        isDefaultPrevented: ot,
        isPropagationStopped: ot,
        isImmediatePropagationStopped: ot,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = it, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = it, e && (e.stopPropagation && e.stopPropagation(), 
            e.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = it, this.stopPropagation();
        }
    }, x.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        x.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this, i = e.relatedTarget, o = e.handleObj;
                return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), 
                e.type = t), n;
            }
        };
    }), x.support.submitBubbles || (x.event.special.submit = {
        setup: function() {
            return x.nodeName(this, "form") ? !1 : (x.event.add(this, "click._submit keypress._submit", function(e) {
                var n = e.target, r = x.nodeName(n, "input") || x.nodeName(n, "button") ? n.form : t;
                r && !x._data(r, "submitBubbles") && (x.event.add(r, "submit._submit", function(e) {
                    e._submit_bubble = !0;
                }), x._data(r, "submitBubbles", !0));
            }), t);
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && x.event.simulate("submit", this.parentNode, e, !0));
        },
        teardown: function() {
            return x.nodeName(this, "form") ? !1 : (x.event.remove(this, "._submit"), t);
        }
    }), x.support.changeBubbles || (x.event.special.change = {
        setup: function() {
            return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (x.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0);
            }), x.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), x.event.simulate("change", this, e, !0);
            })), !1) : (x.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Z.test(t.nodeName) && !x._data(t, "changeBubbles") && (x.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || x.event.simulate("change", this.parentNode, e, !0);
                }), x._data(t, "changeBubbles", !0));
            }), t);
        },
        handle: function(e) {
            var n = e.target;
            return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t;
        },
        teardown: function() {
            return x.event.remove(this, "._change"), !Z.test(this.nodeName);
        }
    }), x.support.focusinBubbles || x.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0, r = function(e) {
            x.event.simulate(t, e.target, x.event.fix(e), !0);
        };
        x.event.special[t] = {
            setup: function() {
                0 === n++ && a.addEventListener(e, r, !0);
            },
            teardown: function() {
                0 === --n && a.removeEventListener(e, r, !0);
            }
        };
    }), x.fn.extend({
        on: function(e, n, r, i, o) {
            var a, s;
            if ("object" == typeof e) {
                "string" != typeof n && (r = r || n, n = t);
                for (a in e) this.on(a, n, r, e[a], o);
                return this;
            }
            if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, 
            r = t) : (i = r, r = n, n = t)), i === !1) i = ot; else if (!i) return this;
            return 1 === o && (s = i, i = function(e) {
                return x().off(e), s.apply(this, arguments);
            }, i.guid = s.guid || (s.guid = x.guid++)), this.each(function() {
                x.event.add(this, e, i, r, n);
            });
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1);
        },
        off: function(e, n, r) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, x(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), 
            this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, n, e[o]);
                return this;
            }
            return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = ot), 
            this.each(function() {
                x.event.remove(this, e, r, n);
            });
        },
        trigger: function(e, t) {
            return this.each(function() {
                x.event.trigger(e, t, this);
            });
        },
        triggerHandler: function(e, n) {
            var r = this[0];
            return r ? x.event.trigger(e, n, r, !0) : t;
        }
    });
    var st = /^.[^:#\[\.,]*$/, lt = /^(?:parents|prev(?:Until|All))/, ut = x.expr.match.needsContext, ct = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    x.fn.extend({
        find: function(e) {
            var t, n = [], r = this, i = r.length;
            if ("string" != typeof e) return this.pushStack(x(e).filter(function() {
                for (t = 0; i > t; t++) if (x.contains(r[t], this)) return !0;
            }));
            for (t = 0; i > t; t++) x.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, 
            n;
        },
        has: function(e) {
            var t, n = x(e, this), r = n.length;
            return this.filter(function() {
                for (t = 0; r > t; t++) if (x.contains(this, n[t])) return !0;
            });
        },
        not: function(e) {
            return this.pushStack(ft(this, e || [], !0));
        },
        filter: function(e) {
            return this.pushStack(ft(this, e || [], !1));
        },
        is: function(e) {
            return !!ft(this, "string" == typeof e && ut.test(e) ? x(e) : e || [], !1).length;
        },
        closest: function(e, t) {
            var n, r = 0, i = this.length, o = [], a = ut.test(e) || "string" != typeof e ? x(e, t || this.context) : 0;
            for (;i > r; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (11 > n.nodeType && (a ? a.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
                n = o.push(n);
                break;
            }
            return this.pushStack(o.length > 1 ? x.unique(o) : o);
        },
        index: function(e) {
            return e ? "string" == typeof e ? x.inArray(this[0], x(e)) : x.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(e, t) {
            var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [ e ] : e), r = x.merge(this.get(), n);
            return this.pushStack(x.unique(r));
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        }
    });
    function pt(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e;
    }
    x.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
        },
        parents: function(e) {
            return x.dir(e, "parentNode");
        },
        parentsUntil: function(e, t, n) {
            return x.dir(e, "parentNode", n);
        },
        next: function(e) {
            return pt(e, "nextSibling");
        },
        prev: function(e) {
            return pt(e, "previousSibling");
        },
        nextAll: function(e) {
            return x.dir(e, "nextSibling");
        },
        prevAll: function(e) {
            return x.dir(e, "previousSibling");
        },
        nextUntil: function(e, t, n) {
            return x.dir(e, "nextSibling", n);
        },
        prevUntil: function(e, t, n) {
            return x.dir(e, "previousSibling", n);
        },
        siblings: function(e) {
            return x.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
            return x.sibling(e.firstChild);
        },
        contents: function(e) {
            return x.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : x.merge([], e.childNodes);
        }
    }, function(e, t) {
        x.fn[e] = function(n, r) {
            var i = x.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), 
            this.length > 1 && (ct[e] || (i = x.unique(i)), lt.test(e) && (i = i.reverse())), 
            this.pushStack(i);
        };
    }), x.extend({
        filter: function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [ r ] : [] : x.find.matches(e, x.grep(t, function(e) {
                return 1 === e.nodeType;
            }));
        },
        dir: function(e, n, r) {
            var i = [], o = e[n];
            while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !x(o).is(r))) 1 === o.nodeType && i.push(o), 
            o = o[n];
            return i;
        },
        sibling: function(e, t) {
            var n = [];
            for (;e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n;
        }
    });
    function ft(e, t, n) {
        if (x.isFunction(t)) return x.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n;
        });
        if (t.nodeType) return x.grep(e, function(e) {
            return e === t !== n;
        });
        if ("string" == typeof t) {
            if (st.test(t)) return x.filter(t, e, n);
            t = x.filter(t, e);
        }
        return x.grep(e, function(e) {
            return x.inArray(e, t) >= 0 !== n;
        });
    }
    function dt(e) {
        var t = ht.split("|"), n = e.createDocumentFragment();
        if (n.createElement) while (t.length) n.createElement(t.pop());
        return n;
    }
    var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", gt = / jQuery\d+="(?:null|\d+)"/g, mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"), yt = /^\s+/, vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bt = /<([\w:]+)/, xt = /<tbody/i, wt = /<|&#?\w+;/, Tt = /<(?:script|style|link)/i, Ct = /^(?:checkbox|radio)$/i, Nt = /checked\s*(?:[^=]|=\s*.checked.)/i, kt = /^$|\/(?:java|ecma)script/i, Et = /^true\/(.*)/, St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, At = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: x.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, jt = dt(a), Dt = jt.appendChild(a.createElement("div"));
    At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, 
    At.th = At.td, x.fn.extend({
        text: function(e) {
            return x.access(this, function(e) {
                return e === t ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || a).createTextNode(e));
            }, null, e, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Lt(this, e);
                    t.appendChild(e);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Lt(this, e);
                    t.insertBefore(e, t.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        },
        remove: function(e, t) {
            var n, r = e ? x.filter(e, this) : this, i = 0;
            for (;null != (n = r[i]); i++) t || 1 !== n.nodeType || x.cleanData(Ft(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && _t(Ft(n, "script")), 
            n.parentNode.removeChild(n));
            return this;
        },
        empty: function() {
            var e, t = 0;
            for (;null != (e = this[t]); t++) {
                1 === e.nodeType && x.cleanData(Ft(e, !1));
                while (e.firstChild) e.removeChild(e.firstChild);
                e.options && x.nodeName(e, "select") && (e.options.length = 0);
            }
            return this;
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return x.clone(this, e, t);
            });
        },
        html: function(e) {
            return x.access(this, function(e) {
                var n = this[0] || {}, r = 0, i = this.length;
                if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t;
                if (!("string" != typeof e || Tt.test(e) || !x.support.htmlSerialize && mt.test(e) || !x.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e) || [ "", "" ])[1].toLowerCase()])) {
                    e = e.replace(vt, "<$1></$2>");
                    try {
                        for (;i > r; r++) n = this[r] || {}, 1 === n.nodeType && (x.cleanData(Ft(n, !1)), 
                        n.innerHTML = e);
                        n = 0;
                    } catch (o) {}
                }
                n && this.empty().append(e);
            }, null, e, arguments.length);
        },
        replaceWith: function() {
            var e = x.map(this, function(e) {
                return [ e.nextSibling, e.parentNode ];
            }), t = 0;
            return this.domManip(arguments, function(n) {
                var r = e[t++], i = e[t++];
                i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n, r));
            }, !0), t ? this : this.remove();
        },
        detach: function(e) {
            return this.remove(e, !0);
        },
        domManip: function(e, t, n) {
            e = d.apply([], e);
            var r, i, o, a, s, l, u = 0, c = this.length, p = this, f = c - 1, h = e[0], g = x.isFunction(h);
            if (g || !(1 >= c || "string" != typeof h || x.support.checkClone) && Nt.test(h)) return this.each(function(r) {
                var i = p.eq(r);
                g && (e[0] = h.call(this, r, i.html())), i.domManip(e, t, n);
            });
            if (c && (l = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), r = l.firstChild, 
            1 === l.childNodes.length && (l = r), r)) {
                for (a = x.map(Ft(l, "script"), Ht), o = a.length; c > u; u++) i = l, u !== f && (i = x.clone(i, !0, !0), 
                o && x.merge(a, Ft(i, "script"))), t.call(this[u], i, u);
                if (o) for (s = a[a.length - 1].ownerDocument, x.map(a, qt), u = 0; o > u; u++) i = a[u], 
                kt.test(i.type || "") && !x._data(i, "globalEval") && x.contains(s, i) && (i.src ? x._evalUrl(i.src) : x.globalEval((i.text || i.textContent || i.innerHTML || "").replace(St, "")));
                l = r = null;
            }
            return this;
        }
    });
    function Lt(e, t) {
        return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
    }
    function Ht(e) {
        return e.type = (null !== x.find.attr(e, "type")) + "/" + e.type, e;
    }
    function qt(e) {
        var t = Et.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e;
    }
    function _t(e, t) {
        var n, r = 0;
        for (;null != (n = e[r]); r++) x._data(n, "globalEval", !t || x._data(t[r], "globalEval"));
    }
    function Mt(e, t) {
        if (1 === t.nodeType && x.hasData(e)) {
            var n, r, i, o = x._data(e), a = x._data(t, o), s = o.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s) for (r = 0, i = s[n].length; i > r; r++) x.event.add(t, n, s[n][r]);
            }
            a.data && (a.data = x.extend({}, a.data));
        }
    }
    function Ot(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !x.support.noCloneEvent && t[x.expando]) {
                i = x._data(t);
                for (r in i.events) x.removeEvent(t, r, i.handle);
                t.removeAttribute(x.expando);
            }
            "script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), 
            x.support.html5Clone && e.innerHTML && !x.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ct.test(e.type) ? (t.defaultChecked = t.checked = e.checked, 
            t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
        }
    }
    x.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        x.fn[e] = function(e) {
            var n, r = 0, i = [], o = x(e), a = o.length - 1;
            for (;a >= r; r++) n = r === a ? this : this.clone(!0), x(o[r])[t](n), h.apply(i, n.get());
            return this.pushStack(i);
        };
    });
    function Ft(e, n) {
        var r, o, a = 0, s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t;
        if (!s) for (s = [], r = e.childNodes || e; null != (o = r[a]); a++) !n || x.nodeName(o, n) ? s.push(o) : x.merge(s, Ft(o, n));
        return n === t || n && x.nodeName(e, n) ? x.merge([ e ], s) : s;
    }
    function Bt(e) {
        Ct.test(e.type) && (e.defaultChecked = e.checked);
    }
    x.extend({
        clone: function(e, t, n) {
            var r, i, o, a, s, l = x.contains(e.ownerDocument, e);
            if (x.support.html5Clone || x.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, 
            Dt.removeChild(o = Dt.firstChild)), !(x.support.noCloneEvent && x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e))) for (r = Ft(o), 
            s = Ft(e), a = 0; null != (i = s[a]); ++a) r[a] && Ot(i, r[a]);
            if (t) if (n) for (s = s || Ft(e), r = r || Ft(o), a = 0; null != (i = s[a]); a++) Mt(i, r[a]); else Mt(e, o);
            return r = Ft(o, "script"), r.length > 0 && _t(r, !l && Ft(e, "script")), r = s = i = null, 
            o;
        },
        buildFragment: function(e, t, n, r) {
            var i, o, a, s, l, u, c, p = e.length, f = dt(t), d = [], h = 0;
            for (;p > h; h++) if (o = e[h], o || 0 === o) if ("object" === x.type(o)) x.merge(d, o.nodeType ? [ o ] : o); else if (wt.test(o)) {
                s = s || f.appendChild(t.createElement("div")), l = (bt.exec(o) || [ "", "" ])[1].toLowerCase(), 
                c = At[l] || At._default, s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2], 
                i = c[0];
                while (i--) s = s.lastChild;
                if (!x.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), 
                !x.support.tbody) {
                    o = "table" !== l || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild, 
                    i = o && o.childNodes.length;
                    while (i--) x.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u);
                }
                x.merge(d, s.childNodes), s.textContent = "";
                while (s.firstChild) s.removeChild(s.firstChild);
                s = f.lastChild;
            } else d.push(t.createTextNode(o));
            s && f.removeChild(s), x.support.appendChecked || x.grep(Ft(d, "input"), Bt), h = 0;
            while (o = d[h++]) if ((!r || -1 === x.inArray(o, r)) && (a = x.contains(o.ownerDocument, o), 
            s = Ft(f.appendChild(o), "script"), a && _t(s), n)) {
                i = 0;
                while (o = s[i++]) kt.test(o.type || "") && n.push(o);
            }
            return s = null, f;
        },
        cleanData: function(e, t) {
            var n, r, o, a, s = 0, l = x.expando, u = x.cache, c = x.support.deleteExpando, f = x.event.special;
            for (;null != (n = e[s]); s++) if ((t || x.acceptData(n)) && (o = n[l], a = o && u[o])) {
                if (a.events) for (r in a.events) f[r] ? x.event.remove(n, r) : x.removeEvent(n, r, a.handle);
                u[o] && (delete u[o], c ? delete n[l] : typeof n.removeAttribute !== i ? n.removeAttribute(l) : n[l] = null, 
                p.push(o));
            }
        },
        _evalUrl: function(e) {
            return x.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            });
        }
    }), x.fn.extend({
        wrapAll: function(e) {
            if (x.isFunction(e)) return this.each(function(t) {
                x(this).wrapAll(e.call(this, t));
            });
            if (this[0]) {
                var t = x(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    var e = this;
                    while (e.firstChild && 1 === e.firstChild.nodeType) e = e.firstChild;
                    return e;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(e) {
            return x.isFunction(e) ? this.each(function(t) {
                x(this).wrapInner(e.call(this, t));
            }) : this.each(function() {
                var t = x(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
            });
        },
        wrap: function(e) {
            var t = x.isFunction(e);
            return this.each(function(n) {
                x(this).wrapAll(t ? e.call(this, n) : e);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                x.nodeName(this, "body") || x(this).replaceWith(this.childNodes);
            }).end();
        }
    });
    var Pt, Rt, Wt, $t = /alpha\([^)]*\)/i, It = /opacity\s*=\s*([^)]*)/, zt = /^(top|right|bottom|left)$/, Xt = /^(none|table(?!-c[ea]).+)/, Ut = /^margin/, Vt = RegExp("^(" + w + ")(.*)$", "i"), Yt = RegExp("^(" + w + ")(?!px)[a-z%]+$", "i"), Jt = RegExp("^([+-])=(" + w + ")", "i"), Gt = {
        BODY: "block"
    }, Qt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Kt = {
        letterSpacing: 0,
        fontWeight: 400
    }, Zt = [ "Top", "Right", "Bottom", "Left" ], en = [ "Webkit", "O", "Moz", "ms" ];
    function tn(e, t) {
        if (t in e) return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = en.length;
        while (i--) if (t = en[i] + n, t in e) return t;
        return r;
    }
    function nn(e, t) {
        return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e);
    }
    function rn(e, t) {
        var n, r, i, o = [], a = 0, s = e.length;
        for (;s > a; a++) r = e[a], r.style && (o[a] = x._data(r, "olddisplay"), n = r.style.display, 
        t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = x._data(r, "olddisplay", ln(r.nodeName)))) : o[a] || (i = nn(r), 
        (n && "none" !== n || !i) && x._data(r, "olddisplay", i ? n : x.css(r, "display"))));
        for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e;
    }
    x.fn.extend({
        css: function(e, n) {
            return x.access(this, function(e, n, r) {
                var i, o, a = {}, s = 0;
                if (x.isArray(n)) {
                    for (o = Rt(e), i = n.length; i > s; s++) a[n[s]] = x.css(e, n[s], !1, o);
                    return a;
                }
                return r !== t ? x.style(e, n, r) : x.css(e, n);
            }, e, n, arguments.length > 1);
        },
        show: function() {
            return rn(this, !0);
        },
        hide: function() {
            return rn(this);
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                nn(this) ? x(this).show() : x(this).hide();
            });
        }
    }), x.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Wt(e, "opacity");
                        return "" === n ? "1" : n;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": x.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, r, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, a, s, l = x.camelCase(n), u = e.style;
                if (n = x.cssProps[l] || (x.cssProps[l] = tn(u, l)), s = x.cssHooks[n] || x.cssHooks[l], 
                r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : u[n];
                if (a = typeof r, "string" === a && (o = Jt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(x.css(e, n)), 
                a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || x.cssNumber[l] || (r += "px"), 
                x.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (u[n] = "inherit"), 
                s && "set" in s && (r = s.set(e, r, i)) === t))) try {
                    u[n] = r;
                } catch (c) {}
            }
        },
        css: function(e, n, r, i) {
            var o, a, s, l = x.camelCase(n);
            return n = x.cssProps[l] || (x.cssProps[l] = tn(e.style, l)), s = x.cssHooks[n] || x.cssHooks[l], 
            s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = Wt(e, n, i)), "normal" === a && n in Kt && (a = Kt[n]), 
            "" === r || r ? (o = parseFloat(a), r === !0 || x.isNumeric(o) ? o || 0 : a) : a;
        }
    }), e.getComputedStyle ? (Rt = function(t) {
        return e.getComputedStyle(t, null);
    }, Wt = function(e, n, r) {
        var i, o, a, s = r || Rt(e), l = s ? s.getPropertyValue(n) || s[n] : t, u = e.style;
        return s && ("" !== l || x.contains(e.ownerDocument, e) || (l = x.style(e, n)), 
        Yt.test(l) && Ut.test(n) && (i = u.width, o = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, 
        l = s.width, u.width = i, u.minWidth = o, u.maxWidth = a)), l;
    }) : a.documentElement.currentStyle && (Rt = function(e) {
        return e.currentStyle;
    }, Wt = function(e, n, r) {
        var i, o, a, s = r || Rt(e), l = s ? s[n] : t, u = e.style;
        return null == l && u && u[n] && (l = u[n]), Yt.test(l) && !zt.test(n) && (i = u.left, 
        o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), u.left = "fontSize" === n ? "1em" : l, 
        l = u.pixelLeft + "px", u.left = i, a && (o.left = a)), "" === l ? "auto" : l;
    });
    function on(e, t, n) {
        var r = Vt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
    }
    function an(e, t, n, r, i) {
        var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0;
        for (;4 > o; o += 2) "margin" === n && (a += x.css(e, n + Zt[o], !0, i)), r ? ("content" === n && (a -= x.css(e, "padding" + Zt[o], !0, i)), 
        "margin" !== n && (a -= x.css(e, "border" + Zt[o] + "Width", !0, i))) : (a += x.css(e, "padding" + Zt[o], !0, i), 
        "padding" !== n && (a += x.css(e, "border" + Zt[o] + "Width", !0, i)));
        return a;
    }
    function sn(e, t, n) {
        var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Rt(e), a = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = Wt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Yt.test(i)) return i;
            r = a && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0;
        }
        return i + an(e, t, n || (a ? "border" : "content"), r, o) + "px";
    }
    function ln(e) {
        var t = a, n = Gt[e];
        return n || (n = un(e, t), "none" !== n && n || (Pt = (Pt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), 
        t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), 
        t.close(), n = un(e, t), Pt.detach()), Gt[e] = n), n;
    }
    function un(e, t) {
        var n = x(t.createElement(e)).appendTo(t.body), r = x.css(n[0], "display");
        return n.remove(), r;
    }
    x.each([ "height", "width" ], function(e, n) {
        x.cssHooks[n] = {
            get: function(e, r, i) {
                return r ? 0 === e.offsetWidth && Xt.test(x.css(e, "display")) ? x.swap(e, Qt, function() {
                    return sn(e, n, i);
                }) : sn(e, n, i) : t;
            },
            set: function(e, t, r) {
                var i = r && Rt(e);
                return on(e, t, r ? an(e, n, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0);
            }
        };
    }), x.support.opacity || (x.cssHooks.opacity = {
        get: function(e, t) {
            return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
        },
        set: function(e, t) {
            var n = e.style, r = e.currentStyle, i = x.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === x.trim(o.replace($t, "")) && n.removeAttribute && (n.removeAttribute("filter"), 
            "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i);
        }
    }), x(function() {
        x.support.reliableMarginRight || (x.cssHooks.marginRight = {
            get: function(e, n) {
                return n ? x.swap(e, {
                    display: "inline-block"
                }, Wt, [ e, "marginRight" ]) : t;
            }
        }), !x.support.pixelPosition && x.fn.position && x.each([ "top", "left" ], function(e, n) {
            x.cssHooks[n] = {
                get: function(e, r) {
                    return r ? (r = Wt(e, n), Yt.test(r) ? x(e).position()[n] + "px" : r) : t;
                }
            };
        });
    }), x.expr && x.expr.filters && (x.expr.filters.hidden = function(e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !x.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || x.css(e, "display"));
    }, x.expr.filters.visible = function(e) {
        return !x.expr.filters.hidden(e);
    }), x.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        x.cssHooks[e + t] = {
            expand: function(n) {
                var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [ n ];
                for (;4 > r; r++) i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0];
                return i;
            }
        }, Ut.test(e) || (x.cssHooks[e + t].set = on);
    });
    var cn = /%20/g, pn = /\[\]$/, fn = /\r?\n/g, dn = /^(?:submit|button|image|reset|file)$/i, hn = /^(?:input|select|textarea|keygen)/i;
    x.fn.extend({
        serialize: function() {
            return x.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var e = x.prop(this, "elements");
                return e ? x.makeArray(e) : this;
            }).filter(function() {
                var e = this.type;
                return this.name && !x(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Ct.test(e));
            }).map(function(e, t) {
                var n = x(this).val();
                return null == n ? null : x.isArray(n) ? x.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(fn, "\r\n")
                    };
                }) : {
                    name: t.name,
                    value: n.replace(fn, "\r\n")
                };
            }).get();
        }
    }), x.param = function(e, n) {
        var r, i = [], o = function(e, t) {
            t = x.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        };
        if (n === t && (n = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function() {
            o(this.name, this.value);
        }); else for (r in e) gn(r, e[r], n, o);
        return i.join("&").replace(cn, "+");
    };
    function gn(e, t, n, r) {
        var i;
        if (x.isArray(t)) x.each(t, function(t, i) {
            n || pn.test(e) ? r(e, i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r);
        }); else if (n || "object" !== x.type(t)) r(e, t); else for (i in t) gn(e + "[" + i + "]", t[i], n, r);
    }
    x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        x.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
        };
    }), x.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n);
        },
        unbind: function(e, t) {
            return this.off(e, null, t);
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r);
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
        }
    });
    var mn, yn, vn = x.now(), bn = /\?/, xn = /#.*$/, wn = /([?&])_=[^&]*/, Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Cn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Nn = /^(?:GET|HEAD)$/, kn = /^\/\//, En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Sn = x.fn.load, An = {}, jn = {}, Dn = "*/".concat("*");
    try {
        yn = o.href;
    } catch (Ln) {
        yn = a.createElement("a"), yn.href = "", yn = yn.href;
    }
    mn = En.exec(yn.toLowerCase()) || [];
    function Hn(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0, o = t.toLowerCase().match(T) || [];
            if (x.isFunction(n)) while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
        };
    }
    function qn(e, n, r, i) {
        var o = {}, a = e === jn;
        function s(l) {
            var u;
            return o[l] = !0, x.each(e[l] || [], function(e, l) {
                var c = l(n, r, i);
                return "string" != typeof c || a || o[c] ? a ? !(u = c) : t : (n.dataTypes.unshift(c), 
                s(c), !1);
            }), u;
        }
        return s(n.dataTypes[0]) || !o["*"] && s("*");
    }
    function _n(e, n) {
        var r, i, o = x.ajaxSettings.flatOptions || {};
        for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
        return r && x.extend(!0, e, r), e;
    }
    x.fn.load = function(e, n, r) {
        if ("string" != typeof e && Sn) return Sn.apply(this, arguments);
        var i, o, a, s = this, l = e.indexOf(" ");
        return l >= 0 && (i = e.slice(l, e.length), e = e.slice(0, l)), x.isFunction(n) ? (r = n, 
        n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && x.ajax({
            url: e,
            type: a,
            dataType: "html",
            data: n
        }).done(function(e) {
            o = arguments, s.html(i ? x("<div>").append(x.parseHTML(e)).find(i) : e);
        }).complete(r && function(e, t) {
            s.each(r, o || [ e.responseText, t, e ]);
        }), this;
    }, x.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
        x.fn[t] = function(e) {
            return this.on(t, e);
        };
    }), x.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: yn,
            type: "GET",
            isLocal: Cn.test(mn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Dn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": x.parseJSON,
                "text xml": x.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? _n(_n(e, x.ajaxSettings), t) : _n(x.ajaxSettings, e);
        },
        ajaxPrefilter: Hn(An),
        ajaxTransport: Hn(jn),
        ajax: function(e, n) {
            "object" == typeof e && (n = e, e = t), n = n || {};
            var r, i, o, a, s, l, u, c, p = x.ajaxSetup({}, n), f = p.context || p, d = p.context && (f.nodeType || f.jquery) ? x(f) : x.event, h = x.Deferred(), g = x.Callbacks("once memory"), m = p.statusCode || {}, y = {}, v = {}, b = 0, w = "canceled", C = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === b) {
                        if (!c) {
                            c = {};
                            while (t = Tn.exec(a)) c[t[1].toLowerCase()] = t[2];
                        }
                        t = c[e.toLowerCase()];
                    }
                    return null == t ? null : t;
                },
                getAllResponseHeaders: function() {
                    return 2 === b ? a : null;
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return b || (e = v[n] = v[n] || e, y[e] = t), this;
                },
                overrideMimeType: function(e) {
                    return b || (p.mimeType = e), this;
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (2 > b) for (t in e) m[t] = [ m[t], e[t] ]; else C.always(e[C.status]);
                    return this;
                },
                abort: function(e) {
                    var t = e || w;
                    return u && u.abort(t), k(0, t), this;
                }
            };
            if (h.promise(C).complete = g.add, C.success = C.done, C.error = C.fail, p.url = ((e || p.url || yn) + "").replace(xn, "").replace(kn, mn[1] + "//"), 
            p.type = n.method || n.type || p.method || p.type, p.dataTypes = x.trim(p.dataType || "*").toLowerCase().match(T) || [ "" ], 
            null == p.crossDomain && (r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (mn[3] || ("http:" === mn[1] ? "80" : "443")))), 
            p.data && p.processData && "string" != typeof p.data && (p.data = x.param(p.data, p.traditional)), 
            qn(An, p, n, C), 2 === b) return C;
            l = p.global, l && 0 === x.active++ && x.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), 
            p.hasContent = !Nn.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (bn.test(o) ? "&" : "?") + p.data, 
            delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn, "$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)), 
            p.ifModified && (x.lastModified[o] && C.setRequestHeader("If-Modified-Since", x.lastModified[o]), 
            x.etag[o] && C.setRequestHeader("If-None-Match", x.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), 
            C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]);
            for (i in p.headers) C.setRequestHeader(i, p.headers[i]);
            if (p.beforeSend && (p.beforeSend.call(f, C, p) === !1 || 2 === b)) return C.abort();
            w = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) C[i](p[i]);
            if (u = qn(jn, p, n, C)) {
                C.readyState = 1, l && d.trigger("ajaxSend", [ C, p ]), p.async && p.timeout > 0 && (s = setTimeout(function() {
                    C.abort("timeout");
                }, p.timeout));
                try {
                    b = 1, u.send(y, k);
                } catch (N) {
                    if (!(2 > b)) throw N;
                    k(-1, N);
                }
            } else k(-1, "No Transport");
            function k(e, n, r, i) {
                var c, y, v, w, T, N = n;
                2 !== b && (b = 2, s && clearTimeout(s), u = t, a = i || "", C.readyState = e > 0 ? 4 : 0, 
                c = e >= 200 && 300 > e || 304 === e, r && (w = Mn(p, C, r)), w = On(p, w, C, c), 
                c ? (p.ifModified && (T = C.getResponseHeader("Last-Modified"), T && (x.lastModified[o] = T), 
                T = C.getResponseHeader("etag"), T && (x.etag[o] = T)), 204 === e || "HEAD" === p.type ? N = "nocontent" : 304 === e ? N = "notmodified" : (N = w.state, 
                y = w.data, v = w.error, c = !v)) : (v = N, (e || !N) && (N = "error", 0 > e && (e = 0))), 
                C.status = e, C.statusText = (n || N) + "", c ? h.resolveWith(f, [ y, N, C ]) : h.rejectWith(f, [ C, N, v ]), 
                C.statusCode(m), m = t, l && d.trigger(c ? "ajaxSuccess" : "ajaxError", [ C, p, c ? y : v ]), 
                g.fireWith(f, [ C, N ]), l && (d.trigger("ajaxComplete", [ C, p ]), --x.active || x.event.trigger("ajaxStop")));
            }
            return C;
        },
        getJSON: function(e, t, n) {
            return x.get(e, t, n, "json");
        },
        getScript: function(e, n) {
            return x.get(e, t, n, "script");
        }
    }), x.each([ "get", "post" ], function(e, n) {
        x[n] = function(e, r, i, o) {
            return x.isFunction(r) && (o = o || i, i = r, r = t), x.ajax({
                url: e,
                type: n,
                dataType: o,
                data: r,
                success: i
            });
        };
    });
    function Mn(e, n, r) {
        var i, o, a, s, l = e.contents, u = e.dataTypes;
        while ("*" === u[0]) u.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
        if (o) for (s in l) if (l[s] && l[s].test(o)) {
            u.unshift(s);
            break;
        }
        if (u[0] in r) a = u[0]; else {
            for (s in r) {
                if (!u[0] || e.converters[s + " " + u[0]]) {
                    a = s;
                    break;
                }
                i || (i = s);
            }
            a = a || i;
        }
        return a ? (a !== u[0] && u.unshift(a), r[a]) : t;
    }
    function On(e, t, n, r) {
        var i, o, a, s, l, u = {}, c = e.dataTypes.slice();
        if (c[1]) for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
        o = c.shift();
        while (o) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), 
        l = o, o = c.shift()) if ("*" === o) o = l; else if ("*" !== l && l !== o) {
            if (a = u[l + " " + o] || u["* " + o], !a) for (i in u) if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1]));
                break;
            }
            if (a !== !0) if (a && e["throws"]) t = a(t); else try {
                t = a(t);
            } catch (p) {
                return {
                    state: "parsererror",
                    error: a ? p : "No conversion from " + l + " to " + o
                };
            }
        }
        return {
            state: "success",
            data: t
        };
    }
    x.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return x.globalEval(e), e;
            }
        }
    }), x.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
    }), x.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var n, r = a.head || x("head")[0] || a.documentElement;
            return {
                send: function(t, i) {
                    n = a.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), 
                    n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
                        (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, 
                        n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"));
                    }, r.insertBefore(n, r.firstChild);
                },
                abort: function() {
                    n && n.onload(t, !0);
                }
            };
        }
    });
    var Fn = [], Bn = /(=)\?(?=&|$)|\?\?/;
    x.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Fn.pop() || x.expando + "_" + vn++;
            return this[e] = !0, e;
        }
    }), x.ajaxPrefilter("json jsonp", function(n, r, i) {
        var o, a, s, l = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data");
        return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = x.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, 
        l ? n[l] = n[l].replace(Bn, "$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), 
        n.converters["script json"] = function() {
            return s || x.error(o + " was not called"), s[0];
        }, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
            s = arguments;
        }, i.always(function() {
            e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Fn.push(o)), s && x.isFunction(a) && a(s[0]), 
            s = a = t;
        }), "script") : t;
    });
    var Pn, Rn, Wn = 0, $n = e.ActiveXObject && function() {
        var e;
        for (e in Pn) Pn[e](t, !0);
    };
    function In() {
        try {
            return new e.XMLHttpRequest();
        } catch (t) {}
    }
    function zn() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP");
        } catch (t) {}
    }
    x.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && In() || zn();
    } : In, Rn = x.ajaxSettings.xhr(), x.support.cors = !!Rn && "withCredentials" in Rn, 
    Rn = x.support.ajax = !!Rn, Rn && x.ajaxTransport(function(n) {
        if (!n.crossDomain || x.support.cors) {
            var r;
            return {
                send: function(i, o) {
                    var a, s, l = n.xhr();
                    if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), 
                    n.xhrFields) for (s in n.xhrFields) l[s] = n.xhrFields[s];
                    n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (s in i) l.setRequestHeader(s, i[s]);
                    } catch (u) {}
                    l.send(n.hasContent && n.data || null), r = function(e, i) {
                        var s, u, c, p;
                        try {
                            if (r && (i || 4 === l.readyState)) if (r = t, a && (l.onreadystatechange = x.noop, 
                            $n && delete Pn[a]), i) 4 !== l.readyState && l.abort(); else {
                                p = {}, s = l.status, u = l.getAllResponseHeaders(), "string" == typeof l.responseText && (p.text = l.responseText);
                                try {
                                    c = l.statusText;
                                } catch (f) {
                                    c = "";
                                }
                                s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = p.text ? 200 : 404;
                            }
                        } catch (d) {
                            i || o(-1, d);
                        }
                        p && o(s, c, p, u);
                    }, n.async ? 4 === l.readyState ? setTimeout(r) : (a = ++Wn, $n && (Pn || (Pn = {}, 
                    x(e).unload($n)), Pn[a] = r), l.onreadystatechange = r) : r();
                },
                abort: function() {
                    r && r(t, !0);
                }
            };
        }
    });
    var Xn, Un, Vn = /^(?:toggle|show|hide)$/, Yn = RegExp("^(?:([+-])=|)(" + w + ")([a-z%]*)$", "i"), Jn = /queueHooks$/, Gn = [ nr ], Qn = {
        "*": [ function(e, t) {
            var n = this.createTween(e, t), r = n.cur(), i = Yn.exec(t), o = i && i[3] || (x.cssNumber[e] ? "" : "px"), a = (x.cssNumber[e] || "px" !== o && +r) && Yn.exec(x.css(n.elem, e)), s = 1, l = 20;
            if (a && a[3] !== o) {
                o = o || a[3], i = i || [], a = +r || 1;
                do s = s || ".5", a /= s, x.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --l);
            }
            return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), 
            n;
        } ]
    };
    function Kn() {
        return setTimeout(function() {
            Xn = t;
        }), Xn = x.now();
    }
    function Zn(e, t, n) {
        var r, i = (Qn[t] || []).concat(Qn["*"]), o = 0, a = i.length;
        for (;a > o; o++) if (r = i[o].call(n, t, e)) return r;
    }
    function er(e, t, n) {
        var r, i, o = 0, a = Gn.length, s = x.Deferred().always(function() {
            delete l.elem;
        }), l = function() {
            if (i) return !1;
            var t = Xn || Kn(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length;
            for (;l > a; a++) u.tweens[a].run(o);
            return s.notifyWith(e, [ u, o, n ]), 1 > o && l ? n : (s.resolveWith(e, [ u ]), 
            !1);
        }, u = s.promise({
            elem: e,
            props: x.extend({}, t),
            opts: x.extend(!0, {
                specialEasing: {}
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: Xn || Kn(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = x.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                return u.tweens.push(r), r;
            },
            stop: function(t) {
                var n = 0, r = t ? u.tweens.length : 0;
                if (i) return this;
                for (i = !0; r > n; n++) u.tweens[n].run(1);
                return t ? s.resolveWith(e, [ u, t ]) : s.rejectWith(e, [ u, t ]), this;
            }
        }), c = u.props;
        for (tr(c, u.opts.specialEasing); a > o; o++) if (r = Gn[o].call(u, e, c, u.opts)) return r;
        return x.map(c, Zn, u), x.isFunction(u.opts.start) && u.opts.start.call(e, u), x.fx.timer(x.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always);
    }
    function tr(e, t) {
        var n, r, i, o, a;
        for (n in e) if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], 
        o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = x.cssHooks[r], a && "expand" in a) {
            o = a.expand(o), delete e[r];
            for (n in o) n in e || (e[n] = o[n], t[n] = i);
        } else t[r] = i;
    }
    x.Animation = x.extend(er, {
        tweener: function(e, t) {
            x.isFunction(e) ? (t = e, e = [ "*" ]) : e = e.split(" ");
            var n, r = 0, i = e.length;
            for (;i > r; r++) n = e[r], Qn[n] = Qn[n] || [], Qn[n].unshift(t);
        },
        prefilter: function(e, t) {
            t ? Gn.unshift(e) : Gn.push(e);
        }
    });
    function nr(e, t, n) {
        var r, i, o, a, s, l, u = this, c = {}, p = e.style, f = e.nodeType && nn(e), d = x._data(e, "fxshow");
        n.queue || (s = x._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, 
        s.empty.fire = function() {
            s.unqueued || l();
        }), s.unqueued++, u.always(function() {
            u.always(function() {
                s.unqueued--, x.queue(e, "fx").length || s.empty.fire();
            });
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [ p.overflow, p.overflowX, p.overflowY ], 
        "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (x.support.inlineBlockNeedsLayout && "inline" !== ln(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), 
        n.overflow && (p.overflow = "hidden", x.support.shrinkWrapBlocks || u.always(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2];
        }));
        for (r in t) if (i = t[r], Vn.exec(i)) {
            if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) continue;
            c[r] = d && d[r] || x.style(e, r);
        }
        if (!x.isEmptyObject(c)) {
            d ? "hidden" in d && (f = d.hidden) : d = x._data(e, "fxshow", {}), o && (d.hidden = !f), 
            f ? x(e).show() : u.done(function() {
                x(e).hide();
            }), u.done(function() {
                var t;
                x._removeData(e, "fxshow");
                for (t in c) x.style(e, t, c[t]);
            });
            for (r in c) a = Zn(f ? d[r] : 0, r, u), r in d || (d[r] = a.start, f && (a.end = a.start, 
            a.start = "width" === r || "height" === r ? 1 : 0));
        }
    }
    function rr(e, t, n, r, i) {
        return new rr.prototype.init(e, t, n, r, i);
    }
    x.Tween = rr, rr.prototype = {
        constructor: rr,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), 
            this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px");
        },
        cur: function() {
            var e = rr.propHooks[this.prop];
            return e && e.get ? e.get(this) : rr.propHooks._default.get(this);
        },
        run: function(e) {
            var t, n = rr.propHooks[this.prop];
            return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, 
            this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            n && n.set ? n.set(this) : rr.propHooks._default.set(this), this;
        }
    }, rr.prototype.init.prototype = rr.prototype, rr.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), 
                t && "auto" !== t ? t : 0) : e.elem[e.prop];
            },
            set: function(e) {
                x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
            }
        }
    }, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    }, x.each([ "toggle", "show", "hide" ], function(e, t) {
        var n = x.fn[t];
        x.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i);
        };
    }), x.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(nn).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r);
        },
        animate: function(e, t, n, r) {
            var i = x.isEmptyObject(e), o = x.speed(t, n, r), a = function() {
                var t = er(this, x.extend({}, e), o);
                (i || x._data(this, "finish")) && t.stop(!0);
            };
            return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a);
        },
        stop: function(e, n, r) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop, t(r);
            };
            return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), 
            this.each(function() {
                var t = !0, n = null != e && e + "queueHooks", o = x.timers, a = x._data(this);
                if (n) a[n] && a[n].stop && i(a[n]); else for (n in a) a[n] && a[n].stop && Jn.test(n) && i(a[n]);
                for (n = o.length; n--; ) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), 
                t = !1, o.splice(n, 1));
                (t || !r) && x.dequeue(this, e);
            });
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = x._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = x.timers, a = r ? r.length : 0;
                for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), 
                t = o.length; t--; ) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), 
                o.splice(t, 1));
                for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish;
            });
        }
    });
    function ir(e, t) {
        var n, r = {
            height: e
        }, i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Zt[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r;
    }
    x.each({
        slideDown: ir("show"),
        slideUp: ir("hide"),
        slideToggle: ir("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        x.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r);
        };
    }), x.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? x.extend({}, e) : {
            complete: n || !n && t || x.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !x.isFunction(t) && t
        };
        return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, 
        (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue);
        }, r;
    }, x.easing = {
        linear: function(e) {
            return e;
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        }
    }, x.timers = [], x.fx = rr.prototype.init, x.fx.tick = function() {
        var e, n = x.timers, r = 0;
        for (Xn = x.now(); n.length > r; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1);
        n.length || x.fx.stop(), Xn = t;
    }, x.fx.timer = function(e) {
        e() && x.timers.push(e) && x.fx.start();
    }, x.fx.interval = 13, x.fx.start = function() {
        Un || (Un = setInterval(x.fx.tick, x.fx.interval));
    }, x.fx.stop = function() {
        clearInterval(Un), Un = null;
    }, x.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function(e) {
        return x.grep(x.timers, function(t) {
            return e === t.elem;
        }).length;
    }), x.fn.offset = function(e) {
        if (arguments.length) return e === t ? this : this.each(function(t) {
            x.offset.setOffset(this, e, t);
        });
        var n, r, o = {
            top: 0,
            left: 0
        }, a = this[0], s = a && a.ownerDocument;
        if (s) return n = s.documentElement, x.contains(n, a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), 
        r = or(s), {
            top: o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
            left: o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
        }) : o;
    }, x.offset = {
        setOffset: function(e, t, n) {
            var r = x.css(e, "position");
            "static" === r && (e.style.position = "relative");
            var i = x(e), o = i.offset(), a = x.css(e, "top"), s = x.css(e, "left"), l = ("absolute" === r || "fixed" === r) && x.inArray("auto", [ a, s ]) > -1, u = {}, c = {}, p, f;
            l ? (c = i.position(), p = c.top, f = c.left) : (p = parseFloat(a) || 0, f = parseFloat(s) || 0), 
            x.isFunction(t) && (t = t.call(e, n, o)), null != t.top && (u.top = t.top - o.top + p), 
            null != t.left && (u.left = t.left - o.left + f), "using" in t ? t.using.call(e, u) : i.css(u);
        }
    }, x.fn.extend({
        position: function() {
            if (this[0]) {
                var e, t, n = {
                    top: 0,
                    left: 0
                }, r = this[0];
                return "fixed" === x.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), 
                t = this.offset(), x.nodeName(e[0], "html") || (n = e.offset()), n.top += x.css(e[0], "borderTopWidth", !0), 
                n.left += x.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - x.css(r, "marginTop", !0),
                    left: t.left - n.left - x.css(r, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || s;
                while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position")) e = e.offsetParent;
                return e || s;
            });
        }
    }), x.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var r = /Y/.test(n);
        x.fn[e] = function(i) {
            return x.access(this, function(e, i, o) {
                var a = or(e);
                return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? x(a).scrollLeft() : o, r ? o : x(a).scrollTop()) : e[i] = o, 
                t);
            }, e, i, arguments.length, null);
        };
    });
    function or(e) {
        return x.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1;
    }
    x.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        x.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function(r, i) {
            x.fn[i] = function(i, o) {
                var a = arguments.length && (r || "boolean" != typeof i), s = r || (i === !0 || o === !0 ? "margin" : "border");
                return x.access(this, function(n, r, i) {
                    var o;
                    return x.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, 
                    Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? x.css(n, r, s) : x.style(n, r, i, s);
                }, n, a ? i : t, a, null);
            };
        });
    }), x.fn.size = function() {
        return this.length;
    }, x.fn.andSelf = x.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = x : (e.jQuery = e.$ = x, 
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return x;
    }));
})(window);

(function(window, undefined) {
    "use strict";
    var History = window.History = window.History || {}, jQuery = window.jQuery;
    if (typeof History.Adapter !== "undefined") {
        throw new Error("History.js Adapter has already been loaded...");
    }
    History.Adapter = {
        bind: function(el, event, callback) {
            jQuery(el).bind(event, callback);
        },
        trigger: function(el, event, extra) {
            jQuery(el).trigger(event, extra);
        },
        extractEventData: function(key, event, extra) {
            var result = event && event.originalEvent && event.originalEvent[key] || extra && extra[key] || undefined;
            return result;
        },
        onDomLoad: function(callback) {
            jQuery(callback);
        }
    };
    if (typeof History.init !== "undefined") {
        History.init();
    }
})(window);

(function(window, undefined) {
    "use strict";
    var console = window.console || undefined, document = window.document, navigator = window.navigator, sessionStorage = false, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, setInterval = window.setInterval, clearInterval = window.clearInterval, JSON = window.JSON, alert = window.alert, History = window.History = window.History || {}, history = window.history;
    try {
        sessionStorage = window.sessionStorage;
        sessionStorage.setItem("TEST", "1");
        sessionStorage.removeItem("TEST");
    } catch (e) {
        sessionStorage = false;
    }
    JSON.stringify = JSON.stringify || JSON.encode;
    JSON.parse = JSON.parse || JSON.decode;
    if (typeof History.init !== "undefined") {
        throw new Error("History.js Core has already been loaded...");
    }
    History.init = function(options) {
        if (typeof History.Adapter === "undefined") {
            return false;
        }
        if (typeof History.initCore !== "undefined") {
            History.initCore();
        }
        if (typeof History.initHtml4 !== "undefined") {
            History.initHtml4();
        }
        return true;
    };
    History.initCore = function(options) {
        if (typeof History.initCore.initialized !== "undefined") {
            return false;
        } else {
            History.initCore.initialized = true;
        }
        History.options = History.options || {};
        History.options.hashChangeInterval = History.options.hashChangeInterval || 100;
        History.options.safariPollInterval = History.options.safariPollInterval || 500;
        History.options.doubleCheckInterval = History.options.doubleCheckInterval || 500;
        History.options.disableSuid = History.options.disableSuid || false;
        History.options.storeInterval = History.options.storeInterval || 1e3;
        History.options.busyDelay = History.options.busyDelay || 250;
        History.options.debug = History.options.debug || false;
        History.options.initialTitle = History.options.initialTitle || document.title;
        History.options.html4Mode = History.options.html4Mode || false;
        History.options.delayInit = History.options.delayInit || false;
        History.intervalList = [];
        History.clearAllIntervals = function() {
            var i, il = History.intervalList;
            if (typeof il !== "undefined" && il !== null) {
                for (i = 0; i < il.length; i++) {
                    clearInterval(il[i]);
                }
                History.intervalList = null;
            }
        };
        History.debug = function() {
            if (History.options.debug || false) {
                History.log.apply(History, arguments);
            }
        };
        History.log = function() {
            var consoleExists = !(typeof console === "undefined" || typeof console.log === "undefined" || typeof console.log.apply === "undefined"), textarea = document.getElementById("log"), message, i, n, args, arg;
            if (consoleExists) {
                args = Array.prototype.slice.call(arguments);
                message = args.shift();
                if (typeof console.debug !== "undefined") {
                    console.debug.apply(console, [ message, args ]);
                } else {
                    console.log.apply(console, [ message, args ]);
                }
            } else {
                message = "\n" + arguments[0] + "\n";
            }
            for (i = 1, n = arguments.length; i < n; ++i) {
                arg = arguments[i];
                if (typeof arg === "object" && typeof JSON !== "undefined") {
                    try {
                        arg = JSON.stringify(arg);
                    } catch (Exception) {}
                }
                message += "\n" + arg + "\n";
            }
            if (textarea) {
                textarea.value += message + "\n-----\n";
                textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight;
            } else if (!consoleExists) {
                alert(message);
            }
            return true;
        };
        History.getInternetExplorerMajorVersion = function() {
            var result = History.getInternetExplorerMajorVersion.cached = typeof History.getInternetExplorerMajorVersion.cached !== "undefined" ? History.getInternetExplorerMajorVersion.cached : function() {
                var v = 3, div = document.createElement("div"), all = div.getElementsByTagName("i");
                while ((div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->") && all[0]) {}
                return v > 4 ? v : false;
            }();
            return result;
        };
        History.isInternetExplorer = function() {
            var result = History.isInternetExplorer.cached = typeof History.isInternetExplorer.cached !== "undefined" ? History.isInternetExplorer.cached : Boolean(History.getInternetExplorerMajorVersion());
            return result;
        };
        if (History.options.html4Mode) {
            History.emulated = {
                pushState: true,
                hashChange: true
            };
        } else {
            History.emulated = {
                pushState: !Boolean(window.history && window.history.pushState && window.history.replaceState && !(/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(navigator.userAgent) || /AppleWebKit\/5([0-2]|3[0-2])/i.test(navigator.userAgent))),
                hashChange: Boolean(!("onhashchange" in window || "onhashchange" in document) || History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 8)
            };
        }
        History.enabled = !History.emulated.pushState;
        History.bugs = {
            setHash: Boolean(!History.emulated.pushState && navigator.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),
            safariPoll: Boolean(!History.emulated.pushState && navigator.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),
            ieDoubleCheck: Boolean(History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 8),
            hashEscape: Boolean(History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 7)
        };
        History.isEmptyObject = function(obj) {
            for (var name in obj) {
                if (obj.hasOwnProperty(name)) {
                    return false;
                }
            }
            return true;
        };
        History.cloneObject = function(obj) {
            var hash, newObj;
            if (obj) {
                hash = JSON.stringify(obj);
                newObj = JSON.parse(hash);
            } else {
                newObj = {};
            }
            return newObj;
        };
        History.getRootUrl = function() {
            var rootUrl = document.location.protocol + "//" + (document.location.hostname || document.location.host);
            if (document.location.port || false) {
                rootUrl += ":" + document.location.port;
            }
            rootUrl += "/";
            return rootUrl;
        };
        History.getBaseHref = function() {
            var baseElements = document.getElementsByTagName("base"), baseElement = null, baseHref = "";
            if (baseElements.length === 1) {
                baseElement = baseElements[0];
                baseHref = baseElement.href.replace(/[^\/]+$/, "");
            }
            baseHref = baseHref.replace(/\/+$/, "");
            if (baseHref) baseHref += "/";
            return baseHref;
        };
        History.getBaseUrl = function() {
            var baseUrl = History.getBaseHref() || History.getBasePageUrl() || History.getRootUrl();
            return baseUrl;
        };
        History.getPageUrl = function() {
            var State = History.getState(false, false), stateUrl = (State || {}).url || History.getLocationHref(), pageUrl;
            pageUrl = stateUrl.replace(/\/+$/, "").replace(/[^\/]+$/, function(part, index, string) {
                return /\./.test(part) ? part : part + "/";
            });
            return pageUrl;
        };
        History.getBasePageUrl = function() {
            var basePageUrl = History.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(part, index, string) {
                return /[^\/]$/.test(part) ? "" : part;
            }).replace(/\/+$/, "") + "/";
            return basePageUrl;
        };
        History.getFullUrl = function(url, allowBaseHref) {
            var fullUrl = url, firstChar = url.substring(0, 1);
            allowBaseHref = typeof allowBaseHref === "undefined" ? true : allowBaseHref;
            if (/[a-z]+\:\/\//.test(url)) {} else if (firstChar === "/") {
                fullUrl = History.getRootUrl() + url.replace(/^\/+/, "");
            } else if (firstChar === "#") {
                fullUrl = History.getPageUrl().replace(/#.*/, "") + url;
            } else if (firstChar === "?") {
                fullUrl = History.getPageUrl().replace(/[\?#].*/, "") + url;
            } else {
                if (allowBaseHref) {
                    fullUrl = History.getBaseUrl() + url.replace(/^(\.\/)+/, "");
                } else {
                    fullUrl = History.getBasePageUrl() + url.replace(/^(\.\/)+/, "");
                }
            }
            return fullUrl.replace(/\#$/, "");
        };
        History.getShortUrl = function(url) {
            var shortUrl = url, baseUrl = History.getBaseUrl(), rootUrl = History.getRootUrl();
            if (History.emulated.pushState) {
                shortUrl = shortUrl.replace(baseUrl, "");
            }
            shortUrl = shortUrl.replace(rootUrl, "/");
            if (History.isTraditionalAnchor(shortUrl)) {
                shortUrl = "./" + shortUrl;
            }
            shortUrl = shortUrl.replace(/^(\.\/)+/g, "./").replace(/\#$/, "");
            return shortUrl;
        };
        History.getLocationHref = function(doc) {
            doc = doc || document;
            if (doc.URL === doc.location.href) return doc.location.href;
            if (doc.location.href === decodeURIComponent(doc.URL)) return doc.URL;
            if (doc.location.hash && decodeURIComponent(doc.location.href.replace(/^[^#]+/, "")) === doc.location.hash) return doc.location.href;
            if (doc.URL.indexOf("#") == -1 && doc.location.href.indexOf("#") != -1) return doc.location.href;
            return doc.URL || doc.location.href;
        };
        History.store = {};
        History.idToState = History.idToState || {};
        History.stateToId = History.stateToId || {};
        History.urlToId = History.urlToId || {};
        History.storedStates = History.storedStates || [];
        History.savedStates = History.savedStates || [];
        History.normalizeStore = function() {
            History.store.idToState = History.store.idToState || {};
            History.store.urlToId = History.store.urlToId || {};
            History.store.stateToId = History.store.stateToId || {};
        };
        History.getState = function(friendly, create) {
            if (typeof friendly === "undefined") {
                friendly = true;
            }
            if (typeof create === "undefined") {
                create = true;
            }
            var State = History.getLastSavedState();
            if (!State && create) {
                State = History.createStateObject();
            }
            if (friendly) {
                State = History.cloneObject(State);
                State.url = State.cleanUrl || State.url;
            }
            return State;
        };
        History.getIdByState = function(newState) {
            var id = History.extractId(newState.url), str;
            if (!id) {
                str = History.getStateString(newState);
                if (typeof History.stateToId[str] !== "undefined") {
                    id = History.stateToId[str];
                } else if (typeof History.store.stateToId[str] !== "undefined") {
                    id = History.store.stateToId[str];
                } else {
                    while (true) {
                        id = new Date().getTime() + String(Math.random()).replace(/\D/g, "");
                        if (typeof History.idToState[id] === "undefined" && typeof History.store.idToState[id] === "undefined") {
                            break;
                        }
                    }
                    History.stateToId[str] = id;
                    History.idToState[id] = newState;
                }
            }
            return id;
        };
        History.normalizeState = function(oldState) {
            var newState, dataNotEmpty;
            if (!oldState || typeof oldState !== "object") {
                oldState = {};
            }
            if (typeof oldState.normalized !== "undefined") {
                return oldState;
            }
            if (!oldState.data || typeof oldState.data !== "object") {
                oldState.data = {};
            }
            newState = {};
            newState.normalized = true;
            newState.title = oldState.title || "";
            newState.url = History.getFullUrl(oldState.url ? oldState.url : History.getLocationHref());
            newState.hash = History.getShortUrl(newState.url);
            newState.data = History.cloneObject(oldState.data);
            newState.id = History.getIdByState(newState);
            newState.cleanUrl = newState.url.replace(/\??\&_suid.*/, "");
            newState.url = newState.cleanUrl;
            dataNotEmpty = !History.isEmptyObject(newState.data);
            if ((newState.title || dataNotEmpty) && History.options.disableSuid !== true) {
                newState.hash = History.getShortUrl(newState.url).replace(/\??\&_suid.*/, "");
                if (!/\?/.test(newState.hash)) {
                    newState.hash += "?";
                }
                newState.hash += "&_suid=" + newState.id;
            }
            newState.hashedUrl = History.getFullUrl(newState.hash);
            if ((History.emulated.pushState || History.bugs.safariPoll) && History.hasUrlDuplicate(newState)) {
                newState.url = newState.hashedUrl;
            }
            return newState;
        };
        History.createStateObject = function(data, title, url) {
            var State = {
                data: data,
                title: title,
                url: url
            };
            State = History.normalizeState(State);
            return State;
        };
        History.getStateById = function(id) {
            id = String(id);
            var State = History.idToState[id] || History.store.idToState[id] || undefined;
            return State;
        };
        History.getStateString = function(passedState) {
            var State, cleanedState, str;
            State = History.normalizeState(passedState);
            cleanedState = {
                data: State.data,
                title: passedState.title,
                url: passedState.url
            };
            str = JSON.stringify(cleanedState);
            return str;
        };
        History.getStateId = function(passedState) {
            var State, id;
            State = History.normalizeState(passedState);
            id = State.id;
            return id;
        };
        History.getHashByState = function(passedState) {
            var State, hash;
            State = History.normalizeState(passedState);
            hash = State.hash;
            return hash;
        };
        History.extractId = function(url_or_hash) {
            var id, parts, url, tmp;
            if (url_or_hash.indexOf("#") != -1) {
                tmp = url_or_hash.split("#")[0];
            } else {
                tmp = url_or_hash;
            }
            parts = /(.*)\&_suid=([0-9]+)$/.exec(tmp);
            url = parts ? parts[1] || url_or_hash : url_or_hash;
            id = parts ? String(parts[2] || "") : "";
            return id || false;
        };
        History.isTraditionalAnchor = function(url_or_hash) {
            var isTraditional = !/[\/\?\.]/.test(url_or_hash);
            return isTraditional;
        };
        History.extractState = function(url_or_hash, create) {
            var State = null, id, url;
            create = create || false;
            id = History.extractId(url_or_hash);
            if (id) {
                State = History.getStateById(id);
            }
            if (!State) {
                url = History.getFullUrl(url_or_hash);
                id = History.getIdByUrl(url) || false;
                if (id) {
                    State = History.getStateById(id);
                }
                if (!State && create && !History.isTraditionalAnchor(url_or_hash)) {
                    State = History.createStateObject(null, null, url);
                }
            }
            return State;
        };
        History.getIdByUrl = function(url) {
            var id = History.urlToId[url] || History.store.urlToId[url] || undefined;
            return id;
        };
        History.getLastSavedState = function() {
            return History.savedStates[History.savedStates.length - 1] || undefined;
        };
        History.getLastStoredState = function() {
            return History.storedStates[History.storedStates.length - 1] || undefined;
        };
        History.hasUrlDuplicate = function(newState) {
            var hasDuplicate = false, oldState;
            oldState = History.extractState(newState.url);
            hasDuplicate = oldState && oldState.id !== newState.id;
            return hasDuplicate;
        };
        History.storeState = function(newState) {
            History.urlToId[newState.url] = newState.id;
            History.storedStates.push(History.cloneObject(newState));
            return newState;
        };
        History.isLastSavedState = function(newState) {
            var isLast = false, newId, oldState, oldId;
            if (History.savedStates.length) {
                newId = newState.id;
                oldState = History.getLastSavedState();
                oldId = oldState.id;
                isLast = newId === oldId;
            }
            return isLast;
        };
        History.saveState = function(newState) {
            if (History.isLastSavedState(newState)) {
                return false;
            }
            History.savedStates.push(History.cloneObject(newState));
            return true;
        };
        History.getStateByIndex = function(index) {
            var State = null;
            if (typeof index === "undefined") {
                State = History.savedStates[History.savedStates.length - 1];
            } else if (index < 0) {
                State = History.savedStates[History.savedStates.length + index];
            } else {
                State = History.savedStates[index];
            }
            return State;
        };
        History.getCurrentIndex = function() {
            var index = null;
            if (History.savedStates.length < 1) {
                index = 0;
            } else {
                index = History.savedStates.length - 1;
            }
            return index;
        };
        History.getHash = function(doc) {
            var url = History.getLocationHref(doc), hash;
            hash = History.getHashByUrl(url);
            return hash;
        };
        History.unescapeHash = function(hash) {
            var result = History.normalizeHash(hash);
            result = decodeURIComponent(result);
            return result;
        };
        History.normalizeHash = function(hash) {
            var result = hash.replace(/[^#]*#/, "").replace(/#.*/, "");
            return result;
        };
        History.setHash = function(hash, queue) {
            var State, pageUrl;
            if (queue !== false && History.busy()) {
                History.pushQueue({
                    scope: History,
                    callback: History.setHash,
                    args: arguments,
                    queue: queue
                });
                return false;
            }
            History.busy(true);
            State = History.extractState(hash, true);
            if (State && !History.emulated.pushState) {
                History.pushState(State.data, State.title, State.url, false);
            } else if (History.getHash() !== hash) {
                if (History.bugs.setHash) {
                    pageUrl = History.getPageUrl();
                    History.pushState(null, null, pageUrl + "#" + hash, false);
                } else {
                    document.location.hash = hash;
                }
            }
            return History;
        };
        History.escapeHash = function(hash) {
            var result = History.normalizeHash(hash);
            result = window.encodeURIComponent(result);
            if (!History.bugs.hashEscape) {
                result = result.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?");
            }
            return result;
        };
        History.getHashByUrl = function(url) {
            var hash = String(url).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            hash = History.unescapeHash(hash);
            return hash;
        };
        History.setTitle = function(newState) {
            var title = newState.title, firstState;
            if (!title) {
                firstState = History.getStateByIndex(0);
                if (firstState && firstState.url === newState.url) {
                    title = firstState.title || History.options.initialTitle;
                }
            }
            try {
                document.getElementsByTagName("title")[0].innerHTML = title.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ");
            } catch (Exception) {}
            document.title = title;
            return History;
        };
        History.queues = [];
        History.busy = function(value) {
            if (typeof value !== "undefined") {
                History.busy.flag = value;
            } else if (typeof History.busy.flag === "undefined") {
                History.busy.flag = false;
            }
            if (!History.busy.flag) {
                clearTimeout(History.busy.timeout);
                var fireNext = function() {
                    var i, queue, item;
                    if (History.busy.flag) return;
                    for (i = History.queues.length - 1; i >= 0; --i) {
                        queue = History.queues[i];
                        if (queue.length === 0) continue;
                        item = queue.shift();
                        History.fireQueueItem(item);
                        History.busy.timeout = setTimeout(fireNext, History.options.busyDelay);
                    }
                };
                History.busy.timeout = setTimeout(fireNext, History.options.busyDelay);
            }
            return History.busy.flag;
        };
        History.busy.flag = false;
        History.fireQueueItem = function(item) {
            return item.callback.apply(item.scope || History, item.args || []);
        };
        History.pushQueue = function(item) {
            History.queues[item.queue || 0] = History.queues[item.queue || 0] || [];
            History.queues[item.queue || 0].push(item);
            return History;
        };
        History.queue = function(item, queue) {
            if (typeof item === "function") {
                item = {
                    callback: item
                };
            }
            if (typeof queue !== "undefined") {
                item.queue = queue;
            }
            if (History.busy()) {
                History.pushQueue(item);
            } else {
                History.fireQueueItem(item);
            }
            return History;
        };
        History.clearQueue = function() {
            History.busy.flag = false;
            History.queues = [];
            return History;
        };
        History.stateChanged = false;
        History.doubleChecker = false;
        History.doubleCheckComplete = function() {
            History.stateChanged = true;
            History.doubleCheckClear();
            return History;
        };
        History.doubleCheckClear = function() {
            if (History.doubleChecker) {
                clearTimeout(History.doubleChecker);
                History.doubleChecker = false;
            }
            return History;
        };
        History.doubleCheck = function(tryAgain) {
            History.stateChanged = false;
            History.doubleCheckClear();
            if (History.bugs.ieDoubleCheck) {
                History.doubleChecker = setTimeout(function() {
                    History.doubleCheckClear();
                    if (!History.stateChanged) {
                        tryAgain();
                    }
                    return true;
                }, History.options.doubleCheckInterval);
            }
            return History;
        };
        History.safariStatePoll = function() {
            var urlState = History.extractState(History.getLocationHref()), newState;
            if (!History.isLastSavedState(urlState)) {
                newState = urlState;
            } else {
                return;
            }
            if (!newState) {
                newState = History.createStateObject();
            }
            History.Adapter.trigger(window, "popstate");
            return History;
        };
        History.back = function(queue) {
            if (queue !== false && History.busy()) {
                History.pushQueue({
                    scope: History,
                    callback: History.back,
                    args: arguments,
                    queue: queue
                });
                return false;
            }
            History.busy(true);
            History.doubleCheck(function() {
                History.back(false);
            });
            history.go(-1);
            return true;
        };
        History.forward = function(queue) {
            if (queue !== false && History.busy()) {
                History.pushQueue({
                    scope: History,
                    callback: History.forward,
                    args: arguments,
                    queue: queue
                });
                return false;
            }
            History.busy(true);
            History.doubleCheck(function() {
                History.forward(false);
            });
            history.go(1);
            return true;
        };
        History.go = function(index, queue) {
            var i;
            if (index > 0) {
                for (i = 1; i <= index; ++i) {
                    History.forward(queue);
                }
            } else if (index < 0) {
                for (i = -1; i >= index; --i) {
                    History.back(queue);
                }
            } else {
                throw new Error("History.go: History.go requires a positive or negative integer passed.");
            }
            return History;
        };
        if (History.emulated.pushState) {
            var emptyFunction = function() {};
            History.pushState = History.pushState || emptyFunction;
            History.replaceState = History.replaceState || emptyFunction;
        } else {
            History.onPopState = function(event, extra) {
                var stateId = false, newState = false, currentHash, currentState;
                History.doubleCheckComplete();
                currentHash = History.getHash();
                if (currentHash) {
                    currentState = History.extractState(currentHash || History.getLocationHref(), true);
                    if (currentState) {
                        History.replaceState(currentState.data, currentState.title, currentState.url, false);
                    } else {
                        History.Adapter.trigger(window, "anchorchange");
                        History.busy(false);
                    }
                    History.expectedStateId = false;
                    return false;
                }
                stateId = History.Adapter.extractEventData("state", event, extra) || false;
                if (stateId) {
                    newState = History.getStateById(stateId);
                } else if (History.expectedStateId) {
                    newState = History.getStateById(History.expectedStateId);
                } else {
                    newState = History.extractState(History.getLocationHref());
                }
                if (!newState) {
                    newState = History.createStateObject(null, null, History.getLocationHref());
                }
                History.expectedStateId = false;
                if (History.isLastSavedState(newState)) {
                    History.busy(false);
                    return false;
                }
                History.storeState(newState);
                History.saveState(newState);
                History.setTitle(newState);
                History.Adapter.trigger(window, "statechange");
                History.busy(false);
                return true;
            };
            History.Adapter.bind(window, "popstate", History.onPopState);
            History.pushState = function(data, title, url, queue) {
                if (History.getHashByUrl(url) && History.emulated.pushState) {
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                }
                if (queue !== false && History.busy()) {
                    History.pushQueue({
                        scope: History,
                        callback: History.pushState,
                        args: arguments,
                        queue: queue
                    });
                    return false;
                }
                History.busy(true);
                var newState = History.createStateObject(data, title, url);
                if (History.isLastSavedState(newState)) {
                    History.busy(false);
                } else {
                    History.storeState(newState);
                    History.expectedStateId = newState.id;
                    history.pushState(newState.id, newState.title, newState.url);
                    History.Adapter.trigger(window, "popstate");
                }
                return true;
            };
            History.replaceState = function(data, title, url, queue) {
                if (History.getHashByUrl(url) && History.emulated.pushState) {
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                }
                if (queue !== false && History.busy()) {
                    History.pushQueue({
                        scope: History,
                        callback: History.replaceState,
                        args: arguments,
                        queue: queue
                    });
                    return false;
                }
                History.busy(true);
                var newState = History.createStateObject(data, title, url);
                if (History.isLastSavedState(newState)) {
                    History.busy(false);
                } else {
                    History.storeState(newState);
                    History.expectedStateId = newState.id;
                    history.replaceState(newState.id, newState.title, newState.url);
                    History.Adapter.trigger(window, "popstate");
                }
                return true;
            };
        }
        if (sessionStorage) {
            try {
                History.store = JSON.parse(sessionStorage.getItem("History.store")) || {};
            } catch (err) {
                History.store = {};
            }
            History.normalizeStore();
        } else {
            History.store = {};
            History.normalizeStore();
        }
        History.Adapter.bind(window, "unload", History.clearAllIntervals);
        History.saveState(History.storeState(History.extractState(History.getLocationHref(), true)));
        if (sessionStorage) {
            History.onUnload = function() {
                var currentStore, item, currentStoreString;
                try {
                    currentStore = JSON.parse(sessionStorage.getItem("History.store")) || {};
                } catch (err) {
                    currentStore = {};
                }
                currentStore.idToState = currentStore.idToState || {};
                currentStore.urlToId = currentStore.urlToId || {};
                currentStore.stateToId = currentStore.stateToId || {};
                for (item in History.idToState) {
                    if (!History.idToState.hasOwnProperty(item)) {
                        continue;
                    }
                    currentStore.idToState[item] = History.idToState[item];
                }
                for (item in History.urlToId) {
                    if (!History.urlToId.hasOwnProperty(item)) {
                        continue;
                    }
                    currentStore.urlToId[item] = History.urlToId[item];
                }
                for (item in History.stateToId) {
                    if (!History.stateToId.hasOwnProperty(item)) {
                        continue;
                    }
                    currentStore.stateToId[item] = History.stateToId[item];
                }
                History.store = currentStore;
                History.normalizeStore();
                currentStoreString = JSON.stringify(currentStore);
                try {
                    sessionStorage.setItem("History.store", currentStoreString);
                } catch (e) {
                    if (e.code === DOMException.QUOTA_EXCEEDED_ERR) {
                        if (sessionStorage.length) {
                            sessionStorage.removeItem("History.store");
                            sessionStorage.setItem("History.store", currentStoreString);
                        } else {}
                    } else {
                        throw e;
                    }
                }
            };
            History.intervalList.push(setInterval(History.onUnload, History.options.storeInterval));
            History.Adapter.bind(window, "beforeunload", History.onUnload);
            History.Adapter.bind(window, "unload", History.onUnload);
        }
        if (!History.emulated.pushState) {
            if (History.bugs.safariPoll) {
                History.intervalList.push(setInterval(History.safariStatePoll, History.options.safariPollInterval));
            }
            if (navigator.vendor === "Apple Computer, Inc." || (navigator.appCodeName || "") === "Mozilla") {
                History.Adapter.bind(window, "hashchange", function() {
                    History.Adapter.trigger(window, "popstate");
                });
                if (History.getHash()) {
                    History.Adapter.onDomLoad(function() {
                        History.Adapter.trigger(window, "hashchange");
                    });
                }
            }
        }
    };
    if (!History.options || !History.options.delayInit) {
        History.init();
    }
})(window);

(function($) {
    $.fn.cms_string = function(reference) {
        this.html(Site.get_cms_string(reference));
        this.click(function(event) {
            if (Site.cms_mode) {
                event.preventDefault();
                Site.clicked_cms_string(reference, this);
            }
        });
        return this;
    };
})(jQuery);

(function($) {
    $.fn.ajax_url = function(custom_trigger, on_trigger) {
        var element = this;
        element.tappable(function(event) {
            var custom_trigger_return = null;
            if (custom_trigger != null) {
                custom_trigger_return = custom_trigger(event);
            }
            if (custom_trigger_return == null || custom_trigger_return == true) {
                if (on_trigger != null) {
                    on_trigger(event);
                }
                if (event.metaKey == true) {} else {
                    if (Site.history_state_supported) {
                        if (!event.isDefaultPrevented()) {
                            event.preventDefault();
                            Site.load_url($(element).attr("href"), true);
                        }
                    }
                }
            } else {
                event.preventDefault();
            }
        });
        return element;
    };
})(jQuery);

(function($) {
    var touchSupported = "ontouchstart" in window;
    $.fn.tappable = function(options) {
        var cancelOnMove = true, onlyIf = function() {
            return true;
        }, touchDelay = 0, callback;
        switch (typeof options) {
          case "function":
            callback = options;
            break;

          case "object":
            callback = options.callback;
            if (typeof options.cancelOnMove != "undefined") {
                cancelOnMove = options.cancelOnMove;
            }
            if (typeof options.onlyIf != "undefined") {
                onlyIf = options.onlyIf;
            }
            if (typeof options.touchDelay != "undefined") {
                touchDelay = options.touchDelay;
            }
            break;

          default:
            break;
        }
        var fireCallback = function(el, event) {
            if (typeof callback == "function" && onlyIf(el)) {
                callback.call(el, event);
                event.preventDefault();
                event.stopPropagation();
            }
        };
        if (touchSupported) {
            this.unbind("touchstart");
            this.bind("touchstart", function(event) {
                var el = this;
                if (onlyIf(this)) {
                    $(el).addClass("touch-started");
                    window.setTimeout(function() {
                        if ($(el).hasClass("touch-started")) {
                            $(el).addClass("touched");
                        }
                    }, touchDelay);
                }
                return true;
            });
            this.unbind("touchend");
            this.bind("touchend", function(event) {
                var el = this;
                if ($(el).hasClass("touch-started")) {
                    $(el).removeClass("touched").removeClass("touch-started");
                    if ($(event.target).is('input[type="checkbox"]')) {
                        $(event.target).attr("checked", !$(event.target).is(":checked"));
                    }
                    if ($(event.target).is("label")) {
                        var forId = $(event.target).attr("for");
                        var forEl = $("#" + forId);
                        if (forEl.is(":checkbox")) {
                            forEl.attr("checked", !forEl.is(":checked"));
                        } else {
                            forEl.focus();
                        }
                    }
                    if ($(event.target).is("a")) {
                        var target = $(event.target);
                        var href = target.attr("href");
                        if (href !== "" && href !== "javascript:;" && href.indexOf("#") < 0) {
                            if (target.attr("target") === "_blank") {
                                window.open(target.attr("href"));
                            } else {
                                window.location.href = target.attr("href");
                            }
                            return false;
                        }
                    }
                    fireCallback(el, event);
                }
                return true;
            });
            this.unbind("click");
            this.bind("click", function(event) {
                event.preventDefault();
            });
            if (cancelOnMove) {
                this.unbind("touchmove");
                this.bind("touchmove", function() {
                    $(this).removeClass("touched").removeClass("touch-started");
                });
            }
        } else if (typeof callback == "function") {
            this.unbind("click");
            this.bind("click", function(event) {
                if (onlyIf(this)) {
                    callback.call(this, event);
                }
            });
        }
        return this;
    };
})(jQuery);

function Page() {
    var page = this;
    page.element = $("<div />");
}

Page.prototype.new_url = function() {
    return "NOT_SET";
};

Page.prototype.get_title = function() {
    var page = this;
    return null;
};

Page.prototype.shows_menu = function() {
    var page = this;
    return false;
};

Page.prototype.resize = function(resize_obj) {
    var page = this;
};

Page.prototype.init = function() {
    var page = this;
};

Page.prototype.remove = function() {
    var page = this;
};

function extend(sub, sup) {
    function emptyclass() {}
    emptyclass.prototype = sup.prototype;
    sub.prototype = new emptyclass();
    sub.prototype.constructor = sub;
    sub.superConstructor = sup;
    sub.superClass = sup.prototype;
}

function SiteFramework() {
    var sf = this;
    Site = this;
    sf.debug = false;
    sf.initial_url = true;
    sf.map = {};
    sf.ignore_next_url = false;
    sf.origin = window.location.protocol + "//" + window.location.hostname;
    if (window.location.port != "") {
        sf.origin += ":" + window.location.port;
    }
    sf.path = "";
    sf.url_changed_callback = function(url) {};
    sf.transition_page_callback = function(new_page, old_page) {
        return false;
    };
    sf.on_resize = function(resize_obj) {};
    sf.get_cms_string = function(id) {
        return "Must set Site.get_cms_string to use custom CMS strings";
    };
    sf.get_cms_image = function(ref) {
        return [ "", "Must set Site.get_cms_image to use custom CMS images" ];
    };
    sf.clicked_cms_image = function(ref, element) {};
    sf.clicked_cms_string = function(ref, element) {};
    sf.cms_mode = false;
    sf.scroll_bar_width_value = -1;
    sf.element = $("<div />");
    sf.is_touchscreen = "ontouchstart" in document.documentElement;
    sf.history_state_supported = !!(window.history && window.history.pushState);
    sf.current_page = null;
    sf.no_page_found_class = null;
}

SiteFramework.console = console;

if (typeof SiteFramework.console === "undefined") {
    var cons = {};
    cons.log = cons.error = cons.info = cons.debug = cons.warn = cons.trace = cons.dir = cons.dirxml = cons.group = cons.groupEnd = cons.time = cons.timeEnd = cons.assert = cons.profile = function() {};
    SiteFramework.console = cons;
}

SiteFramework.prototype.use_page_class = function(class_name, parameters, url, wildcard_contents) {
    var sf = this;
    if (class_name == null) {
        if (sf.no_page_found_class == null) {
            if (sf.current_page != null) {
                sf.current_page.remove();
                sf.current_page = null;
                sf.previous_class_name = null;
            }
            sf.element.text("No 404 page set. Use Site.set_no_page_found_class(class_name) to set one.");
            return;
        } else {
            class_name = sf.no_page_found_class;
        }
    }
    var load_new_page = true;
    if (class_name == sf.previous_class_name) {
        var new_url_response = sf.current_page.new_url(parameters, url, wildcard_contents);
        if (new_url_response != "NOT_SET") {
            return;
        }
    }
    var old_page = null;
    if (sf.current_page != null) {
        sf.current_page.remove();
        old_page = sf.current_page;
    }
    sf.current_page = new_page = new class_name(parameters, url, wildcard_contents);
    sf.previous_class_name = class_name;
    var transition_response = sf.transition_page_callback(sf.current_page, old_page);
    if (transition_response == true) {} else {
        sf.element.empty();
        sf.element.append(sf.current_page.element);
    }
    sf.current_page.init();
    sf.resize();
};

SiteFramework.prototype.set_no_page_found_class = function(class_name) {
    var sf = this;
    sf.no_page_found_class = class_name;
};

SiteFramework.prototype.ajax_post = function(request) {
    var sf = this;
    request.cache = false;
    request.type = "post";
    request.contentType = "application/json; charset=utf-8", request.data = JSON.stringify(request.data);
    request.dataType = "json";
    return $.ajax(request);
};

SiteFramework.prototype.ajax_get = function(request) {
    var sf = this;
    request.cache = false;
    request.dataType = "json";
    request.type = "get";
    return $.ajax(request);
};

SiteFramework.prototype.ajax_delete = function(request) {
    var sf = this;
    request.cache = false;
    request.dataType = "json";
    request.type = "delete";
    return $.ajax(request);
};

SiteFramework.prototype.resize = function() {
    var sf = this;
    var doc_width = $(window).width() - sf.scroll_bar_width();
    var doc_height = $(window).height();
    var resize_obj = {
        scroll_bar_width: sf.scroll_bar_width(),
        doc_width: doc_width,
        doc_height: doc_height
    };
    sf.on_resize(resize_obj);
    if (sf.current_page != null) {
        sf.current_page.resize(resize_obj);
    }
};

SiteFramework.prototype.init = function(desired_url) {
    var sf = this;
    var path_name = window.location.pathname;
    if (window.location.search != null) {
        path_name += window.location.search;
    }
    var current_url = decodeURIComponent(path_name);
    if (desired_url != null) {
        if (desired_url != current_url) {
            current_url = desired_url;
            if (!sf.history_state_supported) {
                window.location = desired_url;
                return;
            }
        }
    }
    if (sf.history_state_supported) {
        History.replaceState(null, "", Site.origin + current_url);
        History.Adapter.bind(window, "statechange", function() {
            if (sf.ignore_next_url) {
                sf.ignore_next_url = false;
                return;
            }
            var state = History.getState();
            if (state != null) {
                sf.load_url(decodeURIComponent(state.url), false);
            }
        });
    }
    $(window).resize(function() {
        sf.resize();
    }).resize();
    if (current_url == null) {
        current_url = "";
    }
    sf.load_url(current_url, false);
};

SiteFramework.prototype.reload_page = function() {
    var sf = this;
    sf.use_page_class(sf.current_class_and_details.class_name, sf.current_class_and_details.parameters, sf.current_class_and_details.url, sf.current_class_and_details.wildcard_contents);
};

SiteFramework.prototype.replace_current_url = function(new_url) {
    var sf = this;
    History.replaceState(null, "", Site.origin + new_url);
    sf.url_changed_callback(window.location.toString(), window.location.pathname, window.location.toString().substring(Site.origin.length), false);
};

SiteFramework.prototype.add_url = function(url, class_name) {
    var sf = this;
    sf.map[url] = class_name;
};

SiteFramework.prototype.scroll_bar_width = function() {
    var sf = this;
    if (sf.scroll_bar_width_value != -1) {
        return sf.scroll_bar_width_value;
    }
    var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
    $("body").append(div);
    var w1 = $("div", div).innerWidth();
    div.css("overflow-y", "scroll");
    var w2 = $("div", div).innerWidth();
    div.remove();
    sf.scroll_bar_width_value = w1 - w2;
    return sf.scroll_bar_width_value;
};

SiteFramework.prototype.parse_query_string = function(query_string) {
    var sf = this;
    var query_split = query_string.split("&");
    var params = {};
    for (var i = 0; i < query_split.length; i++) {
        pair = query_split[i].split("=");
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return params;
};

SiteFramework.prototype.get_class_for_url = function(url_with_parameters) {
    var sf = this;
    var class_and_details = sf.get_class_and_details_for_url(url_with_parameters);
    if (class_and_details != null) {
        return class_and_details.class_name;
    }
    return null;
};

SiteFramework.prototype.get_class_and_details_for_url = function(url_with_parameters) {
    var sf = this;
    var parameters = {};
    var url_split = url_with_parameters.split("?");
    if (url_split.length > 1) {
        parameters = sf.parse_query_string(url_split[1]);
    }
    url = url_split[0];
    if (url.length >= sf.origin.length) {
        if (url.substring(0, sf.origin.length) == sf.origin) {
            url = url.substring(sf.origin.length);
        }
    }
    var effective_path = sf.path;
    if (effective_path != "") {
        if (effective_path[effective_path.length - 1] != "/") {
            effective_path += "/";
        }
    }
    if (effective_path.length > 0) {
        if (effective_path.length > url.length || url.substring(0, effective_path.length) != effective_path) {
            SiteFramework.console.error("The requested url (" + url_with_parameters + ") was not relative to the domain/origin and within the Site.path scope");
            return null;
        }
        url = url.substring(effective_path.length - 1);
    }
    var class_name = sf.map[url];
    var wildcard_contents = null;
    var wildcard_contents = null;
    if (class_name == null) {
        for (var map_url in sf.map) {
            var index_of_wildcard = map_url.indexOf("*");
            if (index_of_wildcard != -1) {
                var url_substring = map_url.substring(0, index_of_wildcard);
                if (url_substring.length < url.length) {
                    if (url_substring == url.substring(0, url_substring.length)) {
                        class_name = sf.map[map_url];
                        wildcard_contents = url.substring(url_substring.length);
                        url = url_substring + "*";
                    }
                }
            }
        }
    }
    return {
        class_name: class_name,
        parameters: parameters,
        url: url,
        wildcard_contents: wildcard_contents
    };
};

SiteFramework.prototype.load_url = function(url_with_parameters, push_state) {
    var sf = this;
    if (!sf.history_state_supported) {
        var target = encodeURI(Site.origin + url_with_parameters);
        if (window.location != target) {
            window.location = target;
            return;
        }
    } else {
        if (push_state) {
            sf.ignore_next_url = true;
            History.pushState(null, "", Site.origin + url_with_parameters);
        }
    }
    sf.current_class_and_details = sf.get_class_and_details_for_url(url_with_parameters);
    if (sf.current_class_and_details.class_name != null) {
        sf.use_page_class(sf.current_class_and_details.class_name, sf.current_class_and_details.parameters, sf.current_class_and_details.url, sf.current_class_and_details.wildcard_contents);
    } else {
        SiteFramework.console.error("Page not found for url (" + sf.current_class_and_details.url + "). The full url was (" + url_with_parameters + ")");
        sf.use_page_class(null);
    }
    sf.url_changed_callback(window.location.toString(), window.location.pathname, window.location.toString().substring(Site.origin.length), sf.initial_url);
    sf.initial_url = false;
    sf.previous_class_name = sf.current_class_and_details.class_name;
};

var Site;

new SiteFramework();

var JSON;

if (!JSON) {
    JSON = {};
}

(function() {
    "use strict";
    function f(n) {
        return n < 10 ? "0" + n : n;
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
          case "string":
            return quote(value);

          case "number":
            return isFinite(value) ? String(value) : "null";

          case "boolean":
          case "null":
            return String(value);

          case "object":
            if (!value) {
                return "null";
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v);
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }
            } else if (typeof space === "string") {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            return str("", {
                "": value
            });
        };
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j;
            }
            throw new SyntaxError("JSON.parse");
        };
    }
})();

var appMap = {};

function getAppIconForAppName(appIconName, iconSize, element) {
    if (iconSize == undefined) {
        iconSize = 20;
    }
    var appInfo = appMap[appIconName];
    var appIcon;
    if (element == undefined) {
        appIcon = $("<div />").addClass("appIcon");
    } else {
        appIcon = element;
    }
    var icon20 = null;
    var icon40 = null;
    var icon80 = null;
    var icon160 = null;
    var icon320 = null;
    var icon640 = null;
    try {
        icon20 = appInfo["Mino.AppIcons.1"]["20x20 Icon"];
    } catch (e) {}
    try {
        icon40 = appInfo["Mino.AppIcons.1"]["40x40 Icon"];
    } catch (e) {}
    try {
        icon80 = appInfo["Mino.AppIcons.1"]["80x80 Icon"];
    } catch (e) {}
    try {
        icon160 = appInfo["Mino.AppIcons.1"]["160x160 Icon"];
    } catch (e) {}
    try {
        icon320 = appInfo["Mino.AppIcons.1"]["320x320 Icon"];
    } catch (e) {}
    try {
        icon640 = appInfo["Mino.AppIcons.1"]["640x640 Icon"];
    } catch (e) {}
    var targetSize = iconSize;
    var retina = window.devicePixelRatio == 2;
    if (retina) {
        iconSize *= 2;
    }
    var found = null;
    if (icon20 != null) {
        found = icon20;
    }
    if (icon40 != null && iconSize >= 40) {
        found = icon40;
    }
    if (icon80 != null && iconSize >= 80) {
        found = icon80;
    }
    if (icon160 != null && iconSize >= 160) {
        found = icon160;
    }
    if (icon320 != null && iconSize >= 320) {
        found = icon320;
    }
    if (icon640 != null && iconSize >= 640) {
        found = icon640;
    }
    if (found != null) {
        appIcon.css("background-image", "url(" + found + ")");
        appIcon.css("background-size", targetSize + " " + targetSize);
    } else {
        appIcon.text("?");
    }
    return appIcon;
}

function addToAppMap(appName, appInfo) {
    appMap[appName] = appInfo;
}

function sortAppArray(array) {
    array.sort(function(item1, item2) {
        var attr1 = item1["Mino.App.1"]["Name"];
        var attr2 = item2["Mino.App.1"]["Name"];
        if (attr1 < attr2) return -1;
        if (attr1 > attr2) return 1;
        return 0;
    });
}

String.prototype.replaceAll = function(find, replace) {
    var str = this;
    return str.replace(new RegExp(find, "g"), replace);
};

String.prototype.startsWith = function(str) {
    return this.slice(0, str.length) == str;
};

function subSplitFolderPath(toSplit, includeLast) {
    var result = new Array();
    var currentIndex = 0;
    var currentPosition = 1;
    for (var currentPosition = 1; currentPosition < toSplit.length; currentPosition++) {
        thisChar = toSplit.charCodeAt(currentPosition);
        if (thisChar == 47) {
            result.push(toSplit.substring(0, currentPosition + 1));
            currentIndex++;
        }
    }
    if (!includeLast) {
        result.pop();
    }
    return result;
}

(function($) {
    var _remove = $.fn.remove;
    $.fn.remove = function(selector, keepData) {
        return this.each(function() {
            if (!keepData) {
                if (!selector || $.filter(selector, [ this ]).length) {
                    $("*", this).add(this).each(function() {
                        $(this).triggerHandler("remove");
                    });
                }
            }
            return _remove.call($(this), selector, keepData);
        });
    };
    $.widget = function(name, base, prototype) {
        var namespace = name.split(".")[0], fullName;
        name = name.split(".")[1];
        fullName = namespace + "-" + name;
        if (!prototype) {
            prototype = base;
            base = $.Widget;
        }
        $.expr[":"][fullName] = function(elem) {
            return !!$.data(elem, name);
        };
        $[namespace] = $[namespace] || {};
        $[namespace][name] = function(options, element) {
            if (arguments.length) {
                this._createWidget(options, element);
            }
        };
        var basePrototype = new base();
        basePrototype.options = $.extend({}, basePrototype.options);
        $[namespace][name].prototype = $.extend(true, basePrototype, {
            namespace: namespace,
            widgetName: name,
            widgetEventPrefix: $[namespace][name].prototype.widgetEventPrefix || name,
            widgetBaseClass: fullName
        }, prototype);
        $.widget.bridge(name, $[namespace][name]);
    };
    $.widget.bridge = function(name, object) {
        $.fn[name] = function(options) {
            var isMethodCall = typeof options === "string", args = Array.prototype.slice.call(arguments, 1), returnValue = this;
            options = !isMethodCall && args.length ? $.extend.apply(null, [ true, options ].concat(args)) : options;
            if (isMethodCall && options.substring(0, 1) === "_") {
                return returnValue;
            }
            if (isMethodCall) {
                this.each(function() {
                    var instance = $.data(this, name), methodValue = instance && $.isFunction(instance[options]) ? instance[options].apply(instance, args) : instance;
                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue;
                        return false;
                    }
                });
            } else {
                this.each(function() {
                    var instance = $.data(this, name);
                    if (instance) {
                        if (options) {
                            instance.option(options);
                        }
                        instance._init();
                    } else {
                        $.data(this, name, new object(options, this));
                    }
                });
            }
            return returnValue;
        };
    };
    $.Widget = function(options, element) {
        if (arguments.length) {
            this._createWidget(options, element);
        }
    };
    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function(options, element) {
            this.element = $(element).data(this.widgetName, this);
            this.options = $.extend(true, {}, this.options, $.metadata && $.metadata.get(element)[this.widgetName], options);
            var self = this;
            this.element.bind("remove." + this.widgetName, function() {
                self.destroy();
            });
            this._create();
            this._init();
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled");
        },
        widget: function() {
            return this.element;
        },
        option: function(key, value) {
            var options = key, self = this;
            if (arguments.length === 0) {
                return $.extend({}, self.options);
            }
            if (typeof key === "string") {
                if (value === undefined) {
                    return this.options[key];
                }
                options = {};
                options[key] = value;
            }
            $.each(options, function(key, value) {
                self._setOption(key, value);
            });
            return self;
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            if (key === "disabled") {
                this.widget()[value ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", value);
            }
            return this;
        },
        enable: function() {
            return this._setOption("disabled", false);
        },
        disable: function() {
            return this._setOption("disabled", true);
        },
        _trigger: function(type, event, data) {
            var callback = this.options[type];
            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
            data = data || {};
            if (event.originalEvent) {
                for (var i = $.event.props.length, prop; i; ) {
                    prop = $.event.props[--i];
                    event[prop] = event.originalEvent[prop];
                }
            }
            this.element.trigger(event, data);
            return !($.isFunction(callback) && callback.call(this.element[0], event, data) === false || event.isDefaultPrevented());
        }
    };
})(jQuery);

(function(d, A, B) {
    function F(a, b, h, c) {
        if ("d" != h) {
            var f = G.exec(b), e = "auto" === a.css(h) ? 0 : a.css(h), e = "string" == typeof e ? w(e) : e;
            "string" == typeof b && w(b);
            var c = !0 === c ? 0 : e, d = a.is(":hidden"), i = a.translation();
            "left" == h && (c = parseInt(e, 10) + i.x);
            "right" == h && (c = parseInt(e, 10) + i.x);
            "top" == h && (c = parseInt(e, 10) + i.y);
            "bottom" == h && (c = parseInt(e, 10) + i.y);
            !f && "show" == b ? (c = 1, d && a.css({
                display: "block",
                opacity: 0
            })) : !f && "hide" == b && (c = 0);
            return f ? (a = parseFloat(f[2]), f[1] && (a = ("-=" === f[1] ? -1 : 1) * a + parseInt(c, 10)), 
            a) : c;
        }
    }
    function H(a, b, h, c, f, e, g, i) {
        var j = a.data(q), j = j && !u(j) ? j : d.extend(!0, {}, I), n = f;
        if (-1 < d.inArray(b, x)) {
            var o = j.meta, m = w(a.css(b)) || 0, l = b + "_o", n = f - m;
            o[b] = n;
            o[l] = "auto" == a.css(b) ? 0 + n : m + n || 0;
            j.meta = o;
            g && 0 === n && (n = 0 - o[l], o[b] = n, o[l] = 0);
        }
        return a.data(q, J(a, j, b, h, c, n, e, g, i));
    }
    function J(a, b, d, c, f, e, g, i, j) {
        var n = !1, g = !0 === g && !0 === i, b = b || {};
        b.original || (b.original = {}, n = !0);
        b.properties = b.properties || {};
        b.secondary = b.secondary || {};
        for (var i = b.meta, o = b.original, m = b.properties, q = b.secondary, p = l.length - 1; 0 <= p; p--) {
            var k = l[p] + "transition-property", r = l[p] + "transition-duration", s = l[p] + "transition-timing-function", d = g ? l[p] + "transform" : d;
            n && (o[k] = a.css(k) || "", o[r] = a.css(r) || "", o[s] = a.css(s) || "");
            q[d] = g ? (!0 === j || !0 === y && !1 !== j) && C ? "translate3d(" + i.left + "px, " + i.top + "px, 0)" : "translate(" + i.left + "px," + i.top + "px)" : e;
            m[k] = (m[k] ? m[k] + "," : "") + d;
            m[r] = (m[r] ? m[r] + "," : "") + c + "ms";
            m[s] = (m[s] ? m[s] + "," : "") + f;
        }
        return b;
    }
    function K(a) {
        for (var b in a) if (("width" == b || "height" == b) && ("show" == a[b] || "hide" == a[b] || "toggle" == a[b])) return !0;
        return !1;
    }
    function u(a) {
        for (var b in a) return !1;
        return !0;
    }
    function w(a) {
        return parseFloat(a.replace(/px/i, ""));
    }
    function L(a, b, h) {
        var c = -1 < d.inArray(a, M);
        if (("width" == a || "height" == a) && b === parseFloat(h.css(a))) c = !1;
        return c;
    }
    var M = "top,right,bottom,left,opacity,height,width".split(","), x = [ "top", "right", "bottom", "left" ], l = [ "", "-webkit-", "-moz-", "-o-" ], N = [ "avoidTransforms", "useTranslate3d", "leaveTransforms" ], G = /^([+-]=)?([\d+-.]+)(.*)$/, O = /([A-Z])/g, I = {
        secondary: {},
        meta: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    }, q = "jQe", D = null, z = !1, t = (document.body || document.documentElement).style, v = void 0 !== t.WebkitTransition ? "webkitTransitionEnd" : void 0 !== t.OTransition ? "oTransitionEnd" : "transitionend", E = void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.OTransition || void 0 !== t.transition, C = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix(), y = C;
    d.expr && d.expr.filters && (D = d.expr.filters.animated, d.expr.filters.animated = function(a) {
        return d(a).data("events") && d(a).data("events")[v] ? !0 : D.call(this, a);
    });
    d.extend({
        toggle3DByDefault: function() {
            return y = !y;
        },
        toggleDisabledByDefault: function() {
            return z = !z;
        }
    });
    d.fn.translation = function() {
        if (!this[0]) return null;
        var a = window.getComputedStyle(this[0], null), b = {
            x: 0,
            y: 0
        };
        if (a) for (var d = l.length - 1; d >= 0; d--) {
            var c = a.getPropertyValue(l[d] + "transform");
            if (c && /matrix/i.test(c)) {
                a = c.replace(/^matrix\(/i, "").split(/, |\)$/g);
                b = {
                    x: parseInt(a[4], 10),
                    y: parseInt(a[5], 10)
                };
                break;
            }
        }
        return b;
    };
    d.fn.animate = function(a, b, h, c) {
        var a = a || {}, f = !(typeof a.bottom !== "undefined" || typeof a.right !== "undefined"), e = d.speed(b, h, c), g = this, i = 0, j = function() {
            i--;
            i === 0 && typeof e.complete === "function" && e.complete.apply(g[0], arguments);
        };
        return (typeof a.avoidCSSTransitions !== "undefined" ? a.avoidCSSTransitions : z) === true || !E || u(a) || K(a) || e.duration <= 0 || d.fn.animate.defaults.avoidTransforms === true && a.avoidTransforms !== false ? A.apply(this, arguments) : this[e.queue === true ? "queue" : "each"](function() {
            var b = d(this), c = d.extend({}, e), g = function() {
                var c = b.data(q) || {
                    original: {}
                }, d = {};
                if (a.leaveTransforms !== true) {
                    for (var e = l.length - 1; e >= 0; e--) d[l[e] + "transform"] = "";
                    if (f && typeof c.meta !== "undefined") for (var e = 0, g; g = x[e]; ++e) d[g] = c.meta[g + "_o"] + "px";
                }
                b.unbind(v).css(c.original).css(d).data(q, null);
                a.opacity === "hide" && b.css({
                    display: "none",
                    opacity: ""
                });
                j.call(b);
            }, h = {
                bounce: "cubic-bezier(0.0, 0.35, .5, 1.3)",
                linear: "linear",
                swing: "ease-in-out",
                easeInQuad: "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
                easeInCubic: "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
                easeInQuart: "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
                easeInQuint: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
                easeInSine: "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
                easeInExpo: "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
                easeInCirc: "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
                easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
                easeOutQuad: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
                easeOutCubic: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
                easeOutQuart: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
                easeOutQuint: "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
                easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
                easeOutExpo: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
                easeOutCirc: "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
                easeOutBack: "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
                easeInOutQuad: "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
                easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
                easeInOutQuart: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
                easeInOutQuint: "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
                easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
                easeInOutExpo: "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
                easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
                easeInOutBack: "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
            }, p = {}, h = h[c.easing || "swing"] ? h[c.easing || "swing"] : c.easing || "swing", k;
            for (k in a) if (d.inArray(k, N) === -1) {
                var r = d.inArray(k, x) > -1, s = F(b, a[k], k, r && a.avoidTransforms !== true);
                a.avoidTransforms !== true && L(k, s, b) ? H(b, k, c.duration, h, r && a.avoidTransforms === true ? s + "px" : s, r && a.avoidTransforms !== true, f, a.useTranslate3d === true) : p[k] = a[k];
            }
            b.unbind(v);
            if ((k = b.data(q)) && !u(k) && !u(k.secondary)) {
                i++;
                b.css(k.properties);
                var t = k.secondary;
                setTimeout(function() {
                    b.bind(v, g).css(t);
                });
            } else c.queue = false;
            if (!u(p)) {
                i++;
                A.apply(b, [ p, {
                    duration: c.duration,
                    easing: d.easing[c.easing] ? c.easing : d.easing.swing ? "swing" : "linear",
                    complete: j,
                    queue: c.queue
                } ]);
            }
            return true;
        });
    };
    d.fn.animate.defaults = {};
    d.fn.stop = function(a, b, h) {
        if (!E) return B.apply(this, [ a, b ]);
        a && this.queue([]);
        this.each(function() {
            var c = d(this), f = c.data(q);
            if (f && !u(f)) {
                var e, g = {};
                if (b) {
                    g = f.secondary;
                    if (!h && typeof f.meta.left_o !== void 0 || typeof f.meta.top_o !== void 0) {
                        g.left = typeof f.meta.left_o !== void 0 ? f.meta.left_o : "auto";
                        g.top = typeof f.meta.top_o !== void 0 ? f.meta.top_o : "auto";
                        for (e = l.length - 1; e >= 0; e--) g[l[e] + "transform"] = "";
                    }
                } else if (!u(f.secondary)) {
                    var i = window.getComputedStyle(c[0], null);
                    if (i) for (var j in f.secondary) if (f.secondary.hasOwnProperty(j)) {
                        j = j.replace(O, "-$1").toLowerCase();
                        g[j] = i.getPropertyValue(j);
                        if (!h && /matrix/i.test(g[j])) {
                            e = g[j].replace(/^matrix\(/i, "").split(/, |\)$/g);
                            g.left = parseFloat(e[4]) + parseFloat(c.css("left")) + "px" || "auto";
                            g.top = parseFloat(e[5]) + parseFloat(c.css("top")) + "px" || "auto";
                            for (e = l.length - 1; e >= 0; e--) g[l[e] + "transform"] = "";
                        }
                    }
                }
                c.unbind(v).css(f.original).css(g).data(q, null);
            } else B.apply(c, [ a, b ]);
        });
        return this;
    };
})(jQuery, jQuery.fn.animate, jQuery.fn.stop);

(function($) {
    $.fn.autoGrowInput = function(o) {
        o = $.extend({
            maxWidth: 1e3,
            minWidth: 0,
            comfortZone: 70
        }, o);
        this.filter("input:text").each(function() {
            var minWidth = o.minWidth || $(this).width(), val = "", input = $(this), testSubject = $("<tester/>").css({
                position: "absolute",
                top: -9999,
                left: -9999,
                width: "auto",
                fontSize: input.css("fontSize"),
                fontFamily: input.css("fontFamily"),
                fontWeight: input.css("fontWeight"),
                letterSpacing: input.css("letterSpacing"),
                whiteSpace: "nowrap"
            }), check = function() {
                if (val === (val = input.val())) {
                    return;
                }
                var escaped = val.replace(/&/g, "&amp;").replace(/\s/g, "&nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                testSubject.html(escaped);
                var testerWidth = testSubject.width(), newWidth = testerWidth + o.comfortZone >= minWidth ? testerWidth + o.comfortZone : minWidth, currentWidth = input.width(), isValidWidthChange = newWidth < currentWidth && newWidth >= minWidth || newWidth > minWidth && newWidth < o.maxWidth;
                if (isValidWidthChange) {
                    input.width(newWidth);
                }
            };
            testSubject.appendTo("body");
            $(this).bind("keyup keydown blur update", check);
        });
        return this;
    };
})(jQuery);

(function($) {
    var uid = "ar" + +new Date(), defaults = autoResize.defaults = {
        onResize: function() {},
        onBeforeResize: function() {
            return 123;
        },
        onAfterResize: function() {
            return 555;
        },
        animate: {
            duration: 200,
            complete: function() {}
        },
        extraSpace: 50,
        minHeight: "original",
        maxHeight: 500,
        minWidth: "original",
        maxWidth: 500
    };
    autoResize.cloneCSSProperties = [ "lineHeight", "textDecoration", "letterSpacing", "fontSize", "fontFamily", "fontStyle", "fontWeight", "textTransform", "textAlign", "direction", "wordSpacing", "fontSizeAdjust", "paddingTop", "paddingLeft", "paddingBottom", "paddingRight", "width" ];
    autoResize.cloneCSSValues = {
        position: "absolute",
        top: -9999,
        left: -9999,
        opacity: 0,
        overflow: "hidden"
    };
    autoResize.resizableFilterSelector = [ "textarea:not(textarea." + uid + ")", "input:not(input[type])", "input[type=text]", "input[type=password]", "input[type=email]", "input[type=url]" ].join(",");
    autoResize.AutoResizer = AutoResizer;
    $.fn.autoResize = autoResize;
    function autoResize(config) {
        this.addClass("autogrowresize");
        this.filter(autoResize.resizableFilterSelector).each(function() {
            new AutoResizer($(this), config);
        });
        return this;
    }
    function AutoResizer(el, config) {
        if (el.data("AutoResizer")) {
            el.data("AutoResizer").destroy();
        }
        config = this.config = $.extend(true, {}, autoResize.defaults, config);
        this.el = el;
        this.nodeName = el[0].nodeName.toLowerCase();
        this.originalHeight = el.height();
        this.previousScrollTop = null;
        this.value = el.val();
        if (config.maxWidth === "original") config.maxWidth = el.width();
        if (config.minWidth === "original") config.minWidth = el.width();
        if (config.maxHeight === "original") config.maxHeight = el.height();
        if (config.minHeight === "original") config.minHeight = el.height();
        if (this.nodeName === "textarea") {
            el.css({
                resize: "none",
                overflowY: "hidden"
            });
        }
        el.data("AutoResizer", this);
        config.animate.complete = function(f) {
            return function() {
                config.onAfterResize.call(el);
                return f.apply(this, arguments);
            };
        }(config.animate.complete);
        this.bind();
    }
    AutoResizer.prototype = {
        bind: function() {
            var check = $.proxy(function() {
                this.check();
                return true;
            }, this);
            this.unbind();
            this.el.bind("keyup.autoResize", check).data("autoResize", check).bind("change.autoResize", check).bind("paste.autoResize", function() {
                setTimeout(function() {
                    check();
                }, 0);
            });
            if (!this.el.is(":hidden")) {
                this.check(null, true);
            }
        },
        unbind: function() {
            this.el.unbind(".autoResize");
        },
        createClone: function() {
            var el = this.el, clone = this.nodeName === "textarea" ? el.clone() : $("<span/>");
            this.clone = clone;
            $.each(autoResize.cloneCSSProperties, function(i, p) {
                clone[0].style[p] = el.css(p);
            });
            clone.removeAttr("name").removeAttr("id").addClass(uid).attr("tabIndex", -1).css(autoResize.cloneCSSValues);
            if (this.nodeName === "textarea") {
                clone.height("auto");
            } else {
                clone.width("auto").css({
                    whiteSpace: "nowrap"
                });
            }
        },
        check: function(e, immediate) {
            if (!this.clone) {
                this.createClone();
                this.injectClone();
            }
            var config = this.config, clone = this.clone, el = this.el, value = el.val();
            if (e != null && value === this.prevValue) {
                return true;
            }
            this.prevValue = value;
            if (this.nodeName === "input") {
                clone.text(value);
                var cloneWidth = clone.width(), newWidth = cloneWidth + config.extraSpace >= config.minWidth ? cloneWidth + config.extraSpace : config.minWidth, currentWidth = el.width();
                newWidth = Math.min(newWidth, config.maxWidth);
                if (newWidth < currentWidth && newWidth >= config.minWidth || newWidth >= config.minWidth && newWidth <= config.maxWidth) {
                    config.onBeforeResize.call(el);
                    config.onResize.call(el);
                    el.scrollLeft(0);
                    if (config.animate && !immediate) {
                        el.stop(1, 1).animate({
                            width: newWidth
                        }, config.animate);
                    } else {
                        el.width(newWidth);
                        config.onAfterResize.call(el);
                    }
                }
                return;
            }
            clone.width(el.width()).height(0).val(value).scrollTop(1e4);
            var scrollTop = clone[0].scrollTop;
            if (this.previousScrollTop === scrollTop) {
                return;
            }
            this.previousScrollTop = scrollTop;
            if (scrollTop + config.extraSpace >= config.maxHeight) {
                el.css("overflowY", "");
                scrollTop = config.maxHeight;
                immediate = true;
            } else if (scrollTop <= config.minHeight) {
                scrollTop = config.minHeight;
            } else {
                el.css("overflowY", "hidden");
                scrollTop += config.extraSpace;
            }
            config.onBeforeResize.call(el);
            config.onResize.call(el);
            if (e != undefined && config.animate && !immediate) {
                el.stop(1, 1).animate({
                    height: scrollTop
                }, config.animate);
            } else {
                el.height(scrollTop);
                config.onAfterResize.call(el);
            }
        },
        destroy: function() {
            this.unbind();
            this.el.removeData("AutoResizer");
            this.clone.remove();
            delete this.el;
            delete this.clone;
        },
        injectClone: function() {
            (autoResize.cloneContainer || (autoResize.cloneContainer = $("<arclones/>").appendTo("body"))).append(this.clone);
        }
    };
})(jQuery);

(function($) {
    $.cookie = function(key, value, options) {
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);
            if (value === null || value === undefined) {
                options.expires = -1;
            }
            if (typeof options.expires === "number") {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = String(value);
            return document.cookie = [ encodeURIComponent(key), "=", options.raw ? value : encodeURIComponent(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : "" ].join("");
        }
        options = value || {};
        var decode = options.raw ? function(s) {
            return s;
        } : decodeURIComponent;
        var pairs = document.cookie.split("; ");
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split("="); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || "");
        }
        return null;
    };
})(jQuery);

(function($) {
    if (typeof $d != "function") {
        $d = function(param) {
            var node = jQuery(param)[0];
            var id = jQuery.data(node);
            jQuery.cache[id] || (jQuery.cache[id] = {});
            jQuery.cache[id].node = node;
            return jQuery.cache[id];
        };
    }
    $.fn.hint = function(blurClass) {
        if (!blurClass) {
            blurClass = "blur";
        }
        return this.each(function() {
            var $input = $(this), title = $input.attr("title"), isPassword = $input.attr("type") == "password", $form = $(this.form), $win = $(window);
            if ("placeholder" in $input[0]) {
                $input.attr("placeholder", title);
                return;
            }
            var strategies = {
                changeValue: {
                    init: function() {},
                    add: function() {
                        if ($input.val() === "") {
                            $input.addClass(blurClass).val(title);
                        }
                    },
                    remove: function() {
                        if ($input.val() === title && $input.hasClass(blurClass)) {
                            $input.val("").removeClass(blurClass);
                        }
                    },
                    submit: function(e) {
                        if ($input.hasClass(blurClass)) {
                            $input.val("");
                        }
                    }
                },
                replaceElement: {
                    init: function() {
                        $input.addClass("replaced-for-title");
                        var $alt = $('<input type="text"></input>').attr({
                            "class": $input.attr("class"),
                            name: $input.attr("name"),
                            title: $input.attr("title"),
                            style: $input.attr("style")
                        }).val(title).insertBefore($input).addClass("password-title").addClass(blurClass).hide().focus(function() {
                            $d($alt).original.focus();
                        });
                        $d($input).alternative = $alt;
                        $d($alt).original = $input;
                    },
                    add: function() {
                        if ($input.val() === "") {
                            $input.hide();
                            var id = $input.attr("id");
                            $input.attr("id", null);
                            $d($input).alternative.attr("id", id).show();
                        }
                    },
                    remove: function() {
                        if ($input.is(":hidden")) {
                            var id = $d($input).alternative.attr("id");
                            $d($input).alternative.attr("id", null).hide();
                            $input.attr("id", id).show();
                        }
                    },
                    submit: function() {
                        $d($input).alternative.remove();
                    }
                }
            };
            if (title) {
                var strategyName = isPassword ? "replaceElement" : "changeValue";
                var strategy = strategies[strategyName];
                strategy.init();
                $input.blur(strategy.add).focus(strategy.remove).blur();
                $form.submit(strategy.submit);
                $win.unload(strategy.submit);
            }
        });
    };
})(jQuery);

eval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
    };
    if (!"".replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [ function(e) {
            return r[e];
        } ];
        e = function() {
            return "\\w+";
        };
        c = 1;
    }
    while (c--) if (k[c]) p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
    return p;
}("(6($){$.N.1k=6(){5.8().9();5.8().r('7',['R'])};$.N.1l=6(){5.8().9()};$.N.1m=6(a){5.8().9();5.8().V('7');a=$.W(5.X(),a);5.Y(a)};$.N.1n=6(){5.8().9();5.8().w({s:0,t:0});5.8().V('7')};$.N.Y=6(h){4 x={y:5};h=$.W({S:Z,10:'11',12:'B',P:'1o',13:'T',14:'1p',15:'O',16:'O',U:'1q'},h);4 i=z h.S=='17'?3(h.S):Z;4 j=h.10.E();4 k=h.12.E();4 l=z h.P=='17'&&h.P>0?3(h.P):-1;4 m=h.13.E();4 n=h.14.E();4 o=h.15.E();4 p=h.16.E();4 q=h.U.E();x.y.X(h);18();6 18(){x.y.w('U',q);2(j=='11'){2(k!='B'&&k!='t'){k='B'};19()}u{2(k!='F'&&k!='s'){k='F'};1a()};2(n=='O'){x.y.1b(6(){$(5).8().9();$(5).8().r('7',['R'])})}u{x.y.1b(6(){$(5).8().9()})};2(o=='O'){x.y.1c(6(){$(5).8().9();$(5).8().r('7',['R'])})}u{x.y.1c(6(){$(5).8().9()})};2(p!='O'){x.y.8().9()}};6 1a(){x.y.8().1d('7',6(a,c){4 b=$(5);4 d=3(b.G().H());4 e=3(b.H());4 f=3(b.A().s);4 v=i>0&&i<C?(C-i)*C:1e;4 g=3(v*e/C)+v;2(m=='Q'){I(k){J'F':2(z c=='D'){b.w({s:d-e})};d=f-(e+d);K;L:2(z c=='D'){b.w({s:0})};d+=f+e}}u{I(k){J'F':2(z c=='D'){b.w({s:d});d=-e}u{d=f-(e+d)};K;L:2(z c=='D'){b.w({s:-e})}u{d+=f+e}}};2(l<0||l>0){2(l>0){l--};b.1f({s:d},{1g:g,1h:'T',1i:6(){b.r('7')},1j:6(){I(m){J'Q':2(k=='F'){2(3(b.A().s)<=0){k='s';b.9();b.r('7')}}u{2(3(b.A().s)+3(b.H())>=3(b.G().H())){k='F';b.9();b.r('7')}};K;L:2(k=='F'){2(3(b.A().s)<-3(b.H())){b.9();b.r('7')}}u{2(3(b.A().s)>3(b.G().H())){b.9();b.r('7')}}}}})}}).r('7')};6 19(){x.y.8().1d('7',6(a,c){4 b=$(5);4 d=3(b.G().M());4 e=3(b.M());4 f=3(b.A().t);4 v=i>0&&i<C?(C-i)*C:1e;4 g=3(v*e/C)+v;2(m=='Q'){I(k){J'B':2(z c=='D'){b.w({t:d-e})};d=f-(e+d);K;L:2(z c=='D'){b.w({t:0})};d+=f+e}}u{I(k){J'B':2(z c=='D'){b.w({t:d});d=-e}u{d=f-(e+d)};K;L:2(z c=='D'){b.w({t:-e})}u{d+=f+e}}};2(l<0||l>0){2(l>0){l--};b.1f({t:d},{1g:g,1h:'T',1i:6(){b.r('7')},1j:6(){I(m){J'Q':2(k=='B'){2(3(b.A().t)<=0){k='t';b.9();b.r('7')}}u{2(3(b.A().t)+3(b.M())>=3(b.G().M())){k='B';b.9();b.r('7')}};K;L:2(k=='B'){2(3(b.A().t)<-3(b.M())){b.9();b.r('7')}}u{2(3(b.A().t)>3(b.G().M())){b.9();b.r('7')}}}}})}}).r('7')};1r 5}})(1s);", 62, 91, "||if|parseInt|var|this|function|marquee|children|stop||||||||||||||||||trigger|top|left|else||css|_|me|typeof|position|right|100|undefined|toLowerCase|bottom|parent|height|switch|case|break|default|width|fn|play|loop|pingpong|resume|velocity|linear|cursor|unbind|extend|data|SetScroller|50|direction|horizontal|startfrom|movetype|onmouseover|onmouseout|onstartup|number|main|scrollHorizontal|scrollVertical|mouseover|mouseout|bind|5000|animate|duration|easing|complete|step|PlayScroller|PauseScroller|ResetScroller|RemoveScroller|infinite|pause|pointer|return|jQuery".split("|"), 0, {}));

(function(f) {
    var c = f('<style rel="alternate stylesheet" type="text/css" />').appendTo("head")[0], k = c.sheet ? "sheet" : "styleSheet", i = c[k], m = i.rules ? "rules" : "cssRules", g = i.deleteRule ? "deleteRule" : "removeRule", d = i.ownerNode ? "ownerNode" : "owningElement", e = /^([^{]+)\{([^}]*)\}/m, l = /([^:]+):([^;}]+)/;
    i.disabled = true;
    var j = f.rule = function(n, o) {
        if (!(this instanceof j)) {
            return new j(n, o);
        }
        this.sheets = j.sheets(o);
        if (n && e.test(n)) {
            n = j.clean(n);
        }
        if (typeof n == "object" && !n.exec) {
            b(this, n.get ? n.get() : n.splice ? n : [ n ]);
        } else {
            b(this, this.sheets.cssRules().get());
            if (n) {
                return this.filter(n);
            }
        }
        return this;
    };
    f.extend(j, {
        sheets: function(p) {
            var n = p;
            if (typeof n != "object") {
                n = f.makeArray(document.styleSheets);
            }
            n = f(n).not(i);
            if (typeof p == "string") {
                n = n.ownerNode().filter(p).sheet();
            }
            return n;
        },
        rule: function(n) {
            if (n.selectorText) {
                return [ "", n.selectorText, n.style.cssText ];
            }
            return e.exec(n);
        },
        appendTo: function(q, n, o) {
            switch (typeof n) {
              case "string":
                n = this.sheets(n);

              case "object":
                if (n[0]) {
                    n = n[0];
                }
                if (n[k]) {
                    n = n[k];
                }
                if (n[m]) {
                    break;
                }

              default:
                if (typeof q == "object") {
                    return q;
                }
                n = i;
            }
            var t;
            if (!o && (t = this.parent(q))) {
                q = this.remove(q, t);
            }
            var s = this.rule(q);
            if (n.addRule) {
                n.addRule(s[1], s[2] || ";");
            } else {
                if (n.insertRule) {
                    n.insertRule(s[1] + "{" + s[2] + "}", n[m].length);
                }
            }
            return n[m][n[m].length - 1];
        },
        remove: function(o, q) {
            q = q || this.parent(o);
            if (q != i) {
                var n = q ? f.inArray(o, q[m]) : -1;
                if (n != -1) {
                    o = this.appendTo(o, 0, true);
                    q[g](n);
                }
            }
            return o;
        },
        clean: function(n) {
            return f.map(n.split("}"), function(o) {
                if (o) {
                    return j.appendTo(o + "}");
                }
            });
        },
        parent: function(o) {
            if (typeof o == "string" || !f.browser.msie) {
                return o.parentStyleSheet;
            }
            var n;
            this.sheets().each(function() {
                if (f.inArray(o, this[m]) != -1) {
                    n = this;
                    return false;
                }
            });
            return n;
        },
        outerText: function(n) {
            return !n || !n.selectorText ? "" : [ n.selectorText + "{", "	" + n.style.cssText, "}" ].join("\n").toLowerCase();
        },
        text: function(o, n) {
            if (n !== undefined) {
                o.style.cssText = n;
            }
            return !o ? "" : o.style.cssText.toLowerCase();
        }
    });
    j.fn = j.prototype = {
        pushStack: function(n, p) {
            var o = j(n, p || this.sheets);
            o.prevObject = this;
            return o;
        },
        end: function() {
            return this.prevObject || j(0, []);
        },
        filter: function(n) {
            var p;
            if (!n) {
                n = /./;
            }
            if (n.split) {
                p = f.trim(n).toLowerCase().split(/\s*,\s*/);
                n = function() {
                    var o = this.selectorText || "";
                    return !!f.grep(o.toLowerCase().split(/\s*,\s*/), function(q) {
                        return f.inArray(q, p) != -1;
                    }).length;
                };
            } else {
                if (n.exec) {
                    p = n;
                    n = function() {
                        return p.test(this.selectorText);
                    };
                }
            }
            return this.pushStack(f.grep(this, function(q, o) {
                return n.call(q, o);
            }));
        },
        add: function(n, o) {
            return this.pushStack(f.merge(this.get(), j(n, o)));
        },
        is: function(n) {
            return !!(n && this.filter(n).length);
        },
        not: function(p, o) {
            p = j(p, o);
            return this.filter(function() {
                return f.inArray(this, p) == -1;
            });
        },
        append: function(n) {
            var p = this, o;
            f.each(n.split(/\s*;\s*/), function(r, q) {
                if (o = l.exec(q)) {
                    p.css(o[1], o[2]);
                }
            });
            return this;
        },
        text: function(n) {
            return !arguments.length ? j.text(this[0]) : this.each(function() {
                j.text(this, n);
            });
        },
        outerText: function() {
            return j.outerText(this[0]);
        }
    };
    f.each({
        ownerNode: d,
        sheet: k,
        cssRules: m
    }, function(n, o) {
        var p = o == m;
        f.fn[n] = function() {
            return this.map(function() {
                return p ? f.makeArray(this[o]) : this[o];
            });
        };
    });
    f.fn.cssText = function() {
        return this.filter("link,style").eq(0).sheet().cssRules().map(function() {
            return j.outerText(this);
        }).get().join("\n");
    };
    f.each("remove,appendTo,parent".split(","), function(n, o) {
        j.fn[o] = function() {
            var p = f.makeArray(arguments), q = this;
            p.unshift(0);
            return this.each(function(r) {
                p[0] = this;
                q[r] = j[o].apply(j, p) || q[r];
            });
        };
    });
    f.each("each,index,get,size,eq,slice,map,attr,andSelf,css,show,hide,toggle,queue,dequeue,stop,animate,fadeIn,fadeOut,fadeTo".split(","), function(n, o) {
        j.fn[o] = f.fn[o];
    });
    function b(o, n) {
        o.length = 0;
        Array.prototype.push.apply(o, n);
    }
    var h = f.curCSS;
    f.curCSS = function(o, n) {
        return "selectorText" in o ? o.style[n] || f.prop(o, n == "opacity" ? 1 : 0, "curCSS", 0, n) : h.apply(this, arguments);
    };
    j.cache = {};
    var a = function(n) {
        return function(p) {
            var o = p.selectorText;
            if (o) {
                arguments[0] = j.cache[o] = j.cache[o] || {};
            }
            return n.apply(f, arguments);
        };
    };
    f.data = a(f.data);
    f.removeData = a(f.removeData);
    f(window).unload(function() {
        f(i).cssRules().remove();
    });
})(jQuery);

(function(d) {
    var k = d.scrollTo = function(a, i, e) {
        d(window).scrollTo(a, i, e);
    };
    k.defaults = {
        axis: "xy",
        duration: parseFloat(d.fn.jquery) >= 1.3 ? 0 : 1
    };
    k.window = function(a) {
        return d(window)._scrollable();
    };
    d.fn._scrollable = function() {
        return this.map(function() {
            var a = this, i = !a.nodeName || d.inArray(a.nodeName.toLowerCase(), [ "iframe", "#document", "html", "body" ]) != -1;
            if (!i) return a;
            var e = (a.contentWindow || a).document || a.ownerDocument || a;
            return d.browser.safari || e.compatMode == "BackCompat" ? e.body : e.documentElement;
        });
    };
    d.fn.scrollTo = function(n, j, b) {
        if (typeof j == "object") {
            b = j;
            j = 0;
        }
        if (typeof b == "function") b = {
            onAfter: b
        };
        if (n == "max") n = 9e9;
        b = d.extend({}, k.defaults, b);
        j = j || b.speed || b.duration;
        b.queue = b.queue && b.axis.length > 1;
        if (b.queue) j /= 2;
        b.offset = p(b.offset);
        b.over = p(b.over);
        return this._scrollable().each(function() {
            var q = this, r = d(q), f = n, s, g = {}, u = r.is("html,body");
            switch (typeof f) {
              case "number":
              case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)) {
                    f = p(f);
                    break;
                }
                f = d(f, this);

              case "object":
                if (f.is || f.style) s = (f = d(f)).offset();
            }
            d.each(b.axis.split(""), function(a, i) {
                var e = i == "x" ? "Left" : "Top", h = e.toLowerCase(), c = "scroll" + e, l = q[c], m = k.max(q, i);
                if (s) {
                    g[c] = s[h] + (u ? 0 : l - r.offset()[h]);
                    if (b.margin) {
                        g[c] -= parseInt(f.css("margin" + e)) || 0;
                        g[c] -= parseInt(f.css("border" + e + "Width")) || 0;
                    }
                    g[c] += b.offset[h] || 0;
                    if (b.over[h]) g[c] += f[i == "x" ? "width" : "height"]() * b.over[h];
                } else {
                    var o = f[h];
                    g[c] = o.slice && o.slice(-1) == "%" ? parseFloat(o) / 100 * m : o;
                }
                if (/^\d+$/.test(g[c])) g[c] = g[c] <= 0 ? 0 : Math.min(g[c], m);
                if (!a && b.queue) {
                    if (l != g[c]) t(b.onAfterFirst);
                    delete g[c];
                }
            });
            t(b.onAfter);
            function t(a) {
                r.animate(g, j, b.easing, a && function() {
                    a.call(this, n, b);
                });
            }
        }).end();
    };
    k.max = function(a, i) {
        var e = i == "x" ? "Width" : "Height", h = "scroll" + e;
        if (!d(a).is("html,body")) return a[h] - d(a)[e.toLowerCase()]();
        var c = "client" + e, l = a.ownerDocument.documentElement, m = a.ownerDocument.body;
        return Math.max(l[h], m[h]) - Math.min(l[c], m[c]);
    };
    function p(a) {
        return typeof a == "object" ? a : {
            top: a,
            left: a
        };
    }
})(jQuery);

jQuery.fn.selectText = function() {
    var doc = document, element = this[0], range, selection;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

(function(b) {
    b.fn.slideto = function(a) {
        a = b.extend({
            slide_duration: "slow",
            highlight_duration: 3e3,
            highlight: true,
            highlight_color: "#FFFF99"
        }, a);
        return this.each(function() {
            obj = b(this);
            b("body").animate({
                scrollTop: obj.offset().top
            }, a.slide_duration, function() {
                a.highlight && b.ui.version && obj.effect("highlight", {
                    color: a.highlight_color
                }, a.highlight_duration);
            });
        });
    };
})(jQuery);

(function($) {
    $.widget("thomaskahn.smoothDivScroll", {
        options: {
            scrollableArea: "div.scrollableArea",
            scrollWrapper: "div.scrollWrapper",
            hiddenOnStart: false,
            ajaxContentURL: "",
            countOnlyClass: "",
            scrollStep: 15,
            scrollInterval: 10,
            mouseDownSpeedBooster: 3,
            autoScroll: "",
            autoScrollDirection: "right",
            autoScrollStep: 5,
            autoScrollInterval: 10,
            startAtElementId: ""
        },
        _create: function() {
            var self = this, o = this.options, el = this.element;
            el.data("scrollWrapper", el.find(o.scrollWrapper));
            el.data("scrollableArea", el.find(o.scrollableArea));
            el.data("speedBooster", 1);
            el.data("motherElementOffset", el.offset().left);
            el.data("scrollXPos", 0);
            el.data("scrollableAreaWidth", 0);
            el.data("startingPosition", 0);
            el.data("rightScrollInterval", null);
            el.data("leftScrollInterval", null);
            el.data("autoScrollInterval", null);
            el.data("previousScrollLeft", 0);
            el.data("pingPongDirection", "right");
            el.data("getNextElementWidth", true);
            el.data("swapAt", null);
            el.data("startAtElementHasNotPassed", true);
            el.data("swappedElement", null);
            el.data("originalElements", el.data("scrollableArea").children(o.countOnlyClass));
            el.data("visible", true);
            el.data("initialAjaxContentLoaded", false);
            el.data("enabled", true);
            $("body").bind("mouseup", function() {
                el.data("speedBooster", 1);
            });
            $(window).bind("resize", function() {
                self._trigger("windowResized");
            });
            if (o.ajaxContentURL.length > 0) {
                self.replaceContent(o.ajaxContentURL);
            } else {
                self.recalculateScrollableArea();
            }
            if (o.hiddenOnStart) {
                self.hide();
            }
            if (o.autoScroll.length > 0 && !o.hiddenOnStart && o.ajaxContentURL.length <= 0) {
                self.startAutoScroll();
            }
        },
        recalculateScrollableArea: function() {
            var tempScrollableAreaWidth = 0, foundStartAtElement = false, o = this.options, el = this.element, self = this;
            el.data("scrollableArea").children(o.countOnlyClass).each(function() {
                if (o.startAtElementId.length > 0 && $(this).attr("id") === o.startAtElementId) {
                    el.data("startingPosition", tempScrollableAreaWidth);
                    foundStartAtElement = true;
                }
                var thisWidth = $(this).outerWidth();
                if (thisWidth > tempScrollableAreaWidth) {
                    tempScrollableAreaWidth = thisWidth;
                }
            });
            tempScrollableAreaWidth += 20;
            if (!foundStartAtElement) {
                el.data("startAtElementId", "");
            }
            el.data("scrollableAreaWidth", tempScrollableAreaWidth);
            el.data("scrollableArea").width(el.data("scrollableAreaWidth"));
            el.data("scrollWrapper").scrollLeft(el.data("startingPosition"));
            el.data("scrollXPos", el.data("startingPosition"));
            if (!el.data("initialAjaxContentLoaded")) {
                if (o.autoScroll.length > 0 && !o.hiddenOnStart && o.ajaxContentURL.length > 0) {
                    self.startAutoScroll();
                    el.data("initialAjaxContentLoaded", true);
                }
            }
        },
        stopAutoScroll: function() {
            var self = this, el = this.element;
            clearInterval(el.data("autoScrollInterval"));
            el.data("autoScrollInterval", null);
            self._trigger("autoScrollStopped");
        },
        startAutoScroll: function() {
            var self = this, el = this.element, o = this.options;
            clearInterval(el.data("autoScrollInterval"));
            el.data("autoScrollInterval", null);
            self._trigger("autoScrollStarted");
            el.data("autoScrollInterval", setInterval(function() {
                if (!el.data("visible") || el.data("scrollableAreaWidth") <= el.data("scrollWrapper").innerWidth()) {
                    clearInterval(el.data("autoScrollInterval"));
                    el.data("autoScrollInterval", null);
                } else {
                    el.data("previousScrollLeft", el.data("scrollWrapper").scrollLeft());
                    var delay = o.autoScrollInterval;
                    switch (o.autoScrollDirection) {
                      case "right":
                        el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + o.autoScrollStep);
                        if (el.data("previousScrollLeft") === el.data("scrollWrapper").scrollLeft()) {
                            self._trigger("autoScrollRightLimitReached");
                            clearInterval(el.data("autoScrollInterval"));
                            el.data("autoScrollInterval", null);
                            self._trigger("autoScrollIntervalStopped");
                        }
                        break;

                      case "left":
                        el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - o.autoScrollStep);
                        if (el.data("previousScrollLeft") === el.data("scrollWrapper").scrollLeft()) {
                            self._trigger("autoScrollLeftLimitReached");
                            clearInterval(el.data("autoScrollInterval"));
                            el.data("autoScrollInterval", null);
                            self._trigger("autoScrollIntervalStopped");
                        }
                        break;

                      case "backandforth":
                        if (el.data("pingPongDirection") === "right") {
                            el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + o.autoScrollStep);
                        } else {
                            el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - o.autoScrollStep);
                        }
                        if (el.data("previousScrollLeft") === el.data("scrollWrapper").scrollLeft()) {
                            if (el.data("pingPongDirection") === "right") {
                                el.data("pingPongDirection", "left");
                                self._trigger("autoScrollRightLimitReached");
                            } else {
                                el.data("pingPongDirection", "right");
                                self._trigger("autoScrollLeftLimitReached");
                            }
                        }
                        break;

                      case "endlessloopright":
                        if (el.data("getNextElementWidth")) {
                            if (o.startAtElementId.length > 0 && el.data("startAtElementHasNotPassed")) {
                                el.data("swapAt", $("#" + o.startAtElementId).outerWidth(true));
                                el.data("startAtElementHasNotPassed", false);
                            } else {
                                el.data("swapAt", el.data("scrollableArea").children(":first").outerWidth(true));
                            }
                            el.data("getNextElementWidth", false);
                        }
                        el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + o.autoScrollStep);
                        if (el.data("swapAt") <= el.data("scrollWrapper").scrollLeft()) {
                            el.data("swappedElement", el.data("scrollableArea").children(":first").detach());
                            el.data("scrollableArea").append(el.data("swappedElement"));
                            el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - el.data("swappedElement").outerWidth(true));
                            el.data("getNextElementWidth", true);
                        }
                        break;

                      case "endlessloopleft":
                        if (el.data("getNextElementWidth")) {
                            if (o.startAtElementId.length > 0 && el.data("startAtElementHasNotPassed")) {
                                el.data("swapAt", $("#" + o.startAtElementId).outerWidth(true));
                                el.data("startAtElementHasNotPassed", false);
                            } else {
                                el.data("swapAt", el.data("scrollableArea").children(":first").outerWidth(true));
                            }
                            el.data("getNextElementWidth", false);
                        }
                        el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - o.autoScrollStep);
                        if (el.data("scrollWrapper").scrollLeft() === 0) {
                            el.data("swappedElement", el.data("scrollableArea").children(":last").detach());
                            el.data("scrollableArea").prepend(el.data("swappedElement"));
                            el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + el.data("swappedElement").outerWidth(true));
                            el.data("getNextElementWidth", true);
                        }
                        break;

                      default:
                        break;
                    }
                }
            }, o.autoScrollInterval));
        },
        restoreOriginalElements: function() {
            var self = this, el = this.element;
            el.data("scrollableArea").html(el.data("originalElements"));
            self.recalculateScrollableArea();
            self.moveToElement("first");
        },
        show: function() {
            var el = this.element;
            el.data("visible", true);
            el.show();
        },
        hide: function() {
            var el = this.element;
            el.data("visible", false);
            el.hide();
        },
        enable: function() {
            var el = this.element;
            el.data("enabled", true);
        },
        disable: function() {
            var el = this.element;
            clearInterval(el.data("autoScrollInterval"));
            clearInterval(el.data("rightScrollInterval"));
            clearInterval(el.data("leftScrollInterval"));
            el.data("enabled", false);
        },
        destroy: function() {
            var el = this.element;
            clearInterval(el.data("autoScrollInterval"));
            clearInterval(el.data("rightScrollInterval"));
            clearInterval(el.data("leftScrollInterval"));
            el.data("scrollableArea").html(el.data("originalElements"));
            el.data("scrollableArea").removeAttr("style");
            el.data("scrollWrapper").scrollLeft(0);
            $.Widget.prototype.destroy.apply(this, arguments);
        }
    });
})(jQuery);

jQuery(function(a) {
    a.datepicker.regional.af = {
        closeText: "Selekteer",
        prevText: "Vorige",
        nextText: "Volgende",
        currentText: "Vandag",
        monthNames: [ "Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", "Oktober", "November", "Desember" ],
        monthNamesShort: [ "Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des" ],
        dayNames: [ "Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag" ],
        dayNamesShort: [ "Son", "Maa", "Din", "Woe", "Don", "Vry", "Sat" ],
        dayNamesMin: [ "So", "Ma", "Di", "Wo", "Do", "Vr", "Sa" ],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.af);
});

jQuery(function(a) {
    a.datepicker.regional["ar-DZ"] = {
        closeText: "إغلاق",
        prevText: "&#x3c;السابق",
        nextText: "التالي&#x3e;",
        currentText: "اليوم",
        monthNames: [ "جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر" ],
        monthNamesShort: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ],
        dayNames: [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
        dayNamesShort: [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
        dayNamesMin: [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
        weekHeader: "أسبوع",
        dateFormat: "dd/mm/yy",
        firstDay: 6,
        isRTL: true,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional["ar-DZ"]);
});

jQuery(function(a) {
    a.datepicker.regional.ar = {
        closeText: "إغلاق",
        prevText: "&#x3c;السابق",
        nextText: "التالي&#x3e;",
        currentText: "اليوم",
        monthNames: [ "كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول" ],
        monthNamesShort: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ],
        dayNames: [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
        dayNamesShort: [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
        dayNamesMin: [ "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت" ],
        weekHeader: "أسبوع",
        dateFormat: "dd/mm/yy",
        firstDay: 6,
        isRTL: true,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.ar);
});

jQuery(function(a) {
    a.datepicker.regional.az = {
        closeText: "Bağla",
        prevText: "&#x3c;Geri",
        nextText: "İrəli&#x3e;",
        currentText: "Bugün",
        monthNames: [ "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr" ],
        monthNamesShort: [ "Yan", "Fev", "Mar", "Apr", "May", "İyun", "İyul", "Avq", "Sen", "Okt", "Noy", "Dek" ],
        dayNames: [ "Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə" ],
        dayNamesShort: [ "B", "Be", "Ça", "Ç", "Ca", "C", "Ş" ],
        dayNamesMin: [ "B", "B", "Ç", "С", "Ç", "C", "Ş" ],
        weekHeader: "Hf",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.az);
});

jQuery(function(a) {
    a.datepicker.regional.bg = {
        closeText: "затвори",
        prevText: "&#x3c;назад",
        nextText: "напред&#x3e;",
        nextBigText: "&#x3e;&#x3e;",
        currentText: "днес",
        monthNames: [ "Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември" ],
        monthNamesShort: [ "Яну", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Нов", "Дек" ],
        dayNames: [ "Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота" ],
        dayNamesShort: [ "Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб" ],
        dayNamesMin: [ "Не", "По", "Вт", "Ср", "Че", "Пе", "Съ" ],
        weekHeader: "Wk",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.bg);
});

jQuery(function(a) {
    a.datepicker.regional.bs = {
        closeText: "Zatvori",
        prevText: "&#x3c;",
        nextText: "&#x3e;",
        currentText: "Danas",
        monthNames: [ "Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
        dayNames: [ "Nedelja", "Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota" ],
        dayNamesShort: [ "Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub" ],
        dayNamesMin: [ "Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su" ],
        weekHeader: "Wk",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.bs);
});

jQuery(function(a) {
    a.datepicker.regional.ca = {
        closeText: "Tancar",
        prevText: "&#x3c;Ant",
        nextText: "Seg&#x3e;",
        currentText: "Avui",
        monthNames: [ "Gener", "Febrer", "Mar&ccedil;", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre" ],
        monthNamesShort: [ "Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des" ],
        dayNames: [ "Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte" ],
        dayNamesShort: [ "Dug", "Dln", "Dmt", "Dmc", "Djs", "Dvn", "Dsb" ],
        dayNamesMin: [ "Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds" ],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.ca);
});

jQuery(function(a) {
    a.datepicker.regional.cs = {
        closeText: "Zavřít",
        prevText: "&#x3c;Dříve",
        nextText: "Později&#x3e;",
        currentText: "Nyní",
        monthNames: [ "leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec" ],
        monthNamesShort: [ "led", "úno", "bře", "dub", "kvě", "čer", "čvc", "srp", "zář", "říj", "lis", "pro" ],
        dayNames: [ "neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota" ],
        dayNamesShort: [ "ne", "po", "út", "st", "čt", "pá", "so" ],
        dayNamesMin: [ "ne", "po", "út", "st", "čt", "pá", "so" ],
        weekHeader: "Týd",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.cs);
});

jQuery(function(a) {
    a.datepicker.regional.da = {
        closeText: "Luk",
        prevText: "&#x3c;Forrige",
        nextText: "Næste&#x3e;",
        currentText: "Idag",
        monthNames: [ "Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
        dayNames: [ "Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag" ],
        dayNamesShort: [ "Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør" ],
        dayNamesMin: [ "Sø", "Ma", "Ti", "On", "To", "Fr", "Lø" ],
        weekHeader: "Uge",
        dateFormat: "dd-mm-yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.da);
});

jQuery(function(a) {
    a.datepicker.regional.de = {
        closeText: "schließen",
        prevText: "&#x3c;zurück",
        nextText: "Vor&#x3e;",
        currentText: "heute",
        monthNames: [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ],
        monthNamesShort: [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ],
        dayNames: [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag" ],
        dayNamesShort: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
        dayNamesMin: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
        weekHeader: "Wo",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.de);
});

jQuery(function(a) {
    a.datepicker.regional.el = {
        closeText: "Κλείσιμο",
        prevText: "Προηγούμενος",
        nextText: "Επόμενος",
        currentText: "Τρέχων Μήνας",
        monthNames: [ "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος" ],
        monthNamesShort: [ "Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ" ],
        dayNames: [ "Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο" ],
        dayNamesShort: [ "Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ" ],
        dayNamesMin: [ "Κυ", "Δε", "Τρ", "Τε", "Πε", "Πα", "Σα" ],
        weekHeader: "Εβδ",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.el);
});

jQuery(function(a) {
    a.datepicker.regional["en-AU"] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
        dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
        dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional["en-AU"]);
});

jQuery(function(a) {
    a.datepicker.regional["en-GB"] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
        dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
        dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional["en-GB"]);
});

jQuery(function(a) {
    a.datepicker.regional["en-NZ"] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
        dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
        dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional["en-NZ"]);
});

jQuery(function(a) {
    a.datepicker.regional.eo = {
        closeText: "Fermi",
        prevText: "&lt;Anta",
        nextText: "Sekv&gt;",
        currentText: "Nuna",
        monthNames: [ "Januaro", "Februaro", "Marto", "Aprilo", "Majo", "Junio", "Julio", "Aŭgusto", "Septembro", "Oktobro", "Novembro", "Decembro" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aŭg", "Sep", "Okt", "Nov", "Dec" ],
        dayNames: [ "Dimanĉo", "Lundo", "Mardo", "Merkredo", "Ĵaŭdo", "Vendredo", "Sabato" ],
        dayNamesShort: [ "Dim", "Lun", "Mar", "Mer", "Ĵaŭ", "Ven", "Sab" ],
        dayNamesMin: [ "Di", "Lu", "Ma", "Me", "Ĵa", "Ve", "Sa" ],
        weekHeader: "Sb",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.eo);
});

jQuery(function(a) {
    a.datepicker.regional.es = {
        closeText: "Cerrar",
        prevText: "&#x3c;Ant",
        nextText: "Sig&#x3e;",
        currentText: "Hoy",
        monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
        monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
        dayNames: [ "Domingo", "Lunes", "Martes", "Mi&eacute;rcoles", "Jueves", "Viernes", "S&aacute;bado" ],
        dayNamesShort: [ "Dom", "Lun", "Mar", "Mi&eacute;", "Juv", "Vie", "S&aacute;b" ],
        dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "S&aacute;" ],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.es);
});

jQuery(function(a) {
    a.datepicker.regional.et = {
        closeText: "Sulge",
        prevText: "Eelnev",
        nextText: "Järgnev",
        currentText: "Täna",
        monthNames: [ "Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember" ],
        monthNamesShort: [ "Jaan", "Veebr", "Märts", "Apr", "Mai", "Juuni", "Juuli", "Aug", "Sept", "Okt", "Nov", "Dets" ],
        dayNames: [ "Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev" ],
        dayNamesShort: [ "Pühap", "Esmasp", "Teisip", "Kolmap", "Neljap", "Reede", "Laup" ],
        dayNamesMin: [ "P", "E", "T", "K", "N", "R", "L" ],
        weekHeader: "Sm",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.et);
});

jQuery(function(a) {
    a.datepicker.regional.eu = {
        closeText: "Egina",
        prevText: "&#x3c;Aur",
        nextText: "Hur&#x3e;",
        currentText: "Gaur",
        monthNames: [ "Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua" ],
        monthNamesShort: [ "Urt", "Ots", "Mar", "Api", "Mai", "Eka", "Uzt", "Abu", "Ira", "Urr", "Aza", "Abe" ],
        dayNames: [ "Igandea", "Astelehena", "Asteartea", "Asteazkena", "Osteguna", "Ostirala", "Larunbata" ],
        dayNamesShort: [ "Iga", "Ast", "Ast", "Ast", "Ost", "Ost", "Lar" ],
        dayNamesMin: [ "Ig", "As", "As", "As", "Os", "Os", "La" ],
        weekHeader: "Wk",
        dateFormat: "yy/mm/dd",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.eu);
});

jQuery(function(a) {
    a.datepicker.regional.fa = {
        closeText: "بستن",
        prevText: "&#x3c;قبلي",
        nextText: "بعدي&#x3e;",
        currentText: "امروز",
        monthNames: [ "فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دي", "بهمن", "اسفند" ],
        monthNamesShort: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ],
        dayNames: [ "يکشنبه", "دوشنبه", "سهشنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه" ],
        dayNamesShort: [ "ي", "د", "س", "چ", "پ", "ج", "ش" ],
        dayNamesMin: [ "ي", "د", "س", "چ", "پ", "ج", "ش" ],
        weekHeader: "هف",
        dateFormat: "yy/mm/dd",
        firstDay: 6,
        isRTL: true,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.fa);
});

jQuery(function(a) {
    a.datepicker.regional.fi = {
        closeText: "Sulje",
        prevText: "&laquo;Edellinen",
        nextText: "Seuraava&raquo;",
        currentText: "T&auml;n&auml;&auml;n",
        monthNames: [ "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu" ],
        monthNamesShort: [ "Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kes&auml;", "Hein&auml;", "Elo", "Syys", "Loka", "Marras", "Joulu" ],
        dayNamesShort: [ "Su", "Ma", "Ti", "Ke", "To", "Pe", "Su" ],
        dayNames: [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai" ],
        dayNamesMin: [ "Su", "Ma", "Ti", "Ke", "To", "Pe", "La" ],
        weekHeader: "Vk",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.fi);
});

jQuery(function(a) {
    a.datepicker.regional.fo = {
        closeText: "Lat aftur",
        prevText: "&#x3c;Fyrra",
        nextText: "Næsta&#x3e;",
        currentText: "Í dag",
        monthNames: [ "Januar", "Februar", "Mars", "Apríl", "Mei", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des" ],
        dayNames: [ "Sunnudagur", "Mánadagur", "Týsdagur", "Mikudagur", "Hósdagur", "Fríggjadagur", "Leyardagur" ],
        dayNamesShort: [ "Sun", "Mán", "Týs", "Mik", "Hós", "Frí", "Ley" ],
        dayNamesMin: [ "Su", "Má", "Tý", "Mi", "Hó", "Fr", "Le" ],
        weekHeader: "Vk",
        dateFormat: "dd-mm-yy",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.fo);
});

jQuery(function(a) {
    a.datepicker.regional["fr-CH"] = {
        closeText: "Fermer",
        prevText: "&#x3c;Préc",
        nextText: "Suiv&#x3e;",
        currentText: "Courant",
        monthNames: [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
        monthNamesShort: [ "Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc" ],
        dayNames: [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ],
        dayNamesShort: [ "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam" ],
        dayNamesMin: [ "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa" ],
        weekHeader: "Sm",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional["fr-CH"]);
});

jQuery(function(a) {
    a.datepicker.regional.fr = {
        closeText: "Fermer",
        prevText: "Précédent",
        nextText: "Suivant",
        currentText: "Aujourd'hui",
        monthNames: [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
        monthNamesShort: [ "Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc." ],
        dayNames: [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ],
        dayNamesShort: [ "Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam." ],
        dayNamesMin: [ "D", "L", "M", "M", "J", "V", "S" ],
        weekHeader: "Sem.",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.fr);
});

jQuery(function(a) {
    a.datepicker.regional.gl = {
        closeText: "Pechar",
        prevText: "&#x3c;Ant",
        nextText: "Seg&#x3e;",
        currentText: "Hoxe",
        monthNames: [ "Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro" ],
        monthNamesShort: [ "Xan", "Feb", "Mar", "Abr", "Mai", "Xuñ", "Xul", "Ago", "Set", "Out", "Nov", "Dec" ],
        dayNames: [ "Domingo", "Luns", "Martes", "M&eacute;rcores", "Xoves", "Venres", "S&aacute;bado" ],
        dayNamesShort: [ "Dom", "Lun", "Mar", "M&eacute;r", "Xov", "Ven", "S&aacute;b" ],
        dayNamesMin: [ "Do", "Lu", "Ma", "M&eacute;", "Xo", "Ve", "S&aacute;" ],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.gl);
});

jQuery(function(a) {
    a.datepicker.regional.he = {
        closeText: "סגור",
        prevText: "&#x3c;הקודם",
        nextText: "הבא&#x3e;",
        currentText: "היום",
        monthNames: [ "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר" ],
        monthNamesShort: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ],
        dayNames: [ "ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת" ],
        dayNamesShort: [ "א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת" ],
        dayNamesMin: [ "א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת" ],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: true,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.he);
});

jQuery(function(a) {
    a.datepicker.regional.hr = {
        closeText: "Zatvori",
        prevText: "&#x3c;",
        nextText: "&#x3e;",
        currentText: "Danas",
        monthNames: [ "Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac" ],
        monthNamesShort: [ "Sij", "Velj", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro" ],
        dayNames: [ "Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota" ],
        dayNamesShort: [ "Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub" ],
        dayNamesMin: [ "Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su" ],
        weekHeader: "Tje",
        dateFormat: "dd.mm.yy.",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.hr);
});

jQuery(function(a) {
    a.datepicker.regional.hu = {
        closeText: "bezárás",
        prevText: "&laquo;&nbsp;vissza",
        nextText: "előre&nbsp;&raquo;",
        currentText: "ma",
        monthNames: [ "Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December" ],
        monthNamesShort: [ "Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec" ],
        dayNames: [ "Vasárnap", "Hétfö", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat" ],
        dayNamesShort: [ "Vas", "Hét", "Ked", "Sze", "Csü", "Pén", "Szo" ],
        dayNamesMin: [ "V", "H", "K", "Sze", "Cs", "P", "Szo" ],
        weekHeader: "Hé",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.hu);
});

jQuery(function(a) {
    a.datepicker.regional.hy = {
        closeText: "Փակել",
        prevText: "&#x3c;Նախ.",
        nextText: "Հաջ.&#x3e;",
        currentText: "Այսօր",
        monthNames: [ "Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր" ],
        monthNamesShort: [ "Հունվ", "Փետր", "Մարտ", "Ապր", "Մայիս", "Հունիս", "Հուլ", "Օգս", "Սեպ", "Հոկ", "Նոյ", "Դեկ" ],
        dayNames: [ "կիրակի", "եկուշաբթի", "երեքշաբթի", "չորեքշաբթի", "հինգշաբթի", "ուրբաթ", "շաբաթ" ],
        dayNamesShort: [ "կիր", "երկ", "երք", "չրք", "հնգ", "ուրբ", "շբթ" ],
        dayNamesMin: [ "կիր", "երկ", "երք", "չրք", "հնգ", "ուրբ", "շբթ" ],
        weekHeader: "ՇԲՏ",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.hy);
});

jQuery(function(a) {
    a.datepicker.regional.id = {
        closeText: "Tutup",
        prevText: "&#x3c;mundur",
        nextText: "maju&#x3e;",
        currentText: "hari ini",
        monthNames: [ "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agus", "Sep", "Okt", "Nop", "Des" ],
        dayNames: [ "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu" ],
        dayNamesShort: [ "Min", "Sen", "Sel", "Rab", "kam", "Jum", "Sab" ],
        dayNamesMin: [ "Mg", "Sn", "Sl", "Rb", "Km", "jm", "Sb" ],
        weekHeader: "Mg",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.id);
});

jQuery(function(a) {
    a.datepicker.regional.is = {
        closeText: "Loka",
        prevText: "&#x3c; Fyrri",
        nextText: "N&aelig;sti &#x3e;",
        currentText: "&Iacute; dag",
        monthNames: [ "Jan&uacute;ar", "Febr&uacute;ar", "Mars", "Apr&iacute;l", "Ma&iacute", "J&uacute;n&iacute;", "J&uacute;l&iacute;", "&Aacute;g&uacute;st", "September", "Okt&oacute;ber", "N&oacute;vember", "Desember" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Ma&iacute;", "J&uacute;n", "J&uacute;l", "&Aacute;g&uacute;", "Sep", "Okt", "N&oacute;v", "Des" ],
        dayNames: [ "Sunnudagur", "M&aacute;nudagur", "&THORN;ri&eth;judagur", "Mi&eth;vikudagur", "Fimmtudagur", "F&ouml;studagur", "Laugardagur" ],
        dayNamesShort: [ "Sun", "M&aacute;n", "&THORN;ri", "Mi&eth;", "Fim", "F&ouml;s", "Lau" ],
        dayNamesMin: [ "Su", "M&aacute;", "&THORN;r", "Mi", "Fi", "F&ouml;", "La" ],
        weekHeader: "Vika",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.is);
});

jQuery(function(a) {
    a.datepicker.regional.it = {
        closeText: "Chiudi",
        prevText: "&#x3c;Prec",
        nextText: "Succ&#x3e;",
        currentText: "Oggi",
        monthNames: [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ],
        monthNamesShort: [ "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic" ],
        dayNames: [ "Domenica", "Luned&#236", "Marted&#236", "Mercoled&#236", "Gioved&#236", "Venerd&#236", "Sabato" ],
        dayNamesShort: [ "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab" ],
        dayNamesMin: [ "Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa" ],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.it);
});

jQuery(function(a) {
    a.datepicker.regional.ja = {
        closeText: "閉じる",
        prevText: "&#x3c;前",
        nextText: "次&#x3e;",
        currentText: "今日",
        monthNames: [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
        monthNamesShort: [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
        dayNames: [ "日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日" ],
        dayNamesShort: [ "日", "月", "火", "水", "木", "金", "土" ],
        dayNamesMin: [ "日", "月", "火", "水", "木", "金", "土" ],
        weekHeader: "週",
        dateFormat: "yy/mm/dd",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: "年"
    };
    a.datepicker.setDefaults(a.datepicker.regional.ja);
});

jQuery(function(a) {
    a.datepicker.regional.ko = {
        closeText: "닫기",
        prevText: "이전달",
        nextText: "다음달",
        currentText: "오늘",
        monthNames: [ "1월(JAN)", "2월(FEB)", "3월(MAR)", "4월(APR)", "5월(MAY)", "6월(JUN)", "7월(JUL)", "8월(AUG)", "9월(SEP)", "10월(OCT)", "11월(NOV)", "12월(DEC)" ],
        monthNamesShort: [ "1월(JAN)", "2월(FEB)", "3월(MAR)", "4월(APR)", "5월(MAY)", "6월(JUN)", "7월(JUL)", "8월(AUG)", "9월(SEP)", "10월(OCT)", "11월(NOV)", "12월(DEC)" ],
        dayNames: [ "일", "월", "화", "수", "목", "금", "토" ],
        dayNamesShort: [ "일", "월", "화", "수", "목", "금", "토" ],
        dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
        weekHeader: "Wk",
        dateFormat: "yy-mm-dd",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: "년"
    };
    a.datepicker.setDefaults(a.datepicker.regional.ko);
});

jQuery(function(a) {
    a.datepicker.regional.kz = {
        closeText: "Жабу",
        prevText: "&#x3c;Алдыңғы",
        nextText: "Келесі&#x3e;",
        currentText: "Бүгін",
        monthNames: [ "Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан" ],
        monthNamesShort: [ "Қаң", "Ақп", "Нау", "Сәу", "Мам", "Мау", "Шіл", "Там", "Қыр", "Қаз", "Қар", "Жел" ],
        dayNames: [ "Жексенбі", "Дүйсенбі", "Сейсенбі", "Сәрсенбі", "Бейсенбі", "Жұма", "Сенбі" ],
        dayNamesShort: [ "жкс", "дсн", "ссн", "срс", "бсн", "жма", "снб" ],
        dayNamesMin: [ "Жк", "Дс", "Сс", "Ср", "Бс", "Жм", "Сн" ],
        weekHeader: "Не",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.kz);
});

jQuery(function(a) {
    a.datepicker.regional.lt = {
        closeText: "Uždaryti",
        prevText: "&#x3c;Atgal",
        nextText: "Pirmyn&#x3e;",
        currentText: "Šiandien",
        monthNames: [ "Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis" ],
        monthNamesShort: [ "Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gru" ],
        dayNames: [ "sekmadienis", "pirmadienis", "antradienis", "trečiadienis", "ketvirtadienis", "penktadienis", "šeštadienis" ],
        dayNamesShort: [ "sek", "pir", "ant", "tre", "ket", "pen", "šeš" ],
        dayNamesMin: [ "Se", "Pr", "An", "Tr", "Ke", "Pe", "Še" ],
        weekHeader: "Wk",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.lt);
});

jQuery(function(a) {
    a.datepicker.regional.lv = {
        closeText: "Aizvērt",
        prevText: "Iepr",
        nextText: "Nāka",
        currentText: "Šodien",
        monthNames: [ "Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Aug", "Sep", "Okt", "Nov", "Dec" ],
        dayNames: [ "svētdiena", "pirmdiena", "otrdiena", "trešdiena", "ceturtdiena", "piektdiena", "sestdiena" ],
        dayNamesShort: [ "svt", "prm", "otr", "tre", "ctr", "pkt", "sst" ],
        dayNamesMin: [ "Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "Ss" ],
        weekHeader: "Nav",
        dateFormat: "dd-mm-yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.lv);
});

jQuery(function(a) {
    a.datepicker.regional.ml = {
        closeText: "ശരി",
        prevText: "മുന്നത്തെ",
        nextText: "അടുത്തത് ",
        currentText: "ഇന്ന്",
        monthNames: [ "ജനുവരി", "ഫെബ്രുവരി", "മാര്ച്ച്", "ഏപ്രില്", "മേയ്", "ജൂണ്", "ജൂലൈ", "ആഗസ്റ്റ്", "സെപ്റ്റംബര്", "ഒക്ടോബര്", "നവംബര്", "ഡിസംബര്" ],
        monthNamesShort: [ "ജനു", "ഫെബ്", "മാര്", "ഏപ്രി", "മേയ്", "ജൂണ്", "ജൂലാ", "ആഗ", "സെപ്", "ഒക്ടോ", "നവം", "ഡിസ" ],
        dayNames: [ "ഞായര്", "തിങ്കള്", "ചൊവ്വ", "ബുധന്", "വ്യാഴം", "വെള്ളി", "ശനി" ],
        dayNamesShort: [ "ഞായ", "തിങ്ക", "ചൊവ്വ", "ബുധ", "വ്യാഴം", "വെള്ളി", "ശനി" ],
        dayNamesMin: [ "ഞാ", "തി", "ചൊ", "ബു", "വ്യാ", "വെ", "ശ" ],
        weekHeader: "ആ",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.ml);
});

jQuery(function(a) {
    a.datepicker.regional.ms = {
        closeText: "Tutup",
        prevText: "&#x3c;Sebelum",
        nextText: "Selepas&#x3e;",
        currentText: "hari ini",
        monthNames: [ "Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember" ],
        monthNamesShort: [ "Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis" ],
        dayNames: [ "Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu" ],
        dayNamesShort: [ "Aha", "Isn", "Sel", "Rab", "kha", "Jum", "Sab" ],
        dayNamesMin: [ "Ah", "Is", "Se", "Ra", "Kh", "Ju", "Sa" ],
        weekHeader: "Mg",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.ms);
});

jQuery(function(a) {
    a.datepicker.regional.nl = {
        closeText: "Sluiten",
        prevText: "←",
        nextText: "→",
        currentText: "Vandaag",
        monthNames: [ "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december" ],
        monthNamesShort: [ "jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec" ],
        dayNames: [ "zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag" ],
        dayNamesShort: [ "zon", "maa", "din", "woe", "don", "vri", "zat" ],
        dayNamesMin: [ "zo", "ma", "di", "wo", "do", "vr", "za" ],
        weekHeader: "Wk",
        dateFormat: "dd-mm-yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.nl);
});

jQuery(function(a) {
    a.datepicker.regional.no = {
        closeText: "Lukk",
        prevText: "&laquo;Forrige",
        nextText: "Neste&raquo;",
        currentText: "I dag",
        monthNames: [ "januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember" ],
        monthNamesShort: [ "jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des" ],
        dayNamesShort: [ "søn", "man", "tir", "ons", "tor", "fre", "lør" ],
        dayNames: [ "søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag" ],
        dayNamesMin: [ "sø", "ma", "ti", "on", "to", "fr", "lø" ],
        weekHeader: "Uke",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.no);
});

jQuery(function(a) {
    a.datepicker.regional.pl = {
        closeText: "Zamknij",
        prevText: "&#x3c;Poprzedni",
        nextText: "Następny&#x3e;",
        currentText: "Dziś",
        monthNames: [ "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień" ],
        monthNamesShort: [ "Sty", "Lu", "Mar", "Kw", "Maj", "Cze", "Lip", "Sie", "Wrz", "Pa", "Lis", "Gru" ],
        dayNames: [ "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota" ],
        dayNamesShort: [ "Nie", "Pn", "Wt", "Śr", "Czw", "Pt", "So" ],
        dayNamesMin: [ "N", "Pn", "Wt", "Śr", "Cz", "Pt", "So" ],
        weekHeader: "Tydz",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.pl);
});

jQuery(function(a) {
    a.datepicker.regional["pt-BR"] = {
        closeText: "Fechar",
        prevText: "&#x3c;Anterior",
        nextText: "Pr&oacute;ximo&#x3e;",
        currentText: "Hoje",
        monthNames: [ "Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ],
        monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
        dayNames: [ "Domingo", "Segunda-feira", "Ter&ccedil;a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S&aacute;bado" ],
        dayNamesShort: [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b" ],
        dayNamesMin: [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b" ],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional["pt-BR"]);
});

jQuery(function(a) {
    a.datepicker.regional.pt = {
        closeText: "Fechar",
        prevText: "&#x3c;Anterior",
        nextText: "Seguinte",
        currentText: "Hoje",
        monthNames: [ "Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ],
        monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
        dayNames: [ "Domingo", "Segunda-feira", "Ter&ccedil;a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S&aacute;bado" ],
        dayNamesShort: [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b" ],
        dayNamesMin: [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S&aacute;b" ],
        weekHeader: "Sem",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.pt);
});

jQuery(function(a) {
    a.datepicker.regional.rm = {
        closeText: "Serrar",
        prevText: "&#x3c;Suandant",
        nextText: "Precedent&#x3e;",
        currentText: "Actual",
        monthNames: [ "Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December" ],
        monthNamesShort: [ "Scha", "Fev", "Mar", "Avr", "Matg", "Zer", "Fan", "Avu", "Sett", "Oct", "Nov", "Dec" ],
        dayNames: [ "Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda" ],
        dayNamesShort: [ "Dum", "Gli", "Mar", "Mes", "Gie", "Ven", "Som" ],
        dayNamesMin: [ "Du", "Gl", "Ma", "Me", "Gi", "Ve", "So" ],
        weekHeader: "emna",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.rm);
});

jQuery(function(a) {
    a.datepicker.regional.ro = {
        closeText: "Închide",
        prevText: "&laquo; Luna precedentă",
        nextText: "Luna următoare &raquo;",
        currentText: "Azi",
        monthNames: [ "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie" ],
        monthNamesShort: [ "Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        dayNames: [ "Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă" ],
        dayNamesShort: [ "Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm" ],
        dayNamesMin: [ "Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ" ],
        weekHeader: "Săpt",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.ro);
});

jQuery(function(a) {
    a.datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3c;Пред",
        nextText: "След&#x3e;",
        currentText: "Сегодня",
        monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
        monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
        dayNames: [ "воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота" ],
        dayNamesShort: [ "вск", "пнд", "втр", "срд", "чтв", "птн", "сбт" ],
        dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
        weekHeader: "Нед",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.ru);
});

jQuery(function(a) {
    a.datepicker.regional.sk = {
        closeText: "Zavrieť",
        prevText: "&#x3c;Predchádzajúci",
        nextText: "Nasledujúci&#x3e;",
        currentText: "Dnes",
        monthNames: [ "Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec" ],
        dayNames: [ "Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota" ],
        dayNamesShort: [ "Ned", "Pon", "Uto", "Str", "Štv", "Pia", "Sob" ],
        dayNamesMin: [ "Ne", "Po", "Ut", "St", "Št", "Pia", "So" ],
        weekHeader: "Ty",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.sk);
});

jQuery(function(a) {
    a.datepicker.regional.sl = {
        closeText: "Zapri",
        prevText: "&lt;Prej&#x161;nji",
        nextText: "Naslednji&gt;",
        currentText: "Trenutni",
        monthNames: [ "Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec" ],
        dayNames: [ "Nedelja", "Ponedeljek", "Torek", "Sreda", "&#x10C;etrtek", "Petek", "Sobota" ],
        dayNamesShort: [ "Ned", "Pon", "Tor", "Sre", "&#x10C;et", "Pet", "Sob" ],
        dayNamesMin: [ "Ne", "Po", "To", "Sr", "&#x10C;e", "Pe", "So" ],
        weekHeader: "Teden",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.sl);
});

jQuery(function(a) {
    a.datepicker.regional.sq = {
        closeText: "mbylle",
        prevText: "&#x3c;mbrapa",
        nextText: "Përpara&#x3e;",
        currentText: "sot",
        monthNames: [ "Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor" ],
        monthNamesShort: [ "Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gus", "Sht", "Tet", "Nën", "Dhj" ],
        dayNames: [ "E Diel", "E Hënë", "E Martë", "E Mërkurë", "E Enjte", "E Premte", "E Shtune" ],
        dayNamesShort: [ "Di", "Hë", "Ma", "Më", "En", "Pr", "Sh" ],
        dayNamesMin: [ "Di", "Hë", "Ma", "Më", "En", "Pr", "Sh" ],
        weekHeader: "Ja",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.sq);
});

jQuery(function(a) {
    a.datepicker.regional["sr-SR"] = {
        closeText: "Zatvori",
        prevText: "&#x3c;",
        nextText: "&#x3e;",
        currentText: "Danas",
        monthNames: [ "Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec" ],
        dayNames: [ "Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota" ],
        dayNamesShort: [ "Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub" ],
        dayNamesMin: [ "Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su" ],
        weekHeader: "Sed",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional["sr-SR"]);
});

jQuery(function(a) {
    a.datepicker.regional.sr = {
        closeText: "Затвори",
        prevText: "&#x3c;",
        nextText: "&#x3e;",
        currentText: "Данас",
        monthNames: [ "Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар" ],
        monthNamesShort: [ "Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец" ],
        dayNames: [ "Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота" ],
        dayNamesShort: [ "Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб" ],
        dayNamesMin: [ "Не", "По", "Ут", "Ср", "Че", "Пе", "Су" ],
        weekHeader: "Сед",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.sr);
});

jQuery(function(a) {
    a.datepicker.regional.sv = {
        closeText: "Stäng",
        prevText: "&laquo;Förra",
        nextText: "Nästa&raquo;",
        currentText: "Idag",
        monthNames: [ "Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
        dayNamesShort: [ "Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör" ],
        dayNames: [ "Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag" ],
        dayNamesMin: [ "Sö", "Må", "Ti", "On", "To", "Fr", "Lö" ],
        weekHeader: "Ve",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.sv);
});

jQuery(function(a) {
    a.datepicker.regional.ta = {
        closeText: "மூடு",
        prevText: "முன்னையது",
        nextText: "அடுத்தது",
        currentText: "இன்று",
        monthNames: [ "தை", "மாசி", "பங்குனி", "சித்திரை", "வைகாசி", "ஆனி", "ஆடி", "ஆவணி", "புரட்டாசி", "ஐப்பசி", "கார்த்திகை", "மார்கழி" ],
        monthNamesShort: [ "தை", "மாசி", "பங்", "சித்", "வைகா", "ஆனி", "ஆடி", "ஆவ", "புர", "ஐப்", "கார்", "மார்" ],
        dayNames: [ "ஞாயிற்றுக்கிழமை", "திங்கட்கிழமை", "செவ்வாய்க்கிழமை", "புதன்கிழமை", "வியாழக்கிழமை", "வெள்ளிக்கிழமை", "சனிக்கிழமை" ],
        dayNamesShort: [ "ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி" ],
        dayNamesMin: [ "ஞா", "தி", "செ", "பு", "வி", "வெ", "ச" ],
        weekHeader: "Не",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.ta);
});

jQuery(function(a) {
    a.datepicker.regional.th = {
        closeText: "ปิด",
        prevText: "&laquo;&nbsp;ย้อน",
        nextText: "ถัดไป&nbsp;&raquo;",
        currentText: "วันนี้",
        monthNames: [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม" ],
        monthNamesShort: [ "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค." ],
        dayNames: [ "อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์" ],
        dayNamesShort: [ "อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส." ],
        dayNamesMin: [ "อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส." ],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.th);
});

jQuery(function(a) {
    a.datepicker.regional.tj = {
        closeText: "Идома",
        prevText: "&#x3c;Қафо",
        nextText: "Пеш&#x3e;",
        currentText: "Имрӯз",
        monthNames: [ "Январ", "Феврал", "Март", "Апрел", "Май", "Июн", "Июл", "Август", "Сентябр", "Октябр", "Ноябр", "Декабр" ],
        monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек" ],
        dayNames: [ "якшанбе", "душанбе", "сешанбе", "чоршанбе", "панҷшанбе", "ҷумъа", "шанбе" ],
        dayNamesShort: [ "якш", "душ", "сеш", "чор", "пан", "ҷум", "шан" ],
        dayNamesMin: [ "Як", "Дш", "Сш", "Чш", "Пш", "Ҷм", "Шн" ],
        weekHeader: "Хф",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.tj);
});

jQuery(function(a) {
    a.datepicker.regional.tr = {
        closeText: "kapat",
        prevText: "&#x3c;geri",
        nextText: "ileri&#x3e",
        currentText: "bugün",
        monthNames: [ "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık" ],
        monthNamesShort: [ "Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara" ],
        dayNames: [ "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi" ],
        dayNamesShort: [ "Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct" ],
        dayNamesMin: [ "Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct" ],
        weekHeader: "Hf",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.tr);
});

jQuery(function(a) {
    a.datepicker.regional.uk = {
        closeText: "Закрити",
        prevText: "&#x3c;",
        nextText: "&#x3e;",
        currentText: "Сьогодні",
        monthNames: [ "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень" ],
        monthNamesShort: [ "Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру" ],
        dayNames: [ "неділя", "понеділок", "вівторок", "середа", "четвер", "п’ятниця", "субота" ],
        dayNamesShort: [ "нед", "пнд", "вів", "срд", "чтв", "птн", "сбт" ],
        dayNamesMin: [ "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
        weekHeader: "Не",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.uk);
});

jQuery(function(a) {
    a.datepicker.regional.vi = {
        closeText: "Đóng",
        prevText: "&#x3c;Trước",
        nextText: "Tiếp&#x3e;",
        currentText: "Hôm nay",
        monthNames: [ "Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai" ],
        monthNamesShort: [ "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12" ],
        dayNames: [ "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy" ],
        dayNamesShort: [ "CN", "T2", "T3", "T4", "T5", "T6", "T7" ],
        dayNamesMin: [ "CN", "T2", "T3", "T4", "T5", "T6", "T7" ],
        weekHeader: "Tu",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    a.datepicker.setDefaults(a.datepicker.regional.vi);
});

jQuery(function(a) {
    a.datepicker.regional["zh-CN"] = {
        closeText: "关闭",
        prevText: "&#x3c;上月",
        nextText: "下月&#x3e;",
        currentText: "今天",
        monthNames: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
        monthNamesShort: [ "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二" ],
        dayNames: [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ],
        dayNamesShort: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
        dayNamesMin: [ "日", "一", "二", "三", "四", "五", "六" ],
        weekHeader: "周",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: "年"
    };
    a.datepicker.setDefaults(a.datepicker.regional["zh-CN"]);
});

jQuery(function(a) {
    a.datepicker.regional["zh-HK"] = {
        closeText: "關閉",
        prevText: "&#x3c;上月",
        nextText: "下月&#x3e;",
        currentText: "今天",
        monthNames: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
        monthNamesShort: [ "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二" ],
        dayNames: [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ],
        dayNamesShort: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
        dayNamesMin: [ "日", "一", "二", "三", "四", "五", "六" ],
        weekHeader: "周",
        dateFormat: "dd-mm-yy",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: "年"
    };
    a.datepicker.setDefaults(a.datepicker.regional["zh-HK"]);
});

jQuery(function(a) {
    a.datepicker.regional["zh-TW"] = {
        closeText: "關閉",
        prevText: "&#x3c;上月",
        nextText: "下月&#x3e;",
        currentText: "今天",
        monthNames: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
        monthNamesShort: [ "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二" ],
        dayNames: [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ],
        dayNamesShort: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
        dayNamesMin: [ "日", "一", "二", "三", "四", "五", "六" ],
        weekHeader: "周",
        dateFormat: "yy/mm/dd",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: "年"
    };
    a.datepicker.setDefaults(a.datepicker.regional["zh-TW"]);
});

(function(a, d) {
    function c(h, g) {
        var i = h.nodeName.toLowerCase();
        if ("area" === i) {
            g = h.parentNode;
            i = g.name;
            if (!h.href || !i || g.nodeName.toLowerCase() !== "map") return false;
            h = a("img[usemap=#" + i + "]")[0];
            return !!h && e(h);
        }
        return (/input|select|textarea|button|object/.test(i) ? !h.disabled : "a" == i ? h.href || g : g) && e(h);
    }
    function e(h) {
        return !a(h).parents().andSelf().filter(function() {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this);
        }).length;
    }
    a.ui = a.ui || {};
    if (!a.ui.version) {
        a.extend(a.ui, {
            version: "1.8.16",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        a.fn.extend({
            propAttr: a.fn.prop || a.fn.attr,
            _focus: a.fn.focus,
            focus: function(h, g) {
                return typeof h === "number" ? this.each(function() {
                    var i = this;
                    setTimeout(function() {
                        a(i).focus();
                        g && g.call(i);
                    }, h);
                }) : this._focus.apply(this, arguments);
            },
            scrollParent: function() {
                var h;
                h = a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1));
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1));
                }).eq(0);
                return /fixed/.test(this.css("position")) || !h.length ? a(document) : h;
            },
            zIndex: function(h) {
                if (h !== d) return this.css("zIndex", h);
                if (this.length) {
                    h = a(this[0]);
                    for (var g; h.length && h[0] !== document; ) {
                        g = h.css("position");
                        if (g === "absolute" || g === "relative" || g === "fixed") {
                            g = parseInt(h.css("zIndex"), 10);
                            if (!isNaN(g) && g !== 0) return g;
                        }
                        h = h.parent();
                    }
                }
                return 0;
            },
            disableSelection: function() {
                return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(h) {
                    h.preventDefault();
                });
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection");
            }
        });
        a.each([ "Width", "Height" ], function(h, g) {
            function i(l, o, n, k) {
                a.each(b, function() {
                    o -= parseFloat(a.curCSS(l, "padding" + this, true)) || 0;
                    if (n) o -= parseFloat(a.curCSS(l, "border" + this + "Width", true)) || 0;
                    if (k) o -= parseFloat(a.curCSS(l, "margin" + this, true)) || 0;
                });
                return o;
            }
            var b = g === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ], f = g.toLowerCase(), j = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
            a.fn["inner" + g] = function(l) {
                if (l === d) return j["inner" + g].call(this);
                return this.each(function() {
                    a(this).css(f, i(this, l) + "px");
                });
            };
            a.fn["outer" + g] = function(l, o) {
                if (typeof l !== "number") return j["outer" + g].call(this, l);
                return this.each(function() {
                    a(this).css(f, i(this, l, true, o) + "px");
                });
            };
        });
        a.extend(a.expr[":"], {
            data: function(h, g, i) {
                return !!a.data(h, i[3]);
            },
            focusable: function(h) {
                return c(h, !isNaN(a.attr(h, "tabindex")));
            },
            tabbable: function(h) {
                var g = a.attr(h, "tabindex"), i = isNaN(g);
                return (i || g >= 0) && c(h, !i);
            }
        });
        a(function() {
            var h = document.body, g = h.appendChild(g = document.createElement("div"));
            a.extend(g.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            });
            a.support.minHeight = g.offsetHeight === 100;
            a.support.selectstart = "onselectstart" in g;
            h.removeChild(g).style.display = "none";
        });
        a.extend(a.ui, {
            plugin: {
                add: function(h, g, i) {
                    h = a.ui[h].prototype;
                    for (var b in i) {
                        h.plugins[b] = h.plugins[b] || [];
                        h.plugins[b].push([ g, i[b] ]);
                    }
                },
                call: function(h, g, i) {
                    if ((g = h.plugins[g]) && h.element[0].parentNode) for (var b = 0; b < g.length; b++) h.options[g[b][0]] && g[b][1].apply(h.element, i);
                }
            },
            contains: function(h, g) {
                return document.compareDocumentPosition ? h.compareDocumentPosition(g) & 16 : h !== g && h.contains(g);
            },
            hasScroll: function(h, g) {
                if (a(h).css("overflow") === "hidden") return false;
                g = g && g === "left" ? "scrollLeft" : "scrollTop";
                var i = false;
                if (h[g] > 0) return true;
                h[g] = 1;
                i = h[g] > 0;
                h[g] = 0;
                return i;
            },
            isOverAxis: function(h, g, i) {
                return h > g && h < g + i;
            },
            isOver: function(h, g, i, b, f, j) {
                return a.ui.isOverAxis(h, i, f) && a.ui.isOverAxis(g, b, j);
            }
        });
    }
})(jQuery);

(function(a, d) {
    if (a.cleanData) {
        var c = a.cleanData;
        a.cleanData = function(h) {
            for (var g = 0, i; (i = h[g]) != null; g++) try {
                a(i).triggerHandler("remove");
            } catch (b) {}
            c(h);
        };
    } else {
        var e = a.fn.remove;
        a.fn.remove = function(h, g) {
            return this.each(function() {
                if (!g) if (!h || a.filter(h, [ this ]).length) a("*", this).add([ this ]).each(function() {
                    try {
                        a(this).triggerHandler("remove");
                    } catch (i) {}
                });
                return e.call(a(this), h, g);
            });
        };
    }
    a.widget = function(h, g, i) {
        var b = h.split(".")[0], f;
        h = h.split(".")[1];
        f = b + "-" + h;
        if (!i) {
            i = g;
            g = a.Widget;
        }
        a.expr[":"][f] = function(j) {
            return !!a.data(j, h);
        };
        a[b] = a[b] || {};
        a[b][h] = function(j, l) {
            arguments.length && this._createWidget(j, l);
        };
        g = new g();
        g.options = a.extend(true, {}, g.options);
        a[b][h].prototype = a.extend(true, g, {
            namespace: b,
            widgetName: h,
            widgetEventPrefix: a[b][h].prototype.widgetEventPrefix || h,
            widgetBaseClass: f
        }, i);
        a.widget.bridge(h, a[b][h]);
    };
    a.widget.bridge = function(h, g) {
        a.fn[h] = function(i) {
            var b = typeof i === "string", f = Array.prototype.slice.call(arguments, 1), j = this;
            i = !b && f.length ? a.extend.apply(null, [ true, i ].concat(f)) : i;
            if (b && i.charAt(0) === "_") return j;
            b ? this.each(function() {
                var l = a.data(this, h), o = l && a.isFunction(l[i]) ? l[i].apply(l, f) : l;
                if (o !== l && o !== d) {
                    j = o;
                    return false;
                }
            }) : this.each(function() {
                var l = a.data(this, h);
                l ? l.option(i || {})._init() : a.data(this, h, new g(i, this));
            });
            return j;
        };
    };
    a.Widget = function(h, g) {
        arguments.length && this._createWidget(h, g);
    };
    a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function(h, g) {
            a.data(g, this.widgetName, this);
            this.element = a(g);
            this.options = a.extend(true, {}, this.options, this._getCreateOptions(), h);
            var i = this;
            this.element.bind("remove." + this.widgetName, function() {
                i.destroy();
            });
            this._create();
            this._trigger("create");
            this._init();
        },
        _getCreateOptions: function() {
            return a.metadata && a.metadata.get(this.element[0])[this.widgetName];
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled");
        },
        widget: function() {
            return this.element;
        },
        option: function(h, g) {
            var i = h;
            if (arguments.length === 0) return a.extend({}, this.options);
            if (typeof h === "string") {
                if (g === d) return this.options[h];
                i = {};
                i[h] = g;
            }
            this._setOptions(i);
            return this;
        },
        _setOptions: function(h) {
            var g = this;
            a.each(h, function(i, b) {
                g._setOption(i, b);
            });
            return this;
        },
        _setOption: function(h, g) {
            this.options[h] = g;
            if (h === "disabled") this.widget()[g ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", g);
            return this;
        },
        enable: function() {
            return this._setOption("disabled", false);
        },
        disable: function() {
            return this._setOption("disabled", true);
        },
        _trigger: function(h, g, i) {
            var b = this.options[h];
            g = a.Event(g);
            g.type = (h === this.widgetEventPrefix ? h : this.widgetEventPrefix + h).toLowerCase();
            i = i || {};
            if (g.originalEvent) {
                h = a.event.props.length;
                for (var f; h; ) {
                    f = a.event.props[--h];
                    g[f] = g.originalEvent[f];
                }
            }
            this.element.trigger(g, i);
            return !(a.isFunction(b) && b.call(this.element[0], g, i) === false || g.isDefaultPrevented());
        }
    };
})(jQuery);

(function(a) {
    var d = false;
    a(document).mouseup(function() {
        d = false;
    });
    a.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var c = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return c._mouseDown(e);
            }).bind("click." + this.widgetName, function(e) {
                if (true === a.data(e.target, c.widgetName + ".preventClickEvent")) {
                    a.removeData(e.target, c.widgetName + ".preventClickEvent");
                    e.stopImmediatePropagation();
                    return false;
                }
            });
            this.started = false;
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
        },
        _mouseDown: function(c) {
            if (!d) {
                this._mouseStarted && this._mouseUp(c);
                this._mouseDownEvent = c;
                var e = this, h = c.which == 1, g = typeof this.options.cancel == "string" && c.target.nodeName ? a(c.target).closest(this.options.cancel).length : false;
                if (!h || g || !this._mouseCapture(c)) return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) this._mouseDelayTimer = setTimeout(function() {
                    e.mouseDelayMet = true;
                }, this.options.delay);
                if (this._mouseDistanceMet(c) && this._mouseDelayMet(c)) {
                    this._mouseStarted = this._mouseStart(c) !== false;
                    if (!this._mouseStarted) {
                        c.preventDefault();
                        return true;
                    }
                }
                true === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function(i) {
                    return e._mouseMove(i);
                };
                this._mouseUpDelegate = function(i) {
                    return e._mouseUp(i);
                };
                a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                c.preventDefault();
                return d = true;
            }
        },
        _mouseMove: function(c) {
            if (a.browser.msie && !(document.documentMode >= 9) && !c.button) return this._mouseUp(c);
            if (this._mouseStarted) {
                this._mouseDrag(c);
                return c.preventDefault();
            }
            if (this._mouseDistanceMet(c) && this._mouseDelayMet(c)) (this._mouseStarted = this._mouseStart(this._mouseDownEvent, c) !== false) ? this._mouseDrag(c) : this._mouseUp(c);
            return !this._mouseStarted;
        },
        _mouseUp: function(c) {
            a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                c.target == this._mouseDownEvent.target && a.data(c.target, this.widgetName + ".preventClickEvent", true);
                this._mouseStop(c);
            }
            return false;
        },
        _mouseDistanceMet: function(c) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - c.pageX), Math.abs(this._mouseDownEvent.pageY - c.pageY)) >= this.options.distance;
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true;
        }
    });
})(jQuery);

(function(a) {
    a.widget("ui.draggable", a.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function() {
            if (this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position"))) this.element[0].style.position = "relative";
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit();
        },
        destroy: function() {
            if (this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this;
            }
        },
        _mouseCapture: function(d) {
            var c = this.options;
            if (this.helper || c.disabled || a(d.target).is(".ui-resizable-handle")) return false;
            this.handle = this._getHandle(d);
            if (!this.handle) return false;
            if (c.iframeFix) a(c.iframeFix === true ? "iframe" : c.iframeFix).each(function() {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(a(this).offset()).appendTo("body");
            });
            return true;
        },
        _mouseStart: function(d) {
            var c = this.options;
            this.helper = this._createHelper(d);
            this._cacheHelperProportions();
            if (a.ui.ddmanager) a.ui.ddmanager.current = this;
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            a.extend(this.offset, {
                click: {
                    left: d.pageX - this.offset.left,
                    top: d.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(d);
            this.originalPageX = d.pageX;
            this.originalPageY = d.pageY;
            c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt);
            c.containment && this._setContainment();
            if (this._trigger("start", d) === false) {
                this._clear();
                return false;
            }
            this._cacheHelperProportions();
            a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, d);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(d, true);
            a.ui.ddmanager && a.ui.ddmanager.dragStart(this, d);
            return true;
        },
        _mouseDrag: function(d, c) {
            this.position = this._generatePosition(d);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!c) {
                c = this._uiHash();
                if (this._trigger("drag", d, c) === false) {
                    this._mouseUp({});
                    return false;
                }
                this.position = c.position;
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            a.ui.ddmanager && a.ui.ddmanager.drag(this, d);
            return false;
        },
        _mouseStop: function(d) {
            var c = false;
            if (a.ui.ddmanager && !this.options.dropBehaviour) c = a.ui.ddmanager.drop(this, d);
            if (this.dropped) {
                c = this.dropped;
                this.dropped = false;
            }
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return false;
            if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === true || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
                var e = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    e._trigger("stop", d) !== false && e._clear();
                });
            } else this._trigger("stop", d) !== false && this._clear();
            return false;
        },
        _mouseUp: function(d) {
            this.options.iframeFix === true && a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this);
            });
            a.ui.ddmanager && a.ui.ddmanager.dragStop(this, d);
            return a.ui.mouse.prototype._mouseUp.call(this, d);
        },
        cancel: function() {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this;
        },
        _getHandle: function(d) {
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
            a(this.options.handle, this.element).find("*").andSelf().each(function() {
                if (this == d.target) c = true;
            });
            return c;
        },
        _createHelper: function(d) {
            var c = this.options;
            d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [ d ])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode : c.appendTo);
            d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute");
            return d;
        },
        _adjustOffsetFromHelper: function(d) {
            if (typeof d == "string") d = d.split(" ");
            if (a.isArray(d)) d = {
                left: +d[0],
                top: +d[1] || 0
            };
            if ("left" in d) this.offset.click.left = d.left + this.margins.left;
            if ("right" in d) this.offset.click.left = this.helperProportions.width - d.right + this.margins.left;
            if ("top" in d) this.offset.click.top = d.top + this.margins.top;
            if ("bottom" in d) this.offset.click.top = this.helperProportions.height - d.bottom + this.margins.top;
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var d = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                d.left += this.scrollParent.scrollLeft();
                d.top += this.scrollParent.scrollTop();
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) d = {
                top: 0,
                left: 0
            };
            return {
                top: d.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: d.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var d = this.element.position();
                return {
                    top: d.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: d.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                };
            } else return {
                top: 0,
                left: 0
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var d = this.options;
            if (d.containment == "parent") d.containment = this.helper[0].parentNode;
            if (d.containment == "document" || d.containment == "window") this.containment = [ d.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, d.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (d.containment == "document" ? 0 : a(window).scrollLeft()) + a(d.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (d.containment == "document" ? 0 : a(window).scrollTop()) + (a(d.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ];
            if (!/^(document|window|parent)$/.test(d.containment) && d.containment.constructor != Array) {
                d = a(d.containment);
                var c = d[0];
                if (c) {
                    d.offset();
                    var e = a(c).css("overflow") != "hidden";
                    this.containment = [ (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0), (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0), (e ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ];
                    this.relative_container = d;
                }
            } else if (d.containment.constructor == Array) this.containment = d.containment;
        },
        _convertPositionTo: function(d, c) {
            if (!c) c = this.position;
            d = d == "absolute" ? 1 : -1;
            var e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, h = /(html|body)/i.test(e[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : h ? 0 : e.scrollTop()) * d),
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : h ? 0 : e.scrollLeft()) * d)
            };
        },
        _generatePosition: function(d) {
            var c = this.options, e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, h = /(html|body)/i.test(e[0].tagName), g = d.pageX, i = d.pageY;
            if (this.originalPosition) {
                var b;
                if (this.containment) {
                    if (this.relative_container) {
                        b = this.relative_container.offset();
                        b = [ this.containment[0] + b.left, this.containment[1] + b.top, this.containment[2] + b.left, this.containment[3] + b.top ];
                    } else b = this.containment;
                    if (d.pageX - this.offset.click.left < b[0]) g = b[0] + this.offset.click.left;
                    if (d.pageY - this.offset.click.top < b[1]) i = b[1] + this.offset.click.top;
                    if (d.pageX - this.offset.click.left > b[2]) g = b[2] + this.offset.click.left;
                    if (d.pageY - this.offset.click.top > b[3]) i = b[3] + this.offset.click.top;
                }
                if (c.grid) {
                    i = c.grid[1] ? this.originalPageY + Math.round((i - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
                    i = b ? !(i - this.offset.click.top < b[1] || i - this.offset.click.top > b[3]) ? i : !(i - this.offset.click.top < b[1]) ? i - c.grid[1] : i + c.grid[1] : i;
                    g = c.grid[0] ? this.originalPageX + Math.round((g - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
                    g = b ? !(g - this.offset.click.left < b[0] || g - this.offset.click.left > b[2]) ? g : !(g - this.offset.click.left < b[0]) ? g - c.grid[0] : g + c.grid[0] : g;
                }
            }
            return {
                top: i - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : h ? 0 : e.scrollTop()),
                left: g - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : h ? 0 : e.scrollLeft())
            };
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false;
        },
        _trigger: function(d, c, e) {
            e = e || this._uiHash();
            a.ui.plugin.call(this, d, [ c, e ]);
            if (d == "drag") this.positionAbs = this._convertPositionTo("absolute");
            return a.Widget.prototype._trigger.call(this, d, c, e);
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            };
        }
    });
    a.extend(a.ui.draggable, {
        version: "1.8.16"
    });
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function(d, c) {
            var e = a(this).data("draggable"), h = e.options, g = a.extend({}, c, {
                item: e.element
            });
            e.sortables = [];
            a(h.connectToSortable).each(function() {
                var i = a.data(this, "sortable");
                if (i && !i.options.disabled) {
                    e.sortables.push({
                        instance: i,
                        shouldRevert: i.options.revert
                    });
                    i.refreshPositions();
                    i._trigger("activate", d, g);
                }
            });
        },
        stop: function(d, c) {
            var e = a(this).data("draggable"), h = a.extend({}, c, {
                item: e.element
            });
            a.each(e.sortables, function() {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    e.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) this.instance.options.revert = true;
                    this.instance._mouseStop(d);
                    this.instance.options.helper = this.instance.options._helper;
                    e.options.helper == "original" && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    });
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", d, h);
                }
            });
        },
        drag: function(d, c) {
            var e = a(this).data("draggable"), h = this;
            a.each(e.sortables, function() {
                this.instance.positionAbs = e.positionAbs;
                this.instance.helperProportions = e.helperProportions;
                this.instance.offset.click = e.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = a(h).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function() {
                            return c.helper[0];
                        };
                        d.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(d, true);
                        this.instance._mouseStart(d, true, true);
                        this.instance.offset.click.top = e.offset.click.top;
                        this.instance.offset.click.left = e.offset.click.left;
                        this.instance.offset.parent.left -= e.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= e.offset.parent.top - this.instance.offset.parent.top;
                        e._trigger("toSortable", d);
                        e.dropped = this.instance.element;
                        e.currentItem = e.element;
                        this.instance.fromOutside = e;
                    }
                    this.instance.currentItem && this.instance._mouseDrag(d);
                } else if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    this.instance.cancelHelperRemoval = true;
                    this.instance.options.revert = false;
                    this.instance._trigger("out", d, this.instance._uiHash(this.instance));
                    this.instance._mouseStop(d, true);
                    this.instance.options.helper = this.instance.options._helper;
                    this.instance.currentItem.remove();
                    this.instance.placeholder && this.instance.placeholder.remove();
                    e._trigger("fromSortable", d);
                    e.dropped = false;
                }
            });
        }
    });
    a.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var d = a("body"), c = a(this).data("draggable").options;
            if (d.css("cursor")) c._cursor = d.css("cursor");
            d.css("cursor", c.cursor);
        },
        stop: function() {
            var d = a(this).data("draggable").options;
            d._cursor && a("body").css("cursor", d._cursor);
        }
    });
    a.ui.plugin.add("draggable", "opacity", {
        start: function(d, c) {
            d = a(c.helper);
            c = a(this).data("draggable").options;
            if (d.css("opacity")) c._opacity = d.css("opacity");
            d.css("opacity", c.opacity);
        },
        stop: function(d, c) {
            d = a(this).data("draggable").options;
            d._opacity && a(c.helper).css("opacity", d._opacity);
        }
    });
    a.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var d = a(this).data("draggable");
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") d.overflowOffset = d.scrollParent.offset();
        },
        drag: function(d) {
            var c = a(this).data("draggable"), e = c.options, h = false;
            if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") {
                if (!e.axis || e.axis != "x") if (c.overflowOffset.top + c.scrollParent[0].offsetHeight - d.pageY < e.scrollSensitivity) c.scrollParent[0].scrollTop = h = c.scrollParent[0].scrollTop + e.scrollSpeed; else if (d.pageY - c.overflowOffset.top < e.scrollSensitivity) c.scrollParent[0].scrollTop = h = c.scrollParent[0].scrollTop - e.scrollSpeed;
                if (!e.axis || e.axis != "y") if (c.overflowOffset.left + c.scrollParent[0].offsetWidth - d.pageX < e.scrollSensitivity) c.scrollParent[0].scrollLeft = h = c.scrollParent[0].scrollLeft + e.scrollSpeed; else if (d.pageX - c.overflowOffset.left < e.scrollSensitivity) c.scrollParent[0].scrollLeft = h = c.scrollParent[0].scrollLeft - e.scrollSpeed;
            } else {
                if (!e.axis || e.axis != "x") if (d.pageY - a(document).scrollTop() < e.scrollSensitivity) h = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed); else if (a(window).height() - (d.pageY - a(document).scrollTop()) < e.scrollSensitivity) h = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed);
                if (!e.axis || e.axis != "y") if (d.pageX - a(document).scrollLeft() < e.scrollSensitivity) h = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed); else if (a(window).width() - (d.pageX - a(document).scrollLeft()) < e.scrollSensitivity) h = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed);
            }
            h !== false && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(c, d);
        }
    });
    a.ui.plugin.add("draggable", "snap", {
        start: function() {
            var d = a(this).data("draggable"), c = d.options;
            d.snapElements = [];
            a(c.snap.constructor != String ? c.snap.items || ":data(draggable)" : c.snap).each(function() {
                var e = a(this), h = e.offset();
                this != d.element[0] && d.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: h.top,
                    left: h.left
                });
            });
        },
        drag: function(d, c) {
            for (var e = a(this).data("draggable"), h = e.options, g = h.snapTolerance, i = c.offset.left, b = i + e.helperProportions.width, f = c.offset.top, j = f + e.helperProportions.height, l = e.snapElements.length - 1; l >= 0; l--) {
                var o = e.snapElements[l].left, n = o + e.snapElements[l].width, k = e.snapElements[l].top, m = k + e.snapElements[l].height;
                if (o - g < i && i < n + g && k - g < f && f < m + g || o - g < i && i < n + g && k - g < j && j < m + g || o - g < b && b < n + g && k - g < f && f < m + g || o - g < b && b < n + g && k - g < j && j < m + g) {
                    if (h.snapMode != "inner") {
                        var p = Math.abs(k - j) <= g, q = Math.abs(m - f) <= g, s = Math.abs(o - b) <= g, r = Math.abs(n - i) <= g;
                        if (p) c.position.top = e._convertPositionTo("relative", {
                            top: k - e.helperProportions.height,
                            left: 0
                        }).top - e.margins.top;
                        if (q) c.position.top = e._convertPositionTo("relative", {
                            top: m,
                            left: 0
                        }).top - e.margins.top;
                        if (s) c.position.left = e._convertPositionTo("relative", {
                            top: 0,
                            left: o - e.helperProportions.width
                        }).left - e.margins.left;
                        if (r) c.position.left = e._convertPositionTo("relative", {
                            top: 0,
                            left: n
                        }).left - e.margins.left;
                    }
                    var u = p || q || s || r;
                    if (h.snapMode != "outer") {
                        p = Math.abs(k - f) <= g;
                        q = Math.abs(m - j) <= g;
                        s = Math.abs(o - i) <= g;
                        r = Math.abs(n - b) <= g;
                        if (p) c.position.top = e._convertPositionTo("relative", {
                            top: k,
                            left: 0
                        }).top - e.margins.top;
                        if (q) c.position.top = e._convertPositionTo("relative", {
                            top: m - e.helperProportions.height,
                            left: 0
                        }).top - e.margins.top;
                        if (s) c.position.left = e._convertPositionTo("relative", {
                            top: 0,
                            left: o
                        }).left - e.margins.left;
                        if (r) c.position.left = e._convertPositionTo("relative", {
                            top: 0,
                            left: n - e.helperProportions.width
                        }).left - e.margins.left;
                    }
                    if (!e.snapElements[l].snapping && (p || q || s || r || u)) e.options.snap.snap && e.options.snap.snap.call(e.element, d, a.extend(e._uiHash(), {
                        snapItem: e.snapElements[l].item
                    }));
                    e.snapElements[l].snapping = p || q || s || r || u;
                } else {
                    e.snapElements[l].snapping && e.options.snap.release && e.options.snap.release.call(e.element, d, a.extend(e._uiHash(), {
                        snapItem: e.snapElements[l].item
                    }));
                    e.snapElements[l].snapping = false;
                }
            }
        }
    });
    a.ui.plugin.add("draggable", "stack", {
        start: function() {
            var d = a(this).data("draggable").options;
            d = a.makeArray(a(d.stack)).sort(function(e, h) {
                return (parseInt(a(e).css("zIndex"), 10) || 0) - (parseInt(a(h).css("zIndex"), 10) || 0);
            });
            if (d.length) {
                var c = parseInt(d[0].style.zIndex) || 0;
                a(d).each(function(e) {
                    this.style.zIndex = c + e;
                });
                this[0].style.zIndex = c + d.length;
            }
        }
    });
    a.ui.plugin.add("draggable", "zIndex", {
        start: function(d, c) {
            d = a(c.helper);
            c = a(this).data("draggable").options;
            if (d.css("zIndex")) c._zIndex = d.css("zIndex");
            d.css("zIndex", c.zIndex);
        },
        stop: function(d, c) {
            d = a(this).data("draggable").options;
            d._zIndex && a(c.helper).css("zIndex", d._zIndex);
        }
    });
})(jQuery);

(function(a) {
    a.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function() {
            var d = this.options, c = d.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = a.isFunction(c) ? c : function(e) {
                return e.is(c);
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            a.ui.ddmanager.droppables[d.scope] = a.ui.ddmanager.droppables[d.scope] || [];
            a.ui.ddmanager.droppables[d.scope].push(this);
            d.addClasses && this.element.addClass("ui-droppable");
        },
        destroy: function() {
            for (var d = a.ui.ddmanager.droppables[this.options.scope], c = 0; c < d.length; c++) d[c] == this && d.splice(c, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this;
        },
        _setOption: function(d, c) {
            if (d == "accept") this.accept = a.isFunction(c) ? c : function(e) {
                return e.is(c);
            };
            a.Widget.prototype._setOption.apply(this, arguments);
        },
        _activate: function(d) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass);
            c && this._trigger("activate", d, this.ui(c));
        },
        _deactivate: function(d) {
            var c = a.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass);
            c && this._trigger("deactivate", d, this.ui(c));
        },
        _over: function(d) {
            var c = a.ui.ddmanager.current;
            if (!(!c || (c.currentItem || c.element)[0] == this.element[0])) if (this.accept.call(this.element[0], c.currentItem || c.element)) {
                this.options.hoverClass && this.element.addClass(this.options.hoverClass);
                this._trigger("over", d, this.ui(c));
            }
        },
        _out: function(d) {
            var c = a.ui.ddmanager.current;
            if (!(!c || (c.currentItem || c.element)[0] == this.element[0])) if (this.accept.call(this.element[0], c.currentItem || c.element)) {
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("out", d, this.ui(c));
            }
        },
        _drop: function(d, c) {
            var e = c || a.ui.ddmanager.current;
            if (!e || (e.currentItem || e.element)[0] == this.element[0]) return false;
            var h = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var g = a.data(this, "droppable");
                if (g.options.greedy && !g.options.disabled && g.options.scope == e.options.scope && g.accept.call(g.element[0], e.currentItem || e.element) && a.ui.intersect(e, a.extend(g, {
                    offset: g.element.offset()
                }), g.options.tolerance)) {
                    h = true;
                    return false;
                }
            });
            if (h) return false;
            if (this.accept.call(this.element[0], e.currentItem || e.element)) {
                this.options.activeClass && this.element.removeClass(this.options.activeClass);
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("drop", d, this.ui(e));
                return this.element;
            }
            return false;
        },
        ui: function(d) {
            return {
                draggable: d.currentItem || d.element,
                helper: d.helper,
                position: d.position,
                offset: d.positionAbs
            };
        }
    });
    a.extend(a.ui.droppable, {
        version: "1.8.16"
    });
    a.ui.intersect = function(d, c, e) {
        if (!c.offset) return false;
        var h = (d.positionAbs || d.position.absolute).left, g = h + d.helperProportions.width, i = (d.positionAbs || d.position.absolute).top, b = i + d.helperProportions.height, f = c.offset.left, j = f + c.proportions.width, l = c.offset.top, o = l + c.proportions.height;
        switch (e) {
          case "fit":
            return f <= h && g <= j && l <= i && b <= o;

          case "intersect":
            return f < h + d.helperProportions.width / 2 && g - d.helperProportions.width / 2 < j && l < i + d.helperProportions.height / 2 && b - d.helperProportions.height / 2 < o;

          case "pointer":
            return a.ui.isOver((d.positionAbs || d.position.absolute).top + (d.clickOffset || d.offset.click).top, (d.positionAbs || d.position.absolute).left + (d.clickOffset || d.offset.click).left, l, f, c.proportions.height, c.proportions.width);

          case "touch":
            return (i >= l && i <= o || b >= l && b <= o || i < l && b > o) && (h >= f && h <= j || g >= f && g <= j || h < f && g > j);

          default:
            return false;
        }
    };
    a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(d, c) {
            var e = a.ui.ddmanager.droppables[d.options.scope] || [], h = c ? c.type : null, g = (d.currentItem || d.element).find(":data(droppable)").andSelf(), i = 0;
            a: for (;i < e.length; i++) if (!(e[i].options.disabled || d && !e[i].accept.call(e[i].element[0], d.currentItem || d.element))) {
                for (var b = 0; b < g.length; b++) if (g[b] == e[i].element[0]) {
                    e[i].proportions.height = 0;
                    continue a;
                }
                e[i].visible = e[i].element.css("display") != "none";
                if (e[i].visible) {
                    h == "mousedown" && e[i]._activate.call(e[i], c);
                    e[i].offset = e[i].element.offset();
                    e[i].proportions = {
                        width: e[i].element[0].offsetWidth,
                        height: e[i].element[0].offsetHeight
                    };
                }
            }
        },
        drop: function(d, c) {
            var e = false;
            a.each(a.ui.ddmanager.droppables[d.options.scope] || [], function() {
                if (this.options) {
                    if (!this.options.disabled && this.visible && a.ui.intersect(d, this, this.options.tolerance)) e = e || this._drop.call(this, c);
                    if (!this.options.disabled && this.visible && this.accept.call(this.element[0], d.currentItem || d.element)) {
                        this.isout = 1;
                        this.isover = 0;
                        this._deactivate.call(this, c);
                    }
                }
            });
            return e;
        },
        dragStart: function(d, c) {
            d.element.parents(":not(body,html)").bind("scroll.droppable", function() {
                d.options.refreshPositions || a.ui.ddmanager.prepareOffsets(d, c);
            });
        },
        drag: function(d, c) {
            d.options.refreshPositions && a.ui.ddmanager.prepareOffsets(d, c);
            a.each(a.ui.ddmanager.droppables[d.options.scope] || [], function() {
                if (!(this.options.disabled || this.greedyChild || !this.visible)) {
                    var e = a.ui.intersect(d, this, this.options.tolerance);
                    if (e = !e && this.isover == 1 ? "isout" : e && this.isover == 0 ? "isover" : null) {
                        var h;
                        if (this.options.greedy) {
                            var g = this.element.parents(":data(droppable):eq(0)");
                            if (g.length) {
                                h = a.data(g[0], "droppable");
                                h.greedyChild = e == "isover" ? 1 : 0;
                            }
                        }
                        if (h && e == "isover") {
                            h.isover = 0;
                            h.isout = 1;
                            h._out.call(h, c);
                        }
                        this[e] = 1;
                        this[e == "isout" ? "isover" : "isout"] = 0;
                        this[e == "isover" ? "_over" : "_out"].call(this, c);
                        if (h && e == "isout") {
                            h.isout = 0;
                            h.isover = 1;
                            h._over.call(h, c);
                        }
                    }
                }
            });
        },
        dragStop: function(d, c) {
            d.element.parents(":not(body,html)").unbind("scroll.droppable");
            d.options.refreshPositions || a.ui.ddmanager.prepareOffsets(d, c);
        }
    };
})(jQuery);

(function(a) {
    a.widget("ui.resizable", a.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1e3
        },
        _create: function() {
            var e = this, h = this.options;
            this.element.addClass("ui-resizable");
            a.extend(this, {
                _aspectRatio: !!h.aspectRatio,
                aspectRatio: h.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: h.helper || h.ghost || h.animate ? h.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                /relative/.test(this.element.css("position")) && a.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                });
                this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize();
            }
            this.handles = h.handles || (!a(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor == String) {
                if (this.handles == "all") this.handles = "n,e,s,w,se,sw,ne,nw";
                var g = this.handles.split(",");
                this.handles = {};
                for (var i = 0; i < g.length; i++) {
                    var b = a.trim(g[i]), f = a('<div class="ui-resizable-handle ' + ("ui-resizable-" + b) + '"></div>');
                    /sw|se|ne|nw/.test(b) && f.css({
                        zIndex: ++h.zIndex
                    });
                    "se" == b && f.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    this.handles[b] = ".ui-resizable-" + b;
                    this.element.append(f);
                }
            }
            this._renderAxis = function(j) {
                j = j || this.element;
                for (var l in this.handles) {
                    if (this.handles[l].constructor == String) this.handles[l] = a(this.handles[l], this.element).show();
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var o = a(this.handles[l], this.element), n = 0;
                        n = /sw|ne|nw|se|n|s/.test(l) ? o.outerHeight() : o.outerWidth();
                        o = [ "padding", /ne|nw|n/.test(l) ? "Top" : /se|sw|s/.test(l) ? "Bottom" : /^e$/.test(l) ? "Right" : "Left" ].join("");
                        j.css(o, n);
                        this._proportionallyResize();
                    }
                    a(this.handles[l]);
                }
            };
            this._renderAxis(this.element);
            this._handles = a(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                if (!e.resizing) {
                    if (this.className) var j = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    e.axis = j && j[1] ? j[1] : "se";
                }
            });
            if (h.autoHide) {
                this._handles.hide();
                a(this.element).addClass("ui-resizable-autohide").hover(function() {
                    if (!h.disabled) {
                        a(this).removeClass("ui-resizable-autohide");
                        e._handles.show();
                    }
                }, function() {
                    if (!h.disabled) if (!e.resizing) {
                        a(this).addClass("ui-resizable-autohide");
                        e._handles.hide();
                    }
                });
            }
            this._mouseInit();
        },
        destroy: function() {
            this._mouseDestroy();
            var e = function(g) {
                a(g).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
            };
            if (this.elementIsWrapper) {
                e(this.element);
                var h = this.element;
                h.after(this.originalElement.css({
                    position: h.css("position"),
                    width: h.outerWidth(),
                    height: h.outerHeight(),
                    top: h.css("top"),
                    left: h.css("left")
                })).remove();
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            e(this.originalElement);
            return this;
        },
        _mouseCapture: function(e) {
            var h = false;
            for (var g in this.handles) if (a(this.handles[g])[0] == e.target) h = true;
            return !this.options.disabled && h;
        },
        _mouseStart: function(e) {
            var h = this.options, g = this.element.position(), i = this.element;
            this.resizing = true;
            this.documentScroll = {
                top: a(document).scrollTop(),
                left: a(document).scrollLeft()
            };
            if (i.is(".ui-draggable") || /absolute/.test(i.css("position"))) i.css({
                position: "absolute",
                top: g.top,
                left: g.left
            });
            a.browser.opera && /relative/.test(i.css("position")) && i.css({
                position: "relative",
                top: "auto",
                left: "auto"
            });
            this._renderProxy();
            g = d(this.helper.css("left"));
            var b = d(this.helper.css("top"));
            if (h.containment) {
                g += a(h.containment).scrollLeft() || 0;
                b += a(h.containment).scrollTop() || 0;
            }
            this.offset = this.helper.offset();
            this.position = {
                left: g,
                top: b
            };
            this.size = this._helper ? {
                width: i.outerWidth(),
                height: i.outerHeight()
            } : {
                width: i.width(),
                height: i.height()
            };
            this.originalSize = this._helper ? {
                width: i.outerWidth(),
                height: i.outerHeight()
            } : {
                width: i.width(),
                height: i.height()
            };
            this.originalPosition = {
                left: g,
                top: b
            };
            this.sizeDiff = {
                width: i.outerWidth() - i.width(),
                height: i.outerHeight() - i.height()
            };
            this.originalMousePosition = {
                left: e.pageX,
                top: e.pageY
            };
            this.aspectRatio = typeof h.aspectRatio == "number" ? h.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            h = a(".ui-resizable-" + this.axis).css("cursor");
            a("body").css("cursor", h == "auto" ? this.axis + "-resize" : h);
            i.addClass("ui-resizable-resizing");
            this._propagate("start", e);
            return true;
        },
        _mouseDrag: function(e) {
            var h = this.helper, g = this.originalMousePosition, i = this._change[this.axis];
            if (!i) return false;
            g = i.apply(this, [ e, e.pageX - g.left || 0, e.pageY - g.top || 0 ]);
            this._updateVirtualBoundaries(e.shiftKey);
            if (this._aspectRatio || e.shiftKey) g = this._updateRatio(g, e);
            g = this._respectSize(g, e);
            this._propagate("resize", e);
            h.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            this._updateCache(g);
            this._trigger("resize", e, this.ui());
            return false;
        },
        _mouseStop: function(e) {
            this.resizing = false;
            var h = this.options, g = this;
            if (this._helper) {
                var i = this._proportionallyResizeElements, b = i.length && /textarea/i.test(i[0].nodeName);
                i = b && a.ui.hasScroll(i[0], "left") ? 0 : g.sizeDiff.height;
                b = b ? 0 : g.sizeDiff.width;
                b = {
                    width: g.helper.width() - b,
                    height: g.helper.height() - i
                };
                i = parseInt(g.element.css("left"), 10) + (g.position.left - g.originalPosition.left) || null;
                var f = parseInt(g.element.css("top"), 10) + (g.position.top - g.originalPosition.top) || null;
                h.animate || this.element.css(a.extend(b, {
                    top: f,
                    left: i
                }));
                g.helper.height(g.size.height);
                g.helper.width(g.size.width);
                this._helper && !h.animate && this._proportionallyResize();
            }
            a("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", e);
            this._helper && this.helper.remove();
            return false;
        },
        _updateVirtualBoundaries: function(e) {
            var h = this.options, g, i, b;
            h = {
                minWidth: c(h.minWidth) ? h.minWidth : 0,
                maxWidth: c(h.maxWidth) ? h.maxWidth : Infinity,
                minHeight: c(h.minHeight) ? h.minHeight : 0,
                maxHeight: c(h.maxHeight) ? h.maxHeight : Infinity
            };
            if (this._aspectRatio || e) {
                e = h.minHeight * this.aspectRatio;
                i = h.minWidth / this.aspectRatio;
                g = h.maxHeight * this.aspectRatio;
                b = h.maxWidth / this.aspectRatio;
                if (e > h.minWidth) h.minWidth = e;
                if (i > h.minHeight) h.minHeight = i;
                if (g < h.maxWidth) h.maxWidth = g;
                if (b < h.maxHeight) h.maxHeight = b;
            }
            this._vBoundaries = h;
        },
        _updateCache: function(e) {
            this.offset = this.helper.offset();
            if (c(e.left)) this.position.left = e.left;
            if (c(e.top)) this.position.top = e.top;
            if (c(e.height)) this.size.height = e.height;
            if (c(e.width)) this.size.width = e.width;
        },
        _updateRatio: function(e) {
            var h = this.position, g = this.size, i = this.axis;
            if (c(e.height)) e.width = e.height * this.aspectRatio; else if (c(e.width)) e.height = e.width / this.aspectRatio;
            if (i == "sw") {
                e.left = h.left + (g.width - e.width);
                e.top = null;
            }
            if (i == "nw") {
                e.top = h.top + (g.height - e.height);
                e.left = h.left + (g.width - e.width);
            }
            return e;
        },
        _respectSize: function(e) {
            var h = this._vBoundaries, g = this.axis, i = c(e.width) && h.maxWidth && h.maxWidth < e.width, b = c(e.height) && h.maxHeight && h.maxHeight < e.height, f = c(e.width) && h.minWidth && h.minWidth > e.width, j = c(e.height) && h.minHeight && h.minHeight > e.height;
            if (f) e.width = h.minWidth;
            if (j) e.height = h.minHeight;
            if (i) e.width = h.maxWidth;
            if (b) e.height = h.maxHeight;
            var l = this.originalPosition.left + this.originalSize.width, o = this.position.top + this.size.height, n = /sw|nw|w/.test(g);
            g = /nw|ne|n/.test(g);
            if (f && n) e.left = l - h.minWidth;
            if (i && n) e.left = l - h.maxWidth;
            if (j && g) e.top = o - h.minHeight;
            if (b && g) e.top = o - h.maxHeight;
            if ((h = !e.width && !e.height) && !e.left && e.top) e.top = null; else if (h && !e.top && e.left) e.left = null;
            return e;
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) for (var e = this.helper || this.element, h = 0; h < this._proportionallyResizeElements.length; h++) {
                var g = this._proportionallyResizeElements[h];
                if (!this.borderDif) {
                    var i = [ g.css("borderTopWidth"), g.css("borderRightWidth"), g.css("borderBottomWidth"), g.css("borderLeftWidth") ], b = [ g.css("paddingTop"), g.css("paddingRight"), g.css("paddingBottom"), g.css("paddingLeft") ];
                    this.borderDif = a.map(i, function(f, j) {
                        f = parseInt(f, 10) || 0;
                        j = parseInt(b[j], 10) || 0;
                        return f + j;
                    });
                }
                a.browser.msie && (a(e).is(":hidden") || a(e).parents(":hidden").length) || g.css({
                    height: e.height() - this.borderDif[0] - this.borderDif[2] || 0,
                    width: e.width() - this.borderDif[1] - this.borderDif[3] || 0
                });
            }
        },
        _renderProxy: function() {
            var e = this.options;
            this.elementOffset = this.element.offset();
            if (this._helper) {
                this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
                var h = a.browser.msie && a.browser.version < 7, g = h ? 1 : 0;
                h = h ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + h,
                    height: this.element.outerHeight() + h,
                    position: "absolute",
                    left: this.elementOffset.left - g + "px",
                    top: this.elementOffset.top - g + "px",
                    zIndex: ++e.zIndex
                });
                this.helper.appendTo("body").disableSelection();
            } else this.helper = this.element;
        },
        _change: {
            e: function(e, h) {
                return {
                    width: this.originalSize.width + h
                };
            },
            w: function(e, h) {
                return {
                    left: this.originalPosition.left + h,
                    width: this.originalSize.width - h
                };
            },
            n: function(e, h, g) {
                return {
                    top: this.originalPosition.top + g,
                    height: this.originalSize.height - g
                };
            },
            s: function(e, h, g) {
                return {
                    height: this.originalSize.height + g
                };
            },
            se: function(e, h, g) {
                return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [ e, h, g ]));
            },
            sw: function(e, h, g) {
                return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [ e, h, g ]));
            },
            ne: function(e, h, g) {
                return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [ e, h, g ]));
            },
            nw: function(e, h, g) {
                return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [ e, h, g ]));
            }
        },
        _propagate: function(e, h) {
            a.ui.plugin.call(this, e, [ h, this.ui() ]);
            e != "resize" && this._trigger(e, h, this.ui());
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            };
        }
    });
    a.extend(a.ui.resizable, {
        version: "1.8.16"
    });
    a.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var e = a(this).data("resizable").options, h = function(g) {
                a(g).each(function() {
                    var i = a(this);
                    i.data("resizable-alsoresize", {
                        width: parseInt(i.width(), 10),
                        height: parseInt(i.height(), 10),
                        left: parseInt(i.css("left"), 10),
                        top: parseInt(i.css("top"), 10),
                        position: i.css("position")
                    });
                });
            };
            if (typeof e.alsoResize == "object" && !e.alsoResize.parentNode) if (e.alsoResize.length) {
                e.alsoResize = e.alsoResize[0];
                h(e.alsoResize);
            } else a.each(e.alsoResize, function(g) {
                h(g);
            }); else h(e.alsoResize);
        },
        resize: function(e, h) {
            var g = a(this).data("resizable");
            e = g.options;
            var i = g.originalSize, b = g.originalPosition, f = {
                height: g.size.height - i.height || 0,
                width: g.size.width - i.width || 0,
                top: g.position.top - b.top || 0,
                left: g.position.left - b.left || 0
            }, j = function(l, o) {
                a(l).each(function() {
                    var n = a(this), k = a(this).data("resizable-alsoresize"), m = {}, p = o && o.length ? o : n.parents(h.originalElement[0]).length ? [ "width", "height" ] : [ "width", "height", "top", "left" ];
                    a.each(p, function(q, s) {
                        if ((q = (k[s] || 0) + (f[s] || 0)) && q >= 0) m[s] = q || null;
                    });
                    if (a.browser.opera && /relative/.test(n.css("position"))) {
                        g._revertToRelativePosition = true;
                        n.css({
                            position: "absolute",
                            top: "auto",
                            left: "auto"
                        });
                    }
                    n.css(m);
                });
            };
            typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function(l, o) {
                j(l, o);
            }) : j(e.alsoResize);
        },
        stop: function() {
            var e = a(this).data("resizable"), h = e.options, g = function(i) {
                a(i).each(function() {
                    var b = a(this);
                    b.css({
                        position: b.data("resizable-alsoresize").position
                    });
                });
            };
            if (e._revertToRelativePosition) {
                e._revertToRelativePosition = false;
                typeof h.alsoResize == "object" && !h.alsoResize.nodeType ? a.each(h.alsoResize, function(i) {
                    g(i);
                }) : g(h.alsoResize);
            }
            a(this).removeData("resizable-alsoresize");
        }
    });
    a.ui.plugin.add("resizable", "animate", {
        stop: function(e) {
            var h = a(this).data("resizable"), g = h.options, i = h._proportionallyResizeElements, b = i.length && /textarea/i.test(i[0].nodeName), f = b && a.ui.hasScroll(i[0], "left") ? 0 : h.sizeDiff.height;
            b = {
                width: h.size.width - (b ? 0 : h.sizeDiff.width),
                height: h.size.height - f
            };
            f = parseInt(h.element.css("left"), 10) + (h.position.left - h.originalPosition.left) || null;
            var j = parseInt(h.element.css("top"), 10) + (h.position.top - h.originalPosition.top) || null;
            h.element.animate(a.extend(b, j && f ? {
                top: j,
                left: f
            } : {}), {
                duration: g.animateDuration,
                easing: g.animateEasing,
                step: function() {
                    var l = {
                        width: parseInt(h.element.css("width"), 10),
                        height: parseInt(h.element.css("height"), 10),
                        top: parseInt(h.element.css("top"), 10),
                        left: parseInt(h.element.css("left"), 10)
                    };
                    i && i.length && a(i[0]).css({
                        width: l.width,
                        height: l.height
                    });
                    h._updateCache(l);
                    h._propagate("resize", e);
                }
            });
        }
    });
    a.ui.plugin.add("resizable", "containment", {
        start: function() {
            var e = a(this).data("resizable"), h = e.element, g = e.options.containment;
            if (h = g instanceof a ? g.get(0) : /parent/.test(g) ? h.parent().get(0) : g) {
                e.containerElement = a(h);
                if (/document/.test(g) || g == document) {
                    e.containerOffset = {
                        left: 0,
                        top: 0
                    };
                    e.containerPosition = {
                        left: 0,
                        top: 0
                    };
                    e.parentData = {
                        element: a(document),
                        left: 0,
                        top: 0,
                        width: a(document).width(),
                        height: a(document).height() || document.body.parentNode.scrollHeight
                    };
                } else {
                    var i = a(h), b = [];
                    a([ "Top", "Right", "Left", "Bottom" ]).each(function(l, o) {
                        b[l] = d(i.css("padding" + o));
                    });
                    e.containerOffset = i.offset();
                    e.containerPosition = i.position();
                    e.containerSize = {
                        height: i.innerHeight() - b[3],
                        width: i.innerWidth() - b[1]
                    };
                    g = e.containerOffset;
                    var f = e.containerSize.height, j = e.containerSize.width;
                    j = a.ui.hasScroll(h, "left") ? h.scrollWidth : j;
                    f = a.ui.hasScroll(h) ? h.scrollHeight : f;
                    e.parentData = {
                        element: h,
                        left: g.left,
                        top: g.top,
                        width: j,
                        height: f
                    };
                }
            }
        },
        resize: function(e) {
            var h = a(this).data("resizable"), g = h.options, i = h.containerOffset, b = h.position;
            e = h._aspectRatio || e.shiftKey;
            var f = {
                top: 0,
                left: 0
            }, j = h.containerElement;
            if (j[0] != document && /static/.test(j.css("position"))) f = i;
            if (b.left < (h._helper ? i.left : 0)) {
                h.size.width += h._helper ? h.position.left - i.left : h.position.left - f.left;
                if (e) h.size.height = h.size.width / g.aspectRatio;
                h.position.left = g.helper ? i.left : 0;
            }
            if (b.top < (h._helper ? i.top : 0)) {
                h.size.height += h._helper ? h.position.top - i.top : h.position.top;
                if (e) h.size.width = h.size.height * g.aspectRatio;
                h.position.top = h._helper ? i.top : 0;
            }
            h.offset.left = h.parentData.left + h.position.left;
            h.offset.top = h.parentData.top + h.position.top;
            g = Math.abs((h._helper ? h.offset.left - f.left : h.offset.left - f.left) + h.sizeDiff.width);
            i = Math.abs((h._helper ? h.offset.top - f.top : h.offset.top - i.top) + h.sizeDiff.height);
            b = h.containerElement.get(0) == h.element.parent().get(0);
            f = /relative|absolute/.test(h.containerElement.css("position"));
            if (b && f) g -= h.parentData.left;
            if (g + h.size.width >= h.parentData.width) {
                h.size.width = h.parentData.width - g;
                if (e) h.size.height = h.size.width / h.aspectRatio;
            }
            if (i + h.size.height >= h.parentData.height) {
                h.size.height = h.parentData.height - i;
                if (e) h.size.width = h.size.height * h.aspectRatio;
            }
        },
        stop: function() {
            var e = a(this).data("resizable"), h = e.options, g = e.containerOffset, i = e.containerPosition, b = e.containerElement, f = a(e.helper), j = f.offset(), l = f.outerWidth() - e.sizeDiff.width;
            f = f.outerHeight() - e.sizeDiff.height;
            e._helper && !h.animate && /relative/.test(b.css("position")) && a(this).css({
                left: j.left - i.left - g.left,
                width: l,
                height: f
            });
            e._helper && !h.animate && /static/.test(b.css("position")) && a(this).css({
                left: j.left - i.left - g.left,
                width: l,
                height: f
            });
        }
    });
    a.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var e = a(this).data("resizable"), h = e.options, g = e.size;
            e.ghost = e.originalElement.clone();
            e.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: g.height,
                width: g.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof h.ghost == "string" ? h.ghost : "");
            e.ghost.appendTo(e.helper);
        },
        resize: function() {
            var e = a(this).data("resizable");
            e.ghost && e.ghost.css({
                position: "relative",
                height: e.size.height,
                width: e.size.width
            });
        },
        stop: function() {
            var e = a(this).data("resizable");
            e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0));
        }
    });
    a.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var e = a(this).data("resizable"), h = e.options, g = e.size, i = e.originalSize, b = e.originalPosition, f = e.axis;
            h.grid = typeof h.grid == "number" ? [ h.grid, h.grid ] : h.grid;
            var j = Math.round((g.width - i.width) / (h.grid[0] || 1)) * (h.grid[0] || 1);
            h = Math.round((g.height - i.height) / (h.grid[1] || 1)) * (h.grid[1] || 1);
            if (/^(se|s|e)$/.test(f)) {
                e.size.width = i.width + j;
                e.size.height = i.height + h;
            } else if (/^(ne)$/.test(f)) {
                e.size.width = i.width + j;
                e.size.height = i.height + h;
                e.position.top = b.top - h;
            } else {
                if (/^(sw)$/.test(f)) {
                    e.size.width = i.width + j;
                    e.size.height = i.height + h;
                } else {
                    e.size.width = i.width + j;
                    e.size.height = i.height + h;
                    e.position.top = b.top - h;
                }
                e.position.left = b.left - j;
            }
        }
    });
    var d = function(e) {
        return parseInt(e, 10) || 0;
    }, c = function(e) {
        return !isNaN(parseInt(e, 10));
    };
})(jQuery);

(function(a) {
    a.widget("ui.selectable", a.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function() {
            var d = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            var c;
            this.refresh = function() {
                c = a(d.options.filter, d.element[0]);
                c.each(function() {
                    var e = a(this), h = e.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: e,
                        left: h.left,
                        top: h.top,
                        right: h.left + e.outerWidth(),
                        bottom: h.top + e.outerHeight(),
                        startselected: false,
                        selected: e.hasClass("ui-selected"),
                        selecting: e.hasClass("ui-selecting"),
                        unselecting: e.hasClass("ui-unselecting")
                    });
                });
            };
            this.refresh();
            this.selectees = c.addClass("ui-selectee");
            this._mouseInit();
            this.helper = a("<div class='ui-selectable-helper'></div>");
        },
        destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy();
            return this;
        },
        _mouseStart: function(d) {
            var c = this;
            this.opos = [ d.pageX, d.pageY ];
            if (!this.options.disabled) {
                var e = this.options;
                this.selectees = a(e.filter, this.element[0]);
                this._trigger("start", d);
                a(e.appendTo).append(this.helper);
                this.helper.css({
                    left: d.clientX,
                    top: d.clientY,
                    width: 0,
                    height: 0
                });
                e.autoRefresh && this.refresh();
                this.selectees.filter(".ui-selected").each(function() {
                    var h = a.data(this, "selectable-item");
                    h.startselected = true;
                    if (!d.metaKey) {
                        h.$element.removeClass("ui-selected");
                        h.selected = false;
                        h.$element.addClass("ui-unselecting");
                        h.unselecting = true;
                        c._trigger("unselecting", d, {
                            unselecting: h.element
                        });
                    }
                });
                a(d.target).parents().andSelf().each(function() {
                    var h = a.data(this, "selectable-item");
                    if (h) {
                        var g = !d.metaKey || !h.$element.hasClass("ui-selected");
                        h.$element.removeClass(g ? "ui-unselecting" : "ui-selected").addClass(g ? "ui-selecting" : "ui-unselecting");
                        h.unselecting = !g;
                        h.selecting = g;
                        (h.selected = g) ? c._trigger("selecting", d, {
                            selecting: h.element
                        }) : c._trigger("unselecting", d, {
                            unselecting: h.element
                        });
                        return false;
                    }
                });
            }
        },
        _mouseDrag: function(d) {
            var c = this;
            this.dragged = true;
            if (!this.options.disabled) {
                var e = this.options, h = this.opos[0], g = this.opos[1], i = d.pageX, b = d.pageY;
                if (h > i) {
                    var f = i;
                    i = h;
                    h = f;
                }
                if (g > b) {
                    f = b;
                    b = g;
                    g = f;
                }
                this.helper.css({
                    left: h,
                    top: g,
                    width: i - h,
                    height: b - g
                });
                this.selectees.each(function() {
                    var j = a.data(this, "selectable-item");
                    if (!(!j || j.element == c.element[0])) {
                        var l = false;
                        if (e.tolerance == "touch") l = !(j.left > i || j.right < h || j.top > b || j.bottom < g); else if (e.tolerance == "fit") l = j.left > h && j.right < i && j.top > g && j.bottom < b;
                        if (l) {
                            if (j.selected) {
                                j.$element.removeClass("ui-selected");
                                j.selected = false;
                            }
                            if (j.unselecting) {
                                j.$element.removeClass("ui-unselecting");
                                j.unselecting = false;
                            }
                            if (!j.selecting) {
                                j.$element.addClass("ui-selecting");
                                j.selecting = true;
                                c._trigger("selecting", d, {
                                    selecting: j.element
                                });
                            }
                        } else {
                            if (j.selecting) if (d.metaKey && j.startselected) {
                                j.$element.removeClass("ui-selecting");
                                j.selecting = false;
                                j.$element.addClass("ui-selected");
                                j.selected = true;
                            } else {
                                j.$element.removeClass("ui-selecting");
                                j.selecting = false;
                                if (j.startselected) {
                                    j.$element.addClass("ui-unselecting");
                                    j.unselecting = true;
                                }
                                c._trigger("unselecting", d, {
                                    unselecting: j.element
                                });
                            }
                            if (j.selected) if (!d.metaKey && !j.startselected) {
                                j.$element.removeClass("ui-selected");
                                j.selected = false;
                                j.$element.addClass("ui-unselecting");
                                j.unselecting = true;
                                c._trigger("unselecting", d, {
                                    unselecting: j.element
                                });
                            }
                        }
                    }
                });
                return false;
            }
        },
        _mouseStop: function(d) {
            var c = this;
            this.dragged = false;
            a(".ui-unselecting", this.element[0]).each(function() {
                var e = a.data(this, "selectable-item");
                e.$element.removeClass("ui-unselecting");
                e.unselecting = false;
                e.startselected = false;
                c._trigger("unselected", d, {
                    unselected: e.element
                });
            });
            a(".ui-selecting", this.element[0]).each(function() {
                var e = a.data(this, "selectable-item");
                e.$element.removeClass("ui-selecting").addClass("ui-selected");
                e.selecting = false;
                e.selected = true;
                e.startselected = true;
                c._trigger("selected", d, {
                    selected: e.element
                });
            });
            this._trigger("stop", d);
            this.helper.remove();
            return false;
        }
    });
    a.extend(a.ui.selectable, {
        version: "1.8.16"
    });
})(jQuery);

(function(a) {
    a.widget("ui.sortable", a.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3
        },
        _create: function() {
            var d = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? d.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit();
        },
        destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var d = this.items.length - 1; d >= 0; d--) this.items[d].item.removeData("sortable-item");
            return this;
        },
        _setOption: function(d, c) {
            if (d === "disabled") {
                this.options[d] = c;
                this.widget()[c ? "addClass" : "removeClass"]("ui-sortable-disabled");
            } else a.Widget.prototype._setOption.apply(this, arguments);
        },
        _mouseCapture: function(d, c) {
            if (this.reverting) return false;
            if (this.options.disabled || this.options.type == "static") return false;
            this._refreshItems(d);
            var e = null, h = this;
            a(d.target).parents().each(function() {
                if (a.data(this, "sortable-item") == h) {
                    e = a(this);
                    return false;
                }
            });
            if (a.data(d.target, "sortable-item") == h) e = a(d.target);
            if (!e) return false;
            if (this.options.handle && !c) {
                var g = false;
                a(this.options.handle, e).find("*").andSelf().each(function() {
                    if (this == d.target) g = true;
                });
                if (!g) return false;
            }
            this.currentItem = e;
            this._removeCurrentsFromItems();
            return true;
        },
        _mouseStart: function(d, c, e) {
            c = this.options;
            var h = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(d);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            a.extend(this.offset, {
                click: {
                    left: d.pageX - this.offset.left,
                    top: d.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(d);
            this.originalPageX = d.pageX;
            this.originalPageY = d.pageY;
            c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            c.containment && this._setContainment();
            if (c.cursor) {
                if (a("body").css("cursor")) this._storedCursor = a("body").css("cursor");
                a("body").css("cursor", c.cursor);
            }
            if (c.opacity) {
                if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
                this.helper.css("opacity", c.opacity);
            }
            if (c.zIndex) {
                if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
                this.helper.css("zIndex", c.zIndex);
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") this.overflowOffset = this.scrollParent.offset();
            this._trigger("start", d, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!e) for (e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("activate", d, h._uiHash(this));
            if (a.ui.ddmanager) a.ui.ddmanager.current = this;
            a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, d);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(d);
            return true;
        },
        _mouseDrag: function(d) {
            this.position = this._generatePosition(d);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) this.lastPositionAbs = this.positionAbs;
            if (this.options.scroll) {
                var c = this.options, e = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - d.pageY < c.scrollSensitivity) this.scrollParent[0].scrollTop = e = this.scrollParent[0].scrollTop + c.scrollSpeed; else if (d.pageY - this.overflowOffset.top < c.scrollSensitivity) this.scrollParent[0].scrollTop = e = this.scrollParent[0].scrollTop - c.scrollSpeed;
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - d.pageX < c.scrollSensitivity) this.scrollParent[0].scrollLeft = e = this.scrollParent[0].scrollLeft + c.scrollSpeed; else if (d.pageX - this.overflowOffset.left < c.scrollSensitivity) this.scrollParent[0].scrollLeft = e = this.scrollParent[0].scrollLeft - c.scrollSpeed;
                } else {
                    if (d.pageY - a(document).scrollTop() < c.scrollSensitivity) e = a(document).scrollTop(a(document).scrollTop() - c.scrollSpeed); else if (a(window).height() - (d.pageY - a(document).scrollTop()) < c.scrollSensitivity) e = a(document).scrollTop(a(document).scrollTop() + c.scrollSpeed);
                    if (d.pageX - a(document).scrollLeft() < c.scrollSensitivity) e = a(document).scrollLeft(a(document).scrollLeft() - c.scrollSpeed); else if (a(window).width() - (d.pageX - a(document).scrollLeft()) < c.scrollSensitivity) e = a(document).scrollLeft(a(document).scrollLeft() + c.scrollSpeed);
                }
                e !== false && a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, d);
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            for (c = this.items.length - 1; c >= 0; c--) {
                e = this.items[c];
                var h = e.item[0], g = this._intersectsWithPointer(e);
                if (g) if (h != this.currentItem[0] && this.placeholder[g == 1 ? "next" : "prev"]()[0] != h && !a.ui.contains(this.placeholder[0], h) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], h) : true)) {
                    this.direction = g == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(e)) this._rearrange(d, e); else break;
                    this._trigger("change", d, this._uiHash());
                    break;
                }
            }
            this._contactContainers(d);
            a.ui.ddmanager && a.ui.ddmanager.drag(this, d);
            this._trigger("sort", d, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false;
        },
        _mouseStop: function(d, c) {
            if (d) {
                a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, d);
                if (this.options.revert) {
                    var e = this;
                    c = e.placeholder.offset();
                    e.reverting = true;
                    a(this.helper).animate({
                        left: c.left - this.offset.parent.left - e.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: c.top - this.offset.parent.top - e.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function() {
                        e._clear(d);
                    });
                } else this._clear(d, c);
                return false;
            }
        },
        cancel: function() {
            var d = this;
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var c = this.containers.length - 1; c >= 0; c--) {
                    this.containers[c]._trigger("deactivate", null, d._uiHash(this));
                    if (this.containers[c].containerCache.over) {
                        this.containers[c]._trigger("out", null, d._uiHash(this));
                        this.containers[c].containerCache.over = 0;
                    }
                }
            }
            if (this.placeholder) {
                this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
                this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
                a.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem);
            }
            return this;
        },
        serialize: function(d) {
            var c = this._getItemsAsjQuery(d && d.connected), e = [];
            d = d || {};
            a(c).each(function() {
                var h = (a(d.item || this).attr(d.attribute || "id") || "").match(d.expression || /(.+)[-=_](.+)/);
                if (h) e.push((d.key || h[1] + "[]") + "=" + (d.key && d.expression ? h[1] : h[2]));
            });
            !e.length && d.key && e.push(d.key + "=");
            return e.join("&");
        },
        toArray: function(d) {
            var c = this._getItemsAsjQuery(d && d.connected), e = [];
            d = d || {};
            c.each(function() {
                e.push(a(d.item || this).attr(d.attribute || "id") || "");
            });
            return e;
        },
        _intersectsWith: function(d) {
            var c = this.positionAbs.left, e = c + this.helperProportions.width, h = this.positionAbs.top, g = h + this.helperProportions.height, i = d.left, b = i + d.width, f = d.top, j = f + d.height, l = this.offset.click.top, o = this.offset.click.left;
            l = h + l > f && h + l < j && c + o > i && c + o < b;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > d[this.floating ? "width" : "height"] ? l : i < c + this.helperProportions.width / 2 && e - this.helperProportions.width / 2 < b && f < h + this.helperProportions.height / 2 && g - this.helperProportions.height / 2 < j;
        },
        _intersectsWithPointer: function(d) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top, d.height);
            d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left, d.width);
            c = c && d;
            d = this._getDragVerticalDirection();
            var e = this._getDragHorizontalDirection();
            if (!c) return false;
            return this.floating ? e && e == "right" || d == "down" ? 2 : 1 : d && (d == "down" ? 2 : 1);
        },
        _intersectsWithSides: function(d) {
            var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top + d.height / 2, d.height);
            d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left + d.width / 2, d.width);
            var e = this._getDragVerticalDirection(), h = this._getDragHorizontalDirection();
            return this.floating && h ? h == "right" && d || h == "left" && !d : e && (e == "down" && c || e == "up" && !c);
        },
        _getDragVerticalDirection: function() {
            var d = this.positionAbs.top - this.lastPositionAbs.top;
            return d != 0 && (d > 0 ? "down" : "up");
        },
        _getDragHorizontalDirection: function() {
            var d = this.positionAbs.left - this.lastPositionAbs.left;
            return d != 0 && (d > 0 ? "right" : "left");
        },
        refresh: function(d) {
            this._refreshItems(d);
            this.refreshPositions();
            return this;
        },
        _connectWith: function() {
            var d = this.options;
            return d.connectWith.constructor == String ? [ d.connectWith ] : d.connectWith;
        },
        _getItemsAsjQuery: function(d) {
            var c = [], e = [], h = this._connectWith();
            if (h && d) for (d = h.length - 1; d >= 0; d--) for (var g = a(h[d]), i = g.length - 1; i >= 0; i--) {
                var b = a.data(g[i], "sortable");
                if (b && b != this && !b.options.disabled) e.push([ a.isFunction(b.options.items) ? b.options.items.call(b.element) : a(b.options.items, b.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), b ]);
            }
            e.push([ a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this ]);
            for (d = e.length - 1; d >= 0; d--) e[d][0].each(function() {
                c.push(this);
            });
            return a(c);
        },
        _removeCurrentsFromItems: function() {
            for (var d = this.currentItem.find(":data(sortable-item)"), c = 0; c < this.items.length; c++) for (var e = 0; e < d.length; e++) d[e] == this.items[c].item[0] && this.items.splice(c, 1);
        },
        _refreshItems: function(d) {
            this.items = [];
            this.containers = [ this ];
            var c = this.items, e = [ [ a.isFunction(this.options.items) ? this.options.items.call(this.element[0], d, {
                item: this.currentItem
            }) : a(this.options.items, this.element), this ] ], h = this._connectWith();
            if (h) for (var g = h.length - 1; g >= 0; g--) for (var i = a(h[g]), b = i.length - 1; b >= 0; b--) {
                var f = a.data(i[b], "sortable");
                if (f && f != this && !f.options.disabled) {
                    e.push([ a.isFunction(f.options.items) ? f.options.items.call(f.element[0], d, {
                        item: this.currentItem
                    }) : a(f.options.items, f.element), f ]);
                    this.containers.push(f);
                }
            }
            for (g = e.length - 1; g >= 0; g--) {
                d = e[g][1];
                h = e[g][0];
                b = 0;
                for (i = h.length; b < i; b++) {
                    f = a(h[b]);
                    f.data("sortable-item", d);
                    c.push({
                        item: f,
                        instance: d,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    });
                }
            }
        },
        refreshPositions: function(d) {
            if (this.offsetParent && this.helper) this.offset.parent = this._getParentOffset();
            for (var c = this.items.length - 1; c >= 0; c--) {
                var e = this.items[c];
                if (!(e.instance != this.currentContainer && this.currentContainer && e.item[0] != this.currentItem[0])) {
                    var h = this.options.toleranceElement ? a(this.options.toleranceElement, e.item) : e.item;
                    if (!d) {
                        e.width = h.outerWidth();
                        e.height = h.outerHeight();
                    }
                    h = h.offset();
                    e.left = h.left;
                    e.top = h.top;
                }
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (c = this.containers.length - 1; c >= 0; c--) {
                h = this.containers[c].element.offset();
                this.containers[c].containerCache.left = h.left;
                this.containers[c].containerCache.top = h.top;
                this.containers[c].containerCache.width = this.containers[c].element.outerWidth();
                this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
            }
            return this;
        },
        _createPlaceholder: function(d) {
            var c = d || this, e = c.options;
            if (!e.placeholder || e.placeholder.constructor == String) {
                var h = e.placeholder;
                e.placeholder = {
                    element: function() {
                        var g = a(document.createElement(c.currentItem[0].nodeName)).addClass(h || c.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!h) g.style.visibility = "hidden";
                        return g;
                    },
                    update: function(g, i) {
                        if (!(h && !e.forcePlaceholderSize)) {
                            i.height() || i.height(c.currentItem.innerHeight() - parseInt(c.currentItem.css("paddingTop") || 0, 10) - parseInt(c.currentItem.css("paddingBottom") || 0, 10));
                            i.width() || i.width(c.currentItem.innerWidth() - parseInt(c.currentItem.css("paddingLeft") || 0, 10) - parseInt(c.currentItem.css("paddingRight") || 0, 10));
                        }
                    }
                };
            }
            c.placeholder = a(e.placeholder.element.call(c.element, c.currentItem));
            c.currentItem.after(c.placeholder);
            e.placeholder.update(c, c.placeholder);
        },
        _contactContainers: function(d) {
            for (var c = null, e = null, h = this.containers.length - 1; h >= 0; h--) if (!a.ui.contains(this.currentItem[0], this.containers[h].element[0])) if (this._intersectsWith(this.containers[h].containerCache)) {
                if (!(c && a.ui.contains(this.containers[h].element[0], c.element[0]))) {
                    c = this.containers[h];
                    e = h;
                }
            } else if (this.containers[h].containerCache.over) {
                this.containers[h]._trigger("out", d, this._uiHash(this));
                this.containers[h].containerCache.over = 0;
            }
            if (c) if (this.containers.length === 1) {
                this.containers[e]._trigger("over", d, this._uiHash(this));
                this.containers[e].containerCache.over = 1;
            } else if (this.currentContainer != this.containers[e]) {
                c = 1e4;
                h = null;
                for (var g = this.positionAbs[this.containers[e].floating ? "left" : "top"], i = this.items.length - 1; i >= 0; i--) if (a.ui.contains(this.containers[e].element[0], this.items[i].item[0])) {
                    var b = this.items[i][this.containers[e].floating ? "left" : "top"];
                    if (Math.abs(b - g) < c) {
                        c = Math.abs(b - g);
                        h = this.items[i];
                    }
                }
                if (h || this.options.dropOnEmpty) {
                    this.currentContainer = this.containers[e];
                    h ? this._rearrange(d, h, null, true) : this._rearrange(d, null, this.containers[e].element, true);
                    this._trigger("change", d, this._uiHash());
                    this.containers[e]._trigger("change", d, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[e]._trigger("over", d, this._uiHash(this));
                    this.containers[e].containerCache.over = 1;
                }
            }
        },
        _createHelper: function(d) {
            var c = this.options;
            d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [ d, this.currentItem ])) : c.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            d.parents("body").length || a(c.appendTo != "parent" ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]);
            if (d[0] == this.currentItem[0]) this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            };
            if (d[0].style.width == "" || c.forceHelperSize) d.width(this.currentItem.width());
            if (d[0].style.height == "" || c.forceHelperSize) d.height(this.currentItem.height());
            return d;
        },
        _adjustOffsetFromHelper: function(d) {
            if (typeof d == "string") d = d.split(" ");
            if (a.isArray(d)) d = {
                left: +d[0],
                top: +d[1] || 0
            };
            if ("left" in d) this.offset.click.left = d.left + this.margins.left;
            if ("right" in d) this.offset.click.left = this.helperProportions.width - d.right + this.margins.left;
            if ("top" in d) this.offset.click.top = d.top + this.margins.top;
            if ("bottom" in d) this.offset.click.top = this.helperProportions.height - d.bottom + this.margins.top;
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var d = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                d.left += this.scrollParent.scrollLeft();
                d.top += this.scrollParent.scrollTop();
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) d = {
                top: 0,
                left: 0
            };
            return {
                top: d.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: d.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var d = this.currentItem.position();
                return {
                    top: d.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: d.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                };
            } else return {
                top: 0,
                left: 0
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var d = this.options;
            if (d.containment == "parent") d.containment = this.helper[0].parentNode;
            if (d.containment == "document" || d.containment == "window") this.containment = [ 0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(d.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(d.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ];
            if (!/^(document|window|parent)$/.test(d.containment)) {
                var c = a(d.containment)[0];
                d = a(d.containment).offset();
                var e = a(c).css("overflow") != "hidden";
                this.containment = [ d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (e ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (e ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top ];
            }
        },
        _convertPositionTo: function(d, c) {
            if (!c) c = this.position;
            d = d == "absolute" ? 1 : -1;
            var e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, h = /(html|body)/i.test(e[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : h ? 0 : e.scrollTop()) * d),
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : h ? 0 : e.scrollLeft()) * d)
            };
        },
        _generatePosition: function(d) {
            var c = this.options, e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, h = /(html|body)/i.test(e[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) this.offset.relative = this._getRelativeOffset();
            var g = d.pageX, i = d.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (d.pageX - this.offset.click.left < this.containment[0]) g = this.containment[0] + this.offset.click.left;
                    if (d.pageY - this.offset.click.top < this.containment[1]) i = this.containment[1] + this.offset.click.top;
                    if (d.pageX - this.offset.click.left > this.containment[2]) g = this.containment[2] + this.offset.click.left;
                    if (d.pageY - this.offset.click.top > this.containment[3]) i = this.containment[3] + this.offset.click.top;
                }
                if (c.grid) {
                    i = this.originalPageY + Math.round((i - this.originalPageY) / c.grid[1]) * c.grid[1];
                    i = this.containment ? !(i - this.offset.click.top < this.containment[1] || i - this.offset.click.top > this.containment[3]) ? i : !(i - this.offset.click.top < this.containment[1]) ? i - c.grid[1] : i + c.grid[1] : i;
                    g = this.originalPageX + Math.round((g - this.originalPageX) / c.grid[0]) * c.grid[0];
                    g = this.containment ? !(g - this.offset.click.left < this.containment[0] || g - this.offset.click.left > this.containment[2]) ? g : !(g - this.offset.click.left < this.containment[0]) ? g - c.grid[0] : g + c.grid[0] : g;
                }
            }
            return {
                top: i - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : h ? 0 : e.scrollTop()),
                left: g - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : h ? 0 : e.scrollLeft())
            };
        },
        _rearrange: function(d, c, e, h) {
            e ? e[0].appendChild(this.placeholder[0]) : c.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? c.item[0] : c.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var g = this, i = this.counter;
            window.setTimeout(function() {
                i == g.counter && g.refreshPositions(!h);
            }, 0);
        },
        _clear: function(d, c) {
            this.reverting = false;
            var e = [];
            !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var h in this._storedCSS) if (this._storedCSS[h] == "auto" || this._storedCSS[h] == "static") this._storedCSS[h] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
            } else this.currentItem.show();
            this.fromOutside && !c && e.push(function(g) {
                this._trigger("receive", g, this._uiHash(this.fromOutside));
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !c) e.push(function(g) {
                this._trigger("update", g, this._uiHash());
            });
            if (!a.ui.contains(this.element[0], this.currentItem[0])) {
                c || e.push(function(g) {
                    this._trigger("remove", g, this._uiHash());
                });
                for (h = this.containers.length - 1; h >= 0; h--) if (a.ui.contains(this.containers[h].element[0], this.currentItem[0]) && !c) {
                    e.push(function(g) {
                        return function(i) {
                            g._trigger("receive", i, this._uiHash(this));
                        };
                    }.call(this, this.containers[h]));
                    e.push(function(g) {
                        return function(i) {
                            g._trigger("update", i, this._uiHash(this));
                        };
                    }.call(this, this.containers[h]));
                }
            }
            for (h = this.containers.length - 1; h >= 0; h--) {
                c || e.push(function(g) {
                    return function(i) {
                        g._trigger("deactivate", i, this._uiHash(this));
                    };
                }.call(this, this.containers[h]));
                if (this.containers[h].containerCache.over) {
                    e.push(function(g) {
                        return function(i) {
                            g._trigger("out", i, this._uiHash(this));
                        };
                    }.call(this, this.containers[h]));
                    this.containers[h].containerCache.over = 0;
                }
            }
            this._storedCursor && a("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex);
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!c) {
                    this._trigger("beforeStop", d, this._uiHash());
                    for (h = 0; h < e.length; h++) e[h].call(this, d);
                    this._trigger("stop", d, this._uiHash());
                }
                return false;
            }
            c || this._trigger("beforeStop", d, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!c) {
                for (h = 0; h < e.length; h++) e[h].call(this, d);
                this._trigger("stop", d, this._uiHash());
            }
            this.fromOutside = false;
            return true;
        },
        _trigger: function() {
            a.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel();
        },
        _uiHash: function(d) {
            var c = d || this;
            return {
                helper: c.helper,
                placeholder: c.placeholder || a([]),
                position: c.position,
                originalPosition: c.originalPosition,
                offset: c.positionAbs,
                item: c.currentItem,
                sender: d ? d.element : null
            };
        }
    });
    a.extend(a.ui.sortable, {
        version: "1.8.16"
    });
})(jQuery);

jQuery.effects || function(a, d) {
    function c(n) {
        var k;
        if (n && n.constructor == Array && n.length == 3) return n;
        if (k = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(n)) return [ parseInt(k[1], 10), parseInt(k[2], 10), parseInt(k[3], 10) ];
        if (k = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(n)) return [ parseFloat(k[1]) * 2.55, parseFloat(k[2]) * 2.55, parseFloat(k[3]) * 2.55 ];
        if (k = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(n)) return [ parseInt(k[1], 16), parseInt(k[2], 16), parseInt(k[3], 16) ];
        if (k = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(n)) return [ parseInt(k[1] + k[1], 16), parseInt(k[2] + k[2], 16), parseInt(k[3] + k[3], 16) ];
        if (/rgba\(0, 0, 0, 0\)/.exec(n)) return j.transparent;
        return j[a.trim(n).toLowerCase()];
    }
    function e(n, k) {
        var m;
        do {
            m = a.curCSS(n, k);
            if (m != "" && m != "transparent" || a.nodeName(n, "body")) break;
            k = "backgroundColor";
        } while (n = n.parentNode);
        return c(m);
    }
    function h() {
        var n = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, k = {}, m, p;
        if (n && n.length && n[0] && n[n[0]]) for (var q = n.length; q--; ) {
            m = n[q];
            if (typeof n[m] == "string") {
                p = m.replace(/\-(\w)/g, function(s, r) {
                    return r.toUpperCase();
                });
                k[p] = n[m];
            }
        } else for (m in n) if (typeof n[m] === "string") k[m] = n[m];
        return k;
    }
    function g(n) {
        var k, m;
        for (k in n) {
            m = n[k];
            if (m == null || a.isFunction(m) || k in o || /scrollbar/.test(k) || !/color/i.test(k) && isNaN(parseFloat(m))) delete n[k];
        }
        return n;
    }
    function i(n, k) {
        var m = {
            _: 0
        }, p;
        for (p in k) if (n[p] != k[p]) m[p] = k[p];
        return m;
    }
    function b(n, k, m, p) {
        if (typeof n == "object") {
            p = k;
            m = null;
            k = n;
            n = k.effect;
        }
        if (a.isFunction(k)) {
            p = k;
            m = null;
            k = {};
        }
        if (typeof k == "number" || a.fx.speeds[k]) {
            p = m;
            m = k;
            k = {};
        }
        if (a.isFunction(m)) {
            p = m;
            m = null;
        }
        k = k || {};
        m = m || k.duration;
        m = a.fx.off ? 0 : typeof m == "number" ? m : m in a.fx.speeds ? a.fx.speeds[m] : a.fx.speeds._default;
        p = p || k.complete;
        return [ n, k, m, p ];
    }
    function f(n) {
        if (!n || typeof n === "number" || a.fx.speeds[n]) return true;
        if (typeof n === "string" && !a.effects[n]) return true;
        return false;
    }
    a.effects = {};
    a.each([ "backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor" ], function(n, k) {
        a.fx.step[k] = function(m) {
            if (!m.colorInit) {
                m.start = e(m.elem, k);
                m.end = c(m.end);
                m.colorInit = true;
            }
            m.elem.style[k] = "rgb(" + Math.max(Math.min(parseInt(m.pos * (m.end[0] - m.start[0]) + m.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(m.pos * (m.end[1] - m.start[1]) + m.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(m.pos * (m.end[2] - m.start[2]) + m.start[2], 10), 255), 0) + ")";
        };
    });
    var j = {
        aqua: [ 0, 255, 255 ],
        azure: [ 240, 255, 255 ],
        beige: [ 245, 245, 220 ],
        black: [ 0, 0, 0 ],
        blue: [ 0, 0, 255 ],
        brown: [ 165, 42, 42 ],
        cyan: [ 0, 255, 255 ],
        darkblue: [ 0, 0, 139 ],
        darkcyan: [ 0, 139, 139 ],
        darkgrey: [ 169, 169, 169 ],
        darkgreen: [ 0, 100, 0 ],
        darkkhaki: [ 189, 183, 107 ],
        darkmagenta: [ 139, 0, 139 ],
        darkolivegreen: [ 85, 107, 47 ],
        darkorange: [ 255, 140, 0 ],
        darkorchid: [ 153, 50, 204 ],
        darkred: [ 139, 0, 0 ],
        darksalmon: [ 233, 150, 122 ],
        darkviolet: [ 148, 0, 211 ],
        fuchsia: [ 255, 0, 255 ],
        gold: [ 255, 215, 0 ],
        green: [ 0, 128, 0 ],
        indigo: [ 75, 0, 130 ],
        khaki: [ 240, 230, 140 ],
        lightblue: [ 173, 216, 230 ],
        lightcyan: [ 224, 255, 255 ],
        lightgreen: [ 144, 238, 144 ],
        lightgrey: [ 211, 211, 211 ],
        lightpink: [ 255, 182, 193 ],
        lightyellow: [ 255, 255, 224 ],
        lime: [ 0, 255, 0 ],
        magenta: [ 255, 0, 255 ],
        maroon: [ 128, 0, 0 ],
        navy: [ 0, 0, 128 ],
        olive: [ 128, 128, 0 ],
        orange: [ 255, 165, 0 ],
        pink: [ 255, 192, 203 ],
        purple: [ 128, 0, 128 ],
        violet: [ 128, 0, 128 ],
        red: [ 255, 0, 0 ],
        silver: [ 192, 192, 192 ],
        white: [ 255, 255, 255 ],
        yellow: [ 255, 255, 0 ],
        transparent: [ 255, 255, 255 ]
    }, l = [ "add", "remove", "toggle" ], o = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    };
    a.effects.animateClass = function(n, k, m, p) {
        if (a.isFunction(m)) {
            p = m;
            m = null;
        }
        return this.queue(function() {
            var q = a(this), s = q.attr("style") || " ", r = g(h.call(this)), u, v = q.attr("class");
            a.each(l, function(w, x) {
                n[x] && q[x + "Class"](n[x]);
            });
            u = g(h.call(this));
            q.attr("class", v);
            q.animate(i(r, u), {
                queue: false,
                duration: k,
                easing: m,
                complete: function() {
                    a.each(l, function(w, x) {
                        n[x] && q[x + "Class"](n[x]);
                    });
                    if (typeof q.attr("style") == "object") {
                        q.attr("style").cssText = "";
                        q.attr("style").cssText = s;
                    } else q.attr("style", s);
                    p && p.apply(this, arguments);
                    a.dequeue(this);
                }
            });
        });
    };
    a.fn.extend({
        _addClass: a.fn.addClass,
        addClass: function(n, k, m, p) {
            return k ? a.effects.animateClass.apply(this, [ {
                add: n
            }, k, m, p ]) : this._addClass(n);
        },
        _removeClass: a.fn.removeClass,
        removeClass: function(n, k, m, p) {
            return k ? a.effects.animateClass.apply(this, [ {
                remove: n
            }, k, m, p ]) : this._removeClass(n);
        },
        _toggleClass: a.fn.toggleClass,
        toggleClass: function(n, k, m, p, q) {
            return typeof k == "boolean" || k === d ? m ? a.effects.animateClass.apply(this, [ k ? {
                add: n
            } : {
                remove: n
            }, m, p, q ]) : this._toggleClass(n, k) : a.effects.animateClass.apply(this, [ {
                toggle: n
            }, k, m, p ]);
        },
        switchClass: function(n, k, m, p, q) {
            return a.effects.animateClass.apply(this, [ {
                add: k,
                remove: n
            }, m, p, q ]);
        }
    });
    a.extend(a.effects, {
        version: "1.8.16",
        save: function(n, k) {
            for (var m = 0; m < k.length; m++) k[m] !== null && n.data("ec.storage." + k[m], n[0].style[k[m]]);
        },
        restore: function(n, k) {
            for (var m = 0; m < k.length; m++) k[m] !== null && n.css(k[m], n.data("ec.storage." + k[m]));
        },
        setMode: function(n, k) {
            if (k == "toggle") k = n.is(":hidden") ? "show" : "hide";
            return k;
        },
        getBaseline: function(n, k) {
            var m;
            switch (n[0]) {
              case "top":
                m = 0;
                break;

              case "middle":
                m = .5;
                break;

              case "bottom":
                m = 1;
                break;

              default:
                m = n[0] / k.height;
            }
            switch (n[1]) {
              case "left":
                n = 0;
                break;

              case "center":
                n = .5;
                break;

              case "right":
                n = 1;
                break;

              default:
                n = n[1] / k.width;
            }
            return {
                x: n,
                y: m
            };
        },
        createWrapper: function(n) {
            if (n.parent().is(".ui-effects-wrapper")) return n.parent();
            var k = {
                width: n.outerWidth(true),
                height: n.outerHeight(true),
                "float": n.css("float")
            }, m = a("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            }), p = document.activeElement;
            n.wrap(m);
            if (n[0] === p || a.contains(n[0], p)) a(p).focus();
            m = n.parent();
            if (n.css("position") == "static") {
                m.css({
                    position: "relative"
                });
                n.css({
                    position: "relative"
                });
            } else {
                a.extend(k, {
                    position: n.css("position"),
                    zIndex: n.css("z-index")
                });
                a.each([ "top", "left", "bottom", "right" ], function(q, s) {
                    k[s] = n.css(s);
                    if (isNaN(parseInt(k[s], 10))) k[s] = "auto";
                });
                n.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                });
            }
            return m.css(k).show();
        },
        removeWrapper: function(n) {
            var k, m = document.activeElement;
            if (n.parent().is(".ui-effects-wrapper")) {
                k = n.parent().replaceWith(n);
                if (n[0] === m || a.contains(n[0], m)) a(m).focus();
                return k;
            }
            return n;
        },
        setTransition: function(n, k, m, p) {
            p = p || {};
            a.each(k, function(q, s) {
                unit = n.cssUnit(s);
                if (unit[0] > 0) p[s] = unit[0] * m + unit[1];
            });
            return p;
        }
    });
    a.fn.extend({
        effect: function(n) {
            var k = b.apply(this, arguments), m = {
                options: k[1],
                duration: k[2],
                callback: k[3]
            };
            k = m.options.mode;
            var p = a.effects[n];
            if (a.fx.off || !p) return k ? this[k](m.duration, m.callback) : this.each(function() {
                m.callback && m.callback.call(this);
            });
            return p.call(this, m);
        },
        _show: a.fn.show,
        show: function(n) {
            if (f(n)) return this._show.apply(this, arguments); else {
                var k = b.apply(this, arguments);
                k[1].mode = "show";
                return this.effect.apply(this, k);
            }
        },
        _hide: a.fn.hide,
        hide: function(n) {
            if (f(n)) return this._hide.apply(this, arguments); else {
                var k = b.apply(this, arguments);
                k[1].mode = "hide";
                return this.effect.apply(this, k);
            }
        },
        __toggle: a.fn.toggle,
        toggle: function(n) {
            if (f(n) || typeof n === "boolean" || a.isFunction(n)) return this.__toggle.apply(this, arguments); else {
                var k = b.apply(this, arguments);
                k[1].mode = "toggle";
                return this.effect.apply(this, k);
            }
        },
        cssUnit: function(n) {
            var k = this.css(n), m = [];
            a.each([ "em", "px", "%", "pt" ], function(p, q) {
                if (k.indexOf(q) > 0) m = [ parseFloat(k), q ];
            });
            return m;
        }
    });
    a.easing.jswing = a.easing.swing;
    a.extend(a.easing, {
        def: "easeOutQuad",
        swing: function(n, k, m, p, q) {
            return a.easing[a.easing.def](n, k, m, p, q);
        },
        easeInQuad: function(n, k, m, p, q) {
            return p * (k /= q) * k + m;
        },
        easeOutQuad: function(n, k, m, p, q) {
            return -p * (k /= q) * (k - 2) + m;
        },
        easeInOutQuad: function(n, k, m, p, q) {
            if ((k /= q / 2) < 1) return p / 2 * k * k + m;
            return -p / 2 * (--k * (k - 2) - 1) + m;
        },
        easeInCubic: function(n, k, m, p, q) {
            return p * (k /= q) * k * k + m;
        },
        easeOutCubic: function(n, k, m, p, q) {
            return p * ((k = k / q - 1) * k * k + 1) + m;
        },
        easeInOutCubic: function(n, k, m, p, q) {
            if ((k /= q / 2) < 1) return p / 2 * k * k * k + m;
            return p / 2 * ((k -= 2) * k * k + 2) + m;
        },
        easeInQuart: function(n, k, m, p, q) {
            return p * (k /= q) * k * k * k + m;
        },
        easeOutQuart: function(n, k, m, p, q) {
            return -p * ((k = k / q - 1) * k * k * k - 1) + m;
        },
        easeInOutQuart: function(n, k, m, p, q) {
            if ((k /= q / 2) < 1) return p / 2 * k * k * k * k + m;
            return -p / 2 * ((k -= 2) * k * k * k - 2) + m;
        },
        easeInQuint: function(n, k, m, p, q) {
            return p * (k /= q) * k * k * k * k + m;
        },
        easeOutQuint: function(n, k, m, p, q) {
            return p * ((k = k / q - 1) * k * k * k * k + 1) + m;
        },
        easeInOutQuint: function(n, k, m, p, q) {
            if ((k /= q / 2) < 1) return p / 2 * k * k * k * k * k + m;
            return p / 2 * ((k -= 2) * k * k * k * k + 2) + m;
        },
        easeInSine: function(n, k, m, p, q) {
            return -p * Math.cos(k / q * (Math.PI / 2)) + p + m;
        },
        easeOutSine: function(n, k, m, p, q) {
            return p * Math.sin(k / q * (Math.PI / 2)) + m;
        },
        easeInOutSine: function(n, k, m, p, q) {
            return -p / 2 * (Math.cos(Math.PI * k / q) - 1) + m;
        },
        easeInExpo: function(n, k, m, p, q) {
            return k == 0 ? m : p * Math.pow(2, 10 * (k / q - 1)) + m;
        },
        easeOutExpo: function(n, k, m, p, q) {
            return k == q ? m + p : p * (-Math.pow(2, -10 * k / q) + 1) + m;
        },
        easeInOutExpo: function(n, k, m, p, q) {
            if (k == 0) return m;
            if (k == q) return m + p;
            if ((k /= q / 2) < 1) return p / 2 * Math.pow(2, 10 * (k - 1)) + m;
            return p / 2 * (-Math.pow(2, -10 * --k) + 2) + m;
        },
        easeInCirc: function(n, k, m, p, q) {
            return -p * (Math.sqrt(1 - (k /= q) * k) - 1) + m;
        },
        easeOutCirc: function(n, k, m, p, q) {
            return p * Math.sqrt(1 - (k = k / q - 1) * k) + m;
        },
        easeInOutCirc: function(n, k, m, p, q) {
            if ((k /= q / 2) < 1) return -p / 2 * (Math.sqrt(1 - k * k) - 1) + m;
            return p / 2 * (Math.sqrt(1 - (k -= 2) * k) + 1) + m;
        },
        easeInElastic: function(n, k, m, p, q) {
            n = 1.70158;
            var s = 0, r = p;
            if (k == 0) return m;
            if ((k /= q) == 1) return m + p;
            s || (s = q * .3);
            if (r < Math.abs(p)) {
                r = p;
                n = s / 4;
            } else n = s / (2 * Math.PI) * Math.asin(p / r);
            return -(r * Math.pow(2, 10 * (k -= 1)) * Math.sin((k * q - n) * 2 * Math.PI / s)) + m;
        },
        easeOutElastic: function(n, k, m, p, q) {
            n = 1.70158;
            var s = 0, r = p;
            if (k == 0) return m;
            if ((k /= q) == 1) return m + p;
            s || (s = q * .3);
            if (r < Math.abs(p)) {
                r = p;
                n = s / 4;
            } else n = s / (2 * Math.PI) * Math.asin(p / r);
            return r * Math.pow(2, -10 * k) * Math.sin((k * q - n) * 2 * Math.PI / s) + p + m;
        },
        easeInOutElastic: function(n, k, m, p, q) {
            n = 1.70158;
            var s = 0, r = p;
            if (k == 0) return m;
            if ((k /= q / 2) == 2) return m + p;
            s || (s = q * .3 * 1.5);
            if (r < Math.abs(p)) {
                r = p;
                n = s / 4;
            } else n = s / (2 * Math.PI) * Math.asin(p / r);
            if (k < 1) return -.5 * r * Math.pow(2, 10 * (k -= 1)) * Math.sin((k * q - n) * 2 * Math.PI / s) + m;
            return r * Math.pow(2, -10 * (k -= 1)) * Math.sin((k * q - n) * 2 * Math.PI / s) * .5 + p + m;
        },
        easeInBack: function(n, k, m, p, q, s) {
            if (s == d) s = 1.70158;
            return p * (k /= q) * k * ((s + 1) * k - s) + m;
        },
        easeOutBack: function(n, k, m, p, q, s) {
            if (s == d) s = 1.70158;
            return p * ((k = k / q - 1) * k * ((s + 1) * k + s) + 1) + m;
        },
        easeInOutBack: function(n, k, m, p, q, s) {
            if (s == d) s = 1.70158;
            if ((k /= q / 2) < 1) return p / 2 * k * k * (((s *= 1.525) + 1) * k - s) + m;
            return p / 2 * ((k -= 2) * k * (((s *= 1.525) + 1) * k + s) + 2) + m;
        },
        easeInBounce: function(n, k, m, p, q) {
            return p - a.easing.easeOutBounce(n, q - k, 0, p, q) + m;
        },
        easeOutBounce: function(n, k, m, p, q) {
            return (k /= q) < 1 / 2.75 ? p * 7.5625 * k * k + m : k < 2 / 2.75 ? p * (7.5625 * (k -= 1.5 / 2.75) * k + .75) + m : k < 2.5 / 2.75 ? p * (7.5625 * (k -= 2.25 / 2.75) * k + .9375) + m : p * (7.5625 * (k -= 2.625 / 2.75) * k + .984375) + m;
        },
        easeInOutBounce: function(n, k, m, p, q) {
            if (k < q / 2) return a.easing.easeInBounce(n, k * 2, 0, p, q) * .5 + m;
            return a.easing.easeOutBounce(n, k * 2 - q, 0, p, q) * .5 + p * .5 + m;
        }
    });
}(jQuery);

(function(a) {
    a.effects.blind = function(d) {
        return this.queue(function() {
            var c = a(this), e = [ "position", "top", "bottom", "left", "right" ], h = a.effects.setMode(c, d.options.mode || "hide"), g = d.options.direction || "vertical";
            a.effects.save(c, e);
            c.show();
            var i = a.effects.createWrapper(c).css({
                overflow: "hidden"
            }), b = g == "vertical" ? "height" : "width";
            g = g == "vertical" ? i.height() : i.width();
            h == "show" && i.css(b, 0);
            var f = {};
            f[b] = h == "show" ? g : 0;
            i.animate(f, d.duration, d.options.easing, function() {
                h == "hide" && c.hide();
                a.effects.restore(c, e);
                a.effects.removeWrapper(c);
                d.callback && d.callback.apply(c[0], arguments);
                c.dequeue();
            });
        });
    };
})(jQuery);

(function(a) {
    a.effects.bounce = function(d) {
        return this.queue(function() {
            var c = a(this), e = [ "position", "top", "bottom", "left", "right" ], h = a.effects.setMode(c, d.options.mode || "effect"), g = d.options.direction || "up", i = d.options.distance || 20, b = d.options.times || 5, f = d.duration || 250;
            /show|hide/.test(h) && e.push("opacity");
            a.effects.save(c, e);
            c.show();
            a.effects.createWrapper(c);
            var j = g == "up" || g == "down" ? "top" : "left";
            g = g == "up" || g == "left" ? "pos" : "neg";
            i = d.options.distance || (j == "top" ? c.outerHeight({
                margin: true
            }) / 3 : c.outerWidth({
                margin: true
            }) / 3);
            if (h == "show") c.css("opacity", 0).css(j, g == "pos" ? -i : i);
            if (h == "hide") i /= b * 2;
            h != "hide" && b--;
            if (h == "show") {
                var l = {
                    opacity: 1
                };
                l[j] = (g == "pos" ? "+=" : "-=") + i;
                c.animate(l, f / 2, d.options.easing);
                i /= 2;
                b--;
            }
            for (l = 0; l < b; l++) {
                var o = {}, n = {};
                o[j] = (g == "pos" ? "-=" : "+=") + i;
                n[j] = (g == "pos" ? "+=" : "-=") + i;
                c.animate(o, f / 2, d.options.easing).animate(n, f / 2, d.options.easing);
                i = h == "hide" ? i * 2 : i / 2;
            }
            if (h == "hide") {
                l = {
                    opacity: 0
                };
                l[j] = (g == "pos" ? "-=" : "+=") + i;
                c.animate(l, f / 2, d.options.easing, function() {
                    c.hide();
                    a.effects.restore(c, e);
                    a.effects.removeWrapper(c);
                    d.callback && d.callback.apply(this, arguments);
                });
            } else {
                o = {};
                n = {};
                o[j] = (g == "pos" ? "-=" : "+=") + i;
                n[j] = (g == "pos" ? "+=" : "-=") + i;
                c.animate(o, f / 2, d.options.easing).animate(n, f / 2, d.options.easing, function() {
                    a.effects.restore(c, e);
                    a.effects.removeWrapper(c);
                    d.callback && d.callback.apply(this, arguments);
                });
            }
            c.queue("fx", function() {
                c.dequeue();
            });
            c.dequeue();
        });
    };
})(jQuery);

(function(a) {
    a.effects.clip = function(d) {
        return this.queue(function() {
            var c = a(this), e = [ "position", "top", "bottom", "left", "right", "height", "width" ], h = a.effects.setMode(c, d.options.mode || "hide"), g = d.options.direction || "vertical";
            a.effects.save(c, e);
            c.show();
            var i = a.effects.createWrapper(c).css({
                overflow: "hidden"
            });
            i = c[0].tagName == "IMG" ? i : c;
            var b = {
                size: g == "vertical" ? "height" : "width",
                position: g == "vertical" ? "top" : "left"
            };
            g = g == "vertical" ? i.height() : i.width();
            if (h == "show") {
                i.css(b.size, 0);
                i.css(b.position, g / 2);
            }
            var f = {};
            f[b.size] = h == "show" ? g : 0;
            f[b.position] = h == "show" ? 0 : g / 2;
            i.animate(f, {
                queue: false,
                duration: d.duration,
                easing: d.options.easing,
                complete: function() {
                    h == "hide" && c.hide();
                    a.effects.restore(c, e);
                    a.effects.removeWrapper(c);
                    d.callback && d.callback.apply(c[0], arguments);
                    c.dequeue();
                }
            });
        });
    };
})(jQuery);

(function(a) {
    a.effects.drop = function(d) {
        return this.queue(function() {
            var c = a(this), e = [ "position", "top", "bottom", "left", "right", "opacity" ], h = a.effects.setMode(c, d.options.mode || "hide"), g = d.options.direction || "left";
            a.effects.save(c, e);
            c.show();
            a.effects.createWrapper(c);
            var i = g == "up" || g == "down" ? "top" : "left";
            g = g == "up" || g == "left" ? "pos" : "neg";
            var b = d.options.distance || (i == "top" ? c.outerHeight({
                margin: true
            }) / 2 : c.outerWidth({
                margin: true
            }) / 2);
            if (h == "show") c.css("opacity", 0).css(i, g == "pos" ? -b : b);
            var f = {
                opacity: h == "show" ? 1 : 0
            };
            f[i] = (h == "show" ? g == "pos" ? "+=" : "-=" : g == "pos" ? "-=" : "+=") + b;
            c.animate(f, {
                queue: false,
                duration: d.duration,
                easing: d.options.easing,
                complete: function() {
                    h == "hide" && c.hide();
                    a.effects.restore(c, e);
                    a.effects.removeWrapper(c);
                    d.callback && d.callback.apply(this, arguments);
                    c.dequeue();
                }
            });
        });
    };
})(jQuery);

(function(a) {
    a.effects.explode = function(d) {
        return this.queue(function() {
            var c = d.options.pieces ? Math.round(Math.sqrt(d.options.pieces)) : 3, e = d.options.pieces ? Math.round(Math.sqrt(d.options.pieces)) : 3;
            d.options.mode = d.options.mode == "toggle" ? a(this).is(":visible") ? "hide" : "show" : d.options.mode;
            var h = a(this).show().css("visibility", "hidden"), g = h.offset();
            g.top -= parseInt(h.css("marginTop"), 10) || 0;
            g.left -= parseInt(h.css("marginLeft"), 10) || 0;
            for (var i = h.outerWidth(true), b = h.outerHeight(true), f = 0; f < c; f++) for (var j = 0; j < e; j++) h.clone().appendTo("body").wrap("<div></div>").css({
                position: "absolute",
                visibility: "visible",
                left: -j * (i / e),
                top: -f * (b / c)
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: i / e,
                height: b / c,
                left: g.left + j * (i / e) + (d.options.mode == "show" ? (j - Math.floor(e / 2)) * (i / e) : 0),
                top: g.top + f * (b / c) + (d.options.mode == "show" ? (f - Math.floor(c / 2)) * (b / c) : 0),
                opacity: d.options.mode == "show" ? 0 : 1
            }).animate({
                left: g.left + j * (i / e) + (d.options.mode == "show" ? 0 : (j - Math.floor(e / 2)) * (i / e)),
                top: g.top + f * (b / c) + (d.options.mode == "show" ? 0 : (f - Math.floor(c / 2)) * (b / c)),
                opacity: d.options.mode == "show" ? 1 : 0
            }, d.duration || 500);
            setTimeout(function() {
                d.options.mode == "show" ? h.css({
                    visibility: "visible"
                }) : h.css({
                    visibility: "visible"
                }).hide();
                d.callback && d.callback.apply(h[0]);
                h.dequeue();
                a("div.ui-effects-explode").remove();
            }, d.duration || 500);
        });
    };
})(jQuery);

(function(a) {
    a.effects.fade = function(d) {
        return this.queue(function() {
            var c = a(this), e = a.effects.setMode(c, d.options.mode || "hide");
            c.animate({
                opacity: e
            }, {
                queue: false,
                duration: d.duration,
                easing: d.options.easing,
                complete: function() {
                    d.callback && d.callback.apply(this, arguments);
                    c.dequeue();
                }
            });
        });
    };
})(jQuery);

(function(a) {
    a.effects.fold = function(d) {
        return this.queue(function() {
            var c = a(this), e = [ "position", "top", "bottom", "left", "right" ], h = a.effects.setMode(c, d.options.mode || "hide"), g = d.options.size || 15, i = !!d.options.horizFirst, b = d.duration ? d.duration / 2 : a.fx.speeds._default / 2;
            a.effects.save(c, e);
            c.show();
            var f = a.effects.createWrapper(c).css({
                overflow: "hidden"
            }), j = h == "show" != i, l = j ? [ "width", "height" ] : [ "height", "width" ];
            j = j ? [ f.width(), f.height() ] : [ f.height(), f.width() ];
            var o = /([0-9]+)%/.exec(g);
            if (o) g = parseInt(o[1], 10) / 100 * j[h == "hide" ? 0 : 1];
            if (h == "show") f.css(i ? {
                height: 0,
                width: g
            } : {
                height: g,
                width: 0
            });
            i = {};
            o = {};
            i[l[0]] = h == "show" ? j[0] : g;
            o[l[1]] = h == "show" ? j[1] : 0;
            f.animate(i, b, d.options.easing).animate(o, b, d.options.easing, function() {
                h == "hide" && c.hide();
                a.effects.restore(c, e);
                a.effects.removeWrapper(c);
                d.callback && d.callback.apply(c[0], arguments);
                c.dequeue();
            });
        });
    };
})(jQuery);

(function(a) {
    a.effects.highlight = function(d) {
        return this.queue(function() {
            var c = a(this), e = [ "backgroundImage", "backgroundColor", "opacity" ], h = a.effects.setMode(c, d.options.mode || "show"), g = {
                backgroundColor: c.css("backgroundColor")
            };
            if (h == "hide") g.opacity = 0;
            a.effects.save(c, e);
            c.show().css({
                backgroundImage: "none",
                backgroundColor: d.options.color || "#ffff99"
            }).animate(g, {
                queue: false,
                duration: d.duration,
                easing: d.options.easing,
                complete: function() {
                    h == "hide" && c.hide();
                    a.effects.restore(c, e);
                    h == "show" && !a.support.opacity && this.style.removeAttribute("filter");
                    d.callback && d.callback.apply(this, arguments);
                    c.dequeue();
                }
            });
        });
    };
})(jQuery);

(function(a) {
    a.effects.pulsate = function(d) {
        return this.queue(function() {
            var c = a(this), e = a.effects.setMode(c, d.options.mode || "show");
            times = (d.options.times || 5) * 2 - 1;
            duration = d.duration ? d.duration / 2 : a.fx.speeds._default / 2;
            isVisible = c.is(":visible");
            animateTo = 0;
            if (!isVisible) {
                c.css("opacity", 0).show();
                animateTo = 1;
            }
            if (e == "hide" && isVisible || e == "show" && !isVisible) times--;
            for (e = 0; e < times; e++) {
                c.animate({
                    opacity: animateTo
                }, duration, d.options.easing);
                animateTo = (animateTo + 1) % 2;
            }
            c.animate({
                opacity: animateTo
            }, duration, d.options.easing, function() {
                animateTo == 0 && c.hide();
                d.callback && d.callback.apply(this, arguments);
            });
            c.queue("fx", function() {
                c.dequeue();
            }).dequeue();
        });
    };
})(jQuery);

(function(a) {
    a.effects.puff = function(d) {
        return this.queue(function() {
            var c = a(this), e = a.effects.setMode(c, d.options.mode || "hide"), h = parseInt(d.options.percent, 10) || 150, g = h / 100, i = {
                height: c.height(),
                width: c.width()
            };
            a.extend(d.options, {
                fade: true,
                mode: e,
                percent: e == "hide" ? h : 100,
                from: e == "hide" ? i : {
                    height: i.height * g,
                    width: i.width * g
                }
            });
            c.effect("scale", d.options, d.duration, d.callback);
            c.dequeue();
        });
    };
    a.effects.scale = function(d) {
        return this.queue(function() {
            var c = a(this), e = a.extend(true, {}, d.options), h = a.effects.setMode(c, d.options.mode || "effect"), g = parseInt(d.options.percent, 10) || (parseInt(d.options.percent, 10) == 0 ? 0 : h == "hide" ? 0 : 100), i = d.options.direction || "both", b = d.options.origin;
            if (h != "effect") {
                e.origin = b || [ "middle", "center" ];
                e.restore = true;
            }
            b = {
                height: c.height(),
                width: c.width()
            };
            c.from = d.options.from || (h == "show" ? {
                height: 0,
                width: 0
            } : b);
            g = {
                y: i != "horizontal" ? g / 100 : 1,
                x: i != "vertical" ? g / 100 : 1
            };
            c.to = {
                height: b.height * g.y,
                width: b.width * g.x
            };
            if (d.options.fade) {
                if (h == "show") {
                    c.from.opacity = 0;
                    c.to.opacity = 1;
                }
                if (h == "hide") {
                    c.from.opacity = 1;
                    c.to.opacity = 0;
                }
            }
            e.from = c.from;
            e.to = c.to;
            e.mode = h;
            c.effect("size", e, d.duration, d.callback);
            c.dequeue();
        });
    };
    a.effects.size = function(d) {
        return this.queue(function() {
            var c = a(this), e = [ "position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity" ], h = [ "position", "top", "bottom", "left", "right", "overflow", "opacity" ], g = [ "width", "height", "overflow" ], i = [ "fontSize" ], b = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ], f = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ], j = a.effects.setMode(c, d.options.mode || "effect"), l = d.options.restore || false, o = d.options.scale || "both", n = d.options.origin, k = {
                height: c.height(),
                width: c.width()
            };
            c.from = d.options.from || k;
            c.to = d.options.to || k;
            if (n) {
                n = a.effects.getBaseline(n, k);
                c.from.top = (k.height - c.from.height) * n.y;
                c.from.left = (k.width - c.from.width) * n.x;
                c.to.top = (k.height - c.to.height) * n.y;
                c.to.left = (k.width - c.to.width) * n.x;
            }
            var m = {
                from: {
                    y: c.from.height / k.height,
                    x: c.from.width / k.width
                },
                to: {
                    y: c.to.height / k.height,
                    x: c.to.width / k.width
                }
            };
            if (o == "box" || o == "both") {
                if (m.from.y != m.to.y) {
                    e = e.concat(b);
                    c.from = a.effects.setTransition(c, b, m.from.y, c.from);
                    c.to = a.effects.setTransition(c, b, m.to.y, c.to);
                }
                if (m.from.x != m.to.x) {
                    e = e.concat(f);
                    c.from = a.effects.setTransition(c, f, m.from.x, c.from);
                    c.to = a.effects.setTransition(c, f, m.to.x, c.to);
                }
            }
            if (o == "content" || o == "both") if (m.from.y != m.to.y) {
                e = e.concat(i);
                c.from = a.effects.setTransition(c, i, m.from.y, c.from);
                c.to = a.effects.setTransition(c, i, m.to.y, c.to);
            }
            a.effects.save(c, l ? e : h);
            c.show();
            a.effects.createWrapper(c);
            c.css("overflow", "hidden").css(c.from);
            if (o == "content" || o == "both") {
                b = b.concat([ "marginTop", "marginBottom" ]).concat(i);
                f = f.concat([ "marginLeft", "marginRight" ]);
                g = e.concat(b).concat(f);
                c.find("*[width]").each(function() {
                    child = a(this);
                    l && a.effects.save(child, g);
                    var p = {
                        height: child.height(),
                        width: child.width()
                    };
                    child.from = {
                        height: p.height * m.from.y,
                        width: p.width * m.from.x
                    };
                    child.to = {
                        height: p.height * m.to.y,
                        width: p.width * m.to.x
                    };
                    if (m.from.y != m.to.y) {
                        child.from = a.effects.setTransition(child, b, m.from.y, child.from);
                        child.to = a.effects.setTransition(child, b, m.to.y, child.to);
                    }
                    if (m.from.x != m.to.x) {
                        child.from = a.effects.setTransition(child, f, m.from.x, child.from);
                        child.to = a.effects.setTransition(child, f, m.to.x, child.to);
                    }
                    child.css(child.from);
                    child.animate(child.to, d.duration, d.options.easing, function() {
                        l && a.effects.restore(child, g);
                    });
                });
            }
            c.animate(c.to, {
                queue: false,
                duration: d.duration,
                easing: d.options.easing,
                complete: function() {
                    c.to.opacity === 0 && c.css("opacity", c.from.opacity);
                    j == "hide" && c.hide();
                    a.effects.restore(c, l ? e : h);
                    a.effects.removeWrapper(c);
                    d.callback && d.callback.apply(this, arguments);
                    c.dequeue();
                }
            });
        });
    };
})(jQuery);

(function(a) {
    a.effects.shake = function(d) {
        return this.queue(function() {
            var c = a(this), e = [ "position", "top", "bottom", "left", "right" ];
            a.effects.setMode(c, d.options.mode || "effect");
            var h = d.options.direction || "left", g = d.options.distance || 20, i = d.options.times || 3, b = d.duration || d.options.duration || 140;
            a.effects.save(c, e);
            c.show();
            a.effects.createWrapper(c);
            var f = h == "up" || h == "down" ? "top" : "left", j = h == "up" || h == "left" ? "pos" : "neg";
            h = {};
            var l = {}, o = {};
            h[f] = (j == "pos" ? "-=" : "+=") + g;
            l[f] = (j == "pos" ? "+=" : "-=") + g * 2;
            o[f] = (j == "pos" ? "-=" : "+=") + g * 2;
            c.animate(h, b, d.options.easing);
            for (g = 1; g < i; g++) c.animate(l, b, d.options.easing).animate(o, b, d.options.easing);
            c.animate(l, b, d.options.easing).animate(h, b / 2, d.options.easing, function() {
                a.effects.restore(c, e);
                a.effects.removeWrapper(c);
                d.callback && d.callback.apply(this, arguments);
            });
            c.queue("fx", function() {
                c.dequeue();
            });
            c.dequeue();
        });
    };
})(jQuery);

(function(a) {
    a.effects.slide = function(d) {
        return this.queue(function() {
            var c = a(this), e = [ "position", "top", "bottom", "left", "right" ], h = a.effects.setMode(c, d.options.mode || "show"), g = d.options.direction || "left";
            a.effects.save(c, e);
            c.show();
            a.effects.createWrapper(c).css({
                overflow: "hidden"
            });
            var i = g == "up" || g == "down" ? "top" : "left";
            g = g == "up" || g == "left" ? "pos" : "neg";
            var b = d.options.distance || (i == "top" ? c.outerHeight({
                margin: true
            }) : c.outerWidth({
                margin: true
            }));
            if (h == "show") c.css(i, g == "pos" ? isNaN(b) ? "-" + b : -b : b);
            var f = {};
            f[i] = (h == "show" ? g == "pos" ? "+=" : "-=" : g == "pos" ? "-=" : "+=") + b;
            c.animate(f, {
                queue: false,
                duration: d.duration,
                easing: d.options.easing,
                complete: function() {
                    h == "hide" && c.hide();
                    a.effects.restore(c, e);
                    a.effects.removeWrapper(c);
                    d.callback && d.callback.apply(this, arguments);
                    c.dequeue();
                }
            });
        });
    };
})(jQuery);

(function(a) {
    a.effects.transfer = function(d) {
        return this.queue(function() {
            var c = a(this), e = a(d.options.to), h = e.offset();
            e = {
                top: h.top,
                left: h.left,
                height: e.innerHeight(),
                width: e.innerWidth()
            };
            h = c.offset();
            var g = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(d.options.className).css({
                top: h.top,
                left: h.left,
                height: c.innerHeight(),
                width: c.innerWidth(),
                position: "absolute"
            }).animate(e, d.duration, d.options.easing, function() {
                g.remove();
                d.callback && d.callback.apply(c[0], arguments);
                c.dequeue();
            });
        });
    };
})(jQuery);

(function(a) {
    a.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: false,
            navigationFilter: function() {
                return this.href.toLowerCase() === location.href.toLowerCase();
            }
        },
        _create: function() {
            var d = this, c = d.options;
            d.running = 0;
            d.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
            d.headers = d.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
                c.disabled || a(this).addClass("ui-state-hover");
            }).bind("mouseleave.accordion", function() {
                c.disabled || a(this).removeClass("ui-state-hover");
            }).bind("focus.accordion", function() {
                c.disabled || a(this).addClass("ui-state-focus");
            }).bind("blur.accordion", function() {
                c.disabled || a(this).removeClass("ui-state-focus");
            });
            d.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (c.navigation) {
                var e = d.element.find("a").filter(c.navigationFilter).eq(0);
                if (e.length) {
                    var h = e.closest(".ui-accordion-header");
                    d.active = h.length ? h : e.closest(".ui-accordion-content").prev();
                }
            }
            d.active = d._findActive(d.active || c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            d.active.next().addClass("ui-accordion-content-active");
            d._createIcons();
            d.resize();
            d.element.attr("role", "tablist");
            d.headers.attr("role", "tab").bind("keydown.accordion", function(g) {
                return d._keydown(g);
            }).next().attr("role", "tabpanel");
            d.headers.not(d.active || "").attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).next().hide();
            d.active.length ? d.active.attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }) : d.headers.eq(0).attr("tabIndex", 0);
            a.browser.safari || d.headers.find("a").attr("tabIndex", -1);
            c.event && d.headers.bind(c.event.split(" ").join(".accordion ") + ".accordion", function(g) {
                d._clickHandler.call(d, g, this);
                g.preventDefault();
            });
        },
        _createIcons: function() {
            var d = this.options;
            if (d.icons) {
                a("<span></span>").addClass("ui-icon " + d.icons.header).prependTo(this.headers);
                this.active.children(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);
                this.element.addClass("ui-accordion-icons");
            }
        },
        _destroyIcons: function() {
            this.headers.children(".ui-icon").remove();
            this.element.removeClass("ui-accordion-icons");
        },
        destroy: function() {
            var d = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
            this.headers.find("a").removeAttr("tabIndex");
            this._destroyIcons();
            var c = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            if (d.autoHeight || d.fillHeight) c.css("height", "");
            return a.Widget.prototype.destroy.call(this);
        },
        _setOption: function(d, c) {
            a.Widget.prototype._setOption.apply(this, arguments);
            d == "active" && this.activate(c);
            if (d == "icons") {
                this._destroyIcons();
                c && this._createIcons();
            }
            if (d == "disabled") this.headers.add(this.headers.next())[c ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled");
        },
        _keydown: function(d) {
            if (!(this.options.disabled || d.altKey || d.ctrlKey)) {
                var c = a.ui.keyCode, e = this.headers.length, h = this.headers.index(d.target), g = false;
                switch (d.keyCode) {
                  case c.RIGHT:
                  case c.DOWN:
                    g = this.headers[(h + 1) % e];
                    break;

                  case c.LEFT:
                  case c.UP:
                    g = this.headers[(h - 1 + e) % e];
                    break;

                  case c.SPACE:
                  case c.ENTER:
                    this._clickHandler({
                        target: d.target
                    }, d.target);
                    d.preventDefault();
                }
                if (g) {
                    a(d.target).attr("tabIndex", -1);
                    a(g).attr("tabIndex", 0);
                    g.focus();
                    return false;
                }
                return true;
            }
        },
        resize: function() {
            var d = this.options, c;
            if (d.fillSpace) {
                if (a.browser.msie) {
                    var e = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden");
                }
                c = this.element.parent().height();
                a.browser.msie && this.element.parent().css("overflow", e);
                this.headers.each(function() {
                    c -= a(this).outerHeight(true);
                });
                this.headers.next().each(function() {
                    a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()));
                }).css("overflow", "auto");
            } else if (d.autoHeight) {
                c = 0;
                this.headers.next().each(function() {
                    c = Math.max(c, a(this).height("").height());
                }).height(c);
            }
            return this;
        },
        activate: function(d) {
            this.options.active = d;
            d = this._findActive(d)[0];
            this._clickHandler({
                target: d
            }, d);
            return this;
        },
        _findActive: function(d) {
            return d ? typeof d === "number" ? this.headers.filter(":eq(" + d + ")") : this.headers.not(this.headers.not(d)) : d === false ? a([]) : this.headers.filter(":eq(0)");
        },
        _clickHandler: function(d, c) {
            var e = this.options;
            if (!e.disabled) if (d.target) {
                d = a(d.currentTarget || c);
                c = d[0] === this.active[0];
                e.active = e.collapsible && c ? false : this.headers.index(d);
                if (!(this.running || !e.collapsible && c)) {
                    var h = this.active;
                    f = d.next();
                    i = this.active.next();
                    b = {
                        options: e,
                        newHeader: c && e.collapsible ? a([]) : d,
                        oldHeader: this.active,
                        newContent: c && e.collapsible ? a([]) : f,
                        oldContent: i
                    };
                    var g = this.headers.index(this.active[0]) > this.headers.index(d[0]);
                    this.active = c ? a([]) : d;
                    this._toggle(f, i, b, c, g);
                    h.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header);
                    if (!c) {
                        d.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(e.icons.header).addClass(e.icons.headerSelected);
                        d.next().addClass("ui-accordion-content-active");
                    }
                }
            } else if (e.collapsible) {
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var i = this.active.next(), b = {
                    options: e,
                    newHeader: a([]),
                    oldHeader: e.active,
                    newContent: a([]),
                    oldContent: i
                }, f = this.active = a([]);
                this._toggle(f, i, b);
            }
        },
        _toggle: function(d, c, e, h, g) {
            var i = this, b = i.options;
            i.toShow = d;
            i.toHide = c;
            i.data = e;
            var f = function() {
                if (i) return i._completed.apply(i, arguments);
            };
            i._trigger("changestart", null, i.data);
            i.running = c.size() === 0 ? d.size() : c.size();
            if (b.animated) {
                e = {};
                e = b.collapsible && h ? {
                    toShow: a([]),
                    toHide: c,
                    complete: f,
                    down: g,
                    autoHeight: b.autoHeight || b.fillSpace
                } : {
                    toShow: d,
                    toHide: c,
                    complete: f,
                    down: g,
                    autoHeight: b.autoHeight || b.fillSpace
                };
                if (!b.proxied) b.proxied = b.animated;
                if (!b.proxiedDuration) b.proxiedDuration = b.duration;
                b.animated = a.isFunction(b.proxied) ? b.proxied(e) : b.proxied;
                b.duration = a.isFunction(b.proxiedDuration) ? b.proxiedDuration(e) : b.proxiedDuration;
                h = a.ui.accordion.animations;
                var j = b.duration, l = b.animated;
                if (l && !h[l] && !a.easing[l]) l = "slide";
                h[l] || (h[l] = function(o) {
                    this.slide(o, {
                        easing: l,
                        duration: j || 700
                    });
                });
                h[l](e);
            } else {
                if (b.collapsible && h) d.toggle(); else {
                    c.hide();
                    d.show();
                }
                f(true);
            }
            c.prev().attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).blur();
            d.prev().attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }).focus();
        },
        _completed: function(d) {
            this.running = d ? 0 : --this.running;
            if (!this.running) {
                this.options.clearStyle && this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                });
                this.toHide.removeClass("ui-accordion-content-active");
                if (this.toHide.length) this.toHide.parent()[0].className = this.toHide.parent()[0].className;
                this._trigger("change", null, this.data);
            }
        }
    });
    a.extend(a.ui.accordion, {
        version: "1.8.16",
        animations: {
            slide: function(d, c) {
                d = a.extend({
                    easing: "swing",
                    duration: 300
                }, d, c);
                if (d.toHide.size()) if (d.toShow.size()) {
                    var e = d.toShow.css("overflow"), h = 0, g = {}, i = {}, b;
                    c = d.toShow;
                    b = c[0].style.width;
                    c.width(parseInt(c.parent().width(), 10) - parseInt(c.css("paddingLeft"), 10) - parseInt(c.css("paddingRight"), 10) - (parseInt(c.css("borderLeftWidth"), 10) || 0) - (parseInt(c.css("borderRightWidth"), 10) || 0));
                    a.each([ "height", "paddingTop", "paddingBottom" ], function(f, j) {
                        i[j] = "hide";
                        f = ("" + a.css(d.toShow[0], j)).match(/^([\d+-.]+)(.*)$/);
                        g[j] = {
                            value: f[1],
                            unit: f[2] || "px"
                        };
                    });
                    d.toShow.css({
                        height: 0,
                        overflow: "hidden"
                    }).show();
                    d.toHide.filter(":hidden").each(d.complete).end().filter(":visible").animate(i, {
                        step: function(f, j) {
                            if (j.prop == "height") h = j.end - j.start === 0 ? 0 : (j.now - j.start) / (j.end - j.start);
                            d.toShow[0].style[j.prop] = h * g[j.prop].value + g[j.prop].unit;
                        },
                        duration: d.duration,
                        easing: d.easing,
                        complete: function() {
                            d.autoHeight || d.toShow.css("height", "");
                            d.toShow.css({
                                width: b,
                                overflow: e
                            });
                            d.complete();
                        }
                    });
                } else d.toHide.animate({
                    height: "hide",
                    paddingTop: "hide",
                    paddingBottom: "hide"
                }, d); else d.toShow.animate({
                    height: "show",
                    paddingTop: "show",
                    paddingBottom: "show"
                }, d);
            },
            bounceslide: function(d) {
                this.slide(d, {
                    easing: d.down ? "easeOutBounce" : "swing",
                    duration: d.down ? 1e3 : 200
                });
            }
        }
    });
})(jQuery);

(function(a) {
    var d = 0;
    a.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null
        },
        pending: 0,
        _create: function() {
            var c = this, e = this.element[0].ownerDocument, h;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function(g) {
                if (!(c.options.disabled || c.element.propAttr("readOnly"))) {
                    h = false;
                    var i = a.ui.keyCode;
                    switch (g.keyCode) {
                      case i.PAGE_UP:
                        c._move("previousPage", g);
                        break;

                      case i.PAGE_DOWN:
                        c._move("nextPage", g);
                        break;

                      case i.UP:
                        c._move("previous", g);
                        g.preventDefault();
                        break;

                      case i.DOWN:
                        c._move("next", g);
                        g.preventDefault();
                        break;

                      case i.ENTER:
                      case i.NUMPAD_ENTER:
                        if (c.menu.active) {
                            h = true;
                            g.preventDefault();
                        }

                      case i.TAB:
                        if (!c.menu.active) return;
                        c.menu.select(g);
                        break;

                      case i.ESCAPE:
                        c.element.val(c.term);
                        c.close(g);
                        break;

                      default:
                        clearTimeout(c.searching);
                        c.searching = setTimeout(function() {
                            if (c.term != c.element.val()) {
                                c.selectedItem = null;
                                c.search(null, g);
                            }
                        }, c.options.delay);
                        break;
                    }
                }
            }).bind("keypress.autocomplete", function(g) {
                if (h) {
                    h = false;
                    g.preventDefault();
                }
            }).bind("focus.autocomplete", function() {
                if (!c.options.disabled) {
                    c.selectedItem = null;
                    c.previous = c.element.val();
                }
            }).bind("blur.autocomplete", function(g) {
                if (!c.options.disabled) {
                    clearTimeout(c.searching);
                    c.closing = setTimeout(function() {
                        c.close(g);
                        c._change(g);
                    }, 150);
                }
            });
            this._initSource();
            this.response = function() {
                return c._response.apply(c, arguments);
            };
            this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo || "body", e)[0]).mousedown(function(g) {
                var i = c.menu.element[0];
                a(g.target).closest(".ui-menu-item").length || setTimeout(function() {
                    a(document).one("mousedown", function(b) {
                        b.target !== c.element[0] && b.target !== i && !a.ui.contains(i, b.target) && c.close();
                    });
                }, 1);
                setTimeout(function() {
                    clearTimeout(c.closing);
                }, 13);
            }).menu({
                focus: function(g, i) {
                    i = i.item.data("item.autocomplete");
                    false !== c._trigger("focus", g, {
                        item: i
                    }) && /^key/.test(g.originalEvent.type) && c.element.val(i.value);
                },
                selected: function(g, i) {
                    var b = i.item.data("item.autocomplete"), f = c.previous;
                    if (c.element[0] !== e.activeElement) {
                        c.element.focus();
                        c.previous = f;
                        setTimeout(function() {
                            c.previous = f;
                            c.selectedItem = b;
                        }, 1);
                    }
                    false !== c._trigger("select", g, {
                        item: b
                    }) && c.element.val(b.value);
                    c.term = c.element.val();
                    c.close(g);
                    c.selectedItem = b;
                },
                blur: function() {
                    c.menu.element.is(":visible") && c.element.val() !== c.term && c.element.val(c.term);
                }
            }).zIndex(this.element.zIndex() + 1).css({
                top: 0,
                left: 0
            }).hide().data("menu");
            a.fn.bgiframe && this.menu.element.bgiframe();
        },
        destroy: function() {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove();
            a.Widget.prototype.destroy.call(this);
        },
        _setOption: function(c, e) {
            a.Widget.prototype._setOption.apply(this, arguments);
            c === "source" && this._initSource();
            if (c === "appendTo") this.menu.element.appendTo(a(e || "body", this.element[0].ownerDocument)[0]);
            c === "disabled" && e && this.xhr && this.xhr.abort();
        },
        _initSource: function() {
            var c = this, e, h;
            if (a.isArray(this.options.source)) {
                e = this.options.source;
                this.source = function(g, i) {
                    i(a.ui.autocomplete.filter(e, g.term));
                };
            } else if (typeof this.options.source === "string") {
                h = this.options.source;
                this.source = function(g, i) {
                    c.xhr && c.xhr.abort();
                    c.xhr = a.ajax({
                        url: h,
                        data: g,
                        dataType: "json",
                        autocompleteRequest: ++d,
                        success: function(b) {
                            this.autocompleteRequest === d && i(b);
                        },
                        error: function() {
                            this.autocompleteRequest === d && i([]);
                        }
                    });
                };
            } else this.source = this.options.source;
        },
        search: function(c, e) {
            c = c != null ? c : this.element.val();
            this.term = this.element.val();
            if (c.length < this.options.minLength) return this.close(e);
            clearTimeout(this.closing);
            if (this._trigger("search", e) !== false) return this._search(c);
        },
        _search: function(c) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.source({
                term: c
            }, this.response);
        },
        _response: function(c) {
            if (!this.options.disabled && c && c.length) {
                c = this._normalize(c);
                this._suggest(c);
                this._trigger("open");
            } else this.close();
            this.pending--;
            this.pending || this.element.removeClass("ui-autocomplete-loading");
        },
        close: function(c) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.deactivate();
                this._trigger("close", c);
            }
        },
        _change: function(c) {
            this.previous !== this.element.val() && this._trigger("change", c, {
                item: this.selectedItem
            });
        },
        _normalize: function(c) {
            if (c.length && c[0].label && c[0].value) return c;
            return a.map(c, function(e) {
                if (typeof e === "string") return {
                    label: e,
                    value: e
                };
                return a.extend({
                    label: e.label || e.value,
                    value: e.value || e.label
                }, e);
            });
        },
        _suggest: function(c) {
            var e = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(e, c);
            this.menu.deactivate();
            this.menu.refresh();
            e.show();
            this._resizeMenu();
            e.position(a.extend({
                of: this.element
            }, this.options.position));
            this.options.autoFocus && this.menu.next(new a.Event("mouseover"));
        },
        _resizeMenu: function() {
            var c = this.menu.element;
            c.outerWidth(Math.max(c.width("").outerWidth(), this.element.outerWidth()));
        },
        _renderMenu: function(c, e) {
            var h = this;
            a.each(e, function(g, i) {
                h._renderItem(c, i);
            });
        },
        _renderItem: function(c, e) {
            return a("<li></li>").data("item.autocomplete", e).append(a("<a></a>").text(e.label)).appendTo(c);
        },
        _move: function(c, e) {
            if (this.menu.element.is(":visible")) if (this.menu.first() && /^previous/.test(c) || this.menu.last() && /^next/.test(c)) {
                this.element.val(this.term);
                this.menu.deactivate();
            } else this.menu[c](e); else this.search(null, e);
        },
        widget: function() {
            return this.menu.element;
        }
    });
    a.extend(a.ui.autocomplete, {
        escapeRegex: function(c) {
            return c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        },
        filter: function(c, e) {
            var h = new RegExp(a.ui.autocomplete.escapeRegex(e), "i");
            return a.grep(c, function(g) {
                return h.test(g.label || g.value || g);
            });
        }
    });
})(jQuery);

(function(a) {
    a.widget("ui.menu", {
        _create: function() {
            var d = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function(c) {
                if (a(c.target).closest(".ui-menu-item a").length) {
                    c.preventDefault();
                    d.select(c);
                }
            });
            this.refresh();
        },
        refresh: function() {
            var d = this;
            this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(c) {
                d.activate(c, a(this).parent());
            }).mouseleave(function() {
                d.deactivate();
            });
        },
        activate: function(d, c) {
            this.deactivate();
            if (this.hasScroll()) {
                var e = c.offset().top - this.element.offset().top, h = this.element.scrollTop(), g = this.element.height();
                if (e < 0) this.element.scrollTop(h + e); else e >= g && this.element.scrollTop(h + e - g + c.height());
            }
            this.active = c.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
            this._trigger("focus", d, {
                item: c
            });
        },
        deactivate: function() {
            if (this.active) {
                this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
                this._trigger("blur");
                this.active = null;
            }
        },
        next: function(d) {
            this.move("next", ".ui-menu-item:first", d);
        },
        previous: function(d) {
            this.move("prev", ".ui-menu-item:last", d);
        },
        first: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        last: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        move: function(d, c, e) {
            if (this.active) {
                d = this.active[d + "All"](".ui-menu-item").eq(0);
                d.length ? this.activate(e, d) : this.activate(e, this.element.children(c));
            } else this.activate(e, this.element.children(c));
        },
        nextPage: function(d) {
            if (this.hasScroll()) if (!this.active || this.last()) this.activate(d, this.element.children(".ui-menu-item:first")); else {
                var c = this.active.offset().top, e = this.element.height(), h = this.element.children(".ui-menu-item").filter(function() {
                    var g = a(this).offset().top - c - e + a(this).height();
                    return g < 10 && g > -10;
                });
                h.length || (h = this.element.children(".ui-menu-item:last"));
                this.activate(d, h);
            } else this.activate(d, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"));
        },
        previousPage: function(d) {
            if (this.hasScroll()) if (!this.active || this.first()) this.activate(d, this.element.children(".ui-menu-item:last")); else {
                var c = this.active.offset().top, e = this.element.height();
                result = this.element.children(".ui-menu-item").filter(function() {
                    var h = a(this).offset().top - c + e - a(this).height();
                    return h < 10 && h > -10;
                });
                result.length || (result = this.element.children(".ui-menu-item:first"));
                this.activate(d, result);
            } else this.activate(d, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"));
        },
        hasScroll: function() {
            return this.element.height() < this.element[a.fn.prop ? "prop" : "attr"]("scrollHeight");
        },
        select: function(d) {
            this._trigger("selected", d, {
                item: this.active
            });
        }
    });
})(jQuery);

(function(a) {
    var d, c, e, h, g = function() {
        var b = a(this).find(":ui-button");
        setTimeout(function() {
            b.button("refresh");
        }, 1);
    }, i = function(b) {
        var f = b.name, j = b.form, l = a([]);
        if (f) l = j ? a(j).find("[name='" + f + "']") : a("[name='" + f + "']", b.ownerDocument).filter(function() {
            return !this.form;
        });
        return l;
    };
    a.widget("ui.button", {
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset.button").bind("reset.button", g);
            if (typeof this.options.disabled !== "boolean") this.options.disabled = this.element.propAttr("disabled");
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var b = this, f = this.options, j = this.type === "checkbox" || this.type === "radio", l = "ui-state-hover" + (!j ? " ui-state-active" : "");
            if (f.label === null) f.label = this.buttonElement.html();
            if (this.element.is(":disabled")) f.disabled = true;
            this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role", "button").bind("mouseenter.button", function() {
                if (!f.disabled) {
                    a(this).addClass("ui-state-hover");
                    this === d && a(this).addClass("ui-state-active");
                }
            }).bind("mouseleave.button", function() {
                f.disabled || a(this).removeClass(l);
            }).bind("click.button", function(o) {
                if (f.disabled) {
                    o.preventDefault();
                    o.stopImmediatePropagation();
                }
            });
            this.element.bind("focus.button", function() {
                b.buttonElement.addClass("ui-state-focus");
            }).bind("blur.button", function() {
                b.buttonElement.removeClass("ui-state-focus");
            });
            if (j) {
                this.element.bind("change.button", function() {
                    h || b.refresh();
                });
                this.buttonElement.bind("mousedown.button", function(o) {
                    if (!f.disabled) {
                        h = false;
                        c = o.pageX;
                        e = o.pageY;
                    }
                }).bind("mouseup.button", function(o) {
                    if (!f.disabled) if (c !== o.pageX || e !== o.pageY) h = true;
                });
            }
            if (this.type === "checkbox") this.buttonElement.bind("click.button", function() {
                if (f.disabled || h) return false;
                a(this).toggleClass("ui-state-active");
                b.buttonElement.attr("aria-pressed", b.element[0].checked);
            }); else if (this.type === "radio") this.buttonElement.bind("click.button", function() {
                if (f.disabled || h) return false;
                a(this).addClass("ui-state-active");
                b.buttonElement.attr("aria-pressed", "true");
                var o = b.element[0];
                i(o).not(o).map(function() {
                    return a(this).button("widget")[0];
                }).removeClass("ui-state-active").attr("aria-pressed", "false");
            }); else {
                this.buttonElement.bind("mousedown.button", function() {
                    if (f.disabled) return false;
                    a(this).addClass("ui-state-active");
                    d = this;
                    a(document).one("mouseup", function() {
                        d = null;
                    });
                }).bind("mouseup.button", function() {
                    if (f.disabled) return false;
                    a(this).removeClass("ui-state-active");
                }).bind("keydown.button", function(o) {
                    if (f.disabled) return false;
                    if (o.keyCode == a.ui.keyCode.SPACE || o.keyCode == a.ui.keyCode.ENTER) a(this).addClass("ui-state-active");
                }).bind("keyup.button", function() {
                    a(this).removeClass("ui-state-active");
                });
                this.buttonElement.is("a") && this.buttonElement.keyup(function(o) {
                    o.keyCode === a.ui.keyCode.SPACE && a(this).click();
                });
            }
            this._setOption("disabled", f.disabled);
            this._resetButton();
        },
        _determineButtonType: function() {
            this.type = this.element.is(":checkbox") ? "checkbox" : this.element.is(":radio") ? "radio" : this.element.is("input") ? "input" : "button";
            if (this.type === "checkbox" || this.type === "radio") {
                var b = this.element.parents().filter(":last"), f = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = b.find(f);
                if (!this.buttonElement.length) {
                    b = b.length ? b.siblings() : this.element.siblings();
                    this.buttonElement = b.filter(f);
                    if (!this.buttonElement.length) this.buttonElement = b.find(f);
                }
                this.element.addClass("ui-helper-hidden-accessible");
                (b = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active");
                this.buttonElement.attr("aria-pressed", b);
            } else this.buttonElement = this.element;
        },
        widget: function() {
            return this.buttonElement;
        },
        destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            this.hasTitle || this.buttonElement.removeAttr("title");
            a.Widget.prototype.destroy.call(this);
        },
        _setOption: function(b, f) {
            a.Widget.prototype._setOption.apply(this, arguments);
            if (b === "disabled") f ? this.element.propAttr("disabled", true) : this.element.propAttr("disabled", false); else this._resetButton();
        },
        refresh: function() {
            var b = this.element.is(":disabled");
            b !== this.options.disabled && this._setOption("disabled", b);
            if (this.type === "radio") i(this.element[0]).each(function() {
                a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
            }); else if (this.type === "checkbox") this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false");
        },
        _resetButton: function() {
            if (this.type === "input") this.options.label && this.element.val(this.options.label); else {
                var b = this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"), f = a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(), j = this.options.icons, l = j.primary && j.secondary, o = [];
                if (j.primary || j.secondary) {
                    if (this.options.text) o.push("ui-button-text-icon" + (l ? "s" : j.primary ? "-primary" : "-secondary"));
                    j.primary && b.prepend("<span class='ui-button-icon-primary ui-icon " + j.primary + "'></span>");
                    j.secondary && b.append("<span class='ui-button-icon-secondary ui-icon " + j.secondary + "'></span>");
                    if (!this.options.text) {
                        o.push(l ? "ui-button-icons-only" : "ui-button-icon-only");
                        this.hasTitle || b.attr("title", f);
                    }
                } else o.push("ui-button-text-only");
                b.addClass(o.join(" "));
            }
        }
    });
    a.widget("ui.buttonset", {
        options: {
            items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset");
        },
        _init: function() {
            this.refresh();
        },
        _setOption: function(b, f) {
            b === "disabled" && this.buttons.button("option", b, f);
            a.Widget.prototype._setOption.apply(this, arguments);
        },
        refresh: function() {
            var b = this.element.css("direction") === "ltr";
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return a(this).button("widget")[0];
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-left" : "ui-corner-right").end().filter(":last").addClass(b ? "ui-corner-right" : "ui-corner-left").end().end();
        },
        destroy: function() {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function() {
                return a(this).button("widget")[0];
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
            a.Widget.prototype.destroy.call(this);
        }
    });
})(jQuery);

(function(a, d) {
    function c() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._inDialog = this._datepickerShowing = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        a.extend(this._defaults, this.regional[""]);
        this.dpDiv = e(a('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
    }
    function e(b) {
        return b.bind("mouseout", function(f) {
            f = a(f.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");
            f.length && f.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover");
        }).bind("mouseover", function(f) {
            f = a(f.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");
            if (!(a.datepicker._isDisabledDatepicker(i.inline ? b.parent()[0] : i.input[0]) || !f.length)) {
                f.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                f.addClass("ui-state-hover");
                f.hasClass("ui-datepicker-prev") && f.addClass("ui-datepicker-prev-hover");
                f.hasClass("ui-datepicker-next") && f.addClass("ui-datepicker-next-hover");
            }
        });
    }
    function h(b, f) {
        a.extend(b, f);
        for (var j in f) if (f[j] == null || f[j] == d) b[j] = f[j];
        return b;
    }
    a.extend(a.ui, {
        datepicker: {
            version: "1.8.16"
        }
    });
    var g = new Date().getTime(), i;
    a.extend(c.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function() {
            this.debug && console.log.apply("", arguments);
        },
        _widgetDatepicker: function() {
            return this.dpDiv;
        },
        setDefaults: function(b) {
            h(this._defaults, b || {});
            return this;
        },
        _attachDatepicker: function(b, f) {
            var j = null;
            for (var l in this._defaults) {
                var o = b.getAttribute("date:" + l);
                if (o) {
                    j = j || {};
                    try {
                        j[l] = eval(o);
                    } catch (n) {
                        j[l] = o;
                    }
                }
            }
            l = b.nodeName.toLowerCase();
            o = l == "div" || l == "span";
            if (!b.id) {
                this.uuid += 1;
                b.id = "dp" + this.uuid;
            }
            var k = this._newInst(a(b), o);
            k.settings = a.extend({}, f || {}, j || {});
            if (l == "input") this._connectDatepicker(b, k); else o && this._inlineDatepicker(b, k);
        },
        _newInst: function(b, f) {
            return {
                id: b[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
                input: b,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: f,
                dpDiv: !f ? this.dpDiv : e(a('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
            };
        },
        _connectDatepicker: function(b, f) {
            var j = a(b);
            f.append = a([]);
            f.trigger = a([]);
            if (!j.hasClass(this.markerClassName)) {
                this._attachments(j, f);
                j.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(l, o, n) {
                    f.settings[o] = n;
                }).bind("getData.datepicker", function(l, o) {
                    return this._get(f, o);
                });
                this._autoSize(f);
                a.data(b, "datepicker", f);
                f.settings.disabled && this._disableDatepicker(b);
            }
        },
        _attachments: function(b, f) {
            var j = this._get(f, "appendText"), l = this._get(f, "isRTL");
            f.append && f.append.remove();
            if (j) {
                f.append = a('<span class="' + this._appendClass + '">' + j + "</span>");
                b[l ? "before" : "after"](f.append);
            }
            b.unbind("focus", this._showDatepicker);
            f.trigger && f.trigger.remove();
            j = this._get(f, "showOn");
            if (j == "focus" || j == "both") b.focus(this._showDatepicker);
            if (j == "button" || j == "both") {
                j = this._get(f, "buttonText");
                var o = this._get(f, "buttonImage");
                f.trigger = a(this._get(f, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
                    src: o,
                    alt: j,
                    title: j
                }) : a('<button type="button"></button>').addClass(this._triggerClass).html(o == "" ? j : a("<img/>").attr({
                    src: o,
                    alt: j,
                    title: j
                })));
                b[l ? "before" : "after"](f.trigger);
                f.trigger.click(function() {
                    a.datepicker._datepickerShowing && a.datepicker._lastInput == b[0] ? a.datepicker._hideDatepicker() : a.datepicker._showDatepicker(b[0]);
                    return false;
                });
            }
        },
        _autoSize: function(b) {
            if (this._get(b, "autoSize") && !b.inline) {
                var f = new Date(2009, 11, 20), j = this._get(b, "dateFormat");
                if (j.match(/[DM]/)) {
                    var l = function(o) {
                        for (var n = 0, k = 0, m = 0; m < o.length; m++) if (o[m].length > n) {
                            n = o[m].length;
                            k = m;
                        }
                        return k;
                    };
                    f.setMonth(l(this._get(b, j.match(/MM/) ? "monthNames" : "monthNamesShort")));
                    f.setDate(l(this._get(b, j.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay());
                }
                b.input.attr("size", this._formatDate(b, f).length);
            }
        },
        _inlineDatepicker: function(b, f) {
            var j = a(b);
            if (!j.hasClass(this.markerClassName)) {
                j.addClass(this.markerClassName).append(f.dpDiv).bind("setData.datepicker", function(l, o, n) {
                    f.settings[o] = n;
                }).bind("getData.datepicker", function(l, o) {
                    return this._get(f, o);
                });
                a.data(b, "datepicker", f);
                this._setDate(f, this._getDefaultDate(f), true);
                this._updateDatepicker(f);
                this._updateAlternate(f);
                f.settings.disabled && this._disableDatepicker(b);
                f.dpDiv.css("display", "block");
            }
        },
        _dialogDatepicker: function(b, f, j, l, o) {
            b = this._dialogInst;
            if (!b) {
                this.uuid += 1;
                this._dialogInput = a('<input type="text" id="' + ("dp" + this.uuid) + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                a("body").append(this._dialogInput);
                b = this._dialogInst = this._newInst(this._dialogInput, false);
                b.settings = {};
                a.data(this._dialogInput[0], "datepicker", b);
            }
            h(b.settings, l || {});
            f = f && f.constructor == Date ? this._formatDate(b, f) : f;
            this._dialogInput.val(f);
            this._pos = o ? o.length ? o : [ o.pageX, o.pageY ] : null;
            if (!this._pos) this._pos = [ document.documentElement.clientWidth / 2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop) ];
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
            b.settings.onSelect = j;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            a.blockUI && a.blockUI(this.dpDiv);
            a.data(this._dialogInput[0], "datepicker", b);
            return this;
        },
        _destroyDatepicker: function(b) {
            var f = a(b), j = a.data(b, "datepicker");
            if (f.hasClass(this.markerClassName)) {
                var l = b.nodeName.toLowerCase();
                a.removeData(b, "datepicker");
                if (l == "input") {
                    j.append.remove();
                    j.trigger.remove();
                    f.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp);
                } else if (l == "div" || l == "span") f.removeClass(this.markerClassName).empty();
            }
        },
        _enableDatepicker: function(b) {
            var f = a(b), j = a.data(b, "datepicker");
            if (f.hasClass(this.markerClassName)) {
                var l = b.nodeName.toLowerCase();
                if (l == "input") {
                    b.disabled = false;
                    j.trigger.filter("button").each(function() {
                        this.disabled = false;
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    });
                } else if (l == "div" || l == "span") {
                    f = f.children("." + this._inlineClass);
                    f.children().removeClass("ui-state-disabled");
                    f.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled");
                }
                this._disabledInputs = a.map(this._disabledInputs, function(o) {
                    return o == b ? null : o;
                });
            }
        },
        _disableDatepicker: function(b) {
            var f = a(b), j = a.data(b, "datepicker");
            if (f.hasClass(this.markerClassName)) {
                var l = b.nodeName.toLowerCase();
                if (l == "input") {
                    b.disabled = true;
                    j.trigger.filter("button").each(function() {
                        this.disabled = true;
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    });
                } else if (l == "div" || l == "span") {
                    f = f.children("." + this._inlineClass);
                    f.children().addClass("ui-state-disabled");
                    f.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled");
                }
                this._disabledInputs = a.map(this._disabledInputs, function(o) {
                    return o == b ? null : o;
                });
                this._disabledInputs[this._disabledInputs.length] = b;
            }
        },
        _isDisabledDatepicker: function(b) {
            if (!b) return false;
            for (var f = 0; f < this._disabledInputs.length; f++) if (this._disabledInputs[f] == b) return true;
            return false;
        },
        _getInst: function(b) {
            try {
                return a.data(b, "datepicker");
            } catch (f) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(b, f, j) {
            var l = this._getInst(b);
            if (arguments.length == 2 && typeof f == "string") return f == "defaults" ? a.extend({}, a.datepicker._defaults) : l ? f == "all" ? a.extend({}, l.settings) : this._get(l, f) : null;
            var o = f || {};
            if (typeof f == "string") {
                o = {};
                o[f] = j;
            }
            if (l) {
                this._curInst == l && this._hideDatepicker();
                var n = this._getDateDatepicker(b, true), k = this._getMinMaxDate(l, "min"), m = this._getMinMaxDate(l, "max");
                h(l.settings, o);
                if (k !== null && o.dateFormat !== d && o.minDate === d) l.settings.minDate = this._formatDate(l, k);
                if (m !== null && o.dateFormat !== d && o.maxDate === d) l.settings.maxDate = this._formatDate(l, m);
                this._attachments(a(b), l);
                this._autoSize(l);
                this._setDate(l, n);
                this._updateAlternate(l);
                this._updateDatepicker(l);
            }
        },
        _changeDatepicker: function(b, f, j) {
            this._optionDatepicker(b, f, j);
        },
        _refreshDatepicker: function(b) {
            (b = this._getInst(b)) && this._updateDatepicker(b);
        },
        _setDateDatepicker: function(b, f) {
            if (b = this._getInst(b)) {
                this._setDate(b, f);
                this._updateDatepicker(b);
                this._updateAlternate(b);
            }
        },
        _getDateDatepicker: function(b, f) {
            (b = this._getInst(b)) && !b.inline && this._setDateFromField(b, f);
            return b ? this._getDate(b) : null;
        },
        _doKeyDown: function(b) {
            var f = a.datepicker._getInst(b.target), j = true, l = f.dpDiv.is(".ui-datepicker-rtl");
            f._keyEvent = true;
            if (a.datepicker._datepickerShowing) switch (b.keyCode) {
              case 9:
                a.datepicker._hideDatepicker();
                j = false;
                break;

              case 13:
                j = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", f.dpDiv);
                j[0] && a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, j[0]);
                if (b = a.datepicker._get(f, "onSelect")) {
                    j = a.datepicker._formatDate(f);
                    b.apply(f.input ? f.input[0] : null, [ j, f ]);
                } else a.datepicker._hideDatepicker();
                return false;

              case 27:
                a.datepicker._hideDatepicker();
                break;

              case 33:
                a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                break;

              case 34:
                a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                break;

              case 35:
                if (b.ctrlKey || b.metaKey) a.datepicker._clearDate(b.target);
                j = b.ctrlKey || b.metaKey;
                break;

              case 36:
                if (b.ctrlKey || b.metaKey) a.datepicker._gotoToday(b.target);
                j = b.ctrlKey || b.metaKey;
                break;

              case 37:
                if (b.ctrlKey || b.metaKey) a.datepicker._adjustDate(b.target, l ? +1 : -1, "D");
                j = b.ctrlKey || b.metaKey;
                if (b.originalEvent.altKey) a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
                break;

              case 38:
                if (b.ctrlKey || b.metaKey) a.datepicker._adjustDate(b.target, -7, "D");
                j = b.ctrlKey || b.metaKey;
                break;

              case 39:
                if (b.ctrlKey || b.metaKey) a.datepicker._adjustDate(b.target, l ? -1 : +1, "D");
                j = b.ctrlKey || b.metaKey;
                if (b.originalEvent.altKey) a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
                break;

              case 40:
                if (b.ctrlKey || b.metaKey) a.datepicker._adjustDate(b.target, +7, "D");
                j = b.ctrlKey || b.metaKey;
                break;

              default:
                j = false;
            } else if (b.keyCode == 36 && b.ctrlKey) a.datepicker._showDatepicker(this); else j = false;
            if (j) {
                b.preventDefault();
                b.stopPropagation();
            }
        },
        _doKeyPress: function(b) {
            var f = a.datepicker._getInst(b.target);
            if (a.datepicker._get(f, "constrainInput")) {
                f = a.datepicker._possibleChars(a.datepicker._get(f, "dateFormat"));
                var j = String.fromCharCode(b.charCode == d ? b.keyCode : b.charCode);
                return b.ctrlKey || b.metaKey || j < " " || !f || f.indexOf(j) > -1;
            }
        },
        _doKeyUp: function(b) {
            b = a.datepicker._getInst(b.target);
            if (b.input.val() != b.lastVal) try {
                if (a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, a.datepicker._getFormatConfig(b))) {
                    a.datepicker._setDateFromField(b);
                    a.datepicker._updateAlternate(b);
                    a.datepicker._updateDatepicker(b);
                }
            } catch (f) {
                a.datepicker.log(f);
            }
            return true;
        },
        _showDatepicker: function(b) {
            b = b.target || b;
            if (b.nodeName.toLowerCase() != "input") b = a("input", b.parentNode)[0];
            if (!(a.datepicker._isDisabledDatepicker(b) || a.datepicker._lastInput == b)) {
                var f = a.datepicker._getInst(b);
                if (a.datepicker._curInst && a.datepicker._curInst != f) {
                    a.datepicker._datepickerShowing && a.datepicker._triggerOnClose(a.datepicker._curInst);
                    a.datepicker._curInst.dpDiv.stop(true, true);
                }
                var j = a.datepicker._get(f, "beforeShow");
                j = j ? j.apply(b, [ b, f ]) : {};
                if (j !== false) {
                    h(f.settings, j);
                    f.lastVal = null;
                    a.datepicker._lastInput = b;
                    a.datepicker._setDateFromField(f);
                    if (a.datepicker._inDialog) b.value = "";
                    if (!a.datepicker._pos) {
                        a.datepicker._pos = a.datepicker._findPos(b);
                        a.datepicker._pos[1] += b.offsetHeight;
                    }
                    var l = false;
                    a(b).parents().each(function() {
                        l |= a(this).css("position") == "fixed";
                        return !l;
                    });
                    if (l && a.browser.opera) {
                        a.datepicker._pos[0] -= document.documentElement.scrollLeft;
                        a.datepicker._pos[1] -= document.documentElement.scrollTop;
                    }
                    j = {
                        left: a.datepicker._pos[0],
                        top: a.datepicker._pos[1]
                    };
                    a.datepicker._pos = null;
                    f.dpDiv.empty();
                    f.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    });
                    a.datepicker._updateDatepicker(f);
                    j = a.datepicker._checkOffset(f, j, l);
                    f.dpDiv.css({
                        position: a.datepicker._inDialog && a.blockUI ? "static" : l ? "fixed" : "absolute",
                        display: "none",
                        left: j.left + "px",
                        top: j.top + "px"
                    });
                    if (!f.inline) {
                        j = a.datepicker._get(f, "showAnim");
                        var o = a.datepicker._get(f, "duration"), n = function() {
                            var k = f.dpDiv.find("iframe.ui-datepicker-cover");
                            if (k.length) {
                                var m = a.datepicker._getBorders(f.dpDiv);
                                k.css({
                                    left: -m[0],
                                    top: -m[1],
                                    width: f.dpDiv.outerWidth(),
                                    height: f.dpDiv.outerHeight()
                                });
                            }
                        };
                        f.dpDiv.zIndex(a(b).zIndex() + 1);
                        a.datepicker._datepickerShowing = true;
                        a.effects && a.effects[j] ? f.dpDiv.show(j, a.datepicker._get(f, "showOptions"), o, n) : f.dpDiv[j || "show"](j ? o : null, n);
                        if (!j || !o) n();
                        f.input.is(":visible") && !f.input.is(":disabled") && f.input.focus();
                        a.datepicker._curInst = f;
                    }
                }
            }
        },
        _updateDatepicker: function(b) {
            this.maxRows = 4;
            var f = a.datepicker._getBorders(b.dpDiv);
            i = b;
            b.dpDiv.empty().append(this._generateHTML(b));
            var j = b.dpDiv.find("iframe.ui-datepicker-cover");
            j.length && j.css({
                left: -f[0],
                top: -f[1],
                width: b.dpDiv.outerWidth(),
                height: b.dpDiv.outerHeight()
            });
            b.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            f = this._getNumberOfMonths(b);
            j = f[1];
            b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            j > 1 && b.dpDiv.addClass("ui-datepicker-multi-" + j).css("width", 17 * j + "em");
            b.dpDiv[(f[0] != 1 || f[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            b == a.datepicker._curInst && a.datepicker._datepickerShowing && b.input && b.input.is(":visible") && !b.input.is(":disabled") && b.input[0] != document.activeElement && b.input.focus();
            if (b.yearshtml) {
                var l = b.yearshtml;
                setTimeout(function() {
                    l === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml);
                    l = b.yearshtml = null;
                }, 0);
            }
        },
        _getBorders: function(b) {
            var f = function(j) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[j] || j;
            };
            return [ parseFloat(f(b.css("border-left-width"))), parseFloat(f(b.css("border-top-width"))) ];
        },
        _checkOffset: function(b, f, j) {
            var l = b.dpDiv.outerWidth(), o = b.dpDiv.outerHeight(), n = b.input ? b.input.outerWidth() : 0, k = b.input ? b.input.outerHeight() : 0, m = document.documentElement.clientWidth + a(document).scrollLeft(), p = document.documentElement.clientHeight + a(document).scrollTop();
            f.left -= this._get(b, "isRTL") ? l - n : 0;
            f.left -= j && f.left == b.input.offset().left ? a(document).scrollLeft() : 0;
            f.top -= j && f.top == b.input.offset().top + k ? a(document).scrollTop() : 0;
            f.left -= Math.min(f.left, f.left + l > m && m > l ? Math.abs(f.left + l - m) : 0);
            f.top -= Math.min(f.top, f.top + o > p && p > o ? Math.abs(o + k) : 0);
            return f;
        },
        _findPos: function(b) {
            for (var f = this._get(this._getInst(b), "isRTL"); b && (b.type == "hidden" || b.nodeType != 1 || a.expr.filters.hidden(b)); ) b = b[f ? "previousSibling" : "nextSibling"];
            b = a(b).offset();
            return [ b.left, b.top ];
        },
        _triggerOnClose: function(b) {
            var f = this._get(b, "onClose");
            if (f) f.apply(b.input ? b.input[0] : null, [ b.input ? b.input.val() : "", b ]);
        },
        _hideDatepicker: function(b) {
            var f = this._curInst;
            if (!(!f || b && f != a.data(b, "datepicker"))) if (this._datepickerShowing) {
                b = this._get(f, "showAnim");
                var j = this._get(f, "duration"), l = function() {
                    a.datepicker._tidyDialog(f);
                    this._curInst = null;
                };
                a.effects && a.effects[b] ? f.dpDiv.hide(b, a.datepicker._get(f, "showOptions"), j, l) : f.dpDiv[b == "slideDown" ? "slideUp" : b == "fadeIn" ? "fadeOut" : "hide"](b ? j : null, l);
                b || l();
                a.datepicker._triggerOnClose(f);
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if (a.blockUI) {
                        a.unblockUI();
                        a("body").append(this.dpDiv);
                    }
                }
                this._inDialog = false;
            }
        },
        _tidyDialog: function(b) {
            b.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
        },
        _checkExternalClick: function(b) {
            if (a.datepicker._curInst) {
                b = a(b.target);
                b[0].id != a.datepicker._mainDivId && b.parents("#" + a.datepicker._mainDivId).length == 0 && !b.hasClass(a.datepicker.markerClassName) && !b.hasClass(a.datepicker._triggerClass) && a.datepicker._datepickerShowing && !(a.datepicker._inDialog && a.blockUI) && a.datepicker._hideDatepicker();
            }
        },
        _adjustDate: function(b, f, j) {
            b = a(b);
            var l = this._getInst(b[0]);
            if (!this._isDisabledDatepicker(b[0])) {
                this._adjustInstDate(l, f + (j == "M" ? this._get(l, "showCurrentAtPos") : 0), j);
                this._updateDatepicker(l);
            }
        },
        _gotoToday: function(b) {
            b = a(b);
            var f = this._getInst(b[0]);
            if (this._get(f, "gotoCurrent") && f.currentDay) {
                f.selectedDay = f.currentDay;
                f.drawMonth = f.selectedMonth = f.currentMonth;
                f.drawYear = f.selectedYear = f.currentYear;
            } else {
                var j = new Date();
                f.selectedDay = j.getDate();
                f.drawMonth = f.selectedMonth = j.getMonth();
                f.drawYear = f.selectedYear = j.getFullYear();
            }
            this._notifyChange(f);
            this._adjustDate(b);
        },
        _selectMonthYear: function(b, f, j) {
            b = a(b);
            var l = this._getInst(b[0]);
            l["selected" + (j == "M" ? "Month" : "Year")] = l["draw" + (j == "M" ? "Month" : "Year")] = parseInt(f.options[f.selectedIndex].value, 10);
            this._notifyChange(l);
            this._adjustDate(b);
        },
        _selectDay: function(b, f, j, l) {
            var o = a(b);
            if (!(a(l).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0]))) {
                o = this._getInst(o[0]);
                o.selectedDay = o.currentDay = a("a", l).html();
                o.selectedMonth = o.currentMonth = f;
                o.selectedYear = o.currentYear = j;
                this._selectDate(b, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear));
            }
        },
        _clearDate: function(b) {
            b = a(b);
            this._getInst(b[0]);
            this._selectDate(b, "");
        },
        _selectDate: function(b, f) {
            b = this._getInst(a(b)[0]);
            f = f != null ? f : this._formatDate(b);
            b.input && b.input.val(f);
            this._updateAlternate(b);
            var j = this._get(b, "onSelect");
            if (j) j.apply(b.input ? b.input[0] : null, [ f, b ]); else b.input && b.input.trigger("change");
            if (b.inline) this._updateDatepicker(b); else {
                this._hideDatepicker();
                this._lastInput = b.input[0];
                typeof b.input[0] != "object" && b.input.focus();
                this._lastInput = null;
            }
        },
        _updateAlternate: function(b) {
            var f = this._get(b, "altField");
            if (f) {
                var j = this._get(b, "altFormat") || this._get(b, "dateFormat"), l = this._getDate(b), o = this.formatDate(j, l, this._getFormatConfig(b));
                a(f).each(function() {
                    a(this).val(o);
                });
            }
        },
        noWeekends: function(b) {
            b = b.getDay();
            return [ b > 0 && b < 6, "" ];
        },
        iso8601Week: function(b) {
            b = new Date(b.getTime());
            b.setDate(b.getDate() + 4 - (b.getDay() || 7));
            var f = b.getTime();
            b.setMonth(0);
            b.setDate(1);
            return Math.floor(Math.round((f - b) / 864e5) / 7) + 1;
        },
        parseDate: function(b, f, j) {
            if (b == null || f == null) throw "Invalid arguments";
            f = typeof f == "object" ? f.toString() : f + "";
            if (f == "") return null;
            var l = (j ? j.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            l = typeof l != "string" ? l : new Date().getFullYear() % 100 + parseInt(l, 10);
            for (var o = (j ? j.dayNamesShort : null) || this._defaults.dayNamesShort, n = (j ? j.dayNames : null) || this._defaults.dayNames, k = (j ? j.monthNamesShort : null) || this._defaults.monthNamesShort, m = (j ? j.monthNames : null) || this._defaults.monthNames, p = j = -1, q = -1, s = -1, r = false, u = function(z) {
                (z = H + 1 < b.length && b.charAt(H + 1) == z) && H++;
                return z;
            }, v = function(z) {
                var I = u(z);
                z = new RegExp("^\\d{1," + (z == "@" ? 14 : z == "!" ? 20 : z == "y" && I ? 4 : z == "o" ? 3 : 2) + "}");
                z = f.substring(y).match(z);
                if (!z) throw "Missing number at position " + y;
                y += z[0].length;
                return parseInt(z[0], 10);
            }, w = function(z, I, N) {
                z = a.map(u(z) ? N : I, function(D, E) {
                    return [ [ E, D ] ];
                }).sort(function(D, E) {
                    return -(D[1].length - E[1].length);
                });
                var J = -1;
                a.each(z, function(D, E) {
                    D = E[1];
                    if (f.substr(y, D.length).toLowerCase() == D.toLowerCase()) {
                        J = E[0];
                        y += D.length;
                        return false;
                    }
                });
                if (J != -1) return J + 1; else throw "Unknown name at position " + y;
            }, x = function() {
                if (f.charAt(y) != b.charAt(H)) throw "Unexpected literal at position " + y;
                y++;
            }, y = 0, H = 0; H < b.length; H++) if (r) if (b.charAt(H) == "'" && !u("'")) r = false; else x(); else switch (b.charAt(H)) {
              case "d":
                q = v("d");
                break;

              case "D":
                w("D", o, n);
                break;

              case "o":
                s = v("o");
                break;

              case "m":
                p = v("m");
                break;

              case "M":
                p = w("M", k, m);
                break;

              case "y":
                j = v("y");
                break;

              case "@":
                var C = new Date(v("@"));
                j = C.getFullYear();
                p = C.getMonth() + 1;
                q = C.getDate();
                break;

              case "!":
                C = new Date((v("!") - this._ticksTo1970) / 1e4);
                j = C.getFullYear();
                p = C.getMonth() + 1;
                q = C.getDate();
                break;

              case "'":
                if (u("'")) x(); else r = true;
                break;

              default:
                x();
            }
            if (y < f.length) throw "Extra/unparsed characters found in date: " + f.substring(y);
            if (j == -1) j = new Date().getFullYear(); else if (j < 100) j += new Date().getFullYear() - new Date().getFullYear() % 100 + (j <= l ? 0 : -100);
            if (s > -1) {
                p = 1;
                q = s;
                do {
                    l = this._getDaysInMonth(j, p - 1);
                    if (q <= l) break;
                    p++;
                    q -= l;
                } while (1);
            }
            C = this._daylightSavingAdjust(new Date(j, p - 1, q));
            if (C.getFullYear() != j || C.getMonth() + 1 != p || C.getDate() != q) throw "Invalid date";
            return C;
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,
        formatDate: function(b, f, j) {
            if (!f) return "";
            var l = (j ? j.dayNamesShort : null) || this._defaults.dayNamesShort, o = (j ? j.dayNames : null) || this._defaults.dayNames, n = (j ? j.monthNamesShort : null) || this._defaults.monthNamesShort;
            j = (j ? j.monthNames : null) || this._defaults.monthNames;
            var k = function(u) {
                (u = r + 1 < b.length && b.charAt(r + 1) == u) && r++;
                return u;
            }, m = function(u, v, w) {
                v = "" + v;
                if (k(u)) for (;v.length < w; ) v = "0" + v;
                return v;
            }, p = function(u, v, w, x) {
                return k(u) ? x[v] : w[v];
            }, q = "", s = false;
            if (f) for (var r = 0; r < b.length; r++) if (s) if (b.charAt(r) == "'" && !k("'")) s = false; else q += b.charAt(r); else switch (b.charAt(r)) {
              case "d":
                q += m("d", f.getDate(), 2);
                break;

              case "D":
                q += p("D", f.getDay(), l, o);
                break;

              case "o":
                q += m("o", Math.round((new Date(f.getFullYear(), f.getMonth(), f.getDate()).getTime() - new Date(f.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;

              case "m":
                q += m("m", f.getMonth() + 1, 2);
                break;

              case "M":
                q += p("M", f.getMonth(), n, j);
                break;

              case "y":
                q += k("y") ? f.getFullYear() : (f.getYear() % 100 < 10 ? "0" : "") + f.getYear() % 100;
                break;

              case "@":
                q += f.getTime();
                break;

              case "!":
                q += f.getTime() * 1e4 + this._ticksTo1970;
                break;

              case "'":
                if (k("'")) q += "'"; else s = true;
                break;

              default:
                q += b.charAt(r);
            }
            return q;
        },
        _possibleChars: function(b) {
            for (var f = "", j = false, l = function(n) {
                (n = o + 1 < b.length && b.charAt(o + 1) == n) && o++;
                return n;
            }, o = 0; o < b.length; o++) if (j) if (b.charAt(o) == "'" && !l("'")) j = false; else f += b.charAt(o); else switch (b.charAt(o)) {
              case "d":
              case "m":
              case "y":
              case "@":
                f += "0123456789";
                break;

              case "D":
              case "M":
                return null;

              case "'":
                if (l("'")) f += "'"; else j = true;
                break;

              default:
                f += b.charAt(o);
            }
            return f;
        },
        _get: function(b, f) {
            return b.settings[f] !== d ? b.settings[f] : this._defaults[f];
        },
        _setDateFromField: function(b, f) {
            if (b.input.val() != b.lastVal) {
                var j = this._get(b, "dateFormat"), l = b.lastVal = b.input ? b.input.val() : null, o, n;
                o = n = this._getDefaultDate(b);
                var k = this._getFormatConfig(b);
                try {
                    o = this.parseDate(j, l, k) || n;
                } catch (m) {
                    this.log(m);
                    l = f ? "" : l;
                }
                b.selectedDay = o.getDate();
                b.drawMonth = b.selectedMonth = o.getMonth();
                b.drawYear = b.selectedYear = o.getFullYear();
                b.currentDay = l ? o.getDate() : 0;
                b.currentMonth = l ? o.getMonth() : 0;
                b.currentYear = l ? o.getFullYear() : 0;
                this._adjustInstDate(b);
            }
        },
        _getDefaultDate: function(b) {
            return this._restrictMinMax(b, this._determineDate(b, this._get(b, "defaultDate"), new Date()));
        },
        _determineDate: function(b, f, j) {
            var l = function(n) {
                var k = new Date();
                k.setDate(k.getDate() + n);
                return k;
            }, o = function(n) {
                try {
                    return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), n, a.datepicker._getFormatConfig(b));
                } catch (k) {}
                var m = (n.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date(), p = m.getFullYear(), q = m.getMonth();
                m = m.getDate();
                for (var s = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, r = s.exec(n); r; ) {
                    switch (r[2] || "d") {
                      case "d":
                      case "D":
                        m += parseInt(r[1], 10);
                        break;

                      case "w":
                      case "W":
                        m += parseInt(r[1], 10) * 7;
                        break;

                      case "m":
                      case "M":
                        q += parseInt(r[1], 10);
                        m = Math.min(m, a.datepicker._getDaysInMonth(p, q));
                        break;

                      case "y":
                      case "Y":
                        p += parseInt(r[1], 10);
                        m = Math.min(m, a.datepicker._getDaysInMonth(p, q));
                        break;
                    }
                    r = s.exec(n);
                }
                return new Date(p, q, m);
            };
            if (f = (f = f == null || f === "" ? j : typeof f == "string" ? o(f) : typeof f == "number" ? isNaN(f) ? j : l(f) : new Date(f.getTime())) && f.toString() == "Invalid Date" ? j : f) {
                f.setHours(0);
                f.setMinutes(0);
                f.setSeconds(0);
                f.setMilliseconds(0);
            }
            return this._daylightSavingAdjust(f);
        },
        _daylightSavingAdjust: function(b) {
            if (!b) return null;
            b.setHours(b.getHours() > 12 ? b.getHours() + 2 : 0);
            return b;
        },
        _setDate: function(b, f, j) {
            var l = !f, o = b.selectedMonth, n = b.selectedYear;
            f = this._restrictMinMax(b, this._determineDate(b, f, new Date()));
            b.selectedDay = b.currentDay = f.getDate();
            b.drawMonth = b.selectedMonth = b.currentMonth = f.getMonth();
            b.drawYear = b.selectedYear = b.currentYear = f.getFullYear();
            if ((o != b.selectedMonth || n != b.selectedYear) && !j) this._notifyChange(b);
            this._adjustInstDate(b);
            if (b.input) b.input.val(l ? "" : this._formatDate(b));
        },
        _getDate: function(b) {
            return !b.currentYear || b.input && b.input.val() == "" ? null : this._daylightSavingAdjust(new Date(b.currentYear, b.currentMonth, b.currentDay));
        },
        _generateHTML: function(b) {
            var f = new Date();
            f = this._daylightSavingAdjust(new Date(f.getFullYear(), f.getMonth(), f.getDate()));
            var j = this._get(b, "isRTL"), l = this._get(b, "showButtonPanel"), o = this._get(b, "hideIfNoPrevNext"), n = this._get(b, "navigationAsDateFormat"), k = this._getNumberOfMonths(b), m = this._get(b, "showCurrentAtPos"), p = this._get(b, "stepMonths"), q = k[0] != 1 || k[1] != 1, s = this._daylightSavingAdjust(!b.currentDay ? new Date(9999, 9, 9) : new Date(b.currentYear, b.currentMonth, b.currentDay)), r = this._getMinMaxDate(b, "min"), u = this._getMinMaxDate(b, "max");
            m = b.drawMonth - m;
            var v = b.drawYear;
            if (m < 0) {
                m += 12;
                v--;
            }
            if (u) {
                var w = this._daylightSavingAdjust(new Date(u.getFullYear(), u.getMonth() - k[0] * k[1] + 1, u.getDate()));
                for (w = r && w < r ? r : w; this._daylightSavingAdjust(new Date(v, m, 1)) > w; ) {
                    m--;
                    if (m < 0) {
                        m = 11;
                        v--;
                    }
                }
            }
            b.drawMonth = m;
            b.drawYear = v;
            w = this._get(b, "prevText");
            w = !n ? w : this.formatDate(w, this._daylightSavingAdjust(new Date(v, m - p, 1)), this._getFormatConfig(b));
            w = this._canAdjustMonth(b, -1, v, m) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + g + ".datepicker._adjustDate('#" + b.id + "', -" + p + ", 'M');\" title=\"" + w + '"><span class="ui-icon ui-icon-circle-triangle-' + (j ? "e" : "w") + '">' + w + "</span></a>" : o ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + w + '"><span class="ui-icon ui-icon-circle-triangle-' + (j ? "e" : "w") + '">' + w + "</span></a>";
            var x = this._get(b, "nextText");
            x = !n ? x : this.formatDate(x, this._daylightSavingAdjust(new Date(v, m + p, 1)), this._getFormatConfig(b));
            o = this._canAdjustMonth(b, +1, v, m) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + g + ".datepicker._adjustDate('#" + b.id + "', +" + p + ", 'M');\" title=\"" + x + '"><span class="ui-icon ui-icon-circle-triangle-' + (j ? "w" : "e") + '">' + x + "</span></a>" : o ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + x + '"><span class="ui-icon ui-icon-circle-triangle-' + (j ? "w" : "e") + '">' + x + "</span></a>";
            p = this._get(b, "currentText");
            x = this._get(b, "gotoCurrent") && b.currentDay ? s : f;
            p = !n ? p : this.formatDate(p, x, this._getFormatConfig(b));
            n = !b.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + g + '.datepicker._hideDatepicker();">' + this._get(b, "closeText") + "</button>" : "";
            l = l ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (j ? n : "") + (this._isInRange(b, x) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + g + ".datepicker._gotoToday('#" + b.id + "');\">" + p + "</button>" : "") + (j ? "" : n) + "</div>" : "";
            n = parseInt(this._get(b, "firstDay"), 10);
            n = isNaN(n) ? 0 : n;
            p = this._get(b, "showWeek");
            x = this._get(b, "dayNames");
            this._get(b, "dayNamesShort");
            var y = this._get(b, "dayNamesMin"), H = this._get(b, "monthNames"), C = this._get(b, "monthNamesShort"), z = this._get(b, "beforeShowDay"), I = this._get(b, "showOtherMonths"), N = this._get(b, "selectOtherMonths");
            this._get(b, "calculateWeek");
            for (var J = this._getDefaultDate(b), D = "", E = 0; E < k[0]; E++) {
                var P = "";
                this.maxRows = 4;
                for (var L = 0; L < k[1]; L++) {
                    var Q = this._daylightSavingAdjust(new Date(v, m, b.selectedDay)), B = " ui-corner-all", F = "";
                    if (q) {
                        F += '<div class="ui-datepicker-group';
                        if (k[1] > 1) switch (L) {
                          case 0:
                            F += " ui-datepicker-group-first";
                            B = " ui-corner-" + (j ? "right" : "left");
                            break;

                          case k[1] - 1:
                            F += " ui-datepicker-group-last";
                            B = " ui-corner-" + (j ? "left" : "right");
                            break;

                          default:
                            F += " ui-datepicker-group-middle";
                            B = "";
                            break;
                        }
                        F += '">';
                    }
                    F += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + B + '">' + (/all|left/.test(B) && E == 0 ? j ? o : w : "") + (/all|right/.test(B) && E == 0 ? j ? w : o : "") + this._generateMonthYearHeader(b, m, v, r, u, E > 0 || L > 0, H, C) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var G = p ? '<th class="ui-datepicker-week-col">' + this._get(b, "weekHeader") + "</th>" : "";
                    for (B = 0; B < 7; B++) {
                        var A = (B + n) % 7;
                        G += "<th" + ((B + n + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + x[A] + '">' + y[A] + "</span></th>";
                    }
                    F += G + "</tr></thead><tbody>";
                    G = this._getDaysInMonth(v, m);
                    if (v == b.selectedYear && m == b.selectedMonth) b.selectedDay = Math.min(b.selectedDay, G);
                    B = (this._getFirstDayOfMonth(v, m) - n + 7) % 7;
                    G = Math.ceil((B + G) / 7);
                    this.maxRows = G = q ? this.maxRows > G ? this.maxRows : G : G;
                    A = this._daylightSavingAdjust(new Date(v, m, 1 - B));
                    for (var R = 0; R < G; R++) {
                        F += "<tr>";
                        var S = !p ? "" : '<td class="ui-datepicker-week-col">' + this._get(b, "calculateWeek")(A) + "</td>";
                        for (B = 0; B < 7; B++) {
                            var M = z ? z.apply(b.input ? b.input[0] : null, [ A ]) : [ true, "" ], K = A.getMonth() != m, O = K && !N || !M[0] || r && A < r || u && A > u;
                            S += '<td class="' + ((B + n + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (K ? " ui-datepicker-other-month" : "") + (A.getTime() == Q.getTime() && m == b.selectedMonth && b._keyEvent || J.getTime() == A.getTime() && J.getTime() == Q.getTime() ? " " + this._dayOverClass : "") + (O ? " " + this._unselectableClass + " ui-state-disabled" : "") + (K && !I ? "" : " " + M[1] + (A.getTime() == s.getTime() ? " " + this._currentClass : "") + (A.getTime() == f.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!K || I) && M[2] ? ' title="' + M[2] + '"' : "") + (O ? "" : ' onclick="DP_jQuery_' + g + ".datepicker._selectDay('#" + b.id + "'," + A.getMonth() + "," + A.getFullYear() + ', this);return false;"') + ">" + (K && !I ? "&#xa0;" : O ? '<span class="ui-state-default">' + A.getDate() + "</span>" : '<a class="ui-state-default' + (A.getTime() == f.getTime() ? " ui-state-highlight" : "") + (A.getTime() == s.getTime() ? " ui-state-active" : "") + (K ? " ui-priority-secondary" : "") + '" href="#">' + A.getDate() + "</a>") + "</td>";
                            A.setDate(A.getDate() + 1);
                            A = this._daylightSavingAdjust(A);
                        }
                        F += S + "</tr>";
                    }
                    m++;
                    if (m > 11) {
                        m = 0;
                        v++;
                    }
                    F += "</tbody></table>" + (q ? "</div>" + (k[0] > 0 && L == k[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    P += F;
                }
                D += P;
            }
            D += l + (a.browser.msie && parseInt(a.browser.version, 10) < 7 && !b.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            b._keyEvent = false;
            return D;
        },
        _generateMonthYearHeader: function(b, f, j, l, o, n, k, m) {
            var p = this._get(b, "changeMonth"), q = this._get(b, "changeYear"), s = this._get(b, "showMonthAfterYear"), r = '<div class="ui-datepicker-title">', u = "";
            if (n || !p) u += '<span class="ui-datepicker-month">' + k[f] + "</span>"; else {
                k = l && l.getFullYear() == j;
                var v = o && o.getFullYear() == j;
                u += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + g + ".datepicker._selectMonthYear('#" + b.id + "', this, 'M');\" >";
                for (var w = 0; w < 12; w++) if ((!k || w >= l.getMonth()) && (!v || w <= o.getMonth())) u += '<option value="' + w + '"' + (w == f ? ' selected="selected"' : "") + ">" + m[w] + "</option>";
                u += "</select>";
            }
            s || (r += u + (n || !(p && q) ? "&#xa0;" : ""));
            if (!b.yearshtml) {
                b.yearshtml = "";
                if (n || !q) r += '<span class="ui-datepicker-year">' + j + "</span>"; else {
                    m = this._get(b, "yearRange").split(":");
                    var x = new Date().getFullYear();
                    k = function(y) {
                        y = y.match(/c[+-].*/) ? j + parseInt(y.substring(1), 10) : y.match(/[+-].*/) ? x + parseInt(y, 10) : parseInt(y, 10);
                        return isNaN(y) ? x : y;
                    };
                    f = k(m[0]);
                    m = Math.max(f, k(m[1] || ""));
                    f = l ? Math.max(f, l.getFullYear()) : f;
                    m = o ? Math.min(m, o.getFullYear()) : m;
                    for (b.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + g + ".datepicker._selectMonthYear('#" + b.id + "', this, 'Y');\" >"; f <= m; f++) b.yearshtml += '<option value="' + f + '"' + (f == j ? ' selected="selected"' : "") + ">" + f + "</option>";
                    b.yearshtml += "</select>";
                    r += b.yearshtml;
                    b.yearshtml = null;
                }
            }
            r += this._get(b, "yearSuffix");
            if (s) r += (n || !(p && q) ? "&#xa0;" : "") + u;
            r += "</div>";
            return r;
        },
        _adjustInstDate: function(b, f, j) {
            var l = b.drawYear + (j == "Y" ? f : 0), o = b.drawMonth + (j == "M" ? f : 0);
            f = Math.min(b.selectedDay, this._getDaysInMonth(l, o)) + (j == "D" ? f : 0);
            l = this._restrictMinMax(b, this._daylightSavingAdjust(new Date(l, o, f)));
            b.selectedDay = l.getDate();
            b.drawMonth = b.selectedMonth = l.getMonth();
            b.drawYear = b.selectedYear = l.getFullYear();
            if (j == "M" || j == "Y") this._notifyChange(b);
        },
        _restrictMinMax: function(b, f) {
            var j = this._getMinMaxDate(b, "min");
            b = this._getMinMaxDate(b, "max");
            f = j && f < j ? j : f;
            return f = b && f > b ? b : f;
        },
        _notifyChange: function(b) {
            var f = this._get(b, "onChangeMonthYear");
            if (f) f.apply(b.input ? b.input[0] : null, [ b.selectedYear, b.selectedMonth + 1, b ]);
        },
        _getNumberOfMonths: function(b) {
            b = this._get(b, "numberOfMonths");
            return b == null ? [ 1, 1 ] : typeof b == "number" ? [ 1, b ] : b;
        },
        _getMinMaxDate: function(b, f) {
            return this._determineDate(b, this._get(b, f + "Date"), null);
        },
        _getDaysInMonth: function(b, f) {
            return 32 - this._daylightSavingAdjust(new Date(b, f, 32)).getDate();
        },
        _getFirstDayOfMonth: function(b, f) {
            return new Date(b, f, 1).getDay();
        },
        _canAdjustMonth: function(b, f, j, l) {
            var o = this._getNumberOfMonths(b);
            j = this._daylightSavingAdjust(new Date(j, l + (f < 0 ? f : o[0] * o[1]), 1));
            f < 0 && j.setDate(this._getDaysInMonth(j.getFullYear(), j.getMonth()));
            return this._isInRange(b, j);
        },
        _isInRange: function(b, f) {
            var j = this._getMinMaxDate(b, "min");
            b = this._getMinMaxDate(b, "max");
            return (!j || f.getTime() >= j.getTime()) && (!b || f.getTime() <= b.getTime());
        },
        _getFormatConfig: function(b) {
            var f = this._get(b, "shortYearCutoff");
            f = typeof f != "string" ? f : new Date().getFullYear() % 100 + parseInt(f, 10);
            return {
                shortYearCutoff: f,
                dayNamesShort: this._get(b, "dayNamesShort"),
                dayNames: this._get(b, "dayNames"),
                monthNamesShort: this._get(b, "monthNamesShort"),
                monthNames: this._get(b, "monthNames")
            };
        },
        _formatDate: function(b, f, j, l) {
            if (!f) {
                b.currentDay = b.selectedDay;
                b.currentMonth = b.selectedMonth;
                b.currentYear = b.selectedYear;
            }
            f = f ? typeof f == "object" ? f : this._daylightSavingAdjust(new Date(l, j, f)) : this._daylightSavingAdjust(new Date(b.currentYear, b.currentMonth, b.currentDay));
            return this.formatDate(this._get(b, "dateFormat"), f, this._getFormatConfig(b));
        }
    });
    a.fn.datepicker = function(b) {
        if (!this.length) return this;
        if (!a.datepicker.initialized) {
            a(document).mousedown(a.datepicker._checkExternalClick).find("body").append(a.datepicker.dpDiv);
            a.datepicker.initialized = true;
        }
        var f = Array.prototype.slice.call(arguments, 1);
        if (typeof b == "string" && (b == "isDisabled" || b == "getDate" || b == "widget")) return a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [ this[0] ].concat(f));
        if (b == "option" && arguments.length == 2 && typeof arguments[1] == "string") return a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [ this[0] ].concat(f));
        return this.each(function() {
            typeof b == "string" ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [ this ].concat(f)) : a.datepicker._attachDatepicker(this, b);
        });
    };
    a.datepicker = new c();
    a.datepicker.initialized = false;
    a.datepicker.uuid = new Date().getTime();
    a.datepicker.version = "1.8.16";
    window["DP_jQuery_" + g] = a;
})(jQuery);

(function(a, d) {
    var c = {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
    }, e = {
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true
    }, h = a.attrFn || {
        val: true,
        css: true,
        html: true,
        text: true,
        data: true,
        width: true,
        height: true,
        offset: true,
        click: true
    };
    a.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                collision: "fit",
                using: function(g) {
                    var i = a(this).css(g).offset().top;
                    i < 0 && a(this).css("top", g.top - i);
                }
            },
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1e3
        },
        _create: function() {
            this.originalTitle = this.element.attr("title");
            if (typeof this.originalTitle !== "string") this.originalTitle = "";
            this.options.title = this.options.title || this.originalTitle;
            var g = this, i = g.options, b = i.title || "&#160;", f = a.ui.dialog.getTitleId(g.element), j = (g.uiDialog = a("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + i.dialogClass).css({
                zIndex: i.zIndex
            }).attr("tabIndex", -1).css("outline", 0).keydown(function(n) {
                if (i.closeOnEscape && !n.isDefaultPrevented() && n.keyCode && n.keyCode === a.ui.keyCode.ESCAPE) {
                    g.close(n);
                    n.preventDefault();
                }
            }).attr({
                role: "dialog",
                "aria-labelledby": f
            }).mousedown(function(n) {
                g.moveToTop(false, n);
            });
            g.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(j);
            var l = (g.uiDialogTitlebar = a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(j), o = a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
                o.addClass("ui-state-hover");
            }, function() {
                o.removeClass("ui-state-hover");
            }).focus(function() {
                o.addClass("ui-state-focus");
            }).blur(function() {
                o.removeClass("ui-state-focus");
            }).click(function(n) {
                g.close(n);
                return false;
            }).appendTo(l);
            (g.uiDialogTitlebarCloseText = a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(i.closeText).appendTo(o);
            a("<span></span>").addClass("ui-dialog-title").attr("id", f).html(b).prependTo(l);
            if (a.isFunction(i.beforeclose) && !a.isFunction(i.beforeClose)) i.beforeClose = i.beforeclose;
            l.find("*").add(l).disableSelection();
            i.draggable && a.fn.draggable && g._makeDraggable();
            i.resizable && a.fn.resizable && g._makeResizable();
            g._createButtons(i.buttons);
            g._isOpen = false;
            a.fn.bgiframe && j.bgiframe();
        },
        _init: function() {
            this.options.autoOpen && this.open();
        },
        destroy: function() {
            var g = this;
            g.overlay && g.overlay.destroy();
            g.uiDialog.hide();
            g.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            g.uiDialog.remove();
            g.originalTitle && g.element.attr("title", g.originalTitle);
            return g;
        },
        widget: function() {
            return this.uiDialog;
        },
        close: function(g) {
            var i = this, b, f;
            if (false !== i._trigger("beforeClose", g)) {
                i.overlay && i.overlay.destroy();
                i.uiDialog.unbind("keypress.ui-dialog");
                i._isOpen = false;
                if (i.options.hide) i.uiDialog.hide(i.options.hide, function() {
                    i._trigger("close", g);
                }); else {
                    i.uiDialog.hide();
                    i._trigger("close", g);
                }
                a.ui.dialog.overlay.resize();
                if (i.options.modal) {
                    b = 0;
                    a(".ui-dialog").each(function() {
                        if (this !== i.uiDialog[0]) {
                            f = a(this).css("z-index");
                            isNaN(f) || (b = Math.max(b, f));
                        }
                    });
                    a.ui.dialog.maxZ = b;
                }
                return i;
            }
        },
        isOpen: function() {
            return this._isOpen;
        },
        moveToTop: function(g, i) {
            var b = this, f = b.options;
            if (f.modal && !g || !f.stack && !f.modal) return b._trigger("focus", i);
            if (f.zIndex > a.ui.dialog.maxZ) a.ui.dialog.maxZ = f.zIndex;
            if (b.overlay) {
                a.ui.dialog.maxZ += 1;
                b.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ);
            }
            g = {
                scrollTop: b.element.scrollTop(),
                scrollLeft: b.element.scrollLeft()
            };
            a.ui.dialog.maxZ += 1;
            b.uiDialog.css("z-index", a.ui.dialog.maxZ);
            b.element.attr(g);
            b._trigger("focus", i);
            return b;
        },
        open: function() {
            if (!this._isOpen) {
                var g = this, i = g.options, b = g.uiDialog;
                g.overlay = i.modal ? new a.ui.dialog.overlay(g) : null;
                g._size();
                g._position(i.position);
                b.show(i.show);
                g.moveToTop(true);
                i.modal && b.bind("keypress.ui-dialog", function(f) {
                    if (f.keyCode === a.ui.keyCode.TAB) {
                        var j = a(":tabbable", this), l = j.filter(":first");
                        j = j.filter(":last");
                        if (f.target === j[0] && !f.shiftKey) {
                            l.focus(1);
                            return false;
                        } else if (f.target === l[0] && f.shiftKey) {
                            j.focus(1);
                            return false;
                        }
                    }
                });
                a(g.element.find(":tabbable").get().concat(b.find(".ui-dialog-buttonpane :tabbable").get().concat(b.get()))).eq(0).focus();
                g._isOpen = true;
                g._trigger("open");
                return g;
            }
        },
        _createButtons: function(g) {
            var i = this, b = false, f = a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), j = a("<div></div>").addClass("ui-dialog-buttonset").appendTo(f);
            i.uiDialog.find(".ui-dialog-buttonpane").remove();
            typeof g === "object" && g !== null && a.each(g, function() {
                return !(b = true);
            });
            if (b) {
                a.each(g, function(l, o) {
                    o = a.isFunction(o) ? {
                        click: o,
                        text: l
                    } : o;
                    var n = a('<button type="button"></button>').click(function() {
                        o.click.apply(i.element[0], arguments);
                    }).appendTo(j);
                    a.each(o, function(k, m) {
                        if (k !== "click") k in h ? n[k](m) : n.attr(k, m);
                    });
                    a.fn.button && n.button();
                });
                f.appendTo(i.uiDialog);
            }
        },
        _makeDraggable: function() {
            function g(l) {
                return {
                    position: l.position,
                    offset: l.offset
                };
            }
            var i = this, b = i.options, f = a(document), j;
            i.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(l, o) {
                    j = b.height === "auto" ? "auto" : a(this).height();
                    a(this).height(a(this).height()).addClass("ui-dialog-dragging");
                    i._trigger("dragStart", l, g(o));
                },
                drag: function(l, o) {
                    i._trigger("drag", l, g(o));
                },
                stop: function(l, o) {
                    b.position = [ o.position.left - f.scrollLeft(), o.position.top - f.scrollTop() ];
                    a(this).removeClass("ui-dialog-dragging").height(j);
                    i._trigger("dragStop", l, g(o));
                    a.ui.dialog.overlay.resize();
                }
            });
        },
        _makeResizable: function(g) {
            function i(l) {
                return {
                    originalPosition: l.originalPosition,
                    originalSize: l.originalSize,
                    position: l.position,
                    size: l.size
                };
            }
            g = g === d ? this.options.resizable : g;
            var b = this, f = b.options, j = b.uiDialog.css("position");
            g = typeof g === "string" ? g : "n,e,s,w,se,sw,ne,nw";
            b.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: b.element,
                maxWidth: f.maxWidth,
                maxHeight: f.maxHeight,
                minWidth: f.minWidth,
                minHeight: b._minHeight(),
                handles: g,
                start: function(l, o) {
                    a(this).addClass("ui-dialog-resizing");
                    b._trigger("resizeStart", l, i(o));
                },
                resize: function(l, o) {
                    b._trigger("resize", l, i(o));
                },
                stop: function(l, o) {
                    a(this).removeClass("ui-dialog-resizing");
                    f.height = a(this).height();
                    f.width = a(this).width();
                    b._trigger("resizeStop", l, i(o));
                    a.ui.dialog.overlay.resize();
                }
            }).css("position", j).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se");
        },
        _minHeight: function() {
            var g = this.options;
            return g.height === "auto" ? g.minHeight : Math.min(g.minHeight, g.height);
        },
        _position: function(g) {
            var i = [], b = [ 0, 0 ], f;
            if (g) {
                if (typeof g === "string" || typeof g === "object" && "0" in g) {
                    i = g.split ? g.split(" ") : [ g[0], g[1] ];
                    if (i.length === 1) i[1] = i[0];
                    a.each([ "left", "top" ], function(j, l) {
                        if (+i[j] === i[j]) {
                            b[j] = i[j];
                            i[j] = l;
                        }
                    });
                    g = {
                        my: i.join(" "),
                        at: i.join(" "),
                        offset: b.join(" ")
                    };
                }
                g = a.extend({}, a.ui.dialog.prototype.options.position, g);
            } else g = a.ui.dialog.prototype.options.position;
            (f = this.uiDialog.is(":visible")) || this.uiDialog.show();
            this.uiDialog.css({
                top: 0,
                left: 0
            }).position(a.extend({
                of: window
            }, g));
            f || this.uiDialog.hide();
        },
        _setOptions: function(g) {
            var i = this, b = {}, f = false;
            a.each(g, function(j, l) {
                i._setOption(j, l);
                if (j in c) f = true;
                if (j in e) b[j] = l;
            });
            f && this._size();
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", b);
        },
        _setOption: function(g, i) {
            var b = this, f = b.uiDialog;
            switch (g) {
              case "beforeclose":
                g = "beforeClose";
                break;

              case "buttons":
                b._createButtons(i);
                break;

              case "closeText":
                b.uiDialogTitlebarCloseText.text("" + i);
                break;

              case "dialogClass":
                f.removeClass(b.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + i);
                break;

              case "disabled":
                i ? f.addClass("ui-dialog-disabled") : f.removeClass("ui-dialog-disabled");
                break;

              case "draggable":
                var j = f.is(":data(draggable)");
                j && !i && f.draggable("destroy");
                !j && i && b._makeDraggable();
                break;

              case "position":
                b._position(i);
                break;

              case "resizable":
                (j = f.is(":data(resizable)")) && !i && f.resizable("destroy");
                j && typeof i === "string" && f.resizable("option", "handles", i);
                !j && i !== false && b._makeResizable(i);
                break;

              case "title":
                a(".ui-dialog-title", b.uiDialogTitlebar).html("" + (i || "&#160;"));
                break;
            }
            a.Widget.prototype._setOption.apply(b, arguments);
        },
        _size: function() {
            var g = this.options, i, b, f = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            });
            if (g.minWidth > g.width) g.width = g.minWidth;
            i = this.uiDialog.css({
                height: "auto",
                width: g.width
            }).height();
            b = Math.max(0, g.minHeight - i);
            if (g.height === "auto") if (a.support.minHeight) this.element.css({
                minHeight: b,
                height: "auto"
            }); else {
                this.uiDialog.show();
                g = this.element.css("height", "auto").height();
                f || this.uiDialog.hide();
                this.element.height(Math.max(g, b));
            } else this.element.height(Math.max(g.height - i, 0));
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
        }
    });
    a.extend(a.ui.dialog, {
        version: "1.8.16",
        uuid: 0,
        maxZ: 0,
        getTitleId: function(g) {
            g = g.attr("id");
            if (!g) {
                this.uuid += 1;
                g = this.uuid;
            }
            return "ui-dialog-title-" + g;
        },
        overlay: function(g) {
            this.$el = a.ui.dialog.overlay.create(g);
        }
    });
    a.extend(a.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(g) {
            return g + ".dialog-overlay";
        }).join(" "),
        create: function(g) {
            if (this.instances.length === 0) {
                setTimeout(function() {
                    a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function(b) {
                        if (a(b.target).zIndex() < a.ui.dialog.overlay.maxZ) return false;
                    });
                }, 1);
                a(document).bind("keydown.dialog-overlay", function(b) {
                    if (g.options.closeOnEscape && !b.isDefaultPrevented() && b.keyCode && b.keyCode === a.ui.keyCode.ESCAPE) {
                        g.close(b);
                        b.preventDefault();
                    }
                });
                a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize);
            }
            var i = (this.oldInstances.pop() || a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            a.fn.bgiframe && i.bgiframe();
            this.instances.push(i);
            return i;
        },
        destroy: function(g) {
            var i = a.inArray(g, this.instances);
            i != -1 && this.oldInstances.push(this.instances.splice(i, 1)[0]);
            this.instances.length === 0 && a([ document, window ]).unbind(".dialog-overlay");
            g.remove();
            var b = 0;
            a.each(this.instances, function() {
                b = Math.max(b, this.css("z-index"));
            });
            this.maxZ = b;
        },
        height: function() {
            var g, i;
            if (a.browser.msie && a.browser.version < 7) {
                g = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                i = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                return g < i ? a(window).height() + "px" : g + "px";
            } else return a(document).height() + "px";
        },
        width: function() {
            var g, i;
            if (a.browser.msie) {
                g = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                i = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                return g < i ? a(window).width() + "px" : g + "px";
            } else return a(document).width() + "px";
        },
        resize: function() {
            var g = a([]);
            a.each(a.ui.dialog.overlay.instances, function() {
                g = g.add(this);
            });
            g.css({
                width: 0,
                height: 0
            }).css({
                width: a.ui.dialog.overlay.width(),
                height: a.ui.dialog.overlay.height()
            });
        }
    });
    a.extend(a.ui.dialog.overlay.prototype, {
        destroy: function() {
            a.ui.dialog.overlay.destroy(this.$el);
        }
    });
})(jQuery);

(function(a) {
    a.ui = a.ui || {};
    var d = /left|center|right/, c = /top|center|bottom/, e = a.fn.position, h = a.fn.offset;
    a.fn.position = function(g) {
        if (!g || !g.of) return e.apply(this, arguments);
        g = a.extend({}, g);
        var i = a(g.of), b = i[0], f = (g.collision || "flip").split(" "), j = g.offset ? g.offset.split(" ") : [ 0, 0 ], l, o, n;
        if (b.nodeType === 9) {
            l = i.width();
            o = i.height();
            n = {
                top: 0,
                left: 0
            };
        } else if (b.setTimeout) {
            l = i.width();
            o = i.height();
            n = {
                top: i.scrollTop(),
                left: i.scrollLeft()
            };
        } else if (b.preventDefault) {
            g.at = "left top";
            l = o = 0;
            n = {
                top: g.of.pageY,
                left: g.of.pageX
            };
        } else {
            l = i.outerWidth();
            o = i.outerHeight();
            n = i.offset();
        }
        a.each([ "my", "at" ], function() {
            var k = (g[this] || "").split(" ");
            if (k.length === 1) k = d.test(k[0]) ? k.concat([ "center" ]) : c.test(k[0]) ? [ "center" ].concat(k) : [ "center", "center" ];
            k[0] = d.test(k[0]) ? k[0] : "center";
            k[1] = c.test(k[1]) ? k[1] : "center";
            g[this] = k;
        });
        if (f.length === 1) f[1] = f[0];
        j[0] = parseInt(j[0], 10) || 0;
        if (j.length === 1) j[1] = j[0];
        j[1] = parseInt(j[1], 10) || 0;
        if (g.at[0] === "right") n.left += l; else if (g.at[0] === "center") n.left += l / 2;
        if (g.at[1] === "bottom") n.top += o; else if (g.at[1] === "center") n.top += o / 2;
        n.left += j[0];
        n.top += j[1];
        return this.each(function() {
            var k = a(this), m = k.outerWidth(), p = k.outerHeight(), q = parseInt(a.curCSS(this, "marginLeft", true)) || 0, s = parseInt(a.curCSS(this, "marginTop", true)) || 0, r = m + q + (parseInt(a.curCSS(this, "marginRight", true)) || 0), u = p + s + (parseInt(a.curCSS(this, "marginBottom", true)) || 0), v = a.extend({}, n), w;
            if (g.my[0] === "right") v.left -= m; else if (g.my[0] === "center") v.left -= m / 2;
            if (g.my[1] === "bottom") v.top -= p; else if (g.my[1] === "center") v.top -= p / 2;
            v.left = Math.round(v.left);
            v.top = Math.round(v.top);
            w = {
                left: v.left - q,
                top: v.top - s
            };
            a.each([ "left", "top" ], function(x, y) {
                a.ui.position[f[x]] && a.ui.position[f[x]][y](v, {
                    targetWidth: l,
                    targetHeight: o,
                    elemWidth: m,
                    elemHeight: p,
                    collisionPosition: w,
                    collisionWidth: r,
                    collisionHeight: u,
                    offset: j,
                    my: g.my,
                    at: g.at
                });
            });
            a.fn.bgiframe && k.bgiframe();
            k.offset(a.extend(v, {
                using: g.using
            }));
        });
    };
    a.ui.position = {
        fit: {
            left: function(g, i) {
                var b = a(window);
                b = i.collisionPosition.left + i.collisionWidth - b.width() - b.scrollLeft();
                g.left = b > 0 ? g.left - b : Math.max(g.left - i.collisionPosition.left, g.left);
            },
            top: function(g, i) {
                var b = a(window);
                b = i.collisionPosition.top + i.collisionHeight - b.height() - b.scrollTop();
                g.top = b > 0 ? g.top - b : Math.max(g.top - i.collisionPosition.top, g.top);
            }
        },
        flip: {
            left: function(g, i) {
                if (i.at[0] !== "center") {
                    var b = a(window);
                    b = i.collisionPosition.left + i.collisionWidth - b.width() - b.scrollLeft();
                    var f = i.my[0] === "left" ? -i.elemWidth : i.my[0] === "right" ? i.elemWidth : 0, j = i.at[0] === "left" ? i.targetWidth : -i.targetWidth, l = -2 * i.offset[0];
                    g.left += i.collisionPosition.left < 0 ? f + j + l : b > 0 ? f + j + l : 0;
                }
            },
            top: function(g, i) {
                if (i.at[1] !== "center") {
                    var b = a(window);
                    b = i.collisionPosition.top + i.collisionHeight - b.height() - b.scrollTop();
                    var f = i.my[1] === "top" ? -i.elemHeight : i.my[1] === "bottom" ? i.elemHeight : 0, j = i.at[1] === "top" ? i.targetHeight : -i.targetHeight, l = -2 * i.offset[1];
                    g.top += i.collisionPosition.top < 0 ? f + j + l : b > 0 ? f + j + l : 0;
                }
            }
        }
    };
    if (!a.offset.setOffset) {
        a.offset.setOffset = function(g, i) {
            if (/static/.test(a.curCSS(g, "position"))) g.style.position = "relative";
            var b = a(g), f = b.offset(), j = parseInt(a.curCSS(g, "top", true), 10) || 0, l = parseInt(a.curCSS(g, "left", true), 10) || 0;
            f = {
                top: i.top - f.top + j,
                left: i.left - f.left + l
            };
            "using" in i ? i.using.call(g, f) : b.css(f);
        };
        a.fn.offset = function(g) {
            var i = this[0];
            if (!i || !i.ownerDocument) return null;
            if (g) return this.each(function() {
                a.offset.setOffset(this, g);
            });
            return h.call(this);
        };
    }
})(jQuery);

(function(a, d) {
    a.widget("ui.progressbar", {
        options: {
            value: 0,
            max: 100
        },
        min: 0,
        _create: function() {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            });
            this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this.oldValue = this._value();
            this._refreshValue();
        },
        destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove();
            a.Widget.prototype.destroy.apply(this, arguments);
        },
        value: function(c) {
            if (c === d) return this._value();
            this._setOption("value", c);
            return this;
        },
        _setOption: function(c, e) {
            if (c === "value") {
                this.options.value = e;
                this._refreshValue();
                this._value() === this.options.max && this._trigger("complete");
            }
            a.Widget.prototype._setOption.apply(this, arguments);
        },
        _value: function() {
            var c = this.options.value;
            if (typeof c !== "number") c = 0;
            return Math.min(this.options.max, Math.max(this.min, c));
        },
        _percentage: function() {
            return 100 * this._value() / this.options.max;
        },
        _refreshValue: function() {
            var c = this.value(), e = this._percentage();
            if (this.oldValue !== c) {
                this.oldValue = c;
                this._trigger("change");
            }
            this.valueDiv.toggle(c > this.min).toggleClass("ui-corner-right", c === this.options.max).width(e.toFixed(0) + "%");
            this.element.attr("aria-valuenow", c);
        }
    });
    a.extend(a.ui.progressbar, {
        version: "1.8.16"
    });
})(jQuery);

(function(a) {
    a.widget("ui.slider", a.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function() {
            var d = this, c = this.options, e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), h = c.values && c.values.length || 1, g = [];
            this._mouseSliding = this._keySliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (c.disabled ? " ui-slider-disabled ui-disabled" : ""));
            this.range = a([]);
            if (c.range) {
                if (c.range === true) {
                    if (!c.values) c.values = [ this._valueMin(), this._valueMin() ];
                    if (c.values.length && c.values.length !== 2) c.values = [ c.values[0], c.values[0] ];
                }
                this.range = a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (c.range === "min" || c.range === "max" ? " ui-slider-range-" + c.range : ""));
            }
            for (var i = e.length; i < h; i += 1) g.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
            this.handles = e.add(a(g.join("")).appendTo(d.element));
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function(b) {
                b.preventDefault();
            }).hover(function() {
                c.disabled || a(this).addClass("ui-state-hover");
            }, function() {
                a(this).removeClass("ui-state-hover");
            }).focus(function() {
                if (c.disabled) a(this).blur(); else {
                    a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    a(this).addClass("ui-state-focus");
                }
            }).blur(function() {
                a(this).removeClass("ui-state-focus");
            });
            this.handles.each(function(b) {
                a(this).data("index.ui-slider-handle", b);
            });
            this.handles.keydown(function(b) {
                var f = true, j = a(this).data("index.ui-slider-handle"), l, o, n;
                if (!d.options.disabled) {
                    switch (b.keyCode) {
                      case a.ui.keyCode.HOME:
                      case a.ui.keyCode.END:
                      case a.ui.keyCode.PAGE_UP:
                      case a.ui.keyCode.PAGE_DOWN:
                      case a.ui.keyCode.UP:
                      case a.ui.keyCode.RIGHT:
                      case a.ui.keyCode.DOWN:
                      case a.ui.keyCode.LEFT:
                        f = false;
                        if (!d._keySliding) {
                            d._keySliding = true;
                            a(this).addClass("ui-state-active");
                            l = d._start(b, j);
                            if (l === false) return;
                        }
                        break;
                    }
                    n = d.options.step;
                    l = d.options.values && d.options.values.length ? o = d.values(j) : o = d.value();
                    switch (b.keyCode) {
                      case a.ui.keyCode.HOME:
                        o = d._valueMin();
                        break;

                      case a.ui.keyCode.END:
                        o = d._valueMax();
                        break;

                      case a.ui.keyCode.PAGE_UP:
                        o = d._trimAlignValue(l + (d._valueMax() - d._valueMin()) / 5);
                        break;

                      case a.ui.keyCode.PAGE_DOWN:
                        o = d._trimAlignValue(l - (d._valueMax() - d._valueMin()) / 5);
                        break;

                      case a.ui.keyCode.UP:
                      case a.ui.keyCode.RIGHT:
                        if (l === d._valueMax()) return;
                        o = d._trimAlignValue(l + n);
                        break;

                      case a.ui.keyCode.DOWN:
                      case a.ui.keyCode.LEFT:
                        if (l === d._valueMin()) return;
                        o = d._trimAlignValue(l - n);
                        break;
                    }
                    d._slide(b, j, o);
                    return f;
                }
            }).keyup(function(b) {
                var f = a(this).data("index.ui-slider-handle");
                if (d._keySliding) {
                    d._keySliding = false;
                    d._stop(b, f);
                    d._change(b, f);
                    a(this).removeClass("ui-state-active");
                }
            });
            this._refreshValue();
            this._animateOff = false;
        },
        destroy: function() {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this;
        },
        _mouseCapture: function(d) {
            var c = this.options, e, h, g, i, b;
            if (c.disabled) return false;
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            e = this._normValueFromMouse({
                x: d.pageX,
                y: d.pageY
            });
            h = this._valueMax() - this._valueMin() + 1;
            i = this;
            this.handles.each(function(f) {
                var j = Math.abs(e - i.values(f));
                if (h > j) {
                    h = j;
                    g = a(this);
                    b = f;
                }
            });
            if (c.range === true && this.values(1) === c.min) {
                b += 1;
                g = a(this.handles[b]);
            }
            if (this._start(d, b) === false) return false;
            this._mouseSliding = true;
            i._handleIndex = b;
            g.addClass("ui-state-active").focus();
            c = g.offset();
            this._clickOffset = !a(d.target).parents().andSelf().is(".ui-slider-handle") ? {
                left: 0,
                top: 0
            } : {
                left: d.pageX - c.left - g.width() / 2,
                top: d.pageY - c.top - g.height() / 2 - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)
            };
            this.handles.hasClass("ui-state-hover") || this._slide(d, b, e);
            return this._animateOff = true;
        },
        _mouseStart: function() {
            return true;
        },
        _mouseDrag: function(d) {
            var c = this._normValueFromMouse({
                x: d.pageX,
                y: d.pageY
            });
            this._slide(d, this._handleIndex, c);
            return false;
        },
        _mouseStop: function(d) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(d, this._handleIndex);
            this._change(d, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = false;
        },
        _detectOrientation: function() {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function(d) {
            var c;
            if (this.orientation === "horizontal") {
                c = this.elementSize.width;
                d = d.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0);
            } else {
                c = this.elementSize.height;
                d = d.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0);
            }
            c = d / c;
            if (c > 1) c = 1;
            if (c < 0) c = 0;
            if (this.orientation === "vertical") c = 1 - c;
            d = this._valueMax() - this._valueMin();
            return this._trimAlignValue(this._valueMin() + c * d);
        },
        _start: function(d, c) {
            var e = {
                handle: this.handles[c],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                e.value = this.values(c);
                e.values = this.values();
            }
            return this._trigger("start", d, e);
        },
        _slide: function(d, c, e) {
            var h;
            if (this.options.values && this.options.values.length) {
                h = this.values(c ? 0 : 1);
                if (this.options.values.length === 2 && this.options.range === true && (c === 0 && e > h || c === 1 && e < h)) e = h;
                if (e !== this.values(c)) {
                    h = this.values();
                    h[c] = e;
                    d = this._trigger("slide", d, {
                        handle: this.handles[c],
                        value: e,
                        values: h
                    });
                    this.values(c ? 0 : 1);
                    d !== false && this.values(c, e, true);
                }
            } else if (e !== this.value()) {
                d = this._trigger("slide", d, {
                    handle: this.handles[c],
                    value: e
                });
                d !== false && this.value(e);
            }
        },
        _stop: function(d, c) {
            var e = {
                handle: this.handles[c],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                e.value = this.values(c);
                e.values = this.values();
            }
            this._trigger("stop", d, e);
        },
        _change: function(d, c) {
            if (!this._keySliding && !this._mouseSliding) {
                var e = {
                    handle: this.handles[c],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    e.value = this.values(c);
                    e.values = this.values();
                }
                this._trigger("change", d, e);
            }
        },
        value: function(d) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(d);
                this._refreshValue();
                this._change(null, 0);
            } else return this._value();
        },
        values: function(d, c) {
            var e, h, g;
            if (arguments.length > 1) {
                this.options.values[d] = this._trimAlignValue(c);
                this._refreshValue();
                this._change(null, d);
            } else if (arguments.length) if (a.isArray(arguments[0])) {
                e = this.options.values;
                h = arguments[0];
                for (g = 0; g < e.length; g += 1) {
                    e[g] = this._trimAlignValue(h[g]);
                    this._change(null, g);
                }
                this._refreshValue();
            } else return this.options.values && this.options.values.length ? this._values(d) : this.value(); else return this._values();
        },
        _setOption: function(d, c) {
            var e, h = 0;
            if (a.isArray(this.options.values)) h = this.options.values.length;
            a.Widget.prototype._setOption.apply(this, arguments);
            switch (d) {
              case "disabled":
                if (c) {
                    this.handles.filter(".ui-state-focus").blur();
                    this.handles.removeClass("ui-state-hover");
                    this.handles.propAttr("disabled", true);
                    this.element.addClass("ui-disabled");
                } else {
                    this.handles.propAttr("disabled", false);
                    this.element.removeClass("ui-disabled");
                }
                break;

              case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                break;

              case "value":
                this._animateOff = true;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = false;
                break;

              case "values":
                this._animateOff = true;
                this._refreshValue();
                for (e = 0; e < h; e += 1) this._change(null, e);
                this._animateOff = false;
                break;
            }
        },
        _value: function() {
            var d = this.options.value;
            return d = this._trimAlignValue(d);
        },
        _values: function(d) {
            var c, e;
            if (arguments.length) {
                c = this.options.values[d];
                return c = this._trimAlignValue(c);
            } else {
                c = this.options.values.slice();
                for (e = 0; e < c.length; e += 1) c[e] = this._trimAlignValue(c[e]);
                return c;
            }
        },
        _trimAlignValue: function(d) {
            if (d <= this._valueMin()) return this._valueMin();
            if (d >= this._valueMax()) return this._valueMax();
            var c = this.options.step > 0 ? this.options.step : 1, e = (d - this._valueMin()) % c;
            d = d - e;
            if (Math.abs(e) * 2 >= c) d += e > 0 ? c : -c;
            return parseFloat(d.toFixed(5));
        },
        _valueMin: function() {
            return this.options.min;
        },
        _valueMax: function() {
            return this.options.max;
        },
        _refreshValue: function() {
            var d = this.options.range, c = this.options, e = this, h = !this._animateOff ? c.animate : false, g, i = {}, b, f, j, l;
            if (this.options.values && this.options.values.length) this.handles.each(function(o) {
                g = (e.values(o) - e._valueMin()) / (e._valueMax() - e._valueMin()) * 100;
                i[e.orientation === "horizontal" ? "left" : "bottom"] = g + "%";
                a(this).stop(1, 1)[h ? "animate" : "css"](i, c.animate);
                if (e.options.range === true) if (e.orientation === "horizontal") {
                    if (o === 0) e.range.stop(1, 1)[h ? "animate" : "css"]({
                        left: g + "%"
                    }, c.animate);
                    if (o === 1) e.range[h ? "animate" : "css"]({
                        width: g - b + "%"
                    }, {
                        queue: false,
                        duration: c.animate
                    });
                } else {
                    if (o === 0) e.range.stop(1, 1)[h ? "animate" : "css"]({
                        bottom: g + "%"
                    }, c.animate);
                    if (o === 1) e.range[h ? "animate" : "css"]({
                        height: g - b + "%"
                    }, {
                        queue: false,
                        duration: c.animate
                    });
                }
                b = g;
            }); else {
                f = this.value();
                j = this._valueMin();
                l = this._valueMax();
                g = l !== j ? (f - j) / (l - j) * 100 : 0;
                i[e.orientation === "horizontal" ? "left" : "bottom"] = g + "%";
                this.handle.stop(1, 1)[h ? "animate" : "css"](i, c.animate);
                if (d === "min" && this.orientation === "horizontal") this.range.stop(1, 1)[h ? "animate" : "css"]({
                    width: g + "%"
                }, c.animate);
                if (d === "max" && this.orientation === "horizontal") this.range[h ? "animate" : "css"]({
                    width: 100 - g + "%"
                }, {
                    queue: false,
                    duration: c.animate
                });
                if (d === "min" && this.orientation === "vertical") this.range.stop(1, 1)[h ? "animate" : "css"]({
                    height: g + "%"
                }, c.animate);
                if (d === "max" && this.orientation === "vertical") this.range[h ? "animate" : "css"]({
                    height: 100 - g + "%"
                }, {
                    queue: false,
                    duration: c.animate
                });
            }
        }
    });
    a.extend(a.ui.slider, {
        version: "1.8.16"
    });
})(jQuery);

(function(a, d) {
    function c() {
        return ++h;
    }
    function e() {
        return ++g;
    }
    var h = 0, g = 0;
    a.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        _create: function() {
            this._tabify(true);
        },
        _setOption: function(i, b) {
            if (i == "selected") this.options.collapsible && b == this.options.selected || this.select(b); else {
                this.options[i] = b;
                this._tabify();
            }
        },
        _tabId: function(i) {
            return i.title && i.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + c();
        },
        _sanitizeSelector: function(i) {
            return i.replace(/:/g, "\\:");
        },
        _cookie: function() {
            var i = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + e());
            return a.cookie.apply(null, [ i ].concat(a.makeArray(arguments)));
        },
        _ui: function(i, b) {
            return {
                tab: i,
                panel: b,
                index: this.anchors.index(i)
            };
        },
        _cleanup: function() {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
                var i = a(this);
                i.html(i.data("label.tabs")).removeData("label.tabs");
            });
        },
        _tabify: function(i) {
            function b(r, u) {
                r.css("display", "");
                !a.support.opacity && u.opacity && r[0].style.removeAttribute("filter");
            }
            var f = this, j = this.options, l = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = a(" > li:has(a[href])", this.list);
            this.anchors = this.lis.map(function() {
                return a("a", this)[0];
            });
            this.panels = a([]);
            this.anchors.each(function(r, u) {
                var v = a(u).attr("href"), w = v.split("#")[0], x;
                if (w && (w === location.toString().split("#")[0] || (x = a("base")[0]) && w === x.href)) {
                    v = u.hash;
                    u.href = v;
                }
                if (l.test(v)) f.panels = f.panels.add(f.element.find(f._sanitizeSelector(v))); else if (v && v !== "#") {
                    a.data(u, "href.tabs", v);
                    a.data(u, "load.tabs", v.replace(/#.*$/, ""));
                    v = f._tabId(u);
                    u.href = "#" + v;
                    u = f.element.find("#" + v);
                    if (!u.length) {
                        u = a(j.panelTemplate).attr("id", v).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(f.panels[r - 1] || f.list);
                        u.data("destroy.tabs", true);
                    }
                    f.panels = f.panels.add(u);
                } else j.disabled.push(r);
            });
            if (i) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (j.selected === d) {
                    location.hash && this.anchors.each(function(r, u) {
                        if (u.hash == location.hash) {
                            j.selected = r;
                            return false;
                        }
                    });
                    if (typeof j.selected !== "number" && j.cookie) j.selected = parseInt(f._cookie(), 10);
                    if (typeof j.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) j.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
                    j.selected = j.selected || (this.lis.length ? 0 : -1);
                } else if (j.selected === null) j.selected = -1;
                j.selected = j.selected >= 0 && this.anchors[j.selected] || j.selected < 0 ? j.selected : 0;
                j.disabled = a.unique(j.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"), function(r) {
                    return f.lis.index(r);
                }))).sort();
                a.inArray(j.selected, j.disabled) != -1 && j.disabled.splice(a.inArray(j.selected, j.disabled), 1);
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (j.selected >= 0 && this.anchors.length) {
                    f.element.find(f._sanitizeSelector(f.anchors[j.selected].hash)).removeClass("ui-tabs-hide");
                    this.lis.eq(j.selected).addClass("ui-tabs-selected ui-state-active");
                    f.element.queue("tabs", function() {
                        f._trigger("show", null, f._ui(f.anchors[j.selected], f.element.find(f._sanitizeSelector(f.anchors[j.selected].hash))[0]));
                    });
                    this.load(j.selected);
                }
                a(window).bind("unload", function() {
                    f.lis.add(f.anchors).unbind(".tabs");
                    f.lis = f.anchors = f.panels = null;
                });
            } else j.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
            this.element[j.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            j.cookie && this._cookie(j.selected, j.cookie);
            i = 0;
            for (var o; o = this.lis[i]; i++) a(o)[a.inArray(i, j.disabled) != -1 && !a(o).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
            j.cache === false && this.anchors.removeData("cache.tabs");
            this.lis.add(this.anchors).unbind(".tabs");
            if (j.event !== "mouseover") {
                var n = function(r, u) {
                    u.is(":not(.ui-state-disabled)") && u.addClass("ui-state-" + r);
                }, k = function(r, u) {
                    u.removeClass("ui-state-" + r);
                };
                this.lis.bind("mouseover.tabs", function() {
                    n("hover", a(this));
                });
                this.lis.bind("mouseout.tabs", function() {
                    k("hover", a(this));
                });
                this.anchors.bind("focus.tabs", function() {
                    n("focus", a(this).closest("li"));
                });
                this.anchors.bind("blur.tabs", function() {
                    k("focus", a(this).closest("li"));
                });
            }
            var m, p;
            if (j.fx) if (a.isArray(j.fx)) {
                m = j.fx[0];
                p = j.fx[1];
            } else m = p = j.fx;
            var q = p ? function(r, u) {
                a(r).closest("li").addClass("ui-tabs-selected ui-state-active");
                u.hide().removeClass("ui-tabs-hide").animate(p, p.duration || "normal", function() {
                    b(u, p);
                    f._trigger("show", null, f._ui(r, u[0]));
                });
            } : function(r, u) {
                a(r).closest("li").addClass("ui-tabs-selected ui-state-active");
                u.removeClass("ui-tabs-hide");
                f._trigger("show", null, f._ui(r, u[0]));
            }, s = m ? function(r, u) {
                u.animate(m, m.duration || "normal", function() {
                    f.lis.removeClass("ui-tabs-selected ui-state-active");
                    u.addClass("ui-tabs-hide");
                    b(u, m);
                    f.element.dequeue("tabs");
                });
            } : function(r, u) {
                f.lis.removeClass("ui-tabs-selected ui-state-active");
                u.addClass("ui-tabs-hide");
                f.element.dequeue("tabs");
            };
            this.anchors.bind(j.event + ".tabs", function() {
                var r = this, u = a(r).closest("li"), v = f.panels.filter(":not(.ui-tabs-hide)"), w = f.element.find(f._sanitizeSelector(r.hash));
                if (u.hasClass("ui-tabs-selected") && !j.collapsible || u.hasClass("ui-state-disabled") || u.hasClass("ui-state-processing") || f.panels.filter(":animated").length || f._trigger("select", null, f._ui(this, w[0])) === false) {
                    this.blur();
                    return false;
                }
                j.selected = f.anchors.index(this);
                f.abort();
                if (j.collapsible) if (u.hasClass("ui-tabs-selected")) {
                    j.selected = -1;
                    j.cookie && f._cookie(j.selected, j.cookie);
                    f.element.queue("tabs", function() {
                        s(r, v);
                    }).dequeue("tabs");
                    this.blur();
                    return false;
                } else if (!v.length) {
                    j.cookie && f._cookie(j.selected, j.cookie);
                    f.element.queue("tabs", function() {
                        q(r, w);
                    });
                    f.load(f.anchors.index(this));
                    this.blur();
                    return false;
                }
                j.cookie && f._cookie(j.selected, j.cookie);
                if (w.length) {
                    v.length && f.element.queue("tabs", function() {
                        s(r, v);
                    });
                    f.element.queue("tabs", function() {
                        q(r, w);
                    });
                    f.load(f.anchors.index(this));
                } else throw "jQuery UI Tabs: Mismatching fragment identifier.";
                a.browser.msie && this.blur();
            });
            this.anchors.bind("click.tabs", function() {
                return false;
            });
        },
        _getIndex: function(i) {
            if (typeof i == "string") i = this.anchors.index(this.anchors.filter("[href$=" + i + "]"));
            return i;
        },
        destroy: function() {
            var i = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function() {
                var b = a.data(this, "href.tabs");
                if (b) this.href = b;
                var f = a(this).unbind(".tabs");
                a.each([ "href", "load", "cache" ], function(j, l) {
                    f.removeData(l + ".tabs");
                });
            });
            this.lis.unbind(".tabs").add(this.panels).each(function() {
                a.data(this, "destroy.tabs") ? a(this).remove() : a(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            });
            i.cookie && this._cookie(null, i.cookie);
            return this;
        },
        add: function(i, b, f) {
            if (f === d) f = this.anchors.length;
            var j = this, l = this.options;
            b = a(l.tabTemplate.replace(/#\{href\}/g, i).replace(/#\{label\}/g, b));
            i = !i.indexOf("#") ? i.replace("#", "") : this._tabId(a("a", b)[0]);
            b.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var o = j.element.find("#" + i);
            o.length || (o = a(l.panelTemplate).attr("id", i).data("destroy.tabs", true));
            o.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (f >= this.lis.length) {
                b.appendTo(this.list);
                o.appendTo(this.list[0].parentNode);
            } else {
                b.insertBefore(this.lis[f]);
                o.insertBefore(this.panels[f]);
            }
            l.disabled = a.map(l.disabled, function(n) {
                return n >= f ? ++n : n;
            });
            this._tabify();
            if (this.anchors.length == 1) {
                l.selected = 0;
                b.addClass("ui-tabs-selected ui-state-active");
                o.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function() {
                    j._trigger("show", null, j._ui(j.anchors[0], j.panels[0]));
                });
                this.load(0);
            }
            this._trigger("add", null, this._ui(this.anchors[f], this.panels[f]));
            return this;
        },
        remove: function(i) {
            i = this._getIndex(i);
            var b = this.options, f = this.lis.eq(i).remove(), j = this.panels.eq(i).remove();
            if (f.hasClass("ui-tabs-selected") && this.anchors.length > 1) this.select(i + (i + 1 < this.anchors.length ? 1 : -1));
            b.disabled = a.map(a.grep(b.disabled, function(l) {
                return l != i;
            }), function(l) {
                return l >= i ? --l : l;
            });
            this._tabify();
            this._trigger("remove", null, this._ui(f.find("a")[0], j[0]));
            return this;
        },
        enable: function(i) {
            i = this._getIndex(i);
            var b = this.options;
            if (a.inArray(i, b.disabled) != -1) {
                this.lis.eq(i).removeClass("ui-state-disabled");
                b.disabled = a.grep(b.disabled, function(f) {
                    return f != i;
                });
                this._trigger("enable", null, this._ui(this.anchors[i], this.panels[i]));
                return this;
            }
        },
        disable: function(i) {
            i = this._getIndex(i);
            var b = this.options;
            if (i != b.selected) {
                this.lis.eq(i).addClass("ui-state-disabled");
                b.disabled.push(i);
                b.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[i], this.panels[i]));
            }
            return this;
        },
        select: function(i) {
            i = this._getIndex(i);
            if (i == -1) if (this.options.collapsible && this.options.selected != -1) i = this.options.selected; else return this;
            this.anchors.eq(i).trigger(this.options.event + ".tabs");
            return this;
        },
        load: function(i) {
            i = this._getIndex(i);
            var b = this, f = this.options, j = this.anchors.eq(i)[0], l = a.data(j, "load.tabs");
            this.abort();
            if (!l || this.element.queue("tabs").length !== 0 && a.data(j, "cache.tabs")) this.element.dequeue("tabs"); else {
                this.lis.eq(i).addClass("ui-state-processing");
                if (f.spinner) {
                    var o = a("span", j);
                    o.data("label.tabs", o.html()).html(f.spinner);
                }
                this.xhr = a.ajax(a.extend({}, f.ajaxOptions, {
                    url: l,
                    success: function(n, k) {
                        b.element.find(b._sanitizeSelector(j.hash)).html(n);
                        b._cleanup();
                        f.cache && a.data(j, "cache.tabs", true);
                        b._trigger("load", null, b._ui(b.anchors[i], b.panels[i]));
                        try {
                            f.ajaxOptions.success(n, k);
                        } catch (m) {}
                    },
                    error: function(n, k) {
                        b._cleanup();
                        b._trigger("load", null, b._ui(b.anchors[i], b.panels[i]));
                        try {
                            f.ajaxOptions.error(n, k, i, j);
                        } catch (m) {}
                    }
                }));
                b.element.dequeue("tabs");
                return this;
            }
        },
        abort: function() {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr;
            }
            this._cleanup();
            return this;
        },
        url: function(i, b) {
            this.anchors.eq(i).removeData("cache.tabs").data("load.tabs", b);
            return this;
        },
        length: function() {
            return this.anchors.length;
        }
    });
    a.extend(a.ui.tabs, {
        version: "1.8.16"
    });
    a.extend(a.ui.tabs.prototype, {
        rotation: null,
        rotate: function(i, b) {
            var f = this, j = this.options, l = f._rotate || (f._rotate = function(o) {
                clearTimeout(f.rotation);
                f.rotation = setTimeout(function() {
                    var n = j.selected;
                    f.select(++n < f.anchors.length ? n : 0);
                }, i);
                o && o.stopPropagation();
            });
            b = f._unrotate || (f._unrotate = !b ? function(o) {
                o.clientX && f.rotate(null);
            } : function() {
                t = j.selected;
                l();
            });
            if (i) {
                this.element.bind("tabsshow", l);
                this.anchors.bind(j.event + ".tabs", b);
                l();
            } else {
                clearTimeout(f.rotation);
                this.element.unbind("tabsshow", l);
                this.anchors.unbind(j.event + ".tabs", b);
                delete this._rotate;
                delete this._unrotate;
            }
            return this;
        }
    });
})(jQuery);

extend(NestedField, Field);

function NestedField(details, parent) {
    var field = this;
    field.parent = parent;
    NestedField.superConstructor.call(this, details);
}

NestedField.prototype.getValue = function() {
    var field = this;
    var parent = field.parent;
    var fieldIndex = parent.fields.indexOf(field);
    var parentArrayValue = parent.getValue();
    if (parentArrayValue != null) {
        return parentArrayValue[fieldIndex];
    }
    return null;
};

NestedField.prototype.editing = function() {
    var field = this;
    var parent = field.parent;
    if (field.editable) {
        return parent.editing();
    }
    return false;
};

function ArrayField(field, details) {
    var arrayField = this;
    arrayField.field = field;
    arrayField.details = details;
    arrayField.nestedFieldDetails = JSON.parse(JSON.stringify(arrayField.details.field));
    arrayField.nestedFieldDetails["Array"] = false;
    arrayField.nestedFieldDetails["Nested"] = true;
    arrayField.element = $("<div />");
    arrayField.table = $("<div />").addClass("sectiontable").appendTo(arrayField.element);
    arrayField.addButton = $("<button />").addClass("mino_button").text("Add").tappable(function() {
        arrayField.createField();
    }).appendTo(arrayField.element);
    arrayField.fields = [];
    arrayField.createFields();
}

ArrayField.prototype.updateView = function() {
    var arrayField = this;
    if (arrayField.editing()) {
        arrayField.addButton.show();
    } else {
        arrayField.addButton.hide();
    }
    var currentValue = arrayField.getValue();
    if (currentValue != null) {
        var new_fields_array = [];
        for (var i = 0; i < currentValue.length; i++) {
            var field = arrayField.fields[i];
            if (field == null) {
                field = arrayField.createField();
            }
            field.updateView();
            new_fields_array.push(field);
        }
        if (currentValue.length < arrayField.fields.length) {
            for (var i = currentValue.length; i < arrayField.fields.length; i++) {
                var field = arrayField.fields[i];
                field.removeElement();
            }
        }
        arrayField.fields = new_fields_array;
    }
};

ArrayField.prototype.createFields = function() {
    var arrayField = this;
    var fieldType = arrayField.fieldType;
    var fieldDetailsArray = arrayField.getValue();
    arrayField.fields = [];
    arrayField.table.empty();
    for (var i in fieldDetailsArray) {
        arrayField.createField();
    }
};

ArrayField.prototype.createField = function() {
    var arrayField = this;
    var field = new NestedField(arrayField.nestedFieldDetails, arrayField);
    arrayField.fields.push(field);
    field.appendTo(arrayField.table);
    return field;
};

ArrayField.prototype.getValue = function(field) {
    var arrayField = this;
    return arrayField.field.getValue();
};

ArrayField.prototype.editing = function() {
    var arrayField = this;
    return arrayField.field.editing();
};

ArrayField.prototype.removeNested = function(field) {
    var arrayField = this;
    var fieldIndex = arrayField.fields.indexOf(field);
    arrayField.fields.splice(fieldIndex, 1);
    field.removeElement();
};

ArrayField.prototype.error = function(error) {
    var arrayField = this;
    if (error["Invalid"] != undefined) {
        var invalid = error["Invalid"];
        for (var i in invalid) {
            var field = arrayField.fields[i];
            if (field != null) {
                field.error(invalid[i]);
            }
        }
    }
    if (error["Missing"] != undefined) {
        var invalid = error["Missing"];
        for (var i in invalid) {
            var field = arrayField.fields[i];
            if (field != null) {
                field.error(invalid[i]);
            }
        }
    }
};

ArrayField.prototype.hideErrors = function() {
    var arrayField = this;
    for (var i in arrayField.fields) {
        var field = arrayField.fields[i];
        field.hideErrors();
    }
};

ArrayField.prototype.compile = function() {
    var arrayField = this;
    var compiledObject = [];
    for (var i in arrayField.fields) {
        var field = arrayField.fields[i];
        var compiledField = field.compile();
        compiledObject.push(compiledField);
    }
    return compiledObject;
};

function BooleanField(field, details) {
    var booleanField = this;
    booleanField.field = field;
    booleanField.element = $('<input type="checkbox" />').addClass("minofieldinput").on("change", function() {
        if (field.onChange != null) {
            field.onChange();
        }
    });
}

BooleanField.prototype.updateView = function() {
    var booleanField = this;
    var field = booleanField.field;
    if (field.getValue()) {
        booleanField.element.attr("checked", "checked");
    } else {
        booleanField.element.removeAttr("checked");
    }
    if (field.editing() == true) {
        booleanField.element.removeAttr("disabled");
    } else {
        booleanField.element.attr("disabled", "disabled");
    }
};

BooleanField.prototype.compile = function() {
    var booleanField = this;
    return booleanField.element.is(":checked");
};

function ChoiceField(field, details) {
    var choiceField = this;
    choiceField.field = field;
    choiceField.element = $("<select />").addClass("minofieldinput").on("change", function() {
        if (field.onChange != undefined) {
            field.onChange();
        }
    });
    choiceField.choices = details["Parameters"]["Choices"];
    choiceField.textOutput = details["Parameters"]["Text Output"] == undefined ? false : details["Parameters"]["Text Output"];
    if (choiceField.choices != undefined) {
        for (choiceindex in choiceField.choices) {
            $(choiceField.element).append($("<option />").attr("value", choiceindex).text(choiceField.choices[choiceindex]));
        }
    }
    if (field.htmlFormName != undefined) {
        choiceField.element.attr("name", field.htmlFormName);
    }
}

ChoiceField.prototype.updateView = function() {
    var choiceField = this;
    var field = choiceField.field;
    var currentValue = field.getValue();
    if (choiceField.textOutput) {
        var index = choiceField.choices.indexOf(currentValue);
        $($(choiceField.element).children("option")[index]).attr("selected", "selected");
    } else {
        if (currentValue == "") {
            currentValue = 0;
        }
        $($(choiceField.element).children("option")[currentValue]).attr("selected", "selected");
    }
    if (field.editing()) {
        choiceField.element.removeAttr("disabled");
    } else {
        choiceField.element.attr("disabled", "disabled");
    }
};

ChoiceField.prototype.compile = function() {
    var choiceField = this;
    var index = choiceField.element.val();
    if (choiceField.textOutput) {
        return choiceField.choices[index];
    } else {
        return index;
    }
};

function CounterField(field, details) {
    var counterField = this;
    counterField.field = field;
    counterField.details = details;
    var inputName = uniqueIncrementer++;
    counterField.object = field.fieldSection.itemView.object;
    counterField.typeName = field.fieldSection.typeName;
    counterField.initialized = false;
    counterField.inputBox = null;
    counterField.element = $("<div />");
    counterField.inputBox = $("<textarea />").prop("title", details.hintText).addClass("minofieldinput").appendTo(counterField.element).on("focus", function() {
        field.onFocus();
    });
    counterField.buttonDiv = $("<div />").appendTo(counterField.element);
    counterField.plus1Button = $("<button />").addClass("mino_button").css("display", "inline-block").css("margin", "0px").css("margin-right", "5px").text("+1").tappable(function() {
        counterField.modifyCounter(1);
    }).appendTo(counterField.buttonDiv);
    counterField.minus1Button = $("<button />").addClass("mino_button").css("display", "inline-block").css("margin", "0px").css("margin-right", "5px").text("-1").tappable(function() {
        counterField.modifyCounter(-1);
    }).appendTo(counterField.buttonDiv);
    counterField.refreshButton = $("<button />").addClass("mino_button").css("display", "inline-block").css("margin", "0px").css("margin-right", "5px").text("Refresh").tappable(function() {
        counterField.modifyCounter(0);
    }).appendTo(counterField.buttonDiv);
    var setSpan = $("<span />").text("Set ").appendTo(counterField.buttonDiv);
    counterField.setCheckbox = $('<input type="checkbox">').css("margin-right", "10px").appendTo(counterField.buttonDiv);
}

CounterField.prototype.modifyCounter = function(change) {
    var counterField = this;
    var counterAddress = counterField.object.ID + "." + counterField.typeName + "." + counterField.field.name;
    var request = {
        Function: "Counter",
        Parameters: {
            Counters: {}
        }
    };
    request["Parameters"]["Counters"][counterAddress] = change;
    var thisRequest = $.ajax({
        type: "POST",
        url: ajaxAddress,
        data: {
            json: JSON.stringify(request)
        },
        cache: false,
        success: function(returnedData) {
            var returnedJSON = null;
            try {
                returnedJSON = JSON.parse(returnedData);
            } catch (e) {
                alert(JSON.stringify(returnedData));
            }
            var returnedValue = returnedJSON["Counters"][counterAddress];
            counterField.inputBox.val(returnedValue);
        },
        error: function() {}
    });
};

CounterField.prototype.updateView = function() {
    var counterField = this;
    var field = counterField.field;
    var details = counterField.details;
    if (counterField.initialized == false) {
        counterField.initialized = true;
        $(counterField.inputBox).autoResize({
            maxHeight: 400,
            minHeight: 0,
            extraSpace: 0
        });
        setTimeout(function() {
            $(counterField.inputBox).hint();
        }, 1);
    }
    var currentValue = field.getValue();
    if (currentValue != null && currentValue["Set"] != undefined) {
        currentValue = currentValue["Set"];
    }
    $(counterField.inputBox).val(currentValue);
    if (field.editing() == true) {
        $(counterField.buttonDiv).show();
        $(counterField.inputBox).addClass("minofieldinput").removeClass("minofieldvalue").prop("readonly", null).prop("disabled", null).trigger("keyup");
    } else {
        $(counterField.buttonDiv).hide();
        $(counterField.inputBox).removeClass("minofieldinput").addClass("minofieldvalue").prop("readonly", "readonly").prop("disabled", "disabled").trigger("keyup");
    }
    if (counterField.object[counterField.typeName] == undefined) {
        $(counterField.plus1Button).hide();
        $(counterField.minus1Button).hide();
        $(counterField.refreshButton).hide();
    } else {
        $(counterField.plus1Button).show();
        $(counterField.minus1Button).show();
        $(counterField.refreshButton).show();
    }
};

CounterField.prototype.compile = function() {
    var counterField = this;
    if ($(counterField.setCheckbox).is(":checked")) {
        return {
            Set: $(counterField.inputBox).val()
        };
    } else {
        return $(counterField.inputBox).val();
    }
};

var blurClass = "blur";

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isArray(obj) {
    return obj.constructor == Array;
}

function isEmptyObject(object) {
    for (key in object) {
        return false;
    }
    return true;
}

function compileErrorString(errorObject) {
    var string = errorObject["Error"];
    for (key in errorObject) {
        string = string.replace("__" + key + "__", errorObject[key]);
    }
    return string;
}

function Field(details) {
    var field = this;
    field.editable = true;
    field.nested = false;
    field.standalone = false;
    field.hintText = "";
    field.required = true;
    field.array = false;
    field.search = false;
    field.htmlFormName = null;
    field.onChangeCallback = null;
    field.onFocusCallback = null;
    field.parameters = details["Parameters"];
    field.element = $("<div />").addClass("field");
    if (details["HTMLFormName"] != undefined) {
        field.htmlFormName = details["HTMLFormName"];
    }
    if (details["Editable"] == false) {
        field.editable = false;
    }
    if (details["Nested"] != undefined) {
        field.nested = details["Nested"];
    }
    if (details["Standalone"] != undefined) {
        field.standalone = details["Standalone"];
    }
    if (details["Hint"] != undefined) {
        field.hintText = details["Hint"];
    }
    if (details["Required"] == false) {
        field.required = false;
    }
    if (details["Array"] == true) {
        field.array = true;
    }
    if (field.parameters == undefined) {
        field.parameters = {};
    }
    field.type = details["Field Type"];
    field.name = details["Name"];
    field.description = details["Description"];
    field.deprecated = details["Deprecated"];
    if (field.deprecated == null) {
        field.deprecated = false;
    }
    field.valueField = $("<div />").addClass("tablevaluefield").addClass("minofield").data("object", field);
    field.inputDetails = {
        hintText: field.hintText,
        field: details,
        Parameters: details["Parameters"]
    };
    field.createElement();
    field.updateView();
}

Field.prototype.createElement = function() {
    var field = this;
    if (field.array) {
        field.input = new ArrayField(field, field.inputDetails);
        field.input.element.appendTo(field.valueField);
        field.valueField.addClass("arrayValueField");
    } else if (field.type == "Text" || field.type == "Type" || field.type == "Number" || field.type == "URL" || field.type == "Email" || field.type == "User" || field.type == "Version" || field.type == "Date & Time" || field.type == "Date") {
        field.input = new TextField(field, field.inputDetails);
        field.input.element.appendTo(field.valueField);
    } else if (field.type == "Password") {
        field.input = new PasswordField(field, field.inputDetails);
        field.input.element.appendTo(field.valueField);
    } else if (field.type == "Choice") {
        field.input = new ChoiceField(field, field.inputDetails);
        field.input.element.appendTo(field.valueField);
    } else if (field.type == "Counter") {
        field.input = new CounterField(field, field.inputDetails);
        field.input.element.appendTo(field.valueField);
    } else if (field.type == "Boolean") {
        field.input = new BooleanField(field, field.inputDetails);
        field.input.element.appendTo(field.valueField);
    } else if (field.type == "ID") {
        field.input = new IDField(field, field.inputDetails);
        field.input.element.appendTo(field.valueField);
    } else if (field.type == "Link") {
        field.input = new LinkField(field, field.inputDetails);
        field.input.element.appendTo(field.valueField);
    } else if (field.type == "Tree") {
        field.input = new TreeField(field, field.inputDetails);
        field.input.element.appendTo(field.valueField);
    } else if (field.type == "Location") {
        field.input = new LocationField(field, field.inputDetails);
        field.input.element.appendTo(field.valueField);
    } else if (field.type == "Parameters") {
        field.input = new ParametersField(field, field.inputDetails);
        field.input.element.appendTo(field.valueField);
        field.valueField.addClass("nestedValueField");
    } else {
        alert("Unavailable field type requested: " + field.type);
    }
    var tooltipDiv = $("<div />").append($("<span />").addClass("bold").text(field.type));
    if (field.description != undefined) {
        tooltipDiv.append($("<p />").text(field.description).css("width", "200px").css("word-wrap", "break-word"));
    }
    if (field.parameters != undefined && !isEmptyObject(field.parameters)) {
        for (paramInd in field.parameters) {
            var paramVal = field.parameters[paramInd];
            if (Object.prototype.toString.call(paramVal) === "[object Array]") {
                var list = "";
                for (i in paramVal) {
                    if (list != "") {
                        list += ", ";
                    }
                    list += paramVal[i];
                }
                paramVal = list;
            }
            tooltipDiv.append($("<p>").append($("<span />").addClass("bold").html("-" + paramInd + " : <br />")).append($("<span />").text(paramVal)));
        }
    }
    if (!field.nested && !field.standalone) {
        field.titleRow = $("<div />").addClass("titleRow").appendTo(field.element);
        field.titleRow.append(field.nameTD = $("<div />").addClass("name").append(field.titleFieldDiv = $("<div />").addClass("tabletitlefield").append(field.titleText = $("<div />").append($("<span />").addClass("fieldName").text(field.name)))));
        field.titleText.append(field.fieldRequiredSpan = $("<span />").addClass("fieldRequiredSpan"));
        if (field.required) {
            field.fieldRequiredSpan.text("*");
        }
        if (field.deprecated) {
            var deprecatedDiv = $("<div />").append($("<span />").addClass("bold").text("Deprecated ")).append($("<div />").text("This field has been removed from the type."));
            field.titleText.append(field.deprecatedLabel = $("<span />").addClass("deprecatedLabel").text("[Deprecated]"));
            var deprecatedTooltip = new Tooltip(deprecatedDiv, field.deprecatedLabel);
        }
        var tooltip = new Tooltip(tooltipDiv);
        field.titleText.append(tooltip.element);
    }
    field.inputRow = $("<div />").addClass("inputRow").appendTo(field.element);
    if (!field.standalone) {
        field.inputRow.addClass("separatedNameValueRow");
    }
    field.inputRow.append(field.valueTD = $("<div />").append(field.valueField));
    field.errorElement = $("<div />").addClass("errorRow").append($("<div />").append(field.errorTextDiv = $("<div />"))).appendTo(field.element).hide();
    if (field.nested) {
        field.nameTD = field.valueTD;
        field.inputRow.append(field.valueTD = $("<div />").addClass("deleteRowButtonHolder").append(field.removeButton = $("<button />").addClass("mino_button").addClass("redmino_button").addClass("deleteRowButton").text("×").tappable(function() {
            console.log(field.parent);
            field.parent.removeNested(field);
        }).hide()));
    }
    if (field.standalone) {
        field.nameTD = field.valueTD;
    }
};

Field.prototype.appendTo = function(element) {
    var field = this;
    field.element.appendTo(element);
};

Field.prototype.show = function() {
    var field = this;
    field.element.show();
    if (field.inputRow.hasClass("error")) {
        field.errorElement.show();
    }
};

Field.prototype.hide = function() {
    var field = this;
    field.element.hide();
};

Field.prototype.onFocus = function() {};

Field.prototype.onChange = function() {};

Field.prototype.editing = function() {
    var field = this;
    return field.editable;
};

Field.prototype.updateView = function() {
    var field = this;
    if (field.nested) {
        if (field.editing()) {
            field.removeButton.show();
        } else {
            field.removeButton.hide();
        }
    }
    field.input.updateView();
};

Field.prototype.compile = function() {
    var field = this;
    return field.input.compile();
};

Field.prototype.hideErrors = function(error) {
    var field = this;
    field.element.removeClass("error");
    field.errorElement.hide();
    if (field.type == "Parameters" || field.type == "Location" || field.array) {
        field.input.hideErrors();
    }
};

Field.prototype.error = function(error) {
    var field = this;
    field.element.addClass("error");
    field.errorElement.show();
    field.errorTextDiv.text(compileErrorString(error));
    if (field.type == "Parameters" || field.type == "Location" || field.array) {
        field.input.error(error);
    }
};

Field.prototype.removeElement = function() {
    var field = this;
    field.element.remove();
};

Field.prototype.customErrorFunction = function() {
    var field = this;
};

Field.prototype.getValue = function() {
    return null;
};

Field.prototype.setValue = function(val) {
    var field = this;
    var oldGet = field.getValue;
    field.getValue = function() {
        return val;
    };
    field.updateView();
    field.getValue = oldGet;
};

extend(ItemField, Field);

function ItemField(details, fieldSection) {
    var field = this;
    field.fieldSection = fieldSection;
    ItemField.superConstructor.call(this, details);
}

ItemField.prototype.getValue = function() {
    var field = this;
    var fieldSection = field.fieldSection;
    return fieldSection.getValue(field.name);
};

ItemField.prototype.editing = function() {
    var field = this;
    var fieldSection = field.fieldSection;
    if (field.editable) {
        return fieldSection.itemView.editing;
    }
    return false;
};

extend(BaseItemField, Field);

function BaseItemField(details, itemView) {
    var field = this;
    field.itemView = itemView;
    BaseItemField.superConstructor.call(this, details);
}

BaseItemField.prototype.getValue = function() {
    var field = this;
    var itemView = field.itemView;
    return itemView.object[field.name];
};

BaseItemField.prototype.editing = function() {
    var field = this;
    var itemView = field.itemView;
    if (field.editable) {
        return itemView.editing;
    }
    return false;
};

function IDField(field, details) {
    var idField = this;
    idField.field = field;
    idField.details = details;
    var inputName = "id_" + Math.round(Math.random() * 1024);
    idField.initialized = false;
    idField.inputBox = null;
    idField.element = $("<div />");
    idField.newIDDiv = $("<div />").appendTo(idField.element);
    idField.newCheckbox = $('<input type="radio">').attr("name", "radio" + inputName).css("margin-right", "10px").change(function() {
        $(idField.inputBox).hide();
    }).appendTo(idField.newIDDiv);
    var newSpan = $("<span />").text("New item ").appendTo(idField.newIDDiv);
    idField.existingIDDiv = $("<div />").appendTo(idField.element);
    idField.existingCheckbox = $('<input type="radio">').attr("name", "radio" + inputName).css("margin-right", "10px").change(function() {
        $(idField.inputBox).show();
    }).appendTo(idField.existingIDDiv);
    var existingSpan = $("<span />").text("Existing item ").appendTo(idField.existingIDDiv);
    idField.inputBox = $("<textarea />").prop("title", details.hintText).addClass("minofieldinput").appendTo(idField.element).on("focus", function() {
        field.onFocus();
    });
}

IDField.prototype.updateView = function() {
    var idField = this;
    var field = idField.field;
    var details = idField.details;
    if (idField.initialized == false) {
        idField.initialized = true;
        $(idField.inputBox).autoResize({
            maxHeight: 400,
            minHeight: 0,
            extraSpace: 0
        });
        setTimeout(function() {
            $(idField.inputBox).hint();
        }, 1);
    }
    var currentValue = field.getValue();
    $(idField.inputBox).val(currentValue);
    if (field.editing() == true) {
        $(idField.newCheckbox).show().attr("checked", "");
        $(idField.existingCheckbox).show().attr("checked", "");
        $(idField.newIDDiv).show();
        $(idField.existingIDDiv).show();
        if (currentValue == "" || currentValue == null) {
            $(idField.newCheckbox).attr("checked", "checked");
            $(idField.inputBox).hide();
        } else {
            $(idField.existingCheckbox).attr("checked", "checked");
        }
        $(idField.inputBox).addClass("minofieldinput").removeClass("minofieldvalue").prop("readonly", null).prop("disabled", null).trigger("keyup");
    } else {
        $(idField.newIDDiv).hide();
        $(idField.existingIDDiv).hide();
        $(idField.inputBox).show();
        $(idField.inputBox).removeClass("minofieldinput").addClass("minofieldvalue").prop("readonly", "readonly").prop("disabled", "disabled").trigger("keyup");
    }
};

IDField.prototype.compile = function() {
    var idField = this;
    if (!$(idField.inputBox).hasClass(blurClass) && $(idField.existingCheckbox).is(":checked")) {
        if (isNumeric($(idField.inputBox).val())) {
            return parseInt($(idField.inputBox).val());
        }
        return $(idField.inputBox).val();
    }
    return null;
};

function LinkField(field, details) {
    var linkField = this;
    linkField.field = field;
    linkField.details = details;
    linkField.initialized = false;
    linkField.element = $("<div />");
    var linkElement = $("<a />").appendTo(linkField.element).on("click", function(e) {
        if (field.editing() == true) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        } else {
            if (field.element.closest($(mainBrowser.container)).length > 0) {
                if (linkField.inputBox.val() != "") {
                    linkElement.prop("href", "http://minocloud.com/browser/#" + $(linkField.inputBox).val());
                } else {
                    linkElement.prop("href", null);
                }
            } else {
                field.element.closest(".browser").data("object").loadAddress($(linkField.inputBox).val());
            }
            return true;
        }
    });
    var inputElement = $("<div />").appendTo(linkElement);
    linkField.inputBox = $("<textarea />").prop("title", field.hintText).addClass("minofieldinput").on("focus", function() {
        field.onFocus();
    }).addClass("addresslink").appendTo(inputElement);
    var receiveSelectionFunction = function(selection) {
        linkField.inputBox.val(selection);
    };
    linkField.selectButton = $("<button />").addClass("mino_button mino_buttonOnLight linkFieldButton no_top").appendTo(linkField.element).text("Select").tappable(function() {
        selectObjectModal = new SelectObjectModal(linkField, receiveSelectionFunction);
    });
}

LinkField.prototype.updateView = function() {
    var linkField = this;
    var field = linkField.field;
    linkField.inputBox.val(field.getValue());
    if (linkField.initialized == false) {
        linkField.initialized = true;
        linkField.inputBox.autoResize({
            maxHeight: 400,
            minHeight: 0,
            extraSpace: 0
        }).hint();
    }
    if (linkField.setToCurrentButton == undefined && field.getCurrentPath != undefined) {
        linkField.setToCurrentButton = $("<button />").addClass("mino_button mino_buttonOnLight linkFieldButton no_top").css("display", "inline-block").appendTo(linkField.element).text("Set to Current").tappable(function() {
            var currentPath = field.getCurrentPath();
            if (currentPath.charAt(0) == "/") {
                linkField.inputBox.val(currentPath);
            }
        });
        linkField.selectButton.addClass("no_right");
    }
    if (field.editing() == true) {
        linkField.selectButton.show();
        if (linkField.setToCurrentButton != undefined) {
            linkField.setToCurrentButton.show();
        }
        linkField.inputBox.addClass("minofieldinput").removeClass("minofieldvalue").prop("readonly", null).prop("disabled", null).trigger("keyup");
    } else {
        linkField.selectButton.hide();
        if (linkField.setToCurrentButton != undefined) {
            linkField.setToCurrentButton.hide();
        }
        linkField.inputBox.removeClass("minofieldinput").addClass("minofieldvalue").prop("readonly", "readonly").prop("disabled", "disabled").trigger("keyup");
    }
};

LinkField.prototype.compile = function() {
    var linkField = this;
    if (!linkField.inputBox.hasClass(blurClass)) {
        return linkField.inputBox.val();
    }
    return null;
};

function LocationField(field, details) {
    var locField = this;
    locField.field = field;
    locField.details = details;
    locField.distanceFromField = locField.details["Parameters"]["Distance From"] != undefined;
    locField.element = $("<div />");
    var onChangeCallback = function() {
        locField.onChange();
    };
    locField.latitudeSpan = $("<div />").css("font-weight", "bold").css("clear", "left").text("Latitude").appendTo(locField.element);
    var latitudeInputDetails = {
        "Field Type": "Text",
        Standalone: true
    };
    var latitudeTable = $("<table />").addClass("sectiontable").appendTo(locField.element);
    locField.latitudeField = new Field(latitudeInputDetails);
    locField.latitudeField.element.appendTo(latitudeTable);
    locField.latitudeField.errorElement.appendTo(latitudeTable);
    locField.latitudeField.input.onChangeCallback = onChangeCallback;
    locField.longitudeSpan = $("<div />").css("font-weight", "bold").css("clear", "left").text("Longitude").appendTo(locField.element);
    var longitudeInputDetails = {
        "Field Type": "Text",
        Standalone: true
    };
    var longitudeTable = $("<table />").addClass("sectiontable").appendTo(locField.element);
    locField.longitudeField = new Field(longitudeInputDetails);
    locField.longitudeField.element.appendTo(longitudeTable);
    locField.longitudeField.errorElement.appendTo(longitudeTable);
    locField.longitudeField.input.onChangeCallback = onChangeCallback;
    if (locField.distanceFromField) {
        locField.minimumDistanceSpan = $("<div />").css("font-weight", "bold").css("clear", "left").text("Minimum Distance").appendTo(locField.element);
        var minimumDistanceInputDetails = {
            "Field Type": "Number",
            Standalone: true
        };
        var minimumDistanceTable = $("<table />").addClass("sectiontable").appendTo(locField.element);
        locField.minimumDistanceField = new Field(minimumDistanceInputDetails);
        locField.minimumDistanceField.element.appendTo(minimumDistanceTable);
        locField.minimumDistanceField.errorElement.appendTo(minimumDistanceTable);
        locField.maximumDistanceSpan = $("<div />").css("font-weight", "bold").css("clear", "left").text("Maximum Distance").appendTo(locField.element);
        var maximumDistanceInputDetails = {
            "Field Type": "Number",
            Standalone: true
        };
        var maximumDistanceTable = $("<table />").addClass("sectiontable").appendTo(locField.element);
        locField.maximumDistanceField = new Field(maximumDistanceInputDetails);
        locField.maximumDistanceField.element.appendTo(maximumDistanceTable);
        locField.maximumDistanceField.errorElement.appendTo(maximumDistanceTable);
    } else {
        locField.addressSpan = $("<div />").css("font-weight", "bold").css("clear", "left").text("Address").appendTo(locField.element);
        var addressInputDetails = {
            "Field Type": "Text",
            Standalone: true
        };
        var addressTable = $("<table />").addClass("sectiontable").appendTo(locField.element);
        locField.addressField = new Field(addressInputDetails);
        locField.addressField.element.appendTo(addressTable);
        locField.addressField.errorElement.appendTo(addressTable);
    }
    locField.map = new Map();
    locField.map.markerMoved = function(lat, lon) {
        locField.latitudeField.setValue(lat);
        locField.longitudeField.setValue(lon);
    };
    locField.map.element.appendTo(locField.element);
    var currentValue = locField.field.getValue();
    var lat = null, lon = null;
    if (!(currentValue == null || currentValue == "")) {
        lat = currentValue["Location"]["lat"];
        lon = currentValue["Location"]["lon"];
    }
    locField.map.initialize(lat, lon);
    locField.map.element.addClass("borderedMap");
    locField.selectLocationButton = $("<button />").addClass("mino_button").text("Search for Location").css("margin-top", "5px").tappable(function() {
        new MapModal(locField, function(address, lat, lon) {});
    }).appendTo(locField.element);
}

LocationField.prototype.updateView = function() {
    var locField = this;
    var currentValue = locField.field.getValue();
    if (currentValue == null || currentValue == "") {
        currentValue = {
            Location: {
                lat: 0,
                lon: 0
            },
            Address: ""
        };
    }
    console.log(currentValue);
    var editing = locField.field.editing();
    locField.map.setDraggableMarker(editing);
    if (locField.addressField != null) {
        locField.addressField.editable = editing;
        locField.addressField.setValue(currentValue["Address"]);
    }
    if (locField.distanceFromField) {
        locField.minimumDistanceField.editable = editing;
        locField.minimumDistanceField.setValue(currentValue["Minimum Distance"]);
        locField.maximumDistanceField.editable = editing;
        locField.maximumDistanceField.setValue(currentValue["Maximum Distance"]);
    }
    locField.latitudeField.editable = editing;
    locField.longitudeField.editable = editing;
    locField.latitudeField.setValue(currentValue["Location"]["lat"]);
    locField.longitudeField.setValue(currentValue["Location"]["lon"]);
    locField.selectLocationButton.toggle(editing);
    locField.map.setCenter(currentValue["Location"]["lat"], currentValue["Location"]["lon"]);
};

LocationField.prototype.onChange = function() {
    var locField = this;
    var lat = locField.latitudeField.compile();
    var lon = locField.longitudeField.compile();
    if (isNumeric(lat) && isNumeric(lon) && Math.abs(lat) < 180 && Math.abs(lon) < 180) {
        locField.map.setCenter(lat, lon);
    }
};

LocationField.prototype.compile = function() {
    var locField = this;
    var val = {
        Location: {
            lat: locField.latitudeField.compile(),
            lon: locField.longitudeField.compile()
        }
    };
    if (locField.distanceFromField) {
        var compiledMinimum = locField.minimumDistanceField.compile();
        if (compiledMinimum != null && compiledMinimum != "") {
            val["Minimum Distance"] = compiledMinimum;
        }
        var compiledMaximum = locField.maximumDistanceField.compile();
        if (compiledMaximum != null && compiledMinimum != "") {
            val["Maximum Distance"] = compiledMaximum;
        }
        if (compiledMinimum == null && compiledMaximum == null) {
            return null;
        }
    } else {
        var compiledAddress = locField.addressField.compile();
        if (compiledAddress != null && compiledAddress != "") {
            val["Address"] = compiledAddress;
        }
    }
    return val;
};

LocationField.prototype.hideErrors = function() {
    var locField = this;
    if (locField.addressField != null) {
        locField.addressField.hideErrors();
    }
    if (locField.distanceFromField) {
        locField.minimumDistanceField.hideErrors();
        locField.maximumDistanceField.hideErrors();
    }
    locField.latitudeField.hideErrors();
    locField.longitudeField.hideErrors();
};

LocationField.prototype.error = function(error) {
    console.log(error);
    var locField = this;
    if (error["Invalid"] != undefined) {
        if (error["Invalid"]["Location"] != undefined) {
            if (error["Invalid"]["Location"]["Missing"] != undefined) {
                if (error["Invalid"]["Location"]["Missing"]["lat"] != undefined) {
                    locField.latitudeField.error(error["Missing"]["Location"]["Invalid"]["lat"]);
                }
                if (error["Invalid"]["Location"]["Missing"]["lon"] != undefined) {
                    locField.longitudeField.error(error["Invalid"]["Location"]["Invalid"]["lon"]);
                }
            }
            if (error["Invalid"]["Location"]["Invalid"] != undefined) {
                if (error["Invalid"]["Location"]["Invalid"]["lat"] != undefined) {
                    locField.latitudeField.error(error["Invalid"]["Location"]["Invalid"]["lat"]);
                }
                if (error["Invalid"]["Location"]["Invalid"]["lon"] != undefined) {
                    locField.longitudeField.error(error["Invalid"]["Location"]["Invalid"]["lon"]);
                }
            }
        }
        if (error["Invalid"]["Minimum Distance"] != undefined) {
            locField.minimumDistanceField.error(error["Invalid"]["Minimum Distance"]);
        }
        if (error["Invalid"]["Maximum Distance"] != undefined) {
            locField.maximumDistanceField.error(error["Invalid"]["Maximum Distance"]);
        }
    }
    if (error["Missing"] != undefined) {
        if (error["Missing"]["Minimum Distance"] != undefined) {
            locField.minimumDistanceField.error(error["Missing"]["Minimum Distance"]);
        }
        if (error["Missing"]["Maximum Distance"] != undefined) {
            locField.maximumDistanceField.error(error["Missing"]["Maximum Distance"]);
        }
    }
};

function MercatorProjection() {
    var TILE_SIZE = 256;
    this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2, TILE_SIZE / 2);
    this.pixelsPerLonDegree_ = TILE_SIZE / 360;
    this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
}

function bound(value, opt_min, opt_max) {
    if (opt_min != null) value = Math.max(value, opt_min);
    if (opt_max != null) value = Math.min(value, opt_max);
    return value;
}

MercatorProjection.prototype.fromLatLngToPoint = function(latLng, opt_point) {
    var me = this;
    var point = opt_point || new google.maps.Point(0, 0);
    var origin = me.pixelOrigin_;
    point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;
    var siny = bound(Math.sin(Map.degreesToRadians(latLng.lat())), -.9999, .9999);
    point.y = origin.y + .5 * Math.log((1 + siny) / (1 - siny)) * -me.pixelsPerLonRadian_;
    return point;
};

MercatorProjection.prototype.fromPointToLatLng = function(point) {
    var me = this;
    var origin = me.pixelOrigin_;
    var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
    var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
    var lat = Map.radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
    return new google.maps.LatLng(lat, lng);
};

function Map() {
    Map.geocoder = new google.maps.Geocoder();
    var map = this;
    map.element = $("<div />").addClass("googleMap").css("height", "200px").css("clear", "left").data("map", map);
    map.markerMoved = function(lat, lon) {};
    map.markerMoveEnded = function(lat, lon) {};
}

Map.prototype.initialize = function(lat, lon) {
    var map = this;
    if (lat == null) {
        lat = 37.811;
        lon = -122.4775;
    }
    var pos = new google.maps.LatLng(lat, lon);
    var mapOptions = {
        zoom: 15,
        center: pos,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map.visualMap = new google.maps.Map(map.element[0], mapOptions);
    map.marker = new google.maps.Marker({
        title: "Point A",
        position: pos,
        map: map.visualMap,
        draggable: true
    });
    google.maps.event.addListener(map.marker, "drag", function() {
        var pos = map.marker.getPosition();
        map.markerMoved(pos.lat(), pos.lng());
    });
    google.maps.event.addListener(map.marker, "dragend", function() {
        var pos = map.marker.getPosition();
        console.log(pos);
        map.markerMoveEnded(pos.lat(), pos.lng());
    });
    google.maps.event.trigger(map.visualMap, "resize");
};

Map.prototype.setDraggableMarker = function(set) {
    var map = this;
    map.marker.setDraggable(set);
};

Map.prototype.findLatLonForAddress = function(address, callback) {
    var map = this;
    Map.geocoder.geocode({
        address: address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].geometry.location);
            var lat = results[0].geometry.location.lat();
            var lon = results[0].geometry.location.lon();
            map.setCenter(lat, lon);
            callback(lat, lon);
        } else {
            callback(null, null);
        }
    });
};

Map.prototype.findAddressForLatLon = function(lat, lon, callback) {
    var map = this;
    var pos = new google.maps.LatLng(lat, lon);
    Map.geocoder.geocode({
        latLng: pos
    }, function(responses) {
        if (responses && responses.length > 0) {
            callback(responses[0].formatted_address);
        } else {
            callback(null);
        }
    });
};

Map.prototype.setCenter = function(lat, lon) {
    console.log(lat + " , " + lon);
    var map = this;
    var pos = new google.maps.LatLng(lat, lon);
    map.visualMap.setCenter(pos);
    map.marker.setPosition(pos);
};

Map.degreesToRadians = function(deg) {
    return deg * (Math.PI / 180);
};

Map.radiansToDegrees = function(rad) {
    return rad / (Math.PI / 180);
};

function LocationField(details) {
    this.latitudeDiv = $("<div />").css("float", "left").css("width", "200px").css("margin-right", "5px").css("margin-bottom", "5px").appendTo(details.valueField);
    this.latitudeSpan = $("<div />").css("font-weight", "bold").text("Latitude ").appendTo(this.latitudeDiv);
    this.latitudeInput = $('<input type="text"/>').addClass("minofieldinput").addClass("numericinput").appendTo(this.latitudeDiv);
    this.latitudeValue = $("<div />").addClass("minofieldvalue").appendTo(this.latitudeDiv).show();
    this.latitudeError = $("<div />").css("padding", "5px").css("width", "179px").addClass("errorgradient").text("Error").appendTo(this.latitudeDiv).hide();
    this.longitudeDiv = $("<div />").css("float", "left").css("width", "200px").appendTo(details.valueField);
    this.longitudeSpan = $("<div />").css("font-weight", "bold").text("Longitude ").appendTo(this.longitudeDiv);
    this.longitudeInput = $('<input type="text"/>').addClass("minofieldinput").addClass("numericinput").appendTo(this.longitudeDiv);
    this.longitudeValue = $("<div />").addClass("minofieldvalue").appendTo(this.longitudeDiv).show();
    this.longitudeError = $("<div />").css("padding", "5px").css("width", "179px").addClass("errorgradient").text("Error").appendTo(this.longitudeDiv).hide();
    this.updateViewFunction = function() {
        $(this.latitudeError).hide();
        $(this.longitudeError).hide();
        var currentValue = details.getValue();
        if (currentValue == "") {
            currentValue = {
                location: {
                    lat: 0,
                    lon: 0
                }
            };
        }
        if ($(details.element).data("Editing") == true) {
            $(this.latitudeInput).val(currentValue["location"]["lat"]).show();
            $(this.longitudeInput).val(currentValue["location"]["lon"]).show();
            $(this.latitudeValue).hide();
            $(this.longitudeValue).hide();
        } else {
            $(this.latitudeValue).text(currentValue["location"]["lat"]).show();
            $(this.longitudeValue).text(currentValue["location"]["lon"]).show();
            $(this.latitudeInput).hide();
            $(this.longitudeInput).hide();
        }
    };
    this.compileFunction = function() {
        return {
            location: {
                lat: $(this.latitudeInput).val(),
                lon: $(this.longitudeInput).val()
            }
        };
    };
    this.customErrorFunction = function() {
        var errorStruct = $(details.valueField).data("Error");
        if (errorStruct["Invalid"]["location"]["Invalid"]["lat"] != undefined) {
            $(this.latitudeError).show().text(errorStruct["Invalid"]["location"]["Invalid"]["lat"]["Error"]);
        }
        if (errorStruct["Invalid"]["location"]["Invalid"]["lon"] != undefined) {
            $(this.longitudeError).show().text(errorStruct["Invalid"]["location"]["Invalid"]["lon"]["Error"]);
        }
    };
}

extend(ParameterField, Field);

function ParameterField(details, parent) {
    var field = this;
    field.parent = parent;
    ParameterField.superConstructor.call(this, details);
}

ParameterField.prototype.getValue = function() {
    var field = this;
    var parent = field.parent;
    return parent.getValue(field.name);
};

ParameterField.prototype.editing = function() {
    var field = this;
    var parent = field.parent;
    if (field.editable) {
        return parent.editing();
    }
    return false;
};

function ParametersField(field, details) {
    var parameters = this;
    parameters.field = field;
    parameters.element = $("<div />").addClass("sectiontable");
    parameters.fieldType = "";
    parameters.fields = {};
}

ParametersField.prototype.updateView = function() {
    var parameters = this;
    var currentFieldType = parameters.field.editor.attributeFields["Field Type"].compile();
    if (parameters.fieldType != currentFieldType) {
        parameters.fieldType = currentFieldType;
        parameters.createFields();
    }
    for (var i in parameters.fields) {
        var field = parameters.fields[i];
        field.updateView();
    }
};

ParametersField.prototype.createFields = function() {
    var parameters = this;
    var fieldType = parameters.fieldType;
    var fieldDetailsArray = [];
    parameters.fields = {};
    parameters.element.empty();
    if (fieldType == "Text") {
        fieldDetailsArray.push({
            Name: "Minimum Length",
            "Field Type": "Number",
            Description: "The minimum number of characters the value must consist of.",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Maximum Length",
            "Field Type": "Number",
            Description: "The maximum number of characters the value must consist of.",
            Required: false
        });
    } else if (fieldType == "URL") {
        fieldDetailsArray.push({
            Name: "Prefix",
            "Field Type": "Text",
            Description: 'A URL that the value must start with. A prefix of "http://example.com/" would only allow values such as "http://example.com/people/john".',
            Required: false
        });
    } else if (fieldType == "Number") {
        fieldDetailsArray.push({
            Name: "Minimum",
            "Field Type": "Number",
            Description: "The minimum (inclusive) value.",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Maximum",
            "Field Type": "Number",
            Description: "The maximum (inclusive) value.",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Integer",
            "Field Type": "Boolean",
            Description: "Whether or not the value must be an integer (whole number).",
            Required: false
        });
    } else if (fieldType == "Choice") {
        fieldDetailsArray.push({
            Name: "Choices",
            "Field Type": "Text",
            Description: "The choices that are available for selection.",
            Array: true,
            Required: false
        });
    } else if (fieldType == "Boolean") {} else if (fieldType == "User") {} else if (fieldType == "Tree") {} else if (fieldType == "Email") {
        fieldDetailsArray.push({
            Name: "Domain",
            "Field Type": "Text",
            Description: "The domain that the email address must use.",
            Required: false
        });
    } else if (fieldType == "Date") {
        fieldDetailsArray.push({
            Name: "Earliest",
            "Field Type": "Date",
            Description: "The earliest (inclusive) date in the format YYYY-MM-DD.",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Latest",
            "Field Type": "Date",
            Description: "The latest (inclusive) date in the format YYYY-MM-DD.",
            Required: false
        });
    } else if (fieldType == "Date & Time") {
        fieldDetailsArray.push({
            Name: "Earliest",
            "Field Type": "Date & Time",
            Description: "The earliest (inclusive) date & time in the format YYYY-MM-DD HH:MM:SS.",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Latest",
            "Field Type": "Date & Time",
            Description: "The latest (inclusive) date & time in the format YYYY-MM-DD HH:MM:SS.",
            Required: false
        });
    } else if (fieldType == "Link") {
        fieldDetailsArray.push({
            Name: "IDs Allowed",
            "Field Type": "Boolean",
            Description: "Whether or not ID values can be used.",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Paths Allowed",
            "Field Type": "Boolean",
            Description: "Whether or not Path values can be used.",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Items Allowed",
            "Field Type": "Boolean",
            Description: "Whether or not Item Paths can be used.",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Folders Allowed",
            "Field Type": "Boolean",
            Description: "Whether or not Folder Paths can be used.",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Recommended Types",
            "Field Type": "Text",
            Array: true,
            Description: "(Not yet implemented). Types (USERNAME.TYPENAME) or Type Versions (USERNAME.TYPENAME.VERSION) that should be present in the selected Item.",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Child Of",
            "Field Type": "Link",
            Description: "The Folder that any Path that is used must be within.",
            Required: false,
            Parameters: {
                "IDs Allowed": false,
                "Paths Allowed": true,
                "Items Allowed": false,
                "Folders Allowed": true
            }
        });
    }
    for (var i in fieldDetailsArray) {
        var fieldDetails = fieldDetailsArray[i];
        console.log(parameters);
        var field = new ParameterField(fieldDetails, parameters);
        parameters.fields[fieldDetails["Name"]] = field;
        field.appendTo(parameters.element);
    }
};

ParametersField.prototype.editing = function() {
    var parameters = this;
    return parameters.field.editor.editing();
};

ParametersField.prototype.getValue = function(name) {
    var parameters = this;
    var paramVal = parameters.field.getValue();
    if (paramVal != null) {
        return parameters.field.getValue()[name];
    }
    return null;
};

ParametersField.prototype.error = function(error) {
    var parameters = this;
    if (error["Invalid"] != undefined) {
        var invalid = error["Invalid"];
        for (var i in invalid) {
            var field = parameters.fields[i];
            if (field != null) {
                field.error(invalid[i]);
            }
        }
    }
    if (error["Missing"] != undefined) {
        var invalid = error["Missing"];
        for (var i in invalid) {
            var field = parameters.fields[i];
            if (field != null) {
                field.error(invalid[i]);
            }
        }
    }
};

ParametersField.prototype.hideErrors = function() {
    var parameters = this;
    for (var i in parameters.fields) {
        var field = parameters.fields[i];
        field.hideErrors();
    }
};

ParametersField.prototype.compile = function() {
    var parameters = this;
    var compiledObject = {};
    for (var i in parameters.fields) {
        var field = parameters.fields[i];
        var compiledField = field.compile();
        if (compiledField != null) {
            compiledObject[i] = compiledField;
        }
    }
    return compiledObject;
};

function PasswordField(field, details) {
    var passwordField = this;
    passwordField.field = field;
    passwordField.initialized = false;
    passwordField.element = $('<input type="password" />').css("width", "100%").addClass("minofieldinput").prop("title", details.hintText).on("focus", function() {
        field.onFocus();
    });
}

PasswordField.prototype.updateView = function() {
    var passwordField = this;
    var field = passwordField.field;
    $(passwordField.element).val(field.getValue());
    if (field.editing() == true) {
        $(passwordField.element).addClass("minofieldinput").removeClass("minofieldvalue").prop("readonly", null).prop("disabled", null).trigger("keyup");
    } else {
        $(passwordField.element).removeClass("minofieldinput").addClass("minofieldvalue").prop("readonly", "readonly").prop("disabled", "disabled").trigger("keyup");
    }
};

PasswordField.prototype.compile = function() {
    var passwordField = this;
    if (!$(passwordField.element).hasClass(blurClass) && $(passwordField.element).val() != "") {
        return $(passwordField.element).val();
    }
    return null;
};

extend(BaseSearchField, Field);

function BaseSearchField(details, searchPane, useNesting) {
    var field = this;
    field.searchPane = searchPane;
    var newDetails = JSON.parse(JSON.stringify(details));
    if (useNesting) {
        newDetails["Search"] = true;
    }
    BaseSearchField.superConstructor.call(this, newDetails);
}

BaseSearchField.prototype.getValue = function() {
    var field = this;
    var searchPane = field.searchPane;
    return searchPane.search[field.name];
};

BaseSearchField.prototype.editing = function() {
    return true;
};

extend(SearchField, Field);

function SearchField(details, fieldSection) {
    var field = this;
    field.fieldSection = fieldSection;
    SearchField.superConstructor.call(this, details);
}

SearchField.prototype.getValue = function() {
    var field = this;
    return null;
};

SearchField.prototype.editing = function() {
    var field = this;
    return true;
};

SearchField.prototype.createElement = function() {
    var field = this;
    field.valueField.addClass("searchField");
    field.input = new SearchInput(field, field.inputDetails);
    field.input.element.appendTo(field.valueField);
    field.element = $("<div />").addClass("inputrow");
    field.element.append(field.valueTD = $("<div />").append(field.searchFieldBox = $("<div />").addClass("searchFieldBox").append(field.searchFieldNameRow = $("<div />").addClass("searchFieldNameRow").append(field.titleRow = $("<div />").text(field.name).append($("<button />").addClass("mino_button").addClass("plainmino_button").addClass("removemino_button").html("&#215;").tappable(function() {
        field.removePressed();
    })))).append(field.valueField)));
    field.errorElement = $("<div />").addClass("errorrow").append($("<div />").append(field.errorTextDiv = $("<div />"))).hide();
    field.spacingElement = $("<div />").addClass("errorSpacingRow").append($("<div />")).hide();
    if (field.nested) {
        field.element.append(field.valueTD = $("<div />").append(field.removeButton = $("<button />").addClass("mino_button").addClass("redmino_button").addClass("deleteRowButton").text("×").tappable(function() {
            console.log(field.parent);
            field.parent.removeNested(field);
        }).hide()));
    }
};

SearchField.prototype.remove = function() {
    var field = this;
};

SearchField.prototype.removePressed = function() {
    var field = this;
    field.removeElement();
    field.fieldSection.removeField(field.name);
};

SearchField.prototype.hideErrors = function(error) {
    var field = this;
    field.element.removeClass("error");
    field.valueTD.removeClass("error");
    field.errorElement.removeClass("error").hide();
    field.spacingElement.hide();
    field.input.hideErrors();
};

SearchField.prototype.error = function(error) {
    var field = this;
    field.element.addClass("error");
    field.valueTD.addClass("error");
    field.errorElement.addClass("error").show();
    field.spacingElement.show();
    field.errorTextDiv.text(compileErrorString(error));
    field.input.error(error);
};

extend(CoreSearchField, SearchField);

function CoreSearchField(details, searchPane) {
    var field = this;
    field.searchPane = searchPane;
    CoreSearchField.superConstructor.call(this, details);
}

CoreSearchField.prototype.removePressed = function() {
    var field = this;
    field.removeElement();
    field.searchPane.removeCoreField(field.name);
};

extend(SearchAttributeField, Field);

function SearchAttributeField(details, searchInput) {
    var field = this;
    field.searchInput = searchInput;
    SearchAttributeField.superConstructor.call(this, details);
}

SearchAttributeField.prototype.getValue = function() {
    var field = this;
    var searchInput = field.searchInput;
    return searchInput.getValue(field.name);
};

SearchAttributeField.prototype.editing = function() {
    var field = this;
    return true;
};

function SearchInput(field, details) {
    var searchInput = this;
    searchInput.field = field;
    searchInput.details = details;
    searchInput.element = $("<table />").addClass("searchTable").addClass("sectiontable");
    searchInput.fieldType = details.field["Field Type"];
    searchInput.fields = {};
    searchInput.createFields();
}

SearchInput.prototype.updateView = function() {
    var searchInput = this;
    for (var i in searchInput.fields) {
        var field = searchInput.fields[i];
        field.updateView();
    }
};

SearchInput.prototype.createFields = function() {
    var searchInput = this;
    var fieldType = searchInput.fieldType;
    var fieldDetailsArray = [];
    searchInput.fields = {};
    searchInput.element.empty();
    if (fieldType == "Text") {
        fieldDetailsArray.push({
            Name: "Query",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Phrase",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Prefix",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Equal To",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Case-Insensitive Prefix",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Case-Insensitive Equal To",
            "Field Type": "Text",
            Required: false
        });
    } else if (fieldType == "Counter") {
        fieldDetailsArray.push({
            Name: "Minimum",
            "Field Type": "Number",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Equal To",
            "Field Type": "Number",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Maximum",
            "Field Type": "Number",
            Required: false
        });
    } else if (fieldType == "Date & Time") {
        fieldDetailsArray.push({
            Name: "Earliest",
            "Field Type": "Date & Time",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Equal To",
            "Field Type": "Date & Time",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Latest",
            "Field Type": "Date & Time",
            Required: false
        });
    } else if (fieldType == "Date") {
        fieldDetailsArray.push({
            Name: "Earliest",
            "Field Type": "Date",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Equal To",
            "Field Type": "Date",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Latest",
            "Field Type": "Date",
            Required: false
        });
    } else if (fieldType == "Email") {
        fieldDetailsArray.push({
            Name: "Prefix",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Equal To",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Domain",
            "Field Type": "Text",
            Required: false
        });
    } else if (fieldType == "URL") {
        fieldDetailsArray.push({
            Name: "Prefix",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Equal To",
            "Field Type": "Text",
            Required: false
        });
    } else if (fieldType == "Choice") {
        fieldDetailsArray.push({
            Name: "Equal To",
            "Field Type": "Choice",
            Parameters: {
                Choices: searchInput.details["Parameters"]["Choices"]
            },
            Required: false
        });
    } else if (fieldType == "Boolean") {
        fieldDetailsArray.push({
            Name: "Equal To",
            "Field Type": "Boolean",
            Required: false
        });
    } else if (fieldType == "Number") {
        fieldDetailsArray.push({
            Name: "Minimum",
            "Field Type": "Number",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Equal To",
            "Field Type": "Number",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Maximum",
            "Field Type": "Number",
            Required: false
        });
    } else if (fieldType == "Location") {
        fieldDetailsArray.push({
            Name: "Distance From",
            "Field Type": "Location",
            Required: false,
            Parameters: {
                "Distance From": true
            }
        });
    } else if (fieldType == "User") {
        fieldDetailsArray.push({
            Name: "Prefix",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Equal To",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Case-Insensitive Prefix",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Case-Insensitive Equal To",
            "Field Type": "Text",
            Required: false
        });
    } else if (fieldType == "Tree") {
        fieldDetailsArray.push({
            Name: "Contains",
            "Field Type": "Text",
            Required: false
        });
    } else if (fieldType == "Link") {
        fieldDetailsArray.push({
            Name: "Child Of",
            "Field Type": "Link",
            Parameters: {
                "Folders Allowed": true,
                "Paths Allowed": true,
                "IDs Allowed": false,
                "Items Allowed": false
            },
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Prefix",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Equal To",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Case-Insensitive Prefix",
            "Field Type": "Text",
            Required: false
        });
        fieldDetailsArray.push({
            Name: "Case-Insensitive Equal To",
            "Field Type": "Text",
            Required: false
        });
    }
    for (var i in fieldDetailsArray) {
        var fieldDetails = fieldDetailsArray[i];
        var field = new SearchAttributeField(fieldDetails, searchInput);
        searchInput.fields[fieldDetails["Name"]] = field;
        field.appendTo(searchInput.element);
    }
};

SearchInput.prototype.editing = function() {
    var searchInput = this;
    return true;
};

SearchInput.prototype.getValue = function(name) {
    var searchInput = this;
    var gotValue = searchInput.field.getValue();
    if (gotValue == null) {
        return null;
    }
    return gotValue[name];
};

SearchInput.prototype.error = function(error) {
    var searchInput = this;
    if (error["Invalid"] != undefined) {
        var invalid = error["Invalid"];
        for (var i in invalid) {
            var field = searchInput.fields[i];
            if (field != null) {
                field.error(invalid[i]);
            }
        }
    }
    if (error["Missing"] != undefined) {
        var invalid = error["Missing"];
        for (var i in invalid) {
            var field = searchInput.fields[i];
            if (field != null) {
                field.error(invalid[i]);
            }
        }
    }
};

SearchInput.prototype.hideErrors = function() {
    var searchInput = this;
    for (var i in searchInput.fields) {
        var field = searchInput.fields[i];
        field.hideErrors();
    }
};

SearchInput.prototype.compile = function() {
    var searchInput = this;
    var compiledObject = {};
    for (var i in searchInput.fields) {
        var field = searchInput.fields[i];
        var compiledField = field.compile();
        if (compiledField != null) {
            compiledObject[i] = compiledField;
        }
    }
    return compiledObject;
};

function TextField(field, details) {
    var textField = this;
    textField.field = field;
    textField.initialized = false;
    textField.beforeKeyValue = null;
    textField.keyDownEvent = null;
    textField.element = $("<textarea />").addClass("minofieldinput").prop("title", details.hintText).on("keydown", function(e) {
        textField.beforeKeyValue = textField.element.val();
        textField.keyDownEvent = e;
    }).on("keyup", function(e) {
        if (e.keyCode != undefined && textField.keyDownEvent != null) {
            var afterKeyValue = textField.element.val();
            if (textField.beforeKeyValue != null && afterKeyValue != textField.beforeKeyValue) {
                textField.field.onChange();
            }
        }
        textField.keyDownEvent = null;
    }).on("focus", function() {
        textField.field.onFocus();
    });
    if (field.htmlFormName != undefined) {
        textField.element.attr("name", field.htmlFormName);
    }
}

TextField.prototype.updateView = function() {
    var textField = this;
    var field = textField.field;
    textField.element.val(field.getValue());
    if (textField.initialized == false) {
        textField.initialized = true;
        textField.element.autoResize({
            maxHeight: 400,
            minHeight: 0,
            extraSpace: 0
        });
        setTimeout(function() {
            textField.element.hint();
        }, 1);
    }
    if (field.editing() == true) {
        textField.element.addClass("minofieldinput").removeClass("minofieldvalue").prop("readonly", null).prop("disabled", null).trigger("keyup");
    } else {
        textField.element.removeClass("minofieldinput").addClass("minofieldvalue").prop("readonly", "readonly").prop("disabled", "disabled").trigger("keyup");
    }
};

TextField.prototype.compile = function() {
    var textField = this;
    if (!textField.element.hasClass(blurClass) && textField.element.val() != "") {
        return textField.element.val();
    }
    return null;
};

function TreeField(field, details) {
    var treeField = this;
    treeField.field = field;
    treeField.initialized = false;
    treeField.element = $("<textarea />").addClass("minofieldinput").prop("title", details.hintText).on("focus", function() {
        field.onFocus();
    });
    if (field.htmlFormName != undefined) {
        treeField.element.attr("name", field.htmlFormName);
    }
}

TreeField.prototype.updateView = function() {
    var treeField = this;
    var field = treeField.field;
    var stringified = field.getValue();
    if (stringified != null && typeof stringified === "object" && stringified.length == 0) {
        stringified = {};
    } else {
        try {
            stringified = JSON.parse(stringified);
        } catch (e) {}
    }
    if (stringified != null) {
        stringified = JSON.stringify(stringified);
    }
    treeField.element.val(stringified);
    if (treeField.initialized == false) {
        treeField.initialized = true;
        treeField.element.autoResize({
            maxHeight: 400,
            minHeight: 0,
            extraSpace: 0
        });
        setTimeout(function() {
            treeField.element.hint();
        }, 1);
    }
    if (field.editing() == true) {
        treeField.element.addClass("minofieldinput").removeClass("minofieldvalue").prop("readonly", null).prop("disabled", null).trigger("keyup");
    } else {
        treeField.element.removeClass("minofieldinput").addClass("minofieldvalue").prop("readonly", "readonly").prop("disabled", "disabled").trigger("keyup");
    }
};

TreeField.prototype.compile = function() {
    var treeField = this;
    if (!treeField.element.hasClass(blurClass) && treeField.element.val() != "") {
        return treeField.element.val();
    }
    return null;
};

function TypeField(details) {
    var initialized = false;
    var linkElement = $("<a />").appendTo(details.valueField).on("click", function(e) {
        if (details.element.data("Editing") == true) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        } else {
            if ($(this.inputBox).val() != "") {
                linkElement.prop("href", "http://minocloud.com/browser/#" + $(inputBox).val());
            } else {
                linkElement.prop("href", null);
            }
            return true;
        }
    });
    this.linkElement = linkElement;
    this.inputBox = $("<textarea />").addClass("minofieldinput").appendTo(this.linkElement).on("focus", function() {
        $(valueField).data("onChange")();
    }).removeClass("autogrowresize").addClass(details.valueClass);
    this.updateViewFunction = function() {
        $(this.inputBox).val(details.getValue());
        if (initialized == false) {
            initialized = true;
            $(this.inputBox).autoResize({
                maxHeight: 400,
                minHeight: 0,
                extraSpace: 0
            }).hint();
        }
    };
    this.compileFunction = function() {
        if (!$(this.inputBox).hasClass(blurClass)) {
            return $(this.inputBox).val();
        }
        return "";
    };
}

function TypeNameField(details) {
    this.usernameSpan = $("<span />").text(username + ".").appendTo(details.valueField);
    this.inputBox = $('<input type="text"/>').addClass("minofieldinput").appendTo(details.valueField).on("focus", function() {
        $(details.valueField).data("onChange")();
    }).hide();
    this.versionNumberSpan = $("<span />").text(".*").appendTo(details.valueField);
    this.namevalue = $("<div />").addClass("minofieldvalue").addClass(details.valueClass).appendTo(details.valueField).show();
    this.updateViewFunction = function() {
        if ($(details.element).data("Editing") == true) {
            var currentValue = details.getValue();
            var typeNameParts = currentValue.split(".");
            $(this.inputBox).val(typeNameParts[1]);
            $(this.usernameSpan).show();
            $(this.inputBox).show();
            $(this.versionNumberSpan).show();
            $(this.namevalue).hide();
        } else {
            $(this.usernameSpan).hide();
            $(this.inputBox).hide();
            $(this.versionNumberSpan).hide();
            $(this.namevalue).text(details.getValue()).show();
        }
    };
    this.compileFunction = function() {
        return username + "." + $(this.inputBox).val();
    };
}

function LoadingIndicator() {
    var li = this;
    li.cancel_press = function() {};
    li.element = $("<div />").addClass("loading_indicator").append(li.loader_element = $("<div />").addClass("loader").css("float", "left").css("margin-left", "20px").height("30px").width("60px").html("&#9608;")).append($("<button />").addClass("mino_button").addClass("loading_cancel_button").text("Cancel").tappable(function() {
        li.cancel_press();
    }));
    li.flip = false;
    li.attached = false;
    li.interval = setInterval(function() {
        if (!li.attached || jQuery.contains(document.documentElement, li.element[0])) {
            li.loader_element.html(li.flip ? "&#9608;" : "__");
            li.flip = !li.flip;
            li.attached = true;
        } else {
            clearInterval(li.interval);
        }
    }, 300);
}

LoadingIndicator.prototype.show = function() {
    var li = this;
    li.element.show();
};

LoadingIndicator.prototype.hide = function() {
    var li = this;
    li.element.hide();
};

function Logo(size, theme) {
    var logo = this;
    logo.scale1_width = 70;
    logo.scale1_height = 46;
    logo.size = size;
    logo.dark = theme == "dark";
    logo.current = "logo";
    logo.has3d = logo.has_3d_check();
    logo.element = $("<div />").addClass("logo");
    if (logo.has3d) {
        logo.element.addClass("logo3d").append(logo.perspective = $("<div />").addClass("perspective").append(logo.shape = $("<div />").addClass("shape").append($("<div />").addClass("base")).append($("<div />").addClass("triangle").append($("<div />").addClass("left")).append($("<div />").addClass("right"))))).append($("<div />").addClass("transformAccessories messageDependant messagesNotificationAlert").text("5")).append($("<div />").addClass("transformAccessories pencilDependant pencilEnd").append($("<div />").addClass("left")).append($("<div />").addClass("right"))).append($("<div />").addClass("transformAccessories houseDependant door"));
        setTimeout(function() {
            logo.element.addClass("animated");
        }, 10);
    } else {
        logo.element.addClass("logo2d").append(logo = $("<div />").addClass("shape"));
    }
}

Logo.prototype.change_width = function(new_width) {
    var logo = this;
    var scale = new_width / logo.scale1_width;
    logo.perspective.css({
        "-ms-transform": "scale3d(" + scale + "," + scale + "," + scale + ")",
        "-moz-transform": "scale3d(" + scale + "," + scale + "," + scale + ")",
        "-webkit-transform": "scale3d(" + scale + "," + scale + "," + scale + ")",
        transform: "scale3d(" + scale + "," + scale + "," + scale + ")"
    });
    logo.element.css({
        width: new_width,
        height: new_width * (logo.scale1_height / logo.scale1_width)
    });
};

Logo.prototype.changeTo = function(new_choice) {
    var logo = this;
    if (has3d) {
        if (logo.current != "logo") {
            element.removeClass(logo.current);
        }
        logo.current = new_choice;
        if (new_choice != "logo") {
            element.addClass(logo.current);
        }
    } else {
        if (images2d[data.current] != undefined) {
            $(images2d[data.current]).fadeOut();
        }
        if (images2d[new_choice] != undefined) {
            images2d[new_choice].fadeIn();
        }
    }
    data.current = new_choice;
};

Logo.prototype.has_3d_check = function() {
    var logo = this;
    var el = document.createElement("p"), has3d, transforms = {
        webkitTransform: "-webkit-transform",
        MozTransform: "-moz-transform"
    };
    document.body.insertBefore(el, null);
    for (var t in transforms) {
        if (el.style[t] !== undefined) {
            el.style[t] = "translate3d(1px,1px,1px)";
            has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
    }
    document.body.removeChild(el);
    return has3d !== undefined && has3d.length > 0 && has3d !== "none";
};

extend(AlertModal, Modal);

function AlertModal(title) {
    var modal = this;
    modal.okClosesModal = true;
    AlertModal.superConstructor.call(this, title);
    modal.bottomBar.append($("<button />").addClass("mino_button singleButton noBorder").text("OK").tappable(function(e) {
        if (e.target !== this) {
            return;
        }
        modal.close();
    }));
    $(document).on("keyup.alertModal", function(e) {
        if (e.keyCode == 27) {
            modal.close();
        } else if (e.keyCode == 13) {
            if (modal.okClosesModal) {
                modal.close();
            }
        }
    });
}

extend(DialogModal, Modal);

function DialogModal(title) {
    var modal = this;
    DialogModal.superConstructor.call(this, title);
    modal.cancelCallback = function() {};
    modal.okCallback = function() {};
    modal.okClosesModal = true;
    modal.bottomBar.append(modal.cancelButton = $("<button />").addClass("mino_button leftButton noBorder").text("Cancel").tappable(function(e) {
        if (e.target !== this) {
            return;
        }
        modal.cancelCallback();
        modal.closeModal();
    })).append(modal.okButton = $("<button />").addClass("mino_button rightButton no_top no_right no_bottom").text("OK").tappable(function(e) {
        if (e.target !== this) {
            return;
        }
        modal.okCallback();
        if (modal.okClosesModal) {
            modal.closeModal();
        }
    }));
    $(document).on("keyup.dialogModal", function(e) {
        if (e.keyCode == 27) {
            modal.cancelCallback();
            modal.closeModal();
        } else if (e.keyCode == 13) {
            modal.okCallback();
            if (modal.okClosesModal) {
                modal.closeModal();
            }
        }
    });
}

DialogModal.prototype.closeModal = function() {
    var modal = this;
    $(document).off("keyup.dialogModal");
    modal.close();
};

DialogModal.prototype.setButtonText = function(cancelString, okString) {
    var modal = this;
    modal.cancelButton.text(cancelString);
    modal.okButton.text(okString);
};

function FullScreenModal(titleText) {
    var modal = this;
    modal.closeCallback = function() {};
    modal.onFinishedLoading = function() {};
    if (titleText == undefined) {
        titleText = "";
    }
    modal.closable = true;
    modal.shadow = $("<div />").addClass("modalShadow").appendTo("body").hide();
    modal.window = $("<div />").addClass("modal").addClass("fullScreenModal").append(modal.topBar = $("<div />").addClass("modalTitle").append(modal.title = $("<div />").addClass("modalTitleText").text(titleText)).append($("<button />").addClass("mino_button modalCloseButton no_top no_right no_bottom").css("float", "right").text("×").tappable(function() {
        modal.close();
    }))).append(modal.view = $("<div />").addClass("modalContents")).append(modal.bottomBar = $("<div />").addClass("modalBottomBar").addClass("interfacebox")).appendTo("body").hide();
    $(document).on("keyup.fullScreenModal", function(e) {
        if (e.keyCode == 27) {
            modal.close();
        }
    });
    resize(false);
    modal.shadow.fadeIn(400);
    modal.window.fadeIn(400, function() {
        resize(false);
        modal.onFinishedLoading();
    });
}

FullScreenModal.prototype.close = function() {
    var modal = this;
    if (modal.closable) {
        modal.window.remove();
        modal.shadow.remove();
        $(document).off("keyup.fullScreenModal");
        modal.closeCallback();
    }
};

function Modal(titleText, zIndex) {
    var modal = this;
    if (zIndex == null) {
        zIndex = 2001;
    }
    modal.closeCallback = function() {};
    modal.onFinishedLoading = function() {};
    if (titleText == undefined) {
        titleText = "";
    }
    modal.shadow = $("<div />").addClass("modalShadow").appendTo("body").css("z-index", zIndex).hide();
    if (modal.height == undefined) {
        modal.height = 300;
    }
    modal.window = $("<div />").addClass("modal").css("z-index", zIndex + 1).css("height", modal.height + "px").css("margin-top", -(modal.height / 2) + "px").append(modal.TopBar = $("<div />").addClass("modalTitle").append(modal.title = $("<div />").addClass("modalTitleText").text(titleText)).append($("<button />").addClass("mino_button modalCloseButton no_top no_right no_bottom").css("float", "right").text("×").tappable(function() {
        modal.close();
    }))).append(modal.view = $("<div />").addClass("modalContents")).append(modal.bottomBar = $("<div />").addClass("modalBottomBar").addClass("interfacebox")).hide().appendTo("body");
    $(document).on("keyup.modal", function(e) {
        if (e.keyCode == 27) {
            modal.close();
        }
    });
    resize(false);
    modal.shadow.show();
    modal.window.fadeIn(400, function() {
        resize(false);
        modal.onFinishedLoading();
    });
}

Modal.prototype.close = function() {
    var modal = this;
    modal.window.remove();
    modal.shadow.remove();
    $(document).off("keyup.modal");
    if (modal.callbackCalled == undefined) {
        modal.callbackCalled = true;
        modal.closeCallback();
    }
};

function Tooltip(infoElement, labelElement) {
    var tooltip = this;
    tooltip.showing = false;
    if (labelElement != null) {
        tooltip.element = labelElement;
        tooltip.element.data("object", tooltip);
    } else {
        tooltip.element = $("<div />").addClass("tooltipHelper").data("object", tooltip).text("[?]");
    }
    if (isTouchscreen) {
        tooltip.element.tappable(function() {
            tooltip.show();
        });
    } else {
        tooltip.element.on("mouseenter", function() {
            tooltip.show();
        });
        tooltip.element.on("mouseleave", function() {
            tooltip.hide();
        });
    }
    tooltip.holder = $("<div />").addClass("tooltipInfoHolder").append(infoElement);
}

Tooltip.prototype.hide = function() {
    var tooltip = this;
    tooltip.showing = false;
    tooltip.holder.remove();
};

Tooltip.prototype.show = function() {
    var tooltip = this;
    tooltip.showing = true;
    tooltip.holder.css("left", "0px").appendTo("body");
    var left = tooltip.element.offset().left;
    var top = tooltip.element.offset().top + 20;
    var screenWidth = $(window).width();
    var maxWidth = screenWidth - left - (40 + scrollBarWidth());
    if (maxWidth < 220) {
        tooltip.holder.css("top", top + "px");
        tooltip.holder.css("left", screenWidth - 220 + "px");
    } else {
        tooltip.holder.css("top", top + "px");
        tooltip.holder.css("left", left + "px");
    }
};

function TopBar() {
    var topBar = this;
    topBar.menuButton = null;
    topBar.rightButton = null;
    topBar.element = $("<div />").addClass("topBar").addClass("navbar-inner").append(topBar.title = $("<div />").addClass("title").addClass("unselectable"));
}

TopBar.prototype.setTitle = function(text) {
    var topBar = this;
    topBar.title.text(text);
};

TopBar.prototype.setRightButton = function(callback, html) {
    var topBar = this;
    topBar.element.append(topBar.rightButton = $("<button />").addClass("mino_button").addClass("lightmino_button").addClass("topBarRightButton").append($("<div />").html(html)).tappable(callback));
};

TopBar.prototype.setRightButtonStatus = function(active) {
    var topBar = this;
    if (topBar.rightButton != null) {
        topBar.rightButton.toggleClass("active", active);
    }
};

TopBar.prototype.removeRightButton = function() {
    var topBar = this;
    if (topBar.rightButton != null) {
        topBar.rightButton.remove();
        topBar.rightButton = null;
    }
};

TopBar.prototype.setMenuButton = function(callback, text) {
    var topBar = this;
    if (text == undefined) {
        text = "__<br/>__<br/>__";
    }
    if (topBar.menuButton != null) {
        topBar.menuButton.remove();
    }
    topBar.element.append(topBar.menuButton = $("<button />").addClass("mino_button").addClass("lightmino_button").addClass("topBarLeftButton").append($("<div />").html(text)).tappable(callback));
};

function BodyContentsHolder() {
    var bch = this;
    bch.element = $("<div />").addClass("body_contents_holder").append(bch.contents = $("<div />").addClass("contents"));
}

BodyContentsHolder.prototype.resize = function(resize_obj) {
    var bch = this;
    bch.contents.css({
        "min-height": resize_obj.doc_height - 40 + "px"
    });
};

BodyContentsHolder.prototype.set_transparent = function(set) {
    var bch = this;
    bch.element.toggleClass("transparent", set);
};

function Footer() {
    var f = this;
    f.element = $("<div />").addClass("footer").append($("<div />").text("© 2013 MinoCloud Inc.")).append(f.contact_link = $("<a />").attr("href", "/contact/").text("Contact Us").ajax_url());
}

Footer.prototype.hide = function() {
    var f = this;
    f.element.fadeOut(500);
};

Footer.prototype.show = function() {
    var f = this;
    f.element.fadeIn(500);
};

Footer.prototype.hide_contact_link = function() {
    var f = this;
    f.contact_link.hide();
};

Footer.prototype.show_contact_link = function() {
    var f = this;
    f.contact_link.show();
};

function Header() {
    var header = this;
    header.element = $("<div />").addClass("header").append($("<div />").addClass("top_header")).append($("<div />").addClass("fixed_header").append($("<div />").addClass("center_holder").append($("<div />").addClass("menu_center center").append(header.logo = $("<div />").attr("id", "logo").append($("<a />").attr("href", "/").ajax_url().append($("<div />").attr("id", "topLogo")))).append(header.menu_items_holder = $("<div />").addClass("menu_items_holder").append($("<a />").attr("href", "/beta/").ajax_url().append(header.menu_beta = $("<button />").addClass("mino_button menu_item no_top no_bottom").text("Beta"))).append($("<a />").attr("href", "/docs/").ajax_url().append(header.menu_docs = $("<button />").addClass("mino_button menu_item no_top no_right no_bottom").text("Docs"))).append($("<a />").attr("href", "/features/").ajax_url().append(header.menu_features = $("<button />").addClass("mino_button menu_item no_top no_right no_bottom").text("Features"))).append($("<a />").attr("href", "/").ajax_url().append(header.menu_minocloud = $("<button />").attr("id", "mino_menu_item").addClass("mino_button menu_item no_top no_bottom").append($("<div />").addClass("button_contents").append($("<div />").addClass("logo logo24 dark").append($("<div />").addClass("left")).append($("<div />").addClass("right"))).append($("<span />").text("MinoCloud")))))))));
}

Header.prototype.hide = function() {
    var header = this;
    header.element.addClass("hidden");
};

Header.prototype.show = function() {
    var header = this;
    header.element.removeClass("hidden");
};

Header.prototype.resize = function(resize_obj) {
    var header = this;
    var fixed_size = 100;
    var mino_ratio = 1.5;
    var mino_size = fixed_size * mino_ratio;
    if (resize_obj.body_width < fixed_size * 3 + mino_size) {
        var button_size = Math.round(resize_obj.body_width / (3 + mino_ratio));
        var mino_size = resize_obj.body_width - 3 * button_size;
        header.menu_minocloud.width(mino_size);
        header.menu_beta.width(Math.ceil(button_size));
        header.menu_docs.width(Math.floor(button_size));
        header.menu_features.width(Math.floor(button_size));
        header.menu_minocloud.addClass("no_right");
    } else {
        header.menu_minocloud.width(fixed_size * mino_ratio);
        header.menu_beta.width(fixed_size);
        header.menu_docs.width(fixed_size);
        header.menu_features.width(fixed_size);
        header.menu_minocloud.removeClass("no_right");
    }
};

extend(AuthPage, Page);

function AuthPage(parameters, url, wildcard_contents) {
    var page = this;
    AuthPage.superConstructor.call(this);
    page.title = null;
    page.login_box = new LoginBox();
    page.element.addClass("auth_page").append(page.login_box.element);
}

Site.add_url("/auth/", AuthPage);

AuthPage.prototype.new_url = function(parameters, url, wildcard_contents) {
    var page = this;
};

AuthPage.prototype.get_title = function() {
    var page = this;
    return "Authenticate";
};

AuthPage.prototype.init = function() {
    var page = this;
    page.login_box.reposition_box();
    body_contents_holder.set_transparent(true);
    header.hide();
    footer.hide();
};

AuthPage.prototype.remove = function() {
    var page = this;
    body_contents_holder.set_transparent(false);
    header.show();
    footer.show();
};

AuthPage.prototype.resize = function(resize_obj) {
    var page = this;
};

function LoginBox() {
    var lb = this;
    var posted_username = "Inserted username";
    var posted_email = "Inserted email";
    var auth_mode = "new";
    lb.logo = new Logo();
    lb.element = $("<div />").addClass("login_box").append(lb.user_message_area = $("<div />").addClass("user_message_area").text("user_message_area").hide()).append(lb.logo_header = $("<div />").addClass("logo_header").append(lb.logo.element.addClass("dark logo52")).append(lb.login_box_title = $("<a />").attr("href", "/").ajax_url().addClass("login_box_title").text("MinoCloud"))).append($("<div />").addClass("auth_mode_option_area").append($("<label />").append(lb.existing_user_radio = $('<input type="radio" /">').attr("name", "auth_mode").attr("value", "existing").on("change", function() {
        lb.switch_mode(true);
    })).append($("<span />").text("Existing user"))).append($("<label />").append(lb.new_user_radio = $('<input type="radio" /">').attr("name", "auth_mode").attr("value", "new").on("change", function() {
        lb.switch_mode(true);
    })).append($("<span />").text("New user"))).append($("<label />").append(lb.forgot_radio = $('<input type="radio" /">').attr("name", "auth_mode").attr("value", "forgot").on("change", function() {
        lb.switch_mode(true);
    })).append($("<span />").text("Forgot")))).append(lb.username_input = $('<input type="text" >').addClass("login_form_field dark_border").attr("autocomplete", "off").attr("spellcheck", "false").attr("name", "username").attr("title", "Username").val(posted_username).hint()).append(lb.username_error = $("<div />").addClass("auth_field_error").text("username_error").hide()).append(lb.email_input = $('<input type="email" />').addClass("login_form_field dark_border").attr("autocomplete", "off").attr("name", "email").attr("title", "Email").val(posted_email).hint()).append(lb.email_error = $("<div />").addClass("auth_field_error").text("email_error").hide()).append(lb.password_input = $('<input type="password" />').addClass("login_form_field dark_border").attr("autocomplete", "off").attr("name", "password").attr("title", "Password").hint()).append(lb.password_error = $("<div />").addClass("auth_field_error").text("password_error").hide()).append($("<div />").addClass("buttons").append($("<a />").addClass("form_double_button").append($("<button />").addClass("mino_button left_button").text("Back (broken)"))).append($("<div />").addClass("form_double_button").append(lb.confirm_button = $('<button type="submit" />').addClass("mino_button minoGreenButton right_button").text("Sign Up").tappable(function() {
        lb.confirm_press();
    }))));
    lb.redirect = null;
    lb.animate_time = 300;
    if (auth_mode == "new") {
        lb.existing_user_radio.attr("checked", null);
        lb.forgot_radio.attr("checked", null);
        lb.new_user_radio.attr("checked", "checked");
    } else if (auth_mode == "existing") {
        lb.new_user_radio.attr("checked", null);
        lb.forgot_radio.attr("checked", null);
        lb.existing_user_radio.attr("checked", "checked");
    } else {
        lb.new_user_radio.attr("checked", null);
        lb.existing_user_radio.attr("checked", null);
        lb.forgot_radio.attr("checked", "checked");
    }
    lb.switch_mode(false);
    lb.reposition_box();
}

LoginBox.prototype.confirm_press = function() {
    var lb = this;
    MinoCloud_api("http://minocloud.com/auth/api", "Sign In", {
        Username: "MarkDoe",
        Password: "ulhatuuohfihasf"
    }, function(response) {
        console.log(response);
    }, function(error) {
        alert(JSON.stringify(error));
        console.log(error);
    });
};

LoginBox.prototype.update_redirect = function(app_data) {
    var lb = this;
    lb.redirect = new RedirectOption("FALSE NAME", app_data, "signup", function() {
        lb.redirect.element.fadeOut(function() {
            lb.redirect.element.remove();
        });
        lb.redirect.element.css("position", "absolute");
        lb.reposition_box(true);
    });
    lb.redirect.element.appendTo(lb.element);
};

LoginBox.prototype.switch_mode = function(animate) {
    var lb = this;
    var auth_mode = $("input[name=auth_mode]:checked").val();
    if (auth_mode == "new") {
        lb.email_input.slideDown(lb.animate_time).fadeIn(lb.animate_time);
        lb.password_input.slideDown(lb.animate_time, function() {
            lb.reposition_box(animate);
        }).fadeIn(lb.animate_time);
        lb.username_input.attr("title", "Username").hint();
        lb.confirm_button.text("Sign Up");
        if (lb.redirect != null) {
            lb.redirect.update_mode("new");
        }
    } else if (auth_mode == "existing") {
        lb.email_input.slideUp(lb.animate_time).fadeOut(lb.animate_time);
        lb.password_input.slideDown(lb.animate_time).fadeIn(lb.animate_time);
        lb.username_input.attr("title", "Username or Email").hint();
        lb.confirm_button.text("Sign In");
        if (lb.redirect != null) {
            lb.redirect.update_mode("existing");
        }
    } else {
        lb.email_input.slideUp(lb.animate_time).fadeOut(lb.animate_time);
        lb.password_input.slideUp(lb.animate_time).fadeOut(lb.animate_time);
        lb.username_input.attr("title", "Username or Email").hint();
        lb.confirm_button.text("Reset Password");
        if (lb.redirect != null) {
            lb.redirect.update_mode("existing");
        }
    }
    if (animate) {
        lb.hide_errors();
    }
};

LoginBox.prototype.reposition_box = function(animate) {
    var lb = this;
    if (animate != undefined && animate) {
        lb.element.animate({
            "margin-top": -(lb.element.height() / 2) + "px"
        });
    } else {
        lb.element.css("margin-top", -(lb.element.height() / 2) + "px");
    }
};

LoginBox.prototype.hide_errors = function() {
    var lb = this;
    lb.username_error.slideUp(lb.animate_time);
    lb.email_error.slideUp(lb.animate_time);
    lb.password_error.slideUp(lb.animate_time);
    lb.user_message_area.slideUp(lb.animate_time);
};

extend(DocsPage, Page);

function DocsPage(parameters, url, wildcard_contents) {
    var page = this;
    DocsPage.superConstructor.call(this);
    page.title = null;
    page.current_doc = null;
    page.current_hash = null;
    page.side_menu = new SideMenu(page);
    page.element.addClass("docs_page").append($("<div />").addClass("body_text").append(page.headline = $("<div />").addClass("body_headline").text("Loading...")).append(page.content = $("<div />").addClass("doc").text("Loading..."))).append($("<button />").addClass("mino_button menu_expand_button").html("&#9776;&nbsp;Menu").tappable(function() {
        page.side_menu.toggle_menu();
    })).append(page.side_menu.element);
    if (wildcard_contents == null) {
        setTimeout(function() {
            Site.load_url("/docs/Get_Started");
        }, 1);
        return;
    }
    page.show_doc(wildcard_contents);
}

Site.add_url("/docs/", DocsPage);

Site.add_url("/docs/*", DocsPage);

DocsPage.prototype.new_url = function(parameters, url, wildcard_contents) {
    var page = this;
    page.doc = wildcard_contents;
    page.title = wildcard_contents;
    page.show_doc(wildcard_contents);
    document.title = page.title + " - " + page_title_append;
};

DocsPage.prototype.get_title = function() {
    var page = this;
    if (page.title == null) {
        return "Docs";
    } else {
        return page.title;
    }
};

DocsPage.prototype.show_doc = function(address) {
    var page = this;
    window.scrollTo(0, 0);
    if (address == null) {
        return;
    }
    var folder_split = address.split("/");
    var folder = null;
    var doc_address = null;
    if (folder_split.length > 1) {
        folder = folder_split[0];
        doc_address = folder_split[1];
    } else {
        doc_address = folder_split[0];
    }
    var hash_split = doc_address.split("#");
    var doc_name = hash_split[0].replaceAll("_", " ");
    var hash = hash_split[1];
    if (page.current_doc == doc_name) {
        if (current_hash != hash && hash != null) {
            var aTag = $("a[name='" + hash + "']");
            $("body").animate({
                scrollTop: aTag.offset().top - 40
            }, "slow");
        }
        return;
    }
    var doc = page.side_menu.get_and_select_doc(folder, doc_name);
    if (doc == null) {
        document.title = "Not found - Docs - MinoCloud™";
        page.headline.text("Page not found: " + doc_name);
        page.content.text("Please use the menu on the left to select a topic.");
    } else {
        var doc_file_name = doc[0];
        var folder = doc[1];
        var doc_path = doc_file_name;
        if (folder != null) {
            doc_path = folder + "/" + doc_file_name;
        }
        doc_path = doc_path.replaceAll(" ", "_");
        $.get("http://minocloud.com/DocFiles/" + doc_path, function(data) {
            document.title = doc_address + " - Docs - MinoCloud™";
            page.headline.empty();
            if (doc_name.indexOf("(Node)") != -1) {
                page.headline.text(doc_name.replace("(Node)", ""));
                page.headline.prepend($("<div />").addClass("NodeIconHeadline"));
            } else if (doc_name.indexOf("(PHP)") != -1) {
                page.headline.text(doc_name.replace("(PHP)", ""));
                page.headline.prepend($("<div />").addClass("PHPIconHeadline"));
            } else {
                page.headline.text(doc_name);
            }
            data = data.replace(/	/g, "  ");
            page.content.html(data);
            page.content.find("button").toggleClass("mino_button", true);
            page.content.find("pre").each(function() {
                var pre = $(this);
                pre.addClass("prettyprint linenums");
                $("<button />").addClass("mino_button").text("Select All").tappable(function() {
                    pre.selectText();
                }).insertBefore(pre);
            });
            page.content.find("a").each(function() {
                var a = $(this);
                a.ajax_url();
            });
            page.content.find(".tabs").each(function() {
                var tabs = $(this);
                tabs.tabs();
            });
            prettyPrint();
            $(window).resize();
            $(".bodyCenter").scrollTop(0);
            if (hash != null) {
                var aTag = $("a[name='" + hash + "']");
                $(".bodyCenter").scrollTop(aTag.offset().top - 40);
            }
        }).fail(function() {
            document.title = "Not found - Docs - MinoCloud™";
            page.headline.text("Page not found");
            page.content.text("Please use the menu on the left to select a topic.");
        });
    }
};

DocsPage.prototype.init = function() {
    var page = this;
};

DocsPage.prototype.remove = function() {
    var page = this;
};

DocsPage.prototype.resize = function(resize_obj) {
    var page = this;
    page.side_menu.resize(resize_obj);
    var width = page.content.width();
    if (width > 400) {
        page.content.find("img:not(.noscale)").css("margin-left", (width - 400) / 2 + "px");
        page.content.find(".image_description").css("margin-left", (width - 400) / 2 + "px");
    } else {
        page.content.find("img:not(.noscale)").css("margin-left", "0px");
        page.content.find(".image_description").css("margin-left", "0px");
    }
};

function SideMenu(page) {
    var sm = this;
    sm.page = page;
    sm.data = {
        "": [ [ "Get Started", "" ], [ "Quick Start Tutorial", "Tutorials" ], [ "About", "" ] ],
        Browser: [ [ "Browser", "Browser" ], [ "Search Tutorial", "Browser" ] ],
        Concepts: [ [ "Objects", "" ], [ "Types", "" ], [ "Items", "" ], [ "Folders", "" ], [ "Paths", "" ], [ "Fields", "" ], [ "Sharing", "" ] ],
        "Field Types": [ [ "Field Types", "" ], [ "Boolean Field", "FieldTypes" ], [ "Choice Field", "FieldTypes" ], [ "Counter Field", "FieldTypes" ], [ "Date Field", "FieldTypes" ], [ "Date & Time Field", "FieldTypes" ], [ "Email Field", "FieldTypes" ], [ "Link Field", "FieldTypes" ], [ "Text Field", "FieldTypes" ] ],
        Apps: [ [ "Quick App Tutorial", "Tutorials" ], [ "Apps", "Apps" ], [ "App Folders", "Apps" ], [ "Notifications", "Apps" ], [ "Authentication", "Apps" ], [ "Sample Apps", "Apps" ], [ "Toolbar", "" ], [ "Front End Javascript Functions", "Apps" ] ],
        PHP: [ [ "(PHP)Quick Start", "PHP" ], [ "(PHP)Quick App Tutorial", "PHP" ], [ "(PHP)get", "PHP" ], [ "(PHP)save", "PHP" ], [ "(PHP)search", "PHP" ], [ "(PHP)delete", "PHP" ], [ "(PHP)notify", "PHP" ], [ "(PHP)api", "PHP" ], [ "(PHP)authenticate", "PHP" ], [ "(PHP)handleAPIRequest", "PHP" ], [ "(PHP)handleActivationRequest", "PHP" ] ],
        Node: [ [ "(Node)Quick Start", "Node" ], [ "(Node)Quick App Tutorial", "Node" ], [ "(Node)get", "Node" ], [ "(Node)saveObjects", "Node" ], [ "(Node)search", "Node" ], [ "(Node)deleteObjects", "Node" ], [ "(Node)notify", "Node" ], [ "(Node)api", "Node" ], [ "(Node)authenticate", "Node" ], [ "(Node)handleAPIRequest", "Node" ], [ "(Node)handleActivationRequest", "Node" ] ],
        "API Functions": [ [ "API", "" ], [ "Add Privileges Function", "Functions" ], [ "Add Type Privileges Function", "Functions" ], [ "Counter Function", "Functions" ], [ "Delete Function", "Functions" ], [ "Errors", "" ], [ "Get Function", "Functions" ], [ "Notify Function", "Functions" ], [ "Remove Privileges Function", "Functions" ], [ "Save Conditions", "Functions" ], [ "Save Function", "Functions" ], [ "Save Type Function", "Functions" ], [ "Search Function", "Functions" ] ]
    };
    sm.hidden = false;
    sm.element = $("<div />").addClass("fixed_menu_holder").append($("<div />").addClass("side_menu_center_holder").append(sm.side_menu_holder = $("<div />").addClass("side_menu_holder").append($("<div />").addClass("side_menu").append(sm.menu_elements = $("<div />").addClass("side_menu_elements")))));
    function screenIsSmall() {
        return $(document).width() < 600;
    }
    if (screenIsSmall()) {
        sm.hidden = true;
        $(sm.page.element).css("margin-left", "0px");
        $(sm.side_menu_holder).css("width", "0px");
    } else {
        sm.hidden = false;
        $(sm.page.element).css("margin-left", "250px");
        $(sm.side_menu_holder).css("width", "250px");
    }
    sm.create_menu_elements();
}

SideMenu.prototype.get_and_select_doc = function(folder, doc_name) {
    var sm = this;
    $(".side_menu_item.active").removeClass("active");
    for (var title in sm.data) {
        var items = sm.data[title];
        for (var i in items) {
            var this_doc = items[i];
            var this_doc_name = this_doc[0];
            var this_doc_folder = this_doc[1];
            var element = this_doc[2];
            if (this_doc_name == doc_name) {
                var section_data = element.data("section");
                if (!section_data.extended) {
                    section_data.elements.slideDown();
                    if (section_data.menuArrow != undefined) {
                        section_data.menuArrow.html("&#x25BC;");
                    }
                }
                $(element).addClass("active");
                return this_doc;
            }
        }
    }
    return null;
};

SideMenu.prototype.create_menu_elements = function() {
    var sm = this;
    for (var title in sm.data) {
        var items = sm.data[title];
        var sideMenuSection = $("<div />").addClass("side_menu_section").appendTo(sm.menu_elements);
        var section_data = {};
        sideMenuSection.data("section", section_data);
        if (title != "") {
            $("<div />").addClass("side_menu_section_title").append(section_data.menuArrow = $("<span />").addClass("menu_arrow").html("&#9658;")).append($("<span />").text(title)).data("section", section_data).tappable(function() {
                var titleDiv = $(this);
                var section_data = titleDiv.data("section");
                if (!section_data.extended) {
                    section_data.elements.slideDown();
                    section_data.menuArrow.html("&#x25BC;");
                } else {
                    section_data.elements.slideUp();
                    section_data.menuArrow.html("&#9658;");
                }
                section_data.extended = !section_data.extended;
            }).appendTo(sideMenuSection);
        }
        section_data.elements = $("<div />").addClass("side_menu_section_elements").appendTo(sideMenuSection);
        if (title != "") {
            section_data.elements.hide();
        }
        for (var i in items) {
            var thisPage = items[i];
            var thisPageName = thisPage[0];
            var folder = thisPage[1];
            var element, span;
            var doc_path = thisPageName;
            if (folder != "") {
                doc_path = folder + "/" + thisPageName;
            }
            doc_path = doc_path.replaceAll(" ", "_");
            element = $("<a />").prop("href", "/docs/" + doc_path).ajax_url().addClass("side_menu_item").data("pageName", thisPageName).data("section", section_data).data("pageFolder", folder).append(span = $("<span />")).appendTo(section_data.elements);
            if (thisPageName.indexOf("(Node)") != -1) {
                span.text(thisPageName.replace("(Node)", ""));
                span.prepend($("<div />").addClass("NodeIconMenuItem"));
            } else if (thisPageName.indexOf("(PHP)") != -1) {
                span.text(thisPageName.replace("(PHP)", ""));
                span.prepend($("<div />").addClass("PHPIconMenuItem"));
            } else {
                span.text(thisPageName);
            }
            thisPage.push(element);
        }
    }
};

SideMenu.prototype.deactivate_menu_elements = function() {
    var sm = this;
};

SideMenu.prototype.toggle_menu = function(forceHide) {
    var sm = this;
    if (forceHide) {
        if (sm.hidden) {
            return;
        }
    }
    if (sm.hidden) {
        sm.page.element.animate({
            "margin-left": "250px"
        }, 250, "linear", function() {
            $(window).resize();
        });
        sm.side_menu_holder.animate({
            width: "250px"
        }, 250, "linear", function() {
            $(window).resize();
        });
    } else {
        sm.page.element.animate({
            "margin-left": "0px"
        }, 250, "linear", function() {
            $(window).resize();
        });
        sm.side_menu_holder.animate({
            width: "0px"
        }, 250, "linear", function() {
            $(window).resize();
        });
    }
    sm.hidden = !sm.hidden;
    $(window).resize();
};

SideMenu.prototype.resize = function(resize_obj) {
    var sm = this;
};

function Feature(object, is_left) {
    var f = this;
    f.title = object.title;
    f.text = object.text;
    f.image_ref = object.image_ref;
    f.stacked = null;
    f.element = $("<div />").addClass("feature").append(f.text_element = $("<div />").addClass("text").append($("<span />").addClass("title").text(f.title)).append($("<div />").addClass("content").html(f.text))).append($("<div />").addClass("image " + f.image_ref).append(f.image_div = $("<div />")));
    if (is_left) {
        f.element.addClass("left");
    } else {
        f.element.addClass("right");
    }
}

Feature.prototype.resize = function(resize_obj) {
    var f = this;
    var should_stack = resize_obj.doc_width < 800;
    if (!should_stack) {
        if (f.stacked) {
            f.element.removeClass("stacked");
            f.element.css("height", "320px");
        }
        var text_height = f.text_element.outerHeight();
        f.text_element.css("margin-top", (320 - text_height) / 2 + "px");
        var img_width = 300 + (resize_obj.doc_width - 800) / 2;
        if (img_width > 400) {
            img_width = 400;
        }
        var img_height = img_width * (225 / 300);
        f.image_div.css({
            height: img_height + "px",
            width: img_width + "px",
            "margin-top": -(img_height / 2) + "px",
            "margin-left": -(img_width / 2) + "px",
            "background-size": img_width + "px " + img_height + "px"
        });
    } else if (should_stack) {
        if (!f.stacked) {
            f.element.addClass("stacked");
            f.image_div.css({
                height: "225px",
                width: "300px",
                "margin-left": "-150px",
                "margin-top": "-112px",
                "background-size": "300px 225px"
            });
            f.text_element.css("margin-top", "0px");
        }
        var text_height = f.text_element.innerHeight();
        f.element.css("height", text_height + 260 + "px");
    }
    f.stacked = should_stack;
};

extend(HomePage, Page);

function HomePage(parameters, url) {
    var page = this;
    HomePage.superConstructor.call(this);
    page.stacked = false;
    page.element.addClass("home_page").append($("<div />").addClass("body_text").append($("<div />").addClass("body_headline").cms_string("top_headline"))).append(page.sign_up_area = $("<div />").addClass("signup_area").append($("<span />").cms_string("top_signup_message")).append($("<a />").attr("href", "/auth/?appName=MinoCloud&appRedirect=http://minocloud.com/docs/?Quick_Start_Tutorial").ajax_url().append($("<button />").addClass("mino_button big_signup_button").text("Sign Up")))).append(page.feature_stack = $("<div />").addClass("feature_stack"));
    var features_data = [ {
        title: "Concentrate on features and design.",
        text: "MinoCloud™ solves the problems that you wish you didn't have to. You want to concentrate on creating great features and usable designs, not writing generic architecture. We've got you covered.",
        image_ref: "featuresdesignimg"
    }, {
        title: "Store your structured data properly.",
        text: "MinoCloud™ uses an innovative JSON structure to provide validation of your data, whilst allowing flexible, extendable items. ",
        image_ref: "structuredimg"
    }, {
        title: "An easy-to-use visual interface",
        text: "MinoCloud™ has an easy-to-use visual interface that allows you to search the data your app uses, but also lets you prototype new data structures. It's a powerful tool.",
        image_ref: "browserapiimg"
    }, {
        title: "Notifications are powerful, not painful.",
        text: "You can update your app's content, alert your users with a description or both at the same time. One simple API request and your notification is delivered all the way to your app's front-end, to multiple devices, with scripted merging and conditional alerts. It's versatile and powerful.",
        image_ref: "notificationsimg"
    }, {
        title: "Authentication? 1 line of code.",
        text: "Implementing authentication can take up plenty of time. You won't have to worry about that. We take care of your end-user authentication so it's just one line of code to attempt authentication and then you choose how to react.	",
        image_ref: "authimg"
    }, {
        title: "Build apps with PHP or Node.js",
        text: "MinoCloud™ currently has library support for PHP and Node.js. You can follow the <a href='http://minocloud.com/docs/?Quick App Tutorial (PHP)''>tutorial for PHP here</a> and the <a href='http://minocloud.com/docs/?Quick App Tutorial (Node)'>tutorial for Node.js here</a>.",
        image_ref: "languagesimg"
    } ];
    page.features = [];
    page.feature_stack.append($("<div />").addClass("feature_divide"));
    for (var i in features_data) {
        var feature_data = features_data[i];
        var feature = new Feature(feature_data, i % 2 == 0);
        page.features.push(feature);
        page.feature_stack.append(feature.element).append($("<div />").addClass("feature_divide"));
    }
}

Site.add_url("/", HomePage);

Site.add_url("index.html", HomePage);

Site.add_url("index.php", HomePage);

HomePage.prototype.get_title = function() {
    var page = this;
    return null;
};

HomePage.prototype.init = function() {
    var page = this;
};

HomePage.prototype.remove = function() {
    var page = this;
};

HomePage.prototype.resize = function(resize_obj) {
    var page = this;
    for (var i in page.features) {
        var feature = page.features[i];
        feature.resize(resize_obj);
    }
};

extend(NotFoundPage, Page);

function NotFoundPage(parameters, url, wildcard_contents) {
    var page = this;
    NotFoundPage.superConstructor.call(this);
    page.element.addClass("not_found_page").append(page.error_code = $("<div />").addClass("error_code").text("404")).append(page.description = $("<div />").addClass("description").text("Page not found"));
}

NotFoundPage.prototype.get_title = function() {
    var page = this;
    return "Page Not Found";
};

NotFoundPage.prototype.resize = function(resize_obj) {
    var page = this;
    var error_code_font_size = resize_obj.proportion * 300 + "px";
    page.error_code.css({
        "font-size": error_code_font_size,
        "line-height": error_code_font_size
    });
    var description_font_size = resize_obj.proportion * 70 + "px";
    page.description.css({
        "font-size": description_font_size,
        "line-height": description_font_size
    });
};

var page_title_append = "MinoCloud";

var max_width = 960;

var min_width = 320;

var body_contents_holder;

var header;

var footer;

$(document).ready(function() {
    Site.on_resize = function(resize_obj) {
        resize_obj.body_width = body_contents_holder.contents.width();
        resize_obj.proportion = resize_obj.body_width / max_width;
        if (resize_obj.proportion > 1) {
            resize_obj.proportion = 1;
        }
        body_contents_holder.resize(resize_obj);
        header.resize(resize_obj);
    };
    Site.get_cms_string = function(id) {
        return strings[id];
    };
    Site.get_cms_image = function(ref) {
        return images[ref];
    };
    header = new Header();
    header.element.appendTo("body");
    body_contents_holder = new BodyContentsHolder();
    body_contents_holder.element.appendTo("body");
    Site.element.appendTo(body_contents_holder.contents);
    footer = new Footer();
    footer.element.appendTo(body_contents_holder.contents);
    Site.transition_page_callback = function(new_page, old_page) {
        var title = new_page.get_title();
        if (title == null) {
            document.title = page_title_append;
        } else {
            document.title = new_page.get_title() + " - " + page_title_append;
        }
        $("html, body").stop().animate({
            scrollTop: 0
        }, 500);
        Site.element.append(new_page.element);
        Site.resize();
        if (old_page != null) {
            old_page.element.css({
                width: old_page.element.width(),
                height: old_page.element.height(),
                position: "absolute"
            }).fadeOut(500, function() {
                old_page.element.remove();
            });
            new_page.element.hide().fadeIn(500);
        }
        return true;
    };
    Site.debug = false;
    Site.set_no_page_found_class(NotFoundPage);
    Site.init();
});