# TODO

## Input

- [ ] HEX
- [ ] WIF
- [ ] BIP39
- [ ] PEM
- [ ] xPub
- [ ] xPriv
- [ ] Profile File

## Output

- [ ] HEX
- [ ] WIF
- [ ] BIP39
- [ ] PEM
- [ ] xPub
- [ ] xPriv
- [ ] Profile File

## Address Book

- [ ] Add addresses w/identitfiers (schema.org?)
- [ ] Add challenge / response field (signature / verification)

## Data

- [ ] Data import
- [ ] Data signing and export
- [ ] Multiple export, shared key (encrypted per customer)

## Profile Data Storage

- [ ] Save profile to blockchain
    - [ ] Account name
- [ ] Export / Import options

## Storage Schema

- [ ] Bit mapping for message types
    - [ ] Info Message
    - [ ] Account Data
    - [ ] Trust (use [PGP Levels](https://gpgtools.tenderapp.com/kb/faq/what-is-ownertrust-trust-levels-explained))
        - Ultimate (own keys)
        - Full (trust to sign other keys)
        - Unknown (default, not trusted)
        - Undefined (manually set, not trusted)
        - Never (DO NOT TRUST THIS KEY)
        - Marginal (trust by a N keys to be trusted, fill in N in metadata)

- [ ] Serialization format
- [ ] Compression / Encryption

## Settings

- Adding data providers

    - [ ] https://api.blockcypher.com/
    - [ ] https://blockchain.info/


## Types of trust relationships

- [ ] Boomerang trust (sent / return)
- [ ] Total trust level $$
- [ ] Web of trust (x of n trust relationship)
- [ ] Certificate Authority (trust parent/child relationship)