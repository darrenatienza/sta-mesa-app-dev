import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description: '',
    media: '/static/images/products/product_1.png',
    title: 'Barangay Clearance',
    totalDownloads: '594',
    url: '/app/document-requests/barangay-clearance'
  },
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description: '',
    media: '/static/images/products/product_2.png',
    title: 'Business Clearance',
    totalDownloads: '625',
    url: '/app/document-requests/business-clearance'
  },

  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: '',
    media: '/static/images/products/product_4.png',
    title: 'Indigency',
    totalDownloads: '406',
    url: '/app/document-requests/indigency'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: '',
    media: '/static/images/products/product_5.png',
    title: 'Relationship',
    totalDownloads: '835',
    url: '/app/document-requests/relationship'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: '',
    media: '/static/images/products/product_6.png',
    title: 'Residency',
    totalDownloads: '835',
    url: '/app/document-requests/residency'
  }
];
