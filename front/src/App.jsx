import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import About from "./comonents/about/About";
import Footer from "./comonents/footer/Footer";
import Header from "./comonents/header/Header";
import Parallax from "./comonents/parallax/Parallax";
import WeeklySchedule from "./comonents/schedule/schedule";
import LoginRegistr from './comonents/page/login-registr/LoginRegitr';
import NoteBoard from './comonents/page/notes/Notes';




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
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
          <Route path="/loginregistr" element={<LoginRegistr /> } />
          <Route path="/notes" element={<NoteBoard />} />
      </Routes>
    </Router>
  )
} 

export default Page;
