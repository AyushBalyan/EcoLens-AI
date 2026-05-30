# TensorFlow.js Model Directory

Place your exported Google Teachable Machine model files here:

- `model.json` — model architecture and weights manifest
- `weights.bin` — model weight data (may be split into multiple shards)
- `metadata.json` — class labels from Teachable Machine

## Expected metadata.json format

```json
{
  "tfjsVersion": "4.x.x",
  "tmVersion": "2.x",
  "packageName": "ecolens-ai",
  "timeStamp": "2026-01-01T00:00:00.000Z",
  "labels": [
    "Plastic Bottle",
    "Glass Bottle",
    "Aluminum Can",
    "Paper",
    "Cardboard",
    "Food Waste",
    "Battery",
    "Electronic Waste",
    "Plastic Bag",
    "Cloth Bag"
  ]
}
```

**Important:** Label names must match keys in `src/data/sustainabilityData.json` exactly.

After adding model files, set in `.env.local`:

```
NEXT_PUBLIC_USE_MOCK_CLASSIFIER=false
```

Then restart the dev server and test each class with the live webcam.
