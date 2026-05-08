import { Routes, Route } from 'react-router-dom'
import JTC from './pages/JTC'
import AdminLayout from './components/AdminLayout'
import Dashboard from './pages/Dashboard'
import Laptops from './pages/Laptops'
import Donations from './pages/Donations'
import Requests from './pages/Requests'
import StoreProducts from './pages/StoreProducts'
import StoreOrders from './pages/StoreOrders'
import './App.css'
import LoadingPage from './components/LoadingPage'

function App() {
  return (
    <>
      <LoadingPage>
      <Routes>
        <Route path="/" element={<JTC />} />
        <Route path="/jtc" element={<JTC />} />
        <Route path="/jtc/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/jtc/admin/laptops" element={<AdminLayout><Laptops /></AdminLayout>} />
        <Route path="/jtc/admin/donations" element={<AdminLayout><Donations /></AdminLayout>} />
        <Route path="/jtc/admin/requests" element={<AdminLayout><Requests /></AdminLayout>} />
        <Route path="/jtc/admin/store" element={<AdminLayout><StoreProducts /></AdminLayout>} />
        <Route path="/jtc/admin/orders" element={<AdminLayout><StoreOrders /></AdminLayout>} />
        
      </Routes>
      </LoadingPage>
    </>
  )
}

export default App