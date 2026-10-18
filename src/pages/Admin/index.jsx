import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Upload, CheckCircle2, AlertCircle, Eye, Trash2, 
  LogOut, Lock, User, PlusCircle, ArrowRight, ExternalLink, 
  Layers, Newspaper, Bell, Sparkles, Image as ImageIcon, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import mammoth from 'mammoth';
import { 
  getAdminAuth, setAdminAuth, clearAdminAuth,
  getCustomNotices, saveCustomNotice, deleteCustomNotice,
  getCustomPress, saveCustomPress, deleteCustomPress,
  getCustomPosts, saveCustomPost, deleteCustomPost
} from '../../utils/adminStorage';
import SEO from '../../components/SEO';

const CATEGORIES = [
  { id: 'notice', label: '공지사항', icon: Bell, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { id: 'press', label: '언론보도', icon: Newspaper, color: 'text-blue-700 bg-blue-50 border-blue-200' },
  { id: 'post', label: '리서처 리포트', icon: Sparkles, color: 'text-purple-700 bg-purple-50 border-purple-200' }
];

export default function AdminPortal() {
  const [auth, setAuth] = useState(null);
  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'manage'
  
  // Auth Form State
  const [adminId, setAdminId] = useState('');
  const [adminPw, setAdminPw] = useState('');
  const [loginError, setLoginError] = useState('');

  // Write Form State
  const [category, setCategory] = useState('notice');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0].replace(/-/g, '.'));
  const [desc, setDesc] = useState('');
  const [source, setSource] = useState('남도예술정원');
  const [link, setLink] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [parsedFileName, setParsedFileName] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(null);

  // Manage List State
  const [notices, setNotices] = useState([]);
  const [pressList, setPressList] = useState([]);
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const existing = getAdminAuth();
    if (existing) {
      setAuth(existing);
      loadAllData();
    }
  }, []);

  const loadAllData = () => {
    setNotices(getCustomNotices());
    setPressList(getCustomPress());
    setPostsList(getCustomPosts());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Default admin credentials
    if (adminId.trim() === 'admin' && adminPw.trim() === 'namdo2026!') {
      const authData = { id: 'admin', name: '남도예술정원 최고관리자', loggedAt: new Date().toISOString() };
      setAdminAuth(authData);
      setAuth(authData);
      setLoginError('');
      loadAllData();
    } else {
      setLoginError('아이디 또는 비밀번호가 올바르지 않습니다. (기본 계정: admin / namdo2026!)');
    }
  };

  const handleLogout = () => {
    clearAdminAuth();
    setAuth(null);
  };

  // Parse .docx Word Document
  const handleWordUpload = async (file) => {
    if (!file) return;
    if (!file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
      alert('MS Word 파일(.docx)만 업로드 가능합니다.');
      return;
    }

    setIsParsing(true);
    setParsedFileName(file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml(
        { arrayBuffer },
        {
          convertImage: mammoth.images.inline((element) => {
            return element.read('base64').then((imageBuffer) => {
              return {
                src: `data:${element.contentType};base64,${imageBuffer}`
              };
            });
          })
        }
      );

      const html = result.value;
      setContentHtml(html);

      // Extract title and summary using DOM parser
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Detect title from first h1/h2 or first paragraph
      const firstHeading = doc.querySelector('h1, h2, h3');
      const firstP = doc.querySelector('p');
      let extractedTitle = file.name.replace(/\.[^/.]+$/, "");
      if (firstHeading && firstHeading.textContent.trim()) {
        extractedTitle = firstHeading.textContent.trim();
      } else if (firstP && firstP.textContent.trim().length > 3) {
        extractedTitle = firstP.textContent.trim().slice(0, 60);
      }
      setTitle(extractedTitle);

      // Detect summary
      const paragraphs = Array.from(doc.querySelectorAll('p')).map(p => p.textContent.trim()).filter(Boolean);
      if (paragraphs.length > 0) {
        setDesc(paragraphs[0].slice(0, 160));
      }

      // Check for first embedded image as thumbnail
      const firstImg = doc.querySelector('img');
      if (firstImg && firstImg.src) {
        setThumbnail(firstImg.src);
      }

      // Date detection
      const text = doc.body.textContent || '';
      const dateMatch = text.match(/\b(20\d{2}[.\-/]\d{1,2}[.\-/]\d{1,2})\b/);
      if (dateMatch) {
        setDate(dateMatch[1].replace(/[-/]/g, '.'));
      }
    } catch (err) {
      console.error('Word Parse Error:', err);
      alert('워드 파일을 분석하는 도중 오류가 발생했습니다. 최신 .docx 파일인지 확인해 주세요.');
    } finally {
      setIsParsing(false);
    }
  };

  // Thumbnail File Upload
  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setThumbnail(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Publish handler
  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('제목을 입력해 주세요.');
      return;
    }

    let publishedItem = null;

    if (category === 'notice') {
      const noticeId = `custom-notice-${Date.now()}`;
      publishedItem = saveCustomNotice({
        id: noticeId,
        title,
        date,
        desc: desc || title,
        content: contentHtml,
        link: link || `/posts/${noticeId}`,
        isExternal: !!link
      });
    } else if (category === 'press') {
      publishedItem = saveCustomPress({
        title,
        date,
        desc: desc || title,
        content: contentHtml,
        source: source || '언론보도',
        thumbnail: thumbnail || '/images/main-intro-011.webp',
        link: link || `/posts`,
        isExternal: !!link
      });
    } else if (category === 'post') {
      const postId = `custom-post-${Date.now()}`;
      publishedItem = saveCustomPost({
        id: postId,
        title,
        date,
        description: desc || title,
        content: contentHtml || `<p>${desc}</p>`,
        image: thumbnail || '/images/main-intro-011.webp',
        author: '남도예술정원 공식 에디터',
        readTime: '4분'
      });
    }

    loadAllData();
    setPublishSuccess({
      category,
      title,
      item: publishedItem
    });

    // Reset Form
    setTitle('');
    setDesc('');
    setLink('');
    setContentHtml('');
    setParsedFileName('');
  };

  const handleDelete = (cat, id) => {
    if (!window.confirm('정말 삭제하시겠습니까? 삭제된 글은 복구할 수 없습니다.')) return;
    if (cat === 'notice') deleteCustomNotice(id);
    if (cat === 'press') deleteCustomPress(id);
    if (cat === 'post') deleteCustomPost(id);
    loadAllData();
  };

  // Export JSON backup
  const handleExportJson = () => {
    const exportData = {
      notices: getCustomNotices(),
      press: getCustomPress(),
      posts: getCustomPosts(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namdo-artgarden-content-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---------------- Render: Login Screen ----------------
  if (!auth) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-6 text-neutral-100">
        <SEO title="관리자 로그인 | 남도예술정원" />
        <div className="w-full max-w-md bg-neutral-800/90 backdrop-blur-xl border border-neutral-700/80 rounded-3xl p-8 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block mb-2">
              <img src="/images/logo-main.svg" alt="남도예술정원" className="h-10 mx-auto brightness-200" />
            </Link>
            <h1 className="text-2xl font-serif font-bold text-white">관리자 포털 로그인</h1>
            <p className="text-neutral-400 text-xs">남도예술정원 공지사항 & 언론보도 등록 시스템</p>
          </div>

          {loginError && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                관리자 아이디 (ID)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full bg-neutral-900/80 border border-neutral-700 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                비밀번호 (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={adminPw}
                  onChange={(e) => setAdminPw(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-neutral-900/80 border border-neutral-700 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-neutral-900/50 border border-neutral-700/50 text-[11px] text-neutral-400 space-y-1">
              <div className="font-bold text-neutral-300">💡 사전 등록 관리자 계정 안내</div>
              <div>• 아이디: <code className="text-primary font-mono font-bold">admin</code></div>
              <div>• 비밀번호: <code className="text-primary font-mono font-bold">namdo2026!</code></div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2"
            >
              로그인 후 관리자 포털 입장 <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 border-t border-neutral-700/60">
            <Link to="/" className="text-xs text-neutral-400 hover:text-white transition-colors">
              &larr; 남도예술정원 홈페이지로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Render: Authenticated Dashboard ----------------
  return (
    <div className="min-h-screen bg-[#f7f8f9] text-neutral-800">
      <SEO title="공식 관리자 포털 | 남도예술정원" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logo-main.svg" alt="남도예술정원" className="h-8" />
            </Link>
            <span className="hidden md:inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              Admin CMS Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="text-xs font-bold text-neutral-600 hover:text-primary flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> 사이트 바로가기
            </Link>
            <div className="h-4 w-px bg-neutral-200" />
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> 로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900">
              콘텐츠 관리자 대시보드
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              MS Word(.docx) 문서를 업로드하여 공지사항, 언론보도, 여행 기사를 실시간으로 등록합니다.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-neutral-200/60 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab('write')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'write' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-primary" /> 신규 글 등록 (워드 업로드)
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'manage' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Layers className="w-4 h-4 text-primary" /> 등록된 글 관리 ({notices.length + pressList.length + postsList.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Write / Word Upload View */}
        {activeTab === 'write' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Form & Uploader (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Selector */}
              <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-3">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                  1. 게시할 카테고리 선택
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.id;
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                          isSelected
                            ? `${cat.color} font-bold ring-2 ring-primary/40 shadow-sm`
                            : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs md:text-sm">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Word Document (.docx) Dropzone */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-dashed border-cyan-300 hover:border-cyan-500 transition-all bg-cyan-50/20 text-center relative group">
                <input
                  type="file"
                  accept=".docx,.doc"
                  onChange={(e) => handleWordUpload(e.target.files?.[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">
                      MS Word (.docx) 파일을 이곳에 끌어다 놓으세요
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      또는 클릭하여 컴퓨터에서 워드 파일을 선택하세요 (제목, 본문, 사진 자동 추출)
                    </p>
                  </div>
                  {parsedFileName && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {parsedFileName} 분석 완료
                    </div>
                  )}
                  {isParsing && (
                    <p className="text-xs text-primary font-bold animate-pulse">
                      워드 문서를 분석하고 있습니다...
                    </p>
                  )}
                </div>
              </div>

              {/* Article Fields Form */}
              <form onSubmit={handlePublish} className="bg-white p-6 md:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-5">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                  2. 상세 정보 검토 및 입력
                </label>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">제목 (Title) *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="공지 또는 보도자료 제목을 입력하세요"
                    required
                    className="w-full border border-neutral-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">게시 날짜 (Date)</label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="2026.04.19"
                      className="w-full border border-neutral-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary font-mono"
                    />
                  </div>

                  {category === 'press' && (
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">언론사명 (Source)</label>
                      <input
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        placeholder="예: KBC광주방송, 뉴스와이어"
                        className="w-full border border-neutral-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  )}

                  {category !== 'press' && (
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">원문 링크 URL (선택사항)</label>
                      <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://..."
                        className="w-full border border-neutral-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  )}
                </div>

                {category === 'press' && (
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">기사 원문 링크 URL</label>
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="https://www.ikbc.co.kr/..."
                      className="w-full border border-neutral-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">요약 설명 (Description)</label>
                  <textarea
                    rows={2}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="목록 카드에 표시될 1~2줄 요약 설명"
                    className="w-full border border-neutral-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Thumbnail upload */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">대표 썸네일 이미지</label>
                  <div className="flex items-center gap-4">
                    {thumbnail ? (
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 flex-shrink-0">
                        <img src={thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center text-neutral-400 flex-shrink-0">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                    <div className="space-y-1.5 flex-grow">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="text-xs text-neutral-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        placeholder="또는 이미지 웹 URL을 직접 입력"
                        className="w-full border border-neutral-300 rounded-xl px-3 py-1.5 text-xs text-neutral-600 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">본문 내용 (HTML)</label>
                  <textarea
                    rows={6}
                    value={contentHtml}
                    onChange={(e) => setContentHtml(e.target.value)}
                    placeholder="워드 파일에서 추출된 본문 HTML 내용입니다. 직접 수정하실 수 있습니다."
                    className="w-full font-mono text-xs border border-neutral-300 rounded-2xl p-4 focus:outline-none focus:border-primary bg-neutral-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" /> 즉시 웹사이트에 발행하기
                </button>
              </form>
            </div>

            {/* Right Column: Live Website Preview (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="sticky top-24 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-primary" /> 웹사이트 라이브 미리보기
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    선택 카테고리: {CATEGORIES.find(c => c.id === category)?.label}
                  </span>
                </div>

                {/* Card Preview depending on category */}
                <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-md space-y-4">
                  {category === 'notice' && (
                    <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
                          Notice
                        </span>
                        <span className="text-xs font-bold text-neutral-400 font-mono">{date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 leading-snug">
                        {title || '공지사항 제목이 이곳에 표시됩니다.'}
                      </h3>
                      <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
                        {desc || '본문 첫 문단 또는 요약 설명이 이곳에 표시됩니다.'}
                      </p>
                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-primary">
                        <span>자세히 보기</span>
                        <span>&rarr;</span>
                      </div>
                    </div>
                  )}

                  {category === 'press' && (
                    <div className="rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-sm">
                      <div className="aspect-[16/10] bg-neutral-100 relative">
                        {thumbnail ? (
                          <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">
                            썸네일 이미지 미리보기
                          </div>
                        )}
                        <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase">
                          {source || '언론사'}
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <span className="text-[10px] font-mono text-neutral-400 font-bold">{date}</span>
                        <h3 className="text-base font-serif font-bold text-neutral-900 leading-snug line-clamp-2">
                          {title || '언론보도 제목이 이곳에 표시됩니다.'}
                        </h3>
                        <p className="text-xs text-neutral-500 line-clamp-2">{desc || '기사 요약 설명'}</p>
                      </div>
                    </div>
                  )}

                  {category === 'post' && (
                    <div className="rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-sm">
                      <div className="aspect-[4/5] bg-neutral-100 relative">
                        {thumbnail ? (
                          <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">
                            리포트 썸네일 미리보기
                          </div>
                        )}
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-neutral-900 flex items-center gap-1.5 shadow-sm">
                          <Sparkles className="w-3 h-3 text-primary" /> 추천 리포트
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-serif font-bold text-neutral-900 leading-snug line-clamp-2">
                          {title || '리서처 리포트 제목이 이곳에 표시됩니다.'}
                        </h3>
                      </div>
                    </div>
                  )}

                  {/* Body Content preview */}
                  {contentHtml && (
                    <div className="pt-4 border-t border-neutral-100">
                      <span className="text-xs font-bold text-neutral-400 block mb-2">워드 본문 렌더링 미리보기:</span>
                      <div
                        className="prose prose-sm max-h-60 overflow-y-auto p-4 bg-neutral-50 rounded-2xl border border-neutral-100 text-xs leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                      />
                    </div>
                  )}
                </div>

                {/* Success Notification Modal */}
                <AnimatePresence>
                  {publishSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-5 rounded-3xl bg-emerald-500 text-white shadow-xl space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" /> 게시글이 성공적으로 발행되었습니다!
                        </span>
                        <button
                          onClick={() => setPublishSuccess(null)}
                          className="text-white/80 hover:text-white text-xs font-bold"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-xs text-white/90 leading-relaxed">
                        제목: <strong>{publishSuccess.title}</strong>
                      </p>
                      <div className="pt-2 flex items-center gap-2">
                        <Link
                          to="/"
                          target="_blank"
                          className="bg-white text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold hover:bg-neutral-100 transition-colors inline-flex items-center gap-1"
                        >
                          홈페이지에서 확인하기 <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Existing Posts View */}
        {activeTab === 'manage' && (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-neutral-900">
                  관리자가 등록한 게시글 목록
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  웹사이트에 반영된 공지사항, 언론보도, 리포트를 확인하고 필요 시 삭제할 수 있습니다.
                </p>
              </div>

              <button
                onClick={handleExportJson}
                className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> 데이터 JSON 백업 다운로드
              </button>
            </div>

            {/* Combined List */}
            <div className="space-y-3">
              {[
                ...notices.map(item => ({ ...item, cat: 'notice', catLabel: '공지사항', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' })),
                ...pressList.map(item => ({ ...item, cat: 'press', catLabel: '언론보도', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' })),
                ...postsList.map(item => ({ ...item, cat: 'post', catLabel: '리포트', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' })),
              ].length === 0 ? (
                <div className="py-16 text-center text-neutral-400 space-y-2">
                  <FileText className="w-12 h-12 mx-auto stroke-1 text-neutral-300" />
                  <p className="text-sm">아직 관리자 포털을 통해 등록된 게시글이 없습니다.</p>
                  <button
                    onClick={() => setActiveTab('write')}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    워드 문서 업로드로 첫 게시글을 작성해 보세요 &rarr;
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {[
                    ...notices.map(item => ({ ...item, cat: 'notice', catLabel: '공지사항', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' })),
                    ...pressList.map(item => ({ ...item, cat: 'press', catLabel: '언론보도', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' })),
                    ...postsList.map(item => ({ ...item, cat: 'post', catLabel: '리포트', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' })),
                  ].map((item) => (
                    <div key={item.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50/80 px-3 rounded-2xl transition-colors">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                            {item.catLabel}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">{item.date}</span>
                          {item.source && (
                            <span className="text-[11px] text-neutral-500 font-medium">({item.source})</span>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-neutral-900 hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-neutral-500 line-clamp-1">{item.desc || item.description}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-neutral-500 hover:bg-neutral-200 transition-colors"
                            title="링크 열기"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(item.cat, item.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> 삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
