#!/usr/bin/env python3
"""
Script to parse extracted PDF data and generate SQL INSERT statements
for the projects table in the CPC Qatar database.
"""

import json
import re

# Category mapping based on database categories
CATEGORY_MAP = {
    'mosque': 'religious',
    'school': 'educational',
    'educational': 'educational',
    'stores and factory': 'logistics-warehouse',
    'commercial building': 'commercial-retail',
    'public project': 'public-infrastructure',
    'farm': 'public-infrastructure',
    'residential': 'residential',
}

def slugify(text):
    """Convert text to URL-friendly slug"""
    # Convert to lowercase
    slug = text.lower()
    # Replace spaces and special chars with hyphens
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    # Remove leading/trailing hyphens
    slug = slug.strip('-')
    # Limit length
    return slug[:100]

def escape_sql(text):
    """Escape single quotes for SQL"""
    if text is None:
        return None
    return text.replace("'", "''")

def parse_school_projects(text):
    """Parse school projects from the extracted text"""
    projects = []
    lines = text.strip().split('\n')
    
    # School project details
    client = "Ministry of Education"
    main_contractor = "Mesopotamia For General Contracting"
    consultant = "Ministry of Education"
    category = "educational"
    
    # Parse each line looking for numbered projects
    current_project = None
    
    for line in lines:
        line = line.strip()
        if not line or line.startswith('===') or line == 'Main' or line == 'contracting':
            continue
        
        # Check if line starts with a number (project entry)
        match = re.match(r'^(\d+)\s+(.+)$', line)
        if match:
            num, rest = match.groups()
            
            # Parse the project name and location
            # Most entries follow pattern: Name Location
            # Try to extract the project name
            if current_project:
                projects.append(current_project)
            
            current_project = {
                'sn': int(num),
                'title': rest.strip(),
                'location': None,
                'client': client,
                'main_contractor': main_contractor,
                'consultant': consultant,
                'category': category,
                'year': None
            }
        elif current_project and line:
            # This might be a location continuation
            # Check if it looks like a location (contains Doha, Qatar, Al, etc.)
            if any(loc in line for loc in ['Doha', 'Qatar', 'Al ', 'Ain', 'Umm', 'Rawdat']):
                if current_project['location']:
                    current_project['location'] += ', ' + line
                else:
                    current_project['location'] = line
    
    if current_project:
        projects.append(current_project)
    
    # Clean up the parsed projects
    school_data = [
        # Page 1
        ("Al Aqsa Preparatory School for Girls", "Ain Khaled, Doha"),
        ("Audio Education Complex for Girls", "Old Airport Area, Doha"),
        ("Fatima Al Zahra Preparatory School for Girls", "Al Mansoura, Doha"),
        ("Qatar Primary School for Boys", "Bin Mahmoud, Doha"),
        ("Al Shurooq Model School for Boys", "Al Gharafa, Doha"),
        ("Al Wakra Primary School for Girls", "Al Wakra, Qatar"),
        ("Abdul Rahman Bin Auf School for Boys", "Al Sadd, Doha"),
        ("Jassim Bin Hamad Secondary School for Boys", "Al Sadd, Doha"),
        ("Arwa Bint Abdul Muttalib Secondary School for Girls", "Al Wakra, Qatar"),
        ("Omar Bin Abdulaziz Secondary School for Boys", "Al Hilal, Doha"),
        ("Musab Bin Umair Secondary School for Boys", "Al Thumama, Doha"),
        ("Rawdat Rashed Primary School for Boys", "Rawdat Rashed, Doha"),
        ("Rawdat Rashed Secondary School for Boys", "Rawdat Rashed, Doha"),
        ("Al Bayan School", "Al Waab, Doha"),
        ("Al Wukair School", "Al Wukair, Qatar"),
        ("Musab Bin Umair School for Boys", "Al Thumama, Doha"),
        ("Umm Qarn School", "Umm Qarn, Qatar"),
        ("Al Sailiya Secondary School for Boys", "Al Sailiya, Doha"),
        # Page 2
        ("Ibn Taymiyyah School", "Al Rayyan, Doha"),
        ("Al Shahaniya Independent School", "Al Shahaniya, Qatar"),
        ("Al Shahaniya Secondary School", "Al Shahaniya, Qatar"),
        ("Arwa Bint Abdul Muttalib School", "Al Wakra, Qatar"),
        ("Al Brouq Primary School for Girls", "Al Rayyan, Doha"),
        ("Muaither Primary School for Boys", "Muaither, Doha"),
        ("Omar Bin Abdulaziz School", "Al Hilal, Doha"),
        ("Rafidah Bint Kaab School for Girls", "Al Wakra, Qatar"),
    ]
    
    cleaned_projects = []
    for i, (title, location) in enumerate(school_data, 1):
        cleaned_projects.append({
            'sn': i,
            'title': title,
            'location': location,
            'client': client,
            'main_contractor': main_contractor,
            'consultant': consultant,
            'category': category,
            'year': None
        })
    
    return cleaned_projects

