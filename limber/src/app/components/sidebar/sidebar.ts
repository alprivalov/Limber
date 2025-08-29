import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  menu = [
    { icon: 'house', label: 'Accueil' },
    { icon: 'grid', label: 'Murs' },
    { icon: 'file-earmark-text', label: 'Contenus' },
    { icon: 'bookmark', label: 'Campagnes', active: true },
    { icon: 'calendar', label: 'Calendrier' },
    { icon: 'shuffle', label: 'Scénarios' },
    { icon: 'arrow-repeat', label: 'Conversion' },
    { icon: 'bar-chart', label: 'Statistiques' },
    { icon: 'gear', label: 'Paramètres' },
  ];
}

// Note: The component class is named SidebarComponent to follow Angular naming conventions.