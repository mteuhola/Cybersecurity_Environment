import { useNavigate } from 'react-router-dom'
import styles from './CourseSelection.module.css'
import { LockIcon, EmailIcon, MaskIcon, ClockIcon, ArrowIcon } from '../../components/icons.tsx'

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

const courses: Course[] = [
  {
    id: 'passwords',
    number: 'Aihe 1',
    title: 'Salasanojen turvallisuus',
    description:
      'Opi luomaan salasanoja, joita on vaikea murtaa mutta helppo muistaa, ja ymmärrä miksi se on tärkeää.',
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
    title: 'Vaaralliset viestit',
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
    title: 'Liian hyvää ollakseen totta',
    description:
      'Opi tunnistamaan verkossa tapahtuvaa tunnemanipulaatiota ja tunnistamaan, jos jokin tuntuu liian hyvältä ollakseen totta.',
    duration: 'Noin 15 minuuttia',
    exercises: '4 harjoitusta · 1 tietovisa',
    accentColor: '#993556',
    iconBg: '#FBEAF0',
    numberColor: '#993556',
    badgeBg: '#FBEAF0',
    badgeColor: '#72243E',
    route: '/course/romance-fraud',
    icon: <MaskIcon color="#993556" />,
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
