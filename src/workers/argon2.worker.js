import * as argon2 from "argon2-browser/dist/argon2-bundled.min.js";

globalThis.addEventListener('message', async (e) => {
    let { username, password, pin, entropyLength } = e.data;
    let derivedKey = await argon2.hash({
        pass: username,
        salt: password,
        time: parseInt(pin),
        mem: 1024 * 10,
        hashLen: entropyLength,
        type: argon2.ArgonType.Argon2id
    }
    );
    globalThis.postMessage(derivedKey.hash);
})