import { PageSectionProvider } from "../../src/ui/_common/PageSectionProvider";
import styles from "./page.module.css";
import { PageList } from "@/src/ui/page/page_list/PageList";
import { PageSection } from "@/src/ui/page/page_section/PageSection";

export default function Home() {
  return (
    <>
      <PageSectionProvider>
        <div className={styles.page}>
          <main className={styles.main}>
            <PageSection />
            <PageList />
          </main>
        </div>
      </PageSectionProvider>
    </>
  );
}
