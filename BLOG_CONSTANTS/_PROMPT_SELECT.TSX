interface IPromptSelect {
    label: string;
    options: { [key: string]: number|string }[];
    name: string;
  }

export const PROMPT_SELECT:IPromptSelect[]  = [
  {
    label: "Catergory",
    options: [
    {"all": 0},
    {"blogs and articles": 'blogsAndArticles'},
    {"ads and marketing": 'adsAndMarketing'},
    {"e-commerce": 'eCommerce'},
    {"social media": 'socialMedia'},
    {"website": 'website'},
    {"academic": 'academic'},
    {"other": 'other'},
        
    ],
    name: "category",
  },
    {
    label: "Update",
    options: [
        {"all": 0},
        {"newest": 1},
        {"last week": 2},
        {"last month": 3},
        {"last year": 4},
    ],
    name: "update",
    },
    {
    label: "Rating",
    options: [
        {"all": 0},
        {"5 stars": 5},
        {"4 stars": 4},
        {"3 stars": 3},
        {"2 stars": 2},
        {"1 stars": 1},

    ],
    name: "rating",
    },
];
