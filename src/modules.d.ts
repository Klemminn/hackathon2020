declare global {
  interface Window { fbAsyncInit: any; }
}

window.fbAsyncInit = window.fbAsyncInit || {}
