import { useEffect, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import { userContext } from './contexts/UserContext'
import './App.css'
import SignUp from './pages/auth/SignUp'

const routes = [
  {
    path: "/",
    element: <LandingPicker />
  }, 
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  }
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

  return (
    <div className='w-full h-full'>      
      <Routes>
        { routes.map((r) => <Route key={r.path} path={r.path} element={r.element} />) }
      </Routes>
    </div>
  )
}