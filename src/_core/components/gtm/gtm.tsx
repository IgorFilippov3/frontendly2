import Script from 'next/script';

export const Gtm = () => {
  if (process.env.NODE_ENV === 'development') return null;
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-RMG5K1187W" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
      
          gtag('config', 'G-RMG5K1187W');
        `}
      </Script>
    </>
  );
}