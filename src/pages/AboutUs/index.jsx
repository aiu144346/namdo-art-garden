import React from 'react';

export default function AboutUs() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-background">
      <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-4">Garden Intro</h2>
      <h1 className="text-5xl font-serif text-neutral-900 mb-8">역사와 철학</h1>
      <p className="text-lg text-neutral-600 max-w-2xl font-light leading-relaxed">
        자연과 조화를 이루는 남도예술정원의 깊은 역사와 숨겨진 이야기들을 준비중입니다.
      </p>
    </div>
  );
}
