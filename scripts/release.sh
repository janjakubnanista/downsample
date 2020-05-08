#!/usr/bin/env bash

OUTDIR=dist
VERSION=

# Get the script arguments
# 
# -o|--out-dir              Where to put the build
# -v|--version <version>    The version to use <UNUSED>
while [[ $# -gt 0 ]]; do
  OPTION="$1"

  case $OPTION in
      -o|--out-dir)
      OUTDIR=1
      shift # past argument
      shift # past value
      ;;
      -v|--version)
      VERSION="$2"
      shift # past argument
      shift # past value
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

# Clean the build folder
yarn clean

# Make sure everything is okay
yarn lint
yarn test

# Build the package
yarn build

# Lint the build
yarn lint:fix

# Copy all the metadata files to dist
cp LICENSE "$DIST_PATH/LICENSE"
cp package.json "$DIST_PATH/package.json"
cp *.md "$DIST_PATH/"

# Link the release
cd "$DIST_PATH"
yarn link

# Test the release
cd ../
cd "$TEST_PATH"
yarn link downsample
yarn
yarn test

cd ../
cd "$DIST_PATH"
npm publish --dry-run

read -p "Press anything to release to NPM"
npm publish