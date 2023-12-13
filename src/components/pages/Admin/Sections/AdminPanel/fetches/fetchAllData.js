import axios from "axios";

const fetchAllData = async (category, signal) => {
  try {
    const response = await axios.get(
      "http://localhost:80/dev/react/japfood/get_all_data.php",
      {
        params: { category },
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error.name === "CanceledError") {
      throw error;
    }

    console.error(`Error fetching ${category} all data:`, error);
    return [];
  }
};

export default fetchAllData;
