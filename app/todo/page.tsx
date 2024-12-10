import { Suspense } from "react";
import { PageSectionProvider } from "./_common/PageSectionProvider";
import { Cards } from "./cards/Cards";
import styles from "./page.module.css";
import { PageList } from "./page_list/PageList";
import { PageSection } from "./page_section/PageSection";

export default function Home() {
  return (
    <>
      <Suspense>
        <Cards />
      </Suspense>
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
