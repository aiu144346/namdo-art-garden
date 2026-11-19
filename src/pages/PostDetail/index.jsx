import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Share2, Check, Link as LinkIcon, ChevronRight } from 'lucide-react';
import SEO from '../../components/SEO';
import POST_DATA from '../../data/postsData';
import { getCustomPosts, getCustomNotices } from '../../utils/adminStorage';

import PostSharing from '../../components/PostSharing';
import GardenGallery from '../../components/GardenGallery';
import { getGalleryByPostId } from '../../data/gardensGallery';

const REGION_LABEL_MAP = {
  haenam: '전남 해남군',
  wando: '전남 완도군',
  jindo: '전남 진도군',
  shinan: '전남 신안군',
  mokpo: '전남 목포시',
  main: '전남 남도권역'
};

// Intelligent Korean Title Parser (VisitKorea Benchmark)
function parseEditorialTitle(rawTitle = '') {
  let text = rawTitle.trim();
  let tag = '';

  // 1. Extract leading [말머리] tag if followed by main title text
  const prefixMatch = text.match(/^\[([^\]]+)\]\s*[-:]?\s*(.+)$/s);
  if (prefixMatch) {
    tag = prefixMatch[1].trim();
    text = prefixMatch[2].trim();
  } else {
    // If entire title is wrapped in [ ... ], unwrap it
    const fullBracketMatch = text.match(/^\[([^\]]+)\]$/);
    if (fullBracketMatch) {
      text = fullBracketMatch[1].trim();
    }
  }

  // 2. If explicit newline exists, split into main & sub
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length >= 2) {
    return { tag, main: lines[0], sub: lines.slice(1).join(' ') };
  }

  const single = lines[0] || '';
  if (single.length <= 22) {
    return { tag, main: single, sub: '' };
  }

  // 3. For long single-line titles (>22 chars), split cleanly at natural Korean semantic delimiters
  const delimiters = [' — ', ' | ', ': ', ' : ', '! ', '? ', ', '];
  for (const delim of delimiters) {
    const idx = single.indexOf(delim);
    if (idx >= 6 && single.length - (idx + delim.length) >= 6) {
      const keepMark = delim.trim() === '!' || delim.trim() === '?';
      const mainPart = single.slice(0, idx + (keepMark ? delim.trim().length : 0)).trim();
      const subPart = single.slice(idx + delim.length).trim();
      return { tag, main: mainPart, sub: subPart };
    }
  }

  return { tag, main: single, sub: '' };
}

