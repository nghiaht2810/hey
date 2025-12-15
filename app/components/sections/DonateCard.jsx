import { Card } from "~/components/ui/Card";
import { ExternalLink } from "lucide-react";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { useLanguage } from "~/contexts/LanguageContext";
import { DATA_EN, DATA_VI } from "~/data/portfolio";

/**
 * Component: Animated Coffee Cup
 * Vẽ lại icon cốc cà phê bằng SVG và tạo animation khói bay
 */
const AnimatedCoffee = () => {
  const steamVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: (i) => ({
      opacity: [0, 0.8, 0],
      y: -15,
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
        delay: i * 0.4, // Tạo độ trễ giữa các làn khói
      },
    }),
  };

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
      >
        {/* Thân cốc */}
        <path
          d="M19 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-yellow-400/10"
        />
        {/* Nắp cốc */}
        <path
          d="M4 6H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Khói (Steam) - Animated */}
        <motion.path
          d="M8.5 2C8.5 2 7.5 4 8.5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          custom={0}
          variants={steamVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M12 1C12 1 11 3 12 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          custom={1}
          variants={steamVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M15.5 2C15.5 2 14.5 4 15.5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          custom={2}
          variants={steamVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>
    </div>
  );
};

export function DonateCard() {
  const { language } = useLanguage();
  const t = language === 'vi' ? DATA_VI.labels : DATA_EN.labels;
  const data = useLoaderData();
  
  const donateUrl = data.donate || "https://buymeacoffee.com/nghiaht281003";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full group"
    >
      <a 
        href={donateUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block h-full"
      >
        <Card className="h-full relative overflow-hidden bg-gradient-to-br from-[#1a1600] to-[#0a0a0a] border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-500">
          
          {/* --- Background Effects --- */}
          
          {/* 1. Lớp nhiễu hạt (Noise Texture) tạo cảm giác lì */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* 2. Ánh sáng vàng ở góc (Glow) */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/20 blur-[60px] rounded-full group-hover:bg-yellow-400/30 transition-all duration-500" />
          
          {/* 3. Hiệu ứng quét sáng (Shimmer) khi hover */}
          <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-0" />

          {/* --- Content --- */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-5 text-center">
            
            {/* Icon Container */}
            <div className="mb-3 p-3 rounded-full bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)] group-hover:shadow-[0_0_30px_rgba(234,179,8,0.2)] transition-all duration-500">
              <AnimatedCoffee />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 flex items-center justify-center gap-2">
                {t.donateTitle}
                {/* Mũi tên chỉ hiện khi hover */}
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  whileHover={{ opacity: 1, x: 0 }} // Kích hoạt từ thẻ cha (group)
                  className="text-yellow-400 group-hover:opacity-100 group-hover:translate-x-0 opacity-50 transition-all duration-300"
                >
                  <ExternalLink size={14} />
                </motion.span>
              </h3>
              
              <p className="text-xs font-mono font-medium text-yellow-500/60 uppercase tracking-widest group-hover:text-yellow-400/80 transition-colors">
                {t.donateDesc}
              </p>
            </div>
          </div>
        </Card>
      </a>
    </motion.div>
  );
}