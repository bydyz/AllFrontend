// crypto的目的是提供通用的加密和哈希算法，javascript可以实现，但速度很慢，node使用了c/c++实现这些算法后，通过crypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。






// aes是一种常用的对称加密算法，加解密都用一个密钥，cropto提供了aes支持，但要自己封装函数

const crypto = require('crypto');

function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);

// 注意到AES有很多不同的算法，如aes192，aes-128-ecb，aes-256-cbc等，AES除了密钥外还可以指定IV（Initial Vector），不同的系统只要IV不同，用相同的密钥加密相同的数据得到的加密结果也是不同的。加密结果通常有两种表示方法：hex和base64，这些功能Nodejs全部都支持，但是在应用中要注意，如果加解密双方一方用Nodejs，另一方用Java、PHP等其它语言，需要仔细测试。如果无法正确解密，要确认双方是否遵循同样的AES算法，字符串密钥和IV是否相同，加密后的数据是否统一为hex或base64格式。







// DH是一种密钥交换协议，它可以让双方在不泄露密钥的情况下，协商出一个密钥，DH算法基于数学原理
// ，比如小明和小红想要协商一个密钥，可以这么做：

// 小明先选一个素数和一个底数，例如，素数p=23，底数g=5（底数可以任选），再选择一个秘密整数a=6，计算A=g^a mod p=8，然后大声告诉小红：p=23，g=5，A=8；

// 小红收到小明发来的p，g，A后，也选一个秘密整数b=15，然后计算B=g^b mod p=19，并大声告诉小明：B=19；

// 小明自己计算出s=B^a mod p=2，小红也自己计算出s=A^b mod p=2，因此，最终协商的密钥s为2。

// 在这个过程中，密钥2并不是小明告诉小红的，也不是小红告诉小明的，而是双方协商计算出来的。第三方只能知道p=23，g=5，A=8，B=19，由于不知道双方选的秘密整数a=6和b=15，因此无法计算出密钥2。

// 用crypto模块实现DH算法如下：

const crypto = require('crypto');

// xiaoming's keys:
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

// print secret:
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'));






// RSA算法是一种非对称加密算法，即由一个私钥和一个公钥构成的密钥对，通过私钥加密，公钥解密，或者通过公钥加密，私钥解密。其中，公钥可以公开，私钥必须保密。

// RSA算法是1977年由Ron Rivest、Adi Shamir和Leonard Adleman共同提出的，所以以他们三人的姓氏的头字母命名。

// 当小明给小红发送信息时，可以用小明自己的私钥加密，小红用小明的公钥解密，也可以用小红的公钥加密，小红用她自己的私钥解密，这就是非对称加密。相比对称加密，非对称加密只需要每个人各自持有自己的私钥，同时公开自己的公钥，不需要像AES那样由两个人共享同一个密钥。

// 在使用Node进行RSA加密前，我们先要准备好私钥和公钥。

// 首先，在命令行执行以下命令以生成一个RSA密钥对：

// openssl genrsa -aes256 -out rsa-key.pem 2048
// 根据提示输入密码，这个密码是用来加密RSA密钥的，加密方式指定为AES256，生成的RSA的密钥长度是2048位。执行成功后，我们获得了加密的rsa-key.pem文件。

// 第二步，通过上面的rsa-key.pem加密文件，我们可以导出原始的私钥，命令如下：

// openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
// 输入第一步的密码，我们获得了解密后的私钥。

// 类似的，我们用下面的命令导出原始的公钥：

// openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem
// 这样，我们就准备好了原始私钥文件rsa-prv.pem和原始公钥文件rsa-pub.pem，编码格式均为PEM。

// 下面，使用crypto模块提供的方法，即可实现非对称加解密。

// 首先，我们用私钥加密，公钥解密：

const fs = require('fs'),crypto = require('crypto');

// 从文件加载key:
function loadKey(file) {
    // key实际上就是PEM编码的字符串:
    return fs.readFileSync(file, 'utf8');
}

let prvKey = loadKey('./rsa-prv.pem'),pubKey = loadKey('./rsa-pub.pem'),message = 'Hello, world!';
// 使用私钥加密:

let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf8'));
console.log('encrypted by private key: ' + enc_by_prv.toString('hex'));


let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
console.log('decrypted by public key: ' + dec_by_pub.toString('utf8'));
// 执行后，可以得到解密后的消息，与原始消息相同。

// 接下来我们使用公钥加密，私钥解密：

// 使用公钥加密:

let enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf8'));
console.log('encrypted by public key: ' + enc_by_pub.toString('hex'));
// 使用私钥解密:

let dec_by_prv = crypto.privateDecrypt(prvKey, enc_by_pub);
console.log('decrypted by private key: ' + dec_by_prv.toString('utf8'));
// 执行得到的解密后的消息仍与原始消息相同。

