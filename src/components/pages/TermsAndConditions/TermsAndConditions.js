import React from "react";
import { Link } from "react-router-dom";
import styles from "./TermsAndConditions.module.css";
import Container from "../../container/Container";

const TermsAndConditions = () => {
  return (
    <main>
      <section className={`section`}>
        <Container>
          <div className={styles.content}>
            <h1 className={`title ${styles.title}`}>Умови та Положення</h1>
            <p className={styles.text}>
              Ці "Умови та Положення" ("Угода") є юридичною угодою між Вами
              ("Користувач" або "ви") і Japfood.cuisine ("ми", "нас" або "наш").
              Ця Угода встановлює загальні умови та положення використання Вами
              веб-сайту Japfood.cuisine ("Веб-сайт") і будь-яких пов'язаних з
              ним послуг або контенту, що надаються Japfood.cuisine ("Послуги").
            </p>
            <p className={styles.text}>
              Отримуючи доступ до Веб-сайту або використовуючи його, Ви
              погоджуєтеся дотримуватися цих Умов та Положень. Якщо Ви не згодні
              дотримуватися цієї Угоди, будь ласка, не використовуйте Веб-сайт.
            </p>
            <h2 className={`subtitle ${styles.subtitle}`}>
              1. Політика конфіденційності
            </h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Використання Вами Веб-сайту також регулюється нашою{" "}
                <Link to="/privacy-policy" className={styles.link}>
                  Політикою Конфіденційності
                </Link>
                , яка включена шляхом посилання в цю Угоду.
              </li>
              <li className={styles.listItem}>
                Використовуючи Веб-сайт, Ви погоджуєтеся з умовами Політики
                Конфіденційності.
              </li>
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              2. Використання контенту
            </h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Вміст, доступний на Сайті, призначений лише для інформаційного
                та особистого використання.
              </li>
              <li className={styles.listItem}>
                Ви не маєте права копіювати, змінювати, поширювати або продавати
                будь-який контент з цього Сайту.
              </li>
              <li className={styles.listItem}>
                Комерційне використання або розповсюдження будь-якого контенту з
                цього Сайту суворо заборонено.
              </li>
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              3. Інформація про продукт
            </h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Інформація про продукцію, включаючи зображення, назви, ціни,
                вагу, інгредієнти та описи, надана на Веб-сайті, носить
                інформаційний характер.
              </li>
              <li className={styles.listItem}>
                Ми не гарантуємо точність, повноту або своєчасність цієї
                інформації.
              </li>
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              4. Категорії та сортування
            </h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                На Сайті представлено чотири категорії: Суші, Супи, Десерти та
                Напої.
              </li>
              <li className={styles.listItem}>
                Користувачі можуть шукати продукти за назвою в цих категоріях і
                сортувати продукти за ціною та вагою.
              </li>
              <li className={styles.listItem}>
                Ми намагаємося підтримувати інформацію про категорії в
                актуальному стані, але не можемо гарантувати наявність
                конкретних продуктів.
              </li>
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              5. Зв'язок та підтримка
            </h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Користувачі можуть зв'язатися з нашою службою підтримки через
                сторінку "Допомога", де передбачена форма для запитів.
              </li>
              <li className={styles.listItem}>
                Ви погоджуєтеся надати точну та актуальну контактну інформацію.
              </li>
              <li className={styles.listItem}>
                Ми прагнемо відповідати на запити вчасно, але не гарантуємо час
                відповіді.
              </li>
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              6. Авторське право та торгові марки
            </h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Весь контент і матеріали на цьому Веб-сайті, включаючи текст,
                графіку, логотипи та зображення, є власністю Japfood.cuisine.
              </li>
              <li className={styles.listItem}>
                Ви не можете використовувати наші торгові марки, торгові назви
                або знаки обслуговування у зв'язку з будь-яким продуктом або
                послугою, які не належать нам.
              </li>
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              7. Зміни до умов та положень
            </h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Japfood.cuisine залишає за собою право змінювати, модифікувати
                або переглядати ці Умови та Положення в будь-який час.
              </li>
              <li className={styles.listItem}>
                Ваше подальше використання Веб-сайту після будь-яких таких змін
                означає, що Ви приймаєте переглянуту Угоду.
              </li>
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>8. Припинення дії</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Japfood.cuisine може припинити або призупинити Ваш доступ до
                Сайту без попереднього повідомлення з будь-якої причини.
              </li>
            </ul>
            <h2 className={`subtitle ${styles.subtitle}`}>
              9. Регулююче законодавство
            </h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                Ці Умови та Положення регулюються і тлумачаться відповідно до
                законодавства.
              </li>
            </ul>
            <p className={styles.text}>
              <strong>
                Якщо у Вас виникли запитання або сумніви щодо цих Умов та
                Положень, будь ласка, зв'яжіться з нами через форму на сторінці
                "Допомога" для отримання додаткової інформації.
              </strong>
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default TermsAndConditions;
