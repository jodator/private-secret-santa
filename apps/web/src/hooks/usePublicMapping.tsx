import { useQuery } from '@tanstack/react-query'

function getRPC(useObscura: boolean = false) {
  return useObscura ? `https://aleo.obscura.build/v1/b5092785-9703-4206-846f-0691b8b46ac9` : 'https://api.explorer.aleo.org/v1'
}

export function usePublicMapping(programId: string, mappingName: string, key: string | undefined | null) {
  return useQuery({
    queryKey: [programId, mappingName, key],
    enabled: !!key,
    queryFn: async () => {
      const response = await fetch(`${getRPC()}/testnet3/program/${programId}/mapping/${mappingName}/${key}`)
      return await response.json()
    },
  })
}