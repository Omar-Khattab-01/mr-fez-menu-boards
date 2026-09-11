"""Check seed integrity and source-linked constraints without fixing values silently."""
import json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
m = json.loads((root / 'dist/data/menu.json').read_text())
ids = {s['id'] for s in m['screens']}
assert len(ids) == 4
assert {s['physicalPosition'] for s in m['screens']} == {1, 2, 3, 4}
assert len({i['id'] for i in m['items']}) == len(m['items'])
assets = {a['id'] for a in m['assets']}
for i in m['items']:
    assert i['screenId'] in ids
    assert i['imageAssetId'] in assets
    assert i['source']['file'] in {'IMG_0490.HEIC','IMG_0491.HEIC','IMG_0492.HEIC','IMG_0493.HEIC'}
    prices = [i['price']] + [v['price'] for v in i['variants']]
    if i['combo']:
        prices.append(i['combo']['priceDelta'])
    assert all(p is None or isinstance(p, (int, float)) and p >= 0 for p in prices)
    assert isinstance(i['visible'], bool) and isinstance(i['available'], bool)
for f in ['index.html','style.css','app.js','extraction.md','assets-needed.md','wall-timing.js','sync-setup.md','assets/shawarma-fire.png','assets/flame-band.png']:
    assert (root / 'dist' / f).is_file(), f
print(f"Validated {len(m['items'])} products across four configurable screens.")
