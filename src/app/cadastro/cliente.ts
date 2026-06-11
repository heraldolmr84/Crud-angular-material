import { v4 as uuidv4 } from 'uuid';

export class Cliente {

    id?: String;
    nome?: String;
    email?: String;
    cpf?: String;
    dataNascimento?: String;

    static newCliente() {
      const cliente = new Cliente();
      cliente.id = uuidv4();
      return cliente;
    }
}
