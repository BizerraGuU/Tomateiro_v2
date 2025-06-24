import { useEffect, useState, useRef } from "react"
import TaskBoard from "../components/TaskBoard"

export default function TimerPage() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState("focus")
  const [focusMinutes, setFocusMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const intervalRef = useRef(null)

  const totalTime = (mode === "focus" ? focusMinutes : breakMinutes) * 60
  const progress = ((totalTime - time) / totalTime) * 100

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem("pomodoroSettings"))
    if (config) {
      setFocusMinutes(config.focus)
      setBreakMinutes(config.break)
      setTime(config.focus * 60)
    } else {
      setTime(25 * 60)
    }
  }, [])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  // Alterna entre os modos de "foco" e "descanso"
  function toggleMode() {
    const newMode = mode === "focus" ? "break" : "focus"
    setMode(newMode)
    setTime(newMode === "focus" ? focusMinutes * 60 : breakMinutes * 60)
  }

  // Iniciar ou pausar o timer
  function handleStartPause() {
    setIsRunning((prev) => !prev)
  }

  // Reiniciar o timer
  function handleReset() {
    const resetTime = (mode === "focus" ? focusMinutes : breakMinutes) * 60
    setTime(resetTime)
    setIsRunning(false)
  }

  // Formatar o tempo
  function formatTime(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0")
    const sec = String(seconds % 60).padStart(2, "0")
    return `${min}:${sec}`
  }

  return (
    <div className="w-full max-w-lg mt-10 bg-white p-8 rounded-3xl shadow-xl text-center relative border border-red-200">
      <h1 className="text-3xl font-bold text-red-600 mb-4">🍅 Tomateiro</h1>

      <h2 className={`text-xl mb-2 ${mode === "focus" ? "text-red-500" : "text-green-500"}`}>
        {mode === "focus" ? "Hora de focar!" : "Hora de descansar!"}
      </h2>

      <div className="text-7xl font-mono mb-6 text-gray-800">{formatTime(time)}</div>

      {/* Barra de progresso */}
      <div className="w-full h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${mode === "focus" ? "bg-red-500" : "bg-green-500"}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleStartPause}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow transition"
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full shadow hover:bg-gray-400 transition"
        >
          Reiniciar
        </button>
      </div>

      {/* Botão para alternar entre foco e descanso */}
      <div className="mt-6">
        <button
          onClick={toggleMode}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition"
        >
          Trocar para {mode === "focus" ? "Descanso" : "Foco"}
        </button>
      </div>

      <br />
      <TaskBoard />
    </div>
  )
}
