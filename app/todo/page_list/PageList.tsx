"use client";

import { usePageSection } from "../_common/PageSectionProvider";
import styles from "./PageList.module.css";
import { useEffect, useRef } from "react";

export const PageList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLButtonElement>(null);

  const { headerList, setHeaderList } = usePageSection();

  useEffect(() => {
    const container = containerRef.current;

    const activeTab = headerList.find((tab) => tab.isActive);

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
  }, [headerList, activeTabElementRef, containerRef]);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {headerList.map((tab, index) => {
          return (
            <li key={`${tab.text ?? ""}_index`}>
              <button
                ref={tab.isActive ? activeTabElementRef : null}
                data-tab={tab}
                onClick={() => {
                  setHeaderList(
                    headerList.map((header, index) => ({
                      ...header,
                      isActive: index === headerList.indexOf(tab),
                    }))
                  );
                }}
                className={styles.button}
              >
                {tab.text}
              </button>
            </li>
          );
        })}
      </ul>

      <div
        aria-hidden
        className={styles["clip-path-container"]}
        ref={containerRef}
      >
        <ul className={`${styles.list} ${styles["list-overlay"]}`}>
          {headerList.map((tab, index) => (
            <li key={`${tab.text ?? ""}_index`}>
              <button
                data-tab={tab}
                onClick={() => {
                  setHeaderList(
                    headerList.map((header, index) => ({
                      ...header,
                      isActive: index === headerList.indexOf(tab),
                    }))
                  );
                }}
                className={`${styles["button-overlay"]} ${styles.button}`}
                tabIndex={-1}
              >
                {tab.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
