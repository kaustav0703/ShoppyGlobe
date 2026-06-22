import { products } from "../constants/products";
import ProductItem from "../components/ProductItem";
import { useSelector } from "react-redux";

export default function ProductList() {
  // 1. Safely grab query and keep it lowercased
  const searchQuery = useSelector((state) =>
    state.search.searchQuery.toLowerCase(),
  );

  // 2. Filter dynamically by checking both name and category with .includes()
  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const productCategory = product.category.toLowerCase();

    return (
      productName.includes(searchQuery) || productCategory.includes(searchQuery)
    );
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Responsive Grid Layout or Empty State */}
        {filteredProducts.length > 0 ? (
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
              No products found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
