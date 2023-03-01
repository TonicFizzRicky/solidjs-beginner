import type { Component } from "solid-js";
import { createSignal, createMemo } from "solid-js";

const getFactorialRecursively = (count: number): number => {
  if (count <= 1) return 1;
  return count * getFactorialRecursively(count - 1);
};

const Demo: Component = () => {
  const [count, setCount] = createSignal(1);
  //   const [result,setResult] = createSignal(1);

  // 计算阶乘

  // 递增
  const handleIncrement = () => {
    setCount(count() + 1);
  };

  // count 变化的时候，更新 result
  // effect 主要用于读取但不写入反应系统的副作用：最好避免在 effect 中设置 signal，如果不小心可能会导致额外的渲染甚至无限 effect 循环。
  // 相反，更喜欢使用 createMemo 来计算依赖于其他响应式值的新值，因此响应式系统知道什么依赖于什么，并可以相应地进行优化。
  //   createEffect(() => {
  //     setResult(() => getFactorialRecursively(count()))
  //   })

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
