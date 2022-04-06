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
    const apiForecast = "http://api.openweathermap.org/data/2.5/forecast?id=3598132&units=metric&appid=2f4da8fb1f6d9955ed9fe6bd18c92e85"
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
            console.log(forecast1Date)
            console.log(data)
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
        .then(data => console.log(data))
}

const splitDate = (date) => {
    return date.slice(5, 10)
}

getTempleInfo()

getWeather()


document.querySelector(".reserve-jumbotron").addEventListener("click", getWeather)