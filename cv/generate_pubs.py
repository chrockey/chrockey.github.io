#!/usr/bin/env python3
"""Generate publications.tex from data/publications.json.

Output format: longtable rows for use inside a SectionTable environment.
Each publication becomes a row with year in the left column and
title/authors/venue in the right column.
"""

import json
import os

ME = "Chunghyun Park"

VENUES = {
    "CVPR": r"IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    "ICCV": r"IEEE/CVF International Conference on Computer Vision (ICCV)",
    "ECCV": r"European Conference on Computer Vision (ECCV)",
    "ICML": r"International Conference on Machine Learning (ICML)",
}

LATEX_SPECIAL = str.maketrans({
    "&": r"\&",
    "%": r"\%",
    "#": r"\#",
    "_": r"\_",
    "~": r"\textasciitilde{}",
})


def escape(text):
    return text.translate(LATEX_SPECIAL)


def render_pub(pub):
    """Render a single publication as a longtable row."""
    parts = []

    # Title
    parts.append(rf"\textbf{{{escape(pub['title'])}}}")

    # Authors
    equal = set(pub.get("equal", []))
    authors = []
    for i, name in enumerate(pub["authors"]):
        star = "*" if i in equal else ""
        escaped = escape(name)
        if name == ME:
            authors.append(rf"\underline{{{escaped}{star}}}")
        else:
            authors.append(f"{escaped}{star}")
    author_str = ", ".join(authors)
    if pub.get("etAl"):
        author_str += ", et al."
    parts.append(author_str)

    # Venue and year
    venue = VENUES.get(pub["venue"], pub["venue"])
    venue_line = rf"\textit{{{escape(venue)}}}"

    # Distinction only (Oral, Highlight, etc.) for CV
    for d in pub.get("distinction", []):
        venue_line += rf" \textit{{{escape(d)}}}"

    parts.append(venue_line)

    # Join with \newline for the right column content
    right_col = " \\newline\n".join(parts)

    # Build the full row: year & content \\
    return f"{pub['year']} & {right_col} \\\\"


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(script_dir, "..", "data", "publications.json")

    with open(json_path) as f:
        pubs = json.load(f)

    rows = [render_pub(pub) for pub in pubs]
    output = "\n\n".join(rows) + "\n"

    out_path = os.path.join(script_dir, "publications.tex")
    with open(out_path, "w") as f:
        f.write(output)

    print(f"Generated {out_path} with {len(pubs)} publications.")


if __name__ == "__main__":
    main()
