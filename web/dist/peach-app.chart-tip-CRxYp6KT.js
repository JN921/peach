(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "783ef6e2-3b75-466e-babe-8a5bc820bee3", e._sentryDebugIdIdentifier = "sentry-dbid-783ef6e2-3b75-466e-babe-8a5bc820bee3");
	} catch {}
})();
import { MotionConfigContext as e, WithPromise as t, __commonJSMin as n, __exportAll as r, __toESM as i, asNumber as a, calcGeneratorVelocity as o, cancelFrame as s, cardClass as c, clsx as l, collectMotionValues as u, cx as d, frame as f, interpolate as p, isMotionValue as m, max as h, min as g, motion as _, motionValue as v, require_jsx_runtime as y, require_react as b, require_react_dom as x, require_with_selector as S, resolveStartTime as C, spring as w, time as T, useConstant as E, useIsomorphicLayoutEffect as D, useReducedMotion as O } from "./peach-app.js";
// node_modules/motion-dom/dist/es/utils/transform.mjs
function k(...e) {
	let t = !Array.isArray(e[0]), n = t ? 0 : -1, r = e[0 + n], i = e[1 + n], a = e[2 + n], o = e[3 + n], s = p(i, a, o);
	return t ? s(r) : s;
}
// node_modules/motion-dom/dist/es/animation/FollowAnimation.mjs
var A = /* @__PURE__ */ new Set(), j = ({ timestamp: e }) => {
	A.forEach((t) => t.tick(e));
}, M = class extends t {
	constructor(e) {
		super(), this.state = "idle", this.startTime = 0, this.currentTime = 0, this.started = !1, this.hasNextTarget = !1, this.nextTarget = 0, this.stop = () => {
			this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.factory = e.type, this.generator = this.factory(e);
		let { driver: t } = e;
		t && (this.driver = t((e) => this.tick(e))), this.startTime = this.now(), this.state = "running", this.driver ? this.driver.start() : (A.size || f.update(j, !0), A.add(this));
	}
	setTarget(e, t) {
		this.nextTarget = e, this.nextVelocity = t, this.hasNextTarget = !0;
	}
	retarget(e, t) {
		let { options: n, generator: r } = this;
		n.keyframes = e, n.velocity = t, this.startTime = this.now(), this.currentTime = 0, r.retarget ? r.retarget(e, t) : this.generator = this.factory(n);
	}
	tick(e) {
		let { options: t, hasNextTarget: n } = this, { delay: r = 0, onUpdate: i, onPlay: a } = t;
		this.started || (this.startTime = C(this.startTime, e));
		let o = Math.round(e - this.startTime) - r, s = this.currentTime = Math.max(0, o), c = this.generator.next(s), l = o < 0 ? t.keyframes[0] : c.value;
		if (n) {
			this.hasNextTarget = !1;
			let { keyframes: e } = t;
			e[0] = l, e[1] = this.nextTarget, this.retarget(e, this.nextVelocity ?? this.getGeneratorVelocity());
		}
		(n || !this.started) && (this.started = !0, a?.()), this.state === "running" && (i?.(l), c.done && o >= 0 && !n && !this.hasNextTarget && this.state === "running" && (this.notifyFinished(), this.teardown(), this.state = "finished", t.onComplete?.()));
	}
	getGeneratorVelocity() {
		return o(this.generator, this.currentTime, this.options.velocity);
	}
	now() {
		return this.driver ? this.driver.now() : T.now();
	}
	teardown() {
		this.state = "idle", this.driver ? this.driver.stop() : (A.delete(this), A.size || s(j));
	}
};
// node_modules/motion-dom/dist/es/value/utils/follow.mjs
function N(e, t, n) {
	let r = e.get(), i = null, o, s = typeof r == "string" ? r.replace(/[\d.-]/g, "") : void 0, c = (e) => o(s ? e + s : e), l = () => e.events.animationStart?.notify(), u = () => {
		i &&= (i.stop(), null), e.animation = void 0;
	};
	if (e.attach((t, r) => {
		o = r;
		let s = a(t);
		if (i?.state === "running") {
			i.setTarget(s, n.velocity);
			return;
		}
		let d = a(e.get()), f = i ? i.getGeneratorVelocity() : e.getVelocity();
		if (u(), d === s) return;
		let p = i = new M({
			keyframes: [d, s],
			velocity: f,
			restDelta: .001,
			restSpeed: .01,
			...n,
			onUpdate: c,
			onPlay: l
		});
		e.animation = p, p.then(() => {
			i === p && (i = null, e.animation = void 0, e.events.animationComplete?.notify());
		});
	}, u), m(t)) {
		let r = n.skipInitialAnimation === !0, i = (t) => {
			r ? (r = !1, e.jump(ee(t, s), !1)) : e.set(ee(t, s));
		}, o = t.on("change", i), c = t.get();
		a(c) - a(e.get()) && i(c);
		let l = e.on("destroy", o);
		return () => {
			o(), l(), u();
		};
	}
	return u;
}
function ee(e, t) {
	return t ? e + t : e;
}
// node_modules/motion-dom/dist/es/value/spring-value.mjs
function te(e, t, n) {
	return N(e, t, {
		...n,
		type: w
	});
}
// node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs
var P = /* @__PURE__ */ i(b(), 1);
function ne(e, t, n) {
	(0, P.useInsertionEffect)(() => e.on(t, n), [
		e,
		t,
		n
	]);
}
// node_modules/framer-motion/dist/es/value/use-motion-value.mjs
function re(t) {
	let n = E(() => v(t)), { isStatic: r } = (0, P.useContext)(e);
	if (r) {
		let [, e] = (0, P.useState)(t);
		(0, P.useEffect)(() => n.on("change", e), []);
	}
	return n;
}
// node_modules/framer-motion/dist/es/value/use-combine-values.mjs
function ie(e, t) {
	let n = re(t()), r = () => n.set(t());
	return r(), D(() => {
		let t = () => f.preRender(r, !1, !0), n = e.map((e) => e.on("change", t));
		return r(), () => {
			n.forEach((e) => e()), s(r);
		};
	}), n;
}
// node_modules/framer-motion/dist/es/value/use-computed.mjs
function ae(e) {
	u.current = [], e();
	let t = ie(u.current, e);
	return u.current = void 0, t;
}
// node_modules/framer-motion/dist/es/value/use-follow-value.mjs
function oe(t, n, r) {
	let { isStatic: i } = (0, P.useContext)(e), a = () => m(t) ? t.get() : t;
	if (i) return ae(a);
	let o = re(a());
	return (0, P.useInsertionEffect)(() => r(o, t, n), [o, JSON.stringify(n)]), o;
}
// node_modules/framer-motion/dist/es/value/use-spring.mjs
function se(e, t = {}) {
	return oe(e, t, te);
}
// node_modules/framer-motion/dist/es/value/use-transform.mjs
function ce(e, t, n, r) {
	if (typeof e == "function") return ae(e);
	if (n !== void 0 && !Array.isArray(n) && typeof t != "function") return ue(e, t, n, r);
	let i = typeof t == "function" ? t : k(t, n, r), a = Array.isArray(e) ? le(e, i) : le([e], ([e]) => i(e)), o = Array.isArray(e) ? void 0 : e.accelerate;
	if (o && !o.isTransformed && typeof t != "function" && Array.isArray(n) && r?.clamp !== !1 && !r?.mixer) {
		let e = r?.ease;
		a.accelerate = {
			...o,
			times: [
				0,
				...t,
				1
			],
			keyframes: [
				n[0],
				...n,
				n[n.length - 1]
			],
			isTransformed: !0,
			...e ? { ease: Array.isArray(e) ? [e[0], ...e] : e } : {}
		};
	}
	return a;
}
function le(e, t) {
	let n = E(() => []);
	return ie(e, () => {
		n.length = 0;
		let r = e.length;
		for (let t = 0; t < r; t++) n[t] = e[t].get();
		return t(n);
	});
}
function ue(e, t, n, r) {
	let i = E(() => Object.keys(n)), a = E(() => ({}));
	for (let o of i) a[o] = ce(e, t, n[o], r);
	return a;
}
// node_modules/d3-array/src/ascending.js
function de(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
// node_modules/d3-array/src/bisector.js
function fe(e) {
	let t = e, n = e;
	e.length === 1 && (t = (t, n) => e(t) - n, n = pe(e));
	function r(e, t, r, i) {
		for (r ??= 0, i ??= e.length; r < i;) {
			let a = r + i >>> 1;
			n(e[a], t) < 0 ? r = a + 1 : i = a;
		}
		return r;
	}
	function i(e, t, r, i) {
		for (r ??= 0, i ??= e.length; r < i;) {
			let a = r + i >>> 1;
			n(e[a], t) > 0 ? i = a : r = a + 1;
		}
		return r;
	}
	function a(e, n, i, a) {
		i ??= 0, a ??= e.length;
		let o = r(e, n, i, a - 1);
		return o > i && t(e[o - 1], n) > -t(e[o], n) ? o - 1 : o;
	}
	return {
		left: r,
		center: a,
		right: i
	};
}
function pe(e) {
	return (t, n) => de(e(t), n);
}
// node_modules/d3-array/src/number.js
function me(e) {
	return e === null ? NaN : +e;
}
function* he(e, t) {
	if (t === void 0) for (let t of e) t != null && (t = +t) >= t && (yield t);
	else {
		let n = -1;
		for (let r of e) (r = t(r, ++n, e)) != null && (r = +r) >= r && (yield r);
	}
}
// node_modules/d3-array/src/bisect.js
var ge = fe(de), _e = ge.right;
ge.left, fe(me).center;
// node_modules/internmap/src/index.js
var ve = class extends Map {
	constructor(e, t = Se) {
		if (super(), Object.defineProperties(this, {
			_intern: { value: /* @__PURE__ */ new Map() },
			_key: { value: t }
		}), e != null) for (let [t, n] of e) this.set(t, n);
	}
	get(e) {
		return super.get(ye(this, e));
	}
	has(e) {
		return super.has(ye(this, e));
	}
	set(e, t) {
		return super.set(be(this, e), t);
	}
	delete(e) {
		return super.delete(xe(this, e));
	}
};
function ye({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) ? e.get(r) : n;
}
function be({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) ? e.get(r) : (e.set(r, n), n);
}
function xe({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) && (n = e.get(n), e.delete(r)), n;
}
function Se(e) {
	return typeof e == "object" && e ? e.valueOf() : e;
}
// node_modules/d3-array/src/ticks.js
var Ce = Math.sqrt(50), we = Math.sqrt(10), Te = Math.sqrt(2);
function Ee(e, t, n) {
	var r, i = -1, a, o, s;
	if (t = +t, e = +e, n = +n, e === t && n > 0) return [e];
	if ((r = t < e) && (a = e, e = t, t = a), (s = De(e, t, n)) === 0 || !isFinite(s)) return [];
	if (s > 0) {
		let n = Math.round(e / s), r = Math.round(t / s);
		for (n * s < e && ++n, r * s > t && --r, o = Array(a = r - n + 1); ++i < a;) o[i] = (n + i) * s;
	} else {
		s = -s;
		let n = Math.round(e * s), r = Math.round(t * s);
		for (n / s < e && ++n, r / s > t && --r, o = Array(a = r - n + 1); ++i < a;) o[i] = (n + i) / s;
	}
	return r && o.reverse(), o;
}
function De(e, t, n) {
	var r = (t - e) / Math.max(0, n), i = Math.floor(Math.log(r) / Math.LN10), a = r / 10 ** i;
	return i >= 0 ? (a >= Ce ? 10 : a >= we ? 5 : a >= Te ? 2 : 1) * 10 ** i : -(10 ** -i) / (a >= Ce ? 10 : a >= we ? 5 : a >= Te ? 2 : 1);
}
function Oe(e, t, n) {
	var r = Math.abs(t - e) / Math.max(0, n), i = 10 ** Math.floor(Math.log(r) / Math.LN10), a = r / i;
	return a >= Ce ? i *= 10 : a >= we ? i *= 5 : a >= Te && (i *= 2), t < e ? -i : i;
}
// node_modules/d3-array/src/quickselect.js
function ke(e, t, n = 0, r = e.length - 1, i = de) {
	for (; r > n;) {
		if (r - n > 600) {
			let a = r - n + 1, o = t - n + 1, s = Math.log(a), c = .5 * Math.exp(2 * s / 3), l = .5 * Math.sqrt(s * c * (a - c) / a) * (o - a / 2 < 0 ? -1 : 1);
			ke(e, t, Math.max(n, Math.floor(t - o * c / a + l)), Math.min(r, Math.floor(t + (a - o) * c / a + l)), i);
		}
		let a = e[t], o = n, s = r;
		for (Ae(e, n, t), i(e[r], a) > 0 && Ae(e, n, r); o < s;) {
			for (Ae(e, o, s), ++o, --s; i(e[o], a) < 0;) ++o;
			for (; i(e[s], a) > 0;) --s;
		}
		i(e[n], a) === 0 ? Ae(e, n, s) : (++s, Ae(e, s, r)), s <= t && (n = s + 1), t <= s && (r = s - 1);
	}
	return e;
}
function Ae(e, t, n) {
	let r = e[t];
	e[t] = e[n], e[n] = r;
}
// node_modules/d3-array/src/quantile.js
function je(e, t, n) {
	if (e = Float64Array.from(he(e, n)), r = e.length) {
		if ((t = +t) <= 0 || r < 2) return g(e);
		if (t >= 1) return h(e);
		var r, i = (r - 1) * t, a = Math.floor(i), o = h(ke(e, a).subarray(0, a + 1));
		return o + (g(e.subarray(a + 1)) - o) * (i - a);
	}
}
function Me(e, t, n = me) {
	if (r = e.length) {
		if ((t = +t) <= 0 || r < 2) return +n(e[0], 0, e);
		if (t >= 1) return +n(e[r - 1], r - 1, e);
		var r, i = (r - 1) * t, a = Math.floor(i), o = +n(e[a], a, e);
		return o + (+n(e[a + 1], a + 1, e) - o) * (i - a);
	}
}
// node_modules/d3-array/src/range.js
function Ne(e, t, n) {
	e = +e, t = +t, n = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +n;
	for (var r = -1, i = Math.max(0, Math.ceil((t - e) / n)) | 0, a = Array(i); ++r < i;) a[r] = e + r * n;
	return a;
}
// node_modules/recharts/es6/util/excludeEventProps.js
var Pe = /* @__PURE__ */ i(x()), Fe = /* @__PURE__ */ "dangerouslySetInnerHTML.onCopy.onCopyCapture.onCut.onCutCapture.onPaste.onPasteCapture.onCompositionEnd.onCompositionEndCapture.onCompositionStart.onCompositionStartCapture.onCompositionUpdate.onCompositionUpdateCapture.onFocus.onFocusCapture.onBlur.onBlurCapture.onChange.onChangeCapture.onBeforeInput.onBeforeInputCapture.onInput.onInputCapture.onReset.onResetCapture.onSubmit.onSubmitCapture.onInvalid.onInvalidCapture.onLoad.onLoadCapture.onError.onErrorCapture.onKeyDown.onKeyDownCapture.onKeyPress.onKeyPressCapture.onKeyUp.onKeyUpCapture.onAbort.onAbortCapture.onCanPlay.onCanPlayCapture.onCanPlayThrough.onCanPlayThroughCapture.onDurationChange.onDurationChangeCapture.onEmptied.onEmptiedCapture.onEncrypted.onEncryptedCapture.onEnded.onEndedCapture.onLoadedData.onLoadedDataCapture.onLoadedMetadata.onLoadedMetadataCapture.onLoadStart.onLoadStartCapture.onPause.onPauseCapture.onPlay.onPlayCapture.onPlaying.onPlayingCapture.onProgress.onProgressCapture.onRateChange.onRateChangeCapture.onSeeked.onSeekedCapture.onSeeking.onSeekingCapture.onStalled.onStalledCapture.onSuspend.onSuspendCapture.onTimeUpdate.onTimeUpdateCapture.onVolumeChange.onVolumeChangeCapture.onWaiting.onWaitingCapture.onAuxClick.onAuxClickCapture.onClick.onClickCapture.onContextMenu.onContextMenuCapture.onDoubleClick.onDoubleClickCapture.onDrag.onDragCapture.onDragEnd.onDragEndCapture.onDragEnter.onDragEnterCapture.onDragExit.onDragExitCapture.onDragLeave.onDragLeaveCapture.onDragOver.onDragOverCapture.onDragStart.onDragStartCapture.onDrop.onDropCapture.onMouseDown.onMouseDownCapture.onMouseEnter.onMouseLeave.onMouseMove.onMouseMoveCapture.onMouseOut.onMouseOutCapture.onMouseOver.onMouseOverCapture.onMouseUp.onMouseUpCapture.onSelect.onSelectCapture.onTouchCancel.onTouchCancelCapture.onTouchEnd.onTouchEndCapture.onTouchMove.onTouchMoveCapture.onTouchStart.onTouchStartCapture.onPointerDown.onPointerDownCapture.onPointerMove.onPointerMoveCapture.onPointerUp.onPointerUpCapture.onPointerCancel.onPointerCancelCapture.onPointerEnter.onPointerEnterCapture.onPointerLeave.onPointerLeaveCapture.onPointerOver.onPointerOverCapture.onPointerOut.onPointerOutCapture.onGotPointerCapture.onGotPointerCaptureCapture.onLostPointerCapture.onLostPointerCaptureCapture.onScroll.onScrollCapture.onWheel.onWheelCapture.onAnimationStart.onAnimationStartCapture.onAnimationEnd.onAnimationEndCapture.onAnimationIteration.onAnimationIterationCapture.onTransitionEnd.onTransitionEndCapture".split(".");
function Ie(e) {
	return typeof e == "string" && Fe.includes(e);
}
// node_modules/recharts/es6/util/svgPropertiesNoEvents.js
var Le = /* @__PURE__ */ new Set(/* @__PURE__ */ "aria-activedescendant.aria-atomic.aria-autocomplete.aria-busy.aria-checked.aria-colcount.aria-colindex.aria-colspan.aria-controls.aria-current.aria-describedby.aria-details.aria-disabled.aria-errormessage.aria-expanded.aria-flowto.aria-haspopup.aria-hidden.aria-invalid.aria-keyshortcuts.aria-label.aria-labelledby.aria-level.aria-live.aria-modal.aria-multiline.aria-multiselectable.aria-orientation.aria-owns.aria-placeholder.aria-posinset.aria-pressed.aria-readonly.aria-relevant.aria-required.aria-roledescription.aria-rowcount.aria-rowindex.aria-rowspan.aria-selected.aria-setsize.aria-sort.aria-valuemax.aria-valuemin.aria-valuenow.aria-valuetext.className.color.height.id.lang.max.media.method.min.name.style.target.width.role.tabIndex.accentHeight.accumulate.additive.alignmentBaseline.allowReorder.alphabetic.amplitude.arabicForm.ascent.attributeName.attributeType.autoReverse.azimuth.baseFrequency.baselineShift.baseProfile.bbox.begin.bias.by.calcMode.capHeight.clip.clipPath.clipPathUnits.clipRule.colorInterpolation.colorInterpolationFilters.colorProfile.colorRendering.contentScriptType.contentStyleType.cursor.cx.cy.d.decelerate.descent.diffuseConstant.direction.display.divisor.dominantBaseline.dur.dx.dy.edgeMode.elevation.enableBackground.end.exponent.externalResourcesRequired.fill.fillOpacity.fillRule.filter.filterRes.filterUnits.floodColor.floodOpacity.focusable.fontFamily.fontSize.fontSizeAdjust.fontStretch.fontStyle.fontVariant.fontWeight.format.from.fx.fy.g1.g2.glyphName.glyphOrientationHorizontal.glyphOrientationVertical.glyphRef.gradientTransform.gradientUnits.hanging.horizAdvX.horizOriginX.href.ideographic.imageRendering.in2.in.intercept.k1.k2.k3.k4.k.kernelMatrix.kernelUnitLength.kerning.keyPoints.keySplines.keyTimes.lengthAdjust.letterSpacing.lightingColor.limitingConeAngle.local.markerEnd.markerHeight.markerMid.markerStart.markerUnits.markerWidth.mask.maskContentUnits.maskUnits.mathematical.mode.numOctaves.offset.opacity.operator.order.orient.orientation.origin.overflow.overlinePosition.overlineThickness.paintOrder.panose1.pathLength.patternContentUnits.patternTransform.patternUnits.pointerEvents.pointsAtX.pointsAtY.pointsAtZ.preserveAlpha.preserveAspectRatio.primitiveUnits.r.radius.refX.refY.renderingIntent.repeatCount.repeatDur.requiredExtensions.requiredFeatures.restart.result.rotate.rx.ry.seed.shapeRendering.slope.spacing.specularConstant.specularExponent.speed.spreadMethod.startOffset.stdDeviation.stemh.stemv.stitchTiles.stopColor.stopOpacity.strikethroughPosition.strikethroughThickness.string.stroke.strokeDasharray.strokeDashoffset.strokeLinecap.strokeLinejoin.strokeMiterlimit.strokeOpacity.strokeWidth.surfaceScale.systemLanguage.tableValues.targetX.targetY.textAnchor.textDecoration.textLength.textRendering.to.transform.u1.u2.underlinePosition.underlineThickness.unicode.unicodeBidi.unicodeRange.unitsPerEm.vAlphabetic.values.vectorEffect.version.vertAdvY.vertOriginX.vertOriginY.vHanging.vIdeographic.viewTarget.visibility.vMathematical.widths.wordSpacing.writingMode.x1.x2.x.xChannelSelector.xHeight.xlinkActuate.xlinkArcrole.xlinkHref.xlinkRole.xlinkShow.xlinkTitle.xlinkType.xmlBase.xmlLang.xmlns.xmlnsXlink.xmlSpace.y1.y2.y.yChannelSelector.z.zoomAndPan.ref.key.angle".split("."));
function Re(e) {
	return typeof e == "string" && Le.has(e);
}
function ze(e) {
	return typeof e == "string" && e.startsWith("data-");
}
function Be(e) {
	if (typeof e != "object" || !e) return {};
	var t = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (Re(n) || ze(n)) && (t[n] = e[n]);
	return t;
}
function Ve(e) {
	if (e == null) return null;
	if (/*#__PURE__*/ (0, P.isValidElement)(e) && typeof e.props == "object" && e.props !== null) {
		var t = e.props;
		return Be(t);
	}
	return typeof e == "object" && !Array.isArray(e) ? Be(e) : null;
}
// node_modules/recharts/es6/util/svgPropertiesAndEvents.js
function He(e) {
	var t = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (Re(n) || ze(n) || Ie(n)) && (t[n] = e[n]);
	return t;
}
function Ue(e) {
	return e == null ? null : /*#__PURE__*/ (0, P.isValidElement)(e) ? He(e.props) : typeof e == "object" && !Array.isArray(e) ? He(e) : null;
}
// node_modules/recharts/es6/container/Surface.js
var We = [
	"children",
	"width",
	"height",
	"viewBox",
	"className",
	"style",
	"title",
	"desc"
];
function Ge() {
	return Ge = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Ge.apply(null, arguments);
}
function Ke(e, t) {
	if (e == null) return {};
	var n, r, i = qe(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function qe(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Je = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.children, r = e.width, i = e.height, a = e.viewBox, o = e.className, s = e.style, c = e.title, u = e.desc, d = Ke(e, We), f = a || {
		width: r,
		height: i,
		x: 0,
		y: 0
	}, p = l("recharts-surface", o);
	return /*#__PURE__*/ P.createElement("svg", Ge({}, He(d), {
		className: p,
		width: r,
		height: i,
		style: s,
		viewBox: `${f.x} ${f.y} ${f.width} ${f.height}`,
		ref: t
	}), /*#__PURE__*/ P.createElement("title", null, c), /*#__PURE__*/ P.createElement("desc", null, u), n);
}), Ye = S(), Xe = ["children", "className"];
function Ze() {
	return Ze = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Ze.apply(null, arguments);
}
function Qe(e, t) {
	if (e == null) return {};
	var n, r, i = $e(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function $e(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var et = /*#__PURE__*/ P.forwardRef((e, t) => {
	var n = e.children, r = e.className, i = Qe(e, Xe), a = l("recharts-layer", r);
	return /*#__PURE__*/ P.createElement("g", Ze({ className: a }, He(i), { ref: t }), n);
});
// node_modules/es-toolkit/dist/_internal/isUnsafeProperty.mjs
function tt(e) {
	return e === "__proto__";
}
// node_modules/es-toolkit/dist/compat/_internal/isDeepKey.mjs
var nt = /\.|(\[(?:[^[\]]*|(["'])(?:(?!\2)[^\\]|\\.)*?\2)\])/;
function rt(e) {
	switch (typeof e) {
		case "number":
		case "symbol": return !1;
		case "string": return e === "" || e.startsWith(".") || e.endsWith(".") ? !1 : nt.test(e);
		default: return !1;
	}
}
// node_modules/es-toolkit/dist/compat/_internal/toKey.mjs
function it(e) {
	return typeof e == "string" || typeof e == "symbol" ? e : Object.is(e?.valueOf?.(), -0) ? "-0" : String(e);
}
// node_modules/es-toolkit/dist/compat/predicate/isSymbol.mjs
function at(e) {
	return typeof e == "symbol" || e instanceof Symbol;
}
// node_modules/es-toolkit/dist/compat/util/toString.mjs
function ot(e) {
	return e == null ? "" : st(e);
}
function st(e) {
	if (typeof e == "string") return e;
	if (Array.isArray(e)) return e.map(st).join(",");
	if (at(e)) return e.toString();
	let t = e + "";
	return t === "0" && Object.is(Number(e), -0) ? "-0" : t;
}
// node_modules/es-toolkit/dist/compat/util/toPath.mjs
function ct(e) {
	if (Array.isArray(e)) return e.map(it);
	if (typeof e == "symbol") return [e];
	e = ot(e);
	let t = [], n = e.length;
	if (n === 0) return t;
	let r = 0, i = "", a = "", o = !1, s = !1, c = /^-?\d+(?:\.\d+)?$/;
	for (e.charCodeAt(0) === 46 && t.push(""); r < n;) {
		let l = e[r];
		if (a) l === "\\" && r + 1 < n ? (r++, i += e[r]) : l === a ? a = "" : i += l;
		else if (o) {
			if (l === "\"" || l === "'") a = l, s = !0;
			else if (l === "]") {
				if (o = !1, !s && i.includes(".") && !c.test(i)) {
					let e = i.split(".");
					for (let n = 0; n < e.length; n++) e[n] !== "" && t.push(e[n]);
				} else t.push(i);
				i = "";
			} else i += l;
		} else if (l === "[") o = !0, s = !1, i &&= (t.push(i), "");
		else if (l === ".") {
			i &&= (t.push(i), "");
			let n = e[r + 1];
			(n === void 0 || n === ".") && t.push("");
		} else i += l;
		r++;
	}
	return i && t.push(i), t;
}
// node_modules/es-toolkit/dist/compat/object/get.mjs
function lt(e, t, n) {
	if (e == null) return n;
	switch (typeof t) {
		case "string": {
			if (tt(t)) return n;
			let r = e[t];
			return r === void 0 ? rt(t) && !Object.hasOwn(e, t) ? lt(e, ct(t), n) : n : r;
		}
		case "number":
		case "symbol": {
			typeof t == "number" && (t = it(t));
			let r = e[t];
			return r === void 0 ? n : r;
		}
		default: {
			if (Array.isArray(t)) return ut(e, t, n);
			if (t = Object.is(t?.valueOf(), -0) ? "-0" : String(t), tt(t)) return n;
			let r = e[t];
			return r === void 0 ? n : r;
		}
	}
}
function ut(e, t, n) {
	if (t.length === 0) return n;
	let r = e;
	for (let e = 0; e < t.length; e++) {
		if (r == null || tt(t[e])) return n;
		r = r[t[e]];
	}
	return r === void 0 ? n : r;
}
// node_modules/recharts/es6/util/round.js
var dt = 4;
function ft(e) {
	var t = 10 ** (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : dt), n = Math.round(e * t) / t;
	return Object.is(n, -0) ? 0 : n;
}
function pt(e) {
	var t = [...arguments].slice(1);
	return e.reduce((e, n, r) => {
		var i = t[r - 1];
		return typeof i == "string" ? e + i + n : i === void 0 ? e + n : e + ft(i) + n;
	}, "");
}
// node_modules/recharts/es6/util/DataUtils.js
var mt = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, ht = (e) => typeof e == "number" && e != +e, gt = (e) => typeof e == "string" && e.length > 1 && e.indexOf("%") === e.length - 1, F = (e) => (typeof e == "number" || e instanceof Number) && !ht(e), _t = (e) => F(e) || typeof e == "string", vt = 0, yt = (e) => {
	var t = ++vt;
	return `${e || ""}${t}`;
}, bt = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, r = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
	if (!F(e) && typeof e != "string") return n;
	var i;
	if (gt(e)) {
		if (t == null) return n;
		var a = e.indexOf("%");
		i = t * parseFloat(e.slice(0, a)) / 100;
	} else i = +e;
	return ht(i) && (i = n), r && t != null && i > t && (i = t), i;
}, xt = (e) => {
	if (!Array.isArray(e)) return !1;
	for (var t = e.length, n = {}, r = 0; r < t; r++) if (!n[String(e[r])]) n[String(e[r])] = !0;
	else return !0;
	return !1;
};
function I(e, t, n) {
	return F(e) && F(t) ? ft(e + n * (t - e)) : t;
}
function St(e, t, n) {
	if (e && e.length) return e.find((e) => e && (typeof t == "function" ? t(e) : lt(e, t)) === n);
}
var L = (e) => e == null, Ct = (e) => L(e) ? e : `${e.charAt(0).toUpperCase()}${e.slice(1)}`;
function wt(e) {
	return e != null;
}
function Tt() {}
// node_modules/recharts/es6/cartesian/cartesianViewBoxToTrapezoid.js
function Et(e) {
	if (e) return {
		x: e.x,
		y: e.y,
		upperWidth: "upperWidth" in e ? e.upperWidth : e.width,
		lowerWidth: "lowerWidth" in e ? e.lowerWidth : e.width,
		width: e.width,
		height: e.height
	};
}
// node_modules/recharts/es6/cartesian/getCartesianPosition.js
function Dt(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ot(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Dt(Object(n), !0).forEach(function(t) {
			kt(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Dt(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function kt(e, t, n) {
	return (t = At(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function At(e) {
	var t = jt(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function jt(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Mt = (e) => {
	var t = e.viewBox, n = e.position, r = e.offset, i = r === void 0 ? 0 : r, a = e.parentViewBox, o = e.clamp, s = Et(t), c = s.x, l = s.y, u = s.height, d = s.upperWidth, f = s.lowerWidth, p = c, m = c + (d - f) / 2, h = (p + m) / 2, g = (d + f) / 2, _ = p + d / 2, v = u >= 0 ? 1 : -1, y = v * i, b = v > 0 ? "end" : "start", x = v > 0 ? "start" : "end", S = d >= 0 ? 1 : -1, C = S * i, w = S > 0 ? "end" : "start", T = S > 0 ? "start" : "end", E = a;
	if (n === "top") {
		var D = {
			x: p + d / 2,
			y: l - y,
			horizontalAnchor: "middle",
			verticalAnchor: b
		};
		return o && E && (D.height = Math.max(l - E.y, 0), D.width = d), D;
	}
	if (n === "bottom") {
		var O = {
			x: m + f / 2,
			y: l + u + y,
			horizontalAnchor: "middle",
			verticalAnchor: x
		};
		return o && E && (O.height = Math.max(E.y + E.height - (l + u), 0), O.width = f), O;
	}
	if (n === "left") {
		var k = {
			x: h - C,
			y: l + u / 2,
			horizontalAnchor: w,
			verticalAnchor: "middle"
		};
		return o && E && (k.width = Math.max(k.x - E.x, 0), k.height = u), k;
	}
	if (n === "right") {
		var A = {
			x: h + g + C,
			y: l + u / 2,
			horizontalAnchor: T,
			verticalAnchor: "middle"
		};
		return o && E && (A.width = Math.max(E.x + E.width - A.x, 0), A.height = u), A;
	}
	var j = o && E ? {
		width: g,
		height: u
	} : {};
	return n === "insideLeft" ? Ot({
		x: h + C,
		y: l + u / 2,
		horizontalAnchor: T,
		verticalAnchor: "middle"
	}, j) : n === "insideRight" ? Ot({
		x: h + g - C,
		y: l + u / 2,
		horizontalAnchor: w,
		verticalAnchor: "middle"
	}, j) : n === "insideTop" ? Ot({
		x: p + d / 2,
		y: l + y,
		horizontalAnchor: "middle",
		verticalAnchor: x
	}, j) : n === "insideBottom" ? Ot({
		x: m + f / 2,
		y: l + u - y,
		horizontalAnchor: "middle",
		verticalAnchor: b
	}, j) : n === "insideTopLeft" ? Ot({
		x: p + C,
		y: l + y,
		horizontalAnchor: T,
		verticalAnchor: x
	}, j) : n === "insideTopRight" ? Ot({
		x: p + d - C,
		y: l + y,
		horizontalAnchor: w,
		verticalAnchor: x
	}, j) : n === "insideBottomLeft" ? Ot({
		x: m + C,
		y: l + u - y,
		horizontalAnchor: T,
		verticalAnchor: b
	}, j) : n === "insideBottomRight" ? Ot({
		x: m + f - C,
		y: l + u - y,
		horizontalAnchor: w,
		verticalAnchor: b
	}, j) : n && typeof n == "object" && (F(n.x) || gt(n.x)) && (F(n.y) || gt(n.y)) ? Ot({
		x: c + bt(n.x, g),
		y: l + bt(n.y, u),
		horizontalAnchor: "end",
		verticalAnchor: "end"
	}, j) : Ot({
		x: _,
		y: l + u / 2,
		horizontalAnchor: "middle",
		verticalAnchor: "middle"
	}, j);
}, Nt = [
	"top",
	"left",
	"right",
	"bottom"
];
function Pt(e) {
	return e == null ? !1 : typeof e == "object" || Nt.includes(e);
}
// node_modules/recharts/es6/context/legendPortalContext.js
var Ft = /*#__PURE__*/ (0, P.createContext)(null), It = () => (0, P.useContext)(Ft);
// node_modules/victory-vendor/node_modules/d3-shape/src/constant.js
function R(e) {
	return function() {
		return e;
	};
}
// node_modules/victory-vendor/node_modules/d3-shape/src/math.js
var Lt = Math.cos, Rt = Math.sin, zt = Math.sqrt, Bt = Math.PI;
Bt / 2;
var Vt = 2 * Bt, Ht = Math.PI, Ut = 2 * Ht, Wt = 1e-6, Gt = Ut - Wt;
function Kt(e) {
	this._ += e[0];
	for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function qt(e) {
	let t = Math.floor(e);
	if (!(t >= 0)) throw Error(`invalid digits: ${e}`);
	if (t > 15) return Kt;
	let n = 10 ** t;
	return function(e) {
		this._ += e[0];
		for (let t = 1, r = e.length; t < r; ++t) this._ += Math.round(arguments[t] * n) / n + e[t];
	};
}
var Jt = class {
	constructor(e) {
		this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Kt : qt(e);
	}
	moveTo(e, t) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}`;
	}
	closePath() {
		this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
	}
	lineTo(e, t) {
		this._append`L${this._x1 = +e},${this._y1 = +t}`;
	}
	quadraticCurveTo(e, t, n, r) {
		this._append`Q${+e},${+t},${this._x1 = +n},${this._y1 = +r}`;
	}
	bezierCurveTo(e, t, n, r, i, a) {
		this._append`C${+e},${+t},${+n},${+r},${this._x1 = +i},${this._y1 = +a}`;
	}
	arcTo(e, t, n, r, i) {
		if (e = +e, t = +t, n = +n, r = +r, i = +i, i < 0) throw Error(`negative radius: ${i}`);
		let a = this._x1, o = this._y1, s = n - e, c = r - t, l = a - e, u = o - t, d = l * l + u * u;
		if (this._x1 === null) this._append`M${this._x1 = e},${this._y1 = t}`;
		else if (d > Wt) {
			if (!(Math.abs(u * s - c * l) > Wt) || !i) this._append`L${this._x1 = e},${this._y1 = t}`;
			else {
				let f = n - a, p = r - o, m = s * s + c * c, h = f * f + p * p, g = Math.sqrt(m), _ = Math.sqrt(d), v = i * Math.tan((Ht - Math.acos((m + d - h) / (2 * g * _))) / 2), y = v / _, b = v / g;
				Math.abs(y - 1) > Wt && this._append`L${e + y * l},${t + y * u}`, this._append`A${i},${i},0,0,${+(u * f > l * p)},${this._x1 = e + b * s},${this._y1 = t + b * c}`;
			}
		}
	}
	arc(e, t, n, r, i, a) {
		if (e = +e, t = +t, n = +n, a = !!a, n < 0) throw Error(`negative radius: ${n}`);
		let o = n * Math.cos(r), s = n * Math.sin(r), c = e + o, l = t + s, u = 1 ^ a, d = a ? r - i : i - r;
		this._x1 === null ? this._append`M${c},${l}` : (Math.abs(this._x1 - c) > Wt || Math.abs(this._y1 - l) > Wt) && this._append`L${c},${l}`, n && (d < 0 && (d = d % Ut + Ut), d > Gt ? this._append`A${n},${n},0,1,${u},${e - o},${t - s}A${n},${n},0,1,${u},${this._x1 = c},${this._y1 = l}` : d > Wt && this._append`A${n},${n},0,${+(d >= Ht)},${u},${this._x1 = e + n * Math.cos(i)},${this._y1 = t + n * Math.sin(i)}`);
	}
	rect(e, t, n, r) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}h${n = +n}v${+r}h${-n}Z`;
	}
	toString() {
		return this._;
	}
};
Jt.prototype;
// node_modules/victory-vendor/node_modules/d3-shape/src/path.js
function Yt(e) {
	let t = 3;
	return e.digits = function(n) {
		if (!arguments.length) return t;
		if (n == null) t = null;
		else {
			let e = Math.floor(n);
			if (!(e >= 0)) throw RangeError(`invalid digits: ${n}`);
			t = e;
		}
		return e;
	}, () => new Jt(t);
}
Array.prototype.slice;
function Xt(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
// node_modules/victory-vendor/node_modules/d3-shape/src/curve/linear.js
function Zt(e) {
	this._context = e;
}
Zt.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: this._context.lineTo(e, t);
		}
	}
};
function Qt(e) {
	return new Zt(e);
}
// node_modules/victory-vendor/node_modules/d3-shape/src/point.js
function $t(e) {
	return e[0];
}
function en(e) {
	return e[1];
}
// node_modules/victory-vendor/node_modules/d3-shape/src/line.js
function tn(e, t) {
	var n = R(!0), r = null, i = Qt, a = null, o = Yt(s);
	e = typeof e == "function" ? e : e === void 0 ? $t : R(e), t = typeof t == "function" ? t : t === void 0 ? en : R(t);
	function s(s) {
		var c, l = (s = Xt(s)).length, u, d = !1, f;
		for (r ?? (a = i(f = o())), c = 0; c <= l; ++c) !(c < l && n(u = s[c], c, s)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(u, c, s), +t(u, c, s));
		if (f) return a = null, f + "" || null;
	}
	return s.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : R(+t), s) : e;
	}, s.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : R(+e), s) : t;
	}, s.defined = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : R(!!e), s) : n;
	}, s.curve = function(e) {
		return arguments.length ? (i = e, r != null && (a = i(r)), s) : i;
	}, s.context = function(e) {
		return arguments.length ? (e == null ? r = a = null : a = i(r = e), s) : r;
	}, s;
}
// node_modules/victory-vendor/node_modules/d3-shape/src/area.js
function nn(e, t, n) {
	var r = null, i = R(!0), a = null, o = Qt, s = null, c = Yt(l);
	e = typeof e == "function" ? e : e === void 0 ? $t : R(+e), t = typeof t == "function" ? t : R(t === void 0 ? 0 : +t), n = typeof n == "function" ? n : n === void 0 ? en : R(+n);
	function l(l) {
		var u, d, f, p = (l = Xt(l)).length, m, h = !1, g, _ = Array(p), v = Array(p);
		for (a ?? (s = o(g = c())), u = 0; u <= p; ++u) {
			if (!(u < p && i(m = l[u], u, l)) === h) {
				if (h = !h) d = u, s.areaStart(), s.lineStart();
				else {
					for (s.lineEnd(), s.lineStart(), f = u - 1; f >= d; --f) s.point(_[f], v[f]);
					s.lineEnd(), s.areaEnd();
				}
			}
			h && (_[u] = +e(m, u, l), v[u] = +t(m, u, l), s.point(r ? +r(m, u, l) : _[u], n ? +n(m, u, l) : v[u]));
		}
		if (g) return s = null, g + "" || null;
	}
	function u() {
		return tn().defined(i).curve(o).context(a);
	}
	return l.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : R(+t), r = null, l) : e;
	}, l.x0 = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : R(+t), l) : e;
	}, l.x1 = function(e) {
		return arguments.length ? (r = e == null ? null : typeof e == "function" ? e : R(+e), l) : r;
	}, l.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : R(+e), n = null, l) : t;
	}, l.y0 = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : R(+e), l) : t;
	}, l.y1 = function(e) {
		return arguments.length ? (n = e == null ? null : typeof e == "function" ? e : R(+e), l) : n;
	}, l.lineX0 = l.lineY0 = function() {
		return u().x(e).y(t);
	}, l.lineY1 = function() {
		return u().x(e).y(n);
	}, l.lineX1 = function() {
		return u().x(r).y(t);
	}, l.defined = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : R(!!e), l) : i;
	}, l.curve = function(e) {
		return arguments.length ? (o = e, a != null && (s = o(a)), l) : o;
	}, l.context = function(e) {
		return arguments.length ? (e == null ? a = s = null : s = o(a = e), l) : a;
	}, l;
}
// node_modules/victory-vendor/node_modules/d3-shape/src/curve/bump.js
var rn = class {
	constructor(e, t) {
		this._context = e, this._x = t;
	}
	areaStart() {
		this._line = 0;
	}
	areaEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	}
	point(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, t, e, t) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + t) / 2, e, this._y0, e, t);
		}
		this._x0 = e, this._y0 = t;
	}
};
function an(e) {
	return new rn(e, !0);
}
function on(e) {
	return new rn(e, !1);
}
// node_modules/victory-vendor/node_modules/d3-shape/src/symbol/circle.js
var sn = { draw(e, t) {
	let n = zt(t / Bt);
	e.moveTo(n, 0), e.arc(0, 0, n, 0, Vt);
} }, cn = { draw(e, t) {
	let n = zt(t / 5) / 2;
	e.moveTo(-3 * n, -n), e.lineTo(-n, -n), e.lineTo(-n, -3 * n), e.lineTo(n, -3 * n), e.lineTo(n, -n), e.lineTo(3 * n, -n), e.lineTo(3 * n, n), e.lineTo(n, n), e.lineTo(n, 3 * n), e.lineTo(-n, 3 * n), e.lineTo(-n, n), e.lineTo(-3 * n, n), e.closePath();
} }, ln = zt(1 / 3), un = ln * 2, dn = { draw(e, t) {
	let n = zt(t / un), r = n * ln;
	e.moveTo(0, -n), e.lineTo(r, 0), e.lineTo(0, n), e.lineTo(-r, 0), e.closePath();
} }, fn = { draw(e, t) {
	let n = zt(t), r = -n / 2;
	e.rect(r, r, n, n);
} }, pn = .8908130915292852, mn = Rt(Bt / 10) / Rt(7 * Bt / 10), hn = Rt(Vt / 10) * mn, gn = -Lt(Vt / 10) * mn, _n = { draw(e, t) {
	let n = zt(t * pn), r = hn * n, i = gn * n;
	e.moveTo(0, -n), e.lineTo(r, i);
	for (let t = 1; t < 5; ++t) {
		let a = Vt * t / 5, o = Lt(a), s = Rt(a);
		e.lineTo(s * n, -o * n), e.lineTo(o * r - s * i, s * r + o * i);
	}
	e.closePath();
} }, vn = zt(3), yn = { draw(e, t) {
	let n = -zt(t / (vn * 3));
	e.moveTo(0, n * 2), e.lineTo(-vn * n, -n), e.lineTo(vn * n, -n), e.closePath();
} }, bn = -.5, xn = zt(3) / 2, Sn = 1 / zt(12), Cn = (Sn / 2 + 1) * 3, wn = { draw(e, t) {
	let n = zt(t / Cn), r = n / 2, i = n * Sn, a = r, o = n * Sn + n, s = -a, c = o;
	e.moveTo(r, i), e.lineTo(a, o), e.lineTo(s, c), e.lineTo(bn * r - xn * i, xn * r + bn * i), e.lineTo(bn * a - xn * o, xn * a + bn * o), e.lineTo(bn * s - xn * c, xn * s + bn * c), e.lineTo(bn * r + xn * i, bn * i - xn * r), e.lineTo(bn * a + xn * o, bn * o - xn * a), e.lineTo(bn * s + xn * c, bn * c - xn * s), e.closePath();
} };
// node_modules/victory-vendor/node_modules/d3-shape/src/symbol.js
function Tn(e, t) {
	let n = null, r = Yt(i);
	e = typeof e == "function" ? e : R(e || sn), t = typeof t == "function" ? t : R(t === void 0 ? 64 : +t);
	function i() {
		let i;
		if (n ||= i = r(), e.apply(this, arguments).draw(n, +t.apply(this, arguments)), i) return n = null, i + "" || null;
	}
	return i.type = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : R(t), i) : e;
	}, i.size = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : R(+e), i) : t;
	}, i.context = function(e) {
		return arguments.length ? (n = e ?? null, i) : n;
	}, i;
}
// node_modules/victory-vendor/node_modules/d3-shape/src/noop.js
function En() {}
// node_modules/victory-vendor/node_modules/d3-shape/src/curve/basis.js
function Dn(e, t, n) {
	e._context.bezierCurveTo((2 * e._x0 + e._x1) / 3, (2 * e._y0 + e._y1) / 3, (e._x0 + 2 * e._x1) / 3, (e._y0 + 2 * e._y1) / 3, (e._x0 + 4 * e._x1 + t) / 6, (e._y0 + 4 * e._y1 + n) / 6);
}
function On(e) {
	this._context = e;
}
On.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 3: Dn(this, this._x1, this._y1);
			case 2: this._context.lineTo(this._x1, this._y1);
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
				break;
			case 2: this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
			default: Dn(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function kn(e) {
	return new On(e);
}
// node_modules/victory-vendor/node_modules/d3-shape/src/curve/basisClosed.js
function An(e) {
	this._context = e;
}
An.prototype = {
	areaStart: En,
	areaEnd: En,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x2, this._y2), this._context.closePath();
				break;
			case 2:
				this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
				break;
			case 3: this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
		}
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._x2 = e, this._y2 = t;
				break;
			case 1:
				this._point = 2, this._x3 = e, this._y3 = t;
				break;
			case 2:
				this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
				break;
			default: Dn(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function jn(e) {
	return new An(e);
}
// node_modules/victory-vendor/node_modules/d3-shape/src/curve/basisOpen.js
function Mn(e) {
	this._context = e;
}
Mn.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				var n = (this._x0 + 4 * this._x1 + e) / 6, r = (this._y0 + 4 * this._y1 + t) / 6;
				this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
				break;
			case 3: this._point = 4;
			default: Dn(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function Nn(e) {
	return new Mn(e);
}
// node_modules/victory-vendor/node_modules/d3-shape/src/curve/linearClosed.js
function Pn(e) {
	this._context = e;
}
Pn.prototype = {
	areaStart: En,
	areaEnd: En,
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		this._point && this._context.closePath();
	},
	point: function(e, t) {
		e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
	}
};
function Fn(e) {
	return new Pn(e);
}
// node_modules/victory-vendor/node_modules/d3-shape/src/curve/monotone.js
function In(e) {
	return e < 0 ? -1 : 1;
}
function Ln(e, t, n) {
	var r = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (r || i < 0 && -0), o = (n - e._y1) / (i || r < 0 && -0), s = (a * i + o * r) / (r + i);
	return (In(a) + In(o)) * Math.min(Math.abs(a), Math.abs(o), .5 * Math.abs(s)) || 0;
}
function Rn(e, t) {
	var n = e._x1 - e._x0;
	return n ? (3 * (e._y1 - e._y0) / n - t) / 2 : t;
}
function zn(e, t, n) {
	var r = e._x0, i = e._y0, a = e._x1, o = e._y1, s = (a - r) / 3;
	e._context.bezierCurveTo(r + s, i + s * t, a - s, o - s * n, a, o);
}
function Bn(e) {
	this._context = e;
}
Bn.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
			case 3: zn(this, this._t0, Rn(this, this._t0));
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		var n = NaN;
		if (e = +e, t = +t, e !== this._x1 || t !== this._y1) {
			switch (this._point) {
				case 0:
					this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					this._point = 3, zn(this, Rn(this, n = Ln(this, e, t)), n);
					break;
				default: zn(this, this._t0, n = Ln(this, e, t));
			}
			this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = n;
		}
	}
};
function Vn(e) {
	this._context = new Hn(e);
}
(Vn.prototype = Object.create(Bn.prototype)).point = function(e, t) {
	Bn.prototype.point.call(this, t, e);
};
function Hn(e) {
	this._context = e;
}
Hn.prototype = {
	moveTo: function(e, t) {
		this._context.moveTo(t, e);
	},
	closePath: function() {
		this._context.closePath();
	},
	lineTo: function(e, t) {
		this._context.lineTo(t, e);
	},
	bezierCurveTo: function(e, t, n, r, i, a) {
		this._context.bezierCurveTo(t, e, r, n, a, i);
	}
};
function Un(e) {
	return new Bn(e);
}
function Wn(e) {
	return new Vn(e);
}
// node_modules/victory-vendor/node_modules/d3-shape/src/curve/natural.js
function Gn(e) {
	this._context = e;
}
Gn.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = [], this._y = [];
	},
	lineEnd: function() {
		var e = this._x, t = this._y, n = e.length;
		if (n) {
			if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), n === 2) this._context.lineTo(e[1], t[1]);
			else for (var r = Kn(e), i = Kn(t), a = 0, o = 1; o < n; ++a, ++o) this._context.bezierCurveTo(r[0][a], i[0][a], r[1][a], i[1][a], e[o], t[o]);
		}
		(this._line || this._line !== 0 && n === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
	},
	point: function(e, t) {
		this._x.push(+e), this._y.push(+t);
	}
};
function Kn(e) {
	var t, n = e.length - 1, r, i = Array(n), a = Array(n), o = Array(n);
	for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
	for (i[n - 1] = 2, a[n - 1] = 7, o[n - 1] = 8 * e[n - 1] + e[n], t = 1; t < n; ++t) r = i[t] / a[t - 1], a[t] -= r, o[t] -= r * o[t - 1];
	for (i[n - 1] = o[n - 1] / a[n - 1], t = n - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
	for (a[n - 1] = (e[n] + i[n - 1]) / 2, t = 0; t < n - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
	return [i, a];
}
function qn(e) {
	return new Gn(e);
}
// node_modules/victory-vendor/node_modules/d3-shape/src/curve/step.js
function Jn(e, t) {
	this._context = e, this._t = t;
}
Jn.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = this._y = NaN, this._point = 0;
	},
	lineEnd: function() {
		0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: if (this._t <= 0) this._context.lineTo(this._x, t), this._context.lineTo(e, t);
			else {
				var n = this._x * (1 - this._t) + e * this._t;
				this._context.lineTo(n, this._y), this._context.lineTo(n, t);
			}
		}
		this._x = e, this._y = t;
	}
};
function Yn(e) {
	return new Jn(e, .5);
}
function Xn(e) {
	return new Jn(e, 0);
}
function Zn(e) {
	return new Jn(e, 1);
}
// node_modules/victory-vendor/node_modules/d3-shape/src/offset/none.js
function Qn(e, t) {
	if ((o = e.length) > 1) for (var n = 1, r, i, a = e[t[0]], o, s = a.length; n < o; ++n) for (i = a, a = e[t[n]], r = 0; r < s; ++r) a[r][1] += a[r][0] = isNaN(i[r][1]) ? i[r][0] : i[r][1];
}
// node_modules/victory-vendor/node_modules/d3-shape/src/order/none.js
function $n(e) {
	for (var t = e.length, n = Array(t); --t >= 0;) n[t] = t;
	return n;
}
// node_modules/victory-vendor/node_modules/d3-shape/src/stack.js
function er(e, t) {
	return e[t];
}
function tr(e) {
	let t = [];
	return t.key = e, t;
}
function nr() {
	var e = R([]), t = $n, n = Qn, r = er;
	function i(i) {
		var a = Array.from(e.apply(this, arguments), tr), o, s = a.length, c = -1, l;
		for (let e of i) for (o = 0, ++c; o < s; ++o) (a[o][c] = [0, +r(e, a[o].key, c, i)]).data = e;
		for (o = 0, l = Xt(t(a)); o < s; ++o) a[l[o]].index = o;
		return n(a, l), a;
	}
	return i.keys = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : R(Array.from(t)), i) : e;
	}, i.value = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : R(+e), i) : r;
	}, i.order = function(e) {
		return arguments.length ? (t = e == null ? $n : typeof e == "function" ? e : R(Array.from(e)), i) : t;
	}, i.offset = function(e) {
		return arguments.length ? (n = e ?? Qn, i) : n;
	}, i;
}
// node_modules/victory-vendor/node_modules/d3-shape/src/offset/expand.js
function rr(e, t) {
	if ((r = e.length) > 0) {
		for (var n, r, i = 0, a = e[0].length, o; i < a; ++i) {
			for (o = n = 0; n < r; ++n) o += e[n][i][1] || 0;
			if (o) for (n = 0; n < r; ++n) e[n][i][1] /= o;
		}
		Qn(e, t);
	}
}
// node_modules/victory-vendor/node_modules/d3-shape/src/offset/silhouette.js
function ir(e, t) {
	if ((i = e.length) > 0) {
		for (var n = 0, r = e[t[0]], i, a = r.length; n < a; ++n) {
			for (var o = 0, s = 0; o < i; ++o) s += e[o][n][1] || 0;
			r[n][1] += r[n][0] = -s / 2;
		}
		Qn(e, t);
	}
}
// node_modules/victory-vendor/node_modules/d3-shape/src/offset/wiggle.js
function ar(e, t) {
	if ((o = e.length) > 0 && (a = (i = e[t[0]]).length) > 0) {
		for (var n = 0, r = 1, i, a, o; r < a; ++r) {
			for (var s = 0, c = 0, l = 0; s < o; ++s) {
				for (var u = e[t[s]], d = u[r][1] || 0, f = (d - (u[r - 1][1] || 0)) / 2, p = 0; p < s; ++p) {
					var m = e[t[p]], h = m[r][1] || 0, g = m[r - 1][1] || 0;
					f += h - g;
				}
				c += d, l += f * d;
			}
			i[r - 1][1] += i[r - 1][0] = n, c && (n -= l / c);
		}
		i[r - 1][1] += i[r - 1][0] = n, Qn(e, t);
	}
}
// node_modules/recharts/es6/shape/Symbols.js
var or = [
	"type",
	"size",
	"sizeType"
];
function sr() {
	return sr = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, sr.apply(null, arguments);
}
function cr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function lr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? cr(Object(n), !0).forEach(function(t) {
			ur(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ur(e, t, n) {
	return (t = dr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function dr(e) {
	var t = fr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function fr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function pr(e, t) {
	if (e == null) return {};
	var n, r, i = mr(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function mr(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var hr = {
	symbolCircle: sn,
	symbolCross: cn,
	symbolDiamond: dn,
	symbolSquare: fn,
	symbolStar: _n,
	symbolTriangle: yn,
	symbolWye: wn
}, gr = Math.PI / 180, _r = (e) => hr[`symbol${Ct(e)}`] || sn, vr = (e, t, n) => {
	if (t === "area") return e;
	switch (n) {
		case "cross": return 5 * e * e / 9;
		case "diamond": return .5 * e * e / Math.sqrt(3);
		case "square": return e * e;
		case "star":
			var r = 18 * gr;
			return 1.25 * e * e * (Math.tan(r) - Math.tan(r * 2) * Math.tan(r) ** 2);
		case "triangle": return Math.sqrt(3) * e * e / 4;
		case "wye": return (21 - 10 * Math.sqrt(3)) * e * e / 8;
		default: return Math.PI * e * e / 4;
	}
}, yr = (e, t) => {
	hr[`symbol${Ct(e)}`] = t;
}, br = (e) => {
	var t = e.type, n = t === void 0 ? "circle" : t, r = e.size, i = r === void 0 ? 64 : r, a = e.sizeType, o = a === void 0 ? "area" : a, s = lr(lr({}, pr(e, or)), {}, {
		type: n,
		size: i,
		sizeType: o
	}), c = "circle";
	typeof n == "string" && (c = n);
	var u = () => {
		var e = _r(c), t = Tn().type(e).size(vr(i, o, c))();
		if (t !== null) return t;
	}, d = s.className, f = s.cx, p = s.cy, m = He(s);
	return F(f) && F(p) && F(i) ? /*#__PURE__*/ P.createElement("path", sr({}, m, {
		className: l("recharts-symbols", d),
		transform: `translate(${f}, ${p})`,
		d: u()
	})) : null;
};
br.registerSymbol = yr;
// node_modules/recharts/es6/util/types.js
var xr = (e) => "radius" in e && "startAngle" in e && "endAngle" in e, Sr = (e, t) => {
	if (!e || typeof e == "function" || typeof e == "boolean") return null;
	var n = e;
	if (/*#__PURE__*/ (0, P.isValidElement)(e) && (n = e.props), typeof n != "object" && typeof n != "function") return null;
	var r = {};
	return Object.keys(n).forEach((e) => {
		Ie(e) && typeof n[e] == "function" && (r[e] = t || ((t) => n[e](n, t)));
	}), r;
}, Cr = (e, t, n) => (r) => (e(t, n, r), null), wr = (e, t, n) => {
	if (e === null || typeof e != "object" && typeof e != "function") return null;
	var r = null;
	return Object.keys(e).forEach((i) => {
		var a = e[i];
		Ie(i) && typeof a == "function" && (r ||= {}, r[i] = Cr(a, t, n));
	}), r;
};
// node_modules/recharts/es6/util/resolveDefaultProps.js
function Tr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Er(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Tr(Object(n), !0).forEach(function(t) {
			Dr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Tr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Dr(e, t, n) {
	return (t = Or(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Or(e) {
	var t = kr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function kr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ar(e, t) {
	var n = Er({}, e), r = t;
	return Object.keys(t).reduce((e, t) => (e[t] === void 0 && r[t] !== void 0 && (e[t] = r[t]), e), n);
}
// node_modules/recharts/es6/component/DefaultLegendContent.js
function jr() {
	return jr = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, jr.apply(null, arguments);
}
function Mr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Nr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Mr(Object(n), !0).forEach(function(t) {
			Pr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Mr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Pr(e, t, n) {
	return (t = Fr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Fr(e) {
	var t = Ir(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ir(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Lr = 32, Rr = {
	align: "center",
	iconSize: 14,
	inactiveColor: "#ccc",
	layout: "horizontal",
	verticalAlign: "middle",
	labelStyle: {}
};
function zr(e) {
	if (typeof e == "object" && e && "strokeDasharray" in e) return String(e.strokeDasharray);
}
function Br(e) {
	var t = e.data, n = e.iconType, r = e.inactiveColor, i = Lr / 2, a = Lr / 6, o = Lr / 3, s = t.inactive ? r : t.color, c = n ?? t.type;
	if (c === "none") return null;
	if (c === "plainline") return /*#__PURE__*/ P.createElement("line", {
		strokeWidth: 4,
		fill: "none",
		stroke: s,
		strokeDasharray: zr(t.payload),
		x1: 0,
		y1: i,
		x2: Lr,
		y2: i,
		className: "recharts-legend-icon"
	});
	if (c === "line") return /*#__PURE__*/ P.createElement("path", {
		strokeWidth: 4,
		fill: "none",
		stroke: s,
		d: `M0,${i}h${o}
            A${a},${a},0,1,1,${2 * o},${i}
            H${Lr}M${2 * o},${i}
            A${a},${a},0,1,1,${o},${i}`,
		className: "recharts-legend-icon"
	});
	if (c === "rect") return /*#__PURE__*/ P.createElement("path", {
		stroke: "none",
		fill: s,
		d: `M0,${Lr / 8}h${Lr}v${Lr * 3 / 4}h${-Lr}z`,
		className: "recharts-legend-icon"
	});
	if (/*#__PURE__*/ P.isValidElement(t.legendIcon)) {
		var l = Nr({}, t);
		return delete l.legendIcon, /*#__PURE__*/ P.cloneElement(t.legendIcon, l);
	}
	return /*#__PURE__*/ P.createElement(br, {
		fill: s,
		cx: i,
		cy: i,
		size: Lr,
		sizeType: "diameter",
		type: c
	});
}
function Vr(e) {
	var t = e.payload, n = e.iconSize, r = e.layout, i = e.formatter, a = e.inactiveColor, o = e.iconType, s = e.labelStyle, c = {
		x: 0,
		y: 0,
		width: Lr,
		height: Lr
	}, u = {
		display: r === "horizontal" ? "inline-block" : "block",
		marginRight: 10,
		whiteSpace: "nowrap"
	}, d = {
		display: "inline-block",
		verticalAlign: "middle",
		marginRight: 4
	};
	return t.map((t, r) => {
		var f = t.formatter || i, p = l({
			"recharts-legend-item": !0,
			[`legend-item-${r}`]: !0,
			inactive: t.inactive
		});
		if (t.type === "none") return null;
		var m = typeof s == "object" ? Nr({}, s) : {};
		m.color = t.inactive ? a : m.color || t.color, m.whiteSpace ??= "normal", m.overflowWrap ??= "break-word";
		var h = f ? f(t.value, t, r) : t.value;
		return /*#__PURE__*/ P.createElement("li", jr({
			className: p,
			style: u,
			key: `legend-item-${r}`
		}, wr(e, t, r)), /*#__PURE__*/ P.createElement(Je, {
			width: n,
			height: n,
			viewBox: c,
			style: d,
			"aria-label": t.value == null ? "legend icon" : `${t.value} legend icon`
		}, /*#__PURE__*/ P.createElement(Br, {
			data: t,
			iconType: o,
			inactiveColor: a
		})), /*#__PURE__*/ P.createElement("span", {
			className: "recharts-legend-item-text",
			style: m
		}, h));
	});
}
var Hr = (e) => {
	var t = Ar(e, Rr), n = t.payload, r = t.layout, i = t.align;
	if (!n || !n.length) return null;
	var a = {
		padding: 0,
		margin: 0,
		textAlign: r === "horizontal" ? i : "left"
	};
	return /*#__PURE__*/ P.createElement("ul", {
		className: "recharts-default-legend",
		style: a
	}, /*#__PURE__*/ P.createElement(Vr, jr({}, t, { payload: n })));
};
// node_modules/es-toolkit/dist/array/uniqBy.mjs
function Ur(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r = 0; r < e.length; r++) {
		let i = e[r], a = t(i, r, e);
		n.has(a) || n.set(a, i);
	}
	return Array.from(n.values());
}
// node_modules/es-toolkit/dist/function/ary.mjs
function Wr(e, t) {
	return function(...n) {
		return e.apply(this, n.slice(0, t));
	};
}
// node_modules/es-toolkit/dist/function/identity.mjs
function Gr(e) {
	return e;
}
// node_modules/es-toolkit/dist/predicate/isLength.mjs
function Kr(e) {
	return Number.isSafeInteger(e) && e >= 0;
}
// node_modules/es-toolkit/dist/compat/predicate/isArrayLike.mjs
function qr(e) {
	return e != null && typeof e != "function" && Kr(e.length);
}
// node_modules/es-toolkit/dist/compat/object/property.mjs
function Jr(e) {
	return function(t) {
		return lt(t, e);
	};
}
// node_modules/es-toolkit/dist/predicate/isPrimitive.mjs
function Yr(e) {
	return e == null || typeof e != "object" && typeof e != "function";
}
// node_modules/es-toolkit/dist/predicate/isTypedArray.mjs
function Xr(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
// node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function Zr(e) {
	return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
// node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function Qr(e) {
	return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
// node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var $r = "[object RegExp]", ei = "[object String]", ti = "[object Number]", ni = "[object Boolean]", ri = "[object Arguments]", ii = "[object Symbol]", ai = "[object Date]", oi = "[object Map]", si = "[object Set]", ci = "[object Array]", li = "[object Function]", ui = "[object ArrayBuffer]", di = "[object Object]", fi = "[object Error]", pi = "[object DataView]", mi = "[object Uint8Array]", hi = "[object Uint8ClampedArray]", gi = "[object Uint16Array]", _i = "[object Uint32Array]", vi = "[object BigUint64Array]", yi = "[object Int8Array]", bi = "[object Int16Array]", xi = "[object Int32Array]", Si = "[object BigInt64Array]", Ci = "[object Float32Array]", wi = "[object Float64Array]", Ti = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || (function() {
	return this;
})();
// node_modules/es-toolkit/dist/predicate/isBuffer.mjs
function Ei(e) {
	return Ti.Buffer !== void 0 && Ti.Buffer.isBuffer(e);
}
// node_modules/es-toolkit/dist/object/cloneDeepWith.mjs
function Di(e, t) {
	return Oi(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function Oi(e, t, n, r = /* @__PURE__ */ new Map(), i = void 0) {
	let a = i?.(e, t, n, r);
	if (a !== void 0) return a;
	if (Yr(e)) return e;
	if (r.has(e)) return r.get(e);
	if (Array.isArray(e)) {
		let t = Array(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = Oi(e[a], a, n, r, i);
		return Object.hasOwn(e, "index") && (t.index = e.index), Object.hasOwn(e, "input") && (t.input = e.input), t;
	}
	if (e instanceof Date) return new Date(e.getTime());
	if (e instanceof RegExp) {
		let t = new RegExp(e.source, e.flags);
		return t.lastIndex = e.lastIndex, t;
	}
	if (e instanceof Map) {
		let t = /* @__PURE__ */ new Map();
		r.set(e, t);
		for (let [a, o] of e) t.set(a, Oi(o, a, n, r, i));
		return t;
	}
	if (e instanceof Set) {
		let t = /* @__PURE__ */ new Set();
		r.set(e, t);
		for (let a of e) t.add(Oi(a, void 0, n, r, i));
		return t;
	}
	if (Ei(e)) return e.subarray();
	if (Xr(e)) {
		let t = new (Object.getPrototypeOf(e)).constructor(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = Oi(e[a], a, n, r, i);
		return t;
	}
	if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
	if (e instanceof DataView) {
		let t = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (typeof File < "u" && e instanceof File) {
		let t = new File([e], e.name, { type: e.type });
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (typeof Blob < "u" && e instanceof Blob) {
		let t = new Blob([e], { type: e.type });
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (e instanceof Error) {
		let t = structuredClone(e);
		return r.set(e, t), t.message = e.message, t.name = e.name, t.stack = e.stack, t.cause = e.cause, t.constructor = e.constructor, ki(t, e, n, r, i), t;
	}
	if (e instanceof Boolean) {
		let t = new Boolean(e.valueOf());
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (e instanceof Number) {
		let t = new Number(e.valueOf());
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (e instanceof String) {
		let t = new String(e.valueOf());
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (typeof e == "object" && Ai(e)) {
		let t = Object.create(Object.getPrototypeOf(e));
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	return e;
}
function ki(e, t, n = e, r, i) {
	let a = [...Object.keys(t), ...Zr(t)];
	for (let o = 0; o < a.length; o++) {
		let s = a[o], c = Object.getOwnPropertyDescriptor(e, s);
		(c == null || c.writable) && (e[s] = Oi(t[s], s, n, r, i));
	}
}
function Ai(e) {
	switch (Qr(e)) {
		case ri:
		case ci:
		case ui:
		case pi:
		case ni:
		case ai:
		case Ci:
		case wi:
		case yi:
		case bi:
		case xi:
		case oi:
		case ti:
		case di:
		case $r:
		case si:
		case ei:
		case ii:
		case mi:
		case hi:
		case gi:
		case _i: return !0;
		default: return !1;
	}
}
// node_modules/es-toolkit/dist/object/cloneDeep.mjs
function ji(e) {
	return Oi(e, void 0, e, /* @__PURE__ */ new Map(), void 0);
}
// node_modules/es-toolkit/dist/compat/util/eq.mjs
function Mi(e, t) {
	return e === t || Number.isNaN(e) && Number.isNaN(t);
}
// node_modules/es-toolkit/dist/compat/predicate/isObject.mjs
function Ni(e) {
	return e !== null && (typeof e == "object" || typeof e == "function");
}
// node_modules/es-toolkit/dist/compat/predicate/isMatchWith.mjs
function Pi(e, t, n) {
	return typeof n == "function" ? Fi(e, t, function e(t, r, i, a, o, s) {
		let c = n(t, r, i, a, o, s);
		return c === void 0 ? Fi(t, r, e, s, !1) : !!c;
	}, /* @__PURE__ */ new Map(), !0) : Pi(e, t, () => void 0);
}
function Fi(e, t, n, r, i = !1) {
	if (t === e) return !0;
	switch (typeof t) {
		case "object": return Ii(e, t, n, r, i);
		case "function": return Object.keys(t).length > 0 ? Fi(e, { ...t }, n, r, i) : Mi(e, t);
		default: return Ni(e) && i ? typeof t != "string" || t === "" : Mi(e, t);
	}
}
function Ii(e, t, n, r, i = !1) {
	if (t == null) return !0;
	if (Array.isArray(t)) return Ri(e, t, n, r);
	if (t instanceof Map) return Li(e, t, n, r);
	if (t instanceof Set) return zi(e, t, n, r);
	let a = Object.keys(t);
	if (e == null) return i && a.length === 0;
	if (i) Yr(e) && (e = Object(e));
	else {
		let t = Qr(e);
		if (t !== "[object Object]" && t !== "[object Arguments]") return !1;
	}
	if (a.length === 0) return !0;
	if (r?.has(t)) return r.get(t) === e;
	r?.set(t, e);
	try {
		for (let i = 0; i < a.length; i++) {
			let o = a[i];
			if (!(o in e) || t[o] === void 0 && e[o] !== void 0 || t[o] === null && e[o] !== null || !n(e[o], t[o], o, e, t, r)) return !1;
		}
		return !0;
	} finally {
		r?.delete(t);
	}
}
function Li(e, t, n, r) {
	if (t.size === 0) return !0;
	if (!(e instanceof Map)) return !1;
	for (let [i, a] of t.entries()) if (n(e.get(i), a, i, e, t, r) === !1) return !1;
	return !0;
}
function Ri(e, t, n, r) {
	if (t.length === 0) return !0;
	if (!Array.isArray(e)) return !1;
	let i = /* @__PURE__ */ new Set();
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = !1;
		for (let c = 0; c < e.length; c++) {
			if (i.has(c)) continue;
			let l = e[c], u = !1;
			if (n(l, o, a, e, t, r) && (u = !0), u) {
				i.add(c), s = !0;
				break;
			}
		}
		if (!s) return !1;
	}
	return !0;
}
function zi(e, t, n, r) {
	return t.size === 0 || e instanceof Set && Ri([...e], [...t], n, r);
}
// node_modules/es-toolkit/dist/compat/predicate/isMatch.mjs
function Bi(e, t) {
	return Pi(e, t, () => void 0);
}
// node_modules/es-toolkit/dist/compat/predicate/matches.mjs
function Vi(e) {
	return e = ji(e), (t) => Bi(t, e);
}
// node_modules/es-toolkit/dist/compat/object/cloneDeepWith.mjs
function Hi(e, t) {
	return Di(e, (n, r, i, a) => {
		let o = t?.(n, r, i, a);
		if (o !== void 0) return o;
		if (typeof e == "object") {
			if (Qr(e) === "[object Object]" && typeof e.constructor != "function") {
				let t = {};
				return a.set(e, t), ki(t, e, i, a), t;
			}
			switch (Object.prototype.toString.call(e)) {
				case ti:
				case ei:
				case ni: {
					let t = new e.constructor(e?.valueOf());
					return ki(t, e), t;
				}
				case ri: {
					let t = {};
					return ki(t, e), t.length = e.length, t[Symbol.iterator] = e[Symbol.iterator], t;
				}
				default: return;
			}
		}
	});
}
// node_modules/es-toolkit/dist/compat/object/cloneDeep.mjs
function Ui(e) {
	return Hi(e);
}
// node_modules/es-toolkit/dist/compat/_internal/isIndex.mjs
var Wi = /^(?:0|[1-9]\d*)$/;
function Gi(e, t = 2 ** 53 - 1) {
	switch (typeof e) {
		case "number": return Number.isInteger(e) && e >= 0 && e < t;
		case "symbol": return !1;
		case "string": return Wi.test(e);
	}
}
// node_modules/es-toolkit/dist/compat/predicate/isArguments.mjs
function Ki(e) {
	return typeof e == "object" && !!e && Qr(e) === "[object Arguments]";
}
// node_modules/es-toolkit/dist/compat/object/has.mjs
function qi(e, t) {
	let n;
	if (n = Array.isArray(t) ? t : typeof t == "string" && rt(t) && !(t in Object(e)) ? ct(t) : [t], n.length === 0) return !1;
	let r = e;
	for (let e = 0; e < n.length; e++) {
		let t = it(n[e]);
		if ((r == null || !Object.hasOwn(r, t)) && !((Array.isArray(r) || Ki(r)) && Gi(t) && Number(t) < r.length)) return !1;
		r = r[t];
	}
	return !0;
}
// node_modules/es-toolkit/dist/compat/predicate/matchesProperty.mjs
function Ji(e, t) {
	switch (typeof e) {
		case "object":
			Object.is(e?.valueOf(), -0) && (e = "-0");
			break;
		case "number": e = it(e);
	}
	return t = Ui(t), function(n) {
		let r = lt(n, e);
		return r === void 0 ? qi(n, e) : t === void 0 ? r === void 0 : Bi(r, t);
	};
}
// node_modules/es-toolkit/dist/compat/util/iteratee.mjs
function Yi(e) {
	if (e == null) return Gr;
	switch (typeof e) {
		case "function": return e;
		case "object": return Array.isArray(e) && e.length === 2 ? Ji(e[0], e[1]) : Vi(e);
		default: return Jr(e);
	}
}
// node_modules/es-toolkit/dist/compat/_internal/normalizeZero.mjs
function Xi(e) {
	return e === 0 ? 0 : e;
}
// node_modules/es-toolkit/dist/compat/array/uniqBy.mjs
function Zi(e, t = Gr) {
	return qr(e) ? Ur(Array.from(e), Wr(Yi(t), 1)).map(Xi) : [];
}
// node_modules/recharts/es6/util/payload/getUniqPayload.js
function Qi(e, t, n) {
	return t === !0 ? Zi(e, n) : typeof t == "function" ? Zi(e, t) : e;
}
// node_modules/recharts/es6/state/RechartsReduxContext.js
var $i = /*#__PURE__*/ (0, P.createContext)(null), ea = (e) => e, z = () => {
	var e = (0, P.useContext)($i);
	return e ? e.store.dispatch : ea;
}, ta = () => {}, na = () => ta, ra = (e, t) => e === t;
function B(e) {
	var t = (0, P.useContext)($i), n = (0, P.useMemo)(() => t ? (t) => {
		if (t != null) return e(t);
	} : ta, [t, e]);
	return (0, Ye.useSyncExternalStoreWithSelector)(t ? t.subscription.addNestedSub : na, t ? t.store.getState : ta, t ? t.store.getState : ta, n, ra);
}
// node_modules/reselect/dist/reselect.mjs
function ia(e, t = `expected a function, instead received ${typeof e}`) {
	if (typeof e != "function") throw TypeError(t);
}
function aa(e, t = "expected all items to be functions, instead received the following types: ") {
	if (!e.every((e) => typeof e == "function")) {
		let n = e.map((e) => typeof e == "function" ? `function ${e.name || "unnamed"}()` : typeof e).join(", ");
		throw TypeError(`${t}[${n}]`);
	}
}
var oa = (e) => Array.isArray(e) ? e : [e];
function sa(e) {
	let t = Array.isArray(e[0]) ? e[0] : e;
	return aa(t, "createSelector expects all input-selectors to be functions, but received the following types: "), t;
}
function ca(e, t) {
	let n = [], { length: r } = e;
	for (let i = 0; i < r; i++) n.push(e[i].apply(null, t));
	return n;
}
var la = class {
	constructor(e) {
		this.value = e;
	}
	deref() {
		return this.value;
	}
}, ua = typeof WeakRef > "u" ? la : WeakRef, da = 0, fa = 1;
function pa() {
	return {
		s: da,
		v: void 0,
		o: null,
		p: null
	};
}
function ma(e) {
	return e instanceof ua ? e.deref() : e;
}
function ha(e, t = {}) {
	let n = pa(), { resultEqualityCheck: r } = t, i, a = 0;
	function o() {
		let t = n, { length: o } = arguments;
		for (let e = 0, n = o; e < n; e++) {
			let n = arguments[e];
			if (typeof n == "function" || typeof n == "object" && n) {
				let e = t.o;
				e === null && (t.o = e = /* @__PURE__ */ new WeakMap());
				let r = e.get(n);
				r === void 0 ? (t = pa(), e.set(n, t)) : t = r;
			} else {
				let e = t.p;
				e === null && (t.p = e = /* @__PURE__ */ new Map());
				let r = e.get(n);
				r === void 0 ? (t = pa(), e.set(n, t)) : t = r;
			}
		}
		let s = t, c;
		if (t.s === fa) c = t.v;
		else if (c = e.apply(null, arguments), a++, r) {
			let e = ma(i);
			e != null && r(e, c) && (c = e, a !== 0 && a--), i = typeof c == "object" && c || typeof c == "function" ? /* @__PURE__ */ new ua(c) : c;
		}
		return s.s = fa, s.v = c, c;
	}
	return o.clearCache = () => {
		n = pa(), o.resetResultsCount();
	}, o.resultsCount = () => a, o.resetResultsCount = () => {
		a = 0;
	}, o;
}
function ga(e, ...t) {
	let n = typeof e == "function" ? {
		memoize: e,
		memoizeOptions: t
	} : e, r = (...e) => {
		let t = 0, r = 0, i, a = {}, o = e.pop();
		typeof o == "object" && (a = o, o = e.pop()), ia(o, `createSelector expects an output function after the inputs, but received: [${typeof o}]`);
		let { memoize: s, memoizeOptions: c = [], argsMemoize: l = ha, argsMemoizeOptions: u = [] } = {
			...n,
			...a
		}, d = oa(c), f = oa(u), p = sa(e), m = s(function() {
			return t++, o.apply(null, arguments);
		}, ...d), h = l(function() {
			r++;
			let e = ca(p, arguments);
			return i = m.apply(null, e), i;
		}, ...f);
		return Object.assign(h, {
			resultFunc: o,
			memoizedResultFunc: m,
			dependencies: p,
			dependencyRecomputations: () => r,
			resetDependencyRecomputations: () => {
				r = 0;
			},
			lastResult: () => i,
			recomputations: () => t,
			resetRecomputations: () => {
				t = 0;
			},
			memoize: s,
			argsMemoize: l
		});
	};
	return Object.assign(r, { withTypes: () => r }), r;
}
var V = /* @__PURE__ */ ga(ha);
// node_modules/es-toolkit/dist/array/flatten.mjs
function _a(e, t = 1) {
	let n = [], r = Math.floor(t), i = (e, t) => {
		for (let a = 0; a < e.length; a++) {
			let o = e[a];
			Array.isArray(o) && t < r ? i(o, t + 1) : n.push(o);
		}
	};
	return i(e, 0), n;
}
// node_modules/es-toolkit/dist/compat/_internal/isIterateeCall.mjs
function va(e, t, n) {
	return Ni(n) && (typeof t == "number" && qr(n) && Gi(t) && t < n.length || typeof t == "string" && t in n) ? Mi(n[t], e) : !1;
}
// node_modules/es-toolkit/dist/compat/_internal/compareValues.mjs
function ya(e) {
	return typeof e == "symbol" ? 1 : e === null ? 2 : e === void 0 ? 3 : e === e ? 0 : 4;
}
var ba = (e, t, n) => {
	if (e !== t) {
		let r = ya(e), i = ya(t);
		if (r === i && r === 0) {
			if (e < t) return n === "desc" ? 1 : -1;
			if (e > t) return n === "desc" ? -1 : 1;
		}
		return n === "desc" ? i - r : r - i;
	}
	return 0;
}, xa = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Sa = /^\w*$/;
function Ca(e, t) {
	return Array.isArray(e) ? !1 : typeof e == "number" || typeof e == "boolean" || e == null || at(e) ? !0 : typeof e == "string" && (Sa.test(e) || !xa.test(e)) || t != null && Object.hasOwn(t, e);
}
// node_modules/es-toolkit/dist/compat/array/orderBy.mjs
function wa(e, t, n, r) {
	if (e == null) return [];
	n = r ? void 0 : n, Array.isArray(e) || (e = qr(e) ? Array.from(e) : Object.values(e)), Array.isArray(t) || (t = t == null ? [null] : [t]), t.length === 0 && (t = [null]), Array.isArray(n) || (n = n == null ? [] : [n]), n = n.map((e) => String(e));
	let i = (e, t) => {
		let n = e, r = 0;
		for (; r < t.length && n != null; ++r) n = n[t[r]];
		return r > 0 && r === t.length ? n : void 0;
	}, a = (e, t) => {
		if (e == null) return t;
		if (t != null) return typeof e == "object" && "key" in e ? Object.hasOwn(t, e.key) ? t[e.key] : i(t, e.path) : typeof e == "function" ? e(t) : Array.isArray(e) ? i(t, e) : t[e];
	}, o = t.map((e) => (Array.isArray(e) && e.length === 1 && (e = e[0]), e == null || typeof e == "function" || Array.isArray(e) || Ca(e) ? e : {
		key: e,
		path: ct(e)
	}));
	return e.map((e) => ({
		original: e,
		criteria: o.map((t) => a(t, e))
	})).slice().sort((e, t) => {
		for (let r = 0; r < o.length; r++) {
			let i = ba(e.criteria[r], t.criteria[r], n[r]);
			if (i !== 0) return i;
		}
		return 0;
	}).map((e) => e.original);
}
// node_modules/es-toolkit/dist/compat/array/sortBy.mjs
function Ta(e, ...t) {
	let n = t.length;
	return n > 1 && va(e, t[0], t[1]) ? t = [] : n > 2 && va(t[0], t[1], t[2]) && (t = [t[0]]), wa(e, _a(t), ["asc"]);
}
// node_modules/recharts/es6/state/selectors/legendSelectors.js
var Ea = (e) => e.legend.settings, Da = (e) => e.legend.size, Oa = V([(e) => e.legend.payload, Ea], (e, t) => {
	var n = t.itemSorter, r = e.flat(1);
	return n ? Ta(r, n) : r;
});
// node_modules/recharts/es6/context/legendPayloadContext.js
function ka() {
	return B(Oa);
}
// node_modules/recharts/es6/util/useElementOffset.js
function Aa(e, t) {
	return Fa(e) || Pa(e, t) || Ma(e, t) || ja();
}
function ja() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ma(e, t) {
	if (e) {
		if (typeof e == "string") return Na(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Na(e, t) : void 0;
	}
}
function Na(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Pa(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Fa(e) {
	if (Array.isArray(e)) return e;
}
var Ia = 1;
function La(e, t) {
	return Math.abs(e.height - t.height) > Ia || Math.abs(e.left - t.left) > Ia || Math.abs(e.top - t.top) > Ia || Math.abs(e.width - t.width) > Ia;
}
function Ra(e) {
	var t = e.getBoundingClientRect();
	return {
		height: t.height,
		left: t.left,
		top: t.top,
		width: t.width
	};
}
function za() {
	var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = Aa((0, P.useState)({
		height: 0,
		left: 0,
		top: 0,
		width: 0
	}), 2), n = t[0], r = t[1], i = (0, P.useRef)(null), a = (0, P.useRef)(n);
	a.current = n;
	var o = (0, P.useCallback)((e) => {
		if (i.current != null && (i.current.disconnect(), i.current = null), e != null) {
			var t = Ra(e);
			if (La(t, a.current) && r(t), typeof ResizeObserver < "u") {
				var n = new ResizeObserver(() => {
					var t = Ra(e);
					La(t, a.current) && r(t);
				});
				n.observe(e), i.current = n;
			}
		}
	}, [...e]);
	return (0, P.useEffect)(() => () => {
		var e;
		(e = i.current) == null || e.disconnect();
	}, []), [n, o];
}
// node_modules/redux/dist/redux.mjs
function Ba(e) {
	return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Va = typeof Symbol == "function" && Symbol.observable || "@@observable", Ha = () => Math.random().toString(36).substring(7).split("").join("."), Ua = {
	INIT: `@@redux/INIT${/* @__PURE__ */ Ha()}`,
	REPLACE: `@@redux/REPLACE${/* @__PURE__ */ Ha()}`,
	PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Ha()}`
};
function Wa(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Ga(e, t, n) {
	if (typeof e != "function") throw Error(Ba(2));
	if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function") throw Error(Ba(0));
	if (typeof t == "function" && n === void 0 && (n = t, t = void 0), n !== void 0) {
		if (typeof n != "function") throw Error(Ba(1));
		return n(Ga)(e, t);
	}
	let r = e, i = t, a = /* @__PURE__ */ new Map(), o = a, s = 0, c = !1;
	function l() {
		o === a && (o = /* @__PURE__ */ new Map(), a.forEach((e, t) => {
			o.set(t, e);
		}));
	}
	function u() {
		if (c) throw Error(Ba(3));
		return i;
	}
	function d(e) {
		if (typeof e != "function") throw Error(Ba(4));
		if (c) throw Error(Ba(5));
		let t = !0;
		l();
		let n = s++;
		return o.set(n, e), function() {
			if (t) {
				if (c) throw Error(Ba(6));
				t = !1, l(), o.delete(n), a = null;
			}
		};
	}
	function f(e) {
		if (!Wa(e)) throw Error(Ba(7));
		if (e.type === void 0) throw Error(Ba(8));
		if (typeof e.type != "string") throw Error(Ba(17));
		if (c) throw Error(Ba(9));
		try {
			c = !0, i = r(i, e);
		} finally {
			c = !1;
		}
		return (a = o).forEach((e) => {
			e();
		}), e;
	}
	function p(e) {
		if (typeof e != "function") throw Error(Ba(10));
		r = e, f({ type: Ua.REPLACE });
	}
	function m() {
		let e = d;
		return {
			subscribe(t) {
				if (typeof t != "object" || !t) throw Error(Ba(11));
				function n() {
					let e = t;
					e.next && e.next(u());
				}
				return n(), { unsubscribe: e(n) };
			},
			[Va]() {
				return this;
			}
		};
	}
	return f({ type: Ua.INIT }), {
		dispatch: f,
		subscribe: d,
		getState: u,
		replaceReducer: p,
		[Va]: m
	};
}
function Ka(e) {
	Object.keys(e).forEach((t) => {
		let n = e[t];
		if (n(void 0, { type: Ua.INIT }) === void 0) throw Error(Ba(12));
		if (n(void 0, { type: Ua.PROBE_UNKNOWN_ACTION() }) === void 0) throw Error(Ba(13));
	});
}
function qa(e) {
	let t = Object.keys(e), n = {};
	for (let r = 0; r < t.length; r++) {
		let i = t[r];
		typeof e[i] == "function" && (n[i] = e[i]);
	}
	let r = Object.keys(n), i;
	try {
		Ka(n);
	} catch (e) {
		i = e;
	}
	return function(e = {}, t) {
		if (i) throw i;
		let a = !1, o = {};
		for (let i = 0; i < r.length; i++) {
			let s = r[i], c = n[s], l = e[s], u = c(l, t);
			if (u === void 0) throw t && t.type, Error(Ba(14));
			o[s] = u, a ||= u !== l;
		}
		return a ||= r.length !== Object.keys(e).length, a ? o : e;
	};
}
function Ja(...e) {
	return e.length === 0 ? (e) => e : e.length === 1 ? e[0] : e.reduce((e, t) => (...n) => e(t(...n)));
}
function Ya(...e) {
	return (t) => (n, r) => {
		let i = t(n, r), a = () => {
			throw Error(Ba(15));
		}, o = {
			getState: i.getState,
			dispatch: (e, ...t) => a(e, ...t)
		};
		return a = Ja(...e.map((e) => e(o)))(i.dispatch), {
			...i,
			dispatch: a
		};
	};
}
function Xa(e) {
	return Wa(e) && "type" in e && typeof e.type == "string";
}
// node_modules/immer/dist/immer.mjs
var Za = Symbol.for("immer-nothing"), Qa = Symbol.for("immer-draftable"), $a = Symbol.for("immer-state");
function eo(e, ...t) {
	throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`);
}
var to = Object, no = to.getPrototypeOf, ro = "constructor", io = "prototype", ao = "configurable", oo = "enumerable", so = "writable", co = "value", lo = (e) => !!e && !!e[$a];
function uo(e) {
	return e ? mo(e) || xo(e) || !!e[Qa] || !!e[ro]?.[Qa] || So(e) || Co(e) : !1;
}
var fo = to[io][ro].toString(), po = /* @__PURE__ */ new WeakMap();
function mo(e) {
	if (!e || !wo(e)) return !1;
	let t = no(e);
	if (t === null || t === to[io]) return !0;
	let n = to.hasOwnProperty.call(t, ro) && t[ro];
	if (n === Object) return !0;
	if (!To(n)) return !1;
	let r = po.get(n);
	return r === void 0 && (r = Function.toString.call(n), po.set(n, r)), r === fo;
}
function ho(e, t, n = !0) {
	go(e) === 0 ? (n ? Reflect.ownKeys(e) : to.keys(e)).forEach((n) => {
		t(n, e[n], e);
	}) : e.forEach((n, r) => t(r, n, e));
}
function go(e) {
	let t = e[$a];
	return t ? t.type_ : xo(e) ? 1 : So(e) ? 2 : Co(e) ? 3 : 0;
}
var _o = (e, t, n = go(e)) => n === 2 ? e.has(t) : to[io].hasOwnProperty.call(e, t), vo = (e, t, n = go(e)) => n === 2 ? e.get(t) : e[t], yo = (e, t, n, r = go(e)) => {
	r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
};
function bo(e, t) {
	return e === t ? e !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
var xo = Array.isArray, So = (e) => e instanceof Map, Co = (e) => e instanceof Set, wo = (e) => typeof e == "object", To = (e) => typeof e == "function", Eo = (e) => typeof e == "boolean";
function Do(e) {
	let t = +e;
	return Number.isInteger(t) && String(t) === e;
}
var Oo = (e) => e.copy_ || e.base_, ko = (e) => e.modified_ ? e.copy_ : e.base_;
function Ao(e, t) {
	if (So(e)) return new Map(e);
	if (Co(e)) return new Set(e);
	if (xo(e)) return Array[io].slice.call(e);
	let n = mo(e);
	if (t === !0 || t === "class_only" && !n) {
		let t = to.getOwnPropertyDescriptors(e);
		delete t[$a];
		let n = Reflect.ownKeys(t);
		for (let r = 0; r < n.length; r++) {
			let i = n[r], a = t[i];
			a[so] === !1 && (a[so] = !0, a[ao] = !0), (a.get || a.set) && (t[i] = {
				[ao]: !0,
				[so]: !0,
				[oo]: a[oo],
				[co]: e[i]
			});
		}
		return to.create(no(e), t);
	}
	{
		let t = no(e);
		if (t !== null && n) return { ...e };
		let r = to.create(t);
		return to.assign(r, e);
	}
}
function jo(e, t = !1) {
	return Po(e) || lo(e) || !uo(e) || (go(e) > 1 && to.defineProperties(e, {
		set: No,
		add: No,
		clear: No,
		delete: No
	}), to.freeze(e), t && ho(e, (e, t) => {
		jo(t, !0);
	}, !1)), e;
}
function Mo() {
	eo(2);
}
var No = { [co]: Mo };
function Po(e) {
	return e === null || !wo(e) || to.isFrozen(e);
}
var Fo = "MapSet", Io = "Patches", Lo = "ArrayMethods", Ro = {};
function zo(e) {
	let t = Ro[e];
	return t || eo(0, e), t;
}
var Bo = (e) => !!Ro[e], Vo, Ho = () => Vo, Uo = (e, t) => ({
	drafts_: [],
	parent_: e,
	immer_: t,
	canAutoFreeze_: !0,
	unfinalizedDrafts_: 0,
	handledSet_: /* @__PURE__ */ new Set(),
	processedForPatches_: /* @__PURE__ */ new Set(),
	mapSetPlugin_: Bo(Fo) ? zo(Fo) : void 0,
	arrayMethodsPlugin_: Bo(Lo) ? zo(Lo) : void 0
});
function Wo(e, t) {
	t && (e.patchPlugin_ = zo(Io), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function Go(e) {
	Ko(e), e.drafts_.forEach(Jo), e.drafts_ = null;
}
function Ko(e) {
	e === Vo && (Vo = e.parent_);
}
var qo = (e) => Vo = Uo(Vo, e);
function Jo(e) {
	let t = e[$a];
	t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Yo(e, t) {
	t.unfinalizedDrafts_ = t.drafts_.length;
	let n = t.drafts_[0];
	if (e !== void 0 && e !== n) {
		n[$a].modified_ && (Go(t), eo(4)), uo(e) && (e = Xo(t, e));
		let { patchPlugin_: r } = t;
		r && r.generateReplacementPatches_(n[$a].base_, e, t);
	} else e = Xo(t, n);
	return Zo(t, e, !0), Go(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e === Za ? void 0 : e;
}
function Xo(e, t) {
	if (Po(t)) return t;
	let n = t[$a];
	if (!n) return as(t, e.handledSet_, e);
	if (!$o(n, e)) return t;
	if (!n.modified_) return n.base_;
	if (!n.finalized_) {
		let { callbacks_: t } = n;
		if (t) for (; t.length > 0;) t.pop()(e);
		rs(n, e);
	}
	return n.copy_;
}
function Zo(e, t, n = !1) {
	!e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && jo(t, n);
}
function Qo(e) {
	e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var $o = (e, t) => e.scope_ === t, es = [];
function ts(e, t, n, r) {
	let i = Oo(e), a = e.type_;
	if (r !== void 0 && vo(i, r, a) === t) {
		yo(i, r, n, a);
		return;
	}
	if (!e.draftLocations_) {
		let t = e.draftLocations_ = /* @__PURE__ */ new Map();
		ho(i, (e, n) => {
			if (lo(n)) {
				let r = t.get(n) || [];
				r.push(e), t.set(n, r);
			}
		});
	}
	let o = e.draftLocations_.get(t) ?? es;
	for (let e of o) yo(i, e, n, a);
}
function ns(e, t, n) {
	e.callbacks_.push(function(r) {
		let i = t;
		if (!i || !$o(i, r)) return;
		r.mapSetPlugin_?.fixSetContents(i);
		let a = ko(i);
		ts(e, i.draft_ ?? i, a, n), rs(i, r);
	});
}
function rs(e, t) {
	if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
		let { patchPlugin_: n } = t;
		if (n) {
			let r = n.getPath(e);
			r && n.generatePatches_(e, r, t);
		}
		Qo(e);
	}
}
function is(e, t, n) {
	let { scope_: r } = e;
	if (lo(n)) {
		let i = n[$a];
		$o(i, r) && i.callbacks_.push(function() {
			ms(e), ts(e, n, ko(i), t);
		});
	} else uo(n) && e.callbacks_.push(function() {
		let i = Oo(e);
		e.type_ === 3 ? i.has(n) && as(n, r.handledSet_, r) : vo(i, t, e.type_) === n && r.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && as(vo(e.copy_, t, e.type_), r.handledSet_, r);
	});
}
function as(e, t, n) {
	return !n.immer_.autoFreeze_ && n.unfinalizedDrafts_ < 1 || lo(e) || t.has(e) || !uo(e) || Po(e) || (t.add(e), ho(e, (r, i) => {
		if (lo(i)) {
			let t = i[$a];
			$o(t, n) && (yo(e, r, ko(t), e.type_), Qo(t));
		} else uo(i) && as(i, t, n);
	})), e;
}
function os(e, t) {
	let n = xo(e), r = {
		type_: +!!n,
		scope_: t ? t.scope_ : Ho(),
		modified_: !1,
		finalized_: !1,
		assigned_: void 0,
		parent_: t,
		base_: e,
		draft_: null,
		copy_: null,
		revoke_: null,
		isManual_: !1,
		callbacks_: void 0
	}, i = r, a = ss;
	n && (i = [r], a = cs);
	let { revoke: o, proxy: s } = Proxy.revocable(i, a);
	return r.draft_ = s, r.revoke_ = o, [s, r];
}
var ss = {
	get(e, t) {
		if (t === $a) return e;
		let n = e.scope_.arrayMethodsPlugin_, r = e.type_ === 1 && typeof t == "string";
		if (r && n?.isArrayOperationMethod(t)) return n.createMethodInterceptor(e, t);
		let i = Oo(e);
		if (!_o(i, t, e.type_)) return ds(e, i, t);
		let a = i[t];
		if (e.finalized_ || !uo(a) || r && e.operationMethod && n?.isMutatingArrayMethod(e.operationMethod) && Do(t)) return a;
		if (a === ls(e.base_, t) || us(e, t, a)) {
			ms(e);
			let n = e.type_ === 1 ? +t : t, r = gs(e.scope_, a, e, n);
			return e.copy_[n] = r;
		}
		return a;
	},
	has(e, t) {
		return t in Oo(e);
	},
	ownKeys(e) {
		return Reflect.ownKeys(Oo(e));
	},
	set(e, t, n) {
		let r = fs(Oo(e), t);
		if (r?.set) return r.set.call(e.draft_, n), !0;
		if (!e.modified_) {
			let r = ls(Oo(e), t), i = r?.[$a];
			if (i && i.base_ === n) return e.copy_[t] = n, e.assigned_.delete(t), !0;
			if (bo(n, r) && (n !== void 0 || _o(e.base_, t, e.type_))) return !0;
			ms(e), ps(e);
		}
		return e.copy_[t] === n && (n !== void 0 || _o(e.copy_, t, e.type_)) || Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_.set(t, !0), is(e, t, n)), !0;
	},
	deleteProperty(e, t) {
		return ms(e), ls(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), ps(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = Oo(e), r = Reflect.getOwnPropertyDescriptor(n, t);
		return r && {
			[so]: !0,
			[ao]: e.type_ !== 1 || t !== "length",
			[oo]: r[oo],
			[co]: n[t]
		};
	},
	defineProperty() {
		eo(11);
	},
	getPrototypeOf(e) {
		return no(e.base_);
	},
	setPrototypeOf() {
		eo(12);
	}
}, cs = {};
for (let e in ss) {
	let t = ss[e];
	cs[e] = function() {
		let e = arguments;
		return e[0] = e[0][0], t.apply(this, e);
	};
}
cs.deleteProperty = function(e, t) {
	return cs.set.call(this, e, t, void 0);
}, cs.set = function(e, t, n) {
	return ss.set.call(this, e[0], t, n, e[0]);
};
function ls(e, t) {
	let n = e[$a];
	return (n ? Oo(n) : e)[t];
}
function us(e, t, n) {
	return e.type_ !== 1 || !e.allIndicesReassigned_ || e.assigned_?.get(t) || !uo(n) || n[$a] ? !1 : e.baseRefs_.has(n);
}
function ds(e, t, n) {
	let r = fs(t, n);
	return r ? co in r ? r[co] : r.get?.call(e.draft_) : void 0;
}
function fs(e, t) {
	if (!(t in e)) return;
	let n = no(e);
	for (; n;) {
		let e = Object.getOwnPropertyDescriptor(n, t);
		if (e) return e;
		n = no(n);
	}
}
function ps(e) {
	e.modified_ || (e.modified_ = !0, e.parent_ && ps(e.parent_));
}
function ms(e) {
	e.copy_ ||= (e.assigned_ = /* @__PURE__ */ new Map(), Ao(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var hs = class {
	constructor(e) {
		this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (e, t, n) => {
			if (To(e) && !To(t)) {
				let n = t;
				t = e;
				let r = this;
				return function(e = n, ...i) {
					return r.produce(e, (e) => t.call(this, e, ...i));
				};
			}
			To(t) || eo(6), n !== void 0 && !To(n) && eo(7);
			let r;
			if (uo(e)) {
				let i = qo(this), a = gs(i, e, void 0), o = !0;
				try {
					r = t(a), o = !1;
				} finally {
					o ? Go(i) : Ko(i);
				}
				return Wo(i, n), Yo(r, i);
			}
			if (!e || !wo(e)) {
				if (r = t(e), r === void 0 && (r = e), r === Za && (r = void 0), this.autoFreeze_ && jo(r, !0), n) {
					let t = [], i = [];
					zo(Io).generateReplacementPatches_(e, r, {
						patches_: t,
						inversePatches_: i
					}), n(t, i);
				}
				return r;
			}
			eo(1, e);
		}, this.produceWithPatches = (e, t) => {
			if (To(e)) return (t, ...n) => this.produceWithPatches(t, (t) => e(t, ...n));
			let n, r;
			return [
				this.produce(e, t, (e, t) => {
					n = e, r = t;
				}),
				n,
				r
			];
		}, Eo(e?.autoFreeze) && this.setAutoFreeze(e.autoFreeze), Eo(e?.useStrictShallowCopy) && this.setUseStrictShallowCopy(e.useStrictShallowCopy), Eo(e?.useStrictIteration) && this.setUseStrictIteration(e.useStrictIteration);
	}
	createDraft(e) {
		uo(e) || eo(8), lo(e) && (e = _s(e));
		let t = qo(this), n = gs(t, e, void 0);
		return n[$a].isManual_ = !0, Ko(t), n;
	}
	finishDraft(e, t) {
		let n = e && e[$a];
		n && n.isManual_ || eo(9);
		let { scope_: r } = n;
		return Wo(r, t), Yo(void 0, r);
	}
	setAutoFreeze(e) {
		this.autoFreeze_ = e;
	}
	setUseStrictShallowCopy(e) {
		this.useStrictShallowCopy_ = e;
	}
	setUseStrictIteration(e) {
		this.useStrictIteration_ = e;
	}
	shouldUseStrictIteration() {
		return this.useStrictIteration_;
	}
	applyPatches(e, t) {
		let n;
		for (n = t.length - 1; n >= 0; n--) {
			let r = t[n];
			if (r.path.length === 0 && r.op === "replace") {
				e = r.value;
				break;
			}
		}
		n > -1 && (t = t.slice(n + 1));
		let r = zo(Io).applyPatches_;
		return lo(e) ? r(e, t) : this.produce(e, (e) => r(e, t));
	}
};
function gs(e, t, n, r) {
	let [i, a] = So(t) ? zo(Fo).proxyMap_(t, n) : Co(t) ? zo(Fo).proxySet_(t, n) : os(t, n);
	return (n?.scope_ ?? Ho()).drafts_.push(i), a.callbacks_ = n?.callbacks_ ?? [], a.key_ = r, n && r !== void 0 ? ns(n, a, r) : a.callbacks_.push(function(e) {
		e.mapSetPlugin_?.fixSetContents(a);
		let { patchPlugin_: t } = e;
		a.modified_ && t && t.generatePatches_(a, [], e);
	}), i;
}
function _s(e) {
	return lo(e) || eo(10, e), vs(e);
}
function vs(e) {
	if (!uo(e) || Po(e)) return e;
	let t = e[$a], n, r = !0;
	if (t) {
		if (!t.modified_) return t.base_;
		t.finalized_ = !0, n = Ao(e, t.scope_.immer_.useStrictShallowCopy_), r = t.scope_.immer_.shouldUseStrictIteration();
	} else n = Ao(e, !0);
	return ho(n, (e, t) => {
		yo(n, e, vs(t));
	}, r), t && (t.finalized_ = !1), n;
}
globalThis.Iterator?.from;
var ys = new hs().produce, H = (e) => e;
// node_modules/redux-thunk/dist/redux-thunk.mjs
function bs(e) {
	return ({ dispatch: t, getState: n }) => (r) => (i) => typeof i == "function" ? i(t, n, e) : r(i);
}
var xs = bs(), Ss = bs, Cs = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
	if (arguments.length !== 0) return typeof arguments[0] == "object" ? Ja : Ja.apply(null, arguments);
};
typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__;
function ws(e, t) {
	function n(...n) {
		if (t) {
			let r = t(...n);
			if (!r) throw Error(Mc(0));
			return {
				type: e,
				payload: r.payload,
				..."meta" in r && { meta: r.meta },
				..."error" in r && { error: r.error }
			};
		}
		return {
			type: e,
			payload: n[0]
		};
	}
	return n.toString = () => `${e}`, n.type = e, n.match = (t) => Xa(t) && t.type === e, n;
}
var Ts = class e extends Array {
	constructor(...t) {
		super(...t), Object.setPrototypeOf(this, e.prototype);
	}
	static get [Symbol.species]() {
		return e;
	}
	concat(...e) {
		return super.concat.apply(this, e);
	}
	prepend(...t) {
		return t.length === 1 && Array.isArray(t[0]) ? new e(...t[0].concat(this)) : new e(...t.concat(this));
	}
};
function Es(e) {
	return uo(e) ? ys(e, () => {}) : e;
}
function Ds(e, t, n) {
	return e.has(t) ? e.get(t) : e.set(t, n(t)).get(t);
}
function Os(e) {
	return typeof e == "boolean";
}
var ks = () => function(e) {
	let { thunk: t = !0, immutableCheck: n = !0, serializableCheck: r = !0, actionCreatorCheck: i = !0 } = e ?? {}, a = new Ts();
	return t && (Os(t) ? a.push(xs) : a.push(Ss(t.extraArgument))), a;
}, As = "RTK_autoBatch", U = () => (e) => ({
	payload: e,
	meta: { [As]: !0 }
}), js = (e) => (t) => {
	setTimeout(t, e);
}, Ms = (e, t) => (n) => {
	let r = !1, i = () => {
		r || (r = !0, cancelAnimationFrame(a), clearTimeout(o), n());
	}, a = e(i), o = setTimeout(i, t);
}, Ns = (e = { type: "raf" }) => (t) => (...n) => {
	let r = t(...n), i = !0, a = !1, o = !1, s = /* @__PURE__ */ new Set(), c = e.type === "tick" ? queueMicrotask : e.type === "raf" ? typeof window < "u" && window.requestAnimationFrame ? Ms(window.requestAnimationFrame, 100) : js(10) : e.type === "callback" ? e.queueNotification : js(e.timeout), l = () => {
		o = !1, a && (a = !1, s.forEach((e) => e()));
	};
	return Object.assign({}, r, {
		subscribe(e) {
			let t = r.subscribe(() => i && e());
			return s.add(e), () => {
				t(), s.delete(e);
			};
		},
		dispatch(e) {
			try {
				return i = !e?.meta?.[As], a = !i, a && (o || (o = !0, c(l))), r.dispatch(e);
			} finally {
				i = !0;
			}
		}
	});
}, Ps = (e) => function(t) {
	let { autoBatch: n = !0 } = t ?? {}, r = new Ts(e);
	return n && r.push(Ns(typeof n == "object" ? n : void 0)), r;
};
function Fs(e) {
	let t = ks(), { reducer: n = void 0, middleware: r, devTools: i = !0, duplicateMiddlewareCheck: a = !0, preloadedState: o = void 0, enhancers: s = void 0 } = e || {}, c;
	if (typeof n == "function") c = n;
	else if (Wa(n)) c = qa(n);
	else throw Error(Mc(1));
	let l;
	l = typeof r == "function" ? r(t) : t();
	let u = Ja;
	i && (u = Cs({
		trace: !1,
		...typeof i == "object" && i
	}));
	let d = Ps(Ya(...l)), f = typeof s == "function" ? s(d) : d(), p = u(...f);
	return Ga(c, o, p);
}
function Is(e) {
	let t = {}, n = [], r, i = {
		addCase(e, n) {
			let r = typeof e == "string" ? e : e.type;
			if (!r) throw Error(Mc(28));
			if (r in t) throw Error(Mc(29));
			return t[r] = n, i;
		},
		addAsyncThunk(e, r) {
			return r.pending && (t[e.pending.type] = r.pending), r.rejected && (t[e.rejected.type] = r.rejected), r.fulfilled && (t[e.fulfilled.type] = r.fulfilled), r.settled && n.push({
				matcher: e.settled,
				reducer: r.settled
			}), i;
		},
		addMatcher(e, t) {
			return n.push({
				matcher: e,
				reducer: t
			}), i;
		},
		addDefaultCase(e) {
			return r = e, i;
		}
	};
	return e(i), [
		t,
		n,
		r
	];
}
function Ls(e) {
	return typeof e == "function";
}
function Rs(e, t) {
	let [n, r, i] = Is(t), a;
	if (Ls(e)) a = () => Es(e());
	else {
		let t = Es(e);
		a = () => t;
	}
	function o(e = a(), t) {
		let o = [n[t.type], ...r.filter(({ matcher: e }) => e(t)).map(({ reducer: e }) => e)];
		return o.filter((e) => !!e).length === 0 && (o = [i]), o.reduce((e, n) => {
			if (n) {
				if (lo(e)) {
					let r = n(e, t);
					return r === void 0 ? e : r;
				}
				if (uo(e)) return ys(e, (e) => n(e, t));
				{
					let r = n(e, t);
					if (r === void 0) {
						if (e === null) return e;
						throw Error("A case reducer on a non-draftable value must not return undefined");
					}
					return r;
				}
			}
			return e;
		}, e);
	}
	return o.getInitialState = a, o;
}
var zs = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", Bs = (e = 21) => {
	let t = "", n = e;
	for (; n--;) t += zs[Math.random() * 64 | 0];
	return t;
}, Vs = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Hs(e, t) {
	return `${e}/${t}`;
}
function Us({ creators: e } = {}) {
	let t = e?.asyncThunk?.[Vs];
	return function(e) {
		let { name: n, reducerPath: r = n } = e;
		if (!n) throw Error(Mc(11));
		let i = (typeof e.reducers == "function" ? e.reducers(Ks()) : e.reducers) || {}, a = Object.keys(i), o = {
			sliceCaseReducersByName: {},
			sliceCaseReducersByType: {},
			actionCreators: {},
			sliceMatchers: []
		}, s = {
			addCase(e, t) {
				let n = typeof e == "string" ? e : e.type;
				if (!n) throw Error(Mc(12));
				if (n in o.sliceCaseReducersByType) throw Error(Mc(13));
				return o.sliceCaseReducersByType[n] = t, s;
			},
			addMatcher(e, t) {
				return o.sliceMatchers.push({
					matcher: e,
					reducer: t
				}), s;
			},
			exposeAction(e, t) {
				return o.actionCreators[e] = t, s;
			},
			exposeCaseReducer(e, t) {
				return o.sliceCaseReducersByName[e] = t, s;
			}
		};
		a.forEach((r) => {
			let a = i[r], o = {
				reducerName: r,
				type: Hs(n, r),
				createNotation: typeof e.reducers == "function"
			};
			Js(a) ? Xs(o, a, s, t) : qs(o, a, s);
		});
		function c() {
			let [t = {}, n = [], r = void 0] = typeof e.extraReducers == "function" ? Is(e.extraReducers) : [e.extraReducers], i = {
				...t,
				...o.sliceCaseReducersByType
			};
			return Rs(e.initialState, (e) => {
				for (let t in i) e.addCase(t, i[t]);
				for (let t of o.sliceMatchers) e.addMatcher(t.matcher, t.reducer);
				for (let t of n) e.addMatcher(t.matcher, t.reducer);
				r && e.addDefaultCase(r);
			});
		}
		let l = (e) => e, u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new WeakMap(), f;
		function p(e, t) {
			return f ||= c(), f(e, t);
		}
		function m() {
			return f ||= c(), f.getInitialState();
		}
		function h(t, n = !1) {
			function r(e) {
				let i = e[t];
				return i === void 0 && n && (i = Ds(d, r, m)), i;
			}
			function i(t = l) {
				return Ds(Ds(u, n, () => /* @__PURE__ */ new WeakMap()), t, () => {
					let r = {};
					for (let [i, a] of Object.entries(e.selectors ?? {})) r[i] = Ws(a, t, () => Ds(d, t, m), n);
					return r;
				});
			}
			return {
				reducerPath: t,
				getSelectors: i,
				get selectors() {
					return i(r);
				},
				selectSlice: r
			};
		}
		let g = {
			name: n,
			reducer: p,
			actions: o.actionCreators,
			caseReducers: o.sliceCaseReducersByName,
			getInitialState: m,
			...h(r),
			injectInto(e, { reducerPath: t, ...n } = {}) {
				let i = t ?? r;
				return e.inject({
					reducerPath: i,
					reducer: p
				}, n), {
					...g,
					...h(i, !0)
				};
			}
		};
		return g;
	};
}
function Ws(e, t, n, r) {
	function i(i, ...a) {
		let o = t(i);
		return o === void 0 && r && (o = n()), e(o, ...a);
	}
	return i.unwrapped = e, i;
}
var Gs = /* @__PURE__ */ Us();
function Ks() {
	function e(e, t) {
		return {
			_reducerDefinitionType: "asyncThunk",
			payloadCreator: e,
			...t
		};
	}
	return e.withTypes = () => e, {
		reducer(e) {
			return Object.assign({ [e.name](...t) {
				return e(...t);
			} }[e.name], { _reducerDefinitionType: "reducer" });
		},
		preparedReducer(e, t) {
			return {
				_reducerDefinitionType: "reducerWithPrepare",
				prepare: e,
				reducer: t
			};
		},
		asyncThunk: e
	};
}
function qs({ type: e, reducerName: t, createNotation: n }, r, i) {
	let a, o;
	if ("reducer" in r) {
		if (n && !Ys(r)) throw Error(Mc(17));
		a = r.reducer, o = r.prepare;
	} else a = r;
	i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? ws(e, o) : ws(e));
}
function Js(e) {
	return e._reducerDefinitionType === "asyncThunk";
}
function Ys(e) {
	return e._reducerDefinitionType === "reducerWithPrepare";
}
function Xs({ type: e, reducerName: t }, n, r, i) {
	if (!i) throw Error(Mc(18));
	let { payloadCreator: a, fulfilled: o, pending: s, rejected: c, settled: l, options: u } = n, d = i(e, a, u);
	r.exposeAction(t, d), o && r.addCase(d.fulfilled, o), s && r.addCase(d.pending, s), c && r.addCase(d.rejected, c), l && r.addMatcher(d.settled, l), r.exposeCaseReducer(t, {
		fulfilled: o || Zs,
		pending: s || Zs,
		rejected: c || Zs,
		settled: l || Zs
	});
}
function Zs() {}
var Qs = "task", $s = "listener", ec = "completed", tc = "cancelled", nc = `task-${tc}`, rc = `task-${ec}`, ic = `${$s}-${tc}`, ac = `${$s}-${ec}`, oc = class {
	constructor(e) {
		this.code = e, this.message = `${Qs} ${tc} (reason: ${e})`;
	}
	code;
	name = "TaskAbortError";
	message;
}, sc = (e, t) => {
	if (typeof e != "function") throw TypeError(Mc(32));
}, cc = () => {}, lc = (e, t = cc) => (e.catch(t), e), uc = (e, t) => (e.addEventListener("abort", t, { once: !0 }), () => e.removeEventListener("abort", t)), dc = (e) => {
	if (e.aborted) throw new oc(e.reason);
};
function fc(e, t) {
	let n = cc;
	return new Promise((r, i) => {
		let a = () => i(new oc(e.reason));
		e.aborted ? a() : (n = uc(e, a), t.finally(() => n()).then(r, i));
	}).finally(() => {
		n = cc;
	});
}
var pc = async (e, t) => {
	try {
		return await Promise.resolve(), {
			status: "ok",
			value: await e()
		};
	} catch (e) {
		return {
			status: e instanceof oc ? "cancelled" : "rejected",
			error: e
		};
	} finally {
		t?.();
	}
}, mc = (e) => (t) => lc(fc(e, t).then((t) => (dc(e), t))), hc = (e) => {
	let t = mc(e);
	return (e) => t(new Promise((t) => setTimeout(t, e)));
}, { assign: gc } = Object, _c = {}, vc = "listenerMiddleware", yc = (e, t) => {
	let n = (t) => uc(e, () => t.abort(e.reason));
	return (r, i) => {
		sc(r, "taskExecutor");
		let a = new AbortController();
		n(a);
		let o = pc(async () => {
			dc(e), dc(a.signal);
			let t = await r({
				pause: mc(a.signal),
				delay: hc(a.signal),
				signal: a.signal
			});
			return dc(a.signal), t;
		}, () => a.abort(rc));
		return i?.autoJoin && t.push(o.catch(cc)), {
			result: mc(e)(o),
			cancel() {
				a.abort(nc);
			}
		};
	};
}, bc = (e, t) => {
	let n = async (n, r) => {
		dc(t);
		let i = () => {}, a = [new Promise((t, r) => {
			let a = e({
				predicate: n,
				effect: (e, n) => {
					n.unsubscribe(), t([
						e,
						n.getState(),
						n.getOriginalState()
					]);
				}
			});
			i = () => {
				a(), r();
			};
		})];
		r != null && a.push(new Promise((e) => setTimeout(e, r, null)));
		try {
			let e = await fc(t, Promise.race(a));
			return dc(t), e;
		} finally {
			i();
		}
	};
	return ((e, t) => lc(n(e, t)));
}, xc = (e) => {
	let { type: t, actionCreator: n, matcher: r, predicate: i, effect: a } = e;
	if (t) i = ws(t).match;
	else if (n) t = n.type, i = n.match;
	else if (r) i = r;
	else if (!i) throw Error(Mc(21));
	return sc(a, "options.listener"), {
		predicate: i,
		type: t,
		effect: a
	};
}, Sc = /* @__PURE__ */ gc((e) => {
	let { type: t, predicate: n, effect: r } = xc(e);
	return {
		id: Bs(),
		effect: r,
		type: t,
		predicate: n,
		pending: /* @__PURE__ */ new Set(),
		unsubscribe: () => {
			throw Error(Mc(22));
		}
	};
}, { withTypes: () => Sc }), Cc = (e, t) => {
	let { type: n, effect: r, predicate: i } = xc(t);
	return Array.from(e.values()).find((e) => (typeof n == "string" ? e.type === n : e.predicate === i) && e.effect === r);
}, wc = (e) => {
	e.pending.forEach((e) => {
		e.abort(ic);
	});
}, Tc = (e, t) => () => {
	for (let e of t.keys()) wc(e);
	e.clear();
}, Ec = (e, t, n) => {
	try {
		e(t, n);
	} catch (e) {
		setTimeout(() => {
			throw e;
		}, 0);
	}
}, Dc = /* @__PURE__ */ gc(/* @__PURE__ */ ws(`${vc}/add`), { withTypes: () => Dc }), Oc = /* @__PURE__ */ ws(`${vc}/removeAll`), kc = /* @__PURE__ */ gc(/* @__PURE__ */ ws(`${vc}/remove`), { withTypes: () => kc }), Ac = (...e) => {
	console.error(`${vc}/error`, ...e);
}, jc = (e = {}) => {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = (e) => {
		let t = n.get(e) ?? 0;
		n.set(e, t + 1);
	}, i = (e) => {
		let t = n.get(e) ?? 1;
		t === 1 ? n.delete(e) : n.set(e, t - 1);
	}, { extra: a, onError: o = Ac } = e;
	sc(o, "onError");
	let s = (e) => (e.unsubscribe = () => t.delete(e.id), t.set(e.id, e), (t) => {
		e.unsubscribe(), t?.cancelActive && wc(e);
	}), c = ((e) => {
		let n = Cc(t, e) ?? Sc(e);
		return s(n);
	});
	gc(c, { withTypes: () => c });
	let l = (e) => {
		let n = Cc(t, e);
		return n && (n.unsubscribe(), e.cancelActive && wc(n)), !!n;
	};
	gc(l, { withTypes: () => l });
	let u = async (e, n, s, l) => {
		let u = new AbortController(), d = bc(c, u.signal), f = [];
		try {
			e.pending.add(u), r(e), await Promise.resolve(e.effect(n, gc({}, s, {
				getOriginalState: l,
				condition: (e, t) => d(e, t).then(Boolean),
				take: d,
				delay: hc(u.signal),
				pause: mc(u.signal),
				extra: a,
				signal: u.signal,
				fork: yc(u.signal, f),
				unsubscribe: e.unsubscribe,
				subscribe: () => {
					t.set(e.id, e);
				},
				cancelActiveListeners: () => {
					e.pending.forEach((e, t, n) => {
						e !== u && (e.abort(ic), n.delete(e));
					});
				},
				cancel: () => {
					u.abort(ic), e.pending.delete(u);
				},
				throwIfCancelled: () => {
					dc(u.signal);
				}
			})));
		} catch (e) {
			e instanceof oc || Ec(o, e, { raisedBy: "effect" });
		} finally {
			await Promise.all(f), u.abort(ac), i(e), e.pending.delete(u);
		}
	}, d = Tc(t, n);
	return {
		middleware: (e) => (n) => (r) => {
			if (!Xa(r)) return n(r);
			if (Dc.match(r)) return c(r.payload);
			if (Oc.match(r)) {
				d();
				return;
			}
			if (kc.match(r)) return l(r.payload);
			let i = e.getState(), a = () => {
				if (i === _c) throw Error(Mc(23));
				return i;
			}, s;
			try {
				if (s = n(r), t.size > 0) {
					let n = e.getState(), s = Array.from(t.values());
					for (let t of s) {
						let s = !1;
						try {
							s = t.predicate(r, n, i);
						} catch (e) {
							s = !1, Ec(o, e, { raisedBy: "predicate" });
						}
						s && u(t, r, e, a);
					}
				}
			} finally {
				i = _c;
			}
			return s;
		},
		startListening: c,
		stopListening: l,
		clearListeners: d
	};
};
function Mc(e) {
	return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
// node_modules/recharts/es6/state/layoutSlice.js
var Nc = Gs({
	name: "chartLayout",
	initialState: {
		layoutType: "horizontal",
		width: 0,
		height: 0,
		margin: {
			top: 5,
			right: 5,
			bottom: 5,
			left: 5
		},
		scale: 1
	},
	reducers: {
		setLayout(e, t) {
			e.layoutType = t.payload;
		},
		setChartSize(e, t) {
			e.width = t.payload.width, e.height = t.payload.height;
		},
		setMargin(e, t) {
			e.margin.top = t.payload.top ?? 0, e.margin.right = t.payload.right ?? 0, e.margin.bottom = t.payload.bottom ?? 0, e.margin.left = t.payload.left ?? 0;
		},
		setScale(e, t) {
			e.scale = t.payload;
		}
	}
}), Pc = Nc.actions, Fc = Pc.setMargin, Ic = Pc.setLayout, Lc = Pc.setChartSize, Rc = Pc.setScale, zc = Nc.reducer;
// node_modules/recharts/es6/util/getSliced.js
function Bc(e, t, n) {
	return Array.isArray(e) && e && t + n !== 0 ? e.slice(t, n + 1) : e;
}
// node_modules/recharts/es6/util/isWellBehavedNumber.js
function W(e) {
	return Number.isFinite(e);
}
function Vc(e) {
	return typeof e == "number" && e > 0 && Number.isFinite(e);
}
// node_modules/recharts/es6/util/ChartUtils.js
function Hc(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Uc(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Hc(Object(n), !0).forEach(function(t) {
			Wc(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hc(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Wc(e, t, n) {
	return (t = Gc(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Gc(e) {
	var t = Kc(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Kc(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function G(e, t, n) {
	return L(e) || L(t) ? n : _t(t) ? lt(e, t, n) : typeof t == "function" ? t(e) : n;
}
var qc = (e, t, n) => {
	if (t && n) {
		var r = n.width, i = n.height, a = t.align, o = t.verticalAlign, s = t.layout, c = t.position, l = t.offset, u = l === void 0 ? 0 : l;
		if (c != null) {
			if (Pt(c)) {
				if (c === "top" && F(e.top)) return Uc(Uc({}, e), {}, { top: e.top + (i || 0) + u });
				if (c === "bottom" && F(e.bottom)) return Uc(Uc({}, e), {}, { bottom: e.bottom + (i || 0) + u });
				if (c === "left" && F(e.left)) return Uc(Uc({}, e), {}, { left: e.left + (r || 0) + u });
				if (c === "right" && F(e.right)) return Uc(Uc({}, e), {}, { right: e.right + (r || 0) + u });
			}
			return e;
		}
		if ((s === "vertical" || s === "horizontal" && o === "middle") && a !== "center" && F(e[a])) return Uc(Uc({}, e), {}, { [a]: e[a] + (r || 0) });
		if ((s === "horizontal" || s === "vertical" && a === "center") && o !== "middle" && F(e[o])) return Uc(Uc({}, e), {}, { [o]: e[o] + (i || 0) });
	}
	return e;
}, Jc = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", Yc = (e, t, n, r) => {
	if (r) return e.map((e) => e.coordinate);
	var i, a, o = e.map((e) => (e.coordinate === t && (i = !0), e.coordinate === n && (a = !0), e.coordinate));
	return i || o.push(t), a || o.push(n), o;
}, Xc = (e, t, n) => {
	if (!e) return null;
	var r = e.duplicateDomain, i = e.type, a = e.range, o = e.scale, s = e.realScaleType, c = e.isCategorical, l = e.categoricalDomain, u = e.tickCount, d = e.ticks, f = e.niceTicks, p = e.axisType;
	if (!o) return null;
	var m = s === "scaleBand" && o.bandwidth ? o.bandwidth() / 2 : 2, h = (t || n) && i === "category" && o.bandwidth ? o.bandwidth() / m : 0;
	return h = p === "angleAxis" && a && a.length >= 2 ? mt(a[0] - a[1]) * 2 * h : h, t && (d || f) ? (d || f || []).map((e, t) => {
		var n = r ? r.indexOf(e) : e, i = o.map(n);
		return W(i) ? {
			coordinate: i + h,
			value: e,
			offset: h,
			index: t
		} : null;
	}).filter(wt) : c && l ? l.map((e, t) => {
		var n = o.map(e);
		return W(n) ? {
			coordinate: n + h,
			value: e,
			index: t,
			offset: h
		} : null;
	}).filter(wt) : o.ticks && !n && u != null ? o.ticks(u).map((e, t) => {
		var n = o.map(e);
		return W(n) ? {
			coordinate: n + h,
			value: e,
			index: t,
			offset: h
		} : null;
	}).filter(wt) : o.domain().map((e, t) => {
		var n = o.map(e);
		return W(n) ? {
			coordinate: n + h,
			value: r ? r[e] : e,
			index: t,
			offset: h
		} : null;
	}).filter(wt);
}, Zc = (e, t) => {
	if (!t || t.length !== 2 || !F(t[0]) || !F(t[1])) return e;
	var n = Math.min(t[0], t[1]), r = Math.max(t[0], t[1]), i = [e[0], e[1]];
	return (!F(e[0]) || e[0] < n) && (i[0] = n), (!F(e[1]) || e[1] > r) && (i[1] = r), i[0] > r && (i[0] = r), i[1] < n && (i[1] = n), i;
}, Qc = {
	sign: (e) => {
		var t = e.length;
		if (!(t <= 0)) {
			var n = e[0]?.length;
			if (!(n == null || n <= 0)) for (var r = 0; r < n; ++r) for (var i = 0, a = 0, o = 0; o < t; ++o) {
				var s = e[o]?.[r];
				if (s != null) {
					var c = s[1], l = s[0], u = ht(c) ? l : c;
					u >= 0 ? (s[0] = i, i += u, s[1] = i) : (s[0] = a, a += u, s[1] = a);
				}
			}
		}
	},
	expand: rr,
	none: Qn,
	silhouette: ir,
	wiggle: ar,
	positive: (e) => {
		var t = e.length;
		if (!(t <= 0)) {
			var n = e[0]?.length;
			if (!(n == null || n <= 0)) for (var r = 0; r < n; ++r) for (var i = 0, a = 0; a < t; ++a) {
				var o = e[a]?.[r];
				if (o != null) {
					var s = ht(o[1]) ? o[0] : o[1];
					s >= 0 ? (o[0] = i, i += s, o[1] = i) : (o[0] = 0, o[1] = 0);
				}
			}
		}
	}
}, $c = (e, t, n) => {
	var r = Qc[n] ?? Qn, i = nr().keys(t).value((e, t) => Number(G(e, t, 0))).order($n).offset(r)(e);
	return i.forEach((n, r) => {
		n.forEach((n, i) => {
			var a = G(e[i], t[r], 0);
			Array.isArray(a) && a.length === 2 && F(a[0]) && F(a[1]) && (n[0] = a[0], n[1] = a[1]);
		});
	}), i;
};
function el(e) {
	return e == null ? void 0 : String(e);
}
function tl(e) {
	var t = e.axis, n = e.ticks, r = e.bandSize, i = e.entry, a = e.index, o = e.dataKey;
	if (t.type === "category") {
		if (!t.allowDuplicatedCategory && t.dataKey && !L(i[t.dataKey])) {
			var s = St(n, "value", i[t.dataKey]);
			if (s) return s.coordinate + r / 2;
		}
		return n != null && n[a] ? n[a].coordinate + r / 2 : null;
	}
	var c = G(i, L(o) ? t.dataKey : o), l = t.scale.map(c);
	return F(l) ? l : null;
}
var nl = (e) => {
	var t = e.axis, n = e.ticks, r = e.offset, i = e.bandSize, a = e.entry, o = e.index;
	if (t.type === "category") return n[o] ? n[o].coordinate + r : null;
	var s = G(a, t.dataKey, t.scale.domain()[o]);
	if (L(s)) return null;
	var c = t.scale.map(s);
	return F(c) ? c - i / 2 + r : null;
}, rl = (e) => {
	var t = e.numericAxis, n = t.scale.domain();
	if (t.type === "number") {
		var r = Math.min(n[0], n[1]), i = Math.max(n[0], n[1]);
		return r <= 0 && i >= 0 ? 0 : i < 0 ? i : r;
	}
	return n[0];
}, il = (e) => {
	var t = e.flat(2).filter(F);
	return [Math.min(...t), Math.max(...t)];
}, al = (e) => [e[0] === Infinity ? 0 : e[0], e[1] === -Infinity ? 0 : e[1]], ol = (e, t, n) => {
	if (e != null && Object.keys(e).length !== 0) return al(Object.keys(e).reduce((r, i) => {
		var a = e[i];
		if (!a) return r;
		var o = a.stackedData.reduce((e, r) => {
			var i = il(Bc(r, t, n));
			return !W(i[0]) || !W(i[1]) ? e : [Math.min(e[0], i[0]), Math.max(e[1], i[1])];
		}, [Infinity, -Infinity]);
		return [Math.min(o[0], r[0]), Math.max(o[1], r[1])];
	}, [Infinity, -Infinity]));
}, sl = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, cl = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, ll = (e, t, n) => {
	if (e && e.scale && e.scale.bandwidth) {
		var r = e.scale.bandwidth();
		if (!n || r > 0) return r;
	}
	if (e && t && t.length >= 2) {
		for (var i = Ta(t, (e) => e.coordinate), a = [], o = 0, s = 1, c = i.length; s < c; s++) {
			var l = (i[s]?.coordinate || 0) - (i[s - 1]?.coordinate || 0);
			a.push(l), o = Math.max(l, o);
		}
		var u = o * 1e-4, d = Infinity;
		for (var f of a) f > u && (d = Math.min(f, d));
		return d === Infinity ? 0 : d;
	}
	return n ? void 0 : 0;
};
function ul(e) {
	var t = e.tooltipEntrySettings, n = e.dataKey, r = e.payload, i = e.value, a = e.name;
	return Uc(Uc({}, t), {}, {
		dataKey: n,
		payload: r,
		value: i,
		name: a
	});
}
function dl(e, t) {
	if (e != null) return String(e);
	if (typeof t == "string") return t;
}
var fl = (e, t) => {
	if (t === "horizontal") return e.relativeX;
	if (t === "vertical") return e.relativeY;
}, pl = (e, t) => t === "centric" ? e.angle : e.radius, ml = (e) => e.layout.width, hl = (e) => e.layout.height, gl = (e) => e.layout.scale, _l = (e) => e.layout.margin, vl = V((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), yl = V((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), bl = "data-recharts-item-index", xl = "data-recharts-item-id";
// node_modules/recharts/es6/state/selectors/selectChartOffsetInternal.js
function Sl(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Cl(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Sl(Object(n), !0).forEach(function(t) {
			wl(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Sl(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function wl(e, t, n) {
	return (t = Tl(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Tl(e) {
	var t = El(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function El(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Dl = (e) => e.brush.height;
function Ol(e) {
	return yl(e).reduce((e, t) => t.orientation === "left" && !t.mirror && !t.hide ? e + (typeof t.width == "number" ? t.width : 60) : e, 0);
}
function kl(e) {
	return yl(e).reduce((e, t) => t.orientation === "right" && !t.mirror && !t.hide ? e + (typeof t.width == "number" ? t.width : 60) : e, 0);
}
function Al(e) {
	return vl(e).reduce((e, t) => t.orientation === "top" && !t.mirror && !t.hide ? e + (typeof t.height == "number" ? t.height : 30) : e, 0);
}
function jl(e) {
	return vl(e).reduce((e, t) => t.orientation === "bottom" && !t.mirror && !t.hide ? e + (typeof t.height == "number" ? t.height : 30) : e, 0);
}
var Ml = V([
	ml,
	hl,
	_l,
	Dl,
	Ol,
	kl,
	Al,
	jl,
	Ea,
	Da
], (e, t, n, r, i, a, o, s, c, l) => {
	var u = {
		left: (n.left || 0) + i,
		right: (n.right || 0) + a
	}, d = Cl(Cl({}, {
		top: (n.top || 0) + o,
		bottom: (n.bottom || 0) + s
	}), u), f = d.bottom;
	d.bottom += r, d = qc(d, c, l);
	var p = e - d.left - d.right, m = t - d.top - d.bottom;
	return Cl(Cl({ brushBottom: f }, d), {}, {
		width: Math.max(p, 0),
		height: Math.max(m, 0)
	});
}), Nl = V(Ml, (e) => ({
	x: e.left,
	y: e.top,
	width: e.width,
	height: e.height
})), Pl = V(ml, hl, (e, t) => ({
	x: 0,
	y: 0,
	width: e,
	height: t
})), Fl = /*#__PURE__*/ (0, P.createContext)(null), Il = () => (0, P.useContext)(Fl) != null, Ll = (e) => e.brush, Rl = V([
	Ll,
	Ml,
	_l
], (e, t, n) => ({
	height: e.height,
	x: F(e.x) ? e.x : t.left,
	y: F(e.y) ? e.y : t.top + t.height + t.brushBottom - (n?.bottom || 0),
	width: F(e.width) ? e.width : t.width
}));
// node_modules/es-toolkit/dist/function/debounce.mjs
function zl(e, t, { signal: n, edges: r } = {}) {
	let i, a = null, o = r != null && r.includes("leading"), s = r == null || r.includes("trailing"), c = () => {
		a !== null && (e.apply(i, a), i = void 0, a = null);
	}, l = () => {
		s && c(), p();
	}, u = null, d = () => {
		u != null && clearTimeout(u), u = setTimeout(() => {
			u = null, l();
		}, t);
	}, f = () => {
		u !== null && (clearTimeout(u), u = null);
	}, p = () => {
		f(), i = void 0, a = null;
	}, m = () => {
		c();
	}, h = function(...e) {
		if (n?.aborted) return;
		i = this, a = e;
		let t = u == null;
		d(), o && t && c();
	};
	return h.schedule = d, h.cancel = p, h.flush = m, n?.addEventListener("abort", p, { once: !0 }), h;
}
// node_modules/es-toolkit/dist/compat/function/debounce.mjs
function Bl(e, t = 0, n = {}) {
	typeof n != "object" && (n = {});
	let { leading: r = !1, trailing: i = !0, maxWait: a } = n, o = [, ,];
	r && (o[0] = "leading"), i && (o[1] = "trailing");
	let s, c = null, l = zl(function(...t) {
		s = e.apply(this, t), c = null;
	}, t, { edges: o }), u = function(...t) {
		return a != null && (c === null && (c = Date.now()), Date.now() - c >= a) ? ((r || i) && (s = e.apply(this, t)), c = Date.now(), l.cancel(), l.schedule(), s) : (l.apply(this, t), s);
	};
	return u.cancel = l.cancel, u.flush = () => (l.flush(), s), u;
}
// node_modules/es-toolkit/dist/compat/function/throttle.mjs
function Vl(e, t = 0, n = {}) {
	let { leading: r = !0, trailing: i = !0 } = n;
	return Bl(e, t, {
		leading: r,
		maxWait: t,
		trailing: i
	});
}
// node_modules/recharts/es6/util/LogUtils.js
var Hl = function(e, t) {
	var n = [...arguments].slice(2);
	if (typeof console < "u" && console.warn && (t === void 0 && console.warn("LogUtils requires an error message argument"), !e)) {
		if (t === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
		else {
			var r = 0;
			console.warn(t.replace(/%s/g, () => n[r++]));
		}
	}
}, Ul = {
	width: "100%",
	height: "100%",
	debounce: 0,
	minWidth: 0,
	initialDimension: {
		width: -1,
		height: -1
	}
}, Wl = (e, t, n) => {
	var r = n.width, i = r === void 0 ? Ul.width : r, a = n.height, o = a === void 0 ? Ul.height : a, s = n.aspect, c = n.maxHeight, l = gt(i) ? e : Number(i), u = gt(o) ? t : Number(o);
	return s && s > 0 && (l ? u = l / s : u && (l = u * s), c && u != null && u > c && (u = c)), {
		calculatedWidth: l,
		calculatedHeight: u
	};
}, Gl = {
	width: 0,
	height: 0,
	overflow: "visible"
}, Kl = {
	width: 0,
	overflowX: "visible"
}, ql = {
	height: 0,
	overflowY: "visible"
}, Jl = {}, Yl = (e) => {
	var t = e.width, n = e.height, r = gt(t), i = gt(n);
	return r && i ? Gl : r ? Kl : i ? ql : Jl;
};
function Xl(e) {
	var t = e.width, n = e.height, r = e.aspect, i = t, a = n;
	return i === void 0 && a === void 0 ? (i = Ul.width, a = Ul.height) : i === void 0 ? i = r && r > 0 ? void 0 : Ul.width : a === void 0 && (a = r && r > 0 ? void 0 : Ul.height), {
		width: i,
		height: a
	};
}
// node_modules/recharts/es6/component/ResponsiveContainer.js
var Zl = [
	"aspect",
	"initialDimension",
	"width",
	"height",
	"minWidth",
	"minHeight",
	"maxHeight",
	"children",
	"debounce",
	"id",
	"className",
	"onResize",
	"style"
];
function Ql() {
	return Ql = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Ql.apply(null, arguments);
}
function $l(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function eu(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? $l(Object(n), !0).forEach(function(t) {
			tu(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $l(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function tu(e, t, n) {
	return (t = nu(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function nu(e) {
	var t = ru(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ru(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function iu(e, t) {
	return lu(e) || cu(e, t) || ou(e, t) || au();
}
function au() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ou(e, t) {
	if (e) {
		if (typeof e == "string") return su(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? su(e, t) : void 0;
	}
}
function su(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function cu(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function lu(e) {
	if (Array.isArray(e)) return e;
}
function uu(e, t) {
	if (e == null) return {};
	var n, r, i = du(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function du(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var fu = /*#__PURE__*/ (0, P.createContext)(Ul.initialDimension);
function pu(e) {
	return Vc(e.width) && Vc(e.height);
}
function mu(e) {
	var t = e.children, n = e.width, r = e.height, i = (0, P.useMemo)(() => ({
		width: n,
		height: r
	}), [n, r]);
	return pu(i) ? /*#__PURE__*/ P.createElement(fu.Provider, { value: i }, t) : null;
}
var hu = () => (0, P.useContext)(fu), gu = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.aspect, r = e.initialDimension, i = r === void 0 ? Ul.initialDimension : r, a = e.width, o = e.height, s = e.minWidth, c = s === void 0 ? Ul.minWidth : s, u = e.minHeight, d = e.maxHeight, f = e.children, p = e.debounce, m = p === void 0 ? Ul.debounce : p, h = e.id, g = e.className, _ = e.onResize, v = e.style, y = v === void 0 ? {} : v, b = uu(e, Zl), x = (0, P.useRef)(null), S = (0, P.useRef)();
	S.current = _, (0, P.useImperativeHandle)(t, () => x.current);
	var C = iu((0, P.useState)({
		containerWidth: i.width,
		containerHeight: i.height
	}), 2), w = C[0], T = C[1], E = (0, P.useCallback)((e, t) => {
		T((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []);
	(0, P.useEffect)(() => {
		if (x.current == null || typeof ResizeObserver > "u") return Tt;
		var e = (e) => {
			var t, n = e[0];
			if (n != null) {
				var r = n.contentRect, i = r.width, a = r.height;
				E(i, a), (t = S.current) == null || t.call(S, i, a);
			}
		};
		m > 0 && (e = Vl(e, m, {
			trailing: !0,
			leading: !1
		}));
		var t = new ResizeObserver(e), n = x.current.getBoundingClientRect(), r = n.width, i = n.height;
		return E(r, i), t.observe(x.current), () => {
			t.disconnect();
		};
	}, [E, m]);
	var D = w.containerWidth, O = w.containerHeight;
	Hl(!n || n > 0, "The aspect(%s) must be greater than zero.", n);
	var k = Wl(D, O, {
		width: a,
		height: o,
		aspect: n,
		maxHeight: d
	}), A = k.calculatedWidth, j = k.calculatedHeight;
	return Hl(D < 0 || O < 0 || A != null && A > 0 || j != null && j > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", A, j, a, o, c, u, n), /*#__PURE__*/ P.createElement("div", Ql({
		id: h ? `${h}` : void 0,
		className: l("recharts-responsive-container", g),
		style: eu(eu({}, y), {}, {
			width: a,
			height: o,
			minWidth: c,
			minHeight: u,
			maxHeight: d
		}),
		ref: x
	}, b), /*#__PURE__*/ P.createElement("div", { style: Yl({
		width: a,
		height: o
	}) }, /*#__PURE__*/ P.createElement(mu, {
		width: A,
		height: j
	}, f)));
}), _u = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = hu();
	if (Vc(n.width) && Vc(n.height)) return e.children;
	var r = Xl({
		width: e.width,
		height: e.height,
		aspect: e.aspect
	}), i = r.width, a = r.height, o = Wl(void 0, void 0, {
		width: i,
		height: a,
		aspect: e.aspect,
		maxHeight: e.maxHeight
	}), s = o.calculatedWidth, c = o.calculatedHeight;
	return F(s) && F(c) ? /*#__PURE__*/ P.createElement(mu, {
		width: s,
		height: c
	}, e.children) : /*#__PURE__*/ P.createElement(gu, Ql({}, e, {
		width: i,
		height: a,
		ref: t
	}));
}), vu = () => {
	var e = Il(), t = B(Nl), n = B(Rl), r = B(Ll)?.padding;
	return !e || !n || !r ? t : {
		width: n.width - r.left - r.right,
		height: n.height - r.top - r.bottom,
		x: r.left,
		y: r.top
	};
}, yu = {
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	width: 0,
	height: 0,
	brushBottom: 0
}, bu = () => B(Ml) ?? yu, xu = () => B(ml), Su = () => B(hl), Cu = () => B((e) => e.layout.margin), K = (e) => e.layout.layoutType, wu = () => B(K), Tu = () => {
	var e = wu();
	if (e === "horizontal" || e === "vertical") return e;
}, Eu = (e) => {
	var t = e.layout.layoutType;
	if (t === "centric" || t === "radial") return t;
}, Du = () => B(Eu), Ou = () => wu() !== void 0, ku = (e) => {
	var t = z(), n = Il(), r = e.width, i = e.height, a = hu(), o = r, s = i;
	return a && (o = a.width > 0 ? a.width : r, s = a.height > 0 ? a.height : i), (0, P.useEffect)(() => {
		!n && Vc(o) && Vc(s) && t(Lc({
			width: o,
			height: s
		}));
	}, [
		t,
		n,
		o,
		s
	]), null;
}, Au = Gs({
	name: "legend",
	initialState: {
		settings: {
			layout: "horizontal",
			align: "center",
			verticalAlign: "bottom",
			itemSorter: "value",
			position: void 0,
			offset: 0
		},
		size: {
			width: 0,
			height: 0
		},
		payload: []
	},
	reducers: {
		setLegendSize(e, t) {
			e.size.width = t.payload.width, e.size.height = t.payload.height;
		},
		setLegendSettings(e, t) {
			e.settings.align = t.payload.align, e.settings.layout = t.payload.layout, e.settings.verticalAlign = t.payload.verticalAlign, e.settings.itemSorter = t.payload.itemSorter, e.settings.position = t.payload.position, e.settings.offset = t.payload.offset;
		},
		addLegendPayload: {
			reducer(e, t) {
				e.payload.push(H(t.payload));
			},
			prepare: U()
		},
		replaceLegendPayload: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = _s(e).payload.indexOf(H(r));
				a > -1 && (e.payload[a] = H(i));
			},
			prepare: U()
		},
		removeLegendPayload: {
			reducer(e, t) {
				var n = _s(e).payload.indexOf(H(t.payload));
				n > -1 && e.payload.splice(n, 1);
			},
			prepare: U()
		}
	}
}), ju = Au.actions, Mu = ju.setLegendSize, Nu = ju.setLegendSettings, Pu = ju.addLegendPayload, Fu = ju.replaceLegendPayload, Iu = ju.removeLegendPayload, Lu = Au.reducer, Ru = /* @__PURE__ */ n(((e) => {
	var t = b();
	t.useSyncExternalStore, t.useRef, t.useEffect, t.useMemo, t.useDebugValue;
}));
(/* @__PURE__ */ n(((e, t) => {
	t.exports = Ru();
})))();
function zu(e) {
	e();
}
function Bu() {
	let e = null, t = null;
	return {
		clear() {
			e = null, t = null;
		},
		notify() {
			zu(() => {
				let t = e;
				for (; t;) t.callback(), t = t.next;
			});
		},
		get() {
			let t = [], n = e;
			for (; n;) t.push(n), n = n.next;
			return t;
		},
		subscribe(n) {
			let r = !0, i = t = {
				callback: n,
				next: null,
				prev: t
			};
			return i.prev ? i.prev.next = i : e = i, function() {
				r && e !== null && (r = !1, i.next ? i.next.prev = i.prev : t = i.prev, i.prev ? i.prev.next = i.next : e = i.next);
			};
		}
	};
}
var Vu = {
	notify() {},
	get: () => []
};
function Hu(e, t) {
	let n, r = Vu, i = 0, a = !1;
	function o(e) {
		u();
		let t = r.subscribe(e), n = !1;
		return () => {
			n || (n = !0, t(), d());
		};
	}
	function s() {
		r.notify();
	}
	function c() {
		m.onStateChange && m.onStateChange();
	}
	function l() {
		return a;
	}
	function u() {
		i++, n || (n = t ? t.addNestedSub(c) : e.subscribe(c), r = Bu());
	}
	function d() {
		i--, n && i === 0 && (n(), n = void 0, r.clear(), r = Vu);
	}
	function f() {
		a || (a = !0, u());
	}
	function p() {
		a && (a = !1, d());
	}
	let m = {
		addNestedSub: o,
		notifyNestedSubs: s,
		handleChangeWrapper: c,
		isSubscribed: l,
		trySubscribe: f,
		tryUnsubscribe: p,
		getListeners: () => r
	};
	return m;
}
var Uu = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Wu = typeof navigator < "u" && navigator.product === "ReactNative", Gu = Uu || Wu ? P.useLayoutEffect : P.useEffect;
function Ku(e, t) {
	return e === t ? e !== 0 || t !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
function qu(e, t) {
	if (Ku(e, t)) return !0;
	if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Ku(e[n[r]], t[n[r]])) return !1;
	return !0;
}
var Ju = /* @__PURE__ */ Symbol.for("react-redux-context"), Yu = typeof globalThis < "u" ? globalThis : {};
function Xu() {
	if (!P.createContext) return {};
	let e = Yu[Ju] ??= /* @__PURE__ */ new Map(), t = e.get(P.createContext);
	return t || (t = P.createContext(null), e.set(P.createContext, t)), t;
}
var Zu = /* @__PURE__ */ Xu();
function Qu(e) {
	let { children: t, context: n, serverState: r, store: i } = e, a = P.useMemo(() => {
		let e = Hu(i);
		return {
			store: i,
			subscription: e,
			getServerState: r ? () => r : void 0
		};
	}, [i, r]), o = P.useMemo(() => i.getState(), [i]);
	Gu(() => {
		let { subscription: e } = a;
		return e.onStateChange = e.notifyNestedSubs, e.trySubscribe(), o !== i.getState() && e.notifyNestedSubs(), () => {
			e.tryUnsubscribe(), e.onStateChange = void 0;
		};
	}, [a, o]);
	let s = n || Zu;
	return /* @__PURE__ */ P.createElement(s.Provider, { value: a }, t);
}
var $u = Qu, ed = /* @__PURE__ */ new Set([
	"axisLine",
	"tickLine",
	"activeBar",
	"activeDot",
	"activeLabel",
	"activeShape",
	"allowEscapeViewBox",
	"background",
	"cursor",
	"dot",
	"label",
	"line",
	"margin",
	"padding",
	"position",
	"shape",
	"style",
	"tick",
	"wrapperStyle",
	"radius",
	"throttledEvents"
]);
function td(e, t) {
	return e == null && t == null ? !0 : typeof e == "number" && typeof t == "number" ? e === t || e !== e && t !== t : e === t;
}
function nd(e, t) {
	for (var n of /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)])) if (ed.has(n)) {
		if (e[n] == null && t[n] == null) continue;
		if (!qu(e[n], t[n])) return !1;
	} else if (!td(e[n], t[n])) return !1;
	return !0;
}
// node_modules/recharts/es6/state/selectors/selectLegendArea.js
var rd = V([
	ml,
	hl,
	_l
], (e, t, n) => ({
	x: n.left || 0,
	y: n.top || 0,
	width: Math.max(e - (n.left || 0) - (n.right || 0), 0),
	height: Math.max(t - (n.top || 0) - (n.bottom || 0), 0)
}));
// node_modules/recharts/es6/cartesian/cartesianPositionToCSSTranslate.js
function id(e, t) {
	return e === "start" && t === "start" ? "" : `translate(${e === "inherit" ? "0" : {
		start: "0",
		middle: "-50%",
		end: "-100%"
	}[e]}, ${{
		start: "0",
		middle: "-50%",
		end: "-100%"
	}[t] ?? "0"})`;
}
// node_modules/recharts/es6/component/Legend.js
var ad = ["contextPayload"];
function od() {
	return od = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, od.apply(null, arguments);
}
function sd(e, t) {
	return fd(e) || dd(e, t) || ld(e, t) || cd();
}
function cd() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ld(e, t) {
	if (e) {
		if (typeof e == "string") return ud(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ud(e, t) : void 0;
	}
}
function ud(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function dd(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function fd(e) {
	if (Array.isArray(e)) return e;
}
function pd(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function md(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? pd(Object(n), !0).forEach(function(t) {
			hd(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pd(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function hd(e, t, n) {
	return (t = gd(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function gd(e) {
	var t = _d(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function _d(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function vd(e, t) {
	if (e == null) return {};
	var n, r, i = yd(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function yd(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function bd(e) {
	return e.value;
}
function xd(e) {
	var t = e.contextPayload, n = vd(e, ad), r = Qi(t, e.payloadUniqBy, bd), i = md(md({}, n), {}, { payload: r });
	return /*#__PURE__*/ P.isValidElement(e.content) ? /*#__PURE__*/ P.cloneElement(e.content, i) : typeof e.content == "function" ? /*#__PURE__*/ P.createElement(e.content, i) : /*#__PURE__*/ P.createElement(Hr, i);
}
function Sd(e) {
	return e === "left" || e === "right" || e === "insideLeft" || e === "insideRight" ? "vertical" : "horizontal";
}
function Cd(e, t) {
	return t == null ? null : Pt(t) ? rd(e) : Nl(e);
}
function wd(e, t, n) {
	return e === "top" ? { top: n.height + t } : e === "bottom" ? { top: -n.height - t } : e === "left" ? { left: n.width + t } : e === "right" ? { left: -n.width - t } : {};
}
function Td(e, t, n, r, i, a) {
	var o = t.layout, s = t.align, c = t.verticalAlign, l, u;
	return e && (e.left !== void 0 && e.left !== null || e.right !== void 0 && e.right !== null) || (l = s === "center" && o === "vertical" ? { left: ((r || 0) - a.width) / 2 } : s === "right" ? { right: n && n.right || 0 } : { left: n && n.left || 0 }), e && (e.top !== void 0 && e.top !== null || e.bottom !== void 0 && e.bottom !== null) || (u = c === "middle" ? { top: ((i || 0) - a.height) / 2 } : c === "bottom" ? { bottom: n && n.bottom || 0 } : { top: n && n.top || 0 }), md(md({}, l), u);
}
function Ed(e) {
	var t = e.align, n = e.layout, r = e.verticalAlign, i = e.itemSorter, a = e.position, o = e.offset, s = z();
	return (0, P.useLayoutEffect)(() => {
		s(Nu({
			align: t,
			layout: n,
			verticalAlign: r,
			itemSorter: i,
			position: a,
			offset: o
		}));
	}, [
		s,
		t,
		n,
		r,
		i,
		a,
		o
	]), null;
}
function Dd(e) {
	var t = e.width, n = e.height, r = z();
	return (0, P.useLayoutEffect)(() => {
		r(Mu({
			width: t,
			height: n
		}));
	}, [
		r,
		t,
		n
	]), (0, P.useLayoutEffect)(() => () => {
		r(Mu({
			width: 0,
			height: 0
		}));
	}, [r]), null;
}
function Od(e, t, n, r) {
	return e === "vertical" && t != null ? { height: t } : e === "horizontal" ? { width: n || r } : null;
}
var kd = {
	align: "center",
	iconSize: 14,
	inactiveColor: "#ccc",
	itemSorter: "value",
	labelStyle: {},
	layout: "auto",
	verticalAlign: "bottom",
	offset: 0
};
function Ad(e) {
	var t = Ar(e, kd), n = e.layout && e.layout !== "auto" ? e.layout : Sd(t.position), r = ka(), i = It(), a = Cu(), o = B((e) => Cd(e, t.position)), s = t.width, c = t.height, l = t.wrapperStyle, u = t.portal, d = u == null && (t.position == null || Pt(t.position)), f = sd(za([r]), 2), p = f[0], m = f[1], h = xu(), g = Su();
	if (h == null || g == null || t.position != null && o == null) return null;
	var _ = Od(n, c, s, h - (a?.left || 0) - (a?.right || 0)), v = t.position == null ? null : Mt({
		viewBox: o ?? {
			x: 0,
			y: 0,
			width: h,
			height: g
		},
		position: t.position,
		offset: t.offset ?? 0
	}), y = wd(t.position, t.offset ?? 0, p), b = n === "vertical" ? (o?.width ?? 0) / 2 : o?.width ?? 0, x = n === "horizontal" ? (o?.height ?? 0) / 2 : o?.height ?? 0, S = v ? {
		width: "max-content",
		height: "max-content",
		maxWidth: b,
		maxHeight: x,
		overflowY: "auto",
		top: v.y + (y.top ?? 0),
		left: v.x + (y.left ?? 0),
		transform: id(v.horizontalAnchor, v.verticalAnchor)
	} : Td(l, t, a, h, g, p), C = u ? l : md(md({
		position: "absolute",
		width: _?.width || s || "auto",
		height: _?.height || c || "auto"
	}, S), l), w = u ?? i;
	if (w == null || r == null) return null;
	var T = /*#__PURE__*/ P.createElement("div", {
		className: "recharts-legend-wrapper",
		style: C,
		ref: m
	}, /*#__PURE__*/ P.createElement(Ed, {
		layout: n,
		align: t.align,
		verticalAlign: t.verticalAlign,
		itemSorter: t.itemSorter,
		position: t.position,
		offset: t.offset
	}), d && /*#__PURE__*/ P.createElement(Dd, p), /*#__PURE__*/ P.createElement(xd, od({}, t, { layout: n }, _, {
		margin: a,
		chartWidth: h,
		chartHeight: g,
		contextPayload: r
	})));
	return /*#__PURE__*/ (0, Pe.createPortal)(T, w);
}
var jd = /*#__PURE__*/ P.memo(Ad, nd);
jd.displayName = "Legend";
// node_modules/recharts/es6/component/DefaultTooltipContent.js
function Md() {
	return Md = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Md.apply(null, arguments);
}
function Nd(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Pd(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Nd(Object(n), !0).forEach(function(t) {
			Fd(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Nd(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Fd(e, t, n) {
	return (t = Id(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Id(e) {
	var t = Ld(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ld(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Rd(e, t) {
	return Ud(e) || Hd(e, t) || Bd(e, t) || zd();
}
function zd() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Bd(e, t) {
	if (e) {
		if (typeof e == "string") return Vd(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Vd(e, t) : void 0;
	}
}
function Vd(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Hd(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Ud(e) {
	if (Array.isArray(e)) return e;
}
function Wd(e) {
	return Array.isArray(e) && _t(e[0]) && _t(e[1]) ? e.join(" ~ ") : e;
}
var Gd = {
	separator: " : ",
	contentStyle: {
		margin: 0,
		padding: 10,
		backgroundColor: "#fff",
		border: "1px solid #ccc",
		whiteSpace: "nowrap"
	},
	itemStyle: {
		display: "block",
		paddingTop: 4,
		paddingBottom: 4,
		color: "#000"
	},
	labelStyle: {},
	accessibilityLayer: !1
};
function Kd(e, t) {
	return t == null ? e : Ta(e, t);
}
var qd = (e) => {
	var t = e.separator, n = t === void 0 ? Gd.separator : t, r = e.contentStyle, i = e.itemStyle, a = e.labelStyle, o = a === void 0 ? Gd.labelStyle : a, s = e.payload, c = e.formatter, u = e.itemSorter, d = e.wrapperClassName, f = e.labelClassName, p = e.label, m = e.labelFormatter, h = e.accessibilityLayer, g = h === void 0 ? Gd.accessibilityLayer : h, _ = () => {
		if (s && s.length) {
			var e = {
				padding: 0,
				margin: 0
			}, t = Kd(s, u).map((e, t) => {
				if (!e || e.type === "none") return null;
				var r = e.formatter || c || Wd, a = e.value, o = e.name, l = a, u = o;
				if (r) {
					var d = r(a, o, e, t, s);
					if (Array.isArray(d)) {
						var f = Rd(d, 2);
						l = f[0], u = f[1];
					} else if (d != null) l = d;
					else return null;
				}
				var p = Pd(Pd({}, Gd.itemStyle), {}, { color: e.color || Gd.itemStyle.color }, i);
				return /*#__PURE__*/ P.createElement("li", {
					className: "recharts-tooltip-item",
					key: `tooltip-item-${t}`,
					style: p
				}, _t(u) ? /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-name" }, u) : null, _t(u) ? /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-separator" }, n) : null, /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-value" }, l), /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-unit" }, e.unit || ""));
			});
			return /*#__PURE__*/ P.createElement("ul", {
				className: "recharts-tooltip-item-list",
				style: e
			}, t);
		}
		return null;
	}, v = Pd(Pd({}, Gd.contentStyle), r), y = Pd({ margin: 0 }, o), b = !L(p), x = b ? p : "", S = l("recharts-default-tooltip", d), C = l("recharts-tooltip-label", f);
	b && m && s != null && (x = m(p, s));
	var w = g ? {
		role: "status",
		"aria-live": "assertive"
	} : {};
	return /*#__PURE__*/ P.createElement("div", Md({
		className: S,
		style: v
	}, w), /*#__PURE__*/ P.createElement("p", {
		className: C,
		style: y
	}, /*#__PURE__*/ P.isValidElement(x) ? x : `${x}`), _());
}, Jd = "recharts-tooltip-wrapper", Yd = { visibility: "hidden" };
function Xd(e) {
	var t = e.coordinate, n = e.translateX, r = e.translateY;
	return l(Jd, {
		[`${Jd}-right`]: F(n) && t && F(t.x) && n >= t.x,
		[`${Jd}-left`]: F(n) && t && F(t.x) && n < t.x,
		[`${Jd}-bottom`]: F(r) && t && F(t.y) && r >= t.y,
		[`${Jd}-top`]: F(r) && t && F(t.y) && r < t.y
	});
}
function Zd(e) {
	var t = e.allowEscapeViewBox, n = e.coordinate, r = e.key, i = e.offset, a = e.position, o = e.reverseDirection, s = e.tooltipDimension, c = e.viewBox, l = e.viewBoxDimension;
	if (a && F(a[r])) return a[r];
	var u = n[r] - s - (i > 0 ? i : 0), d = n[r] + i;
	if (t[r]) return o[r] ? u : d;
	var f = c[r];
	return f == null ? 0 : o[r] ? Math.max(u < f ? d : u, f) : l == null ? 0 : d + s > f + l ? Math.max(u, f) : Math.max(d, f);
}
function Qd(e) {
	var t = e.translateX, n = e.translateY;
	return { transform: e.useTranslate3d ? `translate3d(${t}px, ${n}px, 0)` : `translate(${t}px, ${n}px)` };
}
function $d(e) {
	var t = e.allowEscapeViewBox, n = e.coordinate, r = e.offsetTop, i = e.offsetLeft, a = e.position, o = e.reverseDirection, s = e.tooltipBox, c = e.useTranslate3d, l = e.viewBox, u, d, f;
	return s && s.height > 0 && s.width > 0 && n ? (d = Zd({
		allowEscapeViewBox: t,
		coordinate: n,
		key: "x",
		offset: i,
		position: a,
		reverseDirection: o,
		tooltipDimension: s.width,
		viewBox: l,
		viewBoxDimension: l.width
	}), f = Zd({
		allowEscapeViewBox: t,
		coordinate: n,
		key: "y",
		offset: r,
		position: a,
		reverseDirection: o,
		tooltipDimension: s.height,
		viewBox: l,
		viewBoxDimension: l.height
	}), u = Qd({
		translateX: d,
		translateY: f,
		useTranslate3d: c
	})) : u = Yd, {
		cssProperties: u,
		cssClasses: Xd({
			translateX: d,
			translateY: f,
			coordinate: n
		})
	};
}
var ef = {
	devToolsEnabled: !0,
	isSsr: !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout)
};
// node_modules/recharts/es6/util/usePrefersReducedMotion.js
function tf(e, t) {
	return sf(e) || of(e, t) || rf(e, t) || nf();
}
function nf() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function rf(e, t) {
	if (e) {
		if (typeof e == "string") return af(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? af(e, t) : void 0;
	}
}
function af(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function of(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function sf(e) {
	if (Array.isArray(e)) return e;
}
function cf() {
	var e = tf((0, P.useState)(() => ef.isSsr || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches), 2), t = e[0], n = e[1];
	return (0, P.useEffect)(() => {
		if (window.matchMedia) {
			var e = window.matchMedia("(prefers-reduced-motion: reduce)"), t = () => {
				n(e.matches);
			};
			return e.addEventListener("change", t), () => {
				e.removeEventListener("change", t);
			};
		}
	}, []), t;
}
// node_modules/recharts/es6/component/TooltipBoundingBox.js
function lf(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function uf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? lf(Object(n), !0).forEach(function(t) {
			df(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : lf(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function df(e, t, n) {
	return (t = ff(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ff(e) {
	var t = pf(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function pf(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function mf(e, t) {
	return yf(e) || vf(e, t) || gf(e, t) || hf();
}
function hf() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function gf(e, t) {
	if (e) {
		if (typeof e == "string") return _f(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _f(e, t) : void 0;
	}
}
function _f(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function vf(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function yf(e) {
	if (Array.isArray(e)) return e;
}
function bf(e) {
	if (!(e.prefersReducedMotion && e.isAnimationActive === "auto") && e.isAnimationActive && e.active) {
		var t = typeof e.animationEasing == "string" ? e.animationEasing : "ease";
		return `transform ${e.animationDuration}ms ${t}`;
	}
}
function xf(e) {
	var t = cf(), n = mf(P.useState(() => ({
		dismissed: !1,
		dismissedAtCoordinate: {
			x: 0,
			y: 0
		}
	})), 2), r = n[0], i = n[1];
	P.useEffect(() => {
		var t = (t) => {
			t.key === "Escape" && i({
				dismissed: !0,
				dismissedAtCoordinate: {
					x: e.coordinate?.x ?? 0,
					y: e.coordinate?.y ?? 0
				}
			});
		};
		return document.addEventListener("keydown", t), () => {
			document.removeEventListener("keydown", t);
		};
	}, [e.coordinate?.x, e.coordinate?.y]), r.dismissed && ((e.coordinate?.x ?? 0) !== r.dismissedAtCoordinate.x || (e.coordinate?.y ?? 0) !== r.dismissedAtCoordinate.y) && i(uf(uf({}, r), {}, { dismissed: !1 }));
	var a = $d({
		allowEscapeViewBox: e.allowEscapeViewBox,
		coordinate: e.coordinate,
		offsetLeft: typeof e.offset == "number" ? e.offset : e.offset.x,
		offsetTop: typeof e.offset == "number" ? e.offset : e.offset.y,
		position: e.position,
		reverseDirection: e.reverseDirection,
		tooltipBox: e.lastBoundingBox,
		useTranslate3d: e.useTranslate3d,
		viewBox: e.viewBox
	}), o = a.cssClasses, s = a.cssProperties, c = uf(uf({}, e.hasPortalFromProps ? {} : uf(uf({ transition: bf({
		prefersReducedMotion: t,
		isAnimationActive: e.isAnimationActive,
		active: e.active,
		animationDuration: e.animationDuration,
		animationEasing: e.animationEasing
	}) }, s), {}, {
		pointerEvents: "none",
		position: "absolute",
		top: 0,
		left: 0
	})), {}, { visibility: !r.dismissed && e.active && e.hasPayload ? "visible" : "hidden" }, e.wrapperStyle);
	return /*#__PURE__*/ P.createElement("div", {
		xmlns: "http://www.w3.org/1999/xhtml",
		tabIndex: -1,
		className: o,
		style: c,
		ref: e.innerRef
	}, e.children);
}
var Sf = /*#__PURE__*/ P.memo(xf), Cf = () => B((e) => e.rootProps.accessibilityLayer) ?? !0;
// node_modules/recharts/es6/shape/Curve.js
function wf() {
	return wf = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, wf.apply(null, arguments);
}
function Tf(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ef(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Tf(Object(n), !0).forEach(function(t) {
			Df(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Tf(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Df(e, t, n) {
	return (t = Of(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Of(e) {
	var t = kf(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function kf(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Af = {
	curveBasisClosed: jn,
	curveBasisOpen: Nn,
	curveBasis: kn,
	curveBumpX: an,
	curveBumpY: on,
	curveLinearClosed: Fn,
	curveLinear: Qt,
	curveMonotoneX: Un,
	curveMonotoneY: Wn,
	curveNatural: qn,
	curveStep: Yn,
	curveStepAfter: Zn,
	curveStepBefore: Xn
}, jf = (e) => W(e.x) && W(e.y), Mf = (e) => e.base != null && jf(e.base) && jf(e), Nf = (e) => e.x, Pf = (e) => e.y, Ff = (e, t) => {
	if (typeof e == "function") return e;
	var n = `curve${Ct(e)}`;
	if ((n === "curveMonotone" || n === "curveBump") && t) {
		var r = Af[`${n}${t === "vertical" ? "Y" : "X"}`];
		if (r) return r;
	}
	return Af[n] || Qt;
}, If = {
	connectNulls: !1,
	type: "linear"
}, Lf = (e) => {
	var t = e.type, n = t === void 0 ? If.type : t, r = e.points, i = r === void 0 ? [] : r, a = e.baseLine, o = e.layout, s = e.connectNulls, c = s === void 0 ? If.connectNulls : s, l = Ff(n, o), u = c ? i.filter(jf) : i;
	if (Array.isArray(a)) {
		var d, f = i.map((e, t) => Ef(Ef({}, e), {}, { base: a[t] }));
		return d = o === "vertical" ? nn().y(Pf).x1(Nf).x0((e) => e.base.x) : nn().x(Nf).y1(Pf).y0((e) => e.base.y), d.defined(Mf).curve(l)(c ? f.filter(Mf) : f);
	}
	return (o === "vertical" && F(a) ? nn().y(Pf).x1(Nf).x0(a) : F(a) ? nn().x(Nf).y1(Pf).y0(a) : tn().x(Nf).y(Pf)).defined(jf).curve(l)(u);
}, Rf = (e) => {
	var t = e.className, n = e.points, r = e.path, i = e.pathRef, a = wu();
	if ((!n || !n.length) && !r) return null;
	var o = {
		type: e.type,
		points: e.points,
		baseLine: e.baseLine,
		layout: e.layout || a,
		connectNulls: e.connectNulls
	}, s = n && n.length ? Lf(o) : r;
	return /*#__PURE__*/ P.createElement("path", wf({}, Be(e), Sr(e), {
		className: l("recharts-curve", t),
		d: s === null ? void 0 : s,
		ref: i
	}));
}, zf = [
	"x",
	"y",
	"top",
	"left",
	"width",
	"height",
	"className"
];
function Bf() {
	return Bf = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Bf.apply(null, arguments);
}
function Vf(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Hf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Vf(Object(n), !0).forEach(function(t) {
			Uf(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Vf(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Uf(e, t, n) {
	return (t = Wf(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Wf(e) {
	var t = Gf(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Gf(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Kf(e, t) {
	if (e == null) return {};
	var n, r, i = qf(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function qf(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Jf = (e, t, n, r, i, a) => `M${e},${i}v${r}M${a},${t}h${n}`, Yf = (e) => {
	var t = e.x, n = t === void 0 ? 0 : t, r = e.y, i = r === void 0 ? 0 : r, a = e.top, o = a === void 0 ? 0 : a, s = e.left, c = s === void 0 ? 0 : s, u = e.width, d = u === void 0 ? 0 : u, f = e.height, p = f === void 0 ? 0 : f, m = e.className, h = Kf(e, zf), g = Hf({
		x: n,
		y: i,
		top: o,
		left: c,
		width: d,
		height: p
	}, h);
	return !F(n) || !F(i) || !F(d) || !F(p) || !F(o) || !F(c) ? null : /*#__PURE__*/ P.createElement("path", Bf({}, He(g), {
		className: l("recharts-cross", m),
		d: Jf(n, i, d, p, o, c)
	}));
};
// node_modules/recharts/es6/util/cursor/getCursorRectangle.js
function Xf(e, t, n, r) {
	var i = r / 2;
	return {
		stroke: "none",
		fill: "#ccc",
		x: e === "horizontal" ? t.x - i : n.left + .5,
		y: e === "horizontal" ? n.top + .5 : t.y - i,
		width: e === "horizontal" ? r : n.width - 1,
		height: e === "horizontal" ? n.height - 1 : r
	};
}
var Zf = (e, t) => [
	0,
	3 * e,
	3 * t - 6 * e,
	3 * e - 3 * t + 1
], Qf = (e, t) => e.map((e, n) => e * t ** n).reduce((e, t) => e + t), $f = (e, t) => (n) => Qf(Zf(e, t), n), ep = (e, t) => (n) => Qf([...Zf(e, t).map((e, t) => e * t).slice(1), 0], n), tp = (e) => {
	var t, n = e.split("(");
	if (n.length !== 2 || n[0] !== "cubic-bezier") return null;
	var r = (t = n[1]) == null || (t = t.split(")")[0]) == null ? void 0 : t.split(",");
	if (r == null || r.length !== 4) return null;
	var i = r.map((e) => parseFloat(e));
	return [
		i[0],
		i[1],
		i[2],
		i[3]
	];
}, np = function() {
	var e = [...arguments];
	if (e.length === 1) switch (e[0]) {
		case "linear": return [
			0,
			0,
			1,
			1
		];
		case "ease": return [
			.25,
			.1,
			.25,
			1
		];
		case "ease-in": return [
			.42,
			0,
			1,
			1
		];
		case "ease-out": return [
			.42,
			0,
			.58,
			1
		];
		case "ease-in-out": return [
			0,
			0,
			.58,
			1
		];
		default:
			var t = tp(e[0]);
			if (t) return t;
	}
	return e.length === 4 ? e : [
		0,
		0,
		1,
		1
	];
}, rp = (e, t, n, r) => {
	var i = $f(e, n), a = $f(t, r), o = ep(e, n), s = (e) => e > 1 ? 1 : e < 0 ? 0 : e, c = (e) => {
		for (var t = e > 1 ? 1 : e, n = t, r = 0; r < 8; ++r) {
			var c = i(n) - t, l = o(n);
			if (Math.abs(c - t) < 1e-4 || l < 1e-4) return a(n);
			n = s(n - c / l);
		}
		return a(n);
	};
	return c.isStepper = !1, c;
}, ip = function() {
	return rp(...np(...arguments));
}, ap = function() {
	for (var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.stiff, n = t === void 0 ? 100 : t, r = e.damping, i = r === void 0 ? 8 : r, a = e.dt, o = a === void 0 ? 16.67 : a, s = 1, c = [0], l = 0, u = 0, d = 1e4, f = 0; f < d;) {
		var p = -(l - s) * n, m = u * i;
		if (u += (p - m) * o / 1e3, l += u * o / 1e3, c.push(l), Math.abs(l - s) < 1e-4 && Math.abs(u) < 1e-4) break;
		f++;
	}
	c[c.length - 1] = s;
	var h = c.length - 1;
	return (e) => {
		if (e <= 0) return 0;
		if (e >= 1) return s;
		var t = e * h, n = Math.floor(t), r = t - n;
		return (c[n] ?? 0) + ((c[n + 1] ?? 0) - (c[n] ?? 0)) * r;
	};
}, op = (e) => {
	if (typeof e == "string") switch (e) {
		case "ease":
		case "ease-in-out":
		case "ease-out":
		case "ease-in":
		case "linear": return ip(e);
		case "spring": return ap();
		default: if (e.split("(")[0] === "cubic-bezier") return ip(e);
	}
	return typeof e == "function" ? e : null;
}, sp = /*#__PURE__*/ (0, P.createContext)((e, t, n) => {
	var r, i = (a) => {
		var o = t.tick(a);
		if (t.getState() === "active") {
			if (n(t.getInterpolated()), t.getProgress() === 1) {
				t.complete(), r = void 0;
				return;
			}
			r = e.setTimeout(i, o);
		} else r = e.setTimeout(i, o);
	};
	return r = e.setTimeout(i, 0), () => r?.();
});
sp.Provider;
function cp(e) {
	var t = (0, P.useContext)(sp);
	return (0, P.useMemo)(() => e ?? t, [e, t]);
}
// node_modules/recharts/es6/animation/AnimationHandle.js
function lp(e, t, n) {
	return (t = up(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function up(e) {
	var t = dp(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function dp(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var fp = "init", pp = "pending", mp = "active", hp = "completed";
function gp(e) {
	return Math.max(0, e);
}
var _p = class {
	getAnimationStartedTime() {
		return this.animationStartedTime;
	}
	getBeginStartedTime() {
		return this.beginStartedTime;
	}
	constructor(e) {
		var t;
		lp(this, "state", fp), this.animationId = e.animationId, this.onAnimationEnd = e.onAnimationEnd, this.animationDuration = gp(e.animationDuration), this.animationBegin = gp(e.animationBegin), this.progress = 0, this.from = e.from, this.to = e.to, this.easing = e.easing, (t = e.onAnimationStart) == null || t.call(e);
	}
	getState() {
		return this.state;
	}
	getEasing() {
		return this.easing;
	}
	getAnimationDuration() {
		return this.animationDuration;
	}
	tick(e) {
		if (this.getState() === fp) return this.state = pp, this.beginStartedTime = e, this.animationBegin;
		if (this.getState() === pp) {
			if (this.beginStartedTime == null) throw Error();
			var t = e - this.beginStartedTime;
			return t >= this.animationBegin ? (this.state = mp, this.animationStartedTime = e, this.nextAnimationUpdate(0)) : gp(this.animationBegin - t);
		}
		if (this.getState() === mp) {
			if (this.animationStartedTime == null) throw Error();
			var n = e - this.animationStartedTime;
			return this.setProgress(n / this.animationDuration), this.nextAnimationUpdate(n);
		}
		return 0;
	}
	setProgress(e) {
		this.progress = Math.min(1, Math.max(0, e));
	}
	getProgress() {
		return this.progress;
	}
	complete() {
		if (this.progress = 1, this.state === "active") {
			var e;
			(e = this.onAnimationEnd) == null || e.call(this);
		}
		this.state = hp;
	}
	getFrom() {
		return this.from;
	}
	getTo() {
		return this.to;
	}
	getAnimationId() {
		return this.animationId;
	}
	getAnimationBegin() {
		return this.animationBegin;
	}
}, vp = class extends _p {
	nextAnimationUpdate() {
		return 0;
	}
	getInterpolated() {
		return this.easing(I(this.getFrom(), this.getTo(), this.getProgress()));
	}
}, yp = class {
	setTimeout(e) {
		var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), r = null, i = (a) => {
			a - n >= t ? e(a) : r = requestAnimationFrame(i);
		};
		return r = requestAnimationFrame(i), () => {
			r != null && cancelAnimationFrame(r);
		};
	}
};
// node_modules/recharts/es6/animation/JavascriptAnimate.js
function bp(e, t) {
	return Tp(e) || wp(e, t) || Sp(e, t) || xp();
}
function xp() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Sp(e, t) {
	if (e) {
		if (typeof e == "string") return Cp(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Cp(e, t) : void 0;
	}
}
function Cp(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function wp(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Tp(e) {
	if (Array.isArray(e)) return e;
}
var Ep = {
	begin: 0,
	duration: 1e3,
	easing: "ease",
	isActive: !0,
	canBegin: !0,
	onAnimationEnd: () => {},
	onAnimationStart: () => {}
}, Dp = 0, Op = 1;
function kp(e) {
	var t = Ar(e, Ep), n = t.animationId, r = t.isActive, i = t.canBegin, a = t.duration, o = t.easing, s = t.begin, c = t.onAnimationEnd, l = t.onAnimationStart, u = t.children, d = cf(), f = r === "auto" ? !ef.isSsr && !d : r, p = cp(t.animationController), m = bp((0, P.useState)(f ? Dp : Op), 2), h = m[0], g = m[1];
	return (0, P.useEffect)(() => {
		f || g(Op);
	}, [f]), (0, P.useEffect)(() => {
		var e = op(o);
		return !f || !i || e == null ? Tt : p(new yp(), new vp({
			animationId: n,
			easing: e,
			animationDuration: a,
			animationBegin: s,
			onAnimationStart: l,
			onAnimationEnd: c,
			from: Dp,
			to: Op
		}), g);
	}, [
		p,
		n,
		f,
		i,
		a,
		o,
		s,
		l,
		c
	]), u(Number(h));
}
// node_modules/recharts/es6/util/useAnimationId.js
function Ap(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", n = (0, P.useRef)(yt(t)), r = (0, P.useRef)(e);
	return r.current !== e && (n.current = yt(t), r.current = e), n.current;
}
// node_modules/recharts/es6/animation/util.js
var jp = (e) => e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`), Mp = (e, t, n) => e.map((e) => `${jp(e)} ${t}ms ${n}`).join(","), Np = ["radius"], Pp = ["radius"], Fp, Ip, Lp, Rp, zp, Bp, Vp, Hp, Up, Wp;
function Gp(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Kp(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Gp(Object(n), !0).forEach(function(t) {
			qp(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Gp(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function qp(e, t, n) {
	return (t = Jp(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Jp(e) {
	var t = Yp(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Yp(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Xp() {
	return Xp = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Xp.apply(null, arguments);
}
function Zp(e, t) {
	if (e == null) return {};
	var n, r, i = Qp(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Qp(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function $p(e, t) {
	return im(e) || rm(e, t) || tm(e, t) || em();
}
function em() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function tm(e, t) {
	if (e) {
		if (typeof e == "string") return nm(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? nm(e, t) : void 0;
	}
}
function nm(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function rm(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function im(e) {
	if (Array.isArray(e)) return e;
}
function am(e, t) {
	return t ||= e.slice(0), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var om = (e, t, n, r, i) => {
	var a = ft(n), o = ft(r), s = Math.min(Math.abs(a) / 2, Math.abs(o) / 2), c = o >= 0 ? 1 : -1, l = a >= 0 ? 1 : -1, u = +(o >= 0 && a >= 0 || o < 0 && a < 0), d;
	if (s > 0 && Array.isArray(i)) {
		for (var f = [
			0,
			0,
			0,
			0
		], p = 0, m = 4; p < m; p++) {
			var h = i[p] ?? 0;
			f[p] = h > s ? s : h;
		}
		d = pt(Fp ||= am([
			"M",
			",",
			""
		]), e, t + c * f[0]), f[0] > 0 && (d += pt(Ip ||= am([
			"A ",
			",",
			",0,0,",
			",",
			",",
			""
		]), f[0], f[0], u, e + l * f[0], t)), d += pt(Lp ||= am([
			"L ",
			",",
			""
		]), e + n - l * f[1], t), f[1] > 0 && (d += pt(Rp ||= am([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[1], f[1], u, e + n, t + c * f[1])), d += pt(zp ||= am([
			"L ",
			",",
			""
		]), e + n, t + r - c * f[2]), f[2] > 0 && (d += pt(Bp ||= am([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[2], f[2], u, e + n - l * f[2], t + r)), d += pt(Vp ||= am([
			"L ",
			",",
			""
		]), e + l * f[3], t + r), f[3] > 0 && (d += pt(Hp ||= am([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[3], f[3], u, e, t + r - c * f[3])), d += "Z";
	} else if (s > 0 && i === +i && i > 0) {
		var g = Math.min(s, i);
		d = pt(Up ||= am(/* @__PURE__ */ "M .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,. Z".split(".")), e, t + c * g, g, g, u, e + l * g, t, e + n - l * g, t, g, g, u, e + n, t + c * g, e + n, t + r - c * g, g, g, u, e + n - l * g, t + r, e + l * g, t + r, g, g, u, e, t + r - c * g);
	} else d = pt(Wp ||= am([
		"M ",
		",",
		" h ",
		" v ",
		" h ",
		" Z"
	]), e, t, n, r, -n);
	return d;
}, sm = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	radius: 0,
	isAnimationActive: !1,
	isUpdateAnimationActive: !1,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease"
}, cm = (e) => {
	var t = Ar(e, sm), n = (0, P.useRef)(null), r = $p((0, P.useState)(-1), 2), i = r[0], a = r[1];
	(0, P.useEffect)(() => {
		if (n.current && n.current.getTotalLength) try {
			var e = n.current.getTotalLength();
			e && a(e);
		} catch {}
	}, []);
	var o = t.x, s = t.y, c = t.width, u = t.height, d = t.radius, f = t.className, p = t.animationEasing, m = t.animationDuration, h = t.animationBegin, g = t.isAnimationActive, _ = t.isUpdateAnimationActive, v = (0, P.useRef)(c), y = (0, P.useRef)(u), b = (0, P.useRef)(o), x = (0, P.useRef)(s), S = Ap((0, P.useMemo)(() => ({
		x: o,
		y: s,
		width: c,
		height: u,
		radius: d
	}), [
		o,
		s,
		c,
		u,
		d
	]), "rectangle-");
	if (o !== +o || s !== +s || c !== +c || u !== +u || c === 0 || u === 0) return null;
	var C = l("recharts-rectangle", f);
	if (!_) {
		var w = He(t);
		w.radius;
		var T = Zp(w, Np);
		return /*#__PURE__*/ P.createElement("path", Xp({}, T, {
			x: ft(o),
			y: ft(s),
			width: ft(c),
			height: ft(u),
			radius: typeof d == "number" ? d : void 0,
			className: C,
			d: om(o, s, c, u, d)
		}));
	}
	var E = v.current, D = y.current, O = b.current, k = x.current, A = `0px ${i === -1 ? 1 : i}px`, j = `${i}px ${i}px`, M = Mp(["strokeDasharray"], m, typeof p == "string" ? p : sm.animationEasing);
	return /*#__PURE__*/ P.createElement(kp, {
		animationId: S,
		key: S,
		canBegin: i > 0,
		duration: m,
		easing: p,
		isActive: _,
		begin: h
	}, (e) => {
		var r = I(E, c, e), i = I(D, u, e), a = I(O, o, e), l = I(k, s, e);
		n.current && (v.current = r, y.current = i, b.current = a, x.current = l);
		var f = g ? e > 0 ? {
			transition: M,
			strokeDasharray: j
		} : { strokeDasharray: A } : { strokeDasharray: j }, p = He(t);
		p.radius;
		var m = Zp(p, Pp);
		return /*#__PURE__*/ P.createElement("path", Xp({}, m, {
			radius: typeof d == "number" ? d : void 0,
			className: C,
			d: om(a, l, r, i, d),
			ref: n,
			style: Kp(Kp({}, f), t.style)
		}));
	});
};
// node_modules/recharts/es6/util/PolarUtils.js
function lm(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function um(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? lm(Object(n), !0).forEach(function(t) {
			dm(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : lm(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function dm(e, t, n) {
	return (t = fm(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function fm(e) {
	var t = pm(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function pm(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var mm = Math.PI / 180, hm = (e) => e * Math.PI / 180, gm = (e) => e * 180 / Math.PI, _m = (e, t, n, r) => ({
	x: e + Math.cos(-mm * r) * n,
	y: t + Math.sin(-mm * r) * n
}), vm = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: 0,
		height: 0,
		brushBottom: 0
	};
	return Math.min(Math.abs(e - (n.left || 0) - (n.right || 0)), Math.abs(t - (n.top || 0) - (n.bottom || 0))) / 2;
}, ym = (e, t) => {
	var n = e.x, r = e.y, i = t.x, a = t.y;
	return Math.sqrt((n - i) ** 2 + (r - a) ** 2);
}, bm = (e, t) => {
	var n = e.x, r = e.y, i = t.cx, a = t.cy, o = ym({
		x: n,
		y: r
	}, {
		x: i,
		y: a
	});
	if (o <= 0) return {
		radius: o,
		angle: 0
	};
	var s = (n - i) / o, c = Math.acos(s);
	return r > a && (c = 2 * Math.PI - c), {
		radius: o,
		angle: gm(c),
		angleInRadian: c
	};
}, xm = (e) => {
	var t = e.startAngle, n = e.endAngle, r = Math.floor(t / 360), i = Math.floor(n / 360), a = Math.min(r, i);
	return {
		startAngle: t - a * 360,
		endAngle: n - a * 360
	};
}, Sm = (e, t) => {
	var n = t.startAngle, r = t.endAngle, i = Math.floor(n / 360), a = Math.floor(r / 360);
	return e + Math.min(i, a) * 360;
}, Cm = (e, t) => {
	var n = e.relativeX, r = e.relativeY, i = bm({
		x: n,
		y: r
	}, t), a = i.radius, o = i.angle, s = t.innerRadius, c = t.outerRadius;
	if (a < s || a > c || a === 0) return null;
	var l = xm(t), u = l.startAngle, d = l.endAngle, f = o, p;
	if (u <= d) {
		for (; f > d;) f -= 360;
		for (; f < u;) f += 360;
		p = f >= u && f <= d;
	} else {
		for (; f > u;) f -= 360;
		for (; f < d;) f += 360;
		p = f >= d && f <= u;
	}
	return p ? um(um({}, t), {}, {
		radius: a,
		angle: Sm(f, t)
	}) : null;
};
// node_modules/recharts/es6/util/cursor/getRadialCursorPoints.js
function wm(e) {
	var t = e.cx, n = e.cy, r = e.radius, i = e.startAngle, a = e.endAngle;
	return {
		points: [_m(t, n, r, i), _m(t, n, r, a)],
		cx: t,
		cy: n,
		radius: r,
		startAngle: i,
		endAngle: a
	};
}
// node_modules/recharts/es6/shape/Sector.js
var Tm, Em, Dm, Om, km, Am, jm;
function Mm() {
	return Mm = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Mm.apply(null, arguments);
}
function Nm(e, t) {
	return t ||= e.slice(0), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var Pm = (e, t) => mt(t - e) * Math.min(Math.abs(t - e), 359.999), Fm = (e) => {
	var t = e.cx, n = e.cy, r = e.radius, i = e.angle, a = e.sign, o = e.isExternal, s = e.cornerRadius, c = e.cornerIsExternal, l = s * (o ? 1 : -1) + r, u = Math.asin(s / l) / mm, d = c ? i : i + a * u, f = _m(t, n, l, d), p = _m(t, n, r, d), m = c ? i - a * u : i;
	return {
		center: f,
		circleTangency: p,
		lineTangency: _m(t, n, l * Math.cos(u * mm), m),
		theta: u
	};
}, Im = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.startAngle, o = e.endAngle, s = Pm(a, o), c = a + s, l = _m(t, n, i, a), u = _m(t, n, i, c), d = pt(Tm ||= Nm([
		"M ",
		",",
		"\n    A ",
		",",
		",0,\n    ",
		",",
		",\n    ",
		",",
		"\n  "
	]), l.x, l.y, i, i, +(Math.abs(s) > 180), +(a > c), u.x, u.y);
	if (r > 0) {
		var f = _m(t, n, r, a), p = _m(t, n, r, c);
		d += pt(Em ||= Nm([
			"L ",
			",",
			"\n            A ",
			",",
			",0,\n            ",
			",",
			",\n            ",
			",",
			" Z"
		]), p.x, p.y, r, r, +(Math.abs(s) > 180), +(a <= c), f.x, f.y);
	} else d += pt(Dm ||= Nm([
		"L ",
		",",
		" Z"
	]), t, n);
	return d;
}, Lm = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.cornerRadius, o = e.forceCornerRadius, s = e.cornerIsExternal, c = e.startAngle, l = e.endAngle, u = mt(l - c), d = Fm({
		cx: t,
		cy: n,
		radius: i,
		angle: c,
		sign: u,
		cornerRadius: a,
		cornerIsExternal: s
	}), f = d.circleTangency, p = d.lineTangency, m = d.theta, h = Fm({
		cx: t,
		cy: n,
		radius: i,
		angle: l,
		sign: -u,
		cornerRadius: a,
		cornerIsExternal: s
	}), g = h.circleTangency, _ = h.lineTangency, v = h.theta, y = s ? Math.abs(c - l) : Math.abs(c - l) - m - v;
	if (y < 0) return o ? pt(Om ||= Nm([
		"M ",
		",",
		"\n        a",
		",",
		",0,0,1,",
		",0\n        a",
		",",
		",0,0,1,",
		",0\n      "
	]), p.x, p.y, a, a, a * 2, a, a, -a * 2) : Im({
		cx: t,
		cy: n,
		innerRadius: r,
		outerRadius: i,
		startAngle: c,
		endAngle: l
	});
	var b = pt(km ||= Nm([
		"M ",
		",",
		"\n    A",
		",",
		",0,0,",
		",",
		",",
		"\n    A",
		",",
		",0,",
		",",
		",",
		",",
		"\n    A",
		",",
		",0,0,",
		",",
		",",
		"\n  "
	]), p.x, p.y, a, a, +(u < 0), f.x, f.y, i, i, +(y > 180), +(u < 0), g.x, g.y, a, a, +(u < 0), _.x, _.y);
	if (r > 0) {
		var x = Fm({
			cx: t,
			cy: n,
			radius: r,
			angle: c,
			sign: u,
			isExternal: !0,
			cornerRadius: a,
			cornerIsExternal: s
		}), S = x.circleTangency, C = x.lineTangency, w = x.theta, T = Fm({
			cx: t,
			cy: n,
			radius: r,
			angle: l,
			sign: -u,
			isExternal: !0,
			cornerRadius: a,
			cornerIsExternal: s
		}), E = T.circleTangency, D = T.lineTangency, O = T.theta, k = s ? Math.abs(c - l) : Math.abs(c - l) - w - O;
		if (k < 0 && a === 0) return `${b}L${t},${n}Z`;
		b += pt(Am ||= Nm([
			"L",
			",",
			"\n      A",
			",",
			",0,0,",
			",",
			",",
			"\n      A",
			",",
			",0,",
			",",
			",",
			",",
			"\n      A",
			",",
			",0,0,",
			",",
			",",
			"Z"
		]), D.x, D.y, a, a, +(u < 0), E.x, E.y, r, r, +(k > 180), +(u > 0), S.x, S.y, a, a, +(u < 0), C.x, C.y);
	} else b += pt(jm ||= Nm([
		"L",
		",",
		"Z"
	]), t, n);
	return b;
}, Rm = {
	cx: 0,
	cy: 0,
	innerRadius: 0,
	outerRadius: 0,
	startAngle: 0,
	endAngle: 0,
	cornerRadius: 0,
	forceCornerRadius: !1,
	cornerIsExternal: !1
}, zm = (e) => {
	var t = Ar(e, Rm), n = t.cx, r = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.cornerRadius, s = t.forceCornerRadius, c = t.cornerIsExternal, u = t.startAngle, d = t.endAngle, f = t.className;
	if (a < i || u === d) return null;
	var p = l("recharts-sector", f), m = a - i, h = bt(o, m, 0, !0), g = h > 0 && Math.abs(u - d) < 360 ? Lm({
		cx: n,
		cy: r,
		innerRadius: i,
		outerRadius: a,
		cornerRadius: Math.min(h, m / 2),
		forceCornerRadius: s,
		cornerIsExternal: c,
		startAngle: u,
		endAngle: d
	}) : Im({
		cx: n,
		cy: r,
		innerRadius: i,
		outerRadius: a,
		startAngle: u,
		endAngle: d
	});
	return /*#__PURE__*/ P.createElement("path", Mm({}, He(t), {
		className: p,
		d: g
	}));
};
// node_modules/recharts/es6/util/cursor/getCursorPoints.js
function Bm(e, t, n) {
	if (e === "horizontal") return [{
		x: t.x,
		y: n.top
	}, {
		x: t.x,
		y: n.top + n.height
	}];
	if (e === "vertical") return [{
		x: n.left,
		y: t.y
	}, {
		x: n.left + n.width,
		y: t.y
	}];
	if (xr(t)) {
		if (e === "centric") {
			var r = t.cx, i = t.cy, a = t.innerRadius, o = t.outerRadius, s = t.angle, c = _m(r, i, a, s), l = _m(r, i, o, s);
			return [{
				x: c.x,
				y: c.y
			}, {
				x: l.x,
				y: l.y
			}];
		}
		return wm(t);
	}
}
// node_modules/es-toolkit/dist/compat/util/toNumber.mjs
function Vm(e) {
	return at(e) ? NaN : Number(e);
}
// node_modules/es-toolkit/dist/compat/util/toFinite.mjs
function Hm(e) {
	return e ? (e = Vm(e), e === Infinity || e === -Infinity ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0) : e === 0 ? e : 0;
}
// node_modules/es-toolkit/dist/compat/math/range.mjs
function Um(e, t, n) {
	n && typeof n != "number" && va(e, t, n) && (t = n = void 0), e = Hm(e), t === void 0 ? (t = e, e = 0) : t = Hm(t), n = n === void 0 ? e < t ? 1 : -1 : Hm(n);
	let r = Math.max(Math.ceil((t - e) / (n || 1)), 0), i = Array(r);
	for (let t = 0; t < r; t++) i[t] = e, e += n;
	return i;
}
// node_modules/recharts/es6/state/selectors/dataSelectors.js
var Wm = (e) => e.chartData, Gm = V([Wm], (e) => {
	var t = e.chartData == null ? 0 : e.chartData.length - 1;
	return {
		chartData: e.chartData,
		computedData: e.computedData,
		dataEndIndex: t,
		dataStartIndex: 0
	};
}), Km = (e, t, n, r) => r ? Gm(e) : Wm(e), qm = (e, t, n) => n ? Gm(e) : Wm(e), Jm = V([Km], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
}), Ym = V([Gm], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
}), Xm = V([Wm], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
});
// node_modules/recharts/es6/util/isDomainSpecifiedByUser.js
function Zm(e, t) {
	return nh(e) || th(e, t) || $m(e, t) || Qm();
}
function Qm() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $m(e, t) {
	if (e) {
		if (typeof e == "string") return eh(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? eh(e, t) : void 0;
	}
}
function eh(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function th(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function nh(e) {
	if (Array.isArray(e)) return e;
}
function rh(e) {
	if (Array.isArray(e) && e.length === 2) {
		var t = Zm(e, 2), n = t[0], r = t[1];
		if (W(n) && W(r)) return !0;
	}
	return !1;
}
function ih(e, t, n) {
	return n ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function ah(e, t) {
	if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
		var n = Zm(e, 2), r = n[0], i = n[1], a, o;
		if (W(r)) a = r;
		else if (typeof r == "function") return;
		if (W(i)) o = i;
		else if (typeof i == "function") return;
		var s = [a, o];
		if (rh(s)) return s;
	}
}
function oh(e, t, n) {
	if (n || t != null) {
		if (typeof e == "function" && t != null) try {
			var r = e(t, n);
			if (rh(r)) return ih(r, t, n);
		} catch {}
		if (Array.isArray(e) && e.length === 2) {
			var i = Zm(e, 2), a = i[0], o = i[1], s, c;
			if (a === "auto") t != null && (s = Math.min(...t));
			else if (F(a)) s = a;
			else if (typeof a == "function") try {
				t != null && (s = a(t?.[0]));
			} catch {}
			else if (typeof a == "string" && sl.test(a)) {
				var l = sl.exec(a);
				if (l == null || l[1] == null || t == null) s = void 0;
				else {
					var u = +l[1];
					s = t[0] - u;
				}
			} else s = t?.[0];
			if (o === "auto") t != null && (c = Math.max(...t));
			else if (F(o)) c = o;
			else if (typeof o == "function") try {
				t != null && (c = o(t?.[1]));
			} catch {}
			else if (typeof o == "string" && cl.test(o)) {
				var d = cl.exec(o);
				if (d == null || d[1] == null || t == null) c = void 0;
				else {
					var f = +d[1];
					c = t[1] + f;
				}
			} else c = t?.[1];
			var p = [s, c];
			if (rh(p)) return t == null ? p : ih(p, t, n);
		}
	}
}
// node_modules/recharts/es6/util/scale/util/arithmetic.js
var q = /* @__PURE__ */ i((/* @__PURE__ */ n(((e, t, n) => {
	(function(e) {
		var n = 1e9, r = {
			precision: 20,
			rounding: 4,
			toExpNeg: -7,
			toExpPos: 21,
			LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
		}, i = !0, a = "[DecimalError] ", o = a + "Invalid argument: ", s = a + "Exponent out of range: ", c = Math.floor, l = Math.pow, u = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, d, f = 1e7, p = 7, m = 9007199254740991, h = c(m / p), g = {};
		g.absoluteValue = g.abs = function() {
			var e = new this.constructor(this);
			return e.s &&= 1, e;
		}, g.comparedTo = g.cmp = function(e) {
			var t, n, r, i, a = this;
			if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
			if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
			for (r = a.d.length, i = e.d.length, t = 0, n = r < i ? r : i; t < n; ++t) if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
			return r === i ? 0 : r > i ^ a.s < 0 ? 1 : -1;
		}, g.decimalPlaces = g.dp = function() {
			var e = this, t = e.d.length - 1, n = (t - e.e) * p;
			if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) n--;
			return n < 0 ? 0 : n;
		}, g.dividedBy = g.div = function(e) {
			return b(this, new this.constructor(e));
		}, g.dividedToIntegerBy = g.idiv = function(e) {
			var t = this, n = t.constructor;
			return D(b(t, new n(e), 0, 1), n.precision);
		}, g.equals = g.eq = function(e) {
			return !this.cmp(e);
		}, g.exponent = function() {
			return S(this);
		}, g.greaterThan = g.gt = function(e) {
			return this.cmp(e) > 0;
		}, g.greaterThanOrEqualTo = g.gte = function(e) {
			return this.cmp(e) >= 0;
		}, g.isInteger = g.isint = function() {
			return this.e > this.d.length - 2;
		}, g.isNegative = g.isneg = function() {
			return this.s < 0;
		}, g.isPositive = g.ispos = function() {
			return this.s > 0;
		}, g.isZero = function() {
			return this.s === 0;
		}, g.lessThan = g.lt = function(e) {
			return this.cmp(e) < 0;
		}, g.lessThanOrEqualTo = g.lte = function(e) {
			return this.cmp(e) < 1;
		}, g.logarithm = g.log = function(e) {
			var t, n = this, r = n.constructor, o = r.precision, s = o + 5;
			if (e === void 0) e = new r(10);
			else if (e = new r(e), e.s < 1 || e.eq(d)) throw Error(a + "NaN");
			if (n.s < 1) throw Error(a + (n.s ? "NaN" : "-Infinity"));
			return n.eq(d) ? new r(0) : (i = !1, t = b(T(n, s), T(e, s), s), i = !0, D(t, o));
		}, g.minus = g.sub = function(e) {
			var t = this;
			return e = new t.constructor(e), t.s == e.s ? O(t, e) : _(t, (e.s = -e.s, e));
		}, g.modulo = g.mod = function(e) {
			var t, n = this, r = n.constructor, o = r.precision;
			if (e = new r(e), !e.s) throw Error(a + "NaN");
			return n.s ? (i = !1, t = b(n, e, 0, 1).times(e), i = !0, n.minus(t)) : D(new r(n), o);
		}, g.naturalExponential = g.exp = function() {
			return x(this);
		}, g.naturalLogarithm = g.ln = function() {
			return T(this);
		}, g.negated = g.neg = function() {
			var e = new this.constructor(this);
			return e.s = -e.s || 0, e;
		}, g.plus = g.add = function(e) {
			var t = this;
			return e = new t.constructor(e), t.s == e.s ? _(t, e) : O(t, (e.s = -e.s, e));
		}, g.precision = g.sd = function(e) {
			var t, n, r, i = this;
			if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(o + e);
			if (t = S(i) + 1, r = i.d.length - 1, n = r * p + 1, r = i.d[r], r) {
				for (; r % 10 == 0; r /= 10) n--;
				for (r = i.d[0]; r >= 10; r /= 10) n++;
			}
			return e && t > n ? t : n;
		}, g.squareRoot = g.sqrt = function() {
			var e, t, n, r, o, s, l, u = this, d = u.constructor;
			if (u.s < 1) {
				if (!u.s) return new d(0);
				throw Error(a + "NaN");
			}
			for (e = S(u), i = !1, o = Math.sqrt(+u), o == 0 || o == 1 / 0 ? (t = y(u.d), (t.length + e) % 2 == 0 && (t += "0"), o = Math.sqrt(t), e = c((e + 1) / 2) - (e < 0 || e % 2), o == 1 / 0 ? t = "5e" + e : (t = o.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), r = new d(t)) : r = new d(o.toString()), n = d.precision, o = l = n + 3;;) if (s = r, r = s.plus(b(u, s, l + 2)).times(.5), y(s.d).slice(0, l) === (t = y(r.d)).slice(0, l)) {
				if (t = t.slice(l - 3, l + 1), o == l && t == "4999") {
					if (D(s, n + 1, 0), s.times(s).eq(u)) {
						r = s;
						break;
					}
				} else if (t != "9999") break;
				l += 4;
			}
			return i = !0, D(r, n);
		}, g.times = g.mul = function(e) {
			var t, n, r, a, o, s, c, l, u, d = this, p = d.constructor, m = d.d, h = (e = new p(e)).d;
			if (!d.s || !e.s) return new p(0);
			for (e.s *= d.s, n = d.e + e.e, l = m.length, u = h.length, l < u && (o = m, m = h, h = o, s = l, l = u, u = s), o = [], s = l + u, r = s; r--;) o.push(0);
			for (r = u; --r >= 0;) {
				for (t = 0, a = l + r; a > r;) c = o[a] + h[r] * m[a - r - 1] + t, o[a--] = c % f | 0, t = c / f | 0;
				o[a] = (o[a] + t) % f | 0;
			}
			for (; !o[--s];) o.pop();
			return t ? ++n : o.shift(), e.d = o, e.e = n, i ? D(e, p.precision) : e;
		}, g.toDecimalPlaces = g.todp = function(e, t) {
			var r = this, i = r.constructor;
			return r = new i(r), e === void 0 ? r : (v(e, 0, n), t === void 0 ? t = i.rounding : v(t, 0, 8), D(r, e + S(r) + 1, t));
		}, g.toExponential = function(e, t) {
			var r, i = this, a = i.constructor;
			return e === void 0 ? r = k(i, !0) : (v(e, 0, n), t === void 0 ? t = a.rounding : v(t, 0, 8), i = D(new a(i), e + 1, t), r = k(i, !0, e + 1)), r;
		}, g.toFixed = function(e, t) {
			var r, i, a = this, o = a.constructor;
			return e === void 0 ? k(a) : (v(e, 0, n), t === void 0 ? t = o.rounding : v(t, 0, 8), i = D(new o(a), e + S(a) + 1, t), r = k(i.abs(), !1, e + S(i) + 1), a.isneg() && !a.isZero() ? "-" + r : r);
		}, g.toInteger = g.toint = function() {
			var e = this, t = e.constructor;
			return D(new t(e), S(e) + 1, t.rounding);
		}, g.toNumber = function() {
			return +this;
		}, g.toPower = g.pow = function(e) {
			var t, n, r, o, s, l, u = this, f = u.constructor, h = 12, g = +(e = new f(e));
			if (!e.s) return new f(d);
			if (u = new f(u), !u.s) {
				if (e.s < 1) throw Error(a + "Infinity");
				return u;
			}
			if (u.eq(d)) return u;
			if (r = f.precision, e.eq(d)) return D(u, r);
			if (t = e.e, n = e.d.length - 1, l = t >= n, s = u.s, !l) {
				if (s < 0) throw Error(a + "NaN");
			} else if ((n = g < 0 ? -g : g) <= m) {
				for (o = new f(d), t = Math.ceil(r / p + 4), i = !1; n % 2 && (o = o.times(u), A(o.d, t)), n = c(n / 2), n !== 0;) u = u.times(u), A(u.d, t);
				return i = !0, e.s < 0 ? new f(d).div(o) : D(o, r);
			}
			return s = s < 0 && e.d[Math.max(t, n)] & 1 ? -1 : 1, u.s = 1, i = !1, o = e.times(T(u, r + h)), i = !0, o = x(o), o.s = s, o;
		}, g.toPrecision = function(e, t) {
			var r, i, a = this, o = a.constructor;
			return e === void 0 ? (r = S(a), i = k(a, r <= o.toExpNeg || r >= o.toExpPos)) : (v(e, 1, n), t === void 0 ? t = o.rounding : v(t, 0, 8), a = D(new o(a), e, t), r = S(a), i = k(a, e <= r || r <= o.toExpNeg, e)), i;
		}, g.toSignificantDigits = g.tosd = function(e, t) {
			var r = this, i = r.constructor;
			return e === void 0 ? (e = i.precision, t = i.rounding) : (v(e, 1, n), t === void 0 ? t = i.rounding : v(t, 0, 8)), D(new i(r), e, t);
		}, g.toString = g.valueOf = g.val = g.toJSON = function() {
			var e = this, t = S(e), n = e.constructor;
			return k(e, t <= n.toExpNeg || t >= n.toExpPos);
		};
		function _(e, t) {
			var n, r, a, o, s, c, l, u, d = e.constructor, m = d.precision;
			if (!e.s || !t.s) return t.s || (t = new d(e)), i ? D(t, m) : t;
			if (l = e.d, u = t.d, s = e.e, a = t.e, l = l.slice(), o = s - a, o) {
				for (o < 0 ? (r = l, o = -o, c = u.length) : (r = u, a = s, c = l.length), s = Math.ceil(m / p), c = s > c ? s + 1 : c + 1, o > c && (o = c, r.length = 1), r.reverse(); o--;) r.push(0);
				r.reverse();
			}
			for (c = l.length, o = u.length, c - o < 0 && (o = c, r = u, u = l, l = r), n = 0; o;) n = (l[--o] = l[o] + u[o] + n) / f | 0, l[o] %= f;
			for (n && (l.unshift(n), ++a), c = l.length; l[--c] == 0;) l.pop();
			return t.d = l, t.e = a, i ? D(t, m) : t;
		}
		function v(e, t, n) {
			if (e !== ~~e || e < t || e > n) throw Error(o + e);
		}
		function y(e) {
			var t, n, r, i = e.length - 1, a = "", o = e[0];
			if (i > 0) {
				for (a += o, t = 1; t < i; t++) r = e[t] + "", n = p - r.length, n && (a += w(n)), a += r;
				o = e[t], r = o + "", n = p - r.length, n && (a += w(n));
			} else if (o === 0) return "0";
			for (; o % 10 == 0;) o /= 10;
			return a + o;
		}
		var b = (function() {
			function e(e, t) {
				var n, r = 0, i = e.length;
				for (e = e.slice(); i--;) n = e[i] * t + r, e[i] = n % f | 0, r = n / f | 0;
				return r && e.unshift(r), e;
			}
			function t(e, t, n, r) {
				var i, a;
				if (n != r) a = n > r ? 1 : -1;
				else for (i = a = 0; i < n; i++) if (e[i] != t[i]) {
					a = e[i] > t[i] ? 1 : -1;
					break;
				}
				return a;
			}
			function n(e, t, n) {
				for (var r = 0; n--;) e[n] -= r, r = +(e[n] < t[n]), e[n] = r * f + e[n] - t[n];
				for (; !e[0] && e.length > 1;) e.shift();
			}
			return function(r, i, o, s) {
				var c, l, u, d, m, h, g, _, v, y, b, x, C, w, T, E, O, k, A = r.constructor, j = r.s == i.s ? 1 : -1, M = r.d, N = i.d;
				if (!r.s) return new A(r);
				if (!i.s) throw Error(a + "Division by zero");
				for (l = r.e - i.e, O = N.length, T = M.length, g = new A(j), _ = g.d = [], u = 0; N[u] == (M[u] || 0);) ++u;
				if (N[u] > (M[u] || 0) && --l, x = o == null ? o = A.precision : s ? o + (S(r) - S(i)) + 1 : o, x < 0) return new A(0);
				if (x = x / p + 2 | 0, u = 0, O == 1) for (d = 0, N = N[0], x++; (u < T || d) && x--; u++) C = d * f + (M[u] || 0), _[u] = C / N | 0, d = C % N | 0;
				else {
					for (d = f / (N[0] + 1) | 0, d > 1 && (N = e(N, d), M = e(M, d), O = N.length, T = M.length), w = O, v = M.slice(0, O), y = v.length; y < O;) v[y++] = 0;
					k = N.slice(), k.unshift(0), E = N[0], N[1] >= f / 2 && ++E;
					do
						d = 0, c = t(N, v, O, y), c < 0 ? (b = v[0], O != y && (b = b * f + (v[1] || 0)), d = b / E | 0, d > 1 ? (d >= f && (d = f - 1), m = e(N, d), h = m.length, y = v.length, c = t(m, v, h, y), c == 1 && (d--, n(m, O < h ? k : N, h))) : (d == 0 && (c = d = 1), m = N.slice()), h = m.length, h < y && m.unshift(0), n(v, m, y), c == -1 && (y = v.length, c = t(N, v, O, y), c < 1 && (d++, n(v, O < y ? k : N, y))), y = v.length) : c === 0 && (d++, v = [0]), _[u++] = d, c && v[0] ? v[y++] = M[w] || 0 : (v = [M[w]], y = 1);
					while ((w++ < T || v[0] !== void 0) && x--);
				}
				return _[0] || _.shift(), g.e = l, D(g, s ? o + S(g) + 1 : o);
			};
		})();
		function x(e, t) {
			var n, r, a, o, c, u, f = 0, p = 0, m = e.constructor, h = m.precision;
			if (S(e) > 16) throw Error(s + S(e));
			if (!e.s) return new m(d);
			for (t == null ? (i = !1, u = h) : u = t, c = new m(.03125); e.abs().gte(.1);) e = e.times(c), p += 5;
			for (r = Math.log(l(2, p)) / Math.LN10 * 2 + 5 | 0, u += r, n = a = o = new m(d), m.precision = u;;) {
				if (a = D(a.times(e), u), n = n.times(++f), c = o.plus(b(a, n, u)), y(c.d).slice(0, u) === y(o.d).slice(0, u)) {
					for (; p--;) o = D(o.times(o), u);
					return m.precision = h, t == null ? (i = !0, D(o, h)) : o;
				}
				o = c;
			}
		}
		function S(e) {
			for (var t = e.e * p, n = e.d[0]; n >= 10; n /= 10) t++;
			return t;
		}
		function C(e, t, n) {
			if (t > e.LN10.sd()) throw i = !0, n && (e.precision = n), Error(a + "LN10 precision limit exceeded");
			return D(new e(e.LN10), t);
		}
		function w(e) {
			for (var t = ""; e--;) t += "0";
			return t;
		}
		function T(e, t) {
			var n, r, o, s, c, l, u, f, p, m = 1, h = 10, g = e, _ = g.d, v = g.constructor, x = v.precision;
			if (g.s < 1) throw Error(a + (g.s ? "NaN" : "-Infinity"));
			if (g.eq(d)) return new v(0);
			if (t == null ? (i = !1, f = x) : f = t, g.eq(10)) return t ?? (i = !0), C(v, f);
			if (f += h, v.precision = f, n = y(_), r = n.charAt(0), s = S(g), Math.abs(s) < 0x5543df729c000) {
				for (; r < 7 && r != 1 || r == 1 && n.charAt(1) > 3;) g = g.times(e), n = y(g.d), r = n.charAt(0), m++;
				s = S(g), r > 1 ? (g = new v("0." + n), s++) : g = new v(r + "." + n.slice(1));
			} else return u = C(v, f + 2, x).times(s + ""), g = T(new v(r + "." + n.slice(1)), f - h).plus(u), v.precision = x, t == null ? (i = !0, D(g, x)) : g;
			for (l = c = g = b(g.minus(d), g.plus(d), f), p = D(g.times(g), f), o = 3;;) {
				if (c = D(c.times(p), f), u = l.plus(b(c, new v(o), f)), y(u.d).slice(0, f) === y(l.d).slice(0, f)) return l = l.times(2), s !== 0 && (l = l.plus(C(v, f + 2, x).times(s + ""))), l = b(l, new v(m), f), v.precision = x, t == null ? (i = !0, D(l, x)) : l;
				l = u, o += 2;
			}
		}
		function E(e, t) {
			var n, r, a;
			for ((n = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (r = t.search(/e/i)) > 0 ? (n < 0 && (n = r), n += +t.slice(r + 1), t = t.substring(0, r)) : n < 0 && (n = t.length), r = 0; t.charCodeAt(r) === 48;) ++r;
			for (a = t.length; t.charCodeAt(a - 1) === 48;) --a;
			if (t = t.slice(r, a), t) {
				if (a -= r, n = n - r - 1, e.e = c(n / p), e.d = [], r = (n + 1) % p, n < 0 && (r += p), r < a) {
					for (r && e.d.push(+t.slice(0, r)), a -= p; r < a;) e.d.push(+t.slice(r, r += p));
					t = t.slice(r), r = p - t.length;
				} else r -= a;
				for (; r--;) t += "0";
				if (e.d.push(+t), i && (e.e > h || e.e < -h)) throw Error(s + n);
			} else e.s = 0, e.e = 0, e.d = [0];
			return e;
		}
		function D(e, t, n) {
			var r, a, o, u, d, m, g, _, v = e.d;
			for (u = 1, o = v[0]; o >= 10; o /= 10) u++;
			if (r = t - u, r < 0) r += p, a = t, g = v[_ = 0];
			else {
				if (_ = Math.ceil((r + 1) / p), o = v.length, _ >= o) return e;
				for (g = o = v[_], u = 1; o >= 10; o /= 10) u++;
				r %= p, a = r - p + u;
			}
			if (n !== void 0 && (o = l(10, u - a - 1), d = g / o % 10 | 0, m = t < 0 || v[_ + 1] !== void 0 || g % o, m = n < 4 ? (d || m) && (n == 0 || n == (e.s < 0 ? 3 : 2)) : d > 5 || d == 5 && (n == 4 || m || n == 6 && (r > 0 ? a > 0 ? g / l(10, u - a) : 0 : v[_ - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7))), t < 1 || !v[0]) return m ? (o = S(e), v.length = 1, t = t - o - 1, v[0] = l(10, (p - t % p) % p), e.e = c(-t / p) || 0) : (v.length = 1, v[0] = e.e = e.s = 0), e;
			if (r == 0 ? (v.length = _, o = 1, _--) : (v.length = _ + 1, o = l(10, p - r), v[_] = a > 0 ? (g / l(10, u - a) % l(10, a) | 0) * o : 0), m) for (;;) if (_ == 0) {
				(v[0] += o) == f && (v[0] = 1, ++e.e);
				break;
			} else {
				if (v[_] += o, v[_] != f) break;
				v[_--] = 0, o = 1;
			}
			for (r = v.length; v[--r] === 0;) v.pop();
			if (i && (e.e > h || e.e < -h)) throw Error(s + S(e));
			return e;
		}
		function O(e, t) {
			var n, r, a, o, s, c, l, u, d, m, h = e.constructor, g = h.precision;
			if (!e.s || !t.s) return t.s ? t.s = -t.s : t = new h(e), i ? D(t, g) : t;
			if (l = e.d, m = t.d, r = t.e, u = e.e, l = l.slice(), s = u - r, s) {
				for (d = s < 0, d ? (n = l, s = -s, c = m.length) : (n = m, r = u, c = l.length), a = Math.max(Math.ceil(g / p), c) + 2, s > a && (s = a, n.length = 1), n.reverse(), a = s; a--;) n.push(0);
				n.reverse();
			} else {
				for (a = l.length, c = m.length, d = a < c, d && (c = a), a = 0; a < c; a++) if (l[a] != m[a]) {
					d = l[a] < m[a];
					break;
				}
				s = 0;
			}
			for (d && (n = l, l = m, m = n, t.s = -t.s), c = l.length, a = m.length - c; a > 0; --a) l[c++] = 0;
			for (a = m.length; a > s;) {
				if (l[--a] < m[a]) {
					for (o = a; o && l[--o] === 0;) l[o] = f - 1;
					--l[o], l[a] += f;
				}
				l[a] -= m[a];
			}
			for (; l[--c] === 0;) l.pop();
			for (; l[0] === 0; l.shift()) --r;
			return l[0] ? (t.d = l, t.e = r, i ? D(t, g) : t) : new h(0);
		}
		function k(e, t, n) {
			var r, i = S(e), a = y(e.d), o = a.length;
			return t ? (n && (r = n - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + w(r) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + w(-i - 1) + a, n && (r = n - o) > 0 && (a += w(r))) : i >= o ? (a += w(i + 1 - o), n && (r = n - i - 1) > 0 && (a = a + "." + w(r))) : ((r = i + 1) < o && (a = a.slice(0, r) + "." + a.slice(r)), n && (r = n - o) > 0 && (i + 1 === o && (a += "."), a += w(r))), e.s < 0 ? "-" + a : a;
		}
		function A(e, t) {
			if (e.length > t) return e.length = t, !0;
		}
		function j(e) {
			var t, n, r;
			function i(e) {
				var t = this;
				if (!(t instanceof i)) return new i(e);
				if (t.constructor = i, e instanceof i) t.s = e.s, t.e = e.e, t.d = (e = e.d) ? e.slice() : e;
				else {
					if (typeof e == "number") {
						if (e * 0 != 0) throw Error(o + e);
						if (e > 0) t.s = 1;
						else if (e < 0) e = -e, t.s = -1;
						else {
							t.s = 0, t.e = 0, t.d = [0];
							return;
						}
						if (e === ~~e && e < 1e7) {
							t.e = 0, t.d = [e];
							return;
						}
						return E(t, e.toString());
					}
					if (typeof e != "string") throw Error(o + e);
					if (e.charCodeAt(0) === 45 ? (e = e.slice(1), t.s = -1) : t.s = 1, u.test(e)) E(t, e);
					else throw Error(o + e);
				}
			}
			if (i.prototype = g, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = j, i.config = i.set = M, e === void 0 && (e = {}), e) for (r = [
				"precision",
				"rounding",
				"toExpNeg",
				"toExpPos",
				"LN10"
			], t = 0; t < r.length;) e.hasOwnProperty(n = r[t++]) || (e[n] = this[n]);
			return i.config(e), i;
		}
		function M(e) {
			if (!e || typeof e != "object") throw Error(a + "Object expected");
			var t, r, i, s = [
				"precision",
				1,
				n,
				"rounding",
				0,
				8,
				"toExpNeg",
				-1 / 0,
				0,
				"toExpPos",
				0,
				1 / 0
			];
			for (t = 0; t < s.length; t += 3) if ((i = e[r = s[t]]) !== void 0) {
				if (c(i) === i && i >= s[t + 1] && i <= s[t + 2]) this[r] = i;
				else throw Error(o + r + ": " + i);
			}
			if ((i = e[r = "LN10"]) !== void 0) {
				if (i == Math.LN10) this[r] = new this(i);
				else throw Error(o + r + ": " + i);
			}
			return this;
		}
		r = j(r), r.default = r.Decimal = r, d = new r(1), typeof define == "function" && define.amd ? define(function() {
			return r;
		}) : t !== void 0 && t.exports ? t.exports = r : (e ||= typeof self < "u" && self && self.self == self ? self : Function("return this")(), e.Decimal = r);
	})(n);
})))());
function sh(e) {
	return e === 0 ? 1 : Math.floor(new q.default(e).abs().log(10).toNumber()) + 1;
}
function ch(e, t, n) {
	for (var r = new q.default(e), i = 0, a = []; r.lt(t) && i < 1e5;) a.push(r.toNumber()), r = r.add(n), i++;
	return a;
}
// node_modules/recharts/es6/util/scale/getNiceTickValues.js
function lh(e, t) {
	return mh(e) || ph(e, t) || dh(e, t) || uh();
}
function uh() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function dh(e, t) {
	if (e) {
		if (typeof e == "string") return fh(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? fh(e, t) : void 0;
	}
}
function fh(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function ph(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function mh(e) {
	if (Array.isArray(e)) return e;
}
var hh = (e) => {
	var t = lh(e, 2), n = t[0], r = t[1], i = n, a = r;
	return n > r && (i = r, a = n), [i, a];
}, gh = (e, t, n) => {
	if (e.lte(0)) return new q.default(0);
	var r = sh(e.toNumber()), i = new q.default(10).pow(r), a = e.div(i), o = r === 1 ? .1 : .05, s = new q.default(Math.ceil(a.div(o).toNumber())).add(n).mul(o).mul(i);
	return t ? new q.default(s.toNumber()) : new q.default(Math.ceil(s.toNumber()));
}, _h = (e, t, n) => {
	if (e.lte(0)) return new q.default(0);
	var r = [
		1,
		2,
		2.5,
		5
	], i = e.toNumber(), a = Math.floor(new q.default(i).abs().log(10).toNumber()), o = new q.default(10).pow(a), s = e.div(o).toNumber(), c = r.findIndex((e) => e >= s - 1e-10);
	if (c === -1 && (o = o.mul(10), c = 0), c += n, c >= r.length) {
		var l = Math.floor(c / r.length);
		c %= r.length, o = o.mul(new q.default(10).pow(l));
	}
	var u = r[c] ?? 1, d = new q.default(u).mul(o);
	return t ? d : new q.default(Math.ceil(d.toNumber()));
}, vh = (e, t, n) => {
	var r = new q.default(1), i = new q.default(e);
	if (!i.isint() && n) {
		var a = Math.abs(e);
		a < 1 ? (r = new q.default(10).pow(sh(e) - 1), i = new q.default(Math.floor(i.div(r).toNumber())).mul(r)) : a > 1 && (i = new q.default(Math.floor(e)));
	} else e === 0 ? i = new q.default(Math.floor((t - 1) / 2)) : n || (i = new q.default(Math.floor(e)));
	for (var o = Math.floor((t - 1) / 2), s = [], c = 0; c < t; c++) s.push(i.add(new q.default(c - o).mul(r)).toNumber());
	return s;
}, yh = function(e, t, n, r) {
	var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : gh;
	if (!Number.isFinite((t - e) / (n - 1))) return {
		step: new q.default(0),
		tickMin: new q.default(0),
		tickMax: new q.default(0)
	};
	var o = a(new q.default(t).sub(e).div(n - 1), r, i), s;
	e <= 0 && t >= 0 ? s = new q.default(0) : (s = new q.default(e).add(t).div(2), s = s.sub(new q.default(s).mod(o)));
	var c = Math.ceil(s.sub(e).div(o).toNumber()), l = Math.ceil(new q.default(t).sub(s).div(o).toNumber()), u = c + l + 1;
	return u > n ? yh(e, t, n, r, i + 1, a) : (u < n && (l = t > 0 ? l + (n - u) : l, c = t > 0 ? c : c + (n - u)), {
		step: o,
		tickMin: s.sub(new q.default(c).mul(o)),
		tickMax: s.add(new q.default(l).mul(o))
	});
}, bh = function(e) {
	var t = lh(e, 2), n = t[0], r = t[1], i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", s = Math.max(i, 2), c = lh(hh([n, r]), 2), l = c[0], u = c[1];
	if (l === -Infinity || u === Infinity) {
		var d = u === Infinity ? [l, ...Array(i - 1).fill(Infinity)] : [...Array(i - 1).fill(-Infinity), u];
		return n > r ? d.reverse() : d;
	}
	if (l === u) return vh(l, i, a);
	var f = yh(l, u, s, a, 0, o === "snap125" ? _h : gh), p = f.step, m = f.tickMin, h = f.tickMax, g = ch(m, h.add(new q.default(.1).mul(p)), p);
	return n > r ? g.reverse() : g;
}, xh = function(e, t) {
	var n = lh(e, 2), r = n[0], i = n[1], a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", s = lh(hh([r, i]), 2), c = s[0], l = s[1];
	if (c === -Infinity || l === Infinity) return [r, i];
	if (c === l) return [c];
	var u = o === "snap125" ? _h : gh, d = Math.max(t, 2), f = u(new q.default(l).sub(c).div(d - 1), a, 0), p = [...ch(new q.default(c), new q.default(l), f), l];
	if (a === !1) {
		p = p.map((e) => Math.round(e));
		var m = p.length - 1;
		m > 0 && p[m] === p[m - 1] && (p = p.slice(0, m));
	}
	return r > i ? p.reverse() : p;
}, Sh = (e) => e.rootProps.maxBarSize, Ch = (e) => e.rootProps.barGap, wh = (e) => e.rootProps.barCategoryGap, Th = (e) => e.rootProps.barSize, Eh = (e) => e.rootProps.stackOffset, Dh = (e) => e.rootProps.reverseStackOrder, Oh = (e) => e.options.chartName, kh = (e) => e.rootProps.syncId, Ah = (e) => e.rootProps.syncMethod, jh = (e) => e.options.eventEmitter, Mh = (e) => e.rootProps.baseValue, J = {
	grid: -100,
	barBackground: -50,
	area: 100,
	cursorRectangle: 200,
	bar: 300,
	line: 400,
	axis: 500,
	scatter: 600,
	activeBar: 1e3,
	cursorLine: 1100,
	activeDot: 1200,
	label: 2e3
}, Nh = {
	allowDecimals: !1,
	allowDuplicatedCategory: !0,
	allowDataOverflow: !1,
	angle: 0,
	angleAxisId: 0,
	axisLine: !0,
	axisLineType: "polygon",
	cx: 0,
	cy: 0,
	hide: !1,
	includeHidden: !1,
	label: !1,
	niceTicks: "auto",
	orientation: "outer",
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickLine: !0,
	tickSize: 8,
	type: "auto",
	zIndex: J.axis
}, Ph = {
	allowDataOverflow: !1,
	allowDecimals: !1,
	allowDuplicatedCategory: !0,
	angle: 0,
	axisLine: !0,
	includeHidden: !1,
	hide: !1,
	niceTicks: "auto",
	label: !1,
	orientation: "right",
	radiusAxisId: 0,
	reversed: !1,
	scale: "auto",
	stroke: "#ccc",
	tick: !0,
	tickCount: 5,
	tickLine: !0,
	type: "auto",
	zIndex: J.axis
}, Fh = (e, t) => {
	if (e && t) return e != null && e.reversed ? [t[1], t[0]] : t;
};
// node_modules/recharts/es6/util/getAxisTypeBasedOnLayout.js
function Ih(e, t, n) {
	if (n !== "auto") return n;
	if (e != null) return Jc(e, t) ? "category" : "number";
}
// node_modules/recharts/es6/state/selectors/polarAxisSelectors.js
function Lh(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Rh(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Lh(Object(n), !0).forEach(function(t) {
			zh(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Lh(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function zh(e, t, n) {
	return (t = Bh(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Bh(e) {
	var t = Vh(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Vh(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Hh = {
	allowDataOverflow: Nh.allowDataOverflow,
	allowDecimals: Nh.allowDecimals,
	allowDuplicatedCategory: !1,
	dataKey: void 0,
	domain: void 0,
	id: Nh.angleAxisId,
	includeHidden: !1,
	name: void 0,
	reversed: Nh.reversed,
	scale: Nh.scale,
	tick: Nh.tick,
	tickCount: void 0,
	ticks: void 0,
	type: Nh.type,
	unit: void 0,
	niceTicks: "auto"
}, Uh = {
	allowDataOverflow: Ph.allowDataOverflow,
	allowDecimals: Ph.allowDecimals,
	allowDuplicatedCategory: Ph.allowDuplicatedCategory,
	dataKey: void 0,
	domain: void 0,
	id: Ph.radiusAxisId,
	includeHidden: Ph.includeHidden,
	name: void 0,
	reversed: Ph.reversed,
	scale: Ph.scale,
	tick: Ph.tick,
	tickCount: Ph.tickCount,
	ticks: void 0,
	type: Ph.type,
	unit: void 0,
	niceTicks: "auto"
}, Wh = V([(e, t) => {
	if (t != null) return e.polarAxis.angleAxis[t];
}, Eu], (e, t) => {
	if (e != null) return e;
	var n = Ih(t, "angleAxis", Hh.type) ?? "category";
	return Rh(Rh({}, Hh), {}, { type: n });
}), Gh = V([(e, t) => e.polarAxis.radiusAxis[t], Eu], (e, t) => {
	if (e != null) return e;
	var n = Ih(t, "radiusAxis", Uh.type) ?? "category";
	return Rh(Rh({}, Uh), {}, { type: n });
}), Kh = (e) => e.polarOptions, qh = V([
	ml,
	hl,
	Ml
], vm), Jh = V([Kh, qh], (e, t) => {
	if (e != null) return bt(e.innerRadius, t, 0);
}), Yh = V([Kh, qh], (e, t) => {
	if (e != null) return bt(e.outerRadius, t, t * .8);
}), Xh = V([Kh], (e) => e == null ? [0, 0] : [e.startAngle, e.endAngle]), Zh = V([Wh, Xh], Fh), Qh = V([
	qh,
	Jh,
	Yh
], (e, t, n) => {
	if (e != null && t != null && n != null) return [t, n];
}), $h = V([Gh, Qh], Fh), eg = V([
	K,
	Kh,
	Jh,
	Yh,
	ml,
	hl
], (e, t, n, r, i, a) => {
	if (!(e !== "centric" && e !== "radial" || t == null || n == null || r == null)) {
		var o = t.cx, s = t.cy, c = t.startAngle, l = t.endAngle;
		return {
			cx: bt(o, i, i / 2),
			cy: bt(s, a, a / 2),
			innerRadius: n,
			outerRadius: r,
			startAngle: c,
			endAngle: l,
			clockWise: !1
		};
	}
}), Y = (e, t) => t, tg = (e, t, n) => n;
// node_modules/recharts/es6/util/stacks/getStackSeriesIdentifier.js
function ng(e) {
	return e?.id;
}
// node_modules/recharts/es6/state/selectors/combiners/combineDisplayedStackedData.js
function rg(e, t, n) {
	var r = t.chartData, i = r === void 0 ? [] : r, a = n.allowDuplicatedCategory, o = n.dataKey, s = /* @__PURE__ */ new Map();
	return e.forEach((e) => {
		var t = e.data ?? i;
		if (t != null && t.length !== 0) {
			var n = ng(e);
			t.forEach((t, r) => {
				var i = o == null || a ? r : String(G(t, o, null)), c = G(t, e.dataKey, 0), l = s.has(i) ? s.get(i) : {};
				Object.assign(l, { [n]: c }), s.set(i, l);
			});
		}
	}), Array.from(s.values());
}
// node_modules/recharts/es6/state/types/StackedGraphicalItem.js
function ig(e) {
	return "stackId" in e && e.stackId != null && e.dataKey != null;
}
// node_modules/recharts/es6/state/selectors/numberDomainEqualityCheck.js
var ag = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
// node_modules/recharts/es6/state/selectors/arrayEqualityCheck.js
function og(e, t) {
	return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function sg(e, t) {
	if (e.length === t.length) {
		for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
		return !0;
	}
	return !1;
}
// node_modules/recharts/es6/state/selectors/selectTooltipAxisType.js
var cg = (e) => {
	var t = K(e);
	return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, lg = (e) => e.tooltip.settings.axisId;
// node_modules/recharts/es6/util/scale/RechartsScale.js
function ug(e) {
	if (e != null) {
		var t = e.ticks, n = e.bandwidth, r = e.range(), i = [Math.min(...r), Math.max(...r)];
		return {
			domain: () => e.domain(),
			range: function(e) {
				function t() {
					return e.apply(this, arguments);
				}
				return t.toString = function() {
					return e.toString();
				}, t;
			}(() => i),
			rangeMin: () => i[0],
			rangeMax: () => i[1],
			isInRange(e) {
				var t = i[0], n = i[1];
				return t <= n ? e >= t && e <= n : e >= n && e <= t;
			},
			bandwidth: n ? () => n.call(e) : void 0,
			ticks: t ? (n) => t.call(e, n) : void 0,
			map: (t, n) => {
				var r = e(t);
				if (r != null) {
					if (e.bandwidth && n != null && n.position) {
						var i = e.bandwidth();
						switch (n.position) {
							case "middle":
								r += i / 2;
								break;
							case "end": r += i;
						}
					}
					return r;
				}
			}
		};
	}
}
// node_modules/recharts/es6/state/selectors/combiners/combineCheckedDomain.js
var dg = (e, t) => {
	if (t != null) switch (e) {
		case "linear":
			if (!rh(t)) {
				for (var n, r, i = 0; i < t.length; i++) {
					var a = t[i];
					W(a) && ((n === void 0 || a < n) && (n = a), (r === void 0 || a > r) && (r = a));
				}
				return n !== void 0 && r !== void 0 ? [n, r] : void 0;
			}
			return t;
		default: return t;
	}
};
// node_modules/d3-scale/src/init.js
function fg(e, t) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			this.range(e);
			break;
		default: this.range(t).domain(e);
	}
	return this;
}
function pg(e, t) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			typeof e == "function" ? this.interpolator(e) : this.range(e);
			break;
		default: this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
	}
	return this;
}
// node_modules/d3-scale/src/ordinal.js
var mg = Symbol("implicit");
function hg() {
	var e = new ve(), t = [], n = [], r = mg;
	function i(i) {
		let a = e.get(i);
		if (a === void 0) {
			if (r !== mg) return r;
			e.set(i, a = t.push(i) - 1);
		}
		return n[a % n.length];
	}
	return i.domain = function(n) {
		if (!arguments.length) return t.slice();
		t = [], e = new ve();
		for (let r of n) e.has(r) || e.set(r, t.push(r) - 1);
		return i;
	}, i.range = function(e) {
		return arguments.length ? (n = Array.from(e), i) : n.slice();
	}, i.unknown = function(e) {
		return arguments.length ? (r = e, i) : r;
	}, i.copy = function() {
		return hg(t, n).unknown(r);
	}, fg.apply(i, arguments), i;
}
// node_modules/d3-scale/src/band.js
function gg() {
	var e = hg().unknown(void 0), t = e.domain, n = e.range, r = 0, i = 1, a, o, s = !1, c = 0, l = 0, u = .5;
	delete e.unknown;
	function d() {
		var e = t().length, d = i < r, f = d ? i : r, p = d ? r : i;
		a = (p - f) / Math.max(1, e - c + l * 2), s && (a = Math.floor(a)), f += (p - f - a * (e - c)) * u, o = a * (1 - c), s && (f = Math.round(f), o = Math.round(o));
		var m = Ne(e).map(function(e) {
			return f + a * e;
		});
		return n(d ? m.reverse() : m);
	}
	return e.domain = function(e) {
		return arguments.length ? (t(e), d()) : t();
	}, e.range = function(e) {
		return arguments.length ? ([r, i] = e, r = +r, i = +i, d()) : [r, i];
	}, e.rangeRound = function(e) {
		return [r, i] = e, r = +r, i = +i, s = !0, d();
	}, e.bandwidth = function() {
		return o;
	}, e.step = function() {
		return a;
	}, e.round = function(e) {
		return arguments.length ? (s = !!e, d()) : s;
	}, e.padding = function(e) {
		return arguments.length ? (c = Math.min(1, l = +e), d()) : c;
	}, e.paddingInner = function(e) {
		return arguments.length ? (c = Math.min(1, e), d()) : c;
	}, e.paddingOuter = function(e) {
		return arguments.length ? (l = +e, d()) : l;
	}, e.align = function(e) {
		return arguments.length ? (u = Math.max(0, Math.min(1, e)), d()) : u;
	}, e.copy = function() {
		return gg(t(), [r, i]).round(s).paddingInner(c).paddingOuter(l).align(u);
	}, fg.apply(d(), arguments);
}
function _g(e) {
	var t = e.copy;
	return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
		return _g(t());
	}, e;
}
function vg() {
	return _g(gg.apply(null, arguments).paddingInner(1));
}
// node_modules/d3-color/src/define.js
function yg(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function bg(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
// node_modules/d3-color/src/color.js
function xg() {}
var Sg = .7, Cg = 1 / Sg, wg = "\\s*([+-]?\\d+)\\s*", Tg = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Eg = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Dg = /^#([0-9a-f]{3,8})$/, Og = RegExp(`^rgb\\(${wg},${wg},${wg}\\)$`), kg = RegExp(`^rgb\\(${Eg},${Eg},${Eg}\\)$`), Ag = RegExp(`^rgba\\(${wg},${wg},${wg},${Tg}\\)$`), jg = RegExp(`^rgba\\(${Eg},${Eg},${Eg},${Tg}\\)$`), Mg = RegExp(`^hsl\\(${Tg},${Eg},${Eg}\\)$`), Ng = RegExp(`^hsla\\(${Tg},${Eg},${Eg},${Tg}\\)$`), Pg = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
yg(xg, zg, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: Fg,
	formatHex: Fg,
	formatHex8: Ig,
	formatHsl: Lg,
	formatRgb: Rg,
	toString: Rg
});
function Fg() {
	return this.rgb().formatHex();
}
function Ig() {
	return this.rgb().formatHex8();
}
function Lg() {
	return Qg(this).formatHsl();
}
function Rg() {
	return this.rgb().formatRgb();
}
function zg(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = Dg.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Bg(t) : n === 3 ? new Wg(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Vg(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Vg(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Og.exec(e)) ? new Wg(t[1], t[2], t[3], 1) : (t = kg.exec(e)) ? new Wg(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Ag.exec(e)) ? Vg(t[1], t[2], t[3], t[4]) : (t = jg.exec(e)) ? Vg(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Mg.exec(e)) ? Zg(t[1], t[2] / 100, t[3] / 100, 1) : (t = Ng.exec(e)) ? Zg(t[1], t[2] / 100, t[3] / 100, t[4]) : Pg.hasOwnProperty(e) ? Bg(Pg[e]) : e === "transparent" ? new Wg(NaN, NaN, NaN, 0) : null;
}
function Bg(e) {
	return new Wg(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Vg(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new Wg(e, t, n, r);
}
function Hg(e) {
	return e instanceof xg || (e = zg(e)), e ? (e = e.rgb(), new Wg(e.r, e.g, e.b, e.opacity)) : new Wg();
}
function Ug(e, t, n, r) {
	return arguments.length === 1 ? Hg(e) : new Wg(e, t, n, r ?? 1);
}
function Wg(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
yg(Wg, Ug, bg(xg, {
	brighter(e) {
		return e = e == null ? Cg : Cg ** +e, new Wg(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Sg : Sg ** +e, new Wg(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new Wg(Yg(this.r), Yg(this.g), Yg(this.b), Jg(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: Gg,
	formatHex: Gg,
	formatHex8: Kg,
	formatRgb: qg,
	toString: qg
}));
function Gg() {
	return `#${Xg(this.r)}${Xg(this.g)}${Xg(this.b)}`;
}
function Kg() {
	return `#${Xg(this.r)}${Xg(this.g)}${Xg(this.b)}${Xg((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function qg() {
	let e = Jg(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${Yg(this.r)}, ${Yg(this.g)}, ${Yg(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Jg(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Yg(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Xg(e) {
	return e = Yg(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Zg(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new e_(e, t, n, r);
}
function Qg(e) {
	if (e instanceof e_) return new e_(e.h, e.s, e.l, e.opacity);
	if (e instanceof xg || (e = zg(e)), !e) return new e_();
	if (e instanceof e_) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new e_(o, s, c, e.opacity);
}
function $g(e, t, n, r) {
	return arguments.length === 1 ? Qg(e) : new e_(e, t, n, r ?? 1);
}
function e_(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
yg(e_, $g, bg(xg, {
	brighter(e) {
		return e = e == null ? Cg : Cg ** +e, new e_(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? Sg : Sg ** +e, new e_(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new Wg(r_(e >= 240 ? e - 240 : e + 120, i, r), r_(e, i, r), r_(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new e_(t_(this.h), n_(this.s), n_(this.l), Jg(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = Jg(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${t_(this.h)}, ${n_(this.s) * 100}%, ${n_(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function t_(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function n_(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function r_(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
// node_modules/d3-interpolate/src/constant.js
var i_ = (e) => () => e;
// node_modules/d3-interpolate/src/color.js
function a_(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function o_(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function s_(e) {
	return (e = +e) == 1 ? c_ : function(t, n) {
		return n - t ? o_(t, n, e) : i_(isNaN(t) ? n : t);
	};
}
function c_(e, t) {
	var n = t - e;
	return n ? a_(e, n) : i_(isNaN(e) ? t : e);
}
// node_modules/d3-interpolate/src/rgb.js
var l_ = (function e(t) {
	var n = s_(t);
	function r(e, t) {
		var r = n((e = Ug(e)).r, (t = Ug(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = c_(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
// node_modules/d3-interpolate/src/numberArray.js
function u_(e, t) {
	t ||= [];
	var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
	return function(a) {
		for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
		return r;
	};
}
function d_(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
// node_modules/d3-interpolate/src/array.js
function f_(e, t) {
	for (var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = Array(r), a = Array(n), o = 0; o < r; ++o) i[o] = x_(e[o], t[o]);
	for (; o < n; ++o) a[o] = t[o];
	return function(e) {
		for (o = 0; o < r; ++o) a[o] = i[o](e);
		return a;
	};
}
// node_modules/d3-interpolate/src/date.js
function p_(e, t) {
	var n = /* @__PURE__ */ new Date();
	return e = +e, t = +t, function(r) {
		return n.setTime(e * (1 - r) + t * r), n;
	};
}
// node_modules/d3-interpolate/src/number.js
function m_(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
// node_modules/d3-interpolate/src/object.js
function h_(e, t) {
	var n = {}, r = {}, i;
	for (i in typeof e == "object" && e || (e = {}), typeof t == "object" && t || (t = {}), t) i in e ? n[i] = x_(e[i], t[i]) : r[i] = t[i];
	return function(e) {
		for (i in n) r[i] = n[i](e);
		return r;
	};
}
// node_modules/d3-interpolate/src/string.js
var g_ = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, __ = new RegExp(g_.source, "g");
function v_(e) {
	return function() {
		return e;
	};
}
function y_(e) {
	return function(t) {
		return e(t) + "";
	};
}
function b_(e, t) {
	var n = g_.lastIndex = __.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = g_.exec(e)) && (i = __.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: m_(r, i)
	})), n = __.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? y_(c[0].x) : v_(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
// node_modules/d3-interpolate/src/value.js
function x_(e, t) {
	var n = typeof t, r;
	return t == null || n === "boolean" ? i_(t) : (n === "number" ? m_ : n === "string" ? (r = zg(t)) ? (t = r, l_) : b_ : t instanceof zg ? l_ : t instanceof Date ? p_ : d_(t) ? u_ : Array.isArray(t) ? f_ : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? h_ : m_)(e, t);
}
// node_modules/d3-interpolate/src/round.js
function S_(e, t) {
	return e = +e, t = +t, function(n) {
		return Math.round(e * (1 - n) + t * n);
	};
}
// node_modules/d3-interpolate/src/piecewise.js
function C_(e, t) {
	t === void 0 && (t = e, e = x_);
	for (var n = 0, r = t.length - 1, i = t[0], a = Array(r < 0 ? 0 : r); n < r;) a[n] = e(i, i = t[++n]);
	return function(e) {
		var t = Math.max(0, Math.min(r - 1, Math.floor(e *= r)));
		return a[t](e - t);
	};
}
// node_modules/d3-scale/src/constant.js
function w_(e) {
	return function() {
		return e;
	};
}
// node_modules/d3-scale/src/number.js
function T_(e) {
	return +e;
}
// node_modules/d3-scale/src/continuous.js
var E_ = [0, 1];
function D_(e) {
	return e;
}
function O_(e, t) {
	return (t -= e = +e) ? function(n) {
		return (n - e) / t;
	} : w_(isNaN(t) ? NaN : .5);
}
function k_(e, t) {
	var n;
	return e > t && (n = e, e = t, t = n), function(n) {
		return Math.max(e, Math.min(t, n));
	};
}
function A_(e, t, n) {
	var r = e[0], i = e[1], a = t[0], o = t[1];
	return i < r ? (r = O_(i, r), a = n(o, a)) : (r = O_(r, i), a = n(a, o)), function(e) {
		return a(r(e));
	};
}
function j_(e, t, n) {
	var r = Math.min(e.length, t.length) - 1, i = Array(r), a = Array(r), o = -1;
	for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < r;) i[o] = O_(e[o], e[o + 1]), a[o] = n(t[o], t[o + 1]);
	return function(t) {
		var n = _e(e, t, 1, r) - 1;
		return a[n](i[n](t));
	};
}
function M_(e, t) {
	return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function N_() {
	var e = E_, t = E_, n = x_, r, i, a, o = D_, s, c, l;
	function u() {
		var n = Math.min(e.length, t.length);
		return o !== D_ && (o = k_(e[0], e[n - 1])), s = n > 2 ? j_ : A_, c = l = null, d;
	}
	function d(i) {
		return i == null || isNaN(i = +i) ? a : (c ||= s(e.map(r), t, n))(r(o(i)));
	}
	return d.invert = function(n) {
		return o(i((l ||= s(t, e.map(r), m_))(n)));
	}, d.domain = function(t) {
		return arguments.length ? (e = Array.from(t, T_), u()) : e.slice();
	}, d.range = function(e) {
		return arguments.length ? (t = Array.from(e), u()) : t.slice();
	}, d.rangeRound = function(e) {
		return t = Array.from(e), n = S_, u();
	}, d.clamp = function(e) {
		return arguments.length ? (o = e ? !0 : D_, u()) : o !== D_;
	}, d.interpolate = function(e) {
		return arguments.length ? (n = e, u()) : n;
	}, d.unknown = function(e) {
		return arguments.length ? (a = e, d) : a;
	}, function(e, t) {
		return r = e, i = t, u();
	};
}
function P_() {
	return N_()(D_, D_);
}
// node_modules/d3-format/src/formatDecimal.js
function F_(e) {
	return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function I_(e, t) {
	if (!isFinite(e) || e === 0) return null;
	var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), r = e.slice(0, n);
	return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
// node_modules/d3-format/src/exponent.js
function L_(e) {
	return e = I_(Math.abs(e)), e ? e[1] : NaN;
}
// node_modules/d3-format/src/formatGroup.js
function R_(e, t) {
	return function(n, r) {
		for (var i = n.length, a = [], o = 0, s = e[0], c = 0; i > 0 && s > 0 && (c + s + 1 > r && (s = Math.max(1, r - c)), a.push(n.substring(i -= s, i + s)), !((c += s + 1) > r));) s = e[o = (o + 1) % e.length];
		return a.reverse().join(t);
	};
}
// node_modules/d3-format/src/formatNumerals.js
function z_(e) {
	return function(t) {
		return t.replace(/[0-9]/g, function(t) {
			return e[+t];
		});
	};
}
// node_modules/d3-format/src/formatSpecifier.js
var B_ = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function V_(e) {
	if (!(t = B_.exec(e))) throw Error("invalid format: " + e);
	var t;
	return new H_({
		fill: t[1],
		align: t[2],
		sign: t[3],
		symbol: t[4],
		zero: t[5],
		width: t[6],
		comma: t[7],
		precision: t[8] && t[8].slice(1),
		trim: t[9],
		type: t[10]
	});
}
V_.prototype = H_.prototype;
function H_(e) {
	this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
H_.prototype.toString = function() {
	return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
// node_modules/d3-format/src/formatTrim.js
function U_(e) {
	out: for (var t = e.length, n = 1, r = -1, i; n < t; ++n) switch (e[n]) {
		case ".":
			r = i = n;
			break;
		case "0":
			r === 0 && (r = n), i = n;
			break;
		default:
			if (!+e[n]) break out;
			r > 0 && (r = 0);
	}
	return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
// node_modules/d3-format/src/formatPrefixAuto.js
var W_;
function G_(e, t) {
	var n = I_(e, t);
	if (!n) return W_ = void 0, e.toPrecision(t);
	var r = n[0], i = n[1], a = i - (W_ = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
	return a === o ? r : a > o ? r + Array(a - o + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + Array(1 - a).join("0") + I_(e, Math.max(0, t + a - 1))[0];
}
// node_modules/d3-format/src/formatRounded.js
function K_(e, t) {
	var n = I_(e, t);
	if (!n) return e + "";
	var r = n[0], i = n[1];
	return i < 0 ? "0." + Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + Array(i - r.length + 2).join("0");
}
// node_modules/d3-format/src/formatTypes.js
var q_ = {
	"%": (e, t) => (e * 100).toFixed(t),
	b: (e) => Math.round(e).toString(2),
	c: (e) => e + "",
	d: F_,
	e: (e, t) => e.toExponential(t),
	f: (e, t) => e.toFixed(t),
	g: (e, t) => e.toPrecision(t),
	o: (e) => Math.round(e).toString(8),
	p: (e, t) => K_(e * 100, t),
	r: K_,
	s: G_,
	X: (e) => Math.round(e).toString(16).toUpperCase(),
	x: (e) => Math.round(e).toString(16)
};
// node_modules/d3-format/src/identity.js
function J_(e) {
	return e;
}
// node_modules/d3-format/src/locale.js
var Y_ = Array.prototype.map, X_ = [
	"y",
	"z",
	"a",
	"f",
	"p",
	"n",
	"µ",
	"m",
	"",
	"k",
	"M",
	"G",
	"T",
	"P",
	"E",
	"Z",
	"Y"
];
function Z_(e) {
	var t = e.grouping === void 0 || e.thousands === void 0 ? J_ : R_(Y_.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? J_ : z_(Y_.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", s = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
	function l(e, l) {
		e = V_(e);
		var u = e.fill, d = e.align, f = e.sign, p = e.symbol, m = e.zero, h = e.width, g = e.comma, _ = e.precision, v = e.trim, y = e.type;
		y === "n" ? (g = !0, y = "g") : q_[y] || (_ === void 0 && (_ = 12), v = !0, y = "g"), (m || u === "0" && d === "=") && (m = !0, u = "0", d = "=");
		var b = (l && l.prefix !== void 0 ? l.prefix : "") + (p === "$" ? n : p === "#" && /[boxX]/.test(y) ? "0" + y.toLowerCase() : ""), x = (p === "$" ? r : /[%p]/.test(y) ? o : "") + (l && l.suffix !== void 0 ? l.suffix : ""), S = q_[y], C = /[defgprs%]/.test(y);
		_ = _ === void 0 ? 6 : /[gprs]/.test(y) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));
		function w(e) {
			var n = b, r = x, o, l, p;
			if (y === "c") r = S(e) + r, e = "";
			else {
				e = +e;
				var w = e < 0 || 1 / e < 0;
				if (e = isNaN(e) ? c : S(Math.abs(e), _), v && (e = U_(e)), w && +e == 0 && f !== "+" && (w = !1), n = (w ? f === "(" ? f : s : f === "-" || f === "(" ? "" : f) + n, r = (y === "s" && !isNaN(e) && W_ !== void 0 ? X_[8 + W_ / 3] : "") + r + (w && f === "(" ? ")" : ""), C) {
					for (o = -1, l = e.length; ++o < l;) if (p = e.charCodeAt(o), 48 > p || p > 57) {
						r = (p === 46 ? i + e.slice(o + 1) : e.slice(o)) + r, e = e.slice(0, o);
						break;
					}
				}
			}
			g && !m && (e = t(e, Infinity));
			var T = n.length + e.length + r.length, E = T < h ? Array(h - T + 1).join(u) : "";
			switch (g && m && (e = t(E + e, E.length ? h - r.length : Infinity), E = ""), d) {
				case "<":
					e = n + e + r + E;
					break;
				case "=":
					e = n + E + e + r;
					break;
				case "^":
					e = E.slice(0, T = E.length >> 1) + n + e + r + E.slice(T);
					break;
				default: e = E + n + e + r;
			}
			return a(e);
		}
		return w.toString = function() {
			return e + "";
		}, w;
	}
	function u(e, t) {
		var n = Math.max(-8, Math.min(8, Math.floor(L_(t) / 3))) * 3, r = 10 ** -n, i = l((e = V_(e), e.type = "f", e), { suffix: X_[8 + n / 3] });
		return function(e) {
			return i(r * e);
		};
	}
	return {
		format: l,
		formatPrefix: u
	};
}
// node_modules/d3-format/src/defaultLocale.js
var Q_, $_, ev;
tv({
	thousands: ",",
	grouping: [3],
	currency: ["$", ""]
});
function tv(e) {
	return Q_ = Z_(e), $_ = Q_.format, ev = Q_.formatPrefix, Q_;
}
// node_modules/d3-format/src/precisionFixed.js
function nv(e) {
	return Math.max(0, -L_(Math.abs(e)));
}
// node_modules/d3-format/src/precisionPrefix.js
function rv(e, t) {
	return Math.max(0, Math.max(-8, Math.min(8, Math.floor(L_(t) / 3))) * 3 - L_(Math.abs(e)));
}
// node_modules/d3-format/src/precisionRound.js
function iv(e, t) {
	return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, L_(t) - L_(e)) + 1;
}
// node_modules/d3-scale/src/tickFormat.js
function av(e, t, n, r) {
	var i = Oe(e, t, n), a;
	switch (r = V_(r ?? ",f"), r.type) {
		case "s":
			var o = Math.max(Math.abs(e), Math.abs(t));
			return r.precision == null && !isNaN(a = rv(i, o)) && (r.precision = a), ev(r, o);
		case "":
		case "e":
		case "g":
		case "p":
		case "r":
			r.precision == null && !isNaN(a = iv(i, Math.max(Math.abs(e), Math.abs(t)))) && (r.precision = a - (r.type === "e"));
			break;
		case "f":
		case "%": r.precision == null && !isNaN(a = nv(i)) && (r.precision = a - (r.type === "%") * 2);
	}
	return $_(r);
}
// node_modules/d3-scale/src/linear.js
function ov(e) {
	var t = e.domain;
	return e.ticks = function(e) {
		var n = t();
		return Ee(n[0], n[n.length - 1], e ?? 10);
	}, e.tickFormat = function(e, n) {
		var r = t();
		return av(r[0], r[r.length - 1], e ?? 10, n);
	}, e.nice = function(n) {
		n ??= 10;
		var r = t(), i = 0, a = r.length - 1, o = r[i], s = r[a], c, l, u = 10;
		for (s < o && (l = o, o = s, s = l, l = i, i = a, a = l); u-- > 0;) {
			if (l = De(o, s, n), l === c) return r[i] = o, r[a] = s, t(r);
			if (l > 0) o = Math.floor(o / l) * l, s = Math.ceil(s / l) * l;
			else if (l < 0) o = Math.ceil(o * l) / l, s = Math.floor(s * l) / l;
			else break;
			c = l;
		}
		return e;
	}, e;
}
function sv() {
	var e = P_();
	return e.copy = function() {
		return M_(e, sv());
	}, fg.apply(e, arguments), ov(e);
}
// node_modules/d3-scale/src/identity.js
function cv(e) {
	var t;
	function n(e) {
		return e == null || isNaN(e = +e) ? t : e;
	}
	return n.invert = n, n.domain = n.range = function(t) {
		return arguments.length ? (e = Array.from(t, T_), n) : e.slice();
	}, n.unknown = function(e) {
		return arguments.length ? (t = e, n) : t;
	}, n.copy = function() {
		return cv(e).unknown(t);
	}, e = arguments.length ? Array.from(e, T_) : [0, 1], ov(n);
}
// node_modules/d3-scale/src/nice.js
function lv(e, t) {
	e = e.slice();
	var n = 0, r = e.length - 1, i = e[n], a = e[r], o;
	return a < i && (o = n, n = r, r = o, o = i, i = a, a = o), e[n] = t.floor(i), e[r] = t.ceil(a), e;
}
// node_modules/d3-scale/src/log.js
function uv(e) {
	return Math.log(e);
}
function dv(e) {
	return Math.exp(e);
}
function fv(e) {
	return -Math.log(-e);
}
function pv(e) {
	return -Math.exp(-e);
}
function mv(e) {
	return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function hv(e) {
	return e === 10 ? mv : e === Math.E ? Math.exp : (t) => e ** +t;
}
function gv(e) {
	return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function _v(e) {
	return (t, n) => -e(-t, n);
}
function vv(e) {
	let t = e(uv, dv), n = t.domain, r = 10, i, a;
	function o() {
		return i = gv(r), a = hv(r), n()[0] < 0 ? (i = _v(i), a = _v(a), e(fv, pv)) : e(uv, dv), t;
	}
	return t.base = function(e) {
		return arguments.length ? (r = +e, o()) : r;
	}, t.domain = function(e) {
		return arguments.length ? (n(e), o()) : n();
	}, t.ticks = (e) => {
		let t = n(), o = t[0], s = t[t.length - 1], c = s < o;
		c && ([o, s] = [s, o]);
		let l = i(o), u = i(s), d, f, p = e == null ? 10 : +e, m = [];
		if (!(r % 1) && u - l < p) {
			if (l = Math.floor(l), u = Math.ceil(u), o > 0) {
				for (; l <= u; ++l) for (d = 1; d < r; ++d) if (f = l < 0 ? d / a(-l) : d * a(l), !(f < o)) {
					if (f > s) break;
					m.push(f);
				}
			} else for (; l <= u; ++l) for (d = r - 1; d >= 1; --d) if (f = l > 0 ? d / a(-l) : d * a(l), !(f < o)) {
				if (f > s) break;
				m.push(f);
			}
			m.length * 2 < p && (m = Ee(o, s, p));
		} else m = Ee(l, u, Math.min(u - l, p)).map(a);
		return c ? m.reverse() : m;
	}, t.tickFormat = (e, n) => {
		if (e ??= 10, n ??= r === 10 ? "s" : ",", typeof n != "function" && (!(r % 1) && (n = V_(n)).precision == null && (n.trim = !0), n = $_(n)), e === Infinity) return n;
		let o = Math.max(1, r * e / t.ticks().length);
		return (e) => {
			let t = e / a(Math.round(i(e)));
			return t * r < r - .5 && (t *= r), t <= o ? n(e) : "";
		};
	}, t.nice = () => n(lv(n(), {
		floor: (e) => a(Math.floor(i(e))),
		ceil: (e) => a(Math.ceil(i(e)))
	})), t;
}
function yv() {
	let e = vv(N_()).domain([1, 10]);
	return e.copy = () => M_(e, yv()).base(e.base()), fg.apply(e, arguments), e;
}
// node_modules/d3-scale/src/symlog.js
function bv(e) {
	return function(t) {
		return Math.sign(t) * Math.log1p(Math.abs(t / e));
	};
}
function xv(e) {
	return function(t) {
		return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
	};
}
function Sv(e) {
	var t = 1, n = e(bv(t), xv(t));
	return n.constant = function(n) {
		return arguments.length ? e(bv(t = +n), xv(t)) : t;
	}, ov(n);
}
function Cv() {
	var e = Sv(N_());
	return e.copy = function() {
		return M_(e, Cv()).constant(e.constant());
	}, fg.apply(e, arguments);
}
// node_modules/d3-scale/src/pow.js
function wv(e) {
	return function(t) {
		return t < 0 ? -((-t) ** +e) : t ** +e;
	};
}
function Tv(e) {
	return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function Ev(e) {
	return e < 0 ? -e * e : e * e;
}
function Dv(e) {
	var t = e(D_, D_), n = 1;
	function r() {
		return n === 1 ? e(D_, D_) : n === .5 ? e(Tv, Ev) : e(wv(n), wv(1 / n));
	}
	return t.exponent = function(e) {
		return arguments.length ? (n = +e, r()) : n;
	}, ov(t);
}
function Ov() {
	var e = Dv(N_());
	return e.copy = function() {
		return M_(e, Ov()).exponent(e.exponent());
	}, fg.apply(e, arguments), e;
}
function kv() {
	return Ov.apply(null, arguments).exponent(.5);
}
// node_modules/d3-scale/src/radial.js
function Av(e) {
	return Math.sign(e) * e * e;
}
function jv(e) {
	return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function Mv() {
	var e = P_(), t = [0, 1], n = !1, r;
	function i(t) {
		var i = jv(e(t));
		return isNaN(i) ? r : n ? Math.round(i) : i;
	}
	return i.invert = function(t) {
		return e.invert(Av(t));
	}, i.domain = function(t) {
		return arguments.length ? (e.domain(t), i) : e.domain();
	}, i.range = function(n) {
		return arguments.length ? (e.range((t = Array.from(n, T_)).map(Av)), i) : t.slice();
	}, i.rangeRound = function(e) {
		return i.range(e).round(!0);
	}, i.round = function(e) {
		return arguments.length ? (n = !!e, i) : n;
	}, i.clamp = function(t) {
		return arguments.length ? (e.clamp(t), i) : e.clamp();
	}, i.unknown = function(e) {
		return arguments.length ? (r = e, i) : r;
	}, i.copy = function() {
		return Mv(e.domain(), t).round(n).clamp(e.clamp()).unknown(r);
	}, fg.apply(i, arguments), ov(i);
}
// node_modules/d3-scale/src/quantile.js
function Nv() {
	var e = [], t = [], n = [], r;
	function i() {
		var r = 0, i = Math.max(1, t.length);
		for (n = Array(i - 1); ++r < i;) n[r - 1] = Me(e, r / i);
		return a;
	}
	function a(e) {
		return e == null || isNaN(e = +e) ? r : t[_e(n, e)];
	}
	return a.invertExtent = function(r) {
		var i = t.indexOf(r);
		return i < 0 ? [NaN, NaN] : [i > 0 ? n[i - 1] : e[0], i < n.length ? n[i] : e[e.length - 1]];
	}, a.domain = function(t) {
		if (!arguments.length) return e.slice();
		e = [];
		for (let n of t) n != null && !isNaN(n = +n) && e.push(n);
		return e.sort(de), i();
	}, a.range = function(e) {
		return arguments.length ? (t = Array.from(e), i()) : t.slice();
	}, a.unknown = function(e) {
		return arguments.length ? (r = e, a) : r;
	}, a.quantiles = function() {
		return n.slice();
	}, a.copy = function() {
		return Nv().domain(e).range(t).unknown(r);
	}, fg.apply(a, arguments);
}
// node_modules/d3-scale/src/quantize.js
function Pv() {
	var e = 0, t = 1, n = 1, r = [.5], i = [0, 1], a;
	function o(e) {
		return e != null && e <= e ? i[_e(r, e, 0, n)] : a;
	}
	function s() {
		var i = -1;
		for (r = Array(n); ++i < n;) r[i] = ((i + 1) * t - (i - n) * e) / (n + 1);
		return o;
	}
	return o.domain = function(n) {
		return arguments.length ? ([e, t] = n, e = +e, t = +t, s()) : [e, t];
	}, o.range = function(e) {
		return arguments.length ? (n = (i = Array.from(e)).length - 1, s()) : i.slice();
	}, o.invertExtent = function(a) {
		var o = i.indexOf(a);
		return o < 0 ? [NaN, NaN] : o < 1 ? [e, r[0]] : o >= n ? [r[n - 1], t] : [r[o - 1], r[o]];
	}, o.unknown = function(e) {
		return arguments.length && (a = e), o;
	}, o.thresholds = function() {
		return r.slice();
	}, o.copy = function() {
		return Pv().domain([e, t]).range(i).unknown(a);
	}, fg.apply(ov(o), arguments);
}
// node_modules/d3-scale/src/threshold.js
function Fv() {
	var e = [.5], t = [0, 1], n, r = 1;
	function i(i) {
		return i != null && i <= i ? t[_e(e, i, 0, r)] : n;
	}
	return i.domain = function(n) {
		return arguments.length ? (e = Array.from(n), r = Math.min(e.length, t.length - 1), i) : e.slice();
	}, i.range = function(n) {
		return arguments.length ? (t = Array.from(n), r = Math.min(e.length, t.length - 1), i) : t.slice();
	}, i.invertExtent = function(n) {
		var r = t.indexOf(n);
		return [e[r - 1], e[r]];
	}, i.unknown = function(e) {
		return arguments.length ? (n = e, i) : n;
	}, i.copy = function() {
		return Fv().domain(e).range(t).unknown(n);
	}, fg.apply(i, arguments);
}
// node_modules/d3-time/src/interval.js
var Iv = /* @__PURE__ */ new Date(), Lv = /* @__PURE__ */ new Date();
function Rv(e, t, n, r) {
	function i(t) {
		return e(t = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+t)), t;
	}
	return i.floor = (t) => (e(t = /* @__PURE__ */ new Date(+t)), t), i.ceil = (n) => (e(n = /* @__PURE__ */ new Date(n - 1)), t(n, 1), e(n), n), i.round = (e) => {
		let t = i(e), n = i.ceil(e);
		return e - t < n - e ? t : n;
	}, i.offset = (e, n) => (t(e = /* @__PURE__ */ new Date(+e), n == null ? 1 : Math.floor(n)), e), i.range = (n, r, a) => {
		let o = [];
		if (n = i.ceil(n), a = a == null ? 1 : Math.floor(a), !(n < r) || !(a > 0)) return o;
		let s;
		do
			o.push(s = /* @__PURE__ */ new Date(+n)), t(n, a), e(n);
		while (s < n && n < r);
		return o;
	}, i.filter = (n) => Rv((t) => {
		if (t >= t) for (; e(t), !n(t);) t.setTime(t - 1);
	}, (e, r) => {
		if (e >= e) {
			if (r < 0) for (; ++r <= 0;) for (; t(e, -1), !n(e););
			else for (; --r >= 0;) for (; t(e, 1), !n(e););
		}
	}), n && (i.count = (t, r) => (Iv.setTime(+t), Lv.setTime(+r), e(Iv), e(Lv), Math.floor(n(Iv, Lv))), i.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? i.filter(r ? (t) => r(t) % e === 0 : (t) => i.count(0, t) % e === 0) : i)), i;
}
// node_modules/d3-time/src/millisecond.js
var zv = Rv(() => {}, (e, t) => {
	e.setTime(+e + t);
}, (e, t) => t - e);
zv.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Rv((t) => {
	t.setTime(Math.floor(t / e) * e);
}, (t, n) => {
	t.setTime(+t + n * e);
}, (t, n) => (n - t) / e) : zv), zv.range;
// node_modules/d3-time/src/duration.js
var Bv = 1e3, Vv = Bv * 60, Hv = Vv * 60, Uv = Hv * 24, Wv = Uv * 7, Gv = Uv * 30, Kv = Uv * 365, qv = Rv((e) => {
	e.setTime(e - e.getMilliseconds());
}, (e, t) => {
	e.setTime(+e + t * Bv);
}, (e, t) => (t - e) / Bv, (e) => e.getUTCSeconds());
qv.range;
// node_modules/d3-time/src/minute.js
var Jv = Rv((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * Bv);
}, (e, t) => {
	e.setTime(+e + t * Vv);
}, (e, t) => (t - e) / Vv, (e) => e.getMinutes());
Jv.range;
var Yv = Rv((e) => {
	e.setUTCSeconds(0, 0);
}, (e, t) => {
	e.setTime(+e + t * Vv);
}, (e, t) => (t - e) / Vv, (e) => e.getUTCMinutes());
Yv.range;
// node_modules/d3-time/src/hour.js
var Xv = Rv((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * Bv - e.getMinutes() * Vv);
}, (e, t) => {
	e.setTime(+e + t * Hv);
}, (e, t) => (t - e) / Hv, (e) => e.getHours());
Xv.range;
var Zv = Rv((e) => {
	e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
	e.setTime(+e + t * Hv);
}, (e, t) => (t - e) / Hv, (e) => e.getUTCHours());
Zv.range;
// node_modules/d3-time/src/day.js
var Qv = Rv((e) => e.setHours(0, 0, 0, 0), (e, t) => e.setDate(e.getDate() + t), (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Vv) / Uv, (e) => e.getDate() - 1);
Qv.range;
var $v = Rv((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Uv, (e) => e.getUTCDate() - 1);
$v.range;
var ey = Rv((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Uv, (e) => Math.floor(e / Uv));
ey.range;
// node_modules/d3-time/src/week.js
function ty(e) {
	return Rv((t) => {
		t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setDate(e.getDate() + t * 7);
	}, (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Vv) / Wv);
}
var ny = ty(0), ry = ty(1), iy = ty(2), ay = ty(3), oy = ty(4), sy = ty(5), cy = ty(6);
ny.range, ry.range, iy.range, ay.range, oy.range, sy.range, cy.range;
function ly(e) {
	return Rv((t) => {
		t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setUTCDate(e.getUTCDate() + t * 7);
	}, (e, t) => (t - e) / Wv);
}
var uy = ly(0), dy = ly(1), fy = ly(2), py = ly(3), my = ly(4), hy = ly(5), gy = ly(6);
uy.range, dy.range, fy.range, py.range, my.range, hy.range, gy.range;
// node_modules/d3-time/src/month.js
var _y = Rv((e) => {
	e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
_y.range;
var vy = Rv((e) => {
	e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
vy.range;
// node_modules/d3-time/src/year.js
var yy = Rv((e) => {
	e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
yy.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Rv((t) => {
	t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, n) => {
	t.setFullYear(t.getFullYear() + n * e);
}), yy.range;
var by = Rv((e) => {
	e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
by.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Rv((t) => {
	t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, n) => {
	t.setUTCFullYear(t.getUTCFullYear() + n * e);
}), by.range;
// node_modules/d3-time/src/ticks.js
function xy(e, t, n, r, i, a) {
	let o = [
		[
			qv,
			1,
			Bv
		],
		[
			qv,
			5,
			5 * Bv
		],
		[
			qv,
			15,
			15 * Bv
		],
		[
			qv,
			30,
			30 * Bv
		],
		[
			a,
			1,
			Vv
		],
		[
			a,
			5,
			5 * Vv
		],
		[
			a,
			15,
			15 * Vv
		],
		[
			a,
			30,
			30 * Vv
		],
		[
			i,
			1,
			Hv
		],
		[
			i,
			3,
			3 * Hv
		],
		[
			i,
			6,
			6 * Hv
		],
		[
			i,
			12,
			12 * Hv
		],
		[
			r,
			1,
			Uv
		],
		[
			r,
			2,
			2 * Uv
		],
		[
			n,
			1,
			Wv
		],
		[
			t,
			1,
			Gv
		],
		[
			t,
			3,
			3 * Gv
		],
		[
			e,
			1,
			Kv
		]
	];
	function s(e, t, n) {
		let r = t < e;
		r && ([e, t] = [t, e]);
		let i = n && typeof n.range == "function" ? n : c(e, t, n), a = i ? i.range(e, +t + 1) : [];
		return r ? a.reverse() : a;
	}
	function c(t, n, r) {
		let i = Math.abs(n - t) / r, a = fe(([, , e]) => e).right(o, i);
		if (a === o.length) return e.every(Oe(t / Kv, n / Kv, r));
		if (a === 0) return zv.every(Math.max(Oe(t, n, r), 1));
		let [s, c] = o[i / o[a - 1][2] < o[a][2] / i ? a - 1 : a];
		return s.every(c);
	}
	return [s, c];
}
var [Sy, Cy] = xy(by, vy, uy, ey, Zv, Yv), [wy, Ty] = xy(yy, _y, ny, Qv, Xv, Jv);
// node_modules/d3-time-format/src/locale.js
function Ey(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
		return t.setFullYear(e.y), t;
	}
	return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Dy(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
		return t.setUTCFullYear(e.y), t;
	}
	return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Oy(e, t, n) {
	return {
		y: e,
		m: t,
		d: n,
		H: 0,
		M: 0,
		S: 0,
		L: 0
	};
}
function ky(e) {
	var t = e.dateTime, n = e.date, r = e.time, i = e.periods, a = e.days, o = e.shortDays, s = e.months, c = e.shortMonths, l = Fy(i), u = Iy(i), d = Fy(a), f = Iy(a), p = Fy(o), m = Iy(o), h = Fy(s), g = Iy(s), _ = Fy(c), v = Iy(c), y = {
		a: N,
		A: ee,
		b: te,
		B: P,
		c: null,
		d: rb,
		e: rb,
		f: cb,
		g: yb,
		G: xb,
		H: ib,
		I: ab,
		j: ob,
		L: sb,
		m: lb,
		M: ub,
		p: ne,
		q: re,
		Q: Wb,
		s: Gb,
		S: db,
		u: fb,
		U: pb,
		V: hb,
		w: gb,
		W: _b,
		x: null,
		X: null,
		y: vb,
		Y: bb,
		Z: Sb,
		"%": Ub
	}, b = {
		a: ie,
		A: ae,
		b: oe,
		B: se,
		c: null,
		d: Cb,
		e: Cb,
		f: Ob,
		g: zb,
		G: Vb,
		H: wb,
		I: Tb,
		j: Eb,
		L: Db,
		m: kb,
		M: Ab,
		p: ce,
		q: le,
		Q: Wb,
		s: Gb,
		S: jb,
		u: Mb,
		U: Nb,
		V: Fb,
		w: Ib,
		W: Lb,
		x: null,
		X: null,
		y: Rb,
		Y: Bb,
		Z: Hb,
		"%": Ub
	}, x = {
		a: E,
		A: D,
		b: O,
		B: k,
		c: A,
		d: qy,
		e: qy,
		f: $y,
		g: Uy,
		G: Hy,
		H: Yy,
		I: Yy,
		j: Jy,
		L: Qy,
		m: Ky,
		M: Xy,
		p: T,
		q: Gy,
		Q: tb,
		s: nb,
		S: Zy,
		u: Ry,
		U: zy,
		V: By,
		w: Ly,
		W: Vy,
		x: j,
		X: M,
		y: Uy,
		Y: Hy,
		Z: Wy,
		"%": eb
	};
	y.x = S(n, y), y.X = S(r, y), y.c = S(t, y), b.x = S(n, b), b.X = S(r, b), b.c = S(t, b);
	function S(e, t) {
		return function(n) {
			var r = [], i = -1, a = 0, o = e.length, s, c, l;
			for (n instanceof Date || (n = /* @__PURE__ */ new Date(+n)); ++i < o;) e.charCodeAt(i) === 37 && (r.push(e.slice(a, i)), (c = Ay[s = e.charAt(++i)]) == null ? c = s === "e" ? " " : "0" : s = e.charAt(++i), (l = t[s]) && (s = l(n, c)), r.push(s), a = i + 1);
			return r.push(e.slice(a, i)), r.join("");
		};
	}
	function C(e, t) {
		return function(n) {
			var r = Oy(1900, void 0, 1), i = w(r, e, n += "", 0), a, o;
			if (i != n.length) return null;
			if ("Q" in r) return new Date(r.Q);
			if ("s" in r) return new Date(r.s * 1e3 + ("L" in r ? r.L : 0));
			if (t && !("Z" in r) && (r.Z = 0), "p" in r && (r.H = r.H % 12 + r.p * 12), r.m === void 0 && (r.m = "q" in r ? r.q : 0), "V" in r) {
				if (r.V < 1 || r.V > 53) return null;
				"w" in r || (r.w = 1), "Z" in r ? (a = Dy(Oy(r.y, 0, 1)), o = a.getUTCDay(), a = o > 4 || o === 0 ? dy.ceil(a) : dy(a), a = $v.offset(a, (r.V - 1) * 7), r.y = a.getUTCFullYear(), r.m = a.getUTCMonth(), r.d = a.getUTCDate() + (r.w + 6) % 7) : (a = Ey(Oy(r.y, 0, 1)), o = a.getDay(), a = o > 4 || o === 0 ? ry.ceil(a) : ry(a), a = Qv.offset(a, (r.V - 1) * 7), r.y = a.getFullYear(), r.m = a.getMonth(), r.d = a.getDate() + (r.w + 6) % 7);
			} else ("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : +("W" in r)), o = "Z" in r ? Dy(Oy(r.y, 0, 1)).getUTCDay() : Ey(Oy(r.y, 0, 1)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + r.W * 7 - (o + 5) % 7 : r.w + r.U * 7 - (o + 6) % 7);
			return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, Dy(r)) : Ey(r);
		};
	}
	function w(e, t, n, r) {
		for (var i = 0, a = t.length, o = n.length, s, c; i < a;) {
			if (r >= o) return -1;
			if (s = t.charCodeAt(i++), s === 37) {
				if (s = t.charAt(i++), c = x[s in Ay ? t.charAt(i++) : s], !c || (r = c(e, n, r)) < 0) return -1;
			} else if (s != n.charCodeAt(r++)) return -1;
		}
		return r;
	}
	function T(e, t, n) {
		var r = l.exec(t.slice(n));
		return r ? (e.p = u.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function E(e, t, n) {
		var r = p.exec(t.slice(n));
		return r ? (e.w = m.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function D(e, t, n) {
		var r = d.exec(t.slice(n));
		return r ? (e.w = f.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function O(e, t, n) {
		var r = _.exec(t.slice(n));
		return r ? (e.m = v.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function k(e, t, n) {
		var r = h.exec(t.slice(n));
		return r ? (e.m = g.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function A(e, n, r) {
		return w(e, t, n, r);
	}
	function j(e, t, r) {
		return w(e, n, t, r);
	}
	function M(e, t, n) {
		return w(e, r, t, n);
	}
	function N(e) {
		return o[e.getDay()];
	}
	function ee(e) {
		return a[e.getDay()];
	}
	function te(e) {
		return c[e.getMonth()];
	}
	function P(e) {
		return s[e.getMonth()];
	}
	function ne(e) {
		return i[+(e.getHours() >= 12)];
	}
	function re(e) {
		return 1 + ~~(e.getMonth() / 3);
	}
	function ie(e) {
		return o[e.getUTCDay()];
	}
	function ae(e) {
		return a[e.getUTCDay()];
	}
	function oe(e) {
		return c[e.getUTCMonth()];
	}
	function se(e) {
		return s[e.getUTCMonth()];
	}
	function ce(e) {
		return i[+(e.getUTCHours() >= 12)];
	}
	function le(e) {
		return 1 + ~~(e.getUTCMonth() / 3);
	}
	return {
		format: function(e) {
			var t = S(e += "", y);
			return t.toString = function() {
				return e;
			}, t;
		},
		parse: function(e) {
			var t = C(e += "", !1);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcFormat: function(e) {
			var t = S(e += "", b);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcParse: function(e) {
			var t = C(e += "", !0);
			return t.toString = function() {
				return e;
			}, t;
		}
	};
}
var Ay = {
	"-": "",
	_: " ",
	0: "0"
}, jy = /^\s*\d+/, My = /^%/, Ny = /[\\^$*+?|[\]().{}]/g;
function X(e, t, n) {
	var r = e < 0 ? "-" : "", i = (r ? -e : e) + "", a = i.length;
	return r + (a < n ? Array(n - a + 1).join(t) + i : i);
}
function Py(e) {
	return e.replace(Ny, "\\$&");
}
function Fy(e) {
	return RegExp("^(?:" + e.map(Py).join("|") + ")", "i");
}
function Iy(e) {
	return new Map(e.map((e, t) => [e.toLowerCase(), t]));
}
function Ly(e, t, n) {
	var r = jy.exec(t.slice(n, n + 1));
	return r ? (e.w = +r[0], n + r[0].length) : -1;
}
function Ry(e, t, n) {
	var r = jy.exec(t.slice(n, n + 1));
	return r ? (e.u = +r[0], n + r[0].length) : -1;
}
function zy(e, t, n) {
	var r = jy.exec(t.slice(n, n + 2));
	return r ? (e.U = +r[0], n + r[0].length) : -1;
}
function By(e, t, n) {
	var r = jy.exec(t.slice(n, n + 2));
	return r ? (e.V = +r[0], n + r[0].length) : -1;
}
function Vy(e, t, n) {
	var r = jy.exec(t.slice(n, n + 2));
	return r ? (e.W = +r[0], n + r[0].length) : -1;
}
function Hy(e, t, n) {
	var r = jy.exec(t.slice(n, n + 4));
	return r ? (e.y = +r[0], n + r[0].length) : -1;
}
function Uy(e, t, n) {
	var r = jy.exec(t.slice(n, n + 2));
	return r ? (e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function Wy(e, t, n) {
	var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
	return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function Gy(e, t, n) {
	var r = jy.exec(t.slice(n, n + 1));
	return r ? (e.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function Ky(e, t, n) {
	var r = jy.exec(t.slice(n, n + 2));
	return r ? (e.m = r[0] - 1, n + r[0].length) : -1;
}
function qy(e, t, n) {
	var r = jy.exec(t.slice(n, n + 2));
	return r ? (e.d = +r[0], n + r[0].length) : -1;
}
function Jy(e, t, n) {
	var r = jy.exec(t.slice(n, n + 3));
	return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1;
}
function Yy(e, t, n) {
	var r = jy.exec(t.slice(n, n + 2));
	return r ? (e.H = +r[0], n + r[0].length) : -1;
}
function Xy(e, t, n) {
	var r = jy.exec(t.slice(n, n + 2));
	return r ? (e.M = +r[0], n + r[0].length) : -1;
}
function Zy(e, t, n) {
	var r = jy.exec(t.slice(n, n + 2));
	return r ? (e.S = +r[0], n + r[0].length) : -1;
}
function Qy(e, t, n) {
	var r = jy.exec(t.slice(n, n + 3));
	return r ? (e.L = +r[0], n + r[0].length) : -1;
}
function $y(e, t, n) {
	var r = jy.exec(t.slice(n, n + 6));
	return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function eb(e, t, n) {
	var r = My.exec(t.slice(n, n + 1));
	return r ? n + r[0].length : -1;
}
function tb(e, t, n) {
	var r = jy.exec(t.slice(n));
	return r ? (e.Q = +r[0], n + r[0].length) : -1;
}
function nb(e, t, n) {
	var r = jy.exec(t.slice(n));
	return r ? (e.s = +r[0], n + r[0].length) : -1;
}
function rb(e, t) {
	return X(e.getDate(), t, 2);
}
function ib(e, t) {
	return X(e.getHours(), t, 2);
}
function ab(e, t) {
	return X(e.getHours() % 12 || 12, t, 2);
}
function ob(e, t) {
	return X(1 + Qv.count(yy(e), e), t, 3);
}
function sb(e, t) {
	return X(e.getMilliseconds(), t, 3);
}
function cb(e, t) {
	return sb(e, t) + "000";
}
function lb(e, t) {
	return X(e.getMonth() + 1, t, 2);
}
function ub(e, t) {
	return X(e.getMinutes(), t, 2);
}
function db(e, t) {
	return X(e.getSeconds(), t, 2);
}
function fb(e) {
	var t = e.getDay();
	return t === 0 ? 7 : t;
}
function pb(e, t) {
	return X(ny.count(yy(e) - 1, e), t, 2);
}
function mb(e) {
	var t = e.getDay();
	return t >= 4 || t === 0 ? oy(e) : oy.ceil(e);
}
function hb(e, t) {
	return e = mb(e), X(oy.count(yy(e), e) + (yy(e).getDay() === 4), t, 2);
}
function gb(e) {
	return e.getDay();
}
function _b(e, t) {
	return X(ry.count(yy(e) - 1, e), t, 2);
}
function vb(e, t) {
	return X(e.getFullYear() % 100, t, 2);
}
function yb(e, t) {
	return e = mb(e), X(e.getFullYear() % 100, t, 2);
}
function bb(e, t) {
	return X(e.getFullYear() % 1e4, t, 4);
}
function xb(e, t) {
	var n = e.getDay();
	return e = n >= 4 || n === 0 ? oy(e) : oy.ceil(e), X(e.getFullYear() % 1e4, t, 4);
}
function Sb(e) {
	var t = e.getTimezoneOffset();
	return (t > 0 ? "-" : (t *= -1, "+")) + X(t / 60 | 0, "0", 2) + X(t % 60, "0", 2);
}
function Cb(e, t) {
	return X(e.getUTCDate(), t, 2);
}
function wb(e, t) {
	return X(e.getUTCHours(), t, 2);
}
function Tb(e, t) {
	return X(e.getUTCHours() % 12 || 12, t, 2);
}
function Eb(e, t) {
	return X(1 + $v.count(by(e), e), t, 3);
}
function Db(e, t) {
	return X(e.getUTCMilliseconds(), t, 3);
}
function Ob(e, t) {
	return Db(e, t) + "000";
}
function kb(e, t) {
	return X(e.getUTCMonth() + 1, t, 2);
}
function Ab(e, t) {
	return X(e.getUTCMinutes(), t, 2);
}
function jb(e, t) {
	return X(e.getUTCSeconds(), t, 2);
}
function Mb(e) {
	var t = e.getUTCDay();
	return t === 0 ? 7 : t;
}
function Nb(e, t) {
	return X(uy.count(by(e) - 1, e), t, 2);
}
function Pb(e) {
	var t = e.getUTCDay();
	return t >= 4 || t === 0 ? my(e) : my.ceil(e);
}
function Fb(e, t) {
	return e = Pb(e), X(my.count(by(e), e) + (by(e).getUTCDay() === 4), t, 2);
}
function Ib(e) {
	return e.getUTCDay();
}
function Lb(e, t) {
	return X(dy.count(by(e) - 1, e), t, 2);
}
function Rb(e, t) {
	return X(e.getUTCFullYear() % 100, t, 2);
}
function zb(e, t) {
	return e = Pb(e), X(e.getUTCFullYear() % 100, t, 2);
}
function Bb(e, t) {
	return X(e.getUTCFullYear() % 1e4, t, 4);
}
function Vb(e, t) {
	var n = e.getUTCDay();
	return e = n >= 4 || n === 0 ? my(e) : my.ceil(e), X(e.getUTCFullYear() % 1e4, t, 4);
}
function Hb() {
	return "+0000";
}
function Ub() {
	return "%";
}
function Wb(e) {
	return +e;
}
function Gb(e) {
	return Math.floor(e / 1e3);
}
// node_modules/d3-time-format/src/defaultLocale.js
var Kb, qb, Jb;
Yb({
	dateTime: "%x, %X",
	date: "%-m/%-d/%Y",
	time: "%-I:%M:%S %p",
	periods: ["AM", "PM"],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	shortDays: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	months: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	shortMonths: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	]
});
function Yb(e) {
	return Kb = ky(e), qb = Kb.format, Kb.parse, Jb = Kb.utcFormat, Kb.utcParse, Kb;
}
// node_modules/d3-scale/src/time.js
function Xb(e) {
	return new Date(e);
}
function Zb(e) {
	return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function Qb(e, t, n, r, i, a, o, s, c, l) {
	var u = P_(), d = u.invert, f = u.domain, p = l(".%L"), m = l(":%S"), h = l("%I:%M"), g = l("%I %p"), _ = l("%a %d"), v = l("%b %d"), y = l("%B"), b = l("%Y");
	function x(e) {
		return (c(e) < e ? p : s(e) < e ? m : o(e) < e ? h : a(e) < e ? g : r(e) < e ? i(e) < e ? _ : v : n(e) < e ? y : b)(e);
	}
	return u.invert = function(e) {
		return new Date(d(e));
	}, u.domain = function(e) {
		return arguments.length ? f(Array.from(e, Zb)) : f().map(Xb);
	}, u.ticks = function(t) {
		var n = f();
		return e(n[0], n[n.length - 1], t ?? 10);
	}, u.tickFormat = function(e, t) {
		return t == null ? x : l(t);
	}, u.nice = function(e) {
		var n = f();
		return e && typeof e.range == "function" || (e = t(n[0], n[n.length - 1], e ?? 10)), e ? f(lv(n, e)) : u;
	}, u.copy = function() {
		return M_(u, Qb(e, t, n, r, i, a, o, s, c, l));
	}, u;
}
function $b() {
	return fg.apply(Qb(wy, Ty, yy, _y, ny, Qv, Xv, Jv, qv, qb).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
// node_modules/d3-scale/src/utcTime.js
function ex() {
	return fg.apply(Qb(Sy, Cy, by, vy, uy, $v, Zv, Yv, qv, Jb).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
// node_modules/d3-scale/src/sequential.js
function tx() {
	var e = 0, t = 1, n, r, i, a, o = D_, s = !1, c;
	function l(e) {
		return e == null || isNaN(e = +e) ? c : o(i === 0 ? .5 : (e = (a(e) - n) * i, s ? Math.max(0, Math.min(1, e)) : e));
	}
	l.domain = function(o) {
		return arguments.length ? ([e, t] = o, n = a(e = +e), r = a(t = +t), i = n === r ? 0 : 1 / (r - n), l) : [e, t];
	}, l.clamp = function(e) {
		return arguments.length ? (s = !!e, l) : s;
	}, l.interpolator = function(e) {
		return arguments.length ? (o = e, l) : o;
	};
	function u(e) {
		return function(t) {
			var n, r;
			return arguments.length ? ([n, r] = t, o = e(n, r), l) : [o(0), o(1)];
		};
	}
	return l.range = u(x_), l.rangeRound = u(S_), l.unknown = function(e) {
		return arguments.length ? (c = e, l) : c;
	}, function(o) {
		return a = o, n = o(e), r = o(t), i = n === r ? 0 : 1 / (r - n), l;
	};
}
function nx(e, t) {
	return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function rx() {
	var e = ov(tx()(D_));
	return e.copy = function() {
		return nx(e, rx());
	}, pg.apply(e, arguments);
}
function ix() {
	var e = vv(tx()).domain([1, 10]);
	return e.copy = function() {
		return nx(e, ix()).base(e.base());
	}, pg.apply(e, arguments);
}
function ax() {
	var e = Sv(tx());
	return e.copy = function() {
		return nx(e, ax()).constant(e.constant());
	}, pg.apply(e, arguments);
}
function ox() {
	var e = Dv(tx());
	return e.copy = function() {
		return nx(e, ox()).exponent(e.exponent());
	}, pg.apply(e, arguments);
}
function sx() {
	return ox.apply(null, arguments).exponent(.5);
}
// node_modules/d3-scale/src/sequentialQuantile.js
function cx() {
	var e = [], t = D_;
	function n(n) {
		if (n != null && !isNaN(n = +n)) return t((_e(e, n, 1) - 1) / (e.length - 1));
	}
	return n.domain = function(t) {
		if (!arguments.length) return e.slice();
		e = [];
		for (let n of t) n != null && !isNaN(n = +n) && e.push(n);
		return e.sort(de), n;
	}, n.interpolator = function(e) {
		return arguments.length ? (t = e, n) : t;
	}, n.range = function() {
		return e.map((n, r) => t(r / (e.length - 1)));
	}, n.quantiles = function(t) {
		return Array.from({ length: t + 1 }, (n, r) => je(e, r / t));
	}, n.copy = function() {
		return cx(t).domain(e);
	}, pg.apply(n, arguments);
}
// node_modules/d3-scale/src/diverging.js
function lx() {
	var e = 0, t = .5, n = 1, r = 1, i, a, o, s, c, l = D_, u, d = !1, f;
	function p(e) {
		return isNaN(e = +e) ? f : (e = .5 + ((e = +u(e)) - a) * (r * e < r * a ? s : c), l(d ? Math.max(0, Math.min(1, e)) : e));
	}
	p.domain = function(l) {
		return arguments.length ? ([e, t, n] = l, i = u(e = +e), a = u(t = +t), o = u(n = +n), s = i === a ? 0 : .5 / (a - i), c = a === o ? 0 : .5 / (o - a), r = a < i ? -1 : 1, p) : [
			e,
			t,
			n
		];
	}, p.clamp = function(e) {
		return arguments.length ? (d = !!e, p) : d;
	}, p.interpolator = function(e) {
		return arguments.length ? (l = e, p) : l;
	};
	function m(e) {
		return function(t) {
			var n, r, i;
			return arguments.length ? ([n, r, i] = t, l = C_(e, [
				n,
				r,
				i
			]), p) : [
				l(0),
				l(.5),
				l(1)
			];
		};
	}
	return p.range = m(x_), p.rangeRound = m(S_), p.unknown = function(e) {
		return arguments.length ? (f = e, p) : f;
	}, function(l) {
		return u = l, i = l(e), a = l(t), o = l(n), s = i === a ? 0 : .5 / (a - i), c = a === o ? 0 : .5 / (o - a), r = a < i ? -1 : 1, p;
	};
}
function ux() {
	var e = ov(lx()(D_));
	return e.copy = function() {
		return nx(e, ux());
	}, pg.apply(e, arguments);
}
function dx() {
	var e = vv(lx()).domain([
		.1,
		1,
		10
	]);
	return e.copy = function() {
		return nx(e, dx()).base(e.base());
	}, pg.apply(e, arguments);
}
function fx() {
	var e = Sv(lx());
	return e.copy = function() {
		return nx(e, fx()).constant(e.constant());
	}, pg.apply(e, arguments);
}
function px() {
	var e = Dv(lx());
	return e.copy = function() {
		return nx(e, px()).exponent(e.exponent());
	}, pg.apply(e, arguments);
}
function mx() {
	return px.apply(null, arguments).exponent(.5);
}
// node_modules/victory-vendor/es/d3-scale.js
var hx = /* @__PURE__ */ r({
	scaleBand: () => gg,
	scaleDiverging: () => ux,
	scaleDivergingLog: () => dx,
	scaleDivergingPow: () => px,
	scaleDivergingSqrt: () => mx,
	scaleDivergingSymlog: () => fx,
	scaleIdentity: () => cv,
	scaleImplicit: () => mg,
	scaleLinear: () => sv,
	scaleLog: () => yv,
	scaleOrdinal: () => hg,
	scalePoint: () => vg,
	scalePow: () => Ov,
	scaleQuantile: () => Nv,
	scaleQuantize: () => Pv,
	scaleRadial: () => Mv,
	scaleSequential: () => rx,
	scaleSequentialLog: () => ix,
	scaleSequentialPow: () => ox,
	scaleSequentialQuantile: () => cx,
	scaleSequentialSqrt: () => sx,
	scaleSequentialSymlog: () => ax,
	scaleSqrt: () => kv,
	scaleSymlog: () => Cv,
	scaleThreshold: () => Fv,
	scaleTime: () => $b,
	scaleUtc: () => ex,
	tickFormat: () => av
});
// node_modules/recharts/es6/state/selectors/combiners/combineConfiguredScale.js
function gx(e) {
	var t = hx;
	if (e in t && typeof t[e] == "function") return t[e]();
	var n = `scale${Ct(e)}`;
	if (n in t && typeof t[n] == "function") return t[n]();
}
function _x(e, t, n) {
	if (typeof e == "function") return e.copy().domain(t).range(n);
	if (e != null) {
		var r = gx(e);
		if (r != null) return r.domain(t).range(n), r;
	}
}
function vx(e, t, n, r) {
	if (n != null && r != null) return typeof e.scale == "function" ? _x(e.scale, n, r) : _x(t, n, r);
}
// node_modules/recharts/es6/state/selectors/combiners/combineRealScaleType.js
function yx(e) {
	return `scale${Ct(e)}`;
}
function bx(e) {
	return yx(e) in hx;
}
var xx = (e, t, n) => {
	if (e != null) {
		var r = e.scale, i = e.type;
		if (r === "auto") return i === "category" && n && (n.indexOf("LineChart") >= 0 || n.indexOf("AreaChart") >= 0 || n.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
		if (typeof r == "string") return bx(r) ? r : "point";
	}
};
// node_modules/recharts/es6/util/scale/createCategoricalInverse.js
function Sx(e, t) {
	for (var n = 0, r = e.length, i = e[0] < e[e.length - 1]; n < r;) {
		var a = Math.floor((n + r) / 2);
		(i ? e[a] < t : e[a] > t) ? n = a + 1 : r = a;
	}
	return n;
}
function Cx(e, t) {
	if (e) {
		var n = t ?? e.domain(), r = n.map((t) => e(t) ?? 0), i = e.range();
		if (!(n.length === 0 || i.length < 2)) return (e) => {
			var t = Sx(r, e);
			if (t <= 0) return n[0];
			if (t >= n.length) return n[n.length - 1];
			var i = r[t - 1] ?? 0, a = r[t] ?? 0;
			return Math.abs(e - i) <= Math.abs(e - a) ? n[t - 1] : n[t];
		};
	}
}
// node_modules/recharts/es6/state/selectors/combiners/combineInverseScaleFunction.js
function wx(e) {
	if (e != null) return "invert" in e && typeof e.invert == "function" ? e.invert.bind(e) : Cx(e, void 0);
}
// node_modules/recharts/es6/state/selectors/axisSelectors.js
function Tx(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ex(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Tx(Object(n), !0).forEach(function(t) {
			Dx(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Tx(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Dx(e, t, n) {
	return (t = Ox(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ox(e) {
	var t = kx(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function kx(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ax(e, t) {
	return Fx(e) || Px(e, t) || Mx(e, t) || jx();
}
function jx() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Mx(e, t) {
	if (e) {
		if (typeof e == "string") return Nx(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Nx(e, t) : void 0;
	}
}
function Nx(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Px(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Fx(e) {
	if (Array.isArray(e)) return e;
}
var Ix = [0, "auto"], Lx = {
	allowDataOverflow: !1,
	allowDecimals: !0,
	allowDuplicatedCategory: !0,
	angle: 0,
	dataKey: void 0,
	domain: void 0,
	height: 30,
	hide: !0,
	id: 0,
	includeHidden: !1,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: !1,
	name: void 0,
	orientation: "bottom",
	padding: {
		left: 0,
		right: 0
	},
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "category",
	unit: void 0,
	niceTicks: "auto"
}, Rx = (e, t) => e.cartesianAxis.xAxis[t], zx = (e, t) => Rx(e, t) ?? Lx, Bx = {
	allowDataOverflow: !1,
	allowDecimals: !0,
	allowDuplicatedCategory: !0,
	angle: 0,
	dataKey: void 0,
	domain: Ix,
	hide: !0,
	id: 0,
	includeHidden: !1,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: !1,
	name: void 0,
	orientation: "left",
	padding: {
		top: 0,
		bottom: 0
	},
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "number",
	unit: void 0,
	niceTicks: "auto",
	width: 60
}, Vx = (e, t) => e.cartesianAxis.yAxis[t], Hx = (e, t) => Vx(e, t) ?? Bx, Ux = {
	domain: [0, "auto"],
	includeHidden: !1,
	reversed: !1,
	allowDataOverflow: !1,
	allowDuplicatedCategory: !1,
	dataKey: void 0,
	id: 0,
	name: "",
	range: [64, 64],
	scale: "auto",
	type: "number",
	unit: ""
}, Wx = (e, t) => e.cartesianAxis.zAxis[t] ?? Ux, Z = (e, t, n) => {
	switch (t) {
		case "xAxis": return zx(e, n);
		case "yAxis": return Hx(e, n);
		case "zAxis": return Wx(e, n);
		case "angleAxis": return Wh(e, n);
		case "radiusAxis": return Gh(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, Gx = (e, t, n) => {
	switch (t) {
		case "xAxis": return zx(e, n);
		case "yAxis": return Hx(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, Kx = (e, t, n) => {
	switch (t) {
		case "xAxis": return zx(e, n);
		case "yAxis": return Hx(e, n);
		case "angleAxis": return Wh(e, n);
		case "radiusAxis": return Gh(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, qx = (e) => e.graphicalItems.cartesianItems.some((e) => e.type === "bar") || e.graphicalItems.polarItems.some((e) => e.type === "radialBar");
function Jx(e, t) {
	return (n) => {
		switch (e) {
			case "xAxis": return "xAxisId" in n && n.xAxisId === t;
			case "yAxis": return "yAxisId" in n && n.yAxisId === t;
			case "zAxis": return "zAxisId" in n && n.zAxisId === t;
			case "angleAxis": return "angleAxisId" in n && n.angleAxisId === t;
			case "radiusAxis": return "radiusAxisId" in n && n.radiusAxisId === t;
			default: return !1;
		}
	};
}
var Yx = (e) => e.graphicalItems.cartesianItems, Xx = V([Y, tg], Jx), Zx = (e, t, n) => e.filter(n).filter((e) => t?.includeHidden === !0 || !e.hide), Qx = V([
	Yx,
	Z,
	Xx
], Zx, { memoizeOptions: { resultEqualityCheck: og } }), $x = V([Qx], (e) => e.filter((e) => e.type === "area" || e.type === "bar").filter(ig)), eS = (e) => e.filter((e) => !("stackId" in e) || e.stackId === void 0), tS = V([Qx], eS), nS = (e) => e.map((e) => e.data).filter(Boolean).flat(1), rS = V([Qx], (e) => e.some((e) => !e.data)), iS = V([Qx], nS, { memoizeOptions: { resultEqualityCheck: og } }), aS = (e, t) => {
	var n = t.chartData, r = n === void 0 ? [] : n, i = t.dataStartIndex, a = t.dataEndIndex;
	return e.length > 0 ? e : r.slice(i, a + 1);
}, oS = V([iS, Km], aS), sS = (e, t, n) => t?.dataKey == null ? n.length > 0 ? n.map((e) => e.dataKey).flatMap((t) => e.map((e) => ({ value: G(e, t) }))) : e.map((e) => ({ value: e })) : e.map((e) => ({ value: G(e, t.dataKey) })), cS = (e, t, n, r, i, a) => {
	var o = r.chartData, s = o === void 0 ? [] : o, c = r.dataStartIndex, l = r.dataEndIndex, u = sS(e, t, n);
	return i && t?.dataKey != null && a.length > 0 ? [...s.slice(c, l + 1).map((e) => ({ value: G(e, t.dataKey) })).filter((e) => e.value != null), ...u] : u;
}, lS = V([
	oS,
	Z,
	Qx,
	Km,
	rS,
	iS
], cS);
function uS(e) {
	if (_t(e) || e instanceof Date) {
		var t = Number(e);
		if (W(t)) return t;
	}
}
function dS(e) {
	if (Array.isArray(e)) {
		var t = [uS(e[0]), uS(e[1])];
		return rh(t) ? t : void 0;
	}
	var n = uS(e);
	if (n != null) return [n, n];
}
function fS(e) {
	return e.map(uS).filter(wt);
}
function pS(e, t) {
	var n = uS(e), r = uS(t);
	return n == null && r == null ? 0 : n == null ? -1 : r == null ? 1 : n - r;
}
var mS = V([lS], (e) => e?.map((e) => e.value).sort(pS));
function hS(e, t) {
	switch (e) {
		case "xAxis": return t.direction === "x";
		case "yAxis": return t.direction === "y";
		default: return !1;
	}
}
function gS(e, t, n) {
	if (!n || !n.length) return [];
	var r;
	if (typeof t == "number" && !ht(t)) r = t;
	else if (Array.isArray(t)) {
		var i = fS(t);
		i.length > 0 && (r = Math.max(...i));
	}
	return r == null ? [] : fS(n.flatMap((t) => {
		var n = G(e, t.dataKey), i, a;
		if (Array.isArray(n)) {
			var o = Ax(n, 2);
			i = o[0], a = o[1];
		} else i = a = n;
		if (W(i) && W(a)) return [r - i, r + a];
	}));
}
var _S = (e) => Kx(e, cg(e), lg(e)), vS = V([_S], (e) => e?.dataKey), yS = V([
	$x,
	Km,
	_S
], rg), bS = (e, t, n, r) => {
	var i = t.reduce((e, t) => {
		if (t.stackId == null) return e;
		var n = e[t.stackId];
		return n ??= [], n.push(t), e[t.stackId] = n, e;
	}, {});
	return Object.fromEntries(Object.entries(i).map((t) => {
		var i = Ax(t, 2), a = i[0], o = i[1], s = r ? [...o].reverse() : o;
		return [a, {
			stackedData: $c(e, s.map(ng), n),
			graphicalItems: s
		}];
	}));
}, xS = V([
	yS,
	$x,
	Eh,
	Dh
], bS), SS = (e, t, n, r) => {
	var i = t.dataStartIndex, a = t.dataEndIndex;
	if (r == null && n !== "zAxis") return ol(e, i, a);
}, CS = V([Z], (e) => e.allowDataOverflow), wS = (e) => {
	if (e == null || !("domain" in e)) return Ix;
	if (e.domain != null) return e.domain;
	if ("ticks" in e && e.ticks != null) {
		if (e.type === "number") {
			var t = fS(e.ticks);
			return [Math.min(...t), Math.max(...t)];
		}
		if (e.type === "category") return e.ticks.map(String);
	}
	return e?.domain ?? Ix;
}, TS = V([Z], wS), ES = V([TS, CS], ah), DS = V([
	xS,
	Wm,
	Y,
	ES
], SS, { memoizeOptions: { resultEqualityCheck: ag } }), OS = (e) => e.errorBars, kS = (e, t, n) => e.flatMap((e) => t[e.id]).filter(Boolean).filter((e) => hS(n, e)), AS = function() {
	var e = [...arguments].filter(Boolean);
	if (e.length !== 0) {
		var t = e.flat();
		return [Math.min(...t), Math.max(...t)];
	}
}, jS = function(e, t, n, r, i) {
	var a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [], o, s;
	if (n.length > 0 && n.forEach((e) => {
		var n = e.data == null ? a : [...e.data], c = r[e.id]?.filter((e) => hS(i, e));
		n.forEach((n) => {
			var r = G(n, t.dataKey ?? e.dataKey), i = gS(n, r, c);
			if (i.length >= 2) {
				var a = Math.min(...i), l = Math.max(...i);
				(o == null || a < o) && (o = a), (s == null || l > s) && (s = l);
			}
			var u = dS(r);
			u != null && (o = o == null ? u[0] : Math.min(o, u[0]), s = s == null ? u[1] : Math.max(s, u[1]));
		});
	}), t?.dataKey != null && n.length === 0 && e.forEach((e) => {
		var n = dS(G(e, t.dataKey));
		n != null && (o = o == null ? n[0] : Math.min(o, n[0]), s = s == null ? n[1] : Math.max(s, n[1]));
	}), W(o) && W(s)) return [o, s];
}, MS = V([
	oS,
	Z,
	tS,
	OS,
	Y,
	Jm
], jS, { memoizeOptions: { resultEqualityCheck: ag } });
function NS(e) {
	var t = e.value;
	if (_t(t) || t instanceof Date) return t;
}
var PS = (e, t, n) => {
	var r = e.map(NS).filter((e) => e != null);
	return n && (t.dataKey == null || t.allowDuplicatedCategory && xt(r)) ? Um(0, e.length) : t.allowDuplicatedCategory ? r : Array.from(new Set(r));
}, FS = (e) => e.referenceElements.dots, IS = (e, t, n) => e.filter((e) => e.ifOverflow === "extendDomain").filter((e) => t === "xAxis" ? e.xAxisId === n : e.yAxisId === n), LS = V([
	FS,
	Y,
	tg
], IS), RS = (e) => e.referenceElements.areas, zS = V([
	RS,
	Y,
	tg
], IS), BS = (e) => e.referenceElements.lines, VS = V([
	BS,
	Y,
	tg
], IS), HS = (e, t) => {
	if (e != null) {
		var n = fS(e.map((e) => t === "xAxis" ? e.x : e.y));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, US = V(LS, Y, HS), WS = (e, t) => {
	if (e != null) {
		var n = fS(e.flatMap((e) => [t === "xAxis" ? e.x1 : e.y1, t === "xAxis" ? e.x2 : e.y2]));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, GS = V([zS, Y], WS);
function KS(e) {
	if (e.x != null) return fS([e.x]);
	var t = e.segment?.map((e) => e.x);
	return t == null || t.length === 0 ? [] : fS(t);
}
function qS(e) {
	if (e.y != null) return fS([e.y]);
	var t = e.segment?.map((e) => e.y);
	return t == null || t.length === 0 ? [] : fS(t);
}
var JS = (e, t) => {
	if (e != null) {
		var n = e.flatMap((e) => t === "xAxis" ? KS(e) : qS(e));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, YS = V(US, V([VS, Y], JS), GS, (e, t, n) => AS(e, n, t)), XS = (e, t, n, r, i, a, o, s, c) => {
	if (n != null) return n;
	var l = o === "vertical" && s === "xAxis" || o === "horizontal" && s === "yAxis" ? AS(r, a, i) : AS(a, i), u = oh(t, l, e.allowDataOverflow);
	return u == null && e.allowDataOverflow && l == null && c != null ? c : u;
}, ZS = V([
	Z,
	TS,
	ES,
	DS,
	MS,
	YS,
	K,
	Y,
	V([Z], (e) => {
		if (e != null && e.type === "number" && "ticks" in e && e.ticks != null) {
			var t = fS(e.ticks);
			if (t.length !== 0) return [Math.min(...t), Math.max(...t)];
		}
	}, { memoizeOptions: { resultEqualityCheck: ag } })
], XS, { memoizeOptions: { resultEqualityCheck: ag } }), QS = [0, 1], $S = (e, t, n, r, i, a, o) => {
	if (e != null && n != null && n.length !== 0 || o !== void 0) {
		var s = e.dataKey, c = e.type, l = Jc(t, a);
		return l && s == null ? Um(0, n?.length ?? 0) : c === "category" ? PS(r, e, l) : i === "expand" && !l ? QS : o;
	}
}, eC = V([
	Z,
	K,
	oS,
	lS,
	Eh,
	Y,
	ZS
], $S), tC = V([
	Z,
	qx,
	Oh
], xx), nC = (e, t, n) => {
	var r = t.niceTicks;
	if (r !== "none") {
		var i = wS(t), a = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
		if ((r === "snap125" || r === "adaptive") && t != null && t.tickCount && rh(e)) {
			if (a) return bh(e, t.tickCount, t.allowDecimals, r);
			if (t.type === "number") return xh(e, t.tickCount, t.allowDecimals, r);
		}
		if (r === "auto" && n === "linear" && t != null && t.tickCount) {
			if (a && rh(e)) return bh(e, t.tickCount, t.allowDecimals, "adaptive");
			if (t.type === "number" && rh(e)) return xh(e, t.tickCount, t.allowDecimals, "adaptive");
		}
	}
}, rC = V([
	eC,
	Kx,
	tC
], nC), iC = (e, t, n, r) => {
	if (r !== "angleAxis" && e?.type === "number" && rh(t) && Array.isArray(n) && n.length > 0) {
		var i = t[0], a = n[0] ?? 0, o = t[1], s = n[n.length - 1] ?? 0;
		return [Math.min(i, a), Math.max(o, s)];
	}
	return t;
}, aC = V([
	Z,
	eC,
	rC,
	Y
], iC), oC = V(V(lS, Z, (e, t) => {
	if (t && t.type === "number") {
		var n = Infinity, r = Array.from(fS(e.map((e) => e.value))).sort((e, t) => e - t), i = r[0], a = r[r.length - 1];
		if (i == null || a == null) return Infinity;
		var o = a - i;
		if (o === 0) return Infinity;
		for (var s = 0; s < r.length - 1; s++) {
			var c = r[s], l = r[s + 1];
			if (c != null && l != null) {
				var u = l - c;
				n = Math.min(n, u);
			}
		}
		return n / o;
	}
}), K, wh, Ml, (e, t, n, r, i) => i, (e, t, n, r, i) => {
	if (!W(e)) return 0;
	var a = t === "vertical" ? r.height : r.width;
	if (i === "gap") return e * a / 2;
	if (i === "no-gap") {
		var o = bt(n, e * a), s = e * a / 2;
		return s - o - (s - o) / a * o;
	}
	return 0;
}), sC = (e, t, n) => {
	var r = zx(e, t);
	return r == null || typeof r.padding != "string" ? 0 : oC(e, "xAxis", t, n, r.padding);
}, cC = (e, t, n) => {
	var r = Hx(e, t);
	return r == null || typeof r.padding != "string" ? 0 : oC(e, "yAxis", t, n, r.padding);
}, lC = V(zx, sC, (e, t) => {
	if (e == null) return {
		left: 0,
		right: 0
	};
	var n = e.padding;
	return typeof n == "string" ? {
		left: t,
		right: t
	} : {
		left: (n.left ?? 0) + t,
		right: (n.right ?? 0) + t
	};
}), uC = V(Hx, cC, (e, t) => {
	if (e == null) return {
		top: 0,
		bottom: 0
	};
	var n = e.padding;
	return typeof n == "string" ? {
		top: t,
		bottom: t
	} : {
		top: (n.top ?? 0) + t,
		bottom: (n.bottom ?? 0) + t
	};
}), dC = V([
	Ml,
	lC,
	Rl,
	Ll,
	(e, t, n) => n
], (e, t, n, r, i) => {
	var a = r.padding;
	return i ? [a.left, n.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), fC = V([
	Ml,
	K,
	uC,
	Rl,
	Ll,
	(e, t, n) => n
], (e, t, n, r, i, a) => {
	var o = i.padding;
	return a ? [r.height - o.bottom, o.top] : t === "horizontal" ? [e.top + e.height - n.bottom, e.top + n.top] : [e.top + n.top, e.top + e.height - n.bottom];
}), pC = (e, t, n, r) => {
	switch (t) {
		case "xAxis": return dC(e, n, r);
		case "yAxis": return fC(e, n, r);
		case "zAxis": return Wx(e, n)?.range;
		case "angleAxis": return Xh(e);
		case "radiusAxis": return Qh(e, n);
		default: return;
	}
}, mC = V([Z, pC], Fh), hC = V([
	Z,
	tC,
	V([tC, aC], dg),
	mC
], vx), gC = (e, t, n, r) => {
	if (n != null && n.dataKey != null) {
		var i = n.type, a = n.scale;
		if (Jc(e, r) && (i === "number" || a !== "auto")) return t.map((e) => e.value);
	}
}, _C = V([
	K,
	lS,
	Kx,
	Y
], gC), vC = V([hC], ug);
V([hC], wx), V([hC, mS], Cx), V([
	Qx,
	OS,
	Y
], kS);
function yC(e, t) {
	return e.id < t.id ? -1 : +(e.id > t.id);
}
var bC = (e, t) => t, xC = (e, t, n) => n, SC = V(vl, bC, xC, (e, t, n) => e.filter((e) => e.orientation === t).filter((e) => e.mirror === n).sort(yC)), CC = V(yl, bC, xC, (e, t, n) => e.filter((e) => e.orientation === t).filter((e) => e.mirror === n).sort(yC)), wC = (e, t) => {
	var n = typeof t.height == "number" ? t.height : 30;
	return {
		width: e.width,
		height: n
	};
}, TC = (e, t) => ({
	width: typeof t.width == "number" ? t.width : 60,
	height: e.height
}), EC = V(Ml, zx, wC), DC = (e, t, n) => {
	switch (t) {
		case "top": return e.top;
		case "bottom": return n - e.bottom;
		default: return 0;
	}
}, OC = (e, t, n) => {
	switch (t) {
		case "left": return e.left;
		case "right": return n - e.right;
		default: return 0;
	}
}, kC = V(hl, Ml, SC, bC, xC, (e, t, n, r, i) => {
	var a = {}, o;
	return n.forEach((n) => {
		var s = wC(t, n);
		o ??= DC(t, r, e);
		var c = r === "top" && !i || r === "bottom" && i;
		a[n.id] = o - Number(c) * s.height, o += (c ? -1 : 1) * s.height;
	}), a;
}), AC = V(ml, Ml, CC, bC, xC, (e, t, n, r, i) => {
	var a = {}, o;
	return n.forEach((n) => {
		var s = TC(t, n);
		o ??= OC(t, r, e);
		var c = r === "left" && !i || r === "right" && i;
		a[n.id] = o - Number(c) * s.width, o += (c ? -1 : 1) * s.width;
	}), a;
}), jC = V([
	Ml,
	zx,
	(e, t) => {
		var n = zx(e, t);
		if (n != null) return kC(e, n.orientation, n.mirror);
	},
	(e, t) => t
], (e, t, n, r) => {
	if (t != null) {
		var i = n?.[r];
		return i == null ? {
			x: e.left,
			y: 0
		} : {
			x: e.left,
			y: i
		};
	}
}), MC = V([
	Ml,
	Hx,
	(e, t) => {
		var n = Hx(e, t);
		if (n != null) return AC(e, n.orientation, n.mirror);
	},
	(e, t) => t
], (e, t, n, r) => {
	if (t != null) {
		var i = n?.[r];
		return i == null ? {
			x: 0,
			y: e.top
		} : {
			x: i,
			y: e.top
		};
	}
}), NC = V(Ml, Hx, (e, t) => ({
	width: typeof t.width == "number" ? t.width : 60,
	height: e.height
})), PC = (e, t, n) => {
	switch (t) {
		case "xAxis": return EC(e, n).width;
		case "yAxis": return NC(e, n).height;
		default: return;
	}
}, FC = (e, t, n, r) => {
	if (n != null) {
		var i = n.allowDuplicatedCategory, a = n.type, o = n.dataKey, s = Jc(e, r), c = t.map((e) => e.value), l = c.filter((e) => e != null);
		if (o && s && a === "category" && i && xt(l)) return c;
	}
}, IC = V([
	K,
	lS,
	Z,
	Y
], FC), LC = V([
	K,
	Gx,
	tC,
	vC,
	IC,
	_C,
	pC,
	rC,
	Y
], (e, t, n, r, i, a, o, s, c) => {
	if (t != null) {
		var l = Jc(e, c);
		return {
			angle: t.angle,
			interval: t.interval,
			minTickGap: t.minTickGap,
			orientation: t.orientation,
			tick: t.tick,
			tickCount: t.tickCount,
			tickFormatter: t.tickFormatter,
			ticks: t.ticks,
			type: t.type,
			unit: t.unit,
			axisType: c,
			categoricalDomain: a,
			duplicateDomain: i,
			isCategorical: l,
			niceTicks: s,
			range: o,
			realScaleType: n,
			scale: r
		};
	}
}), RC = (e, t, n, r, i, a, o, s, c) => {
	if (t != null && r != null) {
		var l = Jc(e, c), u = t.type, d = t.ticks, f = t.tickCount, p = n === "scaleBand" && typeof r.bandwidth == "function" ? r.bandwidth() / 2 : 2, m = u === "category" && r.bandwidth ? r.bandwidth() / p : 0;
		m = c === "angleAxis" && a != null && a.length >= 2 ? mt(a[0] - a[1]) * 2 * m : m;
		var h = d || i;
		return h ? h.map((e, t) => {
			var n = o ? o.indexOf(e) : e, i = r.map(n);
			return W(i) ? {
				index: t,
				coordinate: i + m,
				value: e,
				offset: m
			} : null;
		}).filter(wt) : l && s ? s.map((e, t) => {
			var n = r.map(e);
			return W(n) ? {
				coordinate: n + m,
				value: e,
				index: t,
				offset: m
			} : null;
		}).filter(wt) : r.ticks ? r.ticks(f).map((e, t) => {
			var n = r.map(e);
			return W(n) ? {
				coordinate: n + m,
				value: e,
				index: t,
				offset: m
			} : null;
		}).filter(wt) : r.domain().map((e, t) => {
			var n = r.map(e);
			return W(n) ? {
				coordinate: n + m,
				value: o ? o[e] : e,
				index: t,
				offset: m
			} : null;
		}).filter(wt);
	}
}, zC = V([
	K,
	Kx,
	tC,
	vC,
	rC,
	pC,
	IC,
	_C,
	Y
], RC), BC = (e, t, n, r, i, a, o) => {
	if (t != null && n != null && r != null && r[0] !== r[1]) {
		var s = Jc(e, o), c = t.tickCount, l = 0;
		return l = o === "angleAxis" && r?.length >= 2 ? mt(r[0] - r[1]) * 2 * l : l, s && a ? a.map((e, t) => {
			var r = n.map(e);
			return W(r) ? {
				coordinate: r + l,
				value: e,
				index: t,
				offset: l
			} : null;
		}).filter(wt) : n.ticks ? n.ticks(c).map((e, t) => {
			var r = n.map(e);
			return W(r) ? {
				coordinate: r + l,
				value: e,
				index: t,
				offset: l
			} : null;
		}).filter(wt) : n.domain().map((e, t) => {
			var r = n.map(e);
			return W(r) ? {
				coordinate: r + l,
				value: i ? i[e] : e,
				index: t,
				offset: l
			} : null;
		}).filter(wt);
	}
}, VC = V([
	K,
	Kx,
	vC,
	pC,
	IC,
	_C,
	Y
], BC), HC = V(Z, vC, (e, t) => {
	if (e != null && t != null) return Ex(Ex({}, e), {}, { scale: t });
});
V((e, t, n) => Wx(e, n), V([V([
	Z,
	tC,
	eC,
	mC
], vx)], ug), (e, t) => {
	if (e != null && t != null) return Ex(Ex({}, e), {}, { scale: t });
});
var UC = V([
	K,
	vl,
	yl
], (e, t, n) => {
	switch (e) {
		case "horizontal": return t.some((e) => e.reversed) ? "right-to-left" : "left-to-right";
		case "vertical": return n.some((e) => e.reversed) ? "bottom-to-top" : "top-to-bottom";
		case "centric":
		case "radial": return "left-to-right";
		default: return;
	}
});
V([(e, t, n) => e.renderedTicks[t]?.[n]], (e) => {
	if (e && e.length !== 0) return (t) => {
		var n = Infinity, r = e[0];
		for (var i of e) {
			var a = Math.abs(i.coordinate - t);
			a < n && (n = a, r = i);
		}
		return r?.value;
	};
});
// node_modules/recharts/es6/state/selectors/selectTooltipEventType.js
var WC = (e) => e.options.defaultTooltipEventType, GC = (e) => e.options.validateTooltipEventTypes;
function KC(e, t, n) {
	if (e == null) return t;
	var r = e ? "axis" : "item";
	return n == null ? t : n.includes(r) ? r : t;
}
function qC(e, t) {
	return KC(t, WC(e), GC(e));
}
function JC(e) {
	return B((t) => qC(t, e));
}
// node_modules/recharts/es6/state/selectors/combiners/combineActiveLabel.js
var YC = (e, t) => {
	var n, r = Number(t);
	if (!(ht(r) || t == null)) return r >= 0 ? e == null || (n = e[r]) == null ? void 0 : n.value : void 0;
}, XC = (e) => e.tooltip.settings, ZC = {
	active: !1,
	index: null,
	dataKey: void 0,
	graphicalItemId: void 0,
	coordinate: void 0
}, QC = Gs({
	name: "tooltip",
	initialState: {
		itemInteraction: {
			click: ZC,
			hover: ZC
		},
		axisInteraction: {
			click: ZC,
			hover: ZC
		},
		keyboardInteraction: ZC,
		syncInteraction: {
			active: !1,
			index: null,
			dataKey: void 0,
			label: void 0,
			coordinate: void 0,
			sourceViewBox: void 0,
			graphicalItemId: void 0
		},
		tooltipItemPayloads: [],
		settings: {
			shared: void 0,
			trigger: "hover",
			axisId: 0,
			active: !1,
			defaultIndex: void 0
		}
	},
	reducers: {
		addTooltipEntrySettings: {
			reducer(e, t) {
				e.tooltipItemPayloads.push(H(t.payload));
			},
			prepare: U()
		},
		replaceTooltipEntrySettings: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = _s(e).tooltipItemPayloads.indexOf(H(r));
				a > -1 && (e.tooltipItemPayloads[a] = H(i));
			},
			prepare: U()
		},
		removeTooltipEntrySettings: {
			reducer(e, t) {
				var n = _s(e).tooltipItemPayloads.indexOf(H(t.payload));
				n > -1 && e.tooltipItemPayloads.splice(n, 1);
			},
			prepare: U()
		},
		setTooltipSettingsState(e, t) {
			e.settings = t.payload;
		},
		setActiveMouseOverItemIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.itemInteraction.hover.active = !0, e.itemInteraction.hover.index = t.payload.activeIndex, e.itemInteraction.hover.dataKey = t.payload.activeDataKey, e.itemInteraction.hover.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.hover.coordinate = t.payload.activeCoordinate;
		},
		mouseLeaveChart(e) {
			e.itemInteraction.hover.active = !1, e.axisInteraction.hover.active = !1;
		},
		mouseLeaveItem(e) {
			e.itemInteraction.hover.active = !1;
		},
		setActiveClickItemIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.itemInteraction.click.active = !0, e.keyboardInteraction.active = !1, e.itemInteraction.click.index = t.payload.activeIndex, e.itemInteraction.click.dataKey = t.payload.activeDataKey, e.itemInteraction.click.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.click.coordinate = t.payload.activeCoordinate;
		},
		setMouseOverAxisIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.axisInteraction.hover.active = !0, e.keyboardInteraction.active = !1, e.axisInteraction.hover.index = t.payload.activeIndex, e.axisInteraction.hover.dataKey = t.payload.activeDataKey, e.axisInteraction.hover.coordinate = t.payload.activeCoordinate;
		},
		setMouseClickAxisIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.axisInteraction.click.active = !0, e.axisInteraction.click.index = t.payload.activeIndex, e.axisInteraction.click.dataKey = t.payload.activeDataKey, e.axisInteraction.click.coordinate = t.payload.activeCoordinate;
		},
		setSyncInteraction(e, t) {
			e.syncInteraction = t.payload;
		},
		setKeyboardInteraction(e, t) {
			e.keyboardInteraction.active = t.payload.active, e.keyboardInteraction.index = t.payload.activeIndex, e.keyboardInteraction.coordinate = t.payload.activeCoordinate;
		}
	}
}), $C = QC.actions, ew = $C.addTooltipEntrySettings, tw = $C.replaceTooltipEntrySettings, nw = $C.removeTooltipEntrySettings, rw = $C.setTooltipSettingsState, iw = $C.setActiveMouseOverItemIndex, aw = $C.mouseLeaveItem, ow = $C.mouseLeaveChart, sw = $C.setActiveClickItemIndex, cw = $C.setMouseOverAxisIndex, lw = $C.setMouseClickAxisIndex, uw = $C.setSyncInteraction, dw = $C.setKeyboardInteraction, fw = QC.reducer;
// node_modules/recharts/es6/state/selectors/combiners/combineTooltipInteractionState.js
function pw(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function mw(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? pw(Object(n), !0).forEach(function(t) {
			hw(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pw(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function hw(e, t, n) {
	return (t = gw(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function gw(e) {
	var t = _w(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function _w(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function vw(e, t, n) {
	return t === "axis" ? n === "click" ? e.axisInteraction.click : e.axisInteraction.hover : n === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function yw(e) {
	return e.index != null;
}
var bw = (e, t, n, r) => {
	if (t == null) return ZC;
	var i = vw(e, t, n);
	if (i == null) return ZC;
	if (i.active) return i;
	if (e.keyboardInteraction.active) return e.keyboardInteraction;
	if (e.syncInteraction.active && e.syncInteraction.index != null) return e.syncInteraction;
	var a = e.settings.active === !0;
	if (yw(i)) {
		if (a) return mw(mw({}, i), {}, { active: !0 });
	} else if (r != null) return {
		active: !0,
		coordinate: void 0,
		dataKey: void 0,
		index: r,
		graphicalItemId: void 0
	};
	return mw(mw({}, ZC), {}, { coordinate: i.coordinate });
};
// node_modules/recharts/es6/state/selectors/combiners/combineActiveTooltipIndex.js
function xw(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (e instanceof Date) {
		var t = e.valueOf();
		return Number.isFinite(t) ? t : void 0;
	}
	var n = Number(e);
	return Number.isFinite(n) ? n : void 0;
}
function Sw(e, t) {
	var n = xw(e), r = t[0], i = t[1];
	return n !== void 0 && n >= Math.min(r, i) && n <= Math.max(r, i);
}
function Cw(e, t, n) {
	if (n == null || t == null) return !0;
	var r = G(e, t);
	return r == null || !rh(n) || Sw(r, n);
}
var ww = (e, t, n, r) => {
	var i = e?.index;
	if (i == null) return null;
	var a = Number(i);
	if (!W(a)) return i;
	var o = 0, s = Infinity;
	t.length > 0 && (s = t.length - 1);
	var c = Math.max(o, Math.min(a, s)), l = t[c];
	return l == null || Cw(l, n, r) ? String(c) : null;
}, Tw = (e, t, n, r, i, a, o) => {
	if (a != null) {
		var s = o[0]?.getPosition(a);
		if (s != null) return s;
		var c = i?.[Number(a)];
		if (c) switch (n) {
			case "horizontal": return {
				x: c.coordinate,
				y: (r.top + t) / 2
			};
			default: return {
				x: (r.left + e) / 2,
				y: c.coordinate
			};
		}
	}
}, Ew = (e, t, n, r) => {
	if (t === "axis") return e.tooltipItemPayloads;
	if (e.tooltipItemPayloads.length === 0) return [];
	var i = n === "hover" ? e.itemInteraction.hover.graphicalItemId : e.itemInteraction.click.graphicalItemId;
	if (e.syncInteraction.active && i == null) return e.tooltipItemPayloads;
	if (i == null && (r != null || e.keyboardInteraction.active)) {
		var a = e.tooltipItemPayloads[0];
		return a == null ? [] : [a];
	}
	return e.tooltipItemPayloads.filter((e) => e.settings?.graphicalItemId === i);
}, Dw = (e) => e.options.tooltipPayloadSearcher, Ow = (e) => e.tooltip;
// node_modules/recharts/es6/state/selectors/combiners/combineTooltipPayload.js
function kw(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Aw(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? kw(Object(n), !0).forEach(function(t) {
			jw(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : kw(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function jw(e, t, n) {
	return (t = Mw(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Mw(e) {
	var t = Nw(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Nw(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Pw(e) {
	if (typeof e == "string" || typeof e == "number") return e;
}
function Fw(e) {
	if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
}
function Iw(e) {
	if (typeof e == "string" || typeof e == "number") return e;
	if (typeof e == "function") return (t) => e(t);
}
function Lw(e) {
	if (typeof e == "string") return e;
}
function Rw(e) {
	if (typeof e == "object" && e) return {
		name: "name" in e ? Pw(e.name) : void 0,
		unit: "unit" in e ? Fw(e.unit) : void 0,
		dataKey: "dataKey" in e ? Iw(e.dataKey) : void 0,
		payload: "payload" in e ? e.payload : void 0,
		color: "color" in e ? Lw(e.color) : void 0,
		fill: "fill" in e ? Lw(e.fill) : void 0
	};
}
function zw(e, t) {
	return e ?? t;
}
var Bw = (e, t, n, r, i, a, o) => {
	if (t != null && a != null) {
		var s = n.chartData, c = n.computedData, l = n.dataStartIndex, u = n.dataEndIndex;
		return e.reduce((e, n) => {
			var d = n.dataDefinedOnItem, f = n.settings, p = zw(d, s), m = Array.isArray(p) ? Bc(p, l, u) : p, h = f?.dataKey ?? r, g = f?.nameKey, _;
			return r && Array.isArray(m) && !Array.isArray(m[0]) && o === "axis" ? (_ = St(m, r, i), _ ??= a(m, t, c, g)) : _ = a(m, t, c, g), Array.isArray(_) ? _.forEach((t) => {
				var n = Rw(t), r = n?.name, i = n?.dataKey, a = n?.payload, o = Aw(Aw({}, f), {}, {
					name: r,
					unit: n?.unit,
					color: n?.color ?? f?.color,
					fill: n?.fill ?? f?.fill
				});
				e.push(ul({
					tooltipEntrySettings: o,
					dataKey: i,
					payload: a,
					value: G(a, i),
					name: r == null ? void 0 : String(r)
				}));
			}) : e.push(ul({
				tooltipEntrySettings: f,
				dataKey: h,
				payload: _,
				value: G(_, h),
				name: G(_, g) ?? f?.name
			})), e;
		}, []);
	}
}, Vw = V([
	_S,
	qx,
	Oh
], xx), Hw = V([
	V([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]),
	_S,
	V([cg, lg], Jx)
], Zx, { memoizeOptions: { resultEqualityCheck: og } }), Uw = V([Hw], (e) => e.filter(ig)), Ww = V([Hw], nS, { memoizeOptions: { resultEqualityCheck: og } }), Gw = V([Hw], (e) => e.some((e) => !e.data)), Kw = V([Ww, Wm], aS), qw = V([
	Uw,
	Wm,
	_S
], rg), Jw = V([
	Kw,
	_S,
	Hw,
	Wm,
	Gw,
	Ww
], cS), Yw = V([_S], wS), Xw = V([Yw, V([_S], (e) => e.allowDataOverflow)], ah), Zw = V([
	V([
		qw,
		V([Hw], (e) => e.filter(ig)),
		Eh,
		Dh
	], bS),
	Wm,
	cg,
	Xw
], SS), Qw = V([
	Kw,
	_S,
	V([Hw], eS),
	OS,
	cg,
	Xm
], jS, { memoizeOptions: { resultEqualityCheck: ag } }), $w = V([V([
	FS,
	cg,
	lg
], IS), cg], HS), eT = V([V([
	RS,
	cg,
	lg
], IS), cg], WS), tT = V([
	_S,
	K,
	Kw,
	Jw,
	Eh,
	cg,
	V([
		_S,
		Yw,
		Xw,
		Zw,
		Qw,
		V([
			$w,
			V([V([
				BS,
				cg,
				lg
			], IS), cg], JS),
			eT
		], AS),
		K,
		cg
	], XS)
], $S), nT = V([
	_S,
	tT,
	V([
		tT,
		_S,
		Vw
	], nC),
	cg
], iC), rT = (e) => pC(e, cg(e), lg(e), !1), iT = V([_S, rT], Fh), aT = V([V([
	_S,
	Vw,
	nT,
	iT
], vx)], ug), oT = V([
	K,
	_S,
	Vw,
	aT,
	rT,
	V([
		K,
		Jw,
		_S,
		cg
	], FC),
	V([
		K,
		Jw,
		_S,
		cg
	], gC),
	cg
], (e, t, n, r, i, a, o, s) => {
	if (t) {
		var c = t.type, l = Jc(e, s);
		if (r) {
			var u = n === "scaleBand" && r.bandwidth ? r.bandwidth() / 2 : 2, d = c === "category" && r.bandwidth ? r.bandwidth() / u : 0;
			return d = s === "angleAxis" && i != null && i?.length >= 2 ? mt(i[0] - i[1]) * 2 * d : d, l && o ? o.map((e, t) => {
				var n = r.map(e);
				return W(n) ? {
					coordinate: n + d,
					value: e,
					index: t,
					offset: d
				} : null;
			}).filter(wt) : r.domain().map((e, t) => {
				var n = r.map(e);
				return W(n) ? {
					coordinate: n + d,
					value: a ? a[e] : e,
					index: t,
					offset: d
				} : null;
			}).filter(wt);
		}
	}
}), sT = V([
	WC,
	GC,
	XC
], (e, t, n) => KC(n.shared, e, t)), cT = (e) => e.tooltip.settings.trigger, lT = (e) => e.tooltip.settings.defaultIndex, uT = V([
	Ow,
	sT,
	cT,
	lT
], bw), dT = V([
	uT,
	Kw,
	vS,
	tT
], ww), fT = V([oT, dT], YC), pT = V([uT], (e) => {
	if (e) return e.dataKey;
}), mT = V([uT], (e) => {
	if (e) return e.graphicalItemId;
}), hT = V([
	Ow,
	sT,
	cT,
	lT
], Ew), gT = V([uT, V([
	ml,
	hl,
	K,
	Ml,
	oT,
	lT,
	hT
], Tw)], (e, t) => e != null && e.coordinate ? e.coordinate : t), _T = V([uT], (e) => e?.active ?? !1), vT = V([V([
	hT,
	dT,
	Wm,
	vS,
	fT,
	Dw,
	sT
], Bw)], (e) => {
	if (e != null) {
		var t = e.map((e) => e.payload).filter((e) => e != null);
		return Array.from(new Set(t));
	}
});
// node_modules/recharts/es6/context/useTooltipAxis.js
function yT(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function bT(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? yT(Object(n), !0).forEach(function(t) {
			xT(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : yT(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function xT(e, t, n) {
	return (t = ST(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ST(e) {
	var t = CT(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function CT(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var wT = () => B(_S), TT = () => {
	var e = wT(), t = B(oT), n = B(aT);
	return ll(!e || !n ? void 0 : bT(bT({}, e), {}, { scale: n }), t);
};
// node_modules/recharts/es6/util/getActiveCoordinate.js
function ET(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function DT(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ET(Object(n), !0).forEach(function(t) {
			OT(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ET(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function OT(e, t, n) {
	return (t = kT(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function kT(e) {
	var t = AT(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function AT(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var jT = (e, t, n, r) => {
	var i = t.find((e) => e && e.index === n);
	if (i) {
		if (e === "horizontal") return {
			x: i.coordinate,
			y: r.relativeY
		};
		if (e === "vertical") return {
			x: r.relativeX,
			y: i.coordinate
		};
	}
	return {
		x: 0,
		y: 0
	};
}, MT = (e, t, n, r) => {
	var i = t.find((e) => e && e.index === n);
	if (i) {
		if (e === "centric") {
			var a = i.coordinate, o = r.radius;
			return DT(DT(DT({}, r), _m(r.cx, r.cy, o, a)), {}, {
				angle: a,
				radius: o
			});
		}
		var s = i.coordinate, c = r.angle;
		return DT(DT(DT({}, r), _m(r.cx, r.cy, s, c)), {}, {
			angle: c,
			radius: s
		});
	}
	return {
		angle: 0,
		clockWise: !1,
		cx: 0,
		cy: 0,
		endAngle: 0,
		innerRadius: 0,
		outerRadius: 0,
		radius: 0,
		startAngle: 0,
		x: 0,
		y: 0
	};
};
function NT(e, t) {
	var n = e.relativeX, r = e.relativeY;
	return n >= t.left && n <= t.left + t.width && r >= t.top && r <= t.top + t.height;
}
var PT = (e, t, n, r, i) => {
	var a = t?.length ?? 0;
	if (a <= 1 || e == null) return 0;
	if (r === "angleAxis" && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6) for (var o = i[1] - i[0], s = (t, n, r) => [
		e,
		e + o,
		e - o
	].some((e) => (r ? e >= t : e > t) && e <= n), c = 0; c < a; c++) {
		var l = c > 0 ? n[c - 1]?.coordinate : n[a - 1]?.coordinate, u = n[c]?.coordinate, d = c >= a - 1 ? n[0]?.coordinate : n[c + 1]?.coordinate, f = void 0;
		if (l != null && u != null && d != null) {
			if (mt(u - l) !== mt(d - u)) {
				var p = [];
				if (mt(d - u) === mt(i[1] - i[0])) {
					f = d;
					var m = u + i[1] - i[0];
					p[0] = Math.min(m, (m + l) / 2), p[1] = Math.max(m, (m + l) / 2);
				} else {
					f = l;
					var h = d + i[1] - i[0];
					p[0] = Math.min(u, (h + u) / 2), p[1] = Math.max(u, (h + u) / 2);
				}
				var g = [Math.min(u, (f + u) / 2), Math.max(u, (f + u) / 2)];
				if (s(g[0], g[1], !1) || s(p[0], p[1], !0)) return n[c]?.index;
			} else {
				var _ = Math.min(l, d), v = Math.max(l, d);
				if (s((_ + u) / 2, (v + u) / 2, !1)) return n[c]?.index;
			}
		}
	}
	else if (t) for (var y = 0; y < a; y++) {
		var b = t[y];
		if (b != null) {
			var x = t[y + 1], S = t[y - 1];
			if (y === 0 && x != null && e <= (b.coordinate + x.coordinate) / 2 || y === a - 1 && S != null && e > (b.coordinate + S.coordinate) / 2 || y > 0 && y < a - 1 && S != null && x != null && e > (b.coordinate + S.coordinate) / 2 && e <= (b.coordinate + x.coordinate) / 2) return b.index;
		}
	}
	return -1;
}, FT = () => B(Oh), IT = (e, t) => t, LT = (e, t, n) => n, RT = (e, t, n, r) => r, zT = V(oT, (e) => Ta(e, (e) => e.coordinate)), BT = V([
	Ow,
	IT,
	LT,
	RT
], bw), VT = V([
	BT,
	Kw,
	vS,
	tT
], ww), HT = (e, t, n) => {
	if (t != null) {
		var r = Ow(e);
		return t === "axis" ? n === "hover" ? r.axisInteraction.hover.dataKey : r.axisInteraction.click.dataKey : n === "hover" ? r.itemInteraction.hover.dataKey : r.itemInteraction.click.dataKey;
	}
}, UT = V([
	Ow,
	IT,
	LT,
	RT
], Ew), WT = V([
	ml,
	hl,
	K,
	Ml,
	oT,
	RT,
	UT
], Tw), GT = V([BT, WT], (e, t) => e.coordinate ?? t), KT = V([oT, VT], YC), qT = V([
	UT,
	VT,
	Wm,
	vS,
	KT,
	Dw,
	IT
], Bw), JT = V([BT, VT], (e, t) => ({
	isActive: e.active && t != null,
	activeIndex: t
})), YT = (e, t, n, r, i, a, o) => {
	if (e && n && r && i && NT(e, o)) {
		var s = PT(fl(e, t), a, i, n, r), c = jT(t, i, s, e);
		return {
			activeIndex: String(s),
			activeCoordinate: c
		};
	}
}, XT = (e, t, n, r, i, a, o) => {
	if (e && r && i && a && n) {
		var s = Cm(e, n);
		if (s) {
			var c = PT(pl(s, t), o, a, r, i), l = MT(t, a, c, s);
			return {
				activeIndex: String(c),
				activeCoordinate: l
			};
		}
	}
}, ZT = (e, t, n, r, i, a, o, s) => {
	if (e && t && r && i && a) return t === "horizontal" || t === "vertical" ? YT(e, t, r, i, a, o, s) : XT(e, t, n, r, i, a, o);
}, QT = V((e) => e.zIndex.zIndexMap, (e, t) => t, (e, t, n) => n, (e, t, n) => {
	if (t != null) {
		var r = e[t];
		if (r != null) return n ? r.panoramaElement : r.element;
	}
}), $T = V((e) => e.zIndex.zIndexMap, (e) => {
	var t = Object.keys(e).map((e) => parseInt(e, 10)).concat(Object.values(J));
	return Array.from(new Set(t)).sort((e, t) => e - t);
}, { memoizeOptions: { resultEqualityCheck: sg } });
// node_modules/recharts/es6/state/zIndexSlice.js
function eE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function tE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? eE(Object(n), !0).forEach(function(t) {
			nE(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : eE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function nE(e, t, n) {
	return (t = rE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function rE(e) {
	var t = iE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function iE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var aE = { zIndexMap: Object.values(J).reduce((e, t) => tE(tE({}, e), {}, { [t]: {
	element: void 0,
	panoramaElement: void 0,
	consumers: 0
} }), {}) }, oE = new Set(Object.values(J));
function sE(e) {
	return oE.has(e);
}
var cE = Gs({
	name: "zIndex",
	initialState: aE,
	reducers: {
		registerZIndexPortal: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] ? e.zIndexMap[n].consumers += 1 : e.zIndexMap[n] = {
					consumers: 1,
					element: void 0,
					panoramaElement: void 0
				};
			},
			prepare: U()
		},
		unregisterZIndexPortal: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] && (--e.zIndexMap[n].consumers, e.zIndexMap[n].consumers <= 0 && !sE(n) && delete e.zIndexMap[n]);
			},
			prepare: U()
		},
		registerZIndexPortalElement: {
			reducer: (e, t) => {
				var n = t.payload, r = n.zIndex, i = n.element, a = n.isPanorama;
				e.zIndexMap[r] ? a ? e.zIndexMap[r].panoramaElement = H(i) : e.zIndexMap[r].element = H(i) : e.zIndexMap[r] = {
					consumers: 0,
					element: a ? void 0 : H(i),
					panoramaElement: a ? H(i) : void 0
				};
			},
			prepare: U()
		},
		unregisterZIndexPortalElement: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] && (t.payload.isPanorama ? e.zIndexMap[n].panoramaElement = void 0 : e.zIndexMap[n].element = void 0);
			},
			prepare: U()
		}
	}
}), lE = cE.actions, uE = lE.registerZIndexPortal, dE = lE.unregisterZIndexPortal, fE = lE.registerZIndexPortalElement, pE = lE.unregisterZIndexPortalElement, mE = cE.reducer;
// node_modules/recharts/es6/zIndex/ZIndexLayer.js
function hE(e) {
	var t = e.zIndex, n = e.children, r = Ou() && t !== void 0 && t !== 0, i = Il(), a = (0, P.useRef)(void 0), o = (0, P.useRef)(/* @__PURE__ */ new Set()), s = z(), c = B((e) => QT(e, t, i));
	if ((0, P.useLayoutEffect)(() => {
		if (!r) {
			var e = o.current;
			e.forEach((e) => {
				s(dE({ zIndex: e }));
			}), e.clear(), a.current = void 0;
		} else if (o.current.has(t) || (s(uE({ zIndex: t })), o.current.add(t)), c) {
			a.current = c;
			var n = o.current;
			n.forEach((e) => {
				e !== t && (s(dE({ zIndex: e })), n.delete(e));
			});
		}
	}, [
		s,
		t,
		r,
		c
	]), (0, P.useLayoutEffect)(() => {
		var e = o.current;
		return () => {
			e.forEach((e) => {
				s(dE({ zIndex: e }));
			}), e.clear();
		};
	}, [s]), !r) return n;
	var l = c ?? a.current;
	return l ? /*#__PURE__*/ (0, Pe.createPortal)(n, l) : null;
}
// node_modules/recharts/es6/component/Cursor.js
function gE() {
	return gE = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, gE.apply(null, arguments);
}
function _E(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function vE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? _E(Object(n), !0).forEach(function(t) {
			yE(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _E(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function yE(e, t, n) {
	return (t = bE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function bE(e) {
	var t = xE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function xE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function SE(e) {
	var t = e.cursor, n = e.cursorComp, r = e.cursorProps;
	return /*#__PURE__*/ (0, P.isValidElement)(t) ? /*#__PURE__*/ (0, P.cloneElement)(t, r) : /*#__PURE__*/ (0, P.createElement)(n, r);
}
function CE(e) {
	var t = e.coordinate, n = e.payload, r = e.index, i = e.offset, a = e.tooltipAxisBandSize, o = e.layout, s = e.cursor, c = e.tooltipEventType, u = e.chartName, d = t, f = n, p = r;
	if (!s || !d || u !== "ScatterChart" && c !== "axis") return null;
	var m, h, g;
	if (u === "ScatterChart") m = d, h = Yf, g = J.cursorLine;
	else if (u === "BarChart") m = Xf(o, d, i, a), h = cm, g = J.cursorRectangle;
	else if (o === "radial" && xr(d)) {
		var _ = wm(d), v = _.cx, y = _.cy, b = _.radius;
		m = {
			cx: v,
			cy: y,
			startAngle: _.startAngle,
			endAngle: _.endAngle,
			innerRadius: b,
			outerRadius: b
		}, h = zm, g = J.cursorLine;
	} else m = { points: Bm(o, d, i) }, h = Rf, g = J.cursorLine;
	var x = typeof s == "object" && "className" in s ? s.className : void 0, S = vE(vE(vE(vE({
		stroke: "#ccc",
		pointerEvents: "none"
	}, i), m), Ve(s)), {}, {
		payload: f,
		payloadIndex: p,
		className: l("recharts-tooltip-cursor", x)
	});
	return /*#__PURE__*/ P.createElement(hE, { zIndex: e.zIndex ?? g }, /*#__PURE__*/ P.createElement(SE, {
		cursor: s,
		cursorComp: h,
		cursorProps: S
	}));
}
function wE(e) {
	var t = TT(), n = bu(), r = wu(), i = FT();
	return t == null || n == null || r == null || i == null ? null : /*#__PURE__*/ P.createElement(CE, gE({}, e, {
		offset: n,
		layout: r,
		tooltipAxisBandSize: t,
		chartName: i
	}));
}
// node_modules/recharts/es6/context/tooltipPortalContext.js
var TE = /*#__PURE__*/ (0, P.createContext)(null), EE = () => (0, P.useContext)(TE), DE = (/* @__PURE__ */ i((/* @__PURE__ */ n(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = "~";
	function i() {}
	Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1));
	function a(e, t, n) {
		this.fn = e, this.context = t, this.once = n || !1;
	}
	function o(e, t, n, i, o) {
		if (typeof n != "function") throw TypeError("The listener must be a function");
		var s = new a(n, i || e, o), c = r ? r + t : t;
		return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;
	}
	function s(e, t) {
		--e._eventsCount === 0 ? e._events = new i() : delete e._events[t];
	}
	function c() {
		this._events = new i(), this._eventsCount = 0;
	}
	c.prototype.eventNames = function() {
		var e = [], t, i;
		if (this._eventsCount === 0) return e;
		for (i in t = this._events) n.call(t, i) && e.push(r ? i.slice(1) : i);
		return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
	}, c.prototype.listeners = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		if (!n) return [];
		if (n.fn) return [n.fn];
		for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
		return o;
	}, c.prototype.listenerCount = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		return n ? n.fn ? 1 : n.length : 0;
	}, c.prototype.emit = function(e, t, n, i, a, o) {
		var s = r ? r + e : e;
		if (!this._events[s]) return !1;
		var c = this._events[s], l = arguments.length, u, d;
		if (c.fn) {
			switch (c.once && this.removeListener(e, c.fn, void 0, !0), l) {
				case 1: return c.fn.call(c.context), !0;
				case 2: return c.fn.call(c.context, t), !0;
				case 3: return c.fn.call(c.context, t, n), !0;
				case 4: return c.fn.call(c.context, t, n, i), !0;
				case 5: return c.fn.call(c.context, t, n, i, a), !0;
				case 6: return c.fn.call(c.context, t, n, i, a, o), !0;
			}
			for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
			c.fn.apply(c.context, u);
		} else {
			var f = c.length, p;
			for (d = 0; d < f; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l) {
				case 1:
					c[d].fn.call(c[d].context);
					break;
				case 2:
					c[d].fn.call(c[d].context, t);
					break;
				case 3:
					c[d].fn.call(c[d].context, t, n);
					break;
				case 4:
					c[d].fn.call(c[d].context, t, n, i);
					break;
				default:
					if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
					c[d].fn.apply(c[d].context, u);
			}
		}
		return !0;
	}, c.prototype.on = function(e, t, n) {
		return o(this, e, t, n, !1);
	}, c.prototype.once = function(e, t, n) {
		return o(this, e, t, n, !0);
	}, c.prototype.removeListener = function(e, t, n, i) {
		var a = r ? r + e : e;
		if (!this._events[a]) return this;
		if (!t) return s(this, a), this;
		var o = this._events[a];
		if (o.fn) o.fn !== t || i && !o.once || n && o.context !== n || s(this, a);
		else {
			for (var c = 0, l = [], u = o.length; c < u; c++) (o[c].fn !== t || i && !o[c].once || n && o[c].context !== n) && l.push(o[c]);
			l.length ? this._events[a] = l.length === 1 ? l[0] : l : s(this, a);
		}
		return this;
	}, c.prototype.removeAllListeners = function(e) {
		var t;
		return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new i(), this._eventsCount = 0), this;
	}, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, t !== void 0 && (t.exports = c);
})))(), 1)).default, OE = new DE(), kE = "recharts.syncEvent.tooltip", AE = "recharts.syncEvent.brush", jE = (e, t) => {
	if (t && Array.isArray(e)) {
		var n = Number.parseInt(t, 10);
		if (!ht(n)) return e[n];
	}
}, ME = Gs({
	name: "options",
	initialState: {
		chartName: "",
		tooltipPayloadSearcher: () => void 0,
		eventEmitter: void 0,
		defaultTooltipEventType: "axis"
	},
	reducers: { createEventEmitter: (e) => {
		e.eventEmitter ??= Symbol("rechartsEventEmitter");
	} }
}), NE = ME.reducer, PE = ME.actions.createEventEmitter;
// node_modules/recharts/es6/synchronisation/syncSelectors.js
function FE(e) {
	return e.tooltip.syncInteraction;
}
var IE = Gs({
	name: "chartData",
	initialState: {
		chartData: void 0,
		computedData: void 0,
		dataStartIndex: 0,
		dataEndIndex: 0
	},
	reducers: {
		setChartData(e, t) {
			e.chartData = H(t.payload), t.payload == null ? (e.dataStartIndex = 0, e.dataEndIndex = 0) : t.payload.length > 0 && e.dataEndIndex !== t.payload.length - 1 && (e.dataEndIndex = t.payload.length - 1);
		},
		setComputedData(e, t) {
			e.computedData = t.payload;
		},
		setDataStartEndIndexes(e, t) {
			var n = t.payload, r = n.startIndex, i = n.endIndex;
			r != null && (e.dataStartIndex = r), i != null && (e.dataEndIndex = i);
		}
	}
}), LE = IE.actions, RE = LE.setChartData, zE = LE.setDataStartEndIndexes;
LE.setComputedData;
var BE = IE.reducer, VE = ["x", "y"];
function HE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function UE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? HE(Object(n), !0).forEach(function(t) {
			WE(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : HE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function WE(e, t, n) {
	return (t = GE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function GE(e) {
	var t = KE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function KE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function qE(e, t) {
	if (e == null) return {};
	var n, r, i = JE(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function JE(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function YE() {
	var e = B(kh), t = B(jh), n = z(), r = B(Ah), i = B(oT), a = wu(), o = vu(), s = B((e) => e.rootProps.className);
	(0, P.useEffect)(() => {
		if (e == null) return Tt;
		var s = (s, c, l) => {
			if (t !== l && e === s) {
				if (c.payload.active === !1) n(uw({
					active: !1,
					coordinate: void 0,
					dataKey: void 0,
					index: null,
					label: void 0,
					sourceViewBox: void 0,
					graphicalItemId: void 0
				}));
				else if (r === "index") {
					var u;
					if (o && c != null && (u = c.payload) != null && u.coordinate && c.payload.sourceViewBox) {
						var d = c.payload.coordinate, f = d.x, p = d.y, m = qE(d, VE), h = c.payload.sourceViewBox, g = h.x, _ = h.y, v = h.width, y = h.height, b = UE(UE({}, m), {}, {
							x: o.x + (v ? (f - g) / v : 0) * o.width,
							y: o.y + (y ? (p - _) / y : 0) * o.height
						});
						n(UE(UE({}, c), {}, { payload: UE(UE({}, c.payload), {}, { coordinate: b }) }));
					} else n(c);
				} else if (i != null) {
					var x;
					typeof r == "function" ? x = i[r(i, {
						activeTooltipIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
						isTooltipActive: c.payload.active,
						activeIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
						activeLabel: c.payload.label,
						activeDataKey: c.payload.dataKey,
						activeCoordinate: c.payload.coordinate
					})] : r === "value" && (x = i.find((e) => String(e.value) === c.payload.label));
					var S = c.payload.coordinate;
					if (S == null || o == null) n(uw({
						active: !1,
						coordinate: void 0,
						dataKey: void 0,
						index: null,
						label: void 0,
						sourceViewBox: void 0,
						graphicalItemId: void 0
					}));
					else if (x == null) n(uw({
						active: !1,
						coordinate: void 0,
						dataKey: void 0,
						index: null,
						label: void 0,
						sourceViewBox: c.payload.sourceViewBox,
						graphicalItemId: void 0
					}));
					else {
						var C = S.x, w = S.y, T = Math.min(C, o.x + o.width), E = Math.min(w, o.y + o.height), D = {
							x: a === "horizontal" ? x.coordinate : T,
							y: a === "horizontal" ? E : x.coordinate
						};
						n(uw({
							active: c.payload.active,
							coordinate: D,
							dataKey: c.payload.dataKey,
							index: String(x.index),
							label: c.payload.label,
							sourceViewBox: c.payload.sourceViewBox,
							graphicalItemId: c.payload.graphicalItemId
						}));
					}
				}
			}
		};
		return OE.on(kE, s), () => {
			OE.off(kE, s);
		};
	}, [
		s,
		n,
		t,
		e,
		r,
		i,
		a,
		o
	]);
}
function XE() {
	var e = B(kh), t = B(jh), n = z();
	(0, P.useEffect)(() => {
		if (e == null) return Tt;
		var r = (r, i, a) => {
			t !== a && e === r && n(zE(i));
		};
		return OE.on(AE, r), () => {
			OE.off(AE, r);
		};
	}, [
		n,
		t,
		e
	]);
}
function ZE() {
	var e = z();
	(0, P.useEffect)(() => {
		e(PE());
	}, [e]), YE(), XE();
}
function QE(e, t, n, r, i, a) {
	var o = B((n) => HT(n, e, t)), s = B(mT), c = B(jh), l = B(kh), u = B(Ah), d = B(FE)?.sourceViewBox != null, f = vu();
	(0, P.useEffect)(() => {
		if (!d && l != null && c != null) {
			var e = uw({
				active: a,
				coordinate: n,
				dataKey: o,
				index: i,
				label: typeof r == "number" ? String(r) : r,
				sourceViewBox: f,
				graphicalItemId: s
			});
			OE.emit(kE, l, e, c);
		}
	}, [
		d,
		n,
		o,
		s,
		i,
		r,
		c,
		l,
		u,
		a,
		f
	]);
}
// node_modules/recharts/es6/component/Tooltip.js
function $E(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function eD(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? $E(Object(n), !0).forEach(function(t) {
			tD(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $E(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function tD(e, t, n) {
	return (t = nD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function nD(e) {
	var t = rD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function rD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function iD(e, t) {
	return lD(e) || cD(e, t) || oD(e, t) || aD();
}
function aD() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function oD(e, t) {
	if (e) {
		if (typeof e == "string") return sD(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? sD(e, t) : void 0;
	}
}
function sD(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function cD(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function lD(e) {
	if (Array.isArray(e)) return e;
}
function uD(e) {
	return e.dataKey;
}
function dD(e, t) {
	return /*#__PURE__*/ P.isValidElement(e) ? /*#__PURE__*/ P.cloneElement(e, t) : typeof e == "function" ? /*#__PURE__*/ P.createElement(e, t) : /*#__PURE__*/ P.createElement(qd, t);
}
var fD = [], pD = {
	allowEscapeViewBox: {
		x: !1,
		y: !1
	},
	animationDuration: 400,
	animationEasing: "ease",
	axisId: 0,
	contentStyle: {},
	cursor: !0,
	filterNull: !0,
	includeHidden: !1,
	isAnimationActive: "auto",
	itemSorter: "name",
	itemStyle: {},
	labelStyle: {},
	offset: 10,
	reverseDirection: {
		x: !1,
		y: !1
	},
	separator: " : ",
	trigger: "hover",
	useTranslate3d: !1,
	wrapperStyle: {}
};
function mD(e) {
	var t = Ar(e, pD), n = t.active, r = t.allowEscapeViewBox, i = t.animationDuration, a = t.animationEasing, o = t.content, s = t.filterNull, c = t.isAnimationActive, l = t.offset, u = t.payloadUniqBy, d = t.position, f = t.reverseDirection, p = t.useTranslate3d, m = t.wrapperStyle, h = t.cursor, g = t.shared, _ = t.trigger, v = t.defaultIndex, y = t.portal, b = t.axisId, x = z(), S = typeof v == "number" ? String(v) : v;
	(0, P.useEffect)(() => {
		x(rw({
			shared: g,
			trigger: _,
			axisId: b,
			active: n,
			defaultIndex: S
		}));
	}, [
		x,
		g,
		_,
		b,
		n,
		S
	]);
	var C = vu(), w = Cf(), T = JC(g), E = B((e) => JT(e, T, _, S)) ?? {}, D = E.activeIndex, O = E.isActive, k = B((e) => qT(e, T, _, S)), A = B((e) => KT(e, T, _, S)), j = B((e) => GT(e, T, _, S)), M = k, N = EE(), ee = n ?? O ?? !1, te = iD(za([M, ee]), 2), ne = te[0], re = te[1], ie = T === "axis" ? A : void 0;
	QE(T, _, j, ie, D, ee);
	var ae = y ?? N;
	if (ae == null || C == null || T == null) return null;
	var oe = M ?? fD;
	ee || (oe = fD), s && oe.length && (oe = Qi(oe.filter((e) => e.value != null && (e.hide !== !0 || t.includeHidden)), u, uD));
	var se = oe.length > 0, ce = eD(eD({}, t), {}, {
		payload: oe,
		label: ie,
		active: ee,
		activeIndex: D,
		coordinate: j,
		accessibilityLayer: w
	}), le = /*#__PURE__*/ P.createElement(Sf, {
		allowEscapeViewBox: r,
		animationDuration: i,
		animationEasing: a,
		isAnimationActive: c,
		active: ee,
		coordinate: j,
		hasPayload: se,
		offset: l,
		position: d,
		reverseDirection: f,
		useTranslate3d: p,
		viewBox: C,
		wrapperStyle: m,
		lastBoundingBox: ne,
		innerRef: re,
		hasPortalFromProps: !!y
	}, dD(o, ce));
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ (0, Pe.createPortal)(le, ae), ee && /*#__PURE__*/ P.createElement(wE, {
		cursor: h,
		tooltipEventType: T,
		coordinate: j,
		payload: oe,
		index: D
	}));
}
// node_modules/recharts/es6/component/Cell.js
var hD = (e) => null;
hD.displayName = "Cell";
// node_modules/recharts/es6/util/LRUCache.js
function gD(e, t, n) {
	return (t = _D(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function _D(e) {
	var t = vD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function vD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var yD = class {
	constructor(e) {
		gD(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = e;
	}
	get(e) {
		var t = this.cache.get(e);
		return t !== void 0 && (this.cache.delete(e), this.cache.set(e, t)), t;
	}
	set(e, t) {
		if (this.cache.has(e)) this.cache.delete(e);
		else if (this.cache.size >= this.maxSize) {
			var n = this.cache.keys().next().value;
			n != null && this.cache.delete(n);
		}
		this.cache.set(e, t);
	}
	clear() {
		this.cache.clear();
	}
	size() {
		return this.cache.size;
	}
};
// node_modules/recharts/es6/util/DOMUtils.js
function bD(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function xD(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? bD(Object(n), !0).forEach(function(t) {
			SD(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bD(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function SD(e, t, n) {
	return (t = CD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function CD(e) {
	var t = wD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function wD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var TD = xD({}, {
	cacheSize: 2e3,
	enableCache: !0
}), ED = new yD(TD.cacheSize), DD = {
	position: "absolute",
	top: "-20000px",
	left: 0,
	padding: 0,
	margin: 0,
	border: "none",
	whiteSpace: "pre"
}, OD = "recharts_measurement_span";
function kD(e, t) {
	return `${e}|${t.fontSize || ""}|${t.fontFamily || ""}|${t.fontWeight || ""}|${t.fontStyle || ""}|${t.letterSpacing || ""}|${t.textTransform || ""}`;
}
var AD = (e, t) => {
	try {
		var n = document.getElementById(OD);
		n || (n = document.createElement("span"), n.setAttribute("id", OD), n.setAttribute("aria-hidden", "true"), document.body.appendChild(n)), Object.assign(n.style, DD, t), n.textContent = `${e}`;
		var r = n.getBoundingClientRect();
		return {
			width: r.width,
			height: r.height
		};
	} catch {
		return {
			width: 0,
			height: 0
		};
	}
}, jD = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	if (e == null || ef.isSsr) return {
		width: 0,
		height: 0
	};
	if (!TD.enableCache) return AD(e, t);
	var n = kD(e, t), r = ED.get(n);
	if (r) return r;
	var i = AD(e, t);
	return ED.set(n, i), i;
}, MD;
function ND(e, t) {
	return RD(e) || LD(e, t) || FD(e, t) || PD();
}
function PD() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function FD(e, t) {
	if (e) {
		if (typeof e == "string") return ID(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ID(e, t) : void 0;
	}
}
function ID(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function LD(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function RD(e) {
	if (Array.isArray(e)) return e;
}
function zD(e, t, n) {
	return (t = BD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function BD(e) {
	var t = VD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function VD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var HD = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, UD = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, WD = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/, GD = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, KD = {
	cm: 96 / 2.54,
	mm: 96 / 25.4,
	pt: 96 / 72,
	pc: 16,
	in: 96,
	Q: 96 / 101.6,
	px: 1
}, qD = [
	"cm",
	"mm",
	"pt",
	"pc",
	"in",
	"Q",
	"px"
];
function JD(e) {
	return qD.includes(e);
}
var YD = "NaN";
function XD(e, t) {
	return e * KD[t];
}
var ZD = class e {
	static parse(t) {
		var n = ND(GD.exec(t) ?? [], 3), r = n[1], i = n[2];
		return r == null ? e.NaN : new e(parseFloat(r), i ?? "");
	}
	constructor(e, t) {
		this.num = e, this.unit = t, this.num = e, this.unit = t, ht(e) && (this.unit = ""), t !== "" && !WD.test(t) && (this.num = NaN, this.unit = ""), JD(t) && (this.num = XD(e, t), this.unit = "px");
	}
	add(t) {
		return this.unit === t.unit ? new e(this.num + t.num, this.unit) : new e(NaN, "");
	}
	subtract(t) {
		return this.unit === t.unit ? new e(this.num - t.num, this.unit) : new e(NaN, "");
	}
	multiply(t) {
		return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new e(NaN, "") : new e(this.num * t.num, this.unit || t.unit);
	}
	divide(t) {
		return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new e(NaN, "") : new e(this.num / t.num, this.unit || t.unit);
	}
	toString() {
		return `${this.num}${this.unit}`;
	}
	isNaN() {
		return ht(this.num);
	}
};
MD = ZD, zD(ZD, "NaN", new MD(NaN, ""));
function QD(e) {
	if (e == null || e.includes(YD)) return YD;
	for (var t = e; t.includes("*") || t.includes("/");) {
		var n = ND(HD.exec(t) ?? [], 4), r = n[1], i = n[2], a = n[3], o = ZD.parse(r ?? ""), s = ZD.parse(a ?? ""), c = i === "*" ? o.multiply(s) : o.divide(s);
		if (c.isNaN()) return YD;
		t = t.replace(HD, c.toString());
	}
	for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t);) {
		var l = ND(UD.exec(t) ?? [], 4), u = l[1], d = l[2], f = l[3], p = ZD.parse(u ?? ""), m = ZD.parse(f ?? ""), h = d === "+" ? p.add(m) : p.subtract(m);
		if (h.isNaN()) return YD;
		t = t.replace(UD, h.toString());
	}
	return t;
}
var $D = /\(([^()]*)\)/;
function eO(e) {
	for (var t = e, n; (n = $D.exec(t)) != null;) {
		var r = ND(n, 2)[1];
		t = t.replace($D, QD(r));
	}
	return t;
}
function tO(e) {
	var t = e.replace(/\s+/g, "");
	return t = eO(t), t = QD(t), t;
}
function nO(e) {
	try {
		return tO(e);
	} catch {
		return YD;
	}
}
function rO(e) {
	var t = nO(e.slice(5, -1));
	return t === YD ? "" : t;
}
// node_modules/recharts/es6/component/Text.js
var iO = [
	"x",
	"y",
	"lineHeight",
	"capHeight",
	"fill",
	"scaleToFit",
	"textAnchor",
	"verticalAnchor"
], aO = [
	"dx",
	"dy",
	"angle",
	"className",
	"breakAll"
];
function oO() {
	return oO = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, oO.apply(null, arguments);
}
function sO(e, t) {
	if (e == null) return {};
	var n, r, i = cO(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function cO(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function lO(e, t) {
	return mO(e) || pO(e, t) || dO(e, t) || uO();
}
function uO() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function dO(e, t) {
	if (e) {
		if (typeof e == "string") return fO(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? fO(e, t) : void 0;
	}
}
function fO(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function pO(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function mO(e) {
	if (Array.isArray(e)) return e;
}
var hO = /[ \f\n\r\t\v\u2028\u2029]+/, gO = (e) => {
	var t = e.children, n = e.breakAll, r = e.style;
	try {
		var i = [];
		return L(t) || (i = n ? t.toString().split("") : t.toString().split(hO)), {
			wordsWithComputedWidth: i.map((e) => ({
				word: e,
				width: jD(e, r).width
			})),
			spaceWidth: n ? 0 : jD("\xA0", r).width
		};
	} catch {
		return null;
	}
};
function _O(e) {
	return e === "start" || e === "middle" || e === "end" || e === "inherit";
}
function vO(e) {
	return L(e) || typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
var yO = (e, t, n, r) => e.reduce((e, i) => {
	var a = i.word, o = i.width, s = e[e.length - 1];
	if (s && o != null && (t == null || r || s.width + o + n < Number(t))) s.words.push(a), s.width += o + n;
	else {
		var c = {
			words: [a],
			width: o
		};
		e.push(c);
	}
	return e;
}, []), bO = (e) => e.reduce((e, t) => e.width > t.width ? e : t), xO = "…", SO = (e, t, n, r, i, a, o, s) => {
	var c = gO({
		breakAll: n,
		style: r,
		children: e.slice(0, t) + xO
	});
	if (!c) return [!1, []];
	var l = yO(c.wordsWithComputedWidth, a, o, s);
	return [l.length > i || bO(l).width > Number(a), l];
}, CO = (e, t, n, r, i) => {
	var a = e.maxLines, o = e.children, s = e.style, c = e.breakAll, l = F(a), u = String(o), d = yO(t, r, n, i);
	if (!l || i || !(d.length > a || bO(d).width > Number(r))) return d;
	for (var f = 0, p = u.length - 1, m = 0, h; f <= p && m <= u.length - 1;) {
		var g = Math.floor((f + p) / 2), _ = lO(SO(u, g - 1, c, s, a, r, n, i), 2), v = _[0], y = _[1], b = lO(SO(u, g, c, s, a, r, n, i), 1)[0];
		if (!v && !b && (f = g + 1), v && b && (p = g - 1), !v && b) {
			h = y;
			break;
		}
		m++;
	}
	return h || d;
}, wO = (e) => [{
	words: L(e) ? [] : e.toString().split(hO),
	width: void 0
}], TO = (e) => {
	var t = e.width, n = e.scaleToFit, r = e.children, i = e.style, a = e.breakAll, o = e.maxLines;
	if ((t || n) && !ef.isSsr) {
		var s, c, l = gO({
			breakAll: a,
			children: r,
			style: i
		});
		if (l) {
			var u = l.wordsWithComputedWidth, d = l.spaceWidth;
			s = u, c = d;
		} else return wO(r);
		return CO({
			breakAll: a,
			children: r,
			maxLines: o,
			style: i
		}, s, c, t, !!n);
	}
	return wO(r);
}, EO = "#808080", DO = {
	angle: 0,
	breakAll: !1,
	capHeight: "0.71em",
	fill: EO,
	lineHeight: "1em",
	scaleToFit: !1,
	textAnchor: "start",
	verticalAnchor: "end",
	x: 0,
	y: 0
}, OO = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = Ar(e, DO), r = n.x, i = n.y, a = n.lineHeight, o = n.capHeight, s = n.fill, c = n.scaleToFit, u = n.textAnchor, d = n.verticalAnchor, f = sO(n, iO), p = (0, P.useMemo)(() => TO({
		breakAll: f.breakAll,
		children: f.children,
		maxLines: f.maxLines,
		scaleToFit: c,
		style: f.style,
		width: f.width
	}), [
		f.breakAll,
		f.children,
		f.maxLines,
		c,
		f.style,
		f.width
	]), m = f.dx, h = f.dy, g = f.angle, _ = f.className, v = f.breakAll, y = sO(f, aO);
	if (!_t(r) || !_t(i) || p.length === 0) return null;
	var b = Number(r) + (F(m) ? m : 0), x = Number(i) + (F(h) ? h : 0);
	if (!W(b) || !W(x)) return null;
	var S;
	switch (d) {
		case "start":
			S = rO(`calc(${o})`);
			break;
		case "middle":
			S = rO(`calc(${(p.length - 1) / 2} * -${a} + (${o} / 2))`);
			break;
		default: S = rO(`calc(${p.length - 1} * -${a})`);
	}
	var C = [], w = p[0];
	if (c && w != null) {
		var T = w.width, E = f.width;
		C.push(`scale(${F(E) && F(T) ? E / T : 1})`);
	}
	return g && C.push(`rotate(${g}, ${b}, ${x})`), C.length && (y.transform = C.join(" ")), /*#__PURE__*/ P.createElement("text", oO({}, He(y), {
		ref: t,
		x: b,
		y: x,
		className: l("recharts-text", _),
		textAnchor: u,
		fill: s.includes("url") ? EO : s
	}), p.map((e, t) => {
		var n = e.words.join(v ? "" : " ");
		return /*#__PURE__*/ P.createElement("tspan", {
			x: b,
			dy: t === 0 ? S : a,
			key: `${n}-${t}`
		}, n);
	}));
});
OO.displayName = "Text";
// node_modules/recharts/es6/component/Label.js
var kO = ["labelRef"], AO = ["content"];
function jO(e, t) {
	if (e == null) return {};
	var n, r, i = MO(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function MO(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function NO(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function PO(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? NO(Object(n), !0).forEach(function(t) {
			FO(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : NO(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function FO(e, t, n) {
	return (t = IO(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function IO(e) {
	var t = LO(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function LO(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function RO() {
	return RO = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, RO.apply(null, arguments);
}
var zO = /*#__PURE__*/ (0, P.createContext)(null), BO = (e) => {
	var t = e.x, n = e.y, r = e.upperWidth, i = e.lowerWidth, a = e.width, o = e.height, s = e.children, c = (0, P.useMemo)(() => ({
		x: t,
		y: n,
		upperWidth: r,
		lowerWidth: i,
		width: a,
		height: o
	}), [
		t,
		n,
		r,
		i,
		a,
		o
	]);
	return /*#__PURE__*/ P.createElement(zO.Provider, { value: c }, s);
}, VO = () => {
	var e = (0, P.useContext)(zO), t = vu();
	return e || (t ? Et(t) : void 0);
}, HO = /*#__PURE__*/ (0, P.createContext)(null), UO = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.startAngle, o = e.endAngle, s = e.clockWise, c = e.children, l = (0, P.useMemo)(() => ({
		cx: t,
		cy: n,
		innerRadius: r,
		outerRadius: i,
		startAngle: a,
		endAngle: o,
		clockWise: s
	}), [
		t,
		n,
		r,
		i,
		a,
		o,
		s
	]);
	return /*#__PURE__*/ P.createElement(HO.Provider, { value: l }, c);
}, WO = () => {
	var e = (0, P.useContext)(HO), t = B(eg);
	return e || t;
}, GO = (e) => {
	var t = e.value, n = e.formatter, r = L(e.children) ? t : e.children;
	return typeof n == "function" ? n(r) : r;
}, KO = (e) => e != null && typeof e == "function", qO = (e, t) => mt(t - e) * Math.min(Math.abs(t - e), 360), JO = (e, t, n, r, i) => {
	var a = e.offset, o = e.className, s = i.cx, c = i.cy, u = i.innerRadius, d = i.outerRadius, f = i.startAngle, p = i.endAngle, m = i.clockWise, h = (u + d) / 2, g = qO(f, p), _ = g >= 0 ? 1 : -1, v, y;
	switch (t) {
		case "insideStart":
			v = f + _ * a, y = m;
			break;
		case "insideEnd":
			v = p - _ * a, y = !m;
			break;
		case "end":
			v = p + _ * a, y = m;
			break;
		default: throw Error(`Unsupported position ${t}`);
	}
	y = g <= 0 ? y : !y;
	var b = _m(s, c, h, v), x = _m(s, c, h, v + (y ? 1 : -1) * 359), S = `M${b.x},${b.y}
    A${h},${h},0,1,${+!y},
    ${x.x},${x.y}`, C = L(e.id) ? yt("recharts-radial-line-") : e.id;
	return /*#__PURE__*/ P.createElement("text", RO({}, r, {
		dominantBaseline: "central",
		className: l("recharts-radial-bar-label", o)
	}), /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement("path", {
		id: C,
		d: S
	})), /*#__PURE__*/ P.createElement("textPath", { xlinkHref: `#${C}` }, n));
}, YO = (e, t, n) => {
	var r = e.cx, i = e.cy, a = e.innerRadius, o = e.outerRadius, s = (e.startAngle + e.endAngle) / 2;
	if (n === "outside") {
		var c = _m(r, i, o + t, s), l = c.x;
		return {
			x: l,
			y: c.y,
			textAnchor: l >= r ? "start" : "end",
			verticalAnchor: "middle"
		};
	}
	if (n === "center") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
	if (n === "centerTop") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "start"
	};
	if (n === "centerBottom") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "end"
	};
	var u = _m(r, i, (a + o) / 2, s);
	return {
		x: u.x,
		y: u.y,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
}, XO = (e) => e != null && "cx" in e && F(e.cx), ZO = {
	angle: 0,
	offset: 5,
	zIndex: J.label,
	position: "middle",
	textBreakAll: !1
};
function QO(e) {
	if (!XO(e)) return e;
	var t = e.cx, n = e.cy, r = e.outerRadius, i = r * 2;
	return {
		x: t - r,
		y: n - r,
		width: i,
		upperWidth: i,
		lowerWidth: i,
		height: i
	};
}
function $O(e) {
	var t = Ar(e, ZO), n = t.viewBox, r = t.parentViewBox, i = t.position, a = t.value, o = t.children, s = t.content, c = t.className, u = c === void 0 ? "" : c, d = t.textBreakAll, f = t.labelRef, p = WO(), m = VO(), h = n == null ? i === "center" ? m : p ?? m : XO(n) ? n : Et(n), g, _, v = QO(h);
	if (!h || L(a) && L(o) && !/*#__PURE__*/ (0, P.isValidElement)(s) && typeof s != "function") return null;
	var y = XO(h) && (i === "insideStart" || i === "insideEnd" || i === "end");
	if (XO(h)) y || (_ = YO(h, t.offset, t.position));
	else if (v) {
		var b = Mt({
			viewBox: v,
			position: i,
			offset: t.offset,
			parentViewBox: XO(r) ? void 0 : r,
			clamp: !0
		});
		_ = PO(PO({
			x: b.x,
			y: b.y,
			textAnchor: b.horizontalAnchor,
			verticalAnchor: b.verticalAnchor
		}, b.width === void 0 ? {} : { width: b.width }), b.height === void 0 ? {} : { height: b.height });
	}
	var x = PO(PO(PO(PO({}, _?.x === void 0 ? {} : { x: _.x }), _?.y === void 0 ? {} : { y: _.y }), t), {}, { viewBox: h });
	if (/*#__PURE__*/ (0, P.isValidElement)(s)) {
		x.labelRef;
		var S = jO(x, kO);
		return /*#__PURE__*/ (0, P.cloneElement)(s, S);
	}
	if (typeof s == "function") {
		x.content;
		var C = jO(x, AO);
		if (g = /*#__PURE__*/ (0, P.createElement)(s, C), /*#__PURE__*/ (0, P.isValidElement)(g)) return g;
	} else g = GO(t);
	var w = He(t);
	return y && XO(h) ? JO(t, i, g, w, h) : _ == null ? null : /*#__PURE__*/ P.createElement(hE, { zIndex: t.zIndex }, /*#__PURE__*/ P.createElement(OO, RO({
		ref: f,
		className: l("recharts-label", u)
	}, w, _, {
		textAnchor: _O(w.textAnchor) ? w.textAnchor : _.textAnchor,
		breakAll: d
	}), g));
}
$O.displayName = "Label";
var ek = (e, t, n) => {
	if (!e) return null;
	var r = {
		viewBox: t,
		labelRef: n
	};
	return e === !0 ? /*#__PURE__*/ P.createElement($O, RO({ key: "label-implicit" }, r)) : _t(e) ? /*#__PURE__*/ P.createElement($O, RO({
		key: "label-implicit",
		value: e
	}, r)) : /*#__PURE__*/ (0, P.isValidElement)(e) ? e.type === $O ? /*#__PURE__*/ (0, P.cloneElement)(e, PO({ key: "label-implicit" }, r)) : /*#__PURE__*/ P.createElement($O, RO({
		key: "label-implicit",
		content: e
	}, r)) : KO(e) ? /*#__PURE__*/ P.createElement($O, RO({
		key: "label-implicit",
		content: e
	}, r)) : e && typeof e == "object" ? /*#__PURE__*/ P.createElement($O, RO({}, e, { key: "label-implicit" }, r)) : null;
};
function tk(e) {
	var t = e.label, n = e.labelRef;
	return ek(t, VO(), n) || null;
}
function nk(e) {
	var t = e.label;
	return ek(t, WO()) || null;
}
// node_modules/recharts/es6/component/LabelList.js
var rk = ["valueAccessor"], ik = [
	"dataKey",
	"clockWise",
	"id",
	"textBreakAll",
	"zIndex"
];
function ak() {
	return ak = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ak.apply(null, arguments);
}
function ok(e, t) {
	if (e == null) return {};
	var n, r, i = sk(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function sk(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var ck = (e) => {
	var t = Array.isArray(e.value) ? e.value[e.value.length - 1] : e.value;
	if (vO(t)) return t;
}, lk = /*#__PURE__*/ (0, P.createContext)(void 0), uk = lk.Provider, dk = /*#__PURE__*/ (0, P.createContext)(void 0), fk = dk.Provider;
function pk() {
	return (0, P.useContext)(lk);
}
function mk() {
	return (0, P.useContext)(dk);
}
function hk(e) {
	var t = e.valueAccessor, n = t === void 0 ? ck : t, r = ok(e, rk), i = r.dataKey;
	r.clockWise;
	var a = r.id, o = r.textBreakAll, s = r.zIndex, c = ok(r, ik), l = pk(), u = mk(), d = l || u;
	return !d || !d.length ? null : /*#__PURE__*/ P.createElement(hE, { zIndex: s ?? J.label }, /*#__PURE__*/ P.createElement(et, { className: "recharts-label-list" }, d.map((e, t) => {
		var s = L(i) ? n(e, t) : G(e.payload, i), l = L(a) ? {} : { id: `${a}-${t}` };
		return /*#__PURE__*/ P.createElement($O, ak({ key: `label-${t}` }, He(e), c, l, {
			fill: r.fill ?? e.fill,
			parentViewBox: e.parentViewBox,
			value: s,
			textBreakAll: o,
			viewBox: e.viewBox,
			index: t,
			zIndex: 0
		}));
	})));
}
hk.displayName = "LabelList";
function gk(e) {
	var t = e.label;
	return t ? t === !0 ? /*#__PURE__*/ P.createElement(hk, { key: "labelList-implicit" }) : /*#__PURE__*/ P.isValidElement(t) || KO(t) ? /*#__PURE__*/ P.createElement(hk, {
		key: "labelList-implicit",
		content: t
	}) : typeof t == "object" ? /*#__PURE__*/ P.createElement(hk, ak({ key: "labelList-implicit" }, t, { type: String(t.type) })) : null : null;
}
// node_modules/recharts/es6/shape/Dot.js
function _k() {
	return _k = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, _k.apply(null, arguments);
}
var vk = (e) => {
	var t = e.cx, n = e.cy, r = e.r, i = e.className, a = l("recharts-dot", i);
	return F(t) && F(n) && F(r) ? /*#__PURE__*/ P.createElement("circle", _k({}, Be(e), Sr(e), {
		className: a,
		cx: t,
		cy: n,
		r
	})) : null;
}, yk = (e) => e.graphicalItems.polarItems, bk = V([
	yk,
	Z,
	V([Y, tg], Jx)
], Zx), xk = V([V([bk], nS), Gm], aS), Sk = V([
	xk,
	Z,
	bk
], sS);
V([
	xk,
	Z,
	bk
], (e, t, n) => n.length > 0 ? e.flatMap((e) => n.flatMap((n) => ({
	value: G(e, t.dataKey ?? n.dataKey),
	errorDomain: []
}))).filter(Boolean) : t?.dataKey == null ? e.map((e) => ({
	value: e,
	errorDomain: []
})) : e.map((e) => ({
	value: G(e, t.dataKey),
	errorDomain: []
})));
var Ck = () => void 0, wk = V([
	Z,
	K,
	xk,
	Sk,
	Eh,
	Y,
	V([
		Z,
		TS,
		ES,
		Ck,
		V([
			xk,
			Z,
			bk,
			OS,
			Y,
			Ym
		], jS),
		Ck,
		K,
		Y
	], XS)
], $S), Tk = V([
	wk,
	Kx,
	tC
], nC), Ek = V([tC, V([
	Z,
	wk,
	Tk,
	Y
], iC)], dg), Dk = Gs({
	name: "polarAxis",
	initialState: {
		radiusAxis: {},
		angleAxis: {}
	},
	reducers: {
		addRadiusAxis(e, t) {
			e.radiusAxis[t.payload.id] = H(t.payload);
		},
		removeRadiusAxis(e, t) {
			delete e.radiusAxis[t.payload.id];
		},
		addAngleAxis(e, t) {
			e.angleAxis[t.payload.id] = H(t.payload);
		},
		removeAngleAxis(e, t) {
			delete e.angleAxis[t.payload.id];
		}
	}
}), Ok = Dk.actions, kk = Ok.addRadiusAxis, Ak = Ok.removeRadiusAxis, jk = Ok.addAngleAxis, Mk = Ok.removeAngleAxis, Nk = Dk.reducer;
// node_modules/recharts/es6/util/getClassNameFromUnknown.js
function Pk(e) {
	return e && typeof e == "object" && "className" in e && typeof e.className == "string" ? e.className : "";
}
// node_modules/react-is/cjs/react-is.production.js
var Fk = /* @__PURE__ */ n(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.view_transition");
	function m(e) {
		if (typeof e == "object" && e) {
			var m = e.$$typeof;
			switch (m) {
				case t: switch (e = e.type, e) {
					case r:
					case a:
					case i:
					case l:
					case u:
					case p: return e;
					default: switch (e &&= e.$$typeof, e) {
						case s:
						case c:
						case f:
						case d: return e;
						case o: return e;
						default: return m;
					}
				}
				case n: return m;
			}
		}
	}
	e.isFragment = function(e) {
		return m(e) === r;
	};
})), Ik = (/* @__PURE__ */ n(((e, t) => {
	t.exports = Fk();
})))(), Lk = (e) => typeof e == "string" ? e : e ? e.displayName || e.name || "Component" : "", Rk = null, zk = null, Bk = (e) => {
	if (e === Rk && Array.isArray(zk)) return zk;
	var t = [];
	return P.Children.forEach(e, (e) => {
		L(e) || ((0, Ik.isFragment)(e) ? t = t.concat(Bk(e.props.children)) : t.push(e));
	}), zk = t, Rk = e, t;
};
function Vk(e, t) {
	var n = [], r = [];
	return r = Array.isArray(t) ? t.map((e) => Lk(e)) : [Lk(t)], Bk(e).forEach((e) => {
		var t = lt(e, "type.displayName") || lt(e, "type.name");
		t && r.indexOf(t) !== -1 && n.push(e);
	}), n;
}
var Hk = (e) => e && typeof e == "object" && "clipDot" in e ? !!e.clipDot : !0;
// node_modules/recharts/es6/util/ActiveShapeUtils.js
function Uk(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Wk(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Uk(Object(n), !0).forEach(function(t) {
			Gk(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Uk(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Gk(e, t, n) {
	return (t = Kk(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Kk(e) {
	var t = qk(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function qk(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Jk(e, t) {
	return Wk(Wk({}, t), e);
}
function Yk(e) {
	return /*#__PURE__*/ (0, P.isValidElement)(e) ? e.props : e;
}
function Xk(e, t) {
	return /*#__PURE__*/ (0, P.cloneElement)(e, Jk(Yk(e), t));
}
function Zk(e) {
	if ("index" in e) {
		var t = e.index;
		return typeof t == "number" || typeof t == "string" ? t : void 0;
	}
}
function Qk(e) {
	return "isActive" in e && e.isActive === !0;
}
function $k(e) {
	var t = e.option, n = e.DefaultShape, r = e.shapeProps, i = e.activeClassName, a = i === void 0 ? "recharts-active-shape" : i, o = e.inActiveClassName, s = o === void 0 ? "recharts-shape" : o, c = Zk(r), l = /*#__PURE__*/ (0, P.isValidElement)(t) ? Xk(t, r) : t === n ? /*#__PURE__*/ P.createElement(n, r) : typeof t == "function" ? t(r, c) : typeof t == "object" ? /*#__PURE__*/ P.createElement(n, Jk(t, r)) : /*#__PURE__*/ P.createElement(n, r);
	return Qk(r) ? /*#__PURE__*/ P.createElement(et, { className: a }, l) : /*#__PURE__*/ P.createElement(et, { className: s }, l);
}
// node_modules/recharts/es6/context/tooltipContext.js
var eA = (e, t, n) => {
	var r = z();
	return (i, a) => (o) => {
		e?.(i, a, o), r(iw({
			activeIndex: String(a),
			activeDataKey: t,
			activeCoordinate: i.tooltipPosition,
			activeGraphicalItemId: n
		}));
	};
}, tA = (e) => {
	var t = z();
	return (n, r) => (i) => {
		e?.(n, r, i), t(aw());
	};
}, nA = (e, t, n) => {
	var r = z();
	return (i, a) => (o) => {
		e?.(i, a, o), r(sw({
			activeIndex: String(a),
			activeDataKey: t,
			activeCoordinate: i.tooltipPosition,
			activeGraphicalItemId: n
		}));
	};
};
// node_modules/recharts/es6/state/SetTooltipEntrySettings.js
function rA(e) {
	var t = e.tooltipEntrySettings, n = z(), r = Il(), i = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		r || (i.current === null ? n(ew(t)) : i.current !== t && n(tw({
			prev: i.current,
			next: t
		})), i.current = t);
	}, [
		t,
		n,
		r
	]), (0, P.useLayoutEffect)(() => () => {
		i.current &&= (n(nw(i.current)), null);
	}, [n]), null;
}
// node_modules/recharts/es6/state/SetLegendPayload.js
function iA(e) {
	var t = e.legendPayload, n = z(), r = Il(), i = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		r || (i.current === null ? n(Pu(t)) : i.current !== t && n(Fu({
			prev: i.current,
			next: t
		})), i.current = t);
	}, [
		n,
		r,
		t
	]), (0, P.useLayoutEffect)(() => () => {
		i.current &&= (n(Iu(i.current)), null);
	}, [n]), null;
}
function aA(e) {
	var t = e.legendPayload, n = z(), r = B(K), i = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		(r === "centric" || r === "radial") && (i.current === null ? n(Pu(t)) : i.current !== t && n(Fu({
			prev: i.current,
			next: t
		})), i.current = t);
	}, [
		n,
		r,
		t
	]), (0, P.useLayoutEffect)(() => () => {
		i.current &&= (n(Iu(i.current)), null);
	}, [n]), null;
}
// node_modules/recharts/es6/animation/matchBy.js
function oA(e, t) {
	return dA(e) || uA(e, t) || cA(e, t) || sA();
}
function sA() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function cA(e, t) {
	if (e) {
		if (typeof e == "string") return lA(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? lA(e, t) : void 0;
	}
}
function lA(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function uA(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function dA(e) {
	if (Array.isArray(e)) return e;
}
var fA = "index", pA = "append";
function mA(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], r = [];
	for (var i of n) r.push({
		status: "removed",
		prev: i
	});
	for (var a = 0; a < t.length; a++) {
		var o = e[a], s = t[a];
		o == null ? r.push({
			status: "added",
			next: s
		}) : r.push({
			status: "matched",
			prev: o,
			next: s
		});
	}
	return r;
}
function hA(e, t) {
	var n = e.length / t.length;
	return mA(t.map((t, r) => e[Math.floor(r * n)]), t);
}
function gA(e, t) {
	return mA(t.map((t, n) => e[n]), t);
}
function _A(e, t) {
	for (var n = /* @__PURE__ */ new Map(), r = 0; r < e.length; r++) {
		var i = e[r];
		if (i != null) {
			var a = t(i, r);
			a != null && !n.has(a) && n.set(a, i);
		}
	}
	return n;
}
function vA(e, t, n) {
	var r = _A(e, n), i = /* @__PURE__ */ new Set(), a = t.map((e, t) => {
		var a = n(e, t);
		if (a != null) {
			var o = r.get(a);
			if (o !== void 0) return i.add(a), o;
		}
	}), o = [];
	for (var s of r) {
		var c = oA(s, 2), l = c[0], u = c[1];
		i.has(l) || o.push(u);
	}
	return mA(a, t, o);
}
function yA(e, t, n) {
	return t == null ? null : e == null ? t.map((e) => ({
		status: "added",
		next: e
	})) : n === "index" ? hA(e, t) : n === "append" ? gA(e, t) : vA(e, t, n);
}
// node_modules/recharts/es6/animation/useAnimationStartSnapshot.js
function bA(e, t) {
	var n = (0, P.useRef)(e), r = (0, P.useRef)(t.current), i = (0, P.useRef)(!0);
	n.current !== e && (n.current = e, r.current = t.current, i.current = !1);
	var a = (0, P.useCallback)(function(e, n) {
		var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
		n === 0 ? i.current = !0 : (n === 1 && (r.current = e), n > 0 && i.current && a && (t.current = e));
	}, [t]);
	return {
		startValue: r.current,
		syncStepValue: a
	};
}
// node_modules/recharts/es6/animation/AnimatedItems.js
function xA(e, t) {
	return EA(e) || TA(e, t) || CA(e, t) || SA();
}
function SA() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function CA(e, t) {
	if (e) {
		if (typeof e == "string") return wA(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? wA(e, t) : void 0;
	}
}
function wA(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function TA(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function EA(e) {
	if (Array.isArray(e)) return e;
}
function DA(e, t) {
	var n = xA((0, P.useState)(!1), 2), r = n[0], i = n[1];
	return {
		isAnimating: r,
		handleAnimationStart: (0, P.useCallback)(() => {
			typeof e == "function" && e(), i(!0);
		}, [e]),
		handleAnimationEnd: (0, P.useCallback)(() => {
			typeof t == "function" && t(), i(!1);
		}, [t])
	};
}
function OA(e) {
	var t = e.animationInput, n = e.animationIdPrefix, r = e.items, i = e.previousItemsRef, a = e.isAnimationActive, o = e.animationBegin, s = e.animationDuration, c = e.animationEasing, l = e.onAnimationStart, u = e.onAnimationEnd, d = e.animationInterpolateFn, f = e.animationMatchBy, p = e.shouldUpdatePreviousRef, m = e.children, h = e.layout, g = Ap(t, n), _ = bA(g, i), v = _.startValue ?? null, y = yA(v, r, f ?? fA);
	return /*#__PURE__*/ P.createElement(kp, {
		animationId: g,
		begin: o,
		duration: s,
		isActive: a,
		easing: c,
		onAnimationEnd: u,
		onAnimationStart: l,
		key: g
	}, (e) => {
		var t = v == null, n = r == null ? r : d(y, e, h), i = p ? p(e) : e > 0;
		return _.syncStepValue(n, e, i), n == null ? null : m(n, e, t);
	});
}
function kA(e, t) {
	return PA(e) || NA(e, t) || jA(e, t) || AA();
}
function AA() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function jA(e, t) {
	if (e) {
		if (typeof e == "string") return MA(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? MA(e, t) : void 0;
	}
}
function MA(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function NA(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function PA(e) {
	if (Array.isArray(e)) return e;
}
var FA = P.useId ?? (() => kA(P.useState(() => yt("uid-")), 1)[0]);
// node_modules/recharts/es6/util/useUniqueId.js
function IA(e, t) {
	var n = FA();
	return t || (e ? `${e}-${n}` : n);
}
// node_modules/recharts/es6/context/RegisterGraphicalItemId.js
var LA = /*#__PURE__*/ (0, P.createContext)(void 0), RA = (e) => {
	var t = e.id, n = e.type, r = e.children, i = IA(`recharts-${n}`, t);
	return /*#__PURE__*/ P.createElement(LA.Provider, { value: i }, r(i));
}, zA = Gs({
	name: "graphicalItems",
	initialState: {
		cartesianItems: [],
		polarItems: []
	},
	reducers: {
		addCartesianGraphicalItem: {
			reducer(e, t) {
				e.cartesianItems.push(H(t.payload));
			},
			prepare: U()
		},
		replaceCartesianGraphicalItem: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = _s(e).cartesianItems.indexOf(H(r));
				a > -1 && (e.cartesianItems[a] = H(i));
			},
			prepare: U()
		},
		removeCartesianGraphicalItem: {
			reducer(e, t) {
				var n = _s(e).cartesianItems.indexOf(H(t.payload));
				n > -1 && e.cartesianItems.splice(n, 1);
			},
			prepare: U()
		},
		addPolarGraphicalItem: {
			reducer(e, t) {
				e.polarItems.push(H(t.payload));
			},
			prepare: U()
		},
		removePolarGraphicalItem: {
			reducer(e, t) {
				var n = _s(e).polarItems.indexOf(H(t.payload));
				n > -1 && e.polarItems.splice(n, 1);
			},
			prepare: U()
		},
		replacePolarGraphicalItem: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = _s(e).polarItems.indexOf(H(r));
				a > -1 && (e.polarItems[a] = H(i));
			},
			prepare: U()
		}
	}
}), BA = zA.actions, VA = BA.addCartesianGraphicalItem, HA = BA.replaceCartesianGraphicalItem, UA = BA.removeCartesianGraphicalItem, WA = BA.addPolarGraphicalItem, GA = BA.removePolarGraphicalItem, KA = BA.replacePolarGraphicalItem, qA = zA.reducer, JA = /*#__PURE__*/ (0, P.memo)((e) => {
	var t = z(), n = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		n.current === null ? t(VA(e)) : n.current !== e && t(HA({
			prev: n.current,
			next: e
		})), n.current = e;
	}, [t, e]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(UA(n.current)), null);
	}, [t]), null;
}), YA = /*#__PURE__*/ (0, P.memo)((e) => {
	var t = z(), n = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		n.current === null ? t(WA(e)) : n.current !== e && t(KA({
			prev: n.current,
			next: e
		})), n.current = e;
	}, [t, e]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(GA(n.current)), null);
	}, [t]), null;
}), XA = ["points"];
function ZA(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function QA(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ZA(Object(n), !0).forEach(function(t) {
			$A(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ZA(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function $A(e, t, n) {
	return (t = ej(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ej(e) {
	var t = tj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function tj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function nj() {
	return nj = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, nj.apply(null, arguments);
}
function rj(e, t) {
	if (e == null) return {};
	var n, r, i = ij(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ij(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function aj(e) {
	var t = e.option, n = e.dotProps, r = e.className;
	if (/*#__PURE__*/ (0, P.isValidElement)(t)) return /*#__PURE__*/ (0, P.cloneElement)(t, n);
	if (typeof t == "function") return t(n);
	var i = l(r, typeof t == "boolean" ? "" : t.className), a = n ?? {};
	a.points;
	var o = rj(a, XA);
	return /*#__PURE__*/ P.createElement(vk, nj({}, o, { className: i }));
}
function oj(e, t) {
	return e == null ? !1 : t ? !0 : e.length === 1;
}
function sj(e) {
	var t = e.points, n = e.dot, r = e.className, i = e.dotClassName, a = e.dataKey, o = e.baseProps, s = e.needClip, c = e.clipPathId, l = e.zIndex, u = l === void 0 ? J.scatter : l;
	if (!oj(t, n)) return null;
	var d = Hk(n), f = Ue(n), p = t.map((e, r) => {
		var s = QA(QA(QA({ r: 3 }, o), f), {}, {
			index: r,
			cx: e.x ?? void 0,
			cy: e.y ?? void 0,
			dataKey: a,
			value: e.value,
			payload: e.payload,
			points: t
		});
		return /*#__PURE__*/ P.createElement(aj, {
			key: `dot-${r}`,
			option: n,
			dotProps: s,
			className: i
		});
	}), m = {};
	return s && c != null && (m.clipPath = `url(#clipPath-${d ? "" : "dots-"}${c})`), /*#__PURE__*/ P.createElement(hE, { zIndex: u }, /*#__PURE__*/ P.createElement(et, nj({ className: r }, m), p));
}
// node_modules/recharts/es6/state/cartesianAxisSlice.js
function cj(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function lj(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? cj(Object(n), !0).forEach(function(t) {
			uj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cj(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function uj(e, t, n) {
	return (t = dj(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function dj(e) {
	var t = fj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function fj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var pj = Gs({
	name: "cartesianAxis",
	initialState: {
		xAxis: {},
		yAxis: {},
		zAxis: {}
	},
	reducers: {
		addXAxis: {
			reducer(e, t) {
				e.xAxis[t.payload.id] = H(t.payload);
			},
			prepare: U()
		},
		replaceXAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.xAxis[r.id] !== void 0 && (r.id !== i.id && delete e.xAxis[r.id], e.xAxis[i.id] = H(i));
			},
			prepare: U()
		},
		removeXAxis: {
			reducer(e, t) {
				delete e.xAxis[t.payload.id];
			},
			prepare: U()
		},
		addYAxis: {
			reducer(e, t) {
				e.yAxis[t.payload.id] = H(t.payload);
			},
			prepare: U()
		},
		replaceYAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.yAxis[r.id] !== void 0 && (r.id !== i.id && delete e.yAxis[r.id], e.yAxis[i.id] = H(i));
			},
			prepare: U()
		},
		removeYAxis: {
			reducer(e, t) {
				delete e.yAxis[t.payload.id];
			},
			prepare: U()
		},
		addZAxis: {
			reducer(e, t) {
				e.zAxis[t.payload.id] = H(t.payload);
			},
			prepare: U()
		},
		replaceZAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.zAxis[r.id] !== void 0 && (r.id !== i.id && delete e.zAxis[r.id], e.zAxis[i.id] = H(i));
			},
			prepare: U()
		},
		removeZAxis: {
			reducer(e, t) {
				delete e.zAxis[t.payload.id];
			},
			prepare: U()
		},
		updateYAxisWidth(e, t) {
			var n = t.payload, r = n.id, i = n.width, a = e.yAxis[r];
			if (a) {
				var o = a.widthHistory || [];
				if (o.length === 3 && o[0] === o[2] && i === o[1] && i !== a.width && Math.abs(i - (o[0] ?? 0)) <= 1) return;
				var s = [...o, i].slice(-3);
				e.yAxis[r] = lj(lj({}, a), {}, {
					width: i,
					widthHistory: s
				});
			}
		},
		updateXAxisHeight(e, t) {
			var n = t.payload, r = n.id, i = n.height, a = e.xAxis[r];
			if (a) {
				var o = a.heightHistory || [];
				if (o.length === 3 && o[0] === o[2] && i === o[1] && i !== a.height && Math.abs(i - (o[0] ?? 0)) <= 1) return;
				var s = [...o, i].slice(-3);
				e.xAxis[r] = lj(lj({}, a), {}, {
					height: i,
					heightHistory: s
				});
			}
		}
	}
}), mj = pj.actions, hj = mj.addXAxis, gj = mj.replaceXAxis, _j = mj.removeXAxis, vj = mj.addYAxis, yj = mj.replaceYAxis, bj = mj.removeYAxis;
mj.addZAxis, mj.replaceZAxis, mj.removeZAxis;
var xj = mj.updateYAxisWidth, Sj = mj.updateXAxisHeight, Cj = pj.reducer, wj = V([
	V([Ml], (e) => ({
		top: e.top,
		bottom: e.bottom,
		left: e.left,
		right: e.right
	})),
	ml,
	hl
], (e, t, n) => {
	if (e && t != null && n != null) return {
		x: e.left,
		y: e.top,
		width: Math.max(0, t - e.left - e.right),
		height: Math.max(0, n - e.top - e.bottom)
	};
}), Tj = () => B(wj), Ej = () => B(vT);
// node_modules/recharts/es6/component/ActivePoints.js
function Dj(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Oj(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Dj(Object(n), !0).forEach(function(t) {
			kj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Dj(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function kj(e, t, n) {
	return (t = Aj(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Aj(e) {
	var t = jj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function jj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Mj = (e) => {
	var t = e.point, n = e.childIndex, r = e.mainColor, i = e.activeDot, a = e.dataKey, o = e.clipPath;
	if (i === !1 || t.x == null || t.y == null) return null;
	var s = Oj(Oj(Oj({}, {
		index: n,
		dataKey: a,
		cx: t.x,
		cy: t.y,
		r: 4,
		fill: r ?? "none",
		strokeWidth: 2,
		stroke: "#fff",
		payload: t.payload,
		value: t.value
	}), Ve(i)), Sr(i)), c = /*#__PURE__*/ (0, P.isValidElement)(i) ? /*#__PURE__*/ (0, P.cloneElement)(i, s) : typeof i == "function" ? i(s) : /*#__PURE__*/ P.createElement(vk, s);
	return /*#__PURE__*/ P.createElement(et, {
		className: "recharts-active-dot",
		clipPath: o
	}, c);
};
function Nj(e) {
	var t = e.points, n = e.mainColor, r = e.activeDot, i = e.itemDataKey, a = e.clipPath, o = e.zIndex, s = o === void 0 ? J.activeDot : o, c = B(dT), l = Ej();
	if (t == null || l == null) return null;
	var u = t.find((e) => l.includes(e.payload));
	return L(u) ? null : /*#__PURE__*/ P.createElement(hE, { zIndex: s }, /*#__PURE__*/ P.createElement(Mj, {
		point: u,
		childIndex: Number(c),
		mainColor: n,
		dataKey: i,
		activeDot: r,
		clipPath: a
	}));
}
// node_modules/recharts/es6/state/selectors/combiners/combineBarSizeList.js
function Pj(e, t) {
	return zj(e) || Rj(e, t) || Ij(e, t) || Fj();
}
function Fj() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ij(e, t) {
	if (e) {
		if (typeof e == "string") return Lj(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Lj(e, t) : void 0;
	}
}
function Lj(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Rj(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function zj(e) {
	if (Array.isArray(e)) return e;
}
var Bj = (e, t, n) => {
	var r = n ?? e;
	if (!L(r)) return bt(r, t, 0);
}, Vj = (e, t, n) => {
	var r = {}, i = e.filter(ig), a = e.filter((e) => e.stackId == null), o = i.reduce((e, t) => {
		var n = e[t.stackId];
		return n ??= [], n.push(t), e[t.stackId] = n, e;
	}, r), s = Object.entries(o).map((e) => {
		var r = Pj(e, 2), i = r[0], a = r[1];
		return {
			stackId: i,
			dataKeys: a.map((e) => e.dataKey),
			barSize: Bj(t, n, a[0]?.barSize)
		};
	}), c = a.map((e) => ({
		stackId: void 0,
		dataKeys: [e.dataKey].filter((e) => e != null),
		barSize: Bj(t, n, e.barSize)
	}));
	return [...s, ...c];
};
// node_modules/recharts/es6/state/selectors/combiners/combineAllBarPositions.js
function Hj(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Uj(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Hj(Object(n), !0).forEach(function(t) {
			Wj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hj(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Wj(e, t, n) {
	return (t = Gj(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Gj(e) {
	var t = Kj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Kj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function qj(e, t, n, r, i) {
	var a = r.length;
	if (!(a < 1)) {
		var o = bt(e, n, 0, !0), s, c = [];
		if (W(r[0]?.barSize)) {
			var l = !1, u = n / a, d = r.reduce((e, t) => e + (t.barSize || 0), 0);
			d += (a - 1) * o, d >= n && (d -= (a - 1) * o, o = 0), d >= n && u > 0 && (l = !0, u *= .9, d = a * u);
			var f = {
				offset: Math.round((n - d) / 2) - o,
				size: 0
			};
			s = r.reduce((e, t) => {
				var n = {
					stackId: t.stackId,
					dataKeys: t.dataKeys,
					position: {
						offset: f.offset + f.size + o,
						size: l ? u : t.barSize ?? 0
					}
				}, r = [...e, n];
				return f = n.position, r;
			}, c);
		} else {
			var p = bt(t, n, 0, !0);
			n - 2 * p - (a - 1) * o <= 0 && (o = 0);
			var m = (n - 2 * p - (a - 1) * o) / a;
			m > 1 && (m = Math.round(m));
			var h = W(i) ? Math.min(m, i) : m;
			s = r.reduce((e, t, n) => [...e, {
				stackId: t.stackId,
				dataKeys: t.dataKeys,
				position: {
					offset: p + a * (m - h) / 2 + (h + o) * n,
					size: h
				}
			}], c);
		}
		return s;
	}
}
var Jj = (e, t, n, r, i, a, o) => {
	var s = L(o) ? t : o, c = qj(n, r, i === a ? a : i, e, s);
	return i !== a && c != null && (c = c.map((e) => Uj(Uj({}, e), {}, { position: Uj(Uj({}, e.position), {}, { offset: e.position.offset - i / 2 }) }))), c;
}, Yj = (e, t) => {
	var n = ng(t);
	if (e && n != null && t != null) {
		var r = t.stackId;
		if (r != null) {
			var i = e[r];
			if (i) {
				var a = i.stackedData;
				if (a) return a.find((e) => e.key === n);
			}
		}
	}
}, Xj = (e, t) => {
	if (e != null && t != null) {
		var n = e.find((e) => e.stackId === t.stackId && t.dataKey != null && e.dataKeys.includes(t.dataKey));
		if (n != null) return n.position;
	}
};
// node_modules/recharts/es6/zIndex/getZIndexFromUnknown.js
function Zj(e, t) {
	return e && typeof e == "object" && "zIndex" in e && typeof e.zIndex == "number" && W(e.zIndex) ? e.zIndex : t;
}
// node_modules/recharts/es6/context/chartDataContext.js
var Qj = (e) => {
	var t = e.chartData, n = z(), r = Il();
	return (0, P.useEffect)(() => r ? () => {} : (n(RE(t)), () => {
		n(RE(void 0));
	}), [
		t,
		n,
		r
	]), null;
}, $j = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	padding: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
}, eM = Gs({
	name: "brush",
	initialState: $j,
	reducers: { setBrushSettings(e, t) {
		return t.payload == null ? $j : t.payload;
	} }
});
eM.actions.setBrushSettings;
var tM = eM.reducer, nM = (e, t) => {
	var n = e.x, r = e.y, i = t.x, a = t.y;
	return {
		x: Math.min(n, i),
		y: Math.min(r, a),
		width: Math.abs(i - n),
		height: Math.abs(a - r)
	};
}, rM = (e) => {
	var t = e.x1, n = e.y1, r = e.x2, i = e.y2;
	return nM({
		x: t,
		y: n
	}, {
		x: r,
		y: i
	});
};
function iM(e) {
	return (e % 180 + 180) % 180;
}
var aM = function(e) {
	var t = e.width, n = e.height, r = iM(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0) * Math.PI / 180, i = Math.atan(n / t), a = r > i && r < Math.PI - i ? n / Math.sin(r) : t / Math.cos(r);
	return Math.abs(a);
}, oM = Gs({
	name: "referenceElements",
	initialState: {
		dots: [],
		areas: [],
		lines: []
	},
	reducers: {
		addDot: (e, t) => {
			e.dots.push(t.payload);
		},
		removeDot: (e, t) => {
			var n = _s(e).dots.findIndex((e) => e === t.payload);
			n !== -1 && e.dots.splice(n, 1);
		},
		addArea: (e, t) => {
			e.areas.push(t.payload);
		},
		removeArea: (e, t) => {
			var n = _s(e).areas.findIndex((e) => e === t.payload);
			n !== -1 && e.areas.splice(n, 1);
		},
		addLine: (e, t) => {
			e.lines.push(H(t.payload));
		},
		removeLine: (e, t) => {
			var n = _s(e).lines.findIndex((e) => e === t.payload);
			n !== -1 && e.lines.splice(n, 1);
		}
	}
}), sM = oM.actions;
sM.addDot, sM.removeDot, sM.addArea, sM.removeArea;
var cM = sM.addLine, lM = sM.removeLine, uM = oM.reducer;
// node_modules/recharts/es6/container/ClipPathProvider.js
function dM(e, t) {
	return gM(e) || hM(e, t) || pM(e, t) || fM();
}
function fM() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function pM(e, t) {
	if (e) {
		if (typeof e == "string") return mM(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? mM(e, t) : void 0;
	}
}
function mM(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function hM(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function gM(e) {
	if (Array.isArray(e)) return e;
}
var _M = /*#__PURE__*/ (0, P.createContext)(void 0), vM = (e) => {
	var t = e.children, n = dM((0, P.useState)(`${yt("recharts")}-clip`), 1)[0], r = Tj();
	if (r == null) return null;
	var i = r.x, a = r.y, o = r.width, s = r.height;
	return /*#__PURE__*/ P.createElement(_M.Provider, { value: n }, /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement("clipPath", { id: n }, /*#__PURE__*/ P.createElement("rect", {
		x: i,
		y: a,
		height: s,
		width: o
	}))), t);
}, yM = () => (0, P.useContext)(_M), bM = class {
	constructor(e) {
		var t = e.x, n = e.y;
		this.xAxisScale = t, this.yAxisScale = n;
	}
	map(e, t) {
		var n = t.position;
		return {
			x: this.xAxisScale.map(e.x, { position: n }) ?? 0,
			y: this.yAxisScale.map(e.y, { position: n }) ?? 0
		};
	}
	mapWithFallback(e, t) {
		var n = t.position, r = t.fallback, i = r === "rangeMin" ? this.yAxisScale.rangeMin() : r === "rangeMax" ? this.yAxisScale.rangeMax() : 0, a = r === "rangeMin" ? this.xAxisScale.rangeMin() : r === "rangeMax" ? this.xAxisScale.rangeMax() : 0;
		return {
			x: this.xAxisScale.map(e.x, { position: n }) ?? a,
			y: this.yAxisScale.map(e.y, { position: n }) ?? i
		};
	}
	isInRange(e) {
		var t = e.x, n = e.y, r = t == null || this.xAxisScale.isInRange(t), i = n == null || this.yAxisScale.isInRange(n);
		return r && i;
	}
};
// node_modules/recharts/es6/cartesian/ReferenceLine.js
function xM(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function SM(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? xM(Object(n), !0).forEach(function(t) {
			CM(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xM(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function CM(e, t, n) {
	return (t = wM(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function wM(e) {
	var t = TM(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function TM(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function EM() {
	return EM = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, EM.apply(null, arguments);
}
var DM = (e, t) => {
	var n;
	if (/*#__PURE__*/ P.isValidElement(e)) n = /*#__PURE__*/ P.cloneElement(e, t);
	else if (typeof e == "function") n = e(t);
	else {
		if (!W(t.x1) || !W(t.y1) || !W(t.x2) || !W(t.y2)) return null;
		n = /*#__PURE__*/ P.createElement("line", EM({}, t, { className: "recharts-reference-line-line" }));
	}
	return n;
}, OM = (e, t, n, r, i, a) => {
	var o = a.x, s = a.width, c = i.map(e, { position: n });
	if (!W(c) || t === "discard" && !i.isInRange(c)) return null;
	var l = [{
		x: o + s,
		y: c
	}, {
		x: o,
		y: c
	}];
	return r === "left" ? l.reverse() : l;
}, kM = (e, t, n, r, i, a) => {
	var o = a.y, s = a.height, c = i.map(e, { position: n });
	if (!W(c) || t === "discard" && !i.isInRange(c)) return null;
	var l = [{
		x: c,
		y: o + s
	}, {
		x: c,
		y: o
	}];
	return r === "top" ? l.reverse() : l;
}, AM = (e, t, n, r) => {
	var i = [r.mapWithFallback(e[0], {
		position: n,
		fallback: "rangeMin"
	}), r.mapWithFallback(e[1], {
		position: n,
		fallback: "rangeMax"
	})];
	return t === "discard" && i.some((e) => !r.isInRange(e)) ? null : i;
}, jM = (e, t, n, r, i, a, o) => {
	var s = o.x, c = o.y, l = o.segment, u = o.ifOverflow, d = _t(s);
	return _t(c) ? OM(c, u, r, a, t, n) : d ? kM(s, u, r, i, e, n) : l != null && l.length === 2 ? AM(l, u, r, new bM({
		x: e,
		y: t
	})) : null;
};
function MM(e) {
	var t = z();
	return (0, P.useEffect)(() => (t(cM(e)), () => {
		t(lM(e));
	})), null;
}
function NM(e) {
	var t = e.xAxisId, n = e.yAxisId, r = e.shape, i = e.className, a = e.ifOverflow, o = Il(), s = yM(), c = B((e) => zx(e, t)), u = B((e) => Hx(e, n)), d = B((e) => vC(e, "xAxis", t, o)), f = B((e) => vC(e, "yAxis", n, o)), p = vu();
	if (!s || !p || c == null || u == null || d == null || f == null) return null;
	var m = jM(d, f, p, e.position, c.orientation, u.orientation, e);
	if (!m) return null;
	var h = m[0], g = m[1];
	if (h == null || g == null) return null;
	var _ = h.x, v = h.y, y = g.x, b = g.y, x = SM(SM({ clipPath: a === "hidden" ? `url(#${s})` : void 0 }, He(e)), {}, {
		x1: _,
		y1: v,
		x2: y,
		y2: b
	}), S = rM({
		x1: _,
		y1: v,
		x2: y,
		y2: b
	});
	return /*#__PURE__*/ P.createElement(hE, { zIndex: e.zIndex }, /*#__PURE__*/ P.createElement(et, { className: l("recharts-reference-line", i) }, DM(r, x), /*#__PURE__*/ P.createElement(BO, EM({}, S, {
		lowerWidth: S.width,
		upperWidth: S.width
	}), /*#__PURE__*/ P.createElement(tk, { label: e.label }), e.children)));
}
var PM = {
	ifOverflow: "discard",
	xAxisId: 0,
	yAxisId: 0,
	fill: "none",
	label: !1,
	stroke: "#ccc",
	fillOpacity: 1,
	strokeWidth: 1,
	position: "middle",
	zIndex: J.line
};
function FM(e) {
	var t = Ar(e, PM);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(MM, {
		yAxisId: t.yAxisId,
		xAxisId: t.xAxisId,
		ifOverflow: t.ifOverflow,
		x: t.x,
		y: t.y,
		segment: t.segment
	}), /*#__PURE__*/ P.createElement(NM, t));
}
FM.displayName = "ReferenceLine";
// node_modules/es-toolkit/dist/function/noop.mjs
function IM() {}
// node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function LM(e) {
	if (!e || typeof e != "object") return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null ? !1 : Object.prototype.toString.call(e) === "[object Object]";
}
// node_modules/es-toolkit/dist/predicate/isEqualWith.mjs
function RM(e, t, n) {
	return zM(e, t, void 0, void 0, void 0, void 0, n);
}
function zM(e, t, n, r, i, a, o) {
	let s = o(e, t, n, r, i, a);
	if (s !== void 0) return s;
	if (typeof e == typeof t) switch (typeof e) {
		case "bigint":
		case "string":
		case "boolean":
		case "symbol":
		case "undefined": return e === t;
		case "number": return e === t || Object.is(e, t);
		case "function": return e === t;
		case "object": return BM(e, t, a, o);
	}
	return BM(e, t, a, o);
}
function BM(e, t, n, r) {
	if (Object.is(e, t)) return !0;
	let i = Qr(e), a = Qr(t);
	if (i === "[object Arguments]" && (i = di), a === "[object Arguments]" && (a = di), i !== a) return !1;
	switch (i) {
		case ei: return e.toString() === t.toString();
		case ti: return Mi(e.valueOf(), t.valueOf());
		case ni:
		case ai:
		case ii: return Object.is(e.valueOf(), t.valueOf());
		case $r: return e.source === t.source && e.flags === t.flags;
		case li: return e === t;
	}
	n ??= /* @__PURE__ */ new Map();
	let o = n.get(e), s = n.get(t);
	if (o != null && s != null) return o === t;
	n.set(e, t), n.set(t, e);
	try {
		switch (i) {
			case oi:
				if (e.size !== t.size) return !1;
				for (let [i, a] of e.entries()) if (!t.has(i) || !zM(a, t.get(i), i, e, t, n, r)) return !1;
				return !0;
			case si: {
				if (e.size !== t.size) return !1;
				let i = Array.from(e.values()), a = Array.from(t.values());
				for (let o = 0; o < i.length; o++) {
					let s = i[o], c = a.findIndex((i) => zM(s, i, void 0, e, t, n, r));
					if (c === -1) return !1;
					a.splice(c, 1);
				}
				return !0;
			}
			case ci:
			case mi:
			case hi:
			case gi:
			case _i:
			case vi:
			case yi:
			case bi:
			case xi:
			case Si:
			case Ci:
			case wi:
				if (Ei(e) !== Ei(t) || e.length !== t.length) return !1;
				for (let i = 0; i < e.length; i++) if (!zM(e[i], t[i], i, e, t, n, r)) return !1;
				return !0;
			case ui: return e.byteLength === t.byteLength && BM(new Uint8Array(e), new Uint8Array(t), n, r);
			case pi: return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : BM(new Uint8Array(e), new Uint8Array(t), n, r);
			case fi: return e.name === t.name && e.message === t.message;
			case di: {
				if (!(BM(e.constructor, t.constructor, n, r) || LM(e) && LM(t))) return !1;
				let i = [...Object.keys(e), ...Zr(e)], a = [...Object.keys(t), ...Zr(t)];
				if (i.length !== a.length) return !1;
				for (let a = 0; a < i.length; a++) {
					let o = i[a], s = e[o];
					if (!Object.hasOwn(t, o)) return !1;
					let c = t[o];
					if (!zM(s, c, o, e, t, n, r)) return !1;
				}
				return !0;
			}
			default: return !1;
		}
	} finally {
		n.delete(e), n.delete(t);
	}
}
// node_modules/es-toolkit/dist/predicate/isEqual.mjs
function VM(e, t) {
	return RM(e, t, IM);
}
// node_modules/recharts/es6/util/getEveryNth.js
function HM(e, t) {
	if (t < 1) return [];
	if (t === 1) return e;
	for (var n = [], r = 0; r < e.length; r += t) {
		var i = e[r];
		i !== void 0 && n.push(i);
	}
	return n;
}
// node_modules/recharts/es6/util/TickUtils.js
function UM(e, t, n) {
	return aM({
		width: e.width + t.width,
		height: e.height + t.height
	}, n);
}
function WM(e, t, n) {
	var r = n === "width", i = e.x, a = e.y, o = e.width, s = e.height;
	return t === 1 ? {
		start: r ? i : a,
		end: r ? i + o : a + s
	} : {
		start: r ? i + o : a + s,
		end: r ? i : a
	};
}
function GM(e, t, n, r, i) {
	if (e * t < e * r || e * t > e * i) return !1;
	var a = n();
	return e * (t - e * a / 2 - r) >= 0 && e * (t + e * a / 2 - i) <= 0;
}
function KM(e, t) {
	return HM(e, t + 1);
}
// node_modules/recharts/es6/cartesian/getEquidistantTicks.js
function qM(e, t, n, r, i) {
	for (var a = (r || []).slice(), o = t.start, s = t.end, c = 0, l = 1, u = o, d = function() {
		var t = r?.[c];
		if (t === void 0) return { v: HM(r, l) };
		var a = c, d, f = () => (d === void 0 && (d = n(t, a)), d), p = t.coordinate, m = c === 0 || GM(e, p, f, u, s);
		m || (c = 0, u = o, l += 1), m && (u = p + e * (f() / 2 + i), c += l);
	}, f; l <= a.length;) if (f = d(), f) return f.v;
	return [];
}
function JM(e, t, n, r, i) {
	var a = (r || []).slice().length;
	if (a === 0) return [];
	for (var o = t.start, s = t.end, c = 1; c <= a; c++) {
		for (var l = (a - 1) % c, u = o, d = !0, f = function() {
			var t = r[m];
			if (t == null) return 0;
			var a = m, o, c = () => (o === void 0 && (o = n(t, a)), o), f = t.coordinate, p = m === l || GM(e, f, c, u, s);
			if (!p) return d = !1, 1;
			p && (u = f + e * (c() / 2 + i));
		}, p, m = l; m < a && (p = f(), p === 0 || p !== 1); m += c);
		if (d) {
			for (var h = [], g = l; g < a; g += c) {
				var _ = r[g];
				_ != null && h.push(_);
			}
			return h;
		}
	}
	return [];
}
// node_modules/recharts/es6/cartesian/getTicks.js
function YM(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function XM(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? YM(Object(n), !0).forEach(function(t) {
			ZM(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : YM(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ZM(e, t, n) {
	return (t = QM(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function QM(e) {
	var t = $M(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function $M(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function eN(e, t, n, r, i) {
	for (var a = (r || []).slice(), o = a.length, s = t.start, c = t.end, l = function(t) {
		var r = a[t];
		if (r == null) return 1;
		var l = r, u, d = () => (u === void 0 && (u = n(r, t)), u);
		if (t === o - 1) {
			var f = e * (l.coordinate + e * d() / 2 - c);
			a[t] = l = XM(XM({}, l), {}, { tickCoord: f > 0 ? l.coordinate - f * e : l.coordinate });
		} else a[t] = l = XM(XM({}, l), {}, { tickCoord: l.coordinate });
		l.tickCoord != null && GM(e, l.tickCoord, d, s, c) && (c = l.tickCoord - e * (d() / 2 + i), a[t] = XM(XM({}, l), {}, { isShow: !0 }));
	}, u = o - 1; u >= 0; u--) if (l(u)) continue;
	return a;
}
function tN(e, t, n, r, i, a) {
	var o = (r || []).slice(), s = o.length, c = t.start, l = t.end;
	if (a) {
		var u = r[s - 1];
		if (u != null) {
			var d = n(u, s - 1), f = e * (u.coordinate + e * d / 2 - l);
			o[s - 1] = u = XM(XM({}, u), {}, { tickCoord: f > 0 ? u.coordinate - f * e : u.coordinate }), u.tickCoord != null && GM(e, u.tickCoord, () => d, c, l) && (l = u.tickCoord - e * (d / 2 + i), o[s - 1] = XM(XM({}, u), {}, { isShow: !0 }));
		}
	}
	for (var p = a ? s - 1 : s, m = function(t) {
		var r = o[t];
		if (r == null) return 1;
		var a = r, s, u = () => (s === void 0 && (s = n(r, t)), s);
		if (t === 0) {
			var d = e * (a.coordinate - e * u() / 2 - c);
			o[t] = a = XM(XM({}, a), {}, { tickCoord: d < 0 ? a.coordinate - d * e : a.coordinate });
		} else o[t] = a = XM(XM({}, a), {}, { tickCoord: a.coordinate });
		a.tickCoord != null && GM(e, a.tickCoord, u, c, l) && (c = a.tickCoord + e * (u() / 2 + i), o[t] = XM(XM({}, a), {}, { isShow: !0 }));
	}, h = 0; h < p; h++) if (m(h)) continue;
	return o;
}
function nN(e, t, n) {
	var r = e.tick, i = e.ticks, a = e.viewBox, o = e.minTickGap, s = e.orientation, c = e.interval, l = e.tickFormatter, u = e.unit, d = e.angle;
	if (!i || !i.length || !r) return [];
	if (F(c) || ef.isSsr) return KM(i, F(c) ? c : 0) ?? [];
	var f = [], p = s === "top" || s === "bottom" ? "width" : "height", m = u && p === "width" ? jD(u, {
		fontSize: t,
		letterSpacing: n
	}) : {
		width: 0,
		height: 0
	}, h = (e, r) => {
		var i = typeof l == "function" ? l(e.value, r) : e.value;
		return p === "width" ? UM(jD(i, {
			fontSize: t,
			letterSpacing: n
		}), m, d) : jD(i, {
			fontSize: t,
			letterSpacing: n
		})[p];
	}, g = i[0], _ = i[1], v = i.length >= 2 && g != null && _ != null ? mt(_.coordinate - g.coordinate) : 1, y = WM(a, v, p);
	return c === "equidistantPreserveStart" ? qM(v, y, h, i, o) : c === "equidistantPreserveEnd" ? JM(v, y, h, i, o) : (f = c === "preserveStart" || c === "preserveStartEnd" ? tN(v, y, h, i, o, c === "preserveStartEnd") : eN(v, y, h, i, o), f.filter((e) => e.isShow));
}
// node_modules/recharts/es6/util/YAxisUtils.js
var rN = (e) => {
	var t = e.ticks, n = e.label, r = e.labelGapWithTick, i = r === void 0 ? 5 : r, a = e.tickSize, o = a === void 0 ? 0 : a, s = e.tickMargin, c = s === void 0 ? 0 : s, l = 0;
	if (t) {
		Array.from(t).forEach((e) => {
			if (e) {
				var t = e.getBoundingClientRect();
				t.width > l && (l = t.width);
			}
		});
		var u = n ? n.getBoundingClientRect().width : 0, d = o + c, f = l + d + u + (n ? i : 0);
		return Math.round(f);
	}
	return 0;
}, iN = (e) => {
	var t = e.ticks, n = e.label, r = e.labelGapWithTick, i = r === void 0 ? 5 : r, a = e.tickSize, o = a === void 0 ? 0 : a, s = e.tickMargin, c = s === void 0 ? 0 : s, l = 0;
	if (t) {
		Array.from(t).forEach((e) => {
			if (e) {
				var t = e.getBoundingClientRect();
				t.height > l && (l = t.height);
			}
		});
		var u = n ? n.getBoundingClientRect().height : 0, d = o + c, f = l + d + u + (n ? i : 0);
		return Math.round(f);
	}
	return 0;
}, aN = Gs({
	name: "renderedTicks",
	initialState: {
		xAxis: {},
		yAxis: {}
	},
	reducers: {
		setRenderedTicks: (e, t) => {
			var n = t.payload, r = n.axisType, i = n.axisId, a = n.ticks;
			e[r][i] = H(a);
		},
		removeRenderedTicks: (e, t) => {
			var n = t.payload, r = n.axisType, i = n.axisId;
			delete e[r][i];
		}
	}
}), oN = aN.actions, sN = oN.setRenderedTicks, cN = oN.removeRenderedTicks, lN = aN.reducer, uN = [
	"axisLine",
	"width",
	"height",
	"className",
	"hide",
	"ticks",
	"axisType",
	"axisId"
];
function dN(e, t) {
	return gN(e) || hN(e, t) || pN(e, t) || fN();
}
function fN() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function pN(e, t) {
	if (e) {
		if (typeof e == "string") return mN(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? mN(e, t) : void 0;
	}
}
function mN(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function hN(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function gN(e) {
	if (Array.isArray(e)) return e;
}
function _N(e, t) {
	if (e == null) return {};
	var n, r, i = vN(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function vN(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function yN() {
	return yN = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, yN.apply(null, arguments);
}
function bN(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Q(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? bN(Object(n), !0).forEach(function(t) {
			xN(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bN(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function xN(e, t, n) {
	return (t = SN(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function SN(e) {
	var t = CN(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function CN(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var wN = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	viewBox: {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	},
	orientation: "bottom",
	ticks: [],
	stroke: "#666",
	tickLine: !0,
	axisLine: !0,
	tick: !0,
	mirror: !1,
	minTickGap: 5,
	tickSize: 6,
	tickMargin: 2,
	interval: "preserveEnd",
	zIndex: J.axis
};
function TN(e) {
	var t = e.x, n = e.y, r = e.width, i = e.height, a = e.orientation, o = e.mirror, s = e.axisLine, c = e.otherSvgProps;
	if (!s) return null;
	var u = Q(Q(Q({}, c), Be(s)), {}, { fill: "none" });
	if (a === "top" || a === "bottom") {
		var d = +(a === "top" && !o || a === "bottom" && o);
		u = Q(Q({}, u), {}, {
			x1: t,
			y1: n + d * i,
			x2: t + r,
			y2: n + d * i
		});
	} else {
		var f = +(a === "left" && !o || a === "right" && o);
		u = Q(Q({}, u), {}, {
			x1: t + f * r,
			y1: n,
			x2: t + f * r,
			y2: n + i
		});
	}
	return /*#__PURE__*/ P.createElement("line", yN({}, u, { className: l("recharts-cartesian-axis-line", lt(s, "className")) }));
}
function EN(e, t, n, r, i, a, o, s, c) {
	var l, u, d, f, p, m, h = s ? -1 : 1, g = e.tickSize || o, _ = F(e.tickCoord) ? e.tickCoord : e.coordinate;
	switch (a) {
		case "top":
			l = u = e.coordinate, f = n + +!s * i, d = f - h * g, m = d - h * c, p = _;
			break;
		case "left":
			d = f = e.coordinate, u = t + +!s * r, l = u - h * g, p = l - h * c, m = _;
			break;
		case "right":
			d = f = e.coordinate, u = t + +s * r, l = u + h * g, p = l + h * c, m = _;
			break;
		default: l = u = e.coordinate, f = n + +s * i, d = f + h * g, m = d + h * c, p = _;
	}
	return {
		line: {
			x1: l,
			y1: d,
			x2: u,
			y2: f
		},
		tick: {
			x: p,
			y: m
		}
	};
}
function DN(e, t) {
	switch (e) {
		case "left": return t ? "start" : "end";
		case "right": return t ? "end" : "start";
		default: return "middle";
	}
}
function ON(e, t) {
	switch (e) {
		case "left":
		case "right": return "middle";
		case "top": return t ? "start" : "end";
		default: return t ? "end" : "start";
	}
}
function kN(e) {
	var t = e.option, n = e.tickProps, r = e.value, i, a = l(n.className, "recharts-cartesian-axis-tick-value");
	if (/*#__PURE__*/ P.isValidElement(t)) i = /*#__PURE__*/ P.cloneElement(t, Q(Q({}, n), {}, { className: a }));
	else if (typeof t == "function") i = t(Q(Q({}, n), {}, { className: a }));
	else {
		var o = "recharts-cartesian-axis-tick-value";
		typeof t != "boolean" && (o = l(o, Pk(t))), i = /*#__PURE__*/ P.createElement(OO, yN({}, n, { className: o }), r);
	}
	return i;
}
function AN(e) {
	var t = e.ticks, n = e.axisType, r = e.axisId, i = z(), a = (0, P.useRef)(null);
	return (0, P.useEffect)(() => {
		if (r != null && n != null) {
			var e = t.map((e) => ({
				value: e.value,
				coordinate: e.coordinate,
				offset: e.offset,
				index: e.index
			})), o = a.current;
			o != null && o.axisId === r && o.axisType === n && VM(o.ticks, e) || (a.current = {
				ticks: e,
				axisId: r,
				axisType: n
			}, i(sN({
				ticks: e,
				axisId: r,
				axisType: n
			})));
		}
	}, [
		i,
		t,
		r,
		n
	]), (0, P.useEffect)(() => r == null || n == null ? Tt : () => {
		i(cN({
			axisId: r,
			axisType: n
		}));
	}, [
		i,
		r,
		n
	]), null;
}
var jN = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.ticks, r = n === void 0 ? [] : n, i = e.tick, a = e.tickLine, o = e.stroke, s = e.tickFormatter, c = e.unit, u = e.padding, d = e.tickTextProps, f = e.orientation, p = e.mirror, m = e.x, h = e.y, g = e.width, _ = e.height, v = e.tickSize, y = e.tickMargin, b = e.fontSize, x = e.letterSpacing, S = e.getTicksConfig, C = e.events, w = e.axisType, T = e.axisId, E = nN(Q(Q({}, S), {}, { ticks: r }), b, x), D = Be(S), O = Ve(i), k = _O(D.textAnchor) ? D.textAnchor : DN(f, p), A = ON(f, p), j = {};
	typeof a == "object" && (j = a);
	var M = Q(Q({}, D), {}, { fill: "none" }, j), N = E.map((e) => Q({ entry: e }, EN(e, m, h, g, _, f, v, p, y))), ee = N.map((e) => {
		var t = e.entry, n = e.line;
		return /*#__PURE__*/ P.createElement(et, {
			className: "recharts-cartesian-axis-tick",
			key: `tick-${t.value}-${t.coordinate}-${t.tickCoord}`
		}, a && /*#__PURE__*/ P.createElement("line", yN({}, M, n, { className: l("recharts-cartesian-axis-tick-line", lt(a, "className")) })));
	}), te = N.map((e, t) => {
		var n = e.entry, r = e.tick, a = Q(Q({}, Q(Q(Q(Q({ verticalAnchor: A }, D), {}, {
			textAnchor: k,
			stroke: "none",
			fill: o
		}, r), {}, {
			index: t,
			payload: n,
			visibleTicksCount: E.length,
			tickFormatter: s,
			padding: u
		}, d), {}, { angle: d?.angle ?? D.angle ?? 0 })), O);
		return /*#__PURE__*/ P.createElement(et, yN({
			className: "recharts-cartesian-axis-tick-label",
			key: `tick-label-${n.value}-${n.coordinate}-${n.tickCoord}`
		}, wr(C, n, t)), i && /*#__PURE__*/ P.createElement(kN, {
			option: i,
			tickProps: a,
			value: `${typeof s == "function" ? s(n.value, t) : n.value}${c || ""}`
		}));
	});
	return /*#__PURE__*/ P.createElement("g", { className: `recharts-cartesian-axis-ticks recharts-${w}-ticks` }, /*#__PURE__*/ P.createElement(AN, {
		ticks: E,
		axisId: T,
		axisType: w
	}), te.length > 0 && /*#__PURE__*/ P.createElement(hE, { zIndex: J.label }, /*#__PURE__*/ P.createElement("g", {
		className: `recharts-cartesian-axis-tick-labels recharts-${w}-tick-labels`,
		ref: t
	}, te)), ee.length > 0 && /*#__PURE__*/ P.createElement("g", { className: `recharts-cartesian-axis-tick-lines recharts-${w}-tick-lines` }, ee));
}), MN = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.axisLine, r = e.width, i = e.height, a = e.className, o = e.hide, s = e.ticks, c = e.axisType, u = e.axisId, d = _N(e, uN), f = dN((0, P.useState)(""), 2), p = f[0], m = f[1], h = dN((0, P.useState)(""), 2), g = h[0], _ = h[1], v = (0, P.useRef)(null);
	(0, P.useImperativeHandle)(t, () => ({
		getCalculatedWidth: () => rN({
			ticks: v.current,
			label: e.labelRef?.current,
			labelGapWithTick: 5,
			tickSize: e.tickSize,
			tickMargin: e.tickMargin
		}),
		getCalculatedHeight: () => iN({
			ticks: v.current,
			label: e.labelRef?.current,
			labelGapWithTick: 5,
			tickSize: e.tickSize,
			tickMargin: e.tickMargin
		})
	}));
	var y = (0, P.useCallback)((e) => {
		if (e) {
			var t = e.getElementsByClassName("recharts-cartesian-axis-tick-value");
			v.current = t;
			var n = t[0];
			if (n) {
				var r = window.getComputedStyle(n), i = r.fontSize, a = r.letterSpacing;
				(i !== p || a !== g) && (m(i), _(a));
			}
		}
	}, [p, g]);
	return o || r != null && r <= 0 || i != null && i <= 0 ? null : /*#__PURE__*/ P.createElement(hE, { zIndex: e.zIndex }, /*#__PURE__*/ P.createElement(et, { className: l("recharts-cartesian-axis", a) }, /*#__PURE__*/ P.createElement(TN, {
		x: e.x,
		y: e.y,
		width: r,
		height: i,
		orientation: e.orientation,
		mirror: e.mirror,
		axisLine: n,
		otherSvgProps: Be(e)
	}), /*#__PURE__*/ P.createElement(jN, {
		ref: y,
		axisType: c,
		events: d,
		fontSize: p,
		getTicksConfig: e,
		height: e.height,
		letterSpacing: g,
		mirror: e.mirror,
		orientation: e.orientation,
		padding: e.padding,
		stroke: e.stroke,
		tick: e.tick,
		tickFormatter: e.tickFormatter,
		tickLine: e.tickLine,
		tickMargin: e.tickMargin,
		tickSize: e.tickSize,
		tickTextProps: e.tickTextProps,
		ticks: s,
		unit: e.unit,
		width: e.width,
		x: e.x,
		y: e.y,
		axisId: u
	}), /*#__PURE__*/ P.createElement(BO, {
		x: e.x,
		y: e.y,
		width: e.width,
		height: e.height,
		lowerWidth: e.width,
		upperWidth: e.width
	}, /*#__PURE__*/ P.createElement(tk, {
		label: e.label,
		labelRef: e.labelRef
	}), e.children)));
}), NN = /*#__PURE__*/ P.forwardRef((e, t) => {
	var n = Ar(e, wN);
	return /*#__PURE__*/ P.createElement(MN, yN({}, n, { ref: t }));
});
NN.displayName = "CartesianAxis";
// node_modules/recharts/es6/theme/RechartsThemeContext.js
var PN = /*#__PURE__*/ (0, P.createContext)({ grid: {
	stroke: "#ccc",
	fill: "none"
} });
PN.Provider;
var FN = () => (0, P.useContext)(PN), IN = [
	"x1",
	"y1",
	"x2",
	"y2",
	"key"
], LN = ["offset"], RN = ["xAxisId", "yAxisId"], zN = ["xAxisId", "yAxisId"];
function BN(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function VN(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? BN(Object(n), !0).forEach(function(t) {
			HN(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : BN(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function HN(e, t, n) {
	return (t = UN(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function UN(e) {
	var t = WN(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function WN(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function GN() {
	return GN = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, GN.apply(null, arguments);
}
function KN(e, t) {
	if (e == null) return {};
	var n, r, i = qN(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function qN(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var JN = (e) => {
	var t = e.fill;
	if (!t || t === "none") return null;
	var n = e.fillOpacity, r = e.x, i = e.y, a = e.width, o = e.height, s = e.ry;
	return /*#__PURE__*/ P.createElement("rect", {
		x: r,
		y: i,
		ry: s,
		width: a,
		height: o,
		stroke: "none",
		fill: t,
		fillOpacity: n,
		className: "recharts-cartesian-grid-bg"
	});
};
function YN(e) {
	var t = e.option, n = e.lineItemProps, r;
	if (/*#__PURE__*/ P.isValidElement(t)) r = /*#__PURE__*/ P.cloneElement(t, n);
	else if (typeof t == "function") r = t(n);
	else {
		var i = n.x1, a = n.y1, o = n.x2, s = n.y2, c = n.key, l = Be(KN(n, IN)) ?? {};
		l.offset;
		var u = KN(l, LN), d = Array.isArray(u.strokeDasharray) ? u.strokeDasharray.join(",") : u.strokeDasharray;
		r = /*#__PURE__*/ P.createElement("line", GN({}, u, {
			strokeDasharray: d,
			x1: i,
			y1: a,
			x2: o,
			y2: s,
			fill: "none",
			key: c
		}));
	}
	return r;
}
function XN(e) {
	var t = e.x, n = e.width, r = e.horizontal, i = r === void 0 || r, a = e.horizontalPoints;
	if (!i || !a || !a.length) return null;
	e.xAxisId, e.yAxisId;
	var o = KN(e, RN), s = a.map((e, r) => {
		var a = VN(VN({}, o), {}, {
			x1: t,
			y1: e,
			x2: t + n,
			y2: e,
			key: `line-${r}`,
			index: r
		});
		return /*#__PURE__*/ P.createElement(YN, {
			key: `line-${r}`,
			option: i,
			lineItemProps: a
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-grid-horizontal" }, s);
}
function ZN(e) {
	var t = e.y, n = e.height, r = e.vertical, i = r === void 0 || r, a = e.verticalPoints;
	if (!i || !a || !a.length) return null;
	e.xAxisId, e.yAxisId;
	var o = KN(e, zN), s = a.map((e, r) => {
		var a = VN(VN({}, o), {}, {
			x1: e,
			y1: t,
			x2: e,
			y2: t + n,
			key: `line-${r}`,
			index: r
		});
		return /*#__PURE__*/ P.createElement(YN, {
			option: i,
			lineItemProps: a,
			key: `line-${r}`
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-grid-vertical" }, s);
}
function QN(e) {
	var t = e.horizontalFill, n = e.fillOpacity, r = e.x, i = e.y, a = e.width, o = e.height, s = e.horizontalPoints, c = e.horizontal;
	if (!(c === void 0 || c) || !t || !t.length || s == null) return null;
	var l = s.map((e) => Math.round(e + i - i)).sort((e, t) => e - t);
	i !== l[0] && l.unshift(0);
	var u = l.map((e, s) => {
		var c = l[s + 1], u = c == null ? i + o - e : c - e;
		if (u <= 0) return null;
		var d = s % t.length;
		return /*#__PURE__*/ P.createElement("rect", {
			key: `react-${s}`,
			y: e,
			x: r,
			height: u,
			width: a,
			stroke: "none",
			fill: t[d],
			fillOpacity: n,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-gridstripes-horizontal" }, u);
}
function $N(e) {
	var t = e.vertical, n = t === void 0 || t, r = e.verticalFill, i = e.fillOpacity, a = e.x, o = e.y, s = e.width, c = e.height, l = e.verticalPoints;
	if (!n || !r || !r.length) return null;
	var u = l.map((e) => Math.round(e + a - a)).sort((e, t) => e - t);
	a !== u[0] && u.unshift(0);
	var d = u.map((e, t) => {
		var n = u[t + 1], l = n == null ? a + s - e : n - e;
		if (l <= 0) return null;
		var d = t % r.length;
		return /*#__PURE__*/ P.createElement("rect", {
			key: `react-${t}`,
			x: e,
			y: o,
			width: l,
			height: c,
			stroke: "none",
			fill: r[d],
			fillOpacity: i,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-gridstripes-vertical" }, d);
}
var eP = (e, t) => {
	var n = e.xAxis, r = e.width, i = e.height, a = e.offset;
	return Yc(nN(VN(VN(VN({}, wN), n), {}, {
		ticks: Xc(n, !0),
		viewBox: {
			x: 0,
			y: 0,
			width: r,
			height: i
		}
	})), a.left, a.left + a.width, t);
}, tP = (e, t) => {
	var n = e.yAxis, r = e.width, i = e.height, a = e.offset;
	return Yc(nN(VN(VN(VN({}, wN), n), {}, {
		ticks: Xc(n, !0),
		viewBox: {
			x: 0,
			y: 0,
			width: r,
			height: i
		}
	})), a.top, a.top + a.height, t);
}, nP = {
	horizontal: !0,
	vertical: !0,
	horizontalPoints: [],
	verticalPoints: [],
	verticalFill: [],
	horizontalFill: [],
	xAxisId: 0,
	yAxisId: 0,
	syncWithTicks: !1,
	zIndex: J.grid
};
function rP(e) {
	var t = xu(), n = Su(), r = bu(), i = VN(VN({}, Ar(e, nP)), {}, {
		x: F(e.x) ? e.x : r.left,
		y: F(e.y) ? e.y : r.top,
		width: F(e.width) ? e.width : r.width,
		height: F(e.height) ? e.height : r.height
	}), a = i.xAxisId, o = i.yAxisId, s = i.x, c = i.y, l = i.width, u = i.height, d = i.syncWithTicks, f = i.horizontalValues, p = i.verticalValues, m = Il(), h = B((e) => LC(e, "xAxis", a, m)), g = B((e) => LC(e, "yAxis", o, m)), _ = FN(), v = {
		stroke: i.stroke ?? _.grid.stroke,
		strokeWidth: i.strokeWidth ?? _.grid.strokeWidth,
		strokeOpacity: i.strokeOpacity ?? _.grid.strokeOpacity,
		strokeDasharray: i.strokeDasharray ?? _.grid.strokeDasharray
	};
	if (!Vc(l) || !Vc(u) || !F(s) || !F(c)) return null;
	var y = i.verticalCoordinatesGenerator || eP, b = i.horizontalCoordinatesGenerator || tP, x = i.horizontalPoints, S = i.verticalPoints;
	if ((!x || !x.length) && typeof b == "function") {
		var C = f && f.length, w = b({
			yAxis: g ? VN(VN({}, g), {}, { ticks: C ? f : g.ticks }) : void 0,
			width: t ?? l,
			height: n ?? u,
			offset: r
		}, C ? !0 : d);
		Hl(Array.isArray(w), `horizontalCoordinatesGenerator should return Array but instead it returned [${typeof w}]`), Array.isArray(w) && (x = w);
	}
	if ((!S || !S.length) && typeof y == "function") {
		var T = p && p.length, E = y({
			xAxis: h ? VN(VN({}, h), {}, { ticks: T ? p : h.ticks }) : void 0,
			width: t ?? l,
			height: n ?? u,
			offset: r
		}, T ? !0 : d);
		Hl(Array.isArray(E), `verticalCoordinatesGenerator should return Array but instead it returned [${typeof E}]`), Array.isArray(E) && (S = E);
	}
	return /*#__PURE__*/ P.createElement(hE, { zIndex: i.zIndex }, /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-grid" }, /*#__PURE__*/ P.createElement(JN, {
		fill: i.fill ?? _.grid.fill,
		fillOpacity: i.fillOpacity ?? _.grid.fillOpacity,
		x: i.x,
		y: i.y,
		width: i.width,
		height: i.height,
		ry: i.ry
	}), /*#__PURE__*/ P.createElement(QN, GN({}, i, { horizontalPoints: x })), /*#__PURE__*/ P.createElement($N, GN({}, i, { verticalPoints: S })), /*#__PURE__*/ P.createElement(XN, GN({}, i, v, {
		offset: r,
		horizontalPoints: x,
		xAxis: h,
		yAxis: g
	})), /*#__PURE__*/ P.createElement(ZN, GN({}, i, v, {
		offset: r,
		verticalPoints: S,
		xAxis: h,
		yAxis: g
	}))));
}
rP.displayName = "CartesianGrid";
// node_modules/recharts/es6/cartesian/LineDrawShape.js
var iP = [
	"animationElapsedTime",
	"isAnimating",
	"isEntrance",
	"visibleLength",
	"strokeDasharray",
	"connectNulls"
];
function aP() {
	return aP = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, aP.apply(null, arguments);
}
function oP(e, t) {
	if (e == null) return {};
	var n, r, i = sP(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function sP(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function cP(e) {
	try {
		return e && e.getTotalLength && e.getTotalLength() || 0;
	} catch {
		return 0;
	}
}
function lP(e, t) {
	return `${t}px ${e}px`;
}
function uP(e) {
	return e.length % 2 == 0 ? e : [...e, ...e];
}
function dP(e, t) {
	for (var n = [], r = 0; r < t; ++r) n.push(...e);
	return n;
}
function fP(e, t, n) {
	var r = uP(n), i = r.reduce((e, t) => e + t, 0);
	if (!i) return lP(t, e);
	for (var a = Math.floor(e / i), o = e % i, s = [], c = 0, l = 0; c < r.length; l += (u = r[c]) ?? 0, ++c) {
		var u, d = r[c];
		if (d != null && l + d > o) {
			s = [...r.slice(0, c), o - l];
			break;
		}
	}
	var f = s.length % 2 == 0 ? [0, t] : [t];
	return [
		...dP(r, a),
		...s,
		...f
	].map((e) => `${e}px`).join(", ");
}
function pP(e, t, n) {
	return e ? fP(n, t, `${e}`.split(/[,\s]+/gim).map((e) => parseFloat(e))) : lP(t, n);
}
function mP(e) {
	e.animationElapsedTime, e.isAnimating, e.isEntrance;
	var t = e.visibleLength, n = e.strokeDasharray, r = e.connectNulls, i = oP(e, iP), a = r ?? !1, o;
	if (t != null) {
		var s = i.pathRef;
		o = pP(n, cP(s?.current ?? null), t);
	} else n != null && (o = String(n));
	return /*#__PURE__*/ P.createElement(Rf, aP({}, i, {
		connectNulls: a,
		strokeDasharray: o
	}));
}
// node_modules/recharts/es6/cartesian/useAnimatedLineLength.js
function hP(e) {
	var t = (0, P.useRef)(0), n = (0, P.useRef)(0), r = (0, P.useRef)(!1), i = (0, P.useRef)(e);
	return i.current !== e && (t.current = n.current, i.current = e), (0, P.useCallback)((e, i) => {
		if (r.current) return null;
		var a = Math.min(ft(t.current + e * i), i);
		return e > 0 && i > 0 && (n.current = Math.max(n.current, a), a >= i) ? (r.current = !0, null) : a;
	}, []);
}
// node_modules/recharts/es6/state/errorBarSlice.js
var gP = Gs({
	name: "errorBars",
	initialState: {},
	reducers: {
		addErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.errorBar;
			e[r] || (e[r] = []), e[r].push(i);
		},
		replaceErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.prev, a = n.next;
			e[r] && (e[r] = e[r].map((e) => e.dataKey === i.dataKey && e.direction === i.direction ? a : e));
		},
		removeErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.errorBar;
			e[r] && (e[r] = e[r].filter((e) => e.dataKey !== i.dataKey || e.direction !== i.direction));
		}
	}
}), _P = gP.actions;
_P.addErrorBar, _P.replaceErrorBar, _P.removeErrorBar;
var vP = gP.reducer, yP = ["children"];
function bP(e, t) {
	if (e == null) return {};
	var n, r, i = xP(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function xP(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var SP = /*#__PURE__*/ (0, P.createContext)({
	data: [],
	xAxisId: "xAxis-0",
	yAxisId: "yAxis-0",
	dataPointFormatter: () => ({
		x: 0,
		y: 0,
		value: 0
	}),
	errorBarOffset: 0
});
function CP(e) {
	var t = e.children, n = bP(e, yP);
	return /*#__PURE__*/ P.createElement(SP.Provider, { value: n }, t);
}
// node_modules/recharts/es6/cartesian/GraphicalItemClipPath.js
function wP(e, t) {
	var n = B((t) => zx(t, e)), r = B((e) => Hx(e, t)), i = n?.allowDataOverflow ?? Lx.allowDataOverflow, a = r?.allowDataOverflow ?? Bx.allowDataOverflow;
	return {
		needClip: i || a,
		needClipX: i,
		needClipY: a
	};
}
function TP(e) {
	var t = e.xAxisId, n = e.yAxisId, r = e.clipPathId, i = Tj(), a = wP(t, n), o = a.needClipX, s = a.needClipY, c = a.needClip, l = B((e) => dC(e, t, !1)), u = B((e) => fC(e, n, !1));
	if (!c || !i) return null;
	var d = i.x, f = i.y, p = i.width, m = i.height, h = o && l ? Math.min(l[0], l[1]) : d - p / 2, g = s && u ? Math.min(u[0], u[1]) : f - m / 2, _ = o && l ? Math.abs(l[1] - l[0]) : p * 2, v = s && u ? Math.abs(u[1] - u[0]) : m * 2;
	return /*#__PURE__*/ P.createElement("clipPath", { id: `clipPath-${r}` }, /*#__PURE__*/ P.createElement("rect", {
		x: h,
		y: g,
		width: _,
		height: v
	}));
}
// node_modules/recharts/es6/state/selectors/lineSelectors.js
var EP = (e, t, n, r) => HC(e, "xAxis", t, r), DP = (e, t, n, r) => VC(e, "xAxis", t, r), OP = (e, t, n, r) => HC(e, "yAxis", n, r), kP = (e, t, n, r) => VC(e, "yAxis", n, r), AP = V([
	K,
	EP,
	OP,
	DP,
	kP
], (e, t, n, r, i) => Jc(e, "xAxis") ? ll(t, r, !1) : ll(n, i, !1)), jP = (e, t, n, r, i) => i;
function MP(e) {
	return e.type === "line";
}
var NP = V([
	K,
	EP,
	OP,
	DP,
	kP,
	V([Yx, jP], (e, t) => e.filter(MP).find((e) => e.id === t)),
	AP,
	Km
], (e, t, n, r, i, a, o, s) => {
	var c = s.chartData, l = s.dataStartIndex, u = s.dataEndIndex;
	if (!(a == null || t == null || n == null || r == null || i == null || r.length === 0 || i.length === 0 || o == null || e !== "horizontal" && e !== "vertical")) {
		var d = a.dataKey, f = a.data, p = f != null && f.length > 0 ? f : c?.slice(l, u + 1);
		if (p != null) return aF({
			layout: e,
			xAxis: t,
			yAxis: n,
			xAxisTicks: r,
			yAxisTicks: i,
			dataKey: d,
			bandSize: o,
			displayedData: p
		});
	}
});
// node_modules/recharts/es6/util/getRadiusAndStrokeWidthFromDot.js
function PP(e) {
	var t = Ve(e), n = 3, r = 2;
	if (t != null) {
		var i = t.r, a = t.strokeWidth, o = Number(i), s = Number(a);
		return (Number.isNaN(o) || o < 0) && (o = n), (Number.isNaN(s) || s < 0) && (s = r), {
			r: o,
			strokeWidth: s
		};
	}
	return {
		r: n,
		strokeWidth: r
	};
}
// node_modules/recharts/es6/cartesian/Line.js
var FP = ["id"], IP = [
	"type",
	"layout",
	"connectNulls",
	"needClip",
	"shape",
	"strokeDasharray"
], LP = [
	"activeDot",
	"animateNewValues",
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"connectNulls",
	"dot",
	"hide",
	"isAnimationActive",
	"label",
	"legendType",
	"xAxisId",
	"yAxisId",
	"id"
];
function RP() {
	return RP = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, RP.apply(null, arguments);
}
function zP(e, t) {
	if (e == null) return {};
	var n, r, i = BP(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function BP(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function VP(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function HP(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? VP(Object(n), !0).forEach(function(t) {
			UP(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : VP(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function UP(e, t, n) {
	return (t = WP(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function WP(e) {
	var t = GP(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function GP(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function KP(e) {
	try {
		return e && e.getTotalLength && e.getTotalLength() || 0;
	} catch {
		return 0;
	}
}
function qP(e) {
	var t = 0, n = 0;
	for (var r of e) r.status === "matched" && r.prev.x != null && r.next.x != null && (t += r.next.x - r.prev.x, n++);
	return n > 0 ? t / n : 0;
}
var JP = {
	activeDot: !0,
	animateNewValues: !0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationInterpolateFn: (e, t) => {
		if (e == null) return [];
		if (t === 1) return e.flatMap((e) => e.status === "removed" ? [] : [e.next]);
		var n = qP(e), r = [];
		for (var i of e) if (i.status === "matched") r.push(HP(HP({}, i.next), {}, {
			x: I(i.prev.x, i.next.x, t),
			y: I(i.prev.y, i.next.y, t)
		}));
		else if (i.status === "added") {
			if (i.next.x != null) {
				var a = i.next.x - n;
				r.push(HP(HP({}, i.next), {}, {
					x: I(a, i.next.x, t),
					y: i.next.y
				}));
			} else r.push(i.next);
		} else if (i.status === "removed" && i.prev.x != null) {
			var o = i.prev.x + n;
			r.push(HP(HP({}, i.prev), {}, {
				x: I(i.prev.x, o, t),
				y: i.prev.y
			}));
		}
		return r;
	},
	animationMatchBy: fA,
	connectNulls: !1,
	dot: !0,
	fill: "#fff",
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "line",
	shape: mP,
	stroke: "#3182bd",
	strokeWidth: 1,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: J.line,
	type: "linear"
}, YP = (e) => {
	var t = e.dataKey, n = e.name, r = e.stroke, i = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: i,
		color: r,
		value: dl(n, t),
		payload: e
	}];
}, XP = /*#__PURE__*/ P.memo((e) => {
	var t = e.dataKey, n = e.data, r = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, s = e.hide, c = e.unit, l = e.formatter, u = e.tooltipType, d = e.id, f = {
		dataDefinedOnItem: n,
		getPosition: Tt,
		settings: {
			stroke: r,
			strokeWidth: i,
			fill: a,
			dataKey: t,
			nameKey: void 0,
			name: dl(o, t),
			hide: s,
			type: u,
			color: r,
			unit: c,
			formatter: l,
			graphicalItemId: d
		}
	};
	return /*#__PURE__*/ P.createElement(rA, { tooltipEntrySettings: f });
});
function ZP(e) {
	var t = e.clipPathId, n = e.points, r = e.props, i = r.dot, a = r.dataKey, o = r.needClip;
	r.id;
	var s = Be(zP(r, FP));
	return /*#__PURE__*/ P.createElement(sj, {
		points: n,
		dot: i,
		className: "recharts-line-dots",
		dotClassName: "recharts-line-dot",
		dataKey: a,
		baseProps: s,
		needClip: o,
		clipPathId: t
	});
}
function QP(e) {
	var t = e.showLabels, n = e.children, r = e.points, i = (0, P.useMemo)(() => r?.map((e) => {
		var t = {
			x: e.x ?? 0,
			y: e.y ?? 0,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return HP(HP({}, t), {}, {
			value: e.value,
			payload: e.payload,
			viewBox: t,
			parentViewBox: void 0,
			fill: void 0
		});
	}), [r]);
	return /*#__PURE__*/ P.createElement(uk, { value: t ? i : void 0 }, n);
}
function $P(e) {
	var t = e.clipPathId, n = e.pathRef, r = e.points, i = e.props, a = e.animationElapsedTime, o = e.isAnimating, s = e.isEntrance, c = e.visibleLength, l = i.type, u = i.layout, d = i.connectNulls, f = i.needClip, p = i.shape, m = i.strokeDasharray, h = HP(HP({}, He(zP(i, IP))), {}, {
		fill: "none",
		className: "recharts-line-curve",
		clipPath: f ? `url(#clipPath-${t})` : void 0,
		points: r,
		type: l,
		layout: u,
		connectNulls: d,
		strokeDasharray: m ?? i.strokeDasharray,
		pathRef: n,
		animationElapsedTime: a,
		isAnimating: o,
		isEntrance: i.animateNewValues ? s : !1,
		visibleLength: c
	});
	return /*#__PURE__*/ P.createElement(P.Fragment, null, r?.length > 1 && /*#__PURE__*/ P.createElement($k, {
		option: p,
		DefaultShape: JP.shape,
		shapeProps: h
	}), /*#__PURE__*/ P.createElement(ZP, {
		points: r,
		clipPathId: t,
		props: i
	}));
}
function eF(e) {
	var t = e.clipPathId, n = e.props, r = e.pathRef, i = e.previousPointsRef, a = n.points, o = n.isAnimationActive, s = n.animationBegin, c = n.animationDuration, l = n.animationEasing, u = n.animationMatchBy, d = n.animationInterpolateFn, f = n.layout, p = KP(r.current), m = DA(n.onAnimationStart, n.onAnimationEnd), h = m.isAnimating, g = m.handleAnimationStart, _ = m.handleAnimationEnd, v = !h, y = hP(a), b = (0, P.useCallback)((e) => e > 0 && p > 0, [p]);
	return /*#__PURE__*/ P.createElement(QP, {
		points: a,
		showLabels: v
	}, n.children, /*#__PURE__*/ P.createElement(OA, {
		animationInput: a,
		animationIdPrefix: "recharts-line-",
		items: a,
		previousItemsRef: i,
		isAnimationActive: o,
		animationBegin: s,
		animationDuration: c,
		animationEasing: l,
		onAnimationStart: g,
		onAnimationEnd: _,
		animationInterpolateFn: d,
		animationMatchBy: u,
		shouldUpdatePreviousRef: b,
		layout: f
	}, (e, i, a) => {
		var o = h || i < 1, s = o ? y(i, p) : null;
		return /*#__PURE__*/ P.createElement($P, {
			props: n,
			points: e,
			clipPathId: t,
			pathRef: r,
			animationElapsedTime: i,
			isAnimating: o,
			isEntrance: a,
			visibleLength: s
		});
	}), /*#__PURE__*/ P.createElement(gk, { label: n.label }));
}
function tF(e) {
	var t = e.clipPathId, n = e.props, r = (0, P.useRef)(null), i = (0, P.useRef)(null);
	return /*#__PURE__*/ P.createElement(eF, {
		props: n,
		clipPathId: t,
		previousPointsRef: r,
		pathRef: i
	});
}
var nF = (e, t) => ({
	x: e.x ?? void 0,
	y: e.y ?? void 0,
	value: e.value,
	errorVal: G(e.payload, t)
}), rF = class extends P.Component {
	render() {
		var e = this.props, t = e.hide, n = e.dot, r = e.points, i = e.className, a = e.xAxisId, o = e.yAxisId, s = e.top, c = e.left, u = e.width, d = e.height, f = e.id, p = e.needClip, m = e.zIndex;
		if (t) return null;
		var h = l("recharts-line", i), g = f, _ = PP(n), v = _.r, y = _.strokeWidth, b = Hk(n), x = v * 2 + y, S = p ? `url(#clipPath-${b ? "" : "dots-"}${g})` : void 0;
		return /*#__PURE__*/ P.createElement(hE, { zIndex: m }, /*#__PURE__*/ P.createElement(et, { className: h }, p && /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement(TP, {
			clipPathId: g,
			xAxisId: a,
			yAxisId: o
		}), !b && /*#__PURE__*/ P.createElement("clipPath", { id: `clipPath-dots-${g}` }, /*#__PURE__*/ P.createElement("rect", {
			x: c - x / 2,
			y: s - x / 2,
			width: u + x,
			height: d + x
		}))), /*#__PURE__*/ P.createElement(CP, {
			xAxisId: a,
			yAxisId: o,
			data: r,
			dataPointFormatter: nF,
			errorBarOffset: 0
		}, /*#__PURE__*/ P.createElement(tF, {
			props: this.props,
			clipPathId: g
		}))), /*#__PURE__*/ P.createElement(Nj, {
			activeDot: this.props.activeDot,
			points: r,
			mainColor: this.props.stroke,
			itemDataKey: this.props.dataKey,
			clipPath: S
		}));
	}
};
function iF(e) {
	var t = Ar(e, JP), n = t.activeDot, r = t.animateNewValues, i = t.animationBegin, a = t.animationDuration, o = t.animationEasing, s = t.connectNulls, c = t.dot, l = t.hide, u = t.isAnimationActive, d = t.label, f = t.legendType, p = t.xAxisId, m = t.yAxisId, h = t.id, g = zP(t, LP), _ = wP(p, m).needClip, v = Tj(), y = wu(), b = Il(), x = B((e) => NP(e, p, m, b, h));
	if (y !== "horizontal" && y !== "vertical" || x == null || v == null) return null;
	var S = v.height, C = v.width, w = v.x, T = v.y;
	return /*#__PURE__*/ P.createElement(rF, RP({}, g, {
		id: h,
		connectNulls: s,
		dot: c,
		activeDot: n,
		animateNewValues: r,
		animationBegin: i,
		animationDuration: a,
		animationEasing: o,
		isAnimationActive: u,
		hide: l,
		label: d,
		legendType: f,
		xAxisId: p,
		yAxisId: m,
		points: x,
		layout: y,
		height: S,
		width: C,
		left: w,
		top: T,
		needClip: _
	}));
}
function aF(e) {
	var t = e.layout, n = e.xAxis, r = e.yAxis, i = e.xAxisTicks, a = e.yAxisTicks, o = e.dataKey, s = e.bandSize;
	return e.displayedData.map((e, c) => {
		var l = G(e, o);
		if (t === "horizontal") return {
			x: tl({
				axis: n,
				ticks: i,
				bandSize: s,
				entry: e,
				index: c
			}),
			y: (L(l) ? null : r.scale.map(l)) ?? null,
			value: l,
			payload: e
		};
		var u = L(l) ? null : n.scale.map(l), d = tl({
			axis: r,
			ticks: a,
			bandSize: s,
			entry: e,
			index: c
		});
		return u == null || d == null ? null : {
			x: u,
			y: d,
			value: l,
			payload: e
		};
	}).filter(Boolean);
}
function oF(e) {
	var t = Ar(e, JP), n = Il();
	return /*#__PURE__*/ P.createElement(RA, {
		id: t.id,
		type: "line"
	}, (e) => /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(iA, { legendPayload: YP(t) }), /*#__PURE__*/ P.createElement(XP, {
		dataKey: t.dataKey,
		data: t.data,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		unit: t.unit,
		formatter: t.formatter,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ P.createElement(JA, {
		type: "line",
		id: e,
		data: t.data,
		xAxisId: t.xAxisId,
		yAxisId: t.yAxisId,
		zAxisId: 0,
		dataKey: t.dataKey,
		hide: t.hide,
		isPanorama: n
	}), /*#__PURE__*/ P.createElement(iF, RP({}, t, { id: e }))));
}
var sF = /*#__PURE__*/ P.memo(oF, nd);
sF.displayName = "Line";
// node_modules/recharts/es6/state/selectors/graphicalItemSelectors.js
function cF(e, t) {
	return e.graphicalItems.cartesianItems.find((e) => e.id === t)?.xAxisId ?? 0;
}
function lF(e, t) {
	return e.graphicalItems.cartesianItems.find((e) => e.id === t)?.yAxisId ?? 0;
}
// node_modules/recharts/es6/state/selectors/areaSelectors.js
var uF = (e, t, n) => HC(e, "xAxis", cF(e, t), n), dF = (e, t, n) => VC(e, "xAxis", cF(e, t), n), fF = (e, t, n) => HC(e, "yAxis", lF(e, t), n), pF = (e, t, n) => VC(e, "yAxis", lF(e, t), n), mF = V([
	K,
	uF,
	fF,
	dF,
	pF
], (e, t, n, r, i) => Jc(e, "xAxis") ? ll(t, r, !1) : ll(n, i, !1)), hF = V([Yx, (e, t) => t], (e, t) => e.filter((e) => e.type === "area").find((e) => e.id === t)), gF = (e) => Jc(K(e), "xAxis") ? "yAxis" : "xAxis", _F = (e, t) => gF(e) === "yAxis" ? lF(e, t) : cF(e, t), vF = (e, t, n) => xS(e, gF(e), _F(e, t), n), yF = V([
	K,
	uF,
	fF,
	dF,
	pF,
	V([hF, vF], (e, t) => {
		if (e != null && t != null) {
			var n = e.stackId, r = ng(e);
			if (n != null && r != null) {
				var i = (t[n]?.stackedData)?.find((e) => e.key === r);
				if (i != null) return i.map((e) => [e[0], e[1]]);
			}
		}
	}),
	qm,
	mF,
	hF,
	Mh,
	V([hF, vF], (e, t) => {
		if (e != null && e.stackId != null && t != null) {
			var n = t[e.stackId];
			if (n != null) return n.graphicalItems.map((e) => e.dataKey).filter(wt);
		}
	})
], (e, t, n, r, i, a, o, s, c, l, u) => {
	var d = o.chartData, f = o.dataStartIndex, p = o.dataEndIndex;
	if (!(c == null || e !== "horizontal" && e !== "vertical" || t == null || n == null || r == null || i == null || r.length === 0 || i.length === 0 || s == null)) {
		var m = c.data, h = m && m.length > 0 ? m : d?.slice(f, p + 1);
		if (h != null) return QF({
			layout: e,
			xAxis: t,
			yAxis: n,
			xAxisTicks: r,
			yAxisTicks: i,
			dataStartIndex: f,
			areaSettings: c,
			stackedData: a,
			displayedData: h,
			chartBaseValue: l,
			bandSize: s,
			stackDataKeys: u
		});
	}
}), bF = [
	"animationElapsedTime",
	"isAnimating",
	"isEntrance",
	"layout",
	"isRange",
	"stroke",
	"connectNulls"
], xF = ["id", "baseLine"];
function SF() {
	return SF = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, SF.apply(null, arguments);
}
function CF(e, t) {
	if (e == null) return {};
	var n, r, i = wF(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function wF(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function TF(e) {
	var t = e.alpha, n = e.baseLine, r = e.points, i = e.strokeWidth, a = r[0]?.x, o = r[r.length - 1]?.x;
	if (!W(a) || !W(o)) return null;
	var s = t * Math.abs(a - o), c = Math.max(...r.map((e) => e.y || 0));
	return F(n) ? c = Math.max(n, c) : n && Array.isArray(n) && n.length && (c = Math.max(...n.map((e) => e.y || 0), c)), F(c) ? /*#__PURE__*/ P.createElement("rect", {
		x: a < o ? a : a - s,
		y: 0,
		width: s,
		height: Math.floor(c + (i ? parseInt(`${i}`, 10) : 1))
	}) : null;
}
function EF(e) {
	var t = e.alpha, n = e.baseLine, r = e.points, i = e.strokeWidth, a = r[0]?.y, o = r[r.length - 1]?.y;
	if (!W(a) || !W(o)) return null;
	var s = t * Math.abs(a - o), c = Math.max(...r.map((e) => e.x || 0));
	return F(n) ? c = Math.max(n, c) : n && Array.isArray(n) && n.length && (c = Math.max(...n.map((e) => e.x || 0), c)), F(c) ? /*#__PURE__*/ P.createElement("rect", {
		x: 0,
		y: a < o ? a : a - s,
		width: c + (i ? parseInt(`${i}`, 10) : 1),
		height: Math.floor(s)
	}) : null;
}
function DF(e) {
	var t = e.alpha, n = e.layout, r = e.points, i = e.baseLine, a = e.strokeWidth;
	return n === "vertical" ? /*#__PURE__*/ P.createElement(EF, {
		alpha: t,
		points: r,
		baseLine: i,
		strokeWidth: a
	}) : /*#__PURE__*/ P.createElement(TF, {
		alpha: t,
		points: r,
		baseLine: i,
		strokeWidth: a
	});
}
function OF(e) {
	var t = e.animationElapsedTime, n = t === void 0 ? 1 : t, r = e.isAnimating, i = r !== void 0 && r, a = e.isEntrance, o = a !== void 0 && a, s = e.layout, c = e.isRange, l = e.stroke, u = e.connectNulls, d = CF(e, bF), f = s === "vertical" ? "vertical" : "horizontal", p = u ?? !1, m = FA(), h = d.id, g = d.baseLine, _ = Be(CF(d, xF)), v = /*#__PURE__*/ P.createElement(Rf, SF({}, d, {
		id: h,
		baseLine: g,
		connectNulls: p,
		stroke: "none",
		className: "recharts-area-area",
		layout: f
	})), y = l !== "none" && /*#__PURE__*/ P.createElement(Rf, SF({}, _, {
		className: "recharts-area-curve",
		layout: f,
		type: d.type,
		connectNulls: p,
		fill: "none",
		stroke: l,
		points: d.points
	})), b = l !== "none" && c && Array.isArray(g) && /*#__PURE__*/ P.createElement(Rf, SF({}, _, {
		className: "recharts-area-curve",
		layout: f,
		type: d.type,
		connectNulls: p,
		fill: "none",
		stroke: l,
		points: g
	}));
	return o && (i || n < 1) ? /*#__PURE__*/ P.createElement(et, null, /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement("clipPath", { id: m }, /*#__PURE__*/ P.createElement(DF, {
		alpha: n,
		points: d.points ?? [],
		baseLine: g,
		layout: f,
		strokeWidth: d.strokeWidth
	}))), /*#__PURE__*/ P.createElement(et, { clipPath: `url(#${m})` }, v, y, b)) : /*#__PURE__*/ P.createElement(P.Fragment, null, v, y, b);
}
// node_modules/recharts/es6/cartesian/Area.js
var kF = ["id"], AF = [
	"activeDot",
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"connectNulls",
	"dot",
	"fill",
	"fillOpacity",
	"hide",
	"isAnimationActive",
	"legendType",
	"stroke",
	"xAxisId",
	"yAxisId"
];
function jF() {
	return jF = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, jF.apply(null, arguments);
}
function MF(e, t) {
	if (e == null) return {};
	var n, r, i = NF(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function NF(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function PF(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function FF(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? PF(Object(n), !0).forEach(function(t) {
			IF(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : PF(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function IF(e, t, n) {
	return (t = LF(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function LF(e) {
	var t = RF(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function RF(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var zF = {
	activeDot: !0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: fA,
	animationInterpolateFn: (e, t) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => e.status === "matched" ? [FF(FF({}, e.next), {}, {
		x: I(e.prev.x, e.next.x, t),
		y: I(e.prev.y, e.next.y, t)
	})] : e.status === "added" ? [e.next] : []),
	connectNulls: !1,
	dot: !1,
	fill: "#3182bd",
	fillOpacity: .6,
	hide: !1,
	isAnimationActive: "auto",
	legendType: "line",
	stroke: "#3182bd",
	strokeWidth: 1,
	type: "linear",
	label: !1,
	shape: OF,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: J.area
};
function BF(e, t) {
	return e && e !== "none" ? e : t;
}
var VF = (e) => {
	var t = e.dataKey, n = e.name, r = e.stroke, i = e.fill, a = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: a,
		color: BF(r, i),
		value: dl(n, t),
		payload: e
	}];
}, HF = /*#__PURE__*/ P.memo((e) => {
	var t = e.dataKey, n = e.data, r = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, s = e.hide, c = e.unit, l = e.formatter, u = e.tooltipType, d = e.id, f = {
		dataDefinedOnItem: n,
		getPosition: Tt,
		settings: {
			stroke: r,
			strokeWidth: i,
			fill: a,
			dataKey: t,
			nameKey: void 0,
			name: dl(o, t),
			hide: s,
			type: u,
			color: BF(r, a),
			unit: c,
			formatter: l,
			graphicalItemId: d
		}
	};
	return /*#__PURE__*/ P.createElement(rA, { tooltipEntrySettings: f });
});
function UF(e) {
	var t = e.clipPathId, n = e.points, r = e.props, i = r.needClip, a = r.dot, o = r.dataKey, s = Be(r);
	return /*#__PURE__*/ P.createElement(sj, {
		points: n,
		dot: a,
		className: "recharts-area-dots",
		dotClassName: "recharts-area-dot",
		dataKey: o,
		baseProps: s,
		needClip: i,
		clipPathId: t
	});
}
function WF(e) {
	var t = e.showLabels, n = e.children, r = e.points.map((e) => {
		var t = {
			x: e.x ?? 0,
			y: e.y ?? 0,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return FF(FF({}, t), {}, {
			value: e.value,
			payload: e.payload,
			parentViewBox: void 0,
			viewBox: t,
			fill: void 0
		});
	});
	return /*#__PURE__*/ P.createElement(uk, { value: t ? r : void 0 }, n);
}
function GF(e) {
	var t = e.points, n = e.baseLine, r = e.needClip, i = e.clipPathId, a = e.props, o = e.animationElapsedTime, s = e.isAnimating, c = e.isEntrance, l = a.layout, u = a.type, d = a.stroke, f = a.connectNulls, p = a.isRange, m = a.shape, h = a.id, g = MF(a, kF), _ = FF(FF({}, He(g)), {}, {
		id: h,
		points: t,
		connectNulls: f,
		type: u,
		baseLine: n,
		layout: l,
		stroke: d,
		isRange: p,
		animationElapsedTime: o,
		isAnimating: s,
		isEntrance: c
	});
	return /*#__PURE__*/ P.createElement(P.Fragment, null, t?.length > 1 && /*#__PURE__*/ P.createElement(et, { clipPath: r ? `url(#clipPath-${i})` : void 0 }, /*#__PURE__*/ P.createElement($k, {
		option: m,
		DefaultShape: zF.shape,
		shapeProps: _
	})), /*#__PURE__*/ P.createElement(UF, {
		points: t,
		props: g,
		clipPathId: i
	}));
}
function KF(e, t, n) {
	return F(e) ? I(F(t) ? t : void 0, e, n) : L(e) || ht(e) ? I(F(t) ? t : void 0, 0, n) : e;
}
function qF(e) {
	var t = e.needClip, n = e.clipPathId, r = e.props, i = e.previousPointsRef, a = e.previousBaselineRef, o = r.points, s = r.baseLine, c = r.isAnimationActive, l = r.animationBegin, u = r.animationDuration, d = r.animationEasing, f = r.animationMatchBy, p = r.animationInterpolateFn, m = (0, P.useMemo)(() => ({
		points: o,
		baseLine: s
	}), [o, s]), h = bA(m, a), g = Tu(), _ = DA(r.onAnimationStart, r.onAnimationEnd), v = _.isAnimating, y = _.handleAnimationStart, b = _.handleAnimationEnd, x = h.startValue;
	if (g == null) return null;
	var S = Array.isArray(s) && Array.isArray(x) ? yA(x, s, f) : Array.isArray(s) ? yA(null, s, f) : null;
	return /*#__PURE__*/ P.createElement(OA, {
		animationInput: m,
		animationIdPrefix: "recharts-area-",
		items: o,
		previousItemsRef: i,
		isAnimationActive: c,
		animationBegin: l,
		animationDuration: u,
		animationEasing: d,
		onAnimationStart: y,
		onAnimationEnd: b,
		animationInterpolateFn: p,
		animationMatchBy: f,
		layout: g
	}, (e, i, a) => {
		var c = i === 1 ? s : Array.isArray(s) ? p(S, i, g) : a ? s : KF(s, x, i);
		return h.syncStepValue(c, i), /*#__PURE__*/ P.createElement(WF, {
			showLabels: !v,
			points: o
		}, r.children, /*#__PURE__*/ P.createElement(GF, {
			points: e,
			baseLine: c,
			needClip: t,
			clipPathId: n,
			props: r,
			animationElapsedTime: i,
			isAnimating: v || i < 1,
			isEntrance: a
		}), /*#__PURE__*/ P.createElement(gk, { label: r.label }));
	});
}
function JF(e) {
	var t = e.needClip, n = e.clipPathId, r = e.props, i = (0, P.useRef)(null), a = (0, P.useRef)();
	return /*#__PURE__*/ P.createElement(qF, {
		needClip: t,
		clipPathId: n,
		props: r,
		previousPointsRef: i,
		previousBaselineRef: a
	});
}
var YF = class extends P.PureComponent {
	render() {
		var e = this.props, t = e.hide, n = e.dot, r = e.points, i = e.className, a = e.top, o = e.left, s = e.needClip, c = e.xAxisId, u = e.yAxisId, d = e.width, f = e.height, p = e.id, m = e.baseLine, h = e.zIndex;
		if (t) return null;
		var g = l("recharts-area", i), _ = p, v = PP(n), y = v.r, b = v.strokeWidth, x = Hk(n), S = y * 2 + b, C = s ? `url(#clipPath-${x ? "" : "dots-"}${_})` : void 0;
		return /*#__PURE__*/ P.createElement(hE, { zIndex: h }, /*#__PURE__*/ P.createElement(et, { className: g }, s && /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement(TP, {
			clipPathId: _,
			xAxisId: c,
			yAxisId: u
		}), !x && /*#__PURE__*/ P.createElement("clipPath", { id: `clipPath-dots-${_}` }, /*#__PURE__*/ P.createElement("rect", {
			x: o - S / 2,
			y: a - S / 2,
			width: d + S,
			height: f + S
		}))), /*#__PURE__*/ P.createElement(JF, {
			needClip: s,
			clipPathId: _,
			props: this.props
		})), /*#__PURE__*/ P.createElement(Nj, {
			points: r,
			mainColor: BF(this.props.stroke, this.props.fill),
			itemDataKey: this.props.dataKey,
			activeDot: this.props.activeDot,
			clipPath: C
		}), this.props.isRange && Array.isArray(m) && /*#__PURE__*/ P.createElement(Nj, {
			points: m,
			mainColor: BF(this.props.stroke, this.props.fill),
			itemDataKey: this.props.dataKey,
			activeDot: this.props.activeDot,
			clipPath: C
		}));
	}
};
function XF(e) {
	var t = e.activeDot, n = e.animationBegin, r = e.animationDuration, i = e.animationEasing, a = e.connectNulls, o = e.dot, s = e.fill, c = e.fillOpacity, l = e.hide, u = e.isAnimationActive, d = e.legendType, f = e.stroke, p = e.xAxisId, m = e.yAxisId, h = MF(e, AF), g = wu(), _ = FT(), v = wP(p, m).needClip, y = Il(), b = B((t) => yF(t, e.id, y)) ?? {}, x = b.points, S = b.isRange, C = b.baseLine, w = Tj();
	if (g !== "horizontal" && g !== "vertical" || w == null || _ !== "AreaChart" && _ !== "ComposedChart") return null;
	var T = w.height, E = w.width, D = w.x, O = w.y;
	return !x || !x.length ? null : /*#__PURE__*/ P.createElement(YF, jF({}, h, {
		activeDot: t,
		animationBegin: n,
		animationDuration: r,
		animationEasing: i,
		baseLine: C,
		connectNulls: a,
		dot: o,
		fill: s,
		fillOpacity: c,
		height: T,
		hide: l,
		layout: g,
		isAnimationActive: u,
		isRange: S,
		legendType: d,
		needClip: v,
		points: x,
		stroke: f,
		width: E,
		left: D,
		top: O,
		xAxisId: p,
		yAxisId: m
	}));
}
var ZF = (e, t, n, r, i) => {
	var a = n ?? t;
	if (F(a)) return a;
	var o = e === "horizontal" ? i : r, s = o.scale.domain();
	if (o.type === "number") {
		var c = Math.max(s[0], s[1]), l = Math.min(s[0], s[1]);
		return a === "dataMin" ? l : a === "dataMax" || c < 0 ? c : Math.max(Math.min(s[0], s[1]), 0);
	}
	return a === "dataMin" ? s[0] : a === "dataMax" ? s[1] : s[0];
};
function QF(e) {
	var t = e.areaSettings, n = t.connectNulls, r = t.baseValue, i = t.dataKey, a = e.stackedData, o = e.layout, s = e.chartBaseValue, c = e.xAxis, l = e.yAxis, u = e.displayedData, d = e.dataStartIndex, f = e.xAxisTicks, p = e.yAxisTicks, m = e.bandSize, h = e.stackDataKeys, g = a && a.length, _ = ZF(o, s, r, c, l), v = o === "horizontal", y = !1, b = u.map((e, t) => {
		var r;
		if (g) r = a[d + t];
		else {
			var o = G(e, i);
			Array.isArray(o) ? (r = o, y = !0) : r = [_, o];
		}
		var s = r?.[1] ?? null, u = G(e, i), b = g && u == null && h != null && h.length > 0 && h.every((t) => G(e, t) == null), x = s == null || g && !n && u == null || b;
		return v ? {
			x: tl({
				axis: c,
				ticks: f,
				bandSize: m,
				entry: e,
				index: t
			}),
			y: x ? null : l.scale.map(s) ?? null,
			value: r,
			payload: e
		} : {
			x: x ? null : c.scale.map(s) ?? null,
			y: tl({
				axis: l,
				ticks: p,
				bandSize: m,
				entry: e,
				index: t
			}),
			value: r,
			payload: e
		};
	});
	return {
		points: b,
		baseLine: (g || y ? b.map((e) => {
			var t = Array.isArray(e.value) ? e.value[0] : null;
			return v ? {
				x: e.x,
				y: t != null && e.y != null ? l.scale.map(t) ?? null : null,
				payload: e.payload
			} : {
				x: t == null ? null : c.scale.map(t) ?? null,
				y: e.y,
				payload: e.payload
			};
		}) : v ? l.scale.map(_) : c.scale.map(_)) ?? 0,
		isRange: y
	};
}
function $F(e) {
	var t = Ar(e, zF), n = Il();
	return /*#__PURE__*/ P.createElement(RA, {
		id: t.id,
		type: "area"
	}, (e) => /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(iA, { legendPayload: VF(t) }), /*#__PURE__*/ P.createElement(HF, {
		dataKey: t.dataKey,
		data: t.data,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		unit: t.unit,
		formatter: t.formatter,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ P.createElement(JA, {
		type: "area",
		id: e,
		data: t.data,
		dataKey: t.dataKey,
		xAxisId: t.xAxisId,
		yAxisId: t.yAxisId,
		zAxisId: 0,
		stackId: el(t.stackId),
		hide: t.hide,
		barSize: void 0,
		baseValue: t.baseValue,
		isPanorama: n,
		connectNulls: t.connectNulls
	}), /*#__PURE__*/ P.createElement(XF, jF({}, t, { id: e }))));
}
var eI = /*#__PURE__*/ P.memo($F, nd);
eI.displayName = "Area";
// node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var tI = "Invariant failed";
function nI(e, t) {
	if (!e) throw Error(tI);
}
// node_modules/recharts/es6/util/BarUtils.js
var rI = ["option"];
function iI(e, t) {
	if (e == null) return {};
	var n, r, i = aI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function aI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var oI = cm;
function sI(e) {
	var t = e.option, n = iI(e, rI);
	return /*#__PURE__*/ P.createElement($k, {
		option: t,
		DefaultShape: oI,
		shapeProps: n,
		activeClassName: "recharts-active-bar",
		inActiveClassName: "recharts-inactive-bar"
	});
}
var cI = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
	return (n, r) => {
		if (F(e)) return e;
		var i = F(n) || L(n);
		return i ? e(n, r) : (!i && nI(!1, `minPointSize callback function received a value with type of ${typeof n}. Currently only numbers or null/undefined are supported.`), t);
	};
}, lI = (e, t, n) => n, uI = V([Yx, (e, t) => t], (e, t) => e.filter((e) => e.type === "bar").find((e) => e.id === t)), dI = V([uI], (e) => e?.maxBarSize), fI = (e, t, n, r) => r, pI = V([
	K,
	Yx,
	cF,
	lF,
	lI
], (e, t, n, r, i) => t.filter((t) => e === "horizontal" ? t.xAxisId === n : t.yAxisId === r).filter((e) => e.isPanorama === i).filter((e) => e.hide === !1).filter((e) => e.type === "bar")), mI = (e, t, n) => {
	var r = K(e), i = cF(e, t), a = lF(e, t);
	if (i != null && a != null) return r === "horizontal" ? xS(e, "yAxis", a, n) : xS(e, "xAxis", i, n);
}, hI = V([
	pI,
	Th,
	(e, t) => {
		var n = K(e), r = cF(e, t), i = lF(e, t);
		if (r != null && i != null) return n === "horizontal" ? PC(e, "xAxis", r) : PC(e, "yAxis", i);
	}
], Vj), gI = (e, t, n) => {
	var r = uI(e, t);
	if (r == null) return 0;
	var i = cF(e, t), a = lF(e, t);
	if (i == null || a == null) return 0;
	var o = K(e), s = Sh(e), c = r.maxBarSize, l = L(c) ? s : c, u, d;
	return o === "horizontal" ? (u = HC(e, "xAxis", i, n), d = VC(e, "xAxis", i, n)) : (u = HC(e, "yAxis", a, n), d = VC(e, "yAxis", a, n)), ll(u, d, !0) ?? l ?? 0;
}, _I = (e, t, n) => {
	var r = K(e), i = cF(e, t), a = lF(e, t);
	if (i != null && a != null) {
		var o, s;
		return r === "horizontal" ? (o = HC(e, "xAxis", i, n), s = VC(e, "xAxis", i, n)) : (o = HC(e, "yAxis", a, n), s = VC(e, "yAxis", a, n)), ll(o, s);
	}
}, vI = V([
	Ml,
	Pl,
	(e, t, n) => {
		var r = cF(e, t);
		if (r != null) return HC(e, "xAxis", r, n);
	},
	(e, t, n) => {
		var r = lF(e, t);
		if (r != null) return HC(e, "yAxis", r, n);
	},
	(e, t, n) => {
		var r = cF(e, t);
		if (r != null) return VC(e, "xAxis", r, n);
	},
	(e, t, n) => {
		var r = lF(e, t);
		if (r != null) return VC(e, "yAxis", r, n);
	},
	V([V([
		hI,
		Sh,
		Ch,
		wh,
		gI,
		_I,
		dI
	], Jj), uI], Xj),
	K,
	qm,
	_I,
	V([mI, uI], Yj),
	uI,
	fI
], (e, t, n, r, i, a, o, s, c, l, u, d, f) => {
	var p = c.chartData, m = c.dataStartIndex, h = c.dataEndIndex;
	if (!(d == null || o == null || t == null || s !== "horizontal" && s !== "vertical" || n == null || r == null || i == null || a == null || l == null)) {
		var g = d.data, _ = g != null && g.length > 0 ? g : p?.slice(m, h + 1);
		if (_ != null) return sL({
			layout: s,
			barSettings: d,
			pos: o,
			parentViewBox: t,
			bandSize: l,
			xAxis: n,
			yAxis: r,
			xAxisTicks: i,
			yAxisTicks: a,
			stackedData: u,
			displayedData: _,
			offset: e,
			cells: f,
			dataStartIndex: m
		});
	}
}), yI = ["index"];
function bI() {
	return bI = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, bI.apply(null, arguments);
}
function xI(e, t) {
	if (e == null) return {};
	var n, r, i = SI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function SI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var CI = /*#__PURE__*/ (0, P.createContext)(void 0), wI = (e) => {
	var t = (0, P.useContext)(CI);
	if (t != null) return t.stackId;
	if (e != null) return el(e);
}, TI = (e, t) => `recharts-bar-stack-clip-path-${e}-${t}`, EI = (e) => {
	var t = (0, P.useContext)(CI);
	if (t != null) {
		var n = t.stackId;
		return `url(#${TI(n, e)})`;
	}
}, DI = (e) => {
	var t = e.index, n = xI(e, yI), r = EI(t);
	return /*#__PURE__*/ P.createElement(et, bI({
		className: "recharts-bar-stack-layer",
		clipPath: r
	}, n));
}, OI = [
	"onMouseEnter",
	"onMouseLeave",
	"onClick"
], kI = [
	"value",
	"background",
	"tooltipPosition"
], AI = ["id"], jI = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
];
function MI(e, t) {
	return LI(e) || II(e, t) || PI(e, t) || NI();
}
function NI() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function PI(e, t) {
	if (e) {
		if (typeof e == "string") return FI(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? FI(e, t) : void 0;
	}
}
function FI(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function II(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function LI(e) {
	if (Array.isArray(e)) return e;
}
function RI() {
	return RI = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, RI.apply(null, arguments);
}
function zI(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function BI(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? zI(Object(n), !0).forEach(function(t) {
			VI(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : zI(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function VI(e, t, n) {
	return (t = HI(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function HI(e) {
	var t = UI(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function UI(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function WI(e, t) {
	if (e == null) return {};
	var n, r, i = GI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function GI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var KI = (e) => {
	var t = e.dataKey, n = e.name, r = e.fill, i = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: i,
		color: r,
		value: dl(n, t),
		payload: e
	}];
}, qI = /*#__PURE__*/ P.memo((e) => {
	var t = e.dataKey, n = e.stroke, r = e.strokeWidth, i = e.fill, a = e.name, o = e.hide, s = e.unit, c = e.formatter, l = e.tooltipType, u = e.id, d = {
		dataDefinedOnItem: void 0,
		getPosition: Tt,
		settings: {
			stroke: n,
			strokeWidth: r,
			fill: i,
			dataKey: t,
			nameKey: void 0,
			name: dl(a, t),
			hide: o,
			type: l,
			color: i,
			unit: s,
			formatter: c,
			graphicalItemId: u
		}
	};
	return /*#__PURE__*/ P.createElement(rA, { tooltipEntrySettings: d });
});
function JI(e) {
	var t = B(dT), n = e.data, r = e.dataKey, i = e.background, a = e.allOtherBarProps, o = a.onMouseEnter, s = a.onMouseLeave, c = a.onClick, l = WI(a, OI), u = eA(o, r, a.id), d = tA(s), f = nA(c, r, a.id);
	if (!i || n == null) return null;
	var p = Ve(i);
	return /*#__PURE__*/ P.createElement(hE, { zIndex: Zj(i, J.barBackground) }, n.map((e, n) => {
		e.value;
		var a = e.background;
		e.tooltipPosition;
		var o = WI(e, kI);
		if (!a) return null;
		var s = u(e, e.originalDataIndex), c = d(e, e.originalDataIndex), m = f(e, e.originalDataIndex), h = BI(BI(BI(BI(BI({
			option: i,
			isActive: String(e.originalDataIndex) === t
		}, o), {}, { fill: "#eee" }, a), p), wr(l, e, n)), {}, {
			onMouseEnter: s,
			onMouseLeave: c,
			onClick: m,
			dataKey: r,
			index: n,
			className: "recharts-bar-background-rectangle"
		});
		return /*#__PURE__*/ P.createElement(sI, RI({ key: `background-bar-${n}` }, h));
	}));
}
function YI(e) {
	var t = e.showLabels, n = e.children, r = e.rects?.map((e) => {
		var t = {
			x: e.x,
			y: e.y,
			width: e.width,
			lowerWidth: e.width,
			upperWidth: e.width,
			height: e.height
		};
		return BI(BI({}, t), {}, {
			value: e.value,
			payload: e.payload,
			parentViewBox: e.parentViewBox,
			viewBox: t,
			fill: e.fill
		});
	});
	return /*#__PURE__*/ P.createElement(uk, { value: t ? r : void 0 }, n);
}
function XI(e) {
	var t = e.shape, n = e.activeBar, r = e.baseProps, i = e.entry, a = e.index, o = e.dataKey, s = B(dT), c = B(pT), l = n && String(i.originalDataIndex) === s && (c == null || o === c), u = s != null && (String(i.originalDataIndex) !== s || c != null && o !== c), d = MI((0, P.useState)(!1), 2), f = d[0], p = d[1], m = MI((0, P.useState)(!1), 2), h = m[0], g = m[1];
	(0, P.useEffect)(() => {
		var e;
		return l ? (p(!0), e = requestAnimationFrame(() => {
			g(!0);
		})) : (g(!1), u && p(!1)), () => {
			cancelAnimationFrame(e);
		};
	}, [l, u]);
	var _ = (0, P.useCallback)(() => {
		l || p(!1);
	}, [l]), v = l && h, y = l || f, b = l ? n === !0 ? t : n : t, x = /*#__PURE__*/ P.createElement(sI, RI({}, r, { name: String(r.name) }, i, {
		isActive: v,
		option: b,
		index: a,
		dataKey: o,
		animationElapsedTime: e.animationElapsedTime,
		isAnimating: e.isAnimating,
		isEntrance: e.isEntrance,
		onTransitionEnd: _
	}));
	return y ? /*#__PURE__*/ P.createElement(hE, { zIndex: J.activeBar }, /*#__PURE__*/ P.createElement(DI, { index: i.originalDataIndex }, x)) : x;
}
function ZI(e) {
	var t = e.shape, n = e.baseProps, r = e.entry, i = e.index, a = e.dataKey;
	return /*#__PURE__*/ P.createElement(sI, RI({}, n, { name: String(n.name) }, r, {
		isActive: !1,
		option: t,
		index: i,
		dataKey: a,
		animationElapsedTime: e.animationElapsedTime,
		isAnimating: e.isAnimating,
		isEntrance: e.isEntrance
	}));
}
function QI(e) {
	var t = e.data, n = e.props, r = e.animationElapsedTime, i = e.isAnimating, a = e.isEntrance, o = Be(n) ?? {}, s = o.id, c = WI(o, AI), l = n.shape, u = n.dataKey, d = n.activeBar, f = n.onMouseEnter, p = n.onClick, m = n.onMouseLeave, h = WI(n, jI), g = eA(f, u, s), _ = tA(m), v = nA(p, u, s);
	return t ? /*#__PURE__*/ P.createElement(P.Fragment, null, t.map((e, t) => /*#__PURE__*/ P.createElement(DI, RI({
		index: e.originalDataIndex,
		key: `rectangle-${e?.x}-${e?.y}-${e?.value}-${t}`,
		className: "recharts-bar-rectangle"
	}, wr(h, e, t), {
		onMouseEnter: g(e, e.originalDataIndex),
		onMouseLeave: _(e, e.originalDataIndex),
		onClick: v(e, e.originalDataIndex)
	}), d ? /*#__PURE__*/ P.createElement(XI, {
		shape: l,
		activeBar: d,
		baseProps: c,
		entry: e,
		index: t,
		dataKey: u,
		animationElapsedTime: r,
		isAnimating: i,
		isEntrance: a
	}) : /*#__PURE__*/ P.createElement(ZI, {
		shape: l,
		baseProps: c,
		entry: e,
		index: t,
		dataKey: u,
		animationElapsedTime: r,
		isAnimating: i,
		isEntrance: a
	})))) : null;
}
var $I = (e, t, n) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => {
	if (e.status === "removed") return n === "horizontal" ? [BI(BI({}, e.prev), {}, {
		height: I(e.prev.height, 0, t),
		y: I(e.prev.y, e.prev.y + e.prev.height, t)
	})] : [BI(BI({}, e.prev), {}, { width: I(e.prev.width, 0, t) })];
	if (e.status === "matched") return [BI(BI({}, e.next), {}, {
		x: I(e.prev.x, e.next.x, t),
		y: I(e.prev.y, e.next.y, t),
		width: I(e.prev.width, e.next.width, t),
		height: I(e.prev.height, e.next.height, t)
	})];
	var r = e.next;
	return n === "horizontal" ? [BI(BI({}, r), {}, {
		height: I(0, r.height, t),
		y: I(r.stackedBarStart, r.y, t)
	})] : [BI(BI({}, r), {}, {
		width: I(0, r.width, t),
		x: I(r.stackedBarStart, r.x, t)
	})];
});
function eL(e) {
	var t = e.props, n = e.previousRectanglesRef, r = t.data, i = t.isAnimationActive, a = t.animationBegin, o = t.animationDuration, s = t.animationEasing, c = t.animationInterpolateFn, l = t.layout, u = DA(t.onAnimationStart, t.onAnimationEnd), d = u.isAnimating, f = u.handleAnimationStart, p = u.handleAnimationEnd;
	return /*#__PURE__*/ P.createElement(YI, {
		showLabels: !d,
		rects: r
	}, /*#__PURE__*/ P.createElement(OA, {
		animationInput: r,
		animationIdPrefix: "recharts-bar-",
		items: r,
		previousItemsRef: n,
		isAnimationActive: i,
		animationBegin: a,
		animationDuration: o,
		animationEasing: s,
		onAnimationStart: f,
		onAnimationEnd: p,
		animationInterpolateFn: c,
		animationMatchBy: t.animationMatchBy,
		layout: l
	}, (e, n, r) => /*#__PURE__*/ P.createElement(et, null, /*#__PURE__*/ P.createElement(QI, {
		props: t,
		data: e,
		animationElapsedTime: n,
		isAnimating: d || n < 1,
		isEntrance: r
	}))), /*#__PURE__*/ P.createElement(gk, { label: t.label }), t.children);
}
function tL(e) {
	var t = (0, P.useRef)(null);
	return /*#__PURE__*/ P.createElement(eL, {
		previousRectanglesRef: t,
		props: e
	});
}
var nL = 0, rL = (e, t) => {
	var n = Array.isArray(e.value) ? e.value[1] : e.value;
	return {
		x: e.x,
		y: e.y,
		value: n,
		errorVal: G(e, t)
	};
}, iL = class extends P.PureComponent {
	render() {
		var e = this.props, t = e.hide, n = e.data, r = e.dataKey, i = e.className, a = e.xAxisId, o = e.yAxisId, s = e.needClip, c = e.background, u = e.id;
		if (t || n == null) return null;
		var d = l("recharts-bar", i), f = u;
		return /*#__PURE__*/ P.createElement(et, {
			className: d,
			id: u
		}, s && /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement(TP, {
			clipPathId: f,
			xAxisId: a,
			yAxisId: o
		})), /*#__PURE__*/ P.createElement(et, {
			className: "recharts-bar-rectangles",
			clipPath: s ? `url(#clipPath-${f})` : void 0
		}, /*#__PURE__*/ P.createElement(JI, {
			data: n,
			dataKey: r,
			background: c,
			allOtherBarProps: this.props
		}), /*#__PURE__*/ P.createElement(tL, this.props)));
	}
}, aL = {
	activeBar: !1,
	animationBegin: 0,
	animationDuration: 400,
	animationEasing: "ease",
	animationInterpolateFn: $I,
	animationMatchBy: pA,
	background: !1,
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "rect",
	minPointSize: nL,
	shape: oI,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: J.bar
};
function oL(e) {
	var t = e.xAxisId, n = e.yAxisId, r = e.hide, i = e.legendType, a = e.minPointSize, o = e.activeBar, s = e.animationBegin, c = e.animationDuration, l = e.animationEasing, u = e.isAnimationActive, d = wP(t, n).needClip, f = wu(), p = Il(), m = Vk(e.children, hD), h = B((t) => vI(t, e.id, p, m));
	if (f !== "vertical" && f !== "horizontal") return null;
	var g, _ = h?.[0];
	return g = _ == null || _.height == null || _.width == null ? 0 : f === "vertical" ? _.height / 2 : _.width / 2, /*#__PURE__*/ P.createElement(CP, {
		xAxisId: t,
		yAxisId: n,
		data: h,
		dataPointFormatter: rL,
		errorBarOffset: g
	}, /*#__PURE__*/ P.createElement(iL, RI({}, e, {
		layout: f,
		needClip: d,
		data: h,
		xAxisId: t,
		yAxisId: n,
		hide: r,
		legendType: i,
		minPointSize: a,
		activeBar: o,
		animationBegin: s,
		animationDuration: c,
		animationEasing: l,
		isAnimationActive: u
	})));
}
function sL(e) {
	var t = e.layout, n = e.barSettings, r = n.dataKey, i = n.minPointSize, a = n.hasCustomShape, o = e.pos, s = e.bandSize, c = e.xAxis, l = e.yAxis, u = e.xAxisTicks, d = e.yAxisTicks, f = e.stackedData, p = e.displayedData, m = e.offset, h = e.cells, g = e.parentViewBox, _ = e.dataStartIndex, v = t === "horizontal" ? l : c, y = f ? v.scale.domain() : null, b = rl({ numericAxis: v }), x = v.scale.map(b);
	return p.map((e, n) => {
		var p, v, S, C, w, T;
		if (f) {
			var E = f[n + _];
			if (E == null) return null;
			p = Zc(E, y);
		} else p = G(e, r), Array.isArray(p) || (p = [b, p]);
		var D = cI(i, nL)(p[1], n);
		if (t === "horizontal") {
			var O = l.scale.map(p[0]), k = l.scale.map(p[1]);
			if (O == null || k == null) return null;
			v = nl({
				axis: c,
				ticks: u,
				bandSize: s,
				offset: o.offset,
				entry: e,
				index: n
			}), S = k ?? O ?? void 0, C = o.size;
			var A = O - k;
			if (w = ht(A) ? 0 : A, T = {
				x: v,
				y: m.top,
				width: C,
				height: m.height
			}, Math.abs(D) > 0 && Math.abs(w) < Math.abs(D)) {
				var j = mt(w || D) * (Math.abs(D) - Math.abs(w));
				S -= j, w += j;
			}
		} else {
			var M = c.scale.map(p[0]), N = c.scale.map(p[1]);
			if (M == null || N == null) return null;
			if (v = M, S = nl({
				axis: l,
				ticks: d,
				bandSize: s,
				offset: o.offset,
				entry: e,
				index: n
			}), C = N - M, w = o.size, T = {
				x: m.left,
				y: S,
				width: m.width,
				height: w
			}, Math.abs(D) > 0 && Math.abs(C) < Math.abs(D)) {
				var ee = mt(C || D) * (Math.abs(D) - Math.abs(C));
				C += ee;
			}
		}
		return v == null || S == null || C == null || w == null || !a && (C === 0 || w === 0) ? null : BI(BI({}, e), {}, {
			stackedBarStart: x,
			x: v,
			y: S,
			width: C,
			height: w,
			value: f ? p : p[1],
			payload: e,
			background: T,
			tooltipPosition: {
				x: v + C / 2,
				y: S + w / 2
			},
			parentViewBox: g,
			originalDataIndex: n
		}, h && h[n] && h[n].props);
	}).filter(Boolean);
}
function cL(e) {
	var t = Ar(e, aL), n = wI(t.stackId), r = Il();
	return /*#__PURE__*/ P.createElement(RA, {
		id: t.id,
		type: "bar"
	}, (e) => /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(iA, { legendPayload: KI(t) }), /*#__PURE__*/ P.createElement(qI, {
		dataKey: t.dataKey,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		unit: t.unit,
		formatter: t.formatter,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ P.createElement(JA, {
		type: "bar",
		id: e,
		data: void 0,
		xAxisId: t.xAxisId,
		yAxisId: t.yAxisId,
		zAxisId: 0,
		dataKey: t.dataKey,
		stackId: n,
		hide: t.hide,
		barSize: t.barSize,
		minPointSize: t.minPointSize,
		maxBarSize: t.maxBarSize,
		isPanorama: r,
		hasCustomShape: t.shape != null && t.shape !== oI
	}), /*#__PURE__*/ P.createElement(hE, { zIndex: t.zIndex }, /*#__PURE__*/ P.createElement(oL, RI({}, t, { id: e })))));
}
var lL = /*#__PURE__*/ P.memo(cL, nd);
lL.displayName = "Bar";
// node_modules/recharts/es6/util/axisPropsAreEqual.js
var uL = ["domain", "range"], dL = ["domain", "range"];
function fL(e, t) {
	if (e == null) return {};
	var n, r, i = pL(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function pL(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function mL(e, t) {
	return e === t ? !0 : Array.isArray(e) && e.length === 2 && Array.isArray(t) && t.length === 2 ? e[0] === t[0] && e[1] === t[1] : !1;
}
function hL(e, t) {
	if (e === t) return !0;
	var n = e.domain, r = e.range, i = fL(e, uL), a = t.domain, o = t.range, s = fL(t, dL);
	return !mL(n, a) || !mL(r, o) ? !1 : nd(i, s);
}
// node_modules/recharts/es6/cartesian/XAxis.js
var gL = ["type"], _L = [
	"dangerouslySetInnerHTML",
	"ticks",
	"scale"
], vL = ["id", "scale"];
function yL() {
	return yL = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, yL.apply(null, arguments);
}
function bL(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function xL(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? bL(Object(n), !0).forEach(function(t) {
			SL(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bL(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function SL(e, t, n) {
	return (t = CL(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function CL(e) {
	var t = wL(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function wL(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function TL(e, t) {
	if (e == null) return {};
	var n, r, i = EL(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function EL(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function DL(e) {
	var t = z(), n = (0, P.useRef)(null), r = Tu(), i = e.type, a = TL(e, gL), o = Ih(r, "xAxis", i), s = (0, P.useMemo)(() => {
		if (o != null) return xL(xL({}, a), {}, { type: o });
	}, [a, o]);
	return (0, P.useLayoutEffect)(() => {
		s != null && (n.current === null ? t(hj(s)) : n.current !== s && t(gj({
			prev: n.current,
			next: s
		})), n.current = s);
	}, [s, t]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(_j(n.current)), null);
	}, [t]), null;
}
var OL = (e) => {
	var t = e.xAxisId, n = e.className, r = e.height, i = e.label, a = (0, P.useRef)(null), o = (0, P.useRef)(null), s = B(Pl), c = Il(), u = z(), d = "xAxis", f = B((e) => zC(e, d, t, c)), p = B((e) => EC(e, t)), m = B((e) => jC(e, t)), h = B((e) => Rx(e, t));
	if ((0, P.useLayoutEffect)(() => {
		if (!(r !== "auto" || !p || KO(i) || /*#__PURE__*/ (0, P.isValidElement)(i) || h == null)) {
			var e = a.current;
			if (e) {
				var n = e.getCalculatedHeight();
				Math.round(p.height) !== Math.round(n) && u(Sj({
					id: t,
					height: n
				}));
			}
		}
	}, [
		f,
		p,
		u,
		i,
		t,
		r,
		h
	]), p == null || m == null || h == null) return null;
	e.dangerouslySetInnerHTML, e.ticks, e.scale;
	var g = TL(e, _L);
	h.id, h.scale;
	var _ = TL(h, vL);
	return /*#__PURE__*/ P.createElement(NN, yL({}, g, _, {
		ref: a,
		labelRef: o,
		x: m.x,
		y: m.y,
		width: p.width,
		height: p.height,
		className: l(`recharts-${d} ${d}`, n),
		viewBox: s,
		ticks: f,
		axisType: d,
		axisId: t
	}));
}, kL = {
	allowDataOverflow: Lx.allowDataOverflow,
	allowDecimals: Lx.allowDecimals,
	allowDuplicatedCategory: Lx.allowDuplicatedCategory,
	angle: Lx.angle,
	axisLine: wN.axisLine,
	height: Lx.height,
	hide: !1,
	includeHidden: Lx.includeHidden,
	interval: Lx.interval,
	label: !1,
	minTickGap: Lx.minTickGap,
	mirror: Lx.mirror,
	orientation: Lx.orientation,
	padding: Lx.padding,
	reversed: Lx.reversed,
	scale: Lx.scale,
	tick: Lx.tick,
	tickCount: Lx.tickCount,
	tickLine: wN.tickLine,
	tickSize: wN.tickSize,
	type: Lx.type,
	niceTicks: Lx.niceTicks,
	xAxisId: 0
}, AL = /*#__PURE__*/ P.memo((e) => {
	var t = Ar(e, kL);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(DL, {
		allowDataOverflow: t.allowDataOverflow,
		allowDecimals: t.allowDecimals,
		allowDuplicatedCategory: t.allowDuplicatedCategory,
		angle: t.angle,
		dataKey: t.dataKey,
		domain: t.domain,
		height: t.height,
		hide: t.hide,
		id: t.xAxisId,
		includeHidden: t.includeHidden,
		interval: t.interval,
		minTickGap: t.minTickGap,
		mirror: t.mirror,
		name: t.name,
		orientation: t.orientation,
		padding: t.padding,
		reversed: t.reversed,
		scale: t.scale,
		tick: t.tick,
		tickCount: t.tickCount,
		tickFormatter: t.tickFormatter,
		ticks: t.ticks,
		type: t.type,
		unit: t.unit,
		niceTicks: t.niceTicks
	}), /*#__PURE__*/ P.createElement(OL, t));
}, hL);
AL.displayName = "XAxis";
// node_modules/recharts/es6/cartesian/YAxis.js
var jL = ["type"], ML = [
	"dangerouslySetInnerHTML",
	"ticks",
	"scale"
], NL = ["id", "scale"];
function PL() {
	return PL = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, PL.apply(null, arguments);
}
function FL(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function IL(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? FL(Object(n), !0).forEach(function(t) {
			LL(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : FL(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function LL(e, t, n) {
	return (t = RL(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function RL(e) {
	var t = zL(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function zL(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function BL(e, t) {
	if (e == null) return {};
	var n, r, i = VL(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function VL(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function HL(e) {
	var t = z(), n = (0, P.useRef)(null), r = Tu(), i = e.type, a = BL(e, jL), o = Ih(r, "yAxis", i), s = (0, P.useMemo)(() => {
		if (o != null) return IL(IL({}, a), {}, { type: o });
	}, [o, a]);
	return (0, P.useLayoutEffect)(() => {
		s != null && (n.current === null ? t(vj(s)) : n.current !== s && t(yj({
			prev: n.current,
			next: s
		})), n.current = s);
	}, [s, t]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(bj(n.current)), null);
	}, [t]), null;
}
function UL(e) {
	var t = e.yAxisId, n = e.className, r = e.width, i = e.label, a = (0, P.useRef)(null), o = (0, P.useRef)(null), s = B(Pl), c = Il(), u = z(), d = "yAxis", f = B((e) => NC(e, t)), p = B((e) => MC(e, t)), m = B((e) => zC(e, d, t, c)), h = B((e) => Vx(e, t));
	if ((0, P.useLayoutEffect)(() => {
		if (!(r !== "auto" || !f || KO(i) || /*#__PURE__*/ (0, P.isValidElement)(i) || h == null)) {
			var e = a.current;
			if (e) {
				var n = e.getCalculatedWidth();
				Math.round(f.width) !== Math.round(n) && u(xj({
					id: t,
					width: n
				}));
			}
		}
	}, [
		m,
		f,
		u,
		i,
		t,
		r,
		h
	]), f == null || p == null || h == null) return null;
	e.dangerouslySetInnerHTML, e.ticks, e.scale;
	var g = BL(e, ML);
	h.id, h.scale;
	var _ = BL(h, NL);
	return /*#__PURE__*/ P.createElement(NN, PL({}, g, _, {
		ref: a,
		labelRef: o,
		x: p.x,
		y: p.y,
		tickTextProps: r === "auto" ? { width: void 0 } : { width: r },
		width: f.width,
		height: f.height,
		className: l(`recharts-${d} ${d}`, n),
		viewBox: s,
		ticks: m,
		axisType: d,
		axisId: t
	}));
}
var WL = {
	allowDataOverflow: Bx.allowDataOverflow,
	allowDecimals: Bx.allowDecimals,
	allowDuplicatedCategory: Bx.allowDuplicatedCategory,
	angle: Bx.angle,
	axisLine: wN.axisLine,
	hide: !1,
	includeHidden: Bx.includeHidden,
	interval: Bx.interval,
	label: !1,
	minTickGap: Bx.minTickGap,
	mirror: Bx.mirror,
	orientation: Bx.orientation,
	padding: Bx.padding,
	reversed: Bx.reversed,
	scale: Bx.scale,
	tick: Bx.tick,
	tickCount: Bx.tickCount,
	tickLine: wN.tickLine,
	tickSize: wN.tickSize,
	type: Bx.type,
	niceTicks: Bx.niceTicks,
	width: Bx.width,
	yAxisId: 0
}, GL = /*#__PURE__*/ P.memo((e) => {
	var t = Ar(e, WL);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(HL, {
		interval: t.interval,
		id: t.yAxisId,
		scale: t.scale,
		type: t.type,
		domain: t.domain,
		allowDataOverflow: t.allowDataOverflow,
		dataKey: t.dataKey,
		allowDuplicatedCategory: t.allowDuplicatedCategory,
		allowDecimals: t.allowDecimals,
		tickCount: t.tickCount,
		padding: t.padding,
		includeHidden: t.includeHidden,
		reversed: t.reversed,
		ticks: t.ticks,
		width: t.width,
		orientation: t.orientation,
		mirror: t.mirror,
		hide: t.hide,
		unit: t.unit,
		name: t.name,
		angle: t.angle,
		minTickGap: t.minTickGap,
		tick: t.tick,
		tickFormatter: t.tickFormatter,
		niceTicks: t.niceTicks
	}), /*#__PURE__*/ P.createElement(UL, t));
}, hL);
GL.displayName = "YAxis";
var KL = V([
	(e, t) => t,
	K,
	eg,
	cg,
	iT,
	oT,
	zT,
	Ml
], ZT);
// node_modules/recharts/es6/util/getRelativeCoordinate.js
function qL(e) {
	return "getBBox" in e.currentTarget && typeof e.currentTarget.getBBox == "function";
}
function JL(e) {
	var t = e.currentTarget.getBoundingClientRect(), n, r;
	if (qL(e)) {
		var i = e.currentTarget.getBBox();
		n = i.width > 0 ? t.width / i.width : 1, r = i.height > 0 ? t.height / i.height : 1;
	} else {
		var a = e.currentTarget;
		n = a.offsetWidth > 0 ? t.width / a.offsetWidth : 1, r = a.offsetHeight > 0 ? t.height / a.offsetHeight : 1;
	}
	var o = (e, i) => ({
		relativeX: Math.round((e - t.left) / n),
		relativeY: Math.round((i - t.top) / r)
	});
	return "touches" in e ? Array.from(e.touches).map((e) => o(e.clientX, e.clientY)) : o(e.clientX, e.clientY);
}
// node_modules/recharts/es6/state/mouseEventsMiddleware.js
var YL = ws("mouseClick"), XL = jc();
XL.startListening({
	actionCreator: YL,
	effect: (e, t) => {
		var n = e.payload, r = KL(t.getState(), JL(n));
		r?.activeIndex != null && t.dispatch(lw({
			activeIndex: r.activeIndex,
			activeDataKey: void 0,
			activeCoordinate: r.activeCoordinate
		}));
	}
});
var ZL = ws("mouseMove"), QL = jc(), $L = null, eR = null, tR = null;
QL.startListening({
	actionCreator: ZL,
	effect: (e, t) => {
		var n = e.payload, r = t.getState().eventSettings, i = r.throttleDelay, a = r.throttledEvents, o = a === "all" || a?.includes("mousemove");
		$L !== null && (cancelAnimationFrame($L), $L = null), eR === null || typeof i == "number" && o || (clearTimeout(eR), eR = null), tR = JL(n);
		var s = () => {
			var e = t.getState(), n = qC(e, e.tooltip.settings.shared);
			if (!tR) $L = null, eR = null;
			else {
				if (n === "axis") {
					var r = KL(e, tR);
					r?.activeIndex == null ? t.dispatch(ow()) : t.dispatch(cw({
						activeIndex: r.activeIndex,
						activeDataKey: void 0,
						activeCoordinate: r.activeCoordinate
					}));
				}
				$L = null, eR = null;
			}
		};
		o ? i === "raf" ? $L = requestAnimationFrame(s) : typeof i == "number" && eR === null && (eR = setTimeout(s, i)) : s();
	}
});
// node_modules/recharts/es6/state/reduxDevtoolsJsonStringifyReplacer.js
function nR(e, t) {
	return t instanceof HTMLElement ? `HTMLElement <${t.tagName} class="${t.className}">` : t === window ? "global.window" : e === "children" && typeof t == "object" && t ? "<<CHILDREN>>" : t;
}
// node_modules/recharts/es6/state/rootPropsSlice.js
var rR = {
	accessibilityLayer: !0,
	barCategoryGap: "10%",
	barGap: 4,
	barSize: void 0,
	className: void 0,
	maxBarSize: void 0,
	stackOffset: "none",
	syncId: void 0,
	syncMethod: "index",
	baseValue: void 0,
	reverseStackOrder: !1
}, iR = Gs({
	name: "rootProps",
	initialState: rR,
	reducers: { updateOptions: (e, t) => {
		e.accessibilityLayer = t.payload.accessibilityLayer, e.barCategoryGap = t.payload.barCategoryGap, e.barGap = t.payload.barGap ?? rR.barGap, e.barSize = t.payload.barSize, e.maxBarSize = t.payload.maxBarSize, e.stackOffset = t.payload.stackOffset, e.syncId = t.payload.syncId, e.syncMethod = t.payload.syncMethod, e.className = t.payload.className, e.baseValue = t.payload.baseValue, e.reverseStackOrder = t.payload.reverseStackOrder;
	} }
}), aR = iR.reducer, oR = iR.actions.updateOptions, sR = Gs({
	name: "polarOptions",
	initialState: null,
	reducers: { updatePolarOptions: (e, t) => e === null ? t.payload : (e.startAngle = t.payload.startAngle, e.endAngle = t.payload.endAngle, e.cx = t.payload.cx, e.cy = t.payload.cy, e.innerRadius = t.payload.innerRadius, e.outerRadius = t.payload.outerRadius, e) }
}), cR = sR.actions.updatePolarOptions, lR = sR.reducer, uR = ws("keyDown"), dR = ws("focus"), fR = ws("blur"), pR = jc(), mR = null, hR = null, gR = null;
pR.startListening({
	actionCreator: uR,
	effect: (e, t) => {
		gR = e.payload, mR !== null && (cancelAnimationFrame(mR), mR = null);
		var n = t.getState().eventSettings, r = n.throttleDelay, i = n.throttledEvents, a = i === "all" || i.includes("keydown");
		hR === null || typeof r == "number" && a || (clearTimeout(hR), hR = null);
		var o = () => {
			try {
				var e = t.getState();
				if (e.rootProps.accessibilityLayer === !1) return;
				var n = e.tooltip.keyboardInteraction, r = gR;
				if (r !== "ArrowRight" && r !== "ArrowLeft" && r !== "Enter") return;
				var i = ww(n, Kw(e), vS(e), tT(e)), a = i == null ? -1 : Number(i), o = !Number.isFinite(a) || a < 0, s = oT(e), c = Kw(e), l = qC(e, e.tooltip.settings.shared);
				if (r === "Enter") {
					if (o) return;
					var u = WT(e, l, "hover", String(n.index));
					t.dispatch(dw({
						active: !n.active,
						activeIndex: n.index,
						activeCoordinate: u
					}));
					return;
				}
				var d = UC(e) === "left-to-right" ? 1 : -1, f = r === "ArrowRight" ? 1 : -1, p;
				if (o) {
					var m = vS(e), h = tT(e), g = f * d, _ = (e) => ({
						active: !1,
						index: String(e),
						dataKey: void 0,
						graphicalItemId: void 0,
						coordinate: void 0
					});
					if (p = -1, g > 0) {
						for (var v = 0; v < c.length; v++) if (ww(_(v), c, m, h) != null) {
							p = v;
							break;
						}
					} else for (var y = c.length - 1; y >= 0; y--) if (ww(_(y), c, m, h) != null) {
						p = y;
						break;
					}
					if (p < 0) return;
				} else {
					p = a + f * d;
					var b = s?.length || c.length;
					if (b === 0 || p >= b || p < 0) return;
				}
				var x = WT(e, l, "hover", String(p));
				t.dispatch(dw({
					active: !0,
					activeIndex: p.toString(),
					activeCoordinate: x
				}));
			} finally {
				mR = null, hR = null;
			}
		};
		a ? r === "raf" ? mR = requestAnimationFrame(o) : typeof r == "number" && hR === null && (o(), gR = null, hR = setTimeout(() => {
			gR ? o() : (hR = null, mR = null);
		}, r)) : o();
	}
}), pR.startListening({
	actionCreator: dR,
	effect: (e, t) => {
		var n = t.getState();
		if (n.rootProps.accessibilityLayer !== !1) {
			var r = n.tooltip.keyboardInteraction;
			if (!r.active && r.index == null) {
				var i = "0", a = WT(n, qC(n, n.tooltip.settings.shared), "hover", String(i));
				t.dispatch(dw({
					active: !0,
					activeIndex: i,
					activeCoordinate: a
				}));
			}
		}
	}
}), pR.startListening({
	actionCreator: fR,
	effect: (e, t) => {
		var n = t.getState();
		if (n.rootProps.accessibilityLayer !== !1) {
			var r = n.tooltip.keyboardInteraction;
			r.active && t.dispatch(dw({
				active: !1,
				activeIndex: r.index,
				activeCoordinate: r.coordinate
			}));
		}
	}
});
// node_modules/recharts/es6/util/createEventProxy.js
function _R(e) {
	e.persist();
	var t = e.currentTarget;
	return new Proxy(e, { get: (e, n) => {
		if (n === "currentTarget") return t;
		var r = Reflect.get(e, n);
		return typeof r == "function" ? r.bind(e) : r;
	} });
}
// node_modules/recharts/es6/state/externalEventsMiddleware.js
var vR = ws("externalEvent"), yR = jc(), bR = /* @__PURE__ */ new Map(), xR = /* @__PURE__ */ new Map(), SR = /* @__PURE__ */ new Map();
yR.startListening({
	actionCreator: vR,
	effect: (e, t) => {
		var n = e.payload, r = n.handler, i = n.reactEvent;
		if (r != null) {
			var a = i.type, o = _R(i);
			SR.set(a, {
				handler: r,
				reactEvent: o
			});
			var s = bR.get(a);
			s !== void 0 && (cancelAnimationFrame(s), bR.delete(a));
			var c = t.getState().eventSettings, l = c.throttleDelay, u = c.throttledEvents, d = u === "all" || u?.includes(a), f = xR.get(a);
			f === void 0 || typeof l == "number" && d || (clearTimeout(f), xR.delete(a));
			var p = () => {
				var e = SR.get(a);
				try {
					if (!e) return;
					var n = e.handler, r = e.reactEvent, i = t.getState(), o = {
						activeCoordinate: gT(i),
						activeDataKey: pT(i),
						activeIndex: dT(i),
						activeLabel: fT(i),
						activeTooltipIndex: dT(i),
						isTooltipActive: _T(i)
					};
					n && n(o, r);
				} finally {
					bR.delete(a), xR.delete(a), SR.delete(a);
				}
			};
			if (!d) p();
			else if (l === "raf") {
				var m = requestAnimationFrame(p);
				bR.set(a, m);
			} else if (typeof l == "number") {
				if (!xR.has(a)) {
					p();
					var h = setTimeout(p, l);
					xR.set(a, h);
				}
			} else p();
		}
	}
});
var CR = V([
	V([Ow], (e) => e.tooltipItemPayloads),
	(e, t) => t,
	(e, t, n) => n
], (e, t, n) => {
	if (t != null) {
		var r = e.find((e) => e.settings.graphicalItemId === n);
		if (r != null) {
			var i = r.getPosition;
			if (i != null) return i(t);
		}
	}
}), wR = ws("touchMove"), TR = jc(), ER = null, DR = null, OR = null, kR = null;
TR.startListening({
	actionCreator: wR,
	effect: (e, t) => {
		var n = e.payload;
		if (n.touches != null && n.touches.length !== 0) {
			kR = _R(n);
			var r = t.getState().eventSettings, i = r.throttleDelay, a = r.throttledEvents, o = a === "all" || a.includes("touchmove");
			ER !== null && (cancelAnimationFrame(ER), ER = null), DR === null || typeof i == "number" && o || (clearTimeout(DR), DR = null), OR = Array.from(n.touches).map((e) => JL({
				clientX: e.clientX,
				clientY: e.clientY,
				currentTarget: n.currentTarget
			}));
			var s = () => {
				if (kR != null) {
					var e = t.getState(), n = qC(e, e.tooltip.settings.shared);
					if (n === "axis") {
						var r = OR?.[0];
						if (r == null) {
							ER = null, DR = null;
							return;
						}
						var i = KL(e, r);
						i?.activeIndex != null && t.dispatch(cw({
							activeIndex: i.activeIndex,
							activeDataKey: void 0,
							activeCoordinate: i.activeCoordinate
						}));
					} else if (n === "item") {
						var a = kR.touches[0];
						if (document.elementFromPoint == null || a == null) return;
						var o = document.elementFromPoint(a.clientX, a.clientY);
						if (!o || !o.getAttribute) return;
						var s = o.getAttribute(bl), c = o.getAttribute("data-recharts-item-id") ?? void 0, l = Hw(e).find((e) => e.id === c);
						if (s == null || l == null || c == null) return;
						var u = l.dataKey, d = CR(e, s, c);
						t.dispatch(iw({
							activeDataKey: u,
							activeIndex: s,
							activeCoordinate: d,
							activeGraphicalItemId: c
						}));
					}
					ER = null, DR = null;
				}
			};
			o ? i === "raf" ? ER = requestAnimationFrame(s) : typeof i == "number" && DR === null && (s(), kR = null, DR = setTimeout(() => {
				kR ? s() : (DR = null, ER = null);
			}, i)) : s();
		}
	}
});
// node_modules/recharts/es6/state/eventSettingsSlice.js
var AR = {
	throttleDelay: "raf",
	throttledEvents: [
		"mousemove",
		"touchmove",
		"pointermove",
		"scroll",
		"wheel"
	]
}, jR = Gs({
	name: "eventSettings",
	initialState: AR,
	reducers: { setEventSettings: (e, t) => {
		t.payload.throttleDelay != null && (e.throttleDelay = t.payload.throttleDelay), t.payload.throttledEvents != null && (e.throttledEvents = H(t.payload.throttledEvents));
	} }
}), MR = jR.actions.setEventSettings, NR = jR.reducer, PR = qa({
	brush: tM,
	cartesianAxis: Cj,
	chartData: BE,
	errorBars: vP,
	eventSettings: NR,
	graphicalItems: qA,
	layout: zc,
	legend: Lu,
	options: NE,
	polarAxis: Nk,
	polarOptions: lR,
	referenceElements: uM,
	renderedTicks: lN,
	rootProps: aR,
	tooltip: fw,
	zIndex: mE
}), FR = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
	return Fs({
		reducer: PR,
		preloadedState: e,
		middleware: (e) => e({
			serializableCheck: !1,
			immutableCheck: ![
				"commonjs",
				"es6",
				"production"
			].includes("es6")
		}).concat([
			XL.middleware,
			QL.middleware,
			pR.middleware,
			yR.middleware,
			TR.middleware
		]),
		enhancers: (e) => {
			var t = e;
			return typeof e == "function" && (t = e()), t.concat(Ns({ type: "raf" }));
		},
		devTools: ef.devToolsEnabled && {
			serialize: { replacer: nR },
			name: `recharts-${t}`
		}
	});
};
// node_modules/recharts/es6/state/RechartsStoreProvider.js
function IR(e) {
	var t = e.preloadedState, n = e.children, r = e.reduxStoreName, i = Il(), a = (0, P.useRef)(null);
	if (i) return n;
	a.current ??= FR(t, r);
	var o = $i;
	return /*#__PURE__*/ P.createElement($u, {
		context: o,
		store: a.current
	}, n);
}
// node_modules/recharts/es6/state/ReportMainChartProps.js
function LR(e) {
	var t = e.layout, n = e.margin, r = z(), i = Il();
	return (0, P.useEffect)(() => {
		i || (r(Ic(t)), r(Fc(n)));
	}, [
		r,
		i,
		t,
		n
	]), null;
}
var RR = /*#__PURE__*/ (0, P.memo)(LR, nd);
// node_modules/recharts/es6/state/ReportChartProps.js
function zR(e) {
	var t = z();
	return (0, P.useEffect)(() => {
		t(oR(e));
	}, [t, e]), null;
}
var BR = /*#__PURE__*/ (0, P.memo)((e) => {
	var t = z();
	return (0, P.useEffect)(() => {
		t(MR(e));
	}, [t, e]), null;
}, nd);
// node_modules/recharts/es6/zIndex/ZIndexPortal.js
function VR(e) {
	var t = e.zIndex, n = e.isPanorama, r = (0, P.useRef)(null), i = z();
	return (0, P.useLayoutEffect)(() => (r.current && i(fE({
		zIndex: t,
		element: r.current,
		isPanorama: n
	})), () => {
		i(pE({
			zIndex: t,
			isPanorama: n
		}));
	}), [
		i,
		t,
		n
	]), /*#__PURE__*/ P.createElement("g", {
		tabIndex: -1,
		ref: r,
		className: `recharts-zIndex-layer_${t}`
	});
}
function HR(e) {
	var t = e.children, n = e.isPanorama, r = B($T);
	if (!r || r.length === 0) return t;
	var i = r.filter((e) => e < 0), a = r.filter((e) => e > 0);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, i.map((e) => /*#__PURE__*/ P.createElement(VR, {
		key: e,
		zIndex: e,
		isPanorama: n
	})), t, a.map((e) => /*#__PURE__*/ P.createElement(VR, {
		key: e,
		zIndex: e,
		isPanorama: n
	})));
}
// node_modules/recharts/es6/container/RootSurface.js
var UR = ["children"];
function WR(e, t) {
	if (e == null) return {};
	var n, r, i = GR(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function GR(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function KR() {
	return KR = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, KR.apply(null, arguments);
}
var qR = {
	width: "100%",
	height: "100%",
	display: "block"
}, JR = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = xu(), r = Su(), i = Cf();
	if (!Vc(n) || !Vc(r)) return null;
	var a = e.children, o = e.otherAttributes, s = e.title, c = e.desc, l, u;
	return o != null && (l = typeof o.tabIndex == "number" ? o.tabIndex : i ? 0 : void 0, u = typeof o.role == "string" ? o.role : i ? "application" : void 0), /*#__PURE__*/ P.createElement(Je, KR({}, o, {
		title: s,
		desc: c,
		role: u,
		tabIndex: l,
		width: n,
		height: r,
		style: qR,
		ref: t
	}), a);
}), YR = (e) => {
	var t = e.children, n = B(Rl);
	if (!n) return null;
	var r = n.width, i = n.height, a = n.y, o = n.x;
	return /*#__PURE__*/ P.createElement(Je, {
		width: r,
		height: i,
		x: o,
		y: a
	}, t);
}, XR = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.children, r = WR(e, UR);
	return Il() ? /*#__PURE__*/ P.createElement(YR, null, /*#__PURE__*/ P.createElement(HR, { isPanorama: !0 }, n)) : /*#__PURE__*/ P.createElement(JR, KR({ ref: t }, r), /*#__PURE__*/ P.createElement(HR, { isPanorama: !1 }, n));
});
// node_modules/recharts/es6/util/useReportScale.js
function ZR(e, t) {
	return nz(e) || tz(e, t) || $R(e, t) || QR();
}
function QR() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $R(e, t) {
	if (e) {
		if (typeof e == "string") return ez(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ez(e, t) : void 0;
	}
}
function ez(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function tz(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function nz(e) {
	if (Array.isArray(e)) return e;
}
function rz() {
	var e = z(), t = ZR((0, P.useState)(null), 2), n = t[0], r = t[1], i = B(gl);
	return (0, P.useEffect)(() => {
		if (n != null) {
			var t = n.getBoundingClientRect().width / n.offsetWidth;
			W(t) && t !== i && e(Rc(t));
		}
	}, [
		n,
		e,
		i
	]), r;
}
// node_modules/recharts/es6/chart/RechartsWrapper.js
function iz(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function az(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? iz(Object(n), !0).forEach(function(t) {
			oz(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : iz(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function oz(e, t, n) {
	return (t = sz(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function sz(e) {
	var t = cz(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function cz(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function lz() {
	return lz = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, lz.apply(null, arguments);
}
function uz(e, t) {
	return hz(e) || mz(e, t) || fz(e, t) || dz();
}
function dz() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function fz(e, t) {
	if (e) {
		if (typeof e == "string") return pz(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? pz(e, t) : void 0;
	}
}
function pz(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function mz(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function hz(e) {
	if (Array.isArray(e)) return e;
}
var gz = () => (ZE(), null);
function _z(e) {
	if (typeof e == "number") return e;
	if (typeof e == "string") {
		var t = parseFloat(e);
		if (!Number.isNaN(t)) return t;
	}
	return 0;
}
var vz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = (0, P.useRef)(null), r = uz((0, P.useState)({
		containerWidth: _z(e.style?.width),
		containerHeight: _z(e.style?.height)
	}), 2), i = r[0], a = r[1], o = (0, P.useCallback)((e, t) => {
		a((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []), s = (0, P.useCallback)((e) => {
		if (typeof t == "function" && t(e), n.current != null && (n.current.disconnect(), n.current = null), e != null && typeof ResizeObserver < "u") {
			var r = e.getBoundingClientRect(), i = r.width, a = r.height;
			o(i, a);
			var s = new ResizeObserver((e) => {
				var t = e[0];
				if (t != null) {
					var n = t.contentRect, r = n.width, i = n.height;
					o(r, i);
				}
			});
			s.observe(e), n.current = s;
		}
	}, [t, o]);
	return (0, P.useEffect)(() => () => {
		n.current?.disconnect();
	}, [o]), /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(ku, {
		width: i.containerWidth,
		height: i.containerHeight
	}), /*#__PURE__*/ P.createElement("div", lz({ ref: s }, e)));
}), yz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height, i = uz((0, P.useState)({
		containerWidth: _z(n),
		containerHeight: _z(r)
	}), 2), a = i[0], o = i[1], s = (0, P.useCallback)((e, t) => {
		o((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []), c = (0, P.useCallback)((e) => {
		if (typeof t == "function" && t(e), e != null) {
			var n = e.getBoundingClientRect(), r = n.width, i = n.height;
			s(r, i);
		}
	}, [t, s]);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(ku, {
		width: a.containerWidth,
		height: a.containerHeight
	}), /*#__PURE__*/ P.createElement("div", lz({ ref: c }, e)));
}), bz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height;
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(ku, {
		width: n,
		height: r
	}), /*#__PURE__*/ P.createElement("div", lz({ ref: t }, e)));
}), xz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height;
	return typeof n == "string" || typeof r == "string" ? /*#__PURE__*/ P.createElement(yz, lz({}, e, { ref: t })) : typeof n == "number" && typeof r == "number" ? /*#__PURE__*/ P.createElement(bz, lz({}, e, {
		width: n,
		height: r,
		ref: t
	})) : /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(ku, {
		width: n,
		height: r
	}), /*#__PURE__*/ P.createElement("div", lz({ ref: t }, e)));
});
function Sz(e) {
	return e ? vz : xz;
}
var Cz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.children, r = e.className, i = e.height, a = e.onClick, o = e.onContextMenu, s = e.onDoubleClick, c = e.onMouseDown, u = e.onMouseEnter, d = e.onMouseLeave, f = e.onMouseMove, p = e.onMouseUp, m = e.onTouchEnd, h = e.onTouchMove, g = e.onTouchStart, _ = e.style, v = e.width, y = e.responsive, b = e.dispatchTouchEvents, x = b === void 0 || b, S = (0, P.useRef)(null), C = z(), w = uz((0, P.useState)(null), 2), T = w[0], E = w[1], D = uz((0, P.useState)(null), 2), O = D[0], k = D[1], A = rz(), j = hu(), M = j?.width > 0 ? j.width : v, N = j?.height > 0 ? j.height : i, ee = (0, P.useCallback)((e) => {
		A(e), typeof t == "function" && t(e), E(e), k(e), e != null && (S.current = e);
	}, [
		A,
		t,
		E,
		k
	]), te = (0, P.useCallback)((e) => {
		C(YL(e)), C(vR({
			handler: a,
			reactEvent: e
		}));
	}, [C, a]), ne = (0, P.useCallback)((e) => {
		C(ZL(e)), C(vR({
			handler: u,
			reactEvent: e
		}));
	}, [C, u]), re = (0, P.useCallback)((e) => {
		C(ow()), C(vR({
			handler: d,
			reactEvent: e
		}));
	}, [C, d]), ie = (0, P.useCallback)((e) => {
		C(ZL(e)), C(vR({
			handler: f,
			reactEvent: e
		}));
	}, [C, f]), ae = (0, P.useCallback)(() => {
		C(dR());
	}, [C]), oe = (0, P.useCallback)(() => {
		C(fR());
	}, [C]), se = (0, P.useCallback)((e) => {
		C(uR(e.key));
	}, [C]), ce = (0, P.useCallback)((e) => {
		C(vR({
			handler: o,
			reactEvent: e
		}));
	}, [C, o]), le = (0, P.useCallback)((e) => {
		C(vR({
			handler: s,
			reactEvent: e
		}));
	}, [C, s]), ue = (0, P.useCallback)((e) => {
		C(vR({
			handler: c,
			reactEvent: e
		}));
	}, [C, c]), de = (0, P.useCallback)((e) => {
		C(vR({
			handler: p,
			reactEvent: e
		}));
	}, [C, p]), fe = (0, P.useCallback)((e) => {
		C(vR({
			handler: g,
			reactEvent: e
		}));
	}, [C, g]), pe = (0, P.useCallback)((e) => {
		x && C(wR(e)), C(vR({
			handler: h,
			reactEvent: e
		}));
	}, [
		C,
		x,
		h
	]), me = (0, P.useCallback)((e) => {
		C(vR({
			handler: m,
			reactEvent: e
		}));
	}, [C, m]), he = Sz(y);
	return /*#__PURE__*/ P.createElement(TE.Provider, { value: T }, /*#__PURE__*/ P.createElement(Ft.Provider, { value: O }, /*#__PURE__*/ P.createElement(he, {
		width: M ?? _?.width,
		height: N ?? _?.height,
		className: l("recharts-wrapper", r),
		style: az({
			position: "relative",
			cursor: "default",
			width: M,
			height: N
		}, _),
		onClick: te,
		onContextMenu: ce,
		onDoubleClick: le,
		onFocus: ae,
		onBlur: oe,
		onKeyDown: se,
		onMouseDown: ue,
		onMouseEnter: ne,
		onMouseLeave: re,
		onMouseMove: ie,
		onMouseUp: de,
		onTouchEnd: me,
		onTouchMove: pe,
		onTouchStart: fe,
		ref: ee
	}, /*#__PURE__*/ P.createElement(gz, null), n)));
}), wz = [
	"width",
	"height",
	"responsive",
	"children",
	"className",
	"style",
	"compact",
	"title",
	"desc"
];
function Tz(e, t) {
	if (e == null) return {};
	var n, r, i = Ez(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Ez(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Dz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height, i = e.responsive, a = e.children, o = e.className, s = e.style, c = e.compact, l = e.title, u = e.desc, d = Be(Tz(e, wz));
	return c ? /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(ku, {
		width: n,
		height: r
	}), /*#__PURE__*/ P.createElement(XR, {
		otherAttributes: d,
		title: l,
		desc: u
	}, a)) : /*#__PURE__*/ P.createElement(Cz, {
		className: o,
		style: s,
		width: n,
		height: r,
		responsive: i ?? !1,
		onClick: e.onClick,
		onMouseLeave: e.onMouseLeave,
		onMouseEnter: e.onMouseEnter,
		onMouseMove: e.onMouseMove,
		onMouseDown: e.onMouseDown,
		onMouseUp: e.onMouseUp,
		onContextMenu: e.onContextMenu,
		onDoubleClick: e.onDoubleClick,
		onTouchStart: e.onTouchStart,
		onTouchMove: e.onTouchMove,
		onTouchEnd: e.onTouchEnd
	}, /*#__PURE__*/ P.createElement(XR, {
		otherAttributes: d,
		title: l,
		desc: u,
		ref: t
	}, /*#__PURE__*/ P.createElement(vM, null, a)));
});
// node_modules/recharts/es6/chart/CartesianChart.js
function Oz() {
	return Oz = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Oz.apply(null, arguments);
}
function kz(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Az(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? kz(Object(n), !0).forEach(function(t) {
			jz(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : kz(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function jz(e, t, n) {
	return (t = Mz(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Mz(e) {
	var t = Nz(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Nz(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Pz = Az({
	accessibilityLayer: !0,
	barCategoryGap: "10%",
	barGap: 4,
	layout: "horizontal",
	margin: {
		top: 5,
		right: 5,
		bottom: 5,
		left: 5
	},
	responsive: !1,
	reverseStackOrder: !1,
	stackOffset: "none",
	syncMethod: "index"
}, AR), Fz = /*#__PURE__*/ (0, P.forwardRef)(function(e, t) {
	var n = Ar(e.categoricalChartProps, Pz), r = e.chartName, i = e.defaultTooltipEventType, a = e.validateTooltipEventTypes, o = e.tooltipPayloadSearcher, s = e.categoricalChartProps, c = {
		chartName: r,
		defaultTooltipEventType: i,
		validateTooltipEventTypes: a,
		tooltipPayloadSearcher: o,
		eventEmitter: void 0
	};
	return /*#__PURE__*/ P.createElement(IR, {
		preloadedState: { options: c },
		reduxStoreName: s.id ?? r
	}, /*#__PURE__*/ P.createElement(Qj, { chartData: s.data }), /*#__PURE__*/ P.createElement(RR, {
		layout: n.layout,
		margin: n.margin
	}), /*#__PURE__*/ P.createElement(BR, {
		throttleDelay: n.throttleDelay,
		throttledEvents: n.throttledEvents
	}), /*#__PURE__*/ P.createElement(zR, {
		baseValue: n.baseValue,
		accessibilityLayer: n.accessibilityLayer,
		barCategoryGap: n.barCategoryGap,
		maxBarSize: n.maxBarSize,
		stackOffset: n.stackOffset,
		barGap: n.barGap,
		barSize: n.barSize,
		syncId: n.syncId,
		syncMethod: n.syncMethod,
		className: n.className,
		reverseStackOrder: n.reverseStackOrder
	}), /*#__PURE__*/ P.createElement(Dz, Oz({}, n, { ref: t })));
}), Iz = ["axis"], Lz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => /*#__PURE__*/ P.createElement(Fz, {
	chartName: "LineChart",
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: Iz,
	tooltipPayloadSearcher: jE,
	categoricalChartProps: e,
	ref: t
})), Rz = ["axis", "item"], zz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => /*#__PURE__*/ P.createElement(Fz, {
	chartName: "BarChart",
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: Rz,
	tooltipPayloadSearcher: jE,
	categoricalChartProps: e,
	ref: t
}));
// node_modules/recharts/es6/state/ReportPolarOptions.js
function Bz(e) {
	var t = z();
	return (0, P.useEffect)(() => {
		t(cR(e));
	}, [t, e]), null;
}
// node_modules/recharts/es6/chart/PolarChart.js
var Vz = ["layout"];
function Hz() {
	return Hz = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Hz.apply(null, arguments);
}
function Uz(e, t) {
	if (e == null) return {};
	var n, r, i = Wz(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Wz(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Gz(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Kz(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Gz(Object(n), !0).forEach(function(t) {
			qz(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Gz(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function qz(e, t, n) {
	return (t = Jz(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Jz(e) {
	var t = Yz(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Yz(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Xz = Kz({
	accessibilityLayer: !0,
	stackOffset: "none",
	barCategoryGap: "10%",
	barGap: 4,
	margin: {
		top: 5,
		right: 5,
		bottom: 5,
		left: 5
	},
	reverseStackOrder: !1,
	syncMethod: "index",
	layout: "radial",
	responsive: !1,
	cx: "50%",
	cy: "50%",
	innerRadius: 0,
	outerRadius: "80%"
}, AR), Zz = /*#__PURE__*/ (0, P.forwardRef)(function(e, t) {
	var n = Ar(e.categoricalChartProps, Xz), r = n.layout, i = Uz(n, Vz), a = e.chartName, o = {
		chartName: a,
		defaultTooltipEventType: e.defaultTooltipEventType,
		validateTooltipEventTypes: e.validateTooltipEventTypes,
		tooltipPayloadSearcher: e.tooltipPayloadSearcher,
		eventEmitter: void 0
	};
	return /*#__PURE__*/ P.createElement(IR, {
		preloadedState: { options: o },
		reduxStoreName: n.id ?? a
	}, /*#__PURE__*/ P.createElement(Qj, { chartData: n.data }), /*#__PURE__*/ P.createElement(RR, {
		layout: r,
		margin: n.margin
	}), /*#__PURE__*/ P.createElement(BR, {
		throttleDelay: n.throttleDelay,
		throttledEvents: n.throttledEvents
	}), /*#__PURE__*/ P.createElement(zR, {
		baseValue: void 0,
		accessibilityLayer: n.accessibilityLayer,
		barCategoryGap: n.barCategoryGap,
		maxBarSize: n.maxBarSize,
		stackOffset: n.stackOffset,
		barGap: n.barGap,
		barSize: n.barSize,
		syncId: n.syncId,
		syncMethod: n.syncMethod,
		className: n.className,
		reverseStackOrder: n.reverseStackOrder
	}), /*#__PURE__*/ P.createElement(Bz, {
		cx: n.cx,
		cy: n.cy,
		startAngle: n.startAngle,
		endAngle: n.endAngle,
		innerRadius: n.innerRadius,
		outerRadius: n.outerRadius
	}), /*#__PURE__*/ P.createElement(Dz, Hz({}, i, { ref: t })));
}), Qz = ["axis"], $z = /*#__PURE__*/ (0, P.forwardRef)((e, t) => /*#__PURE__*/ P.createElement(Fz, {
	chartName: "AreaChart",
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: Qz,
	tooltipPayloadSearcher: jE,
	categoricalChartProps: e,
	ref: t
}));
// src/react/charts/cn.ts
function eB(...e) {
	return d(l(e));
}
// src/react/evilcharts/registry/ui/recharts-chart.tsx
var $ = y(), tB = {
	light: "",
	dark: ".dark"
}, nB = Object.keys(tB);
function rB(e) {
	for (let [t, n] of Object.entries(e)) if (n.colors && !nB.some((e) => n.colors?.[e] !== void 0)) throw Error(`[EvilCharts] Invalid chart config for "${t}": colors object must have at least one theme key (${nB.join(", ")}). Received empty object or invalid keys.`);
}
var iB = P.createContext(null);
function aB() {
	let e = P.useContext(iB);
	if (!e) throw Error("useChart must be used within a <ChartContainer />");
	return e;
}
function oB({ id: e, config: t, initialDimension: n = {
	width: 320,
	height: 200
}, className: r, children: i, footer: a, ...o }) {
	let s = P.useId(), c = `chart-${e ?? s.replace(/:/g, "")}`;
	return rB(t), /* @__PURE__ */ (0, $.jsx)(iB.Provider, {
		value: { config: t },
		children: /* @__PURE__ */ (0, $.jsxs)("div", {
			"data-slot": "chart",
			"data-chart": c,
			className: eB("min-h-0 w-full flex-1", "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border relative flex flex-col justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", !a && "aspect-video", r),
			...o,
			children: [
				/* @__PURE__ */ (0, $.jsx)(lB, {
					id: c,
					config: t
				}),
				/* @__PURE__ */ (0, $.jsx)(_u, {
					className: "min-h-0 w-full flex-1",
					initialDimension: n,
					children: i
				}),
				a
			]
		})
	});
}
function sB({ isLoading: e }) {
	return e ? /* @__PURE__ */ (0, $.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-20 flex items-center justify-center",
		children: /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "text-primary bg-background flex items-center justify-center gap-2 rounded-md border px-2 py-0.5 text-sm",
			children: [/* @__PURE__ */ (0, $.jsx)("div", { className: "border-border border-t-primary h-3 w-3 animate-spin rounded-full border" }), /* @__PURE__ */ (0, $.jsx)("span", { children: "Loading" })]
		})
	}) : null;
}
function cB(e, t) {
	let n = e.length;
	if (n >= t) return e.slice(0, t);
	let r = [], i = Math.floor(t / n), a = t % n;
	for (let t = 0; t < n; t++) {
		let o = i + +(t >= n - a);
		for (let n = 0; n < o; n++) r.push(e[t]);
	}
	return r;
}
var lB = ({ id: e, config: t }) => {
	let n = Object.entries(t).filter(([, e]) => e.colors);
	if (!n.length) return null;
	let r = (e) => n.flatMap(([t, n]) => {
		let r = n.colors?.[e];
		return !r || !Array.isArray(r) || r.length === 0 ? [] : cB(r, dB(n)).map((e, n) => `  --color-${t}-${n}: ${e};`);
	}).filter(Boolean).join("\n"), i = Object.entries(tB).map(([t, n]) => `${n} [data-chart=${e}] {\n${r(t)}\n}`).join("\n");
	return /* @__PURE__ */ (0, $.jsx)("style", { dangerouslySetInnerHTML: { __html: i } });
};
function uB(e, t, n) {
	if (typeof t != "object" || !t) return;
	let r = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0, i = n;
	return n in t && typeof t[n] == "string" ? i = t[n] : r && n in r && typeof r[n] == "string" && (i = r[n]), i in e ? e[i] : e[n];
}
function dB(e) {
	if (!e.colors) return 1;
	let t = nB.map((t) => e.colors?.[t]?.length ?? 0);
	return Math.max(...t, 1);
}
var fB = (e = 10, t = 0, n = 70) => {
	let r = n - t;
	return Array.from({ length: e }, () => ({ loading: Math.floor(Math.random() * r) + t }));
}, pB = {
	sm: "rounded-sm",
	md: "rounded-md",
	lg: "rounded-lg",
	xl: "rounded-xl"
}, mB = {
	default: "bg-background",
	"frosted-glass": "bg-background/70 backdrop-blur-sm"
};
function hB({ active: e, payload: t, className: n, indicator: r = "dot", hideLabel: i = !1, hideIndicator: a = !1, label: o, labelFormatter: s, labelClassName: c, formatter: l, nameKey: u, labelKey: d, selected: f, roundness: p = "lg", variant: m = "default" }) {
	let { config: h } = aB(), g = P.useMemo(() => {
		if (i || !t?.length) return null;
		let [e] = t, n = `${d ?? e?.dataKey ?? e?.name ?? "value"}`, r = uB(h, e, n), a = !d && typeof o == "string" ? h[o]?.label ?? o : r?.label;
		return s ? /* @__PURE__ */ (0, $.jsx)("div", {
			className: eB("font-medium", c),
			children: s(a, t)
		}) : a ? /* @__PURE__ */ (0, $.jsx)("div", {
			className: eB("font-medium", c),
			children: a
		}) : null;
	}, [
		o,
		s,
		t,
		i,
		c,
		h,
		d
	]);
	if (!e || !t?.length) return /* @__PURE__ */ (0, $.jsx)("span", { className: "p-4" });
	let _ = t.length === 1 && r !== "dot";
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: eB("border-border/50 grid min-w-32 items-start gap-1.5 border px-2.5 py-1.5 text-xs shadow-xl", pB[p], mB[m], n),
		children: [_ ? null : g, /* @__PURE__ */ (0, $.jsx)("div", {
			className: "grid gap-1.5",
			children: t.filter((e) => e.type !== "none").map((e, t) => {
				let n = `${(u && e.payload ? e.payload[u] : void 0) ?? e.name ?? e.dataKey ?? "value"}`, i = uB(h, e, n), o = i ? dB(i) : 1;
				return /* @__PURE__ */ (0, $.jsx)("div", {
					className: eB("[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5", r === "dot" && "items-center", f != null && f !== e.dataKey && "opacity-30"),
					children: l && e?.value !== void 0 && e.name ? l(e.value, e.name, e, t, e.payload) : /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [i?.icon ? /* @__PURE__ */ (0, $.jsx)(i.icon, {}) : !a && /* @__PURE__ */ (0, $.jsx)("div", {
						className: eB("shrink-0 rounded-[2px]", {
							"h-2.5 w-2.5": r === "dot",
							"w-1": r === "line",
							"w-0 border-[1.5px] border-dashed bg-transparent!": r === "dashed",
							"my-0.5": _ && r === "dashed"
						}),
						style: gB(n, o)
					}), /* @__PURE__ */ (0, $.jsxs)("div", {
						className: eB("flex flex-1 justify-between gap-4 leading-none", _ ? "items-end" : "items-center"),
						children: [/* @__PURE__ */ (0, $.jsxs)("div", {
							className: "grid gap-1.5",
							children: [_ ? g : null, /* @__PURE__ */ (0, $.jsx)("span", {
								className: "text-muted-foreground",
								children: i?.label ?? e.name
							})]
						}), e.value != null && /* @__PURE__ */ (0, $.jsx)("span", {
							className: "text-foreground font-mono font-medium tabular-nums",
							children: typeof e.value == "number" ? e.value.toLocaleString() : String(e.value)
						})]
					})] })
				}, t);
			})
		})]
	});
}
function gB(e, t) {
	return t <= 1 ? { background: `var(--color-${e}-0)` } : { background: `linear-gradient(to right, ${Array.from({ length: t }, (n, r) => `var(--color-${e}-${r}) ${r / (t - 1) * 100}%`).join(", ")})` };
}
var _B = ({ animationDuration: e = 200, ...t }) => /* @__PURE__ */ (0, $.jsx)(mD, {
	animationDuration: e,
	...t
});
// src/react/evilcharts/registry/ui/recharts-legend.tsx
function vB({ className: e, hideIcon: t = !1, nameKey: n, payload: r, verticalAlign: i, align: a = "right", selected: o, onSelectChange: s, isClickable: c, variant: l = "rounded-square" }) {
	let { config: u } = aB();
	return r?.length ? /* @__PURE__ */ (0, $.jsx)("div", {
		className: eB("flex items-center gap-4 select-none", a === "left" && "justify-start", a === "center" && "justify-center", a === "right" && "justify-end", i === "top" ? "pb-4" : "pt-4", e),
		children: r.filter((e) => e.type !== "none").map((e) => {
			let r = `${(n && e.payload ? e.payload[n] : void 0) ?? e.value ?? e.dataKey ?? "value"}`, i = uB(u, e, r), a = o === null || o === r, d = i ? dB(i) : 1;
			return /* @__PURE__ */ (0, $.jsxs)("div", {
				className: eB("[&>svg]:text-muted-foreground flex items-center gap-1.5 transition-opacity [&>svg]:h-3 [&>svg]:w-3", !a && "opacity-30", c && "cursor-pointer"),
				onClick: () => {
					c && s?.(o === r ? null : r);
				},
				children: [i?.icon && !t ? /* @__PURE__ */ (0, $.jsx)(i.icon, {}) : /* @__PURE__ */ (0, $.jsx)(yB, {
					variant: l,
					dataKey: r,
					colorsCount: d
				}), i?.label]
			}, r);
		})
	}) : null;
}
function yB({ variant: e, dataKey: t, colorsCount: n }) {
	let r = bB(t, n), i = xB(t, n);
	switch (e) {
		case "square": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2 w-2 shrink-0",
			style: r
		});
		case "circle": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2 w-2 shrink-0 rounded-full",
			style: r
		});
		case "circle-outline": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2.5 w-2.5 shrink-0 rounded-full p-[1.5px]",
			style: i
		});
		case "vertical-bar": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-3 w-1 shrink-0 rounded-[2px]",
			style: r
		});
		case "horizontal-bar": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-1 w-3 shrink-0 rounded-[2px]",
			style: r
		});
		case "rounded-square-outline": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2.5 w-2.5 shrink-0 rounded-[3px] p-[1.5px]",
			style: i
		});
		default: return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2 w-2 shrink-0 rounded-[2px]",
			style: r
		});
	}
}
function bB(e, t) {
	return t <= 1 ? { backgroundColor: `var(--color-${e}-0)` } : { background: `linear-gradient(to right, ${Array.from({ length: t }, (n, r) => `var(--color-${e}-${r}) ${r / (t - 1) * 100}%`).join(", ")})` };
}
function xB(e, t) {
	let n = {
		WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
		WebkitMaskComposite: "xor",
		mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
		maskComposite: "exclude"
	};
	return t <= 1 ? {
		backgroundColor: `var(--color-${e}-0)`,
		...n
	} : {
		background: `linear-gradient(to right, ${Array.from({ length: t }, (n, r) => `var(--color-${e}-${r}) ${r / (t - 1) * 100}%`).join(", ")})`,
		...n
	};
}
var SB = jd, CB = () => null, wB = {
	stiffness: 300,
	damping: 35,
	mass: .8
};
function TB({ range: e, totalPoints: t, containerRef: n, commit: r }) {
	let i = P.useRef(null), [a, o] = P.useState(!1), s = (0, P.useCallback)((e) => !n.current || t <= 1 ? 0 : Math.round(e / n.current.getBoundingClientRect().width * (t - 1)), [t, n]), c = (0, P.useCallback)((t, n) => {
		t.preventDefault(), t.target.setPointerCapture(t.pointerId), i.current = {
			type: n,
			originX: t.clientX,
			originRange: { ...e }
		}, o(!0);
	}, [e]), l = (0, P.useCallback)((e) => {
		let n = i.current;
		if (!n) return;
		let a = s(e.clientX - n.originX), { type: o, originRange: c } = n;
		if (o === "left") r({
			startIndex: c.startIndex + a,
			endIndex: c.endIndex
		}, "left");
		else if (o === "right") r({
			startIndex: c.startIndex,
			endIndex: c.endIndex + a
		}, "right");
		else {
			let e = c.endIndex - c.startIndex, n = c.startIndex + a, i = n + e;
			n < 0 && (n = 0, i = e), i > t - 1 && (i = t - 1, n = Math.max(0, i - e)), r({
				startIndex: n,
				endIndex: i
			}, "middle");
		}
	}, [
		s,
		t,
		r
	]), u = (0, P.useCallback)((e) => {
		e.target.releasePointerCapture(e.pointerId), i.current = null, o(!1);
	}, []);
	return {
		isDragging: a,
		bind: (0, P.useCallback)((e) => ({
			onPointerDown: (t) => c(t, e),
			onPointerMove: l,
			onPointerUp: u
		}), [
			c,
			l,
			u
		])
	};
}
function EB({ data: e, chartConfig: t, dataKeys: n, xDataKey: r, variant: i = "area", height: a = 56, className: o, stacked: s = !1, strokeVariant: c = "solid", connectNulls: l = !1, barRadius: u, startIndex: d, endIndex: f, defaultStartIndex: p = 0, defaultEndIndex: m, onChange: h, formatLabel: g, curveType: v = "monotone", minSpan: y = 2, showLabels: b = !0, skipStyle: x = !1 }) {
	let S = P.useRef(null), C = P.useMemo(() => n ?? Object.keys(t), [n, t]), w = e.length, T = P.useId().replace(/:/g, ""), E = d !== void 0 && f !== void 0, [D, O] = P.useState(() => ({
		startIndex: Math.max(0, Math.min(p, w - 1)),
		endIndex: Math.max(0, Math.min(m ?? w - 1, w - 1))
	})), k = P.useRef(D);
	(0, P.useEffect)(() => {
		E || O((e) => {
			let t = {
				startIndex: Math.min(e.startIndex, Math.max(0, w - 1)),
				endIndex: Math.min(e.endIndex, Math.max(0, w - 1))
			};
			return k.current = t, t;
		});
	}, [w, E]);
	let A = (0, P.useCallback)((e, t) => {
		let { startIndex: n, endIndex: r } = e, i = Math.max(0, w - 1);
		if (n = Math.max(0, Math.min(n, i)), r = Math.max(0, Math.min(r, i)), t === "left") {
			let e = Math.max(0, r - y);
			return n = Math.min(n, e), {
				startIndex: n,
				endIndex: r
			};
		}
		if (t === "right") {
			let e = Math.min(i, n + y);
			return r = Math.max(r, e), {
				startIndex: n,
				endIndex: r
			};
		}
		return r - n < y && (r = Math.min(n + y, i), r - n < y && (n = Math.max(0, r - y))), {
			startIndex: n,
			endIndex: r
		};
	}, [w, y]), { isDragging: j, bind: M } = TB({
		range: D,
		totalPoints: w,
		containerRef: S,
		commit: (0, P.useCallback)((e, t) => {
			let n = A(e, t), r = k.current;
			(r.startIndex !== n.startIndex || r.endIndex !== n.endIndex) && (k.current = n, O(n), P.startTransition(() => {
				h?.(n);
			}));
		}, [A, h])
	}), N = D;
	(0, P.useEffect)(() => {
		if (E && !j) {
			let e = {
				startIndex: d,
				endIndex: f
			};
			O(e), k.current = e;
		}
	}, [
		E,
		d,
		f,
		j
	]);
	let ee = w > 1 ? N.startIndex / (w - 1) * 100 : 0, te = w > 1 ? N.endIndex / (w - 1) * 100 : 100, ie = re(ee), ae = re(te);
	ie.get() !== ee && ie.set(ee), ae.get() !== te && ae.set(te);
	let oe = se(ie, wB), le = se(ae, wB), ue = ce(oe, (e) => `${e}%`), de = ce(le, (e) => `${e}%`), fe = ce(oe, (e) => `${e}%`), pe = ce(le, (e) => `${Math.max(0, 100 - e)}%`), me = re(`${Math.max(0, te - ee)}%`), he = (0, P.useCallback)(() => {
		me.set(`${Math.max(0, le.get() - oe.get())}%`);
	}, [
		oe,
		le,
		me
	]);
	ne(oe, "change", he), ne(le, "change", he);
	let ge = (0, P.useCallback)((t) => {
		if (!r) return String(t);
		let n = e[t]?.[r];
		return g ? g(n, t) : String(n ?? t);
	}, [
		e,
		r,
		g
	]);
	return w === 0 ? null : /* @__PURE__ */ (0, $.jsxs)("div", {
		ref: S,
		"data-chart": x ? void 0 : T,
		className: eB("group relative select-none", o),
		style: { height: a },
		children: [
			!x && /* @__PURE__ */ (0, $.jsx)(lB, {
				id: T,
				config: t
			}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "absolute inset-0 overflow-hidden rounded-md",
				children: /* @__PURE__ */ (0, $.jsx)(OB, {
					data: e,
					keys: C,
					chartConfig: t,
					variant: i,
					curveType: v,
					chartId: T,
					stacked: s,
					strokeVariant: c === "animated-dashed" ? "dashed" : c,
					connectNulls: l,
					barRadius: u
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(_.div, {
				className: "bg-background/70 pointer-events-none absolute inset-y-0 left-0 rounded-l-md backdrop-blur-[2px]",
				style: { width: fe }
			}),
			/* @__PURE__ */ (0, $.jsx)(_.div, {
				className: "bg-background/70 pointer-events-none absolute inset-y-0 right-0 rounded-r-md backdrop-blur-[2px]",
				style: { width: pe }
			}),
			/* @__PURE__ */ (0, $.jsx)(_.div, {
				className: "absolute inset-y-0 cursor-grab touch-none rounded-sm border active:cursor-grabbing",
				style: {
					left: ue,
					width: me
				},
				...M("middle")
			}),
			/* @__PURE__ */ (0, $.jsx)(DB, {
				side: "left",
				position: ue,
				label: b ? ge(N.startIndex) : void 0,
				bind: M("left")
			}),
			/* @__PURE__ */ (0, $.jsx)(DB, {
				side: "right",
				position: de,
				label: b ? ge(N.endIndex) : void 0,
				bind: M("right")
			})
		]
	});
}
function DB({ side: e, position: t, label: n, bind: r }) {
	let i = e === "left";
	return /* @__PURE__ */ (0, $.jsxs)(_.div, {
		className: "absolute inset-y-0 z-10",
		style: { left: t },
		children: [/* @__PURE__ */ (0, $.jsx)("div", {
			className: eB("group absolute inset-y-0 flex w-3 cursor-ew-resize touch-none items-center justify-center after:absolute after:inset-y-0 after:-left-4 after:w-11 after:content-['']", i ? "" : "-translate-x-full"),
			...r,
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				className: eB("bg-muted-foreground group-hover:bg-foreground relative flex h-4 w-1.5 items-center justify-center rounded-md transition-colors", i ? "-left-[5.5px]" : "-right-[5.5px]"),
				children: /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-col gap-[2px]",
					children: [
						/* @__PURE__ */ (0, $.jsx)("div", { className: "bg-background/70 h-[2px] w-[2px] rounded-full" }),
						/* @__PURE__ */ (0, $.jsx)("div", { className: "bg-background/70 h-[2px] w-[2px] rounded-full" }),
						/* @__PURE__ */ (0, $.jsx)("div", { className: "bg-background/70 h-[2px] w-[2px] rounded-full" })
					]
				})
			})
		}), n && /* @__PURE__ */ (0, $.jsx)("div", {
			className: eB("bg-foreground text-background pointer-events-none absolute -bottom-3 -translate-y-1/2 rounded-[3px] px-1 py-px text-[8px] leading-tight font-medium whitespace-nowrap opacity-0 group-hover:opacity-100", i ? "left-1.5" : "right-1.5"),
			children: n
		})]
	});
}
function OB({ data: e, keys: t, chartConfig: n, variant: r, curveType: i, chartId: a, stacked: o, strokeVariant: s = "solid", connectNulls: c = !1, barRadius: l }) {
	let u = P.useMemo(() => Object.entries(n).filter(([e]) => t.includes(e)).map(([e, t]) => ({
		dataKey: e,
		colorsCount: dB(t)
	})), [n, t]), d = s === "dashed" || s === "animated-dashed" ? "4 4" : void 0, f = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [r === "area" && /* @__PURE__ */ (0, $.jsxs)("linearGradient", {
		id: `${a}-zm-vertical-fade`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: "white",
			stopOpacity: .15
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: "white",
			stopOpacity: 0
		})]
	}), u.map(({ dataKey: e, colorsCount: t }) => {
		let n = t === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: `var(--color-${e}-0)`
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: `var(--color-${e}-0)`
		})] }) : Array.from({ length: t }, (n, r) => /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: `${r / (t - 1) * 100}%`,
			stopColor: `var(--color-${e}-${r}, var(--color-${e}-0))`
		}, r));
		return /* @__PURE__ */ (0, $.jsxs)(P.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${a}-zm-${e}`,
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "1",
			children: n
		}), r === "area" && /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${a}-zm-fill-mask-${e}`,
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				width: "100%",
				height: "100%",
				fill: `url(#${a}-zm-vertical-fade)`
			})
		}), /* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${a}-zm-fill-${e}`,
			patternUnits: "userSpaceOnUse",
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				width: "100%",
				height: "100%",
				fill: `url(#${a}-zm-${e})`,
				mask: `url(#${a}-zm-fill-mask-${e})`
			})
		})] })] }, e);
	})] });
	if (r === "line") return /* @__PURE__ */ (0, $.jsx)(_u, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsxs)(Lz, {
			data: e,
			margin: {
				top: 4,
				right: 0,
				bottom: 0,
				left: 0
			},
			children: [/* @__PURE__ */ (0, $.jsx)("defs", { children: f }), t.map((e) => /* @__PURE__ */ (0, $.jsx)(sF, {
				type: i,
				dataKey: e,
				stroke: `url(#${a}-zm-${e})`,
				strokeWidth: 1,
				strokeOpacity: .5,
				strokeDasharray: d,
				connectNulls: c,
				dot: !1,
				activeDot: !1,
				isAnimationActive: !1
			}, e))]
		})
	});
	if (r === "bar") {
		let n = l ?? 3;
		return /* @__PURE__ */ (0, $.jsx)(_u, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, $.jsxs)(zz, {
				data: e,
				margin: {
					top: 2,
					right: 0,
					bottom: 0,
					left: 0
				},
				barGap: 2,
				barSize: 14,
				children: [/* @__PURE__ */ (0, $.jsx)("defs", { children: f }), t.map((e) => /* @__PURE__ */ (0, $.jsx)(lL, {
					dataKey: e,
					fill: `url(#${a}-zm-${e})`,
					fillOpacity: .35,
					stackId: o ? "zm-stack" : void 0,
					isAnimationActive: !1,
					radius: [
						n,
						n,
						n,
						n
					]
				}, e))]
			})
		});
	}
	return /* @__PURE__ */ (0, $.jsx)(_u, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsxs)($z, {
			data: e,
			margin: {
				top: 4,
				right: 0,
				bottom: 0,
				left: 0
			},
			children: [/* @__PURE__ */ (0, $.jsx)("defs", { children: f }), t.map((e) => /* @__PURE__ */ (0, $.jsx)(eI, {
				type: i,
				dataKey: e,
				stroke: `url(#${a}-zm-${e})`,
				fill: `url(#${a}-zm-fill-${e})`,
				strokeWidth: 1,
				strokeOpacity: .5,
				strokeDasharray: d,
				connectNulls: c,
				fillOpacity: 1,
				stackId: o ? "zm-stack" : void 0,
				dot: !1,
				activeDot: !1,
				isAnimationActive: !1
			}, e))]
		})
	});
}
function kB({ data: e, defaultStartIndex: t = 0, defaultEndIndex: n }) {
	let [r, i] = P.useState({
		startIndex: t,
		endIndex: n ?? Math.max(0, e.length - 1)
	}), a = P.useDeferredValue(r);
	return (0, P.useEffect)(() => {
		i({
			startIndex: 0,
			endIndex: Math.max(0, e.length - 1)
		});
	}, [e.length]), {
		range: r,
		visibleData: P.useMemo(() => e.slice(a.startIndex, a.endIndex + 1), [
			e,
			a.startIndex,
			a.endIndex
		]),
		brushProps: {
			startIndex: r.startIndex,
			endIndex: r.endIndex,
			onChange: i
		}
	};
}
var AB = {
	dots: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "20",
		height: "20",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("circle", {
			className: "text-border dark:text-border",
			cx: "2",
			cy: "2",
			r: "1",
			fill: "currentColor"
		})
	}),
	grid: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "20",
		height: "20",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M 20 0 L 0 0 0 20",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "0.5"
		})
	}),
	plus: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "16",
		height: "16",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M 8 4 L 8 12 M 4 8 L 12 8",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "0.5",
			strokeLinecap: "round"
		})
	}),
	bubbles: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "100",
		height: "100",
		patternUnits: "userSpaceOnUse",
		patternTransform: "scale(0.6667)",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z",
			fill: "currentColor",
			fillOpacity: "0.4",
			fillRule: "evenodd"
		})
	}),
	"cross-hatch": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "20",
		height: "20",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border/60 dark:text-border/50",
			d: "M 0 0 L 20 20 M 20 0 L 0 20",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "0.5"
		})
	}),
	"diagonal-lines": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "6",
		height: "6",
		patternUnits: "userSpaceOnUse",
		patternTransform: "rotate(45)",
		children: /* @__PURE__ */ (0, $.jsx)("line", {
			className: "text-border dark:text-border",
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "6",
			stroke: "currentColor",
			strokeWidth: "0.5"
		})
	}),
	"falling-triangles": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "18",
		height: "36",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z",
			transform: "scale(0.5)",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	}),
	"4-pointed-star": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "16",
		height: "16",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("polygon", {
			className: "text-border dark:text-border",
			fillRule: "evenodd",
			points: "5 3 8 4 5 5 4 8 3 5 0 4 3 3 4 0 5 3",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	}),
	"tiny-checkers": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "8",
		height: "8",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			fillRule: "evenodd",
			d: "M0 0h4v4H0V0zm4 4h4v4H4V4z",
			fill: "currentColor",
			fillOpacity: "0.2"
		})
	}),
	"overlapping-circles": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "40",
		height: "40",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			fillRule: "evenodd",
			d: "M25 25c0-2.762 2.238-5 5-5s5 2.238 5 5-2.238 5-5 5c0 2.762-2.238 5-5 5s-5-2.238-5-5 2.238-5 5-5zM5 5c0-2.762 2.238-5 5-5s5 2.238 5 5-2.238 5-5 5c0 2.762-2.238 5-5 5S0 12.762 0 10s2.238-5 5-5zm5 4c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm20 20c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	}),
	"wiggle-lines": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "52",
		height: "26",
		patternUnits: "userSpaceOnUse",
		patternTransform: "scale(0.6)",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	})
};
function jB({ variant: e }) {
	let t = (0, P.useId)().replace(/:/g, ""), n = `${t}-bg-${e}`, r = `${t}-bg-edge-fade`, i = `${t}-bg-blur`, a = AB[e];
	return /* @__PURE__ */ (0, $.jsxs)(hE, {
		zIndex: -1,
		children: [/* @__PURE__ */ (0, $.jsxs)("defs", { children: [
			/* @__PURE__ */ (0, $.jsx)(a, { id: n }),
			/* @__PURE__ */ (0, $.jsx)("filter", {
				id: i,
				children: /* @__PURE__ */ (0, $.jsx)("feGaussianBlur", { stdDeviation: "25" })
			}),
			/* @__PURE__ */ (0, $.jsx)("mask", {
				id: r,
				maskUnits: "userSpaceOnUse",
				children: /* @__PURE__ */ (0, $.jsx)("rect", {
					x: "8%",
					y: "20%",
					width: "85%",
					height: "60%",
					fill: "white",
					filter: `url(#${i})`
				})
			})
		] }), /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${n})`,
			mask: `url(#${r})`
		})]
	});
}
// src/react/evilcharts/registry/charts/recharts-bar-chart.tsx
var MB = 2, NB = "loading", PB = 2e3, FB = "evil-stacked", IB = .5, LB = .05, RB = [
	0,
	.7,
	.5,
	1
], zB = (0, P.createContext)(null);
function BB() {
	let e = (0, P.use)(zB);
	if (!e) throw Error("Bar chart parts (<Bar />, <XAxis />, …) must be used within <EvilBarChart />");
	return e;
}
function VB({ config: e, data: t, children: n, className: r, chartProps: i, stackType: a = "default", layout: o = "vertical", barRadius: s = MB, animationType: c = "left-to-right", barGap: l, barCategoryGap: u, backgroundVariant: d, defaultSelectedDataKey: f = null, onSelectionChange: p, isLoading: m = !1, loadingBars: h, xDataKey: g }) {
	let _ = (0, P.useId)().replace(/:/g, ""), [v] = (0, P.useState)(() => Date.now()), [y, b] = (0, P.useState)(f), [x, S] = (0, P.useState)(!1), { loadingData: C, onShimmerExit: w } = sV(m, h), { visibleData: T, brushProps: E } = kB({ data: t }), D = (0, P.useMemo)(() => {
		let e = P.Children.toArray(n), t = e.find((e) => (0, P.isValidElement)(e) && e.type === CB), r = (0, P.isValidElement)(t) ? t.props : {};
		return {
			slot: {
				present: (0, P.isValidElement)(t),
				height: r.height,
				formatLabel: r.formatLabel,
				onChange: r.onChange
			},
			chartChildren: e.filter((e) => !((0, P.isValidElement)(e) && e.type === CB))
		};
	}, [n]), O = D.slot.present, k = a === "stacked" || a === "percent", A = o === "horizontal", j = O && !m ? T : t, M = (0, P.useCallback)((e) => {
		b(e), p?.(e);
	}, [p]), N = (0, P.useMemo)(() => ({
		config: e,
		isStacked: k,
		isHorizontal: A,
		isLoading: m,
		barRadius: s,
		animationType: c,
		introStartedAt: v,
		dataLength: j.length,
		selectedDataKey: y,
		selectDataKey: M,
		isMouseInChart: x
	}), [
		e,
		k,
		A,
		m,
		s,
		c,
		v,
		j.length,
		y,
		M,
		x
	]);
	return /* @__PURE__ */ (0, $.jsx)(zB, {
		value: N,
		children: /* @__PURE__ */ (0, $.jsxs)(oB, {
			className: r,
			config: e,
			footer: O && !m && /* @__PURE__ */ (0, $.jsx)(EB, {
				data: t,
				chartConfig: e,
				xDataKey: g,
				variant: "bar",
				barRadius: s,
				height: D.slot.height,
				formatLabel: D.slot.formatLabel,
				stacked: k,
				skipStyle: !0,
				className: "mt-1",
				...E,
				onChange: (e) => {
					E.onChange(e), D.slot.onChange?.(e);
				}
			}),
			children: [/* @__PURE__ */ (0, $.jsx)(sB, { isLoading: m }), /* @__PURE__ */ (0, $.jsxs)(zz, {
				id: _,
				accessibilityLayer: !0,
				layout: A ? "vertical" : "horizontal",
				data: m ? C : j,
				barGap: l,
				barCategoryGap: u,
				stackOffset: a === "percent" ? "expand" : void 0,
				onMouseEnter: () => S(!0),
				onMouseLeave: () => S(!1),
				...i,
				children: [
					d && /* @__PURE__ */ (0, $.jsx)(jB, { variant: d }),
					/* @__PURE__ */ (0, $.jsx)(FM, { color: "white" }),
					D.chartChildren,
					m && /* @__PURE__ */ (0, $.jsx)(cV, {
						chartId: _,
						onShimmerExit: w
					})
				]
			})]
		})
	});
}
function HB({ dataKey: e, variant: t = "default", radius: n, animationType: r, isClickable: i = !1, enableHoverHighlight: a = !1, glowing: o = !1, bufferBar: s = !1, barProps: c }) {
	let { config: l, isStacked: u, isHorizontal: d, isLoading: f, barRadius: p, animationType: m, introStartedAt: h, dataLength: g, selectedDataKey: _, selectDataKey: v, isMouseInChart: y } = BB(), b = (0, P.useId)().replace(/:/g, ""), x = O();
	if (f) return null;
	let S = n ?? p, C = _ === e, w = x ? "none" : r ?? m, T = {
		id: b,
		dataKey: e,
		variant: t,
		barRadius: S,
		glowing: o,
		bufferBar: s,
		isClickable: i,
		enableHoverHighlight: a,
		isMouseInChart: y,
		isHorizontal: d,
		introStartedAt: h,
		selectedDataKey: _,
		dataLength: g,
		onClick: () => {
			i && v(C ? null : e);
		}
	};
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(lL, {
		dataKey: e,
		stackId: u ? FB : void 0,
		fill: `url(#${b}-colors-${e})`,
		radius: S,
		isAnimationActive: !1,
		style: i || a ? { cursor: "pointer" } : void 0,
		shape: (e) => /* @__PURE__ */ (0, $.jsx)(JB, {
			...e,
			...T,
			animationType: w
		}),
		activeBar: (e) => /* @__PURE__ */ (0, $.jsx)(JB, {
			...e,
			...T,
			animationType: "none"
		}),
		...c
	}), /* @__PURE__ */ (0, $.jsxs)("defs", { children: [
		/* @__PURE__ */ (0, $.jsx)(QB, {
			id: b,
			dataKey: e,
			config: l
		}),
		t === "hatched" && /* @__PURE__ */ (0, $.jsx)($B, {
			id: b,
			dataKey: e
		}),
		t === "duotone" && /* @__PURE__ */ (0, $.jsx)(tV, {
			id: b,
			dataKey: e,
			config: l
		}),
		t === "duotone-reverse" && /* @__PURE__ */ (0, $.jsx)(nV, {
			id: b,
			dataKey: e,
			config: l
		}),
		t === "gradient" && /* @__PURE__ */ (0, $.jsx)(rV, {
			id: b,
			dataKey: e
		}),
		t === "stripped" && /* @__PURE__ */ (0, $.jsx)(iV, {
			id: b,
			dataKey: e
		}),
		s && /* @__PURE__ */ (0, $.jsx)(eV, {
			id: b,
			dataKey: e
		}),
		o && /* @__PURE__ */ (0, $.jsx)(aV, {
			id: b,
			dataKey: e
		})
	] })] });
}
function UB({ tickLine: e = !1, axisLine: t = !1, tickMargin: n = 8, minTickGap: r = 8, type: i, ...a }) {
	let { isLoading: o, isHorizontal: s } = BB();
	return o ? null : /* @__PURE__ */ (0, $.jsx)(AL, {
		tickLine: e,
		axisLine: t,
		tickMargin: n,
		minTickGap: r,
		type: i ?? (s ? "number" : "category"),
		...a
	});
}
function WB({ tickLine: e = !1, axisLine: t = !1, tickMargin: n = 8, minTickGap: r = 8, width: i = "auto", type: a, ...o }) {
	let { isLoading: s, isHorizontal: c } = BB();
	return s ? null : /* @__PURE__ */ (0, $.jsx)(GL, {
		tickLine: e,
		axisLine: t,
		tickMargin: n,
		minTickGap: r,
		width: i,
		type: a ?? (c ? "category" : "number"),
		...o
	});
}
function GB({ strokeDasharray: e = "3 3", vertical: t, horizontal: n, ...r }) {
	let { isHorizontal: i } = BB();
	return /* @__PURE__ */ (0, $.jsx)(rP, {
		strokeDasharray: e,
		vertical: t ?? i,
		horizontal: n ?? !i,
		...r
	});
}
function KB({ variant: e, roundness: t, defaultIndex: n }) {
	let { isLoading: r, selectedDataKey: i } = BB();
	return r ? null : /* @__PURE__ */ (0, $.jsx)(_B, {
		cursor: !1,
		defaultIndex: n,
		content: /* @__PURE__ */ (0, $.jsx)(hB, {
			selected: i,
			roundness: t,
			variant: e
		})
	});
}
function qB({ variant: e, align: t = "right", verticalAlign: n = "top", isClickable: r = !1 }) {
	let { selectedDataKey: i, selectDataKey: a } = BB();
	return /* @__PURE__ */ (0, $.jsx)(SB, {
		verticalAlign: n,
		align: t,
		content: /* @__PURE__ */ (0, $.jsx)(vB, {
			selected: i,
			onSelectChange: a,
			isClickable: r,
			variant: e
		})
	});
}
var JB = (e) => {
	let { x: t = 0, y: n = 0, width: r = 0, height: i = 0, id: a, dataKey: o, variant: s, barRadius: c, glowing: l, bufferBar: u, isClickable: d, enableHoverHighlight: f, isMouseInChart: p, isHorizontal: m = !1, animationType: h = "none", introStartedAt: g = 0, selectedDataKey: v, isActive: y, dataLength: b = 0, onClick: x } = e, S = typeof e.index == "number" ? e.index : -1, C = u && b > 0 && S === b - 1, w = s === "stripped", T = YB(h, S, b, m, g), E = C ? `url(#${a}-buffer-hatched-${o})` : XB(s, a, o), D = l ? `url(#${a}-bar-glow-${o})` : void 0, O = ZB({
		isClickable: d,
		selectedDataKey: v,
		dataKey: o,
		enableHoverHighlight: f,
		isMouseInChart: p,
		isActive: y
	}), k = d || f ? { cursor: "pointer" } : void 0, A = w ? [
		c,
		c,
		0,
		0
	] : c, j = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(cm, {
		x: t,
		y: n,
		width: r,
		opacity: O,
		height: Math.max(0, i - 3),
		radius: A,
		fill: E,
		filter: D,
		stroke: C ? `url(#${a}-colors-${o})` : void 0,
		strokeWidth: C ? 1 : void 0
	}), w && /* @__PURE__ */ (0, $.jsx)(cm, {
		x: t,
		y: n - 4,
		width: r,
		height: 2,
		radius: 1,
		fill: `url(#${a}-colors-${o})`
	})] });
	return /* @__PURE__ */ (0, $.jsxs)("g", {
		style: k,
		onClick: x,
		children: [/* @__PURE__ */ (0, $.jsx)(cm, {
			...e,
			fill: "transparent"
		}), T ? /* @__PURE__ */ (0, $.jsx)(_.g, {
			initial: T.initial,
			animate: T.animate,
			transition: T.transition,
			style: T.style,
			children: j
		}) : j]
	});
}, YB = (e, t, n, r, i) => {
	if (e === "none" || t < 0 || n <= 0) return null;
	let a = n - 1, o = a / 2, s;
	switch (e) {
		case "right-to-left":
			s = a - t;
			break;
		case "center-out":
			s = Math.abs(t - o);
			break;
		case "edges-in":
			s = o - Math.abs(t - o);
			break;
		default: s = t;
	}
	let c = s * LB * 1e3, l = IB * 1e3, u = c + l, d = Date.now() - i;
	if (d >= u) return null;
	let f = d <= c ? 0 : (d - c) / l, p = {
		duration: (u - Math.max(d, c)) / 1e3,
		ease: RB,
		delay: Math.max(0, c - d) / 1e3
	};
	return r ? {
		initial: { scaleX: f },
		animate: { scaleX: 1 },
		transition: p,
		style: { originX: 0 }
	} : {
		initial: { scaleY: f },
		animate: { scaleY: 1 },
		transition: p,
		style: { originY: 1 }
	};
}, XB = (e, t, n) => {
	switch (e) {
		case "hatched": return `url(#${t}-hatched-${n})`;
		case "duotone": return `url(#${t}-duotone-${n})`;
		case "duotone-reverse": return `url(#${t}-duotone-reverse-${n})`;
		case "gradient": return `url(#${t}-gradient-${n})`;
		case "stripped": return `url(#${t}-stripped-${n})`;
		default: return `url(#${t}-colors-${n})`;
	}
}, ZB = ({ isClickable: e, selectedDataKey: t, dataKey: n, enableHoverHighlight: r, isMouseInChart: i, isActive: a }) => {
	let o = e && t !== null ? t === null || t === n ? 1 : .15 : 1;
	return r && i ? a ? o : o * .3 : o;
}, QB = ({ id: e, dataKey: t, config: n }) => {
	let r = dB(n[t] ?? {});
	return /* @__PURE__ */ (0, $.jsx)("linearGradient", {
		id: `${e}-colors-${t}`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: r === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: `var(--color-${t}-0)`
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: `var(--color-${t}-0)`
		})] }) : Array.from({ length: r }, (e, n) => {
			let i = `${n / (r - 1) * 100}%`;
			return /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: i,
				stopColor: `var(--color-${t}-${n}, var(--color-${t}-0))`
			}, i);
		})
	});
}, $B = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("pattern", {
		id: `${e}-hatched-mask-pattern`,
		x: "0",
		y: "0",
		width: "5",
		height: "5",
		patternUnits: "userSpaceOnUse",
		patternTransform: "rotate(-45)",
		children: [/* @__PURE__ */ (0, $.jsx)("rect", {
			width: "5",
			height: "5",
			fill: "white",
			fillOpacity: .3
		}), /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "1.5",
			height: "5",
			fill: "white",
			fillOpacity: 1
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-hatched-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-hatched-mask-pattern)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-hatched-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-hatched-mask-${t})`
		})
	})
] }), eV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("pattern", {
		id: `${e}-buffer-hatched-mask-pattern`,
		x: "0",
		y: "0",
		width: "5",
		height: "5",
		patternUnits: "userSpaceOnUse",
		patternTransform: "rotate(-45)",
		children: [/* @__PURE__ */ (0, $.jsx)("rect", {
			width: "5",
			height: "5",
			fill: "black",
			fillOpacity: 0
		}), /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "1",
			height: "5",
			fill: "white",
			fillOpacity: 1
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-buffer-hatched-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-buffer-hatched-mask-pattern)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-buffer-hatched-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-buffer-hatched-mask-${t})`
		})
	})
] }), tV = ({ id: e, dataKey: t, config: n }) => {
	let r = dB(n[t] ?? {});
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
			id: `${e}-duotone-mask-gradient-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "1",
			y2: "0",
			children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: .4
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: 1
			})]
		}),
		/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${e}-duotone-colors-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "1",
			children: r === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "0%",
				stopColor: `var(--color-${t}-0)`
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "100%",
				stopColor: `var(--color-${t}-0)`
			})] }) : Array.from({ length: r }, (e, n) => {
				let i = `${n / (r - 1) * 100}%`;
				return /* @__PURE__ */ (0, $.jsx)("stop", {
					offset: i,
					stopColor: `var(--color-${t}-${n}, var(--color-${t}-0))`
				}, i);
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${e}-duotone-mask-${t}`,
			maskContentUnits: "objectBoundingBox",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-mask-gradient-${t})`
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${e}-duotone-${t}`,
			patternUnits: "objectBoundingBox",
			patternContentUnits: "objectBoundingBox",
			width: "1",
			height: "1",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-colors-${t})`,
				mask: `url(#${e}-duotone-mask-${t})`
			})
		})
	] });
}, nV = ({ id: e, dataKey: t, config: n }) => {
	let r = dB(n[t] ?? {});
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
			id: `${e}-duotone-reverse-mask-gradient-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "1",
			y2: "0",
			children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: 1
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: .4
			})]
		}),
		/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${e}-duotone-reverse-colors-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "1",
			children: r === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "0%",
				stopColor: `var(--color-${t}-0)`
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "100%",
				stopColor: `var(--color-${t}-0)`
			})] }) : Array.from({ length: r }, (e, n) => {
				let i = `${n / (r - 1) * 100}%`;
				return /* @__PURE__ */ (0, $.jsx)("stop", {
					offset: i,
					stopColor: `var(--color-${t}-${n}, var(--color-${t}-0))`
				}, i);
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${e}-duotone-reverse-mask-${t}`,
			maskContentUnits: "objectBoundingBox",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-reverse-mask-gradient-${t})`
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${e}-duotone-reverse-${t}`,
			patternUnits: "objectBoundingBox",
			patternContentUnits: "objectBoundingBox",
			width: "1",
			height: "1",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-reverse-colors-${t})`,
				mask: `url(#${e}-duotone-reverse-mask-${t})`
			})
		})
	] });
}, rV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
		id: `${e}-gradient-mask-gradient`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "20%",
			stopColor: "white",
			stopOpacity: 1
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "90%",
			stopColor: "white",
			stopOpacity: 0
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-gradient-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-gradient-mask-gradient)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-gradient-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-gradient-mask-${t})`
		})
	})
] }), iV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
		id: `${e}-stripped-mask-gradient`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: "white",
			stopOpacity: .2
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: "white",
			stopOpacity: .2
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-stripped-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-stripped-mask-gradient)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-stripped-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-stripped-mask-${t})`
		})
	})
] }), aV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)("filter", {
	id: `${e}-bar-glow-${t}`,
	x: "-100%",
	y: "-100%",
	width: "300%",
	height: "300%",
	children: [
		/* @__PURE__ */ (0, $.jsx)("feGaussianBlur", {
			in: "SourceGraphic",
			stdDeviation: "8",
			result: "blur"
		}),
		/* @__PURE__ */ (0, $.jsx)("feColorMatrix", {
			in: "blur",
			type: "matrix",
			values: "1 0 0 0 0\n                0 1 0 0 0\n                0 0 1 0 0\n                0 0 0 0.5 0",
			result: "glow"
		}),
		/* @__PURE__ */ (0, $.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, $.jsx)("feMergeNode", { in: "glow" }), /* @__PURE__ */ (0, $.jsx)("feMergeNode", { in: "SourceGraphic" })] })
	]
}), oV = (e = 17, t = .05, n = .9) => Array.from({ length: e }, (r, i) => {
	let a = i / (e - 1), o = t + Math.sin(a * Math.PI) ** 2 * (n - t);
	return {
		offset: `${(a * 100).toFixed(0)}%`,
		opacity: Number(o.toFixed(3))
	};
});
function sV(e, t = 12) {
	let [n, r] = (0, P.useState)(!1), i = (0, P.useCallback)(() => {
		e && r((e) => !e);
	}, [e]);
	return {
		loadingData: (0, P.useMemo)(() => fB(t, 20, 80), [t, n]),
		onShimmerExit: i
	};
}
var cV = ({ chartId: e, onShimmerExit: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(lL, {
	dataKey: NB,
	fill: "currentColor",
	fillOpacity: .15,
	radius: MB,
	isAnimationActive: !1,
	legendType: "none",
	style: { mask: `url(#${e}-loading-mask)` }
}), /* @__PURE__ */ (0, $.jsx)("defs", { children: /* @__PURE__ */ (0, $.jsx)(lV, {
	chartId: e,
	onShimmerExit: t
}) })] }), lV = ({ chartId: e, onShimmerExit: t }) => {
	let n = oV(), r = (0, P.useRef)(-1);
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${e}-loading-mask-gradient`,
			x1: "0",
			y1: "0",
			x2: "1",
			y2: "0",
			children: n.map(({ offset: e, opacity: t }) => /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: e,
				stopColor: "white",
				stopOpacity: t
			}, e))
		}),
		/* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${e}-loading-mask-pattern`,
			patternUnits: "objectBoundingBox",
			patternContentUnits: "objectBoundingBox",
			patternTransform: "rotate(25)",
			width: 3,
			height: "1",
			x: "0",
			y: "0",
			children: /* @__PURE__ */ (0, $.jsx)(_.rect, {
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-loading-mask-gradient)`,
				initial: { x: -1 },
				animate: { x: 2 },
				transition: {
					duration: PB / 1e3,
					ease: "linear",
					repeat: Infinity,
					repeatType: "loop"
				},
				onUpdate: (e) => {
					let n = typeof e.x == "number" ? e.x : -1, i = r.current;
					n >= 1 && i < 1 && t(), r.current = n;
				}
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${e}-loading-mask`,
			maskUnits: "userSpaceOnUse",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				width: "100%",
				height: "100%",
				fill: `url(#${e}-loading-mask-pattern)`
			})
		})
	] });
};
VB.Bar = HB, VB.XAxis = UB, VB.YAxis = WB, VB.Grid = GB, VB.Tooltip = KB, VB.Legend = qB, VB.Brush = CB;
// src/react/charts/chart-card.tsx
var uV = `${c({ radius: "chart" })} flex flex-col gap-4 max-sm:p-4`;
function dV({ title: e, children: t }) {
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		className: uV,
		"aria-label": e,
		children: [/* @__PURE__ */ (0, $.jsx)("h3", {
			className: "text-title-2-medium text-text-primary",
			children: e
		}), /* @__PURE__ */ (0, $.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: t
		})]
	});
}
var fV = (e) => (e.codePointAt(0) ?? 0) > 11903 ? 13 : 7, pV = (e) => [...new Intl.Segmenter(void 0, { granularity: "grapheme" }).segment(e)].map((e) => e.segment), mV;
function hV(e) {
	if (mV === void 0) try {
		mV = document.createElement("canvas").getContext("2d"), mV && (mV.font = `12px ${getComputedStyle(document.body).fontFamily || "sans-serif"}`);
	} catch {
		mV = null;
	}
	return mV ? mV.measureText(e).width : null;
}
var gV = (e) => hV(e) ?? pV(e).reduce((e, t) => e + fV(t), 0);
function _V(e, t) {
	if (gV(e) <= t) return e;
	let n = pV(e), r = 0;
	for (; r < n.length && gV(`${n.slice(0, r + 1).join("")}…`) <= t;) r += 1;
	return `${n.slice(0, r).join("")}…`;
}
var vV = (e, t = 104) => Math.min(t, Math.max(24, ...e.map(gV)) + 12);
function yV(e) {
	let { along: t, payload: n, width: r = 0, visibleTicksCount: i = 1, ...a } = e, o = String(n?.value ?? ""), s = t === "x" ? r / Math.max(1, i) - 2 : r - 8;
	return /* @__PURE__ */ (0, $.jsxs)("g", { children: [/* @__PURE__ */ (0, $.jsx)("title", { children: o }), /* @__PURE__ */ (0, $.jsx)(OO, {
		...a,
		children: _V(o, s)
	})] });
}
function bV({ title: e, figure: t, note: n }) {
	return /* @__PURE__ */ (0, $.jsxs)("header", {
		className: "flex flex-wrap items-end justify-between gap-x-4 gap-y-1",
		children: [/* @__PURE__ */ (0, $.jsxs)("span", {
			className: "flex min-w-0 flex-col gap-1",
			children: [/* @__PURE__ */ (0, $.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: e
			}), /* @__PURE__ */ (0, $.jsx)("b", {
				className: "text-display-4-medium tabular-nums text-text-primary",
				children: t
			})]
		}), /* @__PURE__ */ (0, $.jsx)("small", {
			className: "min-w-0 text-caption-1-regular break-words text-text-secondary",
			children: n
		})]
	});
}
var xV = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)",
	"var(--color-chart-4)",
	"var(--color-chart-5)",
	"var(--color-chart-6)"
], SV = (e) => ({ light: [e] }), CV = (e) => `s${e}`;
function wV(e) {
	return Object.fromEntries(e.map((e, t) => [CV(t), {
		label: e,
		colors: SV(xV[t % xV.length])
	}]));
}
// src/react/charts/chart-tip.tsx
var TV = "flex min-w-32 flex-col gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl";
function EV({ swatch: e, name: t, value: n, format: r = (e) => e.toLocaleString() }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex w-full items-center gap-2",
		children: [e, /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex flex-1 items-center justify-between gap-4 leading-none",
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "text-muted-foreground",
				children: t
			}), /* @__PURE__ */ (0, $.jsx)("span", {
				className: "font-mono font-medium tabular-nums text-foreground",
				children: r(n)
			})]
		})]
	});
}
var DV = "size-2.5 shrink-0 rounded-xs";
function OV({ active: e, payload: t, label: n, nameKey: r, valueKey: i, hideLabel: a, format: o }) {
	let { config: s } = aB(), c = (t ?? []).filter((e) => e.type !== "none");
	if (!e || !c.length) return /* @__PURE__ */ (0, $.jsx)("span", { className: "p-4" });
	let l = a || typeof n != "string" ? null : s[n]?.label ?? n;
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: TV,
		children: [l ? /* @__PURE__ */ (0, $.jsx)("div", {
			className: "font-medium text-foreground",
			children: l
		}) : null, c.map((e, t) => {
			let n = e.payload ?? {}, a = `${(r ? n[r] : void 0) ?? e.name ?? e.dataKey ?? "value"}`, c = uB(s, e, a), l = i ? n[i] : e.value;
			return /* @__PURE__ */ (0, $.jsx)(EV, {
				name: c?.label ?? e.name,
				value: Number(l ?? 0),
				format: o,
				swatch: /* @__PURE__ */ (0, $.jsx)("i", {
					className: DV,
					style: { background: `var(--color-${a}-0)` }
				})
			}, a + t);
		})]
	});
}
function kV({ nameKey: e, valueKey: t, hideLabel: n, format: r }) {
	return /* @__PURE__ */ (0, $.jsx)(_B, {
		cursor: !1,
		content: /* @__PURE__ */ (0, $.jsx)(OV, {
			nameKey: e,
			valueKey: t,
			hideLabel: n,
			format: r
		})
	});
}
export { Nj as ActivePoints, OA as AnimatedItems, uV as CHART_CARD, xV as CHART_COLORS, uk as CartesianLabelListContextProvider, yV as CategoryTick, hD as Cell, jB as ChartBackground, oB as ChartContainer, dV as ChartEmpty, bV as ChartHead, SB as ChartLegend, vB as ChartLegendContent, kV as ChartTip, _B as ChartTooltip, hB as ChartTooltipContent, Rf as Curve, xl as DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME, bl as DATA_ITEM_INDEX_ATTRIBUTE_NAME, J as DefaultZIndexes, vk as Dot, sj as Dots, VB as EvilBarChart, hk as LabelList, gk as LabelListFromLabelProp, et as Layer, sB as LoadingIndicator, Zz as PolarChart, UO as PolarLabelContextProvider, nk as PolarLabelFromLabelProp, fk as PolarLabelListContextProvider, RA as RegisterGraphicalItemId, zm as Sector, YA as SetPolarGraphicalItem, aA as SetPolarLegendPayload, rA as SetTooltipEntrySettings, $k as Shape, TV as TIP_SURFACE, DV as TIP_SWATCH, OO as Text, EV as TipRow, hE as ZIndexLayer, wr as adaptEventsOfChild, jk as addAngleAxis, kk as addRadiusAxis, jE as arrayTooltipSearcher, vV as categoryAxisWidth, eB as cn, Jj as combineAllBarPositions, RC as combineAxisTicks, Xj as combineBarPosition, Vj as combineBarSizeList, gC as combineCategoricalDomain, vx as combineConfiguredScale, rg as combineDisplayedStackedData, BC as combineGraphicalItemTicks, bS as combineStackGroups, Yj as combineStackedData, V as createSelector, Nh as defaultPolarAngleAxisProps, Xz as defaultPolarChartProps, Ph as defaultPolarRadiusAxisProps, hm as degreeToRadian, Vk as findAllByType, _V as fitLabel, lt as get, Ih as getAxisTypeBasedOnLayout, ll as getBandSizeOfAxis, rl as getBaseValueOfBar, nl as getCateCoordinateOfBar, Pk as getClassNameFromUnknown, dB as getColorsCount, vm as getMaxRadius, el as getNormalizedStackId, bt as getPercentValue, dl as getTooltipNameProp, G as getValueByDataKey, Zj as getZIndexFromUnknown, Gr as identity, I as interpolate, qr as isArrayLike, Jc as isCategoricalAxis, L as isNullish, F as isNumber, ig as isStacked, Yi as iteratee, yA as matchAnimationItems, pA as matchAppend, fA as matchByIndex, mt as mathSign, Tt as noop, Y as pickAxisType, _m as polarToCartesian, ug as rechartsScaleFactory, Mk as removeAngleAxis, Ak as removeRadiusAxis, Ar as resolveDefaultProps, pt as roundTemplateLiteral, pT as selectActiveTooltipDataKey, mT as selectActiveTooltipGraphicalItemId, dT as selectActiveTooltipIndex, Wh as selectAngleAxis, Zh as selectAngleAxisRangeWithReversed, wh as selectBarCategoryGap, Ch as selectBarGap, Gm as selectChartDataAndAlwaysIgnoreIndexes, Wm as selectChartDataWithIndexes, K as selectChartLayout, Ml as selectChartOffsetInternal, IC as selectDuplicateDomain, Sk as selectPolarAppliedValues, Ek as selectPolarAxisCheckedDomain, bk as selectPolarItemsSettings, Tk as selectPolarNiceTicks, eg as selectPolarViewBox, Gh as selectRadiusAxis, $h as selectRadiusAxisRangeWithReversed, tC as selectRealScaleType, Kx as selectRenderableAxisSettings, Dh as selectReverseStackOrder, Th as selectRootBarSize, Sh as selectRootMaxBarSize, Eh as selectStackOffsetType, _S as selectTooltipAxis, yk as selectUnfilteredPolarItems, wV as sliceConfig, CV as sliceKey, He as svgPropertiesAndEvents, Be as svgPropertiesNoEvents, Ve as svgPropertiesNoEventsFromUnknown, SV as tone, Zc as truncateByDomain, DA as useAnimationCallbacks, bA as useAnimationStartSnapshot, z as useAppDispatch, B as useAppSelector, Il as useIsPanorama, nA as useMouseClickItemDispatch, eA as useMouseEnterItemDispatch, tA as useMouseLeaveItemDispatch, Du as usePolarChartLayout };

//# debugId=783ef6e2-3b75-466e-babe-8a5bc820bee3