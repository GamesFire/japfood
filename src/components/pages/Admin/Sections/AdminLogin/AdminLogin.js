import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AdminLogin.module.css";
import Container from "../../../../container/Container";

const AdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    adminLogin: "",
    adminPassword: "",
  });
  const [isInputDisabled, setInputDisabled] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm(formData)) {
      try {
        setSubmitDisabled(true);

        const response = await axios.post(
          "http://localhost:80/dev/react/japfood/admin_login/admin_login_form.php",
          new URLSearchParams(formData),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.data.accessAllowed) {
          notifySuccess("Вхід успішно виконан!");

          onLogin(true);
        } else {
          notifyError("Введено невірні дані. Доступ заборонено!");

          notifyError(
            "Ви витратили єдину спробу. Вас було заблоковано, якщо це помилка, то будь ласка зверніться до адміністратора сайту."
          );

          onLogin(false);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        notifyError("Сталася помилка. Спробуйте пізніше.");

        onLogin(false);
      } finally {
        setInputDisabled(true);
        setSubmitDisabled(true);
      }
    }
  };

  const validateForm = (formData) => {
    const { adminLogin, adminPassword } = formData;

    if (!adminLogin || !adminPassword) {
      notifyError(
        `Всі поля є обов'язковими для заповнення. Будь ласка, заповніть всі поля.`
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
    <section className={`section ${styles.adminLogin}`}>
      <Container>
        <h2 className={`subtitle ${styles.subtitle}`}>
          Вхід до адмінської панелі
        </h2>
        <p className={styles.text}>
          Наразі Ви намагаєтеся увійти в адмінську панель на сайті
          Japfood.cuisine. Доступ до адмінпанелі дозволяється тільки довіреним
          особам веб-сайту, якщо Ви не є такою особою, Ви маєте негайно залишити
          дану веб-сторінку, інакше при неправильній авторизації доступ буде
          заборонено, і Вас буде негайно заблоковано! Крім того, врахуйте, що у
          Вас є тільки одна спроба для авторизації, а також уся інформація на
          адмінській веб-сторінці тільки українською мовою.
        </p>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          autoComplete="off"
          noValidate
        >
          <h3 className={styles.formHeader}>Спроба входу в адмінську панель</h3>
          <div className={styles.formGroup}>
            <label htmlFor="adminLogin" className={styles.label}>
              Логін
            </label>
            <input
              type="text"
              id="adminLogin"
              name="adminLogin"
              value={formData.adminLogin}
              className={styles.login}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={isInputDisabled}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="adminPassword" className={styles.label}>
              Пароль
            </label>
            <input
              type="password"
              id="adminPassword"
              name="adminPassword"
              value={formData.adminPassword}
              className={styles.password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={isInputDisabled}
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitDisabled}
          >
            Увійти
          </button>
        </form>
        <ToastContainer limit={2} />
      </Container>
    </section>
  );
};

export default AdminLogin;
