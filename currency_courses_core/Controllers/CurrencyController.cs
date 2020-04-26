using System;
using System.Collections.Generic;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace currency_courses_core.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CurrencyController : ControllerBase
    {
        private readonly ILogger<CurrencyController> _logger;

        public CurrencyController(ILogger<CurrencyController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Currency> Get()
        {
            var client = new WebClient();
            JObject response = JObject.Parse(client.DownloadString("https://api.exchangeratesapi.io/latest?base=PLN"));
            var rates = response["rates"] as JObject;
            var date = response["date"];
            List<Currency> list = new List<Currency>();

            foreach (var item in rates)
            {
                list.Add(new Currency
                {
                    Date = Convert.ToDateTime(date),
                    Code = item.Key,
                    Name = GetName(item.Key),
                    Value = Math.Round(1 / Convert.ToDouble(item.Value),2)
                });
            }
            return list;
        }
        #region private methods
        private string GetName(string code)
        {
            string name;
            switch (code)
            {
                case "PLN":
                    name = "polski złoty";
                    break;
                case "CAD":
                    name = "dolar kanadyjski";
                    break;
                case "HKD":
                    name = "dolar hongkoński";
                    break;
                case "ISK":
                    name = "korona islandzka";
                    break;
                case "PHP":
                    name = "peso filipińskie";
                    break;
                case "DKK":
                    name = "korona duńska";
                    break;
                case "HUF":
                    name = "forint węgierski";
                    break;
                case "CZK":
                    name = "korona czeska";
                    break;
                case "GBP":
                    name = "brytyjski funt szterling";
                    break;
                case "RON":
                    name = "lej rumuński";
                    break;
                case "SEK":
                    name = "korona szwedzka";
                    break;
                case "IDR":
                    name = "rupia indonezyjska";
                    break;
                case "INR":
                    name = "rupia indyjska";
                    break;
                case "BRL":
                    name = "real brazylijski";
                    break;
                case "RUB":
                    name = "Rubel rosyjski";
                    break;
                case "HRK":
                    name = "kuna chorwacka";
                    break;
                case "JPY":
                    name = "jen japoński";
                    break;
                case "THB":
                    name = "baht tajski";
                    break;
                case "CHF":
                    name = "frank szwajcarski";
                    break;
                case "EUR":
                    name = "euro";
                    break;
                case "MYR":
                    name = "ringgit malezyjski";
                    break;
                case "BGN":
                    name = "lew bułgarski";
                    break;
                case "TRY":
                    name = "lira turecka";
                    break;
                case "CNY":
                    name = "juan";
                    break;
                case "NOK":
                    name = "korona norweska";
                    break;
                case "NZD":
                    name = "dolar nowozelandzki";
                    break;
                case "ZAR":
                    name = "rand południowoafrykański";
                    break;
                case "USD":
                    name = "dolar amerykański";
                    break;
                case "MXN":
                    name = "peso meksykańskie";
                    break;
                case "SGD":
                    name = "dolar singapurski";
                    break;
                case "AUD":
                    name = "dolar australijski";
                    break;
                case "ILS":
                    name = "szekel izraelski";
                    break;
                case "KRW":
                    name = "won południowokoreański";
                    break;
                default:
                    name = "";
                    break;
            }
            return name;
        }
        #endregion
    }
}
