<script>
  // @ts-ignore
  import bitcoinjs from "../../lib/bitcoinjs/bitcoin.mjs";
  let { Buffer, ECPair } = bitcoinjs;
  const ONE = Buffer.from(
    "0000000000000000000000000000000000000000000000000000000000000001",
    "hex"
  );
  let keyPair = ECPair.fromPrivateKey(ONE);
  console.log(keyPair.publicKey.toString('hex') === "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798");
</script>

<div class="bg-black-100">
  <h1>Profile</h1>
</div>

<style>
</style>
