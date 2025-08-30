import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CampaignsService, Campaign } from '../../services/campaigns.service';
import { ThousandSepPipe } from '../../shared/thousand-sep-pipe';

@Component({
  selector: 'app-campagnes',
  standalone: true,
  imports: [CommonModule, FormsModule, ThousandSepPipe],
  templateUrl: './campagnes.component.html',
  styleUrls: ['./campagnes.component.css'],
})
export class CampagnesComponent implements OnInit {
  // Données
  campagnes: Campaign[] = [];

  // Recherche
  q = '';

  // Pagination
  pageSizeOptions = [5, 10, 20];
  pageSize = 5;
  currentPage = 1;

  constructor(private campaignsService: CampaignsService) {}

  ngOnInit(): void {
    this.campaignsService.getCampaigns().subscribe({
      next: (data) => {
        this.campagnes = data;
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
      },
      error: (err) => console.error('Erreur chargement campaigns.json', err),
    });
  }

  /** Liste filtrée par la recherche */
  get filtered(): Campaign[] {
    const q = this.q.toLowerCase().trim();
    return this.campagnes.filter(
      (c) =>
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  /** Nombre total de pages */
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }

  /** Slice paginée utilisée par le template */
  get paged(): Campaign[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  /** Libellé "x–y sur N" */
  get rangeLabel(): string {
    if (this.filtered.length === 0) return '0–0 sur 0';
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.filtered.length);
    return `${start}–${end} sur ${this.filtered.length}`;
  }

  /** Changement du nombre de résultats par page */
  onPageSizeChange(opt: number): void {
    this.pageSize = opt;
    this.currentPage = 1;
  }

  /** Page précédente / suivante */
  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  /** TrackBy pour *ngFor (perf) */
  trackById(_: number, c: Campaign): number {
    return c.id;
  }
}
