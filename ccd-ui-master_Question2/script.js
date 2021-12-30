let cafes = [];
let places = [];
const searchInp = document.querySelector('#searchInput');
const tableBd = document.querySelector('#Table');

async function initialLoad() {
  const respon1 = await fetch(
    'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json',
    {
      method: 'Get',
    }
  );
  const respon2 = await fetch(
    'https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json',
    {
      method: 'Get',
    }
  );

  const jsonRespon1 = await respon1.json();
  const jsonRespon2 = await respon2.json();

  cafes = jsonRespon1.cafes;
  places = jsonRespon2.places;

  searchInp.value = '';
  const initialResult = [];
  cafes.forEach((cafe) => {
    places.forEach((place) => {
      if (cafe.location_id === place.id) {
        initialResult.push({
          ...cafe,
          ...place,
        });
      }
    });
  });
  display(initialResult);
}

function filterList() {
  const searchingIt = searchInp.value.toLowerCase();
  const filterNames = cafes.filter((cafe) => {
    const name = cafe.name.toLowerCase();
    if (name.includes(searchingIt)) {
      return true;
    }
    return false;
  });
  const result = [];
  filterNames.forEach((cafe) => {
    places.forEach((place) => {
      if (cafe.location_id === place.id) {
        result.push({
          ...cafe,
          ...place,
        });
      }
    });
  });
  display(result);
}

function display(cafeList) {
  let html = '';
  let serialNo = 1;
  cafeList.forEach((cafe) => {
    html += `<tr>
    <td class="column1">${serialNo}</td>
    <td class="column2">${cafe.name}</td>
    <td class="column3">${cafe.locality}</td>
    <td class="column4">${cafe.postal_code}</td>
    <td class="column5">${cafe.lat}</td>
    <td class="column6">${cafe.long}</td>
  </tr>`;
    serialNo++;
  });
  tableBd.innerHTML = html;
}

window.onload = initialLoad();
