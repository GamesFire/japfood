import axios from "axios";

const translate = async (text) => {
  try {
    const response = await axios.post(
      "http://localhost:80/dev/react/japfood/translate.php",
      {
        text: text,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Translation error:", error);
    return null;
  }
};

export default translate;
