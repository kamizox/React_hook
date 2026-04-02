import axios from 'axios'
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
    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
        setProducts(response.data.products ?? [])
        setError(null)
      })
      .catch((err) => {
        setProducts([])
        setError(
          err.response?.data?.message ??
            err.message ??
            'Something went wrong. Please try again.'
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { products, loading, error }
}