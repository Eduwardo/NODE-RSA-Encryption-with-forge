# NODE-RSA-Encryption-with-forge
Node.js RSA Encryption with Forge Library Example

## Prerequisites

Node.js - You need Node.js to run this application.

##  Clone the repository
```
git@github.com:Eduwardo/NODE-RSA-Encryption-with-forge.git
```

##  Install dependencies
```
npm i
```

##  Run application
```
npm run start
```

## Dependencies
The application uses the following dependencies:

**node-forge** : A cryptographic library for working with RSA encryption and decryption.

**fs** : A built-in Node.js module for interacting with the file system.

## Code

``` javascript
import forge from 'node-forge';
import fs from 'fs';

// Generate RSA key pair
const rsaKeyPair = forge.pki.rsa.generateKeyPair(2048);

// Convert public key to PEM format
const pbKey = forge.pki.publicKeyToPem(rsaKeyPair.publicKey);

// Convert private key to PEM format
const prKey = forge.pki.privateKeyToPem(rsaKeyPair.privateKey);

// Write public key to a file
fs.writeFileSync('public_key.pem', pbKey);

// Write private key to a file
fs.writeFileSync('private_key.pem', prKey);

console.log('Public Key saved to public_key.pem');
console.log('Private Key saved to private_key.pem');

// Read the public key from a file
const publicKeyPem = fs.readFileSync('public_key.pem', 'utf8');

// Read the private key from a file
const privateKeyPem = fs.readFileSync('private_key.pem', 'utf8');

console.log('Public Key:');
console.log(publicKeyPem);

console.log('Private Key:');
console.log(privateKeyPem);

// Message to encrypt
const plaintext = 'Hello, RSA encryption with node-forge!';

// Convert the public key from PEM format
const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

// Encrypt the message using the public key
const encryptedMessage = publicKey.encrypt(plaintext, 'RSA-OAEP', {
  md: forge.md.sha256.create(),
});

console.log('Encrypted Message:');
console.log(forge.util.encode64(encryptedMessage));

// Convert the private key from PEM format
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

// Decrypt the message using the private key
const decryptedMessage = privateKey.decrypt(encryptedMessage, 'RSA-OAEP', {
  md: forge.md.sha256.create(),
});

console.log('Decrypted Message:');
console.log(decryptedMessage);
```

##  Output expected