// 如果我们把message字符串的长度增加到很长，例如1M，这时，执行RSA加密会得到一个类似这样的错误：data too large for key size，这是因为RSA加密的原始信息必须小于Key的长度。那如何用RSA加密一个很长的消息呢？实际上，RSA并不适合加密大数据，而是先生成一个随机的AES密码，用AES加密原始信息，然后用RSA加密AES口令，这样，实际使用RSA时，给对方传的密文分两部分，一部分是AES加密的密文，另一部分是RSA加密的AES口令。对方用RSA先解密出AES口令，再用AES解密密文，即可获得明文。





























// Node.js中的crypto模块是一个内置模块，它提供了一系列用于加密和解密数据的功能，包括散列函数、加密、解密、数字签名和随机数据生成等。以下是crypto模块的一些主要功能和用法：



// 散列函数（Hashing）：  散列函数是一种将输入数据转换为固定长度散列值（哈希值）的算法。
// crypto模块允许你使用不同的散列算法来生成数据的散列值。这通常用于验证数据的完整性。常见的散列算法包括MD5、SHA-1、SHA-256等。
  const crypto = require('crypto');  // 导入Node.js的crypto模块
  const hash = crypto.createHash('sha256');  // 创建一个散列对象，使用SHA-256算法    
  hash.update('Hello, world!');  // 更新散列对象的输入数据，可以多次调用该方法    也有 hash.update('Hello, world!', 'utf8'); 这种用法，此方法指定了编码方式
  const hashedData = hash.digest('hex');  // 计算并获取最终的散列值，将其以十六进制字符串形式返回
        // 在 hash.digest('hex') 中，'hex' 是指定输出散列值的编码格式。它告诉 digest 方法将散列值以十六进制字符串的形式返回。这是因为散列值通常是二进制数据，但在很多应用中，我们更喜欢以可读的十六进制字符串形式来表示它。

        // digest 方法支持其他输出编码格式，如 'base64'、'latin1' 等，具体取决于你的需求。以下是一些示例：
        // 使用 'base64' 编码格式输出：
        //   const hashedDataBase64 = hash.digest('base64');
        // 使用 'latin1' 编码格式输出：
        //   const hashedDataLatin1 = hash.digest('latin1');

        // 你可以根据你的需要选择适合的编码格式。通常，'hex' 是一个常用的选择，因为它生成的散列值是易于读取和比较的。

// MD5（Message Digest Algorithm 5）是一种广泛使用的散列算法，它将输入数据转换为固定长度的散列值。然而，需要注意的是，MD5 已经不再被视为安全的散列算法，因为它存在已知的弱点，容易受到碰撞攻击。因此，不建议在安全性要求较高的应用中使用 MD5。尽量使用更安全的散列算法，如 SHA-256。  用法除了将上面的 sha256 改为 md5   其他的全都一样










// crypto.createHmac 是 Node.js 中 crypto 模块提供的功能之一，用于创建 HMAC（Hash-based Message Authentication Code）对象，以进行消息认证。HMAC 是一种在数据传输过程中对消息进行完整性验证的方法，通常与散列函数一起使用。

// 以下是关于 crypto.createHmac 的详细介绍，以及一个示例，包含详细注释：
    const crypto = require('crypto'); // 导入 Node.js 的 crypto 模块

    const secretKey = 'mySecretKey'; // HMAC 密钥  密钥是用于计算 HMAC 值的秘密参数，它需要在发送和接收方之间共享。
    const data = 'Hello, world!'; // 要进行消息认证的数据

    // 创建一个 HMAC 对象，指定散列算法（例如 SHA-256）和密钥
    const hmac = crypto.createHmac('sha256', secretKey);

    // 更新 HMAC 对象的输入数据
    hmac.update(data, 'utf8');

    // 计算并获取最终的 HMAC 值，以十六进制字符串形式返回
    const hmacDigest = hmac.digest('hex');

    console.log('原始数据: ' + data);
    console.log('HMAC 值: ' + hmacDigest);

// HMAC 是在数据传输和存储中用于验证消息完整性的有力工具，它结合了散列函数和共享密钥，确保数据在传输过程中没有被篡改。密钥的保护和安全存储是确保 HMAC 的有效性的关键。














