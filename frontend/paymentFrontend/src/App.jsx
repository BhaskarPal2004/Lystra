import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import PaymentSuccess from "./components/PaymentSuccess"
import ChatPage from "./pages/chatPage"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </>
  )
}

export default App