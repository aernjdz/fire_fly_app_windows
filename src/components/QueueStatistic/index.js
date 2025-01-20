import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {} from "@mui/material";
import { PiLightningSlashFill } from "react-icons/pi";
import { FaBoltLightning } from "react-icons/fa6";
import "./css/statistic.css";
import { FaDatabase } from "react-icons/fa";
const QueueStatistic = () => {
    const { id } = useParams(); // Get the queue ID from the URL
  const [queueStat, setQueueStat] = useState(null);
  const [queueStatnext, setQueueStatnext] = useState(null);
  const [inactiveTime, setInactiveTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [inactiveTimenext, setInactiveTimenext] = useState(0);
  const [activeTimenext, setActiveTimenext] = useState(0);
  const [currentIntervalStatus, setCurrentIntervalStatus] = useState(null);
const mus = [];
  // Fetch queue statistics from API
  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const response = await fetch(`https://68c3b280-abb4-4a66-954c-06e5aa9f26a1-00-dkwlxpl3bkvn.janeway.replit.dev/api/getQueues_v2`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setQueueStat(data);
      } catch (error) {
        console.error("Error fetching queue statistics:", error);
      }
    };

    fetchQueueData();
  }, [id]);

  useEffect(()=>{
    const fetchData = async () =>{
        try{
            const response = await fetch("https://68c3b280-abb4-4a66-954c-06e5aa9f26a1-00-dkwlxpl3bkvn.janeway.replit.dev/api/getQueuesNextDay_v2");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
              }
              const data = await response.json();
              setQueueStatnext(data);
            } catch (error) {
              console.error("Error fetching queue statistics:", error);
            }
    };
    fetchData();
  }, [id]);
  // Calculate duration between start and end time
  const calculateDuration = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0);

    return Math.floor((endDate - startDate) / (1000 * 60 * 60)); // Convert to hours
  };

  // Format minutes to HH:MM
  const formatMinutesToHHMM = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}`;
  };

  // Calculate total active and inactive times
  useEffect(() => {
    if (queueStat) {
      let inactiveTotal = 0;
      let activeTotal = 0;

      queueStat.dates.intervals.forEach((queueData) => {
        if (queueData.queue === id) {
          queueData.intervals.forEach(({ startTime, endTime, status }) => {
            const timeDifference = calculateDuration(startTime, endTime) * 60; // Convert to minutes
            if (status === "Inactive") {
              inactiveTotal += timeDifference;
            } else if (status === "Active") {
              activeTotal += timeDifference;
            }
          });
        }
      });

      setInactiveTime(inactiveTotal);
      setActiveTime(activeTotal);
    }
  }, [queueStat, id]);

  useEffect(() => {
    if (queueStatnext) {
      let inactiveTotal = 0;
      let activeTotal = 0;

      queueStatnext.dates.intervals.forEach((queueData) => {
        if (queueData.queue === id) {
          queueData.intervals.forEach(({ startTime, endTime, status }) => {
            const timeDifference = calculateDuration(startTime, endTime) * 60; // Convert to minutes
            if (status === "Inactive") {
              inactiveTotal += timeDifference;
            } else if (status === "Active") {
              activeTotal += timeDifference;
            }
          });
        }
      });

      setInactiveTimenext(inactiveTotal);
      setActiveTimenext(activeTotal);
    }
  }, [queueStatnext, id]);


  

  // Check the current interval status
  const checkCurrentInterval = () => {
    const now = new Date();
    if (queueStat) {
      queueStat.dates.intervals.forEach((queueData) => {
        if (queueData.queue === id) {
          queueData.intervals.forEach((interval) => {
            const [startHour, startMinute] = interval.startTime.split(":").map(Number);
            const [endHour, endMinute] = interval.endTime.split(":").map(Number);

            const startTime = new Date();
            startTime.setHours(startHour, startMinute, 0);

            const endTime = new Date();
            endTime.setHours(endHour, endMinute, 0);

            if (now >= startTime && now <= endTime) {
              setCurrentIntervalStatus(interval.status);
            }
          });
        }
      });
    }
  };

  // Set interval to check current status every minute
  useEffect(() => {
    checkCurrentInterval();
    const interval = setInterval(() => {
        checkCurrentInterval();
      }, 10000); // Оновлення кожні 10 секунд // Check every minute

    return () => clearInterval(interval);
  });


  if (!queueStat) {
    return (
      <div className="preloader">
        <svg
          width="100px"
          height="100px"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="#fff">
            <path d="M 276.06 289.08 C 282.64 282.65 291.77 278.97 300.97 279.00 C 413.64 278.99 526.31 279.02 638.99 279.02 C 644.29 278.89 649.68 279.45 654.63 281.47 C 667.52 286.37 676.93 299.23 677.51 313.04 C 677.73 344.78 677.35 376.53 677.71 408.25 C 713.30 416.54 746.42 434.95 772.41 460.63 C 795.83 483.69 813.48 512.59 823.12 544.03 C 834.30 580.19 834.89 619.55 824.86 656.05 C 812.82 700.28 784.93 739.97 747.40 766.29 C 723.05 783.67 694.67 795.33 665.17 800.24 C 627.05 806.64 587.11 801.80 551.70 786.27 C 504.65 765.92 465.96 726.97 446.26 679.61 C 401.51 679.46 356.76 679.61 312.00 679.57 C 304.01 679.46 295.69 680.26 288.12 677.13 C 274.94 672.25 265.41 659.04 265.01 644.98 C 264.98 534.98 265.01 424.98 265.00 314.98 C 264.96 305.32 269.03 295.72 276.06 289.08 M 294.39 300.47 C 288.44 303.09 284.64 309.56 285.00 316.04 C 285.00 424.67 285.00 533.31 285.00 641.94 C 284.89 645.37 285.56 648.90 287.41 651.83 C 290.37 656.84 296.20 659.72 301.96 659.50 C 347.95 659.56 393.95 659.41 439.94 659.59 C 436.63 646.90 433.81 634.03 432.80 620.92 C 428.92 578.90 438.79 535.73 460.73 499.67 C 481.29 465.56 512.26 437.84 548.47 421.24 C 582.33 405.58 620.63 399.90 657.61 404.64 C 657.56 374.46 657.67 344.28 657.56 314.10 C 657.31 305.66 649.43 298.54 641.03 298.98 C 528.67 298.98 416.32 299.02 303.97 298.99 C 300.73 298.92 297.36 299.01 294.39 300.47 M 614.59 423.84 C 581.25 427.03 548.92 439.85 522.43 460.33 C 493.90 482.18 472.11 512.77 461.01 546.96 C 447.76 586.74 449.27 631.15 464.97 670.01 C 479.00 705.12 504.49 735.51 536.65 755.42 C 570.45 776.55 611.52 785.49 651.08 780.79 C 684.35 777.00 716.43 763.58 742.52 742.61 C 763.43 725.86 780.57 704.43 792.21 680.29 C 807.07 649.65 812.82 614.69 808.69 580.89 C 804.29 543.00 787.15 506.77 760.86 479.15 C 735.21 451.88 700.79 433.01 663.96 426.18 C 647.80 422.60 631.03 422.38 614.59 423.84 Z" />
          </g>
        </svg>
        <h6>Bytes Union</h6>
      </div>
    );
  }

  return (
    <>
      <div className="ag-format-container">
        <div className="item_title">
          {" "}
          Графік відключень електроенергії у Рівненській області <br />{" "}
          (сьогодні): {id} черга
        </div>
        <div className="this_day">
          <div className="sub_title">Відключення сьогодні</div>
          <div className="schedule">
          <div className="grid_stat">
  {queueStat.dates.intervals.map((queueData) =>
    queueData.queue === id
      ? queueData.intervals.map((interval, idx) => {
          const isCurrentInterval =
            new Date() >= new Date().setHours(
              ...interval.startTime.split(":").map(Number),
              0
            ) &&
            new Date() < new Date().setHours(
              ...interval.endTime.split(":").map(Number),
              0
            );

          return (
            <div
              key={idx}
              className={`column ${isCurrentInterval ? "highlight" : ""}`}
            >
              <div className="time">
                {interval.startTime}
                <br />
                {interval.endTime}
              </div>
              {interval.status === "Inactive" ? (
                <div className="status_green">
                  <FaBoltLightning />
                </div>
              ) : (
                <div className="status_red">
                  <PiLightningSlashFill />
                </div>
              )}
              {isCurrentInterval && <div className="blinking_dot"></div>}
            </div>
          );
        })
      : null
  )}
</div>


          </div>
          <div className="info_blocks">
            <div className="info_block_info">
              <span className="info_block_info_title"> {id} Черга</span>
              <span className="info_block_info_date">
                {new Date(queueStat.dates.date).toLocaleDateString("uk-UA", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <div className="time_st">
                <span className="Active_off"> - {formatMinutesToHHMM(activeTime)} </span>
                <span className="Active_on"> + {formatMinutesToHHMM(inactiveTime)} </span>
              </div>
            </div>
            <div className="periods"> 
                <span className="periods_title">Періоди відключень на сьогодні</span>
                {queueStat.dates.intervals.map((queueData, index) =>
    queueData.queue === id
      ? queueData.intervals.map((interval, idx) => {
          if (interval.status === "Active") { // Only process "Active" intervals
            const startTime = interval.startTime;
            const endTime = interval.endTime;
            const duration = calculateDuration(startTime, endTime); // Calculate duration only for Active intervals
            
            return (
              <div key={idx} className="box_per">
                <span className="periods">
                  <i></i>З <b>{startTime}</b> до <b>{endTime}</b>, тривалість <b>{duration}</b> год.
                </span>
              </div>
            );
          }
          return null; // Skip inactive intervals
        })
      : null
  )}
            </div>
            <div className="graf_info">
                <h5 className="graf_info_title">Позначення до графіка</h5>
                <div className="color_info_box">
                    <div className={"status_green"}>
                        <FaBoltLightning />     
                    </div> 
                    <span>Заживлено</span>
                </div>
                <div className="color_info_box">
                    <div className={"status_red"}>
                        <PiLightningSlashFill />
                    </div>
                    <span>Відключено</span>
                </div>
            </div>
          </div>
        </div>
       
        <div className="next_day">
          <div className="sub_title">Відключення завтра</div>
          { queueStatnext !== null ? (<>
          <div className="schedule">
          <div className="grid_stat">
  {queueStatnext.dates.intervals.map((queueData) =>
    queueData.queue === id
      ? queueData.intervals.map((interval, idx) => {
        

          return (
            <div
              key={idx}
              className={`column`}
            >
              <div className="time">
                {interval.startTime}
                <br />
                {interval.endTime}
              </div>
              {interval.status === "Inactive" ? (
                <div className="status_green">
                  <FaBoltLightning />
                </div>
              ) : (
                <div className="status_red">
                  <PiLightningSlashFill />
                </div>
              )}
              
            </div>
          );
        })
      : null
  )}
</div>


          </div>
          <div className="info_blocks">
            <div className="info_block_info">
              <span className="info_block_info_title"> {id} Черга</span>
              <span className="info_block_info_date">
                {new Date(queueStatnext.dates.date).toLocaleDateString("uk-UA", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <div className="time_st">
                <span className="Active_off"> - {formatMinutesToHHMM(activeTimenext)} </span>
                <span className="Active_on"> + {formatMinutesToHHMM(inactiveTimenext)} </span>
              </div>
            </div>
            <div className="periods"> 
                <span className="periods_title">Періоди відключень на сьогодні</span>
                {queueStatnext.dates.intervals.map((queueData, index) =>
    queueData.queue === id
      ? queueData.intervals.map((interval, idx) => {
          if (interval.status === "Active") { // Only process "Active" intervals
            const startTime = interval.startTime;
            const endTime = interval.endTime;
            const duration = calculateDuration(startTime, endTime); // Calculate duration only for Active intervals
            
            return (
              <div key={idx} className="box_per">
                <span className="periods">
                  <i></i>З <b>{startTime}</b> до <b>{endTime}</b>, тривалість <b>{duration}</b> год.
                </span>
              </div>
            );
          }
          return null; // Skip inactive intervals
        })
      : null
  )}
            </div>
            <div className="graf_info">
                <h5 className="graf_info_title">Позначення до графіка</h5>
                <div className="color_info_box">
                    <div className={"status_green"}>
                        <FaBoltLightning />     
                    </div> 
                    <span>Заживлено</span>
                </div>
                <div className="color_info_box">
                    <div className={"status_red"}>
                        <PiLightningSlashFill />
                    </div>
                    <span>Відключено</span>
                </div>
            </div>
          </div></> ): (<div className="info_none"> 
            <span className="info_none_ico"><FaDatabase/></span>
            <span className="info_none_title">Немає даних</span>
          </div>)}
        </div>
       
      </div>
    </>
  );
};

export default QueueStatistic;
