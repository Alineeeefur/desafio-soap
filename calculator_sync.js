const soap = require('soap');
const url = 'http://www.dneonline.com/calculator.asmx?WSDL';
const args = process.argv.slice(2);

function operation(url, intA, intB, op) {
  soap.createClient(url, (err, client) => {
    if (err) return console.error('Erro ao criar cliente SOAP:', err);
    const ops = { adicionar: 'Add', subtrair: 'Subtract', multiplicar: 'Multiply', dividir: 'Divide' };
    const method = ops[op];
    if (!method) return console.error('Operação inválida. Use: adicionar, subtrair, multiplicar, dividir');
    client[method]({ intA, intB }, (err, res) => {
      if (err) return console.error('Erro na operação SOAP:', err);
      console.log(`Resultado: ${res[`${method}Result`]}`);
    });
  });
}

operation(url, parseInt(args[0]), parseInt(args[1]), args[2]);
