#!/usr/bin/env python3
"""
DTC Eligibility Questionnaire Project Setup Script
Creates a well-organized project structure for the DTC Eligibility Questionnaire
"""

import os
import shutil

def create_project_structure():
    """Create the directory structure for the project"""
    
    # Define the project structure
    directories = [
        'css',
        'js',
        'assets',
        'docs',
        'data'
    ]
    
    # Create directories
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"Created directory: {directory}/")
    
    print("\nProject structure created successfully!")

def create_file_structure():
    """Create the main files for the project"""
    
    # Create README.md
    readme_content = """# DTC Eligibility Questionnaire

An interactive guide for the DTC (Depository Trust Company) Eligibility Questionnaire with comprehensive regulatory citations and explanations.

## Project Structure

```
dtc_eligibility/
├── index.html          # Main HTML file with the questionnaire
├── css/
│   └── styles.css      # All styling and design
├── js/
│   └── script.js       # JavaScript functionality for modals
├── assets/             # Static assets (images, fonts, etc.)
├── docs/               # Additional documentation
├── data/               # Data files for modal content
└── README.md           # This file
```

## Features

- Interactive hotspots with detailed explanations
- Modal windows for regulatory terms
- Responsive design
- Comprehensive SEC and DTC citations
- Professional financial document styling

## Usage

Open `index.html` in a web browser to use the interactive questionnaire.

## Development

The project uses vanilla HTML, CSS, and JavaScript with no external dependencies.

## Sources

- DTC Operational Arrangements
- SEC.gov
- Various regulatory and legal sources
"""
    
    with open('README.md', 'w') as f:
        f.write(readme_content)
    print("Created README.md")
    
    # Create .gitignore
    gitignore_content = """# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo
*~

# Python
__pycache__/
*.py[cod]
*$py.class
venv/
env/
"""
    
    with open('.gitignore', 'w') as f:
        f.write(gitignore_content)
    print("Created .gitignore")
    
    print("\nProject files created successfully!")

if __name__ == "__main__":
    print("Setting up DTC Eligibility Questionnaire project...")
    print("=" * 50)
    
    create_project_structure()
    create_file_structure()
    
    print("=" * 50)
    print("Project setup complete!")
    print("\nNext steps:")
    print("1. Create the main index.html file")
    print("2. Extract CSS to css/styles.css")
    print("3. Extract JavaScript to js/script.js")
