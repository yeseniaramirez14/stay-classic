import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServicesList from './ServicesList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="services">
            <Route path="" element={<ServicesList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
