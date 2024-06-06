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
import MyCourses from './Screens/user/MyCourses';
import UpcomingTestsScreen from './Screens/user/UpcomingTestsScreen';
import MyReportScreen from './Screens/user/MyReportScreen';
import ViewCourse from './Screens/user/ViewCourse';
import MonitorScreen from './Screens/parents/MonitorScreen';
import TestReportScreen from './Screens/user/TestReportScreen';
import ChildTestReports from './Screens/parents/ChildTestReports';
import AddSuggestionScreen from './Screens/parents/AddSuggestionScreen';
import AdminLogin from './Screens/Auth/AdminLogin';
import ParentLogin from './Screens/Auth/ParentLogin';
import TeacherLogin from './Screens/Auth/TeacherLogin';
function App() {
  return (
    <main className=' font-serif text-lg font-normal bg-gradient-to-r from-[#ced4da] from-10% via-[#dee2e6] via-30% to-[#f8f9fa] to-90% min-h-screen'>
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="container mx-auto ">
          <Routes>
            <Route path='/adminlogin' element={<AdminLogin />} />
            <Route path='/parentlogin' element={<ParentLogin />} />
            <Route path='/teacherlogin' element={<TeacherLogin />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Home />} >
              <Route index element={<Explore />} />
              <Route path='/mycourses' element={<MyCourses />} />
              <Route path='/upcomingtests' element={<UpcomingTestsScreen />} />
              <Route path='/myreport' element={<MyReportScreen />} />
              <Route path='/mytestreport' element={<TestReportScreen />} />
              <Route path='/viewcourse/:courseId' element={<ViewCourse />} />
            </Route>
            {/* <Route path='/aboutus' element={<AboutUs />} /> */}
            <Route path='/take-test/:testId' element={<TaketestScreen />} />
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
              <Route index element={<AdminInfoContainer />} />
              <Route path='/admindashboard/pendingvideos' element={<ApprovalVideos />} />
              <Route path='/admindashboard/pendingcourses' element={<ApprovalCourses />} />
            </Route>
            <Route path='/parentdashboard' element={<ParentDashboard />} >
              <Route index element={<ChildReportScreen />} />
              <Route path='/parentdashboard/addsuggestion' element={<AddSuggestionScreen />} />
              <Route path='/parentdashboard/courserequests' element={<CourseRequestsScreen />} />
              <Route path='/parentdashboard/montioractivities' element={<MonitorScreen />} />
              <Route path='/parentdashboard/testreports' element={<ChildTestReports />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </main>
  )
}

export default App
