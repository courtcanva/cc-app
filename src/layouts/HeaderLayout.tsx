import { ReactNode } from "react";
import Head from "next/head";

interface HeaderLayoutProps {
  children: ReactNode;
  title?: string;
}

// pass title value to set the head title， e.g. In 404 page, write <HeaderLayout title="404"></HeaderLayout>
const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children, title }) => {
  const headName = `${title} | CourtCanva`;
  return (
    <>
      {title && (
        <Head>
          <title>{headName}</title>
          <meta name="twitter:title" content={headName} />
          <meta property="og:title" content={headName} />
        </Head>
      )}
      {children}
    </>
  );
};

export default HeaderLayout;
