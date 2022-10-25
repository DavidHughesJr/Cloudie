import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme'
import { DashboardContainer, MiddleContainer } from './theme/styled';
import { Routes, Route } from 'react-router-dom'
import { Dashboard, Map, Saves } from './pages/allPages'
import TopNav from './components/TopNav';
import WeatherDisplay from './components/WeatherDisplay'
import LeftNav from './components/LeftNav'
import Footer from './components/Footer';


const App = () => {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <TopNav />
        <DashboardContainer>
          <LeftNav />
          <MiddleContainer>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<Map />} />
              <Route path="/saves" element={<Saves />} />
            </Routes>
          </MiddleContainer>
          <WeatherDisplay />
        </DashboardContainer>
        <Footer /> 
      </ThemeProvider>
    </div>

  )
}

export default App