import { writable, get } from "svelte/store";
import pbkdf2Worker from "../workers/pbkdf2.worker.js?worker&inline";
import argon2Worker from "../workers/argon2.worker.js?worker&inline";

export const hashAlgorithms = {
    argon2: argon2Worker,
    pbkdf2: pbkdf2Worker
}

export const pkBuffer = writable(null);
export const keyPair = writable(null);
export const hashAlgorithm = writable("argon2");

export const hashAlgorithmWorker = writable(hashAlgorithms[get(hashAlgorithm)]);

hashAlgorithm.subscribe(hA => {
    hashAlgorithmWorker.update(hAW => hashAlgorithms[hA]);
    pkBuffer.update(pkB => null);
});