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