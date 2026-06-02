import { Routes, Route, useNavigate } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import './App.css'
import { useContext } from 'react'

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
  const userContext = useContext()

  return (
    <>
      {!userContext && navigator("/sign-in")}
      {userContext && navigator("/dashboard")}
    </>
  )
}

export default function App() {

  return (
    <>
      <main>
        <Routes>
          { routes.map((r) => <Route key={r.path} path={r.path} element={r.element} />) }
        </Routes>
      </main>
    </>
  )
}