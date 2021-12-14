import { writable, get } from "svelte/store";
import pbkdf2Worker from "../workers/pbkdf2.worker.js?worker&inline";
import argon2Worker from "../workers/argon2.worker.js?worker&inline";
import type workerGenerator from '*?worker&inline';
import type { Writable } from "svelte/store";

interface WorkerGeneratorHash {
  [index: string]: typeof workerGenerator
}

export enum Bip32Hardened {
  NonHardened = "",
  Hardened = "'"
}

export interface Bip32PathSegment {
  value: number;
  h: Bip32Hardened;
}

export interface Bip32Path {
  purpose: Bip32PathSegment,
  cointype: Bip32PathSegment,
  account?: Bip32PathSegment,
  change?: Bip32PathSegment,
  address_index?: Bip32PathSegment
}

export const hashAlgorithms: WorkerGeneratorHash = {
  argon2: argon2Worker,
  pbkdf2: pbkdf2Worker
};

export const masterNode = writable(null);
export const xpubMasterNode = writable(null);
export const xprivMasterNode = writable(null);
export const Seed = writable(null);
export const bip39Phrase = writable(null);
export const entropyLength = writable(16);
export const hashAlgorithm = writable("argon2");
export const hashAlgorithmWorker = writable(hashAlgorithms[get(hashAlgorithm)]);
export const isLoggedIn = writable(false);

const checkLoggedIn = () => {
  isLoggedIn.set(!!(get(masterNode) || get(xpubMasterNode) || get(xprivMasterNode)));
}

[xpubMasterNode, xprivMasterNode, masterNode].map(n => n.subscribe(checkLoggedIn))

hashAlgorithm.subscribe((hA) => {
  hashAlgorithmWorker.update((hAW) => hashAlgorithms[hA]);
  masterNode.update((pkB) => null);
});


/**
 * Bitcoin Ops
 * 
 */

export const purposes = [44, 49, 84];
export const cointypes = [0 /*BTC*/];

export const exBip32Path: Bip32Path = {
  purpose: { value: 44, h: "'" as Bip32Hardened },
  cointype: { value: 0, h: "'" as Bip32Hardened },
  account: { value: 0, h: "'" as Bip32Hardened },
  change: { value: 0, h: "" as Bip32Hardened },
  address_index: { value: 0, h: "" as Bip32Hardened },
};

export const getBIP32Path = (inputPath) => {
  let b = Object.entries(inputPath);
  let x = (pathSegment) => `${pathSegment.value}${pathSegment.h}`;
  let accountPath = b
    .map((pV) => {
      console.log(pV);
      return x(pV[1]);
    })
    .join("/");

  return `m/${accountPath}`;
};