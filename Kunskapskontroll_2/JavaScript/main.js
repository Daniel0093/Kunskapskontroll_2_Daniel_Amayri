// Skapa variabel och välj containerB för att sätta en huvudbakgrundsbild till webbplatsen
let container = document.querySelector('#container');
    container.style.backgroundImage = 'url(Img/main-background.jpg)';
    container.style.backgroundSize = 'cover';
    container.style.backgroundRepeat = 'no-repeat';
    container.style.height = '100vh'

// Skapa variabel till min apiKey
const apiKey = 'c116bb669610a5250d9df0d3121e7445';

// Skapa variabel och välj form id
let weatherForm = document.querySelector('#weather-form');

// Lägg till event listener till Submit-knappen, så när användaren klickar på knappen händer något
weatherForm.addEventListener('submit',
    function(event){
        event.preventDefault();

        // Skapa en variabel och välj Input type ID och välj sedan värdet på den
        let stadensNamnInput = document.querySelector('#stadensNamn');
        let stadensNamn = stadensNamnInput.value;

        // Skapa en variabel url och sätt in väderlänken inuti den, och inuti väderlänken lägger vi våra två variabler (stadensNamn och apiKey) plus vi lägger ( &units=metric ) till länken. så när användaren anger ett stadsnamn, kommer vädret i denna stad att visas i celsius
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${stadensNamn}&units=metric&appid=${apiKey}`;

        // Använder vi Fetch for att fetcha url länken och sedan hämta de data som vi vill att visa till användaren
        fetch(url).then(
            function(response){
                return response.json();
            }
        ).then(
            function(data){

                let myDescription = document.querySelector('#description');

                    myDescription.innerHTML = `Description: ${data.weather[0].description}`;

                let myTemp = document.querySelector('#myTemp');
                    myTemp.innerHTML = `Temperature Is: ${data.main.temp} °C.`;

                let myWind = document.querySelector('#myWind');
                    myWind.innerHTML = `Wind Speed Is: ${data.wind.speed} Km/h`;

                let myHumidity = document.querySelector('#myHumidity')
                    myHumidity.innerHTML = `Humidity Is: ${data.main.humidity}%`;

                let img = document.querySelector('#wIcon')
                let wIcon = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/w/${wIcon}.png`;
                console.log(iconUrl)
                img.src = iconUrl;

                // Skapa en funktion som vi använder inuti det if-else statement för att sätta en kort fras och bakgrundsbild som kommer att förändras beror på temperaturdata vi får från API
                function tempChange(){
                    if(data.main.temp <= -1){
                        let containerB = document.querySelector('#container');
                            container.style.backgroundImage = 'url(Img/snow.jpg)';
                            container.style.backgroundPosition = 'center center';
                            container.style.backgroundSize = 'cover';

                        let tempCh = document.querySelector('#tempCh')
                            tempCh.innerHTML = `Stay home, it's too cold`;
                        
                        let uI = document.querySelector('.user-interface');
                            uI.style.border = '3px solid yellow';

                        let uX = document.querySelector('.user-experience');
                            uX.style.border = '3px solid blue';

                    }else if(data.main.temp == 0 || data.main.temp <= 17){
                        let containerB = document.querySelector('#container');
                            containerB.style.backgroundImage = 'url(Img/rain.jpg)';
                            containerB.style.backgroundPosition = 'center center';
                            containerB.style.backgroundSize = 'cover';

                        let tempCh = document.querySelector('#tempCh')
                            tempCh.innerHTML = `It's a cold day`;
                        
                        let uI = document.querySelector('.user-interface');
                            uI.style.border = '3px solid yellow';

                        let uX = document.querySelector('.user-experience');
                            uX.style.border = '3px solid blue';
                        
                    }else if(data.main.temp >= 18 && data.main.temp <= 27){
                        let container = document.querySelector('#container');
                            container.style.backgroundImage = 'url(Img/summer.jpg)';
                            container.style.backgroundPosition = 'center center';
                            container.style.backgroundSize = 'cover';

                        let tempCh = document.querySelector('#tempCh')
                            tempCh.innerHTML = `It's a sunny day`;
                        
                        let uI = document.querySelector('.user-interface');
                            uI.style.border = '3px solid yellow';

                        let uX = document.querySelector('.user-experience');
                            uX.style.border = '3px solid blue';

                    }
                    else if(data.main.temp >= 28){
                        let containerB = document.querySelector('#container');
                            container.style.backgroundImage = 'url(Img/hot-summer.jpg)';
                            container.style.backgroundPosition = 'center center';
                            container.style.backgroundSize = 'cover';
                            container.style.backgroundRepeat = 'no-repeat';

                        let tempCh = document.querySelector('#tempCh')
                            tempCh.innerHTML = `It's a very hot day`;

                        let uI = document.querySelector('.user-interface');
                            uI.style.border = '3px solid yellow';

                        let uX = document.querySelector('.user-experience');
                            uX.style.border = '3px solid blue';
                    }
                }
                tempChange()

                // Skapa en design function
                function design(){
                    let uX = document.querySelector('.user-experience');
                        uX.style.width = '300px';
                        uX.style.height = '20rem';
                        uX.style.backgroundColor = 'grey';
                        uX.style.backgroundColor = 'silver';
                        uX.style.borderRadius = '5px';
                        uX.style.boxShadow = '2px 0px 8px rgb(204, 204, 204)';
                        uX.style.padding = '30px 8px';
                }
                design()
            }

            // Använda catch metoden för att visa ett felmeddelande till användaren om de inte angav något i textformuläret eller om de anger fel stadsnamn
            ).catch(
            function (error){
                let container = document.querySelector('form');
                container.insertAdjacentHTML('afterend', `<p>Something went wrong!</p>`)
            }
        )
    }
);