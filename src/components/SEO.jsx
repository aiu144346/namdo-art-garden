import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, url, image, schemaData }) {
  const siteTitle = '남도예술정원 | 자연과 예술이 숨 쉬는 쉼터, 전남 추천 관광지';
  const fullTitle = title ? `${title} | 남도예술정원 Blog` : siteTitle;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || '남도예술정원과 주변의 숨겨진 명소, 핫플레이스 관광지 정보를 한눈에 제공하는 공식 블로그입니다. AI가 추천하는 남도 여행 코스를 확인하세요.'} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url || "https://namdogarden.example.com"} />

      {/* Open Graph Tags for Social Media & Messengers */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || "https://images.unsplash.com/photo-1543632297-f584e03d429a?q=80&w=2938&auto=format&fit=crop"} />
      <meta property="og:url" content={url || "https://namdogarden.example.com"} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || "https://images.unsplash.com/photo-1543632297-f584e03d429a?q=80&w=2938&auto=format&fit=crop"} />

      {/* Structured Data (JSON-LD) for Generative AI & Google SEO */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}
