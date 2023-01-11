// 분양 정보
// 플리커 활용 (Shim_Portfolio_202212)
// key : 279900eb1e2399803d846658b1cf7e1d
// https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value
// https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
// flickr.interestingness.getList

const body = document.querySelector('body');
const frame = document.querySelector('#list');
const loading = document.querySelector('.loading');
const input = document.querySelector('#search');
const btnSearch = document.querySelector('.btnSearch');
const base = 'https://www.flickr.com/services/rest/?';
const method1 = 'flickr.interestingness.getList';
const method2 = 'flickr.photos.search';
const key = '279900eb1e2399803d846658b1cf7e1d';
const per_page = 10;

const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;

callData(url);

btnSearch.addEventListener('click', (e) => {
	let tag = input.value;
	tag = tag.trim();

	const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

	if (tag != '') {
		callData(url);
	} else {
		frame.innerHTML = '';
		frame.classList.remove('on');
		frame.style.height = 'auto';

		const errMsgs = frame.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) frame.parentElement.querySelector('p').remove();

		const errMeg = document.createElement('p');
		errMeg.append('검색어를 쓰지 않았습니다, 검색어를 입력하세요');
		frame.parentElement.append(errMeg);
	}
});

input.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		let tag = input.value;
		tag = tag.trim();

		const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

		if (tag != '') {
			callData(url);
		} else {
			frame.innerHTML = '';
			frame.classList.remove('on');
			frame.style.height = 'auto';

			const errMsgs = frame.parentElement.querySelectorAll('p');
			if (errMsgs.length > 0) frame.parentElement.querySelector('p').remove();

			const errMeg = document.createElement('p');
			errMeg.append('검색어를 쓰지 않았습니다, 검색어를 입력하세요');
			frame.parentElement.append(errMeg);
		}
	}
});
frame.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target == frame) return;

	let target = e.target.closest('.item').querySelector('.thumb');

	if (e.target == target) {
		let imgSrc = target.parentElement.getAttribute('href');
		let pop = document.createElement('aside');
		pop.classList.add('pop');
		let pops = `
      <div class="con">
        <img src="${imgSrc}">
      </div>
      <span class="close">close</span>
    `;
		pop.innerHTML = pops;
		body.querySelector('#gallery').append(pop);
		body.style.overflow = 'hidden';
	}
});

body.addEventListener('click', (e) => {
	let pop = body.querySelector('.pop');
	if (pop != null) {
		let close = pop.querySelector('.close');
		if (e.target == close) {
			pop.remove();
			body.style.overflow = 'auto';
		}
	}
});

function callData(url) {
	fetch(url)
		.then((data) => {
			return data.json();
		})
		.then((json) => {
			let items = json.photos.photo;
			createList(items);
			delayLoading();
		});
}

function createList(items) {
	let htmls = '';
	items.map((el) => {
		let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
		let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;
		htmls += `
        <li class="item">
          <div>
            <a href=${imgSrcBig}>
              <img src=${imgSrc} class="thumb">
            </a>
            <p>${el.title}</p>
            <span>
              <img class="profile" src="http://farm${el.farm}.staticflickr.com/${el.server}/buddyicons/${el.owner}.jpg">
              <strong>${el.owner}</strong>
            </span>
          </div>
        </li>
      `;
	});
	frame.innerHTML = htmls;
}

function delayLoading() {
	const imgs = frame.querySelectorAll('img');
	const len = imgs.length;
	let count = 0;

	for (let el of imgs) {
		el.onload = () => {
			count++;
			if (count == len) {
				isoLayout();
			}
		};

		el.onerror = (e) => {
			e.currentTarget.setAttribute('src', 'img/k1.jpg');
		};

		let profile = el.closest('.item').querySelector('.profile');
		profile.onerror = (e) => {
			e.currentTarget.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};
	}
}

function isoLayout() {
	loading.classList.add('off');
	frame.classList.add('on');

	new Isotope('#list', {
		itemSelection: '.item',
		columnWidth: '.item',
		transitionDuration: '0.5s',
	});
}
