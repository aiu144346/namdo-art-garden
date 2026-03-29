import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, keywords, url, image, schemaData }) {
  const location = useLocation();
  const siteDomain = 'https://namdoartgarden.com';
  const siteTitle = '남도예술정원 | 자연과 예술이 숨 쉬는 쉼터, 전남 추천 관광지';
  const defaultDescription = '전남 남도 명품 민간정원 8곳(문가든, 바하, 비원, 산이, 아내의정원, 진도휴식, 파인클라우드, 포레스트)의 풍경과 정원주의 진심어린 이야기를 전해드립니다. AI 리서처가 추천하는 목포, 신안, 해남, 진도, 완도 여행 코스를 확인하세요.';
  const defaultImage = '/images/main-intro-011.webp';
  
  const fullTitle = title ? `${title} | 남도예술정원` : siteTitle;
  const canonicalUrl = url || siteDomain;
  const ogImage = image ? (image.startsWith('http') ? image : `${siteDomain}${image}`) : `${siteDomain}${defaultImage}`;

  // Generate dynamic BreadcrumbList Schema
  const paths = location.pathname.split('/').filter(p => p);
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteDomain
      }
    ]
  };

  let currentPath = siteDomain;
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    let name = path.charAt(0).toUpperCase() + path.slice(1);
    // Custom readable names for critical sections
    if (path === 'region') name = '지역별 갤러리';
    if (path === 'posts') name = 'AI 리서처 에디토리얼';
    if (paths[0] === 'region' && index === 1) {
      const regionNames = { mokpo: '목포', shinan: '신안', haenam: '해남', jindo: '진도', wando: '완도' };
      name = regionNames[path] || name;
    }

    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": currentPath
    });
  });

  // Aggregate Schema Data
  let finalSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema]
  };

  if (schemaData) {
    if (schemaData["@graph"]) {
      finalSchema["@graph"] = [...finalSchema["@graph"], ...schemaData["@graph"]];
    } else {
      const { "@context": _, ...restSchema } = schemaData;
      finalSchema["@graph"].push(restSchema);
    }
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags for Social Media & Messengers */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) for Generative AI & Google SEO */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
