import { ArticleListFilters } from './../../core/models/article-list-config.model';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { TagService } from '../../core/services/tag.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleListConfig } from '../../core/models/article-list-config.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;
  listConfig: ArticleListConfig = new ArticleListConfig;
  tags: string[] = [];
  tagsLoaded = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tagService: TagService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.isAuthenticated = data.isAuthenticated;

      if (this.isAuthenticated) {
        this.setListTo('feed');
      } else {
        this.setListTo('all');
      }
    });

    this.tagService.getAll().subscribe(tags => {
      this.tags = tags;
      this.tagsLoaded = true;
    });
  }

  setListTo(type: string = '', filters: ArticleListFilters = {}) {
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.listConfig = {type, filters};
  }

}
