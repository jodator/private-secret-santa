import { FC, ReactNode, useMemo } from 'react'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'
import { WalletProvider } from '@demox-labs/aleo-wallet-adapter-react'
import { DecryptPermission, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'
import { WalletModalProvider } from '@demox-labs/aleo-wallet-adapter-reactui'

export const Wallet: FC<{ children: ReactNode }> = ({ children }) => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "🎅 Private Secret Santa",
      }),
    ],
    [],
  )

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.OnChainHistory}
      network={WalletAdapterNetwork.Testnet}
      programs={['secret_santa_v001']}
      autoConnect
    >
      <WalletModalProvider>
        {children}
      </WalletModalProvider>
    </WalletProvider>
  )
}