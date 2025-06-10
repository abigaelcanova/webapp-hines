import { useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
    default: "border-gray-200 bg-gray-50 text-gray-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    error: "border-red-200 bg-red-50 text-red-900",
    info: "border-blue-200 bg-blue-50 text-blue-900"
  }

  const iconStyles = {
    default: "text-gray-600",
    warning: "text-amber-600",
    error: "text-red-600",
    info: "text-blue-600"
  }

  const buttonStyles = {
    default: "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
    warning: "text-amber-700 hover:text-amber-900 hover:bg-amber-100",
    error: "text-red-700 hover:text-red-900 hover:bg-red-100",
    info: "text-blue-700 hover:text-blue-900 hover:bg-blue-100"
  }

  const defaultIcon = variant === "warning" ? <AlertTriangle className="h-4 w-4" /> : null

  return (
    <Alert className={cn(variantStyles[variant], className)}>
      {(icon || defaultIcon) && (
        <div className={iconStyles[variant]}>
          {icon || defaultIcon}
        </div>
      )}
      <AlertDescription className="flex items-center justify-between">
        <div>
          <span className="font-medium">{title}</span>
          <br />
          <span className="text-sm">{description}</span>
        </div>
        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 ml-4 flex-shrink-0",
              buttonStyles[variant]
            )}
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss alert</span>
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
} 