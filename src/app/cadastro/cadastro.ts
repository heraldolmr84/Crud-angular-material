import { FormsModule } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, 
    MatButtonModule, 
    NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit{

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack= Inject(MatSnackBar);

  constructor(private service: ClienteService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe( (query: any) => {

      const params = query['params'];
      const id = params['id'];

      if(id) {

        let clienteEncontrado = this.service.findById(id);

        if(clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }        
      }
    });
  }

  saveClient() {

    if(!this.atualizando) {
      this.service.save(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem("Registro Salvo com sucesso!", );
    } else {
      this.service.update(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem("Registro atualizado com sucesso!");
    }    
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem,"OK" );
  }
}
