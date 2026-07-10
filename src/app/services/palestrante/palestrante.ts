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

  buscarPalestrantes(termo: string = ''): Observable<Palestrante[]> {
    return this.http.get<Palestrante[]>(this.apiUrl).pipe(
      tap((dados) => {
        console.log(`[Auditoria] API entregou ${dados?.length || 0} palestrantes brutos.`);
      }),
      map((dados) => {
        const lista = Array.isArray(dados) ? dados : [];

        if (termo) {
          return lista.filter((p) => p.nome.toLowerCase().includes(termo.toLowerCase()));
        }
        return lista;
      }),
      catchError((erro) => {
        console.error('[Fallback] Erro na busca:', erro.message);
        return of([]);
      }),
    );
  }
}
