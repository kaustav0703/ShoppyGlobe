# ShoppyGlobe - E-Commerce React Application

ShoppyGlobe is a modern, fully responsive e-commerce web application built using **React (Vite)**, **Redux Toolkit**, and **React Router DOM v6/v7**. The application fetches real-time product datasets from the DummyJSON API and implements efficient client-side filtering, state architecture, and optimization flows.

## 🔗 Project Links
*   **GitHub Repository**: [https://github.com/kaustav0703/ShoppyGlobe](https://github.com/kaustav0703/ShoppyGlobe)
*   **Live link**: [https://shoppy-globe-smoky.vercel.app/](https://shoppy-globe-smoky.vercel.app/)
---

## ✨ Features Implemented

### 🧭 1. Routing & Global Layout (`react-router-dom`)
*   Implemented clean navigation configurations using modern `createBrowserRouter` and `RouterProvider`.
*   A persistent structural **RootLayout** containing a sticky navigation Header visible on all page paths.
*   **Active Route Indication**: Uses `<NavLink>` inside the header to visually track and highlight active navigation routes (`Home`, `Checkout`).
*   **Dynamic Product Details Router**: Utilizes parameterized dynamic routes (`/product-detail/:id`) to cleanly destructure parameter keys via `useParams()` and display single items.
*   **Custom 404 Catch-All Page**: Displays a beautifully stylized fallback screen that reads the context location using `useLocation().pathname` to report missing parameters clearly to the UI.

### 🏪 2. Global State Management (Redux Toolkit)
*   **Cart Slice (`cartSlice.js`)**: Manages individual operational arrays handles actions for:
    *   `addItem`: Safely inserts items or increments existing product quantities.
    *   `removeItem`: Decrements product counts or sweeps zeroed rows from the layout.
    *   `emptyCart`: Wipes out the current store array context completely during order fulfillment.
*   **Search Slice (`searchSlice.js`)**: Decoupled slice that records user search string criteria to dynamically update layout dependencies in real-time.
*   **Dynamic Counters**: The header shopping cart badge uses `useSelector` to calculate item totals instantly on every state sync.

### 📦 3. Product Discovery & Checkout Flows
*   **Product List Layout**: Renders clean product card frameworks displaying categories, names, price currencies formatting, and star feedback metrics.
*   **Live Redux Filtering**: Features an instantaneous global query search tracking string mechanism that isolates match results by name or category.
*   **Fulfillment Checkout**: A dummy details shipping form linked directly to order completion handlers. Placing an order triggers a native browser notification, dispatches a cart cleanup process, and returns users back to the homepage without page flashes via a native location routing wrapper.

### ⚡ 4. Performance Optimizations
*   **Route-Level Code Splitting**: Utilizes `React.lazy()` paired with `<Suspense>` boundaries and a custom `LoadingSpinner` element to load chunk dependencies strictly on demand.
*   **Native Image Lazy Loading**: Embeds structural `loading="lazy"` flags within the layout matrices to postpone background assets downloads until viewport entry.

---

## 🛠️ Architecture & Folder Structure

The code layout is strictly separated into clean modular units to keep structural presentation isolated from logical state handlers:

```text
src/
├── assets/          # Static file visual vectors & image packs
├── components/      # Common layout parts (Header, ProductItem, CartItem, LoadingSpinner)
├── constants/       # Local configuration files and item array constants
├── hooks/           # Isolated API custom fetching systems (useFetchProducts)
├── layouts/         # Shared routing structural shells (RootLayout)
├── pages/           # Individual core page views (Home, ProductDetail, Cart, Checkout, NotFound)
├── redux/           # Global store configurations and feature slices
├── routes/          # Central router setup file definitions (AppRoutes)
├── App.jsx          # Entry application routing entry layout frame
└── main.jsx         # React application DOM context initialization node
```

---

## 🚀 Getting Started & Local Setup

Follow these quick manual steps to launch the local build development server workspace:

### 1. Clone the repository
```bash
git clone https://github.com.git
cd ShoppyGlobe
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the application locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser to test and view the platform.

### 4. Build for production compilation
```bash
npm run build
```

---

## 📄 Core Evaluation Criteria Checklist

*   [x] **Build Engine**: Configured exclusively on **Vite** base architecture.
*   [x] **State Handling**: Completely driven using **Redux Toolkit** slice wrappers.
*   [x] **Route Injections**: Set up via **React Router DOM** using nested children configurations.
*   [x] **Optimization Models**: Complete route chunks split via lazy loading hooks.
