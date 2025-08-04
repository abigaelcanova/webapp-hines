import { useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BannerProps {
  title: string
  description: string
  variant?: "default" | "warning" | "error" | "info"
  icon?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export function Banner({
  title,
  description,
  variant = "warning",
  icon,
  dismissible = true,
  onDismiss,
  className
}: BannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  if (isDismissed) {
    return null
  }

  const variantStyles = {
    default: "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200",
    warning: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200",
    error: "bg-gradient-to-r from-red-50 to-pink-50 border-red-200",
    info: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
  }

  const iconContainerStyles = {
    default: "bg-gray-100 text-gray-600",
    warning: "bg-amber-100 text-amber-600",
    error: "bg-red-100 text-red-600",
    info: "bg-blue-100 text-blue-600"
  }

  const textStyles = {
    default: "text-gray-900",
    warning: "text-amber-900",
    error: "text-red-900",
    info: "text-blue-900"
  }

  const buttonStyles = {
    default: "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50",
    warning: "text-amber-600 hover:text-amber-800 hover:bg-amber-200/50",
    error: "text-red-600 hover:text-red-800 hover:bg-red-200/50",
    info: "text-[#BF1231] hover:text-[#9f0e28] hover:bg-red-200/50"
  }

  const defaultIcon = variant === "warning" ? <AlertTriangle className="h-5 w-5" /> : null

  return (
    <div className={cn(
      "relative rounded-xl border shadow-sm overflow-hidden",
      variantStyles[variant],
      className
    )}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          {(icon || defaultIcon) && (
            <div className={cn(
              "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
              iconContainerStyles[variant]
            )}>
              {icon || defaultIcon}
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-lg font-semibold mb-2",
              textStyles[variant]
            )}>
              {title}
            </h3>
            <p className={cn(
              "text-sm leading-relaxed",
              textStyles[variant],
              "opacity-80"
            )}>
              {description}
            </p>
          </div>
          
          {/* Dismiss button */}
          {dismissible && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-lg flex-shrink-0 transition-colors",
                buttonStyles[variant]
              )}
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss alert</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 