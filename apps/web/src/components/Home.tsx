import { NavLink } from 'react-router-dom'

export function Home() {
  return <div>
    <p className="text-xl text-white">Home</p>
    <NavLink to="create" className="text-blue-500 hover:text-blue-600">Create</NavLink>
  </div>
}