using System;
using System.Collections.Generic;
using System.Net;
using currency_courses_core.Models;
using currency_courses_core.SR;
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
                    Value = Math.Round(1 / Convert.ToDecimal(item.Value), Settings.Precision)
                });
            }
            return list;
        }
        [HttpGet("{day}/{precision}")]
        public IEnumerable<Currency> Get(string day, int precision)
        {
            var client = new WebClient();
            JObject response = JObject.Parse(client.DownloadString("https://api.exchangeratesapi.io/"+day+"?base=PLN"));
            var rates = response["rates"] as JObject;
            var date = response["date"];
            List<Currency> list = new List<Currency>();
            string format = GetFormat(precision);

            foreach (var item in rates)
            {
                var strValue = (1 / Convert.ToDecimal(item.Value)).ToString(format);
                list.Add(new Currency
                {
                    Date = Convert.ToDateTime(date),
                    Code = item.Key,
                    Name = GetName(item.Key),
                    Value = Decimal.Parse(strValue)
                }); ;
            }
            return list;
        }
        #region private methods
        private string GetFormat(int precision)
        {
            string format = "0.";
            for (int i = 0; i < precision; i++)
                format += "0";
            return format;
        }
        private string GetName(string code)
        {
            string name;
            switch (code)
            {
                case "PLN":
                    name = Dictionary.PolishZloty;
                    break;
                case "CAD":
                    name = Dictionary.CanadianDollar;
                    break;
                case "HKD":
                    name = Dictionary.HongKongDollar;
                    break;
                case "ISK":
                    name = Dictionary.IcelandicKrone;
                    break;
                case "PHP":
                    name = Dictionary.PhilipinePeso;
                    break;
                case "DKK":
                    name = Dictionary.DanishKrone;
                    break;
                case "HUF":
                    name = Dictionary.HungarianForint;
                    break;
                case "CZK":
                    name = Dictionary.CzechKrone;
                    break;
                case "GBP":
                    name = Dictionary.BritishPoundSterling;
                    break;
                case "RON":
                    name = Dictionary.RomanianLeu;
                    break;
                case "SEK":
                    name = Dictionary.SwedishKrone;
                    break;
                case "IDR":
                    name = Dictionary.IndonesianRupee;
                    break;
                case "INR":
                    name = Dictionary.IndianRupee;
                    break;
                case "BRL":
                    name = Dictionary.BrazilianReal;
                    break;
                case "RUB":
                    name = Dictionary.RussianRubel;
                    break;
                case "HRK":
                    name = Dictionary.CroatianKuna;
                    break;
                case "JPY":
                    name = Dictionary.JapaneseYen;
                    break;
                case "THB":
                    name = Dictionary.ThaiBaht;
                    break;
                case "CHF":
                    name = Dictionary.SwissFranc;
                    break;
                case "EUR":
                    name = Dictionary.Euro;
                    break;
                case "MYR":
                    name = Dictionary.MalaysianRinggit;
                    break;
                case "BGN":
                    name = Dictionary.BulgarianLev;
                    break;
                case "TRY":
                    name = Dictionary.TurkishLira;
                    break;
                case "CNY":
                    name = Dictionary.Juan;
                    break;
                case "NOK":
                    name = Dictionary.NorvegianKrone;
                    break;
                case "NZD":
                    name = Dictionary.NewZelandDolar;
                    break;
                case "ZAR":
                    name = Dictionary.SouthAfricanRand;
                    break;
                case "USD":
                    name = Dictionary.UnitedStatesDolar;
                    break;
                case "MXN":
                    name = Dictionary.MexicanPeso;
                    break;
                case "SGD":
                    name = Dictionary.SingaporeDollar;
                    break;
                case "AUD":
                    name = Dictionary.AustralianDollar;
                    break;
                case "ILS":
                    name = Dictionary.IsraeliShekel;
                    break;
                case "KRW":
                    name = Dictionary.SouthKoreanWon;
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
