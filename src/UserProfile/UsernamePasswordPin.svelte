<script>
  import pbkdf2Worker from "./workers/pbkdf2.worker.js?worker&inline";
  import argon2Worker from "./workers/argon2.worker.js?worker&inline";

  let username,
    password,
    pin,
    derivedKey,
    passwordRules = `At least 1 Uppercase
At least 1 Lowercase
At least 1 Number
At least 1 Symbol, !@#$%^&*_=+-`,
    pinLength = [1, 15];
  const showPasswordError = (e) => {
    e.target.setCustomValidity(passwordRules);
  };
  const showPINError = (e) => {
    e.target.setCustomValidity(
      `PIN should be between ${pinLength[0]} and ${pinLength[1]} numerals`
    );
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const pWorker = new pbkdf2Worker();
    const aWorker = new argon2Worker();

    pWorker.postMessage({ username, password, pin: parseInt(pin) });
    pWorker.addEventListener("message", (e) => {
      console.log("pbkdf2", e.data);
    });

    aWorker.postMessage({ username, password, pin: parseInt(pin) });
    aWorker.addEventListener("message", (e) => {
      console.log("argon2", e.data);
    });
  };
</script>

<form on:submit={handleOnSubmit} method="post" class="mt-8 mb-4">
  <div class="mb-4">
    <label for="userEmail" class="sr-only">Email address</label>
    <input
      bind:value={username}
      class="border-solid border border-gray-400 rounded px-2 py-3"
      type="email"
      id="userEmail"
      placeholder="Email address"
      required />
  </div>
  <div class="mb-4">
    <label for="userEmail" class="sr-only">Password</label>
    <input
      bind:value={password}
      class="border-solid border border-gray-400 rounded px-2 py-3"
      type="password"
      id="userPass"
      pattern={String.raw`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$`}
      placeholder="Password"
      minlength="16"
      title={passwordRules}
      required />
  </div>
  <div class="mb-4">
    <label for="PIN" class="sr-only">PIN</label>
    <input
      bind:value={pin}
      class="border-solid border border-gray-400 rounded px-2 py-3"
      type="password"
      name="pin"
      pattern={String.raw`[0-9]{${pinLength[0]},${pinLength[1]}}`}
      placeholder="PIN ({pinLength[0]}- {pinLength[1]})"
      title=""
      on:invalid={(e) => showPINError(e)}
      minlength={pinLength[0]}
      maxlength={pinLength[1]} />
  </div>
  <button
    class="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-3"
    type="submit">Sign in</button>
</form>
