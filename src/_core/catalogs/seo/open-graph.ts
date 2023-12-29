import { GENERAL_SEO_INFO } from "./general-seo-info";

interface IOpenGraph {
  type: string;
  url: string;
  title: string;
  description: string;
  siteName: string;
  images: { url: string }[];
}

export const OPEN_GRAPH: IOpenGraph = {
  type: 'website',
  url: 'https://www.frontendly.dev/',
  title: GENERAL_SEO_INFO.title,
  description: GENERAL_SEO_INFO.description,
  siteName: 'Frontendly',
  images: [{
    url: '/assets/images/site-image-social.png',
  }]
}