"use client";

import Image from "next/image";
import Link from "next/link";
// import { SignIn } from "@clerk/nextjs";

import React, { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("");
  return <div>Hellow world </div>;
}

// Object.defineProperty(exports, "__esModule", {
//   value: true,
// });
// exports.default = calc2;
// var _react = _interopRequireWildcard(require("react"));
// function _getRequireWildcardCache(e) {
//   if ("function" != typeof WeakMap) return null;
//   var r = new WeakMap(),
//     t = new WeakMap();
//   return (_getRequireWildcardCache = function (e) {
//     return e ? t : r;
//   })(e);
// }
// function _interopRequireWildcard(e, r) {
//   if (!r && e && e.__esModule) return e;
//   if (null === e || ("object" != typeof e && "function" != typeof e))
//     return { default: e };
//   var t = _getRequireWildcardCache(r);
//   if (t && t.has(e)) return t.get(e);
//   var n = { __proto__: null },
//     a = Object.defineProperty && Object.getOwnPropertyDescriptor;
//   for (var u in e)
//     if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
//       var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
//       i && (i.get || i.set) ? Object.defineProperty(n, u, i) : (n[u] = e[u]);
//     }
//   return (n.default = e), t && t.set(e, n), n;
// }

// export default function calc2() {
//   function Calculator() {
//     const [display, setDisplay] = (0, _react.useState)("");
//     return /*#__PURE__*/ _react.default.createElement(
//       "div",
//       null,
//       "Hellow world "
//     );
//   }
// }

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.default = Calculator;
// var _react = _interopRequireWildcard(require("react"));
// function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
// function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// function Calculator() {
//   const [display, setDisplay] = (0, _react.useState)("");
//   return /*#__PURE__*/_react.default.createElement("div", null, "Hellow world ");
// }
