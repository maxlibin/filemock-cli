# FileMock CLI

Generate mock test files for QA and development.

## Installation

```bash
npm install -g filemock
```

## Usage

```bash
# Generate a 50MB video file
filemock generate video --size 50 --format mp4

# Generate with custom output path
filemock generate image --size 5 --format png --output test.png

# List available formats
filemock formats
```

## File Types

- **video**: mp4, mov, webm, mkv
- **audio**: mp3, wav, ogg, m4a
- **image**: png, jpg, webp, gif
- **document**: pdf, docx, csv, json

## Programmatic Usage

```javascript
const { generateFileBuffer } = require('filemock');

const buffer = generateFileBuffer({
  type: 'video',
  format: 'mp4',
  size: 10, // MB
});
```

## License

MIT
