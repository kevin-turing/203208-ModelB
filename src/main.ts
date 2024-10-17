import fs from 'fs/promises';
import path from 'path';

async function downloadAudio(url: string, filePath: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to download audio: ${response.status} ${response.statusText}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure the directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(filePath, buffer);
    console.log('Audio downloaded successfully!');
  } catch (error) {
    console.error('Error downloading audio:', error);
  }
}

// Example usage:
const audioUrl = 'https://example.com/audio.mp3';
const outputPath = 'downloads/audio.mp3';

downloadAudio(audioUrl, outputPath);
