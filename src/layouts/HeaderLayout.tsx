import { ReactNode } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

interface HeaderLayoutProps {
  children: ReactNode;
  title?: string;
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 },
};

// pass title value to set the head title， e.g. In 404 page, write <HeaderLayout title="404"></HeaderLayout>
const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children, title }) => {
  const headName = `${title} | CourtCanva`;
  return (
    <motion.article
      className="absolute"
    >
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
    </motion.article>
  );
};

export default HeaderLayout;
