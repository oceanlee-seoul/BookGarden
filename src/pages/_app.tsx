import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ModalProvider from '@/components/common/Modal';
import ToastProvider from '@/components/common/Toast';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider />
      <ModalProvider />
      {!isAuthPage && <Header />}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
