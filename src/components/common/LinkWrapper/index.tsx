import { ReactNode } from 'react';

interface LinkWrapperPropsType {
  children: ReactNode;
  path: string;
}

export default function LinkWrapper({ children, path }: LinkWrapperPropsType) {
  return <a href={path}>{children}</a>;
}
