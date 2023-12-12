import { Outlet } from 'react-router-dom'
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui'

export function Layout() {
  return (
    <div>
      <div className="container md mx-auto">
        <h1 className="my-4 text-4xl font-extrabold text-white">🎅 Secret Santa</h1>
        <div className="flex mt-4 justify-end">
          <WalletMultiButton />
        </div>
        <Outlet />
      </div>
    </div>
  )
}