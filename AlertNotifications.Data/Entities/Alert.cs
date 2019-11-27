using System;
using System.Collections.Generic;

namespace AlertNotifications.Data.Entities
{
    public class Alert
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime Trigger { get; set; }
        public bool Sent { get; set; }
    }
}