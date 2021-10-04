let store = {
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    data: '',
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {

    let { rovers} = state

    return `
        <header></header>
        <main>
            <h1>Mars Rover Dashboard</h1>
            <section class="btns">
                ${roverBtns(rovers)}
             </section>
           
            <div id="showRover">
            ${RenderHTML(state)}
            </div>
                    

        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.

const roverBtns = (rovers) => {
    const roverNav = rovers.map(rover => {
        return `<button onclick="getRoverData('${rover}')">${rover}</button>`
    })
    return roverNav.join(' ')


}
const showImages = (roverData) =>{
    let images = roverData.map(image => {
        return `<img src="${image.img_src}">`
    })
    return images.join('')
}
const RenderHTML = (state) => {
    let { data } = state
    if (data) {
        let roverData = state.data.image.latest_photos
        return `
        <p><b>Rover Name:</b> ${roverData[0].rover.name}</p>
        <p><b>Launch Date:</b> ${roverData[0].rover.launch_date}</p>
        <p><b>Landing Date:</b> ${roverData[0].rover.landing_date}</p>
        <p><b>Status:</b> ${roverData[0].rover.status}</p>
        <p><b>Date of most recent photo:</b> ${roverData[0].earth_date}</p>
        <p><b>Latest Images:</b><p>
        <div>${showImages(roverData)}</div>
    `
    }
    else
        return '<p>Please choose a rover</p>'
}

// ------------------------------------------------------  API CALLS

const getRoverData = (rovers) => {

    fetch(`http://localhost:3000/rovers/${rovers}`)
        .then(res => res.json())
        .then(data => updateStore(store, { data } ))
}
