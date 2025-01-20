import { useState, useEffect } from "react";
import axios from "axios";
import { FlipClock } from "../clock";
import { Link } from "react-router-dom";
import { FaMountainCity } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
const MainLayout = () => {
    const [queues, setQueues] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [currentDate, setCurrentDate] = useState("");
    const [preloaderWait, setPreloaderWait] = useState(true); // Затримка для прелоадера

   
    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toISOString().split("T")[0];
        setCurrentDate(formattedDate);

        axios
            .get("https://68c3b280-abb4-4a66-954c-06e5aa9f26a1-00-dkwlxpl3bkvn.janeway.replit.dev/api/getQueues", {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) => {
                const currentData =
                    response.data.dates.find((d) => d.date === formattedDate)?.data || [];
                setQueues(currentData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });

        setTimeout(() => {
            setPreloaderWait(false);
        }, 3000); // 3-second wait


    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setQueues((prevQueues) => [...prevQueues]); // Перерендер
        }, 1000); // Оновлення кожну хвилину

        return () => clearInterval(timer); // Очищення таймера при демонтажі
    }, []);


    // Перевірка активності інтервалу часу
    const isTimeActive = (interval) => {
        const [start, end] = interval.split("-").map((time) => {
            const [hours, minutes] = time.trim().split(":").map(Number);
            const now = new Date();
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        });

        const now = new Date();
        // Якщо зараз між кінцем інтервалу і 30 хвилинами після нього, вважаємо, що енергія можливо відновлена
        if (now >= end && now <= new Date(end.getTime() + 60 * 60 * 1000)) {
            return "wait"; // Повідомлення для інтервалу після його завершення
        }

        return now >= start && now < new Date(end.getTime() + 60000); // Включаючи кінець
    };

// Отримати час, що залишився
    const getTimeRemaining = (interval) => {
        const [_, end] = interval.split("-").map((time) => {
            const [hours, minutes] = time.trim().split(":").map(Number);
            const now = new Date();
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        });

        const now = new Date();
        const remainingTime = end - now;

        // If the interval has not ended yet, return the remaining time
        if (remainingTime > 0) {
            const totalSeconds = Math.floor(remainingTime / 1000);
            const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
            const hours = Math.floor(remainingTime / 1000 / 60 / 60);
            const seconds = totalSeconds % 60;
            return { type: "off", message: `${hours > 0 ? hours + "год" : ""} ${minutes} хв ${seconds} с` };
        }

        // If we're within 30 minutes after the interval ends
        if (now >= end && now <= new Date(end.getTime() + 60 * 60 * 1000)) {
            const remainingAfterEnd = new Date(end.getTime() + 60 * 60 * 1000) - now;
            const remainingMinutes = Math.floor(remainingAfterEnd / 1000 / 60);
            const totalSeconds = Math.floor(remainingAfterEnd / 1000);
            const remainingSeconds = totalSeconds % 60;
            
            return { type: "Wait", message: `Можливо заживлено. (${remainingMinutes} хв ${remainingSeconds} c)` };
        }

        return null;
    };

