const kbpgp = require('kbpgp');

const decryptSigned = (encData, senderPubKey) => {
  return new Promise((resolve, reject)=>{
    kbpgp.KeyManager.import_from_armored_pgp({ armored: senderPubKey }, (err, sender)=> {
      if (!err) {
        let ring = new kbpgp.keyring.KeyRing;
        ring.add_key_manager(sender);
        kbpgp.unbox({keyfetch: ring, armored: encData}, function(err, literals) {
          if (err != null) {
            reject()
          } else {
            resolve(literals[0].toString()); 
          }
        });
      }
    });
  })
}

const checkTxnId = (id) => {
    
}

module.exports = {
  decryptSigned: decryptSigned
}

/*
const checkTxnId = util.checkTxnId;
const checkTime = util.checkTime;
const checkExist = util.exist;
const checkElgb = util.eligible;
*/
