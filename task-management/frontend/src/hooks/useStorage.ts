/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export default function useStorage(key: string, value: any = null) {
  const [data, setData] = useState(() => {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, value);
      return value;
    }

    if (!value) return item;

    const storageData = JSON.parse(item);
    if (Array.isArray(storageData)) {
      if (Array.isArray(value)) {
        return [...storageData, ...value];
      }
      return [...storageData, value];
    }

    if (Object.prototype.toString.call(storageData) === "[object Object]") {
      return {
        ...storageData,
        ...value,
      };
    }

    return null;
  });

  useEffect(() => {
    setData(value);
  }, [value]);

  return { data };
}
