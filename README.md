# Kloudious Frontend Assessment

A React Native Expo application showcasing user authentication, custom UI components, and modern mobile development practices.

## 🚀 Features

- **User Authentication**: Complete login and signup flow with form validation
- **Local Storage**: User data persistence using AsyncStorage
- **Custom UI Components**: Reusable Button and Input components with TypeScript support
- **Animated Interface**: Lottie animations for enhanced user experience
- **Navigation**: Stack-based navigation with React Navigation
- **Type Safety**: Full TypeScript implementation with custom type definitions
- **State Management**: Context-based authentication state management

## 📱 Screenshots

The app includes the following screens:

- Login Screen with animated Lottie background
- Signup Screen with form validation
- Home Screen for authenticated users
- Loading states with custom animations

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Navigation**: React Navigation v7 (Stack Navigator)
- **State Management**: React Context API
- **Storage**: AsyncStorage for local data persistence
- **Animations**: Lottie React Native
- **UI Icons**: Lucide React Native & Expo Vector Icons
- **Development**: Expo CLI with hot reload

## 📦 Dependencies

### Core Dependencies

- React Native 0.81.4
- Expo SDK 54
- TypeScript 5.9.2
- React Navigation v7
- Lottie React Native
- AsyncStorage

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd kloudious-fe-assessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the application**

   ```bash
   # Start the Expo development server
   npm start

   # Run on iOS simulator
   npm run ios

   # Run on Android emulator
   npm run android
   ```

## 📁 Project Structure

```
├── App.tsx                 # Main application entry point
├── index.js               # Expo entry file
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
│
├── assets/
│   ├── images/            # Image assets
│   └── lottie/            # Animation files
│       ├── loading.json
│       ├── login.json
│       ├── signup.json
│       └── success.json
│
├── components/
│   ├── screen/
│   │   └── Loading.tsx    # Loading component
│   └── ui/
│       ├── Button.tsx     # Custom button component
│       └── Input.tsx      # Custom input component
│
├── constants/
│   └── index.ts           # App constants
│
├── contexts/
│   └── AuthContext.tsx    # Authentication context
│
├── helpers/
│   ├── users.ts           # User management utilities
│   └── validator.ts       # Form validation helpers
│
├── hooks/
│   └── useFrameworkReady.ts # Framework initialization hook
│
├── navigation/
│   └── AppNavigator.tsx   # Navigation configuration
│
├── screens/
│   ├── HomeScreen.tsx     # Main home screen
│   ├── LoginScreen.tsx    # User login screen
│   └── SignupScreen.tsx   # User registration screen
│
└── types/
    ├── contexts/
    │   └── index.ts       # Context type definitions
    ├── navigation/
    │   └── index.ts       # Navigation type definitions
    └── ui/
        ├── button.ts      # Button component types
        └── input.ts       # Input component types
```

## 🎯 Key Features Breakdown

### Authentication System

- **Login/Signup Flow**: Complete user authentication with validation
- **Persistent Sessions**: User sessions maintained across app restarts
- **Local User Database**: Mock backend using AsyncStorage
- **Form Validation**: Real-time validation for email, password, and name fields

### UI Components

- **Custom Button**: Configurable button with loading states, icons, and styling
- **Custom Input**: Text input with validation states and custom styling
- **Loading Screen state**: Animated loading indicators using Lottie

### Navigation

- **Stack Navigator**: Clean navigation between screens
- **Type-Safe Navigation**: Full TypeScript support for navigation parameters
- **Header Configuration**: Customizable screen headers

## 🧪 Development Scripts

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 🔐 Authentication Flow

1. **Initial Load**: Check for stored authentication token
2. **Login**: Email/password validation and user authentication
3. **Signup**: User registration with form validation
4. **Session Management**: Automatic token and user data storage
5. **Logout**: Clear stored credentials and redirect to login

## 📱 Device Support

- **iOS**: Compatible with iOS 13.0+
- **Android**: Compatible with Android 6.0+
- **Web**: Expo web support included

## 🎨 Design System

The app implements a consistent design system with:

- Custom color scheme
- Typography hierarchy
- Consistent spacing and layout
- Interactive animations and micro-interactions
- Responsive design principles

## 🔧 Configuration

### Environment Setup

The app uses Expo's managed workflow for simplified development and deployment.

### Test Data (mock)

The app uses mock user data stored in AsyncStorage for demonstration purposes.
Test data can be found in `contexts/AuthContext.tsx`

```typescript
const getInitialUsers = (): StoredUser[] => [
  {
    id: generateRandomUUID(),
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    id: generateRandomUUID(),
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password456',
  },
];
```

### Build Configuration

- **iOS**: Configured for App Store deployment
- **Android**: Configured for Google Play Store
- **Web**: Progressive Web App support

## 📄 License

This project is part of a frontend assessment for Kloudious.

---

Built with ❤️ using React Native and Expo by Abdullah Fitri.
