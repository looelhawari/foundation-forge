import json
import re
import shutil
from pathlib import Path


def clean_project_name(name: str) -> str:
    """Clean project name for folder creation"""
    # Remove special characters, keep only alphanumeric and spaces
    name = re.sub(r'[^\w\s-]', '', name)
    # Replace multiple spaces with single space
    name = re.sub(r'\s+', ' ', name)
    # Remove leading/trailing spaces
    name = name.strip()
    # Replace spaces with underscores
    name = name.replace(' ', '_')
    return name[:100]  # Limit length


def detect_projects(pdf_output_dir: Path) -> dict:
    """Detect project names and their page ranges"""
    text_dir = pdf_output_dir / "text"
    projects = {}
    current_project = None
    current_start_page = None
    
    # Read all text files
    text_files = sorted(text_dir.glob("page-*.txt"), 
                       key=lambda x: int(x.stem.split('-')[1]))
    
    for text_file in text_files:
        page_num = int(text_file.stem.split('-')[1])
        content = text_file.read_text(encoding='utf-8')
        
        # Look for project titles (all caps lines with PROJECT/PROJECTS)
        lines = content.strip().split('\n')
        for line in lines:
            line = line.strip()
            # Match project titles
            if ('PROJECT' in line.upper() and 
                len(line) > 10 and 
                len(line) < 150 and
                not line.startswith('Company Profile')):
                
                # Save previous project
                if current_project and current_start_page:
                    projects[current_project] = {
                        'start': current_start_page,
                        'end': page_num - 1
                    }
                
                # Start new project
                current_project = line
                current_start_page = page_num
                break
    
    # Save last project
    if current_project and current_start_page:
        projects[current_project] = {
            'start': current_start_page,
            'end': len(text_files)
        }
    
    return projects


def organize_images_by_project(pdf_output_dir: Path, output_base: Path):
    """Organize images into project folders"""
    output_base.mkdir(parents=True, exist_ok=True)
    
    # Detect projects
    print("Detecting projects...")
    projects = detect_projects(pdf_output_dir)
    
    if not projects:
        print("No projects detected!")
        return
    
    print(f"\nFound {len(projects)} projects:")
    for proj_name, pages in projects.items():
        print(f"  - {proj_name} (pages {pages['start']}-{pages['end']})")
    
    # Organize images
    img_base_dir = pdf_output_dir / "images"
    
    for proj_name, pages in projects.items():
        clean_name = clean_project_name(proj_name)
        project_folder = output_base / clean_name
        project_folder.mkdir(exist_ok=True)
        
        img_count = 0
        # Copy images from page range
        for page_num in range(pages['start'], pages['end'] + 1):
            page_folder = img_base_dir / f"page-{page_num}"
            
            if page_folder.exists():
                # Copy all images from this page
                for img_file in page_folder.glob("*"):
                    if img_file.is_file():
                        # Rename with sequential numbering
                        img_count += 1
                        ext = img_file.suffix
                        new_name = f"{img_count:03d}{ext}"
                        dest = project_folder / new_name
                        shutil.copy2(img_file, dest)
        
        print(f"✓ {clean_name}: {img_count} images")
    
    print(f"\n✅ All images organized in: {output_base}")
    
    # Create summary
    summary = {
        "total_projects": len(projects),
        "projects": {
            clean_project_name(name): {
                "title": name,
                "pages": f"{info['start']}-{info['end']}",
                "image_folder": str(output_base / clean_project_name(name))
            }
            for name, info in projects.items()
        }
    }
    
    summary_file = output_base / "projects_summary.json"
    summary_file.write_text(json.dumps(summary, indent=2), encoding='utf-8')
    print(f"📄 Summary saved: {summary_file}")


def main():
    workspace = Path("D:/civil website")
    pdf_output_dir = workspace / "backend" / "pdf_output"
    organized_output = workspace / "backend" / "projects_organized"
    
    if not pdf_output_dir.exists():
        print(f"Error: {pdf_output_dir} not found!")
        print("Run extract_pdf_content.py first")
        return
    
    organize_images_by_project(pdf_output_dir, organized_output)


if __name__ == "__main__":
    main()
