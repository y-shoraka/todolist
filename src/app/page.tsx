import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  const clickHandler = () => {
    router.push("list");
  };

  return (
    <div>
      <button onClick={clickHandler}>to do list</button>
    </div>
  );
};

export default Page;
