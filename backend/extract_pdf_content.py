import argparse
import json
import os
from pathlib import Path

import fitz  # PyMuPDF


def extract_pdf(pdf_path: Path, out_dir: Path) -> dict:
    out_dir.mkdir(parents=True, exist_ok=True)
    text_dir = out_dir / "text"
    img_dir = out_dir / "images"
    text_dir.mkdir(exist_ok=True)
    img_dir.mkdir(exist_ok=True)

    summary = {
        "pdf": str(pdf_path),
        "pages": 0,
        "texts": [],
        "images": [],
    }

    with fitz.open(str(pdf_path)) as doc:
        summary["pages"] = doc.page_count
        for page_index in range(doc.page_count):
            page = doc.load_page(page_index)
            # Extract text
            text = page.get_text("text")
            text_file = text_dir / f"page-{page_index + 1}.txt"
            text_file.write_text(text or "", encoding="utf-8")
            summary["texts"].append(str(text_file))

            # Extract images - organized by page
            img_list = page.get_images(full=True)
            if img_list:
                # Create subfolder for this page
                page_img_dir = img_dir / f"page-{page_index + 1}"
                page_img_dir.mkdir(exist_ok=True)
                
                for img_i, img in enumerate(img_list, start=1):
                    xref = img[0]
                    try:
                        pix = doc.extract_image(xref)
                    except Exception:
                        # Skip if extraction fails
                        continue
                    img_bytes = pix.get("image")
                    ext = pix.get("ext", "png")
                    img_file = page_img_dir / f"image-{img_i}.{ext}"
                    with open(img_file, "wb") as f:
                        f.write(img_bytes)
                    summary["images"].append(str(img_file))

    # Write summary
    summary_file = out_dir / "summary.json"
    summary_file.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    return summary


def main():
    parser = argparse.ArgumentParser(description="Extract text and images from a PDF")
    parser.add_argument(
        "--pdf",
        type=str,
        default=None,
        help="Absolute path to the PDF file",
    )
    parser.add_argument(
        "--out",
        type=str,
        default=None,
        help="Absolute path to output directory",
    )
    args = parser.parse_args()

    # Default paths if not provided
    workspace = Path("D:/civil website")
    pdf_path = Path(args.pdf) if args.pdf else workspace / "QR Profile 2025 26-11-2025.pdf"
    out_dir = Path(args.out) if args.out else workspace / "backend" / "pdf_output"

    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    summary = extract_pdf(pdf_path, out_dir)
    print(json.dumps({"status": "ok", "out_dir": str(out_dir), "pages": summary["pages"], "image_count": len(summary["images"])}, indent=2))


if __name__ == "__main__":
    main()
