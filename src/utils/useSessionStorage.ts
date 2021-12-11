import { useEffect, useState } from 'react'

interface UseSessionStorageOptions<T> {
  storageKey: string
  initialValue?: T
  serializer?(state: T | undefined): string
  deserializer?(str: string | null): T
}
const useSessionStorage = <T>({
  storageKey,
  initialValue,
  serializer = (s) => JSON.stringify(s),
  deserializer = (s) => s && JSON.parse(s)
}: UseSessionStorageOptions<T>): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const getInitialState = () => {
    try {
      const sessionStorageValue = sessionStorage.getItem(storageKey)
      if (typeof sessionStorageValue === 'string') {
        return deserializer(sessionStorageValue)
      } else {
        sessionStorage.setItem(storageKey, serializer(state))
        return initialValue
      }
    } catch {
      return initialValue
    }
  }

  useEffect(() => {
    setState(getInitialState())
  }, [])

  const [state, setState] = useState<T | undefined>()

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, serializer(state))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }, [state])

  return [state, setState]
}

export default useSessionStorage
