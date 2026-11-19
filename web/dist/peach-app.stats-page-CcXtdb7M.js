(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "e160c57d-c131-40a8-9ff4-b855184abf6b", e._sentryDebugIdIdentifier = "sentry-dbid-e160c57d-c131-40a8-9ff4-b855184abf6b");
	} catch {}
})();
import { $b4f18e3395fe64d7$export$3d96ec278d3efce4 as e, $b4f18e3395fe64d7$export$3e41faf802a29e71 as t, $b4f18e3395fe64d7$export$b2539bed5023c21c as n, $b4f18e3395fe64d7$export$e51a686c67fdaa2d as r, ButtonLink as i, EmptyState as a, LOC as o, MEDIA_SOURCE_ICONS as s, NR as c, Note as l, Progress as u, SEGMENT as d, SEGMENTED_TRACK as f, STATS_KEY as p, STAT_STRIP as m, SegmentedTabList as h, SourceMark as g, StatCard as _, StatusLabel as v, Xc as y, Xt as b, _8 as x, __toESM as S, bandRows as C, cardClass as w, clsx as T, codedText as E, errorMessage as ee, fetchStats as D, fmtCount as O, fmtSize as k, known as te, lengthRows as ne, mM as A, mediumRows as re, percentText as ie, playedFor as ae, playedItemUrl as oe, radialArc as se, radialBarSize as ce, radialCeiling as le, radialSlices as ue, reachedShare as de, replayRows as fe, require_jsx_runtime as pe, require_react as me, settingsPath as he, statCardClass as ge, t as j, uo as _e, useQuery as ve, watchNote as ye, watchedShare as be } from "./peach-app.js";
import { ActivityHeat as xe, BarCard as M, ExpandableRanking as Se, PolarAngleAxis as Ce, selectPolarAxisScale as we, selectPolarAxisTicks as Te, selectPolarGraphicalItemAxisTicks as Ee } from "./peach-app.expandable-ranking-msnIi2GJ.js";
import { AnimatedItems as De, CHART_CARD as Oe, CHART_COLORS as ke, Cell as Ae, ChartBackground as je, ChartContainer as Me, ChartEmpty as Ne, ChartLegend as Pe, ChartLegendContent as Fe, ChartTip as Ie, ChartTooltip as Le, ChartTooltipContent as Re, DefaultZIndexes as N, LabelListFromLabelProp as ze, Layer as Be, LoadingIndicator as Ve, PolarChart as He, PolarLabelListContextProvider as Ue, RegisterGraphicalItemId as We, Sector as P, SetPolarGraphicalItem as Ge, SetPolarLegendPayload as Ke, SetTooltipEntrySettings as qe, Shape as Je, ZIndexLayer as Ye, adaptEventsOfChild as Xe, arrayTooltipSearcher as Ze, combineAllBarPositions as Qe, combineBarPosition as $e, combineBarSizeList as et, combineDisplayedStackedData as tt, combineStackGroups as nt, combineStackedData as rt, createSelector as F, defaultPolarChartProps as it, findAllByType as at, getBandSizeOfAxis as I, getBaseValueOfBar as ot, getCateCoordinateOfBar as st, getColorsCount as ct, getNormalizedStackId as lt, getTooltipNameProp as ut, getValueByDataKey as dt, getZIndexFromUnknown as ft, interpolate as L, isCategoricalAxis as pt, isNullish as mt, isStacked as ht, matchAppend as gt, mathSign as _t, noop as vt, resolveDefaultProps as yt, selectActiveTooltipIndex as bt, selectAngleAxis as xt, selectBarCategoryGap as St, selectBarGap as Ct, selectChartDataAndAlwaysIgnoreIndexes as wt, selectChartDataWithIndexes as Tt, selectChartLayout as R, selectPolarItemsSettings as Et, selectPolarViewBox as Dt, selectRadiusAxis as Ot, selectReverseStackOrder as kt, selectRootBarSize as At, selectRootMaxBarSize as jt, selectStackOffsetType as Mt, selectTooltipAxis as Nt, selectUnfilteredPolarItems as Pt, sliceConfig as Ft, sliceKey as It, svgPropertiesNoEvents as Lt, svgPropertiesNoEventsFromUnknown as Rt, truncateByDomain as zt, useAnimationCallbacks as Bt, useAppSelector as Vt, useMouseClickItemDispatch as Ht, useMouseEnterItemDispatch as Ut, useMouseLeaveItemDispatch as Wt, usePolarChartLayout as Gt } from "./peach-app.chart-tip-CRxYp6KT.js";
import { ConnectionStatus as Kt } from "./peach-app.connection-status-BrXhLGSm.js";
import { Page as qt } from "./peach-app.page-QAncjzM1.js";
// node_modules/recharts/es6/util/RadialBarUtils.js
var z = /* @__PURE__ */ S(me()), Jt = ["option"];
function Yt(e, t) {
	if (e == null) return {};
	var n, r, i = Xt(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Xt(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Zt = P;
function Qt(e) {
	return typeof e == "string" ? parseInt(e, 10) : e;
}
function $t(e) {
	var t = e.option, n = Yt(e, Jt);
	return /*#__PURE__*/ z.createElement(Je, {
		option: t,
		DefaultShape: Zt,
		shapeProps: n
	});
}
// node_modules/recharts/es6/state/selectors/radialBarSelectors.js
function en(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function B(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? en(Object(n), !0).forEach(function(t) {
			tn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : en(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function tn(e, t, n) {
	return (t = nn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function nn(e) {
	var t = rn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function rn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var V = F([(e, t) => Ot(e, t), (e, t) => we(e, "radiusAxis", t)], (e, t) => {
	if (e != null && t != null) return B(B({}, e), {}, { scale: t });
}), an = (e, t) => Ee(e, "radiusAxis", t, !1), H = F([(e, t, n) => xt(e, n), (e, t, n) => we(e, "angleAxis", n)], (e, t) => {
	if (e != null && t != null) return B(B({}, e), {}, { scale: t });
}), on = (e, t, n) => Te(e, "angleAxis", n, !1), U = F([Pt, (e, t, n, r) => r], (e, t) => {
	if (e.some((e) => e.type === "radialBar" && t.dataKey === e.dataKey && t.stackId === e.stackId)) return t;
}), sn = F([
	R,
	V,
	an,
	H,
	on
], (e, t, n, r, i) => pt(e, "radiusAxis") ? I(t, n, !1) : I(r, i, !1)), cn = F([
	H,
	V,
	R
], (e, t, n) => {
	var r = n === "radial" ? e : t;
	if (r != null && r.scale != null) return ot({ numericAxis: r });
}), ln = (e, t, n, r, i) => i, un = (e, t, n, r, i) => n, dn = (e, t, n, r, i) => t, fn = (e, t, n, r, i) => r.maxBarSize, pn = (e) => e.type === "radialBar", mn = F([
	R,
	Pt,
	un,
	dn
], (e, t, n, r) => t.filter((t) => e === "centric" ? t.angleAxisId === n : t.radiusAxisId === r).filter((e) => e.hide === !1).filter(pn)), hn = F([
	mn,
	At,
	() => void 0
], et), gn = F([
	R,
	jt,
	H,
	on,
	V,
	an,
	fn
], (e, t, n, r, i, a, o) => {
	var s = mt(o) ? t : o;
	return e === "centric" ? I(n, r, !0) ?? s ?? 0 : I(i, a, !0) ?? s ?? 0;
}), _n = F([
	hn,
	jt,
	Ct,
	St,
	gn,
	sn,
	fn
], Qe), vn = F([_n, U], $e), yn = F([Et], (e) => e.filter(pn).filter(ht)), bn = F([
	yn,
	wt,
	Nt
], tt), xn = F([
	bn,
	yn,
	Mt,
	kt
], nt), Sn = F([(e, t, n) => R(e) === "centric" ? xn(e, "radiusAxis", t) : xn(e, "angleAxis", n), U], rt), Cn = F([
	H,
	on,
	V,
	an,
	Tt,
	U,
	sn,
	R,
	cn,
	Dt,
	ln,
	vn,
	Sn
], (e, t, n, r, i, a, o, s, c, l, u, d, f) => {
	var p = i.chartData, m = i.dataStartIndex, h = i.dataEndIndex;
	if (a == null || n == null || e == null || p == null || o == null || d == null || s !== "centric" && s !== "radial" || r == null || l == null) return [];
	var g = a.dataKey, _ = a.minPointSize, v = l.cx, y = l.cy, b = l.startAngle, x = l.endAngle;
	return Un({
		angleAxis: e,
		angleAxisTicks: t,
		bandSize: o,
		baseValue: c,
		cells: u,
		cx: v,
		cy: y,
		dataKey: g,
		dataStartIndex: m,
		displayedData: p.slice(m, h + 1),
		endAngle: x,
		layout: s,
		minPointSize: _,
		pos: d,
		radiusAxis: n,
		radiusAxisTicks: r,
		stackedData: f,
		stackedDomain: f ? (s === "centric" ? n : e).scale.domain() : null,
		startAngle: b
	});
}), wn = F([wt, (e, t) => t], (e, t) => {
	var n = e.chartData, r = e.dataStartIndex, i = e.dataEndIndex;
	if (n == null) return [];
	var a = n.slice(r, i + 1);
	return a.length === 0 ? [] : a.map((e) => ({
		type: t,
		value: e.name,
		color: e.fill,
		payload: e
	}));
}), Tn = [
	"shape",
	"activeShape",
	"cornerRadius",
	"id"
], En = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
], Dn = ["value", "background"];
function W() {
	return W = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, W.apply(null, arguments);
}
function On(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function G(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? On(Object(n), !0).forEach(function(t) {
			kn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : On(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function kn(e, t, n) {
	return (t = An(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function An(e) {
	var t = jn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function jn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function K(e, t) {
	if (e == null) return {};
	var n, r, i = Mn(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Mn(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Nn = [];
function Pn(e) {
	var t = e.showLabels, n = e.sectors, r = e.children, i = n.map((e) => ({
		value: e.value,
		payload: e.payload,
		parentViewBox: void 0,
		clockWise: !1,
		viewBox: {
			cx: e.cx,
			cy: e.cy,
			innerRadius: e.innerRadius,
			outerRadius: e.outerRadius,
			startAngle: e.startAngle,
			endAngle: e.endAngle,
			clockWise: !1
		},
		fill: e.fill
	}));
	return /*#__PURE__*/ z.createElement(Ue, { value: t ? i : void 0 }, r);
}
function Fn(e) {
	var t = e.sectors, n = e.allOtherRadialBarProps, r = e.showLabels, i = e.animationElapsedTime, a = e.isAnimating, o = e.isEntrance, s = n.shape, c = n.activeShape, l = n.cornerRadius, u = n.id, d = K(n, Tn), f = Lt(d), p = Vt(bt), m = n.onMouseEnter, h = n.onClick, g = n.onMouseLeave, _ = K(n, En), v = Ut(m, n.dataKey, u), y = Wt(g), b = Ht(h, n.dataKey, u);
	return t == null ? null : /*#__PURE__*/ z.createElement(Pn, {
		showLabels: r,
		sectors: t
	}, t.map((e, t) => {
		var n = !!(c && p === String(t)), r = v(e, t), u = y(e, t), m = b(e, t), h = G(G(G(G({}, f), {}, { cornerRadius: Qt(l) }, e), Xe(_, e, t)), {}, {
			onMouseEnter: r,
			onMouseLeave: u,
			onClick: m,
			className: `recharts-radial-bar-sector ${e.className}`,
			forceCornerRadius: d.forceCornerRadius,
			cornerIsExternal: d.cornerIsExternal,
			animationElapsedTime: i,
			isAnimating: a,
			isEntrance: o,
			isActive: n,
			option: n && c != null ? c : s,
			index: t
		});
		return n ? /*#__PURE__*/ z.createElement(Ye, {
			zIndex: N.activeBar,
			key: `sector-${e.cx}-${e.cy}-${e.innerRadius}-${e.outerRadius}-${e.startAngle}-${e.endAngle}-${t}`
		}, /*#__PURE__*/ z.createElement($t, h)) : /*#__PURE__*/ z.createElement($t, W({ key: `sector-${e.cx}-${e.cy}-${e.innerRadius}-${e.outerRadius}-${e.startAngle}-${e.endAngle}-${t}` }, h));
	}), /*#__PURE__*/ z.createElement(ze, { label: n.label }), n.children);
}
var In = (e, t) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => e.status === "removed" ? [] : e.status === "matched" ? [G(G({}, e.next), {}, {
	startAngle: L(e.prev.startAngle, e.next.startAngle, t),
	endAngle: L(e.prev.endAngle, e.next.endAngle, t)
})] : [G(G({}, e.next), {}, { endAngle: L(e.next.startAngle, e.next.endAngle, t) })]);
function Ln(e) {
	var t = e.props, n = e.previousSectorsRef, r = t.sectors, i = t.isAnimationActive, a = t.animationBegin, o = t.animationDuration, s = t.animationEasing, c = t.onAnimationStart, l = t.onAnimationEnd, u = Bt(c, l), d = u.isAnimating, f = u.handleAnimationStart, p = u.handleAnimationEnd, m = Gt();
	return m == null ? null : /*#__PURE__*/ z.createElement(De, {
		animationInput: t,
		animationIdPrefix: "recharts-radialbar-",
		items: r,
		previousItemsRef: n,
		isAnimationActive: i,
		animationBegin: a,
		animationDuration: o,
		animationEasing: s,
		onAnimationStart: f,
		onAnimationEnd: p,
		animationInterpolateFn: t.animationInterpolateFn,
		animationMatchBy: t.animationMatchBy,
		layout: m
	}, (e, n, r) => /*#__PURE__*/ z.createElement(Fn, {
		sectors: e,
		allOtherRadialBarProps: t,
		showLabels: !d,
		animationElapsedTime: n,
		isAnimating: d || n < 1,
		isEntrance: r
	}));
}
function Rn(e) {
	var t = (0, z.useRef)(null);
	return /*#__PURE__*/ z.createElement(Ln, {
		props: e,
		previousSectorsRef: t
	});
}
function zn(e) {
	var t = Vt((t) => wn(t, e.legendType));
	return /*#__PURE__*/ z.createElement(Ke, { legendPayload: t ?? [] });
}
var Bn = /*#__PURE__*/ z.memo((e) => {
	var t = e.dataKey, n = e.sectors, r = e.stroke, i = e.strokeWidth, a = e.name, o = e.hide, s = e.fill, c = e.tooltipType, l = e.formatter, u = e.id, d = {
		dataDefinedOnItem: n,
		getPosition: vt,
		settings: {
			graphicalItemId: u,
			stroke: r,
			strokeWidth: i,
			fill: s,
			nameKey: void 0,
			dataKey: t,
			name: ut(a, t),
			hide: o,
			type: c,
			color: s,
			unit: "",
			formatter: l
		}
	};
	return /*#__PURE__*/ z.createElement(qe, { tooltipEntrySettings: d });
}), Vn = class extends z.PureComponent {
	renderBackground(e) {
		if (e == null) return null;
		var t = this.props.cornerRadius, n = Rt(this.props.background);
		return /*#__PURE__*/ z.createElement(Ye, { zIndex: ft(this.props.background, N.barBackground) }, e.map((e, r) => {
			e.value;
			var i = e.background, a = K(e, Dn);
			if (!i) return null;
			var o = G(G(G(G(G({ cornerRadius: Qt(t) }, a), {}, { fill: "#eee" }, i), n), Xe(this.props, e, r)), {}, {
				index: r,
				className: T("recharts-radial-bar-background-sector", String(n?.className)),
				option: i,
				isActive: !1
			});
			return /*#__PURE__*/ z.createElement($t, W({ key: `background-${a.cx}-${a.cy}-${a.innerRadius}-${a.outerRadius}-${a.startAngle}-${a.endAngle}-${r}` }, o));
		}));
	}
	render() {
		var e = this.props, t = e.hide, n = e.sectors, r = e.className, i = e.background;
		if (t) return null;
		var a = T("recharts-area", r);
		return /*#__PURE__*/ z.createElement(Ye, { zIndex: this.props.zIndex }, /*#__PURE__*/ z.createElement(Be, { className: a }, i && /*#__PURE__*/ z.createElement(Be, { className: "recharts-radial-bar-background" }, this.renderBackground(n)), /*#__PURE__*/ z.createElement(Be, { className: "recharts-radial-bar-sectors" }, /*#__PURE__*/ z.createElement(Rn, this.props))));
	}
};
function Hn(e) {
	var t = z.useMemo(() => at(e.children, Ae), [e.children]), n = z.useMemo(() => ({
		data: void 0,
		hide: !1,
		id: e.id,
		dataKey: e.dataKey,
		minPointSize: e.minPointSize,
		stackId: lt(e.stackId),
		maxBarSize: e.maxBarSize,
		barSize: e.barSize,
		type: "radialBar",
		angleAxisId: e.angleAxisId,
		radiusAxisId: e.radiusAxisId
	}), [
		e.id,
		e.dataKey,
		e.minPointSize,
		e.stackId,
		e.maxBarSize,
		e.barSize,
		e.angleAxisId,
		e.radiusAxisId
	]), r = Vt((r) => Cn(r, e.radiusAxisId, e.angleAxisId, n, t)) ?? Nn;
	return /*#__PURE__*/ z.createElement(z.Fragment, null, /*#__PURE__*/ z.createElement(Bn, {
		dataKey: e.dataKey,
		sectors: r,
		stroke: e.stroke,
		strokeWidth: e.strokeWidth,
		name: e.name,
		hide: e.hide,
		fill: e.fill,
		tooltipType: e.tooltipType,
		formatter: e.formatter,
		id: e.id
	}), /*#__PURE__*/ z.createElement(Vn, W({}, e, { sectors: r })));
}
var q = {
	angleAxisId: 0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: gt,
	animationInterpolateFn: In,
	background: !1,
	cornerIsExternal: !1,
	cornerRadius: 0,
	forceCornerRadius: !1,
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "rect",
	minPointSize: 0,
	radiusAxisId: 0,
	shape: Zt,
	zIndex: N.bar
};
function Un(e) {
	var t = e.displayedData, n = e.stackedData, r = e.dataStartIndex, i = e.stackedDomain, a = e.dataKey, o = e.baseValue, s = e.layout, c = e.radiusAxis, l = e.radiusAxisTicks, u = e.bandSize, d = e.pos, f = e.angleAxis, p = e.minPointSize, m = e.cx, h = e.cy, g = e.angleAxisTicks, _ = e.cells, v = e.startAngle, y = e.endAngle;
	return g == null || l == null ? Nn : (t ?? []).map((e, t) => {
		var b, x, S, C, w, T;
		if (n ? b = zt(n[r + t], i) : (b = dt(e, a), Array.isArray(b) || (b = [o, b])), s === "radial") {
			if (C = f.scale.map(b[0]) ?? v, w = f.scale.map(b[1]) ?? y, x = st({
				axis: c,
				ticks: l,
				bandSize: u,
				offset: d.offset,
				entry: e,
				index: t
			}), x != null && w != null && C != null) {
				S = x + d.size;
				var E = w - C;
				if (Math.abs(p) > 0 && Math.abs(E) < Math.abs(p)) {
					var ee = _t(E || p) * (Math.abs(p) - Math.abs(E));
					w += ee;
				}
				T = { background: {
					cx: m,
					cy: h,
					innerRadius: x,
					outerRadius: S,
					startAngle: v,
					endAngle: y
				} };
			}
		} else if (x = c.scale.map(b[0]), S = c.scale.map(b[1]), C = st({
			axis: f,
			ticks: g,
			bandSize: u,
			offset: d.offset,
			entry: e,
			index: t
		}), x != null && S != null && C != null) {
			w = C + d.size;
			var D = S - x;
			if (Math.abs(p) > 0 && Math.abs(D) < Math.abs(p)) {
				var O = _t(D || p) * (Math.abs(p) - Math.abs(D));
				S += O;
			}
		}
		return G(G(G({}, e), T), {}, {
			payload: e,
			value: n ? b : b[1],
			cx: m,
			cy: h,
			innerRadius: x,
			outerRadius: S,
			startAngle: C,
			endAngle: w
		}, _ && _[t] && _[t].props);
	});
}
function Wn(e) {
	var t = yt(e, q);
	return /*#__PURE__*/ z.createElement(We, {
		id: t.id,
		type: "radialBar"
	}, (e) => /*#__PURE__*/ z.createElement(z.Fragment, null, /*#__PURE__*/ z.createElement(Ge, {
		type: "radialBar",
		id: e,
		data: void 0,
		dataKey: t.dataKey,
		hide: t.hide ?? q.hide,
		angleAxisId: t.angleAxisId ?? q.angleAxisId,
		radiusAxisId: t.radiusAxisId ?? q.radiusAxisId,
		stackId: lt(t.stackId),
		barSize: t.barSize,
		minPointSize: t.minPointSize,
		maxBarSize: t.maxBarSize
	}), /*#__PURE__*/ z.createElement(zn, t), /*#__PURE__*/ z.createElement(Hn, W({}, t, { id: e }))));
}
Wn.displayName = "RadialBar";
// node_modules/recharts/es6/chart/RadialBarChart.js
function Gn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Kn(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Gn(Object(n), !0).forEach(function(t) {
			qn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Gn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function qn(e, t, n) {
	return (t = Jn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Jn(e) {
	var t = Yn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Yn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Xn = ["axis", "item"], Zn = Kn(Kn({}, it), {}, {
	layout: "radial",
	startAngle: 0,
	endAngle: 360
}), Qn = /*#__PURE__*/ (0, z.forwardRef)((e, t) => {
	var n = yt(e, Zn);
	return /*#__PURE__*/ z.createElement(He, {
		chartName: "RadialBarChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: Xn,
		tooltipPayloadSearcher: Ze,
		categoricalChartProps: n,
		ref: t
	});
}), J = pe(), $n = "30%", er = "100%", tr = 5, nr = 14, rr = 5, ir = 1500, ar = (0, z.createContext)(null);
function or() {
	let e = (0, z.use)(ar);
	if (!e) throw Error("Radial chart parts (<RadialBar />, <Tooltip />, …) must be used within <EvilRadialChart />");
	return e;
}
function Y({ config: e, data: t, nameKey: n, children: r, className: i, chartProps: a, variant: o = "full", max: s, innerRadius: c = $n, outerRadius: l = er, defaultSelectedDataKey: u = null, onSelectionChange: d, isLoading: f = !1, backgroundVariant: p }) {
	let m = (0, z.useId)().replace(/:/g, ""), [h, g] = (0, z.useState)(u), _ = pr(f), v = ur(o), y = (0, z.useCallback)((e, t) => {
		g(e), d?.(e === null ? null : {
			dataKey: e,
			value: t ?? 0
		});
	}, [d]), b = (0, z.useMemo)(() => t.map((e) => ({
		...e,
		fill: `url(#${m}-radial-colors-${e[n]})`
	})), [
		t,
		n,
		m
	]), x = (0, z.useMemo)(() => ({
		config: e,
		nameKey: n,
		chartId: m,
		isLoading: f,
		selectedBar: h,
		selectBar: y
	}), [
		e,
		n,
		m,
		f,
		h,
		y
	]);
	return /* @__PURE__ */ (0, J.jsx)(ar, {
		value: x,
		children: /* @__PURE__ */ (0, J.jsxs)(Me, {
			className: i,
			config: e,
			children: [/* @__PURE__ */ (0, J.jsx)(Ve, { isLoading: f }), /* @__PURE__ */ (0, J.jsxs)(Qn, {
				id: m,
				data: f ? _ : b,
				innerRadius: c,
				outerRadius: l,
				startAngle: v.startAngle,
				endAngle: v.endAngle,
				cx: v.cx,
				cy: v.cy,
				...a,
				children: [
					s != null && s > 0 && /* @__PURE__ */ (0, J.jsx)(Ce, {
						type: "number",
						domain: [0, s],
						tick: !1,
						axisLine: !1
					}),
					p && /* @__PURE__ */ (0, J.jsx)(je, { variant: p }),
					r,
					f && /* @__PURE__ */ (0, J.jsx)(mr, {}),
					/* @__PURE__ */ (0, J.jsx)("defs", { children: /* @__PURE__ */ (0, J.jsx)(dr, {
						config: e,
						chartId: m
					}) })
				]
			})]
		})
	});
}
function sr({ dataKey: e, cornerRadius: t = tr, barSize: n = nr, showBackground: r = !0, isClickable: i = !1, radialBarProps: a }) {
	let { nameKey: o, isLoading: s, selectedBar: c, selectBar: l } = or();
	return s ? null : /* @__PURE__ */ (0, J.jsx)(Wn, {
		dataKey: e,
		cornerRadius: t,
		barSize: n,
		background: r,
		className: "drop-shadow-sm",
		style: i ? { cursor: "pointer" } : void 0,
		onClick: (t, n) => {
			if (!i) return;
			let r = t, a = r?.[o] ?? String(n), s = Number(r?.[e] ?? 0);
			l(c === a ? null : a, s);
		},
		shape: (e) => {
			let t = e[o], n = c === null || c === t;
			return /* @__PURE__ */ (0, J.jsx)(P, {
				...e,
				opacity: i && !n ? .15 : 1,
				className: "transition-opacity duration-200"
			});
		},
		...a
	});
}
function cr({ variant: e, roundness: t, defaultIndex: n }) {
	let { nameKey: r, isLoading: i } = or();
	return i ? null : /* @__PURE__ */ (0, J.jsx)(Le, {
		defaultIndex: n,
		cursor: !1,
		content: /* @__PURE__ */ (0, J.jsx)(Re, {
			nameKey: r,
			hideLabel: !0,
			roundness: t,
			variant: e
		})
	});
}
function lr({ variant: e, align: t = "center", verticalAlign: n = "bottom", isClickable: r = !1 }) {
	let { nameKey: i, isLoading: a, selectedBar: o, selectBar: s } = or();
	return a ? null : /* @__PURE__ */ (0, J.jsx)(Pe, {
		verticalAlign: n,
		align: t,
		content: /* @__PURE__ */ (0, J.jsx)(Fe, {
			selected: o,
			onSelectChange: s,
			isClickable: r,
			nameKey: i,
			variant: e
		})
	});
}
function ur(e) {
	switch (e) {
		case "semi": return {
			startAngle: 180,
			endAngle: 0,
			cx: "50%",
			cy: "70%"
		};
		default: return {
			startAngle: 90,
			endAngle: -270,
			cx: "50%",
			cy: "50%"
		};
	}
}
var dr = ({ config: e, chartId: t }) => /* @__PURE__ */ (0, J.jsx)(J.Fragment, { children: Object.entries(e).map(([e, n]) => {
	let r = ct(n);
	return /* @__PURE__ */ (0, J.jsx)("linearGradient", {
		id: `${t}-radial-colors-${e}`,
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "1",
		children: r === 1 ? /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [/* @__PURE__ */ (0, J.jsx)("stop", {
			offset: "0%",
			stopColor: `var(--color-${e}-0)`
		}), /* @__PURE__ */ (0, J.jsx)("stop", {
			offset: "100%",
			stopColor: `var(--color-${e}-0)`
		})] }) : Array.from({ length: r }, (t, n) => {
			let i = `${n / (r - 1) * 100}%`;
			return /* @__PURE__ */ (0, J.jsx)("stop", {
				offset: i,
				stopColor: `var(--color-${e}-${n}, var(--color-${e}-0))`
			}, i);
		})
	}, `${t}-radial-colors-${e}`);
}) });
function fr() {
	return Array.from({ length: rr }, (e, t) => ({
		name: `loading${t}`,
		value: 40 + Math.random() * 60
	}));
}
function pr(e) {
	let [t, n] = (0, z.useState)(0);
	return (0, z.useEffect)(() => {
		if (!e) return;
		let t = setInterval(() => {
			n((e) => e + 1);
		}, ir);
		return () => clearInterval(t);
	}, [e]), (0, z.useMemo)(() => fr(), [t]);
}
var mr = () => /* @__PURE__ */ (0, J.jsx)(Wn, {
	dataKey: "value",
	cornerRadius: tr,
	barSize: nr,
	background: !0,
	isAnimationActive: !0,
	animationDuration: ir,
	animationEasing: "ease-in-out",
	shape: (e) => /* @__PURE__ */ (0, J.jsx)(P, {
		...e,
		fill: "currentColor",
		fillOpacity: .25
	})
});
Y.RadialBar = sr, Y.Tooltip = cr, Y.Legend = lr;
// src/react/stats/radial-card.tsx
var hr = [
	"bg-chart-1",
	"bg-chart-2",
	"bg-chart-3",
	"bg-chart-4",
	"bg-chart-5",
	"bg-chart-6"
], gr = [
	"aria-pressed:bg-chart-1/10 aria-pressed:ring-chart-1",
	"aria-pressed:bg-chart-2/10 aria-pressed:ring-chart-2",
	"aria-pressed:bg-chart-3/10 aria-pressed:ring-chart-3",
	"aria-pressed:bg-chart-4/10 aria-pressed:ring-chart-4",
	"aria-pressed:bg-chart-5/10 aria-pressed:ring-chart-5",
	"aria-pressed:bg-chart-6/10 aria-pressed:ring-chart-6"
];
function _r({ title: e, rows: t, empty: n, unit: r = (e) => j("manage:radialCard.videoUnit", { count: e }) }) {
	let [i, a] = (0, z.useState)(-1), [o, s] = (0, z.useState)(-1), c = ue(t);
	if (!c.length) return /* @__PURE__ */ (0, J.jsx)(Ne, {
		title: e,
		children: n
	});
	let l = o >= 0 ? o : i, u = c.reduce((e, t) => e + t.value, 0), d = c[l], f = (e) => a((t) => t === e ? -1 : e), p = le(c.map((e) => e.value)), m = c.map((e, t) => ({
		slice: It(t),
		count: e.value,
		arc: se(e.value, p)
	}));
	return /* @__PURE__ */ (0, J.jsxs)("section", {
		className: Oe,
		children: [
			/* @__PURE__ */ (0, J.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-x-4 gap-y-1",
				children: [/* @__PURE__ */ (0, J.jsxs)("span", {
					className: "flex min-w-0 flex-col gap-1",
					children: [/* @__PURE__ */ (0, J.jsxs)("h3", {
						className: "flex items-center gap-1.5 text-title-2-medium wrap-anywhere text-text-primary",
						children: [d?.mark ? /* @__PURE__ */ (0, J.jsx)(g, { mark: d.mark }) : null, d ? d.name : e]
					}), /* @__PURE__ */ (0, J.jsx)("b", {
						className: "text-display-4-medium tabular-nums text-text-primary",
						children: (d ? d.value : u).toLocaleString()
					})]
				}), /* @__PURE__ */ (0, J.jsx)("small", {
					className: "text-caption-1-regular text-text-secondary",
					children: r(d ? d.value : u)
				})]
			}),
			/* @__PURE__ */ (0, J.jsx)("div", {
				role: "img",
				"aria-label": e,
				onPointerLeave: () => s(-1),
				children: /* @__PURE__ */ (0, J.jsxs)(Y, {
					data: m,
					nameKey: "slice",
					config: Ft(c.map((e) => e.name)),
					max: p,
					innerRadius: "22%",
					className: "aspect-auto h-75 max-sm:h-65",
					children: [/* @__PURE__ */ (0, J.jsx)(Y.RadialBar, {
						dataKey: "arc",
						barSize: ce(c.length),
						radialBarProps: {
							shape: (e) => /* @__PURE__ */ (0, J.jsx)(P, {
								...e,
								opacity: l >= 0 && l !== e.index ? .3 : 1,
								className: "cursor-pointer transition-opacity duration-200"
							}),
							onClick: (e, t) => f(t),
							onMouseEnter: (e, t) => s(t)
						}
					}), /* @__PURE__ */ (0, J.jsx)(Ie, {
						nameKey: "slice",
						valueKey: "count",
						hideLabel: !0
					})]
				})
			}),
			/* @__PURE__ */ (0, J.jsx)("div", {
				className: "inline-grid w-full grid-cols-3 gap-2 max-sm:grid-cols-2",
				children: c.map((e, t) => /* @__PURE__ */ (0, J.jsxs)("button", {
					type: "button",
					"aria-pressed": i === t,
					onClick: () => f(t),
					onPointerEnter: () => s(t),
					onPointerLeave: () => s(-1),
					onFocus: () => s(t),
					onBlur: () => s(-1),
					className: `flex min-w-0 cursor-pointer flex-col items-start gap-1 rounded-xl bg-background-tertiary-default p-2.5 text-left outline-none aria-pressed:ring-1 aria-pressed:ring-inset focus-visible:ring-2 focus-visible:ring-border-focus-ring ${gr[t % 6]}`,
					children: [
						/* @__PURE__ */ (0, J.jsxs)("span", {
							className: "flex min-w-0 max-w-full items-start gap-1.5 text-caption-1-regular text-text-secondary",
							children: [/* @__PURE__ */ (0, J.jsx)("i", {
								"aria-hidden": !0,
								className: `mt-0.5 size-3 shrink-0 rounded-sm ${hr[t % 6]}`
							}), /* @__PURE__ */ (0, J.jsxs)("span", {
								className: "inline-flex min-w-0 items-start gap-1.5 wrap-anywhere",
								children: [e.mark ? /* @__PURE__ */ (0, J.jsx)(g, { mark: e.mark }) : null, e.name]
							})]
						}),
						/* @__PURE__ */ (0, J.jsx)("b", {
							className: "text-title-2-medium tabular-nums text-text-primary",
							children: e.value.toLocaleString()
						}),
						e.bytes == null ? null : /* @__PURE__ */ (0, J.jsx)("small", {
							className: "text-caption-1-regular text-text-secondary",
							children: k(e.bytes)
						})
					]
				}, It(t)))
			})
		]
	});
}
// src/react/stats/stats-page.tsx
var vr = he("library"), yr = 10, br = ke[5], xr = ke[4], Sr = `${w()} flex flex-col gap-4`, X = (e) => j("manage:radialCard.videoUnit", { count: e }), Cr = (e) => j("manage:stats.viewingUnit", { count: e }), wr = j("manage:stats.noVideoHint"), Tr = j("manage:stats.noTagHint"), Er = j("manage:stats.noWatchHint"), Dr = j("manage:stats.noTagSourceHint"), Or = j("manage:stats.noVolumeHint"), kr = j("manage:stats.noLibraryHint"), Ar = j("manage:stats.noLengthHint"), jr = j("manage:stats.noQualityHint"), Mr = j("manage:stats.noPlayTimeHint"), Nr = j("manage:stats.noReplayHint"), Pr = (e, t) => Math.min(Math.max(e, 0), t);
function Z({ term: e, value: t }) {
	return /* @__PURE__ */ (0, J.jsxs)("div", {
		className: "flex min-h-16 min-w-0 flex-col gap-1.5 rounded-2lg bg-background-primary-default p-3",
		children: [/* @__PURE__ */ (0, J.jsx)("span", {
			className: "text-caption-1-regular text-text-secondary",
			children: e
		}), /* @__PURE__ */ (0, J.jsx)("b", {
			className: "text-title-3-medium tabular-nums text-text-primary",
			children: O(t)
		})]
	});
}
function Q({ term: e, value: t, total: n }) {
	let r = Math.max(n, 1);
	return /* @__PURE__ */ (0, J.jsxs)("div", {
		className: "flex flex-col gap-1.5 border-b border-separator-border py-3 last:border-b-0",
		children: [/* @__PURE__ */ (0, J.jsxs)("p", {
			className: "flex items-baseline justify-between gap-3 text-body-2-regular text-text-primary",
			children: [/* @__PURE__ */ (0, J.jsx)("span", { children: e }), /* @__PURE__ */ (0, J.jsxs)("b", {
				className: "tabular-nums",
				children: [O(t), te(t) ? /* @__PURE__ */ (0, J.jsx)("span", {
					className: "ml-1.5 text-caption-1-regular text-text-secondary",
					children: ie(t, n)
				}) : null]
			})]
		}), /* @__PURE__ */ (0, J.jsx)(u, {
			meter: !0,
			label: j("manage:shared.termProgress", {
				term: e,
				value: O(t),
				total: n.toLocaleString()
			}),
			value: te(t) ? Pr(t, r) : 0,
			max: r
		})]
	});
}
function Fr({ term: e, figure: t, unit: n }) {
	return /* @__PURE__ */ (0, J.jsxs)("div", {
		className: "flex shrink-0 flex-col gap-0.5 pb-5 md:w-64 md:pr-6 md:pb-0",
		children: [
			/* @__PURE__ */ (0, J.jsx)("span", {
				className: "text-caption-1-regular text-text-secondary",
				children: e
			}),
			/* @__PURE__ */ (0, J.jsx)("b", {
				className: "text-display-4-medium tabular-nums text-text-primary",
				children: t
			}),
			/* @__PURE__ */ (0, J.jsx)("span", {
				className: "text-body-2-regular text-text-secondary",
				children: n
			})
		]
	});
}
function Ir({ headline: e, children: t }) {
	return /* @__PURE__ */ (0, J.jsxs)("div", {
		className: `${Sr} md:flex-row md:gap-6`,
		children: [e, /* @__PURE__ */ (0, J.jsx)("div", {
			className: "min-w-0 grow",
			children: t
		})]
	});
}
function Lr({ data: e }) {
	return e.by_loc.reduce((e, t) => e + t.videos, 0) ? /* @__PURE__ */ (0, J.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, J.jsxs)("div", {
			className: "inline-grid w-full gap-5 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, J.jsx)(_r, {
				title: j("manage:stats.cloudAndLocal"),
				empty: wr,
				rows: e.by_loc.map((e) => ({
					name: o[e.k] ?? e.k,
					value: e.videos,
					bytes: e.bytes,
					mark: s[e.k] || "database"
				}))
			}), /* @__PURE__ */ (0, J.jsx)(_r, {
				title: j("manage:shared.library"),
				empty: kr,
				rows: e.by_library.map((e) => ({
					name: e.name,
					value: e.videos,
					bytes: e.bytes,
					mark: s[e.icon] || e.icon || "database"
				}))
			})]
		}), /* @__PURE__ */ (0, J.jsxs)("div", {
			className: "inline-grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, J.jsx)(M, {
					title: j("manage:shared.duration"),
					unit: X,
					series: j("manage:processingTraffic.sourceVideos"),
					color: br,
					rows: ne(e.by_length),
					empty: Ar
				}),
				/* @__PURE__ */ (0, J.jsx)(M, {
					title: j("manage:shared.quality"),
					unit: X,
					series: j("manage:processingTraffic.sourceVideos"),
					color: br,
					rows: C(e.by_quality),
					empty: jr
				}),
				/* @__PURE__ */ (0, J.jsx)(M, {
					title: j("manage:stats.fileTypes"),
					unit: (e) => j("manage:stats.itemsUnit", { count: e }),
					series: j("manage:stats.itemsSeries"),
					color: br,
					layout: "horizontal",
					rows: re(e.by_medium),
					empty: wr
				})
			]
		})]
	}) : /* @__PURE__ */ (0, J.jsx)(a, {
		icon: c,
		title: j("manage:stats.noVideosTitle"),
		actions: /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [/* @__PURE__ */ (0, J.jsx)(i, {
			variant: "secondary",
			href: "/subscriptions?tab=add",
			size: "small",
			children: j("manage:stats.newFollow")
		}), /* @__PURE__ */ (0, J.jsx)(i, {
			variant: "primary",
			href: vr,
			size: "small",
			children: j("manage:shared.addMedia")
		})] }),
		children: wr
	});
}
function Rr({ data: e }) {
	return /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [/* @__PURE__ */ (0, J.jsx)(xe, {
		activity: e.play_activity,
		title: j("manage:stats.playTimes"),
		dailyTitle: j("manage:stats.dailyPlays"),
		words: {
			unit: Cr,
			series: j("manage:shared.video"),
			cell: (e) => j("manage:stats.viewingCell", { count: e })
		},
		tone: 5,
		empty: Mr
	}), /* @__PURE__ */ (0, J.jsx)(M, {
		title: j("manage:stats.plays"),
		unit: Cr,
		series: j("manage:shared.video"),
		color: xr,
		rows: fe(e.replays),
		empty: Nr
	})] });
}
function zr({ attribution: e }) {
	let t = e.videos;
	return /* @__PURE__ */ (0, J.jsxs)("div", {
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, J.jsx)(Q, {
				term: j("manage:stats.hasCreator"),
				value: e.creator,
				total: t
			}),
			/* @__PURE__ */ (0, J.jsx)(Q, {
				term: j("manage:stats.hasCode"),
				value: e.code,
				total: t
			}),
			/* @__PURE__ */ (0, J.jsx)(Q, {
				term: j("manage:stats.hasLabel"),
				value: e.studio,
				total: t
			}),
			/* @__PURE__ */ (0, J.jsx)(Q, {
				term: j("manage:stats.framesExtracted"),
				value: e.thumb,
				total: t
			}),
			/* @__PURE__ */ (0, J.jsx)(Q, {
				term: j("manage:stats.durationProbed"),
				value: e.duration,
				total: t
			})
		]
	});
}
function Br({ volume: e }) {
	let t = e.total, n = e.used ?? 0, r = E(e, "label");
	return /* @__PURE__ */ (0, J.jsxs)("article", {
		className: "flex min-w-0 flex-col gap-1.5 border-b border-separator-border py-3 last:border-b-0",
		children: [
			/* @__PURE__ */ (0, J.jsxs)("header", {
				className: "flex items-baseline justify-between gap-3 text-body-2-regular text-text-primary",
				children: [/* @__PURE__ */ (0, J.jsx)("h3", {
					className: "min-w-0 break-words",
					children: r
				}), t == null ? e.online ? /* @__PURE__ */ (0, J.jsx)(v, { children: j("manage:stats.capacityNotFound") }) : /* @__PURE__ */ (0, J.jsx)(Kt, { online: !1 }) : /* @__PURE__ */ (0, J.jsxs)("b", {
					className: "whitespace-nowrap tabular-nums",
					children: [k(n), /* @__PURE__ */ (0, J.jsx)("span", {
						className: "ml-1.5 text-caption-1-regular text-text-secondary",
						children: ie(n, t)
					})]
				})]
			}),
			t == null ? null : /* @__PURE__ */ (0, J.jsx)(u, {
				meter: !0,
				label: j("manage:stats.volumeUsage", { volume: r }),
				value: Pr(n, Math.max(t, 1)),
				max: Math.max(t, 1)
			}),
			/* @__PURE__ */ (0, J.jsxs)("p", {
				className: "flex justify-between gap-3 text-caption-1-regular text-text-secondary",
				children: [/* @__PURE__ */ (0, J.jsx)("span", {
					className: "min-w-0 break-words",
					children: e.root ?? j("manage:stats.notMapped")
				}), t == null ? null : /* @__PURE__ */ (0, J.jsx)("span", {
					className: "whitespace-nowrap tabular-nums",
					children: j("manage:stats.volumeFreeTotal", {
						free: k(e.free ?? 0),
						total: k(t)
					})
				})]
			})
		]
	});
}
function Vr({ volumes: e }) {
	return e.length ? /* @__PURE__ */ (0, J.jsx)("div", {
		className: "flex flex-col",
		children: e.map((e) => /* @__PURE__ */ (0, J.jsx)(Br, { volume: e }, `${e.kind}:${e.label}`))
	}) : /* @__PURE__ */ (0, J.jsx)(a, {
		icon: y,
		title: j("manage:stats.noStorageTitle"),
		actions: /* @__PURE__ */ (0, J.jsx)(i, {
			variant: "primary",
			href: vr,
			size: "small",
			children: j("manage:shared.addMedia")
		}),
		children: Or
	});
}
function Hr({ tags: e, tagLabel: t, onTag: n, hasMedia: r }) {
	return e.length ? /* @__PURE__ */ (0, J.jsx)(Se, {
		previewCount: yr,
		className: "inline-grid w-full gap-x-6 gap-y-1 sm:grid-cols-2",
		children: e.map((e, r) => /* @__PURE__ */ (0, J.jsx)("li", {
			className: "min-w-0",
			children: /* @__PURE__ */ (0, J.jsxs)("button", {
				type: "button",
				onClick: () => n(e.k),
				className: "flex min-h-11 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
				children: [
					/* @__PURE__ */ (0, J.jsx)("span", {
						className: "w-6 shrink-0 text-caption-1-regular tabular-nums text-text-secondary",
						children: r + 1
					}),
					/* @__PURE__ */ (0, J.jsx)("span", {
						className: "min-w-0 grow text-body-2-regular break-words text-text-primary",
						children: t(e.k)
					}),
					/* @__PURE__ */ (0, J.jsx)("b", {
						className: "text-body-2-medium tabular-nums text-text-secondary",
						children: e.n.toLocaleString()
					})
				]
			})
		}, `${e.k}:${r}`))
	}) : /* @__PURE__ */ (0, J.jsx)(a, {
		icon: A,
		title: j("manage:stats.noContentTagsTitle"),
		actions: /* @__PURE__ */ (0, J.jsx)(i, {
			variant: "secondary",
			href: r ? "/data-cleanup" : "/settings/library",
			size: "small",
			children: j(r ? "manage:shared.fillInMetadata" : "manage:shared.addMedia")
		}),
		children: Tr
	});
}
function Ur({ rows: e, hasMedia: t }) {
	return e.length ? /* @__PURE__ */ (0, J.jsx)("div", {
		className: "flex flex-col gap-5",
		children: e.map((e) => {
			let t = be(e);
			return /* @__PURE__ */ (0, J.jsxs)("article", {
				className: "flex flex-wrap items-center gap-x-6 gap-y-2",
				children: [/* @__PURE__ */ (0, J.jsxs)("div", {
					className: "min-w-0 grow basis-64",
					children: [/* @__PURE__ */ (0, J.jsx)("h3", {
						className: "min-w-0 text-body-2-medium text-text-primary",
						children: /* @__PURE__ */ (0, J.jsx)("a", {
							href: oe(e),
							"data-middle-truncate": !0,
							className: "block max-w-full overflow-hidden whitespace-nowrap hover:underline",
							children: e.name
						})
					}), /* @__PURE__ */ (0, J.jsxs)("p", {
						className: "flex flex-wrap gap-3 text-caption-1-regular text-text-secondary",
						children: [e.creator ? /* @__PURE__ */ (0, J.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: e.creator
						}) : null, /* @__PURE__ */ (0, J.jsx)("span", { children: ye(e) })]
					})]
				}), /* @__PURE__ */ (0, J.jsxs)("div", {
					className: "min-w-0 basis-40",
					children: [/* @__PURE__ */ (0, J.jsx)(u, {
						meter: !0,
						label: j("manage:stats.watchedShare", { percent: t.toFixed(0) }),
						value: t
					}), /* @__PURE__ */ (0, J.jsx)("small", {
						className: "mt-1.5 block text-caption-1-regular text-text-secondary",
						children: j("manage:stats.watchedReached", {
							watched: t.toFixed(0),
							reached: de(e).toFixed(0)
						})
					})]
				})]
			}, `${e.kind}:${e.id}`);
		})
	}) : /* @__PURE__ */ (0, J.jsx)(a, {
		icon: _e,
		title: j("manage:stats.noWatchHistoryTitle"),
		actions: /* @__PURE__ */ (0, J.jsx)(i, {
			variant: "secondary",
			href: t ? "/" : "/settings/library",
			size: "small",
			children: j(t ? "manage:shared.browseCollection" : "manage:shared.addMedia")
		}),
		children: Er
	});
}
function Wr({ sources: e, videos: t }) {
	return e.length ? /* @__PURE__ */ (0, J.jsx)("div", {
		className: "inline-grid w-full gap-x-8 gap-y-6 sm:grid-cols-2",
		children: e.map((e) => /* @__PURE__ */ (0, J.jsxs)("article", {
			className: "flex min-w-0 flex-col gap-1.5",
			children: [
				/* @__PURE__ */ (0, J.jsxs)("header", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, J.jsx)("h3", {
						className: "min-w-0 text-body-2-medium break-words text-text-primary",
						children: e.k
					}), /* @__PURE__ */ (0, J.jsxs)("b", {
						className: "text-body-2-medium whitespace-nowrap text-text-primary",
						children: [e.assets.toLocaleString(), /* @__PURE__ */ (0, J.jsx)("small", {
							className: "ml-1 text-caption-1-regular font-normal text-text-secondary",
							children: X(e.assets)
						})]
					})]
				}),
				/* @__PURE__ */ (0, J.jsx)(u, {
					meter: !0,
					label: j("manage:stats.tagSourceCoverage", { source: e.k }),
					value: Pr(e.assets, Math.max(t, 1)),
					max: Math.max(t, 1)
				}),
				/* @__PURE__ */ (0, J.jsx)("small", {
					className: "text-caption-1-regular text-text-secondary",
					children: j("manage:stats.tagsCount", { count: e.n })
				})
			]
		}, e.k))
	}) : /* @__PURE__ */ (0, J.jsx)(a, {
		icon: A,
		title: j("manage:stats.noTagSourcesTitle"),
		actions: /* @__PURE__ */ (0, J.jsx)(i, {
			variant: "secondary",
			href: t ? "/data-cleanup" : "/settings/library",
			size: "small",
			children: j(t ? "manage:shared.fillInMetadata" : "manage:shared.addMedia")
		}),
		children: Dr
	});
}
function $({ id: e, label: n, figure: r, detail: i, icon: a, accent: o }) {
	return /* @__PURE__ */ (0, J.jsx)(t, {
		id: e,
		className: ge({
			interactive: !0,
			selectable: !0
		}),
		children: /* @__PURE__ */ (0, J.jsx)(_, {
			label: n,
			icon: a,
			accent: o,
			figure: r,
			footer: i
		})
	});
}
function Gr(i) {
	let a = ve({
		queryKey: p,
		queryFn: ({ signal: e }) => D(e)
	}), o = a.data;
	if (!o) return /* @__PURE__ */ (0, J.jsx)(qt, { children: /* @__PURE__ */ (0, J.jsx)(l, {
		tone: "error",
		title: j("manage:stats.loadFailedTitle"),
		children: a.error ? ee(a.error) : j("manage:stats.loadFailedHint")
	}) });
	let s = o.consumption, c = o.storage_summary, u = o.by_loc.reduce((e, t) => e + t.videos, 0), g = o.by_loc.reduce((e, t) => e + t.bytes, 0), _ = te(o.tag_cov) ? ie(o.tag_cov, o.attribution.videos) : j("manage:shared.notFound"), v = `${O(o.tag_cov)} / ${o.attribution.videos.toLocaleString()}`;
	return /* @__PURE__ */ (0, J.jsxs)(qt, { children: [/* @__PURE__ */ (0, J.jsxs)(n, {
		defaultSelectedKey: "inventory",
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, J.jsxs)(r, {
				"aria-label": j("manage:stats.viewsLabel"),
				className: m,
				children: [
					/* @__PURE__ */ (0, J.jsx)($, {
						id: "inventory",
						label: j("manage:statsSkeleton.collection"),
						icon: x,
						accent: 0,
						figure: u.toLocaleString(),
						detail: k(g)
					}),
					/* @__PURE__ */ (0, J.jsx)($, {
						id: "viewing",
						label: j("manage:shared.watched"),
						icon: b,
						accent: 1,
						figure: O(s.played),
						detail: ae(s.play_seconds)
					}),
					/* @__PURE__ */ (0, J.jsx)($, {
						id: "coverage",
						label: j("manage:statsSkeleton.contentTags"),
						icon: A,
						accent: 2,
						figure: _,
						detail: v
					}),
					/* @__PURE__ */ (0, J.jsx)($, {
						id: "storage",
						label: j("manage:statsSkeleton.spaceUsed"),
						icon: y,
						accent: 3,
						figure: j("manage:stats.volumeCount", { count: c.online }),
						detail: c.measured ? j("manage:stats.usedSize", { size: k(c.used) }) : j("manage:stats.capacityNotFound")
					})
				]
			}),
			/* @__PURE__ */ (0, J.jsx)(e, {
				id: "inventory",
				children: /* @__PURE__ */ (0, J.jsx)(Lr, {
					data: o,
					...i
				})
			}),
			/* @__PURE__ */ (0, J.jsxs)(e, {
				id: "viewing",
				className: "flex flex-col gap-5",
				children: [/* @__PURE__ */ (0, J.jsx)(Ir, {
					headline: /* @__PURE__ */ (0, J.jsx)(Fr, {
						term: j("manage:stats.watchedTerm"),
						figure: O(s.played),
						unit: j("manage:stats.videosWithPlays", { count: s.played ?? 0 })
					}),
					children: /* @__PURE__ */ (0, J.jsxs)("div", {
						className: "inline-grid w-full gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, J.jsx)(Z, {
								term: j("manage:stats.watchedInCollection"),
								value: s.library_played
							}),
							/* @__PURE__ */ (0, J.jsx)(Z, {
								term: j("manage:stats.watchedOnline"),
								value: s.online_played
							}),
							/* @__PURE__ */ (0, J.jsx)(Z, {
								term: j("manage:stats.climaxCount"),
								value: s.o_total
							}),
							/* @__PURE__ */ (0, J.jsx)(Z, {
								term: j("manage:stats.skimmed"),
								value: s.skimmed
							}),
							/* @__PURE__ */ (0, J.jsx)(Z, {
								term: j("manage:shared.like"),
								value: s.liked
							}),
							/* @__PURE__ */ (0, J.jsx)(Z, {
								term: j("manage:stats.disliked"),
								value: s.dislike
							}),
							/* @__PURE__ */ (0, J.jsx)(Z, {
								term: j("manage:stats.seenIt"),
								value: s.seen
							}),
							/* @__PURE__ */ (0, J.jsx)(Z, {
								term: j("manage:managePages.trash"),
								value: s.trash
							})
						]
					})
				}), /* @__PURE__ */ (0, J.jsx)(Rr, { data: o })]
			}),
			/* @__PURE__ */ (0, J.jsx)(e, {
				id: "coverage",
				children: /* @__PURE__ */ (0, J.jsx)(Ir, {
					headline: /* @__PURE__ */ (0, J.jsx)(Fr, {
						term: j("manage:stats.contentTagCoverage"),
						figure: _,
						unit: v
					}),
					children: /* @__PURE__ */ (0, J.jsx)(zr, { attribution: o.attribution })
				})
			}),
			/* @__PURE__ */ (0, J.jsx)(e, {
				id: "storage",
				children: /* @__PURE__ */ (0, J.jsx)(Ir, {
					headline: /* @__PURE__ */ (0, J.jsx)(Fr, {
						term: j("manage:statsSkeleton.spaceUsed"),
						figure: c.measured.toLocaleString(),
						unit: j("manage:stats.volumesMeasured", { count: c.measured })
					}),
					children: /* @__PURE__ */ (0, J.jsx)(Vr, {
						volumes: o.storage_volumes,
						...i
					})
				})
			})
		]
	}), /* @__PURE__ */ (0, J.jsxs)(n, {
		defaultSelectedKey: "tags",
		className: `${w({ padding: "none" })} flex flex-col`,
		children: [
			/* @__PURE__ */ (0, J.jsx)("div", {
				className: "px-4 pt-3",
				children: /* @__PURE__ */ (0, J.jsxs)(h, {
					"aria-label": j("manage:stats.breakdownsLabel"),
					className: f,
					children: [
						/* @__PURE__ */ (0, J.jsx)(t, {
							id: "tags",
							className: d,
							children: j("manage:statsSkeleton.contentTags")
						}),
						/* @__PURE__ */ (0, J.jsx)(t, {
							id: "recent",
							className: d,
							children: j("manage:stats.recentlyWatched")
						}),
						/* @__PURE__ */ (0, J.jsx)(t, {
							id: "sources",
							className: d,
							children: j("manage:stats.tagSources")
						})
					]
				})
			}),
			/* @__PURE__ */ (0, J.jsx)(e, {
				id: "tags",
				className: "px-4 pt-3.5 pb-4",
				children: /* @__PURE__ */ (0, J.jsx)(Hr, {
					tags: o.top_tags,
					hasMedia: u > 0,
					...i
				})
			}),
			/* @__PURE__ */ (0, J.jsx)(e, {
				id: "recent",
				className: "px-4 pt-3.5 pb-4",
				children: /* @__PURE__ */ (0, J.jsx)(Ur, {
					rows: o.recent,
					hasMedia: u > 0
				})
			}),
			/* @__PURE__ */ (0, J.jsx)(e, {
				id: "sources",
				className: "px-4 pt-3.5 pb-4",
				children: /* @__PURE__ */ (0, J.jsx)(Wr, {
					sources: o.tag_source,
					videos: o.attribution.videos
				})
			})
		]
	})] });
}
export { Gr as StatsPage };

//# debugId=e160c57d-c131-40a8-9ff4-b855184abf6b