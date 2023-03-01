# createEffect

## 基本概念

类似于 react 的 `useEffect`,区别在于依赖项不需要手动增加依赖项

`createEffect` 的执行实际时在渲染之后运行(render/createRoot等函数运行后)，首次执行有延迟。

需要首次运行时立即执行，可以使用 `createRenderEffect` 或者 `createComputed`

可以执行 `onCleanup` 去在 effect 执行后和组件卸载阶段执行事件，清除副作用

如：createEffect 创建了事件绑定，在组件卸载阶段移除事件绑定

## 示例

`createEffect` 的基础使用

```tsx
import type { Component } from "solid-js";
import { createEffect, createSignal } from "solid-js";

const Demo: Component = () => {
  const [count, setCount] = createSignal(0);

  // 当count增加的时候，我们去打印更新后的count
  const handleLogCount = () => {
    console.log("Count", count());
  };
  createEffect(handleLogCount);

  // 增加
  const handleIncrement = () => {
    setCount(count() + 1);
  };

 // render 部分忽略
};

export default Demo;


```

`onCleanup` 的使用

由于 `createEffect` 和副作用相关，一般我们在组件卸载阶段，需要清除副作用

需要使用 `onCleanup`

比如下述代码的例子，我们通过 `createEffect` 创建了副作用（定时器）

需要在组件卸载前清除定时器

写法和 React useEffect 比较相似

```tsx
import type { Component } from "solid-js";
import { createSignal, createEffect, onCleanup } from "solid-js";

const EffectDemo: Component = () => {
  const [count, setCount] = createSignal(0);

  // 绑定全局事件，点击增加count
  const handleIncrement = () => {
    setCount(count() + 1);
  };

  createEffect(() => {
    const interval = setInterval(handleIncrement, 1000);

    // 组件卸载前，需要清除副作用
    onCleanup(() => {
      console.log("cleanup interval");
      interval && clearInterval(interval);
    });
  });

  // 省略 jsx 渲染
};


```