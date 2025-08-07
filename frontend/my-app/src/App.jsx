import {  BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Navbar from './components/Navbar';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
   
    <Router>
 <Navbar />
      <Routes>
        
          <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={ <ProtectedRoute><Profile /> </ProtectedRoute> } />
      </Routes>
    </Router>
  
  );
}

export default App;
