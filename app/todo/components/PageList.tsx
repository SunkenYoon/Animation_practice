"use client";
import styles from "./PageList.module.css";
import { useEffect, useRef, useState } from "react";

export default function PageList() {
  const [activeTab, setActiveTab] = useState(TABS[0].name);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;
      if (activeTabElement) {
        const { offsetTop, offsetHeight } = activeTabElement;

        const clipTop = offsetTop;
        const clipBottom = offsetTop + offsetHeight;
        container.style.clipPath = `inset(${Number(
          (clipTop / container.offsetHeight) * 100
        ).toFixed()}% 0 ${Number(
          100 - (clipBottom / container.offsetHeight) * 100
        ).toFixed()}% 0 round 4px)`;
      }
    }
  }, [activeTab, activeTabElementRef, containerRef]);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {TABS.map((tab) => (
          <li key={tab.name}>
            <button
              ref={activeTab === tab.name ? activeTabElementRef : null}
              data-tab={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
              }}
              className={styles.button}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className={styles["clip-path-container"]}
        ref={containerRef}
      >
        <ul className={`${styles.list} ${styles["list-overlay"]}`}>
          {TABS.map((tab) => (
            <li key={tab.name}>
              <button
                data-tab={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                }}
                className={`${styles["button-overlay"]} ${styles.button}`}
                tabIndex={-1}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const TABS = [
  {
    name: "Chapter 1",
  },
  {
    name: "Chapter 2",
  },
  {
    name: "Chapter 3",
  },
  {
    name: "Chapter 4",
  },
];
