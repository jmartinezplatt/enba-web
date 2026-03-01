import { Helmet } from "react-helmet-async";

const BASE_URL = "https://www.espacionautico.com.ar";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  children?: React.ReactNode;
}

const SEOHead = ({ title, description, path, image, type = "website", children }: SEOHeadProps) => {
  const url = `${BASE_URL}${path}`;
  const ogImage = image
    ? (image.startsWith("http") ? image : `${BASE_URL}${image}`)
    : `${BASE_URL}/ENBA-favicon-192x192.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {children}
    </Helmet>
  );
};

export default SEOHead;
