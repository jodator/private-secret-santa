import { ChangeEvent, useCallback, useState } from 'react'
import { shortenAddress } from '@/utils/shortenAddress.tsx'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { Transaction, Transition, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'
import { NavLink } from 'react-router-dom'
import { programName } from '@/config.ts'

export function Create() {
  const { publicKey, requestTransaction } = useWallet()
  const [addresses, setAddresses] = useState<string[]>([])
  const [pairs, setPairs] = useState<string[][]>([])
  const [confirmationId, setConfirmationId] = useState<string>()

  const onTextAreaChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value

    const addresses = value.split('\n').filter(isValidAleoAddress)
    const filterSet = new Set(addresses)
    setAddresses([...filterSet.values()])
  }, [])

  const createSecretSantaPairs = useCallback(() => {
    const shuffledAddresses = [...addresses]
    for (let i = shuffledAddresses.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAddresses[i], shuffledAddresses[j]] = [shuffledAddresses[j], shuffledAddresses[i]]
    }

    const pairs = addresses.map((address, index) => {
      return [address, shuffledAddresses[index]]
    })

    setPairs(pairs)
  }, [addresses])

  const createSecretSantaRecords = useCallback(async () => {
    if (!publicKey || !requestTransaction) return

    const transitions = pairs.map((pair) => {
      const inputs = [pair[0], pair[1]]
      return new Transition(programName, 'add_gift_tag', inputs)
    })

    const fee = transitions.length * 3_000_000

    const transaction = new Transaction(publicKey, WalletAdapterNetwork.Testnet, transitions, fee)

    const response = await requestTransaction(transaction)

    setConfirmationId(response)
  }, [pairs, publicKey, requestTransaction])

  const isValid = validateSecretSantaPairs(pairs) && publicKey

  if (confirmationId) {
    return (
      <div>
        <p className="text-xl text-white">Transaction sent! 🎊</p>
        <p className="text-white">Confirmation ID: {confirmationId}</p>
        <p className="text-white">
          You can go to the <NavLink className="text-blue-500 hover:text-blue-300" to={`/dashboard/${publicKey}`}>Secret Santa Dashboard page</NavLink>
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-xl text-white">Create a secret santa game by providing list of addresses below.</p>
      <p className="text-white">Each address on new line!</p>
      <p className="text-white">Add your own address if you wish to participate!</p>
      <textarea onChange={onTextAreaChange}
                className="flex rounded w-full h-full min-h-[200px] my-2 p-4 bg-slate-400 text-slate-700 font-mono"></textarea>
      <button onClick={createSecretSantaPairs} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Randomize
        pairs
      </button>
      <div className="my-4">
        <p className="text-white">Result:</p>
        <ul className="text-white">
          {pairs.map((pair, index) => {
              return <li className="list-disc ml-8" key={index}>
                <span className="font-mono">{shortenAddress(pair[0])} ➡️ {shortenAddress(pair[1])}</span> {pair[0] !== pair[1] ? '✅' : '❌'}
              </li>
            },
          )}
        </ul>
      </div>
      <button disabled={!isValid}
              onClick={createSecretSantaRecords}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-700 text-white font-bold py-2 px-4 rounded">
        Create Secret Santa records
      </button>
    </div>
  )
}

const validateSecretSantaPairs = (pairs: string[][]) => {
  if (pairs.length === 0) return false
  return pairs.every((pair) => {
    return pair[0] !== pair[1]
  })
}

const isValidAleoAddress = (address: string) => {
  return address.length === 63 && address.startsWith('aleo')
}
