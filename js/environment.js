// 입지환경_유튜브

//API key : AIzaSyBevrcBLoLnF2MK6FOESsfRa3yBgZtSj5w
//playlist:  PLegWLOK1kUETbdBc12TcTHKbY3X0KExeY

const vidList = document.querySelector('.vidList');
const key = 'AIzaSyBevrcBLoLnF2MK6FOESsfRa3yBgZtSj5w';
const playListId = 'PLegWLOK1kUETbdBc12TcTHKbY3X0KExeY';
const num = 6;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;

fetch(url)
	.then((data) => {
		return data.json();
	})
	.then((json) => {
		let items = json.items;
		console.log(items);
		let result = '';

		items.map((el) => {
			let title = el.snippet.title;
			if (title.length > 30) {
				title = title.substr(0, 20) + '...';
			}

			let con = el.snippet.description;
			if (con.length > 100) {
				con = con.substr(0, 40) + '...';
			}

			let date = el.snippet.publishedAt;
			date = date.split('T')[0];

			result += `
        <article>
          <a href="${el.snippet.resourceId.videoId}" class="pic">
            <img src="${el.snippet.thumbnails.medium.url}">
          </a>
          <div class="con">
            <h2>${title}</h2>
            <p>${con}</p>
            <span>${date}</span>
          </div>
        </article>
      `;
		});

		vidList.innerHTML = result;
	});

vidList.addEventListener('click', (e) => {
	e.preventDefault();

	if (!e.target.closest('a')) return;
	const vidId = e.target.closest('article').querySelector('a').getAttribute('href');

	let pop = document.createElement('figure');
	pop.classList.add('pop');
	pop.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
      <span class="btnClose">close</span>
    `;
	vidList.append(pop);
});

vidList.addEventListener('click', (e) => {
	const pop = vidList.querySelector('.pop');

	if (pop) {
		const close = pop.querySelector('span');
		if (e.target == close) pop.remove();
	}
});
