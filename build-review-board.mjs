import fs from 'fs';
import path from 'path';

const dir = 'c:/GL-AG-PJT/안티그래비티/public/images/Uldol';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp')).sort();

const sections = [
  "메인 대표 썸네일 (히어로 컷)",
  "우수영관광지 주차장 / 종합안내도",
  "입구 꽃단장 거북선 모형",
  "명량대첩 해전사 기념전시관 외관 (무료개방)",
  "전시관 내부: 거북선 내부 모형 / 수군 노젓기",
  "전시관 내부: 화포 / 무기 전시",
  "1층 4D 영상체험관",
  "하늘의 해상 케이블카 풍경",
  "스카이워크 해안 산책로 이정표",
  "진도대교 붉은 교각 뷰",
  "울돌목 스카이워크 입구 지형/전술 안내판",
  "바다 위로 뻗은 스카이워크 투명 보행로",
  "울돌목 스카이워크 포토존 조형물",
  "영화 <명량> 촬영지 안내판",
  "소용돌이치는 울돌목 회오리 물살",
  "배 모양 이색 건축물 쉼터",
  "해안 절벽 관망 정자",
  "민간정원 '진도휴식' 입구 전경",
  "진도휴식 초록빛 산책로 오솔길",
  "진도 읍내 골목길 / 로컬 파트너 풍경",
  "진도 여행 엔딩 피날레 컷"
];

const cards = files.map((f, i) => {
  return `
  <div class="card" id="card-${i+1}">
    <div class="card-header">
      <span class="badge">현재 번호: ${i + 1}번</span>
      <span class="filename">${f}</span>
    </div>
    <div class="img-wrapper">
      <img src="/images/Uldol/${f}" alt="${f}" />
    </div>
    <div class="card-body">
      <div class="current-mapped">
        <strong>현재 매핑된 주제:</strong><br/>
        <span class="topic">${sections[i] || '기타'}</span>
      </div>
    </div>
  </div>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Uldol 21장 사진 매핑 검토 보드</title>
<style>
  * { box-sizing: border-box; }
  body { 
    font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, sans-serif; 
    background: #0f172a; 
    color: #f8fafc; 
    padding: 30px; 
    margin: 0; 
  }
  header {
    max-width: 1400px;
    margin: 0 auto 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #334155;
  }
  h1 { font-size: 26px; margin: 0 0 10px; color: #38bdf8; }
  p { color: #94a3b8; font-size: 15px; margin: 0; line-height: 1.6; }
  .grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); 
    gap: 24px; 
    max-width: 1400px;
    margin: 0 auto;
  }
  .card { 
    background: #1e293b; 
    border-radius: 16px; 
    overflow: hidden; 
    border: 1px solid #334155; 
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
  }
  .card-header {
    padding: 12px 16px;
    background: #0f172a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #334155;
  }
  .badge {
    background: #0284c7;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
  }
  .filename {
    font-family: monospace;
    font-size: 12px;
    color: #64748b;
  }
  .img-wrapper {
    width: 100%;
    height: 300px;
    background: #020617;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  img { 
    width: 100%; 
    height: 100%; 
    object-fit: contain; 
    transition: transform 0.3s;
  }
  img:hover { transform: scale(1.05); }
  .card-body {
    padding: 16px;
    background: #1e293b;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .current-mapped {
    font-size: 13px;
    color: #cbd5e1;
    background: #334155/50;
    padding: 10px 12px;
    border-radius: 8px;
    border-left: 3px solid #38bdf8;
  }
  .topic {
    font-size: 14px;
    font-weight: 600;
    color: #38bdf8;
  }
</style>
</head>
<body>
<header>
  <h1>📸 Uldol 21장 사진 본문 매핑 검토 보드</h1>
  <p>
    브라우저에서 각 사진의 실제 장면(예: 주차장, 거북선, 전시관, 스카이워크, 케이블카, 진도휴식 정원 등)을 한눈에 확인하실 수 있습니다.
  </p>
</header>
<div class="grid">
${cards}
</div>
</body>
</html>`;

fs.writeFileSync('c:/GL-AG-PJT/안티그래비티/public/uldol_mapping_review.html', html);
console.log('uldol_mapping_review.html created');
