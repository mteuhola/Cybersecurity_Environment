export interface CourseTopic {
  kind?: "activity" | "quiz";
  id: string;
  isComplete: boolean;
  title: string;
  description: string;
  path: string;
}

export interface TopicCourse {
  id: string;
  isComplete: boolean;
  title: string;
  path: string;
  topics: CourseTopic[];
}

const courseCatalog: TopicCourse[] = [
  {
    id: "passwords",
    isComplete: false,
    title: "Salasanojen turvallisuus",
    path: "/course/passwords",
    topics: [
      {
        id: "password-strength",
        isComplete: false,
        title: "Kokeile salasanan vahvuutta",
        description:
          "Tutki esimerkkisalasanoja ja kokeile omaa keksittyä salasanaa. Opi, mikä tekee salasanasta vaikeasti arvattavan.",
        path: "/course/passwords/password-strength",
      },
    ],
  },
  {
    id: "phishing",
    isComplete: false,
    title: "Vaaralliset viestit",
    path: "/course/phishing",
    topics: [
      {
        id: "suspicious-email",
        isComplete: false,
        title: "Tunnista huijausviestin merkit",
        description:
          "Tutki kuvitteellista sähköpostia ja etsi sen epäilyttävät kohdat. Saat jokaisesta havainnosta selityksen ja tarvittaessa vihjeen.",
        path: "/course/phishing/suspicious-email",
      },
    ],
  },
  {
    id: "romance-fraud",
    isComplete: false,
    title: "Liian hyvää ollakseen totta",
    path: "/course/romance-fraud",
    topics: [],
  },
];

// A final quiz is a topic, so existing progress calculations include it automatically.
export const topicCourses: TopicCourse[] = courseCatalog.map((course) => ({
  ...course,
  topics: [
    ...course.topics,
    {
      id: "quiz",
      kind: "quiz",
      isComplete: false,
      title: "Kurssin tietovisa",
      description:
        "Kertaa kurssin asioita. Valitse oikeat vastaukset ja lue selitykset omaan tahtiisi.",
      path: `${course.path}/quiz`,
    },
  ],
}));
