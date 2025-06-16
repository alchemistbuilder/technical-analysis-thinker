'use client'

import { useState } from 'react'
import { Upload, BarChart3, TrendingUp, Activity } from 'lucide-react'

interface ChartUpload {
  id: string
  file: File | null
  preview: string | null
}

export default function Home() {
  const [uploads, setUploads] = useState<ChartUpload[]>([
    { id: 'primary', file: null, preview: null },
    { id: 'sector', file: null, preview: null },
    { id: 'macro', file: null, preview: null },
    { id: 'alt', file: null, preview: null },
  ])

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)

  const chartConfig = {
    primary: {
      title: 'Primary Stock Chart',
      description: 'Upload your main stock chart with technical indicators',
      details: 'Include: RSI, MACD, Volume, Moving Averages',
      icon: <TrendingUp className="w-8 h-8" />,
      required: true
    },
    sector: {
      title: 'Sector/Competitors',
      description: 'Upload 2-3 competitor charts or sector ETF',
      details: 'Examples: If AAPL, include MSFT, GOOGL or XLK',
      icon: <BarChart3 className="w-8 h-8" />,
      required: true
    },
    macro: {
      title: 'Market Context',
      description: 'Upload broad market charts: S&P 500, NASDAQ, VIX',
      details: 'Include: SPY, QQQ, VIX for correlation analysis',
      icon: <Activity className="w-8 h-8" />,
      required: true
    },
    alt: {
      title: 'Alternative Assets',
      description: 'Upload Bitcoin, Gold, or Bond charts (Optional)',
      details: 'Helps identify risk-on vs risk-off sentiment',
      icon: <Upload className="w-8 h-8" />,
      required: false
    }
  }

  const handleFileUpload = (chartId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      setUploads(prev => prev.map(upload => 
        upload.id === chartId 
          ? { ...upload, file, preview }
          : upload
      ))
    }
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async () => {
    const requiredUploads = uploads.filter(upload => 
      chartConfig[upload.id as keyof typeof chartConfig].required
    )
    
    if (requiredUploads.some(upload => !upload.file)) {
      alert('Please upload all required charts')
      return
    }

    setIsAnalyzing(true)
    setAnalysis(null)
    
    try {
      const formData = new FormData()
      
      uploads.forEach(upload => {
        if (upload.file) {
          formData.append(upload.id, upload.file)
        }
      })

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const result = await response.json()
      setAnalysis(result.analysis)
      
    } catch (error) {
      console.error('Analysis error:', error)
      setAnalysis('Error: Failed to analyze charts. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Technical Analysis Thinker
        </h1>
        <p className="text-gray-600">
          AI-powered multi-chart analysis for smarter trading decisions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {uploads.map((upload) => {
          const config = chartConfig[upload.id as keyof typeof chartConfig]
          return (
            <div key={upload.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-blue-600 mr-3">
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {config.title}
                    {config.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                  <p className="text-sm text-gray-600">{config.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{config.details}</p>
                </div>
              </div>

              {upload.preview ? (
                <div className="relative">
                  <img 
                    src={upload.preview} 
                    alt="Chart preview" 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setUploads(prev => prev.map(u => 
                      u.id === upload.id ? { ...u, file: null, preview: null } : u
                    ))}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                  <div className="flex flex-col items-center justify-center h-full">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload chart</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(upload.id, file)
                    }}
                  />
                </label>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-center mb-8">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAnalyzing ? 'Analyzing Charts...' : 'Analyze Charts'}
        </button>
      </div>

      {analysis && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Analysis Results</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg">
            {analysis}
          </pre>
        </div>
      )}
    </div>
  )
}