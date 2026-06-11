import { Service } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Service()
export class ClienteService {

  static REPO_CLIENTES = '_CLIENTES';

  constructor() { }

  searchClient(nome: string): Cliente[] {
    return this.obterStorage();
  }

  salvarStorage(clientes: Cliente[]) {
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
  }

  save(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);
    this.salvarStorage(storage);
  }

  obterStorage(): Cliente[] {
    const repoClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (repoClientes) {
      const clientes: Cliente[] = JSON.parse(repoClientes);
      return clientes;
    }
    const clientes: Cliente[] = [];
    this.salvarStorage(clientes);
    return clientes;
  }


}
