export interface ArticleListFilters {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
}

export class ArticleListConfig {
    type = 'all';

    filters: ArticleListFilters = {};
}
