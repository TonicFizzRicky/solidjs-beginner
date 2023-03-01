import type { Component } from "solid-js";
import { createSignal } from "solid-js";

const Demo: Component = () => {
  const [count, setCount] = createSignal(0);

  // 实现递增
  const handleIncrement = () => {
    setCount(count() + 1);
  };

  // 实现递减
  const handleDecrement = () => {
    setCount(count() - 1);
  };

  // 实现重置
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div>
      <div>Current count is:{count()}</div>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Demo;
