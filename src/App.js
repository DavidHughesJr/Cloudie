import React from 'react'
import Nav from './components/Nav'
import { ThemeProvider } from '@mui/material/styles';
import { navTheme } from './theme/navTheme'
import { DashboardContainer, NavContainer, MiddleContainer, WeatherContainer } from './theme/containers';
import {Routes, Route} from 'react-router-dom'
import { Dashboard, Map, Saves} from './pages/allPages'



const App = () => {
  return (
    <DashboardContainer>
      <NavContainer>
        <ThemeProvider theme={navTheme}>
          <Nav />
        </ThemeProvider>
      </NavContainer>
      <MiddleContainer>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/map" element={<Map />} />
          <Route path="/saves" element={<Saves />} />
        </Routes>
      </MiddleContainer>
      <WeatherContainer>
        <div>
          
        </div>
      </WeatherContainer>
    </DashboardContainer>

  )
}

export default App