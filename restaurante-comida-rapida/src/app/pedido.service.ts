import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Pedido {
  numero: number;
  nombre: string;
  descripcion: string;
  fecha: Date;
  estado: 'pendiente' | 'en_coccion' | 'listo' | 'entregado';
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidos: Pedido[] = [];
  private pedidosSubject = new BehaviorSubject<Pedido[]>([]);
  private pedidoEnCoccion: Pedido | null = null;

  constructor() {}

  getPedidos(): Observable<Pedido[]> {
    return this.pedidosSubject.asObservable();
  }

  getPedidoEnCoccion(): Pedido | null {
    return this.pedidoEnCoccion;
  }

  agregarPedido(pedido: Omit<Pedido, 'numero' | 'fecha' | 'estado'>): void {
    const nuevoPedido: Pedido = {
      ...pedido,
      numero: Math.floor(Math.random() * 1000) + 1,
      fecha: new Date(),
      estado: 'pendiente'
    };
    this.pedidos.push(nuevoPedido);
    this.pedidosSubject.next(this.pedidos);
  }

  iniciarCoccion(numeroPedido: number): boolean {
    if (this.pedidoEnCoccion) {
      return false; // Ya hay un pedido en cocción
    }
    const pedido = this.pedidos.find(p => p.numero === numeroPedido && p.estado === 'pendiente');
    if (pedido) {
      pedido.estado = 'en_coccion';
      this.pedidoEnCoccion = pedido;
      this.pedidosSubject.next(this.pedidos);
      return true;
    }
    return false;
  }

  finalizarCoccion(): void {
    if (this.pedidoEnCoccion) {
      this.pedidoEnCoccion.estado = 'listo';
      this.pedidoEnCoccion = null;
      this.pedidosSubject.next(this.pedidos);
    }
  }

  entregarPedido(numeroPedido: number): void {
    const pedido = this.pedidos.find(p => p.numero === numeroPedido && p.estado === 'listo');
    if (pedido) {
      pedido.estado = 'entregado';
      this.pedidosSubject.next(this.pedidos);
    }
  }
}
