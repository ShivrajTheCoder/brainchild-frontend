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
import ParentDashboard from './Screens/parents/ParentDashboard';
import CreateTestScreen from './Screens/teachers/createTestScreen';
import TaketestScreen from './Screens/user/TaketestScreen';
import Explore from './Screens/user/Explore';
import TeacherInfo from './Screens/teachers/TeacherInfo';
import AddCourseForm from './Components/TeacherComponents/TeacherForms/AddCourseForm';
import ChildReportScreen from './Screens/parents/ChildReportScreen';
import FeedbackForm from './Components/ParentComponents/ParentForms/FeedbackForm';
import CourseRequestsScreen from './Screens/parents/CourseRequestsScreen';
import AddVideoForm from './Components/TeacherComponents/TeacherForms/AddVideo';
import TeacherCourses from './Screens/teachers/TeacherCourses';
import TeacherVideos from './Screens/teachers/TeacherVideos';
import AdminInfoContainer from './Components/AdminComponents/AdminInfoContainer';
import ApprovalVideos from './Screens/admin/ApprovalVideos';
import ApprovalCourses from './Screens/admin/ApprovalCourses';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto ">
        <Routes>
          <Route path='/' element={<Home />} >
            <Route index element={<Explore />} />
          </Route>
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/take-test' element={<TaketestScreen />} />
          {/* student routes */}
          <Route path='/course/:courseId' element={<CourseDetials />} />
          {/* teacher routes */}
          <Route path='/teacherdashboard' element={<TeacherDashboard />} >
            <Route index element={<TeacherInfo />} />
            <Route path='/teacherdashboard/addtest' element={<CreateTestScreen />} />
            <Route path='/teacherdashboard/addcourse' element={<AddCourseForm />} />
            <Route path='/teacherdashboard/addvideo' element={<AddVideoForm />} />
            <Route path='/teacherdashboard/viewcourse' element={<TeacherCourses />} />
            <Route path='/teacherdashboard/viewvideos' element={<TeacherVideos />} />
          </Route>

          <Route path='/admindashboard' element={<AdminDashboard />} >
            <Route index element={<AdminInfoContainer/>} />
            <Route path='/admindashboard/pendingvideos' element={<ApprovalVideos />} />
            <Route path='/admindashboard/pendingcourses' element={<ApprovalCourses />} />
          </Route>
          <Route path='/parentdashboard' element={<ParentDashboard />} >
            <Route index element={<ChildReportScreen />} />
            <Route path='/parentdashboard/addsuggestion' element={<FeedbackForm />} />
            <Route path='/parentdashboard/courserequests' element={<CourseRequestsScreen />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
