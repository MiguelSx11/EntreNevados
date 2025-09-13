'use client'
import { useState } from 'react'
import { IntlProvider } from 'react-intl'
//import Navbar from '../components/Navbar'
import './globals.css'

const messages = {
  es: {
    home: 'Inicio',
    categories: 'Categorías',
    login: 'Ingresar',
    register: 'Registrarse',
    logout: 'Cerrar sesión',
    language: 'Idioma',
  },
  en: {
    home: 'Home',
    categories: 'Categories',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    language: 'Language',
  },
}

export default function RootLayout({ children }) {
  const [locale, setLocale] = useState('es')

  return (
    <html lang={locale}>
      <body>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <Navbar locale={locale} setLocale={setLocale} />
          {children}
        </IntlProvider>
      </body>
    </html>
  )
}
