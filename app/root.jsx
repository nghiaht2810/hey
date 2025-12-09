import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  Link,
} from "@remix-run/react";
import { ThemeProvider } from "~/contexts/ThemeContext";
import { LanguageProvider } from "~/contexts/LanguageContext";
import styles from "~/styles/global.css?url";
import { Home, RefreshCcw, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, Suspense, lazy } from "react";

// Lazy load component 3D để tối ưu hiệu suất tải trang ban đầu
const SpaceScene = lazy(() => import("~/components/canvas/SpaceScene"));

export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "/favicon.ico" },
];

export function Layout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Outlet />
      </LanguageProvider>
    </ThemeProvider>
  );
}

// --- TRANG 404 NEXT-GEN: 3D WEBGL + MOTION ---

export function ErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout>
      <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center">
        
        {/* --- LỚP 1: 3D BACKGROUND (React Three Fiber) --- */}
        {/* Chỉ render ở client để tránh lỗi SSR */}
        {mounted && (
          <Suspense fallback={<div className="absolute inset-0 bg-slate-900" />}>
            <SpaceScene />
          </Suspense>
        )}

        {/* --- LỚP 2: GLASSMORPHISM UI (Framer Motion) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-3xl px-6"
        >
          {/* Thẻ kính mờ */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-purple-500/20 text-center overflow-hidden relative">
            
            {/* Hiệu ứng ánh sáng quét qua thẻ (Sheen effect) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_5s_infinite]" />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 inline-block"
            >
              <h1 className="text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                {is404 ? "404" : "Error"}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                {is404 ? "Lạc Lối Trong Không Gian Số?" : "Sự Cố Hệ Thống"}
              </h2>
              
              <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto font-light leading-relaxed">
                {is404 
                  ? "Trang bạn tìm kiếm có thể đã bị hố đen nuốt chửng hoặc chưa từng tồn tại trong vũ trụ này." 
                  : "Có vẻ như động cơ phản lực của chúng tôi đang gặp trục trặc kỹ thuật."}
              </p>

              {/* Debug info (ẩn đi, chỉ hiện khi cần thiết) */}
              {!is404 && (
                <div className="mb-8 p-4 bg-red-950/30 border border-red-500/30 rounded-lg text-left text-xs font-mono text-red-300 overflow-auto max-h-32">
                  <div className="flex items-center gap-2 mb-2 font-bold text-red-400">
                    <AlertTriangle size={14} /> Error Log:
                  </div>
                  {error instanceof Error ? error.message : "Unknown Error"}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(79, 70, 229, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-3.5 rounded-full bg-white text-black font-bold text-lg overflow-hidden transition-all"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Home size={20} /> Quay Về Trạm Chính
                    </span>
                    {/* Hiệu ứng nền nút */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </Link>

                <motion.button
                  onClick={() => window.location.reload()}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold backdrop-blur-md transition-colors flex items-center gap-2 hover:border-white/40"
                >
                  <RefreshCcw size={18} /> Thử Kết Nối Lại
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="mt-8 text-white/20 text-xs text-center font-mono"
          >
            INTERACTIVE 3D ENVIRONMENT • RENDERED WITH WEBGL
          </motion.p>
        </motion.div>
      </div>
    </Layout>
  );
}