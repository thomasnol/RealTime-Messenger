import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Room from './pages/Room.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/room/:roomId',
        element: <Room />
      }
    ],
  },
])

export default router