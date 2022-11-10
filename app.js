// Variables
const imageContainer = document.getElementById('imageContainer')
const loader = document.getElementById('loader')

let photosArray = []
let ready = false
let imagesLoaded = 0
let totalImages = 0
let initialLoad = true

let count = 5
const apiKey = 'UNSPLASH API KEY HERE'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Checking if images are loaded
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
    initialLoad = false
    count = 12
  }
}
// Setting attributes to elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Getting images from api
async function getImages() {
  try {
    const res = await fetch(apiUrl)
    photosArray = await res.json()
    showImages()
  } catch (error) {
    console.log('Check Murphy Laws', error)
  }
}

// Displaying images in DOM
function showImages() {
  imagesLoaded = 0
  totalImages = photosArray.length
  photosArray.forEach((photo) => {
    // Creating anchor tag
    const item = document.createElement('a')

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    // Creating image tag
    const img = document.createElement('img')

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    img.addEventListener('load', imageLoaded)

    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

//Listen to the scrolling if near to the bottom of page, and if ready is setting to true
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getImages()
  }
})

getImages()
