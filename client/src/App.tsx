import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import CourseSelection from "./pages/CourseSelection/CourseSelection";
import { useTextSize } from "./useTextSize";
import TopicSelection from "./pages/TopicSelection/TopicSelection";
import { topicCourses } from "./pages/TopicSelection/topicCourses";

const PasswordCourse = lazy(
  () => import("./pages/PasswordCourse/PasswordCourse"),
);

const PhishingCourse = lazy(
  () => import("./pages/PhishingCourse/PhishingCourse"),
);

function App() {
  const textSizeProps = useTextSize();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourseSelection {...textSizeProps} />} />
        <Route
          path="/course/passwords/password-strength"
          element={
            <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
              <PasswordCourse {...textSizeProps} />
            </Suspense>
          }
        />
        <Route
          path="/course/phishing/suspicious-email"
          element={
            <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
              <PhishingCourse {...textSizeProps} />
            </Suspense>
          }
        />
        {topicCourses.map((course) => (
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
