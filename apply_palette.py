from pathlib import Path
import re

root = Path('src')
files = [p for p in root.rglob('*.css')]

palette_block = '''
:root {
  --bg: #fcfcfc;
  --surface: #fff;
  --surface-soft: #faf8f5;
  --surface-alt: #f5f5f4;
  --surface-muted: #f8f6f2;
  --surface-lighter: #f3f0ed;
  --surface-border: #ece7e0;
  --surface-border-soft: #e2ddd6;
  --border: #d5d9d9;
  --border-muted: #ddd6cf;
  --text: #2b2521;
  --text-high: #1a1a1a;
  --text-secondary: #5f564f;
  --text-fade: #909090;
  --accent: #8b5e3c;
  --accent-dark: #2b2521;
  --accent-strong: #bf5c00;
  --accent-soft: #e6ccb8;
  --accent-hover: #70472b;
  --black: #000;
  --white: #fff;
}
'''

replacements = {
    '#fcfcfc': 'var(--bg)',
    '#fafaf9': 'var(--surface)',
    '#f5f5f4': 'var(--surface-alt)',
    '#f7f7f7': 'var(--surface-soft)',
    '#f8f6f2': 'var(--surface-muted)',
    '#f8f8f8': 'var(--surface-soft)',
    '#faf8f5': 'var(--surface-soft)',
    '#f5f1eb': 'var(--surface-soft)',
    '#f3f0ed': 'var(--surface-lighter)',
    '#ece7e0': 'var(--surface-border)',
    '#e2ddd6': 'var(--surface-border-soft)',
    '#ddd6cf': 'var(--border-muted)',
    '#ece6df': 'var(--border-muted)',
    '#d5d9d9': 'var(--border)',
    '#fff': 'var(--surface)',
    '#000': 'var(--black)',
    '#333': 'var(--text-high)',
    '#111': 'var(--accent-dark)',
    '#22213d': 'var(--text)',
    '#2b2521': 'var(--accent-dark)',
    '#8b5e3c': 'var(--accent)',
    '#bf5c00': 'var(--accent-strong)',
    '#e6ccb8': 'var(--accent-soft)',
    '#909090': 'var(--text-fade)',
    '#777': 'var(--text-secondary)',
    '#555': 'var(--text-secondary)',
    '#6b4f3b': 'var(--accent-dark)',
    '#70472b': 'var(--accent-hover)',
    '#6b4527': 'var(--accent-dark)',
}

pattern = re.compile('|'.join(re.escape(k) for k in sorted(replacements, key=len, reverse=True)), re.IGNORECASE)

index_css = Path('src/index.css')
text = index_css.read_text()
if ':root {' not in text:
    index_css.write_text(palette_block + text)
    print('Added :root variables to src/index.css')
else:
    print(':root variables already present in src/index.css')

changed = []
for p in files:
    text = p.read_text()
    new_text = pattern.sub(lambda m: replacements[m.group(0).lower()], text)
    if new_text != text:
        p.write_text(new_text)
        changed.append(str(p))
print('Changed files:', len(changed))
for f in changed:
    print(f)
