import type { Component } from "solid-js";
import { createSignal, createResource } from "solid-js";
import { fetchUser } from "./service";

const Demo: Component = () => {
  const [userId, setUserId] = createSignal(1);
  const [user] = createResource(userId, fetchUser);

  return (
    <>
      <input
        type="number"
        min="1"
        placeholder="Enter Numeric Id"
        onInput={(e: any) => setUserId(e.currentTarget.value)}
      />
      <span>{user.loading && "Loading..."}</span>
      <div>
        <pre>{JSON.stringify(user(), null, 2)}</pre>
      </div>
    </>
  );
};

export default Demo;
