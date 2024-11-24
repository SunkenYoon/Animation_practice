import styles from "./page.module.css";
import PageSection from "./components/PageSection";
import PageList from "./components/PageList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PageSection />
        <PageList />
      </main>
    </div>
  );
}
