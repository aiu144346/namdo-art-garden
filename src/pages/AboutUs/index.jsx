import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Compass, Music, Palette, Users, Sparkles, 
  Download, ExternalLink, FileText, ChevronRight, CheckCircle2, 
  Trees, Clock, Eye, X, BookOpen, Gift, Award, Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const PROGRAMS = [
  {
    id: 'tour',
    number: '01',
    category: '투어',
    title: '정원을 따라 걷는 인문과 미식의 여정',
    image: '/images/about/2.webp',
    imageFull: '/images/about/2.png',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: Compass,
    desc: '투어 프로그램은 남도의 자연과 정원, 그리고 역사와 맛을 오감으로 경험하는 테마스토리 투어, 1박2일 그랜드 투어, 가이드 스토리 투어로 운영됩니다.',
    items: [
      {
        tag: '테마스토리 투어',
        date: '11/14(인문), 11/18(미식)',
        title: '정원 인문 & 맛있는 정원 미식 투어',
        content: '정원을 따라 남도의 깊은 인문학적 배경과 로컬 제철 식재료를 맛보는 특별 테마 투어입니다.'
      },
      {
        tag: '그랜드 투어',
        date: '11/18 ~ 11/19 (1박 2일)',
        title: '남도예술정원 그랜드 투어',
        content: '남도예술정원 7곳을 1박 2일 동안 모두 경험할 수 있는 프리미엄 완전 정복 투어입니다.'
      },
      {
        tag: '가이드 스토리 투어',
        date: '11/7, 11/8, 11/14, 11/15 (주말)',
        title: '정원주와 전문 가이드의 스토리 투어',
        content: '여행주간 주말 동안 각 정원의 숨은 철학과 조경 이야기를 가이드와 함께 듣는 심층 해설 투어입니다.'
      }
    ]
  },
  {
    id: 'stage',
    number: '02',
    category: '공연 / 전시 / 강연',
    title: '초록빛 자연 속에서 펼쳐지는 예술정원무대',
    image: '/images/about/3.webp',
    imageFull: '/images/about/3.png',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Music,
    desc: '각 정원별 고유한 테마와 특색을 살린 공연, 전시, 인문 강연 프로그램입니다. 정원에 방문한 입장객 누구나 무료로 관람할 수 있습니다.',
    notice: '※ 예술정원무대는 해당 정원 입장객 누구나 무료 관람 가능합니다.',
    items: [
      {
        location: '해남 문가든',
        date: '11/6 ~ 11/20 (상설)',
        title: '최순임 작가 초대전',
        content: '호수와 단풍이 어우러진 문가든 야외 갤러리 정원특별전'
      },
      {
        location: '신안 파인클라우드',
        date: '11/7 (토)',
        title: 'K-Bonsai 예술 분재 세미나',
        content: '명품 분재의 아름다움과 정원 철학을 나누는 전문 세미나'
      },
      {
        location: '해남 포레스트수목원',
        date: '11/8 (일)',
        title: '재즈 기타리스트 공연',
        content: '해남으로 귀촌한 감성 재즈 기타리스트의 가을 숲속 콘서트'
      },
      {
        location: '완도 아내의정원',
        date: '11/13 (금)',
        title: '밴드 멜모꼬지 피크닉 콘서트',
        content: '완도 청년 밴드가 선사하는 풋풋하고 따스한 감성 어쿠스틱 무대'
      },
      {
        location: '완도 바하정원',
        date: '11/15 (일)',
        title: '고산 윤선도 인문 강연',
        content: '완도의 바다와 정원에서 고산 윤선도의 문학과 풍류를 만나는 시간'
      },
      {
        location: '진도 진도휴식',
        date: '11/18 (수)',
        title: '국악앙상블 아리락(樂) 풍류 콘서트',
        content: '소리와 신명이 머무는 진도 대자연 속 전통 국악 크로스오버 공연'
      }
    ]
  },
  {
    id: 'experience',
    number: '03',
    category: '협력 특화 체험프로그램',
    title: '지역크리에이터 X 남도예술정원의 감각 체험',
    image: '/images/about/4.webp',
    imageFull: '/images/about/4.png',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Palette,
    desc: '지역크리에이터와 정원주가 손잡고 지역의 자연 재료와 감성을 살려 여행자의 오감을 깨우는 특별한 원데이 클래스 프로그램입니다.',
    items: [
      {
        location: '완도 아내의정원',
        creator: '멜모꼬지',
        date: '11/7 (토)',
        title: '보태니컬 에코 프린팅',
        content: '정원의 야생화와 잎사귀를 천에 자연 염색하는 식물 프린팅 체험'
      },
      {
        location: '완도 바하정원',
        creator: '소잉가든',
        date: '11/10 (화)',
        title: '남도정원 메밀베개 만들기',
        content: '정원의 향기를 담은 수제 메밀베개 패브릭 제작 클래스'
      },
      {
        location: '해남 문가든',
        creator: '오늘도정원',
        date: '11/13 (금)',
        title: '나만의 정원 액자 만들기',
        content: '정원에서 채취한 자연 소재로 제작하는 감성 프레임 인테리어 액자'
      },
      {
        location: '해남 산이정원',
        creator: '산이정원',
        date: '11/14 (토)',
        title: '허브 스머지스틱 클래스',
        content: '정원에서 자란 신선한 허브를 엮어 만드는 힐링 아로마 스머지스틱'
      },
      {
        location: '해남 포레스트수목원',
        creator: '제안속도95',
        date: '11/15 (일)',
        title: '사진 한 컷, 나만의 에세이집 만들기',
        content: '수목원에서 찍은 인생 사진과 나의 생각을 엮는 독립출판 에세이 제작'
      },
      {
        location: '신안 파인클라우드',
        creator: '더 분재',
        date: '11/19 (목)',
        title: '한 그루의 고요, 예술 분재 체험',
        content: '분재 전문가와 함께 분재 수형을 가꾸고 화분에 연출하는 체험'
      },
      {
        location: '진도 진도휴식',
        creator: '니트테이블',
        date: '11/22 (일)',
        title: '정원 목공 체험 클래스',
        content: '자연 원목을 깎아 생활 정원 소품을 완성하는 친환경 우드크래프트'
      }
    ]
  },
  {
    id: 'events',
    number: '04',
    category: '행사 & 이벤트',
    title: '세미나, 스탬프 투어, 그랜드 세일',
    image: '/images/about/5.webp',
    imageFull: '/images/about/5.png',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Award,
    desc: '남도 정원 관광의 미래를 논의하는 학술 비전세미나부터 7개 정원 방문 스탬프 투어, 지역 상생 할인 그랜드 세일까지 풍성한 혜택이 이어집니다.',
    items: [
      {
        tag: '비전세미나',
        date: '11/20 (금) | 해남 문가든',
        title: '소도시와 정원이 만드는 전남광주 관광의 전환',
        content: '정원 전문가, 지자체 관계자, 지역 주민이 한자리에 모여 지속 가능한 로컬 정원 생태계를 모색하는 학술 정책 세미나'
      },
      {
        tag: '스탬프 투어',
        date: '11/6 ~ 11/20 (상시)',
        title: '남도예술정원 7곳 스탬프 랠리',
        content: '7개 민간정원 중 3곳 이상 방문하여 스탬프를 날인하고 인증하면 여행주간 공식 기념 굿즈 세트를 증정합니다.'
      },
      {
        tag: '그랜드 세일',
        date: '11/6 ~ 11/20 (상시)',
        title: '지역파트너 연계 그랜드 할인 이벤트',
        content: '스탬프가 찍힌 리플릿 용지를 인근 제휴 카페, 식당, 숙소에 제시하면 대표 메뉴 할인 또는 입장료 할인 혜택을 제공합니다.'
      },
      {
        tag: '협력행사',
        date: '11/7~11/8, 11/14~11/15',
        title: '산이그래피 (산이정원 캠핑페스타 연계)',
        content: '광활한 산이정원의 가을 풍광과 캠핑을 직접 체험하고 나만의 사진/영상으로 기록하는 참여형 협력 프로그램'
      }
    ]
  }
];

