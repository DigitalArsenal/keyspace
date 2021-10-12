import pbkdf2 from "pbkdf2/browser";

globalThis.addEventListener('message', (e) => {
    let { username, password, pin } = e.data;
    let derivedKey = pbkdf2.pbkdf2Sync(
        username,
        password,
        parseInt(pin),
        32,
        "sha256"
    );
    globalThis.postMessage(derivedKey);
})