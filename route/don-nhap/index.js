const port = 3003;
const url_DonNhapHang = `http://localhost:${port}/DonNhapHang`;
const url_DSDonNhapHang = `http://localhost:${port}/DSDonNhapHang`;

var urlParams;

//get URL query
(window.onpopstate = function () {
  var match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    query = window.location.search.substring(1);
  urlParams = {};
  while ((match = search.exec(query)))
    urlParams[decode(match[1])] = decode(match[2]);
})();
