import axios from "axios";

const fetchAdminSearch = async (section, searchQuery) => {
  try {
    const response = await axios.get(
      "http://localhost:80/dev/react/japfood/queries/get_admin_search.php",
      {
        params: {
          currentSection: section,
          searchQuery: JSON.stringify(searchQuery),
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchAdminSearch;
