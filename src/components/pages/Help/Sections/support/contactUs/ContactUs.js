import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ContactUs.module.css";

const ContactUs = () => {
  const { t } = useTranslation();
  const contactUsLocalization = t("pages.help.sections.support.contact_us", {
    returnObjects: true,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm(formData)) {
      try {
        setSubmitDisabled(true);

        const response = await axios.post(
          "http://localhost:80/dev/react/japfood/submit_form.php",
          new URLSearchParams(formData),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.data.status === "success") {
          notifySuccess(`${contactUsLocalization.notify_success}`);

          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          notifyError(contactUsLocalization.notify_error);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        notifyError(contactUsLocalization.notify_error);
      } finally {
        setSubmitDisabled(false);
      }
    }
  };

  const validateForm = (formData) => {
    const { name, email, subject, message } = formData;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!name || !email || !subject || !message) {
      notifyError(`${contactUsLocalization.notify_error_empty}`);
      return false;
    } else if (!email.match(emailRegex)) {
      notifyError(`${contactUsLocalization.notify_error_email}`);
      return false;
    } else if (
      name.length > 255 ||
      email.length > 255 ||
      subject.length > 255
    ) {
      notifyError(`${contactUsLocalization.notify_error_max_symbols}`);
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
      onOpen: () => {
        setSubmitDisabled(true);
      },
      onClose: () => {
        setSubmitDisabled(false);
      },
    });
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      autoClose: 5000,
      position: "bottom-center",
      draggable: false,
      theme: "colored",
      onOpen: () => {
        setSubmitDisabled(true);
      },
      onClose: () => {
        setSubmitDisabled(false);
      },
    });
  };

  return (
    <div className={styles.contactUs}>
      <h2 className={`subtitle ${styles.subtitle}`}>
        {contactUsLocalization.subtitle}
      </h2>
      <p className={styles.text}>{contactUsLocalization.text}</p>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        autoComplete="off"
        noValidate
      >
        <h3 className={styles.formHeader}>
          {contactUsLocalization.form_header}
        </h3>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            {contactUsLocalization.form_name}
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
            {contactUsLocalization.form_email}
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
            {contactUsLocalization.form_subject}
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
            {contactUsLocalization.form_message}
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
          {contactUsLocalization.form_submit}
        </button>
      </form>
      <ToastContainer limit={1} />
    </div>
  );
};

export default ContactUs;
