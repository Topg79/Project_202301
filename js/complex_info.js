//단지정보_카카오맵
//2a703a1d1d4966263b4dc2278318c20d

var mapContainer = document.getElementById('map');
const t_on = document.querySelectorAll('.traffic li')[0];
const t_off = document.querySelectorAll('.traffic li')[1];
const branch_btns = document.querySelectorAll('.branch li');

let drag = true;
let zoom = true;

mapOption = {
	center: new kakao.maps.LatLng(37.4987, 127.068266),
	level: 3,
};

var map = new kakao.maps.Map(mapContainer, mapOption);

var markerOptions = [
	{
		title: '1단지',
		latlng: new kakao.maps.LatLng(37.4987, 127.068266),
		imgSrc: 'img/marker1.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 69) },
		button: branch_btns[0],
	},

	{
		title: '2단지',
		latlng: new kakao.maps.LatLng(37.5002668, 127.069268),
		imgSrc: 'img/marker2.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 69) },
		button: branch_btns[1],
	},
	{
		title: '3단지',
		latlng: new kakao.maps.LatLng(37.4985891, 127.0709257),
		imgSrc: 'img/marker3.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 69) },
		button: branch_btns[2],
	},
];

for (let i = 0; i < markerOptions.length; i++) {
	new kakao.maps.Marker({
		map: map,
		position: markerOptions[i].latlng,
		title: markerOptions[i].title,
		image: new kakao.maps.MarkerImage(
			markerOptions[i].imgSrc,
			markerOptions[i].imgSize,
			markerOptions[i].imgPos
		),
	});

	markerOptions[i].button.onclick = (e) => {
		e.preventDefault();

		for (let k = 0; k < markerOptions.length; k++) {
			markerOptions[k].button.classList.remove('on');
		}
		markerOptions[i].button.classList.add('on');
		moveTo(markerOptions[i].latlng);
	};
}

window.onresize = () => {
	let active_btn = document.querySelector('.branch li.on');
	let active_index = active_btn.getAttribute('data-index');
	map.setCenter(markerOptions[active_index].latlng);
};

t_on.addEventListener('click', (e) => {
	e.preventDefault();
	if (t_on.classList.contains('on')) return;
	map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	t_on.classList.add('on');
	t_off.classList.remove('on');
});

t_off.addEventListener('click', (e) => {
	e.preventDefault();
	if (t_off.classList.contains('on')) return;
	map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	t_off.classList.add('on');
	t_on.classList.remove('on');
});
