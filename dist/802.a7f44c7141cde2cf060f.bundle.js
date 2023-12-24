"use strict";
(self.webpackChunkdsa_visualizer = self.webpackChunkdsa_visualizer || []).push([
    [802],
    {
        802: (t, e, n) => {
            n.d(e, {sliderDefaultValue: () => s});
            const s = 5,
                u = document.getElementById("body__sidebar__col-num"),
                i = document.getElementById("body__sidebar__slider");
            (async function () {
                const {drawColumns: t} = await n.e(800).then(n.bind(n, 800));
                return {drawColumns: t};
            })()
                .then((t) => {
                    r(t);
                })
                .catch(() => "Error");
            const r = function (t) {
                let e;
                ({drawColumns: e} = t),
                    (u.innerHTML = s),
                    i.setAttribute("value", s),
                    i.setAttribute("min", 5),
                    i.setAttribute("max", 150),
                    u.setAttribute("min", 5),
                    u.setAttribute("max", 150),
                    u.setAttribute("value", s),
                    e(s);
            };
        },
    },
]);
