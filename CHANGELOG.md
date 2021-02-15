# Changelog

## v1.1.0

- `downsample` now supports tree shaking and partial imports:

  ```typescript
  // Instead of importing from the bundle
  import { LTD } from 'downsample';

  // You can now import only the bits you want
  import { LTD } from 'downsample/methods/LTD';
  ```

## 1.2.0

- `ASAP` and `SMA` methods

## 1.3.0

- Added missing `SMA` export
- Added downampling function factories (`createASAP`, `createLTD` etc.)
- Fixed a typo in API docs

## 1.4.0

- Added support for `TypedArray` types (`Int8Array`, `Int16Array`, `Int32Array`, `Uint8Array`, `Uint8ClampedArray`, `Uint16Array`, `Uint32Array`, `Float32Array`, `Float64Array`)
