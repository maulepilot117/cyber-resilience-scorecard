# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cyber Resilience Scorecard application built with React 18 and Tailwind CSS. It provides an interactive assessment tool for evaluating cybersecurity resilience across multiple categories.

## Development Commands

```bash
# Start development server (runs on port 3000)
npm start

# Build for production
npm run build
```

## Architecture

### Core Components

- **CyberResilienceScorecard.js** (src/CyberResilienceScorecard.js): Main component handling the entire scorecard flow:
  - Step-based navigation (Intro → Categories → Questions → Summary)
  - State management for answers and progress
  - Form validation and submission
  - Demo mode support (add `?demo=true` to URL)

- **scorecardData.js** (src/scorecardData.js): Contains the assessment structure with categories, subcategories, and weighted questions

### Utilities

- **validationUtils.js** (src/utils/validationUtils.js): Input validation and sanitization
- **apiUtils.js** (src/utils/apiUtils.js): API request handling with retry logic and error management
- **ErrorBoundary.js** (src/ErrorBoundary.js): React error boundary for graceful error handling

### Key Features

1. **Multi-step Assessment Flow**: Users progress through introduction, category selection, questions, and summary
2. **Weighted Scoring System**: Each question has a weight value used for calculating resilience scores
3. **Demo Mode**: Bypass email validation for demonstrations (`?demo=true`)
4. **API Integration**: Configured to submit assessment data to backend (default: http://localhost:3000)
5. **Responsive Design**: Tailwind CSS for mobile-friendly interface

### Question Structure

Questions are organized hierarchically:
- Categories (e.g., "Backup Architecture", "Identity & Access Management")
- Optional subcategories within each category
- Questions with unique IDs, text, and weight values

### State Management

The app uses React hooks for state:
- `currentStep`: Controls navigation flow
- `answers`: Stores user responses
- `selectedSubCategories`: Tracks selected assessment areas
- `currentQuestionIndex`: Manages question progression

### API Configuration

API settings in src/utils/apiUtils.js:
- Base URL from `REACT_APP_API_URL` env variable or localhost:3000
- Reduced timeout and retries for demo performance
- Comprehensive error handling with custom ApiError class

## Technology Stack

- React 18.2.0
- Tailwind CSS 3.4.1
- Lucide React icons
- Create React App build system
- PostCSS with Autoprefixer