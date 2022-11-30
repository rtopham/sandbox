import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Container from 'react-bootstrap/Container'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/shared/PrivateRoute'
import Dashboard from './pages/Dashboard'
import SandBox from './pages/SandBox'
import './App.css'

function App() {
  //Hi Austin welcome home.
  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/sandbox' element={<SandBox />} />

            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
