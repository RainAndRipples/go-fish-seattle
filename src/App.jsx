import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LearnToFish from './pages/LearnToFish'
import FishingSpots from './pages/FishingSpots'
import FishID from './pages/FishID'
import Rules from './pages/Rules'
import WeatherFish from './pages/WeatherFish'
import ClamShellfish from './pages/ClamShellfish'
import ParentsGuide from './pages/ParentsGuide'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<LearnToFish />} />
        <Route path="/spots" element={<FishingSpots />} />
        <Route path="/fish-id" element={<FishID />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/weather" element={<WeatherFish />} />
        <Route path="/clams" element={<ClamShellfish />} />
        <Route path="/parents" element={<ParentsGuide />} />
      </Routes>
      <Footer />
    </>
  )
}