def parse_2023_projects(text):
    """Parse 2023 projects from the extracted text"""
    projects = []
    
    # Manually parsed data from the PDF
    project_data = [
        ("Mosque – Nuaija", "Nuaija", "Mesopotamia for General Contracting", "religious"),
        ("Proposed Mosque M-DM5 with Imam House Type 5A", "Rawdat Egdam", "Rawdet El Hamam for General Construction Co.", "religious"),
        ("Mosque – Qatar Mall (Rawdat Al Hamamam)", "Qatar Mall", "Rawdet El Hamam for General Construction Co.", "religious"),
        ("Proposed Mosque M-126A with Imam House Type 5A", "Rawdat El Gehena", "Rivera Trading & Contracting Co.", "religious"),
        ("Mosque – Al Sakhama", "Al Sakhama", "Royal Abjar", "religious"),
        ("Mosque 116-A", "Al Wukair", "Amad Construction", "religious"),
        ("Compound Villa – Al Aziziya", "Al Aziziya", "Al Msaken", "commercial-retail"),
        ("Proposed Asphalt Works for Book Store & Gym (EL EBB K125)", "El EBB (K125)", "K.B.R. Qatar Trading & Contracting", "commercial-retail"),
        ("Proposed Prime Power Logistic Facility", "Gharry El Samer", "Gulf Falcon Contracting Co.", "logistics-warehouse"),
        ("Commercial Complex", "Al Wakra", "Al Jazira Building & Construction", "commercial-retail"),
        ("Proposed Food Storage, Offices, Showroom & Labour Camp", "Al Wakra", "Shard Projects Company", "logistics-warehouse"),
        ("Al Hadarma Parking", "Rayyan", "Daar Al Rayyan Investment", "public-infrastructure"),
        ("Farm 183 – Internal Road Works (P-2206)", "Al Wakra", "Westfield Engineering Construction W.L.L", "public-infrastructure"),
        ("Villa Sheikha Aisha Bin Khalifa", "Doha", "Westfield Engineering Construction W.L.L", "commercial-retail"),
        ("Compound Villa 24", "Umm Salal", "Golden Beach Trading", "commercial-retail"),
        ("Al Wakra Logistic", "Al Wakra", "FBA Engineering & Contracting", "logistics-warehouse"),
    ]
    
    for i, (title, location, contractor, category) in enumerate(project_data, 1):
        projects.append({
            'sn': i,
            'title': title,
            'location': location,
            'client': None,
            'main_contractor': contractor,
            'consultant': None,
            'category': category,
            'year': 2023
        })
    
    return projects

