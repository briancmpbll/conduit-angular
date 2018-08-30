import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { UserService } from '../../core/user.service';

@Directive({
  selector: '[appIfAuthed]'
})
export class IfAuthedDirective implements OnInit {
  private condition?: boolean;
  private isAuthenticated?: boolean;
  private isVisible?: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef,
  ) { }

  @Input() set appIfAuthed(condition: boolean) {
    this.condition = condition;
    this.updateVisibility();
  }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.updateVisibility();
    });
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
