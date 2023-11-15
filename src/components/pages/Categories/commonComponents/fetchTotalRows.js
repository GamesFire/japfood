import axios from "axios";

const fetchTotalRows = async (category) => {
  try {
    const response = await axios.get(
      "http://localhost:80/dev/react/japfood/get_total_rows.php",
      {
        params: { category },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} total rows:`, error);
    return { totalRows: 0 };
  }
};

export default fetchTotalRows;
