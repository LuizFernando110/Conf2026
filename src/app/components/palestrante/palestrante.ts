import { CommonModule, isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed as takeUntilDestroyedRx } from '@angular/core/rxjs-interop';
import { PalestranteService } from '../../services/palestrante/palestrante';
import { Palestrante } from '../../services/palestrante/palestrante.model';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-palestrantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './palestrante.html',
  styleUrls: ['./palestrante.scss'],
})
export class PalestrantesComponent implements OnInit {
  private palestranteService = inject(PalestranteService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  private buscarPalestrantes$ = this.palestranteService.buscarPalestrantes().pipe(
    takeUntilDestroyedRx() 
  );

  palestrantes: Palestrante[] = [];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.buscarPalestrantes$.subscribe({
          next: (dadosFiltrados) => {
            console.log('Dados processados e filtrados chegando no componente:', dadosFiltrados);
            this.palestrantes = dadosFiltrados;
            this.cdr.detectChanges();
          },
          error: (erro) => {
            console.error('Erro crítico não tratado:', erro);
          }
        });
      }, 0);
    }
  }
}