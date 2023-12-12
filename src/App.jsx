import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Screens/Home';
import Login from './Screens/Auth/Login';
import Signup from './Screens/Auth/Signup';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import CourseDetials from './Screens/CourseDetials';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/course/:courseId' element={<CourseDetials/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
