import { useEffect, useState } from "react"

export default function SettingsPage() {
  const [focusTime, setFocusTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)

  useEffect(() => {
    const saved = localStorage.getItem("pomodoroSettings")
    if (saved) {
      const parsed = JSON.parse(saved)
      setFocusTime(parsed.focus)
      setBreakTime(parsed.break)
    }
  }, [])

  function handleSave(e) {
    e.preventDefault()

    const settings = {
      focus: Number(focusTime),
      break: Number(breakTime),
    }

    localStorage.setItem("pomodoroSettings", JSON.stringify(settings))
    alert("Configurações salvas com sucesso!")
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md border border-red-200">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">🍅 Configurações</h1>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-red-900">Tempo de foco (minutos)</label>
          <input
            type="number"
            min="1"
            value={focusTime}
            onChange={(e) => setFocusTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-800"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-red-900">Tempo de pausa (minutos)</label>
          <input
            type="number"
            min="1"
            value={breakTime}
            onChange={(e) => setBreakTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition font-semibold"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
