'use client'
import { IntlProvider } from 'react-intl'
import Navbar from '../components/Navbar'
import './globals.css'
import { AuthProvider } from '../context/AuthContext'
import { LocaleProvider, useLocale } from '../context/LocaleContext'

// Wrapper para proveer react-intl con mensajes según locale actual
function IntlWrapper({ children }) {
  const { locale } = useLocale()
  const messages = require(`../locales/${locale}/common.json`)
  
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <LocaleProvider>
          <AuthProvider>
            <IntlWrapper>
              <Navbar />
              {children}
            </IntlWrapper>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
