import { ReactNode } from 'react';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type UserData = {
  user: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token: string;
};

interface AuthContextType {
  user: any;
  token: string;
  signIn: (
    user: string,
    password: string,
    callback: VoidFunction,
    reject: VoidFunction
  ) => void;
  signOut: (callback: VoidFunction) => void;
}

type CancellablePromise<Data> = Promise<Data> & {
  cancellationUuid?: string;
};

interface IHttpRequest<
  Args extends Parameters<any> = Parameters<any>,
  ReturnType extends Promise<any> = any
> {
  loading: boolean;

  data: GetPromiseGeneric<ReturnType>;

  error: HttpError;

  call: (...args: Args) => ReturnType;

  cancel(): void;

  status: HttpRequestStatus;
}

type HttpRequestStatus = 'wait-call' | 'loading' | 'success' | 'error';

type HttpError = Error & {
  code: number;
  config: any;
  data: any;
};

type CancellablePromise<Data> = Promise<Data> & {
  cancellationUuid?: string;
};

type GetPromiseGeneric<P extends CancellablePromise<any>> =
  P extends CancellablePromise<infer T> ? T : unknown;

type MenuItem = {
  title: string;
  path: string;
  icon?: ReactNode;
  nested?: MenuItem[];
};

type MenuItems = MenuItem[];

type StreamParams = {
  audio: boolean;
  bitRateControl: string;
  bitrate: number;
  bitrateMode: string;
  fps: number;
  iFrameInterval: number;
  resolution: string;
  videoEncodeType: string;
  profile: string;
  vbrQuality: number;
};

type bitRateRange = {
  min: number;
  max: number;
};

type iFrameIntervalForEncodeType = {
  default_multiplyFps: number;
  max_multiplyFps: number;
  min: number;
};

type maxResolutionForEncodeType = {
  'H.264': number[];
  'H.265': number[];
};

type StreamRanges = {
  bitRateControl: string[];
  bitrate: number[][];
  bitrateDefault: number[][];
  bitrateMode: string[];
  customBitrates: bitRateRange[];
  fps: number[][];
  iFrameIntervalForEncodeType: iFrameIntervalForEncodeType[];
  maxResolutionForEncodeType: maxResolutionForEncodeType;
  resolution: string[];
  videoEncodeType: string[];
  vbrQuality: MinMax;
  noBitRateForEncodeType: string[];
  codecProfile: {
    [string]: string[];
  };
};

export interface IPropseSnackbarEvent {
  type: string;
  data: any;
}

export interface IPropseSnackbarEventSave extends IPropseSnackbarEvent {
  action: (props?: any) => Promise<void>;
}
export interface IPropseSnackbarEventClose extends IPropseSnackbarEvent {
  action: (props?: any) => void;
  message: string;
}

type CancellablePromise<Data> = Promise<Data> & {
  cancellationUuid?: string;
};

type GetPromiseGeneric<P extends CancellablePromise<any>> =
  P extends CancellablePromise<infer T> ? T : unknown;

type MinMax = {
  min: number;
  max: number;
};

type BackLightMode = 'wdr' | 'hlc' | 'blc' | 'off';

type BlcLightArea = 'top' | 'left' | 'right' | 'down' | 'center';

type IrCutFilterMode = 'day' | 'night' | 'auto' | 'schedule';

type IrLedMode = 'off' | 'adaptive' | 'manual';

type DnrMode = 'auto' | 'off' | 'manual';

type ExposureType = 'auto' | 'manual';

type ImageSettingMode = 'fullColor' | 'dayNight' | 'schedule';

type VideoDirection = 'none' | 'vertical' | 'horizontal' | 'both';

type VideoRotation = '0' | '90' | '180' | '270';

type WhiteBalanceMode = 'auto' | 'manual';

type WhiteLedMode = 'adaptive' | 'manual';

type whiteLightMode = 'off' | 'auto' | 'schedule';

type IrLed = {
  irLedManualStrength: number;
  irLedMode: IrLedMode;
};

type IrLedRange = {
  irLedManualStrength: MinMax;
  irLedMode: IrLedMode[];
};

type BackLight = {
  backLightMode: BackLightMode;
  blcLevel: number;
  blcLightArea: BlcLightArea;
  hlcLevel: number;
  wdrLevel: number;
};

type BackLightRange = {
  backLightMode: BackLightMode[];
  blcLevel: MinMax;
  blcLightArea: BlcLightArea[];
  hlcLevel: MinMax;
  wdrLevel: MinMax;
};

