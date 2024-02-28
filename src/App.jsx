import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Screens/Home';
import Login from './Screens/Auth/Login';
import Signup from './Screens/Auth/Signup';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import CourseDetials from './Screens/CourseDetials';
import AboutUs from './Screens/Aboutus';
import TeacherDashboard from './Screens/teachers/TeacherDashboard';
import AdminDashboard from './Screens/admin/AdminDashboard';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto ">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* student routes */}
          <Route path='/course/:courseId' element={<CourseDetials/>}/>
          {/* teacher routes */}
          <Route path='/teacherdashboard' element={<TeacherDashboard/>} />
          <Route path='/admindashboard' element={<AdminDashboard/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
