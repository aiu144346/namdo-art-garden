import React from 'react';
import { Link } from 'react-router-dom';
import { Trees, Compass, FileText, ExternalLink, PlayCircle, ArrowUpRight } from 'lucide-react';

const MASTER_GARDENS = [
  { id: 'moon', name: '문가든', region: '해남' },
  { id: 'baha', name: '바하가든', region: '완도' },
  { id: 'biwon', name: '비원', region: '해남' },
  { id: 'sani', name: '산이정원', region: '해남' },
  { id: 'wife', name: '아내의 정원', region: '완도' },
  { id: 'jindo', name: '진도휴식', region: '진도' },
  { id: 'pine', name: '파인클라우드', region: '신안' },
  { id: '4est', name: '4est(포레스트)수목원', region: '해남' },
];

const REGIONS = [
  { to: '/region/mokpo', label: '목포권 (Mokpo)' },
  { to: '/region/shinan', label: '신안권 (Shinan)' },
  { to: '/region/haenam', label: '해남권 (Haenam)' },
  { to: '/region/jindo', label: '진도권 (Jindo)' },
  { to: '/region/wando', label: '완도권 (Wando)' },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-neutral-800/80">
          
          {/* Column 1: Brand Identity & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light">
                <Trees className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xl font-serif font-bold text-white tracking-tight">
                  남도예술정원
                </span>
                <span className="block text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                  NAMDO ART GARDEN
                </span>
              </div>
            </Link>

            <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
              <strong className="text-white font-serif italic">"We Must Cultivate Our Garden"</strong><br />
              해남 · 완도 · 진도 · 신안 · 목포의 대자연과 예술이 빚어낸 8대 명품 민간정원과 남도 여행 큐레이션 아카이브입니다.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@%EB%82%A8%EB%8F%84%EC%98%88%EC%88%A0%EC%A0%95%EC%9B%90"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-primary text-white text-xs font-bold transition-colors"
              >
                <PlayCircle className="w-4 h-4 text-primary-light" />
                <span>공식 유튜브 채널</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
              <a
                href="/files/namdo-artgarden-leaflet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-bold transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-primary-light" />
                <span>공식 리플릿 PDF</span>
              </a>
            </div>
          </div>

          {/* Column 2: 8 Master Gardens (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
                8대 남도예술정원 컬렉션
              </h3>
              <Link to="/gardens" className="text-xs text-neutral-400 hover:text-white transition-colors">
                전체보기 &rarr;
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {MASTER_GARDENS.map((g) => (
                <li key={g.id}>
                  <Link
                    to={`/gardens/${g.id}`}
                    className="group flex items-center justify-between py-1 text-neutral-400 hover:text-white transition-colors"
                  >
                    <span className="truncate">{g.name}</span>
                    <span className="text-[11px] text-neutral-500 group-hover:text-primary-light ml-1 flex-shrink-0">
                      {g.region}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Regions & Archive Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              권역별 탐색
            </h3>
            <ul className="space-y-2.5 text-sm">
              {REGIONS.map((reg) => (
                <li key={reg.to}>
                  <Link
                    to={reg.to}
                    className="text-neutral-400 hover:text-white transition-colors block"
                  >
                    {reg.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Guide & About (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              안내 & 아카이브
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about-us" className="text-neutral-400 hover:text-white transition-colors block">
                  정원 소개 & 여행주간
                </Link>
              </li>
              <li>
                <Link to="/gardens" className="text-neutral-400 hover:text-white transition-colors block">
                  8대 정원 쇼케이스
                </Link>
              </li>
              <li>
                <Link to="/posts" className="text-neutral-400 hover:text-white transition-colors block">
                  AI 에디터 큐레이션
                </Link>
              </li>
              <li>
                <Link to="/posts/m1-namdo-art-garden-intro" className="text-neutral-400 hover:text-white transition-colors block">
                  남도예술정원 종합 가이드
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Metadata: Host Organizations & Copyright */}
        <div className="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-xs text-neutral-500">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-neutral-400">
              <span><strong className="text-neutral-300">주최/주관:</strong> 문화체육관광부 · 전라남도 · (재)전라남도관광재단</span>
              <span className="hidden sm:inline text-neutral-700">|</span>
              <span><strong className="text-neutral-300">운영:</strong> 남도예술정원 8대 정원 · 2권역사업단 ((주)쥬스컴퍼니)</span>
            </div>
            <p className="text-neutral-500">
              협력 지자체: 목포시 · 해남군 · 완도군 · 진도군 · 신안군 (남부권 광역관광 개발 소도시 여행권역 육성사업)
            </p>
          </div>

          <div className="text-neutral-500 font-mono text-[11px] flex-shrink-0">
            © 2026 NAMDO ART GARDEN. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
