import React from "react";
import styles from "./RequestRow.module.css";
import fetchDeleteData from "../../fetches/fetchDeleteData";

const RequestRow = ({
  currentSection,
  deleteDataFromState,
  toast,
  id,
  name,
  email,
  subject,
  message,
  submissionDate,
}) => {
  const handleDelete = () => {
    fetchDeleteData(
      currentSection,
      id,
      notifySuccess,
      notifyError,
      deleteDataFromState
    );
  };

  const notifyError = (message) => {
    toast.error(message, {
      autoClose: 5000,
      position: "bottom-center",
      draggable: false,
      closeButton: false,
      closeOnClick: false,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      autoClose: 5000,
      position: "bottom-center",
      draggable: false,
      closeButton: false,
      closeOnClick: false,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  return (
    <>
      <tr className={styles.requestRow}>
        <td className={styles.requestColumn}>
          <div className={styles.requestContent}>{id}</div>
        </td>
        <td className={styles.requestColumn}>
          <div className={styles.requestContent}>{name}</div>
        </td>
        <td className={styles.requestColumn}>
          <div className={styles.requestContent}>{email}</div>
        </td>
        <td className={styles.requestColumn}>
          <div className={styles.requestContent}>{subject}</div>
        </td>
        <td className={styles.requestColumn}>
          <div className={styles.requestContent}>{message}</div>
        </td>
        <td className={styles.requestColumn}>
          <div className={styles.requestContent}>{submissionDate}</div>
        </td>
        <td className={styles.deleteColumn}>
          <button className={styles.deleteButton} onClick={handleDelete}>
            Видалити
          </button>
        </td>
      </tr>
    </>
  );
};

export default RequestRow;
