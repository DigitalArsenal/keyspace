export class Wallet {
    //User token associated with this wallet.
    token: string;
    //Name of the wallet.
    name: string;
    //List of addresses associated with this wallet.
    addresses: Array<string>;
}
export class HDAddress {
    //Standard address representation.
    address: string;
    //The BIP32 path of the HD address.
    path: string;
    //optional Contains the hex-encoded public key if returned by Derive Address in Wallet endpoint.
    public: string;
}
export class HDChain {
    //Array of HDAddresses associated with this subchain.
    chain_addresses: Array<HDAddress>;
    //optional Index of the subchain, returned if the wallet has subchains.
    index: number;
}
export class HDWallet {
    //User token associated with this HD wallet.
    token: string;
    //Name of the HD wallet.
    name: string;
    //List of HD chains associated with this wallet, each containing HDAddresses. A single chain is returned if the wallet has no subchains.
    chains: Array<HDChain>;
    //true for HD wallets, not present for normal wallets.
    hd: boolean;
    //The extended public key all addresses in the HD wallet are derived from. It's encoded in BIP32 format
    extended_public_key: string;
    //optional returned for HD wallets created with subchains.
    subchain_indexes: Array<Number>;

}
export class TXInput {
    //The previous transaction hash where this input was an output. Not present for coinbase transactions.
    prev_hash: string;
    //The index of the output being spent within the previous transaction. Not present for coinbase transactions.
    output_index: number;
    //The value of the output being spent within the previous transaction. Not present for coinbase transactions.
    output_value: number;
    //The type of script that encumbers the output corresponding to this input.
    script_type: string;
    //Raw hexadecimal encoding of the script.
    script: string;
    //An array of public addresses associated with the output of the previous transaction.
    addresses: Array<string>;
    //Legacy 4-byte sequence number, not usually relevant unless dealing with locktime encumbrances.
    sequence: number;
    //Optional Number of confirmations of the previous transaction for which this input was an output. Currently, only returned in unconfirmed transactions.
    age: number;
    //Optional Name of Wallet or HDWallet from which to derive inputs. Only used when constructing transactions via the Creating Transactions process.
    wallet_name: string;
    //Optional Token associated with Wallet or HDWallet used to derive inputs. Only used when constructing transactions via the Creating Transactions process.
    wallet_token: string;
}
export class TXOutput {
    //Value in this transaction output, in satoshis.
    value: number;
    //Raw hexadecimal encoding of the encumbrance script for this output.
    script: string;
    //Addresses that correspond to this output; typically this will only have a single address, and you can think of this output as having "sent" value to the address contained herein.
    addresses: Array<string>;
    //The type of encumbrance script used for this output.
    script_type: string;
    //Optional The transaction hash that spent this output. Only returned for outputs that have been spent. The spending transaction may be unconfirmed.
    spent_by: string;
    //Optional A hex-encoded representation of an OP_RETURN data output, without any other script instructions. Only returned for outputs whose script_type is null-data.
    data_hex: string;
    //Optional An ASCII representation of an OP_RETURN data output, without any other script instructions. Only returned for outputs whose script_type is null-data and if its data falls into the visible ASCII range.
    data_string: string;
}
export class TX {
    // Height of the block that contains this transaction. If this is an unconfirmed transaction, it will equal -1.
    block_height: number;
    // The hash of the transaction. While reasonably unique, using hashes as identifiers may be unsafe.
    hash: string;
    // Array of bitcoin public addresses involved in the transaction.
    addresses: Array<string>;
    // The total number of satoshis exchanged in this transaction.
    total: number;
    // The total number of fees---in satoshis---collected by miners in this transaction.
    fees: number;
    // The size of the transaction in bytes.
    size: number;
    // The virtual size of the transaction in bytes.
    vsize: number;
    // The likelihood that this transaction will make it to the next block; reflects the preference level miners have to include this transaction. Can be high, medium or low.
    preference: string;
    // Address of the peer that sent BlockCypher's servers this transaction.
    relayed_by: string;
    // Time this transaction was received by BlockCypher's servers.
    received: string;
    // Version number, typically 1 for Bitcoin transactions.
    ver: number;
    // Time when transaction can be valid. Can be interpreted in two ways: if less than 500 million, refers to block height. If more, refers to Unix epoch time.
    lock_time: number;
    // true if this is an attempted double spend; false otherwise.
    double_spend: boolean;
    // Total number of inputs in the transaction.
    vin_sz: number;
    // Total number of outputs in the transaction.
    vout_sz: number;
    // Number of subsequent blocks, including the block the transaction is in. Unconfirmed transactions have 0 confirmations.
    confirmations: number;
    // TXInput Array, limited to 20 by default.
    inputs: Array<TXInput>;;
    // TXOutput Array, limited to 20 by default.
    outputs: Array<TXOutput>;
    // Optional Returns true if this transaction has opted in to Replace-By-Fee (RBF), either true or not present. You can read more about Opt-In RBF here.
    opt_in_rbf?: boolean;
    // Optional The percentage chance this transaction will not be double-spent against, if unconfirmed. For more information, check the section on Confidence Factor.
    confidence?: number;
    // Optional Time at which transaction was included in a block; only present for confirmed transactions.
    confirmed?: string;
    // Optional Number of peers that have sent this transaction to BlockCypher; only present for unconfirmed transactions.
    receive_count?: number;
    // Optional Address BlockCypher will use to send back your change, if you constructed this transaction. If not set, defaults to the address from which the coins were originally sent.
    change_address?: string;
    // Optional Hash of the block that contains this transaction; only present for confirmed transactions.
    block_hash?: string;
    // Optional Canonical, zero-indexed location of this transaction in a block; only present for confirmed transactions.
    block_index?: number;
    // Optional If this transaction is a double-spend (i.e. double_spend == true) then this is the hash of the transaction it's double-spending.
    double_of?: string;
    // Optional Returned if this transaction contains an OP_RETURN associated with a known data protocol. Data protocols currently detected: blockchainid ; openassets ; factom ; colu ; coinspark ; omni
    data_protocol?: string;
    // Optional Hex-encoded bytes of the transaction, as sent over the network.
    hex?: string;
    // Optional If there are more transaction inptus that couldn't fit into the TXInput array, this is the BlockCypher URL to query the next set of TXInputs (within a TX object).
    next_inputs?: string;
    // Optional If there are more transaction outputs that couldn't fit into the TXOutput array, this is the BlockCypher URL to query the next set of TXOutputs(within a TX object).
    next_outputs?: string;
}

