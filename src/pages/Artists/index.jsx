import React from 'react';

export default function Artists() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-background">
      <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">Artists</h2>
      <h1 className="text-5xl font-serif text-neutral-900 mb-8">참여 작가</h1>
      <p className="text-lg text-neutral-600 max-w-2xl font-light leading-relaxed">
        자연을 캔버스 삼아 예술을 피우는 작가들의 작품과 철학을 소개합니다 (페이지 준비중).
      </p>
    </div>
  );
}
