import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PalestranteService } from '../../services/palestrante/palestrante';
import { Palestrante } from '../../services/palestrante/palestrante.model';

@Component({
  selector: 'app-palestrantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './palestrante.html',
  styleUrls: ['./palestrante.scss'],
})
export class PalestrantesComponent {
  private palestranteService = inject(PalestranteService);

  termoBusca = signal<string>('');

  palestrantes = toSignal(
    toObservable(this.termoBusca).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((termo) => {
        console.log(`[Busca Otimizada] Disparando requisição HTTP para o termo: "${termo}"`);
        return this.palestranteService.buscarPalestrantes(termo);
      }),
    ),
    { initialValue: [] as Palestrante[] },
  );

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.termoBusca.set(inputElement.value);
  }
}