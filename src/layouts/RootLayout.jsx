// ✅ FIXED: Must pull from react-router-dom
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function RootLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}
