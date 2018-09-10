import { ArticleListConfig } from './../../core/models/article-list-config.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../core/models/profile.model';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.css']
})
export class ProfileArticlesComponent implements OnInit {
  profile: Profile = new Profile;
  articlesConfig: ArticleListConfig = new ArticleListConfig;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.data.subscribe(data => {
        this.profile = data.profile;
        this.articlesConfig.filters.author = this.profile.username;
      });
    }
  }

}
