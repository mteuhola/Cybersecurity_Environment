import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import CourseSelection from "./pages/CourseSelection/CourseSelection";

const PasswordCourse = lazy(
  () => import("./pages/PasswordCourse/PasswordCourse"),
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourseSelection />} />
        <Route
          path="/course/passwords"
          element={
            <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
              <PasswordCourse />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
