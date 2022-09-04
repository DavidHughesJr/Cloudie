import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import LeftNav from './components/LeftNav'
import { theme } from './theme/theme'
import { DashboardContainer, MiddleContainer } from './theme/containers';
import { Routes, Route } from 'react-router-dom'
import { Dashboard, Map, Saves } from './pages/allPages'
import TopNav from './components/TopNav';
import WeatherDisplay from './components/WeatherDisplay'



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
      </ThemeProvider>
    </div>

  )
}

export default App