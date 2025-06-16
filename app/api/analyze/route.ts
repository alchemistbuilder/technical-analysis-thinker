import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const primaryChart = formData.get('primary') as File;
    const sectorChart = formData.get('sector') as File;
    const macroChart = formData.get('macro') as File;
    const altChart = formData.get('alt') as File;

    if (!primaryChart || !sectorChart || !macroChart) {
      return NextResponse.json(
        { error: 'Missing required charts' }, 
        { status: 400 }
      );
    }

    // Convert images to base64
    const images = [];
    
    const primaryBuffer = await primaryChart.arrayBuffer();
    const primaryBase64 = Buffer.from(primaryBuffer).toString('base64');
    images.push({
      type: 'image' as const,
      source: {
        type: 'base64' as const,
        media_type: primaryChart.type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
        data: primaryBase64,
      },
    });

    const sectorBuffer = await sectorChart.arrayBuffer();
    const sectorBase64 = Buffer.from(sectorBuffer).toString('base64');
    images.push({
      type: 'image' as const,
      source: {
        type: 'base64' as const,
        media_type: sectorChart.type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
        data: sectorBase64,
      },
    });

    const macroBuffer = await macroChart.arrayBuffer();
    const macroBase64 = Buffer.from(macroBuffer).toString('base64');
    images.push({
      type: 'image' as const,
      source: {
        type: 'base64' as const,
        media_type: macroChart.type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
        data: macroBase64,
      },
    });

    if (altChart) {
      const altBuffer = await altChart.arrayBuffer();
      const altBase64 = Buffer.from(altBuffer).toString('base64');
      images.push({
        type: 'image' as const,
        source: {
          type: 'base64' as const,
          media_type: altChart.type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
          data: altBase64,
        },
      });
    }

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `You are a professional technical analyst. Analyze these stock charts and provide a comprehensive trading recommendation.

CHARTS PROVIDED:
1. PRIMARY STOCK CHART - The main stock with technical indicators
2. SECTOR/COMPETITOR CHARTS - Related stocks or sector performance  
3. MACRO CONTEXT CHARTS - Market indices (SPY, QQQ, VIX, etc.)
4. ALTERNATIVE ASSETS - Bitcoin, Gold, Bonds (if provided)

ANALYSIS FRAMEWORK:
Analyze each layer and synthesize into a cohesive recommendation:

1. STOCK TECHNICAL ANALYSIS
- Chart patterns, trend direction, momentum
- Key support/resistance levels
- Technical indicators (RSI, MACD, Moving Averages)
- Volume confirmation

2. RELATIVE PERFORMANCE 
- Stock vs sector/competitors
- Outperforming or underperforming?
- Relative strength analysis

3. MACRO CONTEXT
- Market regime (bull/bear/sideways)
- Risk sentiment (VIX levels, crypto performance)
- Broader market momentum and correlation

4. SYNTHESIS & RECOMMENDATION

FORMAT YOUR RESPONSE EXACTLY AS:

ANALYSIS REPORT - [STOCK SYMBOL]

STOCK TECHNICAL: [BULLISH/BEARISH/NEUTRAL] (Confidence: X%)
- [Key technical observation 1]
- [Key technical observation 2] 
- [Key technical observation 3]

RELATIVE PERFORMANCE: [OUTPERFORMING/UNDERPERFORMING/MIXED] (Confidence: X%)
- [Relative performance observation 1]
- [Relative performance observation 2]

MACRO CONTEXT: [RISK-ON/RISK-OFF/MIXED] (Confidence: X%)
- [Macro observation 1]
- [Macro observation 2]
- [Macro observation 3]

RECOMMENDATION: [BUY/SELL/HOLD]
Entry: [Price level or "Current levels"]
Target: [Price target with % upside]
Stop Loss: [Price level with % downside]
Timeframe: [Expected holding period]

REASONING: [2-3 sentences explaining the key factors driving your recommendation]

Be specific about price levels, percentages, and timeframes. Focus on actionable insights.`
            },
            ...images
          ],
        },
      ],
    });

    const analysis = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze charts' }, 
      { status: 500 }
    );
  }
}