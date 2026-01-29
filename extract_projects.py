import pdfplumber
import json
import os

def extract_pdf_text(pdf_path):
    """Extract all text from a PDF file"""
    all_text = []
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for i, page in enumerate(pdf.pages):
                text = page.extract_text()
                if text:
                    all_text.append(f"\n=== PAGE {i+1} ===\n{text}")
    except Exception as e:
        print(f"Error extracting {pdf_path}: {e}")
    return "\n".join(all_text)

def main():
    base_path = r"c:\Users\Kareem H\Music\Track\CPC\foundation-forge"
    
    pdfs = [
        "School Projects File.pdf",
        "Project Data 2023.pdf", 
        "Project Data 2024.pdf"
    ]
    
    output = {}
    
    for pdf_name in pdfs:
        pdf_path = os.path.join(base_path, pdf_name)
        print(f"\n{'='*60}")
        print(f"Extracting: {pdf_name}")
        print('='*60)
        
        if os.path.exists(pdf_path):
            text = extract_pdf_text(pdf_path)
            output[pdf_name] = text
            print(text[:5000])  # Print first 5000 chars
            print(f"\n... (Total length: {len(text)} characters)")
        else:
            print(f"File not found: {pdf_path}")
    
    # Save all extracted text to JSON
    with open(os.path.join(base_path, "extracted_projects.json"), "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print("\n\nExtraction complete! Saved to extracted_projects.json")

if __name__ == "__main__":
    main()
