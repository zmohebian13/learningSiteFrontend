import React, { useEffect, useState } from 'react'

export default function LandingCounter({count}) {
  
    const [statusCounter, setStatusCounter] = useState(0);

    useEffect(() => {
      let interval = setInterval(() => {
        setStatusCounter((prevCount) => prevCount + 1);
      }, 1);

      if (statusCounter === count) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, [statusCounter]);
  
    return (
      <div>
        <span className="landing-status-count">{statusCounter}</span>
      </div>
    );
}