type DayNight = {
  irCutFilterAutoDelay: number;
  irCutFilterAutoSensitivity: number;
  irCutFilterMode: IrCutFilterMode;
  irLed: IrLed;
  schedule: number[][];
};

type DayNightRange = {
  irCutFilterAutoDelay: MinMax;
  irCutFilterAutoSensitivity: MinMax;
  irCutFilterMode: IrCutFilterMode[];
  irLed: IrLedRange;
  schedule: number[][];
};

type DNR = {
  dnrManualLevel: number;
  dnrMode: DnrMode;
};

type DNRRange = {
  dnrManualLevel: MinMax;
  dnrMode: DnrMode[];
};

type Exposure = {
  exposureTime: string;
  exposureType: ExposureType;
};

type ExposureRange = {
  exposureTime: string[];
  exposureType: ExposureType[];
};

type PicCorrection = {
  brightness: number;
  contrast: number;
  hue: number;
  saturation: number;
  sharpness: number;
};

type PicCorrectionRange = {
  brightness: MinMax;
  contrast: MinMax;
  hue: MinMax;
  saturation: MinMax;
  sharpness: MinMax;
};

type WhiteBalance = {
  blueGain: number;
  greenGain: number;
  redGain: number;
  whiteBalanceMode: WhiteBalanceMode;
};

type WhiteBalanceRange = {
  blueGain: MinMax;
  greenGain: MinMax;
  redGain: MinMax;
  whiteBalanceMode: WhiteBalanceMode[];
};

type WhiteLed = {
  whiteLedManualStrength: number;
  whiteLedMode: WhiteLedMode;
};

type WhiteLedRange = {
  whiteLedManualStrength: MinMax;
  whiteLedMode: WhiteLedMode[];
};

type WhiteLight = {
  schedule: number[][];
  whiteLightAutoSensitivity: number;
  whiteLightMode: whiteLightMode;
};

type WhiteLightRange = {
  whiteLightAutoSensitivity: MinMax;
  whiteLightMode: whiteLightMode[];
};

type ImageParams = {
  backLight: BackLight;
  dayNight: DayNight;
  dnr: DNR;
  exposure: Exposure;
  flickerMode: string;
  imageSettingMode: ImageSettingMode;
  picCorrection: PicCorrection;
  schedule: number[][];
  videoDirection: VideoDirection;
  videoRotation: VideoRotation;
  whiteBalance: WhiteBalance;
  whiteLed: WhiteLed;
  whiteLight: WhiteLight;
};

type ImageParamsRanges = {
  backLight: BackLightRange;
  dayNight: DayNightRange;
  dnr: DNRRange;
  exposure: ExposureRange;
  flickerMode: string[];
  imageSettingMode: ImageSettingMode[];
  picCorrection: PicCorrectionRange;
  videoDirection: VideoRotation[];
  videoRotation: VideoRotation[];
  whiteBalance: WhiteBalanceRange;
  whiteLed: WhiteLedRange;
  whiteLight: WhiteLightRange;
};

type PreviewMode = 'video' | 'image';

type SuccessCallBack = {
  message: string;
};

type IPV4Data = {
  dhcpEnabled: boolean;
  dns1: string;
  dns2: string;
  gateway: string;
  ip: string;
  mask: string;
};

type NetworkData = {
  ipv4: IPV4Data;
  isIpv6Supported: boolean;
};

type VerifyIpData = {
  ipv4?: string;
  ipv6?: string;
};

type IpVerifyStatus = {
  hasError: boolean;
  message: string;
};

type HttpCfg = {
  port: number;
};

type HttpsCfg = {
  port: number;
};

type RtspCfg = {
  isActive: boolean;
  isAuthEnabled: boolean;
  port: number;
};

type ProtocolsData = {
  httpCfg: HttpCfg;
  httpsCfg: HttpsCfg;
  rtspCfg: RtspCfg;
};

type RtspUrlData = {
  rtsp: string;
  rtspHint: string;
};

type RtspUrlsData = {
  [key: string]: {
    [key: string]: RtspUrlData;
  };
};

type SslStatus = {
  isDefaultCertificate: boolean;
};

type SslData = {
  certificate: string;
  key: string;
};

type UserPermissionsData = {
  rtsp: boolean;
  onvif: boolean;
  ptz: boolean;
  live: boolean;
  parametersModification: boolean;
  playback: boolean;
};

