import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import CourseSelection from "./pages/CourseSelection/CourseSelection";
import { useTextSize } from "./useTextSize";
import TopicSelection from "./pages/TopicSelection/TopicSelection";
import { useCourseProgress } from "./progress/useCourseProgress";

const PasswordCourse = lazy(
  () => import("./pages/PasswordCourse/PasswordCourse"),
);

const PhishingCourse = lazy(
  () => import("./pages/PhishingCourse/PhishingCourse"),
);

function App() {
  const textSizeProps = useTextSize();
  const { courses, markComplete } = useCourseProgress();
  const isComplete = (path: string) =>
    courses.some((course) =>
      course.topics.some((topic) => topic.path === path && topic.isComplete),
    );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CourseSelection {...textSizeProps} progressCourses={courses} />
          }
        />
        <Route
          path="/course/passwords/password-strength"
          element={
            <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
              <PasswordCourse
                {...textSizeProps}
                isComplete={isComplete("/course/passwords/password-strength")}
                onComplete={() =>
                  markComplete("/course/passwords/password-strength")
                }
              />
            </Suspense>
          }
        />
        <Route
          path="/course/phishing/suspicious-email"
          element={
            <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
              <PhishingCourse
                {...textSizeProps}
                isComplete={isComplete("/course/phishing/suspicious-email")}
                onComplete={() =>
                  markComplete("/course/phishing/suspicious-email")
                }
              />
            </Suspense>
          }
        />
        {courses.map((course) => (
          <Route
            key={course.id}
            path={course.path}
            element={<TopicSelection course={course} {...textSizeProps} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
