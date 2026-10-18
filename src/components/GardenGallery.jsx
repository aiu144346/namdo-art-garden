import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, X, Maximize2, Download, Sparkles, Grid } from 'lucide-react';

export default function GardenGallery({ gallery }) {
  if (!gallery || !gallery.images || gallery.images.length === 0) {
    return null;
  }

  const { gardenName, enName, description, images } = gallery;
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // 처음에 보여줄 썸네일 개수 (8장)
  const initialCount = 8;
  const displayedImages = showAll ? images : images.slice(0, initialCount);

  // 이전 사진
  const handlePrev = useCallback(() => {
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  // 다음 사진
  const handleNext = useCallback(() => {
    setSelectedIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // 키보드 내비게이션
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, handlePrev, handleNext]);

  return (
    <section id="gallery" className="my-16 pt-12 border-t border-neutral-200">
      {/* Gallery Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.25em] mb-2">
            <Camera className="w-4 h-4" />
            <span>Official Photo Gallery</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            {gardenName} 포토 갤러리
          </h2>
          <p className="text-neutral-500 text-sm md:text-base mt-2 font-light max-w-xl">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> 총 {images.length}장의 사진
          </span>
          {images.length > initialCount && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-1.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              {showAll ? '간략히 보기' : `전체 ${images.length}장 보기`}
            </button>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {displayedImages.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
            onClick={() => setSelectedIdx(idx)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <img
              src={img.thumb}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/40 transition-colors duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-medium drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
              {img.title}
            </div>
            <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md font-mono">
              #{String(idx + 1).padStart(2, '0')}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expand Button */}
      {!showAll && images.length > initialCount && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Grid className="w-4 h-4" /> 남은 {images.length - initialCount}장 더 보기
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8"
          >
            {/* Lightbox Top Bar */}
            <div className="flex items-center justify-between text-white/80 z-20">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-bold text-primary">
                  {String(selectedIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </span>
                <span className="text-white/40">|</span>
                <span className="text-sm font-medium text-white truncate max-w-[200px] sm:max-w-md">
                  {images[selectedIdx].title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={images[selectedIdx].src}
                  download={`garden-${gallery.id}-${selectedIdx + 1}.webp`}
                  title="고해상도 다운로드"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedIdx(null)}
                  title="닫기 (ESC)"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Main Image & Prev/Next */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <button
                onClick={handlePrev}
                title="이전 사진 (좌측 화살표)"
                className="absolute left-2 md:left-6 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={selectedIdx}
                src={images[selectedIdx].src}
                alt={images[selectedIdx].alt}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl select-none"
              />

              <button
                onClick={handleNext}
                title="다음 사진 (우측 화살표)"
                className="absolute right-2 md:right-6 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-sm transition-all duration-300 shadow-xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Bottom Thumbnail Strip */}
            <div className="flex justify-center overflow-x-auto py-2 gap-2 max-w-4xl mx-auto no-scrollbar z-20">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedIdx(i)}
                  className={`relative w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                    i === selectedIdx
                      ? 'ring-2 ring-primary scale-105 opacity-100'
                      : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={img.thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
