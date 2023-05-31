export default function formatAuth0Sub(sub: string) {
  const [provider, id] = sub.split('|')

  return [provider, id]
}
