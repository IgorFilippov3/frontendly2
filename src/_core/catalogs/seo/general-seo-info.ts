interface IGeneralSeoInfo {
  applicationName: string;
  authors: {
    name: string;
    url: string;
  },
  title: string;
  description: string;
  keywords: string[];
  robots: {
    index: boolean;
    follow: boolean;
  },
  metadataBase: URL;
}

export const GENERAL_SEO_INFO: IGeneralSeoInfo = {
  applicationName: 'Frontendly',
  authors: {
    name: 'Ihor Filippov',
    url: 'https://twitter.com/tagtag193'
  },
  title: 'Frontendly - best frontend interactive tutorials',
  description: 'Explore Frontendly, your ultimate destination for the best frontend interactive tutorials. Engage with hands-on learning experiences in HTML, CSS, JavaScript, React, Angular and more. Our user-friendly platform combines theory with practical coding exercises, tailored for both beginners and advanced developers. Elevate your frontend skills with real-time feedback and up-to-date industry practices. Start learning interactively today!',
  keywords: [
    'Interactive Learning',
    'Frontend Development',
    'Hands-On Coding',
    'Real-Time Coding Exercises',
    'Learn HTML, CSS, JavaScript, React, Angular',
    'Beginner to Advanced Tutorials',
    'User-Friendly Interface',
    'Practice While You Learn',
    'Master Frontend Skills'
  ],
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://www.frontendly.dev/'),
};