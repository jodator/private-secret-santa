import { useParams } from 'react-router-dom'
import { usePublicMapping } from '@/hooks/usePublicMapping.tsx'
import { ProgramRecord, useLeoWalletRecords } from '@/hooks/useLeoWalletRecords.ts'
import { programName } from '@/config.ts'
import { useCallback, useMemo } from 'react'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { Transaction, Transition, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'

interface GiftTag {
  organizer: string,
  recipient: string,
  owner: string,
}

export function Dashboard() {
  const { organizer } = useParams<{ organizer: string }>()
  const { data: participants } = usePublicMapping(programName, 'participants', organizer)
  const { data: secret_gifts } = usePublicMapping(programName, 'secret_gifts', organizer)
  const { records } = useLeoWalletRecords<GiftTag>(programName)
  const { publicKey, requestTransaction } = useWallet()

  const dashboardRecords = useMemo(() => {
    if (!records || !organizer) return []
    return (records).filter(record => record.data.organizer.startsWith(organizer))
  }, [records, organizer])

  const registerGift = useCallback(async (giftTag: ProgramRecord<GiftTag>) => {
    if (!publicKey || !requestTransaction) return

    const inputs = [giftTag]
    const transition = new Transition(programName, 'report_gift', inputs)
    const fee = 1_000_000

    const transaction = new Transaction(publicKey, WalletAdapterNetwork.Testnet, [transition], fee)

    const response = await requestTransaction(transaction)
    alert('Transaction sent! 🎊\nConfirmation ID: ' + response)
  }, [publicKey, requestTransaction])
  console.log(records)
  return (
    <div>
      <p className="text-xl text-white">Dashboard for {organizer}</p>
      {participants && <p className="text-white my-4">Participants: <strong>{participants}</strong></p>}
      {secret_gifts && <p className="text-white my-4">Secret Gifts: {secret_gifts}</p>}
      {!!dashboardRecords.length && <div className="text-white my-4">
        <p>You're a Secret Santa for:</p>
        <ul className="list-disc pl-8">
          {dashboardRecords.map((record, index) => (
            <li className="my-4" key={index}>{record.data.recipient}
              <button className="bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-700 text-white font-bold py-1 px-2 mx-4 rounded"
                      onClick={() => registerGift(record)}>
                Register gift
              </button>
            </li>
          ))}
        </ul>
      </div>}
    </div>
  )
}