type User = {
  username?: string;
  password?: string;
  permissions?: UserPermissionsData;
};

type UsersData = {
  [key: string]: User;
};

type UpdatePermissionsData = {
  username: string;
  permissions: UserPermissionsData;
};

type UpdatePasswordData = UserData;

type AboutData = {
  cpu_load: number;
  cpu_temp: number;
  cpu_uptime: number;
  mac_addr: string;
  model: string;
  sn: string;
  sw: string;
};

type DateTimeData = {
  date: string;
  dateFormat: string;
  time: string;
  timeFormat: number;
  timeZone: string;
  ntpSync: boolean;
  ntpServAddr: string;
};

type DateTimeRangesData = {
  dateFormat: string[];
  server: string[];
  timeFormat: number[];
  timeZone: string[];
};

type TitlesData = {
  nameCoord: {
    enabled: boolean;
    name: string;
    x: number;
    y: number;
  };
  timeCoord: {
    enabled: boolean;
    x: number;
    y: number;
  };
};

type AudioData = {
  codecType: string;
  inputVolume: number;
};

type AudioRangeData = {
  codecType: string;
  inputVolume: number;
};

type FeaturesData = {
  contactClosure: boolean;
  disks: boolean;
  email: boolean;
  hiddenAreas: boolean;
  ipFilter: boolean;
  motionDetector: boolean;
  recording: boolean;
  titles: boolean;
  whiteLight: boolean;
  focusZoom: boolean;
  vipnet: boolean;
  baseIPC: boolean;
  model: boolean;
};

type AvailableReset = string[
  | 'Network'
  | 'DateTime'
  | 'Title'
  | 'Picture'
  | 'Protocols'
  | 'Audio'
  | 'SSLSert'
  | 'Users'
  | 'Encode'];

type configJSON = {
  version: string;
};

type MotionData = {
  enabled: boolean;
  sensitivity: number;
  activeCellsMask: string;
};

type MotionActiveCellData = {
  columns: number;
  rows: number;
};

type MotionRanges = {
  sensitivity: MinMax;
  activeCells: MotionActiveCellData;
};

type AutoRebootSetupData = {
  autoReboot: boolean;
  day: number;
  periodMode: string;
  timeReboot: string;
  week: number;
};

type AutoRebootSetupRange = {
  periodMode: string[];
};

type coverType = string['solid' | 'mosaic'];

type coverTypeMosaicParams = {
  blockSize: MinMax;
};

type coverTypeSolidParams = {
  alpha: MinMax;
};

type HiddenAreaRange = {
  coverType: coverType;
  coverTypeMosaicParams: coverTypeMosaicParams;
  coverTypeSolidParams: coverTypeSolidParams;
  maxElements: number;
};

type XY = {
  x: number;
  y: number;
};

type HiddenAreaData = {
  canDraw: boolean;
  coverType: string;
  coverTypeMosaicParams: {
    blockSize: number;
  };
  coverTypeSolidParams: {
    alpha: number;
    color: number;
  };
  isEnabled: boolean;
  point: XY[];
};

type HiddenAreasData = HiddenAreaData[];

type MoveZoomData = {
  type: string;
  velocity?: number;
  position?: number;
};

type ZoomStatusData = {
  position: number;
};

type FocusStatusData = ZoomStatusData;

type MoveFocusData = MoveZoomData;

type FocusTrigger = {
  velocity: number;
};

type ZoomType = 'continuous' | 'absolute' | 'relative';

type FocusType = ZoomType;

type RecordData = {
  enabled: boolean;
  segmentLength: number;
  stream: string;
};

type RecordRanges = {
  segmentLength: MinMax;
  stream: string[];
};

type CardMemoryData = {
  free: number;
  total: number;
};

type CardStatus = {
  status:
    | 'recording'
    | 'found'
    | 'notFound'
    | 'needFormat'
    | 'error'
    | 'formatting';
};

type VipnetStatus = {
  isKeysInstalled: boolean;
  isVpnEnabled: boolean;
  keyErrorMsg: boolean;
  isWaitingStartConfirmation: boolean;
};

type VipnetOwnNodeInfo = {
  id: string;
  ip: string;
  licenseExpirationTime: string;
  name: string;
};

type VipnetNodeInfo = {
  id: string;
  ip: string;
  name: string;
  type: string;
};

type NodeStatusData = {
  message: string;
  code: number;
  replyTime: number;
};

type NodesStatusData = {
  [string]: NodeStatusData;
};
