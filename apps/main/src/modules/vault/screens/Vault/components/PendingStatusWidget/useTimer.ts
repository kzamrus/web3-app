import { useState, useEffect } from 'react';
import { intervalToDuration } from 'date-fns';

export function useTimer(inputTimestamp: number): string {
  const [time, setTime] = useState<string>('');

  const formatDuration = (endTimestamp: number) => {
    const endDate: Date = new Date(endTimestamp * 1000);
    const now: Date = new Date();

    const duration =
      now <= endDate
        ? intervalToDuration({ start: now, end: endDate  })
        : { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const { days, hours, minutes } = duration;
    return `${days !== undefined ? days : 0}d : ${hours !== undefined ? hours : 0 }h : ${minutes !== undefined ? minutes : 0}m`;
  };

  useEffect(() => {
    const updateTime = (): void => {
      const formattedTime: string = formatDuration(inputTimestamp);
      setTime(formattedTime);
    };

    updateTime();
    const intervalId: NodeJS.Timeout = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, [inputTimestamp]);

  return time;
}
