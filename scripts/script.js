var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
"use strict";
// https://api.openweathermap.org/data/2.5/weather?q=London&appid=c9b2620838378342c11d0465c1bb0097
var $ = function (id) { return document.getElementById(id); };
var $$ = function (query) { return document.querySelector(query); };
var $$$ = function (jquery) { return document.querySelectorAll(jquery); };
var key = '	xvpOBAAypFh84YftzPvUCh8ZM80gbYIG';
// get weather information
var getWeather = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var base, query, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                base = 'http://dataservice.accuweather.com/currentconditions/v1/';
                query = "".concat(id, "?apikey=").concat(key);
                return [4 /*yield*/, fetch(base + query)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data[0]];
        }
    });
}); };
// get city information
var getCity = function (city) { return __awaiter(_this, void 0, void 0, function () {
    var base, query, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
                query = "?apikey=".concat(key, "&q=").concat(city);
                return [4 /*yield*/, fetch(base + query)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data[0]];
        }
    });
}); };
var cityForm = document.querySelector('form');
var card = document.querySelector('.card');
var details = document.querySelector('.details');
var time = document.querySelector('img.time');
var icon = document.querySelector('.icon img');
var updateUI = function (data) {
    // destructure properties
    var cityDets = data.cityDets, weather = data.weather;
    // update details template
    details.innerHTML = "\n    <h5 class=\"my-3\">".concat(cityDets.EnglishName, "</h5>\n    <div class=\"my-3\">").concat(weather.WeatherText, "</div>\n    <div class=\"display-4 my-4\">\n      <span>").concat(weather.Temperature.Metric.Value, "</span>\n      <span>&deg;C</span>\n    </div>\n  ");
    // update the night/day & icon images
    var iconSrc = "img/icons/".concat(weather.WeatherIcon, ".svg");
    icon.setAttribute('src', iconSrc);
    var timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
    // remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};
var updateCity = function (city) { return __awaiter(_this, void 0, void 0, function () {
    var cityDets, weather;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getCity(city)];
            case 1:
                cityDets = _a.sent();
                return [4 /*yield*/, getWeather(cityDets.Key)];
            case 2:
                weather = _a.sent();
                return [2 /*return*/, { cityDets: cityDets, weather: weather }];
        }
    });
}); };
cityForm.addEventListener('submit', function (e) {
    // prevent default action
    e.preventDefault();
    // get city value
    var city = cityForm.city.value.trim();
    cityForm.reset();
    // update the ui with new city
    updateCity(city)
        .then(function (data) { return updateUI(data); })
        .catch(function (err) { return console.log(err); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQXlGRztBQXpGSCxZQUFZLENBQUM7QUFFYixrR0FBa0c7QUFFbEcsSUFBTSxDQUFDLEdBQUcsVUFBQyxFQUFFLElBQUssT0FBQSxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUEzQixDQUEyQixDQUFDO0FBQzlDLElBQU0sRUFBRSxHQUFHLFVBQUMsS0FBSyxJQUFLLE9BQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQztBQUNwRCxJQUFNLEdBQUcsR0FBRyxVQUFDLE1BQU0sSUFBSyxPQUFBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBakMsQ0FBaUMsQ0FBQztBQUUxRCxJQUFNLEdBQUcsR0FBRyxtQ0FBbUMsQ0FBQztBQUVoRCwwQkFBMEI7QUFDMUIsSUFBTSxVQUFVLEdBQUcsVUFBTyxFQUFFOzs7OztnQkFFcEIsSUFBSSxHQUFHLDBEQUEwRCxDQUFDO2dCQUNsRSxLQUFLLEdBQUcsVUFBRyxFQUFFLHFCQUFXLEdBQUcsQ0FBRSxDQUFDO2dCQUVuQixxQkFBTSxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFBOztnQkFBcEMsUUFBUSxHQUFHLFNBQXlCO2dCQUM3QixxQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dCQUE1QixJQUFJLEdBQUcsU0FBcUI7Z0JBRWxDLHNCQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQzs7O0tBRWhCLENBQUM7QUFFRix1QkFBdUI7QUFDdkIsSUFBTSxPQUFPLEdBQUcsVUFBTyxJQUFJOzs7OztnQkFFbkIsSUFBSSxHQUFHLCtEQUErRCxDQUFDO2dCQUN2RSxLQUFLLEdBQUcsa0JBQVcsR0FBRyxnQkFBTSxJQUFJLENBQUUs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