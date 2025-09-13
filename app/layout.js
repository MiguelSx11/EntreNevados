'use client'
import { useState } from 'react'
import { NextIntlProvider } from 'next-intl/client' // <-- Corrige aquí la ruta
import Navbar from '../components/Navbar'
import '../globals.css'

export default function RootLayout({ children }) {
  const [locale, setLocale] = useState('es')

  const messages = require(`../locales/${locale}/common.json`)

  return (
    <html lang={locale}>
      <body>
        <NextIntlProvider locale={locale} messages={messages}>
          <Navbar locale={locale} setLocale={setLocale} />
          {children}
        </NextIntlProvider>
      </body>
    </html>
  )
}
