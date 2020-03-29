using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

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
                    Value = 1 / Convert.ToDouble(item.Value)
                });
            }
            return list;
        }
    }
}
