
export default [
  {
    label: 'Hero banner',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    data: {
      name: 'hero',
      props: {
        text: 'Hero Text',
        image: {
          desktop: "//i.ewalletcdn.com/8c238593-f39b-4bed-a9f2-efe69412e90e/",
          mobile: "//i.ewalletcdn.com/c7bc3b5e-7dd4-428b-bf1c-0d745cd8dc26/",
          alt: '',
        },
        gradient: 'dark',
        cta: {
          label: 'Discover more',
          path: '/',
        },
      },
    },
  },
  {
    label: 'Text',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    data: {
      name: 'text',
      props: {
        text: 'Widget text',
      }
    },
  },
  {
    label: 'Image',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    data: {
      name: 'image',
      props: {
        text: 'Widget text',
      }
    },
  },
  {
    label: 'Images',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    data: {
      name: 'images',
      props: {
        text: 'Widget text',
      }
    },
  },
  {
    label: 'Tile with image',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    data: {
      name: 'tile-image',
      props: {
        image: {
          mobile: '//ucarecdn.com/49d6d93d-9758-486e-be19-eeb129f49273/',
          desktop: '//ucarecdn.com/ac23df71-d858-46ab-b7fa-e482102b323b/',
          alt: '',
        },
        space: false,
        title: 'Widget Title',
        text: 'Widget text',
        size: 'base',
        cta: {
          path: '/',
          label: 'Discover more',
        },
      }
    },
  },
  {
    label: 'Slider',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    data: {
      name: 'slider',
      props: {
        slides: [],
      }
    }
  },
  {
    label: 'Content tiles',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    data: {
      name: 'content-tiles',
      props: {
        "tileClass": "w-full sm:w-1/3",
        "tiles": [
          {
            "title": "Coles",
            "text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur</p>",
            "image": {
              "mobile": "//ucarecdn.com/6232f3c3-acfb-47c3-b04f-7c74c3939ab7/",
              "alt": "Coles"
            },
            "cta": {
              "path": "/retailer/david-jones",
              "label": "Discover more"
            }
          },
        ]
      }
    },
  },
  {
    label: 'Short content tiles',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    data: {
      name: 'short-content-tiles',
      props: {
        "tileClass": "w-full sm:w-1/3",
        "tiles": [
          {
            "title": "Coles",
            "text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur</p>",
            "image": {
              "mobile": "//ucarecdn.com/6232f3c3-acfb-47c3-b04f-7c74c3939ab7/",
              "alt": "Coles"
            },
            "cta": {
              "path": "/retailer/david-jones",
              "label": "Discover more"
            }
          },
        ]
      }
    },
  },
  {
    label: 'Popular brands',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    data: {
      'name': 'popular',
    },
  }
]
