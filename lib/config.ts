import { SignOptions } from 'jsonwebtoken';

export interface ConnectionConfig {
  host?: string,
  port?: number,
}

export interface CommConfig {
  port?: number,
}

export interface DBConfig extends ConnectionConfig {
  user?: string,
  password?: string,
  database?: string,
  connectionLimit?: number,
}

export interface RedisConfig extends ConnectionConfig {
}

export interface JWTConfig {
  secret: string,
  options: {
    refresh?: SignOptions,
    access?: SignOptions,
    cert?: SignOptions,
  }
}

export interface AESConfig {
  key?: Array<number>,
  counter?: number,
}

interface SMSOptions {
  limit?: number,
  refresh?: number,
}

export interface SMSConfig {
  total?: SMSOptions,
  user?: SMSOptions,
}

export interface BotConfig {
  key?: string,
  robot?: string,
}

export interface FileConfig {
  path?: string,
}

export interface FCMConfig {
  serverKey?: string,
}

export interface VimeoConfig {
  clientId?: string,
  clientSecret?: string,
  accessToken?: string,
  uploadPath?: string,
}

interface RequestOptions {
  hostname?: string,
  protocol?: string,
  port?: number,
  timeout?: number,
}

export interface AdaptConfig {
  common?: RequestOptions,
  barune?: RequestOptions,
}

export interface RollBannerConfig {
  path?: string,
}

export interface UtilConfig {
  comm?: CommConfig,
  db?: DBConfig,
  redis?: RedisConfig,
  jwt?: JWTConfig,
  aes?: AESConfig,
  sms?: SMSConfig,
  bot?: BotConfig,
  file?: FileConfig,
  fcm?: FCMConfig,
  vimeo?: VimeoConfig,
  adapt?: AdaptConfig,
  rollbanner?: RollBannerConfig,
}