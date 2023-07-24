"use client";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import styles from "./page.module.css";
import AddItem from "@/Components/AddItem";
import List from "@/Components/List/List";
import Header from "@/Components/Header";
import { ViewType } from "@/constants";

type Item = {
  title: string;
  description: string;
  id: string;
};

export default function Home() {
  const [itemList, setItemList] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem("itemList");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [viewType, setView] = useState<ViewType>(ViewType.ADD);

  useEffect(() => {
    localStorage.setItem("itemList", JSON.stringify(itemList));
    if (itemList.length === 0) {
      setView(ViewType.ADD);
    }
  }, [itemList]);

  const handleTitleInput = useCallback((title: string) => {
    setInputTitle(title);
  }, []);

  const handleDescriptionInput = useCallback((description: string) => {
    setInputDescription(description);
  }, []);

  function generateUUID() {
    let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );

    return uuid;
  }

  const updateLocalStorageAndResetInputs = (newList: Item[]) => {
    setItemList(newList);
    localStorage.setItem("itemList", JSON.stringify(newList));
    setInputTitle("");
    setInputDescription("");
    setView(ViewType.LIST);
  };

  const handleAdd = useCallback(() => {
    if (!inputTitle || inputTitle.trim() === "") {
      console.error(
        "Invalid input: Title cannot be empty or only contain whitespace"
      );
      return;
    }

    // Prevent adding duplicate items
    if (itemList.find((item) => item.title === inputTitle)) {
      console.error(
        "Invalid input: Item with this title already exists in the list"
      );
      return;
    }

    const uuid = generateUUID();

    const newList = [
      ...itemList,
      { title: inputTitle, description: inputDescription, id: uuid },
    ];

    updateLocalStorageAndResetInputs(newList);
  }, [inputTitle, inputDescription, itemList]);

  const handleUpdate = () => {
    if (!inputTitle || inputTitle.trim() === "") {
      console.error(
        "Invalid input: Title cannot be empty or only contain whitespace"
      );
      return;
    }

    // Prevent updating to a title that already exists in other items
    if (
      itemList.find(
        (item) => item.id !== editItem?.id && item.title === inputTitle
      )
    ) {
      console.error(
        "Invalid input: Item with this title already exists in the list"
      );
      return;
    }

    if (editItem) {
      const newList = itemList.map((item) => {
        if (item.id === editItem.id) {
          return {
            ...item,
            title: inputTitle,
            description: inputDescription,
          };
        }
        return item;
      });

      updateLocalStorageAndResetInputs(newList);
    } else {
      console.error("No item selected for update");
    }
  };

  const handleDelete = useCallback(
    (todo: Item | null) => {
      const updatedList = itemList.filter((item) => item.id !== todo?.id);
      setItemList(updatedList);
      localStorage.setItem("itemList", JSON.stringify(updatedList));
      if (updatedList.length === 0) {
        setView(ViewType.ADD);
      } else {
        setView(ViewType.LIST);
      }
    },
    [itemList]
  );

  const setEditView = (item: Item | null) => {
    setEditItem(item);
    console.log({ item });
    setView(ViewType.EDIT);
  };

  const setOnlyView = (todo: Item) => {
    setView(ViewType.VIEW);
    setEditItem(todo);
  };

  const handleBack = () => {
    setView(ViewType.LIST);
  };

  const setAddView = () => {
    setView(ViewType.ADD);
  };

  const isListEmpty = itemList.length === 0;
  const isValidView =
    viewType !== "Add" && viewType !== "Edit" && viewType !== "View";

  return (
    <div className={styles.parent}>
      <Header setAddView={setAddView} title="win" />
      {!isValidView && (
        <div className="item-input-container">
          <AddItem
            title={inputTitle}
            description={inputDescription}
            handleAdd={handleAdd}
            handleTitleInput={handleTitleInput}
            handleDescriptionInput={handleDescriptionInput}
            editItem={editItem}
            viewType={viewType}
            handleBack={handleBack}
            handleUpdate={handleUpdate}
            setEditView={setEditView}
            handleDelete={handleDelete}
          />
        </div>
      )}
      {!isListEmpty && isValidView && (
        <List
          handleDelete={handleDelete}
          itemList={itemList}
          setEditView={setEditView}
          setOnlyView={setOnlyView}
        />
      )}
    </div>
  );
}
