"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginCritter() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState<"email" | "password" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 👁 随机眨眼逻辑
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      setTimeout(blink, Math.random() * 4000 + 3000);
    };
    const timer = setTimeout(blink, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 🖱 全局鼠标追踪
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 👁 密码框随机偷瞄 (优化偷瞄时间)
  useEffect(() => {
    if (focus === "password" && !showPassword) {
      const interval = setInterval(() => {
        setIsPeeking(true);
        setTimeout(() => setIsPeeking(false), 800);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [focus, showPassword]);

  // 📐 深度物理动画参数
  const isEmailFocus = focus === "email";
  const isPassFocus = focus === "password";
  const isHiddenPass = isPassFocus && !showPassword;

  // 动态高度与探头逻辑
  const getSkew = () => {
    if (isEmailFocus) return -6 - (email.length * 0.2); // 随输入长度增加倾斜度
    if (isHiddenPass) return -18;
    if (showPassword) return -4; // 显示密码时迅速收缩
    return 0;
  };

  const getTranslateX = () => {
    if (isHiddenPass) return 40;
    if (isEmailFocus) return email.length * 1.5; // 随输入长度增加位移
    return 0;
  };

  const getHeightOffset = () => {
    if (isEmailFocus) return Math.min(email.length * 3, 60); // Email 输入越长，头探得越深
    if (isHiddenPass) return 40;
    return 0; // 显示密码或聚焦外时缩回
  };

  const skewAngle = getSkew();
  const txOffset = getTranslateX();
  const hOffset = getHeightOffset();

  // 眼神策略 (包含隐私避让 logic)
  const getPupilPos = (baseX: number, baseY: number, eyeSize: number, pupilSize: number) => {
    let x = mousePos.x + baseX;
    let y = mousePos.y + baseY;

    // 隐私：显示密码，看向左边避嫌
    if (showPassword && isPassFocus) {
      x = -16; y = 0;
    } else {
      // 聚焦密码且没在偷看：看向下方（沉思/害羞）
      const isActuallyHidden = isPassFocus && !isPeeking && !showPassword;
      if (isActuallyHidden) {
        x = 0; y = 10;
      } else if (isPeeking) {
        // 偷看期间：锁定输入框
        x = 10; y = 2;
      }
    }

    // 🏎 物理限制：确保瞳孔不掉出眼眶 (Clamping)
    const maxDist = (eyeSize - pupilSize) / 2;
    const dist = Math.sqrt(x * x + y * y);
    if (dist > maxDist) {
      const scale = maxDist / dist;
      x *= scale;
      y *= scale;
    }

    return { x, y };
  };

  const Eye = ({ size = 20, pupilSize = 8, baseX = 0, baseY = 0, lidColor = "#6d3ff5" }) => {
    const pupilPos = getPupilPos(baseX, baseY, size, pupilSize);
    
    // 计算眼睑状态
    const isActuallyHidden = isPassFocus && !isPeeking && !showPassword;
    
    return (
      <div 
        className="rounded-full bg-white flex items-center justify-center overflow-hidden transition-all duration-300 relative"
        style={{ width: size, height: size, zIndex: 5 }}
      >
        {/* 瞳孔 */}
        <div 
          className="rounded-full bg-[#2d2d2d]"
          style={{ 
            width: pupilSize, 
            height: pupilSize,
            transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
            transition: "transform 0.1s ease-out"
          }}
        />

        {/* 眼睑 (眨眼/遮挡) */}
        <motion.div 
          initial={false}
          animate={{ 
            height: isBlinking || isActuallyHidden ? "100%" : (isPeeking ? "40%" : "0%")
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute inset-x-0 top-0 origin-top z-10"
          style={{ backgroundColor: lidColor }}
        />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background font-inter antialiased overflow-hidden">
      
      {/* 👈 动画渲染区 (左侧) */}
      <div className="flex-1 hidden lg:flex flex-col justify-between bg-[#1e1e2e] p-12 text-white relative transition-colors duration-700">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px]" />

        <div className="relative z-20 flex items-center gap-2 text-lg font-bold select-none cursor-default">
           <div className="bg-indigo-600/20 p-2 rounded-xl">🔒</div>
           <span className="tracking-tighter">SECURE LOGIN</span>
        </div>

        {/* 角色互动容器 */}
        <div className="relative z-20 flex items-end justify-center h-[500px]">
          <div className="relative" style={{ width: 550, height: 400 }}>

            {/* 1. 紫色大个子 (高度随输入长度增加) */}
            <div 
              className="absolute bottom-0 transition-all duration-700 cubic-bezier(0.18, 0.89, 0.32, 1.28)"
              style={{ 
                left: 70, width: 180, height: 400 + hOffset, 
                backgroundColor: "rgb(108, 63, 245)", 
                borderRadius: "20px 20px 0 0", 
                zIndex: 1,
                transform: `skewX(${skewAngle}deg) translateX(${txOffset}px)`,
                transformOrigin: "center bottom"
              }}
            >
              {/* 眼睛组 */}
              <div className="absolute flex gap-8 top-12 left-1/2 -translate-x-1/2 transition-all duration-700">
                <Eye size={26} pupilSize={11} lidColor="rgb(108, 63, 245)" />
                <Eye size={26} pupilSize={11} lidColor="rgb(108, 63, 245)" />
              </div>
            </div>

            {/* 2. 黑色立柱 */}
            <div 
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{ 
                left: 240, width: 120, height: 310 + hOffset * 0.4, 
                backgroundColor: "rgb(45, 45, 45)", 
                borderRadius: "15px 15px 0 0", 
                zIndex: 2,
                transform: `skewX(${skewAngle * 0.7}deg) translateX(${txOffset * 0.5}px)`,
                transformOrigin: "center bottom"
              }}
            >
              <div className="absolute flex gap-6 top-10 left-1/2 -translate-x-1/2">
                <Eye size={18} pupilSize={8} lidColor="rgb(45, 45, 45)" />
                <Eye size={18} pupilSize={8} lidColor="rgb(45, 45, 45)" />
              </div>
            </div>

            {/* 3. 橙色朋友 */}
            <div 
              className="absolute bottom-0 transition-all duration-700 shadow-2xl"
              style={{ 
                left: -20, width: 240, height: 210 + hOffset * 0.2, 
                backgroundColor: "rgb(255, 155, 107)", 
                borderRadius: "120px 120px 0 0", 
                zIndex: 3,
                transform: `skewX(${skewAngle * 0.4}deg)`,
                transformOrigin: "center bottom"
              }}
            >
              <div className="absolute flex gap-10 top-20 left-1/2 -translate-x-1/2">
                <Eye size={18} pupilSize={7} lidColor="rgb(255, 155, 107)" />
                <Eye size={18} pupilSize={7} lidColor="rgb(255, 155, 107)" />
              </div>
            </div>

            {/* 4. 黄色成员 */}
            <div 
              className="absolute bottom-0 transition-all duration-700"
              style={{ 
                left: 320, width: 140, height: 230 + hOffset * 0.3, 
                backgroundColor: "rgb(232, 215, 84)", 
                borderRadius: "70px 70px 0 0", 
                zIndex: 4,
                transform: `skewX(${skewAngle * 0.5}deg)`,
                transformOrigin: "center bottom"
              }}
            >
              <div className="absolute flex gap-6 top-12 left-1/2 -translate-x-1/2">
                <Eye size={18} pupilSize={8} lidColor="rgb(232, 215, 84)" />
                <Eye size={18} pupilSize={8} lidColor="rgb(232, 215, 84)" />
              </div>
            </div>

          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-xs text-white/30 uppercase tracking-widest font-bold">
           <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
           <a href="#" className="hover:text-indigo-400 transition-colors">Security</a>
           <a href="#" className="hover:text-indigo-400 transition-colors">Help</a>
        </div>

      </div>

      {/* 👉 登录交互区 (右侧) */}
      <div className="flex items-center justify-center p-8 lg:w-[520px] w-full bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.05)] border-l border-gray-100">
        <div className="w-full max-w-[360px] space-y-10">
          
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Security Check</h1>
            <p className="text-gray-400 text-sm font-medium">Please verify your identity to proceed</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1" htmlFor="email">Email Address</label>
              <input 
                id="email"
                type="email" 
                placeholder="developer@google.com"
                className="w-full h-14 px-6 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium"
                onFocus={() => setFocus("email")}
                onBlur={() => setFocus(null)}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider" htmlFor="password">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600">Recovery?</a>
              </div>
              <div className="relative group">
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password token"
                  className="w-full h-14 px-6 pr-14 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium"
                  onFocus={() => setFocus("password")}
                  onBlur={() => setFocus(null)}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
             <span className="text-lg">Authorize</span>
          </button>

          <div className="relative py-2">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
             <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest"><span className="bg-white px-4 text-gray-300">Third-Party Auth</span></div>
          </div>

          <button className="w-full h-14 border border-gray-100 hover:bg-gray-50 font-bold rounded-2xl flex items-center justify-center gap-4 transition-all text-gray-600">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
            <span>Google Workplace</span>
          </button>

        </div>
      </div>

    </div>
  );
}