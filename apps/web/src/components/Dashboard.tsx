import { useParams } from 'react-router-dom'
import { usePublicMapping } from '@/hooks/usePublicMapping.tsx'

export function Dashboard() {
  const { organizer } = useParams<{ organizer: string }>()
  const { data: participants } = usePublicMapping('secret_santa_v001.aleo', 'participants', organizer)
  const { data: secret_gifts } = usePublicMapping('secret_santa_v001.aleo', 'secret_gifts', organizer)

  return (
    <div>
      <p className="text-xl text-white">Dashboard for {organizer}</p>
      {participants && <p className="text-white my-2">Participants: {participants}</p>}
      {secret_gifts && <p className="text-white my-2">Secret Gifts: {secret_gifts}</p>}
    </div>
  )
}