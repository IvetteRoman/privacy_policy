import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from "./user";
import Gmail from './Email/email';

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/user/:id" element={<User/>} />
        <Route exact path="/" element={<Gmail/>} />
      </Routes>
    </Router>

  );
}

export default App;
