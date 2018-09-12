import { authQuery } from '../../auth/+state/auth.selectors';
import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../+state/app.reducer';

@Directive({
  selector: '[appIfAuthed]'
})
export class IfAuthedDirective implements OnInit, OnDestroy {
  private condition?: boolean;
  private isAuthenticated?: boolean;
  private isVisible?: boolean;
  private subscription?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<AppState>
  ) { }

  @Input() set appIfAuthed(condition: boolean) {
    this.condition = condition;
    this.updateVisibility();
  }

  ngOnInit() {
    this.subscription = this.store.select(authQuery.getIsAuthenticated).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.updateVisibility();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateVisibility() {
    const shouldBeVisible = (this.isAuthenticated && this.condition) || (!this.isAuthenticated && !this.condition);

    if (shouldBeVisible === this.isVisible) {
      return;
    }

    this.isVisible = shouldBeVisible;

    if (shouldBeVisible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
