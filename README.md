# Focus Tracker

A real-time vision classification dashboard built with Next.js and Edge Impulse. This application utilizes a custom-trained machine learning model compiled to WebAssembly (WASM) to track user attention states—categorizing live webcam feeds into **Away**, **Distracted**, or **Focused** in real time. 

Developed as an exploration of edge computing and AI in IoT, this project runs 100% client-side, ensuring low latency and data privacy without requiring a backend inference server.

## Features

* **Real-Time Edge Inference**: Uses an Edge Impulse WebAssembly model to run high-speed classifications directly in the browser.
* **Privacy-First Architecture**: Webcam stream and frame data are processed locally and never leave the user's device.
* **Next.js & React**: Built on modern web architecture utilizing Turbopack for fast development and responsive state management.

## Tech Stack

* **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
* **Machine Learning**: Edge Impulse, WebAssembly (C++ compiled to `.wasm`)

## Getting Started

### Prerequisites
Ensure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ASPawar10/focus-tracker.git
   cd focus-tracker
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. Grant camera permissions when prompted to begin live inference.
