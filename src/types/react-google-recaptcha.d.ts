declare module 'react-google-recaptcha' {
  import { Component } from 'react';

  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    theme?: 'light' | 'dark';
    type?: 'image' | 'audio';
    tabindex?: number;
    onExpired?: () => void;
    onErrored?: () => void;
    onLoad?: () => void;
    size?: 'compact' | 'normal' | 'invisible';
    stoken?: string;
    hl?: string;
    badge?: 'bottomright' | 'bottomleft' | 'inline';
    isolated?: boolean;
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {
    reset(): void;
    execute(): void;
    executeAsync(): Promise<string>;
    getValue(): string | null;
  }
}

