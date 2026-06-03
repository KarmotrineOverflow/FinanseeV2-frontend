import { useEffect, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import { userContext } from './contexts/UserContext'
import './App.css'

const routes = [
  {
    path: "/",
    element: <LandingPicker />
  }, 
  {
    path: "/sign-in",
    element: <SignIn />
  },
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
    <>      
      <Routes>
        { routes.map((r) => <Route key={r.path} path={r.path} element={r.element} />) }
      </Routes>
    </>
  )
}