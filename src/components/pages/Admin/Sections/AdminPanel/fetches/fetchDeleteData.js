import axios from "axios";

const fetchDeleteData = async (
  currentSection,
  id,
  notifySuccess,
  notifyError,
  deleteDataFromState
) => {
  try {
    const isConfirmed = window.confirm(
      "Ви дійсно хочете видалити поточні дані?"
    );

    if (isConfirmed) {
      await axios.post(
        "http://localhost:80/dev/react/japfood/actions/delete_data.php",
        {
          currentSection: currentSection,
          deletedCardId: id,
        }
      );

      notifySuccess("Поточні дані успішно видалено!");
      deleteDataFromState(id);
    }
  } catch (error) {
    notifyError(
      "Помилка видалення поточних даних! Ознайомитися детально з помилкою можна в консолі браузера."
    );

    console.error("Error deleting data:", error);
  }
};

export default fetchDeleteData;
