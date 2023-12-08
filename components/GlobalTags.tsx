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

      {/* Aux styles Load */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .footer-section-title::after {
              content: "";
              position: absolute;
              left: 80%;
              background: url(${asset("/image/slash.svg")}) no-repeat;
              width: 33px;
              height: 17px;
              display: block;
            }
          `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
