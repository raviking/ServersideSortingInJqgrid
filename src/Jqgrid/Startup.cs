using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Jqgrid.Startup))]
namespace Jqgrid
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
           
        }
    }
}
