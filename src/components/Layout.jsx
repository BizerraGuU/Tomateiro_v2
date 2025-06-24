import { Link, Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="min-h-screen bg-rose-100 text-gray-800">
      <header className="bg-red-600 text-white shadow-md p-4">
        <nav className="flex justify-center gap-6 text-lg font-medium">
          <Link to="/" className="hover:underline hover:text-red-200 transition">
            Timer
          </Link>
          <Link
            to="/tarefas"
            className="hover:underline hover:text-red-200 transition"
          >
            Tarefas
          </Link>
          <Link
            to="/configuracoes"
            className="hover:underline hover:text-red-200 transition"
          >
            Configurações
          </Link>
        </nav>
      </header>

      <main className="p-6 flex justify-center bg-rose-100 w-full">
        <Outlet />
      </main>
    </div>
  )
}
