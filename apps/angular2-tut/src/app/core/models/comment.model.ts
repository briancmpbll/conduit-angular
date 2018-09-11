import { Profile } from './profile.model';

export class Comment {
    id = -1;
    body = '';
    createdAt = '';
    author: Profile = new Profile;
}
