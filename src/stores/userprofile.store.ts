import { writable, get } from "svelte/store";
import pbkdf2Worker from "../workers/pbkdf2.worker.js?worker&inline";
import argon2Worker from "../workers/argon2.worker.js?worker&inline";
import type workerGenerator from '*?worker&inline';
import type { Writable } from "svelte/store";

interface WorkerGeneratorHash {
  [index: string]: typeof workerGenerator
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



hashAlgorithm.subscribe((hA) => {
  hashAlgorithmWorker.update((hAW) => hashAlgorithms[hA]);
  masterNode.update((pkB) => null);
});
