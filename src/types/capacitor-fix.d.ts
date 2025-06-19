// Fix for TypeScript errors by adding missing types
export enum StatusBarStyle {
  Dark = 'DARK',
  Light = 'LIGHT',
  Default = 'DEFAULT'
}

declare module '@capacitor/status-bar' {
  interface StatusBarPlugin {
    setStyle(options: { style: string }): Promise<void>;
    setBackgroundColor(options: { color: string }): Promise<void>;
    hide(): Promise<void>;
    show(): Promise<void>;
  }
}
