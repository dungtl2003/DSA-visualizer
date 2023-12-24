"use strict";
(self.webpackChunkdsa_visualizer = self.webpackChunkdsa_visualizer || []).push([
    [488],
    {
        488: (e, s, o) => {
            o.d(s, {default: () => t});
            const n = function (e, s, o, n, i, t, a = !0) {
                    let l,
                        r,
                        u,
                        h,
                        c = n,
                        p = n,
                        m = i + 1;
                    for (; p <= i && m <= t; )
                        (u = p),
                            (h = m),
                            (l =
                                s[p] < s[m]
                                    ? "shorter than"
                                    : s[p] === s[m]
                                      ? "as high as"
                                      : "higher than"),
                            s[p] <= s[m]
                                ? a
                                    ? ((r = 1), (o[c++] = s[p++]))
                                    : ((r = 2), (o[c++] = s[m++]))
                                : a
                                  ? ((r = 2), (o[c++] = s[m++]))
                                  : ((r = 1), (o[c++] = s[p++])),
                            e.push({
                                type: "compare",
                                isAMove: !0,
                                p1: u,
                                p2: h,
                                message: `Compare 2 columns:\n            Column 1 at index ${u} with value ${s[u]}\n            Column 2 at index ${h} with value ${s[h]}\n            Column 1 is ${l} column 2, choose column ${r}`,
                            });
                    for (; p <= i; )
                        e.push({
                            type: "compare",
                            isAMove: !0,
                            p1: p,
                            p2: -1,
                            message:
                                "The second sub-array has no elements left to consider, choose column 1",
                        }),
                            (o[c++] = s[p++]);
                    for (; m <= t; )
                        e.push({
                            type: "compare",
                            isAMove: !0,
                            p1: -1,
                            p2: m,
                            message:
                                "The first sub-array has no elements left to consider, choose column 2",
                        }),
                            (o[c++] = s[m++]);
                    e.push({
                        type: "merge",
                        isAMove: !1,
                        start: n,
                        values: o.slice(n, t + 1),
                        message: `The merged result:\n        [${o
                            .slice(n, t + 1)
                            .join(", ")}]`,
                    });
                },
                i = function (e, s, o, i, t = !0) {
                    let a = 0;
                    const l = s.length;
                    let r, u, h, c, p;
                    for (; a + 2 * i <= l; )
                        (r = a),
                            (u = a + i - 1),
                            (h = a + 2 * i - 1),
                            (c = s.slice(r, u + 1).join(", ")),
                            (p = s.slice(u + 1, h + 1).join(", ")),
                            e.push({
                                type: "divide",
                                isAMove: !1,
                                start: r,
                                mid: u,
                                end: h,
                                message: `Consider the 2 following sub-arrays:\n            [${c}]\n            [${p}]`,
                            }),
                            n(e, s, o, r, u, h, t),
                            (a += 2 * i);
                    a + i < l
                        ? ((r = a),
                          (u = a + i - 1),
                          (h = l - 1),
                          (c = s.slice(r, u + 1).join(", ")),
                          (p = s.slice(u + 1, h + 1).join(", ")),
                          e.push({
                              type: "divide",
                              isAMove: !1,
                              start: r,
                              mid: u,
                              end: h,
                              message: `Consider the 2 following sub-arrays:\n            [${c}]\n            [${p}]`,
                          }),
                          n(e, s, o, r, u, h, t))
                        : ((r = a),
                          (u = l - 1),
                          (h = -1),
                          (c = s.slice(r, u + 1).join(", ")),
                          e.push({
                              type: "divide",
                              isAMove: !1,
                              start: r,
                              mid: u,
                              end: h,
                              message: `Consider the following sub-array:\n            [${c}]`,
                          }),
                          n(e, s, o, r, u, h, t));
                },
                t = function (e, s = !0) {
                    const o = [],
                        n = e.length,
                        t = [];
                    let a = 1;
                    for (; a < n; )
                        i(o, e, t, a, s), (a *= 2), i(o, t, e, a, s), (a *= 2);
                    return o;
                };
        },
    },
]);
