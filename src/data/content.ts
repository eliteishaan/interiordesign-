export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Process', href: '#process' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
];

export const featuredProject = {
  title: 'Casa Solara',
  location: 'Malibu, California',
  year: '2024',
  type: 'Primary Residence',
  size: '8,400 sq ft',
  description:
    'Nestled into the coastal cliffs of Malibu, Casa Solara is a meditation on light, material honesty, and the quiet dialogue between architecture and landscape. Every threshold was considered; every surface chosen to age with grace.',
  philosophy:
    'We approached this residence not as a collection of rooms, but as a sequence of atmospheres — each one calibrated to the movement of the sun and the rhythm of family life.',
  materials: ['Travertine', 'White Oak', 'Bronze', 'Linen', 'Lime Plaster'],
  images: {
    main: '/images/featured-main.jpg',
    living: '/images/featured-2.jpg',
    exterior: '/images/featured-3.jpg',
    detail: '/images/featured-4.jpg',
  },
};

export const projects = [
  {
    id: '01',
    title: 'The Atelier House',
    location: 'Brooklyn, New York',
    year: '2023',
    type: 'Townhouse',
    image: '/images/work-1.jpg',
  },
  {
    id: '02',
    title: 'Villa Nocturne',
    location: 'Tuscany, Italy',
    year: '2023',
    type: 'Estate',
    image: '/images/work-2.jpg',
  },
  {
    id: '03',
    title: 'Ash & Linen',
    location: 'London, UK',
    year: '2022',
    type: 'Apartment',
    image: '/images/work-3.jpg',
  },
  {
    id: '04',
    title: 'The Courtyard',
    location: 'Santa Fe, NM',
    year: '2022',
    type: 'Residence',
    image: '/images/work-4.jpg',
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We begin with deep listening — understanding how you live, what you value, and the quiet ambitions you hold for your space. Site visits, conversations, and material explorations form the foundation.',
  },
  {
    number: '02',
    title: 'Concept',
    description:
      'From research emerges a clear architectural narrative. We develop spatial concepts, material palettes, and light studies that establish the emotional and functional direction of the project.',
  },
  {
    number: '03',
    title: 'Refine',
    description:
      'Every detail is examined. Joinery, proportions, finishes, and furniture are refined through iterative design — until nothing feels forced and everything feels inevitable.',
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'We oversee craftsmanship with the same care we bring to design. From construction administration to final styling, we remain present until the space is ready to be lived in.',
  },
];

export const materials = [
  {
    name: 'Wood',
    description: 'White oak, walnut, and reclaimed timber — selected for grain, warmth, and longevity.',
    image: '/images/material-wood.png',
  },
  {
    name: 'Stone',
    description: 'Limestone, travertine, and basalt — quarried for texture and geological character.',
    image: '/images/material-stone.png',
  },
  {
    name: 'Marble',
    description: 'Calacatta, honed Carrara, and rare veined stones used with restraint and intention.',
    image: '/images/material-marble.png',
  },
  {
    name: 'Fabric',
    description: 'Linen, bouclé, and handwoven textiles that soften architecture with tactile presence.',
    image: '/images/material-fabric.png',
  },
  {
    name: 'Metal',
    description: 'Bronze, brushed brass, and blackened steel — hardware that ages into beauty.',
    image: '/images/material-metal.png',
  },
  {
    name: 'Light',
    description: 'Natural illumination first. Then sculptural fixtures that cast atmosphere, not glare.',
    image: '/images/material-light.png',
  },
];

export const testimonials = [
  {
    quote:
      'Rowan & Ash did not simply design our home — they composed a way of living. Every room holds a quiet intelligence. We feel more ourselves here.',
    author: 'Eleanor & James Hartwell',
    project: 'Casa Solara, Malibu',
  },
  {
    quote:
      'Their restraint is their greatest luxury. Nothing is superfluous. Everything has purpose. Working with them was an education in what architecture can be.',
    author: 'Marcus Chen',
    project: 'The Atelier House, Brooklyn',
  },
  {
    quote:
      'They understood our vision before we could articulate it. The result is a space that feels both timeless and completely personal — a rare achievement.',
    author: 'Isabella Moretti',
    project: 'Villa Nocturne, Tuscany',
  },
];

export const journalArticles = [
  {
    id: '01',
    title: 'The Quiet Power of Negative Space',
    category: 'Philosophy',
    date: 'March 2025',
    excerpt:
      'In an age of excess, the most radical design choice is restraint. How emptiness becomes the most expressive material in a room.',
    image: '/images/journal-1.png',
  },
  {
    id: '02',
    title: 'Material Honesty in Contemporary Homes',
    category: 'Craft',
    date: 'January 2025',
    excerpt:
      'Why we choose materials that reveal their nature — and how patina, grain, and imperfection become the soul of a space.',
    image: '/images/journal-2.png',
  },
  {
    id: '03',
    title: 'A Conversation with Light',
    category: 'Architecture',
    date: 'November 2024',
    excerpt:
      'Light is not an accessory to architecture — it is the medium. Notes from a year of designing with the sun as collaborator.',
    image: '/images/journal-3.png',
  },
];

export const team = [
  {
    name: 'Elena Rowan',
    role: 'Founding Principal',
    image: '/images/portrait-2.jpg',
    bio: 'Trained at the Architectural Association, Elena brings two decades of residential practice spanning London, Milan, and Los Angeles.',
  },
  {
    name: 'Thomas Ash',
    role: 'Founding Principal',
    image: '/images/portrait-1.jpg',
    bio: 'A former furniture designer turned spatial architect, Thomas grounds every project in material craft and human scale.',
  },
];
