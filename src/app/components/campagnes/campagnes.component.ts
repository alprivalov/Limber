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
  campagnes: Campaign[] = [];
  q = '';
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
      error: (err) => console.error('Error loading campaigns.json', err),
    });
  }

  /** Campagnes filtrées via le service */
  get filtered(): Campaign[] {
    return this.campaignsService.filterCampaigns(this.campagnes, this.q);
  }

  /** Total de pages via le service */
  get totalPages(): number {
    return this.campaignsService.totalPages(this.filtered, this.pageSize);
  }

  /** Campagnes paginées via le service */
  get paged(): Campaign[] {
    return this.campaignsService.paginate(this.filtered, this.currentPage, this.pageSize);
  }

  /** Label via le service */
  get rangeLabel(): string {
    return this.campaignsService.rangeLabel(this.filtered, this.currentPage, this.pageSize);
  }

  /** Interactions utilisateur */
  onPageSizeChange(opt: number): void {
    this.pageSize = opt;
    this.currentPage = 1;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  trackById(_: number, c: Campaign): number {
    return c.id;
  }
}
