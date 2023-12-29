import { GENERAL_SEO_INFO } from "./general-seo-info";

interface ITwitter {
  card: string;
  creator: string;
  title: string;
  description: string;
  images: { url: string }[];
}

export const TWITTER: ITwitter = {
  card: 'summary_large_image',
  creator: '@tagtag193',
  title: GENERAL_SEO_INFO.title,
  description: GENERAL_SEO_INFO.description,
  images: [{
    url: '/assets/images/site-image-social.png',
  }]
}