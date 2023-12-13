import axios from "axios";

const fetchTotalRows = async (category, onNewData, signal) => {
  const source = axios.CancelToken.source();

  const poll = async (lastUpdate = 0) => {
    try {
      const response = await axios.get(
        "http://localhost:80/dev/react/japfood/get_total_rows.php",
        {
          params: {
            category,
            lastUpdate,
          },
          cancelToken: source.token,
        }
      );

      onNewData(response.data);

      poll(response.data.totalRows);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }

      console.error(`Error fetching ${category} total rows:`, error);

      setTimeout(() => poll(), 5000);
    }
  };

  signal.addEventListener("abort", () =>
    source.cancel("Operation canceled by user due to section change.")
  );

  poll();
};

export default fetchTotalRows;
