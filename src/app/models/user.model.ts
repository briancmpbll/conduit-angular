export class User {
    email?: string;
    token?: string;
    username?: string;
    bio?: string;
    image?: string;
}

export interface AuthCredentials {
    email: string;
    password: string;
    username?: string;
}
