import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Courses from './components/Courses/Courses';
import ForgetPassword from './components/Auth/ForgetPassword';
import Home from './components/Home/Home';
import { Footer } from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFailed from './components/Payments/PaymentFailed';
import NotFound from './components/NotFound.jsx/NotFound';
import Course from './components/CoursePage/Course';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import ChangePassword from './components/Profile/ChangePassword';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import Users from './components/Admin/Users/Users';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { getMyProfileReducer } from './redux/actions/userAction';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layout/Loader/Loader';

function App() {
  window.addEventListener('contextmenu', e => e.preventDefault()); // to avoid right click

  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getMyProfileReducer());
  }, [dispatch]);

  return (
    <div className="z-1">
      <Router>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect={'/profile'}
                  >
                    <Login />
                  </ProtectedRoute>
                }
              />{' '}
              // dont show when authenticated
              {/* <Route path="/logout" element={<ProtectedRoute  redirect ={'/'}></ProtectedRoute>}/> */}
              <Route
                path="/signup"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect={'/profile'}
                  >
                    <SignUp />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forgetpassword"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <ForgetPassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resetpassword/:token"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <ResetPassword />
                  </ProtectedRoute>
                }
              />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<ProtectedRoute isAuthenticated = {isAuthenticated}><Course user = {user} /></ProtectedRoute>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request" element={<Request />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/subscribe"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    redirect={'/'}
                  >
                    <Subscribe user = {user}/>
                  </ProtectedRoute>
                }
              />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="/paymentfail" element={<PaymentFailed />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Profile user={user} />
                  </ProtectedRoute>
                }
              />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/updateprofile" element={<UpdateProfile />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                    isAuthenticated={isAuthenticated}
                  >
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/createcourse"
                element={
                  <ProtectedRoute
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                    isAuthenticated={isAuthenticated}
                  >
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                    isAuthenticated={isAuthenticated}
                  >
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/courses"
                element={
                  <ProtectedRoute
                    adminRoute={true}
                    isAdmin={user && user.role === 'admin'}
                    isAuthenticated={isAuthenticated}
                  >
                    <AdminCourses />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />

            <Toaster />
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
