# chrockey.github.io

Personal academic website. Deployed via GitHub Pages.

## CV

The CV is written in LaTeX (`cv/cv.tex`). Publications are auto-generated from `data/publications.json` via `cv/generate_pubs.py`.

A **pre-commit hook** (`.git/hooks/pre-commit`) automatically compiles the PDF and stages `pdf/cv.pdf` whenever `cv/` or `data/publications.json` is modified. To set it up on a new clone:

```sh
cp hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```
