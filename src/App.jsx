import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Inbox from './components/pages/Inbox';
import Today from './components/pages/Today';
import Upcoming from './components/pages/Upcoming';
import Filter from './components/pages/Filter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Inbox />} />
          <Route path='today' element={<Today />} />
          <Route path='upcoming' element={<Upcoming />} />
          <Route path='filter' element={<Filter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
