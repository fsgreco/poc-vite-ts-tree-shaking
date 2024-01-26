import React from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'

import { Spin } from 'antd';

//import HomePage from './pages/home-page'
//import AboutPage from './pages/about-page'

// This will code split
const HomePage = React.lazy(() => import('./pages/home-page'))
const AboutPage = React.lazy(() => import('./pages/about-page'))
// Also Tree shaking works and do not add everything inside ./components/index to the bundle 

function App() {
  return (
    <React.Suspense fallback={<Spin />}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/page-2" element={<AboutPage />} />
			</Routes>
    </React.Suspense>
  )
}

export default App
