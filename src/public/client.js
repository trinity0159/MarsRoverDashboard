let store = {
    user: { name: "Katrina" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    selectedRover: 'Curiosity',
}
//const roverNames = store.rovers

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    console.log('test update store')
    console.log(store)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers, apod } = state
console.log(rovers);
    return `
        <header></header>
        <main>
            <h1>Mars Rover Dashboard</h1>
            ${Greeting(store.user.name)}
            <section>
                <h3>Choose a rover below:</h3>
                ${roverBtns(rovers)}
            <section id="showRover">
            
            </section>
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
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}
const roverBtns = (rovers) => {
    const roverNav = rovers.map(rover => `<button onclick="renderHTML('${rover}')">${rover}</button>`)
    return roverNav.join(' ');

}

function renderHTML(rover){
    getRoverData(rover)
   let roverData = store.rovers.image.latest_photos;
   console.log(`get current rover data`)
    console.log(roverData);
    document.getElementById('showRover').innerHTML = `
        Rover Name: ${rover}<br>
        Launch Date: ${roverData[0].rover.launch_date}<br>
        Landing Date: ${roverData[0].rover.landing_date}<br>
        Rover Name Test: ${roverData[0].rover.name}
    `
}
const currentRover = (rover) => {

}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
}
const getRoverData = (state) => {
    let { rovers } = state
    fetch(`http://localhost:3000/rovers/${state}`)
        .then(res => res.json())
        .then(rovers => updateStore(store, { rovers }))
}
