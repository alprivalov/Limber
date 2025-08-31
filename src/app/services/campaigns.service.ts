import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    console.log(this.jsonUrl)
    return this.http.get<Campaign[]>(this.jsonUrl);
  }
}
