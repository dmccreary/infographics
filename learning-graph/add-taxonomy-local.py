"""Add TaxonomyID column to learning-graph.csv based on concept ranges."""
import csv

# Map concept ID ranges to taxonomy IDs
def get_taxonomy(cid):
    if cid <= 20:
        return "FOUND"
    elif cid <= 35:
        return "TAXON"
    elif cid <= 65:
        return "SLIDE"
    elif cid <= 80:
        return "FRAME"
    elif cid <= 97:
        return "CAUSE"
    elif cid <= 117:
        return "OVRLY"
    elif cid <= 139:
        return "JSLIB"
    elif cid <= 148:
        return "WEBFD"
    elif cid <= 170:
        return "MSIM"
    elif cid <= 181:
        return "GENAI"
    elif cid <= 191:
        return "TRACK"
    elif cid <= 200:
        return "MSIM"
    elif cid <= 213:
        return "ADVIZ"  # Data viz and design principles
    elif cid <= 234:
        return "LEARN"
    elif cid <= 250:
        return "WEBFD"  # Coordinates, viewport, events
    elif cid <= 266:
        return "WEBFD"  # JS programming concepts
    elif cid <= 276:
        return "ADVIZ"  # Images, accessibility
    elif cid <= 286:
        return "DEPLY"  # Markdown, MkDocs
    elif cid <= 292:
        return "DEPLY"  # Git, GitHub
    elif cid <= 305:
        return "WEBFD"  # Iframe security, responsive
    elif cid <= 314:
        return "TRACK"  # Analytics, testing
    elif cid <= 324:
        return "WEBFD"  # Design patterns, error handling
    elif cid <= 336:
        return "JSLIB"  # Chart types, dashboard
    elif cid <= 350:
        return "ADVIZ"  # Advanced diagram types
    return "MISC"

rows = []
with open("learning-graph.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        row["TaxonomyID"] = get_taxonomy(int(row["ConceptID"]))
        rows.append(row)

with open("learning-graph.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["ConceptID", "ConceptLabel", "Dependencies", "TaxonomyID"])
    writer.writeheader()
    for row in rows:
        writer.writerow(row)

print(f"Added TaxonomyID to {len(rows)} concepts")

# Print distribution
from collections import Counter
dist = Counter(r["TaxonomyID"] for r in rows)
for k, v in sorted(dist.items(), key=lambda x: -x[1]):
    print(f"  {k}: {v} ({v*100//len(rows)}%)")
