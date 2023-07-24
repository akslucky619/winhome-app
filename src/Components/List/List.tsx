import React, { FC } from "react";
import styles from "./List.module.css";
import DeleIcon from "../../../public/images/bin-w 9.svg";
import Image from "next/image";

interface Item {
  title: string;
  description: string;
  id: string;
}

interface ListProps {
  itemList: Item[];
  handleDelete: (item: Item) => void;
  setEditView: (item: Item) => void;
  setOnlyView: (item: Item) => void;
}

const List: FC<ListProps> = ({
  itemList,
  handleDelete,
  setEditView,
  setOnlyView,
}) => {
  return (
    <div className={styles.wrapper}>
      <label>Today's Task</label>
      {itemList.map((item) => (
        <div className={styles.listWrapper} key={item.id}>
          <div>
            <h3>{item.title}</h3>
          </div>
          <div className={styles.buttonSection}>
            <button
              className={styles.buttonPrimary}
              onClick={() => setEditView(item)}
            >
              Edit
            </button>
            <button
              className={styles.buttonPrimary}
              onClick={() => setOnlyView(item)}
            >
              View
            </button>
            <div
              className={styles.deleteButton}
              onClick={() => handleDelete(item)}
            >
              <Image src={DeleIcon} width={22} height={22} alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
