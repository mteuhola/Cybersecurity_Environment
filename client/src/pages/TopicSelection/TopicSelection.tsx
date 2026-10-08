import { Link } from "react-router-dom";
import TextSizeControl, {
  type TextSizeProps,
} from "../../components/TextSizeControl";
import type { TopicCourse } from "./topicCourses";
import styles from "./TopicSelection.module.css";

interface TopicSelectionProps extends TextSizeProps {
  course: TopicCourse;
}

export default function TopicSelection({
  course,
  ...textSizeProps
}: TopicSelectionProps) {
  return (
    <div className={styles.root} data-course={course.id}>
      <nav className={styles.nav} aria-label="Päänavigaatio">
        <Link to="/" className={styles.brand}>
          Turvassa Verkossa
        </Link>
        <div className="nav-actions">
          <Link to="/">← Takaisin kursseihin</Link>
          <TextSizeControl {...textSizeProps} />
        </div>
      </nav>
      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Kurssin aiheet</p>
          <h1>{course.title}</h1>
          <p>
            Valitse aihe aloittaaksesi. Voit edetä omaan tahtiisi ja palata
            tähän näkymään harjoituksesta.
          </p>
        </header>
        <section aria-labelledby="topics-title">
          <h2 id="topics-title">Valitse aihe</h2>
          {course.topics.length > 0 ? (
            <ol className={styles.topics}>
              {course.topics.map((topic, index) => (
                <li key={topic.id}>
                  <Link to={topic.path} className={styles.topic}>
                    <span className={styles.number} aria-hidden="true">
                      {index + 1}
                    </span>
                    <div className={styles.content}>
                      <h3>{topic.title}</h3>
                      <p>{topic.description}</p>
                    </div>
                    <span className={styles.start}>
                      Aloita <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <div className={styles.empty}>
              <h3>Kurssin aiheet ovat tulossa</h3>
              <p>
                Tähän kurssiin ei ole vielä lisätty harjoituksia. Voit sillä
                välin tutustua muihin kursseihin.
              </p>
              <Link to="/">Palaa kurssivalintaan →</Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
