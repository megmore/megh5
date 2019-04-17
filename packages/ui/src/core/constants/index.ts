import { VNodeData } from 'vue'

export enum Mode {
  light = 'light',
  night = 'night'
}

export type mode = 'light' | 'night'

export enum UiMode {
  x = 'x',
  y = 'y',
  xy = 'xy',
  none = 'none'
}

export type uiMode = 'x' | 'y' | 'xy' | 'none'

export interface PropTypeLink {
  text: string
  href: string
}

export interface KV {
  [field: string]: any
}

export type settingType = 'text' | 'image' | 'url' | 'size' | 'urlParam' | 'i18n' | 'link' | 'color'

export type positionType = 'relative' | 'absolute' | 'fixed'

export interface UiNodeData extends VNodeData {
  props?: {
    // 基础参数
    position?: positionType
    x?: number | string
    y?: number | string
    height?: number | string
    width?: number | string
    // 组件拓展参数
    bgImg?: string
    text?: string
    logo?: string,
    termsLink?: PropTypeLink,
    policyLink?: PropTypeLink,
    copyright?: string
    [field: string]: any
  }
  style?: {
    [field: string]: any
  }
}

export interface UiNodeConfig {
  disabled?: boolean
  moveMode?: uiMode
  sizeMode?: uiMode
}

export interface UiNode {
  name: string
  uid: string
  pid: string
  locked: boolean
  uiConfig?: UiNodeConfig
  nodeData: UiNodeData
  children: UiNode []
}

interface SettingTypeOpts {
   type: settingType
   text: string
   extra?: any
}

export interface UiModule extends UiNode {
  title: string
  cover: string
  nodeConfig?: {
    width: SettingTypeOpts
    height: SettingTypeOpts
    x: SettingTypeOpts
    y: SettingTypeOpts
    bgColor: SettingTypeOpts
    logo: SettingTypeOpts
    termsLink: SettingTypeOpts
    policyLink: SettingTypeOpts
    copyright: SettingTypeOpts
    [field: string]: SettingTypeOpts
  },
}

export interface ProjectData {
  name: string
  version: string
  dependencies: any
  mainUid: string,
  UiNodes: UiNode [],
  Device: {
    width: number,
    height: number
  }
}
