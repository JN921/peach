(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "7c6f0eb2-b725-438c-a017-8df5f0cc21cb", e._sentryDebugIdIdentifier = "sentry-dbid-7c6f0eb2-b725-438c-a017-8df5f0cc21cb");
	} catch {}
})();
import { CHART_CARD as e, CategoryTick as t, ChartEmpty as n, ChartHead as r, ChartTip as i, Dot as a, EvilBarChart as o, Layer as s, TIP_SURFACE as c, TIP_SWATCH as l, Text as u, TipRow as d, ZIndexLayer as f, adaptEventsOfChild as p, addAngleAxis as m, categoryAxisWidth as h, combineAxisTicks as g, combineCategoricalDomain as _, combineConfiguredScale as v, combineGraphicalItemTicks as y, createSelector as b, defaultPolarAngleAxisProps as x, degreeToRadian as S, getAxisTypeBasedOnLayout as C, getClassNameFromUnknown as w, noop as T, pickAxisType as E, polarToCartesian as D, rechartsScaleFactory as ee, removeAngleAxis as te, resolveDefaultProps as ne, roundTemplateLiteral as re, selectAngleAxis as O, selectAngleAxisRangeWithReversed as ie, selectChartLayout as k, selectDuplicateDomain as A, selectPolarAppliedValues as ae, selectPolarAxisCheckedDomain as oe, selectPolarNiceTicks as se, selectPolarViewBox as ce, selectRadiusAxis as le, selectRadiusAxisRangeWithReversed as ue, selectRealScaleType as de, selectRenderableAxisSettings as fe, svgPropertiesAndEvents as j, svgPropertiesNoEvents as M, svgPropertiesNoEventsFromUnknown as pe, tone as me, useAppDispatch as he, useAppSelector as N, useIsPanorama as ge, usePolarChartLayout as _e } from "./peach-app.chart-tip-CRxYp6KT.js";
import { __toESM as ve, clsx as P, f1 as ye, interfaceLanguage as be, require_jsx_runtime as xe, require_react as Se, t as F } from "./peach-app.js";
// node_modules/recharts/es6/shape/Polygon.js
var I = /* @__PURE__ */ ve(Se()), Ce = [
	"points",
	"className",
	"baseLinePoints",
	"connectNulls"
], we;
function L() {
	return L = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, L.apply(null, arguments);
}
function Te(e, t) {
	if (e == null) return {};
	var n, r, i = Ee(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Ee(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function De(e, t) {
	return t ||= e.slice(0), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var R = (e) => e != null && e.x === +e.x && e.y === +e.y, Oe = function() {
	var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = [[]];
	e.forEach((e) => {
		var n = t[t.length - 1];
		R(e) ? n && n.push(e) : n && n.length > 0 && t.push([]);
	});
	var n = e[0], r = t[t.length - 1];
	R(n) && r && r.push(n);
	var i = t[t.length - 1];
	return i && i.length <= 0 && (t = t.slice(0, -1)), t;
}, z = (e, t) => {
	var n = Oe(e);
	t && (n = [n.reduce((e, t) => [...e, ...t], [])]);
	var r = n.map((e) => e.reduce((e, t, n) => re(we ||= De([
		"",
		"",
		"",
		",",
		""
	]), e, n === 0 ? "M" : "L", t.x, t.y), "")).join("");
	return n.length === 1 ? `${r}Z` : r;
}, ke = (e, t, n) => {
	var r = z(e, n);
	return `${r.slice(-1) === "Z" ? r.slice(0, -1) : r}L${z(Array.from(t).reverse(), n).slice(1)}`;
}, B = (e) => {
	var t = e.points, n = e.className, r = e.baseLinePoints, i = e.connectNulls, a = Te(e, Ce);
	if (!t || !t.length) return null;
	var o = P("recharts-polygon", n);
	if (r && r.length) {
		var s = a.stroke && a.stroke !== "none", c = ke(t, r, i);
		return /*#__PURE__*/ I.createElement("g", { className: o }, /*#__PURE__*/ I.createElement("path", L({}, j(a), {
			fill: c.slice(-1) === "Z" ? a.fill : "none",
			stroke: "none",
			d: c
		})), s ? /*#__PURE__*/ I.createElement("path", L({}, j(a), {
			fill: "none",
			d: z(t, i)
		})) : null, s ? /*#__PURE__*/ I.createElement("path", L({}, j(a), {
			fill: "none",
			d: z(r, i)
		})) : null);
	}
	var l = z(t, i);
	return /*#__PURE__*/ I.createElement("path", L({}, j(a), {
		fill: l.slice(-1) === "Z" ? a.fill : "none",
		className: o,
		d: l
	}));
}, V = (e, t, n) => {
	switch (t) {
		case "angleAxis": return O(e, n);
		case "radiusAxis": return le(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, H = (e, t, n) => {
	switch (t) {
		case "angleAxis": return ie(e, n);
		case "radiusAxis": return ue(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, Ae = b([
	V,
	de,
	oe,
	H
], v), U = b([Ae], ee), W = b([
	k,
	ae,
	fe,
	E
], _), G = b([
	k,
	V,
	de,
	U,
	se,
	H,
	A,
	W,
	E
], g), je = b([G], (e) => {
	if (e) {
		var t = /* @__PURE__ */ new Map();
		return e.forEach((e) => {
			var n = (e.coordinate + 360) % 360;
			t.has(n) || t.set(n, e);
		}), Array.from(t.values());
	}
}), Me = b([
	k,
	V,
	U,
	H,
	A,
	W,
	E
], y), Ne = ["children", "type"], Pe = ["ref"];
function K() {
	return K = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, K.apply(null, arguments);
}
function Fe(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function q(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Fe(Object(n), !0).forEach(function(t) {
			Ie(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Fe(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Ie(e, t, n) {
	return (t = Le(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Le(e) {
	var t = Re(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Re(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ze(e, t) {
	if (e == null) return {};
	var n, r, i = Be(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Be(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Ve = 1e-5, He = Math.cos(S(45)), Ue = "angleAxis";
function We(e) {
	var t = he(), n = _e(), r = (0, I.useMemo)(() => {
		e.children;
		var t = e.type, r = ze(e, Ne), i = C(n, "angleAxis", t);
		if (i != null) return q(q({}, r), {}, { type: i });
	}, [e, n]), i = r === N((e) => O(e, r?.id));
	return (0, I.useEffect)(() => r == null ? T : (t(m(r)), () => {
		t(te(r));
	}), [t, r]), i ? e.children : null;
}
var Ge = (e, t) => {
	var n = t.cx, r = t.cy, i = t.radius, a = t.orientation, o = t.tickSize || 8, s = D(n, r, i, e.coordinate), c = D(n, r, i + (a === "inner" ? -1 : 1) * o, e.coordinate);
	return {
		x1: s.x,
		y1: s.y,
		x2: c.x,
		y2: c.y
	};
}, Ke = (e, t) => {
	var n = Math.cos(S(-e.coordinate));
	return n > Ve ? t === "outer" ? "start" : "end" : n < -Ve ? t === "outer" ? "end" : "start" : "middle";
}, qe = (e) => {
	var t = Math.cos(S(-e.coordinate)), n = Math.sin(S(-e.coordinate));
	return Math.abs(t) <= He ? n > 0 ? "start" : "end" : "middle";
}, Je = (e) => {
	var t = e.cx, n = e.cy, r = e.radius, i = e.axisLineType, o = e.axisLine, s = e.ticks;
	if (!o) return null;
	var c = q(q({}, M(e)), {}, { fill: "none" }, M(o));
	if (i === "circle") return /*#__PURE__*/ I.createElement(a, K({ className: "recharts-polar-angle-axis-line" }, c, {
		cx: t,
		cy: n,
		r
	}));
	var l = s.map((e) => D(t, n, r, e.coordinate));
	return /*#__PURE__*/ I.createElement(B, K({ className: "recharts-polar-angle-axis-line" }, c, { points: l }));
}, Ye = (e) => {
	var t = e.tick, n = e.tickProps, r = e.value;
	return t ? /*#__PURE__*/ I.isValidElement(t) ? /*#__PURE__*/ I.cloneElement(t, n) : typeof t == "function" ? t(n) : /*#__PURE__*/ I.createElement(u, K({}, n, { className: "recharts-polar-angle-axis-tick-value" }), r) : null;
}, Xe = (e) => {
	var t = e.tick, n = e.tickLine, r = e.tickFormatter, i = e.stroke, a = e.ticks, o = M(e);
	o.ref;
	var c = ze(o, Pe), l = pe(t), u = q(q({}, c), {}, { fill: "none" }, M(n)), d = a.map((a, o) => {
		var d = Ge(a, e), f = Ke(a, e.orientation), m = qe(a), h = q(q(q({}, c), {}, {
			textAnchor: f,
			verticalAnchor: m,
			stroke: "none",
			fill: i
		}, l), {}, {
			index: o,
			payload: a,
			x: d.x2,
			y: d.y2
		});
		return /*#__PURE__*/ I.createElement(s, K({
			className: P("recharts-polar-angle-axis-tick", w(t)),
			key: `tick-${a.coordinate}`
		}, p(e, a, o)), n && /*#__PURE__*/ I.createElement("line", K({ className: "recharts-polar-angle-axis-tick-line" }, u, d)), /*#__PURE__*/ I.createElement(Ye, {
			tick: t,
			tickProps: h,
			value: r ? r(a.value, o) : a.value
		}));
	});
	return /*#__PURE__*/ I.createElement(s, { className: "recharts-polar-angle-axis-ticks" }, d);
}, Ze = (e) => {
	var t = e.angleAxisId, n = N(ce), r = N((e) => U(e, "angleAxis", t)), i = ge(), a = N((e) => je(e, "angleAxis", t, i));
	if (n == null || !a || !a.length || r == null) return null;
	var o = q(q(q({}, e), {}, { scale: r }, n), {}, {
		radius: n.outerRadius,
		ticks: a
	});
	return /*#__PURE__*/ I.createElement(f, { zIndex: o.zIndex }, /*#__PURE__*/ I.createElement(s, { className: P("recharts-polar-angle-axis", Ue, o.className) }, /*#__PURE__*/ I.createElement(Je, o), /*#__PURE__*/ I.createElement(Xe, o)));
};
function Qe(e) {
	var t = ne(e, x);
	return /*#__PURE__*/ I.createElement(We, {
		id: t.angleAxisId,
		scale: t.scale,
		type: t.type,
		dataKey: t.dataKey,
		unit: void 0,
		name: t.name,
		allowDuplicatedCategory: !1,
		allowDataOverflow: !1,
		reversed: t.reversed,
		includeHidden: !1,
		allowDecimals: t.allowDecimals,
		tickCount: t.tickCount,
		niceTicks: t.niceTicks ?? "auto",
		ticks: t.ticks,
		tick: t.tick,
		domain: t.domain
	}, /*#__PURE__*/ I.createElement(Ze, t));
}
Qe.displayName = "PolarAngleAxis";
// src/react/charts/bar-card.tsx
var J = xe(), Y = [0, (e) => e * 1.2], $e = new Intl.NumberFormat(be, {
	notation: "compact",
	maximumSignificantDigits: 3
});
function et(e) {
	return Math.abs(e) >= 1e5 ? $e.format(e) : e.toLocaleString();
}
var X = (e) => ({
	position: e,
	className: "fill-text-secondary",
	formatter: (e) => et(Number(e))
});
function tt({ title: a, unit: s, series: c, rows: l, color: u, empty: d, layout: f = "vertical" }) {
	let p = l.filter((e) => Number.isFinite(e.value) && e.value >= 0).map((e) => ({
		name: e.name,
		value: e.value
	})), m = p.reduce((e, t) => e + t.value, 0);
	if (!m) return /* @__PURE__ */ (0, J.jsx)(n, {
		title: a,
		children: d
	});
	let g = f === "horizontal";
	return /* @__PURE__ */ (0, J.jsxs)("section", {
		className: e,
		"aria-label": a,
		children: [/* @__PURE__ */ (0, J.jsx)(r, {
			title: a,
			figure: m.toLocaleString(),
			note: s(m)
		}), /* @__PURE__ */ (0, J.jsxs)(o, {
			data: p,
			config: { value: {
				label: c,
				colors: me(u)
			} },
			layout: f,
			barRadius: 4,
			chartProps: g ? { margin: {
				top: 5,
				right: 56,
				bottom: 5,
				left: 5
			} } : void 0,
			className: g ? "aspect-auto h-64 flex-none text-text-secondary" : "aspect-auto h-56 flex-none text-text-secondary",
			children: [
				/* @__PURE__ */ (0, J.jsx)(o.Grid, {}),
				g ? /* @__PURE__ */ (0, J.jsx)(o.YAxis, {
					dataKey: "name",
					interval: 0,
					tick: /* @__PURE__ */ (0, J.jsx)(t, { along: "y" }),
					width: h(p.map((e) => e.name))
				}) : /* @__PURE__ */ (0, J.jsx)(o.XAxis, {
					dataKey: "name",
					interval: 0,
					tick: /* @__PURE__ */ (0, J.jsx)(t, { along: "x" })
				}),
				g ? /* @__PURE__ */ (0, J.jsx)(o.XAxis, {
					hide: !0,
					domain: Y
				}) : /* @__PURE__ */ (0, J.jsx)(o.YAxis, {
					hide: !0,
					domain: Y
				}),
				/* @__PURE__ */ (0, J.jsx)(o.Bar, {
					dataKey: "value",
					enableHoverHighlight: !0,
					barProps: {
						dataKey: "value",
						label: X(g ? "right" : "top")
					}
				}),
				/* @__PURE__ */ (0, J.jsx)(i, {})
			]
		})]
	});
}
// src/react/charts/heat.ts
var nt = [
	F("manage:heatChart.monday"),
	F("manage:heatChart.tuesday"),
	F("manage:heatChart.wednesday"),
	F("manage:heatChart.thursday"),
	F("manage:heatChart.friday"),
	F("manage:heatChart.saturday"),
	F("manage:heatChart.sunday")
], rt = (e, t) => e ? Math.max(.12, e / t) : 0;
function it(e) {
	let t = Array.from({ length: 7 }, () => Array(24).fill(0));
	for (let n of e?.hours || []) {
		let { weekday: e, hour: r, count: i } = n;
		!Number.isInteger(e) || e < 0 || e > 6 || !Number.isInteger(r) || r < 0 || r > 23 || !Number.isFinite(i) || i < 0 || (t[e][r] = (t[e][r] || 0) + i);
	}
	let n = t.flat(), r = Math.max(1, ...n);
	return {
		cells: t.flatMap((e, t) => e.map((e, n) => ({
			key: `${t}-${n}`,
			label: `${nt[t]} ${n}:00`,
			count: e,
			share: rt(e, r)
		}))),
		total: n.reduce((e, t) => e + t, 0)
	};
}
function at(e) {
	let t = (e?.days || []).filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.date) && Number.isFinite(e.count) && e.count >= 0).slice().sort((e, t) => e.date.localeCompare(t.date)), n = {
		cells: [],
		total: 0,
		start: "",
		end: ""
	};
	if (!t.length) return n;
	let r = /* @__PURE__ */ new Date(`${t.at(-1).date}T00:00:00Z`), i = new Date(r);
	i.setUTCDate(i.getUTCDate() - 90);
	let a = new Map(t.map((e) => [e.date, e.count])), o = Math.max(1, ...t.map((e) => e.count)), s = Array.from({ length: 91 }, (e, t) => {
		let n = new Date(i);
		n.setUTCDate(i.getUTCDate() + t);
		let r = n.toISOString().slice(0, 10), s = a.get(r) || 0;
		return {
			key: r,
			label: r,
			count: s,
			share: rt(s, o)
		};
	});
	return {
		cells: s,
		total: s.reduce((e, t) => e + t.count, 0),
		start: i.toISOString().slice(0, 10),
		end: t.at(-1).date
	};
}
// src/react/charts/heat-card.tsx
var Z = 14, Q = 17, ot = {
	4: {
		fill: "fill-chart-4",
		dot: "bg-chart-4"
	},
	5: {
		fill: "fill-chart-5",
		dot: "bg-chart-5"
	}
}, st = {
	start: "translate-x-0",
	center: "-translate-x-1/2",
	end: "-translate-x-full"
};
function ct({ cell: e, series: t, tone: n, left: r, top: i, anchor: a }) {
	return /* @__PURE__ */ (0, J.jsxs)("div", {
		"aria-hidden": !0,
		style: {
			left: `${r}%`,
			top: `${i}%`
		},
		className: `pointer-events-none absolute z-10 -mt-2 -translate-y-full ${c} ${st[a]}`,
		children: [/* @__PURE__ */ (0, J.jsx)("div", {
			className: "font-medium text-foreground",
			children: e.label
		}), /* @__PURE__ */ (0, J.jsx)(d, {
			name: t,
			value: e.count,
			swatch: /* @__PURE__ */ (0, J.jsx)("i", { className: `${l} ${ot[n].dot}` })
		})]
	});
}
function $({ title: t, words: n, cells: i, total: a, columns: o, rows: s, axis: c, footer: l, tone: u }) {
	let [d, f] = (0, I.useState)(-1), [p, m] = (0, I.useState)(0), h = (0, I.useRef)(null), g = p < i.length ? p : 0, _ = c ? 30 : 0, v = c ? 18 : 0, y = _ + o * Q, b = v + s * Q, x = (e) => ({
		x: _ + e % o * Q,
		y: v + Math.floor(e / o) * Q
	}), S = i[d], C = S ? x(d) : null, w = C ? (C.x + Z / 2) / y : 0, T = w < .1 ? "start" : w > .9 ? "end" : "center", E = C ? {
		start: C.x,
		center: C.x + Z / 2,
		end: C.x + Z
	}[T] : 0, D = (e, t) => {
		let n = t - t % o, r = {
			ArrowLeft: t - 1,
			ArrowRight: t + 1,
			ArrowUp: t - o,
			ArrowDown: t + o,
			Home: n,
			End: Math.min(n + o, i.length) - 1
		}[e.key];
		r !== void 0 && (e.preventDefault(), r < 0 || r >= i.length || (m(r), h.current?.querySelector(`rect[data-cell="${r}"]`)?.focus()));
	};
	return /* @__PURE__ */ (0, J.jsxs)("section", {
		className: e,
		children: [
			/* @__PURE__ */ (0, J.jsx)(r, {
				title: t,
				figure: (S ? S.count : a).toLocaleString(),
				note: S ? S.label : n.unit(a)
			}),
			/* @__PURE__ */ (0, J.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, J.jsx)("div", {
					className: "min-w-0 overflow-x-auto",
					children: /* @__PURE__ */ (0, J.jsxs)("svg", {
						ref: h,
						role: "img",
						"aria-label": t,
						onPointerLeave: () => f(-1),
						viewBox: `0 0 ${y} ${b}`,
						className: c ? "block h-auto min-w-80 w-full" : "block h-auto w-full",
						children: [c, i.map((e, t) => {
							let { x: r, y: i } = x(t);
							return /* @__PURE__ */ (0, J.jsx)("rect", {
								"data-cell": t,
								tabIndex: t === g ? 0 : -1,
								role: "img",
								"aria-label": `${e.label}${F("shell:format.clauseSeparator")}${n.cell(e.count)}`,
								x: r,
								y: i,
								width: Z,
								height: Z,
								rx: 3,
								fillOpacity: e.share || 1,
								opacity: d >= 0 && d !== t ? .4 : 1,
								className: e.share ? `outline-none transition-opacity duration-200 focus-visible:stroke-border-focus-ring ${ot[u].fill}` : "fill-chart-track outline-none transition-opacity duration-200 focus-visible:stroke-border-focus-ring",
								onPointerEnter: () => f(t),
								onFocus: () => {
									f(t), m(t);
								},
								onBlur: () => f(-1),
								onKeyDown: (e) => D(e, t)
							}, e.key);
						})]
					})
				}), S && C ? /* @__PURE__ */ (0, J.jsx)(ct, {
					cell: S,
					series: n.series,
					tone: u,
					anchor: T,
					left: E / y * 100,
					top: C.y / b * 100
				}) : null]
			}),
			/* @__PURE__ */ (0, J.jsx)("footer", {
				className: "flex flex-wrap justify-between gap-3 text-caption-1-regular text-text-secondary",
				children: l
			})
		]
	});
}
var lt = /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [nt.map((e, t) => /* @__PURE__ */ (0, J.jsx)("text", {
	x: 0,
	y: 18 + t * Q + 7,
	dominantBaseline: "middle",
	className: "fill-text-secondary text-caption-1-regular",
	children: e
}, e)), Array.from({ length: 24 }, (e, t) => t % 2 ? null : /* @__PURE__ */ (0, J.jsx)("text", {
	x: 30 + t * Q,
	y: 8,
	dominantBaseline: "middle",
	className: "fill-text-secondary text-caption-1-regular",
	children: t
}, t))] });
function ut({ activity: e, title: t, dailyTitle: r, words: i, tone: a, empty: o }) {
	let s = it(e), c = at(e);
	return c.cells.length ? /* @__PURE__ */ (0, J.jsxs)("div", {
		className: "inline-grid w-full items-start gap-5 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, J.jsx)($, {
			title: t,
			words: i,
			tone: a,
			cells: s.cells,
			total: s.total,
			columns: 24,
			rows: 7,
			axis: lt,
			footer: /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [/* @__PURE__ */ (0, J.jsx)("span", { children: F("manage:charts.dayByHour") }), /* @__PURE__ */ (0, J.jsx)("span", { children: e?.timezone || "UTC+08:00" })] })
		}), /* @__PURE__ */ (0, J.jsx)($, {
			title: r,
			words: i,
			tone: a,
			cells: c.cells,
			total: c.total,
			columns: 13,
			rows: 7,
			footer: /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [/* @__PURE__ */ (0, J.jsx)("span", { children: c.start }), /* @__PURE__ */ (0, J.jsx)("span", { children: c.end })] })
		})]
	}) : /* @__PURE__ */ (0, J.jsx)(n, {
		title: t,
		children: o
	});
}
// src/react/components/expandable-ranking.tsx
function dt({ children: e, className: t = "", previewCount: n = 10 }) {
	let r = (0, I.useId)(), i = (0, I.useRef)(null), [a, o] = (0, I.useState)(!1), [s, c] = (0, I.useState)(!1), l = I.Children.toArray(e), u = l.length > n;
	(0, I.useLayoutEffect)(() => {
		let e = i.current;
		if (!e || !u) return;
		let t = () => {
			let t = e.children[Math.min(n, e.children.length) - 1];
			t && e.offsetWidth && (e.style.setProperty("--ranking-collapsed-height", `${t.offsetTop - e.offsetTop + t.offsetHeight}px`), e.style.setProperty("--ranking-expanded-height", `${e.scrollHeight}px`));
		};
		t();
		let r = new ResizeObserver(t);
		return r.observe(e), () => r.disconnect();
	}, [
		u,
		n,
		l.length
	]);
	let d = l.map((e, t) => !(0, I.isValidElement)(e) || t < n ? e : (0, I.cloneElement)(e, { inert: !a || void 0 }));
	return /* @__PURE__ */ (0, J.jsxs)("div", {
		"data-expandable-ranking": !0,
		"data-expandable": u || void 0,
		"data-expanded": a || void 0,
		"data-animating": s || void 0,
		children: [/* @__PURE__ */ (0, J.jsx)("ol", {
			id: r,
			ref: i,
			"data-expandable-ranking-list": !0,
			className: t,
			onTransitionEnd: (e) => {
				e.target === i.current && e.propertyName === "max-height" && c(!1);
			},
			children: d
		}), u ? /* @__PURE__ */ (0, J.jsx)("button", {
			type: "button",
			"data-ranking-toggle": !0,
			"aria-controls": r,
			"aria-expanded": a,
			"aria-label": F(a ? "shell:expandableRanking.collapse" : "shell:expandableRanking.expand"),
			onClick: () => {
				c(!0), o((e) => !e);
			},
			children: /* @__PURE__ */ (0, J.jsx)(ye, { "aria-hidden": !0 })
		}) : null]
	});
}
export { ut as ActivityHeat, Y as BAR_DOMAIN, tt as BarCard, dt as ExpandableRanking, Qe as PolarAngleAxis, B as Polygon, X as barLabel, U as selectPolarAxisScale, G as selectPolarAxisTicks, Me as selectPolarGraphicalItemAxisTicks };

//# debugId=7c6f0eb2-b725-438c-a017-8df5f0cc21cb