import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ContactUs.module.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFocus = (e) => {
    const input = e.target;
    const label = input.previousElementSibling;

    if (label) {
      if (!input.value) {
        label.classList.add(styles.focused);
      }
    }
  };

  const handleBlur = (e) => {
    const input = e.target;
    if (!input.value) {
      const label = input.previousElementSibling;
      if (label) {
        label.classList.remove(styles.focused);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      notifySuccess(
        "Ваше повідомлення надіслано. Очікуйте на відповідь на вказану адресу електронної пошти."
      );
      setSubmitDisabled(true);
      setTimeout(() => setSubmitDisabled(false), 5000);

      // Handle form submission, e.g., send the data to a server
      console.log("Form data submitted:", formData);
    }

    setSubmitDisabled(true);
    setTimeout(() => setSubmitDisabled(false), 5000);
  };

  const validateForm = (formData) => {
    const { name, email, subject, message } = formData;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!name || !email || !subject || !message) {
      notifyError(
        "Всі поля є обов'язковими для заповнення. Будь ласка, заповніть всі поля."
      );
      return false;
    } else if (!email.match(emailRegex)) {
      notifyError("Будь ласка, введіть дійсну адресу електронної пошти.");
      return false;
    } else if (
      name.length > 255 ||
      email.length > 255 ||
      subject.length > 255
    ) {
      notifyError(
        `Текстові поля (окрім "повідомлення") повинні містити максимум 255 символів.`
      );
      return false;
    }

    return true;
  };

  const notifyError = (message) => {
    toast.error(message, {
      autoClose: 5000,
      position: "bottom-center",
      draggable: false,
      theme: "colored",
    });
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      autoClose: 5000,
      position: "bottom-center",
      draggable: false,
      theme: "colored",
    });
  };

  return (
    <div className={styles.contactUs}>
      <h2 className={`subtitle ${styles.subtitle}`}>Зв'яжіться з нами</h2>
      <p className={styles.text}>
        Ми цінуємо ваш внесок і готові допомогти вам на кожному кроці. Якщо у
        вас виникли запитання, проблеми або побажання, будь ласка, зв'яжіться з
        нашою службою підтримки клієнтів через наведену форму нижче, і ми з
        радістю вам допоможемо.
      </p>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        autoComplete="off"
        noValidate
      >
        <h3 className={styles.formHeader}>Надіслати нам повідомлення</h3>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Ім'я:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            className={styles.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className={styles.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.label}>
            Тема:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            className={styles.subject}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Повідомлення:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            className={styles.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitDisabled}
        >
          Надіслати
        </button>
      </form>
      <ToastContainer limit={1} />
    </div>
  );
};

export default ContactUs;
