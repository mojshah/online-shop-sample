import { useEffect } from "react";

const useOutsideClickChecker = (ref, stateNullSetter, emptyArraySetter) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (stateNullSetter) {
          stateNullSetter(null);
        }
        if (emptyArraySetter) {
          emptyArraySetter([]);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export default useOutsideClickChecker;
