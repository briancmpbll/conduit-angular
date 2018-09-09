import { Profile } from './profile.model';

export class Article {
    slug = '';
    title = '';
    description = '';
    body = '';
    tagList: Array<string> = [];
    createdAt = '';
    updatedAt = '';
    favorited = false;
    favoritesCount = 0;
    author: Profile = new Profile;
}
