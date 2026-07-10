import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PalestrantesComponent } from './components/palestrante/palestrante';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PalestrantesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Conf2026');
}
