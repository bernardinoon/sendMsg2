const { Mimetype } = require("@whiskeysockets/baileys");
const { connectToWhatsApp } = require('./__server');



async function wp(sock, number, nome, fluxo,convocacao) {
  var jid = '55' + number + '@s.whatsapp.net';
  const aluno = nome;
  const demanda = fluxo;
  var convoc = convocacao;

  if(convoc == ""){convoc = '-'}

    var dataAtual = new Date();

var dia = dataAtual.getDate();
var mes = dataAtual.getMonth() + 1;
var ano = dataAtual.getFullYear();
var dataFormatada = dia + '/' + mes + '/' + ano;

if(demanda == 'Entrada' || demanda == 'Saída'){
  var txt = '*E.M. Bernardino de Melo*' + '\n' +
    'Registro de:' + " " + '*' + demanda + '*' + '\n' +
    'Aluno(a):' + " " + aluno + '\n' +
    'Na data:' + " " + dataFormatada + '\n' + '\n' +

    '*🛑NÃO RESPONDA ESTA MENSAGEM🛑*' + '\n' + '\n' +
    '_Esta é uma mensagem automática gerada pelo Sistema Escolar *Bernardino On*_' + '\n' +
    '_Para maiores informações acesse: www.sigesc.net_' + '\n' +
    '_ou compareça na Secretaria da escola._' + '\n' +
    '*Juntos somos mais fortes!!!*';
    
  }else if(demanda == 'Ocorrência'){

    var txt = '*❗E.M. Bernardino de Melo❗* ' + '\n' +
    'Registro de:' + " " + '*' + demanda + '*' + '\n' +
    'Aluno(a):' + " " + aluno + '\n' +
    'Na data:' + " " + dataFormatada + '\n' + '\n' +

    convoc + '\n' + '\n' +

    '*🛑NÃO RESPONDA ESTA MENSAGEM🛑*' + '\n' + '\n' +
    '_Esta é uma mensagem automática gerada pelo Sistema Escolar *Bernardino On*_' + '\n' +
    '_Para maiores informações acesse: www.sigesc.net_' + '\n' +
    '_ou compareça na Secretaria da escola._' + '\n' +
    '*Juntos somos mais fortes!!!*';
    
  }



  await sock.sendMessage(jid, { text: txt });
}





  


module.exports = {
  wp,

};
