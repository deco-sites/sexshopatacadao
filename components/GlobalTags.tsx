import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={asset("/apple-touch-icon.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={asset("/favicon-32x32.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={asset("/favicon-16x16.png")}
      />

      {/* Fonts Load */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* ubuntu-300 - latin */
        @font-face {
          font-display: swap;
          font-family: 'Ubuntu';
          font-style: normal;
          font-weight: 300;
          src: url(${
            asset("/fonts/ubuntu-v20-latin-300.woff2")
          }) format('woff2'), url(${
            asset("/fonts/ubuntu-v20-latin-300.woff")
          }) format('woff');
        }
        /* ubuntu-regular - latin */
        @font-face {
          font-display: swap;
          font-family: 'Ubuntu';
          font-style: normal;
          font-weight: 400;
          src: url(${
            asset("/fonts/ubuntu-v20-latin-regular.woff2")
          }) format('woff2'), url(${
            asset("/fonts/ubuntu-v20-latin-regular.woff")
          }) format('woff');
        }
        /* ubuntu-500 - latin */
        @font-face {
          font-display: swap;
          font-family: 'Ubuntu';
          font-style: normal;
          font-weight: 500;
          src: url(${
            asset("/fonts/ubuntu-v20-latin-500.woff2")
          }) format('woff2'), url(${
            asset("/fonts/ubuntu-v20-latin-500.woff")
          }) format('woff');
        }
        /* ubuntu-700 - latin */
        @font-face {
          font-display: swap;
          font-family: 'Ubuntu';
          font-style: normal;
          font-weight: 700;
          src: url(${
            asset("/fonts/ubuntu-v20-latin-700.woff2")
          }) format('woff2'), url(${
            asset("/fonts/ubuntu-v20-latin-700.woff")
          }) format('woff');
        }



        
        /* montserrat-300 - latin */
        @font-face {
          font-display: swap;
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 300;
          src: url(${
            asset("/fonts/montserrat-v26-latin-300.woff2")
          }) format('woff2'), url(${
            asset("/fonts/montserrat-v26-latin-300.woff")
          }) format('woff');
        }
        /* montserrat-regular - latin */
        @font-face {
          font-display: swap;
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 400;
          src: url(${
            asset("/fonts/montserrat-v26-latin-regular.woff2")
          }) format('woff2'), url(${
            asset("/fonts/montserrat-v26-latin-regular.woff")
          }) format('woff');
        }
        /* montserrat-500 - latin */
        @font-face {
          font-display: swap;
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 500;
          src: url(${
            asset("/fonts/montserrat-v26-latin-500.woff2")
          }) format('woff2'), url(${
            asset("/fonts/montserrat-v26-latin-500.woff")
          }) format('woff');
        }
        /* montserrat-700 - latin */
        @font-face {
          font-display: swap;
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 700;
          src: url(${
            asset("/fonts/montserrat-v26-latin-700.woff2")
          }) format('woff2'), url(${
            asset("/fonts/montserrat-v26-latin-700.woff")
          }) format('woff');
        }

        

        /* lobster-400 - latin */
        @font-face {
          font-family: "Lobster";
          font-display: swap;
          font-style: cursive;
          font-weight: 400;
          src: url(${
            asset("/fonts/lobster-v28-latin-regular.woff")
          }) format("woff"),
            url(${
            asset("/fonts/lobster-v28-latin-regular.woff2")
          }) format("woff2");
        }
      `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
