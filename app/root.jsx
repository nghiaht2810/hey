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
import { Home, AlertCircle } from "lucide-react"; // Import icon mới

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

// --- PHẦN MỚI: Xử lý lỗi 404 và các lỗi khác ---
export function ErrorBoundary() {
  const error = useRouteError();
  
  // Kiểm tra xem lỗi có phải là 404 hay không
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 p-4 transition-colors duration-300">
        <div className="max-w-md w-full text-center">
          
          {/* Icon minh họa */}
          <div className="mx-auto mb-6 w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 dark:text-red-400">
            <AlertCircle size={48} />
          </div>

          {/* Tiêu đề lỗi */}
          <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white mb-2">
            {is404 ? "404" : "Oops!"}
          </h1>
          
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            {is404 ? "Không tìm thấy trang" : "Đã xảy ra lỗi"}
          </h2>

          {/* Mô tả lỗi */}
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            {is404 
              ? "Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển." 
              : "Đã có lỗi không mong muốn xảy ra. Vui lòng thử lại sau."}
          </p>

          {/* Nút quay về trang chủ */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            <Home size={18} />
            Quay về trang chủ
          </Link>

          {/* Chi tiết lỗi (chỉ hiện khi không phải 404 để debug) */}
          {!is404 && (
            <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/50 rounded-lg text-left overflow-auto">
              <pre className="text-xs text-red-600 dark:text-red-400 font-mono">
                {error instanceof Error ? error.message : "Unknown Error"}
              </pre>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}