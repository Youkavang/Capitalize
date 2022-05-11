import Nav from './components/Nav'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import EventList from './pages/EventList';
import AuthContext from './context/AuthContext'
import Profile from './users/Profile';

function App() {
  return (
    <div className="App">
      <AuthContext>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Calendar' element={<Calendar/>}/>
          <Route path='/EventList' element={<EventList/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          {/* <Route path='/Login' element={<SignInOutContainer/>}/> */}
        </Routes>
      </AuthContext>
        
    </div>
  );
}

export default App;
