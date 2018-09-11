import { ArticleListConfig } from './../../core/models/article-list-config.model';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../../core/models/profile.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.css']
})
export class ProfileFavoritesComponent implements OnInit {
  profile: Profile = new Profile;
  favoritesConfig: ArticleListConfig = new ArticleListConfig;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.data.subscribe(data => {
        this.profile = data.profile;
        this.favoritesConfig.filters.favorited = this.profile.username;
      });
    }
  }

}
