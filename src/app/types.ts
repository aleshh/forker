/*

{
  tombstone: {
    bnm: false,
    bnr: true,
    albums: [
      {
        id: "650206e65b178f735ea1439a",
        album: {
          artists: [
            {
              id: "5929966dc0084474cd0bf072",
              display_name: "The Replacements",
              url: "/artists/3559-the-replacements/",
              genres: [{ display_name: "Rock", slug: "rock" }],
              slug: "5929966dc0084474cd0bf072",
              photos: {
                tout: {
                  width: 300,
                  height: 300,
                  credit: "",
                  caption: "",
                  altText:
                    "Image may contain: Human, Person, People, Family, and Face",
                  modelName: "photo",
                  title: "The Replacements artist image",
                  sizes: {
                    sm: "https://media.pitchfork.com/photos/5929966ec0084474cd0bf074/1:1/w_150/d6cdff75.jpg",
                    m: "https://media.pitchfork.com/photos/5929966ec0084474cd0bf074/1:1/w_300/d6cdff75.jpg",
                  },
                },
                lede: false,
                social: false,
              },
            },
          ],
          display_name: "Tim (Let It Bleed Edition)",
          labels: [
            {
              id: "59260890c31f3f3472b1d691",
              name: "Rhino",
              display_name: "Rhino",
            },
          ],
          release_year: 2023,
          photos: {
            tout: {
              width: 4000,
              height: 4000,
              credit: "",
              caption: "",
              altText: "The Replacements: Tim (Let It Bleed Edition)",
              title: "The Replacements: Tim (Let It Bleed Edition)",
              sizes: {
                list: "https://media.pitchfork.com/photos/64d822f671e86f1e192e9572/1:1/w_160/The-Replacements-Tim-Let-It-Bleed-Edition.jpg",
                standard:
                  "https://media.pitchfork.com/photos/64d822f671e86f1e192e9572/1:1/w_600/The-Replacements-Tim-Let-It-Bleed-Edition.jpg",
                homepageSmall:
                  "https://media.pitchfork.com/photos/64d822f671e86f1e192e9572/1:1/w_55/The-Replacements-Tim-Let-It-Bleed-Edition.jpg",
                homepageLarge:
                  "https://media.pitchfork.com/photos/64d822f671e86f1e192e9572/1:1/w_320/The-Replacements-Tim-Let-It-Bleed-Edition.jpg",
              },
            },
            lede: false,
            social: false,
          },
        },
        rating: {
          display_rating: "10.0",
          rating: "10.0",
          bnm: false,
          bnr: true,
        },
        labels_and_years: [
          {
            labels: [
              {
                id: "59260890c31f3f3472b1d691",
                name: "Rhino",
                display_name: "Rhino",
              },
            ],
            year: 2023,
          },
        ],
      },
    ],
  },
  artists: [
    {
      id: "5929966dc0084474cd0bf072",
      display_name: "The Replacements",
      url: "/artists/3559-the-replacements/",
      genres: [{ display_name: "Rock", slug: "rock" }],
      slug: "5929966dc0084474cd0bf072",
      photos: {
        tout: {
          width: 300,
          height: 300,
          credit: "",
          caption: "",
          altText: "Image may contain: Human, Person, People, Family, and Face",
          modelName: "photo",
          title: "The Replacements artist image",
          sizes: {
            sm: "https://media.pitchfork.com/photos/5929966ec0084474cd0bf074/1:1/w_150/d6cdff75.jpg",
            m: "https://media.pitchfork.com/photos/5929966ec0084474cd0bf074/1:1/w_300/d6cdff75.jpg",
          },
        },
        lede: false,
        social: false,
      },
    },
  ],
  genres: [{ display_name: "Rock", slug: "rock" }],
  channel: "",
  subChannel: "",
  position: 0,
  id: "6502072554f1b1e9e81b851d",
  url: "/reviews/albums/the-replacements-tim-let-it-bleed-edition/",
  contentType: "albumreview",
  title: "<em>Tim (Let It Bleed Edition)</em>",
  seoTitle: "Tim (Let It Bleed Edition)",
  socialTitle: "The Replacements: Tim (Let It Bleed Edition)",
  promoTitle: "<em>Tim (Let It Bleed Edition)</em>",
  authors: [
    {
      id: "592604c0d82c58364dc335de",
      name: "Jeremy D. Larson",
      title: "Reviews Director",
      url: "/staff/jeremy-d-larson/",
      slug: "staff/jeremy-d-larson",
    },
  ],
  pubDate: "2023-09-23T04:00:00.000Z",
  timestamp: 1695441600000,
  modifiedAt: "2023-09-22T19:12:36.391Z",
  dek: "<p>This deluxe reissue is the holy grail that fans of <em>Tim</em> have dreamt of: a new mix that instantly becomes the best and most definitive album in the Replacements’ catalog.</p>\n",
  seoDescription:
    "This deluxe reissue is the holy grail that fans of Tim have dreamt of: a new mix that instantly becomes the best and most definitive album in the Replacements’ catalog.",
  promoDescription:
    "<p>This deluxe reissue is the holy grail that fans of <em>Tim</em> have dreamt of: a new mix that instantly becomes the best and most definitive album in the Replacements’ catalog.</p>\n",
  socialDescription: "Read Jeremy D. Larson’s review of the album.",
  privateTags: ["_ft:opinion"],
  tags: [],
}

*/

