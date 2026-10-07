import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import CourseSelection from "./pages/CourseSelection/CourseSelection";
import { useTextSize } from "./useTextSize";

const PasswordCourse = lazy(
  () => import("./pages/PasswordCourse/PasswordCourse"),
);

function App() {
  const textSizeProps = useTextSize();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourseSelection {...textSizeProps} />} />
        <Route
          path="/course/passwords"
          element={
            <Suspense fallback={<p role="status">Ladataan harjoitusta…</p>}>
              <PasswordCourse {...textSizeProps} />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