def parse_2024_projects(text):
    """Parse 2024 projects from the extracted text"""
    projects = []
    
    # Manually parsed data from the PDF
    project_data = [
        ("Proposed Residential Complex", "Al Kheesa", "Qasr El Shamoukh Contracting", "commercial-retail"),
        ("Building Material Store, Showroom, Administrative Office & Labor Accommodation (Services 1 & 2)", "Birkat Al Awamer", "Al Kamal International Group", "logistics-warehouse"),
        ("Galvanizing Plant Project Site", "New Industrial Area", "Rational Trading & Contracting W.L.L", "logistics-warehouse"),
        ("Proposed Mosque (M126A) with Imam House (5A)", "Bani Hajer", "Kemet for Trading & Contracting", "religious"),
        ("Proposed Mosque with Two Imam Houses (Type A/5)", "Al Sheehaniya", "Rawdat Al Hamama", "religious"),
        ("Thea Live Work Play", "Lusail / Laqtaifa", "Homeco General Construction Trading Co.", "commercial-retail"),
        ("Car Storage & Guard Room", "Birkat Al Awamer", "Al Mana Group", "logistics-warehouse"),
        ("Proposed Mosque Parking", "Rawdat Al Hamama", "Royal Abjar Trading & Contracting", "religious"),
        ("Maintenance Works at Al Noor Petrol Station", "Bu Sidra", "Qatar Star Enterprises & Services Co.", "commercial-retail"),
        ("Cement Factory", "Industrial Area", "Greater Doha Trading & Contracting", "logistics-warehouse"),
        ("Proposed Play Area", "Al Gharrafa", "Artline Trading & Contracting", "public-infrastructure"),
        ("Proposed Mosque Parking", "Al Wukair", "Maha Al Khaleej for Contracting", "religious"),
        ("Proposed Villa", "Al Wukair", "Greater Doha Trading & Contracting", "commercial-retail"),
        ("Proposed Villa", "Al Kheesa", "Contraco W.L.L", "commercial-retail"),
        ("Proposed Mosque 1404", "Al Sakhama", "Techno Fab Trading & Contracting", "religious"),
        ("Proposed Compound", "Ain Khalid", "Qatar Red Crescent", "public-infrastructure"),
        ("Logistic Park", "Birkat Al Awamer", "FBA Engineering & Contracting", "logistics-warehouse"),
        ("External Works", "Birkat Al Awamer", "Future Company", "public-infrastructure"),
        ("Compound Villa (G+1+P.H) + Guard Room", "Doha", "Mezab Trading & Contracting", "commercial-retail"),
        ("Asphalt Works – Villaggio Mall (Part 1)", "Villaggio Mall, Al Aziziyah", "International Decoration & Contracting", "public-infrastructure"),
        ("Asphalt Works – Villaggio Mall (Part 2)", "Villaggio Mall, Al Aziziyah", "International Decoration & Contracting", "public-infrastructure"),
        ("Asphalt Works – Villaggio Mall (Part 3)", "Villaggio Mall, Al Aziziyah", "International Decoration (Landmark Mall)", "public-infrastructure"),
        ("Asphalt Works – Villaggio Mall (Part 4)", "Villaggio Mall, Al Aziziyah", "International Decoration & Contracting", "public-infrastructure"),
        ("Proposed Modification Mosque M-DM5 with Two Imam Houses Type 5A", "Al Kharaitiyat", "Royal Stone Trading & Contracting", "religious"),
        ("Proposed Commercial Buildings & Mosque", "Birkat Al Awamer", "Raptor One Contracting & Services", "public-infrastructure"),
        ("Proposed Villa", "Al Ghashamiya", "Daran Construction & Contracting", "commercial-retail"),
        ("Proposed Mosque, Imam House & Eid Prayer Room (PIN: 70151256)", "Doha", "Millennium Trading & Contracting Co.", "religious"),
        ("Proposed Mosque M117A + Eid Prayer Yard & Imam House Type 5A", "Al Kheesa", "Jamatco for Trading & Contracting", "religious"),
        ("Proposed Car Parking for Masjid No. 060", "Doha", "Al Majlis Contracting & Building Co.", "religious"),
        ("Proposed Office (G+F) & Workshop (G+M)", "Doha", "Tabadol Trading & Contracting Est.", "logistics-warehouse"),
        ("Decoration Workshop, Decoration Supplies Store & Labor Accommodation Building", "Birkat Al Awamer", "Yazwah Projects", "commercial-retail"),
        ("Proposed Mosque MDM-5 with Imam House Type 5A", "Umm Salal", "Shard Project Company", "religious"),
    ]
    
    for i, (title, location, contractor, category) in enumerate(project_data, 1):
        projects.append({
            'sn': i,
            'title': title,
            'location': location,
            'client': None,
            'main_contractor': contractor,
            'consultant': None,
            'category': category,
            'year': 2024
        })
    
    return projects

