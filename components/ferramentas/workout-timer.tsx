"use client"

import { useState, useEffect, useRef } from "react"
import { Timer, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type TimerMode = "stopwatch" | "countdown"

const PRESET_TIMES = [
  { label: "30s", seconds: 30 },
  { label: "1min", seconds: 60 },
  { label: "2min", seconds: 120 },
  { label: "5min", seconds: 300 },
]

export function WorkoutTimer() {
  const [mode, setMode] = useState<TimerMode>("stopwatch")
  const [time, setTime] = useState(0)
  const [countdownTime, setCountdownTime] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (mode === "stopwatch") {
          setTime((prev) => prev + 10)
        } else {
          setTime((prev) => {
            if (prev <= 10) {
              setIsRunning(false)
              if (soundEnabled) {
                playBeep()
              }
              return 0
            }
            return prev - 10
          })
        }
      }, 10)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, mode, soundEnabled])

  const playBeep = () => {
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = "sine"
      gainNode.gain.value = 0.3
      
      oscillator.start()
      setTimeout(() => {
        oscillator.stop()
        audioContext.close()
      }, 200)
    } catch {
      // Audio not supported
    }
  }

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const centiseconds = Math.floor((ms % 1000) / 10)
    
    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      centiseconds: centiseconds.toString().padStart(2, "0"),
    }
  }

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(mode === "countdown" ? countdownTime * 1000 : 0)
  }

  const handleModeChange = (newMode: TimerMode) => {
    setIsRunning(false)
    setMode(newMode)
    setTime(newMode === "countdown" ? countdownTime * 1000 : 0)
  }

  const handlePresetSelect = (seconds: number) => {
    setCountdownTime(seconds)
    setTime(seconds * 1000)
    setIsRunning(false)
  }

  const timeFormatted = formatTime(time)
  const progress = mode === "countdown" && countdownTime > 0 
    ? ((countdownTime * 1000 - time) / (countdownTime * 1000)) * 100 
    : 0

  return (
    <Card className="bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-background border-green-500/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-green-500/20 p-2">
              <Timer className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <CardTitle className="text-base">Cronometro</CardTitle>
              <CardDescription className="text-xs">Para seus treinos</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            ) : (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Seletor de modo */}
        <div className="flex rounded-lg bg-secondary/50 p-1">
          <button
            type="button"
            onClick={() => handleModeChange("stopwatch")}
            className={cn(
              "flex-1 rounded-md py-1.5 text-xs font-medium transition-colors",
              mode === "stopwatch" ? "bg-green-500 text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Cronometro
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("countdown")}
            className={cn(
              "flex-1 rounded-md py-1.5 text-xs font-medium transition-colors",
              mode === "countdown" ? "bg-green-500 text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Timer
          </button>
        </div>

        {/* Display do tempo */}
        <div className="relative">
          {mode === "countdown" && (
            <div 
              className="absolute inset-0 rounded-xl bg-green-500/10 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          )}
          <div className="relative text-center py-6">
            <div className="flex items-baseline justify-center gap-1 font-mono">
              <span className="text-5xl font-bold text-foreground">{timeFormatted.minutes}</span>
              <span className="text-3xl text-muted-foreground">:</span>
              <span className="text-5xl font-bold text-foreground">{timeFormatted.seconds}</span>
              <span className="text-xl text-muted-foreground">.{timeFormatted.centiseconds}</span>
            </div>
          </div>
        </div>

        {/* Presets para countdown */}
        {mode === "countdown" && (
          <div className="grid grid-cols-4 gap-2">
            {PRESET_TIMES.map((preset) => (
              <Button
                key={preset.seconds}
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 text-xs bg-transparent",
                  countdownTime === preset.seconds && "border-green-500 text-green-400"
                )}
                onClick={() => handlePresetSelect(preset.seconds)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        )}

        {/* Controles */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-transparent"
            onClick={handleReset}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          
          <Button
            size="icon"
            className={cn(
              "h-16 w-16 rounded-full",
              isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            )}
            onClick={handleStartStop}
          >
            {isRunning ? (
              <Pause className="h-7 w-7" />
            ) : (
              <Play className="h-7 w-7 ml-1" />
            )}
          </Button>
          
          <div className="h-12 w-12" /> {/* Spacer for symmetry */}
        </div>
      </CardContent>
    </Card>
  )
}
