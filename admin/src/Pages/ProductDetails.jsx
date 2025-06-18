import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/product/getsingleproduct/${id}`);
        setProduct(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Image Gallery */}
        <div className="w-full md:w-1/5">
          <div className="flex flex-row md:flex-col gap-4">
            {[product.image].map((img, index) => (
              <div 
                key={index}
                className={`cursor-pointer border-2 ${selectedImage === index ? 'border-red-500' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`View ${index + 1}`} className="w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Center - Main Image */}
        <div className="w-full md:w-2/5">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full"
          />
        </div>

        {/* Right Side - Product Info */}
        <div className="w-full md:w-2/5">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">★★★★☆</div>
            <span className="text-gray-500">(Reviews)</span>
            <span className="text-green-500">{product.status}</span>
          </div>

          <div className="text-2xl font-bold mb-6">${product.price}</div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex gap-4 mb-6">
            <div className="flex border rounded">
              <button 
                className="px-4 py-2 border-r"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input 
                type="number" 
                className="w-16 text-center"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              />
              <button 
                className="px-4 py-2 border-l"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
            <button className="bg-red-500 text-white px-8 py-2 rounded">
              Buy Now
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded">
              ♡
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded">
              <div className="w-8">🚚</div>
              <div>
                <h4 className="font-semibold">Free Delivery</h4>
                <p className="text-sm text-gray-500">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded">
              <div className="w-8">↩️</div>
              <div>
                <h4 className="font-semibold">Return Delivery</h4>
                <p className="text-sm text-gray-500">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;