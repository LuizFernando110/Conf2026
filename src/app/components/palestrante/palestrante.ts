import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PalestranteService } from '../../services/palestrante/palestrante';
import { Palestrante } from '../../services/palestrante/palestrante.model';

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

  palestrantes: Palestrante[] = [];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.palestranteService.buscarPalestrantes().subscribe({
          next: (dados: any) => {
            this.palestrantes = dados?.palestrantes || dados;

            this.cdr.detectChanges();
          },
          error: (erro) => {
            console.error('Erro capturado no subscribe:', erro);
          },
        });
      }, 0);
    }
  }
}
