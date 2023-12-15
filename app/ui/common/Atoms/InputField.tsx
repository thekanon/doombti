import React from "react";
import Icon from "./Icon"; // Adjust the import path as necessary

export interface InputProps {
  status: "active" | "fill" | "default";
  type:
    | "default"
    | "code"
    | "username"
    | "email"
    | "password"
    | "normal"
    | "phone";
  theme: "light" | "dark";
  placeholder?: string;
}

export const InputField = ({
  status = "default",
  type = "default",
  theme = "light",
  placeholder = "",
}: InputProps) => {
  // Tailwind 클래스를 조합하여 스타일을 정의합니다.
  const baseClasses = "Large Semibold flex p-2 items-center gap-3 flex-grow";

  const statusClasses = {
    active:
      theme === "light" ? "active-input-field" : "dark-active-input-field",
    fill: theme === "light" ? "fill-input-field" : "dark-fill-input-field",
    default:
      theme === "light" ? "default-input-field" : "dark-default-input-field",
  };

  const inputType = type === "password" ? "password" : "text";

  return (
    <div
      className={`my-2 flex items-center gap-3 p-3 input-field ${statusClasses[status]} ${theme}
    `}
    >
      <Icon type={type} theme={theme} />
      <input
        type={inputType}
        className={`${baseClasses} focus:outline-none`}
        placeholder={
          placeholder === "" && type !== "default" && type !== "code"
            ? type
            : ""
        }
      />
    </div>
  );
};