// Find the next interval
    const getNextInterval = (times) => {
        const now = new Date();
        let closestInterval = null;

        for (const interval of times) {
            const [start] = interval.split("-").map((time) => {
                const [hours, minutes] = time.trim().split(":").map(Number);
                return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            });

            if (now < start) {
                if (!closestInterval || start < closestInterval.start) {
                    closestInterval = { interval, start };
                }
            }
        }

        return closestInterval ? closestInterval.interval : null;
    };


    if (loading) {
        return (
            <div className="preloader">
                <svg width="100px" height="100px" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    <g id="#fff">
                        <path d="M 276.06 289.08 C 282.64 282.65 291.77 278.97 300.97 279.00 C 413.64 278.99 526.31 279.02 638.99 279.02 C 644.29 278.89 649.68 279.45 654.63 281.47 C 667.52 286.37 676.93 299.23 677.51 313.04 C 677.73 344.78 677.35 376.53 677.71 408.25 C 713.30 416.54 746.42 434.95 772.41 460.63 C 795.83 483.69 813.48 512.59 823.12 544.03 C 834.30 580.19 834.89 619.55 824.86 656.05 C 812.82 700.28 784.93 739.97 747.40 766.29 C 723.05 783.67 694.67 795.33 665.17 800.24 C 627.05 806.64 587.11 801.80 551.70 786.27 C 504.65 765.92 465.96 726.97 446.26 679.61 C 401.51 679.46 356.76 679.61 312.00 679.57 C 304.01 679.46 295.69 680.26 288.12 677.13 C 274.94 672.25 265.41 659.04 265.01 644.98 C 264.98 534.98 265.01 424.98 265.00 314.98 C 264.96 305.32 269.03 295.72 276.06 289.08 M 294.39 300.47 C 288.44 303.09 284.64 309.56 285.00 316.04 C 285.00 424.67 285.00 533.31 285.00 641.94 C 284.89 645.37 285.56 648.90 287.41 651.83 C 290.37 656.84 296.20 659.72 301.96 659.50 C 347.95 659.56 393.95 659.41 439.94 659.59 C 436.63 646.90 433.81 634.03 432.80 620.92 C 428.92 578.90 438.79 535.73 460.73 499.67 C 481.29 465.56 512.26 437.84 548.47 421.24 C 582.33 405.58 620.63 399.90 657.61 404.64 C 657.56 374.46 657.67 344.28 657.56 314.10 C 657.31 305.66 649.43 298.54 641.03 298.98 C 528.67 298.98 416.32 299.02 303.97 298.99 C 300.73 298.92 297.36 299.01 294.39 300.47 M 614.59 423.84 C 581.25 427.03 548.92 439.85 522.43 460.33 C 493.90 482.18 472.11 512.77 461.01 546.96 C 447.76 586.74 449.27 631.15 464.97 670.01 C 479.00 705.12 504.49 735.51 536.65 755.42 C 570.45 776.55 611.52 785.49 651.08 780.79 C 684.35 777.00 716.43 763.58 742.52 742.61 C 763.43 725.86 780.57 704.43 792.21 680.29 C 807.07 649.65 812.82 614.69 808.69 580.89 C 804.29 543.00 787.15 506.77 760.86 479.15 C 735.21 451.88 700.79 433.01 663.96 426.18 C 647.80 422.60 631.03 422.38 614.59 423.84 Z" />
                    </g>
                </svg>
                <h6>Bytes Union</h6>
            </div>);

    }

    return (
        <div className="grid">

            <div className="ag-format-container">
                <div className="item_title">Черги ​погодинних відключень у​ Рівненській області</div>
                <div className="ag-time-item_link">
                    <div className="ag-time-item_date-box">
                        <div className="ag-time-item_title">
                            <FlipClock/>
                        </div>
                    </div>
                </div>
                <div className={"item-info"}>
                    <span className={"green"}>
                        <FaCircle/>
                    </span>Заживлені
                    <span className={"red"}>
                        <FaCircle/>
                    </span>Відключені
                    <span className={"yellow"}>
                        <FaCircle/>
                    </span>
                    Можливо
                </div>

                <div className="ag-courses_box">
                    {queues.map((queue) => {
                        const activeInterval = queue?.times.find(isTimeActive);
                        const nextInterval = getNextInterval(queue.times);
                        const statusClass =
                            activeInterval
                                ? getTimeRemaining(activeInterval)?.type === "Wait"
                                    ? "ag-courses-item_bg_yellow" // Yellow if it's in the 'wait' period
                                    : "ag-courses-item_bg_red" // Red if the interval is active
                                : "ag-courses-item_bg_green"; // Green if no active interval

                        return (
                            <div key={queue.queue} className="ag-courses_item">
                                <Link to={`/queues/cherga/${queue.queue}`} className="ag-courses-item_link">
                                    <div className={statusClass}></div>
                                    <div className="ag-courses-item_title">
                                        <span className="ag-courses-item_title_ico">
                                            <FaMountainCity/>
                                        </span>
                                        <span>Черга №{queue.queue}</span>
                                    </div>
                                    <div className="ag-courses-item_date-box">
                                       <span className="ag-courses-item_date">
                            {activeInterval
                                ? getTimeRemaining(activeInterval)?.type === "off"
                                    ? `🔴 (Залишилось: ${getTimeRemaining(activeInterval).message})` :
                                    getTimeRemaining(activeInterval)?.type === "Wait"
                                        ? `🟡  ${getTimeRemaining(activeInterval).message}`
                                        : `🟡  ${getTimeRemaining(activeInterval).message}`
                                : nextInterval
                                    ? `Найближчий: ${nextInterval}`
                                    : "Немає Відключень 🟢"}
</span>

                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
