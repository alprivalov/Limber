import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Campaign {
  id: number;
  name: string;
  tags: string[];
  avatar: string;
  shares: number;
  shares_pending: number;
  clicks: number;
  contacts: number;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private jsonUrl = 'assets/data/campaigns.json';

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.jsonUrl);
  }

  /** Filtrer les campagnes selon une query */
  filterCampaigns(campaigns: Campaign[], query: string): Campaign[] {
    const q = query.toLowerCase().trim();
    return campaigns.filter(
      (c) =>
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  /** Paginer une liste de campagnes */
  paginate(campaigns: Campaign[], page: number, pageSize: number): Campaign[] {
    const start = (page - 1) * pageSize;
    return campaigns.slice(start, start + pageSize);
  }

  /** Calculer le nombre total de pages */
  totalPages(campaigns: Campaign[], pageSize: number): number {
    return Math.max(1, Math.ceil(campaigns.length / pageSize));
  }

  /** Générer un label type "x–y of N" */
  rangeLabel(campaigns: Campaign[], page: number, pageSize: number): string {
    if (campaigns.length === 0) return '0–0 of 0';
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, campaigns.length);
    return `${start}–${end} of ${campaigns.length}`;
  }
}
