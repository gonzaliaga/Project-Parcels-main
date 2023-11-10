/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-head-element */
import "./globals.css"
import { Montserrat } from "next/font/google"
import Navbar from "@/components/Navbar/Navbar"
import ProvidersWrapper from "./ProvidersWrapper"
import Providers from "@/redux/provider"
const inter = Montserrat({ subsets: ["latin"] })
export const metadata = {
  title: "Parcels",
  description: "Bienvenidos a Parcels, un ecommerce de parcelas"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <script src='//fw-cdn.com/10614760/3458053.js' chat='true'></script>
      </head>
      <body className={inter.className}>
        <ProvidersWrapper>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </ProvidersWrapper>
      </body>
    </html >
  )
}
