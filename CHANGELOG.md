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