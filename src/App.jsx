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
import { AuthProvider, useAuth} from './components/AuthProvider'
import ProtectedDashboard from './ProtectedDashboard'
import { Receiver } from './components/Reciver'
import { Sender } from './components/Sender'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><HomeNav/> <Home/> <Footer/></>
    },

    {
      path: "/dashboard",
      element: (
        <ProtectedDashboard/>
      ),
    },

    {
      path: "/login",
      element: <><Login/></>
    },

    {
      path: "/signup",
      element: <><SignUp/></>
    },
    {
      path: "/sender",
      element: <><Sender/></>
    }
  ])

  return (
    <>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
    </>
  )
}

export default App
