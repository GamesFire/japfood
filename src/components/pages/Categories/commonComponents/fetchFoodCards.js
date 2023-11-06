import axios from "axios";

const fetchFoodCards = async (category, page) => {
  const response = await axios.get(
    "http://localhost:80/dev/react/japfood/get_data.php",
    {
      params: { category, page },
    }
  );
  return response.data;
};

export default fetchFoodCards;
