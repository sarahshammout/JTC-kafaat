import { Routes, Route, useLocation } from 'react-router-dom'
import MainNav from './components/MainNav'
import JTC from './pages/JTC'
import AppLayout from './components/AppLayout'
import Dashboard from './pages/Dashboard'
import Laptops from './pages/Laptops'
import Donations from './pages/Donations'
import Requests from './pages/Requests'
import StoreProducts from './pages/StoreProducts'
import StoreOrders from './pages/StoreOrders'
import './App.css'
import LoadingPage from './components/LoadingPage'

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/jtc/admin')

  return (
    <>
      {!isAdmin && <MainNav />}
      <LoadingPage>
      <Routes>
        <Route path="/" element={<JTC />} />
        <Route path="/jtc" element={<JTC />} />
        <Route path="/jtc/admin" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/jtc/admin/laptops" element={<AppLayout><Laptops /></AppLayout>} />
        <Route path="/jtc/admin/donations" element={<AppLayout><Donations /></AppLayout>} />
        <Route path="/jtc/admin/requests" element={<AppLayout><Requests /></AppLayout>} />
        <Route path="/jtc/admin/store" element={<AppLayout><StoreProducts /></AppLayout>} />
        <Route path="/jtc/admin/orders" element={<AppLayout><StoreOrders /></AppLayout>} />
      </Routes>
      </LoadingPage>
    </>
  )
}

export default App