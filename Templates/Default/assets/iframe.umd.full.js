!function(t) {
    "function" == typeof define && define.amd ? define(t) : t()
}((function() {
    "use strict";
    function t() {}
    function e(t) {
        return t()
    }
    function n() {
        return Object.create(null)
    }
    function r(t) {
        t.forEach(e)
    }
    function o(t) {
        return "function" == typeof t
    }
    function a(t, e) {
        return t != t ? e == e : t !== e || t && "object" == typeof t || "function" == typeof t
    }
    function s(t, e) {
        t.appendChild(e)
    }
    function i(t, e, n) {
        t.insertBefore(e, n || null)
    }
    function c(t) {
        t.parentNode.removeChild(t)
    }
    function l(t) {
        return document.createElement(t)
    }
    function d(t) {
        return document.createTextNode(t)
    }
    function u() {
        return d(" ")
    }
    function f() {
        return d("")
    }
    function p(t, e, n, r) {
        return t.addEventListener(e, n, r),
        ()=>t.removeEventListener(e, n, r)
    }
    function m(t, e, n) {
        null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n)
    }
    function g(t, e) {
        e = "" + e,
        t.wholeText !== e && (t.data = e)
    }
    function h(t, e) {
        t.value = null == e ? "" : e
    }
    function y(t, e, n) {
        t.classList[n ? "add" : "remove"](e)
    }
    let b;
    function $(t) {
        b = t
    }
    function x() {
        if (!b)
            throw new Error("Function called outside component initialization");
        return b
    }
    function k(t) {
        x().$$.on_mount.push(t)
    }
    function v(t, e) {
        x().$$.context.set(t, e)
    }
    function _(t) {
        return x().$$.context.get(t)
    }
    const w = []
      , C = []
      , S = []
      , I = []
      , N = Promise.resolve();
    let L = !1;
    function R(t) {
        S.push(t)
    }
    let A = !1;
    const E = new Set;
    function O() {
        if (!A) {
            A = !0;
            do {
                for (let t = 0; t < w.length; t += 1) {
                    const e = w[t];
                    $(e),
                    M(e.$$)
                }
                for ($(null),
                w.length = 0; C.length; )
                    C.pop()();
                for (let t = 0; t < S.length; t += 1) {
                    const e = S[t];
                    E.has(e) || (E.add(e),
                    e())
                }
                S.length = 0
            } while (w.length);
            for (; I.length; )
                I.pop()();
            L = !1,
            A = !1,
            E.clear()
        }
    }
    function M(t) {
        if (null !== t.fragment) {
            t.update(),
            r(t.before_update);
            const e = t.dirty;
            t.dirty = [-1],
            t.fragment && t.fragment.p(t.ctx, e),
            t.after_update.forEach(R)
        }
    }
    const T = new Set;
    let q;
    function j() {
        q = {
            r: 0,
            c: [],
            p: q
        }
    }
    function U() {
        q.r || r(q.c),
        q = q.p
    }
    function z(t, e) {
        t && t.i && (T.delete(t),
        t.i(e))
    }
    function F(t, e, n, r) {
        if (t && t.o) {
            if (T.has(t))
                return;
            T.add(t),
            q.c.push((()=>{
                T.delete(t),
                r && (n && t.d(1),
                r())
            }
            )),
            t.o(e)
        }
    }
    function P(t, e) {
        F(t, 1, 1, (()=>{
            e.delete(t.key)
        }
        ))
    }
    function D(t, e, n, r, o, a, s, i, c, l, d, u) {
        let f = t.length
          , p = a.length
          , m = f;
        const g = {};
        for (; m--; )
            g[t[m].key] = m;
        const h = []
          , y = new Map
          , b = new Map;
        for (m = p; m--; ) {
            const t = u(o, a, m)
              , i = n(t);
            let c = s.get(i);
            c ? r && c.p(t, e) : (c = l(i, t),
            c.c()),
            y.set(i, h[m] = c),
            i in g && b.set(i, Math.abs(m - g[i]))
        }
        const $ = new Set
          , x = new Set;
        function k(t) {
            z(t, 1),
            t.m(i, d),
            s.set(t.key, t),
            d = t.first,
            p--
        }
        for (; f && p; ) {
            const e = h[p - 1]
              , n = t[f - 1]
              , r = e.key
              , o = n.key;
            e === n ? (d = e.first,
            f--,
            p--) : y.has(o) ? !s.has(r) || $.has(r) ? k(e) : x.has(o) ? f-- : b.get(r) > b.get(o) ? (x.add(r),
            k(e)) : ($.add(o),
            f--) : (c(n, s),
            f--)
        }
        for (; f--; ) {
            const e = t[f];
            y.has(e.key) || c(e, s)
        }
        for (; p; )
            k(h[p - 1]);
        return h
    }
    function H(t) {
        t && t.c()
    }
    function J(t, n, a, s) {
        const {fragment: i, on_mount: c, on_destroy: l, after_update: d} = t.$$;
        i && i.m(n, a),
        s || R((()=>{
            const n = c.map(e).filter(o);
            l ? l.push(...n) : r(n),
            t.$$.on_mount = []
        }
        )),
        d.forEach(R)
    }
    function B(t, e) {
        const n = t.$$;
        null !== n.fragment && (r(n.on_destroy),
        n.fragment && n.fragment.d(e),
        n.on_destroy = n.fragment = null,
        n.ctx = [])
    }
    function Y(t, e) {
        -1 === t.$$.dirty[0] && (w.push(t),
        L || (L = !0,
        N.then(O)),
        t.$$.dirty.fill(0)),
        t.$$.dirty[e / 31 | 0] |= 1 << e % 31
    }
    function G(e, o, a, s, i, l, d=[-1]) {
        const u = b;
        $(e);
        const f = e.$$ = {
            fragment: null,
            ctx: null,
            props: l,
            update: t,
            not_equal: i,
            bound: n(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(u ? u.$$.context : o.context || []),
            callbacks: n(),
            dirty: d,
            skip_bound: !1
        };
        let p = !1;
        if (f.ctx = a ? a(e, o.props || {}, ((t,n,...r)=>{
            const o = r.length ? r[0] : n;
            return f.ctx && i(f.ctx[t], f.ctx[t] = o) && (!f.skip_bound && f.bound[t] && f.bound[t](o),
            p && Y(e, t)),
            n
        }
        )) : [],
        f.update(),
        p = !0,
        r(f.before_update),
        f.fragment = !!s && s(f.ctx),
        o.target) {
            if (o.hydrate) {
                const t = (m = o.target,
                Array.from(m.childNodes));
                f.fragment && f.fragment.l(t),
                t.forEach(c)
            } else
                f.fragment && f.fragment.c();
            o.intro && z(e.$$.fragment),
            J(e, o.target, o.anchor, o.customElement),
            O()
        }
        var m;
        $(u)
    }
    class K {
        $destroy() {
            B(this, 1),
            this.$destroy = t
        }
        $on(t, e) {
            const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
            return n.push(e),
            ()=>{
                const t = n.indexOf(e);
                -1 !== t && n.splice(t, 1)
            }
        }
        $set(t) {
            var e;
            this.$$set && (e = t,
            0 !== Object.keys(e).length) && (this.$$.skip_bound = !0,
            this.$$set(t),
            this.$$.skip_bound = !1)
        }
    }
    var Q = function t(e) {
        function n(t, e, r) {
            var o, a = {};
            if (Array.isArray(t))
                return t.concat(e);
            for (o in t)
                a[r ? o.toLowerCase() : o] = t[o];
            for (o in e) {
                var s = r ? o.toLowerCase() : o
                  , i = e[o];
                a[s] = s in a && "object" == typeof i ? n(a[s], i, "headers" === s) : i
            }
            return a
        }
        function r(t, r, o, a) {
            "string" != typeof t && (t = (r = t).url);
            var s = {
                config: r
            }
              , i = n(e, r)
              , c = {}
              , l = a || i.data;
            (i.transformRequest || []).map((function(t) {
                l = t(l, i.headers) || l
            }
            )),
            l && "object" == typeof l && "function" != typeof l.append && (l = JSON.stringify(l),
            c["content-type"] = "application/json");
            var d = "undefined" != typeof document && document.cookie.match(RegExp("(^|; )" + i.xsrfCookieName + "=([^;]*)"));
            if (d && (c[i.xsrfHeaderName] = d[2]),
            i.auth && (c.authorization = i.auth),
            i.baseURL && (t = t.replace(/^(?!.*\/\/)\/?(.*)$/, i.baseURL + "/$1")),
            i.params) {
                var u = ~t.indexOf("?") ? "&" : "?";
                t += u + (i.paramsSerializer ? i.paramsSerializer(i.params) : new URLSearchParams(i.params))
            }
            return (i.fetch || fetch)(t, {
                method: o || i.method,
                body: l,
                headers: n(i.headers, c, !0),
                credentials: i.withCredentials ? "include" : "same-origin"
            }).then((function(t) {
                for (var e in t)
                    "function" != typeof t[e] && (s[e] = t[e]);
                var n = i.validateStatus ? i.validateStatus(t.status) : t.ok;
                return "stream" == i.responseType ? (s.data = t.body,
                s) : t[i.responseType || "text"]().then((function(t) {
                    s.data = t,
                    s.data = JSON.parse(t)
                }
                )).catch(Object).then((function() {
                    return n ? s : Promise.reject(s)
                }
                ))
            }
            ))
        }
        return e = e || {},
        r.request = r,
        r.get = function(t, e) {
            return r(t, e, "get")
        }
        ,
        r.delete = function(t, e) {
            return r(t, e, "delete")
        }
        ,
        r.head = function(t, e) {
            return r(t, e, "head")
        }
        ,
        r.options = function(t, e) {
            return r(t, e, "options")
        }
        ,
        r.post = function(t, e, n) {
            return r(t, n, "post", e)
        }
        ,
        r.put = function(t, e, n) {
            return r(t, n, "put", e)
        }
        ,
        r.patch = function(t, e, n) {
            return r(t, n, "patch", e)
        }
        ,
        r.all = Promise.all.bind(Promise),
        r.spread = function(t) {
            return function(e) {
                return t.apply(this, e)
            }
        }
        ,
        r.CancelToken = "function" == typeof AbortController ? AbortController : Object,
        r.defaults = e,
        r.create = t,
        r
    }()
      , V = {
        powered_by: "???????????? ?????????? ???? ?????? Cusdis",
        post_comment: "?????????? ??????",
        loading: "?????????? ????????????????",
        email: "?????? ?????????????????? (??????????????)",
        nickname: "??????",
        reply_placeholder: "??????",
        reply_btn: "????????",
        sending: "?????????? ??????...",
        mod_badge: "????????",
        content_is_required: "?????????? ???????????????? ???????? ????????!",
        nickname_is_required: "?????? ?????? ???????????? ??????!",
        comment_has_been_sent: "?????? ?????? ???? ???????????? ???????????? ???? ?? ???? ???? ?????????? ???????? ???????????? ?????????? ???????? ??????????."
    };
    function W(t) {
        const e = window.CUSDIS_LOCALE || V
          , n = e[t] || V[t];
        return e[t] || console.warn("[cusdis]", "translation of language key", `'${t}'`, "is missing."),
        n
    }
    function X(e) {
        let n, o, a, f, b, $, x, k, v, _, w, C, S, I, N, L, R, A, E, O, M, T, q = (e[3] ? W("sending") : W("post_comment")) + "";
        return {
            c() {
                n = l("div"),
                o = l("div"),
                a = l("div"),
                f = l("label"),
                f.textContent = `${W("nickname")}`,
                b = u(),
                $ = l("input"),
                x = u(),
                k = l("div"),
                v = l("label"),
                v.textContent = `${W("email")}`,
                _ = u(),
                w = l("input"),
                C = u(),
                S = l("div"),
                I = l("label"),
                I.textContent = `${W("reply_placeholder")}`,
                N = u(),
                L = l("textarea"),
                R = u(),
                A = l("div"),
                E = l("button"),
                O = d(q),
                m(f, "class", "mb-2 block dark:text-gray-200"),
                m(f, "for", "nickname"),
                m($, "name", "nickname"),
                m($, "class", "w-full p-2 border border-gray-200 bg-transparent dark:text-gray-100 dark:outline-none"),
                m($, "type", "text"),
                m($, "title", W("nickname")),
                m(a, "class", "px-1"),
                m(v, "class", "mb-2 block dark:text-gray-200"),
                m(v, "for", "email"),
                m(w, "name", "email"),
                m(w, "class", "w-full p-2 border border-gray-200 bg-transparent  dark:text-gray-100 dark:outline-none"),
                m(w, "type", "email"),
                m(w, "title", W("email")),
                m(k, "class", "px-1"),
                m(o, "class", "grid grid-cols-2 gap-4"),
                m(I, "class", "mb-2 block dark:text-gray-200"),
                m(I, "for", "reply_content"),
                m(L, "name", "reply_content"),
                m(L, "class", "w-full p-2 border border-gray-200 h-24 bg-transparent dark:text-gray-100 dark:outline-none"),
                m(L, "title", W("reply_placeholder")),
                m(S, "class", "px-1"),
                m(E, "class", "text-sm bg-gray-200 p-2 px-4 font-bold"),
                y(E, "cusdis-disabled", e[3]),
                m(A, "class", "px-1"),
                m(n, "class", "grid grid-cols-1 gap-4")
            },
            m(t, r) {
                i(t, n, r),
                s(n, o),
                s(o, a),
                s(a, f),
                s(a, b),
                s(a, $),
                h($, e[1]),
                s(o, x),
                s(o, k),
                s(k, v),
                s(k, _),
                s(k, w),
                h(w, e[2]),
                s(n, C),
                s(n, S),
                s(S, I),
                s(S, N),
                s(S, L),
                h(L, e[0]),
                s(n, R),
                s(n, A),
                s(A, E),
                s(E, O),
                M || (T = [p($, "input", e[7]), p(w, "input", e[8]), p(L, "input", e[9]), p(E, "click", e[4])],
                M = !0)
            },
            p(t, [e]) {
                2 & e && $.value !== t[1] && h($, t[1]),
                4 & e && w.value !== t[2] && h(w, t[2]),
                1 & e && h(L, t[0]),
                8 & e && q !== (q = (t[3] ? W("sending") : W("post_comment")) + "") && g(O, q),
                8 & e && y(E, "cusdis-disabled", t[3])
            },
            i: t,
            o: t,
            d(t) {
                t && c(n),
                M = !1,
                r(T)
            }
        }
    }
    function Z(t, e, n) {
        let {parentId: r} = e
          , o = ""
          , a = ""
          , s = ""
          , i = !1
          , {onSuccess: c} = e;
        const l = _("api")
          , d = _("setMessage")
          , {appId: u, pageId: f, pageUrl: p, pageTitle: m} = _("attrs")
          , g = _("refresh");
        return t.$$set = t=>{
            "parentId"in t && n(5, r = t.parentId),
            "onSuccess"in t && n(6, c = t.onSuccess)
        }
        ,
        [o, a, s, i, async function() {
            if (o)
                if (a)
                    try {
                        n(3, i = !0);
                        await l.post("/api/open/comments", {
                            appId: u,
                            pageId: f,
                            content: o,
                            nickname: a,
                            email: s,
                            parentId: r,
                            pageUrl: p,
                            pageTitle: m
                        });
                        await g(),
                        n(0, o = ""),
                        n(1, a = ""),
                        n(2, s = ""),
                        c && c(),
                        d(W("comment_has_been_sent"))
                    } finally {
                        n(3, i = !1)
                    }
                else
                    alert(W("nickname_is_required"));
            else
                alert(W("content_is_required"))
        }
        , r, c, function() {
            a = this.value,
            n(1, a)
        }
        , function() {
            s = this.value,
            n(2, s)
        }
        , function() {
            o = this.value,
            n(0, o)
        }
        ]
    }
    class tt extends K {
        constructor(t) {
            super(),
            G(this, t, Z, X, a, {
                parentId: 5,
                onSuccess: 6
            })
        }
    }
    function et(t, e, n) {
        const r = t.slice();
        return r[6] = e[n],
        r
    }
    function nt(e) {
        let n, r;
        return {
            c() {
                n = l("div"),
                r = l("span"),
                r.textContent = `${W("mod_badge")}`,
                m(n, "class", "mr-2 dark:bg-gray-500 bg-gray-200 text-xs py-0.5 px-1 rounded dark:text-gray-100")
            },
            m(t, e) {
                i(t, n, e),
                s(n, r)
            },
            p: t,
            d(t) {
                t && c(n)
            }
        }
    }
    function rt(t) {
        let e, n, r = [], o = new Map, a = t[1].replies.data;
        const s = t=>t[6].id;
        for (let i = 0; i < a.length; i += 1) {
            let e = et(t, a, i)
              , n = s(e);
            o.set(n, r[i] = ot(n, e))
        }
        return {
            c() {
                for (let t = 0; t < r.length; t += 1)
                    r[t].c();
                e = f()
            },
            m(t, o) {
                for (let e = 0; e < r.length; e += 1)
                    r[e].m(t, o);
                i(t, e, o),
                n = !0
            },
            p(t, n) {
                2 & n && (a = t[1].replies.data,
                j(),
                r = D(r, n, s, 1, t, a, o, e.parentNode, P, ot, e, et),
                U())
            },
            i(t) {
                if (!n) {
                    for (let t = 0; t < a.length; t += 1)
                        z(r[t]);
                    n = !0
                }
            },
            o(t) {
                for (let e = 0; e < r.length; e += 1)
                    F(r[e]);
                n = !1
            },
            d(t) {
                for (let e = 0; e < r.length; e += 1)
                    r[e].d(t);
                t && c(e)
            }
        }
    }
    function ot(t, e) {
        let n, r, o;
        return r = new ct({
            props: {
                isChild: !0,
                comment: e[6]
            }
        }),
        {
            key: t,
            first: null,
            c() {
                n = f(),
                H(r.$$.fragment),
                this.first = n
            },
            m(t, e) {
                i(t, n, e),
                J(r, t, e),
                o = !0
            },
            p(t, n) {
                e = t;
                const o = {};
                2 & n && (o.comment = e[6]),
                r.$set(o)
            },
            i(t) {
                o || (z(r.$$.fragment, t),
                o = !0)
            },
            o(t) {
                F(r.$$.fragment, t),
                o = !1
            },
            d(t) {
                t && c(n),
                B(r, t)
            }
        }
    }
    function at(t) {
        let e, n, r;
        return n = new tt({
            props: {
                parentId: t[1].id,
                onSuccess: t[5]
            }
        }),
        {
            c() {
                e = l("div"),
                H(n.$$.fragment),
                m(e, "class", "mt-4 pl-4 border-r-2 border-gray-200")
                //TODO: 

            },
            m(t, o) {
                i(t, e, o),
                J(n, e, null),
                r = !0
            },
            p(t, e) {
                const r = {};
                2 & e && (r.parentId = t[1].id),
                1 & e && (r.onSuccess = t[5]),
                n.$set(r)
            },
            i(t) {
                r || (z(n.$$.fragment, t),
                r = !0)
            },
            o(t) {
                F(n.$$.fragment, t),
                r = !1
            },
            d(t) {
                t && c(e),
                B(n)
            }
        }
    }
    function st(t) {
        let e, n, r, o, a, f, h, b, $, x, k, v, _, w, C, S, I, N, L = (t[1].moderator && t[1].moderator.displayName ? t[1].moderator.displayName : t[1].by_nickname) + "", R = t[1].parsedCreatedAt + "", A = t[1].parsedContent + "", E = t[1].moderatorId && nt(), O = t[1].replies.data.length > 0 && rt(t), M = t[0] && at(t);
        return {
            c() {
                e = l("div"),
                n = l("div"),
                r = l("div"),
                o = d(L),
                a = u(),
                E && E.c(),
                f = u(),
                h = l("div"),
                b = d(R),
                $ = u(),
                x = l("div"),
                k = u(),
                O && O.c(),
                v = u(),
                _ = l("div"),
                w = l("button"),
                w.textContent = `${W("reply_btn")}`,
                C = u(),
                M && M.c(),
                m(r, "class", "mr-2 font-medium dark:text-gray-100"),
                m(n, "class", "flex items-center"),
                m(h, "class", "text-gray-500 text-sm dark:text-gray-400"),
                m(x, "class", "text-gray-500 my-2 dark:text-gray-200"),
                m(w, "class", "font-medium text-sm text-gray-500 dark:bg-transparent dark:text-gray-100"),
                m(w, "type", "button"),
                m(e, "class", "my-4"),
                y(e, "pr-4", t[2]),
                y(e, "border-r-2", t[2]),
                y(e, "border-color-gray-200", t[2]),
                y(e, "cusdis-indicator", t[3])
            },
            m(c, l) {
                i(c, e, l),
                s(e, n),
                s(n, r),
                s(r, o),
                s(n, a),
                E && E.m(n, null),
                s(e, f),
                s(e, h),
                s(h, b),
                s(e, $),
                s(e, x),
                x.innerHTML = A,
                s(e, k),
                O && O.m(e, null),
                s(e, v),
                s(e, _),
                s(_, w),
                s(e, C),
                M && M.m(e, null),
                S = !0,
                I || (N = p(w, "click", t[4]),
                I = !0)
            },
            p(t, [r]) {
                (!S || 2 & r) && L !== (L = (t[1].moderator && t[1].moderator.displayName ? t[1].moderator.displayName : t[1].by_nickname) + "") && g(o, L),
                t[1].moderatorId ? E ? E.p(t, r) : (E = nt(),
                E.c(),
                E.m(n, null)) : E && (E.d(1),
                E = null),
                (!S || 2 & r) && R !== (R = t[1].parsedCreatedAt + "") && g(b, R),
                (!S || 2 & r) && A !== (A = t[1].parsedContent + "") && (x.innerHTML = A),
                t[1].replies.data.length > 0 ? O ? (O.p(t, r),
                2 & r && z(O, 1)) : (O = rt(t),
                O.c(),
                z(O, 1),
                O.m(e, v)) : O && (j(),
                F(O, 1, 1, (()=>{
                    O = null
                }
                )),
                U()),
                t[0] ? M ? (M.p(t, r),
                1 & r && z(M, 1)) : (M = at(t),
                M.c(),
                z(M, 1),
                M.m(e, null)) : M && (j(),
                F(M, 1, 1, (()=>{
                    M = null
                }
                )),
                U()),
                4 & r && y(e, "pl-4", t[2]),
                4 & r && y(e, "border-l-2", t[2]),
                4 & r && y(e, "border-color-gray-200", t[2])
            },
            i(t) {
                S || (z(O),
                z(M),
                S = !0)
            },
            o(t) {
                F(O),
                F(M),
                S = !1
            },
            d(t) {
                t && c(e),
                E && E.d(),
                O && O.d(),
                M && M.d(),
                I = !1,
                N()
            }
        }
    }
    function it(t, e, n) {
        let {comment: r} = e
          , {showReplyForm: o=!1} = e
          , {isChild: a=!1} = e;
        const {showIndicator: s} = _("attrs");
        return t.$$set = t=>{
            "comment"in t && n(1, r = t.comment),
            "showReplyForm"in t && n(0, o = t.showReplyForm),
            "isChild"in t && n(2, a = t.isChild)
        }
        ,
        [o, r, a, s, t=>{
            n(0, o = !o)
        }
        , ()=>{
            n(0, o = !1)
        }
        ]
    }
    class ct extends K {
        constructor(t) {
            super(),
            G(this, t, it, st, a, {
                comment: 1,
                showReplyForm: 0,
                isChild: 2
            })
        }
    }
    function lt(t, e, n) {
        const r = t.slice();
        return r[12] = e[n],
        r[14] = n,
        r
    }
    function dt(t, e, n) {
        const r = t.slice();
        return r[15] = e[n],
        r
    }
    function ut(t) {
        let e, n, r, o, a, d, f, p, g, h, b, $, x, k, v, _ = t[3] && ft(t);
        r = new tt({});
        const w = [mt, pt]
          , C = [];
        function S(t, e) {
            return t[2] ? 0 : 1
        }
        return p = S(t),
        g = C[p] = w[p](t),
        {
            c() {
                e = l("div"),
                _ && _.c(),
                n = u(),
                H(r.$$.fragment),
                o = u(),
                a = l("div"),
                d = u(),
                f = l("div"),
                g.c(),
                h = u(),
                b = l("div"),
                $ = u(),
                x = l("div"),
                k = l("a"),
                k.textContent = `${W("powered_by")}`,
                m(a, "class", "my-8"),
                m(f, "class", "mt-4 px-1"),
                m(b, "class", "my-8"),
                m(k, "class", "underline "),
                m(k, "href", "https://cusdis.com"),
                m(x, "class", "text-center text-gray-500 dark:text-gray-100 text-xs"),
                y(e, "dark", "dark" === t[5])
            },
            m(t, c) {
                i(t, e, c),
                _ && _.m(e, null),
                s(e, n),
                J(r, e, null),
                s(e, o),
                s(e, a),
                s(e, d),
                s(e, f),
                C[p].m(f, null),
                s(e, h),
                s(e, b),
                s(e, $),
                s(e, x),
                s(x, k),
                v = !0
            },
            p(t, r) {
                t[3] ? _ ? _.p(t, r) : (_ = ft(t),
                _.c(),
                _.m(e, n)) : _ && (_.d(1),
                _ = null);
                let o = p;
                p = S(t),
                p === o ? C[p].p(t, r) : (j(),
                F(C[o], 1, 1, (()=>{
                    C[o] = null
                }
                )),
                U(),
                g = C[p],
                g ? g.p(t, r) : (g = C[p] = w[p](t),
                g.c()),
                z(g, 1),
                g.m(f, null)),
                32 & r && y(e, "dark", "dark" === t[5])
            },
            i(t) {
                v || (z(r.$$.fragment, t),
                z(g),
                v = !0)
            },
            o(t) {
                F(r.$$.fragment, t),
                F(g),
                v = !1
            },
            d(t) {
                t && c(e),
                _ && _.d(),
                B(r),
                C[p].d()
            }
        }
    }
    function ft(t) {
        let e, n;
        return {
            c() {
                e = l("div"),
                n = d(t[3]),
                m(e, "class", "p-2 mb-4 bg-blue-500 text-white")
            },
            m(t, r) {
                i(t, e, r),
                s(e, n)
            },
            p(t, e) {
                8 & e && g(n, t[3])
            },
            d(t) {
                t && c(e)
            }
        }
    }
    function pt(t) {
        let e, n, r, o = [], a = new Map, s = t[0].data;
        const l = t=>t[15].id;
        for (let i = 0; i < s.length; i += 1) {
            let e = dt(t, s, i)
              , n = l(e);
            a.set(n, o[i] = gt(n, e))
        }
        let d = t[0].pageCount > 1 && ht(t);
        return {
            c() {
                for (let t = 0; t < o.length; t += 1)
                    o[t].c();
                e = u(),
                d && d.c(),
                n = f()
            },
            m(t, a) {
                for (let e = 0; e < o.length; e += 1)
                    o[e].m(t, a);
                i(t, e, a),
                d && d.m(t, a),
                i(t, n, a),
                r = !0
            },
            p(t, r) {
                1 & r && (s = t[0].data,
                j(),
                o = D(o, r, l, 1, t, s, a, e.parentNode, P, gt, e, dt),
                U()),
                t[0].pageCount > 1 ? d ? d.p(t, r) : (d = ht(t),
                d.c(),
                d.m(n.parentNode, n)) : d && (d.d(1),
                d = null)
            },
            i(t) {
                if (!r) {
                    for (let t = 0; t < s.length; t += 1)
                        z(o[t]);
                    r = !0
                }
            },
            o(t) {
                for (let e = 0; e < o.length; e += 1)
                    F(o[e]);
                r = !1
            },
            d(t) {
                for (let e = 0; e < o.length; e += 1)
                    o[e].d(t);
                t && c(e),
                d && d.d(t),
                t && c(n)
            }
        }
    }
    function mt(e) {
        let n;
        return {
            c() {
                n = l("div"),
                n.textContent = `${W("loading")}...`,
                m(n, "class", "text-gray-900 dark:text-gray-100")
            },
            m(t, e) {
                i(t, n, e)
            },
            p: t,
            i: t,
            o: t,
            d(t) {
                t && c(n)
            }
        }
    }
    function gt(t, e) {
        let n, r, o;
        return r = new ct({
            props: {
                comment: e[15],
                firstFloor: !0
            }
        }),
        {
            key: t,
            first: null,
            c() {
                n = f(),
                H(r.$$.fragment),
                this.first = n
            },
            m(t, e) {
                i(t, n, e),
                J(r, t, e),
                o = !0
            },
            p(t, n) {
                e = t;
                const o = {};
                1 & n && (o.comment = e[15]),
                r.$set(o)
            },
            i(t) {
                o || (z(r.$$.fragment, t),
                o = !0)
            },
            o(t) {
                F(r.$$.fragment, t),
                o = !1
            },
            d(t) {
                t && c(n),
                B(r, t)
            }
        }
    }
    function ht(t) {
        let e, n = Array(t[0].pageCount), r = [];
        for (let o = 0; o < n.length; o += 1)
            r[o] = yt(lt(t, n, o));
        return {
            c() {
                e = l("div");
                for (let t = 0; t < r.length; t += 1)
                    r[t].c()
            },
            m(t, n) {
                i(t, e, n);
                for (let o = 0; o < r.length; o += 1)
                    r[o].m(e, null)
            },
            p(t, o) {
                if (67 & o) {
                    let a;
                    for (n = Array(t[0].pageCount),
                    a = 0; a < n.length; a += 1) {
                        const s = lt(t, n, a);
                        r[a] ? r[a].p(s, o) : (r[a] = yt(s),
                        r[a].c(),
                        r[a].m(e, null))
                    }
                    for (; a < r.length; a += 1)
                        r[a].d(1);
                    r.length = n.length
                }
            },
            d(t) {
                t && c(e),
                function(t, e) {
                    for (let n = 0; n < t.length; n += 1)
                        t[n] && t[n].d(e)
                }(r, t)
            }
        }
    }
    function yt(t) {
        let e, n, r, o, a = t[14] + 1 + "";
        function u(...e) {
            return t[8](t[14], ...e)
        }
        return {
            c() {
                e = l("button"),
                n = d(a),
                m(e, "class", "px-2 py-1 text-sm mr-2 dark:text-gray-200"),
                y(e, "underline", t[1] === t[14] + 1)
            },
            m(t, a) {
                i(t, e, a),
                s(e, n),
                r || (o = p(e, "click", u),
                r = !0)
            },
            p(n, r) {
                t = n,
                2 & r && y(e, "underline", t[1] === t[14] + 1)
            },
            d(t) {
                t && c(e),
                r = !1,
                o()
            }
        }
    }
    function bt(t) {
        let e, n, r = !t[4] && ut(t);
        return {
            c() {
                r && r.c(),
                e = f()
            },
            m(t, o) {
                r && r.m(t, o),
                i(t, e, o),
                n = !0
            },
            p(t, [n]) {
                t[4] ? r && (j(),
                F(r, 1, 1, (()=>{
                    r = null
                }
                )),
                U()) : r ? (r.p(t, n),
                16 & n && z(r, 1)) : (r = ut(t),
                r.c(),
                z(r, 1),
                r.m(e.parentNode, e))
            },
            i(t) {
                n || (z(r),
                n = !0)
            },
            o(t) {
                F(r),
                n = !1
            },
            d(t) {
                r && r.d(t),
                t && c(e)
            }
        }
    }
    function $t(t, e, n) {
        let r, {attrs: o} = e, {commentsResult: a} = e, s = 1, i = !0, c = "", l = o.theme || "light";
        const d = Q.create({
            baseURL: o.host
        });
        async function u(t=1) {
            n(2, i = !0);
            try {
                const e = await d.get("/api/open/comments", {
                    headers: {
                        "x-timezone-offset": -(new Date).getTimezoneOffset()
                    },
                    params: {
                        page: t,
                        appId: o.appId,
                        pageId: o.pageId
                    }
                });
                n(0, a = e.data.data)
            } catch (e) {
                n(4, r = e)
            } finally {
                n(2, i = !1)
            }
        }
        function f(t) {
            n(1, s = t),
            u(t)
        }
        k((()=>{
            function t(t) {
                try {
                    const e = JSON.parse(t.data);
                    if ("cusdis" === e.from)
                        switch (e.event) {
                        case "setTheme":
                            n(5, l = e.data)
                        }
                } catch (e) {}
            }
            return window.addEventListener("message", t),
            ()=>{
                window.removeEventListener("message", t)
            }
        }
        )),
        v("api", d),
        v("attrs", o),
        v("refresh", u),
        v("setMessage", (function(t) {
            n(3, c = t)
        }
        )),
        k((()=>{
            u()
        }
        ));
        return t.$$set = t=>{
            "attrs"in t && n(7, o = t.attrs),
            "commentsResult"in t && n(0, a = t.commentsResult)
        }
        ,
        [a, s, i, c, r, l, f, o, (t,e)=>f(t + 1)]
    }
    window.CUSDIS = {};
    const xt = window.parent
      , kt = document.querySelector("#root")
      , vt = window.__DATA__;
    function _t(t, e={}) {
        xt.postMessage(JSON.stringify({
            from: "cusdis",
            event: t,
            data: e
        }))
    }
    function wt() {
        _t("resize", document.documentElement.offsetHeight)
    }
    new class extends K {
        constructor(t) {
            super(),
            G(this, t, $t, bt, a, {
                attrs: 7,
                commentsResult: 0
            })
        }
    }
    ({
        target: kt,
        props: {
            attrs: vt
        }
    }),
    _t("onload"),
    wt();
    new MutationObserver((()=>{
        wt()
    }
    )).observe(kt, {
        childList: !0,
        subtree: !0
    })
}
));
