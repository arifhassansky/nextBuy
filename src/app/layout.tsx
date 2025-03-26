import Providers from '@/lib/Providers';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import NextAuthProvider from './providers/NextAuthProvider';
import Navbar from "@/components/Navbar/Navbar";


const geistSans = localFont({
   src: './fonts/GeistVF.woff',
   variable: '--font-geist-sans',
   weight: '100 900',
});
const geistMono = localFont({
   src: './fonts/GeistMonoVF.woff',
   variable: '--font-geist-mono',
   weight: '100 900',
});

export const metadata: Metadata = {
   title: 'NextBuy',
   description: 'Unbox Happiness Daily',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <Providers>
         <html lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
               <NextAuthProvider>
                <Navbar />
                  <Toaster position='top-right' />
                  {children}
               </NextAuthProvider>
            </body>
         </html>
      </Providers>
   );
}
