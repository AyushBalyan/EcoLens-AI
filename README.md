# EcoLens AI

**Scan Today, Sustain Tomorrow**

EcoLens AI is an AI-powered sustainability scanner that uses real-time computer vision to identify waste objects through your webcam and educate users about proper disposal, environmental impact, and eco-friendly alternatives.

## Features

- **Live Camera Scanner** — Real-time webcam object detection
- **AI Classification** — TensorFlow.js image classification (10 waste categories)
- **Sustainability Dashboard** — Eco score, recyclability, disposal guidance, and alternatives
- **Learn Page** — Educational content on recycling and sustainable living

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- TensorFlow.js + Google Teachable Machine
- Recharts + Lucide React

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/AyushBalyan/EcoLens-AI.git
cd EcoLens-AI
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_USE_MOCK_CLASSIFIER` | `true` | Use demo classifier until real model is added |

## Model Training

The app ships with a **mock classifier** for development. For real object detection:

1. **Collect images** — 100–200 photos per category (1000+ total)
2. **Upload to [Google Teachable Machine](https://teachablemachine.withgoogle.com/)**
3. **Create** an Image Classification project
4. **Train** the model with these classes (labels must match exactly):
   - Plastic Bottle, Glass Bottle, Aluminum Can, Paper, Cardboard
   - Food Waste, Battery, Electronic Waste, Plastic Bag, Cloth Bag
5. **Export** as TensorFlow.js
6. **Copy files** to `public/model/`:
   - `model.json`
   - `weights.bin` (and any weight shards)
   - `metadata.json`
7. **Disable mock mode** in `.env.local`:
   ```
   NEXT_PUBLIC_USE_MOCK_CLASSIFIER=false
   ```
8. **Restart** the dev server and validate each class with the webcam

See [`public/model/README.md`](public/model/README.md) for metadata format details.

## Project Structure

```
src/
├── app/              # Pages (landing, scanner, results, learn)
├── components/       # UI components
├── data/             # sustainabilityData.json knowledge base
├── hooks/            # useCamera
├── lib/              # classifier, tensorflow, sustainability utils
└── types/            # TypeScript interfaces
public/model/         # TensorFlow.js model files (after training)
```

## Supported Object Classes

Plastic Bottle · Glass Bottle · Aluminum Can · Paper · Cardboard · Food Waste · Battery · Electronic Waste · Plastic Bag · Cloth Bag

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT — see [LICENSE](LICENSE)
