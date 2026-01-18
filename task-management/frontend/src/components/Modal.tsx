import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useThemeContext } from "../hooks/useTheme";

export default function Modal({
  children,
  handleClose,
  isOpen,
  title,
}: {
  children?: React.ReactNode;
  handleClose?: () => void;
  isOpen?: boolean;
  title?: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animating, setIsAnimating] = useState(false);
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const handleAnimation = () => {
      setIsAnimating(isOpen!);
    };
    modalRef.current?.addEventListener("animationend", handleAnimation);

    return () => {
      modalRef.current?.removeEventListener("animationend", handleAnimation);
    };
  }, []);

  return animating || isOpen
    ? createPortal(
        <div
          className={
            isDarkMode
              ? `${styles["modal-overlay"]} dark_mode`
              : styles["modal-overlay"]
          }
        >
          <div className={styles["modal-content"]} ref={modalRef}>
            <div
              className={`${styles["modal-title"]} flex justify-space-between`}
            >
              <span>{title || "Modal Heading"}</span>
              <span
                className="close-btn"
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  fontWeight: "bolder",
                }}
                onClick={handleClose}
              >
                &times;
              </span>
            </div>
            <div className="p-3">{children}</div>
          </div>
        </div>,
        document.body
      )
    : null;
}
