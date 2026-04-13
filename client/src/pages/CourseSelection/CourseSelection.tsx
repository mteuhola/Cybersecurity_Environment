import { useNavigate } from 'react-router-dom'
import styles from './CourseSelection.module.css'

interface Course {
  id: string
  number: string
  title: string
  description: string
  duration: string
  exercises: string
  accentColor: string
  iconBg: string
  numberColor: string
  badgeBg: string
  badgeColor: string
  route: string
  icon: React.ReactNode
}

const LockIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M8 11V7a4 4 0 018 0v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1.5" fill={color} />
  </svg>
)

const EmailIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="13" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M3 9l9 6 9-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 14l3-3M15 11l3 3" stroke="#E24B4A" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const HeartIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21C12 21 4 15 4 9a5 5 0 0110 0 5 5 0 0110 0c0 6-8 12-8 12h-4z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 9l1.5 2.5L16 12l-2.5 1.5L12 16l-1.5-2.5L8 12l2.5-1.5L12 9z"
      fill={color}
      opacity="0.5"
    />
  </svg>
)

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6h8M7 3l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ClockIcon = ({ color = '#888780' }: { color?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5" stroke={color} />
    <path d="M6 3.5V6l2 1.5" stroke={color} strokeWidth="1" strokeLinecap="round" />
  </svg>
)

const courses: Course[] = [
  {
    id: 'passwords',
    number: 'Aihe 1',
    title: 'Salasanaturvallisuus',
    description:
      'Opi luomaan salasanoja, joita on vaikea murtaa mutta helppo muistaa - ja ymmärrä miksi se on tärkeää.',
    duration: 'Noin 10 minuuttia',
    exercises: '3 harjoitusta · 1 tietovisa',
    accentColor: '#1D9E75',
    iconBg: '#E1F5EE',
    numberColor: '#0F6E56',
    badgeBg: '#E1F5EE',
    badgeColor: '#085041',
    route: '/course/passwords',
    icon: <LockIcon color="#0F6E56" />,
  },
  {
    id: 'phishing',
    number: 'Aihe 2',
    title: 'Tietojenkalastelu',
    description:
      'Tunnista huijaussähköpostit ja vaaralliset linkit ennen kuin ne aiheuttavat vahinkoa - harjoittele todellisilla esimerkeillä.',
    duration: 'Noin 12 minuuttia',
    exercises: '4 harjoitusta · 1 tietovisa',
    accentColor: '#185FA5',
    iconBg: '#E6F1FB',
    numberColor: '#185FA5',
    badgeBg: '#E6F1FB',
    badgeColor: '#0C447C',
    route: '/course/phishing',
    icon: <EmailIcon color="#185FA5" />,
  },
  {
    id: 'romance-fraud',
    number: 'Aihe 3',
    title: 'Romanssihuijaukset',
    description:
      'Opi tunnistamaan verkossa tapahtuvat tunne-manipulaatiot ja suojelemaan itseäsi, jos jokin tuntuu liian hyvältä ollakseen totta.',
    duration: 'Noin 15 minuuttia',
    exercises: '4 harjoitusta · 1 tietovisa',
    accentColor: '#993556',
    iconBg: '#FBEAF0',
    numberColor: '#993556',
    badgeBg: '#FBEAF0',
    badgeColor: '#72243E',
    route: '/course/romance-fraud',
    icon: <HeartIcon color="#993556" />,
  },
]

export default function CourseSelection() {
  const navigate = useNavigate()

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L3 6v8h4v-3h4v3h4V6L9 2z" fill="#fff" opacity="0.9" />
              <circle cx="9" cy="9" r="1.5" fill="#1a1a18" />
            </svg>
          </div>
          <span className={styles.logoText}>Turvassa verkossa</span>
        </div>
        <span className={styles.navHint}>Valitse aihe aloittaaksesi</span>
      </nav>

      <div className={styles.hero}>
        <div className={styles.eyebrow}>Oppimisympäristö</div>
        <h1 className={styles.title}>Mitä haluat oppia tänään?</h1>
        <p className={styles.subtitle}>
          Jokainen aihe on lyhyt itsenäinen kokonaisuus. Voit edetä omaan tahtiisi - ei kiirettä.
        </p>
      </div>

      <div className={styles.grid}>
        {courses.map((course) => (
          <button
            key={course.id}
            className={styles.card}
            onClick={() => navigate(course.route)}
            aria-label={`Aloita kurssi: ${course.title}`}
          >
            <div className={styles.cardAccent} style={{ background: course.accentColor }} />

            <div className={styles.cardIcon} style={{ background: course.iconBg }}>
              {course.icon}
            </div>

            <div className={styles.cardNumber} style={{ color: course.numberColor }}>
              {course.number}
            </div>

            <h2 className={styles.cardTitle}>{course.title}</h2>
            <p className={styles.cardDesc}>{course.description}</p>

            <div
              className={styles.badge}
              style={{ background: course.badgeBg, color: course.badgeColor }}
            >
              <ClockIcon color={course.badgeColor} />
              {course.duration}
            </div>

            <div className={styles.cardMeta}>
              <div className={styles.cardDuration}>
                <ClockIcon />
                {course.exercises}
              </div>
              <div className={styles.cardBtn} style={{ background: course.accentColor }}>
                Aloita
                <ArrowIcon />
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.footer}>
        <div className={styles.footerDot} />
        <span className={styles.footerText}>
          Voit palata tähän näkymään milloin tahansa ja jatkaa toisesta aiheesta.
        </span>
      </div>
    </div>
  )
}
