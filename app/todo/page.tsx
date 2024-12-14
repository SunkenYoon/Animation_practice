import { Suspense } from "react";
import { PageSectionProvider } from "../../src/ui/_common/PageSectionProvider";
import { Cards } from "../../src/ui/cards/Cards";
import styles from "./page.module.css";
import { PageList } from "@/src/ui/page/page_list/PageList";
import { PageSection } from "@/src/ui/page/page_section/PageSection";

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
