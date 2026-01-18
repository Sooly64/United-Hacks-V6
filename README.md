# ReachRight - LinkedIn Profile Analyzer

A powerful AI-powered networking tool that analyzes LinkedIn profiles and provides personalized networking advice for students and professionals.

## Overview

ReachRight helps students and professionals connect effectively with industry leaders by providing data-driven networking advice based on LinkedIn profile analysis. The tool uses AI to analyze profile information and generate actionable networking strategies.

## Features

- **AI-Powered Analysis**: Leverages advanced AI models to generate personalized networking advice
- **Profile Insights**: Extracts key information from LinkedIn profiles including education, experience, and location
- **Tailored Advice**: Provides specific networking strategies based on individual profile data
- **Actionable Recommendations**: Includes conversation starters, timing approaches, and follow-up strategies
- **Smart Disclaimers**: Clear demo limitations and usage guidelines
- **Beautiful UI**: Modern, responsive interface with smooth animations and gradients

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+ and pip
- Featherless AI API key

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd LinkedIn_FastAPI_Scraper
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # or
   source venv/bin/activate  # Linux/Mac
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp config.env.example config.env
   # Edit config.env and add your FEATHERLESS_API_KEY
   ```

5. **Start the FastAPI server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd hackathon-skeleton
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the React app**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Demo Usage

The current demo version is configured to work with Bill Gates' LinkedIn profile as a showcase:

1. **Launch the application** following the setup steps above
2. **Click "Analyze Profile →"** - the URL is pre-filled with Bill Gates' LinkedIn profile
3. **Wait for AI analysis** - the AI will process the profile data
4. **View networking advice** - receive detailed, actionable networking strategies

## AI Analysis Features

The AI provides comprehensive networking advice across 6 key areas:

### 1. **Conversation Starters**
- Specific topics based on their background
- Ice breakers tailored to their experience
- Industry-relevant discussion points

### 2. **Timing & Approach**
- Best times to reach out
- Preferred communication channels
- Optimal outreach strategies

### 3. **Value Proposition**
- What students can offer in return
- Mutual benefit opportunities
- Unique value propositions

### 4. **Follow-up Strategy**
- How to maintain connections
- Follow-up timing and frequency
- Long-term relationship building

### 5. **Leverage Points**
- Education connections
- Location-based opportunities
- Career path insights

### 6. **Networking Pitfalls to Avoid**
- Common mistakes to prevent
- Professional etiquette tips
- Red flags to avoid

## Architecture

### Backend (FastAPI)
- **FastAPI**: Modern Python web framework
- **OpenAI Client**: AI model integration via Featherless AI
- **CORS**: Cross-origin resource sharing for frontend communication
- **Async Processing**: Non-blocking AI API calls with timeout handling

### Frontend (React)
- **React**: Modern JavaScript framework
- **Axios**: HTTP client for API communication
- **Custom Markdown Parser**: Renders AI responses with proper formatting
- **Responsive Design**: Mobile-friendly interface

### AI Integration
- **Featherless AI**: Advanced language models
- **DeepSeek-R1 Model**: High-quality text generation
- **Timeout Handling**: 60-second timeout for reliable responses
- **Error Management**: Comprehensive error handling and user feedback

## Configuration

### Environment Variables

Create a `config.env` file in the backend directory:

```env
FEATHERLESS_API_KEY=your_featherless_api_key_here
```

### API Endpoints

- `POST /scrape/profile` - Returns profile data (currently demo data)
- `POST /analyze/profile` - Analyzes profile and returns AI networking advice
- `GET /` - API health check and endpoint information

## UI Components

### InputSection
- Pre-filled demo profile URL
- Non-editable input for demo consistency
- Clean, modern interface

### ProfileBreakdown
- Displays profile information
- Renders AI analysis with markdown formatting
- Responsive card layout
- Beautiful gradients and animations

## Security & Limitations

### Current Limitations
- **Demo Mode**: Only works with Bill Gates profile in current version
- **API Keys**: Requires Featherless AI API key for full functionality
- **Rate Limits**: Subject to AI provider rate limits

### Security Features
- **Environment Variables**: API keys stored securely
- **CORS Protection**: Controlled frontend-backend communication
- **Input Validation**: Profile URL validation and sanitization

## Future Development

### Planned Features
- **Full LinkedIn Scraping**: Real-time profile data extraction
- **Multiple Profile Support**: Batch analysis capabilities
- **Custom AI Models**: Fine-tuned models for networking advice
- **User Authentication**: Personalized user accounts and history
- **Export Features**: PDF/CSV export of networking advice
- **Integration**: LinkedIn API integration for real data

### Technical Improvements
- **Database Integration**: Store analysis history and user preferences
- **Caching**: Improved performance with intelligent caching
- **Monitoring**: Application performance monitoring and logging
- **Testing**: Comprehensive test suite for reliability

## Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## Acknowledgments

- **Featherless AI**: For providing powerful AI models
- **FastAPI**: For the excellent Python web framework
- **React**: For the amazing frontend framework
- **LinkedIn**: For the platform that makes this tool valuable

## Support

For support, questions, or feedback:

- **Email**: lightningendermen80@gmail.com
- **Discord**: Sooly64
