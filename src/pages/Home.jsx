import ProductList from "./ProductList"; // Verify correct relative file pathing

export default function Home() {
  return (
    <div className="home-container bg-slate-50 dark:bg-slate-950 min-h-screen p-6">
      {/* Structural visual header banner text */}
      <header className="mb-8 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Welcome to ShoppyGlobe
        </h1>
        <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
          Discover our curated collection of premium products.
        </p>
      </header>

      {/* REQ: Rendering the automated ProductList list view layout grid here */}
      <ProductList />
    </div>
  );
}
