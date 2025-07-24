import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoffeeComponent } from './coffee/coffee.component';
import { ListComponent } from './list/list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatSnackBarModule,
    CoffeeComponent,
    ListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'coffee Log';

  constructor(private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    if (window.matchMedia('(display-mode: browser').matches) {
      if ('standalone' in navigator) {
        // safari
        this.snackBar.open(
          'You can install this app, use Share > Add to Home Screen',
          '',
          { duration: 3000 }
        );
      } else {
        // other web browser
        window.addEventListener('beforeinstallprompt', (event) => {
          event.preventDefault();
          const sb = this.snackBar.open('You can install this app', 'Install', {
            duration: 5000,
          });

          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoise.then((result: any) => {
              if (result.outcome === 'dismissed') {
                // TODO:
              } else {
                // TODO:
              }
            });
          });
        });
      }
    }
  }
}
