import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Product from "../../components/home/Products/Product";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(2);
  const [total, setTotal] = useState(0);

  const fetchProducts = async (page, limit) => {
    console.log(page);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/product/getallproduct?page=${page}&limit=${limit}`
      );
      console.log(res.data);
      setProducts(res.data.data);
      setPageCount(res.data.pages);

      setTotal(res.data.total);
      setLimit(res.data.limit);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handlePageClick = (page) => {
    // console.log(page.selected);
    setCurrentPage(page.selected + 1);
  };
  useEffect(() => {
    fetchProducts(currentPage, limit);
  }, [currentPage, limit]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner />

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
            {products.map((item) => (
              <Product
                key={item._id}
                _id={item._id}
                img={item.image}
                productName={item.name}
                price={item.price}
                color={item.color}
                badge={item.badge}
                des={item.des}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center pt-10">
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
              forcePage={currentPage - 1}
              containerClassName="flex gap-2"
              pageClassName="border border-gray-300 rounded"
              pageLinkClassName="px-3 py-1 block"
              activeLinkClassName="bg-black text-white"
              previousLabel="←"
              nextLabel="→"
              breakLabel="..."
            />
          </div>

          <p className="text-center text-sm text-gray-500">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, total)} of {total} products
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
