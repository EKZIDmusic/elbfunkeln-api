#!/bin/bash

echo "🔧 Fixing ALL TypeScript strict property initialization errors..."

# Find all entity files
find src -name "*.entity.ts" -type f | while read file; do
    echo "Processing: $file"

    # Create temporary file
    temp_file="${file}.tmp"

    # Read file line by line and fix properties
    while IFS= read -r line; do
        # Check if line is a property declaration (has : but not ! before it)
        # and is not a constructor parameter or method
        if [[ $line =~ ^[[:space:]]+[a-zA-Z_][a-zA-Z0-9_]*:[[:space:]] ]] && \
           [[ ! $line =~ ! ]] && \
           [[ ! $line =~ constructor ]] && \
           [[ ! $line =~ \( ]]; then
            # Add ! after property name
            echo "$line" | sed 's/\([a-zA-Z_][a-zA-Z0-9_]*\):/\1!:/g'
        else
            echo "$line"
        fi
    done < "$file" > "$temp_file"

    # Replace original file
    mv "$temp_file" "$file"

    echo "✓ Fixed: $file"
done

echo ""
echo "✅ All entity files have been fixed!"
