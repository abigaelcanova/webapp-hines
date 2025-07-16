import React from "react"

interface SiteFooterProps {
  buildingName?: string
}

export function SiteFooter({ buildingName = "125 Lincoln" }: SiteFooterProps) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Building Information */}
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">{buildingName}</h3>
            <p className="text-gray-600">123 Main Street</p>
            <p className="text-gray-600">Mon-Fri: 8AM-6PM</p>
          </div>

          {/* Download App Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1">It's even better on the go.</h4>
                <p className="text-xs text-blue-100">Download the app</p>
              </div>
              <div className="bg-white rounded">
                <div className="w-12 h-12 rounded flex items-center justify-center">
                  <img 
                    src="/images/logos/QR_code_white.png" 
                    alt="QR Code" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 