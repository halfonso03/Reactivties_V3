using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

// HA - not used
// builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     // HA - not used
//     // app.MapOpenApi();
// }

// app.UseHttpsRedirection();

// app.UseAuthorization();


app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
        .WithOrigins("http://localhost:3000", "https://localhost:3000"));
        
app.MapControllers();


using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;


try {
    var context = services.GetRequiredService<AppDbContext>();
    // var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "migration error");
}

app.Run();
