const togleMenu = () => {
    const navigation = document.querySelector("nav")
    const navbutton = document.querySelector(".button-menu")
    navigation.classList.toggle('open')
    if (navigation.classList.contains("open")){
        navbutton.textContent = "\u2715"
    } else {
        navbutton.textContent = "\u2630"
    }
}

document.querySelector(".button-menu").addEventListener("click", togleMenu)

const getWeather = () => {
    const apiForecast = "https://api.openweathermap.org/data/2.5/forecast?id=3598132&units=metric&appid=2f4da8fb1f6d9955ed9fe6bd18c92e85"
    const apiCurrent = "https://api.openweathermap.org/data/2.5/weather?id=3598132&units=metric&appid=2f4da8fb1f6d9955ed9fe6bd18c92e85"
    fetch(apiCurrent)
        .then(data => data.json())
        .then(data => {
            const mainWeather = document.querySelector("#mainWeather")
            const mainWeatherDescription = document.querySelector("#mainWeatherDescription")
            const mainWeatherHumidity = document.querySelector("#mainWeatherHumidity")
            mainWeather.textContent = data.main.temp
            mainWeatherDescription.textContent = data.weather[0].description
            mainWeatherHumidity.textContent = `Humidity: ${data.main.humidity}`
            
        })
    
    fetch(apiForecast)
        .then(data => data.json())
        .then(data => {
            const forecast1 = document.querySelector("#forecast1")
            const forecast2 = document.querySelector("#forecast2")
            const forecast3 = document.querySelector("#forecast3")
            const forecast1Date = document.querySelector("#forecast1Date")
            const forecast2Date = document.querySelector("#forecast2Date")
            const forecast3Date = document.querySelector("#forecast3Date")
            forecast1.textContent = `${data.list[5].main.temp}°C`
            forecast1.setAttribute("title", data.list[5].dt_txt)
            forecast1Date.textContent = splitDate(data.list[5].dt_txt)
            forecast2.textContent = `${data.list[10].main.temp}°C`
            forecast2.setAttribute("title", data.list[10].dt_txt)
            forecast2Date.textContent = splitDate(data.list[10].dt_txt)
            forecast3.textContent = `${data.list[15].main.temp}°C`
            forecast3.setAttribute("title", data.list[15].dt_txt)
            forecast3Date.textContent = splitDate(data.list[15].dt_txt)
        })
}

const getTempleInfo = () => {
    const templesUrl = "https://raw.githubusercontent.com/wilsonBYU/templeinnsuites/main/data/templeData.json"
    fetch(templesUrl)
        .then(data => data.json())
        .then(data => {
            const temples = document.querySelector(".temples")
            data.temples.map((temple, key) => temples.appendChild(displayTempleInfo(temple, key)))
            likesSetup()
        })
}

const displayTempleInfo = (temple, key) => {
    const container = document.createElement("section")
    container.classList.add("temple-container")
    
    const templeImage = document.createElement("img")
    templeImage.setAttribute("src", temple.picture)
    templeImage.setAttribute("alt", temple.name)
    
    const templeName = document.createElement("h2")
    templeName.textContent = temple.name
    
    const templeHistory = document.createElement("p")
    templeHistory.textContent = temple.history
    
    const templeAddress = document.createElement("p")
    templeAddress.textContent = temple.address
    
    const templePhone = document.createElement("p")
    templePhone.textContent = temple.tel
        
    const templeEmail = document.createElement("p")
    templeEmail.textContent = temple.email
    templeEmail.classList.add("temple-email")
    
    const templeServices = document.createElement("p")
    templeServices.textContent = temple.services
    
    const ordinances = document.createElement("div")
    const sealing = document.createElement("p")
    sealing.textContent = temple.ordinance_schedule.sealing
    
    const baptism = document.createElement("p")
    baptism.textContent = temple.ordinance_schedule.baptism
    
    const initiatory = document.createElement("p")
    initiatory.textContent = temple.ordinance_schedule.initiatory
    ordinances.append(sealing, baptism, initiatory)
    
    const likeContainer = document.createElement("div")
    const likes = document.createElement("span")
    likes.setAttribute("id", `temple${key}`)
    likes.classList.add("likeInfo")
    const likeButton = document.createElement("button")
    likeButton.innerHTML = "likes 👍"
    likeButton.setAttribute("id", `${key}`)
    likeButton.addEventListener("click", generateLike)
    
    likeContainer.append(likeButton, likes)

    container.append(templeImage, templeName, templeHistory, templeAddress, templePhone, templeEmail, templeServices, ordinances, likeContainer)
    
    return container
}

const splitDate = (date) => {
    return date.slice(5, 10)
}

const likesSetup = (e) => {
    if (localStorage.getItem("temples") != null) {
        let temples = JSON.parse(localStorage.getItem("temples"))
        const t1 = document.querySelector("#temple0")
        const t2 = document.querySelector("#temple1")
        const t3 = document.querySelector("#temple2")
        const t4 = document.querySelector("#temple3")
        t1.textContent = temples.t0
        t2.textContent = temples.t1
        t3.textContent = temples.t2
        t4.textContent = temples.t3
    } else {
        localStorage.setItem("temples", JSON.stringify({"t0": 0, "t1": 0, "t2": 0, "t3": 0}))
    }
}

const generateLike = (e) => {
    let temples = JSON.parse(localStorage.getItem("temples"))
    let textElement = document.querySelector(`#temple${e.target.id}`)
    let current = parseInt(temples[`t${e.target.id}`])
    temples[`t${e.target.id}`] = current + 1
    textElement.textContent = temples[`t${e.target.id}`]
    localStorage.setItem("temples", JSON.stringify(temples))
    
}

const lastEdit = () => {
    document.querySelector("#lastedit").textContent = document.lastModified
}

lastEdit()