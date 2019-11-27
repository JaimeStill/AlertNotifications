using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AlertNotifications.Data;
using AlertNotifications.Data.Entities;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace AlertNotifications.Web.Controllers
{
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        private AppDbContext db;

        public TestController(AppDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Alert>> GetAlerts()
        {
            var alerts = await db.Alerts
                .OrderBy(x => x.Trigger)
                .ToListAsync();

            return alerts;
        }



        [HttpPost("[action]")]
        public DateTime TestAlertTrigger([FromBody]Alert alert) => alert.Trigger;

        [HttpPost("[action]")]
        public async Task SaveAlert([FromBody]Alert alert)
        {
            await db.Alerts.AddAsync(alert);
            await db.SaveChangesAsync();
        }
    }

    public static class TestExtensions
    {
        public static IEnumerable<T> Map<T>(this IEnumerable<T> items, Action<T> update)
        {
            foreach (var item in items)
            {
                update(item);
            }

            return items;
        }
    }
}