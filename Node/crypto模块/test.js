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

    // 创建一个签名对象，指定非对称加密算法（例如 RSA）
    const sign = crypto.createSign('MD5');

    // 使用私钥进行签名
    sign.update(data);    // 更新签名对象的输入数据。
    const signature = sign.sign(privateKey, 'hex');    // 使用私钥生成数字签名，将其以十六进制字符串形式返回。

    console.log('原始数据: ' + data);

    // 创建一个验证签名的对象     使用 createVerify 方法创建一个验证签名的对象，指定使用的散列算法。
    const verify = crypto.createVerify('MD5');

    // 使用公钥验证签名    使用公钥验证数字签名，如果签名有效，则返回 true，否则返回 false。
    console.log('11111111111111111111111111111111111111111111111111111111', signature, data)
    verify.update(data);
    const isSignatureValid = verify.verify(publicKey, signature, 'hex');

    console.log('数字签名是否有效？' + isSignatureValid);