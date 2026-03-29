import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, url, image, schemaData }) {
  const siteDomain = 'https://namdoartgarden.com';
  const siteTitle = '남도예술정원 | 자연과 예술이 숨 쉬는 쉼터, 전남 추천 관광지';
  const defaultDescription = '전남 남도 명품 민간정원 8곳(문가든, 바하, 비원, 산이, 아내의정원, 진도휴식, 파인클라우드, 포레스트)의 풍경과 정원주의 진심어린 이야기를 전해드립니다. AI 리서처가 추천하는 목포, 신안, 해남, 진도, 완도 여행 코스를 확인하세요.';
  const defaultImage = '/images/main-intro-011.webp';
  
  const fullTitle = title ? `${title} | 남도예술정원` : siteTitle;
  const canonicalUrl = url || siteDomain;
  const ogImage = image ? (image.startsWith('http') ? image : `${siteDomain}${image}`) : `${siteDomain}${defaultImage}`;

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
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}
