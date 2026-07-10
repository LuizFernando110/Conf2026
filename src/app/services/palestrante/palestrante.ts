import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Palestrante } from './palestrante.model';

@Injectable({
  providedIn: 'root',
})
export class PalestranteService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3001/api/palestrantes';


  buscarPalestrantes(): Observable<Palestrante[]> {
    return this.http.get<Palestrante[]>(this.apiUrl).pipe(
      
      tap((dados) => {
        console.log(`[Auditoria] Quantidade total de palestrantes recebidos da API: ${dados?.length || 0}`);
      }),

      map((dados) => {
        const lista = Array.isArray(dados) ? dados : [];
        
        return lista.filter(p => p.empresa?.toLowerCase() === 'google');
      }),

      catchError((erro) => {
        console.error('[Fallback] A API falhou ou está fora do ar!', erro.message);
        console.log('[Fallback] Fornecendo um array vazio amigável para a aplicação não travar.');
        
        return of([]);
      })

    );
  }
}