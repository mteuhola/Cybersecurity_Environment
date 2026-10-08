export interface CourseTopic {
  id: string;
  title: string;
  description: string;
  path: string;
}

export interface TopicCourse {
  id: string;
  title: string;
  path: string;
  topics: CourseTopic[];
}

export const topicCourses: TopicCourse[] = [
  {
    id: "passwords",
    title: "Salasanojen turvallisuus",
    path: "/course/passwords",
    topics: [
      {
        id: "password-strength",
        title: "Kokeile salasanan vahvuutta",
        description:
          "Tutki esimerkkisalasanoja ja kokeile omaa keksittyä salasanaa. Opi, mikä tekee salasanasta vaikeasti arvattavan.",
        path: "/course/passwords/password-strength",
      },
    ],
  },
  {
    id: "phishing",
    title: "Vaaralliset viestit",
    path: "/course/phishing",
    topics: [
      {
        id: "suspicious-email",
        title: "Tunnista huijausviestin merkit",
        description:
          "Tutki kuvitteellista sähköpostia ja etsi sen epäilyttävät kohdat. Saat jokaisesta havainnosta selityksen ja tarvittaessa vihjeen.",
        path: "/course/phishing/suspicious-email",
      },
    ],
  },
  {
    id: "romance-fraud",
    title: "Liian hyvää ollakseen totta",
    path: "/course/romance-fraud",
    topics: [],
  },
];
