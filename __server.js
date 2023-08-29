const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, sendMessage, MessageType, MessageOptions, Mimetype } = require("@whiskeysockets/baileys");
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const { Boom } = require('@hapi/boom');
const { wp } = require('./sendMsg');
const { msgAgendada1, msgAgendada2 } = require('./msgAgendada');

// Configuração de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  next();
});

msgAgendada1();
msgAgendada2();



// Configura o servidor para lidar com requisições POST
app.use(express.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.post('/enviar', (req, res) => {
  const nome = req.body.nome;
  const number = req.body.number;
  const fluxo = req.body.fluxo;
  const convocacao = req.body.convocacao;

  connectToWhatsApp(nome, number,fluxo,convocacao);

  res.send('Valores recebidos com sucesso!');
});

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log('Servidor iniciado na porta' + port);
});


function connectToWhatsApp(nome, number,fluxo,convocacao) {
  const msgEntrada = async function envMsg() {
    const { state, saveCreds } = await useMultiFileAuthState('auth/auth_info_baileys');
    const sock = makeWASocket({
      printQRInTerminal: true,
      auth: state,
      defaultQueryTimeoutMs: undefined,
    });
  
    sock.ev.on('connection.update', async(update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'open' && number !== '') {
      
      await wp(sock, number, nome, fluxo,convocacao);
    
       
      }
/*
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect.error instanceof Boom &&
          lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut);
        console.log('connection closed due to', lastDisconnect.error, ', reconnecting', shouldReconnect);
        if (shouldReconnect) {
          connectToWhatsApp(nome, number);
        }
      }*/
    });
    sock.ev.on('creds.update', saveCreds);
  };
 
  msgEntrada();
 
   

}

