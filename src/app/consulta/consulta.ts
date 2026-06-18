import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ClienteService } from '../cliente';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule,
    MatTableModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta {


  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id','nome', 'email', 'cpf', 'dataNascimento','acoes'];

  constructor(private service: ClienteService, private router: Router) {

  }

  ngOnInit() {
    console.log('Passou por Aqui');
    this.listaClientes = this.service.searchClient('');
    console.log(this.listaClientes);
  }

  pesquisar() {
      this.listaClientes = this.service.searchClient(this.nomeBusca);
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], {queryParams: {"id" : id}})
  }

  excluir(id: string) {
    console.log("ID Recebido: ", id)
  }
}
