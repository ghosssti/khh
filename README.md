# Booklet Generator

This repository contains `generate_booklet.py`, a Python script that formats text content into a structured booklet format.

## Features

- Automatic text wrapping to fit specified page widths
- Pagination with configurable page height  
- Title page generation with author information
- Command-line interface with multiple options
- Support for both file input and stdin input
- Proper error handling for missing files and empty content

## Usage

### Basic Usage

```bash
python generate_booklet.py input.txt
```

### With Title and Author

```bash
python generate_booklet.py input.txt -t "My Booklet" -a "John Doe"
```

### Custom Page Dimensions

```bash
python generate_booklet.py input.txt --width 60 --height 30
```

### Reading from Standard Input

```bash
echo "Hello World" | python generate_booklet.py
```

### All Available Options

```bash
python generate_booklet.py --help
```

## Example

The repository includes `sample_content.txt` which demonstrates the booklet generator:

```bash
python generate_booklet.py sample_content.txt -t "Sample Booklet" -a "Demo Author" -o my_booklet.txt
```

This will create a formatted booklet with a title page and properly paginated content.