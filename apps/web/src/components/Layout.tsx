import { Outlet } from 'react-router-dom'

export function Layout() {
  return (<div>
    <div className="container md mx-auto">
      <h1 className="my-4 text-4xl font-extrabold text-white">🎅 Secret Santa</h1>
      <Outlet />
    </div>
  </div>)
}