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

  /** Current page title (taken from the deepest active route) */
  pageTitle: string = '';

  /** Mocked user information (could be replaced by a real auth service) */
  user = { name: 'Jeremy', avatarUrl: 'assets/avatars/Jeremy.png' };

  /** Flag to indicate if notifications are present */
  hasNotifications: boolean = true;

  /** Router subscription used to listen to navigation changes */
  private routerSub?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /** 
   * Lifecycle hook - initialize the component.  
   * Sets the initial page title and listens for route changes. 
   */
  ngOnInit(): void {
    this.updatePageTitle(); // initial title
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.updatePageTitle());
  }

  /** 
   * Lifecycle hook - clean up resources.  
   * Unsubscribes from router events to avoid memory leaks. 
   */
  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  /**
   * Updates the `pageTitle` property with the deepest child route path.  
   * If no title is found, fallback to a dash (—). 
   */
  private updatePageTitle(): void {
    this.pageTitle = this.getDeepestRouteTitle(this.route) || '—';
  }

  /**
   * Extract the deepest child route path and capitalize it.  
   * Example: "campaigns" → "Campaigns".
   */
  private getDeepestRouteTitle(r: ActivatedRoute): string | undefined {
    let cur: ActivatedRoute | null = r;
    let title: string | undefined;

    while (cur?.firstChild) {
      cur = cur.firstChild;
      const path = cur.snapshot.routeConfig?.path;
      if (path) {
        title = path.charAt(0).toUpperCase() + path.slice(1);
      }
    }
    return title;
  }
}
