import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import About from "./comonents/about/About";
import Footer from "./comonents/footer/Footer";
import Header from "./comonents/header/Header";
import Parallax from "./comonents/parallax/Parallax";
import LoginRegistr from './comonents/page/login-registr/LoginRegitr';
import NoteBoard from './comonents/page/notes/Notes';
import WeeklySchedule from './comonents/schedule/Schedule';
import { AuthProvider } from './context/AuthContext';
import Reminders from './comonents/page/reminders/Reminders';
import Schepage from './comonents/page/schedulepage/Schepage';




const App = () => {
  return (
    <>
      <Header />
      <Parallax />
      <WeeklySchedule />
      <About />
      <Footer />
    </>
  );
}

function Page() {
  return (
    <AuthProvider>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<App />} />
          <Route path="/loginregistr" element={<LoginRegistr /> } />
          <Route path="/notes" element={<NoteBoard />} />
          <Route path='/sche' element={<Schepage />} />
          <Route path='/reminders' element={<Reminders />} />
      </Routes>
</AuthProvider>
  )
} 

export default Page;
