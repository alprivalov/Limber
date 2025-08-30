import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy {
  pageTitle = '';
  user = { name: 'Jeremy', avatarUrl: 'assets/avatars/Jeremy.png' };
  hasNotif = true;
  private sub?: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const update = () => this.pageTitle = this.getDeepestTitle(this.route) || '—';
    update(); // initial
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => update());
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  private getDeepestTitle(r: ActivatedRoute): string | undefined {
    let cur: ActivatedRoute | null = r;
    let title: string | undefined;

    while (cur?.firstChild) {
      cur = cur.firstChild;
      const t = cur.snapshot.routeConfig?.path;
      if (t) {
        title = t.charAt(0).toUpperCase() + t.slice(1);
      }
    }

    return title;
  }

}
