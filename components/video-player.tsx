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
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isYoutube, setIsYoutube] = useState(false)

  // Detect if URL is YouTube
  useEffect(() => {
    setIsYoutube(videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be"))
  }, [videoUrl])

  // YouTube API initialization
  useEffect(() => {
    if (!isYoutube) return

    const initPlayer = () => {
      if (playerRef.current) return;

      const videoId = videoUrl.includes("v=")
        ? videoUrl.split("v=")[1]?.split("&")[0]
        : videoUrl.split("/").pop();

      playerRef.current = new (window as any).YT.Player("youtube-player", {
        height: "100%",
        width: "100%",
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0, // No mostrar videos relacionados (solo del mismo canal)
          modestbranding: 1, // Ocultar logo de YouTube
          playsinline: 1,
          fs: 0, // Deshabilitar botón de pantalla completa nativo
          iv_load_policy: 3, // Ocultar anotaciones
          disablekb: 1, // Deshabilitar controles de teclado
          cc_load_policy: 0, // No mostrar subtítulos por defecto
          enablejsapi: 1, // Habilitar API de JavaScript
        },
        events: {
          onReady: (event: any) => {
            setDuration(event.target.getDuration())
          },
          onStateChange: (event: any) => {
            if (event.data === 1) setIsPlaying(true)
            if (event.data === 2) setIsPlaying(false)
            if (event.data === 0) {
              setIsPlaying(false)
              onTimeUpdate(duration)
              // Pausar el video para evitar mostrar videos relacionados
              setTimeout(() => {
                if (playerRef.current) {
                  playerRef.current.pauseVideo()
                }
              }, 100)
            }
          },
        },
      })
    }

    if (!(window as any).YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      } else {
        document.head.appendChild(tag)
      }

      (window as any).onYouTubeIframeAPIReady = initPlayer
    } else {
      initPlayer()
    }

    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        try {
          const time = playerRef.current.getCurrentTime()
          const dur = playerRef.current.getDuration()
          if (time !== undefined && dur !== undefined) {
            setCurrentTime(time)
            setDuration(dur)
            setProgress((time / dur) * 100)
            onTimeUpdate(time)
          }
        } catch (e) {
          // Ignore YT errors during init
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isYoutube, videoUrl, onTimeUpdate, duration])

  // Native Video (Fallback)
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (isYoutube) return
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100
      setProgress(currentProgress)
      setCurrentTime(video.currentTime)
      setDuration(video.duration)
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
  }, [isYoutube, onTimeUpdate])

  const togglePlay = () => {
    if (isYoutube) {
      if (isPlaying) {
        playerRef.current?.pauseVideo()
      } else {
        playerRef.current?.playVideo()
      }
      setIsPlaying(!isPlaying)
      return
    }

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
    if (isYoutube) {
      if (isMuted) {
        playerRef.current?.unMute()
      } else {
        playerRef.current?.mute()
      }
      setIsMuted(!isMuted)
      return
    }

    const video = videoRef.current
    if (!video) return
    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        containerRef.current.requestFullscreen()
      }
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
      ref={containerRef}
      className="relative aspect-video bg-black rounded-xl overflow-hidden group shadow-2xl"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {isYoutube ? (
        <div id="youtube-player" className="w-full h-full pointer-events-none" />
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          playsInline
          onClick={togglePlay}
        />
      )}

      {/* Transparent overlay for clicks */}
      <div
        className="absolute inset-0 cursor-pointer z-10"
        onClick={togglePlay}
      />

      {/* Play overlay when paused */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 transition-all duration-300"
          onClick={togglePlay}
        >
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform duration-300 group">
            <Play className="h-8 w-8 ml-1 group-hover:fill-current transition-all" />
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 z-30 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        {/* Progress bar */}
        <div className="relative h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="text-white hover:bg-white/10"
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              className="text-white hover:bg-white/10"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <span className="text-white text-sm font-medium ml-2 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
            className="text-white hover:bg-white/10"
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Reveal Progress Badge */}
      {currentTime < revealTimeSeconds && (
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/70 backdrop-blur-md text-white border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold z-30 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden xs:block w-16 sm:w-20 h-1 sm:h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${revealProgress}%` }}
              />
            </div>
            <span className="tabular-nums">
              {formatTime(Math.max(0, revealTimeSeconds - currentTime))} para desbloquear
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
