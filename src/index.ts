export * from './types';

import { ASAP, createASAP } from './methods/ASAP';
import { LTD, createLTD } from './methods/LTD';
import { LTOB, createLTOB } from './methods/LTOB';
import { LTTB, createLTTB } from './methods/LTTB';
import { SMA, createSMA } from './methods/SMA';

export { ASAP, createASAP } from './methods/ASAP';
export { LTD, createLTD } from './methods/LTD';
export { LTOB, createLTOB } from './methods/LTOB';
export { LTTB, createLTTB } from './methods/LTTB';
export { SMA, createSMA } from './methods/SMA';

export default { ASAP, LTD, LTOB, LTTB, SMA, createASAP, createLTD, createLTOB, createLTTB, createSMA };
