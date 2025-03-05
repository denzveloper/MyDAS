import React, { useRef, useEffect } from "react"

interface SparklesProps {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  className?: string
  particleColor?: string
}

export const SparklesCore = ({
  id = "tsparticles",
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  className = "h-full w-full",
  particleColor = "#FFFFFF",
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const particles = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const canvasSize = useRef({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }

    initCanvas()
    animate()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number

    constructor() {
      this.x = Math.random() * canvasSize.current.w
      this.y = Math.random() * canvasSize.current.h
      this.size = Math.random() * (maxSize - minSize) + minSize
      this.speedX = Math.random() * 1 - 0.5
      this.speedY = Math.random() * 1 - 0.5
    }

    update() {
      // Calculate distance between mouse and particle
      const dx = mouse.current.x - this.x
      const dy = mouse.current.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Create a repelling force from the mouse
      if (distance < 100) {
        const angle = Math.atan2(dy, dx)
        const force = (100 - distance) / 100
        this.speedX -= Math.cos(angle) * force * 0.5
        this.speedY -= Math.sin(angle) * force * 0.5
      }

      // Update position based on speed
      this.x += this.speedX
      this.y += this.speedY

      // Boundary check
      if (this.x < 0 || this.x > canvasSize.current.w) this.speedX *= -1
      if (this.y < 0 || this.y > canvasSize.current.h) this.speedY *= -1
    }

    draw() {
      if (!context.current) return
      context.current.fillStyle = particleColor
      context.current.beginPath()
      context.current.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      context.current.fill()
    }
  }

  const initCanvas = () => {
    resizeCanvas()
    particles.current = []
    for (let i = 0; i < particleDensity; i++) {
      particles.current.push(new Particle())
    }
  }

  const animate = () => {
    if (!context.current) return
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    
    for (let i = 0; i < particles.current.length; i++) {
      particles.current[i].update()
      particles.current[i].draw()
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect()
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      mouse.current = {
        x: mousePosition.current.x * dpr,
        y: mousePosition.current.y * dpr,
      }
    }
  }

  const handleResize = () => {
    resizeCanvas()
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      
      context.current.scale(dpr, dpr)
    }
  }

  return (
    <div
      ref={canvasContainerRef}
      className={className}
      style={{ background }}
    >
      <canvas ref={canvasRef} id={id} />
    </div>
  )
} 