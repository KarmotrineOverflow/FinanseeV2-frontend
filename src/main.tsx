import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import UserContext from './contexts/UserContext.tsx'
import ReportContext from './contexts/ReportContext.tsx'
import ToastContext from './contexts/ToastContext.tsx'
import WindowContext from './contexts/WindowContext.tsx'
import ModalProvider from './contexts/ModalContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <WindowContext>
        <ToastContext>
          <ModalProvider>
            <UserContext>
              <ReportContext>
                <App />
              </ReportContext>        
            </UserContext>   
          </ModalProvider>          
        </ToastContext>  
      </WindowContext>             
    </BrowserRouter>
  </StrictMode>,
)
