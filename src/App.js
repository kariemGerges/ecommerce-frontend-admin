import { HashRouter as Router, Route, Routes } from 'react-router-dom';
// pages
import DashboardHome from './pages/DashboardHome/DashboardHome';
// components
import Header from './components/header/Header';
import AuthModal from './components/AuthModal/AuthModal';
// import DoodlesBackground from './components/Background/FloatingEquation';

function App() {
    return (
        <div>
            <Router>
                <AuthModal />
                <Header />
                <Routes>
                    <Route path="/" element={<DashboardHome />} />
                </Routes>
                {/* <Footer /> */}
            </Router>
        </div>
    );
}

export default App;
