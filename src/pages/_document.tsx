import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body className="antialiased bg-[#F5F5F7] p-[40px] w-[100vw]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
