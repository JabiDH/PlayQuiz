using backend;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace backend_xunit
{
    public class TestClientProvider : IDisposable
    {
        private TestServer Server;
        public HttpClient Client { get; private set; }

        public TestClientProvider()
        {
            this.Server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
            this.Client = this.Server.CreateClient();
        }

        public void Dispose()
        {
            this.Server?.Dispose();
            this.Client?.Dispose();
        }
    }
}
