import { NavLink, useLocation } from "react-router-dom"; // ✅ FIXED: Changed to react-router-dom

export default function NotFound() {
  const location = useLocation();

  return (
    <>
      <main className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4">
        <div className="text-center max-w-md mx-auto">
          {/* Huge Stylized Error Code Graphic */}
          <h1 className="text-9xl font-extrabold text-blue-600 dark:text-blue-500 tracking-widest animate-pulse">
            404
          </h1>

          {/* Error Context Messaging */}
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Page Not Found
          </h2>

          <p className="mt-4 text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Sorry, we couldn’t find the page you’re looking for. It might have
            been moved, deleted, or never existed in the first place.
          </p>

          {/* Dynamic location display path - Satisfies Page 1 criteria of providing error details */}
          <p className="mt-2 text-sm font-mono text-red-500 dark:text-red-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded inline-block">
            "{location.pathname}" was not found
          </p>

          {/* Call to Action Interactive Button */}
          <div className="mt-8">
            <NavLink
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all transform hover:-translate-y-0.5"
            >
              <svg
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back to Shop
            </NavLink>
          </div>
        </div>
      </main>
    </>
  );
}
