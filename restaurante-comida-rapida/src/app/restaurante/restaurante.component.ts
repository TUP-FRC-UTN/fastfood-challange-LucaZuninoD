import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosComponent } from '../pos/pos.component';
import { CocinaComponent } from '../cocina/cocina.component';
import { PuntoEntregaComponent } from '../punto-entrega/punto-entrega.component';
import { PedidoService } from '../pedido.service';
@Component({
  selector: 'app-restaurante',
  standalone: true,
  imports: [CommonModule, PosComponent, CocinaComponent, PuntoEntregaComponent],  templateUrl: './restaurante.component.html',
  styleUrl: './restaurante.component.css'
})
export class RestauranteComponent {
  constructor(private pedidoService: PedidoService) {}
}
