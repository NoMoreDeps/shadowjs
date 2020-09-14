type Price = {
  amount   : number ;
  discount : number ;
  seller   : string ;
}

type GetPriceResult = { [bookId: string]: Price[] }

export const PriceApi = {
  async getPrices(books: string[]) {
    return {
      "Harry Potter and the Philosopher's Stone" : [{ amount: 14.50, discount: 5, seller: "Seller 1"}, { amount: 15.50, discount: 0, seller: "Seller 2"}] ,
      "Harry Potter and the Chamber of Secrets"  : [{ amount: 14.50, discount: 5, seller: "Seller 1"}, { amount: 15.50, discount: 0, seller: "Seller 2"}] ,
      "Harry Potter and the Half-Blood Prince"   : [{ amount: 14.50, discount: 5, seller: "Seller 1"}, { amount: 15.50, discount: 0, seller: "Seller 2"}] ,
      "Harry Potter and the Prisoner of Azkaban" : [{ amount: 14.50, discount: 5, seller: "Seller 1"}, { amount: 15.50, discount: 0, seller: "Seller 2"}] ,
      "Harry Potter and the Goblet of Fire"      : [{ amount: 14.50, discount: 5, seller: "Seller 1"}, { amount: 15.50, discount: 0, seller: "Seller 2"}] ,
    } as GetPriceResult;
  } 
}

type Book = {
  title  : string ;
  photo  : string ;
  author : string ;
  detail : string;
}

type GetLatestBooksResult = { books: Book[] }

export const BookApi = {
  async getLatestBooks() {
    return {books: [
      {title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", detail: ``, photo: ``},
      {title: "Harry Potter and the Chamber of Secrets" , author: "J.K. Rowling", detail: ``, photo: ``},
      {title: "Harry Potter and the Half-Blood Prince"  , author: "J.K. Rowling", detail: ``, photo: ``},
      {title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling", detail: ``, photo: ``},
      {title: "Harry Potter and the Goblet of Fire"     , author: "J.K. Rowling", detail: ``, photo: ``},
    ] } as GetLatestBooksResult;
  },
  async geDetail(bookId: string) {
    return  { books: [
      {title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", detail: ``, photo: ``},
      {title: "Harry Potter and the Chamber of Secrets" , author: "J.K. Rowling", detail: ``, photo: ``},
      {title: "Harry Potter and the Half-Blood Prince"  , author: "J.K. Rowling", detail: ``, photo: ``},
      {title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling", detail: ``, photo: ``},
      {title: "Harry Potter and the Goblet of Fire"     , author: "J.K. Rowling", detail: ``, photo: ``},
    ] }.books.filter(_ => _.title === bookId)[0];
  }
}