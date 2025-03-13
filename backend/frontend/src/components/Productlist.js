import { useEffect, useState } from 'react';
import api from '../api'; // Import the API configuration

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/api/products') // Use the `api` instance
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(product => <li key={product._id}>{product.name}</li>)}
            </ul>
        </div>
    );
};

export default ProductList;
