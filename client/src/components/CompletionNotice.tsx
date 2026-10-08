import type { ReactNode } from "react";
import CompletionBadge from "./CompletionBadge";
import styles from "./CompletionNotice.module.css";

interface CompletionNoticeProps {
  children: ReactNode;
  badgeLabel?: string;
  labelledBy?: string;
}

/** Inherits the surrounding course's colors through data-course. */
export default function CompletionNotice({
  children,
  badgeLabel,
  labelledBy,
}: CompletionNoticeProps) {
  return (
    <section
      className={styles.notice}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : (badgeLabel ?? "Aihe suoritettu")}
    >
      <CompletionBadge label={badgeLabel} />
      <div className={styles.message}>{children}</div>
    </section>
  );
}
