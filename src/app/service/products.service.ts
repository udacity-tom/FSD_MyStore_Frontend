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
        description: "Headphones are a pair of small loudspeaker drivers worn on or around the head over a user's ears. They are electroacoustic transducers, which convert an electrical signal to a corresponding sound. Headphones let a single user listen to an audio source privately, in contrast to a loudspeaker, which emits sound into the open air for anyone nearby to hear. Headphones are also known as earspeakers, earphones[1] or, colloquially, cans.[2] Circumaural ('around the ear') and supra-aural ('over the ear') headphones use a band over the top of the head to hold the speakers in place. Another type, known as earbuds or earpieces[1] consist of individual units that plug into the user's ear canal. A third type are bone conduction headphones, which typically wrap around the back of the head and rest in front of the ear canal, leaving the ear canal open. In the context of telecommunication, a headset is a combination of headphone and microphone. ",
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
        description: "Glasses, also known as eyeglasses or spectacles, are vision eyewear, consisting of glass or hard plastic lenses mounted in a frame that holds them in front of a person\'s eyes, typically utilizing a bridge over the nose and hinged arms (known as temples or temple pieces) which rest over the ears.  Glasses are typically used for vision correction, such as with reading glasses and glasses used for nearsightedness, however, without the specialized lenses, they are sometimes used for cosmetic purposes. ",
        accreditation: "wikipedia.org",
        category: "Reading Aid"
      },
      {
        id: 5,
        name: "Cup",
        price: 4.99,
        url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        snippet: "Drink anything with it!",
        description: "A cup is an close-top container used to hold or cold liquids for pouring or drinking; while mainly used for drinking, it also can be used to store solids for pouring (e.g., sugar, flour, grains).[1][2] Cups may be made of glass, metal, china,[3] clay, wood, stone, polystyrene, plastic, aluminium or other materials, and are usually fixed with a stem, handles, or other adornments. Cups are used for quenching thirst across a wide range of cultures and social classes,[4] and different styles of cups may be used for different liquids or in different situations.[5] Cups of different styles may be used for different types of liquids or other foodstuffs (e.g. teacups and measuring cups), in different situations (e.g. at water stations or in ceremonies and rituals),or for decoration.[",
        accreditation: "wikipedia.org",
        category: "Houseware"
      },
      {
        id: 6,
        name: "Shirt",
        price: 29.99,
        url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80",
        snippet: "Wear it with style!",
        description: "A shirt is a cloth garment for the upper body (from the neck to the waist).  Originally an undergarment worn exclusively by men, it has become, in American English, a catch-all term for a broad variety of upper-body garments and undergarments. In British English, a shirt is more specifically a garment with a collar, sleeves with cuffs, and a full vertical opening with buttons or snaps (North Americans would call that a \"dress shirt\", a specific type of collared shirt). A shirt can also be worn with a necktie under the shirt collar. ",
        accreditation: "wikipedia.org",
        category: "Clothing"
      }
    ]
  }

}
