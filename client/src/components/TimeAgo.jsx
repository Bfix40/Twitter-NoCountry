import React, { useEffect, useState } from 'react'
import { getTimeAgo } from '../../utils/formateadorTiemposRelativos';

const TimeAgo = ({ timestamp, styleds = "" }) => {
  const [time, setTime] = useState(getTimeAgo(timestamp))

  useEffect(() => {
    const newInterval = setInterval(() => {
      setTime(getTimeAgo(timestamp))
    }, 5000);

    return () => {
      clearInterval(newInterval);
    };
  }, [time]);

  return (
        <span className={styleds}>{` · ${time}`}</span>
  )
}

export default TimeAgo