def generate_sql_inserts(projects, source_name):
    """Generate SQL INSERT statements for the projects"""
    sql_statements = []
    
    # Add comment for grouping
    sql_statements.append(f"\n-- ========================================")
    sql_statements.append(f"-- {source_name}")
    sql_statements.append(f"-- Total: {len(projects)} projects")
    sql_statements.append(f"-- ========================================\n")
    
    for project in projects:
        # Generate a unique slug
        base_slug = slugify(project['title'])
        if project['year']:
            slug = f"{base_slug}-{project['year']}"
        else:
            slug = base_slug
        
        # Escape values
        title = escape_sql(project['title'])
        location = escape_sql(project['location']) if project['location'] else None
        client = escape_sql(project['client']) if project['client'] else None
        main_contractor = escape_sql(project['main_contractor']) if project['main_contractor'] else None
        consultant = escape_sql(project['consultant']) if project['consultant'] else None
        category = project['category']
        year = project['year']
        
        # Build INSERT statement
        sql = f"""INSERT INTO projects (slug, title, category, location, client, main_contractor, consultant, year, status, featured)
VALUES (
    '{slug}',
    '{title}',
    '{category}',
    {f"'{location}'" if location else 'NULL'},
    {f"'{client}'" if client else 'NULL'},
    {f"'{main_contractor}'" if main_contractor else 'NULL'},
    {f"'{consultant}'" if consultant else 'NULL'},
    {year if year else 'NULL'},
    'completed',
    0
);"""
        sql_statements.append(sql)
    
    return sql_statements

def main():
    # Load extracted data
    with open('extracted_projects.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Parse each PDF's data
    school_projects = parse_school_projects(data.get('School Projects File.pdf', ''))
    projects_2023 = parse_2023_projects(data.get('Project Data 2023.pdf', ''))
    projects_2024 = parse_2024_projects(data.get('Project Data 2024.pdf', ''))
    
    # Generate SQL
    all_sql = []
    all_sql.append("-- =============================================================")
    all_sql.append("-- SQL INSERT Statements for CPC Qatar Projects")
    all_sql.append("-- Generated from PDF data extraction")
    all_sql.append("-- Total Projects: {} ({} + {} + {})".format(
        len(school_projects) + len(projects_2023) + len(projects_2024),
        len(school_projects), len(projects_2023), len(projects_2024)
    ))
    all_sql.append("-- =============================================================")
    
    all_sql.extend(generate_sql_inserts(school_projects, "School Projects (Ministry of Education)"))
    all_sql.extend(generate_sql_inserts(projects_2023, "Project Data 2023"))
    all_sql.extend(generate_sql_inserts(projects_2024, "Project Data 2024"))
    
    # Write to file
    sql_output = '\n'.join(all_sql)
    with open('projects_insert.sql', 'w', encoding='utf-8') as f:
        f.write(sql_output)
    
    print("=" * 60)
    print("SQL INSERT Statements Generated Successfully!")
    print("=" * 60)
    print(f"\nTotal Projects:")
    print(f"  - School Projects: {len(school_projects)}")
    print(f"  - 2023 Projects: {len(projects_2023)}")
    print(f"  - 2024 Projects: {len(projects_2024)}")
    print(f"  - TOTAL: {len(school_projects) + len(projects_2023) + len(projects_2024)}")
    print(f"\nOutput file: projects_insert.sql")
    print("\nTo run the SQL, use:")
    print("  mysql -u root -p cpc_qatar < projects_insert.sql")
    print("  OR copy and paste into MySQL Workbench/phpMyAdmin")
    
    # Also output the SQL to console
    print("\n" + "=" * 60)
    print("Generated SQL:")
    print("=" * 60)
    print(sql_output)

if __name__ == '__main__':
    main()
