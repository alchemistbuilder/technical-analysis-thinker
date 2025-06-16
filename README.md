# Technical Analysis Thinker 📈

An AI-powered multi-chart technical analysis platform that provides professional-grade trading recommendations by analyzing TradingView screenshots using Claude AI.

## Features

### 🤖 AI-Powered Analysis
- **Real-time chart interpretation** using Claude-3.5-Sonnet
- **Multi-layered analysis** combining technical, relative, and macro factors
- **Professional recommendations** with specific entry/exit points and confidence scores

### 📊 Multi-Chart Context Analysis
- **Primary Stock Chart**: Technical indicators (RSI, MACD, Volume, Moving Averages)
- **Sector/Competitors**: Relative performance analysis against peers
- **Macro Context**: Market indices (SPY, QQQ, VIX) for correlation analysis
- **Alternative Assets**: Bitcoin, Gold, Bonds for risk sentiment assessment

### 💡 Smart Workflow
- **Guided upload process** with clear instructions for each chart type
- **Instant visual previews** of uploaded charts
- **Comprehensive reports** with buy/sell/hold recommendations
- **Mobile-responsive design** for analysis on any device

## How It Works

1. **Upload Charts**: Take screenshots from TradingView and upload them in 4 categories
2. **AI Analysis**: Claude AI analyzes patterns, trends, and market context
3. **Get Recommendations**: Receive detailed trading insights with specific price targets

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/alchemistbuilder/technical-analysis-thinker.git
cd technical-analysis-thinker

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your Anthropic API key to .env.local
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Run the Application

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Usage Guide

### Step 1: Prepare Your Charts
Take screenshots from TradingView or your preferred charting platform:

1. **Primary Stock Chart** - Include RSI, MACD, Volume, Moving Averages
2. **Sector/Competitors** - 2-3 competitor charts or sector ETF (e.g., XLK for tech)
3. **Market Context** - SPY, QQQ, VIX charts for broader market analysis
4. **Alternative Assets** *(Optional)* - Bitcoin, Gold, or Bond charts

### Step 2: Upload and Analyze
- Drag and drop your chart screenshots into the designated slots
- Click "Analyze Charts" to get AI-powered insights
- Review comprehensive trading recommendations

### Step 3: Make Informed Decisions
Get detailed analysis including:
- **Technical Assessment**: Chart patterns, momentum, support/resistance
- **Relative Performance**: How your stock compares to sector/competitors
- **Macro Context**: Risk-on vs risk-off market environment
- **Actionable Recommendations**: Entry, target, stop-loss levels with timeframes

## Sample Analysis Output

```
ANALYSIS REPORT - AAPL

STOCK TECHNICAL: BULLISH (Confidence: 78%)
- Breaking above 200MA with strong volume
- RSI at 65 (healthy momentum)
- Cup & handle pattern completion

RELATIVE PERFORMANCE: MIXED (Confidence: 65%)
- Outperforming MSFT and GOOGL by 3%
- Leading tech names despite sector weakness

MACRO CONTEXT: RISK-ON (Confidence: 82%)
- SPY breaking new highs
- VIX below 20 (low fear)
- Bitcoin rallying (risk asset strength)

RECOMMENDATION: BUY
Entry: Current levels
Target: $185 (+8%)
Stop Loss: $165 (-3%)
Timeframe: 2-4 weeks

REASONING: Strong individual technicals + risk-on environment 
outweigh sector weakness. Stock-specific strength likely to continue.
```

## Technology Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **AI Analysis**: Anthropic Claude-3.5-Sonnet
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Roadmap

### Phase 1 ✅ (Current)
- Multi-chart visual analysis
- AI-powered technical analysis
- Professional trading recommendations

### Phase 2 🚧 (Coming Soon)
- **CTA/Fund Flows**: Institutional money movement analysis
- **Insider Trading Data**: Corporate insider buying/selling patterns
- **Options Flow**: Unusual options activity and dark pool data
- **Earnings Integration**: Whisper numbers and earnings surprises

### Phase 3 🔮 (Future)
- **Real-time Data Feeds**: Live price updates and alerts
- **Portfolio Tracking**: Performance monitoring and analytics
- **Social Features**: Share analysis and follow other traders
- **Mobile App**: Native iOS/Android applications

## Contributing

We welcome contributions! Please feel free to submit issues and enhancement requests.

## Security

- API keys are stored securely in environment variables
- No chart data is permanently stored on our servers
- All analysis is processed in real-time and not cached

## Cost Considerations

Each analysis uses the Anthropic API and typically costs a few cents per request. Exact costs depend on:
- Number of charts analyzed
- Image size and complexity
- Current Anthropic API pricing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 For questions: Create an issue on GitHub
- 🐛 For bugs: Use the GitHub issue tracker
- 💡 For feature requests: Open a GitHub discussion

---

**Built with ❤️ for smarter trading decisions**

*Disclaimer: This tool provides analysis for educational purposes only. Always do your own research and consider your risk tolerance before making trading decisions.*