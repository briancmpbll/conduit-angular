export interface ArticleListFilters {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: string;
    offset?: string;
}

export class ArticleListConfig {
    type = 'all';

    filters: ArticleListFilters = {};
}
