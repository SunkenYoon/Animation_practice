"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "./PageSection.module.css";
import { Editor } from "../_components/Editor";
import { usePageSection } from "../_common/PageSectionProvider";
import { useEffect, useRef } from "react";

export const PageSection = () => {
  const localScrollRef = useRef<HTMLDivElement>(null);
  const { setScrollRef } = usePageSection();

  useEffect(() => {
    setScrollRef(localScrollRef);
  }, [setScrollRef]);

  return (
    <ScrollArea.Root className={styles.wrapper} type="always">
      <ScrollArea.Viewport className={styles.viewport} ref={localScrollRef}>
        <Editor />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className={styles.scrollbar}>
        <ScrollArea.Thumb className={styles.thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
