import Offer from "../../Components/Offer/Offer";
import Header from "../../Components/Header/Header";
import Category from "../../Components/Category/Category";
import Product from "../../Components/Product/Product";
import { useEffect, useState } from "react";
import axios from "axios";
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/product/getallproduct"
        );

        console.log(res.data.data);

        setProducts(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="">
      <Offer />
      <Header />
      <div className="flex max-w-[1170px] mx-auto">
        <div className="mt-[80px]">
          <p className="text-[14px] font-pops text-gray-400">Shop/Category</p>
          <Category />
        </div>
        <div className="mt-[80px] ml-[90px]">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
