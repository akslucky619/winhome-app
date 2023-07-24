import React, { FC, ChangeEvent } from "react";
import LeftArrow from "../../../public/images/left-arrow1.svg";
import EditIcon from "../../../public/images/edit1.svg";
import DeleteIcon from "../../../public/images/bin-w 9.svg";
import Image from "next/image";
import { ViewType } from "@/constants";
import styles from "./index.module.css";

type Item = {
  title: string;
  description: string;
  id: string;
};

interface AddItemProps {
  handleAdd: () => void;
  handleBack: () => void;
  handleTitleInput: (input: string) => void;
  handleDescriptionInput: (input: string) => void;
  title: string;
  description: string;
  editItem: Item | null;
  viewType: ViewType;
  handleUpdate: () => void;
  setEditView: (item: Item | null) => void;
  handleDelete: (todo: Item | null) => void;
}

const AddItem: FC<AddItemProps> = ({
  handleAdd,
  handleBack,
  handleTitleInput,
  handleDescriptionInput,
  title,
  description,
  editItem,
  viewType,
  handleUpdate,
  setEditView,
  handleDelete,
}) => {
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleTitleInput(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleDescriptionInput(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      {viewType === ViewType.EDIT && <h3>Title: {editItem?.title} </h3>}
      {viewType !== ViewType.EDIT && <h3>Add Your Todo </h3>}
      {viewType !== ViewType.VIEW && (
        <>
          <input
            type="text"
            onChange={handleTitleChange}
            value={title}
            placeholder="Title"
          />
          <textarea
            onChange={handleDescriptionChange}
            value={description}
            placeholder="Description"
          />
        </>
      )}
      {viewType === ViewType.VIEW && (
        <p>{editItem?.description || "Description"}</p>
      )}
      {viewType !== ViewType.VIEW && (
        <button onClick={viewType === ViewType.EDIT ? handleUpdate : handleAdd}>
          Submit
        </button>
      )}
      {viewType === ViewType.VIEW && (
        <div className={styles.editSection}>
          <div className={styles.iconWrapper} onClick={handleBack}>
            <div
              style={{ background: "black" }}
              className={styles.deleteButton}
            >
              <Image width={16} height={16} alt="" src={LeftArrow} />
            </div>
            <p>Back</p>
          </div>
          <div
            className={styles.iconWrapper}
            onClick={() => setEditView(editItem ? editItem : null)}
          >
            <div
              style={{ background: "#005981" }}
              className={styles.deleteButton}
            >
              <Image width={16} height={16} alt="" src={EditIcon} />
            </div>
            <p>Edit</p>
          </div>
          <div
            className={styles.iconWrapper}
            onClick={() => handleDelete(editItem ? editItem : null)}
          >
            <div
              style={{ background: "#FF0000" }}
              className={styles.deleteButton}
            >
              <Image width={16} height={16} alt="" src={DeleteIcon} />
            </div>
            <p>Delete</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItem;
