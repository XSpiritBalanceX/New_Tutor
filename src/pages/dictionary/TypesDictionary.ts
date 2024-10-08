export enum WordsTypes {
  "Noun" = 1,
  "Verb" = 2,
  "Ph. Verb" = 3,
  "Adj." = 4,
  "Adv." = 5,
}

export type TWord = {
  word: string;
  type: number;
  translation: string;
  status: number;
};

export interface IWords {
  all_words: TWord[];
  favorites: TWord[];
  [x: string]: TWord[];
}
