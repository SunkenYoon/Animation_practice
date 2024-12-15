import { Modal } from "@/src/ui/_common/modal/Modal";
import { PageSectionProvider } from "@/src/ui/_common/PageSectionProvider";
import styles from "./page.module.css";
import { PageSection } from "@/src/ui/page/page_section/PageSection";
import { PageList } from "@/src/ui/page/page_list/PageList";

export default function PageModal({ params }: { params: { id: string } }) {
  return (
    <PageSectionProvider>
      <Modal>
        <div className={styles.container}>
          <h1>{params.id}</h1>
          <PageSection />
          <PageList />
        </div>
      </Modal>
    </PageSectionProvider>
  );
}
