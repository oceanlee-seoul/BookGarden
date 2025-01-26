import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ModalProvider from '@/components/common/Modal';
import ToastProvider from '@/components/common/Toast';
import TopNavigationBar from '@/components/layout/TopNavigationBar';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider />
      <ModalProvider />
      <TopNavigationBar />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
