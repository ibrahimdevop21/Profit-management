// Global type declarations for window functions
declare global {
  interface Window {
    switchLanguage: (button: HTMLButtonElement) => void;
    toggleMobileMenu: () => void;
  }
}

export {};
