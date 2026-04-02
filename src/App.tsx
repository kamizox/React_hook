import './App.css'
import { useFetchProducts } from './useFetchProducts'

function App() {
  const { products, loading, error } = useFetchProducts()

  if (loading) {
    return (
      <main className="app catalog">
        <p className="catalog-loading">Loading...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="app catalog">
        <p className="catalog-error" role="alert">
          {error}
        </p>
      </main>
    )
  }

  return (
    <main className="app catalog">
      <h1 className="catalog-heading">Product catalog</h1>
      <div className="catalog-grid">
        {products.map((item) => (
          <article className="product-card" key={item.id}>
            <div className="product-card__media">
              <img src={item.thumbnail} alt="" loading="lazy" />
            </div>
            <div className="product-card__body">
              <h2 className="product-card__title">{item.title}</h2>
              <span className="product-card__badge">{item.category}</span>
              <p className="product-card__price">${Number(item.price).toFixed(2)}</p>
              <button type="button" className="product-card__cta">
                View Details
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default App