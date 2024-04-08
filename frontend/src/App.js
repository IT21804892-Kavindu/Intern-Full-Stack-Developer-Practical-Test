import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddDevice from './Components/AddDevice';
import DisplayDevices from './Components/DisplayDevices';
import EditDevice from './Components/EditDevice';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<DisplayDevices />} />
          <Route path='/add' element={<AddDevice />} />
          <Route path='/edit/:id' element={<EditDevice />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
