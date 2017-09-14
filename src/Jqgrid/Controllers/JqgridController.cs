using System;
using System.Data;
using System.Linq;
using System.Data.Entity;
using System.Web.Mvc;
using Jqgrid.Models;


namespace Jqgrid.Controllers
{
    public class JqgridController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }

        DatabaseEntities1 db = new DatabaseEntities1();
        public JsonResult GetValues(string sidx, string sord, int page, int rows)  //Gets the todo Lists.
        {
            int pageIndex = Convert.ToInt32(page) - 1;
            int pageSize = rows;
            var Results = db.Users.Select(
                    a => new
                    {
                        a.Id,
                        a.Name,
                        a.Phone,
                        a.Address,
                        a.DOB,
                    });
            int totalRecords = Results.Count();
            var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);
            if (sord.ToUpper() == "DESC")
            {
                Results = Results.OrderByDescending(s => s.Id);
                Results = Results.Skip(pageIndex * pageSize).Take(pageSize);
            }
            else
            {
                Results = Results.OrderBy(s => s.Id);
                Results = Results.Skip(pageIndex * pageSize).Take(pageSize);
            }
            var jsonData = new
            {
                total = totalPages,
                page,
                records = totalRecords,
                rows = Results
            };
            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        // TODO:insert a new row to the grid logic here
        [HttpPost]
        public string Create([Bind(Exclude = "Id")] User obj)
        {
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    db.Users.Add(obj);
                    db.SaveChanges();
                    msg = "Saved Successfully";
                }
                else
                {
                    msg = "Validation data not successfull";
                }
            }
            catch (Exception ex)
            {
                msg = "Error occured:" + ex.Message;
            }
            return msg;
        }
        public string Edit(User obj)
        {
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    db.Entry(obj).State = EntityState.Modified;
                    db.SaveChanges();
                    msg = "Saved Successfully";
                }
                else
                {
                    msg = "Validation data not successfull";
                }
            }
            catch (Exception ex)
            {
                msg = "Error occured:" + ex.Message;
            }
            return msg;
        }
        public string Delete(int Id)
        {
            User list = db.Users.Find(Id);
            db.Users.Remove(list);
            db.SaveChanges();
            return "Deleted successfully";
        }
    }
}
