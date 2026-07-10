import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Palestrante } from './palestrante.model';

@Injectable({
  providedIn: 'root',
})
export class PalestranteService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3001/api/palestrantes';

  buscarPalestrantes(): Observable<Palestrante[]> {
    return this.http.get<Palestrante[]>(this.apiUrl);
  }
}