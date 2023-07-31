"use client";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useState, useEffect, useCallback } from "react";
dayjs.extend(duration);

const Timer = ({ dueToDate }: { dueToDate: string }) => {
  const dueToTime = dayjs(dueToDate, "YYYY-MM-DDTHH:mm:ss");

  const getTimeDiff = useCallback(() => {
    const currentTime = dayjs();

    return dueToTime.diff(currentTime, "second");
  }, [dueToTime]);

  const [timeDiff, setTimeDiff] = useState(getTimeDiff());

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = getTimeDiff();
      setTimeDiff(diff);

      if (diff < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [getTimeDiff]);

  function formatTime(time: number) {
    const hours = time < 0 ? 0 : Math.floor(time / 3600);
    const minutes = time < 0 ? 0 : Math.floor((time % 3600) / 60);
    const seconds = time < 0 ? 0 : time % 60;
    return (
      <>
        <div className="flex flex-col">
          <span className="font-mono text-5xl countdown">
            <span style={{ "--value": hours }}></span>
          </span>
          시간
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-5xl countdown">
            <span style={{ "--value": minutes }}></span>
          </span>
          분
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-5xl countdown">
            <span style={{ "--value": seconds }}></span>
          </span>
          초
        </div>
      </>
    );
  }
  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      {formatTime(timeDiff)}
    </div>
  );
};

export default Timer;
