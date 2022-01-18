import { myfetch } from "./helper.js";


//Funktion til at hente liste med sange
const songList = async() => {
    //Henter listSong fra html
    const listSong = document.querySelector('#listSong');


    // Sætter var til array params
    const arrParams = [];

    //fetch  - Vi henter vores api som bliver konstaen 'url'
    let url = 'http://localhost:4000/api/songs';

    //JOIN
    console.log(arrParams.join('&'));
    // Bygger endpoint url med string og join metode
    const strEndpoint = url += arrParams.join('&')
    const data = await myfetch(strEndpoint);
    console.log(strEndpoint);


    //Opretter html elementer
    //Wrapper
    const div = document.createElement('div')
    div.classList.add('listWrapper')

    //Opretter table
    const table = document.createElement('table');
    const row_head = document.createElement('tr');

    //Opretter kolon til overskrifter (header)
    const th1 = document.createElement('th');
    th1.innerText = 'Id';
    const th2 = document.createElement('th');
    th2.innerText = 'Sang';
    const th3 = document.createElement('th');
    th3.innerText = 'Handling';


    //placering af elementer
    row_head.append(th1, th2, th3);
    table.append(row_head);

    //Laver map
    data.map(function(item, key) {
        //Laver table row
        const tr = document.createElement('tr');

        //Tilføjer data i felterne
        //Id
        const td1 = document.createElement('td');
        td1.innerText = item.id;

        //Sang
        const td2 = document.createElement('td');

        //A tag til detalijer fra sang
        const link = document.createElement('a');
        link.innerText = `${item.title} - ${item.artist.name}`;

        //Click event der kalder function til detalijer 
        link.addEventListener('click', () => {
            songDetails(item.id);
        })
        td2.append(link);


        //Handling - Ændre
        const td3 = document.createElement('td');
        const edit = document.createElement('a');
        edit.classList.add('edit')
        edit.innerText = 'Edit'

        //Click event med function til at ændre sang
        edit.addEventListener('click', () => {
                editSong(item.id)
            })
            //Tilføj edit i td3
        td3.append(edit)

        //Handling - Slet
        const del = document.createElement('a');
        del.classList.add('del')
        del.innerText = 'Slet'

        //Click event med function til at slette sang
        del.addEventListener('click', () => {
                if (confirm(`Vil du slette sangen ${item.title} fra sangbogen?`)) {
                    deleteSong(item.id)
                }
            })
            //Tilføj delete i td3
        td3.append(del)


        //Placere td1,2,3 i rækken tr
        tr.append(td1, td2, td3);
        //Placere tr i table 
        table.append(tr);
    })

    //Placere table i root 
    listSong.append(table);


}


songList()


// Liste funktion med details til modal
const songDetails = async(song_id) => {

    //Kalder data fra details
    let data = await myfetch(`http://localhost:4000/api/songs/${song_id}`);

    //const for vores div fra html - goalmoadal
    const modal = document.querySelector('.modal');


    //Gør vores div blank så den refecher når vi lukker
    modal.innerHTML = '';

    //Opretter en h1 der skriver den titel fra vores data api
    const h1 = document.createElement('h1');
    h1.innerText = data.title;

    //Opretter et h3 tag der skriver artist fra vores data api
    // const artist = document.createElement('h3');
    // artist.innerText = `Skrevet af ${data.artist.name} `;

    //Opretter et p tag der skriver beskrivelsen fra vores data api
    const description = document.createElement('p');
    description.innerText = data.content;

    //Laver en button 
    const button = document.createElement('button');
    button.innerText = 'Close';

    //Vi gør det muligt at åbne og lukke ved click på vores knap
    button.addEventListener('click', () => {
        modal.classList.toggle('active');
    })

    //Føjer h1 og button ind i vores modal div så det kun kommer frem når den er synlig
    modal.append(h1, description, button)
    modal.classList.toggle('active');

}


//Slet kommentar
const deleteSong = async song_id => {
        //Tømmer listSong section
        listSong.innerHTML = '';

        //Option objekt. - SLETTER info 
        let options = {
            method: 'DELETE',
        }

        //Henter vores api
        const url = await myfetch(`http://localhost:4000/api/songs/${song_id}`, options);

        //loader data
        location.reload();
    }
    /**
     * 
     * @param {*} song_id 
    
    //Ændre kommentar
const editSong = async song_id => {
        const formhtml = `<form method="put" id="editForm">
   
    <input type="hidden" name="id" value="1" >
    <input type="hidden" name="active" value="1" >
    
    <label for="title">Title</label>
    <input type="text" name="title" id="title" >
    
    <label for="comment">Kommentar</label>
    <textarea name="comment" id="comment" > </textarea>
    
    <button type="button" id="send">Gem</button>
    
    </form>`

        //Skriver vores js-formen i vores section listSong
        listSong.innerHTML = formhtml;
        //Vælger vores form
        const form = listSong.querySelector('form');
        //Laver click event
        form.send.addEventListener('click', async() => {
            //Laver en const for vores data værdi
            const id = form.id.value;
            const title = form.title.value;
            const comment = form.comment.value;
            const active = form.active.value;

            //Tilføjer data til vores form
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('comment', comment);
            formData.append('active', active);

            //Option objekt.
            const options = {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${loginData.access_token}`
                    }
                }
                //Henter api + kalder det
            const url = `http://localhost:4000/api/songs/${song_id}`;
            const data = await myfetch(url, options);

        })
    }
     */


//Tilføj sang function
function SongForm() {

    //Vælger vores form
    const form = createForm.querySelector('form');

    //Opretter options i select
    //Vælger vores form
    const select = createForm.querySelector('#selectArtist');

    //Opretter et h3 tag der skriver artist fra vores data api
    const option = document.createElement('option');
    option.innerText = data.title;
    select.append(option)


    //Laver click event
    form.send.addEventListener('click', async() => {
        //Laver en const for vores data værdi
        const id = form.id.value;
        const title = form.title.value;
        const content = form.content.value;
        const active = form.active.value;



        //Tilføjer data til vores form
        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('active', active);


        //         //Option objekt.
        const options = {
                method: 'POST',
                body: formData,

            }
            //Henter api + kalder det
        const url = 'http://localhost:4000/api/songs';
        const data = await myfetch(url, options);

    })
}
SongForm()