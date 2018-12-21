const spaceId = "1uue9yu0u0qm"
const environmentId = "master"
const accessToken = "256af853c6a9f465c71b2a431e6495fad2f94500e52e5dc4838fe18c8cc50ef9"

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}`

const sectionTag = document.querySelector("section.grid")


const grabData = function () {
  return fetch(url)
  	.then(response => response.json())
  	.then(data => {
			// store all the assets somewhere
      const assets = data.includes.Asset

      // turn our contentful data into something more useful
    	return data.items.map(item => {
        // set a default
        let imageUrl = "image1.jpg"

        // find the items image id
        const imageId = item.fields.image.sys.id

        // look for something in the assets that matches
        const imageData = assets.find(asset => {
          return asset.sys.id == imageId
        })

        // if it does, make it that url
        if (imageData) {
          imageUrl = 'https:' + imageData.fields.file.url
        }

        item.fields.image = imageUrl
        return item.fields
      })
    })
}

grabData().then(data => {
  // do something with the returned data
  console.log(data)

  //remove loader
  sectionTag.innerHTML = ""

  data.forEach(item => {
    sectionTag.innerHTML = sectionTag.innerHTML + `
      <div class="item">
          <img src="${item.image}">

          <div class="title">
            <h2>${item.title}</h2>
            <p>${item.price}</p>
          </div>

          <p>${item.description}</p>
      </div>
    `
  })
})
