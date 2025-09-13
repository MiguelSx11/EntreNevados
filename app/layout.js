'use client'
import { IntlProvider } from 'react-intl'
import Navbar from '../components/Navbar'
import './globals.css'
import { AuthProvider } from '../context/AuthContext'

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
  const locale = 'es' // Puedes agregar estado e integración para cambiar idioma

  return (
    <html lang={locale}>
      <body>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </IntlProvider>
      </body>
    </html>
  )
}
