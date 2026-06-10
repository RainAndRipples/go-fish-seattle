import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LearnToFish from './pages/LearnToFish'
import FishingSpots from './pages/FishingSpots'
import FishID from './pages/FishID'
import Rules from './pages/Rules'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<LearnToFish />} />
        <Route path="/spots" element={<FishingSpots />} />
        <Route path="/fish-id" element={<FishID />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </BrowserRouter>
  )
}
