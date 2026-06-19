import { Service } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Service()
export class ClienteService {

  static REPO_CLIENTES = '_CLIENTES';

  constructor() { }

  searchClient(nomeBusca: string): Cliente[] {
    const clientes = this.obterStorage();

    if (!nomeBusca) {
      return clientes;
    }

    return clientes.filter(cliente => cliente.nome?.toLowerCase().indexOf(nomeBusca.toLowerCase()) !== -1);

  }

  findById(id: string): Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id);
  }

  update(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.forEach(c => {
      if(c.id === cliente.id) {
        Object.assign(c, cliente);
      }
    });

    this.salvarStorage(storage);
  }

  salvarStorage(clientes: Cliente[]) {
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
  }

  save(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);
    this.salvarStorage(storage);
  }

  deletar(cliente: Cliente) {

    const storage = this.obterStorage();

    const novaLista =storage.filter(c => c.id !== cliente.id)

    this.salvarStorage(novaLista);
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
