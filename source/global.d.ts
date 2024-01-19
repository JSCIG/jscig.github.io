declare module '*.module.css' {
  const map: Record<string, string>;
  export = map;
}
declare module '*.module.less' {
  const map: Record<string, string>;
  export = map;
}

declare module 'browser-unhandled-rejection' {
  export function auto(): any;
}
