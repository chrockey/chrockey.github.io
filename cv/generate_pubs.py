#!/usr/bin/env python3
"""Generate publications.tex from data/publications.json."""

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
    lines = []

    # Title
    lines.append(rf"\textbf{{{escape(pub['title'])}}}" + r" \\")

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
    lines.append(author_str + r" \\")

    # Venue
    venue = VENUES.get(pub["venue"], pub["venue"])
    lines.append(rf"\emph{{{escape(venue)}}}, {pub['year']}")

    # Awards
    for award in pub.get("awards", []):
        lines.append(r"\\")
        lines.append(rf"\textcolor{{red}}{{\textbf{{{escape(award)}}}}}")

    return "\n".join(lines)


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(script_dir, "..", "data", "publications.json")

    with open(json_path) as f:
        pubs = json.load(f)

    blocks = [render_pub(pub) for pub in pubs]
    output = "\n\n\\bigskip\n\n".join(blocks) + "\n"

    out_path = os.path.join(script_dir, "publications.tex")
    with open(out_path, "w") as f:
        f.write(output)

    print(f"Generated {out_path} with {len(pubs)} publications.")


if __name__ == "__main__":
    main()
