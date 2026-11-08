#!/usr/bin/env python3
"""Generate compact publication entries for the two-page LaTeX CV."""

import json
import os

ME = "Chunghyun Park"

LATEX_SPECIAL = str.maketrans({
    "&": r"\&",
    "%": r"\%",
    "#": r"\#",
    "_": r"\_",
    "~": r"\textasciitilde{}",
})


def escape(text):
    return text.translate(LATEX_SPECIAL)


def publication_category(pub):
    venue = pub["venue"]
    if "workshop" in venue.lower():
        return "W"
    if venue == "arXiv":
        return "P"
    if venue == "Digestive Endoscopy":
        return "J"
    if venue in {"CVPR", "ICCV", "ECCV", "ICML", "NeurIPS", "ICLR"}:
        return "C"
    raise ValueError(f"Assign a publication category for venue: {venue}")


def render_pub(pub, label):
    """Preserve the complete author list and contribution marks in a compact entry."""
    equal = set(pub.get("equal", []))
    second = set(pub.get("dagger", []))
    authors = []
    for i, name in enumerate(pub["authors"]):
        mark = r"\contribmark{\textasteriskcentered}" if i in equal else r"\contribmark{\textdagger}" if i in second else ""
        author = escape(name) + mark
        if name == ME:
            author = rf"\textbf{{{author}}}"
        authors.append(author)
    author_text = ", ".join(authors) + (", et al." if pub.get("etAl") else "")
    venue = f"{escape(pub['venue'])}, {pub['year']}"
    for distinction in pub.get("distinction", []):
        venue += f" ({escape(distinction.lower())})"
    return rf"\publication{{{label}}}{{{escape(pub['title'])}}}{{{author_text}}}{{{venue}}}"


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(script_dir, "..", "data", "publications.json")

    with open(json_path) as f:
        pubs = json.load(f)

    counters = dict.fromkeys(("J", "C", "P", "W"), 0)
    for pub in pubs:
        counters[publication_category(pub)] += 1
    rows = []
    for pub in pubs:
        category = publication_category(pub)
        rows.append(render_pub(pub, f"{category}{counters[category]}"))
        counters[category] -= 1
    output = "\n\n".join(rows) + "\n"

    out_path = os.path.join(script_dir, "publications.tex")
    with open(out_path, "w") as f:
        f.write(output)

    print(f"Generated {out_path} with {len(pubs)} publications.")


if __name__ == "__main__":
    main()
