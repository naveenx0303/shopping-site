import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Welcome to the Shopping Site</h1>
      <p>Browse our products and enjoy shopping!</p>
      <div className="row mt-4">
        {products.length === 0 && <div>No products found.</div>}
        {products.map(product => (
          <div className="col-md-4 mb-3" key={product._id}>
            <div className="card h-100" style={{border: '1px solid white'}}>
              <div className="card-body" style={{ backgroundColor: 'lightgray' ,borderRadius: '50px' }}>
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>${product.price}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home; 