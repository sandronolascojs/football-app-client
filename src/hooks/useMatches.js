import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useMatches = () => {
  const { fixture } = useSelector((state) => state.app);
  const [nextMatch, setNextMatch] = useState({});

  useEffect(() => {
    let currentMatch = { rawDate: new Date().toLocaleDateString };
    fixture.forEach((match) => {
      if (currentMatch.rawDate > match.rawDate) {
        currentMatch = match;
      }
    });

    setNextMatch(currentMatch);
    
  }, [fixture]);

  return { nextMatch };
};
