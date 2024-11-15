import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContactPage from './components/ContactPage/ContactPage'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full">
      <ContactPage/>
      <Toaster/>
    </div>
  )
}

export default App
