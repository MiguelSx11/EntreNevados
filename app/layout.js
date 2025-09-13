'use client'
import { NextIntlProvider } from 'next-intl'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import '../globals.css'

export default function RootLayout({ children }) {
  const [locale, setLocale] = useState('es')

  // Importa las traducciones dinámicamente según el idioma seleccionado
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
