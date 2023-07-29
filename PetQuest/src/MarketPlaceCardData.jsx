export const MarketPlaceCardData = [
  {
    title: 'Collar con GPS',
    species: 'perro/gato',
    brand: 'Al Pin',
    model: 'g12p',
    producer: 'petTracker',
    pictures: [
      require('./imgs/marketplace/marketPlace1_1.png'),
      require('./imgs/marketplace/marketPlace1_2.png'),
      require('./imgs/marketplace/marketPlace1_3.png'),
    ],
    amount: 100000,
    discount: '   10% OFF',
    description:
      'Con nuestro Rastreador GPS para Mascotas, estarás conectado en todo momento, manteniendo a tu mascota segura y cerca de ti.',
    location: {
      latitude: -34.618554,
      longitude: -58.43054,
    },
    contact: {
      zone: 'Caballito',
      email: 'petTracker@gmail.com',
    },
  },
  {
    title: 'Servicio de red para gatos',
    species: 'gato',
    brand: 'RedesMallas',
    model: 'g12p',
    producer: 'Juan Pérez',
    pictures: [
      require('./imgs/marketplace/marketPlace2_1.png'),
      require('./imgs/marketplace/marketPlace2_2.png'),
      require('./imgs/marketplace/marketPlace2_3.png'),
    ],
    amount: 40000,
    discount: '   15% OFF',
    description: 'Curiosidad segura para tu gato!',
    location: {
      latitude: -34.568209,
      longitude: -58.493984,
    },
    contact: {
      zone: 'Villa Urquiza',
      email: 'RedesMallas@gmail.com',
    },
  },
  {
    title: 'Cerco perimetral para perros',
    species: 'perro',
    brand: 'Allmemories',
    model: 'Ultrasonico',
    producer: 'dogKeeper',
    pictures: [
      require('./imgs/marketplace/marketPlace3_1.png'),
      require('./imgs/marketplace/marketPlace3_2.png'),
    ],
    amount: 70000,
    discount: '',
    description:
      'Para todos los perros de cualquier tamaño y edad\nCollar resistente a impactos, recargable y resistente al agua',
    location: {
      latitude: -34.625735,
      longitude: -58.478701,
    },
    contact: {
      zone: 'Floresta',
      email: 'Allmemories@gmail.com',
    },
  },
];

export default MarketPlaceCardData;
