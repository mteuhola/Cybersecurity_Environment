import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CourseSelection from './pages/CourseSelection/CourseSelection'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourseSelection />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App