"use client";

import Image from "next/image";
import { CARD_LIST } from "./_constants/card_list";
import styles from "./Cards.module.css";
import { useCards } from "./_hooks/useCards";

export const Cards = () => {
  const { scrollableRef, getCardStyle } = useCards({
    cardCount: CARD_LIST.length,
  });

  return (
    <div className={styles.wrapper}>
      <div ref={scrollableRef} className={styles["scrollable-container"]}>
        {CARD_LIST.map((card) => (
          <div key={card.id} className={styles["scrollable-card"]} />
        ))}
      </div>
      <div className={styles["visible-container"]}>
        {CARD_LIST.map((card, index) => (
          <div
            key={card.id}
            className={styles["visible-card"]}
            style={getCardStyle(index)}
          >
            <Image
              alt=""
              className={styles["visible-card-content"]}
              src={card.imgUrl}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};