// 加密和解密：
// crypto模块支持对数据进行加密和解密，包括对称加密（如AES）和非对称加密（如RSA）。
  const crypto = require('crypto');
  const secretKey = crypto.randomBytes(32); // 生成密钥
  const iv = crypto.randomBytes(16); // 生成初始化向量
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
  let encryptedData = cipher.update('Sensitive data', 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  // 加密和解密是通过加密算法将数据转换为不可读的形式，然后再将其还原为可读数据的过程。在Node.js的crypto模块中，你可以使用对称加密算法进行加密和解密，其中同一个密钥用于加密和解密数据。

  // 以下是一个示例，涵盖了加密和解密的过程，并包含详细注释：
    const crypto = require('crypto'); // 导入 Node.js 的 crypto 模块

    const secretKey = crypto.randomBytes(32); // 生成一个32字节的密钥  密钥是用于加密和解密的关键参数。
    const iv = crypto.randomBytes(16); // 生成一个16字节的初始化向量  初始化向量是在加密中用于增强安全性的参数。
    const data = 'Sensitive data to be encrypted'; // 要加密的数据

    // 创建一个加密对象，指定对称加密算法（例如 AES），密钥和初始化向量
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);

    // 更新加密对象的输入数据
    let encryptedData = cipher.update(data, 'utf8', 'hex');

    // 结束加密过程，获取最终的加密数据
    encryptedData += cipher.final('hex');

    console.log('原始数据: ' + data);
    console.log('加密后数据: ' + encryptedData);


    // 创建一个解密对象，使用相同的算法、密钥和初始化向量
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);

    // 更新解密对象的输入数据
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');

    // 结束解密过程，获取最终的解密数据
    decryptedData += decipher.final('utf8');

    console.log('解密后数据: ' + decryptedData);

    // encryptedData 是一个中间变量，用于存储部分加密数据，但它不包含最终的加密结果。在加密过程中，cipher.update 方法将数据逐步加密，而 cipher.final 方法用于获取加密流程的最后一部分数据。让我详细解释这个过程：

      // let encryptedData = cipher.update(data, 'utf8', 'hex');：

      // cipher 是一个加密对象，用于执行加密操作。
      // cipher.update(data, 'utf8', 'hex') 将原始数据 data 进行加密，并将结果以十六进制字符串形式返回。
      // 此行代码执行后，encryptedData 包含了加密过程中的部分数据，但不是最终的加密结果。
      // encryptedData += cipher.final('hex');：

      // cipher.final('hex') 用于获取加密流程的最后一部分数据，并将其以十六进制字符串形式返回。
      // 这一行代码将 cipher.final('hex') 返回的数据附加到 encryptedData 变量的末尾，以获取完整的加密结果。
      // 此时，encryptedData 包含了完整的加密数据，它表示原始数据经过加密后的结果。

    // 所以，encryptedData 包含的是最终的加密数据，这两行代码的目的是分步获取加密结果，因为有些加密操作可能需要多次处理，而 cipher.final 用于获取最后一部分数据以完成加密。

    // 解密同理














// 数字签名：
// crypto模块可以用于创建和验证数字签名，用于确保数据的完整性和认证数据的来源。通常使用非对称加密算法来实现数字签名。
  const crypto = require('crypto');
  const privateKey = crypto.createPrivateKey(privateKeyPEM); // 使用私钥创建数字签名
  const sign = crypto.createSign('SHA256');
  sign.update('Data to be signed');
  const signature = sign.sign(privateKey, 'base64');

  // 数字签名（Digital Signature）是一种用于验证数字文档或消息的完整性和身份认证的技术。它通过使用非对称加密算法（通常是RSA或DSA）来创建一个数字签名，并且只能由拥有相应私钥的实体来创建。数字签名通常用于确保以下两个关键目标：

  //   完整性验证：数字签名可以确保文档或消息在传输过程中没有被篡改。接收方可以验证签名以确定数据是否保持不变。

  //   身份认证：数字签名可以证明文档或消息的发送方是合法的。只有私钥的持有者才能生成特定的数字签名，因此验证签名的人可以信任发送方的身份。

  // 以下是一个使用Node.js的crypto模块进行数字签名的示例，包括详细注释：
    const crypto = require('crypto'); // 导入 Node.js 的 crypto 模块

    // 创建一对密钥（公钥和私钥）  这对密钥将用于数字签名的创建和验证。
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048, // 密钥长度
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    const data = 'Hello, world!'; // 要签名的数据

    // 创建一个签名对象，指定使用的散列算法（例如 SHA-256）。
    const sign = crypto.createSign('SHA256');

    // 使用私钥进行签名
    sign.update(data);    // 更新签名对象的输入数据。
    const signature = sign.sign(privateKey, 'hex');    // 使用私钥生成数字签名，将其以十六进制字符串形式返回。

    console.log('原始数据: ' + data);

    // 创建一个验证签名的对象     使用 createVerify 方法创建一个验证签名的对象，指定使用的散列算法。
    const verify = crypto.createVerify('SHA256');

    // 使用公钥验证签名    使用公钥验证数字签名，如果签名有效，则返回 true，否则返回 false。
    verify.update(data);
    const isSignatureValid = verify.verify(publicKey, signature, 'hex');

    console.log('数字签名是否有效？' + isSignatureValid);











// 随机数据生成：
// crypto模块还可以用于生成随机数据，包括随机字节、随机字符串等。
  const crypto = require('crypto');
  const randomBytes = crypto.randomBytes(16); // 生成16字节的随机数据


  
  // crypto模块在Node.js中是一个强大的工具，用于处理各种加密和安全需求。请注意，安全是一个复杂的领域，不正确的使用加密和安全功能可能导致严重的安全漏洞，因此在实际应用中，应该遵循最佳的安全实践