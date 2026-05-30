# EcoLens AI - Real-Time Sustainability Scanner

## Technical Product Requirements Document (PRD)

Version: 1.0
Project Type: Science Into Action – Sustainable Development Solutions
Category: AI + Sustainability + Computer Vision + Web Application

---

# 1. Project Overview

## Project Name

EcoLens AI

## Tagline

"Scan Today, Sustain Tomorrow"

## Problem Statement

Most people do not know:

* Whether an item is recyclable
* How to dispose of it correctly
* Its environmental impact
* Sustainable alternatives available

Improper waste disposal contributes significantly to pollution, landfill growth, and resource wastage.

EcoLens AI aims to solve this problem by providing instant sustainability insights through AI-powered object recognition.

---

# 2. Project Objective

Build a web application that uses real-time computer vision to:

1. Detect common waste objects using a webcam.
2. Identify the material category.
3. Display sustainability information.
4. Suggest eco-friendly alternatives.
5. Educate users about environmental impact.

The application should be simple, educational, interactive, and visually appealing.

---

# 3. Core Features

## Feature 1: Live Camera Scanner

### Description

Users can access their webcam and scan an object in real time.

### Requirements

* Access device camera.
* Display live video feed.
* Process frames continuously.
* Run object classification locally.

### Expected Output

Example:

Detected Object:
Plastic Bottle

Confidence:
97%

---

## Feature 2: AI Object Classification

### Description

Identify common waste-related objects.

### Initial Supported Classes

* Plastic Bottle
* Glass Bottle
* Aluminum Can
* Paper
* Cardboard
* Food Waste
* Battery
* Electronic Waste
* Plastic Bag
* Cloth Bag

### AI Requirements

Use TensorFlow.js image classification model.

Model must return:

```json
{
  "class": "Plastic Bottle",
  "confidence": 0.97
}
```

---

## Feature 3: Sustainability Information Engine

### Description

After detection, fetch sustainability information from a structured database.

Example:

```json
{
  "name": "Plastic Bottle",
  "recyclable": true,
  "ecoScore": 4,
  "decompositionTime": "450 Years",
  "binType": "Recycling Bin",
  "alternative": "Reusable Steel Bottle"
}
```

---

## Feature 4: Sustainability Score

### Description

Every item receives a sustainability score.

Range:

1-10

Interpretation:

* 1-3 = Poor
* 4-6 = Average
* 7-8 = Good
* 9-10 = Excellent

Visualize score using:

* Progress Ring
* Gauge Chart
* Animated Meter

---

## Feature 5: Disposal Guidance

### Description

Provide proper disposal instructions.

Example:

Plastic Bottle

* Empty contents
* Rinse bottle
* Remove cap
* Place in recycling bin

---

## Feature 6: Eco-Friendly Alternatives

### Description

Recommend sustainable replacements.

Examples:

| Item           | Alternative          |
| -------------- | -------------------- |
| Plastic Bottle | Steel Bottle         |
| Plastic Bag    | Cloth Bag            |
| Disposable Cup | Reusable Mug         |
| Battery        | Rechargeable Battery |

---

# 4. User Flow

## Flow Diagram

Home Page

↓

Allow Camera Access

↓

Scan Object

↓

AI Detection

↓

Object Classification

↓

Fetch Sustainability Data

↓

Display Results Dashboard

↓

User Learns Sustainable Action

---

# 5. Technical Architecture

## Frontend

Framework:

Next.js 15

Language:

TypeScript

Styling:

Tailwind CSS

Animation:

Framer Motion

Icons:

Lucide React

Charts:

Recharts

---

## AI Layer

Framework:

TensorFlow.js

Model Type:

Image Classification

Training Method:

Google Teachable Machine

Export Format:

TensorFlow.js

Model Files:

```bash
/public/model/model.json
/public/model/metadata.json
/public/model/weights.bin
```

---

## Data Layer

Use local JSON database.

Location:

```bash
/src/data/sustainabilityData.json
```

Example Structure:

```json
{
  "Plastic Bottle": {
    "ecoScore": 4,
    "recyclable": true,
    "decompositionTime": "450 Years",
    "binType": "Recycling Bin",
    "alternative": "Reusable Steel Bottle",
    "co2Impact": "82g"
  }
}
```

No backend database required.

