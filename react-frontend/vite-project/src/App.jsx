import React from 'react'

import Container from '@mui/material/Container';

import 'bootstrap/dist/css/bootstrap.min.css'
import ChatWindow from './components/ChatWindow';

function App() {
  // Fetching message from backend
  // const [message, setMessage] = useState("")
  //useEffect(() => {
    //fetch("https://mern-webapp-9f68.onrender.com")
    //fetch("http://localhost:8000")
      //.then((res) => res.json())
      //.then((data) => setMessage(data.message));
  //}, []);

  return (
    <div>
      <Container>
        <ChatWindow />
      </Container>
    </div>
  )
}

export default App
