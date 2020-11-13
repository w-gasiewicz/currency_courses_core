using System;

namespace currency_courses_core.Models
{
    public class Currency
    {
        public DateTime Date { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public Decimal Value { get; set; }
    }
}
