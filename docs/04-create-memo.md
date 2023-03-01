# createMemo

`createMemo` API 和 react hooks 的 `useMemo` hook 比较类似

返回值的类型不同，返回的不是一个值，而是一个函数 (accessor)，和 `createSignal` 类似

## 什么时候使用 createMemo?

createMemo 只有依赖项更新时才会调用内部函数，是一种性能优化的方式

当应用状态比较复杂，有好几个 Signal 会触发耗费性能的计算时，通过确定依赖项，去优化性能

## 举例

计算阶乘

Signal `count` 变化时，我们需要计算对应的阶乘(n!)

如果内部的状态比较复杂，可能有其他的 Signal 会触发计算

我们可以通过 `createMemo` 以及依赖项 `count()`,让 Signal `count` 变化时再计算

```tsx
import type { Component } from "solid-js";
import { createSignal, createMemo } from "solid-js";

const getFactorialRecursively = (count: number): number => {
  if (count <= 1) return 1;
  return count * getFactorialRecursively(count - 1);
};

const Demo: Component = () => {
  const [count, setCount] = createSignal(1);

  // 递增
  const handleIncrement = () => {
    setCount(count() + 1);
  };

  // 通过 createMemo 去实现
  const result = createMemo(() => {
    return getFactorialRecursively(count());
  }, count());

  return (
    <div>
      <div>Current count:{count()}</div>
      <div>
        <button onClick={handleIncrement}>Increment</button>
      </div>
      <div>Factorial Result:{result()}</div>
    </div>
  );
};

export default Demo;
```

## 其他做法

`createEffect` 以及 `createSignal` 混合使用其实也可以解决这个阶乘的问题

```tsx
import type { Component } from "solid-js";
import { createSignal, createMemo } from "solid-js";

const getFactorialRecursively = (count: number): number => {
  if (count <= 1) return 1;
  return count * getFactorialRecursively(count - 1);
};

const Demo: Component = () => {
  const [count, setCount] = createSignal(1);
  const [result, setResult] = createSignal(1);

  // 计算阶乘

  // 递增
  const handleIncrement = () => {
    setCount(count() + 1);
  };

  createEffect(() => {
    setResult(() => getFactorialRecursively(count()));
  });

  return (
    <div>
      <div>Current count:{count()}</div>
      <div>
        <button onClick={handleIncrement}>Increment</button>
      </div>
      <div>Factorial Result:{result()}</div>
    </div>
  );
};

export default Demo;
```


不过 SolidJS 官方不提倡这个做法,主要是这种方式可能会导致 `createEffect` 无法正确获取依赖项，

从而导致重复渲染，无限循环渲染等问题。

通过 `createMemo` 去计算新值，框架本身会进行优化

> effect 主要用于读取但不写入反应系统的副作用：最好避免在 effect 中设置 signal。
> 如果不小心可能会导致额外的渲染甚至无限 effect 循环。
> 相反，更喜欢使用 createMemo 来计算依赖于其他响应式值的新值，因此响应式系统知道什么依赖于什么，并可以相应地进行优化。