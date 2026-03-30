import React, { useState } from 'react';
import { Share2, Check, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PostSharing() {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mt-12 py-8 border-t border-neutral-100">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-green-50/50 to-white p-6 md:p-8 rounded-[2rem] border border-green-100/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] scale-[4] rotate-12">
          <Share2 size={120} className="text-secondary" />
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
            <LinkIcon size={24} />
          </div>
          <div>
            <h4 className="text-lg font-serif font-bold text-neutral-900 mb-0.5">이 포스트 공유하기</h4>
            <p className="text-sm text-neutral-500 font-light">공유하고 싶은 소중한 사람에게 링크를 전달하세요.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto relative z-10">
          <div className="flex-1 md:w-64 bg-white border border-neutral-200 px-4 py-3 rounded-xl text-sm text-neutral-400 truncate font-mono">
            {currentUrl}
          </div>
          <button
            onClick={handleCopy}
            className={`w-12 h-12 md:w-auto md:px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              copied 
                ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
                : 'bg-neutral-900 text-white hover:bg-secondary hover:shadow-lg hover:shadow-secondary/20'
            }`}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check size={18} />
                  <span className="hidden md:inline">복사 완료!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Share2 size={18} />
                  <span className="hidden md:inline">링크 복사</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
