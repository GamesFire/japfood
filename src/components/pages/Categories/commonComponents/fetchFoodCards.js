import axios from "axios";

const fetchFoodCards = async (category, page, currentLanguage, signal) => {
  try {
    const response = await axios.get(
      "http://localhost:80/dev/react/japfood/get_data.php",
      {
        params: { category, page, currentLanguage },
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error.name === "CanceledError") {
      throw error;
    }

    console.error(`Error fetching ${category} food cards:`, error);
    return [];
  }
};

export default fetchFoodCards;
