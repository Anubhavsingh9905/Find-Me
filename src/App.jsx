import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import UploadPhoto from './components/UploadPhoto'
import CctvView from './components/CctvView'
import ReportSighting from './components/ReportSighting'
import HomeNav from './components/HomeNav'
import Dashboard from './pages/Dashboard'
import About from './components/About'
import Contact from './components/Contact'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'


function App() {

  const router = createBrowserRouter([

    {
      path: "/",
      element: <><HomeNav/> <Home/> <Footer/></>
    },

    {
      path: "/dashboard",
      element: <><Navbar/> <Dashboard/> <UploadPhoto/> <CctvView/> <ReportSighting/> <Footer/></>
    },

    {
      path: "/login",
      element: <><Login/></>
    },

    {
      path: "/signup",
      element: <><SignUp/></>
    },
    
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
