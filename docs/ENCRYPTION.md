# Photo Album Encryption Guide

This document explains how to implement encrypted photo albums in your personal website, including the cryptographic concepts, implementation details, and step-by-step instructions for encrypting images.

## Table of Contents

1. [Cryptographic Concepts](#cryptographic-concepts)
2. [Implementation Approaches](#implementation-approaches)
3. [Encrypting Images](#encrypting-images)
4. [Integration with the Website](#integration-with-the-website)
5. [Security Considerations](#security-considerations)
6. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)

## Cryptographic Concepts

### Symmetric vs. Asymmetric Encryption

There are two main types of encryption that could be used for protecting photo albums:

**Symmetric Encryption:**
- Uses the same key for both encryption and decryption
- Examples: AES, DES, Blowfish
- Faster and simpler than asymmetric encryption
- Challenge: Securely sharing the key with authorized users

**Asymmetric Encryption:**
- Uses a pair of keys: public key for encryption and private key for decryption
- Examples: RSA, ECC
- More complex but solves the key distribution problem
- Typically slower than symmetric encryption

For a photo album application, a hybrid approach often works best:
1. Encrypt the actual content (photos) with a strong symmetric key
2. Encrypt the symmetric key with the recipient's public key
3. Only someone with the corresponding private key can decrypt the symmetric key and then the content

### Password-Based Encryption

For simplicity, we can use password-based encryption:
1. A password is used to derive an encryption key using a key derivation function (KDF)
2. This derived key is used to encrypt/decrypt the content
3. The user only needs to remember the password, not manage encryption keys

## Implementation Approaches

### Client-Side Encryption

For a static website, client-side encryption is the most practical approach:

1. **Storage of Encrypted Data:**
   - Encrypted image data is stored in JSON files or other data structures
   - The encrypted data never exists in decrypted form on the server
   - No sensitive data in public folders

2. **Decryption Process:**
   - User enters a password in the browser
   - JavaScript code derives the encryption key from the password
   - The key is used to decrypt the image data
   - Decrypted images are displayed in the browser

3. **Key Management:**
   - No keys are stored on the server
   - The password is never sent to the server
   - The derived key can be temporarily stored in memory for the session

## Encrypting Images

### Preparing Images for Encryption

Images need to be converted to a format that can be encrypted and stored in JSON:

1. **Convert to Base64:**
   - Read the image file as binary data
   - Convert the binary data to a Base64 string
   - This string representation can be encrypted

2. **Encrypt the Base64 String:**
   - Use a strong encryption algorithm (e.g., AES-256)
   - The encrypted result is also a string that can be stored in JSON

3. **Store the Encrypted Data:**
   - Save the encrypted string in your album JSON file
   - Include metadata like image dimensions if needed

### Command-Line Encryption Process

Here's how you would encrypt images using command-line tools:

#### Using Node.js

```javascript
const fs = require('fs');
const crypto = require('crypto');

// Function to encrypt an image
function encryptImage(imagePath, password, outputPath) {
  // Read the image file
  const imageBuffer = fs.readFileSync(imagePath);
  
  // Convert to Base64
  const base64Image = imageBuffer.toString('base64');
  
  // Create a key from the password
  const key = crypto.scryptSync(password, 'salt', 32); // 32 bytes for AES-256
  
  // Create an initialization vector
  const iv = crypto.randomBytes(16);
  
  // Create cipher
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  
  // Encrypt the Base64 image
  let encrypted = cipher.update(base64Image, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Create the result object with IV (needed for decryption)
  const result = {
    iv: iv.toString('hex'),
    encryptedData: encrypted
  };
  
  // Write to output file
  fs.writeFileSync(outputPath, JSON.stringify(result));
  
  return result;
}

// Example usage
const password = 'your-secure-password';
encryptImage('path/to/image.jpg', password, 'encrypted-image.json');
```

#### Using Python

```python
import base64
import json
import os
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import secrets

def encrypt_image(image_path, password, output_path):
    # Read the image file
    with open(image_path, 'rb') as f:
        image_data = f.read()
    
    # Convert to Base64
    base64_image = base64.b64encode(image_data).decode('utf-8')
    
    # Create a salt
    salt = secrets.token_bytes(16)
    
    # Derive a key from the password
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,  # 32 bytes for AES-256
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )
    key = kdf.derive(password.encode())
    
    # Create an initialization vector
    iv = secrets.token_bytes(16)
    
    # Create cipher
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    
    # Pad the data to be a multiple of 16 bytes (AES block size)
    padded_data = base64_image + (16 - len(base64_image) % 16) * chr(16 - len(base64_image) % 16)
    
    # Encrypt the Base64 image
    encrypted_data = encryptor.update(padded_data.encode()) + encryptor.finalize()
    
    # Create the result object
    result = {
        'salt': base64.b64encode(salt).decode('utf-8'),
        'iv': base64.b64encode(iv).decode('utf-8'),
        'encryptedData': base64.b64encode(encrypted_data).decode('utf-8')
    }
    
    # Write to output file
    with open(output_path, 'w') as f:
        json.dump(result, f)
    
    return result

# Example usage
password = 'your-secure-password'
encrypt_image('path/to/image.jpg', password, 'encrypted-image.json')
```

### Batch Processing Multiple Images

For encrypting an entire album, you can create a script that:

1. Reads all images in a directory
2. Encrypts each image with the same password
3. Combines the encrypted data into a single album JSON file

Example Node.js script:

```javascript
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function encryptAlbum(imageDir, password, outputPath, albumMetadata) {
  // Get all image files in the directory
  const imageFiles = fs.readdirSync(imageDir)
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
  
  // Create a key from the password
  const key = crypto.scryptSync(password, 'salt', 32);
  
  // Encrypt each image
  const encryptedPhotos = imageFiles.map((file, index) => {
    const imagePath = path.join(imageDir, file);
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    // Create an initialization vector
    const iv = crypto.randomBytes(16);
    
    // Create cipher
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    // Encrypt the Base64 image
    let encrypted = cipher.update(base64Image, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      id: index,
      caption: `Photo ${index + 1}`,
      iv: iv.toString('hex'),
      encryptedData: encrypted
    };
  });
  
  // Create the album object
  const album = {
    ...albumMetadata,
    isEncrypted: true,
    photos: encryptedPhotos
  };
  
  // Write to output file
  fs.writeFileSync(outputPath, JSON.stringify(album, null, 2));
  
  return album;
}

// Example usage
const albumMetadata = {
  title: "Private Collection",
  description: "This album is password-protected. Enter the correct password to view the photos."
};

encryptAlbum(
  'path/to/images', 
  'your-secure-password', 
  'private-album.json',
  albumMetadata
);
```

## Integration with the Website

### Album Data Structure

For an encrypted album, the JSON structure would look like:

```json
{
  "title": "Private Collection",
  "description": "This album is password-protected.",
  "coverImage": "/images/photos/private/lock.jpg",
  "isEncrypted": true,
  "photos": [
    {
      "id": 0,
      "caption": "Photo 1",
      "iv": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
      "encryptedData": "encrypted-base64-string-here"
    },
    {
      "id": 1,
      "caption": "Photo 2",
      "iv": "q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2",
      "encryptedData": "another-encrypted-base64-string"
    }
  ]
}
```

### Decryption in the Browser

To decrypt and display the images in the browser:

1. Add a crypto library to your project (like CryptoJS)
2. Create a password entry component for encrypted albums
3. Implement the decryption logic:

```javascript
import CryptoJS from 'crypto-js';

function decryptImage(encryptedData, iv, password) {
  // Create key from password
  const key = CryptoJS.PBKDF2(password, 'salt', {
    keySize: 256/32,
    iterations: 1000
  });
  
  // Decrypt the data
  const decrypted = CryptoJS.AES.decrypt(
    encryptedData,
    key,
    { iv: CryptoJS.enc.Hex.parse(iv) }
  );
  
  // Convert to string
  const base64Image = decrypted.toString(CryptoJS.enc.Utf8);
  
  // Return as data URL for display
  return `data:image/jpeg;base64,${base64Image}`;
}
```

## Security Considerations

### Strengths of This Approach

1. **No Plaintext Storage**: Encrypted images are never stored in plaintext on the server
2. **Client-Side Decryption**: The decryption happens entirely in the user's browser
3. **Password Never Transmitted**: The password is never sent to any server

### Limitations

1. **JavaScript Security**: The decryption code runs in JavaScript, which can be inspected
2. **Memory Exposure**: Decrypted images exist in browser memory
3. **Brute Force Attacks**: Simple passwords could be brute-forced if someone has the encrypted data

### Best Practices

1. Use strong, unique passwords for each encrypted album
2. Implement rate limiting for password attempts (if using a server component)
3. Consider adding a salt unique to each album for additional security
4. Don't store the password or decryption key in localStorage (session storage is better if needed)

## Step-by-Step Implementation Guide

### 1. Prepare Your Environment

Install required tools:
```bash
# For Node.js
npm install crypto-js

# For Python
pip install cryptography
```

### 2. Encrypt Your Images

1. Organize the images you want to encrypt in a folder
2. Run the encryption script (Node.js or Python examples above)
3. This will generate a JSON file with the encrypted image data

### 3. Add the Encrypted Album to Your Website

1. Add the encrypted album JSON to your content/albums directory
2. Make sure it has the isEncrypted flag set to true
3. Provide a cover image that indicates the album is locked

### 4. Implement the Decryption UI

1. Modify your album view component to detect encrypted albums
2. Add a password input form for encrypted albums
3. Implement the decryption logic when the correct password is entered
4. Display the decrypted images

### 5. Test Thoroughly

1. Test with correct and incorrect passwords
2. Verify that the images display correctly when decrypted
3. Check browser memory usage with large albums
4. Test on different devices and browsers

## Conclusion

Implementing encrypted photo albums provides a good balance of security and usability for protecting private images on a static website. By encrypting the images before they're added to your site and implementing client-side decryption, you can ensure that only people with the correct password can view the protected content.

Remember that this approach is suitable for casual protection but isn't military-grade security. For truly sensitive content, consider additional security measures or avoid storing it on a public website altogether.
