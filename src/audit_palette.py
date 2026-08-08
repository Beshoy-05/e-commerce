from pathlib import Path
import re

root = Path(__file__).resolve().parent
src = root / 'src'
css_files = sorted(src.rglob('*.css'))
pattern = re.compile(r'(?:#(?:[0-9a-fA-F]{3}){1,2}|rgba?\([^)]*\)|hsla?\([^)]*\)|\bwhite\b|\bblack\b|\btransparent\b|var\(--[^)]+\))')

def is_palette_var(token: str) -> bool:
    return token.startswith('var(--color-')

for path in css_files:
    rel = path.relative_to(src)
    text = path.read_text(encoding='utf-8')
    for i, line in enumerate(text.splitlines(), 1):
        if any(k in line for k in ['color', 'background', 'border', 'box-shadow', 'outline', 'shadow', 'fill', 'stroke']):
            for match in pattern.finditer(line):
                tok = match.group(0)
                if is_palette_var(tok):
                    continue
                if tok.startswith('var(--') or tok.startswith('#') or tok.lower() in ('white', 'black', 'transparent') or tok.startswith('rgb(') or tok.startswith('rgba(') or tok.startswith('hsl(') or tok.startswith('hsla('):
                    print(f'FILE:{rel} LINE:{i} TOKEN:{tok} LINE:{line.strip()}')
                    break
