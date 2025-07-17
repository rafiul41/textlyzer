import { Outlet } from 'react-router-dom'

export default function ProtectedLayout() {
  return <>
    Protected
    <Outlet/>
  </>
} 