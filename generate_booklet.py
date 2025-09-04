#!/usr/bin/env python3
"""
Booklet Generator Script

This script generates a booklet from input text content, formatting it
appropriately for printing or digital viewing.
"""

import argparse
import sys
import textwrap
from pathlib import Path
from typing import List, Optional


class BookletGenerator:
    """Generate a booklet from text content with proper formatting."""
    
    def __init__(self, page_width: int = 80, page_height: int = 50):
        """
        Initialize the booklet generator.
        
        Args:
            page_width: Maximum characters per line
            page_height: Maximum lines per page
        """
        self.page_width = page_width
        self.page_height = page_height
        self.pages: List[str] = []
    
    def add_content(self, content: str) -> None:
        """
        Add content to the booklet, automatically handling pagination.
        
        Args:
            content: Text content to add to the booklet
        """
        # Wrap text to fit page width
        wrapped_lines = []
        for line in content.split('\n'):
            if line.strip():
                wrapped_lines.extend(textwrap.wrap(line, width=self.page_width))
            else:
                wrapped_lines.append('')
        
        # Split into pages based on page height
        current_page = []
        for line in wrapped_lines:
            if len(current_page) >= self.page_height:
                self.pages.append('\n'.join(current_page))
                current_page = []
            current_page.append(line)
        
        # Add the last page if it has content
        if current_page:
            self.pages.append('\n'.join(current_page))
    
    def add_title_page(self, title: str, author: str = None) -> None:
        """
        Add a title page to the booklet.
        
        Args:
            title: Title of the booklet
            author: Author name (optional)
        """
        title_page = []
        
        # Add some spacing
        title_page.extend([''] * (self.page_height // 4))
        
        # Center the title
        title_lines = textwrap.wrap(title, width=self.page_width - 10)
        for line in title_lines:
            centered_line = line.center(self.page_width)
            title_page.append(centered_line)
        
        # Add author if provided
        if author:
            title_page.extend([''] * 3)
            author_line = f"by {author}".center(self.page_width)
            title_page.append(author_line)
        
        # Fill the rest of the page
        while len(title_page) < self.page_height:
            title_page.append('')
        
        # Insert at the beginning
        self.pages.insert(0, '\n'.join(title_page))
    
    def generate_booklet(self) -> str:
        """
        Generate the complete booklet as a string.
        
        Returns:
            The formatted booklet content
        """
        booklet_content = []
        
        for i, page in enumerate(self.pages, 1):
            # Add page header
            page_header = f"{'=' * self.page_width}"
            page_number = f"Page {i}".center(self.page_width)
            page_separator = f"{'=' * self.page_width}"
            
            booklet_content.extend([page_header, page_number, page_separator, ''])
            booklet_content.append(page)
            booklet_content.extend(['', ''])
        
        return '\n'.join(booklet_content)
    
    def save_to_file(self, filename: str) -> None:
        """
        Save the booklet to a file.
        
        Args:
            filename: Output filename
        """
        content = self.generate_booklet()
        Path(filename).write_text(content, encoding='utf-8')
        print(f"Booklet saved to: {filename}")


def load_text_from_file(filename: str) -> str:
    """
    Load text content from a file.
    
    Args:
        filename: Input filename
        
    Returns:
        File content as string
        
    Raises:
        FileNotFoundError: If the file doesn't exist
        UnicodeDecodeError: If the file can't be decoded as UTF-8
    """
    try:
        return Path(filename).read_text(encoding='utf-8')
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        sys.exit(1)
    except UnicodeDecodeError:
        print(f"Error: Unable to read '{filename}' as UTF-8 text.")
        sys.exit(1)


def main():
    """Main function to handle command-line interface."""
    parser = argparse.ArgumentParser(
        description='Generate a formatted booklet from text content'
    )
    parser.add_argument(
        'input_file',
        nargs='?',
        help='Input text file (if not provided, reads from stdin)'
    )
    parser.add_argument(
        '-o', '--output',
        default='booklet.txt',
        help='Output filename (default: booklet.txt)'
    )
    parser.add_argument(
        '-t', '--title',
        help='Title for the booklet'
    )
    parser.add_argument(
        '-a', '--author',
        help='Author name for the title page'
    )
    parser.add_argument(
        '--width',
        type=int,
        default=80,
        help='Page width in characters (default: 80)'
    )
    parser.add_argument(
        '--height',
        type=int,
        default=50,
        help='Page height in lines (default: 50)'
    )
    
    args = parser.parse_args()
    
    # Create booklet generator
    generator = BookletGenerator(page_width=args.width, page_height=args.height)
    
    # Get input content
    if args.input_file:
        content = load_text_from_file(args.input_file)
    else:
        print("Reading from stdin... (Press Ctrl+D when finished)")
        content = sys.stdin.read()
    
    if not content.strip():
        print("Error: No content provided.")
        sys.exit(1)
    
    # Add title page if title is provided
    if args.title:
        generator.add_title_page(args.title, args.author)
    
    # Add content to booklet
    generator.add_content(content)
    
    # Generate and save booklet
    if not generator.pages:
        print("Error: No pages generated.")
        sys.exit(1)
    
    generator.save_to_file(args.output)
    print(f"Generated booklet with {len(generator.pages)} pages.")


if __name__ == '__main__':
    main()