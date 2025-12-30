#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import { generateFileBuffer, formatOptions, isOpenableFormat } from "./generator";

const program = new Command();

program
  .name("filemock")
  .description("Generate mock test files for QA and development")
  .version("1.0.0");

program
  .command("generate")
  .description("Generate a mock file")
  .argument("<type>", "File type: video, audio, image, or document")
  .option("-s, --size <mb>", "File size in MB", "5")
  .option("-f, --format <ext>", "File format (e.g., mp4, png, pdf)")
  .option("-o, --output <path>", "Output file path")
  .option("-d, --duration <seconds>", "Duration for audio/video", "0")
  .action((type: string, options) => {
    const validTypes = ["video", "audio", "image", "document"];
    if (!validTypes.includes(type)) {
      console.error(`❌ Invalid type: ${type}. Use: ${validTypes.join(", ")}`);
      process.exit(1);
    }

    const size = parseFloat(options.size);
    const duration = parseInt(options.duration);
    const format = options.format || formatOptions[type]?.[0] || "bin";
    const filename = options.output || `filemock-${type}-${Date.now()}.${format}`;
    const outputPath = path.resolve(process.cwd(), filename);

    console.log(`🚀 Generating ${size}MB ${type} file (${format.toUpperCase()})...`);

    try {
      const buffer = generateFileBuffer({
        type,
        format,
        size,
        duration,
      });

      fs.writeFileSync(outputPath, buffer);
      console.log(`✅ Created: ${outputPath}`);
      console.log(`   Size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
      if (isOpenableFormat(format)) {
        console.log(`   Status: File is openable/viewable`);
      } else {
        console.log(`   Status: Placeholder file (for size testing only)`);
      }

    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error: ${msg}`);
      process.exit(1);
    }
  });

program
  .command("formats")
  .description("List available file formats")
  .action(() => {
    console.log("\n📁 Available formats:\n");
    for (const [type, formats] of Object.entries(formatOptions)) {
      console.log(`  ${type}: ${formats.join(", ")}`);
    }
    console.log("");
  });

program.parse(process.argv);
