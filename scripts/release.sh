#!/usr/bin/env bash

DRY_RUN=
QUIET=

# Get the script arguments
#
# -d|--dry-run        Don't publish, just peek
# -q|--quiet          Suppress user confirmation of publish (has no effect when dry-running)
while [[ $# -gt 0 ]]; do
  OPTION="$1"

  case $OPTION in
      -d|--dry-run)
      DRY_RUN=1
      shift # past argument
      ;;
      -q|--quiet)
      QUIET=1
      shift # past argument
      ;;
  esac
done

# Some file system information first
SCRIPTS_PATH=$(dirname $0)
ROOT_PATH="$SCRIPTS_PATH/.."
DIST_PATH="$ROOT_PATH/dist"
TEST_PATH="$ROOT_PATH/test"

set -e
set -x

# Link the release
cd "$DIST_PATH"
npm link

# Test the release
cd ../
cd "$TEST_PATH"
npm link downsample
npm install
npm test

cd ../
cd "$DIST_PATH"

if [ -z "$DRY_RUN" ]; then
  # Ask for confirmation before publishing
  if [ -z "$QUIET" ]; then
    read -p "Press anything to release to NPM"
  fi

  npm publish
else
  npm publish --dry-run
fi
