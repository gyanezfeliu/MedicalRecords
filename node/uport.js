import { Credentials, SimpleSigner } from 'uport'

const signer = SimpleSigner('006a521241810e5a2219b1388ecd4d6dfe2c0494af4846b0f316f07bfc5c7d6f')
const credentials = new Credentials({
  appName: 'RCE-NET',
  address: '2ojz6kbAWsVfVxFPr4EQT1p4mC1LeMnkRBX',
  signer: signer,
  networks: networks
})

module.exports = function(){

  this.getCode = function(){
    const uport = new uportConnect.Connect('RCE-NET', {
      clientId: '2ojz6kbAWsVfVxFPr4EQT1p4mC1LeMnkRBX',
      network: 'rinkeby',
      signer: uportConnect.SimpleSigner('006a521241810e5a2219b1388ecd4d6dfe2c0494af4846b0f316f07bfc5c7d6f'),
    });

    // Request credentials to login
    uport.requestCredentials({
      requested: ['name', 'phone', 'country'],
      notifications: true // We want this if we want to recieve credentials
    })
    .then((credentials) => {
      console.log(credentials);

    });
  };

  // // Attest specific credentials
  // uport.attestCredentials({
  //   sub: THE_RECEIVING_UPORT_ADDRESS,
  //   claim: {
  //     CREDENTIAL_NAME: CREDENTIAL_VALUE
  //   },
  //   exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
  // })
};
