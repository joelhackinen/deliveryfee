import { useState, ChangeEvent } from "react";

export const useField = (type: "text" | "number") => {
  const [value, setValue] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  };

  const reset = (): void => {
    setValue("");
  };

  const hasValue = (): boolean => {
    switch (type) {
      case "number":
        return !isNaN(Number(value)) && Number(value) !== 0;
      case "text":
        return value !== "" && isNaN(Number(value));
    }
  };

  return {
    type,
    value,
    reset,
    hasValue,
    onChange
  };
};