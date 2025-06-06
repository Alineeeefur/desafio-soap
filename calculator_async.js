const soap = require('soap');
const url = 'http://www.dneonline.com/calculator.asmx?WSDL';
const args = process.argv.slice(2);

async function operation(url, intA, intB, op) {
  try {
    const client = await soap.createClientAsync(url);
    const ops = { adicionar: 'Add', subtrair: 'Subtract', multiplicar: 'Multiply', dividir: 'Divide' };
    const method = ops[op];
    if (!method) return console.error('Operação inválida. Use: adicionar, subtrair, multiplicar, dividir');
    const [res] = await client[`${method}Async`]({ intA, intB });
    console.log(`Resultado: ${res[`${method}Result`]}`);
  } catch (err) {
    console.error('Erro:', err);
  }
}

operation(url, parseInt(args[0]), parseInt(args[1]), args[2]);