export interface Album {
  tombstone: Tombstone;
  artists?: ArtistsEntity[] | null;
  genres?: GenresEntity[] | null;
  channel: string;
  subChannel: string;
  position: number;
  id: string;
  url: string;
  contentType: string;
  title: string;
  seoTitle: string;
  socialTitle: string;
  promoTitle: string;
  authors?: AuthorsEntity[] | null;
  pubDate: string;
  timestamp: number;
  modifiedAt: string;
  dek: string;
  seoDescription: string;
  promoDescription: string;
  socialDescription: string;
  privateTags?: string[] | null;
  tags?: null[] | null;
}
export interface Tombstone {
  bnm: boolean;
  bnr: boolean;
  albums: AlbumsEntity[] | null;
}
export interface AlbumsEntity {
  id: string;
  album: Album1;
  rating: Rating;
  labels_and_years?: LabelsAndYearsEntity[] | null;
}
export interface Album1 {
  artists?: ArtistsEntity[] | null;
  display_name: string;
  labels?: LabelsEntity[] | null;
  release_year: number;
  photos: Photos;
}
export interface ArtistsEntity {
  id: string;
  display_name: string;
  url: string;
  genres?: GenresEntity[] | null;
  slug: string;
  photos: Photos1;
}
export interface GenresEntity {
  display_name: string;
  slug: string;
}
export interface Photos1 {
  tout: Tout;
  lede: boolean;
  social: boolean;
}
export interface Tout {
  width: number;
  height: number;
  credit: string;
  caption: string;
  altText: string;
  modelName: string;
  title: string;
  sizes: Sizes;
}
export interface Sizes {
  sm: string;
  m: string;
}
export interface LabelsEntity {
  id: string;
  name: string;
  display_name: string;
}
export interface Photos {
  tout: Tout1;
  lede: boolean;
  social: boolean;
}
export interface Tout1 {
  width: number;
  height: number;
  credit: string;
  caption: string;
  altText: string;
  title: string;
  sizes: Sizes1;
}
export interface Sizes1 {
  list: string;
  standard: string;
  homepageSmall: string;
  homepageLarge: string;
}
export interface Rating {
  display_rating: string;
  rating: string;
  bnm: boolean;
  bnr: boolean;
}
export interface LabelsAndYearsEntity {
  labels?: LabelsEntity[] | null;
  year: number;
}
export interface AuthorsEntity {
  id: string;
  name: string;
  title: string;
  url: string;
  slug: string;
}
