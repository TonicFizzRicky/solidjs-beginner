# createSignal 

## 基本概念

`createSignal` 类似于 react hooks 的 `useState` hook

区别在于返回的数组，不是useState [getter,setter] 的方式返回

而是 [accessor,setter]

查看以下代码:

```tsx
import type { Component } from "solid-js";
import { createSignal } from "solid-js";

const Demo:Component = () => {
  const [count, setCount] = createSignal(0);

  const handleIncrement = () => {
    setCount(count() + 1);
  };

  const handleDecrement = () => {
    setCount(count() - 1);
  };

  const handleReset = () => {
    setCount(0);
  };
  
  // return 部分忽略
};

```

取值的方式通过 `count()` 方式调用 accessor 的函数去获取

## Signal 理念

`createSignal` 这样设计的理念不是独创，可以参考下这些文章:

精读《SolidJS》 https://segmentfault.com/a/1190000042392152

从 Signals 看响应式状态管理 https://www.bilibili.com/read/cv18813189?from=search

Signal：更多前端框架的选择 https://www.bilibili.com/read/cv22062884?from=articleDetail

主要的概念:

1. 通过 Signal 和响应式的设计，避免 getter 直接获取状态的引用，而是得到一个函数去获取状态的值

2. 能够做细粒度的更新，由框架本身去追踪依赖项和处理渲染和更新