"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "./PageSection.module.css";
import { Editor } from "../_components/Editor";

export const PageSection = () => {
  return (
    <ScrollArea.Root className={styles.wrapper} type="always">
      <ScrollArea.Viewport className={styles.viewport}>
        <Editor />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className={styles.scrollbar}>
        <ScrollArea.Thumb className={styles.thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
