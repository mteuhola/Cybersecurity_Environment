import styles from "./CourseProgress.module.css";

export default function CompletionBadge({
  label = "Aihe suoritettu",
}: {
  label?: string;
}) {
  return (
    <span className={styles.badge}>
      <svg
        aria-hidden="true"
        width="28"
        height="32"
        viewBox="0 0 28 32"
        fill="none"
      >
        <path
          d="m7 19-2 11 9-4 9 4-2-11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle
          cx="14"
          cy="12"
          r="10"
          fill="#fff"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="m9 12 3 3 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </span>
  );
}
