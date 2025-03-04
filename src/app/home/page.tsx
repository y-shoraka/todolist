"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  const clickHandler = () => {
    router.push("list");
  };

  return (
    <div>
      <Button variant="contained" onClick={clickHandler}>
        to do list
      </Button>
    </div>
  );
};

export default Page;
