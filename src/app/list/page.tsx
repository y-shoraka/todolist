/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import AddModal from "./components/add-modal";
import { Button, Checkbox } from "@mui/material";

const List = () => {
  // Initialize state with data from localStorage (if it exists)
  const [list, setList] = useState<Record<string, any>[]>(() => {
    if (typeof window !== "undefined") {
      const savedList = localStorage.getItem("taskList");
      return savedList ? JSON.parse(savedList) : [];
    }
    return [];
  });

  const [modalMode, setModalMode] = useState({ open: false, edit: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("taskList", JSON.stringify(list));
    }
  }, [list]);

  const openHandler = () => {
    setModalMode((prev) => ({ ...prev, open: true }));
  };

  const closeHandler = ({
    item,
    edit,
  }: {
    item: Record<string, any>;
    edit: string;
  }) => {
    if (item.name) {
      if (edit) {
        setList((prev) =>
          prev.map((prevItem) =>
            prevItem.name === edit
              ? { ...item, id: prevItem.id, done: prevItem.done }
              : prevItem
          )
        );
      } else {
        setList((prev) => [...prev, { ...item, done: false }]);
      }
    }
    setModalMode(() => ({ open: false, edit: "" }));
  };
  console.log(list);
  const deleteHandler = (id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const editHandler = (name: string) => {
    setModalMode({ open: true, edit: name });
    console.log(name);
  };

  const toggleDoneHandler = (id: string) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const doneList = list.filter((item) => item.done);
  const undone = list.filter((item) => item.done === false);

  return (
    <div className="p-4">
      <div>
        <Button variant="contained" type="button" onClick={openHandler}>
          Add Task
        </Button>
        <AddModal modalMode={modalMode} closeHandler={closeHandler} />
        {doneList.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center bg-gray-200 justify-evenly w-1/2 gap-3 my-4 mx-auto p-3"
          >
            <Checkbox
              checked={item.done || false}
              onChange={() => toggleDoneHandler(item.id)}
            />

            <p
              className="flex-1"
              style={{ textDecoration: item.done ? "line-through" : "none" }}
            >
              {item.name}
            </p>

            <Button variant="contained" onClick={() => editHandler(item.name)}>
              Edit
            </Button>
            <Button variant="contained" onClick={() => deleteHandler(item.id)}>
              Delete
            </Button>
          </div>
        ))}
        {undone.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center bg-gray-200 justify-evenly w-1/2 gap-3 my-4 mx-auto p-3"
          >
            <Checkbox
              checked={item.done || false}
              onChange={() => toggleDoneHandler(item.id)}
            />

            <p
              className="flex-1"
              style={{ textDecoration: item.done ? "line-through" : "none" }}
            >
              {item.name}
            </p>

            <Button variant="contained" onClick={() => editHandler(item.name)}>
              Edit
            </Button>
            <Button variant="contained" onClick={() => deleteHandler(item.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
