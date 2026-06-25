import { useEffect, useContext, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboardIcon, ClipboardListIcon, CalendarDaysIcon, CoinsIcon } from 'lucide-react'
import { userContext } from './contexts/UserContext'
import { reportContext } from './contexts/ReportContext'
import './App.css'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/Dashboard'
import SideNav from './components/composites/SideNav'
import SideNavItem from './components/composites/SideNavItem'
import Tracker from './pages/Tracker'
import MonthlyDue from './pages/MonthlyDue'
import Debt from './pages/Debt'

const authRoutes = [
  { path: "/", element: <LandingPicker /> }, 
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> }, 
]

const appRoutes = [
  { path: "/dashboard", label: "Dashboard", element: <Dashboard />, navIcon: <LayoutDashboardIcon /> },
  { path: "/tracker", label: "Tracker", element: <Tracker />, navIcon: <ClipboardListIcon /> },
  { path: "/monthly-dues", label: "Monthly Dues", element: <MonthlyDue />, navIcon: <CalendarDaysIcon /> },
  { path: "/debts", label: "Debts", element: <Debt />, navIcon: <CoinsIcon /> },
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

  const [isSideNavOpen, setIsSideNavOpen] = useState(true)
  const { user } = useContext(userContext)
  const { report } = useContext(reportContext)
  const location = useLocation()

  const toggleSideNav = () => {

    setIsSideNavOpen(open => !open)
  }

  return (
    <div className='w-full h-full flex'>  
      {(user && report) && 
      (!['/sign-in', '/sign-up'].includes(location.pathname)) &&
      (        
        <SideNav isOpen={isSideNavOpen} toggleOpen={toggleSideNav}>
          { appRoutes.map((r) => <SideNavItem label={r.label} path={r.path} icon={r.navIcon} isExpanded={isSideNavOpen} />) }
        </SideNav>   
      )}
      <Routes>        
        { authRoutes.map((r) => <Route key={r.path} path={r.path} element={r.element} />) }
        { appRoutes.map((r) => <Route key={r.path} path={r.path} element={r.element} />) }
      </Routes>
    </div>
  )
}