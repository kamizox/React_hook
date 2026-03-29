import axios from 'axios'
import { useEffect, useState } from 'react'

export function useFetchProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
