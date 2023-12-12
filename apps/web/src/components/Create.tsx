import { useCallback, useState } from 'react'
import { shortenAddress } from '@/utils/shortenAddress.tsx'

export function Create() {
  const [addresses, setAddresses] = useState<string[]>([])
  const [pairs, setPairs] = useState<string[][]>([])

  const onTextAreaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  return <div>
    <p className="text-xl text-white">Create a secret santa game by providing list of addresses below.</p>
    <p className="text-white">Each address on new line!</p>
    <p className="text-white">Add your own address if you wish to participate!</p>
    <textarea onChange={onTextAreaChange}
              className="flex rounded w-full h-full min-h-[200px] my-2 p-4 bg-slate-400 text-slate-700 font-mono"></textarea>
    <button onClick={createSecretSantaPairs} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create pairs
    </button>
    <p className="text-white">Result:</p>
    <ul className="text-white">
      {pairs.map((pair, index) => {
          return <li key={index}>
            <span className="font-mono">{shortenAddress(pair[0])} ➡️ {shortenAddress(pair[1])}</span> {pair[0] !== pair[1] ? '✅' : '❌'}
          </li>
        }
      )}
    </ul>
  </div>
}

const isValidAleoAddress = (address: string) => {
  return address.length === 63 && address.startsWith('aleo')
}
