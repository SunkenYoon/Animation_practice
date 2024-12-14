import styles from "./page.module.css";
import { PageSectionProvider } from "@/src/ui/_common/PageSectionProvider";
import { PageList } from "@/src/ui/page/page_list/PageList";
import { PageSection } from "@/src/ui/page/page_section/PageSection";

export default function PageNote({ params }: { params: { id: string } }) {
  return (
    <PageSectionProvider>
      <div className={styles.container}>
        <h1>{params.id} page</h1>
        <PageSection />
        <PageList />
      </div>
    </PageSectionProvider>
  );
}
