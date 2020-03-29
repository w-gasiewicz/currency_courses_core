using System;
using System.ComponentModel.DataAnnotations;

namespace currency_courses_core
{
    public class Currency
    {
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime Date { /*get { return Date.Date; } set { this.Date = value; }*/ get; set; }
        public int TemperatureC { get; set; }
        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
        public string Summary { get; set; }
        public string Code { get; set; }
        public double Value { get; set; }
    }
}
