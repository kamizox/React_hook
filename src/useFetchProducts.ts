import { useEffect, useState } from 'react'

interface Product {
  id: number
  title: string
  price: number
  category: string
  thumbnail: string
}

export function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    fetch('https://dummyjson.com/products', {
      signal: controller.signal
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        setProducts(data.products ?? [])
        setError(null)
      })
      .catch((err) => {
        setProducts([])
        if (err.name === 'AbortError') {
          setError('Request timed out. Please try again.')
        } else {
          setError(
            err.message ?? 'Something went wrong. Please try again.'
          )
        }
      })
      .finally(() => {
        clearTimeout(timeoutId)
        setLoading(false)
      })

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  return { products, loading, error }
}