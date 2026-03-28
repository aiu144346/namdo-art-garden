import { useState } from 'react';
import { Pin } from 'lucide-react';
import { cn } from '../../lib/utils';

const DUMMY_NEWS = [
  { id: 1, title: '2026 하반기 남도예술정원 예술가 레지던시 모집 공고', date: '2026-03-10', isPinned: true },
  { id: 2, title: '현대미술과 자연의 조화, 새로운 조형물 전시 안내', date: '2026-03-15', isPinned: false },
  { id: 3, title: '봄맞이 야간 개장 및 별빛 산책 안내', date: '2026-03-12', isPinned: false },
  { id: 4, title: '남도예술정원, 친환경 인증 수목원 선정', date: '2026-03-01', isPinned: false },
];

export default function News() {
  const [news] = useState(DUMMY_NEWS);
  // Pinned first, then by date desc
  const displayPosts = [...news].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="w-full bg-background min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-2">Notice & Archive</h2>
          <h1 className="text-5xl font-serif text-neutral-900">새로운 소식</h1>
        </div>
        
        <div className="flex flex-col border-t border-neutral-900 border-opacity-20">
          {displayPosts.map(post => (
            <div 
              key={post.id} 
              className={cn(
                "group py-8 border-b border-neutral-200 transition-colors flex items-center justify-between cursor-pointer hover:bg-surface/30 px-4",
                post.isPinned && "bg-surface/50"
              )}
            >
              <div className="flex items-center gap-6">
                <div className="w-8 flex justify-center">
                  {post.isPinned ? (
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
                      <Pin className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="text-neutral-400 font-mono text-sm">{post.id.toString().padStart(2, '0')}</span>
                  )}
                </div>
                <span className={cn(
                  "text-xl", 
                  post.isPinned ? "font-bold text-neutral-900" : "font-medium text-neutral-700 group-hover:text-primary transition-colors"
                )}>
                  {post.title}
                </span>
              </div>
              <span className="text-sm text-muted font-light tracking-widest">{post.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
