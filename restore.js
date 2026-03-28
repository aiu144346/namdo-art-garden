const fs = require('fs');
const filePath = 'src/pages/PostDetail/index.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /\}-50">[\s\S]*?<td className="py-3 px-4 font-bold border-r border-neutral-200">주요 식생<\/td>/;

const replacement = `  },
  "s5-pinecloud": {
    title: "[신안] 100년의 행운을 품은 소나무 숲, '파인클라우드' 정원 심층 가이드",
    description: "단순한 관광지를 넘어, 설립자의 집념과 자연의 미학이 76,000㎡ 대지에 새겨진 아이다운 천사대교 파인클라우드 심층 분석",
    content: \`
      <h2>[신안] 100년의 행운을 품은 소나무 숲, '파인클라우드' 정원 심층 가이드</h2>
      <p>단순한 관광지를 넘어, 설립자의 집념과 자연의 미학이 76,000㎡ 대지에 새겨진 아이다운 천사대교 파인클라우드 심층 분석</p>
      
      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-primary/10 border-b-2 border-primary/20">
            <tr>
              <th className="py-3 px-4 font-bold text-neutral-900 border-r border-neutral-200">구분</th>
              <th className="py-3 px-4 font-bold text-neutral-900">내용 및 팁</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 border-b border-neutral-200">
            <tr className="hover:bg-neutral-50">
              <td className="py-3 px-4 font-bold border-r border-neutral-200">주요 식생</td>`;

if(regex.test(content)) {
   content = content.replace(regex, replacement);
   fs.writeFileSync(filePath, content, 'utf8');
   console.log('Fixed syntax error by restoring s5-pinecloud!');
} else {
   console.log('Not found');
}