export class TXRef {
    // Optional The address associated with this transaction input/output. Only returned when querying an address endpoint via a wallet/HD wallet name.
    address?: string;
    // Height of the block that contains this transaction input/output. If it's unconfirmed, this will equal -1.
    block_height: number;
    // The hash of the transaction containing this input / output.While reasonably unique, using hashes as identifiers may be unsafe.
    tx_hash: string;
    // Index of this input in the enclosing transaction.It's a negative number for an output.
    tx_input_n: number;
    // Index of this output in the enclosing transaction.It's a negative number for an input.
    tx_output_n: number;
    // The value transfered by this input / output in satoshis exchanged in the enclosing transaction.
    value: number;
    // The likelihood that the enclosing transaction will make it to the next block; 
    // reflects the preference level miners have to include the enclosing transaction.
    // Can be high, medium or low.
    preference: string;
    // true if this is an output and was spent.If it's an input, or an unspent output, it will be false.
    spent: boolean;
    // true if this is an attempted double spend; false otherwise.
    double_spend: boolean;
    // Number of subsequent blocks, including the block the transaction is in.Unconfirmed transactions have 0 confirmations.
    confirmations: number;
    // Optional Raw, hex - encoded script of this input / output.
    script?: string;
    // Optional The past balance of the parent address the moment this transaction was confirmed.Not present for unconfirmed transactions.
    ref_balance?: number;
    // Optional The percentage chance this transaction will not be double - spent against, if unconfirmed.
    // For more information, check the section on Confidence Factor.
    confidence?: number;
    // Optional Time at which transaction was included in a block; only present for confirmed transactions.
    confirmed?: string;
    // Optional The transaction hash that spent this output.
    // Only returned for outputs that have been spent.The spending transaction may be unconfirmed.
    spent_by?: string;
    // Optional Time this transaction was received by BlockCypher's servers; only present for unconfirmed transactions.
    received?: string;
    // Optional Number of peers that have sent this transaction to BlockCypher; only present for unconfirmed transactions.
    receive_count?: number;
    // Optional If this transaction is a double - spend(i.e.double_spend == true) then this is the hash of the transaction it's double-spending.
    double_of?: string;
};

export class Address {
    // The requested address. Not returned if querying a wallet/HD wallet.
    address?: string;
    // The requested wallet object. Only returned if querying by wallet name instead of public address.
    Wallet?: Wallet;
    // The requested HD wallet object. Only returned if querying by HD wallet name instead of public address.
    hd_wallet: HDWallet;
    // Total amount of confirmed satoshis received by this address.
    total_received: number;
    // Total amount of confirmed satoshis sent by this address.
    total_sent: number;
    // Balance of confirmed satoshis on this address. 
    // This is the difference between outputs and inputs on this address, 
    // but only for transactions that have been included into a block 
    // (i.e., for transactions whose confirmations > 0).
    balance: number;
    // Balance of unconfirmed satoshis on this address. 
    // Can be negative (if unconfirmed transactions are just spending outputs). 
    // Only unconfirmed transactions (haven't made it into a block) are included.
    unconfirmed_balance: number;
    // Total balance of satoshis, including confirmed and unconfirmed transactions, for this address.
    final_balance: number;
    // Number of confirmed transactions on this address. 
    // Only transactions that have made it into a block (confirmations > 0) are counted.
    n_tx: number;
    // Number of unconfirmed transactions for this address. 
    // Only unconfirmed transactions (confirmations == 0) are counted.
    unconfirmed_n_tx: number;
    // Final number of transactions, including confirmed and unconfirmed transactions, for this address.
    final_n_tx: number;
    // To retrieve base URL transactions. 
    // To get the full URL, concatenate this URL with a transaction's hash
    tx_url?: string;
    // Array of full transaction details associated with this address.
    txs: Array<TX>;
    //Array of transaction inputs and outputs for this address. 
    txrefs: Array<TXRef>;
    // All unconfirmed transaction inputs and outputs for this address. 
    unconfirmed_txrefs: Array<TXRef>
    // If true, then the Address object contains more transactions than shown. 
    // Useful for determining whether to poll the API for more transaction information.
    hasMore: boolean;
}
