const {default: makeWASocket, DisconnectReason,useMultiFileAuthState,sendMessage,MessageType,  
    MessageOptions, Mimetype } = require("@whiskeysockets/baileys"); 
const { Boom } = require('@hapi/boom'); 
//const { msgAgendada } = require('./__server');
const cron = require('node-cron');
//40 6-18 * * 1-5
function msgAgendada1() {
    cron.schedule('*/4 6-9 * * 1-5', () => {
 
async function connectToWhatsApp2() { 
    const { state, saveCreds } = await useMultiFileAuthState('auth/auth_info_baileys') 
 
    const sock = makeWASocket({ 
        printQRInTerminal: true, 
        auth: state, 
        defaultQueryTimeoutMs: undefined, 
    }); 
 
    sock.ev.on('connection.update', async (update) => { 
        const { connection, lastDisconnect } = update; 


        if (connection === 'open') {
            const jid = '5521988642844@s.whatsapp.net' 
       await sock.sendMessage(jid, { text: 'Mensagem automática para abrir o servidor 1' })
   }
 /*
        if (connection === 'close') { 
            const shouldReconnect = (lastDisconnect.error instanceof Boom && 
                lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut); 
            console.log('connection closed due to', lastDisconnect.error, ', reconnecting', shouldReconnect); 
           if (shouldReconnect) { 
            connectToWhatsApp2(); 
            } 
        }
        
        */
    }); 

    
    sock.ev.on ('creds.update', saveCreds) 
    
    
     
} 
connectToWhatsApp2();
});
}
//       */30 13-15 * * 1-5
function msgAgendada2() {
    cron.schedule('*/4 18-20 * * 1-5', () => {
        connectToWhatsApp2();
    });
}
module.exports = {
    msgAgendada1,
    msgAgendada2,
  
  };
  
//msgAgendada()
