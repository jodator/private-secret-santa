export const shortenAddress = (address: string) => {
  const length = 5
  if (address.length < length * 2) return address
  return `${address.slice(0, length + 'aleo1'.length)}...${address.slice(
    address.length - length,
    address.length,
  )}`
}