const port = 3003;
const url_DonNhapHang = `http://localhost:${port}/DonNhapHang`;
const url_MatHang = `http://localhost:${port}/MatHang`;
const url_NhanVien = `http://localhost:${port}/NhanVien`;
const url_DSDonNhapHang = `http://localhost:${port}/DSDonNhapHang`;
const url_NhaCungCap = `http://localhost:${port}/NhaCungCap`;
const url_NhaCungCapMatHang = `http://localhost:${port}/NhaCungCapMatHang`;

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
