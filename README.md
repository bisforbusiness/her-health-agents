# Her Health Agents - El Producto de Nico 🌸

A compassionate AI-powered women's health support platform featuring Luna, an empathetic health data collection assistant specializing in hormone-related health information.

## 🎯 Features

- **Luna AI Assistant**: Compassionate health data collection with adaptive questioning
- **Comprehensive Data Collection**: Collects detailed hormone-related health information
- **Beautiful Modern UI**: Professional, calming design optimized for health conversations
- **Privacy-First**: Anonymous data collection with secure handling
- **Adaptive Questioning**: AI adjusts questions based on user responses
- **Research Integration**: Connects collected data to research agents for analysis

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- OpenAI API Key

### Installation

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🌸 Meet Luna

Luna is your compassionate AI health assistant who:

- **Collects Information**: Gathers comprehensive hormone-related health data
- **Asks Adaptive Questions**: Personalizes questions based on your responses
- **Maintains Privacy**: All data is collected anonymously and securely
- **Never Provides Medical Advice**: Focuses solely on data collection
- **Connects to Research**: Links you with research insights and resources

## 💬 How It Works

### 1. Welcome Experience

- Professional introduction to Luna and her capabilities
- Clear explanation of what information will be collected
- Privacy assurances and transparency about data use

### 2. Adaptive Conversation Flow

Luna follows a structured but flexible questioning approach:

**Initial Questions:**

- User's age
- Menstrual cycle tracking habits
- Tools/methods used for tracking

**Adaptive Follow-ups:**

- Symptoms and their severity
- Cycle regularity and patterns
- Impact on daily life
- Lifestyle factors (stress, sleep, diet, exercise)
- Medical history and medications
- Family history

### 3. Data Processing

When comprehensive information is collected, Luna uses the `sendToAgent` tool to:

- Process and structure the collected data
- Generate a unique anonymous user ID
- Send data to research agents for analysis
- Provide confirmation and next steps

## 🔧 Technical Architecture

### Backend (`/src/app/api/chat/route.ts`)

- **AI SDK Integration**: Uses OpenAI GPT-4 for natural conversations
- **Structured Data Collection**: Zod schemas for data validation
- **Tool Integration**: `sendToAgent` tool for data processing
- **Error Handling**: Graceful handling of API failures

### Frontend (`/src/app/page.tsx`)

- **React 19**: Modern React with hooks
- **AI SDK UI**: `useChat` hook for seamless chat experience
- **Tailwind CSS**: Beautiful, responsive design
- **Real-time Streaming**: Live conversation updates

### Key Components:

- **Welcome Screen**: Professional introduction and capability overview
- **Chat Interface**: Modern chat UI with message streaming
- **Tool Invocation Handling**: Visual feedback for data processing
- **Loading States**: Smooth user experience during AI responses

## 🎨 Design Philosophy

- **Calming Colors**: Pink and purple gradients for comfort
- **Professional Layout**: Clean, medical-grade appearance
- **Accessibility**: High contrast, readable fonts
- **Mobile Responsive**: Works beautifully on all devices
- **Privacy-First UI**: Clear privacy statements and anonymous data handling

## 🔒 Privacy & Security

- **Anonymous Collection**: No personal identifiers stored
- **Secure Transmission**: Data encrypted in transit
- **Research Purpose**: Data used only for connecting users to resources
- **No Medical Advice**: Clear boundaries on assistant capabilities
- **User Control**: Users can stop conversation at any time

## 🛠️ Development

### Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts    # AI chat API endpoint
│   ├── layout.tsx           # App layout and metadata
│   ├── page.tsx             # Main chat interface
│   └── globals.css          # Global styles
```

### Key Dependencies

- **AI SDK**: `ai`, `@ai-sdk/openai`, `@ai-sdk/react`
- **Validation**: `zod`
- **UI**: `tailwindcss`, `react`, `next.js`

### Environment Variables

```bash
OPENAI_API_KEY=your_openai_api_key_here
RESEARCH_AGENTS_ENDPOINT=https://your-research-endpoint.com/api/data  # Optional
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Ensure environment variables are configured

## 🔮 Future Enhancements

### Planned Features:

- **Multi-language Support**: Spanish, French, German translations
- **Voice Input**: Voice-to-text for easier data entry
- **Progress Tracking**: Visual progress indicators during data collection
- **Export Options**: PDF/CSV export of collected data
- **Integration APIs**: Connect with health tracking apps
- **Research Dashboard**: View research insights and recommendations

### Technical Improvements:

- **Database Integration**: Store data in secure database
- **Authentication**: Optional user accounts for data persistence
- **Analytics**: Conversation analytics for improving Luna
- **A/B Testing**: Test different conversation flows
- **API Documentation**: Swagger/OpenAPI documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is proprietary software created for women's health research and support.

## 🙏 Acknowledgments

- **AI SDK by Vercel**: Powering the conversational AI
- **OpenAI**: GPT-4 language model for natural conversations
- **Next.js**: Full-stack React framework
- **Tailwind CSS**: Beautiful, responsive styling

---

**Built with ❤️ for women's health empowerment**

_"Empowering women through AI-powered health insights"_
