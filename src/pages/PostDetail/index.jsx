import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Share2, MapPin, Check, Link as LinkIcon } from 'lucide-react';
import SEO from '../../components/SEO';
import POST_DATA from '../../data/postsData';

import PostSharing from '../../components/PostSharing';

export default function PostDetail() {
  const { id } = useParams();
  const post = POST_DATA[id];
  const [copied, setCopied] = useState(false);

  // AI Recommendation Logic: Select 3 random posts
  const recommendedPosts = useMemo(() => {
    const allPostIds = Object.keys(POST_DATA);
    const otherPostIds = allPostIds.filter(postId => postId !== id);
    const shuffled = [...otherPostIds].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(postId => ({ ...POST_DATA[postId], id: postId }));
  }, [id]);

  // Garden Explorer Link Mapping
  const gardenLink = useMemo(() => {
    const regionPrefix = id.charAt(0);
    const mapping = {
      'h': '/posts/h26-haenam-moongarden-guide',
      'm': '/posts/m1-namdo-art-garden-intro',
      's': '/posts/s16-museum-park-history',
      'w': '/posts/w14-wando-baha-garden',
      'j': '/posts/j11-jindo-hyusik'
    };
    return mapping[regionPrefix] || '/';
  }, [id]);

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = post.title.replace(/\\n/g, ' ');

    if (platform === 'kakao') {
      window.open(`https://story.kakao.com/share?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'naver') {
      window.open(`https://share.naver.com/web/shareView.nhn?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else {
      // Default: Copy to Clipboard
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
    <div className="min-h-screen bg-neutral-50 pb-24">
      <SEO 
        title={`${post.title.replace(/<[^>]*>?/gm, '').split('\n')[0]} | 남도예술정`}
        description={post.description}
        keywords={post.keywords}
        image={post.image}
      />
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] min-h-[300px] md:min-h-[500px] max-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-neutral-900/40" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 text-white/90 text-sm font-bold tracking-widest uppercase mb-6">
              <span className="bg-primary px-3 py-1 rounded-full text-xs">남도예술정원</span>
              <span className="opacity-60">•</span>
              <span className="opacity-90">{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-[56px] font-serif text-white tracking-tight leading-[1.2] md:leading-[1.4] mb-8 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
              {post.title.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx !== post.title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <div className="flex items-center gap-6 text-white text-sm font-light">
               <span className="flex items-center gap-2">By {post.author}</span>
               <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 읽는 데 {post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
          
          {/* Main Content Area */}
          <div className="w-full md:w-3/4">
            <Link to="/" className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest hover:underline mb-12">
              <ArrowLeft className="w-4 h-4" /> Back to Hub
            </Link>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="prose prose-lg md:prose-xl prose-neutral max-w-none text-neutral-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <PostSharing />

            {/* Mobile Sidebar Content (Visible ONLY on Smartphone) */}
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
                <h3 className="font-serif font-bold text-neutral-900 mb-2">AI 맞춤 추천</h3>
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
                          <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-widest">AI Pick</p>
                          <p className="text-sm text-neutral-800 font-medium leading-snug line-clamp-2 group-hover/item:text-primary transition-colors">
                            {rec.title.replace(/\\n/g, ' ')}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link to={gardenLink} className="w-full inline-flex items-center justify-center gap-2 text-[11px] font-bold text-white bg-neutral-900 px-4 py-4 rounded-xl uppercase tracking-[0.2em] hover:bg-primary transition-colors shadow-lg">
                  정원 알아보기 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-neutral-200">
               <div className="flex flex-wrap items-center gap-2 mb-8">
                  <span className="text-sm font-bold mr-2 text-neutral-900">Tags:</span>
                  {post.keywords && post.keywords.split(', ').map(kw => (
                    <span key={kw} className="bg-surface text-neutral-600 px-3 py-1 rounded-full text-xs font-medium">#{kw}</span>
                  ))}
               </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full md:w-1/4 hidden md:block">
            <div className="sticky top-32 space-y-8">
              <div className="flex items-center gap-4 pb-6 border-b border-neutral-200">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold font-serif text-xl">
                  {post.author ? post.author.charAt(0) : 'A'}
                </div>
                <div>
                  <p className="font-bold text-neutral-900 text-sm">Written by</p>
                  <p className="text-neutral-500 text-sm font-light">{post.author}</p>
                </div>
              </div>

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
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <h3 className="font-serif font-bold text-neutral-900 mb-2">AI 맞춤 추천</h3>
                <p 
                  className="text-sm text-neutral-600 font-light mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: post.aiRecommendation || '현재 읽고 계신 콘텐츠를 좋아하신다면, 남도예술정원의 갤러리를 사랑하실 확률이 <strong class="font-semibold text-primary">96%</strong>입니다.' 
                  }}
                />
                
                <div className="space-y-4 mb-6">
                  {recommendedPosts.map((rec) => (
                    <Link key={rec.id} to={`/posts/${rec.id}`} className="block group/item">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-100">
                          <img src={rec.image} alt="" className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-primary mb-1 uppercase tracking-tight">AI Pick</p>
                          <p className="text-[13px] text-neutral-800 font-medium leading-tight line-clamp-2 group-hover/item:text-primary transition-colors">
                            {rec.title.replace(/\\n/g, ' ')}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link to={gardenLink} className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-neutral-900 px-4 py-3 rounded-xl uppercase tracking-widest hover:bg-primary transition-colors">
                  정원 알아보기 <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
