using Backend.Application.Interfaces;
using Backend.Application.Services;
using Backend.Infrastructure.Data;
using Backend.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Backend.Domain.Interfaces;

namespace Backend.API
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors(options =>
   {
     options.AddPolicy("AllowAllOrigins",
          builder =>
          {
            builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
          });
   });

      services.AddControllers();

      services.AddDbContext<ApplicationDbContext>(options =>
          options.UseInMemoryDatabase("InMemoryDb"));

      services.AddScoped<IComentarioService, ComentarioService>();
      services.AddScoped<ITarefaService, TarefaService>();
      services.AddScoped<IUsuarioService, UsuarioService>();
      services.AddScoped<ICategoriaService, CategoriaService>();

      services.AddScoped<IComentarioRepository, ComentarioRepository>();
      services.AddScoped<ITarefaRepository, TarefaRepository>();
      services.AddScoped<IUsuarioRepository, UsuarioRepository>();
      services.AddScoped<ICategoriaRepository, CategoriaRepository>();

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "API", Version = "v1" });
      });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

      app.UseCors("AllowAllOrigins");

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseSwagger();
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
      });

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}