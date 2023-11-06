import axios from "axios";

const fetchTotalRows = async (category) => {
  const response = await axios.get(
    "http://localhost:80/dev/react/japfood/get_total_rows.php",
    {
      params: { category },
    }
  );
  return response.data;
};

export default fetchTotalRows;
