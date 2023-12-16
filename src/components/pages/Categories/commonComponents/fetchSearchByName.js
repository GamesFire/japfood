import axios from "axios";

const fetchSearchByName = async (category, searchQuery, currentLanguage) => {
  try {
    const response = await axios.get(
      "http://localhost:80/dev/react/japfood/queries/get_search_by_name.php",
      {
        params: { category, searchQuery, currentLanguage },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchSearchByName;
