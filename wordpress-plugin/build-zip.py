#!/usr/bin/env python3
"""
Build astroeshop-api.zip for upload through WordPress -> Plugins -> Add New.

Run from anywhere:   python wordpress-plugin/build-zip.py

WHY A SCRIPT: WordPress runs on Linux and needs forward-slash paths inside the
zip, with the plugin folder at the archive root. PowerShell's Compress-Archive
writes Windows backslashes into entry names ("astroeshop-api\\astroeshop-api.php"),
which Linux reads as one filename containing a literal backslash. WordPress then
unpacks a triple-nested mess and activation fails with "Plugin file does not
exist." - that happened on the very first deploy of this plugin. Python's zipfile
always writes "/" and this script refuses to produce an archive with "\\" in it.
"""

import os
import sys
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "astroeshop-api")
OUT = os.path.join(HERE, "astroeshop-api.zip")

# Anything matching these never belongs in the uploaded plugin.
SKIP_NAMES = {".DS_Store", "Thumbs.db"}
SKIP_SUFFIXES = (".zip", ".pyc", ".swp", "~")


def main() -> int:
    if not os.path.isdir(SRC):
        print(f"error: plugin folder not found: {SRC}", file=sys.stderr)
        return 1

    if os.path.exists(OUT):
        os.remove(OUT)

    written = []
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, _dirs, files in os.walk(SRC):
            for name in sorted(files):
                if name in SKIP_NAMES or name.endswith(SKIP_SUFFIXES):
                    continue
                full = os.path.join(root, name)
                # Archive path relative to the wordpress-plugin/ dir, so the
                # plugin folder itself is the zip root - exactly what WP expects.
                rel = os.path.relpath(full, HERE)
                arc = "/".join(rel.split(os.sep))
                zf.write(full, arc)
                written.append(arc)

    # Self-check: the entire reason this script exists.
    with zipfile.ZipFile(OUT) as zf:
        names = zf.namelist()
    bad = [n for n in names if "\\" in n]
    if bad:
        os.remove(OUT)
        print("error: backslashes ended up in the archive - refusing to ship it:", file=sys.stderr)
        for n in bad:
            print("  " + repr(n), file=sys.stderr)
        return 1
    if not any(n == "astroeshop-api/astroeshop-api.php" for n in names):
        os.remove(OUT)
        print("error: astroeshop-api/astroeshop-api.php is not at the archive root", file=sys.stderr)
        return 1

    size_kb = os.path.getsize(OUT) / 1024
    print(f"built {OUT} ({size_kb:.1f} KB)")
    for n in names:
        print("  " + n)
    print("OK - forward slashes, plugin folder at root. Upload via Plugins -> Add New -> Upload Plugin.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
