<script>
  import { onMount } from "svelte";
  let eccrypto = {};

  onMount(async () => {
    // required to do after mount
    eccrypto = await import("eccrypto-js");
  });

  let doCrypto = () => {
    var privateKeyA = eccrypto.generatePrivate();
    var publicKeyA = eccrypto.getPublic(privateKeyA);
    var privateKeyB = eccrypto.generatePrivate();
    var publicKeyB = eccrypto.getPublic(privateKeyB);
    console.log(privateKeyA);
    // Encrypting the message for B.
    eccrypto
      .encrypt(publicKeyB, Buffer.from("msg to b"))
      .then(function (encrypted) {
        // B decrypting the message.
        eccrypto.decrypt(privateKeyB, encrypted).then(function (plaintext) {
          console.log("Message to part B:", plaintext.toString());
        });
      });

    // Encrypting the message for A.
    eccrypto
      .encrypt(publicKeyA, Buffer.from("msg to a"))
      .then(function (encrypted) {
        // A decrypting the message.
        eccrypto.decrypt(privateKeyA, encrypted).then(function (plaintext) {
          console.log("Message to part A:", plaintext.toString());
        });
      });
  };
</script>

<div class="flex flex-col h-full items-center justify-center">
  <div class="text-4xl" on:click={doCrypto}>KEYSPACE.APP</div>
  <hr />
  <div class="text-xl mt-2">Fully Decentralized PKI</div>
</div>
