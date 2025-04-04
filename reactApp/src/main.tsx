import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import './index.css'
import App from './App.tsx'
import UserDataContextProvider from './context/UserDataContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <UserDataContextProvider>
      <App />
    </UserDataContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
