export const PERMISSIONS = {
  ORG_MANAGE: 'org:manage',
  STATION_CREATE: 'station:create',
  STATION_UPDATE: 'station:update',
  STATION_DELETE: 'station:delete',
  DEVICE_REGISTER: 'device:register',
  DEVICE_UPDATE: 'device:update',
  TELEMETRY_VIEW: 'telemetry:view',
  ALERT_CONFIGURE: 'alert:configure',
  ALERT_VIEW: 'alert:view',
  USER_INVITE: 'user:invite',
  USER_REMOVE: 'user:remove',
} as const;
