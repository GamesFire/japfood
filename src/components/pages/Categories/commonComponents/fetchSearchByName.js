import axios from "axios";

const fetchSearchByName = async (category, searchQuery) => {
  const response = await axios.get(
    "http://localhost:80/dev/react/japfood/get_search_by_name.php",
    {
      params: { category, searchQuery },
    }
  );
  return response.data;
};

export default fetchSearchByName;
