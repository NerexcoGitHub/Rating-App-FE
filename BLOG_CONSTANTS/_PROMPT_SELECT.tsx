interface IPromptSelect {
    label: string;
    options: { [key: string]: number|string }[];
    name: string;
  }

export const PROMPT_SELECT:IPromptSelect[]  = [
  {
    label: "Catergory",
    options: [
    {"All": 0},
    {"Blogs and articles": 'blogsAndArticles'},
    {"Ads and marketing": 'adsAndMarketing'},
    {"E-commerce": 'eCommerce'},
    {"Social media": 'socialMedia'},
    {"Website": 'website'},
    {"Academic": 'academic'},
    {"Other": 'other'},
        
    ],
    name: "category",
  },
    {
    label: "Update",
    options: [
        {"All": 0},
        {"Newest": 1},
        {"Last week": 2},
        {"Last month": 3},
        {"Last year": 4},
    ],
    name: "update",
    },
    {
    label: "Rating",
    options: [
        {"All": 0},
        {"5 stars": 5},
        {"4 stars": 4},
        {"3 stars": 3},
        {"2 stars": 2},
        {"1 stars": 1},

    ],
    
    name: "rating",
    },
];
