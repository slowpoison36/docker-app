/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useThemeContext } from "../hooks/useTheme";

export default function ConfirmModal({
  header,
  actionBtn,
  children,
}: {
  header: string;
  actionBtn: Array<{ name: string; action: () => any }>;
  children: React.ReactNode;
}) {
  const { isDarkMode } = useThemeContext();

  return (
    <>
      {createPortal(
        <div
          className={
            isDarkMode
              ? `${styles["modal-overlay"]} dark_mode`
              : styles["modal-overlay"]
          }
        >
          <div className={` ${styles["modal-content"]}`}>
            <div className={styles["modal-title"]}>{header || "Confirm"}</div>
            <div className="p-3">{children}</div>

            <footer className="action-btn p-3">
              {actionBtn.map((btn) => (
                <button
                  key={btn.name}
                  className="btn-primary"
                  onClick={() => btn.action()}
                >
                  {btn.name}
                </button>
              ))}
            </footer>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
