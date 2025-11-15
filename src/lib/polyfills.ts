// Ensure server-side rendering runs without Node's experimental localStorage getter.
const globalObject = globalThis as typeof globalThis & { localStorage?: Storage };

if (typeof window === 'undefined') {
  const descriptor = Object.getOwnPropertyDescriptor(globalObject, 'localStorage');

  if (descriptor) {
    try {
      // Node 22+ exposes a configurable accessor that throws without --localstorage-file.
      Reflect.deleteProperty(globalObject, 'localStorage');
    } catch {
      // As a fallback, replace the accessor with an undefined value.
      Object.defineProperty(globalObject, 'localStorage', {
        value: undefined,
        writable: true,
        configurable: true,
      });
    }
  }
}
