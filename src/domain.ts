export interface Lib {
  categories: string[];
  applets: Applets[];
}

export interface Applets {
  name: string;
  categories: string[];
}