export default function AboutUs() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredPrograms = activeTab === 'all' 
    ? PROGRAMS 
    : PROGRAMS.filter(p => p.id === activeTab);

  return (
    <div className="w-full bg-[#fafaf8] text-neutral-900 font-sans selection:bg-primary/20 pb-32">
      <SEO 
        title="소개 & 여행주간 안내 | 남도예술정원 (Namdo Art Garden)" 
        description="We Must Cultivate Our Garden — 우리의 정원을 함께 가꿉니다. 2026 제1회 남도예술정원 여행주간(11.06~11.20) 프로그램 및 공식 리플릿 안내."
        keywords="남도예술정원, 여행주간, 리플릿, 해남, 완도, 진도, 신안, 민간정원, 정원투어, 문화체육관광부, 전남관광재단"
        image="/images/about/1.webp"
      />

      {/* ─────────────────────────────────────────────────────────────
          1. Hero Section (Brand Slogan & Philosophy)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-neutral-950 text-white pt-24 pb-28 px-6 md:px-12 overflow-hidden">
        {/* Ambient Lights */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-primary-foreground text-xs font-bold uppercase tracking-[0.25em] border border-white/15"
          >
            <Trees className="w-3.5 h-3.5 text-primary" />
            <span>Namdo Art Garden Brand Story</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-primary font-mono text-sm md:text-base font-semibold tracking-widest uppercase">
              We Must Cultivate Our Garden
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight">
              우리의 정원을 함께 가꿉니다
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed break-keep"
          >
            <span className="text-white font-medium">2026 제1회 남도예술정원 여행주간</span>이 <strong className="text-white font-bold underline decoration-primary decoration-2 underline-offset-4">11월 6일부터 20일까지</strong> 개최됩니다.<br className="hidden sm:inline" />
            해남 · 완도 · 진도 · 신안의 정원을 하나의 여행길로 연결해 남도의 자연과 예술, 문화를 경험하는 특별한 여행을 만나보세요.
          </motion.p>

          {/* Quick Action Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href="#programs"
              className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide shadow-lg transition-transform hover:scale-105"
            >
              4대 프로그램 둘러보기
            </a>
            <a
              href="#leaflet"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide border border-white/20 backdrop-blur-sm transition-transform hover:scale-105 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-primary" />
              공식 리플릿 (PDF) 받기
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. Overview Card & Poster Showcase
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-neutral-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Poster Clickable Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div 
              onClick={() => setSelectedImg('/images/namdo-travel-week-poster.png')}
              className="relative group rounded-2xl overflow-hidden border border-neutral-200 shadow-xl cursor-zoom-in max-w-sm w-full bg-neutral-50"
            >
              <img 
                src="/images/namdo-travel-week-poster.webp" 
                alt="남도예술정원 여행주간 공식 포스터"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-neutral-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-neutral-900 shadow-md flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-primary" />
                  클릭하여 포스터 크게보기
                </span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono mt-3 text-center">
              포스터 원본 규격: 2481 × 3509 px (A4 300DPI)
            </p>
          </div>

          {/* Right: Overview Metadata Table */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3.5 py-1 rounded-full">
                Overview & Host
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
                2026 제1회 남도예술정원 여행주간
              </h2>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">
                바다와 숲, 다도해의 바람이 머무는 전남 서남해안 4개 시·군의 7개 명품 민간정원과 지역 파트너 공간이 하나로 이어집니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1">
                <span className="text-neutral-400 font-bold uppercase tracking-wider block">기간</span>
                <p className="text-sm font-semibold text-primary">2026. 11. 06(금) ~ 11. 20(금)</p>
                <p className="text-[11px] text-neutral-500">2주간 매일 운영</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1">
                <span className="text-neutral-400 font-bold uppercase tracking-wider block">장소</span>
                <p className="text-sm font-semibold text-neutral-800">해남 · 완도 · 진도 · 신안</p>
                <p className="text-[11px] text-neutral-500">7대 남도예술정원 및 지역파트너 공간</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1 sm:col-span-2">
                <span className="text-neutral-400 font-bold uppercase tracking-wider block">주요 프로그램</span>
                <p className="text-sm font-semibold text-neutral-800">
                  테마스토리 투어 · 그랜드 투어 · 가이드 스토리 투어 · 예술정원무대 · 지역크리에이터 특화체험 · 스탬프 투어 · 비전세미나
                </p>
              </div>
            </div>

            {/* Organizations Grid */}
            <div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-3">
              <div className="text-[11px] font-bold text-primary uppercase tracking-wider">주최 및 협력 체계</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-neutral-400 block text-[10px]">주최 / 주관</span>
                  <span className="font-semibold text-white">문화체육관광부</span><br/>
                  <span className="font-semibold text-white">전남광주통합특별시</span><br/>
                  <span className="font-semibold text-white">(재)전라남도관광재단</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">운영</span>
                  <span className="font-semibold text-white">남도예술정원 7곳</span><br/>
                  <span className="font-semibold text-white">2권역사업단</span>
                  <span className="text-neutral-400 text-[11px]"> ((주)쥬스컴퍼니)</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">협력 지자체</span>
                  <span className="font-semibold text-white">목포시 · 해남군 · 완도군 · 진도군 · 신안군</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. 4대 프로그램 네비게이션 & 상세 안내
      ───────────────────────────────────────────────────────────── */}
      <section id="programs" className="max-w-6xl mx-auto px-6 pt-24 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-4 py-1.5 rounded-full">
            Core Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900">
            여행주간 4대 핵심 프로그램
          </h2>
          <p className="text-neutral-500 text-sm md:text-base font-light">
            남도예술정원 여행주간은 투어, 예술무대, 지역 특화체험, 연계 행사의 4가지 특별한 즐거움으로 채워집니다.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'all' 
                ? 'bg-neutral-900 text-white shadow-md' 
                : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            전체 프로그램 보기
          </button>
          {PROGRAMS.map((prog) => (
            <button
              key={prog.id}
              onClick={() => setActiveTab(prog.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === prog.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              <span>{prog.number}.</span>
              <span>{prog.category}</span>
            </button>
          ))}
        </div>

        {/* Program Cards Display */}
        <div className="space-y-16">
          {filteredPrograms.map((prog, pIdx) => {
            const IconComp = prog.icon;

            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-[2.5rem] border border-neutral-200/80 shadow-xl overflow-hidden"
              >
                {/* Header Banner inside card */}
                <div className="bg-neutral-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-serif font-bold text-xl shadow-md">
                      {prog.number}
                    </span>
                    <div>
                      <span className="text-[11px] font-bold text-primary tracking-widest uppercase">
                        PROGRAM {prog.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold">
                        {prog.category}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md font-light">
                    {prog.desc}
                  </p>
                </div>

                {/* Content Body: Left Visual Card + Right Detail List */}
                <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Card News Visual */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    <div 
                      onClick={() => setSelectedImg(prog.imageFull)}
                      className="relative group rounded-3xl overflow-hidden border border-neutral-200 shadow-lg cursor-zoom-in bg-neutral-100 w-full max-w-sm"
                    >
                      <img 
                        src={prog.image} 
                        alt={`${prog.category} 안내 카드`}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 rounded-full bg-white/95 text-xs font-bold text-neutral-900 shadow-md flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-primary" />
                          카드뉴스 원본 확대
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-neutral-400 font-mono mt-2">
                      클릭 시 고화질로 확대 보기 가능
                    </span>
                  </div>

                  {/* Right: Sub-items Breakdown */}
                  <div className="lg:col-span-7 space-y-4">
                    {prog.notice && (
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>{prog.notice}</span>
                      </div>
                    )}

                    <div className="space-y-3">
                      {prog.items.map((item, iIdx) => (
                        <div 
                          key={iIdx}
                          className="p-5 rounded-2xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-100 transition-colors space-y-1.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                              {item.tag || item.location}
                              {item.creator && (
                                <span className="text-neutral-500 font-normal">
                                  (크리에이터: {item.creator})
                                </span>
                              )}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-white text-neutral-600 text-[11px] font-mono font-bold border border-neutral-200">
                              {item.date}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-neutral-900">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. Digital Leaflet & Brochure Download Hub
      ───────────────────────────────────────────────────────────── */}
      <section id="leaflet" className="max-w-6xl mx-auto px-6 pt-28">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-neutral-800">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-bold uppercase tracking-wider border border-primary/30">
                <BookOpen className="w-3.5 h-3.5" />
                Official Guidebook & Leaflet
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight">
                2026 남도예술정원 여행주간<br />
                <span className="text-primary-foreground font-sans">공식 리플릿 안내서</span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed break-keep">
                7대 명품 정원의 상세 위치, 추천 동선, 4대 핵심 프로그램 전체 시간표와 스탬프 투어 참여 방법이 담긴 <strong>공식 리플릿 PDF</strong>를 스마트폰이나 PC에 바로 저장하세요.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="/files/namdo-artgarden-leaflet.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-sm tracking-wide shadow-xl transition-all duration-300 flex items-center gap-2 group"
                >
                  <Eye className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span>리플릿 바로보기 (새 창 열기)</span>
                </a>

                <a
                  href="/files/namdo-artgarden-leaflet.pdf"
                  download="2026_남도예술정원_여행주간_공식리플릿.pdf"
                  className="px-6 py-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide shadow-xl transition-all duration-300 flex items-center gap-2 group"
                >
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  <span>고화질 PDF 다운로드</span>
                </a>
              </div>

              <div className="text-xs text-neutral-400 flex items-center gap-4 pt-2 font-mono">
                <span>형식: PDF 공식 브로슈어</span>
                <span>•</span>
                <span>용량: 약 5.5 MB (고화질 원본)</span>
                <span>•</span>
                <span>전남관광재단 공식 인증</span>
              </div>
            </div>

            {/* Right Leaflet Cover Preview Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div 
                onClick={() => setSelectedImg('/images/about/1.png')}
                className="relative rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-800 shadow-xl cursor-zoom-in group"
              >
                <img 
                  src="/images/about/1.webp" 
                  alt="리플릿 프로그램 안내 표지"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-neutral-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold bg-white text-neutral-900 px-2 py-1 rounded-md">
                    표지 확대
                  </span>
                </div>
              </div>

              <div 
                onClick={() => setSelectedImg('/images/namdo-travel-week-poster.png')}
                className="relative rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-800 shadow-xl cursor-zoom-in group"
              >
                <img 
                  src="/images/namdo-travel-week-poster.webp" 
                  alt="여행주간 포스터"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-neutral-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold bg-white text-neutral-900 px-2 py-1 rounded-md">
                    포스터 확대
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. Closing Slogan Banner
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pt-24 text-center space-y-6">
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 leading-snug">
          올 가을, 정원에서 발견하는 남도의 새로운 매력!<br />
          <span className="text-primary font-sans">2026 남도예술정원 여행주간에서 만나요.</span>
        </h3>
        <p className="text-sm md:text-base text-neutral-500 font-light max-w-xl mx-auto">
          남도 2권역의 7대 민간정원은 일상에 지친 여러분에게 가장 따뜻하고 푸르른 위로를 건넬 준비가 되어 있습니다.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/gardens"
            className="px-6 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm transition-transform hover:scale-105"
          >
            7대 명품 정원 전체보기
          </Link>
          <Link
            to="/"
            className="px-6 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-800 font-bold text-sm border border-neutral-200 transition-transform hover:scale-105"
          >
            메인 홈으로 가기
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. High-Res Image Lightbox Modal
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative z-10 max-w-4xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
                <span className="text-xs font-bold tracking-wider text-neutral-300">
                  고화질 이미지 뷰어
                </span>
                <button
                  onClick={() => setSelectedImg(null)}
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-neutral-100 flex-grow">
                <img 
                  src={selectedImg} 
                  alt="확대 이미지" 
                  className="max-h-[75vh] w-auto object-contain rounded-xl shadow-md"
                />
              </div>

              <div className="p-3 bg-white border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>마우스 휠이나 터치로 확대하여 보실 수 있습니다.</span>
                <a
                  href={selectedImg}
                  download
                  className="text-primary font-bold hover:underline"
                >
                  원본 파일 다운로드
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
