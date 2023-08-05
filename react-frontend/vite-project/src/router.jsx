import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ChatWindow from './components/ChatWindow.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/chats',
                element: <ChatWindow />
            },
        ],
    },
])

export default router