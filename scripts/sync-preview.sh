#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d /tmp/geodesic-preview-sync.XXXXXX)"
TARGET_BRANCH="${1:-main}"
TARGET_REMOTE="${PREVIEW_REMOTE:-preview}"
SOURCE_REF="${PREVIEW_SOURCE_REF:-website-v2}"
DEFAULT_BRANCH="${PREVIEW_DEFAULT_BRANCH:-main}"

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

if ! git -C "$ROOT_DIR" remote get-url "$TARGET_REMOTE" >/dev/null 2>&1; then
  echo "Missing git remote '$TARGET_REMOTE'." >&2
  exit 1
fi

SOURCE_COMMIT="$(git -C "$ROOT_DIR" rev-parse "$SOURCE_REF")"

echo "Exporting $SOURCE_REF ($SOURCE_COMMIT) to temporary repo..."
git -C "$ROOT_DIR" archive "$SOURCE_REF" | tar -x -C "$TMP_DIR"

git -C "$TMP_DIR" init -b "$DEFAULT_BRANCH" >/dev/null

WORKFLOW_PATH="$TMP_DIR/.github/workflows/deploy-branch-preview.yml"
if [[ -f "$WORKFLOW_PATH" ]]; then
  python3 - "$WORKFLOW_PATH" "$TARGET_BRANCH" <<'PY2'
from pathlib import Path
import sys
path = Path(sys.argv[1])
branch = sys.argv[2]
text = path.read_text()
text = text.replace("      - website-v2", f"      - {branch}")
path.write_text(text)
PY2
fi

git -C "$TMP_DIR" config user.name "$(git -C "$ROOT_DIR" config user.name)"
git -C "$TMP_DIR" config user.email "$(git -C "$ROOT_DIR" config user.email)"

git -C "$TMP_DIR" add .
git -C "$TMP_DIR" commit -m "Preview sync from ${SOURCE_REF} (${SOURCE_COMMIT:0:7})" >/dev/null

git -C "$TMP_DIR" branch -M "$TARGET_BRANCH"
git -C "$TMP_DIR" remote add origin "$(git -C "$ROOT_DIR" remote get-url "$TARGET_REMOTE")"

echo "Pushing preview snapshot to ${TARGET_REMOTE}/${TARGET_BRANCH}..."
git -C "$TMP_DIR" push --force origin "$TARGET_BRANCH"

echo "Preview repo updated from $SOURCE_REF."
