import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "./PageSection.module.css";

export default function PageSection() {
  return (
    <ScrollArea.Root className={styles.wrapper} type="always">
      <ScrollArea.Viewport className={styles.viewport}>
        <div style={{ height: "3000px" }}>
          <h1>Hello</h1>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className={styles.scrollbar}>
        <ScrollArea.Thumb className={styles.thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
