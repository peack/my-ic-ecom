import { Providers } from '@/_providers'
import './globals.css'
import Header from '@/_components/customs/Header'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navLinks = ['Home', 'Shop']

  return (
    <html>
      <body>
        <Providers>
          <div className="min-h-screen bg-gray-100">
            <Header slug="Home" navLinks={navLinks} />
            <main>
              <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Flexible content area */}
                <div className="px-4 py-6 sm:px-0">{children}</div>
              </div>
            </main>
            <footer className="bg-white">
              <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8 justify-end flex">
                {/* Footer content */}
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
