import fs from "node:fs/promises";
import path from "node:path";
import mammoth from "mammoth";

async function main() {
  // Resolve relative to the repository working directory
  const projectRoot = path.resolve(process.cwd(), "tcl");
  const docxPath = path.join(
    projectRoot,
    "src",
    "assets",
    "FrontEnd Engineering Project.docx"
  );
  const outPath = path.join(projectRoot, "BRIEF.md");

  try {
    const { value: markdown } = await mammoth.convertToMarkdown({
      path: docxPath,
    });
    await fs.writeFile(outPath, markdown, "utf8");
    console.log(`Extracted brief to ${outPath}`);
  } catch (err) {
    console.error("Failed to extract brief:", err.message);
    process.exit(1);
  }
}

main();
