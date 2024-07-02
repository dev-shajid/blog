import { useState, useEffect, Dispatch, SetStateAction } from 'react'

export default function useDebounce(): {
    debouncedValue: string;
    setDebounceInput: Dispatch<SetStateAction<{
        value: string;
        delay: number;
    }>>
} {
    const [debounceInput, setDebounceInput] = useState<{ value: string, delay: number }>({ value: "", delay: 200 })
    const [debouncedValue, setDebouncedValue] = useState(debounceInput.value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(debounceInput.value)
        }, debounceInput.delay)

        return () => {
            clearTimeout(handler)
        }
    }, [debounceInput])

    return { debouncedValue, setDebounceInput }
}
