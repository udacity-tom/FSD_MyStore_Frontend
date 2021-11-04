import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // constructor(private http: HttpClient) { }
  constructor() { }


  getProducts(): Product[] {
    return [
      {
        id: 1,
        name: "Book",
        price: 9.99,
        url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        snippet: "You can read it!",
        description: "A book is a medium for recording information in the form of writing or images, typically composed of many pages (made of papyrus, parchment, vellum, or paper) bound together and protected by a cover.[1] The technical term for this physical arrangement is codex (plural, codices). In the history of hand-held physical supports for extended written compositions or records, the codex replaces its predecessor, the scroll. A single sheet in a codex is a leaf and each side of a leaf is a page. ",
        accreditation: "wikipedia.org",
        category: "Book"
      },
      {
        id: 2,
        name: "Headphones",
        price: 249.99,
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        snippet: "Listen to stuff!",
        description: "",
        accreditation: "wikipedia.org",
        category: "Electronics"
      },
      {
        id: 3,
        name: "Backpack",
        price: 79.99,
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        snippet: "Carry things around town!",
        description: "",
        accreditation: "wikipedia.org",
        category: "Baggage"
      },
      {
        id: 4,
        name: "Glasses",
        price: 129.99,
        url: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        snippet: "Now you can see!",
        description: "",
        accreditation: "wikipedia.org",
        category: "Reading Aid"
      },
      {
        id: 5,
        name: "Cup",
        price: 4.99,
        url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        snippet: "Drink anything with it!",
        description: "",
        accreditation: "wikipedia.org",
        category: "Houseware"
      },
      {
        id: 6,
        name: "Shirt",
        price: 29.99,
        url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80",
        snippet: "Wear it with style!",
        description: "",
        accreditation: "wikipedia.org",
        category: "Clothing"
      }
    ]
  }

}
