class Pessoa {
  constructor(id, nome, endereco, cidade, estado, telefone) {
      this.id = id;
      this.nome = nome;
      this.endereco = endereco;
      this.cidade = cidade;
      this.estado = estado;
      this.telefone = telefone;
  }

  exibirInformacoes() {
      console.log(`ID: ${this.id}`);
      console.log(`Nome: ${this.nome}`);
      console.log(`Endereço: ${this.endereco}, ${this.cidade} - ${this.estado}`);
      console.log(`Telefone: ${this.telefone}`);
  }
}

class Fisica extends Pessoa {
  constructor(id, nome, endereco, cidade, estado, telefone, cpf, rg, celular) {
      super(id, nome, endereco, cidade, estado, telefone);
      this.cpf = cpf;
      this.rg = rg;
      this.celular = celular;
  }

  validarCPF() {
      const cpfLimpo = this.cpf.replace(/\D/g, '');
      if (cpfLimpo.length !== 11 || /^(.)\1+$/.test(cpfLimpo)) {
          return false;
      }
      let soma = 0;
      for (let i = 0; i < 9; i++) {
          soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
      }
      let resto = 11 - (soma % 11);
      const digito1 = resto < 10 ? resto : 0;
      if (parseInt(cpfLimpo.charAt(9)) !== digito1) {
          return false;
      }
      soma = 0;
      for (let i = 0; i < 10; i++) {
          soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
      }
      resto = 11 - (soma % 11);
      const digito2 = resto < 10 ? resto : 0;
      if (parseInt(cpfLimpo.charAt(10)) !== digito2) {
          return false;
      }
      return true;
  }

  exibirInformacoes() {
      super.exibirInformacoes();
      console.log(`CPF: ${this.cpf} (Válido: ${this.validarCPF()})`);
      console.log(`RG: ${this.rg}`);
      console.log(`Celular: ${this.celular}`);
  }
}

class Juridica extends Pessoa {
  constructor(id, nome, endereco, cidade, estado, telefone, cnpj, razaoSocial) {
      super(id, nome, endereco, cidade, estado, telefone);
      this.cnpj = cnpj;
      this.razaoSocial = razaoSocial;
  }

  validarCNPJ() {
      const cnpjLimpo = this.cnpj.replace(/\D/g, '');
      if (cnpjLimpo.length !== 14 || /^(.)\1+$/.test(cnpjLimpo)) {
          return false;
      }
      let tamanho = cnpjLimpo.length - 2;
      let numeros = cnpjLimpo.substring(0, tamanho);
      const digitos = cnpjLimpo.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
          soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
          if (pos < 2) {
              pos = 9;
          }
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== parseInt(digitos.charAt(0))) {
          return false;
      }
      tamanho = tamanho + 1;
      numeros = cnpjLimpo.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
          soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
          if (pos < 2) {
              pos = 9;
          }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== parseInt(digitos.charAt(1))) {
          return false;
      }
      return true;
  }

  calcularImposto(valorFaturamento, aliquota) {
      if (typeof valorFaturamento !== 'number' || typeof aliquota !== 'number') {
          console.error("Erro: Valor do faturamento e alíquota devem ser números.");
          return NaN;
      }
      return valorFaturamento * (aliquota / 100);
  }

  exibirInformacoes() {
      super.exibirInformacoes();
      console.log(`CNPJ: ${this.cnpj} (Válido: ${this.validarCNPJ()})`);
      console.log(`Razão Social: ${this.razaoSocial}`);
  }
}

// Instanciação dos objetos com dados de exemplo
console.log("--- Instâncias ---");

const pessoa1 = new Pessoa(1, "Nome Genérico", "Rua Exemplo, 123", "Londrina", "PR", "4399999999");
pessoa1.exibirInformacoes();
console.log("---");

const fisica1 = new Fisica(2, "João da Silva", "Av. Paraná, 456", "Cambé", "PR", "4388888888", "123.456.789-00", "9876543", "43991112222");
fisica1.exibirInformacoes();
console.log("---");

const juridica1 = new Juridica(3, "Empresa ABC Ltda.", "Rua das Flores, 789", "Maringá", "PR", "4433334444", "12.345.678/0001-90", "ABC Comércio");
juridica1.exibirInformacoes();
console.log("Imposto Empresa ABC: R$ " + juridica1.calcularImposto(100000, 5));
console.log("---");

const fisica2 = new Fisica(4, "Maria Souza", "Rua dos Andradas, 1010", "Apucarana", "PR", "4377775555", "987.654.321-11", "1122334", "43992223333");
fisica2.exibirInformacoes();
console.log("---");

const juridica2 = new Juridica(5, "Tech Solutions S/A", "Av. Brasil, 2000", "Londrina", "PR", "4322221111", "00.111.222/0001-33", "Tech Solutions");
juridica2.exibirInformacoes();
console.log("Imposto Tech Solutions: R$ " + juridica2.calcularImposto(500000, 8));
console.log("---");