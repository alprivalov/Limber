import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  menu = [
    { icon: 'house', iconFill: 'house-fill', label: 'Accueil', route: 'Acceuil' },
    { icon: 'grid', iconFill: 'grid-fill', label: 'Murs', route: 'murs' },
    { icon: 'file-earmark-text', iconFill: 'file-earmark-text-fill', label: 'Contenus', route: 'contenus' },
    { icon: 'bookmark', iconFill: 'bookmark-fill', label: 'Campagnes', route: 'campagnes' },
    { icon: 'calendar', iconFill: 'calendar-fill', label: 'Calendrier', route: 'calendrier' },
    { icon: 'shuffle', iconFill: 'shuffle', label: 'Scénarios', route: 'scenarios' }, 
    { icon: 'bi bi-magnet', iconFill: 'bi bi-magnet-fill', label: 'Conversion', route: 'conversion' }, 
    { icon: 'bar-chart', iconFill: 'bar-chart-fill', label: 'Statistiques', route: 'statistiques' },
  ];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === '/' + route || (route === '' && this.router.url === '/');
  }
}
