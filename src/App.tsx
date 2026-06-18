import { useEffect, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { SquareChevronLeft, LayoutDashboardIcon, ClipboardListIcon, CalendarDaysIcon, CoinsIcon } from 'lucide-react'
import { userContext } from './contexts/UserContext'
import { reportContext } from './contexts/ReportContext'
import './App.css'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/Dashboard'
import SideNav from './components/composites/SideNav'
import SideNavItem from './components/composites/SideNavItem'

const authRoutes = [
  { path: "/", element: <LandingPicker /> }, 
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> }, 
]

const appRoutes = [
  { path: "/dashboard", label: "Dashboard", element: <Dashboard />, navIcon: <LayoutDashboardIcon /> },
  { path: "/tracker", label: "Tracker", element: <Dashboard />, navIcon: <ClipboardListIcon /> },
  { path: "/monthly-dues", label: "Monthly Dues", element: <Dashboard />, navIcon: <CalendarDaysIcon /> },
  { path: "/debts", label: "Debts", element: <Dashboard />, navIcon: <CoinsIcon /> },
]

function LandingPicker() {

  const navigator = useNavigate()
  const { user } = useContext(userContext)

  useEffect(() => {

    if (!user) navigator("/sign-in")
    else navigator("/dashboard")
  })

  return (
    <>      
    </>
  )
}

export default function App() {

  const { user } = useContext(userContext)
  const { report } = useContext(reportContext)

  return (
    <div className='w-full h-full flex'>  
      {(user && report) && 
      (window.location.href.includes('sign-in') && window.location.href.includes('sign-up')) &&
      (
        <SideNav>
          { appRoutes.map((r) => <SideNavItem label={r.label} path={r.path} icon={r.navIcon}/>) }
        </SideNav>   
      )}
      <Routes>        
        { authRoutes.map((r) => <Route key={r.path} path={r.path} element={r.element} />) }
      </Routes>
    </div>
  )
}