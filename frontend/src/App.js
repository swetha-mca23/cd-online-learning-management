import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Admin/DashBoard';
import Users from './components/Admin/Users';
import Courses from './components/Admin/Courses';
import Settings from './components/Admin/Settings';
import InstructorDashboard from './components/Instructor/InstructorDashboard';
import ViewCourse from './components/Instructor/ViewCourses';
import AddAssignment from './components/Instructor/AddAssignments';
import HomePage from './components/student/HomePage';
import MyCourses from './components/student/MyCourses';
import InstructorSettings from './components/Instructor/InstructorSettings';

function App() {
  return (
   <>
<BrowserRouter>

<Routes>
  <Route path='/' element={<Login/>}/>
  <Route path="/admin/dashboard" element={<Dashboard/>} />
  <Route path="/admin/users" element={<Users/>} />
  <Route path="/admin/courses" element={<Courses />} />
  <Route path="/admin/settings" element={<Settings />} />
 <Route path='/register' element={<Register/>}/>
 <Route path="/instructor/dashboard" element={<InstructorDashboard/>}/>
  <Route path="/instructor/course/:courseId" element={<ViewCourse/>}/>
  <Route path="/instructor/assignments/:courseId" element={<AddAssignment/>}/>
  <Route path='/instructor/settings' element={<InstructorSettings/>}/>
  <Route path='/dashboard' element={<HomePage/>}/>
  <Route path='/my-course' element={<HomePage/>}/>
  <Route path='/homework' element={<HomePage/>}/>
  <Route path='/settings' element={<HomePage/>}/>
</Routes>
</BrowserRouter>
   </>
  );
}

export default App;
