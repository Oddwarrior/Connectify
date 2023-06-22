import React, { Suspense } from "react"
import Home from "./pages/Home"
import AuthPage from "./pages/AuthPage"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./componenets/Login";
import { Signup } from "./componenets/Signup";
import Feed from "./componenets/Feed";
const Profile = React.lazy(() => import("./componenets/Profile"));
import { useAuth } from "./contexts/AuthContext";
import ProfileSkeleton from "./componenets/skeletons/ProfileSkeleton";


function App() {
  const { user } = useAuth();

  return (
    <div className=" font-poppins  bg-backgroundBody text-text-primary dark:bg-backgroundBody-dark dark:text-text-primary-dark ">
      <BrowserRouter >
        <Routes >
          {/* home */}
          <Route path="/" element={user ? <Home /> : <Navigate to='auth' />} >
            <Route index element={<Navigate to='home' />} />
            <Route path="home" element={<Feed />} />
            <Route path="user/:username" element={<Suspense fallback={<ProfileSkeleton />}><Profile /></Suspense>} />
          </Route >

          {/* auth  */}
          <Route path="auth" element={user ? <Navigate to="/" /> : <AuthPage />} >
            <Route index element={<Navigate to='login' />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path='*' element={<div>Page Not Found</div>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
