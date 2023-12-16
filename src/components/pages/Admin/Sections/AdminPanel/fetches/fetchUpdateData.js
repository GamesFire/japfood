import axios from "axios";

const fetchUpdateData = async (
  currentSection,
  editedValues,
  notifySuccess,
  notifyError,
  updateDataInState
) => {
  try {
    await axios.post(
      "http://localhost:80/dev/react/japfood/actions/update_data.php",
      {
        currentSection: currentSection,
        editedValues: editedValues,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    notifySuccess("Дані успішно збережено!");
    updateDataInState(editedValues);
  } catch (error) {
    notifyError(
      "Помилка при збереженні даних! Ознайомитися детально з помилкою можна в консолі браузера."
    );

    console.error("Error saving data:", error);
  }
};

export default fetchUpdateData;