export default function PostDetail() {
  const { id } = useParams();
  const customPosts = useMemo(() => getCustomPosts(), []);
  const customNotices = useMemo(() => getCustomNotices(), []);
  const customPost = customPosts.find(p => p.id === id) || customNotices.find(n => n.id === id);
  const post = POST_DATA[id] || customPost;
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const galleryData = useMemo(() => getGalleryByPostId(id), [id]);

  React.useEffect(() => {
    if (window.location.hash === '#gallery') {
      setTimeout(() => {
        const el = document.getElementById('gallery');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }, [id]);

  React.useEffect(() => {
    const proseEl = document.querySelector('.prose');
    if (proseEl) {
      const imgs = proseEl.querySelectorAll('img');
      imgs.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.title = '클릭하면 고해상도 이미지로 확대 및 다운로드 가능합니다.';
      });
    }
  }, [post]);

  const handleImageClick = (e) => {
    if (e.target.tagName === 'IMG') {
      setActiveImage(e.target.src);
    }
  };

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = url.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  // AI Editor's Curation Recommendation Logic: Select 3 posts
  const recommendedPosts = useMemo(() => {
    const allPostIds = Object.keys(POST_DATA);
    const otherPostIds = allPostIds.filter(postId => postId !== id);
    const shuffled = [...otherPostIds].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(postId => ({ ...POST_DATA[postId], id: postId }));
  }, [id]);

  // Region label resolution (e.g. "전남 해남군")
  const regionDisplayName = useMemo(() => {
    if (post?.regionId && REGION_LABEL_MAP[post.regionId]) {
      return REGION_LABEL_MAP[post.regionId];
    }
    const prefix = (id || '').charAt(0).toLowerCase();
    if (prefix === 'h') return '전남 해남군';
    if (prefix === 'w') return '전남 완도군';
    if (prefix === 'j') return '전남 진도군';
    if (prefix === 's') return '전남 신안군';
    if (prefix === 'm') return id.startsWith('m1-') || id.startsWith('m2-food') ? '전남 남도권역' : '전남 목포시';
    return '전남 남도권역';
  }, [post, id]);

  // Garden Explorer Link Mapping
  const gardenLink = useMemo(() => {
    const regionPrefix = (id || '').charAt(0).toLowerCase();
    const mapping = {
      'h': '/gardens/moon',
      'm': '/gardens',
      's': '/gardens/pine',
      'w': '/gardens/baha',
      'j': '/gardens/jindo'
    };
    return mapping[regionPrefix] || '/gardens';
  }, [id]);

  // Parse title lines cleanly for Korean editorial display
  const titleParts = useMemo(() => {
    return parseEditorialTitle(post?.title || '');
  }, [post]);

  // Check if post.content already embeds its own hero banner or already includes post.image
  const shouldShowTopCoverImage = useMemo(() => {
    if (!post?.image || !post?.content) return false;
    if (post.content.includes('<!-- Hero')) return false;
    if (post.content.includes(post.image)) return false;
    return true;
  }, [post]);

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = post.title.replace(/\n/g, ' ');

    if (platform === 'kakao') {
      window.open(`https://story.kakao.com/share?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'naver') {
      window.open(`https://share.naver.com/web/shareView.nhn?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">포스트를 찾을 수 없습니다. (ID: {id})</h2>
          <Link to="/" className="text-primary hover:underline">홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24 font-sans">
      <SEO 
        title={`${post.title.replace(/<[^>]*>?/gm, '').split('\n')[0]} | 남도예술정원`}
        description={post.description}
        keywords={post.keywords}
        image={post.image}
      />

      {/* ─────────────────────────────────────────────────────────────
          대한민국 구석구석(visitkorea.or.kr) 스타일 클린 에디토리얼 헤더
      ───────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-neutral-200/80 pt-10 pb-10 md:pt-14 md:pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Top Breadcrumb (> 여행기사) */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Link
                to="/posts"
                className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-neutral-500 hover:text-primary transition-colors tracking-[-0.02em]"
              >
                <ChevronRight className="w-4 h-4 text-neutral-400 -ml-1" />
                <span>여행기사</span>
              </Link>
              {titleParts.tag && (
                <>
                  <span className="text-neutral-300">·</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-[-0.02em]">
                    {titleParts.tag}
                  </span>
                </>
              )}
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>홈으로</span>
            </Link>
          </div>

          {/* Centered Main Title & Subtitle (VisitKorea Benchmark Scale) */}
          <div className="text-center space-y-2.5 max-w-4xl mx-auto">
            <h1 className="kr-editorial-title text-xl sm:text-2xl md:text-[30px] lg:text-[32px] text-[#1a1a1a]">
              <span className="block">{titleParts.main}</span>
              {titleParts.sub && (
                <span className="block text-base sm:text-xl md:text-[22px] font-bold text-primary mt-2 tracking-[-0.035em] leading-[1.42]">
                  {titleParts.sub}
                </span>
              )}
            </h1>
          </div>

          {/* Centered Metadata Bar (지역 | 수정일 : YYYY. MM. DD.) */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-neutral-500 tracking-[-0.02em]">
            <span className="font-medium text-neutral-600">{regionDisplayName}</span>
            {post.date && (
              <>
                <span className="text-neutral-300">|</span>
                <span>수정일 : {post.date}</span>
              </>
            )}
            {post.readTime && (
              <>
                <span className="text-neutral-300 hidden sm:inline">|</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-neutral-500">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  읽는 데 {post.readTime}
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Article Content & Sidebar */}
      <section className="py-10 md:py-14 px-6 md:px-12 lg:px-20 bg-[#fcfcf9]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
          
          {/* Main Content Area */}
          <div className="w-full md:w-3/4 bg-white rounded-3xl border border-neutral-200/70 shadow-sm p-6 sm:p-10 md:p-12">
            {/* Show cover image at top only when post.content does not already embed it */}
            {shouldShowTopCoverImage && (
              <div className="rounded-2xl overflow-hidden shadow-md border border-neutral-100 mb-10 max-h-[520px]">
                <img
                  src={post.image}
                  alt={titleParts.main}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div 
              className="prose prose-lg max-w-none text-neutral-800"
              onClick={handleImageClick}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Garden Photo Gallery */}
            {galleryData && <GardenGallery gallery={galleryData} />}

            <PostSharing />

            {/* Mobile Sidebar Content */}
            <div className="mt-16 block md:hidden space-y-10 border-t border-neutral-100 pt-10">
              <div className="space-y-4">
                <p className="text-sm font-bold text-neutral-900 px-1">포스트 공유하기</p>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleShare('naver')}
                    title="네이버 블로그 공유"
                    className="w-10 h-10 rounded-full bg-[#03C75A] flex items-center justify-center text-white hover:opacity-90 transition-all hover:scale-110 shadow-sm"
                  >
                    <span className="font-bold text-sm">N</span>
                  </button>
                  <button 
                    onClick={() => handleShare('kakao')}
                    title="카카오스토리 공유"
                    className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center text-[#3C1E1E] hover:opacity-90 transition-all hover:scale-110 shadow-sm"
                  >
                    <Share2 className="w-5 h-5 fill-current" />
                  </button>
                  <button 
                    onClick={() => handleShare('facebook')}
                    title="페이스북 공유"
                    className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-all hover:scale-110 shadow-sm"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button 
                    onClick={() => handleShare('copy')}
                    title="링크 복사"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm ${
                      copied ? 'bg-green-500 text-white' : 'bg-neutral-800 text-white hover:bg-neutral-700'
                    }`}
                  >
                    {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                  </button>
                </div>
                {copied && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-green-600 font-medium px-1"
                  >
                    링크가 복사되었습니다!
                  </motion.p>
                )}
              </div>
              
              <div className="bg-surface/50 p-6 rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                <h3 className="font-sans font-bold text-neutral-900 mb-2 tracking-[-0.03em]">AI 에디터 큐레이션</h3>
                <p 
                  className="text-sm text-neutral-600 font-light mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: post.aiRecommendation || '현재 읽고 계신 콘텐츠를 좋아하신다면, 남도예술정원의 갤러리를 사랑하실 확률이 <strong class="font-semibold text-primary">96%</strong>입니다.' 
                  }}
                />
                
                <div className="space-y-4 mb-6">
                  {recommendedPosts.map((rec) => (
                    <Link key={rec.id} to={`/posts/${rec.id}`} className="block group/item">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100 shadow-sm">
                          <img src={rec.image} alt="" className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-widest">AI Curation</p>
                          <p className="text-sm text-neutral-800 font-bold tracking-[-0.025em] leading-snug line-clamp-2 group-hover/item:text-primary transition-colors">
                            {rec.title.replace(/\n/g, ' ')}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link to={gardenLink} className="w-full inline-flex items-center justify-center gap-2 text-[11px] font-bold text-white bg-neutral-900 px-4 py-4 rounded-xl uppercase tracking-[0.2em] hover:bg-primary transition-colors shadow-lg">
                  8대 정원 알아보기 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {post.keywords && (
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold mr-2 text-neutral-900 uppercase tracking-wider">Tags:</span>
                  {post.keywords.split(', ').map(kw => (
                    <span key={kw} className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-xs font-medium">#{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full md:w-1/4 hidden md:block">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-neutral-200/70 shadow-sm space-y-6">
                <div className="flex items-center gap-3.5 pb-5 border-b border-neutral-100">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-extrabold text-lg">
                    {post.author ? post.author.charAt(0) : '남'}
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-xs uppercase tracking-wider">Editor</p>
                    <p className="text-neutral-600 text-xs font-medium mt-0.5">{post.author || '남도예술정원 AI 에디터'}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-neutral-900">포스트 공유하기</p>
                  <div className="flex items-center gap-2.5">
                    <button 
                      onClick={() => handleShare('naver')}
                      title="네이버 블로그 공유"
                      className="w-9 h-9 rounded-full bg-[#03C75A] flex items-center justify-center text-white hover:opacity-90 transition-all hover:scale-110 shadow-sm"
                    >
                      <span className="font-bold text-xs">N</span>
                    </button>
                    <button 
                      onClick={() => handleShare('kakao')}
                      title="카카오스토리 공유"
                      className="w-9 h-9 rounded-full bg-[#FEE500] flex items-center justify-center text-[#3C1E1E] hover:opacity-90 transition-all hover:scale-110 shadow-sm"
                    >
                      <Share2 className="w-4 h-4 fill-current" />
                    </button>
                    <button 
                      onClick={() => handleShare('facebook')}
                      title="페이스북 공유"
                      className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-all hover:scale-110 shadow-sm"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </button>
                    <button 
                      onClick={() => handleShare('copy')}
                      title="링크 복사"
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm ${
                        copied ? 'bg-green-500 text-white' : 'bg-neutral-800 text-white hover:bg-neutral-700'
                      }`}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-600 font-medium">
                      링크가 복사되었습니다!
                    </p>
                  )}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-neutral-200/70 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <h3 className="font-sans font-bold text-neutral-900 mb-2 tracking-[-0.03em]">AI 에디터 큐레이션</h3>
                <p 
                  className="text-xs text-neutral-600 font-light mb-5 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: post.aiRecommendation || '현재 읽고 계신 콘텐츠를 좋아하신다면, 남도예술정원의 갤러리를 사랑하실 확률이 <strong class="font-semibold text-primary">96%</strong>입니다.' 
                  }}
                />
                
                <div className="space-y-3.5 mb-6">
                  {recommendedPosts.map((rec) => (
                    <Link key={rec.id} to={`/posts/${rec.id}`} className="block group/item">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-neutral-100">
                          <img src={rec.image} alt="" className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-primary mb-0.5 uppercase tracking-tight">AI Curation</p>
                          <p className="text-xs text-neutral-800 font-bold tracking-[-0.025em] leading-snug line-clamp-2 group-hover/item:text-primary transition-colors">
                            {rec.title.replace(/\n/g, ' ')}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link to={gardenLink} className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-neutral-900 px-4 py-3 rounded-xl uppercase tracking-widest hover:bg-primary transition-colors">
                  8대 정원 알아보기 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl p-4 cursor-default border border-neutral-800"
            >
              <div className="w-full flex justify-end mb-2">
                <button
                  onClick={() => setActiveImage(null)}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-3 py-1.5 rounded-full transition-all border border-neutral-700 font-bold"
                >
                  ✕ 닫기
                </button>
              </div>

              <img 
                src={activeImage} 
                alt="고해상도 이미지" 
                className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-inner" 
              />
              
              <div className="w-full flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => handleDownload(activeImage)}
                  className="bg-green-700 hover:bg-green-600 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all flex items-center gap-2 hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                  고해상도 다운로드 받기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
