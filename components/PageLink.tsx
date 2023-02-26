/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

import NavBarItem from './NavBarItem';

function PageLink({
  children, href, className, icon, tabIndex, testId,
}) {
  const router = useRouter();
  const { ref } = router.query;
  let url;
  if (ref) {
    url = `${href}?ref=${ref}`;
  } else {
    url = href;
  }
  return (
    <Link href={url}>
      <NavBarItem href={href} className={className} icon={icon} tabIndex={tabIndex} testId={testId}>
        {children}
      </NavBarItem>
    </Link>
  );
}

export default PageLink;
