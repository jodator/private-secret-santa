import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { useEffect, useState } from 'react'

export interface ProgramRecord<T> {
  "id": string,
  "owner": string,
  "program_id": string,
  "spent": boolean,
  "recordName": string,
  "data": T,
}

export function useLeoWalletRecords<T>(programName: string, options: { includeSpent?: boolean } = { includeSpent: false }) {
  const { connected, requestRecords, publicKey } = useWallet()
  const [records, setRecords] = useState<ProgramRecord<T>[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setRecords(null)
    setIsLoading(true)

    if (connected && publicKey && requestRecords) {
      requestRecords?.(programName).then((records: ProgramRecord<T>[]) => {
        if (!options.includeSpent) {
          records = records.filter(record => !record.spent)
        }

        setRecords(records)
        setIsLoading(false)
      })
    }
  }, [connected, options.includeSpent, programName, publicKey, requestRecords])

  return { records, isLoading }
}