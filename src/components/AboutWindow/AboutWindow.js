import "bootstrap/dist/css/bootstrap.min.css";
import "./css/about.css";
import { useState } from "react";
import Logo from "../../assets/logo512.png";
import Author from "../../assets/author.jpg";
import man from "../../assets/rmanum.png";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { SiTelegram } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const AboutWindow = () => {
  const [content, setContent] = useState("Про Проєкт"); // Default content
  const [activeBtn, setActiveBtn] = useState(1); // Track active button
  const [openIndexes, setOpenIndexes] = useState([]); // Track multiple open indexes

  const toggleAnswer = (index) => {
    // Toggle the clicked FAQ item in the openIndexes array
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleContentChange = (newContent, x) => {
    setContent(newContent);
    setActiveBtn(x); // Set the active button
  };

  return (
    <div className="container_about">
      <div className="title">
        <h2>{content}</h2>
      </div>
      <div className="btn-nav">
        <button
          className={`btn btn-custom ${activeBtn === 1 ? "active" : ""}`}
          onClick={() => handleContentChange("Про Проєкт", 1)}
        >
          Про Проєкт
        </button>

        <button
          className={`btn btn-custom ${activeBtn === 2 ? "active" : ""}`}
          onClick={() => handleContentChange("Про Автора", 2)}
        >
          Про Автора
        </button>
        {/* <button
          className={`btn btn-custom ${activeBtn === 3 ? "active" : ""}`}
          onClick={() => handleContentChange("Зворотний Зв'язок", 3)}
        >
          Зворотний Зв'язок
        </button> */}
      </div>
      

            {activeBtn === 1 && (
                  <section className="about-section">
                    <div className="about-alert">
                        <p>
                            ❗Не використовуйте сайт як основне джерело оповіщення про
                            відключення у вашому регіоні.
                        </p>
                    </div>
                    <div className="about-info-bg">
                        <div className="about-info">
                            <h3>
                                <span>|</span>Мета Проєкту
                            </h3>
                            <p>
                                Проєкт "Світлячок" спрямований на допомогу жителям Рівненської
                                області в отриманні інформації про заплановані та поточні
                                відключення електроенергії.<br></br> Наша мета — забезпечити
                                доступність даних для зручного планування часу.
                            </p>
                        </div>
                    </div>
                    <div className="about-info-bg">
                        <div className="about-info">
                            <h3>
                                <span>|</span>Як користуватися сайтом
                            </h3>
                            <p>
                                Сайт надає зручний інтерфейс для перегляду інформації про
                                відключення електроенергії за регіонами, районами та навіть
                                окремими вулицями.<br></br> Оберіть свій населений пункт та
                                отримуйте повідомлення про можливі перебої в
                                електропостачанні.
                            </p>
                        </div>
                    </div>
                    <div className="about-info-bg">
                        <div className="about-info">
                            <h3>
                                <span>|</span>
                                Часті Запитання (FAQ)
                            </h3>
                        </div>

                        {/* FAQ item 1 */}
                        <div className="about-info faq-item">
                            <p onClick={() => toggleAnswer(0)}>
                                <strong>
                                    Чи можу я покладатися на дані сайту як на основне джерело?
                                </strong>
                                <span
                                    className={`arrow ${openIndexes.includes(0) ? "open" : ""}`}
                                >
                    {openIndexes.includes(0) ? (
                        <FaChevronUp/>
                    ) : (
                        <FaChevronDown/>
                    )}
                  </span>
                            </p>
                            {openIndexes.includes(0) && (
                                <p>
                                    Цей сайт надає інформацію на основі відкритих джерел і може
                                    містити певні неточності. <br/>
                                    Ми рекомендуємо користуватися офіційними джерелами для
                                    отримання найактуальніших даних.
                                </p>
                            )}
                        </div>

                        {/* FAQ item 2 */}
                        <div className="about-info faq-item">
                            <p onClick={() => toggleAnswer(1)}>
                                <strong>Звідки береться інформація про відключення?</strong>
                                <span
                                    className={`arrow ${openIndexes.includes(1) ? "open" : ""}`}
                                >
                    {openIndexes.includes(1) ? (
                        <FaChevronUp/>
                    ) : (
                        <FaChevronDown/>
                    )}
                  </span>
                            </p>
                            {openIndexes.includes(1) && (
                                <p>
                                    Дані збираються з офіційних джерел, таких як місцеві
                                    постачальники електроенергії та органи державної влади,
                                    однак вони можуть затримуватися через швидкість оновлення
                                    даних.
                                </p>
                            )}
                        </div>

                        {/* FAQ item 3 */}
                        <div className="about-info faq-item">
                            <p onClick={() => toggleAnswer(2)}>
                                <strong>
                                    Чи можу я отримувати повідомлення про відключення?
                                </strong>
                                <span
                                    className={`arrow ${openIndexes.includes(2) ? "open" : ""}`}
                                >
                    {openIndexes.includes(2) ? (
                        <FaChevronUp/>
                    ) : (
                        <FaChevronDown/>
                    )}
                  </span>
                            </p>
                            {openIndexes.includes(2) && (
                                <p>
                                    Наразі ми працюємо над можливістю налаштування сповіщень для
                                    користувачів, щоб ви могли бути в курсі відключень.
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="about-info-bg">
                        <div className="about-info">
                            <h3>
                                <span>|</span>Наші Пріоритети
                            </h3>
                            <p>
                                Ми прагнемо забезпечити зручний доступ до інформації про
                                відключення електроенергії, підвищуючи обізнаність та
                                допомагаючи людям адаптуватися до можливих перебоїв у
                                постачанні.
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {activeBtn === 2 && (
               
                    <div className="author-info-container">
                        <div className="author-photo">
                            <img src={Author} alt="Author-image"/>
                        </div>
                        <div className="author-photo-info">
                            <h1>Зарічнюк Андрій</h1>
                            <div className="label-info">
                                <div>
                                    <p>
                                        {" "}
                                        <img src={Logo} alt=""/> Керівник Bytes Union
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        {" "}
                                        <img src={man} alt=""/> Дійсний член РМАНу
                                    </p>
                                </div>
                            </div>

                            <div className="author-info">
                                <h3>Про мене</h3>
                                <p>
                                    Учень 11 - ФМ класу Рівненського ліцею «Елітар», студент 2
                                    курсу IT Step Academy за спеціальністю «Розробка ПЗ»,
                                    Переможець Всеукраїнського Інженерно-технологічного
                                    хакатону, призер і переможець І-ІІ етапів Всеукраїнських
                                    олімпіад з інформатики, ІКТ.
                                </p>
                                <h3>Мої Контакти</h3>
                                <div className="label-info">
                                    <a
                                        href="https://www.instagram.com/aernjdz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <LuInstagram/>
                                    </a>
                                    <a
                                        href="https://t.me/Aernjdz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <SiTelegram/>
                                    </a>
                                    <a
                                        href="https://github.com/aernjdz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaGithub/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
           
            )}
           
       
        <footer className="footer-content">
                <p>
                    За підтримки
                    <img src={Logo} className="footer-logo" alt="Bytes Union Logo"/>
                    Bytes Union
                </p>
            </footer>
    </div>
  );
};

export default AboutWindow;
