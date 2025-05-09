// src/utils/mask.ts
export function maskAddress(address: string, head = 4, tail = 4): string {
    if (address.length <= head + tail) return address;
    return `${address.slice(0, head)}…${address.slice(-tail)}`;
  }
  