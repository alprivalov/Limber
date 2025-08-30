import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar';
import { TopbarComponent } from './components/topbar/topbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SidebarComponent,TopbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('limber');
}
