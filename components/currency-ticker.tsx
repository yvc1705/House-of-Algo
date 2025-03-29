"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

// Currency pair data with initial rates
const currencyPairs = [
  { base: "EUR", quote: "USD", rate: 1.0876, flag1: "🇪🇺", flag2: "🇺🇸" },
  { base: "GBP", quote: "USD", rate: 1.2715, flag1: "🇬🇧", flag2: "🇺🇸" },
  { base: "USD", quote: "JPY", rate: 151.43, flag1: "🇺🇸", flag2: "🇯🇵" },
  { base: "USD", quote: "CAD", rate: 1.3602, flag1: "🇺🇸", flag2: "🇨🇦" },
  { base: "AUD", quote: "USD", rate: 0.6573, flag1: "🇦🇺", flag2: "🇺🇸" },
  { base: "USD", quote: "CHF", rate: 0.9047, flag1: "🇺🇸", flag2: "🇨🇭" },
  { base: "EUR", quote: "GBP", rate: 0.8553, flag1: "🇪🇺", flag2: "🇬🇧" },
  { base: "USD", quote: "CNY", rate: 7.2275, flag1: "🇺🇸", flag2: "🇨🇳" },
  { base: "USD", quote: "INR", rate: 83.4725, flag1: "🇺🇸", flag2: "🇮🇳" },
]

export function CurrencyTicker() {
  const [rates, setRates] = useState(
    currencyPairs.map((pair) => ({
      ...pair,
      prevRate: pair.rate,
      direction: "neutral" as "up" | "down" | "neutral",
      changing: false,
    })),
  )

  const mounted = useRef(true)

  useEffect(() => {
    // Function to simulate rate changes
    const updateRates = () => {
      setRates((prevRates) =>
        prevRates.map((pair) => {
          // Random fluctuation between -0.5% and +0.5%
          const fluctuation = pair.rate * (Math.random() * 0.01 - 0.005)
          const newRate = Number.parseFloat((pair.rate + fluctuation).toFixed(4))

          return {
            ...pair,
            prevRate: pair.rate,
            rate: newRate,
            direction: newRate > pair.rate ? "up" : newRate < pair.rate ? "down" : "neutral",
            changing: true,
          }
        }),
      )

      // Reset the changing flag after animation completes
      setTimeout(() => {
        if (mounted.current) {
          setRates((prevRates) =>
            prevRates.map((pair) => ({
              ...pair,
              changing: false,
            })),
          )
        }
      }, 600)
    }

    // Update rates every 2 seconds instead of 1.8 seconds
    const interval = setInterval(updateRates, 2000)
    return () => {
      clearInterval(interval)
      mounted.current = false
    }
  }, [])

  return (
    <div
      className="absolute bottom-0 left-0 right-0 backdrop-blur-md py-4 overflow-hidden border-t border-purple-700 shadow-lg"
      style={{ background: "linear-gradient(90deg, rgba(88, 28, 135, 0.8), rgba(157, 23, 77, 0.8))" }}
    >
      <div className="flex animate-marquee" key="currency-ticker">
        {rates.map((pair, index) => (
          <div
            key={index}
            className="flex items-center px-5 py-2 mx-2 backdrop-blur-sm rounded-lg border border-purple-700/80 transition-all duration-300 hover:border-amber-400 shadow-lg"
            style={{ background: "linear-gradient(90deg, rgba(126, 34, 206, 0.7), rgba(219, 39, 119, 0.5))" }}
          >
            <div className="flex items-center mr-2">
              <div className="flex space-x-1">
                <span className="text-xl">{pair.flag1}</span>
                <span className="text-xl">{pair.flag2}</span>
              </div>
              <div className="ml-2 flex items-center">
                <span className="text-amber-400 font-bold">{pair.base}</span>
                <span className="mx-1 text-gray-400">/</span>
                <span className="text-amber-400 font-bold">{pair.quote}</span>
              </div>
            </div>
            <div
              className={`ml-2 flex items-center ${
                pair.direction === "up" ? "text-green-400" : pair.direction === "down" ? "text-red-400" : "text-white"
              } ${pair.changing ? "animate-pulse" : ""}`}
            >
              <span className="font-mono font-bold text-sm">{pair.rate.toFixed(4)}</span>
              {pair.direction === "up" && <ArrowUp className="w-3 h-3 ml-1 text-green-400" />}
              {pair.direction === "down" && <ArrowDown className="w-3 h-3 ml-1 text-red-400" />}
            </div>
          </div>
        ))}
        {/* Duplicate the first few items to create a seamless loop */}
        {rates.slice(0, 3).map((pair, index) => (
          <div
            key={`dup-${index}`}
            className="flex items-center px-5 py-2 mx-2 backdrop-blur-sm rounded-lg border border-purple-700/80 transition-all duration-300 hover:border-amber-400 shadow-lg"
            style={{ background: "linear-gradient(90deg, rgba(126, 34, 206, 0.7), rgba(219, 39, 119, 0.5))" }}
          >
            <div className="flex items-center mr-2">
              <div className="flex space-x-1">
                <span className="text-xl">{pair.flag1}</span>
                <span className="text-xl">{pair.flag2}</span>
              </div>
              <div className="ml-2 flex items-center">
                <span className="text-amber-400 font-bold">{pair.base}</span>
                <span className="mx-1 text-gray-400">/</span>
                <span className="text-amber-400 font-bold">{pair.quote}</span>
              </div>
            </div>
            <div
              className={`ml-2 flex items-center ${
                pair.direction === "up" ? "text-green-400" : pair.direction === "down" ? "text-red-400" : "text-white"
              } ${pair.changing ? "animate-pulse" : ""}`}
            >
              <span className="font-mono font-bold text-sm">{pair.rate.toFixed(4)}</span>
              {pair.direction === "up" && <ArrowUp className="w-3 h-3 ml-1 text-green-400" />}
              {pair.direction === "down" && <ArrowDown className="w-3 h-3 ml-1 text-red-400" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