---

# 6. Application Pages

## Page 1: Landing Page

Purpose:

Introduce project.

Sections:

* Hero Banner
* Project Description
* Sustainability Mission
* Start Scanning Button

---

## Page 2: Scanner Page

Components:

* Webcam Feed
* Detection Box
* Confidence Score
* Scan Status

---

## Page 3: Results Dashboard

Components:

### Object Card

Displays:

* Object Name
* Confidence

### Sustainability Card

Displays:

* Eco Score
* Recyclable Status
* Disposal Method

### Impact Card

Displays:

* Decomposition Time
* CO₂ Impact

### Alternatives Card

Displays:

* Sustainable Alternative

---

## Page 4: Learn Sustainability

Educational section.

Topics:

* Recycling
* Waste Management
* Pollution
* Sustainable Living

---

# 7. Folder Structure

```bash
ecolens-ai/

src/

├── app/
│   ├── page.tsx
│   ├── scanner/page.tsx
│   ├── results/page.tsx
│   └── learn/page.tsx

├── components/
│   ├── WebcamScanner.tsx
│   ├── DetectionCard.tsx
│   ├── SustainabilityCard.tsx
│   ├── EcoScoreGauge.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx

├── data/
│   └── sustainabilityData.json

├── lib/
│   ├── tensorflow.ts
│   ├── classifier.ts
│   └── sustainability.ts

├── hooks/
│   └── useCamera.ts

├── public/
│   └── model/

└── types/
    └── sustainability.ts
```

---

# 8. AI Model Development

## Dataset Collection

Collect 100-200 images per category.

Sources:

* Personal photographs
* Open datasets
* Classroom samples

Categories:

* Plastic Bottle
* Glass Bottle
* Paper
* Metal Can
* Food Waste
* Cardboard
* Battery

Recommended total:

1000+ images

---

## Training Process

Step 1:

Upload images to Google Teachable Machine

Step 2:

Create Image Classification Project

Step 3:

Train model

Step 4:

Export TensorFlow.js model

Step 5:

Integrate into Next.js

---

# 9. Sustainability Knowledge Base

Each object must contain:

```typescript
interface SustainabilityInfo {
  name: string;
  recyclable: boolean;
  ecoScore: number;
  decompositionTime: string;
  binType: string;
  alternative: string;
  co2Impact: string;
}
```

---

# 10. UI Design Requirements

Theme:

Eco-Friendly Modern Technology

Primary Color:

#22C55E

Secondary Color:

#15803D

Background:

#F8FAFC

Accent:

#10B981

---

## Design Style

Modern

Minimal

Educational

Clean

Nature-inspired

---

# 11. Animations

Use Framer Motion.

Animations:

* Fade In
* Slide Up
* Scale Hover
* Animated Eco Score

Keep animations smooth and lightweight.

---

# 12. Accessibility

Requirements:

* Mobile Responsive
* Keyboard Navigation
* Screen Reader Labels
* High Contrast Support

---

# 13. Performance Requirements

Initial Load:

< 3 seconds

Model Load:

< 5 seconds

Prediction Time:

< 500ms

Lighthouse Score:

90+

---

# 14. Future Enhancements

Version 2 Features

## Smart Dustbin Integration

Hardware:

* Arduino Nano
* ESP32
* LEDs

Behavior:

Green LED:
Recyclable

Red LED:
Non-Recyclable

---

## Sustainability Chatbot

Ask:

"What should I do with batteries?"

Response:

Proper disposal instructions.

---

## QR Scanner

Scan packaging QR codes for sustainability information.

---

## Recycling Center Locator

Display nearby recycling centers using maps.

---

# 15. Science Behind the Project

Concepts Demonstrated:

* Artificial Intelligence
* Machine Learning
* Computer Vision
* Sustainable Development
* Environmental Science
* Waste Management
* Human Computer Interaction

---

# 16. Success Criteria

The project is successful if:

* Webcam detects supported objects.
* AI classification works accurately.
* Sustainability information displays correctly.
* Users understand proper disposal methods.
* The application promotes sustainable behavior.

---

# Final Deliverable

A fully responsive AI-powered web application that scans real-world objects through a webcam and educates users about sustainable disposal practices, environmental impact, and eco-friendly alternatives through real-time computer vision and sustainability analytics.
