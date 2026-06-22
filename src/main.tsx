import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import UserContext from './contexts/UserContext.tsx'
import ReportContext from './contexts/ReportContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserContext>
        <ReportContext>
          <App />
        </ReportContext>        
      </UserContext>      
    </BrowserRouter>
  </StrictMode>,
)
