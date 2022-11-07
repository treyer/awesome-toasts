<h1 align="center">Welcome to react-toaster-lib 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-toaster-lib" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-toaster-lib.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> React toast library

### 🏠 [Homepage](https://github.com/treyer/awesome-toasts)

### ✨ [Demo](https://react-toaster-lib-demo.netlify.app/)

## Install

```sh
npm install react-toaster-lib
```

## Usage:

Add container component to your App:
```js
import { ToastContainer } from "react-toaster-lib";
...
<ToastContainer />
```
Container has default position "top-right", but you could use the next variants:
```js
<ToastContainer position="top-left"/>
<ToastContainer position="top-center"/>
<ToastContainer /> //default position="top-right"
<ToastContainer position="bottom-left"/>
<ToastContainer position="bottom-center"/>
<ToastContainer position="bottom-right"/>
```

To create a Toast: import "toaster" library instance and use its addToast() method:
```js
import { toaster } from "react-toaster-lib";
toaster.addToast("Toast text");//minimum params required
toaster.addToast(
  "Some text to show (required)",
   "Toast header (optional)",
  {
    type: "success", //"default" (predefined) | "info" | "success" | "warning" | "danger"
    lifeTime: 2000, // time in milliseconds, if used - toast will automatically close in this time
    animationType: "ease", //"ease" |"ease-in" | "ease-out" | "ease-in-out" (predefined) |
    // "linear" | "step-start" | "step-end" | "cubic-bezier"
    showFrom: "left", // "left" | "right" | "top" | "bottom"
    hideTo: "left", // "left" | "right" | "top" | "bottom"
    bgColor: "#ffffff", //any valid color format
    fontColor: "rgb(179, 56, 56)", //any valid color format
    iconColor: "blue", //any valid color format
    margin: "md lg sm 12", //use constants "md", "lg", "sm" and digits without "px"
    padding: "md 7", //use constants "md", "lg", "sm" and digits without "px"
  }
)
```
The signature of **addToast** method is: **addToast(toastText [, toastHeader [, optionsObject]])**
The single parameter required is **toastText**, other params are optional. You could use **optionsObj**
as the second param if you do not need toast header.

addToast() **options** available:
- **type** - Toast type determines its Icon type and default background, font and Icon colors
types available: **"default"** (predefined) | **"info"** | **"success"** | **"warning"** | **"danger"**
- **lifeTime** - time in milliseconds. If option not used or equals "0" - you could close Toast only manually
by click on the cross or by swipe. If you use lifeTime with value > 0 (ms) - Toast will disappear automatically
after time milliseconds
- **animationType** - effect using on toast show / hide
types available: **"ease"** | **"ease-in"** | **"ease-out"** | **"ease-in-out"** (predefined) | **"linear"**,
**"step-start"**, **"step-end"**, **"cubic-bezier"** (use *cubic-bezier(0.1, 0.7, 1, 0.1)* function)
- **showFrom** - determine where from Toast will appear on the screen
types available: **"left"** | **"right"** | **"top"** | **"bottom"**
*showFrom* param has predefined values according to *ToastContainer* positions: **"left"** if *ToastContainer*
has "top-left" or "bottom-left" position, **"right"** if position is "top-right" or "bottom-right", **"top"** if
position is "top-center" and **"bottom"** if position is "bottom-center"
- **hideTo** - determine direction where Toast disappear from the screen.
types available: **"left"** | **"right"** | **"top"** | **"bottom"**
*hideTo* param has predefined values according to *ToastContainer* positions: **"left"** if *ToastContainer*
has "top-left" or "bottom-left" position, **"right"** if position is "top-right" or "bottom-right", **"top"** if
position is "top-center" and **"bottom"** if position is "bottom-center"
- **bgColor** - custom background color, use any valid format. If not used or wrong value - library use default
bg color according to Toast *type*
- **fontColor** - custom font color, use any valid format. If not used or wrong value - library use default
font color according to Toast *type*
- **iconColor** - custom Icon color, use any valid format. If not used or wrong value - library use default
Icon color according to Toast *type*
- **margin** - set custom Toast margins - match standard CSS margin value (1-4 values divided with spaces),
but you could use ONLY digits (without "px") and constants "sm" (=5px), "md" (=10px) or "lg"(=15px).
- **padding** - set custom Toast paddings - match standard CSS padding value (1-4 values divided with spaces),
but you could use ONLY digits (without "px") and constants "sm" (=5px), "md" (=10px) or "lg"(=15px).

### Swipe to remove Toast feature available

## Author

👤 **treyer <nemereno_by@mail.ru>**

- Github: [@treyer](https://github.com/treyer)
- LinkedIn: [@Andrei Кazhanenka](https://linkedin.com/in/Andrei Кazhanenka)

Give a ⭐️ if this project helped you!