```

Public Key saved to public_key.pem
Private Key saved to private_key.pem
Public Key:
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxFZcorrelvR0qUJti8vG
Km4m8JrzUIEmemMcbWij6LvAFkEhYwYshxHJS/dNjzXoUd49Cnr6C/J2E+TWoWrW
sMYWMQ0NRLT5ndxIeBX+ITYKVu1obdFdB76Ei+dnHazutL+QzNLGRnYYZ+nco0L6
cpawMPPFqIO7c7BT0Fc49RdsU9lZ4TSyXQ7Xehi2gpX7nOPxi4Zb9NfszoDe9dlv
7LncSFeoACpotgxsP2yLnICQB0aNuw/+mP6xy1fOe8qQyJnNedJiJNh/DZYPQLi3
fi3uReI2o0hNKBnsZSZ7rF6BIlPCHwkiwoC2KstRdeU1tISVs1qzOp3UicTTqaTL
WwIDAQAB
-----END PUBLIC KEY-----

Private Key:
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAxFZcorrelvR0qUJti8vGKm4m8JrzUIEmemMcbWij6LvAFkEh
YwYshxHJS/dNjzXoUd49Cnr6C/J2E+TWoWrWsMYWMQ0NRLT5ndxIeBX+ITYKVu1o
bdFdB76Ei+dnHazutL+QzNLGRnYYZ+nco0L6cpawMPPFqIO7c7BT0Fc49RdsU9lZ
4TSyXQ7Xehi2gpX7nOPxi4Zb9NfszoDe9dlv7LncSFeoACpotgxsP2yLnICQB0aN
uw/+mP6xy1fOe8qQyJnNedJiJNh/DZYPQLi3fi3uReI2o0hNKBnsZSZ7rF6BIlPC
HwkiwoC2KstRdeU1tISVs1qzOp3UicTTqaTLWwIDAQABAoIBAF65l/n/FJNaH8rl
vLp8twATov/kkk2d8fWMSdPTb3lC1BsokzYWbXdBMpBPIYFdrdeJ1INw76DB+wwA
FTlNtYUWHPDPbj5e3iu2ctRVMAXP788evYp2P18UIRjqrQpZO9XCstbPPlASfBXu
c7/k+bY9U4Zaplt2KwNW6CkVW+qK6NZanmag6fDFyK/G1bBunzSoFGWjXxtzXyx9
qujRE81AaT1Hbxdjq5TpdqUGSgkBiP28RhPUId0bbLur30uXrZAqBKycS3FmQKNV
YL2UTM89FN90gaPxecMjmNRqWeUzbSWB/zLSJvocBhAXxsjlOyevhmcK+n0giS0c
GNHDQzECgYEA7MbjWi0hZzpJM8AWXdRFp7djuQYPa4Vt9N06ad/DJTd98H4yBIvW
Iyi1uzan7fsecdTBc2vTw8JLpqw/hQ/jfqGIfAtkxL/pCj+Mz5qxUmgMXMHQCTAn
RwLKFJHt5BWPtcaK3OO9I/rnKNe4FrTxmS3d4MWgxgrRX08iMmOYuMMCgYEA1Eb8
+Ml+8lpv3uYMoha7AkAKYqhDycjRjo+V2wIGOTu2qJFYaHME/fNxI1GtN3e5Ai5+
bs+PvRNMcGgYXjemEEzAbaRoOOFGM2W66EO0thg6niZop4YIfHg5ZFqqC2EaDkBi
qBCX9yJzEYeW82cfN904cPJYosm+TY8/nqS3uYkCgYEAj0wjJl0v3RiSWuaC4tBo
Q4Oir8SyKmF7VXlaM98/bFO0PYsyXDwBIhAuRBpk8YtMNpoLZf45ED2TqVCPtMkT
5nx+bIw8tTJsKE6jurUlYfkkmjKV5Cmna7uNb3uN3L8L1XhObDbMLm1X3wkHGX7y
xMDUiocwsQq1AhiTWqmaMR8CgYBBWdlnfiDm25C1Pn2FKRpJhw2rccHszTY2fV3V
HrprxEZnfteI0GApDlk2Vl7NRL5gPZAO7TeDLf3KXUGjP96QBhD3sDWlzTSffiIc
fzuTE8J4DbsKV+kk6J5ClubiufIbkRbORs2B98kVDHkcVhL2T9SgcPt4okND/WXI
oU0ugQKBgEFxz58zb4Un3MEyHKrnZkBeinvYPxqeqtA1K1q6DbXn2WFzYRt3gkHj
E1bGRHsicrIYTM9ABUSNT4RNTpjtC1vmEnrqwMMn/JGrfZWy8ebk9ukw5I/0VbNE
yBDzvrz+qi1hLBQQoewvg9gnVhL4q271q6EZw5pWuDR9Y3md5q72
-----END RSA PRIVATE KEY-----

Encrypted Message:
theC8q5jo6nQE2FiHLq2cZK1Pc+UF+OXXsPPzbbt6iqyqnKu/pGwLE6kUtzkDcEFGc1ZTfcxj2zTwJKOqJbRvaeda2GJ8SkhJndhVnL273FYZ3DJUpUOoobuVW7BCEw6PGFd37f8oGB5jrn8dYXcWyPGYYwtgM2OUg7fTVVhGPF9+a974gKlBzMT+wpmNtpwh3wNxNYPIB6c682rhhe0ijb8CAD/V1li3bAUJBfY4uuRsabrkfock7k2BgVBq3iOF2IGyhx8KKPHYzsZh++gjvA1FgHy36mKKCNyFMG0xpq0hmzLSpLtGuSvy3hliTygmB3YwRCddSewS/UIjHnsYg==
Decrypted Message:
Hello, RSA encryption with node-forge!

```
