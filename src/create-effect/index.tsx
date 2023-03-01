import type { Component } from "solid-js";
import { createEffect, createSignal } from "solid-js";

const Demo: Component = () => {
  const [count, setCount] = createSignal(0);

  // 当count增加的时候，我们去打印更新后的count
  const handleLogCount = () => {
    console.log("Count", count());
  };

  // 增加
  const handleIncrement = () => {
    setCount(count() + 1);
  };

  createEffect(handleLogCount);

  return (
    <div>
      <div>Count:{count()}</div>
      <div>
        <button onClick={handleIncrement}>Increment</button>
      </div>
    </div>
  );
};

export default Demo;
