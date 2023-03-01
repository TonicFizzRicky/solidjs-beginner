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

  return (
    <div>
      <div>You can click screen to increment count.</div>
      <div>Current count:{count()}</div>
    </div>
  );
};

export default EffectDemo;
