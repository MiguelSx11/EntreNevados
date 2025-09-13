"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabaseClient"
import Navbar from "../../components/Navbar"
export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  // 🔑 Verificar si ya hay sesión activa al cargar la página
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push("/dashboard")
      }
    }
    checkSession()
  }, [router])
  
  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      router.push("/dashboard")
    }
  }
  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      router.push("/dashboard")
    }
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-yellow-50 px-4">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-center text-2xl font-bold text-gray-800">Acceso</h2>
          <p className="text-center text-gray-500 mb-6">
            Inicia sesión o crea tu cuenta para comenzar
          </p>
          {/* Tabs */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-2 text-center ${
                tab === "login"
                  ? "border-b-2 border-green-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 py-2 text-center ${
                tab === "register"
                  ? "border-b-2 border-green-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Registrarse
            </button>
          </div>
          {/* Form */}
          <form
            onSubmit={tab === "login" ? handleLogin : handleRegister}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-green-200"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-lg shadow hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? "Cargando..."
                : tab === "login"
                ? "Iniciar Sesión"
                : "Registrarse"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-green-600 hover:underline">
              ← Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </>
  )
}