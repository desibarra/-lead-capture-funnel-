"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  videoUrl: string
  onTimeUpdate: (currentTimeSeconds: number) => void
  revealTimeSeconds: number
}

export function VideoPlayer({ videoUrl, onTimeUpdate, revealTimeSeconds }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100
      setProgress(currentProgress)
      setCurrentTime(video.currentTime)
      onTimeUpdate(video.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onTimeUpdate(video.duration)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
    }
  }, [onTimeUpdate])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      video.requestFullscreen()
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const revealProgress = Math.min((currentTime / revealTimeSeconds) * 100, 100)

  return (
    <div
      className="relative aspect-video bg-foreground/5 rounded-xl overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        playsInline
        onClick={togglePlay}
        poster="/professional-business-presentation-thumbnail.jpg"
      />

      {/* Play overlay when paused */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-foreground/20 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform">
            <Play className="h-8 w-8 ml-1" />
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        {/* Progress bar */}
        <div className="relative h-1 bg-background/30 rounded-full mb-4 cursor-pointer">
          <div className="absolute inset-y-0 left-0 bg-primary rounded-full" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={togglePlay} className="text-background hover:text-background">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMute} className="text-background hover:text-background">
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <span className="text-background text-sm ml-2">{formatTime(currentTime)}</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-background hover:text-background"
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {currentTime < revealTimeSeconds && isPlaying && (
        <div className="absolute top-4 right-4 bg-foreground/80 text-background px-3 py-2 rounded-lg text-sm">
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-background/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${revealProgress}%` }}
              />
            </div>
            <span>{formatTime(revealTimeSeconds - currentTime)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
