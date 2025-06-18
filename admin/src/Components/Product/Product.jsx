import React, { useState, useEffect } from "react";
import { GiSelfLove } from "react-icons/gi";
import { FaStar, FaStarHalfAlt, FaRegEye } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/product/getallproduct"
        );
        setProducts(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleProductClick(product._id)}
          >
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">${product.price}</span>
                {product.status && (
                  <span className="text-green-500 text-sm">
                    {product.status}
                  </span>
                )}
              </div>
              {product.description && (
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {product.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
